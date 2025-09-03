/**
 * @casoon/tailwindcss-effects - Tailwind CSS Plugin (CommonJS)
 * 
 * Complete collection of modern CSS effects and utilities for Tailwind CSS v4.
 * Includes animations, glass effects, gradients, navigation utilities, and more.
 */

// Import all individual plugins
const animations = require('@casoon/tailwindcss-animations');
const utilities = require('@casoon/tailwindcss-utilities');
const navigation = require('@casoon/tailwindcss-navigation');
const glass = require('@casoon/tailwindcss-glass');
const orbs = require('@casoon/tailwindcss-orbs');
const gradients = require('@casoon/tailwindcss-gradients');
const scroll = require('@casoon/tailwindcss-scroll');
const loading = require('@casoon/tailwindcss-loading');
const microInteractions = require('@casoon/tailwindcss-micro-interactions');

/**
 * Main effects plugin that combines all individual effect plugins
 * @param {Object} options - Configuration options
 * @param {boolean} options.animations - Enable animations plugin (default: true)
 * @param {boolean} options.utilities - Enable utilities plugin (default: true)
 * @param {boolean} options.navigation - Enable navigation plugin (default: true)
 * @param {boolean} options.glass - Enable glass effects plugin (default: true)
 * @param {boolean} options.orbs - Enable orbs plugin (default: true)
 * @param {boolean} options.gradients - Enable gradients plugin (default: true)
 * @param {boolean} options.scroll - Enable scroll effects plugin (default: true)
 * @param {boolean} options.loading - Enable loading states plugin (default: true)
 * @param {boolean} options.microInteractions - Enable micro-interactions plugin (default: true)
 */
function effectsPlugin(options = {}) {
  const {
    animations: enableAnimations = true,
    utilities: enableUtilities = true,
    navigation: enableNavigation = true,
    glass: enableGlass = true,
    orbs: enableOrbs = true,
    gradients: enableGradients = true,
    scroll: enableScroll = true,
    loading: enableLoading = true,
    microInteractions: enableMicroInteractions = true,
  } = options;

  // Collect enabled plugins
  const plugins = [];
  
  if (enableUtilities) plugins.push(utilities());
  if (enableAnimations) plugins.push(animations());
  if (enableNavigation) plugins.push(navigation());
  if (enableGlass) plugins.push(glass());
  if (enableOrbs) plugins.push(orbs());
  if (enableGradients) plugins.push(gradients());
  if (enableScroll) plugins.push(scroll());
  if (enableLoading) plugins.push(loading());
  if (enableMicroInteractions) plugins.push(microInteractions());

  return {
    handler: ({ addUtilities, addComponents, theme, addBase }) => {
      // Apply all plugin handlers
      plugins.forEach(plugin => {
        if (plugin.handler) {
          plugin.handler({ addUtilities, addComponents, theme, addBase });
        }
      });
    },
    config: {
      theme: {
        extend: {
          // Merge all theme extensions from individual plugins
          ...plugins.reduce((acc, plugin) => {
            if (plugin.config?.theme?.extend) {
              Object.keys(plugin.config.theme.extend).forEach(key => {
                acc[key] = { ...acc[key], ...plugin.config.theme.extend[key] };
              });
            }
            return acc;
          }, {})
        }
      }
    }
  };
}

module.exports = effectsPlugin;
module.exports.effectsPlugin = effectsPlugin;
module.exports.default = effectsPlugin;

// Export individual plugins for granular control
module.exports.animations = animations;
module.exports.utilities = utilities;
module.exports.navigation = navigation;
module.exports.glass = glass;
module.exports.orbs = orbs;
module.exports.gradients = gradients;
module.exports.scroll = scroll;
module.exports.loading = loading;
module.exports.microInteractions = microInteractions;
module.exports.effects = effectsPlugin;

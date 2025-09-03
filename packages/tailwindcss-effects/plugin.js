/**
 * @casoon/tailwindcss-effects - Tailwind CSS Plugin
 * 
 * Complete collection of modern CSS effects and utilities for Tailwind CSS v4.
 * Includes animations, glass effects, gradients, navigation utilities, and more.
 */

// Import all individual plugins
import animations from '@casoon/tailwindcss-animations';
import utilities from '@casoon/tailwindcss-utilities';
import navigation from '@casoon/tailwindcss-navigation';
import glass from '@casoon/tailwindcss-glass';
import orbs from '@casoon/tailwindcss-orbs';
import gradients from '@casoon/tailwindcss-gradients';
import scroll from '@casoon/tailwindcss-scroll';
import loading from '@casoon/tailwindcss-loading';
import microInteractions from '@casoon/tailwindcss-micro-interactions';

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
export default function effectsPlugin(options = {}) {
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

// Export individual plugins for granular control
export {
  animations,
  utilities,
  navigation,
  glass,
  orbs,
  gradients,
  scroll,
  loading,
  microInteractions
};

// Export the main plugin as both default and named export
export { effectsPlugin, effectsPlugin as effects };

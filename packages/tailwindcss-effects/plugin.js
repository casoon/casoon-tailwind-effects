/**
 * @casoon/tailwindcss-effects - Tailwind CSS Plugin Aggregator
 * 
 * Complete collection of modern CSS effects and utilities for Tailwind CSS v4.
 * This is a meta-package that combines all individual @casoon/tailwindcss-* packages.
 */

// Import all individual plugins
import animationsPlugin from '@casoon/tailwindcss-animations';
import glassPlugin from '@casoon/tailwindcss-glass';
import orbsPlugin from '@casoon/tailwindcss-orbs';
import gradientsPlugin from '@casoon/tailwindcss-gradients';
import scrollPlugin from '@casoon/tailwindcss-scroll';
import navigationPlugin from '@casoon/tailwindcss-navigation';
import utilitiesPlugin from '@casoon/tailwindcss-utilities';
import loadingPlugin from '@casoon/tailwindcss-loading';
import microInteractionsPlugin from '@casoon/tailwindcss-micro-interactions';

export default function effectsPlugin(options = {}) {
  return {
    handler: (api) => {
      // Execute all individual plugins with their respective options
      const plugins = [
        { plugin: utilitiesPlugin, options: options.utilities },
        { plugin: animationsPlugin, options: options.animations },
        { plugin: loadingPlugin, options: options.loading },
        { plugin: microInteractionsPlugin, options: options.microInteractions },
        { plugin: glassPlugin, options: options.glass },
        { plugin: orbsPlugin, options: options.orbs },
        { plugin: gradientsPlugin, options: options.gradients },
        { plugin: scrollPlugin, options: options.scroll },
        { plugin: navigationPlugin, options: options.navigation }
      ];

      // Execute each plugin's handler
      plugins.forEach(({ plugin, options: pluginOptions }) => {
        try {
          const pluginConfig = plugin(pluginOptions || {});
          if (pluginConfig && typeof pluginConfig.handler === 'function') {
            pluginConfig.handler(api);
          }
        } catch (error) {
          console.warn(`Warning: Could not load plugin ${plugin.name}:`, error.message);
        }
      });
    }
  };
}

// Export the main plugin as both default and named export
export { effectsPlugin, effectsPlugin as effects };

// Re-export individual plugins for direct import
export {
  animationsPlugin as animations,
  glassPlugin as glass,
  orbsPlugin as orbs,
  gradientsPlugin as gradients,
  scrollPlugin as scroll,
  navigationPlugin as navigation,
  utilitiesPlugin as utilities,
  loadingPlugin as loading,
  microInteractionsPlugin as microInteractions
};

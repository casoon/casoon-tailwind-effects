/**
 * @casoon/tailwindcss-effects - Tailwind CSS Plugin Aggregator
 * 
 * Complete collection of modern CSS effects and utilities for Tailwind CSS v4.
 * This is a meta-package that combines all individual @casoon/tailwindcss-* packages.
 */

// Import all individual plugins
import animationsPlugin from '../tailwindcss-animations/plugin.js';
import glassPlugin from '../tailwindcss-glass/plugin.js';
import orbsPlugin from '../tailwindcss-orbs/plugin.js';
import gradientsPlugin from '../tailwindcss-gradients/plugin.js';
import scrollPlugin from '../tailwindcss-scroll/plugin.js';
import navigationPlugin from '../tailwindcss-navigation/plugin.js';
import utilitiesPlugin from '../tailwindcss-utilities/plugin.js';
import loadingPlugin from '../tailwindcss-loading/plugin.js';
import microInteractionsPlugin from '../tailwindcss-micro-interactions/plugin.js';

// For Tailwind CSS v4, we need to create a single plugin object that combines all handlers
export default {
  handler: ({ addUtilities, addComponents, addBase, theme }) => {
    // Execute all individual plugin handlers
    const plugins = [
      utilitiesPlugin,
      animationsPlugin,
      loadingPlugin,
      microInteractionsPlugin,
      glassPlugin,
      orbsPlugin,
      gradientsPlugin,
      scrollPlugin,
      navigationPlugin
    ];

    // Execute each plugin's handler (all are now pure v4 objects)
    for (const plugin of plugins) {
      if (plugin && plugin.handler && typeof plugin.handler === 'function') {
        // This is a pure v4 plugin object with handler
        const fullAPI = { 
          addUtilities, 
          addComponents, 
          addBase, 
          addKeyframes: () => {}, // Mock for compatibility
          theme, 
          variants: () => [],
          e: (str) => str,
          prefix: (str) => str,
          addVariant: () => {},
          matchUtilities: () => {} 
        };
        plugin.handler(fullAPI);
      } else if (plugin && plugin['@layer utilities']) {
        // This is a v4 CSS object
        if (plugin['@layer utilities']) {
          addUtilities(plugin['@layer utilities']);
        }
        if (plugin['@layer components']) {
          addComponents(plugin['@layer components']);
        }
        if (plugin['@layer base']) {
          addBase(plugin['@layer base']);
        }
      } else {
        console.warn('Unknown plugin format:', plugin);
      }
    }
  }
};

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

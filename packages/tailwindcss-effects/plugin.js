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

export default function effectsPlugin(options = {}) {
  // Return array of plugins instead of single plugin with handler
  // This allows Tailwind's purging mechanism to properly detect CSS classes
  return [
    utilitiesPlugin(options.utilities || {}),
    animationsPlugin(options.animations || {}),
    loadingPlugin(options.loading || {}),
    microInteractionsPlugin(options.microInteractions || {}),
    glassPlugin(options.glass || {}),
    orbsPlugin(options.orbs || {}),
    gradientsPlugin(options.gradients || {}),
    scrollPlugin(options.scroll || {}),
    navigationPlugin(options.navigation || {})
  ].filter(Boolean); // Remove any undefined/null plugins
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

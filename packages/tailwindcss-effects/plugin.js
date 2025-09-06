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

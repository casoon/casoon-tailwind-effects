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

// For Tailwind CSS v4, we simply export an array of plugins
// Each plugin is now a properly constructed v4 plugin
const effectsPlugins = [
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

// Export as default and named export
export default effectsPlugins;
export { effectsPlugins as effects };

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

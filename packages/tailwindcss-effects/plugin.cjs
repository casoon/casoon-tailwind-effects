const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * @casoon/tailwindcss-effects - Tailwind CSS v4 Plugin (CommonJS)
 * 
 * Complete collection of animation and UI effects for Tailwind CSS v4
 * Native v4 plugin object with handler
 */

// Import all individual plugins
const animations = require('@casoon/tailwindcss-animations');
const glass = require('@casoon/tailwindcss-glass');
const gradients = require('@casoon/tailwindcss-gradients');
const loading = require('@casoon/tailwindcss-loading');
const microInteractions = require('@casoon/tailwindcss-micro-interactions');
const navigation = require('@casoon/tailwindcss-navigation');
const orbs = require('@casoon/tailwindcss-orbs');
const scroll = require('@casoon/tailwindcss-scroll');
const utilities = require('@casoon/tailwindcss-utilities');

// Meta plugin that calls all individual plugins
const plugin = {
  handler: (api) => {
    // Call each plugin's handler with the Tailwind API
    const plugins = [
      utilities,
      animations,
      glass,
      gradients,
      loading,
      microInteractions,
      navigation,
      orbs,
      scroll
    ];
    
    plugins.forEach(pluginObj => {
      if (pluginObj && typeof pluginObj.handler === 'function') {
        pluginObj.handler(api);
      } else if (typeof pluginObj === 'function') {
        // Support v3 plugins that are functions
        const result = pluginObj({});
        if (result && typeof result.handler === 'function') {
          result.handler(api);
        }
      }
    });
  }
};

module.exports = plugin;
module.exports.default = plugin;

#!/usr/bin/env node

import { readdir } from 'fs/promises';
import { join } from 'path';

const packagesDir = './packages';
const packages = await readdir(packagesDir);

for (const pkg of packages.slice(0, 3)) { // Test nur erste 3
  if (pkg.startsWith('tailwindcss-') && !pkg.includes('effects')) {
    try {
      const pluginPath = join(packagesDir, pkg, 'plugin.js');
      const { default: plugin } = await import(pluginPath);
      
      console.log(`\n=== ${pkg} ===`);
      console.log('typeof plugin:', typeof plugin);
      console.log('isArray:', Array.isArray(plugin));
      console.log('constructor:', plugin?.constructor?.name);
      
      if (typeof plugin === 'object' && plugin !== null) {
        console.log('Object keys:', Object.keys(plugin));
        console.log('Has config:', 'config' in plugin);
        console.log('Has __isPlugin:', '__isPlugin' in plugin);
        console.log('Has handler:', 'handler' in plugin);
        
        if (plugin.config && typeof plugin.config === 'function') {
          console.log('Config function exists - this is a v4 plugin!');
          
          // Test calling the config function
          const mockAPI = {
            addUtilities: (utils) => console.log('  Mock addUtilities called with', Object.keys(utils)),
            addComponents: (comps) => console.log('  Mock addComponents called with', Object.keys(comps)),
            addBase: (base) => console.log('  Mock addBase called with', Object.keys(base)),
            theme: () => ({}),
            variants: () => [],
            e: (str) => str,
            prefix: (str) => str,
            addVariant: () => {}
          };
          
          try {
            console.log('Calling plugin.config():');
            plugin.config(mockAPI);
            console.log('✅ Plugin executed successfully');
          } catch (error) {
            console.log('❌ Error calling config:', error.message);
          }
        }
      }
    } catch (error) {
      console.log(`${pkg}: ERROR - ${error.message}`);
    }
  }
}

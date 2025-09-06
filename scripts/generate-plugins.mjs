#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = join(__dirname, '..', 'packages');

// Template for package.json exports
const createPackageExports = (packageName) => ({
  ".": {
    "import": "./plugin.js",
    "require": "./plugin.cjs"
  },
  "./dist.css": "./dist.css",
  "./plugin": {
    "import": "./plugin.js",
    "require": "./plugin.cjs"
  },
  "./tokens.css": "./tokens.css"
});

// Template for ESM plugin
const createESMPlugin = (packageName, description) => `import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * ${packageName} - Tailwind CSS Plugin
 * 
 * ${description}
 */
export default function ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, theme }) => {
      // Load flattened CSS content
      let cssContent = '';
      try {
        cssContent = readFileSync(join(__dirname, 'dist.css'), 'utf8');
      } catch (err) {
        throw new Error('dist.css not found. Please ensure dist.css exists for ' + packageName);
      }
      
      // Parse CSS content and extract utilities/components
      // For now, inject as raw CSS - this will be optimized in future versions
      if (cssContent.includes('@layer components')) {
        const componentsMatch = cssContent.match(/@layer components \\{([\\s\\S]*?)\\}(?=\\s*(@layer|$))/);
        if (componentsMatch) {
          addComponents(componentsMatch[1]);
        }
      }
      
      if (cssContent.includes('@layer utilities')) {
        const utilitiesMatch = cssContent.match(/@layer utilities \\{([\\s\\S]*?)\\}(?=\\s*(@layer|$))/);
        if (utilitiesMatch) {
          addUtilities(utilitiesMatch[1]);
        }
      }
      
      // If no @layer detected, inject as utilities
      if (!cssContent.includes('@layer')) {
        addUtilities(cssContent);
      }
    },
    config: {
      theme: {
        extend: {
          // Package-specific theme extensions will be added here
        }
      }
    }
  };
}

// Export both default and named export for flexibility
export { ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin as ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')} };`;

// Template for CommonJS plugin
const createCJSPlugin = (packageName, description) => `const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * ${packageName} - Tailwind CSS Plugin (CommonJS)
 * 
 * ${description}
 */
function ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, theme }) => {
      // Load flattened CSS content
      let cssContent = '';
      try {
        cssContent = readFileSync(join(__dirname, 'dist.css'), 'utf8');
      } catch (err) {
        throw new Error('dist.css not found. Please ensure dist.css exists for ' + packageName);
      }
      
      // Parse CSS content and extract utilities/components
      // For now, inject as raw CSS - this will be optimized in future versions
      if (cssContent.includes('@layer components')) {
        const componentsMatch = cssContent.match(/@layer components \\{([\\s\\S]*?)\\}(?=\\s*(@layer|$))/);
        if (componentsMatch) {
          addComponents(componentsMatch[1]);
        }
      }
      
      if (cssContent.includes('@layer utilities')) {
        const utilitiesMatch = cssContent.match(/@layer utilities \\{([\\s\\S]*?)\\}(?=\\s*(@layer|$))/);
        if (utilitiesMatch) {
          addUtilities(utilitiesMatch[1]);
        }
      }
      
      // If no @layer detected, inject as utilities
      if (!cssContent.includes('@layer')) {
        addUtilities(cssContent);
      }
    },
    config: {
      theme: {
        extend: {
          // Package-specific theme extensions will be added here
        }
      }
    }
  };
}

module.exports = ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin;
module.exports.${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin = ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin;
module.exports.default = ${packageName.replace('@casoon/tailwindcss-', '').replace('-', '')}Plugin;`;

// Function to flatten CSS content (remove @layer nesting)
const flattenCSS = (cssContent) => {
  // Remove @layer wrappers while preserving content
  let flattened = cssContent
    .replace(/@layer\s+(components|utilities)\s*\{/g, '')
    .replace(/^\s*\}\s*$/gm, ''); // Remove standalone closing braces
  
  // Clean up excessive whitespace
  flattened = flattened
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
    
  return flattened;
};

// Main function to generate plugins for all packages
async function generatePlugins() {
  const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  console.log('🔧 Generating plugin architecture for packages...');
  
  for (const packageDir of packageDirs) {
    const packagePath = join(packagesDir, packageDir);
    const packageJsonPath = join(packagePath, 'package.json');
    
    if (!existsSync(packageJsonPath)) {
      console.log(`⚠️  Skipping ${packageDir} - no package.json found`);
      continue;
    }
    
    try {
      // Read package.json
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      const packageName = packageJson.name;
      
      console.log(`📦 Processing ${packageName}...`);
      
      // Update package.json with new exports
      packageJson.type = 'module';
      packageJson.exports = createPackageExports(packageName);
      packageJson.main = './plugin.cjs';
      packageJson.module = './plugin.js';
      
      // Update files array
      const newFiles = [
        'dist.css',
        'tokens.css',
        'plugin.js',
        'plugin.cjs',
        'README.md',
        'LICENSE'
      ];
      packageJson.files = newFiles;
      
      // Write updated package.json
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      
      // Create plugin files if they don't exist (skip animations as it's already done)
      if (packageDir !== 'tailwindcss-animations') {
        const pluginDescription = packageJson.description || `${packageName} utilities for Tailwind CSS v4`;
        
        // Create ESM plugin
        const esmPluginPath = join(packagePath, 'plugin.js');
        if (!existsSync(esmPluginPath)) {
          writeFileSync(esmPluginPath, createESMPlugin(packageName, pluginDescription));
        }
        
        // Create CJS plugin
        const cjsPluginPath = join(packagePath, 'plugin.cjs');
        if (!existsSync(cjsPluginPath)) {
          writeFileSync(cjsPluginPath, createCJSPlugin(packageName, pluginDescription));
        }
        
        // Skip CSS generation - dist.css should be the source of truth
        // For tailwindcss-animations, dist.css is already manually created
        // Other packages should follow the same pattern
      }
      
      console.log(`✅ Updated ${packageName}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${packageDir}:`, error.message);
    }
  }
  
  console.log('🎉 Plugin generation complete!');
}

// Run the script
generatePlugins().catch(console.error);

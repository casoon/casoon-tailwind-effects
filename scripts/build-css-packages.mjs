#!/usr/bin/env node

/**
 * Package CSS Build Script for @casoon/tailwindcss-* packages
 * 
 * This script generates index.css files directly in each package directory
 * from their plugin.js files. These CSS files are then published with npm
 * for direct import/linking (e.g. from GitHub CDN).
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class PackageCSSBuilder {
  constructor() {
    this.packagesDir = path.join(rootDir, 'packages');
    this.packageData = new Map();
  }

  /**
   * Discover all packages with plugins
   */
  async discoverPackages() {
    const packageJsonFiles = await glob('*/package.json', {
      cwd: this.packagesDir,
      absolute: true
    });

    for (const packageJsonPath of packageJsonFiles) {
      const packageDir = path.dirname(packageJsonPath);
      const packageName = path.basename(packageDir);
      const pluginPath = path.join(packageDir, 'plugin.js');
      
      try {
        await fs.access(pluginPath);
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
        
        this.packageData.set(packageName, {
          name: packageName,
          fullName: packageJson.name,
          version: packageJson.version,
          description: packageJson.description || '',
          packageDir,
          pluginPath,
          packageJsonPath,
          packageJson
        });
      } catch (error) {
        // Skip packages without plugin.js
        console.log(`${colors.yellow}⚠️  Skipping ${packageName}: No plugin.js found${colors.reset}`);
      }
    }

    return Array.from(this.packageData.keys());
  }

  /**
   * Generate CSS from a Tailwind plugin
   */
  async generateCSSFromPlugin(packageName, pluginPath) {
    try {
      const { default: plugin } = await import(pluginPath);
      
      if (typeof plugin !== 'function') {
        console.log(`${colors.yellow}⚠️  ${packageName}: Plugin is not a function${colors.reset}`);
        return null;
      }

      let cssOutput = '';
      
      // CSS generation helpers
      const generateCSS = (selector, styles) => {
        const cssRules = [];
        
        const processStyles = (styles, currentSelector = selector) => {
          Object.entries(styles).forEach(([property, value]) => {
            if (property.startsWith('&')) {
              // Handle pseudo-selectors like &:hover
              const newSelector = currentSelector + property.substring(1);
              processStyles(value, newSelector);
              return;
            }
            
            if (typeof value === 'object' && value !== null) {
              // Handle nested rules (like media queries)
              if (property.startsWith('@')) {
                cssRules.push(`${property} {`);
                cssRules.push(`  ${currentSelector} {`);
                Object.entries(value).forEach(([nestedProp, nestedValue]) => {
                  cssRules.push(`    ${nestedProp}: ${nestedValue};`);
                });
                cssRules.push(`  }`);
                cssRules.push(`}`);
              } else {
                // Handle pseudo-selectors and nested elements
                const nestedSelector = property.startsWith('&') 
                  ? currentSelector + property.substring(1)
                  : `${currentSelector} ${property}`;
                processStyles(value, nestedSelector);
              }
            } else {
              cssRules.push(`  ${property}: ${value};`);
            }
          });
        };
        
        cssRules.push(`${selector} {`);
        processStyles(styles);
        cssRules.push(`}`);
        
        return cssRules.join('\n');
      };

      // Mock Tailwind plugin API to capture CSS
      const mockAddUtilities = (utilities) => {
        cssOutput += '\n/* === Utilities === */\n';
        
        Object.entries(utilities).forEach(([selector, styles]) => {
          if (selector.startsWith('.')) {
            cssOutput += generateCSS(selector, styles) + '\n\n';
          }
        });
      };
      
      const mockAddComponents = (components) => {
        cssOutput += '\n/* === Components === */\n';
        
        Object.entries(components).forEach(([selector, styles]) => {
          if (selector.startsWith('.') || selector.startsWith(':')) {
            cssOutput += generateCSS(selector, styles) + '\n\n';
          }
        });
      };
      
      const mockAddBase = (base) => {
        cssOutput += '\n/* === Base Styles === */\n';
        Object.entries(base).forEach(([selector, styles]) => {
          if (typeof styles === 'object') {
            cssOutput += generateCSS(selector, styles) + '\n\n';
          }
        });
      };

      let keyframesOutput = '';
      const mockAddKeyframes = (keyframes) => {
        Object.entries(keyframes).forEach(([name, frames]) => {
          keyframesOutput += `\n@keyframes ${name} {\n`;
          Object.entries(frames).forEach(([percentage, styles]) => {
            keyframesOutput += `  ${percentage} {\n`;
            Object.entries(styles).forEach(([prop, value]) => {
              keyframesOutput += `    ${prop}: ${value};\n`;
            });
            keyframesOutput += `  }\n`;
          });
          keyframesOutput += `}\n`;
        });
      };
      
      // Execute the plugin
      try {
        const pluginConfig = plugin();
        if (pluginConfig && pluginConfig.handler) {
          pluginConfig.handler({
            addUtilities: mockAddUtilities,
            addComponents: mockAddComponents,
            addBase: mockAddBase,
            addKeyframes: mockAddKeyframes,
            theme: () => ({}),
            variants: () => [],
            e: (str) => str,
            prefix: (str) => str,
            addVariant: () => {},
            matchUtilities: () => {}
          });
        }
      } catch (pluginError) {
        console.log(`${colors.yellow}⚠️  ${packageName}: Error executing plugin - ${pluginError.message}${colors.reset}`);
        return null;
      }

      return keyframesOutput + cssOutput;
    } catch (error) {
      console.error(`${colors.red}Error generating CSS for ${packageName}:${colors.reset}`, error.message);
      return null;
    }
  }

  /**
   * Update package.json to include CSS files
   */
  async updatePackageJson(packageInfo) {
    const packageJson = packageInfo.packageJson;
    
    // Add index.css to files array if not present
    if (!packageJson.files) {
      packageJson.files = [];
    }
    
    if (!packageJson.files.includes('index.css')) {
      packageJson.files.push('index.css');
    }
    
    // Add CSS export to exports
    if (!packageJson.exports) {
      packageJson.exports = {};
    }
    
    packageJson.exports['./css'] = './index.css';
    packageJson.exports['./index.css'] = './index.css';
    
    // Write updated package.json
    await fs.writeFile(
      packageInfo.packageJsonPath, 
      JSON.stringify(packageJson, null, 2) + '\n'
    );
    
    console.log(`${colors.blue}📝 Updated package.json for ${packageInfo.name}${colors.reset}`);
  }

  /**
   * Build CSS files for all packages
   */
  async buildAllPackageCSS() {
    console.log(`${colors.cyan}${colors.bright}🏗️  Building index.css files in packages...${colors.reset}\n`);
    
    // Discover packages
    const packages = await this.discoverPackages();
    console.log(`${colors.blue}📦 Found ${packages.length} packages to build${colors.reset}\n`);
    
    for (const packageName of packages) {
      const packageInfo = this.packageData.get(packageName);
      console.log(`${colors.blue}🔨 Building CSS for ${packageName}...${colors.reset}`);
      
      const css = await this.generateCSSFromPlugin(packageName, packageInfo.pluginPath);
      
      if (css) {
        // Write CSS file directly to package directory
        const cssPath = path.join(packageInfo.packageDir, 'index.css');
        const header = `/*!
 * ${packageInfo.fullName} v${packageInfo.version}
 * ${packageInfo.description}
 * 
 * Generated from plugin.js - DO NOT EDIT MANUALLY
 * Build date: ${new Date().toISOString()}
 * 
 * Import via:
 * - CDN: https://cdn.jsdelivr.net/${packageInfo.fullName}@${packageInfo.version}/index.css
 * - GitHub: https://raw.githubusercontent.com/casoon-tailwind-effects/main/packages/${packageName}/index.css
 */

`;
        
        await fs.writeFile(cssPath, header + css.trim() + '\n');
        console.log(`${colors.green}✅ Generated: ${cssPath}${colors.reset}`);
        
        // Update package.json
        await this.updatePackageJson(packageInfo);
      } else {
        console.log(`${colors.red}❌ Failed to generate CSS for ${packageName}${colors.reset}`);
      }
      
      console.log(''); // Empty line for readability
    }
    
    console.log(`${colors.green}${colors.bright}🎉 Package CSS build completed!${colors.reset}`);
    console.log(`${colors.cyan}Each package now has an index.css file that will be published with npm.${colors.reset}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new PackageCSSBuilder();
  builder.buildAllPackageCSS().catch(error => {
    console.error(`${colors.red}Fatal build error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { PackageCSSBuilder };

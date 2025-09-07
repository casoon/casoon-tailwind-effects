#!/usr/bin/env node

/**
 * CSS Build Script for @casoon/tailwindcss-* packages
 * 
 * This script generates standalone CSS files from Tailwind plugins using 
 * the Tailwind CSS API directly. Perfect for users who want pure CSS
 * without setting up the full Tailwind build process.
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

class CSSBuilder {
  constructor() {
    this.packagesDir = path.join(rootDir, 'packages');
    this.outputDir = path.join(rootDir, 'dist');
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
          description: packageJson.description,
          packageDir,
          pluginPath,
          packageJsonPath
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
      
      // Handle v4 plugin structure - now that tailwindcss is installed
      const isV4CSSObject = plugin && typeof plugin === 'object' && plugin['@layer utilities'];
      const isV4Array = Array.isArray(plugin);
      const isV4Plugin = plugin && typeof plugin === 'object' && (plugin.__isPlugin || plugin.config);
      const isFunction = typeof plugin === 'function';
      
      if (!plugin || (!isV4CSSObject && !isV4Array && !isV4Plugin && !isFunction)) {
        console.log(`${colors.yellow}⚠️  ${packageName}: Unknown plugin format${colors.reset}`);
        return null;
      }

      let cssOutput = '';
      
      // CSS generation helpers
      const generateCSS = (selector, styles, isComponent = false) => {
        const cssRules = [];
        
        const processStyles = (styles, currentSelector = selector) => {
          Object.entries(styles).forEach(([property, value]) => {
            if (property.startsWith('&')) {
              // Handle pseudo-selectors like &:hover
              const newSelector = currentSelector + property.substring(1);
              processStyles({ [Object.keys(value)[0] || 'dummy']: Object.values(value)[0] }, newSelector);
              return;
            }
            
            if (typeof value === 'object' && value !== null) {
              // Handle nested rules (like media queries)
              if (property.startsWith('@')) {
                cssRules.push(`${property} {`);
                cssRules.push(`  ${currentSelector} {`);
                Object.entries(value).forEach(([nestedProp, nestedValue]) => {
                  if (typeof nestedValue === 'object') {
                    // Handle nested pseudo-selectors in media queries
                    Object.entries(nestedValue).forEach(([pseudoProp, pseudoValue]) => {
                      cssRules.push(`    ${pseudoProp}: ${pseudoValue};`);
                    });
                  } else {
                    cssRules.push(`    ${nestedProp}: ${nestedValue};`);
                  }
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
        
        // Handle media queries and supports at the top level
        Object.entries(styles).forEach(([key, value]) => {
          if (key.startsWith('@media') || key.startsWith('@supports')) {
            cssRules.push(`${key} {`);
            if (typeof value === 'object') {
              Object.entries(value).forEach(([nestedSelector, nestedStyles]) => {
                cssRules.push(`  ${nestedSelector} {`);
                Object.entries(nestedStyles).forEach(([prop, val]) => {
                  if (typeof val === 'object') {
                    // Handle nested pseudo-selectors
                    Object.entries(val).forEach(([pseudoProp, pseudoVal]) => {
                      cssRules.push(`    ${pseudoProp}: ${pseudoVal};`);
                    });
                  } else {
                    cssRules.push(`    ${prop}: ${val};`);
                  }
                });
                cssRules.push(`  }`);
              });
            }
            cssRules.push(`}`);
            return;
          }
        });
        
        // Handle regular styles
        if (!Object.keys(styles).some(key => key.startsWith('@'))) {
          cssRules.unshift(`${selector} {`);
          processStyles(styles);
          cssRules.push(`}`);
        }
        
        return cssRules.join('\n');
      };

      // Mock Tailwind plugin API to capture CSS
      const mockAddUtilities = (utilities) => {
        cssOutput += '\n/* === Utilities === */\n';
        
        const processUtilityObject = (obj, parentKey = '') => {
          Object.entries(obj).forEach(([key, value]) => {
            if (key.startsWith('.')) {
              // This is a CSS class
              cssOutput += generateCSS(key, value, false) + '\n\n';
            } else if (typeof value === 'object' && value !== null && !key.startsWith('@')) {
              // This might be a nested structure like layers
              processUtilityObject(value, key);
            } else if (key.startsWith('@')) {
              // This is a media query or similar
              cssOutput += generateCSS(key, value, false) + '\n\n';
            }
          });
        };
        
        processUtilityObject(utilities);
      };
      
      const mockAddComponents = (components) => {
        cssOutput += '\n/* === Components === */\n';
        
        const processComponentObject = (obj) => {
          Object.entries(obj).forEach(([key, value]) => {
            if (key.startsWith('.')) {
              cssOutput += generateCSS(key, value, true) + '\n\n';
            } else if (typeof value === 'object' && value !== null && !key.startsWith('@')) {
              processComponentObject(value);
            } else if (key.startsWith('@')) {
              cssOutput += generateCSS(key, value, true) + '\n\n';
            }
          });
        };
        
        processComponentObject(components);
      };
      
      const mockAddBase = (base) => {
        cssOutput += '\n/* === Base Styles === */\n';
        Object.entries(base).forEach(([selector, styles]) => {
          if (typeof styles === 'object') {
            cssOutput += generateCSS(selector, styles, false) + '\n\n';
          }
        });
      };
      
      // Execute the plugin based on its type
      try {
        if (isV4CSSObject) {
          // Handle pure CSS object (like utilities plugin)
          console.log(`${colors.cyan}  📄 ${packageName}: Processing pure CSS object${colors.reset}`);
          if (plugin['@layer utilities']) {
            mockAddUtilities(plugin['@layer utilities']);
          }
          if (plugin['@layer components']) {
            mockAddComponents(plugin['@layer components']);
          }
          if (plugin['@layer base']) {
            mockAddBase(plugin['@layer base']);
          }
        } else if (isV4Array) {
          // Handle plugin array (like effects meta-package)
          console.log(`${colors.cyan}  📁 ${packageName}: Processing plugin array with ${plugin.length} plugins${colors.reset}`);
          for (const subPlugin of plugin) {
            // Recursively process each plugin in the array
            await this.processIndividualPlugin(subPlugin, mockAddUtilities, mockAddComponents, mockAddBase);
          }
        } else if (isV4Plugin) {
          // Handle v4 plugin objects - use handler for actual CSS generation
          console.log(`${colors.cyan}  🔧 ${packageName}: Processing v4 plugin object${colors.reset}`);
          if (plugin.handler && typeof plugin.handler === 'function') {
            plugin.handler({
              addUtilities: mockAddUtilities,
              addComponents: mockAddComponents,
              addBase: mockAddBase,
              theme: () => ({}),
              variants: () => [],
              e: (str) => str,
              prefix: (str) => str,
              addVariant: () => {}
            });
          } else {
            console.log(`${colors.yellow}  ⚠️  No handler found in plugin object${colors.reset}`);
          }
        } else if (isFunction) {
          // Handle v4 plugin functions (direct call) or v3 functions
          console.log(`${colors.cyan}  🔧 ${packageName}: Processing plugin function${colors.reset}`);
          
          try {
            // Try calling directly as v4 plugin function
            plugin({
              addUtilities: mockAddUtilities,
              addComponents: mockAddComponents,
              addBase: mockAddBase,
              theme: () => ({}),
              variants: () => [],
              e: (str) => str,
              prefix: (str) => str,
              addVariant: () => {}
            });
          } catch (directCallError) {
            // If that fails, try as v3-style plugin
            try {
              const pluginConfig = plugin();
              if (pluginConfig && pluginConfig.handler) {
                pluginConfig.handler({
                  addUtilities: mockAddUtilities,
                  addComponents: mockAddComponents,
                  addBase: mockAddBase,
                  addKeyframes: () => {}, // Mock for keyframes
                  theme: () => ({}),
                  variants: () => [],
                  e: (str) => str,
                  prefix: (str) => str,
                  addVariant: () => {}
                });
              }
            } catch (v3Error) {
              throw new Error(`Could not execute plugin: ${directCallError.message}`);
            }
          }
        }
      } catch (pluginError) {
        console.log(`${colors.yellow}⚠️  ${packageName}: Error executing plugin - ${pluginError.message}${colors.reset}`);
        return null;
      }

      return cssOutput;
    } catch (error) {
      console.error(`${colors.red}Error generating CSS for ${packageName}:${colors.reset}`, error.message);
      return null;
    }
  }

  /**
   * Process individual v4 plugin for arrays (like effects meta-package)
   */
  async processIndividualPlugin(plugin, mockAddUtilities, mockAddComponents, mockAddBase) {
    if (!plugin) return;
    
    // Check if it's a v4 plugin object with handler
    if (typeof plugin === 'object' && plugin !== null && plugin.handler) {
      plugin.handler({
        addUtilities: mockAddUtilities,
        addComponents: mockAddComponents,
        addBase: mockAddBase,
        theme: () => ({}),
        variants: () => [],
        e: (str) => str,
        prefix: (str) => str,
        addVariant: () => {}
      });
    } else if (typeof plugin === 'function') {
      // Try calling as function (might be v4 plugin function)
      try {
        plugin({
          addUtilities: mockAddUtilities,
          addComponents: mockAddComponents,
          addBase: mockAddBase,
          theme: () => ({}),
          variants: () => [],
          e: (str) => str,
          prefix: (str) => str,
          addVariant: () => {}
        });
      } catch (error) {
        // If direct call fails, try as v3-style plugin
        const pluginResult = plugin();
        if (pluginResult && pluginResult.handler) {
          pluginResult.handler({
            addUtilities: mockAddUtilities,
            addComponents: mockAddComponents,
            addBase: mockAddBase,
            addKeyframes: () => {},
            theme: () => ({}),
            variants: () => [],
            e: (str) => str,
            prefix: (str) => str,
            addVariant: () => {}
          });
        }
      }
    } else if (typeof plugin === 'object' && plugin !== null) {
      // Handle CSS object
      if (plugin['@layer utilities']) {
        mockAddUtilities(plugin['@layer utilities']);
      }
      if (plugin['@layer components']) {
        mockAddComponents(plugin['@layer components']);
      }
      if (plugin['@layer base']) {
        mockAddBase(plugin['@layer base']);
      }
    }
  }

  /**
   * Build CSS files for all packages
   */
  async buildAllCSS() {
    console.log(`${colors.cyan}${colors.bright}🏗️  Building CSS files from Tailwind plugins...${colors.reset}\n`);
    
    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });
    
    // Discover packages
    const packages = await this.discoverPackages();
    console.log(`${colors.blue}📦 Found ${packages.length} packages to build${colors.reset}\n`);
    
    for (const packageName of packages) {
      const packageInfo = this.packageData.get(packageName);
      console.log(`${colors.blue}🔨 Building CSS for ${packageName}...${colors.reset}`);
      
      const css = await this.generateCSSFromPlugin(packageName, packageInfo.pluginPath);
      
      if (css) {
        // Create package-specific output directory
        const packageOutputDir = path.join(this.outputDir, packageName);
        await fs.mkdir(packageOutputDir, { recursive: true });
        
        // Write CSS file
        const cssPath = path.join(packageOutputDir, 'index.css');
        const header = `/*!
 * ${packageInfo.fullName} v${packageInfo.version}
 * ${packageInfo.description}
 * 
 * Generated from Tailwind CSS plugin
 * Build date: ${new Date().toISOString()}
 */\n\n`;
        
        await fs.writeFile(cssPath, header + css);
        console.log(`${colors.green}✅ Generated: ${cssPath}${colors.reset}`);
        
        // Also create minified version (simple minification)
        const minifiedCSS = css
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\s+/g, ' ') // Collapse whitespace
          .replace(/;\s*}/g, '}') // Clean up semicolons before closing braces
          .replace(/\{\s+/g, '{') // Clean up opening braces
          .trim();
          
        const minCssPath = path.join(packageOutputDir, 'index.min.css');
        await fs.writeFile(minCssPath, header.replace('Generated from', 'Minified CSS generated from') + minifiedCSS);
        console.log(`${colors.green}✅ Generated: ${minCssPath}${colors.reset}`);
        
        // Generate package info
        const packageInfo_output = {
          name: packageInfo.fullName,
          version: packageInfo.version,
          description: packageInfo.description,
          files: {
            css: 'index.css',
            minified: 'index.min.css'
          },
          buildDate: new Date().toISOString()
        };
        
        const infoPath = path.join(packageOutputDir, 'package.json');
        await fs.writeFile(infoPath, JSON.stringify(packageInfo_output, null, 2));
      } else {
        console.log(`${colors.red}❌ Failed to generate CSS for ${packageName}${colors.reset}`);
      }
      
      console.log(''); // Empty line for readability
    }
    
    console.log(`${colors.green}${colors.bright}🎉 CSS build completed! Files available in: ${this.outputDir}${colors.reset}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new CSSBuilder();
  builder.buildAllCSS().catch(error => {
    console.error(`${colors.red}Fatal build error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { CSSBuilder };

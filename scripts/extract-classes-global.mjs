#!/usr/bin/env node

/**
 * Global Class Extraction and Comparison Script for @casoon/tailwindcss-* packages
 * 
 * This script scans all packages in the monorepo, extracts CSS classes from
 * their plugin.js files, syncs versions from package.json, and compares them
 * with the global class-definitions.json file to detect breaking changes.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ANSI colors for console output
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

class GlobalClassExtractor {
  constructor() {
    this.rootDir = rootDir;
    this.packagesDir = path.join(rootDir, 'packages');
    this.definitionsPath = path.join(rootDir, 'class-definitions.json');
    this.packageData = new Map();
    this.extractedClasses = new Map(); // packageName -> Set<className>
    this.definedClasses = new Map();   // packageName -> Set<className>
    this.packageVersions = new Map();  // packageName -> version
  }

  /**
   * Discover all packages in the monorepo
   */
  async discoverPackages() {
    try {
      const packageJsonFiles = await glob('*/package.json', {
        cwd: this.packagesDir,
        absolute: true
      });

      for (const packageJsonPath of packageJsonFiles) {
        const packageDir = path.dirname(packageJsonPath);
        const packageName = path.basename(packageDir);
        const pluginPath = path.join(packageDir, 'plugin.js');
        
        // Check if plugin.js exists
        try {
          await fs.access(pluginPath);
          
          // Read package.json
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

          this.packageVersions.set(packageName, packageJson.version);
          
        } catch (error) {
          // Skip packages without plugin.js
          console.log(`${colors.yellow}⚠️  Skipping ${packageName}: No plugin.js found${colors.reset}`);
        }
      }

      console.log(`${colors.blue}📦 Discovered ${this.packageData.size} packages with plugins${colors.reset}`);
      return Array.from(this.packageData.keys());
    } catch (error) {
      console.error(`${colors.red}Error discovering packages:${colors.reset}`, error.message);
      process.exit(1);
    }
  }

  /**
   * Extract CSS class names from a plugin.js file using Tailwind Plugin API (v4 compatible)
   */
  async extractClassesFromPlugin(pluginPath, packageName) {
    try {
      // Import the plugin dynamically
      const { default: plugin } = await import(pluginPath);
      
      // Check plugin format (v4 supports objects, arrays, and functions)
      const isV4CSSObject = plugin && typeof plugin === 'object' && plugin['@layer utilities'];
      const isV4Array = Array.isArray(plugin);
      const isV4Plugin = plugin && typeof plugin === 'object' && (plugin.__isPlugin || plugin.config || plugin.handler);
      const isFunction = typeof plugin === 'function';
      
      if (!plugin || (!isV4CSSObject && !isV4Array && !isV4Plugin && !isFunction)) {
        console.log(`${colors.yellow}⚠️  ${packageName}: Unknown plugin format${colors.reset}`);
        this.extractedClasses.set(packageName, new Set());
        return [];
      }

      const classes = new Set();
      
      // Mock Tailwind plugin API to capture class names
      const mockAddUtilities = (utilities) => {
        // Handle nested layer objects like '@layer glass-utilities': { '.glass': {...} }
        const extractFromUtilitiesObj = (obj, prefix = '') => {
          Object.keys(obj).forEach(key => {
            if (key.startsWith('.')) {
              classes.add(key);
              if (packageName === 'tailwindcss-utilities' || packageName === 'tailwindcss-glass') {
                console.log(`${colors.green}Found utility: ${key}${colors.reset}`);
              }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              extractFromUtilitiesObj(obj[key], key);
            }
          });
        };
        
        extractFromUtilitiesObj(utilities);
      };
      
      const mockAddComponents = (components) => {
        // Handle nested layer objects like '@layer glass-components': { '.glass-card': {...} }
        const extractFromComponentsObj = (obj) => {
          Object.keys(obj).forEach(key => {
            if (key.startsWith('.')) {
              classes.add(key);
              if (packageName === 'tailwindcss-utilities' || packageName === 'tailwindcss-glass') {
                console.log(`${colors.green}Found component: ${key}${colors.reset}`);
              }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              extractFromComponentsObj(obj[key]);
            }
          });
        };
        
        extractFromComponentsObj(components);
      };
      
      const mockAddBase = (base) => {
        // Base styles might contain classes too, but usually don't
        if (typeof base === 'object') {
          Object.keys(base).forEach(selector => {
            if (selector.startsWith('.')) {
              classes.add(selector);
            }
          });
        }
      };
      
      // Execute the plugin based on its type (v4 compatible)
      try {
        if (isV4CSSObject) {
          // Handle pure CSS object (like utilities plugin)
          console.log(`${colors.cyan}  📄 ${packageName}: Processing v4 CSS object${colors.reset}`);
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
          console.log(`${colors.cyan}  📁 ${packageName}: Processing v4 plugin array with ${plugin.length} plugins${colors.reset}`);
          for (const subPlugin of plugin) {
            await this.processIndividualPlugin(subPlugin, mockAddUtilities, mockAddComponents, mockAddBase, packageName);
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
              addVariant: () => {},
              addKeyframes: () => {}
            });
          } else {
            console.log(`${colors.yellow}  ⚠️  No handler found in v4 plugin object${colors.reset}`);
          }
        } else if (isFunction) {
          // Handle v3/v4 plugin functions
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
              addVariant: () => {},
              addKeyframes: () => {}
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
                  theme: () => ({}),
                  variants: () => [],
                  e: (str) => str,
                  prefix: (str) => str,
                  addVariant: () => {},
                  addKeyframes: () => {}
                });
              }
            } catch (v3Error) {
              throw new Error(`Could not execute plugin: ${directCallError.message}`);
            }
          }
        }
      } catch (pluginError) {
        console.log(`${colors.yellow}⚠️  ${packageName}: Error executing plugin - ${pluginError.message}${colors.reset}`);
      }

      this.extractedClasses.set(packageName, classes);
      return Array.from(classes).sort();
    } catch (error) {
      console.error(`${colors.red}Error extracting classes from ${packageName}:${colors.reset}`, error.message);
      this.extractedClasses.set(packageName, new Set());
      return [];
    }
  }

  /**
   * Process individual v4 plugin for arrays (like effects meta-package)
   */
  async processIndividualPlugin(plugin, mockAddUtilities, mockAddComponents, mockAddBase, packageName) {
    if (!plugin) return;
    
    try {
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
          addVariant: () => {},
          addKeyframes: () => {}
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
            addVariant: () => {},
            addKeyframes: () => {}
          });
        } catch (error) {
          // If direct call fails, try as v3-style plugin
          const pluginResult = plugin();
          if (pluginResult && pluginResult.handler) {
            pluginResult.handler({
              addUtilities: mockAddUtilities,
              addComponents: mockAddComponents,
              addBase: mockAddBase,
              theme: () => ({}),
              variants: () => [],
              e: (str) => str,
              prefix: (str) => str,
              addVariant: () => {},
              addKeyframes: () => {}
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
    } catch (error) {
      console.log(`${colors.yellow}  ⚠️  Error processing individual plugin in ${packageName}: ${error.message}${colors.reset}`);
    }
  }

  /**
   * Load and sync versions in class definitions
   */
  async loadAndSyncDefinitions() {
    try {
      const definitionsContent = await fs.readFile(this.definitionsPath, 'utf-8');
      const definitions = JSON.parse(definitionsContent);
      
      // Sync versions from package.json files
      let needsUpdate = false;
      for (const [packageName, packageInfo] of this.packageData) {
        if (definitions.packages[packageName]) {
          const currentVersion = definitions.packages[packageName].version;
          const actualVersion = packageInfo.version;
          
          if (currentVersion === 'auto' || currentVersion !== actualVersion) {
            definitions.packages[packageName].version = actualVersion;
            needsUpdate = true;
          }
        }
      }

      // Update monorepo version from root package.json
      try {
        const rootPackageJson = JSON.parse(await fs.readFile(path.join(this.rootDir, 'package.json'), 'utf-8'));
        if (definitions.monorepoVersion === 'auto' || definitions.monorepoVersion !== rootPackageJson.version) {
          definitions.monorepoVersion = rootPackageJson.version;
          needsUpdate = true;
        }
      } catch (error) {
        console.log(`${colors.yellow}⚠️  Could not sync monorepo version${colors.reset}`);
      }

      // Update lastUpdated timestamp if changes were made
      if (needsUpdate) {
        definitions.lastUpdated = new Date().toISOString();
        await fs.writeFile(this.definitionsPath, JSON.stringify(definitions, null, 2));
        console.log(`${colors.green}✅ Synced versions in class-definitions.json${colors.reset}`);
      }

      // Flatten defined classes for each package
      for (const [packageName, packageConfig] of Object.entries(definitions.packages)) {
        const classes = new Set();
        
        // Add utilities
        Object.values(packageConfig.utilities || {}).forEach(classArray => {
          if (Array.isArray(classArray)) {
            classArray.forEach(cls => classes.add(cls));
          }
        });
        
        // Add components  
        Object.values(packageConfig.components || {}).forEach(classArray => {
          if (Array.isArray(classArray)) {
            classArray.forEach(cls => classes.add(cls));
          }
        });

        this.definedClasses.set(packageName, classes);
      }

      return definitions;
    } catch (error) {
      console.error(`${colors.red}Error loading definitions:${colors.reset}`, error.message);
      process.exit(1);
    }
  }

  /**
   * Compare extracted vs defined classes for a package
   */
  comparePackageClasses(packageName) {
    const extracted = Array.from(this.extractedClasses.get(packageName) || []);
    const defined = Array.from(this.definedClasses.get(packageName) || []);
    
    const missing = defined.filter(cls => !this.extractedClasses.get(packageName)?.has(cls));
    const newClasses = extracted.filter(cls => !this.definedClasses.get(packageName)?.has(cls));
    const common = extracted.filter(cls => this.definedClasses.get(packageName)?.has(cls));

    return {
      extracted: extracted.sort(),
      defined: defined.sort(),
      missing: missing.sort(),
      new: newClasses.sort(),
      common: common.sort()
    };
  }

  /**
   * Generate comprehensive report for all packages
   */
  generateGlobalReport(comparisons, definitions) {
    const report = {
      timestamp: new Date().toISOString(),
      monorepoVersion: definitions.monorepoVersion,
      summary: {
        totalPackages: 0,
        packagesWithIssues: 0,
        totalExtracted: 0,
        totalDefined: 0,
        totalMissing: 0,
        totalNew: 0
      },
      packages: {},
      criticalIssues: [],
      warnings: [],
      versionInfo: Object.fromEntries(this.packageVersions)
    };

    for (const [packageName, comparison] of Object.entries(comparisons)) {
      report.summary.totalPackages++;
      report.summary.totalExtracted += comparison.extracted.length;
      report.summary.totalDefined += comparison.defined.length;
      report.summary.totalMissing += comparison.missing.length;
      report.summary.totalNew += comparison.new.length;

      if (comparison.missing.length > 0 || comparison.new.length > 0) {
        report.summary.packagesWithIssues++;
      }

      report.packages[packageName] = {
        version: this.packageVersions.get(packageName),
        summary: {
          extracted: comparison.extracted.length,
          defined: comparison.defined.length,
          missing: comparison.missing.length,
          new: comparison.new.length,
          common: comparison.common.length
        },
        details: comparison
      };

      // Check for critical issues
      const packageConfig = definitions.packages[packageName];
      const criticalClasses = packageConfig?.criticalClasses || [];
      const missingCritical = comparison.missing.filter(cls => criticalClasses.includes(cls));
      
      if (missingCritical.length > 0) {
        report.criticalIssues.push({
          type: 'MISSING_CRITICAL_CLASSES',
          package: packageName,
          message: `Critical classes missing from ${packageName}`,
          classes: missingCritical
        });
      }

      // Add warnings
      if (comparison.missing.length > 0) {
        report.warnings.push({
          type: 'MISSING_CLASSES',
          package: packageName,
          message: `${comparison.missing.length} defined classes missing from ${packageName}`,
          classes: comparison.missing
        });
      }

      if (comparison.new.length > 0) {
        report.warnings.push({
          type: 'NEW_CLASSES',
          package: packageName,
          message: `${comparison.new.length} new classes found in ${packageName}`,
          classes: comparison.new
        });
      }
    }

    return report;
  }

  /**
   * Print comprehensive colored report
   */
  printGlobalReport(report) {
    console.log(`\\n${colors.cyan}${colors.bright}=== Global Class Analysis Report ===${colors.reset}`);
    console.log(`${colors.blue}Generated:${colors.reset} ${report.timestamp}`);
    console.log(`${colors.blue}Monorepo Version:${colors.reset} ${report.monorepoVersion}`);
    
    // Global Summary
    console.log(`\\n${colors.bright}Global Summary:${colors.reset}`);
    console.log(`  Packages Analyzed: ${colors.blue}${report.summary.totalPackages}${colors.reset}`);
    console.log(`  Packages with Issues: ${colors.yellow}${report.summary.packagesWithIssues}${colors.reset}`);
    console.log(`  Total Extracted: ${colors.green}${report.summary.totalExtracted}${colors.reset} classes`);
    console.log(`  Total Defined: ${colors.blue}${report.summary.totalDefined}${colors.reset} classes`);
    console.log(`  Total Missing: ${colors.red}${report.summary.totalMissing}${colors.reset} classes`);
    console.log(`  Total New: ${colors.yellow}${report.summary.totalNew}${colors.reset} classes`);

    // Package Details
    console.log(`\\n${colors.bright}Package Details:${colors.reset}`);
    for (const [packageName, packageReport] of Object.entries(report.packages)) {
      const status = (packageReport.summary.missing > 0 || packageReport.summary.new > 0) 
        ? `${colors.yellow}⚠️` : `${colors.green}✅`;
      
      console.log(`  ${status} ${colors.bright}${packageName}${colors.reset} (v${packageReport.version})`);
      console.log(`    Extracted: ${colors.green}${packageReport.summary.extracted}${colors.reset}, ` +
                  `Defined: ${colors.blue}${packageReport.summary.defined}${colors.reset}, ` +
                  `Missing: ${colors.red}${packageReport.summary.missing}${colors.reset}, ` +
                  `New: ${colors.yellow}${packageReport.summary.new}${colors.reset}`);
      
      if (packageReport.summary.missing > 0) {
        console.log(`      Missing: ${packageReport.details.missing.slice(0, 3).join(', ')}` +
                    (packageReport.details.missing.length > 3 ? ` +${packageReport.details.missing.length - 3} more` : ''));
      }
      if (packageReport.summary.new > 0) {
        console.log(`      New: ${packageReport.details.new.slice(0, 3).join(', ')}` +
                    (packageReport.details.new.length > 3 ? ` +${packageReport.details.new.length - 3} more` : ''));
      }
    }

    // Critical Issues
    if (report.criticalIssues.length > 0) {
      console.log(`\\n${colors.red}${colors.bright}🚨 CRITICAL ISSUES:${colors.reset}`);
      report.criticalIssues.forEach(issue => {
        console.log(`  ${colors.red}●${colors.reset} [${issue.package}] ${issue.message}`);
        issue.classes.slice(0, 5).forEach(cls => {
          console.log(`    ${colors.red}- ${cls}${colors.reset}`);
        });
        if (issue.classes.length > 5) {
          console.log(`    ${colors.red}... and ${issue.classes.length - 5} more${colors.reset}`);
        }
      });
    }

    // Success or failure message
    if (report.criticalIssues.length === 0) {
      console.log(`\\n${colors.green}✅ No critical breaking changes detected across all packages!${colors.reset}`);
    } else {
      console.log(`\\n${colors.red}💥 ${report.criticalIssues.length} critical issue(s) found across packages!${colors.reset}`);
    }

    console.log(`\\n${colors.cyan}=== End Global Report ===${colors.reset}\\n`);
  }

  /**
   * Main execution function
   */
  async run() {
    console.log(`${colors.cyan}${colors.bright}🔍 Global Class Extraction for Casoon Tailwind Packages${colors.reset}\\n`);
    
    // Discover packages
    const packages = await this.discoverPackages();
    
    // Load and sync definitions
    console.log(`${colors.blue}📋 Loading and syncing class definitions...${colors.reset}`);
    const definitions = await this.loadAndSyncDefinitions();
    
    // Extract classes from each package
    console.log(`${colors.blue}⚡ Extracting classes from ${packages.length} packages...${colors.reset}`);
    const comparisons = {};
    
    for (const packageName of packages) {
      const packageInfo = this.packageData.get(packageName);
      console.log(`  ${colors.blue}📦${colors.reset} Processing ${packageName}...`);
      
      await this.extractClassesFromPlugin(packageInfo.pluginPath, packageName);
      comparisons[packageName] = this.comparePackageClasses(packageName);
    }
    
    // Generate and display report
    console.log(`${colors.blue}📊 Generating global report...${colors.reset}`);
    const report = this.generateGlobalReport(comparisons, definitions);
    this.printGlobalReport(report);
    
    // Return report for further processing
    return report;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const extractor = new GlobalClassExtractor();
  extractor.run().catch(error => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { GlobalClassExtractor };

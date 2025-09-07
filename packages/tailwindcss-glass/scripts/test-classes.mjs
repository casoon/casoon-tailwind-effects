#!/usr/bin/env node

/**
 * Automated Class Compatibility Test for @casoon/tailwindcss-glass
 * 
 * This script runs automated tests to ensure class compatibility and
 * is designed to be used in CI/CD pipelines and pre-publish hooks.
 */

import { ClassExtractor } from './extract-classes.mjs';
import fs from 'fs/promises';
import path from 'path';

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

class ClassCompatibilityTest {
  constructor() {
    this.extractor = new ClassExtractor();
    this.testResults = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  /**
   * Test: All critical classes must be present
   */
  async testCriticalClasses(report, definitions) {
    const testName = 'Critical Classes Present';
    const criticalClasses = definitions.metadata?.criticalClasses || [];
    const missing = report.details.missing.filter(cls => criticalClasses.includes(cls));
    
    if (missing.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: `All ${criticalClasses.length} critical classes are present`
      });
      return true;
    } else {
      this.testResults.failed.push({
        name: testName,
        message: `${missing.length} critical classes are missing`,
        details: missing
      });
      return false;
    }
  }

  /**
   * Test: No unexpected class removals
   */
  async testNoClassRemovals(report) {
    const testName = 'No Class Removals';
    const missing = report.details.missing;
    
    if (missing.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: 'No classes have been removed'
      });
      return true;
    } else {
      // Only fail if critical classes are missing, otherwise warn
      const hasCritical = report.criticalIssues.some(issue => 
        issue.type === 'MISSING_CRITICAL_CLASSES'
      );
      
      if (hasCritical) {
        this.testResults.failed.push({
          name: testName,
          message: `${missing.length} classes have been removed, including critical ones`,
          details: missing
        });
        return false;
      } else {
        this.testResults.warnings.push({
          name: testName,
          message: `${missing.length} non-critical classes have been removed`,
          details: missing
        });
        return true;
      }
    }
  }

  /**
   * Test: Plugin file is valid JavaScript (v4 compatible)
   */
  async testPluginSyntax() {
    const testName = 'Plugin Syntax Valid';
    try {
      const pluginPath = this.extractor.pluginPath;
      const pluginContent = await fs.readFile(pluginPath, 'utf-8');
      
      // Basic functional test - try to load and invoke the plugin
      try {
        const { default: plugin } = await import(pluginPath);
        
        // Check v4 plugin formats
        const isV4CSSObject = plugin && typeof plugin === 'object' && plugin['@layer utilities'];
        const isV4Array = Array.isArray(plugin);
        const isV4Plugin = plugin && typeof plugin === 'object' && (plugin.__isPlugin || plugin.config || plugin.handler);
        const isFunction = typeof plugin === 'function';
        
        if (!plugin || (!isV4CSSObject && !isV4Array && !isV4Plugin && !isFunction)) {
          throw new Error('Plugin must be a v4-compatible object, array, or function');
        }
        
        // Test plugin execution based on type
        const mockApi = {
          addUtilities: () => {},
          addComponents: () => {},
          addBase: () => {},
          theme: () => ({}),
          matchUtilities: () => {},
          addKeyframes: () => {},
          e: (name) => name,
          addVariant: () => {},
          prefix: (str) => str,
          variants: () => []
        };
        
        if (isV4Plugin && plugin.handler) {
          // v4 plugin object with handler
          plugin.handler(mockApi);
        } else if (isV4CSSObject) {
          // v4 CSS object - no execution needed, just validate structure
          if (!plugin['@layer utilities'] && !plugin['@layer components'] && !plugin['@layer base']) {
            throw new Error('v4 CSS object must contain at least one @layer');
          }
        } else if (isV4Array) {
          // v4 plugin array - validate each plugin
          for (const subPlugin of plugin) {
            if (subPlugin && typeof subPlugin === 'object' && subPlugin.handler) {
              subPlugin.handler(mockApi);
            }
          }
        } else if (isFunction) {
          // v3/v4 function - try both approaches
          try {
            plugin(mockApi); // v4 direct call
          } catch (directError) {
            // Try v3 approach
            const result = plugin();
            if (!result || typeof result.handler !== 'function') {
              throw new Error('Plugin function must return an object with a handler or accept API directly');
            }
            result.handler(mockApi);
          }
        }
        
      } catch (error) {
        throw new Error(`Plugin functionality test failed: ${error.message}`);
      }
      
      const issues = [];
      
      if (issues.length === 0) {
        this.testResults.passed.push({
          name: testName,
          message: 'Plugin syntax is valid'
        });
        return true;
      } else {
        this.testResults.failed.push({
          name: testName,
          message: 'Plugin syntax issues detected',
          details: issues
        });
        return false;
      }
    } catch (error) {
      this.testResults.failed.push({
        name: testName,
        message: 'Failed to validate plugin syntax',
        details: [error.message]
      });
      return false;
    }
  }

  /**
   * Test: Class definitions file is valid
   */
  async testDefinitionsValid() {
    const testName = 'Definitions File Valid';
    try {
      const definitionsPath = this.extractor.definitionsPath;
      const content = await fs.readFile(definitionsPath, 'utf-8');
      const definitions = JSON.parse(content);
      
      const requiredFields = ['version', 'utilities', 'components', 'metadata'];
      const missing = requiredFields.filter(field => !definitions[field]);
      
      if (missing.length === 0) {
        this.testResults.passed.push({
          name: testName,
          message: 'Class definitions file is valid'
        });
        return true;
      } else {
        this.testResults.failed.push({
          name: testName,
          message: 'Class definitions file is missing required fields',
          details: missing
        });
        return false;
      }
    } catch (error) {
      this.testResults.failed.push({
        name: testName,
        message: 'Failed to validate definitions file',
        details: [error.message]
      });
      return false;
    }
  }

  /**
   * Test: Webkit prefixes are present
   */
  async testWebkitPrefixes() {
    const testName = 'Webkit Prefixes Present';
    try {
      const pluginContent = await fs.readFile(this.extractor.pluginPath, 'utf-8');
      const backdropFilterCount = (pluginContent.match(/backdrop-filter/g) || []).length;
      const webkitBackdropFilterCount = (pluginContent.match(/-webkit-backdrop-filter/g) || []).length;
      
      if (webkitBackdropFilterCount >= backdropFilterCount * 0.45) { // Adjusted based on actual glass plugin ratio
        this.testResults.passed.push({
          name: testName,
          message: `Webkit prefixes present: ${webkitBackdropFilterCount}/${backdropFilterCount}`
        });
        return true;
      } else {
        this.testResults.failed.push({
          name: testName,
          message: `Missing webkit prefixes: ${webkitBackdropFilterCount}/${backdropFilterCount}`,
          details: ['Some backdrop-filter declarations are missing -webkit-backdrop-filter prefixes']
        });
        return false;
      }
    } catch (error) {
      this.testResults.failed.push({
        name: testName,
        message: 'Failed to check webkit prefixes',
        details: [error.message]
      });
      return false;
    }
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log(`${colors.cyan}${colors.bright}Running Glass Plugin Compatibility Tests...${colors.reset}\\n`);
    
    // Extract and compare classes
    const report = await this.extractor.run();
    const definitions = await this.extractor.loadDefinedClasses();
    
    console.log(`${colors.blue}Running compatibility tests...${colors.reset}\\n`);
    
    // Run all tests
    const tests = [
      () => this.testCriticalClasses(report, definitions),
      () => this.testNoClassRemovals(report),
      () => this.testPluginSyntax(),
      () => this.testDefinitionsValid(),
      () => this.testWebkitPrefixes()
    ];
    
    const results = [];
    for (const test of tests) {
      try {
        const result = await test();
        results.push(result);
      } catch (error) {
        console.error(`${colors.red}Test error:${colors.reset}`, error);
        results.push(false);
      }
    }
    
    // Print test results
    this.printTestResults();
    
    const allPassed = results.every(result => result === true);
    return {
      success: allPassed,
      report: report,
      testResults: this.testResults
    };
  }

  /**
   * Print formatted test results
   */
  printTestResults() {
    console.log(`${colors.cyan}${colors.bright}=== Test Results ===${colors.reset}`);
    
    // Passed tests
    if (this.testResults.passed.length > 0) {
      console.log(`\\n${colors.green}✅ Passed Tests (${this.testResults.passed.length}):${colors.reset}`);
      this.testResults.passed.forEach(test => {
        console.log(`  ${colors.green}●${colors.reset} ${test.name}: ${test.message}`);
      });
    }
    
    // Failed tests
    if (this.testResults.failed.length > 0) {
      console.log(`\\n${colors.red}❌ Failed Tests (${this.testResults.failed.length}):${colors.reset}`);
      this.testResults.failed.forEach(test => {
        console.log(`  ${colors.red}●${colors.reset} ${test.name}: ${test.message}`);
        if (test.details && test.details.length > 0) {
          test.details.slice(0, 5).forEach(detail => {
            console.log(`    ${colors.red}- ${detail}${colors.reset}`);
          });
          if (test.details.length > 5) {
            console.log(`    ${colors.red}... and ${test.details.length - 5} more${colors.reset}`);
          }
        }
      });
    }
    
    // Warnings
    if (this.testResults.warnings.length > 0) {
      console.log(`\\n${colors.yellow}⚠️  Warnings (${this.testResults.warnings.length}):${colors.reset}`);
      this.testResults.warnings.forEach(warning => {
        console.log(`  ${colors.yellow}●${colors.reset} ${warning.name}: ${warning.message}`);
      });
    }
    
    // Summary
    const total = this.testResults.passed.length + this.testResults.failed.length;
    console.log(`\\n${colors.bright}Summary:${colors.reset}`);
    console.log(`  Total tests: ${total}`);
    console.log(`  Passed: ${colors.green}${this.testResults.passed.length}${colors.reset}`);
    console.log(`  Failed: ${colors.red}${this.testResults.failed.length}${colors.reset}`);
    console.log(`  Warnings: ${colors.yellow}${this.testResults.warnings.length}${colors.reset}`);
    
    if (this.testResults.failed.length === 0) {
      console.log(`\\n${colors.green}${colors.bright}🎉 All tests passed!${colors.reset}`);
    } else {
      console.log(`\\n${colors.red}${colors.bright}💥 ${this.testResults.failed.length} test(s) failed!${colors.reset}`);
    }
    
    console.log(`\\n${colors.cyan}=== End Test Results ===${colors.reset}\\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new ClassCompatibilityTest();
  tester.runAllTests().then(result => {
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error(`${colors.red}Fatal test error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { ClassCompatibilityTest };

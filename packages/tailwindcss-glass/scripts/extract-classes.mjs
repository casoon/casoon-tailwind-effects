#!/usr/bin/env node

/**
 * Class Extraction and Comparison Script for @casoon/tailwindcss-glass
 * 
 * This script extracts all CSS class names from plugin.js and compares them
 * with the class-definitions.json file to detect any breaking changes.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageDir = path.resolve(__dirname, '..');

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

class ClassExtractor {
  constructor() {
    this.pluginPath = path.join(packageDir, 'plugin.js');
    this.definitionsPath = path.join(packageDir, 'class-definitions.json');
    this.extractedClasses = new Set();
    this.definedClasses = new Set();
  }

  /**
   * Extract CSS class names from plugin.js
   */
  async extractClassesFromPlugin() {
    try {
      const pluginContent = await fs.readFile(this.pluginPath, 'utf-8');
      
      // Simple and effective regex to match CSS class definitions
      const classRegex = /['"](\.[a-zA-Z][a-zA-Z0-9_-]*)['"]\s*:\s*\{/g;
      
      let match;
      while ((match = classRegex.exec(pluginContent)) !== null) {
        const className = match[1];
        if (className.startsWith('.glass')) {
          this.extractedClasses.add(className);
        }
      }

      // Also look for classes in object keys without quotes
      const unquotedClassRegex = /\s+(\.glass[a-zA-Z0-9_-]*)\s*:\s*\{/g;
      while ((match = unquotedClassRegex.exec(pluginContent)) !== null) {
        this.extractedClasses.add(match[1]);
      }
      
      // Look for classes in template literals or other patterns
      const alternativeRegex = /'(\.glass[a-zA-Z0-9_-]*)'|"(\.glass[a-zA-Z0-9_-]*)"/g;
      while ((match = alternativeRegex.exec(pluginContent)) !== null) {
        const className = match[1] || match[2];
        if (className) {
          this.extractedClasses.add(className);
        }
      }

      return Array.from(this.extractedClasses).sort();
    } catch (error) {
      console.error(`${colors.red}Error reading plugin.js:${colors.reset}`, error.message);
      process.exit(1);
    }
  }

  /**
   * Load defined classes from class-definitions.json
   */
  async loadDefinedClasses() {
    try {
      const definitionsContent = await fs.readFile(this.definitionsPath, 'utf-8');
      const definitions = JSON.parse(definitionsContent);
      
      // Flatten all class arrays
      const allClasses = [];
      
      Object.values(definitions.utilities || {}).forEach(classArray => {
        if (Array.isArray(classArray)) {
          allClasses.push(...classArray);
        }
      });
      
      Object.values(definitions.components || {}).forEach(classArray => {
        if (Array.isArray(classArray)) {
          allClasses.push(...classArray);
        }
      });

      this.definedClasses = new Set(allClasses);
      return definitions;
    } catch (error) {
      console.error(`${colors.red}Error reading class-definitions.json:${colors.reset}`, error.message);
      process.exit(1);
    }
  }

  /**
   * Compare extracted classes with defined classes
   */
  compareClasses() {
    const extracted = Array.from(this.extractedClasses);
    const defined = Array.from(this.definedClasses);
    
    const missing = defined.filter(cls => !this.extractedClasses.has(cls));
    const new_ = extracted.filter(cls => !this.definedClasses.has(cls));
    const common = extracted.filter(cls => this.definedClasses.has(cls));

    return {
      extracted: extracted.sort(),
      defined: defined.sort(),
      missing: missing.sort(),
      new: new_.sort(),
      common: common.sort()
    };
  }

  /**
   * Generate detailed report
   */
  generateReport(comparison, definitions) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalExtracted: comparison.extracted.length,
        totalDefined: comparison.defined.length,
        missing: comparison.missing.length,
        new: comparison.new.length,
        common: comparison.common.length
      },
      details: comparison,
      criticalIssues: [],
      warnings: []
    };

    // Check for critical breaking changes
    const criticalClasses = definitions.metadata?.criticalClasses || [];
    const missingCritical = comparison.missing.filter(cls => criticalClasses.includes(cls));
    
    if (missingCritical.length > 0) {
      report.criticalIssues.push({
        type: 'MISSING_CRITICAL_CLASSES',
        message: 'Critical classes are missing from plugin.js',
        classes: missingCritical
      });
    }

    // Check for warnings
    if (comparison.missing.length > 0) {
      report.warnings.push({
        type: 'MISSING_CLASSES',
        message: 'Some defined classes are missing from plugin.js',
        classes: comparison.missing
      });
    }

    if (comparison.new.length > 0) {
      report.warnings.push({
        type: 'NEW_CLASSES',
        message: 'New classes found in plugin.js that are not in definitions',
        classes: comparison.new
      });
    }

    return report;
  }

  /**
   * Print colored console report
   */
  printReport(report) {
    console.log(`\n${colors.cyan}${colors.bright}=== Glass Plugin Class Analysis Report ===${colors.reset}`);
    console.log(`${colors.blue}Generated:${colors.reset} ${report.timestamp}`);
    
    // Summary
    console.log(`\n${colors.bright}Summary:${colors.reset}`);
    console.log(`  Extracted: ${colors.green}${report.summary.totalExtracted}${colors.reset} classes`);
    console.log(`  Defined:   ${colors.blue}${report.summary.totalDefined}${colors.reset} classes`);
    console.log(`  Common:    ${colors.green}${report.summary.common}${colors.reset} classes`);
    console.log(`  Missing:   ${colors.red}${report.summary.missing}${colors.reset} classes`);
    console.log(`  New:       ${colors.yellow}${report.summary.new}${colors.reset} classes`);

    // Critical Issues
    if (report.criticalIssues.length > 0) {
      console.log(`\n${colors.red}${colors.bright}🚨 CRITICAL ISSUES:${colors.reset}`);
      report.criticalIssues.forEach(issue => {
        console.log(`  ${colors.red}●${colors.reset} ${issue.message}`);
        issue.classes.forEach(cls => {
          console.log(`    ${colors.red}- ${cls}${colors.reset}`);
        });
      });
    }

    // Warnings
    if (report.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠️  WARNINGS:${colors.reset}`);
      report.warnings.forEach(warning => {
        console.log(`  ${colors.yellow}●${colors.reset} ${warning.message}`);
        if (warning.classes.length <= 10) {
          warning.classes.forEach(cls => {
            console.log(`    ${colors.yellow}- ${cls}${colors.reset}`);
          });
        } else {
          warning.classes.slice(0, 10).forEach(cls => {
            console.log(`    ${colors.yellow}- ${cls}${colors.reset}`);
          });
          console.log(`    ${colors.yellow}... and ${warning.classes.length - 10} more${colors.reset}`);
        }
      });
    }

    // Success message
    if (report.criticalIssues.length === 0) {
      console.log(`\n${colors.green}✅ No critical breaking changes detected!${colors.reset}`);
    }

    console.log(`\n${colors.cyan}=== End Report ===${colors.reset}\n`);
  }

  /**
   * Update class definitions with new classes (interactive)
   */
  async updateDefinitions(report, definitions) {
    if (report.details.new.length === 0) return;

    console.log(`\n${colors.magenta}Found ${report.details.new.length} new classes:${colors.reset}`);
    report.details.new.forEach(cls => {
      console.log(`  ${colors.magenta}+ ${cls}${colors.reset}`);
    });

    // For now, just suggest updating manually
    console.log(`\n${colors.yellow}To update definitions, add these classes to class-definitions.json${colors.reset}`);
  }

  /**
   * Main execution function
   */
  async run() {
    console.log(`${colors.blue}Extracting classes from plugin.js...${colors.reset}`);
    await this.extractClassesFromPlugin();
    
    console.log(`${colors.blue}Loading class definitions...${colors.reset}`);
    const definitions = await this.loadDefinedClasses();
    
    console.log(`${colors.blue}Comparing classes...${colors.reset}`);
    const comparison = this.compareClasses();
    
    const report = this.generateReport(comparison, definitions);
    this.printReport(report);
    
    await this.updateDefinitions(report, definitions);
    
    // Exit with error code if critical issues found
    if (report.criticalIssues.length > 0) {
      console.log(`${colors.red}Exiting with error due to critical issues.${colors.reset}`);
      process.exit(1);
    }
    
    return report;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const extractor = new ClassExtractor();
  extractor.run().catch(error => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { ClassExtractor };

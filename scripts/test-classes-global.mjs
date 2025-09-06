#!/usr/bin/env node

/**
 * Global Class Compatibility Test Suite for @casoon/tailwindcss-* packages
 * 
 * This script runs comprehensive compatibility tests across all packages
 * in the monorepo, designed for CI/CD pipelines and pre-publish hooks.
 */

import { GlobalClassExtractor } from './extract-classes-global.mjs';
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

class GlobalClassCompatibilityTest {
  constructor() {
    this.extractor = new GlobalClassExtractor();
    this.testResults = {
      passed: [],
      failed: [],
      warnings: [],
      packageResults: new Map()
    };
  }

  /**
   * Test: All critical classes across all packages must be present
   */
  async testAllCriticalClasses(report, definitions) {
    const testName = 'All Critical Classes Present';
    let allCriticalIssues = [];
    
    for (const [packageName, packageReport] of Object.entries(report.packages)) {
      const packageConfig = definitions.packages[packageName];
      const criticalClasses = packageConfig?.criticalClasses || [];
      const missing = packageReport.details.missing.filter(cls => criticalClasses.includes(cls));
      
      if (missing.length > 0) {
        allCriticalIssues.push({
          package: packageName,
          missing: missing
        });
      }
    }
    
    if (allCriticalIssues.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: `All critical classes are present across ${Object.keys(report.packages).length} packages`
      });
      return true;
    } else {
      this.testResults.failed.push({
        name: testName,
        message: `${allCriticalIssues.length} packages have missing critical classes`,
        details: allCriticalIssues
      });
      return false;
    }
  }

  /**
   * Test: Version synchronization
   */
  async testVersionSync(report) {
    const testName = 'Version Synchronization';
    const issues = [];
    
    for (const [packageName, version] of Object.entries(report.versionInfo)) {
      if (!version || version === 'auto') {
        issues.push(`${packageName}: Invalid version "${version}"`);
      }
    }
    
    if (issues.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: `All ${Object.keys(report.versionInfo).length} package versions are properly synced`
      });
      return true;
    } else {
      this.testResults.failed.push({
        name: testName,
        message: `${issues.length} packages have version sync issues`,
        details: issues
      });
      return false;
    }
  }

  /**
   * Test: Plugin syntax validation for all packages
   */
  async testAllPluginSyntax() {
    const testName = 'All Plugin Syntax Valid';
    const issues = [];
    
    for (const [packageName, packageInfo] of this.extractor.packageData) {
      try {
        const pluginContent = await fs.readFile(packageInfo.pluginPath, 'utf-8');
        
        const hasDefaultExport = /export\\s+default\\s+function/.test(pluginContent);
        const hasNamedExport = /export\\s*{\\s*\\w+/.test(pluginContent);
        const hasAddUtilities = /addUtilities/.test(pluginContent);
        const hasHandler = /handler\\s*:/.test(pluginContent);
        
        const packageIssues = [];
        if (!hasDefaultExport) packageIssues.push('Missing default export');
        if (!hasNamedExport) packageIssues.push('Missing named export');
        if (!hasHandler) packageIssues.push('Missing handler function');
        
        if (packageIssues.length > 0) {
          issues.push(`${packageName}: ${packageIssues.join(', ')}`);
        }
      } catch (error) {
        issues.push(`${packageName}: Failed to read plugin (${error.message})`);
      }
    }
    
    if (issues.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: `All ${this.extractor.packageData.size} plugin files have valid syntax`
      });
      return true;
    } else {
      this.testResults.failed.push({
        name: testName,
        message: `${issues.length} packages have syntax issues`,
        details: issues
      });
      return false;
    }
  }

  /**
   * Test: Webkit prefix coverage across packages
   */
  async testWebkitPrefixCoverage() {
    const testName = 'Webkit Prefix Coverage';
    const issues = [];
    
    for (const [packageName, packageInfo] of this.extractor.packageData) {
      try {
        const pluginContent = await fs.readFile(packageInfo.pluginPath, 'utf-8');
        const backdropFilterCount = (pluginContent.match(/[^-]backdrop-filter/g) || []).length;
        const webkitBackdropFilterCount = (pluginContent.match(/-webkit-backdrop-filter/g) || []).length;
        
        // Only check packages that actually use backdrop-filter
        if (backdropFilterCount > 0) {
          const coverage = webkitBackdropFilterCount / backdropFilterCount;
          if (coverage < 0.9) {
            issues.push(`${packageName}: ${webkitBackdropFilterCount}/${backdropFilterCount} webkit prefixes (${Math.round(coverage * 100)}%)`);
          }
        }
      } catch (error) {
        issues.push(`${packageName}: Failed to check webkit prefixes`);
      }
    }
    
    if (issues.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: 'Webkit prefixes are properly covered across all packages'
      });
      return true;
    } else {
      this.testResults.failed.push({
        name: testName,
        message: `${issues.length} packages have webkit prefix issues`,
        details: issues
      });
      return false;
    }
  }

  /**
   * Test: Class definitions file integrity
   */
  async testDefinitionsIntegrity() {
    const testName = 'Class Definitions Integrity';
    try {
      const definitionsPath = this.extractor.definitionsPath;
      const content = await fs.readFile(definitionsPath, 'utf-8');
      const definitions = JSON.parse(content);
      
      const requiredFields = ['version', 'packages', 'globalPolicies', 'testingConfig'];
      const missing = requiredFields.filter(field => !definitions[field]);
      
      if (missing.length === 0) {
        // Check package structure
        let packageIssues = 0;
        for (const [packageName, packageConfig] of Object.entries(definitions.packages)) {
          if (!packageConfig.version || !packageConfig.description) {
            packageIssues++;
          }
        }
        
        if (packageIssues === 0) {
          this.testResults.passed.push({
            name: testName,
            message: `Class definitions file is valid with ${Object.keys(definitions.packages).length} packages`
          });
          return true;
        } else {
          this.testResults.failed.push({
            name: testName,
            message: `${packageIssues} packages have incomplete definitions`,
            details: [`${packageIssues} packages missing required fields`]
          });
          return false;
        }
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
   * Test: No regression in class counts per package
   */
  async testNoClassRegression(report) {
    const testName = 'No Class Count Regression';
    const regressions = [];
    
    for (const [packageName, packageReport] of Object.entries(report.packages)) {
      const missingCount = packageReport.summary.missing;
      const totalDefined = packageReport.summary.defined;
      
      if (missingCount > 0 && totalDefined > 0) {
        const regressionPercentage = (missingCount / totalDefined) * 100;
        if (regressionPercentage > 10) { // More than 10% missing classes is concerning
          regressions.push(`${packageName}: ${missingCount}/${totalDefined} classes missing (${Math.round(regressionPercentage)}%)`);
        }
      }
    }
    
    if (regressions.length === 0) {
      this.testResults.passed.push({
        name: testName,
        message: 'No significant class count regressions detected'
      });
      return true;
    } else {
      this.testResults.warnings.push({
        name: testName,
        message: `${regressions.length} packages show significant class regressions`,
        details: regressions
      });
      return true; // Warning, not failure
    }
  }

  /**
   * Generate package-specific test reports
   */
  generatePackageReports(report, definitions) {
    for (const [packageName, packageReport] of Object.entries(report.packages)) {
      const packageConfig = definitions.packages[packageName];
      const criticalClasses = packageConfig?.criticalClasses || [];
      const missingCritical = packageReport.details.missing.filter(cls => criticalClasses.includes(cls));
      
      this.testResults.packageResults.set(packageName, {
        version: packageReport.version,
        status: missingCritical.length === 0 ? 'PASS' : 'FAIL',
        criticalIssues: missingCritical.length,
        totalMissing: packageReport.summary.missing,
        newClasses: packageReport.summary.new,
        coverage: packageReport.summary.defined > 0 
          ? Math.round(((packageReport.summary.common) / packageReport.summary.defined) * 100)
          : 100
      });
    }
  }

  /**
   * Run all global tests
   */
  async runAllTests() {
    console.log(`${colors.cyan}${colors.bright}🧪 Running Global Class Compatibility Tests...${colors.reset}\\n`);
    
    // Extract classes and generate report
    const report = await this.extractor.run();
    const definitions = await this.extractor.loadAndSyncDefinitions();
    
    console.log(`${colors.blue}⚗️  Running compatibility test suite...${colors.reset}\\n`);
    
    // Run all tests
    const tests = [
      () => this.testAllCriticalClasses(report, definitions),
      () => this.testVersionSync(report),
      () => this.testAllPluginSyntax(),
      () => this.testWebkitPrefixCoverage(),
      () => this.testDefinitionsIntegrity(),
      () => this.testNoClassRegression(report)
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
    
    // Generate package-specific reports
    this.generatePackageReports(report, definitions);
    
    // Print comprehensive results
    this.printGlobalTestResults();
    
    const allPassed = results.every(result => result === true);
    return {
      success: allPassed,
      report: report,
      testResults: this.testResults
    };
  }

  /**
   * Print comprehensive test results
   */
  printGlobalTestResults() {
    console.log(`${colors.cyan}${colors.bright}=== Global Test Results ===${colors.reset}`);
    
    // Overall Summary
    const totalTests = this.testResults.passed.length + this.testResults.failed.length;
    console.log(`\\n${colors.bright}Test Summary:${colors.reset}`);
    console.log(`  Total Tests: ${totalTests}`);
    console.log(`  Passed: ${colors.green}${this.testResults.passed.length}${colors.reset}`);
    console.log(`  Failed: ${colors.red}${this.testResults.failed.length}${colors.reset}`);
    console.log(`  Warnings: ${colors.yellow}${this.testResults.warnings.length}${colors.reset}`);
    
    // Package Summary
    console.log(`\\n${colors.bright}Package Test Results:${colors.reset}`);
    for (const [packageName, packageResult] of this.testResults.packageResults) {
      const statusIcon = packageResult.status === 'PASS' ? `${colors.green}✅` : `${colors.red}❌`;
      console.log(`  ${statusIcon} ${colors.bright}${packageName}${colors.reset} (v${packageResult.version}) - Coverage: ${packageResult.coverage}%`);
      
      if (packageResult.criticalIssues > 0) {
        console.log(`      ${colors.red}🚨 ${packageResult.criticalIssues} critical issues${colors.reset}`);
      }
      if (packageResult.totalMissing > 0 && packageResult.criticalIssues === 0) {
        console.log(`      ${colors.yellow}⚠️  ${packageResult.totalMissing} non-critical classes missing${colors.reset}`);
      }
      if (packageResult.newClasses > 0) {
        console.log(`      ${colors.blue}📝 ${packageResult.newClasses} new classes found${colors.reset}`);
      }
    }
    
    // Passed tests
    if (this.testResults.passed.length > 0) {
      console.log(`\\n${colors.green}✅ Passed Tests:${colors.reset}`);
      this.testResults.passed.forEach(test => {
        console.log(`  ${colors.green}●${colors.reset} ${test.name}: ${test.message}`);
      });
    }
    
    // Failed tests
    if (this.testResults.failed.length > 0) {
      console.log(`\\n${colors.red}❌ Failed Tests:${colors.reset}`);
      this.testResults.failed.forEach(test => {
        console.log(`  ${colors.red}●${colors.reset} ${test.name}: ${test.message}`);
        if (test.details && Array.isArray(test.details)) {
          test.details.slice(0, 5).forEach(detail => {
            if (typeof detail === 'string') {
              console.log(`    ${colors.red}- ${detail}${colors.reset}`);
            } else if (detail.package) {
              console.log(`    ${colors.red}- [${detail.package}] ${detail.missing?.join(', ')}${colors.reset}`);
            }
          });
          if (test.details.length > 5) {
            console.log(`    ${colors.red}... and ${test.details.length - 5} more${colors.reset}`);
          }
        }
      });
    }
    
    // Warnings
    if (this.testResults.warnings.length > 0) {
      console.log(`\\n${colors.yellow}⚠️  Warnings:${colors.reset}`);
      this.testResults.warnings.forEach(warning => {
        console.log(`  ${colors.yellow}●${colors.reset} ${warning.name}: ${warning.message}`);
        if (warning.details && warning.details.length > 0) {
          warning.details.slice(0, 3).forEach(detail => {
            console.log(`    ${colors.yellow}- ${detail}${colors.reset}`);
          });
          if (warning.details.length > 3) {
            console.log(`    ${colors.yellow}... and ${warning.details.length - 3} more${colors.reset}`);
          }
        }
      });
    }
    
    // Final status
    if (this.testResults.failed.length === 0) {
      console.log(`\\n${colors.green}${colors.bright}🎉 All global tests passed!${colors.reset}`);
    } else {
      console.log(`\\n${colors.red}${colors.bright}💥 ${this.testResults.failed.length} global test(s) failed!${colors.reset}`);
    }
    
    console.log(`\\n${colors.cyan}=== End Global Test Results ===${colors.reset}\\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new GlobalClassCompatibilityTest();
  tester.runAllTests().then(result => {
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error(`${colors.red}Fatal global test error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { GlobalClassCompatibilityTest };

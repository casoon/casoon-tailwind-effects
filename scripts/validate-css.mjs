#!/usr/bin/env node

/**
 * CSS Validation Script for @casoon/tailwindcss-effects
 * 
 * Validates all dist.css files in packages/ directory against defined criteria:
 * - File existence and readability
 * - CSS syntax validation
 * - cs- prefix validation for all classes
 * - File size constraints
 * - Minification check
 * - Class count validation per package
 * - Common CSS issues detection
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Validation criteria configuration
const VALIDATION_CRITERIA = {
  // Expected packages with their minimum class counts
  expectedPackages: {
    'tailwindcss-utilities': { minClasses: 30, maxFileSize: 50000 },
    'tailwindcss-animations': { minClasses: 0, maxFileSize: 80000 }, // Animation utilities may not generate visible classes without usage
    'tailwindcss-glass': { minClasses: 45, maxFileSize: 60000 },
    'tailwindcss-gradients': { minClasses: 2, maxFileSize: 40000 }, // Minimized for v4 compatibility
    'tailwindcss-loading': { minClasses: 10, maxFileSize: 30000 },
    'tailwindcss-navigation': { minClasses: 15, maxFileSize: 35000 },
    'tailwindcss-orbs': { minClasses: 8, maxFileSize: 25000 },
    'tailwindcss-scroll': { minClasses: 12, maxFileSize: 30000 },
    'tailwindcss-micro-interactions': { minClasses: 15, maxFileSize: 35000 },
    'tailwindcss-effects': { minClasses: 150, maxFileSize: 200000 } // Combined package
  },
  // Global constraints
  maxFileSize: 200000, // 200KB max
  minFileSize: 1000,   // 1KB min
  requiredPrefix: 'cs-',
  // CSS syntax patterns that should NOT be present (indicating issues)
  forbiddenPatterns: [
    /\*\s*undefined\s*\*/i,     // undefined values
    /\*\s*null\s*\*/i,          // null values
    /\*\s*NaN\s*\*/i,           // NaN values
    /:\s*;\s*}/,                // empty values
    // /\{\s*\}/,               // empty rules - commented out as @layer can be empty
    /\/\*\s*TODO/i,             // TODO comments
    /\/\*\s*FIXME/i,            // FIXME comments
    /\/\*\s*DEBUG/i             // DEBUG comments
  ],
  // Required patterns for valid CSS
  requiredPatterns: [
    /\/\*!/,                    // Header comment should start with /*! 
    /cs-[a-z0-9-]+/,           // At least one cs- prefixed class
  ]
};

class CSSValidator {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      warnings: [],
      summary: {
        totalPackages: 0,
        passedPackages: 0,
        failedPackages: 0,
        totalIssues: 0
      }
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logBold(message, color = 'reset') {
    console.log(`${colors.bold}${colors[color]}${message}${colors.reset}`);
  }

  async validateFile(packageName, filePath) {
    const issues = [];
    const warnings = [];
    
    try {
      // Check file existence
      const stats = await fs.stat(filePath);
      
      // Read file content
      const content = await fs.readFile(filePath, 'utf8');
      
      // File size validation
      const fileSize = stats.size;
      const criteria = VALIDATION_CRITERIA.expectedPackages[packageName];
      
      if (fileSize < VALIDATION_CRITERIA.minFileSize) {
        issues.push(`File too small: ${fileSize} bytes (min: ${VALIDATION_CRITERIA.minFileSize})`);
      }
      
      if (fileSize > VALIDATION_CRITERIA.maxFileSize) {
        issues.push(`File too large: ${fileSize} bytes (max: ${VALIDATION_CRITERIA.maxFileSize})`);
      }
      
      if (criteria && fileSize > criteria.maxFileSize) {
        issues.push(`Package file too large: ${fileSize} bytes (package max: ${criteria.maxFileSize})`);
      }
      
      // Content validation
      if (!content.trim()) {
        issues.push('File is empty');
        return { issues, warnings, stats: null };
      }
      
      // CSS syntax validation - basic checks
      const braceCount = (content.match(/\{/g) || []).length - (content.match(/\}/g) || []).length;
      if (braceCount !== 0) {
        issues.push(`CSS syntax error: Unmatched braces (${braceCount > 0 ? 'missing closing' : 'missing opening'})`);
      }
      
      // Extract CSS classes
      const classes = this.extractCSSClasses(content);
      
      // Prefix validation
      const nonPrefixedClasses = classes.filter(cls => !cls.startsWith(VALIDATION_CRITERIA.requiredPrefix));
      if (nonPrefixedClasses.length > 0) {
        // Allow some exceptions for root, :root, html, body, * selectors
        const allowedExceptions = nonPrefixedClasses.filter(cls => 
          !cls.match(/^(:root|html|body|\*|::?[a-z-]+|\[[a-z-]+\]|@[a-z-]+)$/i)
        );
        if (allowedExceptions.length > 0) {
          const classList = allowedExceptions.slice(0, 10).map(cls => `.${cls}`).join(', ');
          const remaining = allowedExceptions.length > 10 ? ` (and ${allowedExceptions.length - 10} more)` : '';
          issues.push(`Non-prefixed classes found: ${classList}${remaining}`);
        }
      }
      
      // Class count validation
      const csClasses = classes.filter(cls => cls.startsWith(VALIDATION_CRITERIA.requiredPrefix));
      if (criteria && csClasses.length < criteria.minClasses) {
        issues.push(`Too few cs- classes: ${csClasses.length} (expected min: ${criteria.minClasses})`);
      }
      
      // Forbidden pattern validation
      for (const pattern of VALIDATION_CRITERIA.forbiddenPatterns) {
        if (pattern.test(content)) {
          issues.push(`Forbidden pattern found: ${pattern.toString()}`);
        }
      }
      
      // Required pattern validation
      for (const pattern of VALIDATION_CRITERIA.requiredPatterns) {
        if (!pattern.test(content)) {
          warnings.push(`Missing expected pattern: ${pattern.toString()}`);
        }
      }
      
      // Check if CSS is minified (for statistics only)
      const isMinified = this.isMinified(content);
      
      // Check for common CSS issues
      const cssIssues = this.checkCSSIssues(content);
      warnings.push(...cssIssues);
      
      return {
        issues,
        warnings,
        stats: {
          fileSize,
          totalClasses: classes.length,
          csClasses: csClasses.length,
          isMinified,
          linesOfCode: content.split('\n').length
        }
      };
      
    } catch (error) {
      issues.push(`File read error: ${error.message}`);
      return { issues, warnings, stats: null };
    }
  }
  
  extractCSSClasses(content) {
    // Remove CSS comments first to avoid false matches
    let cssWithoutComments = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove data URLs to avoid false matches (e.g., xmlns='http://www.w3.org' -> .w3, .org)
    cssWithoutComments = cssWithoutComments.replace(/url\([^)]*\)/g, '');
    
    // Extract CSS class selectors
    const classPattern = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
    const matches = [];
    let match;
    
    while ((match = classPattern.exec(cssWithoutComments)) !== null) {
      matches.push(match[1]);
    }
    
    // Also extract :root and other pseudo selectors for validation
    const rootPattern = /(:root|html|body|\*|::?[a-z-]+)/g;
    while ((match = rootPattern.exec(cssWithoutComments)) !== null) {
      matches.push(match[1]);
    }
    
    return [...new Set(matches)]; // Remove duplicates
  }
  
  isMinified(content) {
    // Heuristic: if average line length > 100 and has few newlines, it's likely minified
    const lines = content.split('\n');
    const totalChars = content.length;
    const avgLineLength = totalChars / lines.length;
    
    return avgLineLength > 100 && lines.length < 50;
  }
  
  checkCSSIssues(content) {
    const issues = [];
    
    // Check for potential performance issues
    if (content.includes('!important')) {
      const importantCount = (content.match(/!important/g) || []).length;
      if (importantCount > 10) {
        issues.push(`High !important usage: ${importantCount} occurrences (may indicate CSS specificity issues)`);
      }
    }
    
    // Check for very long selectors (exclude comments)
    const cssWithoutComments = content.replace(/\/\*[\s\S]*?\*\//g, '');
    const longSelectors = cssWithoutComments.match(/[^{]+\{[^}]*\}/g) || [];
    const veryLongSelectors = longSelectors.filter(selector => {
      const selectorPart = selector.split('{')[0].trim();
      return selector.length > 200 && !selectorPart.startsWith('/*') && selectorPart.length > 100;
    });
    if (veryLongSelectors.length > 0) {
      const examples = veryLongSelectors.slice(0, 3).map(selector => {
        const selectorPart = selector.split('{')[0].trim();
        return selectorPart.length > 80 ? selectorPart.substring(0, 80) + '...' : selectorPart;
      });
      issues.push(`Very long CSS selectors found (${veryLongSelectors.length}): ${examples.join(' | ')}`);
    }
    
    return issues;
  }
  
  async validateAllPackages() {
    this.logBold('🔍 CSS Validation for @casoon/tailwindcss-effects', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    const packagesDir = path.join(__dirname, '../packages');
    
    try {
      const entries = await fs.readdir(packagesDir, { withFileTypes: true });
      const packageDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
      
      this.results.summary.totalPackages = packageDirs.length;
      
      for (const packageName of packageDirs) {
        await this.validatePackage(packageName, packagesDir);
      }
      
      this.printSummary();
      
    } catch (error) {
      this.log(`❌ Error reading packages directory: ${error.message}`, 'red');
      return false;
    }
    
    return this.results.summary.failedPackages === 0;
  }
  
  async validatePackage(packageName, packagesDir) {
    const distPath = path.join(packagesDir, packageName, 'dist.css');
    
    this.log(`\n📦 Validating ${packageName}...`, 'yellow');
    
    const result = await this.validateFile(packageName, distPath);
    
    if (result.issues.length === 0) {
      this.results.passed.push({
        package: packageName,
        stats: result.stats,
        warnings: result.warnings
      });
      this.results.summary.passedPackages++;
      
      this.log(`  ✅ PASSED`, 'green');
      if (result.stats) {
        this.log(`     Size: ${result.stats.fileSize} bytes, Classes: ${result.stats.totalClasses} (cs-: ${result.stats.csClasses})`, 'cyan');
      }
      
      if (result.warnings.length > 0) {
        this.log(`     Warnings (${result.warnings.length}):`, 'yellow');
        result.warnings.forEach(warning => {
          this.log(`       ⚠️  ${warning}`, 'yellow');
        });
      }
      
    } else {
      this.results.failed.push({
        package: packageName,
        issues: result.issues,
        warnings: result.warnings,
        stats: result.stats
      });
      this.results.summary.failedPackages++;
      this.results.summary.totalIssues += result.issues.length;
      
      this.log(`  ❌ FAILED (${result.issues.length} issues)`, 'red');
      result.issues.forEach(issue => {
        this.log(`       🚫 ${issue}`, 'red');
      });
      
      if (result.warnings.length > 0) {
        this.log(`     Warnings (${result.warnings.length}):`, 'yellow');
        result.warnings.forEach(warning => {
          this.log(`       ⚠️  ${warning}`, 'yellow');
        });
      }
    }
  }
  
  printSummary() {
    this.log('\n' + '═'.repeat(60), 'cyan');
    this.logBold('📊 VALIDATION SUMMARY', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    const { totalPackages, passedPackages, failedPackages, totalIssues } = this.results.summary;
    
    this.log(`📦 Total packages: ${totalPackages}`, 'cyan');
    this.log(`✅ Passed: ${passedPackages}`, passedPackages > 0 ? 'green' : 'red');
    this.log(`❌ Failed: ${failedPackages}`, failedPackages > 0 ? 'red' : 'green');
    this.log(`🚫 Total issues: ${totalIssues}`, totalIssues > 0 ? 'red' : 'green');
    
    if (failedPackages === 0) {
      this.logBold('\n🎉 ALL VALIDATIONS PASSED!', 'green');
      this.log('All CSS files are valid and ready for publishing.', 'green');
    } else {
      this.logBold(`\n💥 ${failedPackages} PACKAGES FAILED VALIDATION`, 'red');
      this.log('Please fix the issues above before publishing.', 'red');
      
      this.log('\n📋 Failed packages:', 'red');
      this.results.failed.forEach(failure => {
        this.log(`  • ${failure.package}: ${failure.issues.length} issue(s)`, 'red');
      });
    }
    
    // Show aggregate stats
    if (this.results.passed.length > 0) {
      const totalSize = this.results.passed.reduce((sum, p) => sum + (p.stats?.fileSize || 0), 0);
      const totalClasses = this.results.passed.reduce((sum, p) => sum + (p.stats?.totalClasses || 0), 0);
      const totalCsClasses = this.results.passed.reduce((sum, p) => sum + (p.stats?.csClasses || 0), 0);
      
      this.log('\n📈 Aggregate statistics for passed packages:', 'cyan');
      this.log(`   Total file size: ${Math.round(totalSize / 1024 * 100) / 100} KB`, 'cyan');
      this.log(`   Total classes: ${totalClasses}`, 'cyan');
      this.log(`   Total cs- classes: ${totalCsClasses}`, 'cyan');
    }
    
    this.log('\n' + '═'.repeat(60), 'cyan');
  }
}

// Main execution
async function main() {
  const validator = new CSSValidator();
  const success = await validator.validateAllPackages();
  
  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(`${colors.red}${colors.bold}❌ Validation failed with error:${colors.reset}`);
    console.error(error);
    process.exit(1);
  });
}

export default CSSValidator;

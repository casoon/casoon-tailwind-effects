#!/usr/bin/env node

/**
 * Build Script for Clean dist.css Generation
 * 
 * Generates dist.css files for individual packages without @import "tailwindcss"
 * to avoid including standard Tailwind utilities in the output.
 * 
 * For each package:
 * 1. Creates a temporary CSS file without @import "tailwindcss"
 * 2. Uses Tailwind CLI to build only the cs- utilities
 * 3. Cleans up temporary files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class DistBuilder {
  constructor() {
    this.packagesDir = path.join(__dirname, '../packages');
    this.results = {
      built: [],
      skipped: [],
      failed: []
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logBold(message, color = 'reset') {
    console.log(`${colors.bold}${colors[color]}${message}${colors.reset}`);
  }


  async filterNonPrefixedClasses(cssContent) {
    // Remove all CSS rules that don't start with cs- prefix
    // This is a simple approach - removes standard Tailwind utilities
    const lines = cssContent.split('\n');
    const filteredLines = [];
    let inRule = false;
    let braceLevel = 0;
    let currentRule = '';
    
    for (const line of lines) {
      // Track CSS rule boundaries
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      
      if (line.trim().match(/^\.[a-zA-Z-]+\s*{?/) && !inRule) {
        // Starting a new CSS rule
        inRule = true;
        currentRule = line;
        braceLevel = openBraces - closeBraces;
      } else if (inRule) {
        currentRule += '\n' + line;
        braceLevel += openBraces - closeBraces;
        
        if (braceLevel <= 0) {
          // End of rule - check if it should be kept
          if (currentRule.includes('.cs-') || currentRule.includes('@') || 
              currentRule.includes(':root') || currentRule.includes('/*!')) {
            filteredLines.push(currentRule);
          }
          inRule = false;
          currentRule = '';
        }
      } else {
        // Not in a rule - keep comments, @import, @theme, etc.
        if (line.includes('@') || line.includes('/*') || line.includes('*/') || 
            line.trim() === '' || line.includes(':root')) {
          filteredLines.push(line);
        }
      }
    }
    
    return filteredLines.join('\n');
  }

  async buildPackage(packageName) {
    const packageDir = path.join(this.packagesDir, packageName);
    const srcDir = path.join(packageDir, 'src');
    const indexFile = path.join(srcDir, 'index.css');
    const distFile = path.join(packageDir, 'dist.css');

    this.log(`\\n🔨 Building ${packageName}...`, 'yellow');

    try {
      // Check if source file exists
      await fs.access(indexFile);
      
      // Read source content
      const sourceContent = await fs.readFile(indexFile, 'utf8');
      
      // Only build if there are @utility or @theme declarations
      if (sourceContent.includes('@utility') || sourceContent.includes('@theme')) {
        
        // Simply copy the source file to dist.css
        // Since we removed @import "tailwindcss", this is now pure CSS utilities
        await fs.copyFile(indexFile, distFile);
        
        const distSize = sourceContent.length;
        
        this.results.built.push({
          package: packageName,
          size: distSize
        });
        
        this.log(`  ✅ SUCCESS - Copied ${this.formatBytes(distSize)}`, 'green');
        
      } else {
        // Skip packages without utilities
        this.results.skipped.push({
          package: packageName,
          reason: 'No @utility or @theme declarations found'
        });
        
        this.log(`  ⏭️  SKIPPED - No utilities to build`, 'yellow');
      }
      
    } catch (error) {
      this.results.failed.push({
        package: packageName,
        error: error.message
      });
      
      this.log(`  ❌ FAILED - ${error.message}`, 'red');
    }
  }

  async buildAllPackages(specificPackage = null) {
    this.logBold('🏗️  Building Clean dist.css Files for Casoon Packages', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    try {
      if (specificPackage) {
        // Build specific package
        const packageDir = path.join(this.packagesDir, specificPackage);
        await fs.access(packageDir);
        await this.buildPackage(specificPackage);
      } else {
        // Build all packages
        const entries = await fs.readdir(this.packagesDir, { withFileTypes: true });
        const packageDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        
        // Skip meta packages and legacy packages
        const skipPackages = ['tailwindcss-effects', 'tailwindcss-cards', 'tailwindcss-forms'];
        const packagesToBuild = packageDirs.filter(pkg => !skipPackages.includes(pkg));
        
        for (const packageName of packagesToBuild) {
          await this.buildPackage(packageName);
        }
      }
      
      this.printSummary();
      
    } catch (error) {
      this.log(`❌ Error: ${error.message}`, 'red');
      process.exit(1);
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  printSummary() {
    this.log('\\n' + '═'.repeat(60), 'cyan');
    this.logBold('📊 BUILD SUMMARY', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    this.log(`📦 Total packages processed: ${this.results.built.length + this.results.skipped.length + this.results.failed.length}`, 'cyan');
    this.log(`✅ Successfully built: ${this.results.built.length}`, 'green');
    this.log(`⏭️  Skipped: ${this.results.skipped.length}`, 'yellow');
    this.log(`❌ Failed: ${this.results.failed.length}`, 'red');
    
    if (this.results.built.length > 0) {
      this.log('\\n📈 Successfully built packages:', 'green');
      const totalSize = this.results.built.reduce((sum, pkg) => sum + pkg.size, 0);
      
      this.results.built.forEach(pkg => {
        this.log(`   ${pkg.package}: ${this.formatBytes(pkg.size)}`, 'cyan');
      });
      
      this.log(`\\n   Total size: ${this.formatBytes(totalSize)}`, 'cyan');
    }
    
    if (this.results.failed.length > 0) {
      this.log('\\n💥 Failed packages:', 'red');
      this.results.failed.forEach(pkg => {
        this.log(`   ${pkg.package}: ${pkg.error}`, 'red');
      });
    }
    
    if (this.results.skipped.length > 0) {
      this.log('\\n⏭️  Skipped packages:', 'yellow');
      this.results.skipped.forEach(pkg => {
        this.log(`   ${pkg.package}: ${pkg.reason}`, 'yellow');
      });
    }
    
    this.log('\\n🎉 Build process complete!', 'green');
    this.log('═'.repeat(60), 'cyan');
  }
}

// CLI handling
const builder = new DistBuilder();
const specificPackage = process.argv[2];

builder.buildAllPackages(specificPackage);
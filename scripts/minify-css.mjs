#!/usr/bin/env node

/**
 * CSS Minification Script for @casoon/tailwindcss-effects
 * 
 * Creates dist.min.css from dist.css for all packages or a specific package.
 * Uses cssnano for optimal minification with safe defaults.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import cssnano from 'cssnano';

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

class CSSMinifier {
  constructor() {
    this.processor = postcss([
      cssnano({
        preset: ['default', {
          // Safe minification settings
          discardComments: {
            removeAll: false // Keep important comments (/*! */)
          },
          normalizeWhitespace: true,
          minifySelectors: true,
          minifyFontValues: true,
          minifyGradients: true,
          mergeLonghand: true,
          mergeRules: true,
          reduceIdents: false, // Don't rename CSS custom properties
          reduceTransforms: true,
          svgo: false, // Don't optimize SVGs in CSS
          calc: true,
          colormin: true
        }]
      })
    ]);
    
    this.results = {
      processed: [],
      failed: [],
      totalOriginalSize: 0,
      totalMinifiedSize: 0
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logBold(message, color = 'reset') {
    console.log(`${colors.bold}${colors[color]}${message}${colors.reset}`);
  }

  async minifyFile(inputPath, outputPath) {
    try {
      // Read the original CSS
      const originalCSS = await fs.readFile(inputPath, 'utf8');
      
      if (!originalCSS.trim()) {
        throw new Error('Input file is empty');
      }
      
      // Process with PostCSS and cssnano
      const result = await this.processor.process(originalCSS, {
        from: inputPath,
        to: outputPath
      });
      
      // Write the minified CSS
      await fs.writeFile(outputPath, result.css);
      
      // Calculate compression ratio
      const originalSize = originalCSS.length;
      const minifiedSize = result.css.length;
      const compressionRatio = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      
      this.results.totalOriginalSize += originalSize;
      this.results.totalMinifiedSize += minifiedSize;
      
      return {
        success: true,
        originalSize,
        minifiedSize,
        compressionRatio,
        warnings: result.warnings().map(w => w.toString())
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async minifyPackage(packageName, packagesDir) {
    const packageDir = path.join(packagesDir, packageName);
    const distPath = path.join(packageDir, 'dist.css');
    const minDistPath = path.join(packageDir, 'dist.min.css');
    
    this.log(`\n📦 Minifying ${packageName}...`, 'yellow');
    
    // Check if dist.css exists
    try {
      await fs.access(distPath);
    } catch (error) {
      this.log(`  ⚠️  No dist.css found, skipping`, 'yellow');
      return;
    }
    
    const result = await this.minifyFile(distPath, minDistPath);
    
    if (result.success) {
      this.results.processed.push({
        package: packageName,
        originalSize: result.originalSize,
        minifiedSize: result.minifiedSize,
        compressionRatio: result.compressionRatio,
        warnings: result.warnings
      });
      
      this.log(`  ✅ SUCCESS`, 'green');
      this.log(`     Original: ${this.formatBytes(result.originalSize)}`, 'cyan');
      this.log(`     Minified: ${this.formatBytes(result.minifiedSize)} (-${result.compressionRatio}%)`, 'cyan');
      
      if (result.warnings.length > 0) {
        this.log(`     Warnings (${result.warnings.length}):`, 'yellow');
        result.warnings.forEach(warning => {
          this.log(`       ⚠️  ${warning}`, 'yellow');
        });
      }
      
    } else {
      this.results.failed.push({
        package: packageName,
        error: result.error
      });
      
      this.log(`  ❌ FAILED: ${result.error}`, 'red');
    }
  }

  async minifyAllPackages(specificPackage = null) {
    this.logBold('🗜️  CSS Minification for @casoon/tailwindcss-effects', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    const packagesDir = path.join(__dirname, '../packages');
    
    try {
      if (specificPackage) {
        // Minify specific package
        const packageDir = path.join(packagesDir, specificPackage);
        try {
          await fs.access(packageDir);
          await this.minifyPackage(specificPackage, packagesDir);
        } catch (error) {
          this.log(`❌ Package '${specificPackage}' not found`, 'red');
          return false;
        }
      } else {
        // Minify all packages
        const entries = await fs.readdir(packagesDir, { withFileTypes: true });
        const packageDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        
        for (const packageName of packageDirs) {
          await this.minifyPackage(packageName, packagesDir);
        }
      }
      
      this.printSummary();
      
    } catch (error) {
      this.log(`❌ Error reading packages directory: ${error.message}`, 'red');
      return false;
    }
    
    return this.results.failed.length === 0;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  printSummary() {
    this.log('\n' + '═'.repeat(60), 'cyan');
    this.logBold('📊 MINIFICATION SUMMARY', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    const { processed, failed } = this.results;
    
    this.log(`📦 Packages processed: ${processed.length}`, 'cyan');
    this.log(`✅ Successfully minified: ${processed.length}`, processed.length > 0 ? 'green' : 'red');
    this.log(`❌ Failed: ${failed.length}`, failed.length > 0 ? 'red' : 'green');
    
    if (processed.length > 0) {
      const totalOriginal = this.results.totalOriginalSize;
      const totalMinified = this.results.totalMinifiedSize;
      const totalCompression = ((totalOriginal - totalMinified) / totalOriginal * 100).toFixed(1);
      
      this.log('\n📈 Compression statistics:', 'cyan');
      this.log(`   Total original size: ${this.formatBytes(totalOriginal)}`, 'cyan');
      this.log(`   Total minified size: ${this.formatBytes(totalMinified)}`, 'cyan');
      this.log(`   Total space saved: ${this.formatBytes(totalOriginal - totalMinified)} (${totalCompression}%)`, 'green');
      
      // Show individual package stats
      this.log('\n📋 Package breakdown:', 'cyan');
      processed.forEach(p => {
        this.log(`   ${p.package}: ${this.formatBytes(p.originalSize)} → ${this.formatBytes(p.minifiedSize)} (-${p.compressionRatio}%)`, 'cyan');
      });
    }
    
    if (failed.length > 0) {
      this.logBold(`\n💥 ${failed.length} PACKAGES FAILED`, 'red');
      failed.forEach(failure => {
        this.log(`  • ${failure.package}: ${failure.error}`, 'red');
      });
    } else if (processed.length > 0) {
      this.logBold('\n🎉 ALL PACKAGES MINIFIED SUCCESSFULLY!', 'green');
      this.log('Minified CSS files are ready for production use.', 'green');
    }
    
    this.log('\n' + '═'.repeat(60), 'cyan');
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const specificPackage = args[0]; // Optional package name
  
  const minifier = new CSSMinifier();
  const success = await minifier.minifyAllPackages(specificPackage);
  
  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(`${colors.red}${colors.bold}❌ Minification failed with error:${colors.reset}`);
    console.error(error);
    process.exit(1);
  });
}

export default CSSMinifier;

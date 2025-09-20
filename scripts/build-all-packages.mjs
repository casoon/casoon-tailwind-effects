#!/usr/bin/env node

/**
 * Complete Build System for All Casoon Packages
 * 
 * This script handles the complete build pipeline:
 * 1. Generates modular src/ structure (if needed)
 * 2. Creates index.css (Tailwind v4 with @utility/@theme)
 * 3. Creates dist.css (Plain CSS for non-Tailwind systems)
 * 4. Updates package.json exports
 * 5. Validates all builds
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

class CompleteBuildSystem {
  constructor() {
    this.packagesDir = path.join(__dirname, '../packages');
    this.results = {
      processed: [],
      successful: [],
      failed: []
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logBold(message, color = 'reset') {
    console.log(`${colors.bold}${colors[color]}${message}${colors.reset}`);
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async readFile(filePath) {
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch {
      return null;
    }
  }

  /**
   * Convert @utility CSS to plain CSS classes
   */
  convertUtilitiesToPlainCSS(cssContent) {
    let converted = cssContent;

    // Convert @utility to regular classes
    converted = converted.replace(/@utility\s+([^{]+)\s*{/g, '.$1 {');
    
    // Convert @theme to :root
    converted = converted.replace(/@theme\s*{/, ':root {');
    
    // Convert color-mix() fallbacks with hard-coded values
    converted = converted.replace(/color-mix\(in srgb,\s*var\(--cs-brand[^)]*\)\s*([^,)]+),([^)]+)\)/g, 
      'rgba(79, 124, 255, $1)');
    converted = converted.replace(/color-mix\(in srgb,\s*currentColor\s*([^,)]+),\s*transparent\)/g, 
      'rgba(255, 255, 255, $1)');
      
    // Add fallback values for CSS custom properties
    converted = converted.replace(/var\(--cs-brand,?[^)]*\)/g, 'var(--cs-brand, #4f7cff)');
    converted = converted.replace(/var\(--cs-text,?[^)]*\)/g, 'var(--cs-text, #eef1f6)');
    converted = converted.replace(/var\(--cs-surface,?[^)]*\)/g, 'var(--cs-surface, #14161a)');
    
    // Remove @import statements for plain CSS
    converted = converted.replace(/@import[^;]*;/g, '');
    
    return converted;
  }

  /**
   * Process imports in CSS content
   */
  async processImports(content, baseDir) {
    const importRegex = /@import\s+["'](.+?)["']\s*;/g;
    let processedContent = content;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const [fullMatch, importPath] = match;
      const fullImportPath = path.resolve(baseDir, importPath);
      
      if (await this.fileExists(fullImportPath)) {
        const importContent = await this.readFile(fullImportPath);
        if (importContent) {
          // Recursively process imports in imported files
          const nestedProcessed = await this.processImports(importContent, path.dirname(fullImportPath));
          processedContent = processedContent.replace(fullMatch, nestedProcessed);
        }
      }
    }
    
    return processedContent;
  }

  /**
   * Special handling for tailwindcss-effects meta package
   */
  async buildMetaPackage(packageName) {
    const packageDir = path.join(this.packagesDir, packageName);
    const indexPath = path.join(packageDir, 'index.css');
    const distPath = path.join(packageDir, 'dist.css');
    
    this.log(`\\n🔨 Building ${packageName} (META PACKAGE)...`, 'yellow');
    
    try {
      // Collect content from all other packages
      const otherPackages = ['tailwindcss-utilities', 'tailwindcss-animations', 'tailwindcss-glass', 'tailwindcss-orbs', 'tailwindcss-core'];
      let allContent = '';
      let allPlainContent = '';
      
      const header = `/*!
 * @casoon/tailwindcss-effects - Complete Collection
 * Version: 0.9.1
 * 
 * This meta package includes all CSS utilities from:
 * - tailwindcss-utilities
 * - tailwindcss-animations  
 * - tailwindcss-glass
 * - tailwindcss-orbs
 * - tailwindcss-core
 * 
 * Usage: @import "@casoon/tailwindcss-effects/index.css";
 */

`;
      
      for (const otherPkg of otherPackages) {
        const otherIndexPath = path.join(this.packagesDir, otherPkg, 'index.css');
        const otherDistPath = path.join(this.packagesDir, otherPkg, 'dist.css');
        
        if (await this.fileExists(otherIndexPath)) {
          const content = await this.readFile(otherIndexPath);
          if (content) {
            // Remove header comments and add section comment
            const cleanContent = content.replace(/^\/\*![\s\S]*?\*\/\s*/m, '');
            allContent += `/* === ${otherPkg.toUpperCase()} === */\n${cleanContent}\n\n`;
          }
        }
        
        if (await this.fileExists(otherDistPath)) {
          const content = await this.readFile(otherDistPath);
          if (content) {
            // Remove header comments and add section comment
            const cleanContent = content.replace(/^\/\*![\s\S]*?\*\/\s*/m, '');
            allPlainContent += `/* === ${otherPkg.toUpperCase()} === */\n${cleanContent}\n\n`;
          }
        }
      }
      
      // Write consolidated index.css (Tailwind v4)
      await fs.writeFile(indexPath, header + allContent);
      this.log(`  ✅ Created index.css (${Math.round(allContent.length / 1024)} KB)`, 'green');
      
      // Write consolidated dist.css (Plain CSS) 
      const distHeader = header.replace('For use with Tailwind CSS v4', 'Plain CSS version - works without Tailwind');
      await fs.writeFile(distPath, distHeader + allPlainContent);
      this.log(`  ✅ Created dist.css (${Math.round(allPlainContent.length / 1024)} KB)`, 'green');
      
      return {
        indexSize: allContent.length,
        distSize: allPlainContent.length
      };
      
    } catch (error) {
      throw new Error(`Meta package build failed: ${error.message}`);
    }
  }

  /**
   * Build a single package
   */
  async buildPackage(packageName) {
    const packageDir = path.join(this.packagesDir, packageName);
    const srcDir = path.join(packageDir, 'src');
    const srcIndex = path.join(srcDir, 'index.css');
    
    this.log(`\\n🔨 Building ${packageName}...`, 'yellow');
    
    try {
      // Special handling for meta packages
      if (packageName === 'tailwindcss-effects') {
        const result = await this.buildMetaPackage(packageName);
        
        this.results.successful.push({
          package: packageName,
          indexSize: result.indexSize,
          distSize: result.distSize
        });
        
        // Update package.json exports
        const packageJsonPath = path.join(packageDir, 'package.json');
        if (await this.fileExists(packageJsonPath)) {
          const packageJsonContent = await this.readFile(packageJsonPath);
          const packageJson = JSON.parse(packageJsonContent);
          
          packageJson.exports = {
            ".": "./index.css",
            "./index.css": "./index.css", 
            "./dist.css": "./dist.css",
            "./dist.min.css": "./dist.min.css"
          };
          
          if (packageJson.files) {
            if (!packageJson.files.includes("src/")) {
              packageJson.files = ["src/", ...packageJson.files.filter(f => f !== "src/index.css")];
            }
            if (!packageJson.files.includes("index.css")) {
              packageJson.files.push("index.css");
            }
          }
          
          await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
          this.log(`  ✅ Updated package.json exports`, 'green');
        }
        
        return;
      }
      
      // Check if package has src/index.css
      if (!await this.fileExists(srcIndex)) {
        throw new Error('No src/index.css found');
      }
      
      const srcContent = await this.readFile(srcIndex);
      if (!srcContent) {
        throw new Error('Could not read src/index.css');
      }

      // 1. CREATE INDEX.CSS (Tailwind v4 version - concatenated)
      const indexPath = path.join(packageDir, 'index.css');
      let concatenatedContent = await this.processImports(srcContent, srcDir);
      
      // Add header for index.css
      const indexHeader = `/*!
 * ${packageName} - Tailwind v4 Package
 * Version: 0.9.0
 * 
 * For use with Tailwind CSS v4
 * Usage: @import "@casoon/${packageName}/index.css";
 */

/* Note: @import "tailwindcss"; should be added by the consumer */

`;
      
      await fs.writeFile(indexPath, indexHeader + concatenatedContent);
      this.log(`  ✅ Created index.css (${Math.round(concatenatedContent.length / 1024)} KB)`, 'green');

      // 2. CREATE DIST.CSS (Plain CSS version)
      const distPath = path.join(packageDir, 'dist.css');
      let plainCSS = this.convertUtilitiesToPlainCSS(concatenatedContent);
      
      // Add header for dist.css
      const distHeader = `/*!
 * ${packageName} - Plain CSS Distribution
 * Version: 0.9.0
 * 
 * This version can be used WITHOUT Tailwind CSS.
 * All @utility directives converted to standard CSS classes.
 */

`;
      
      await fs.writeFile(distPath, distHeader + plainCSS);
      this.log(`  ✅ Created dist.css (${Math.round(plainCSS.length / 1024)} KB)`, 'green');

      // 3. UPDATE PACKAGE.JSON EXPORTS
      const packageJsonPath = path.join(packageDir, 'package.json');
      if (await this.fileExists(packageJsonPath)) {
        const packageJsonContent = await this.readFile(packageJsonPath);
        const packageJson = JSON.parse(packageJsonContent);
        
        // Update exports
        packageJson.exports = {
          ".": "./index.css",
          "./index.css": "./index.css", 
          "./dist.css": "./dist.css",
          "./dist.min.css": "./dist.min.css"
        };
        
        // Update files array to include src/
        if (packageJson.files) {
          if (!packageJson.files.includes("src/")) {
            packageJson.files = ["src/", ...packageJson.files.filter(f => f !== "src/index.css")];
          }
          if (!packageJson.files.includes("index.css")) {
            packageJson.files.push("index.css");
          }
        }
        
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
        this.log(`  ✅ Updated package.json exports`, 'green');
      }
      
      this.results.successful.push({
        package: packageName,
        indexSize: concatenatedContent.length,
        distSize: plainCSS.length
      });
      
    } catch (error) {
      this.results.failed.push({
        package: packageName,
        error: error.message
      });
      
      this.log(`  ❌ FAILED - ${error.message}`, 'red');
    }
    
    this.results.processed.push(packageName);
  }

  /**
   * Build all packages
   */
  async buildAllPackages(specificPackage = null) {
    this.logBold('🏗️  Complete Build System for Casoon Packages', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    try {
      if (specificPackage) {
        await this.buildPackage(specificPackage);
      } else {
        const entries = await fs.readdir(this.packagesDir, { withFileTypes: true });
        const packageDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        
        // Only build packages that start with 'tailwindcss-'
        const packagesToBuild = packageDirs.filter(pkg => pkg.startsWith('tailwindcss-'));
        
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

  printSummary() {
    this.log('\\n' + '═'.repeat(60), 'cyan');
    this.logBold('📊 BUILD SUMMARY', 'blue');
    this.log('═'.repeat(60), 'cyan');
    
    this.log(`📦 Total packages processed: ${this.results.processed.length}`, 'cyan');
    this.log(`✅ Successfully built: ${this.results.successful.length}`, 'green');
    this.log(`❌ Failed: ${this.results.failed.length}`, 'red');
    
    if (this.results.successful.length > 0) {
      this.log('\\n📈 Successfully built packages:', 'green');
      this.results.successful.forEach(result => {
        const indexKB = Math.round(result.indexSize / 1024);
        const distKB = Math.round(result.distSize / 1024);
        this.log(`   ${result.package}: index.css ${indexKB}KB, dist.css ${distKB}KB`);
      });
    }
    
    if (this.results.failed.length > 0) {
      this.log('\\n💥 Failed packages:', 'red');
      this.results.failed.forEach(result => {
        this.log(`   ${result.package}: ${result.error}`);
      });
    }
    
    const totalIndexSize = this.results.successful.reduce((sum, r) => sum + r.indexSize, 0);
    const totalDistSize = this.results.successful.reduce((sum, r) => sum + r.distSize, 0);
    
    this.log(`\\n📊 Total sizes: index.css ${Math.round(totalIndexSize / 1024)}KB, dist.css ${Math.round(totalDistSize / 1024)}KB`, 'cyan');
    
    this.log('\\n' + '═'.repeat(60), 'cyan');
    
    if (this.results.failed.length === 0) {
      this.logBold('🎉 All packages built successfully!', 'green');
    } else {
      this.logBold('⚠️  Some packages failed to build. See details above.', 'yellow');
    }
    
    this.log('═'.repeat(60), 'cyan');
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new CompleteBuildSystem();
  const specificPackage = process.argv[2];
  await builder.buildAllPackages(specificPackage);
}
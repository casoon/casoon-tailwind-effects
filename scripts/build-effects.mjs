#!/usr/bin/env node

/**
 * Effects Meta Package Builder
 * 
 * Combines all individual package index.css files into the effects package,
 * ensuring only one @import "tailwindcss" statement at the top.
 * 
 * Strategy:
 * 1. Read all core package index.css files
 * 2. Remove @import "tailwindcss" from individual files
 * 3. Combine content with single @import "tailwindcss" at top
 * 4. Generate clean dist.css for the meta package
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
  bold: '\x1b[1b'
};

class EffectsBuilder {
  constructor() {
    this.packagesDir = path.join(__dirname, '../packages');
    this.effectsDir = path.join(this.packagesDir, 'tailwindcss-effects');
    
    // Core packages to include in effects meta package
    this.corePackages = [
      'tailwindcss-utilities',
      'tailwindcss-animations', 
      'tailwindcss-glass',
      'tailwindcss-orbs'
    ];
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logBold(message, color = 'reset') {
    console.log(`${colors.bold}${colors[color]}${message}${colors.reset}`);
  }

  async readPackageIndex(packageName) {
    const indexPath = path.join(this.packagesDir, packageName, 'src', 'index.css');
    
    try {
      const content = await fs.readFile(indexPath, 'utf8');
      
      // Remove @import "tailwindcss"; and clean up extra whitespace
      const cleanContent = content
        .replace(/^@import\s+["']tailwindcss["'];?\s*$/gm, '')
        .replace(/^\s*\n/gm, '')
        .trim();
      
      return {
        package: packageName,
        content: cleanContent,
        success: true
      };
      
    } catch (error) {
      return {
        package: packageName,
        error: error.message,
        success: false
      };
    }
  }

  async buildCombinedCSS() {
    this.logBold('📦 Building Effects Meta Package', 'blue');
    this.log('═'.repeat(50), 'cyan');

    const packageContents = [];
    
    // Read all core package CSS files
    for (const packageName of this.corePackages) {
      this.log(`📖 Reading ${packageName}...`, 'yellow');
      
      const result = await this.readPackageIndex(packageName);
      
      if (result.success) {
        packageContents.push(result);
        this.log(`  ✅ Loaded ${result.content.length} chars`, 'green');
      } else {
        this.log(`  ❌ Failed: ${result.error}`, 'red');
        throw new Error(`Failed to read ${packageName}: ${result.error}`);
      }
    }

    // Build the combined CSS content
    const headerComment = `/*!
 * @casoon/tailwindcss-effects
 * Complete collection of CSS effects for Tailwind CSS v4 
 * Version 0.9.0 - Consolidated from ${this.corePackages.length} core packages
 * 
 * This meta package combines the consolidated core packages:
 * ${this.corePackages.map(pkg => ` * - ${pkg.replace('tailwindcss-', '')}`).join('\\n')}
 * 
 * Usage: @import "@casoon/tailwindcss-effects";
 */`;

    const combinedContent = [
      headerComment,
      '',
      '@import "tailwindcss";',
      '',
      ...packageContents.map(pkg => `/* === ${pkg.package.toUpperCase()} === */\\n${pkg.content}`)
    ].join('\\n');

    // Write the combined index.css
    const indexOutputPath = path.join(this.effectsDir, 'index.css');
    await fs.writeFile(indexOutputPath, combinedContent);
    
    this.log(`\\n✅ Generated combined index.css (${combinedContent.length} chars)`, 'green');

    // Also create styles/index.css (legacy path)
    const stylesDir = path.join(this.effectsDir, 'src', 'styles');
    await fs.mkdir(stylesDir, { recursive: true });
    const stylesOutputPath = path.join(stylesDir, 'index.css');
    
    // For styles/index.css, import from the main packages without tailwindcss import
    const stylesContent = [
      headerComment,
      '',
      ...this.corePackages.map(pkg => `@import '../../../${pkg}/src/index.css';`)
    ].join('\\n');
    
    await fs.writeFile(stylesOutputPath, stylesContent);
    
    this.log(`✅ Generated src/styles/index.css`, 'green');

    return combinedContent;
  }

  async buildDistCSS() {
    this.log(`\\n🔨 Building dist.css...`, 'yellow');
    
    try {
      // For dist.css, we combine all the dist.css files from individual packages
      // This gives us pure CSS without @import "tailwindcss"
      
      let combinedDistCSS = `/*!
 * @casoon/tailwindcss-effects - dist.css
 * Complete collection of CSS effects for Tailwind CSS v4 
 * Version 0.9.0 - Consolidated dist build
 * 
 * This file combines all individual package dist.css files
 * Import this when using without Tailwind CSS setup
 */\n\n`;
      
      for (const packageName of this.corePackages) {
        const distPath = path.join(this.packagesDir, packageName, 'dist.css');
        
        try {
          const distContent = await fs.readFile(distPath, 'utf8');
          combinedDistCSS += `/* === ${packageName.replace('tailwindcss-', '').toUpperCase()} === */\n${distContent}\n\n`;
        } catch (error) {
          this.log(`  ⚠️  Warning: Could not read ${packageName}/dist.css`, 'yellow');
        }
      }
      
      // Write the combined dist.css
      const distPath = path.join(this.effectsDir, 'dist.css');
      await fs.writeFile(distPath, combinedDistCSS);
      
      this.log(`  ✅ Generated dist.css (${this.formatBytes(combinedDistCSS.length)})`, 'green');
      
      return combinedDistCSS.length;
      
    } catch (error) {
      this.log(`  ❌ Failed to build dist.css: ${error.message}`, 'red');
      throw error;
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  async build() {
    try {
      // Build combined CSS
      await this.buildCombinedCSS();
      
      // Build dist.css
      await this.buildDistCSS();
      
      this.log('\\n🎉 Effects meta package built successfully!', 'green');
      this.log('═'.repeat(50), 'cyan');
      
      return true;
      
    } catch (error) {
      this.log(`\\n❌ Build failed: ${error.message}`, 'red');
      return false;
    }
  }
}

// Run the builder
const builder = new EffectsBuilder();
builder.build().then(success => {
  process.exit(success ? 0 : 1);
});
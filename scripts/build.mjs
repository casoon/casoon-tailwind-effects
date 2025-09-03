#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PKGS_DIR = join(ROOT, 'packages');

// Function to flatten CSS content (remove @layer nesting)
const flattenCSS = (cssContent) => {
  // Remove @layer wrappers while preserving content
  let flattened = cssContent
    .replace(/@layer\s+(components|utilities)\s*\{/g, '')
    .replace(/^\s*\}\s*$/gm, ''); // Remove standalone closing braces
  
  // Clean up excessive whitespace
  flattened = flattened
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
    
  return flattened;
};

// Function to build CSS distributions for a package
const buildCSSDistribution = (packagePath) => {
  const packageJson = JSON.parse(readFileSync(join(packagePath, 'package.json'), 'utf8'));
  const packageName = packageJson.name;
  
  const indexCssPath = join(packagePath, 'index.css');
  const distCssPath = join(packagePath, 'dist.css');
  
  if (!existsSync(indexCssPath)) {
    console.log(`⚠️  No index.css found for ${packageName}, skipping...`);
    return;
  }
  
  console.log(`🔧 Building CSS distribution for ${packageName}...`);
  
  try {
    const originalCSS = readFileSync(indexCssPath, 'utf8');
    let processedCSS;
    
    // Special handling for effects package (import aggregator)
    if (packageName === '@casoon/tailwindcss-effects') {
      processedCSS = originalCSS
        .replace(/@import "([^"]+)\/index\.css";/g, '@import "$1/dist.css";');
    } else {
      processedCSS = flattenCSS(originalCSS);
    }
    
    // Add header comment
    const header = `/* ========================================================================
   ${packageName} - Flattened CSS Distribution
   Tailwind CSS v4 compatible utilities without deep @layer nesting
   ===================================================================== */

`;
    
    const finalCSS = header + processedCSS;
    writeFileSync(distCssPath, finalCSS);
    
    console.log(`✅ Built dist.css for ${packageName}`);
    
  } catch (error) {
    console.error(`❌ Error building CSS for ${packageName}:`, error.message);
  }
};

// Function to validate plugin files
const validatePluginFiles = (packagePath) => {
  const packageJson = JSON.parse(readFileSync(join(packagePath, 'package.json'), 'utf8'));
  const packageName = packageJson.name;
  
  const pluginJSPath = join(packagePath, 'plugin.js');
  const pluginCJSPath = join(packagePath, 'plugin.cjs');
  
  console.log(`🔍 Validating plugin files for ${packageName}...`);
  
  if (!existsSync(pluginJSPath)) {
    console.error(`❌ Missing plugin.js for ${packageName}`);
    return false;
  }
  
  if (!existsSync(pluginCJSPath)) {
    console.error(`❌ Missing plugin.cjs for ${packageName}`);
    return false;
  }
  
  // Basic syntax validation (try to require/import)
  try {
    const pluginContent = readFileSync(pluginJSPath, 'utf8');
    if (!pluginContent.includes('export default function') && !pluginContent.includes('export { effectsPlugin')) {
      throw new Error('Missing default export function');
    }
    
    const cjsContent = readFileSync(pluginCJSPath, 'utf8');
    if (!cjsContent.includes('module.exports =')) {
      throw new Error('Missing CommonJS export');
    }
    
    console.log(`✅ Plugin files valid for ${packageName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Plugin validation failed for ${packageName}:`, error.message);
    return false;
  }
};

// Function to check package.json exports
const validatePackageExports = (packagePath) => {
  const packageJson = JSON.parse(readFileSync(join(packagePath, 'package.json'), 'utf8'));
  const packageName = packageJson.name;
  
  console.log(`📦 Validating package.json exports for ${packageName}...`);
  
  const requiredExports = ['.', './index.css', './dist.css', './plugin', './tokens.css'];
  const missingExports = [];
  
  if (!packageJson.exports) {
    console.error(`❌ No exports field found in package.json for ${packageName}`);
    return false;
  }
  
  requiredExports.forEach(exportPath => {
    if (!packageJson.exports[exportPath]) {
      missingExports.push(exportPath);
    }
  });
  
  if (missingExports.length > 0) {
    console.error(`❌ Missing exports for ${packageName}:`, missingExports.join(', '));
    return false;
  }
  
  if (!packageJson.main || !packageJson.module) {
    console.error(`❌ Missing main/module fields for ${packageName}`);
    return false;
  }
  
  console.log(`✅ Package exports valid for ${packageName}`);
  return true;
};

// Main build function
const buildPackages = () => {
  console.log('🏗️  Building @casoon/tailwindcss-effects packages...\n');
  
  const packageDirs = readdirSync(PKGS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  let allValid = true;
  
  // Build in dependency order (utilities first, effects last)
  const buildOrder = [
    'tailwindcss-utilities',
    'tailwindcss-animations',
    'tailwindcss-loading',
    'tailwindcss-micro-interactions',
    'tailwindcss-glass',
    'tailwindcss-orbs',
    'tailwindcss-gradients',
    'tailwindcss-scroll',
    'tailwindcss-navigation',
    'tailwindcss-effects'
  ];
  
  buildOrder.forEach(packageDir => {
    if (!packageDirs.includes(packageDir)) {
      console.log(`⚠️  Package ${packageDir} not found, skipping...`);
      return;
    }
    
    const packagePath = join(PKGS_DIR, packageDir);
    const packageJsonPath = join(packagePath, 'package.json');
    
    if (!existsSync(packageJsonPath)) {
      console.log(`⚠️  No package.json found for ${packageDir}, skipping...`);
      return;
    }
    
    console.log(`\\n--- Processing ${packageDir} ---`);
    
    // Validate package.json exports
    if (!validatePackageExports(packagePath)) {
      allValid = false;
    }
    
    // Validate plugin files
    if (!validatePluginFiles(packagePath)) {
      allValid = false;
    }
    
    // Build CSS distributions
    buildCSSDistribution(packagePath);
  });
  
  console.log('\\n' + '='.repeat(60));
  
  if (allValid) {
    console.log('🎉 Build completed successfully!');
    console.log('\\n📋 Summary:');
    console.log('   ✅ All packages have proper exports');
    console.log('   ✅ All plugin files are valid');
    console.log('   ✅ All CSS distributions built');
    console.log('\\n🚀 Ready for publishing!');
  } else {
    console.log('❌ Build completed with errors!');
    console.log('   Please fix the issues above before publishing.');
    process.exit(1);
  }
};

// Run the build
buildPackages();

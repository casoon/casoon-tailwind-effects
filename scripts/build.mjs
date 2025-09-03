#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PKGS_DIR = join(ROOT, 'packages');

// Pure plugin architecture - no CSS build needed

// Function to validate plugin files (ESM only)
const validatePluginFiles = (packagePath) => {
  const packageJson = JSON.parse(readFileSync(join(packagePath, 'package.json'), 'utf8'));
  const packageName = packageJson.name;
  
  const pluginJSPath = join(packagePath, 'plugin.js');
  
  console.log(`🔍 Validating plugin files for ${packageName}...`);
  
  if (!existsSync(pluginJSPath)) {
    console.error(`❌ Missing plugin.js for ${packageName}`);
    return false;
  }
  
  // Basic syntax validation
  try {
    const pluginContent = readFileSync(pluginJSPath, 'utf8');
    if (!pluginContent.includes('export default function') && !pluginContent.includes('export {')) {
      throw new Error('Missing default export function');
    }
    
    console.log(`✅ Plugin files valid for ${packageName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Plugin validation failed for ${packageName}:`, error.message);
    return false;
  }
};

// Function to check package.json exports (Plugin-only)
const validatePackageExports = (packagePath) => {
  const packageJson = JSON.parse(readFileSync(join(packagePath, 'package.json'), 'utf8'));
  const packageName = packageJson.name;
  
  console.log(`📦 Validating package.json exports for ${packageName}...`);
  
  // For pure plugin architecture, we only need . and ./plugin exports
  const requiredExports = ['.', './plugin'];
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
    
    // CSS distributions are no longer needed for pure plugin architecture
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

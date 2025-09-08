#!/usr/bin/env node

/**
 * Script to add minification to all package.json prepublishOnly scripts
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function updatePackageJson(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  try {
    const content = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(content);
    
    // Check if scripts section exists
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    // Add minification script if it doesn't exist
    if (!packageJson.scripts.minify) {
      const packageName = path.basename(packagePath);
      packageJson.scripts.minify = `node ../../scripts/minify-css.mjs ${packageName}`;
    }
    
    // Update prepublishOnly to include minification
    if (packageJson.scripts.prepublishOnly) {
      // If prepublishOnly exists, update it to include minification
      if (!packageJson.scripts.prepublishOnly.includes('minify')) {
        packageJson.scripts.prepublishOnly = 'npm run minify && npm run validate';
      }
    } else {
      // If prepublishOnly doesn't exist, create it
      packageJson.scripts.prepublishOnly = 'npm run minify && npm run validate';
    }
    
    // Add dist.min.css to files array if dist.css is there
    if (packageJson.files && packageJson.files.includes('dist.css')) {
      if (!packageJson.files.includes('dist.min.css')) {
        const distIndex = packageJson.files.indexOf('dist.css');
        packageJson.files.splice(distIndex + 1, 0, 'dist.min.css');
      }
    }
    
    // Update exports to include minified version
    if (packageJson.exports && packageJson.exports['.'] === './dist.css') {
      packageJson.exports['./dist.min.css'] = './dist.min.css';
    }
    
    // Write back the updated package.json
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`✅ Updated ${packageJson.name}`);
    
  } catch (error) {
    console.error(`❌ Failed to update ${packagePath}: ${error.message}`);
  }
}

async function main() {
  const packagesDir = path.join(__dirname, '../packages');
  
  try {
    const entries = await fs.readdir(packagesDir, { withFileTypes: true });
    const packageDirs = entries
      .filter(entry => entry.isDirectory())
      .map(entry => path.join(packagesDir, entry.name));
    
    console.log('📦 Adding minification scripts to packages...\n');
    
    for (const packageDir of packageDirs) {
      await updatePackageJson(packageDir);
    }
    
    console.log('\n🎉 All packages updated with minification support!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);

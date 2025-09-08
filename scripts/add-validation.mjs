#!/usr/bin/env node

/**
 * Script to add validation to all package.json files that don't have it
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
    
    // Add validation scripts if they don't exist
    if (!packageJson.scripts.validate) {
      packageJson.scripts.validate = 'node ../../scripts/validate-css.mjs';
    }
    
    if (!packageJson.scripts.prepublishOnly) {
      packageJson.scripts.prepublishOnly = 'npm run validate';
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
    
    console.log('📦 Adding validation scripts to packages...\n');
    
    for (const packageDir of packageDirs) {
      await updatePackageJson(packageDir);
    }
    
    console.log('\n🎉 All packages updated successfully!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);

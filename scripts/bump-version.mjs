#!/usr/bin/env node

/**
 * Version Bump Script for @casoon/tailwindcss-effects
 * 
 * Updates version in root package.json and all workspace packages
 * Supports patch, minor, major bumps
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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

class VersionBumper {
  constructor() {
    this.results = {
      updated: [],
      failed: [],
      oldVersion: null,
      newVersion: null
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logBold(message, color = 'reset') {
    console.log(`${colors.bold}${colors[color]}${message}${colors.reset}`);
  }

  incrementVersion(version, type) {
    const parts = version.split('.').map(Number);
    
    switch (type) {
      case 'patch':
        parts[2]++;
        break;
      case 'minor':
        parts[1]++;
        parts[2] = 0;
        break;
      case 'major':
        parts[0]++;
        parts[1] = 0;
        parts[2] = 0;
        break;
      default:
        throw new Error(`Invalid version type: ${type}. Use patch, minor, or major.`);
    }
    
    return parts.join('.');
  }

  async updatePackageVersion(packagePath, newVersion) {
    const packageJsonPath = path.join(packagePath, 'package.json');
    
    try {
      const content = await fs.readFile(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(content);
      const oldVersion = packageJson.version;
      
      packageJson.version = newVersion;
      
      // Update dependencies if they reference other @casoon packages
      if (packageJson.dependencies) {
        for (const dep in packageJson.dependencies) {
          if (dep.startsWith('@casoon/tailwindcss-')) {
            packageJson.dependencies[dep] = `^${newVersion}`;
          }
        }
      }
      
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      
      this.results.updated.push({
        name: packageJson.name,
        oldVersion,
        newVersion
      });
      
      this.log(`  ✅ ${packageJson.name}: ${oldVersion} → ${newVersion}`, 'green');
      
    } catch (error) {
      this.results.failed.push({
        path: packagePath,
        error: error.message
      });
      this.log(`  ❌ Failed to update ${packagePath}: ${error.message}`, 'red');
    }
  }

  async bumpAllVersions(bumpType) {
    this.logBold(`🚀 Version Bump: ${bumpType}`, 'blue');
    this.log('═'.repeat(50), 'cyan');
    
    // First, read root package.json to get current version
    const rootPackageJsonPath = path.join(__dirname, '../package.json');
    const rootContent = await fs.readFile(rootPackageJsonPath, 'utf8');
    const rootPackageJson = JSON.parse(rootContent);
    
    this.results.oldVersion = rootPackageJson.version;
    this.results.newVersion = this.incrementVersion(rootPackageJson.version, bumpType);
    
    this.log(`\n📦 Bumping from ${this.results.oldVersion} to ${this.results.newVersion}`, 'yellow');
    
    // Update root package.json
    rootPackageJson.version = this.results.newVersion;
    await fs.writeFile(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2) + '\n');
    this.log(`\n✅ Root package.json updated`, 'green');
    
    // Update all workspace packages
    this.log(`\n📦 Updating workspace packages:`, 'yellow');
    const packagesDir = path.join(__dirname, '../packages');
    
    try {
      const entries = await fs.readdir(packagesDir, { withFileTypes: true });
      const packageDirs = entries
        .filter(entry => entry.isDirectory())
        .map(entry => path.join(packagesDir, entry.name));
      
      for (const packageDir of packageDirs) {
        await this.updatePackageVersion(packageDir, this.results.newVersion);
      }
      
      this.printSummary();
      
    } catch (error) {
      this.log(`❌ Error reading packages directory: ${error.message}`, 'red');
      return false;
    }
    
    return this.results.failed.length === 0;
  }

  printSummary() {
    this.log('\n' + '═'.repeat(50), 'cyan');
    this.logBold('📊 VERSION BUMP SUMMARY', 'blue');
    this.log('═'.repeat(50), 'cyan');
    
    const { updated, failed, oldVersion, newVersion } = this.results;
    
    this.log(`📦 Packages updated: ${updated.length}`, 'cyan');
    this.log(`✅ Successful: ${updated.length}`, updated.length > 0 ? 'green' : 'red');
    this.log(`❌ Failed: ${failed.length}`, failed.length > 0 ? 'red' : 'green');
    
    if (failed.length > 0) {
      this.logBold(`\n💥 ${failed.length} PACKAGES FAILED`, 'red');
      failed.forEach(failure => {
        this.log(`  • ${failure.path}: ${failure.error}`, 'red');
      });
    } else if (updated.length > 0) {
      this.logBold(`\n🎉 ALL PACKAGES UPDATED SUCCESSFULLY!`, 'green');
      this.log(`Version bumped from ${oldVersion} to ${newVersion}`, 'green');
      
      this.log('\n📋 Next steps:', 'cyan');
      this.log('  1. Run: npm run validate', 'cyan');
      this.log('  2. Run: npm run minify:all', 'cyan');
      this.log('  3. Run: git add -A && git commit -m "chore: Bump version to ' + newVersion + '"', 'cyan');
      this.log('  4. Run: git tag v' + newVersion, 'cyan');
    }
    
    this.log('\n' + '═'.repeat(50), 'cyan');
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const bumpType = args[0];
  
  if (!bumpType || !['patch', 'minor', 'major'].includes(bumpType)) {
    console.error(`${colors.red}${colors.bold}Usage: node scripts/bump-version.mjs <patch|minor|major>${colors.reset}`);
    console.error(`${colors.yellow}Examples:${colors.reset}`);
    console.error(`  node scripts/bump-version.mjs patch   # 0.7.1 → 0.7.2`);
    console.error(`  node scripts/bump-version.mjs minor   # 0.7.1 → 0.8.0`);
    console.error(`  node scripts/bump-version.mjs major   # 0.7.1 → 1.0.0`);
    process.exit(1);
  }
  
  const bumper = new VersionBumper();
  const success = await bumper.bumpAllVersions(bumpType);
  
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(`${colors.red}${colors.bold}❌ Version bump failed with error:${colors.reset}`);
    console.error(error);
    process.exit(1);
  });
}

export default VersionBumper;

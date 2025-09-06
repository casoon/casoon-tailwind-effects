#!/usr/bin/env node

/**
 * Version Preparation Script
 * Runs before version bumps to ensure everything is ready
 */

import { execSync } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function run(command, description) {
  console.log(`${colors.blue}🔄 ${description}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✅ ${description} completed${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ ${description} failed${colors.reset}`);
    throw error;
  }
}

async function prepareVersion() {
  console.log(`${colors.cyan}${colors.bright}📝 Preparing for version bump...${colors.reset}\n`);
  
  const versionType = process.argv[2] || 'patch';
  console.log(`${colors.blue}Version type: ${versionType}${colors.reset}\n`);

  // 1. Generate fresh catalogs
  run('npm run generate:catalog', 'Generating package catalogs');

  // 2. Generate/update plugins
  run('npm run generate:plugins', 'Generating plugins');

  // 3. Run all tests
  run('npm test', 'Running test suite');

  // 4. Verify versions are synced
  run('npm run version:check', 'Checking version consistency');

  // 5. Build packages
  run('npm run build', 'Building packages');

  console.log(`${colors.green}${colors.bright}\n✅ Version preparation complete! Ready for version bump.${colors.reset}`);
}

prepareVersion().catch(error => {
  console.error(`${colors.red}Fatal error during version preparation:${colors.reset}`, error);
  process.exit(1);
});

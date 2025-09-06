#!/usr/bin/env node

/**
 * Release Preparation Script
 * Comprehensive pre-release checks and preparations
 */

import { execSync } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
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

function runSilent(command, description) {
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(`${colors.green}✅ ${description}${colors.reset}`);
    return output;
  } catch (error) {
    console.error(`${colors.red}❌ ${description} failed${colors.reset}`);
    throw error;
  }
}

async function prepareRelease() {
  console.log(`${colors.cyan}${colors.bright}🚀 Preparing for release...${colors.reset}\n`);

  // 1. Check npm authentication
  try {
    const whoami = runSilent('npm whoami', 'Checking npm authentication');
    console.log(`${colors.blue}📝 Logged in as: ${whoami.trim()}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Not logged in to npm. Please run: npm login${colors.reset}`);
    process.exit(1);
  }

  // 2. Check git status
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log(`${colors.yellow}⚠️  Uncommitted changes detected:${colors.reset}`);
      console.log(status);
      console.log(`${colors.yellow}Please commit or stash changes before release${colors.reset}`);
      process.exit(1);
    }
    console.log(`${colors.green}✅ Git working directory clean${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Git status check failed${colors.reset}`);
    throw error;
  }

  // 3. Generate fresh catalogs
  run('npm run generate:catalog', 'Generating package catalogs');

  // 4. Generate/update plugins  
  run('npm run generate:plugins', 'Generating plugins');

  // 5. Extract and sync class definitions
  run('npm run test:classes:extract', 'Extracting class definitions');

  // 6. Run comprehensive test suite
  run('npm test', 'Running test suite');

  // 7. Verify version consistency
  run('npm run version:check', 'Checking version consistency');

  // 8. Build packages
  run('npm run build', 'Building packages');

  // 9. CSS packages are manually maintained (dist.css files)
  // run('npm run build:packages-css', 'Building CSS packages');

  // 10. Integration test
  run('npm run test:integration', 'Running integration tests');

  console.log(`${colors.green}${colors.bright}\n🎉 Release preparation complete!${colors.reset}`);
  console.log(`${colors.cyan}Next steps:${colors.reset}`);
  console.log(`${colors.blue}  • npm run release:dry    (test release)${colors.reset}`);
  console.log(`${colors.blue}  • npm run release:all    (publish all packages)${colors.reset}`);
}

prepareRelease().catch(error => {
  console.error(`${colors.red}Fatal error during release preparation:${colors.reset}`, error);
  process.exit(1);
});

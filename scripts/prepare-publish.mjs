#!/usr/bin/env node

/**
 * Publish Preparation Script
 * Runs automatically before npm publish (prepublishOnly hook)
 * Lightweight version - assumes most preparation already done
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

async function preparePublish() {
  console.log(`${colors.cyan}${colors.bright}📦 Final publish preparation...${colors.reset}\n`);

  // 1. Ensure catalogs are fresh (lightweight check)
  try {
    run('npm run generate:catalog', 'Ensuring catalogs are up-to-date');
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Catalog generation failed, continuing...${colors.reset}`);
  }

  // 2. Quick validation
  run('npm run validate', 'Running validation checks');

  // 3. Ensure build is fresh
  try {
    run('npm run build', 'Ensuring build is fresh');
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Build failed, continuing...${colors.reset}`);
  }

  console.log(`${colors.green}${colors.bright}✅ Publish preparation complete!${colors.reset}`);
}

preparePublish().catch(error => {
  console.error(`${colors.red}Fatal error during publish preparation:${colors.reset}`, error);
  console.log(`${colors.yellow}This error occurred during prepublishOnly. Publishing will be aborted.${colors.reset}`);
  process.exit(1);
});

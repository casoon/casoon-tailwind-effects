#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const packageDirs = [
  'packages/tailwindcss-animations',
  'packages/tailwindcss-effects',
  'packages/tailwindcss-glass',
  'packages/tailwindcss-gradients',
  'packages/tailwindcss-loading',
  'packages/tailwindcss-micro-interactions',
  'packages/tailwindcss-navigation',
  'packages/tailwindcss-orbs',
  'packages/tailwindcss-scroll',
  'packages/tailwindcss-utilities'
];

console.log('🚀 Publishing all @casoon packages to npm...\n');

const results = [];

for (const dir of packageDirs) {
  const packageJsonPath = join(dir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const packageName = packageJson.name;
  const version = packageJson.version;

  console.log(`📦 Publishing ${packageName}@${version}...`);
  
  try {
    // Change to package directory and publish
    process.chdir(dir);
    execSync('npm publish --access public', { stdio: 'pipe' });
    process.chdir('../../'); // Back to root
    
    console.log(`  ✅ SUCCESS: ${packageName}@${version} published`);
    results.push({ name: packageName, version, status: 'success' });
  } catch (error) {
    process.chdir('../../'); // Ensure we're back to root even on error
    console.log(`  ❌ FAILED: ${packageName}@${version}`);
    console.log(`     Error: ${error.message.split('\n')[0]}`);
    results.push({ name: packageName, version, status: 'failed', error: error.message });
  }
  
  console.log('');
}

console.log('════════════════════════════════════════════════════════════');
console.log('📊 PUBLISH SUMMARY');
console.log('════════════════════════════════════════════════════════════');

const successful = results.filter(r => r.status === 'success');
const failed = results.filter(r => r.status === 'failed');

console.log(`📦 Total packages: ${results.length}`);
console.log(`✅ Published successfully: ${successful.length}`);
console.log(`❌ Failed: ${failed.length}`);

if (successful.length > 0) {
  console.log('\n✅ Successfully published:');
  successful.forEach(r => console.log(`   ${r.name}@${r.version}`));
}

if (failed.length > 0) {
  console.log('\n❌ Failed to publish:');
  failed.forEach(r => console.log(`   ${r.name}@${r.version} - ${r.error.split('\n')[0]}`));
}

console.log('\n════════════════════════════════════════════════════════════');

if (failed.length === 0) {
  console.log('🎉 ALL PACKAGES PUBLISHED SUCCESSFULLY!');
  console.log('🌐 Available at: https://www.npmjs.com/org/casoon');
} else {
  console.log('⚠️  Some packages failed to publish. Please check the errors above.');
  process.exit(1);
}

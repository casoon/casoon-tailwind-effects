#!/usr/bin/env node

/**
 * Test script to verify that all plugins follow the v4 API structure
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

async function testPlugin(pluginPath) {
  try {
    const content = await readFile(pluginPath, 'utf8');
    
    // Check if it's using the new v4 plugin structure
    const hasV4Import = content.includes("import plugin from 'tailwindcss/plugin'");
    const hasV4Export = content.includes('export default plugin(') || content.includes('export default {');
    const hasV4Array = content.includes('export default ['); // Array of plugins for meta-packages
    const hasOldHandler = content.includes('handler: (');
    const hasOldFunction = content.includes('export default function') && !content.includes('export default [');
    
    return {
      path: pluginPath,
      isV4Compatible: (hasV4Import || content.includes('export default {') || hasV4Array) && !hasOldHandler && !hasOldFunction,
      details: {
        hasV4Import,
        hasV4Export,
        hasV4Array,
        hasOldHandler,
        hasOldFunction
      }
    };
  } catch (error) {
    return {
      path: pluginPath,
      isV4Compatible: false,
      error: error.message
    };
  }
}

async function runTests() {
  console.log('🧪 Testing Tailwind CSS v4 Plugin Compatibility\n');
  
  const packagesDir = './packages';
  const packages = await readdir(packagesDir);
  const results = [];
  
  for (const pkg of packages) {
    if (pkg.startsWith('tailwindcss-')) {
      const pluginPath = join(packagesDir, pkg, 'plugin.js');
      const result = await testPlugin(pluginPath);
      results.push(result);
    }
  }
  
  // Print results
  let allPassed = true;
  
  for (const result of results) {
    const status = result.isV4Compatible ? '✅' : '❌';
    const packageName = result.path.split('/')[2];
    
    console.log(`${status} ${packageName}`);
    
    if (!result.isV4Compatible) {
      allPassed = false;
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      } else {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
      }
    }
    
    console.log('');
  }
  
  console.log(`\n📊 Summary: ${results.filter(r => r.isV4Compatible).length}/${results.length} plugins are v4 compatible`);
  
  if (allPassed) {
    console.log('🎉 All plugins successfully converted to v4 API!');
    process.exit(0);
  } else {
    console.log('⚠️  Some plugins need attention');
    process.exit(1);
  }
}

runTests().catch(console.error);

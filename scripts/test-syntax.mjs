#!/usr/bin/env node

/**
 * Syntax Test für alle Plugin-Dateien
 * 
 * Prüft alle plugin.js Dateien in den packages/ Verzeichnissen auf JavaScript-Syntax-Fehler.
 * Verhindert Deployment, wenn Syntax-Fehler gefunden werden.
 */

import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { pathToFileURL } from 'url';

const PACKAGES_DIR = 'packages';

async function findPluginFiles() {
  const pluginFiles = [];
  
  try {
    const entries = await readdir(PACKAGES_DIR);
    
    for (const entry of entries) {
      const packagePath = join(PACKAGES_DIR, entry);
      const packageStat = await stat(packagePath);
      
      if (packageStat.isDirectory()) {
        const pluginPath = join(packagePath, 'plugin.js');
        
        try {
          await stat(pluginPath);
          pluginFiles.push(pluginPath);
        } catch {
          // plugin.js exists not in this package, skip
        }
      }
    }
  } catch (error) {
    console.error('❌ Error reading packages directory:', error.message);
    process.exit(1);
  }
  
  return pluginFiles;
}

async function testPluginSyntax(pluginPath) {
  try {
    console.log(`🔍 Testing ${pluginPath}...`);
    
    // Convert to file:// URL for dynamic import
    const fileUrl = pathToFileURL(join(process.cwd(), pluginPath));
    await import(fileUrl.href);
    
    console.log(`✅ ${pluginPath} - Syntax OK`);
    return true;
  } catch (error) {
    console.error(`❌ ${pluginPath} - Syntax Error:`);
    console.error(`   ${error.message}`);
    
    // Show more detailed error for debugging
    if (error.stack) {
      const relevantStack = error.stack
        .split('\n')
        .slice(0, 5)  // Only show first few lines of stack
        .map(line => `   ${line}`)
        .join('\n');
      console.error(relevantStack);
    }
    
    return false;
  }
}

async function main() {
  console.log('🧪 Running JavaScript syntax tests for all plugin files...\n');
  
  const pluginFiles = await findPluginFiles();
  
  if (pluginFiles.length === 0) {
    console.log('⚠️  No plugin.js files found in packages/ directory');
    return;
  }
  
  console.log(`Found ${pluginFiles.length} plugin file(s) to test:\n`);
  
  let allPassed = true;
  const results = [];
  
  for (const pluginFile of pluginFiles) {
    const passed = await testPluginSyntax(pluginFile);
    results.push({ file: pluginFile, passed });
    
    if (!passed) {
      allPassed = false;
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log('================');
  
  for (const result of results) {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.file}`);
  }
  
  console.log('================\n');
  
  if (allPassed) {
    console.log(`🎉 All ${pluginFiles.length} plugin file(s) passed syntax validation!`);
    process.exit(0);
  } else {
    const failedCount = results.filter(r => !r.passed).length;
    console.error(`💥 ${failedCount} out of ${pluginFiles.length} plugin file(s) failed syntax validation!`);
    console.error('Please fix the syntax errors before proceeding with deployment.');
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

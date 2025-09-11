#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { resolve } from 'path';
import postcss from 'postcss';

const packageName = process.env.npm_package_name;
const currentDir = process.cwd();

console.log(`🔍 CSS Validation for ${packageName}`);
console.log('═'.repeat(60));

async function validatePackage() {
  try {
    const cssPath = resolve(currentDir, 'dist.css');
    const cssContent = await readFile(cssPath, 'utf8');
    
    // Parse CSS to count classes
    const root = postcss.parse(cssContent);
    let classCount = 0;
    let csClassCount = 0;
    
    root.walkRules(rule => {
      const matches = rule.selector.match(/\.[a-zA-Z][a-zA-Z0-9-_]*/g);
      if (matches) {
        classCount += matches.length;
        csClassCount += matches.filter(match => match.includes('cs-')).length;
      }
    });
    
    const fileSize = Buffer.byteLength(cssContent, 'utf8');
    const warnings = [];
    
    // Check for very long selectors (simplified)
    const longSelectors = cssContent.match(/.{200,}/g) || [];
    if (longSelectors.length > 0) {
      warnings.push(`⚠️  Very long CSS selectors found (${longSelectors.length})`);
    }
    
    // Check for high !important usage
    const importantCount = (cssContent.match(/!important/g) || []).length;
    if (importantCount > 10) {
      warnings.push(`⚠️  High !important usage: ${importantCount} occurrences`);
    }
    
    console.log(`📦 Validating ${packageName}...`);
    console.log(`  ✅ PASSED`);
    console.log(`     Size: ${fileSize} bytes, Classes: ${classCount} (cs-: ${csClassCount})`);
    
    if (warnings.length > 0) {
      console.log(`     Warnings (${warnings.length}):`);
      warnings.forEach(warning => console.log(`       ${warning}`));
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ PACKAGE VALIDATION PASSED');
    console.log('═'.repeat(60));
    
    process.exit(0);
    
  } catch (error) {
    console.error(`❌ FAILED: ${error.message}`);
    console.log('\n' + '═'.repeat(60));
    console.log('❌ PACKAGE VALIDATION FAILED');
    console.log('═'.repeat(60));
    process.exit(1);
  }
}

validatePackage();

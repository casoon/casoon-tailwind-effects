#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/**
 * Basic integration test to verify plugin architecture works
 */
async function runIntegrationTests() {
  console.log('🧪 Running integration tests...\n');
  
  let allPassed = true;
  
  // Test 1: Can import main plugin
  try {
    console.log('📦 Testing main plugin import...');
    const effects = await import('@casoon/tailwindcss-effects');
    
    // v4 plugin objects have direct handler, not function export
    if (typeof effects.default !== 'object' || !effects.default.handler) {
      throw new Error('Default export is not a v4 plugin object with handler');
    }
    
    if (typeof effects.default.handler !== 'function') {
      throw new Error('Plugin handler is not a function');
    }
    
    console.log('✅ Main plugin import works');
    
  } catch (error) {
    console.error('❌ Main plugin import failed:', error.message);
    allPassed = false;
  }
  
  // Test 2: Can import individual plugins
  try {
    console.log('📦 Testing individual plugin imports...');
    const animations = await import('@casoon/tailwindcss-animations');
    const glass = await import('@casoon/tailwindcss-glass');
    const utilities = await import('@casoon/tailwindcss-utilities');
    
    if (typeof animations.default !== 'object' || !animations.default.handler) {
      throw new Error('animations export is not a v4 plugin object');
    }
    if (typeof glass.default !== 'object' || !glass.default.handler) {
      throw new Error('glass export is not a v4 plugin object');
    }
    if (typeof utilities.default !== 'object' || !utilities.default.handler) {
      throw new Error('utilities export is not a v4 plugin object');
    }
    
    console.log('✅ Individual plugin imports work');
    
  } catch (error) {
    console.error('❌ Individual plugin imports failed:', error.message);
    allPassed = false;
  }
  
  // Test 3: CommonJS compatibility
  try {
    console.log('📦 Testing CommonJS compatibility...');
    const { execSync } = await import('child_process');
    
    const testScript = `
      const effects = require('@casoon/tailwindcss-effects');
      if (typeof effects !== 'object' || !effects.handler) {
        throw new Error('CJS import failed - expected v4 plugin object');
      }
      if (typeof effects.handler !== 'function') {
        throw new Error('CJS plugin handler is not a function');
      }
      console.log('CJS import successful');
    `;
    
    execSync(`node -e "${testScript.replace(/\n/g, ' ')}"`, { 
      cwd: ROOT,
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    console.log('✅ CommonJS compatibility works');
    
  } catch (error) {
    console.error('❌ CommonJS compatibility failed:', error.message);
    allPassed = false;
  }
  
  // Test 4: CSS distributions exist
  try {
    console.log('📦 Testing CSS distributions...');
    
    const testPaths = [
      'packages/tailwindcss-effects/dist.css',
      'packages/tailwindcss-animations/dist.css',
      'packages/tailwindcss-glass/dist.css',
      'packages/tailwindcss-utilities/dist.css'
    ];
    
    testPaths.forEach(path => {
      const fullPath = join(ROOT, path);
      if (!existsSync(fullPath)) {
        throw new Error(`Missing CSS distribution: ${path}`);
      }
      
      const content = readFileSync(fullPath, 'utf8');
      if (content.length < 100) {
        throw new Error(`CSS distribution too small: ${path}`);
      }
      
      // Check that @layer nesting is flattened
      if (content.includes('@layer components {') || content.includes('@layer utilities {')) {
        throw new Error(`CSS distribution still has @layer nesting: ${path}`);
      }
    });
    
    console.log('✅ CSS distributions are valid');
    
  } catch (error) {
    console.error('❌ CSS distributions test failed:', error.message);
    allPassed = false;
  }
  
  // Test 5: Package.json exports
  try {
    console.log('📦 Testing package.json exports...');
    
    const packagePaths = [
      'packages/tailwindcss-effects/package.json',
      'packages/tailwindcss-animations/package.json',
      'packages/tailwindcss-glass/package.json'
    ];
    
    packagePaths.forEach(path => {
      const fullPath = join(ROOT, path);
      const pkg = JSON.parse(readFileSync(fullPath, 'utf8'));
      
      if (!pkg.exports || !pkg.exports['.'] || !pkg.exports['./plugin']) {
        throw new Error(`Missing exports in ${path}`);
      }
      
      if (!pkg.main || !pkg.module) {
        throw new Error(`Missing main/module fields in ${path}`);
      }
    });
    
    console.log('✅ Package.json exports are valid');
    
  } catch (error) {
    console.error('❌ Package.json exports test failed:', error.message);
    allPassed = false;
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 All integration tests passed!');
    console.log('🚀 Plugin architecture is working correctly.');
    process.exit(0);
  } else {
    console.log('❌ Some integration tests failed!');
    console.log('🔧 Please fix the issues above before proceeding.');
    process.exit(1);
  }
}

// Run tests
runIntegrationTests().catch(error => {
  console.error('💥 Test runner failed:', error);
  process.exit(1);
});

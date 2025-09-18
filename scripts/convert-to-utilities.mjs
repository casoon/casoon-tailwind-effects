#!/usr/bin/env node

/**
 * Script to convert CSS classes to Tailwind v4 @utility format
 * Converts .cs-class-name { ... } to @utility cs-class-name { ... }
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '..', 'packages');

// Find all CSS files in src/ directories
function findCssFiles() {
  const cssFiles = [];
  const packages = fs.readdirSync(packagesDir)
    .filter(name => name.startsWith('tailwindcss-'))
    .map(name => path.join(packagesDir, name));

  for (const packagePath of packages) {
    const srcPath = path.join(packagePath, 'src');
    if (fs.existsSync(srcPath)) {
      // Find all .css files recursively in src/
      const findCommand = `find "${srcPath}" -name "*.css" -type f`;
      try {
        const output = execSync(findCommand, { encoding: 'utf8' });
        const files = output.trim().split('\n').filter(f => f.length > 0);
        cssFiles.push(...files);
      } catch (error) {
        console.log(`No CSS files found in ${srcPath}`);
      }
    }
  }
  
  return cssFiles;
}

// Convert CSS class to @utility format
function convertCssContent(content) {
  // Convert .cs-class-name { ... } to @utility cs-class-name { ... }
  let converted = content.replace(/\.cs-([a-zA-Z0-9-_]+)\s*\{([^}]*)\}/g, '@utility cs-$1 {$2}');
  
  // Handle multi-line CSS classes more carefully
  converted = converted.replace(/\.cs-([a-zA-Z0-9-_]+)\s*\{([^}]*(?:\}[^}]*)*)\}/gs, (match, className, rules) => {
    // Make sure we're not converting things that are already @utility
    if (match.includes('@utility')) {
      return match;
    }
    return `@utility cs-${className} {${rules}}`;
  });
  
  return converted;
}

// Process all CSS files
function convertAllFiles() {
  const cssFiles = findCssFiles();
  let convertedCount = 0;
  
  console.log(`Found ${cssFiles.length} CSS files to process...\n`);
  
  for (const filePath of cssFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Check if file contains .cs- classes
      if (content.includes('.cs-')) {
        const convertedContent = convertCssContent(content);
        
        // Only write if content actually changed
        if (convertedContent !== originalContent) {
          fs.writeFileSync(filePath, convertedContent, 'utf8');
          convertedCount++;
          
          // Count conversions
          const classMatches = originalContent.match(/\.cs-[a-zA-Z0-9-_]+\s*\{/g) || [];
          console.log(`✓ ${path.relative(packagesDir, filePath)} - ${classMatches.length} utilities converted`);
        } else {
          console.log(`- ${path.relative(packagesDir, filePath)} - no changes needed`);
        }
      } else {
        console.log(`- ${path.relative(packagesDir, filePath)} - no .cs- classes found`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
    }
  }
  
  console.log(`\n🎉 Conversion complete! ${convertedCount} files converted to @utility format.`);
  console.log('\nNext steps:');
  console.log('1. Review the converted files');
  console.log('2. Run build to update dist files');
  console.log('3. Test with Tailwind v4');
}

// Run conversion
convertAllFiles();
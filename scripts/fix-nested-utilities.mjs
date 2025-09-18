#!/usr/bin/env node

/**
 * Script to fix nested @utility in @media queries for Tailwind v4
 * Converts @media { @utility } to top-level @utility with @media inside
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '..', 'packages');

// Find all CSS files that might have nested utilities
function findProblemFiles() {
  const cssFiles = [];
  const packages = fs.readdirSync(packagesDir)
    .filter(name => name.startsWith('tailwindcss-'))
    .map(name => path.join(packagesDir, name));

  for (const packagePath of packages) {
    const srcPath = path.join(packagePath, 'src');
    if (fs.existsSync(srcPath)) {
      const findCommand = `find "${srcPath}" -name "*.css" -type f`;
      try {
        const output = execSync(findCommand, { encoding: 'utf8' });
        const files = output.trim().split('\n').filter(f => f.length > 0);
        cssFiles.push(...files);
      } catch (error) {
        // Skip if no CSS files
      }
    }
  }
  
  return cssFiles;
}

// Fix nested @utility in @media queries
function fixNestedUtilities(content) {
  // Pattern to match @media { @utility ... } structures
  const mediaUtilityPattern = /@media\s*\([^)]+\)\s*\{([^}]*@utility[^}]+)*\}/gs;
  
  let fixed = content;
  let extraUtilities = [];
  
  // Find and extract nested utilities
  fixed = fixed.replace(mediaUtilityPattern, (match) => {
    console.log('Found nested @media block:', match.substring(0, 100) + '...');
    
    // Extract the media query condition
    const mediaCondition = match.match(/@media\s*\([^)]+\)/)[0];
    
    // Find all @utility blocks inside this @media
    const utilityPattern = /@utility\s+([a-zA-Z0-9-_]+)\s*\{([^}]*)\}/g;
    let utilityMatch;
    
    while ((utilityMatch = utilityPattern.exec(match)) !== null) {
      const utilityName = utilityMatch[1];
      const utilityRules = utilityMatch[2].trim();
      
      // Create a new top-level utility with the media query inside
      const newUtility = `@utility ${utilityName} {\n  ${mediaCondition} {\n    ${utilityRules}\n  }\n}`;
      extraUtilities.push(newUtility);
      
      console.log(`  Extracted utility: ${utilityName}`);
    }
    
    // Return empty or comment to remove the original @media block
    return `/* Moved nested utilities to top-level - see end of file */`;
  });
  
  // Add the extracted utilities at the end
  if (extraUtilities.length > 0) {
    fixed += '\n\n/* Utilities extracted from @media queries */\n';
    fixed += extraUtilities.join('\n\n');
  }
  
  return fixed;
}

// Process all files
function fixAllFiles() {
  const cssFiles = findProblemFiles();
  let fixedCount = 0;
  
  console.log(`Found ${cssFiles.length} CSS files to check...\n`);
  
  for (const filePath of cssFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file has nested @utility in @media
      if (content.includes('@media') && content.includes('@utility')) {
        const mediaUtilityPattern = /@media\s*\([^)]+\)\s*\{[^}]*@utility[^}]*\}/s;
        
        if (mediaUtilityPattern.test(content)) {
          console.log(`Fixing: ${path.relative(packagesDir, filePath)}`);
          
          const fixedContent = fixNestedUtilities(content);
          
          if (fixedContent !== content) {
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            fixedCount++;
            console.log(`  ✓ Fixed nested utilities\n`);
          }
        } else {
          console.log(`- ${path.relative(packagesDir, filePath)} - no nested utilities found`);
        }
      } else {
        console.log(`- ${path.relative(packagesDir, filePath)} - no @media/@utility combination`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} files with nested utilities!`);
  console.log('\nNext steps:');
  console.log('1. Review the fixed files');
  console.log('2. Test build: npm run build');
  console.log('3. Generate new dist files');
}

// Run the fix
fixAllFiles();
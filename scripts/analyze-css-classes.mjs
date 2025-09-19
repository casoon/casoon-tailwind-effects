#!/usr/bin/env node

/**
 * CSS Classes Inventory - Complete analysis for consolidation
 * Analyzes all CSS classes across packages for Tailwind v4 migration
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGES_DIR = path.join(__dirname, '../packages');

// New package structure mapping
const CONSOLIDATION_MAP = {
  'tailwindcss-core': ['tailwindcss-utilities', 'tailwindcss-forms', 'tailwindcss-typography'],
  'tailwindcss-glass': ['tailwindcss-glass', 'tailwindcss-cards', 'tailwindcss-navigation'],
  'tailwindcss-animations': ['tailwindcss-animations', 'tailwindcss-micro-interactions', 'tailwindcss-loading'],
  'tailwindcss-effects': ['tailwindcss-orbs', 'tailwindcss-scroll', 'tailwindcss-gradients']
};

async function extractCSSClasses(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Extract CSS classes (.classname)
    const classMatches = content.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g) || [];
    const classes = classMatches.map(match => match.slice(1));
    
    // Extract @utility directives
    const utilityMatches = content.match(/@utility\s+([a-zA-Z0-9-]+)/g) || [];
    const utilities = utilityMatches.map(match => match.replace('@utility ', ''));
    
    // Extract @component directives
    const componentMatches = content.match(/@component\s+([a-zA-Z0-9-]+)/g) || [];
    const components = componentMatches.map(match => match.replace('@component ', ''));
    
    return {
      classes: [...new Set(classes)],
      utilities: [...new Set(utilities)],
      components: [...new Set(components)]
    };
  } catch (error) {
    return { classes: [], utilities: [], components: [] };
  }
}

async function analyzePackage(packageName) {
  const packageDir = path.join(PACKAGES_DIR, packageName);
  const srcDir = path.join(packageDir, 'src');
  
  try {
    const allClasses = [];
    const allUtilities = [];
    const allComponents = [];
    const fileDetails = [];

    async function walkDir(dir) {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            await walkDir(fullPath);
          } else if (entry.name.endsWith('.css')) {
            const relativePath = path.relative(srcDir, fullPath);
            const { classes, utilities, components } = await extractCSSClasses(fullPath);
            
            allClasses.push(...classes);
            allUtilities.push(...utilities);
            allComponents.push(...components);
            
            if (classes.length > 0 || utilities.length > 0 || components.length > 0) {
              fileDetails.push({
                file: relativePath,
                classes: classes.filter(c => c.startsWith('cs-')),
                utilities,
                components,
                totalClasses: classes.length
              });
            }
          }
        }
      } catch (error) {
        // Directory doesn't exist or not accessible
      }
    }

    await walkDir(srcDir);

    return {
      package: packageName,
      totalFiles: fileDetails.length,
      allCsClasses: [...new Set(allClasses.filter(c => c.startsWith('cs-')))],
      allUtilities: [...new Set(allUtilities)],
      allComponents: [...new Set(allComponents)],
      files: fileDetails
    };

  } catch (error) {
    return {
      package: packageName,
      totalFiles: 0,
      allCsClasses: [],
      allUtilities: [],
      allComponents: [],
      files: [],
      error: error.message
    };
  }
}

async function main() {
  console.log('🔍 ANALYZING ALL PACKAGES FOR CONSOLIDATION\n');
  console.log('📋 Target Structure:');
  Object.entries(CONSOLIDATION_MAP).forEach(([newPkg, oldPkgs]) => {
    console.log(`   ${newPkg} ← ${oldPkgs.join(', ')}`);
  });
  console.log('\n' + '='.repeat(80) + '\n');

  const allResults = [];

  // Analyze all existing packages
  const packageDirs = await fs.readdir(PACKAGES_DIR, { withFileTypes: true });
  
  for (const entry of packageDirs) {
    if (entry.isDirectory()) {
      const result = await analyzePackage(entry.name);
      allResults.push(result);
    }
  }

  // Group by new consolidated packages
  console.log('📊 CONSOLIDATION ANALYSIS:\n');
  
  for (const [newPackage, oldPackages] of Object.entries(CONSOLIDATION_MAP)) {
    console.log(`🎯 ${newPackage.toUpperCase()}`);
    console.log('─'.repeat(40));
    
    let totalClasses = 0;
    let totalUtilities = 0;
    let totalComponents = 0;
    let totalFiles = 0;
    
    for (const oldPackage of oldPackages) {
      const result = allResults.find(r => r.package === oldPackage);
      if (result && !result.error) {
        console.log(`   📦 ${oldPackage}:`);
        console.log(`      CSS Classes: ${result.allCsClasses.length}`);
        console.log(`      @utility: ${result.allUtilities.length}`);
        console.log(`      @component: ${result.allComponents.length}`);
        console.log(`      Files: ${result.totalFiles}`);
        
        if (result.allCsClasses.length > 0) {
          console.log(`      Classes: ${result.allCsClasses.slice(0, 5).join(', ')}${result.allCsClasses.length > 5 ? '...' : ''}`);
        }
        
        totalClasses += result.allCsClasses.length;
        totalUtilities += result.allUtilities.length;
        totalComponents += result.allComponents.length;
        totalFiles += result.totalFiles;
      } else {
        console.log(`   📦 ${oldPackage}: ❌ ${result?.error || 'Not found'}`);
      }
      console.log();
    }
    
    console.log(`   📈 CONSOLIDATED TOTALS:`);
    console.log(`      Total CSS Classes: ${totalClasses}`);
    console.log(`      Total @utility: ${totalUtilities}`);
    console.log(`      Total @component: ${totalComponents}`);
    console.log(`      Total Files: ${totalFiles}`);
    console.log();
  }

  // Generate detailed inventory
  const inventoryPath = path.join(__dirname, '../CONSOLIDATION_INVENTORY.md');
  let markdown = '# CSS Consolidation Inventory\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;
  
  markdown += '## Consolidation Plan\n\n';
  Object.entries(CONSOLIDATION_MAP).forEach(([newPkg, oldPkgs]) => {
    markdown += `- **${newPkg}** ← ${oldPkgs.map(p => `\`${p}\``).join(', ')}\n`;
  });
  
  markdown += '\n## Detailed Analysis\n\n';
  
  for (const result of allResults) {
    if (result.error) continue;
    
    markdown += `### ${result.package}\n\n`;
    markdown += `- **Files:** ${result.totalFiles}\n`;
    markdown += `- **CSS Classes:** ${result.allCsClasses.length}\n`;
    markdown += `- **@utility:** ${result.allUtilities.length}\n`;
    markdown += `- **@component:** ${result.allComponents.length}\n\n`;
    
    if (result.allCsClasses.length > 0) {
      markdown += '**CSS Classes:**\n';
      markdown += result.allCsClasses.map(c => `- \`${c}\``).join('\n') + '\n\n';
    }
    
    if (result.allUtilities.length > 0) {
      markdown += '**@utility Directives:**\n';
      markdown += result.allUtilities.map(u => `- \`@utility ${u}\``).join('\n') + '\n\n';
    }
  }
  
  await fs.writeFile(inventoryPath, markdown);
  
  console.log(`📝 Detailed inventory saved to: ${inventoryPath}`);
  console.log('\n🎉 Analysis complete!');
}

main().catch(console.error);
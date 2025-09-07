#!/usr/bin/env node

/**
 * Build aggregated dist.css for tailwindcss-effects package
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

async function buildAggregatedDist() {
  console.log(`${colors.cyan}🔄 Building aggregated dist.css for tailwindcss-effects...${colors.reset}\n`);
  
  const packagesDir = path.join(rootDir, 'packages');
  const effectsDir = path.join(packagesDir, 'tailwindcss-effects');
  
  // Find all dist/*/index.css files
  const distFiles = await glob('dist/*/index.css', { cwd: rootDir });
  
  console.log(`${colors.blue}📦 Found ${distFiles.length} dist CSS files${colors.reset}`);
  
  // Read package.json for effects package
  const effectsPackageJson = JSON.parse(await fs.readFile(path.join(effectsDir, 'package.json'), 'utf-8'));
  
  let aggregatedCSS = `/*!
 * ${effectsPackageJson.name} v${effectsPackageJson.version}
 * ${effectsPackageJson.description}
 * 
 * Aggregated CSS from all @casoon/tailwindcss-* packages
 * Generated: ${new Date().toISOString()}
 */

/* This file contains CSS from all individual packages */

`;

  // Read and aggregate all dist CSS files
  for (const distFile of distFiles) {
    const fullPath = path.join(rootDir, distFile);
    const packageName = distFile.split('/')[1]; // Extract package name from path
    
    if (packageName === 'tailwindcss-effects') {
      continue; // Skip effects package itself
    }
    
    try {
      const cssContent = await fs.readFile(fullPath, 'utf-8');
      
      // Remove the header comment block and add package separator
      const cleanCSS = cssContent.replace(/\/\*![\s\S]*?\*\/\s*/, '').trim();
      
      if (cleanCSS) {
        aggregatedCSS += `/* ===== ${packageName.toUpperCase()} ===== */\n\n`;
        aggregatedCSS += cleanCSS + '\n\n';
      }
      
      console.log(`${colors.green}  ✅ Included: ${packageName}${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}  ❌ Error reading ${distFile}: ${error.message}${colors.reset}`);
    }
  }
  
  // Add footer
  aggregatedCSS += `
/* 
 * Complete @casoon/tailwindcss-effects library
 * 
 * For individual packages and Tailwind plugin usage:
 * https://www.npmjs.com/package/@casoon/tailwindcss-effects
 */
`;

  // Write aggregated CSS to effects package
  const outputPath = path.join(effectsDir, 'dist.css');
  await fs.writeFile(outputPath, aggregatedCSS);
  
  console.log(`\n${colors.green}🎉 Aggregated dist.css created: ${outputPath}${colors.reset}`);
  console.log(`${colors.blue}📊 Total size: ${(aggregatedCSS.length / 1024).toFixed(1)}KB${colors.reset}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildAggregatedDist().catch(error => {
    console.error(`Fatal error:`, error);
    process.exit(1);
  });
}

export { buildAggregatedDist };

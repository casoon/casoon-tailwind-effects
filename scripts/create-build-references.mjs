#!/usr/bin/env node

/**
 * Build Reference Generator
 * Creates HTML files with all utilities for complete CSS compilation
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PACKAGES_DIR = path.join(__dirname, '../packages');

// Skip these packages (no @utility directives or meta packages)
const SKIP_PACKAGES = [
  'tailwindcss-effects', // Meta package
  'tailwindcss-cards',   // Legacy
  'tailwindcss-forms',   // Different structure
  'tailwindcss-typography' // Different structure
];

async function extractUtilities(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const utilityMatches = content.match(/@utility\s+([a-zA-Z0-9-]+)/g) || [];
    return utilityMatches.map(match => match.replace('@utility ', ''));
  } catch (error) {
    console.log(`⚠️ Could not read ${filePath}: ${error.message}`);
    return [];
  }
}

async function createBuildReference(packageName, utilities) {
  if (utilities.length === 0) {
    console.log(`⚠️ ${packageName}: No utilities found, skipping`);
    return;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${packageName} Build Reference</title>
</head>
<body>
    <!-- All ${packageName} utilities to force compilation -->
${utilities.map(utility => `    <div class="${utility}"></div>`).join('\n')}
</body>
</html>`;

  const packageDir = path.join(PACKAGES_DIR, packageName);
  const htmlPath = path.join(packageDir, 'build-reference.html');
  
  await fs.writeFile(htmlPath, htmlContent);
  console.log(`✅ ${packageName}: Created build-reference.html with ${utilities.length} utilities`);
}

async function updatePackageJson(packageName) {
  const packageDir = path.join(PACKAGES_DIR, packageName);
  const packageJsonPath = path.join(packageDir, 'package.json');
  
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    
    // Update build script
    if (packageJson.scripts && packageJson.scripts.build) {
      packageJson.scripts.build = `npx tailwindcss -i ./src/index.css -o ./dist.css --content './build-reference.html'`;
      
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`✅ ${packageName}: Updated package.json build script`);
    }
  } catch (error) {
    console.log(`⚠️ ${packageName}: Could not update package.json: ${error.message}`);
  }
}

async function main() {
  console.log('🔨 Creating build references for all packages...\n');

  try {
    const entries = await fs.readdir(PACKAGES_DIR, { withFileTypes: true });
    const packageDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

    for (const packageName of packageDirs) {
      if (SKIP_PACKAGES.includes(packageName)) {
        console.log(`⏭️ ${packageName}: Skipped (meta/legacy package)`);
        continue;
      }

      const indexPath = path.join(PACKAGES_DIR, packageName, 'src', 'index.css');
      const utilities = await extractUtilities(indexPath);
      
      if (utilities.length > 0) {
        await createBuildReference(packageName, utilities);
        await updatePackageJson(packageName);
      }
    }

    console.log('\n🎉 All build references created!');
    console.log('\n💡 Now run: npm run build:all to regenerate all dist.css files');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
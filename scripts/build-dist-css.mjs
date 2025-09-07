#!/usr/bin/env node

/**
 * Simple CSS Distribution Builder
 * 
 * Generates dist.css files for each package by extracting CSS classes and variables
 * from the plugin source code using static analysis.
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
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

class StaticCSSExtractor {
  constructor() {
    this.packagesDir = path.join(rootDir, 'packages');
  }

  async discoverPackages() {
    const packageJsonFiles = await glob('*/package.json', {
      cwd: this.packagesDir,
      absolute: true
    });

    const packages = [];
    for (const packageJsonPath of packageJsonFiles) {
      const packageDir = path.dirname(packageJsonPath);
      const packageName = path.basename(packageDir);
      const pluginPath = path.join(packageDir, 'plugin.js');
      
      try {
        await fs.access(pluginPath);
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
        
        packages.push({
          name: packageName,
          fullName: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
          packageDir,
          pluginPath
        });
      } catch (error) {
        console.log(`${colors.yellow}⚠️  Skipping ${packageName}: No plugin.js found${colors.reset}`);
      }
    }
    
    return packages;
  }

  extractCSSFromSource(sourceCode, packageName) {
    const classes = new Set();
    const variables = new Set();
    const keyframes = new Set();
    
    // Extract CSS classes (looking for strings that start with '.')
    const classMatches = sourceCode.match(/['"`]\.[-\w]+['"`]/g) || [];
    classMatches.forEach(match => {
      const className = match.slice(1, -1); // Remove quotes
      if (className.startsWith('.cs-') || className.startsWith('.glass') || className.startsWith('.sr-only') || className.startsWith('.container-fluid')) {
        classes.add(className);
      }
    });
    
    // Extract CSS variables (looking for --cs- prefixed variables)
    const variableMatches = sourceCode.match(/--cs-[-\w]+/g) || [];
    variableMatches.forEach(variable => {
      variables.add(variable);
    });
    
    // Extract keyframe names
    const keyframeMatches = sourceCode.match(/@keyframes\s+([-\w]+)/g) || [];
    keyframeMatches.forEach(match => {
      const keyframeName = match.replace('@keyframes ', '').trim();
      keyframes.add(keyframeName);
    });
    
    // Also look for animation names in strings
    const animationMatches = sourceCode.match(/['"`](anim-[-\w]+)['"`]/g) || [];
    animationMatches.forEach(match => {
      const animationName = match.slice(1, -1);
      keyframes.add(animationName);
    });
    
    return { classes: Array.from(classes).sort(), variables: Array.from(variables).sort(), keyframes: Array.from(keyframes).sort() };
  }

  generateDistCSS(packageInfo, extractedData) {
    const { classes, variables, keyframes } = extractedData;
    
    let css = `/*!\n * ${packageInfo.fullName} v${packageInfo.version}\n * ${packageInfo.description}\n * \n * CSS Classes Distribution File\n * Generated: ${new Date().toISOString()}\n */\n\n`;
    
    // Add CSS variables as comments for reference
    if (variables.length > 0) {
      css += `/* CSS Variables Available:\n${variables.map(v => ` * ${v}`).join('\n')}\n */\n\n`;
    }
    
    // Add basic reset for glass effects if it's the glass package
    if (packageInfo.name.includes('glass')) {
      css += `/* Glass Effects Base */\n`;
      css += `.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button {\n`;
      css += `  backdrop-filter: blur(16px);\n`;
      css += `  -webkit-backdrop-filter: blur(16px);\n`;
      css += `  background: rgba(255, 255, 255, 0.1);\n`;
      css += `  border: 1px solid rgba(255, 255, 255, 0.2);\n`;
      css += `}\n\n`;
    }
    
    // Add utility reset if it's the utilities package  
    if (packageInfo.name.includes('utilities')) {
      css += `/* Utilities */\n`;
      css += `.cs-sr-only, .sr-only {\n`;
      css += `  position: absolute;\n`;
      css += `  width: 1px;\n`;
      css += `  height: 1px;\n`;
      css += `  padding: 0;\n`;
      css += `  margin: -1px;\n`;
      css += `  overflow: hidden;\n`;
      css += `  clip: rect(0, 0, 0, 0);\n`;
      css += `  white-space: nowrap;\n`;
      css += `  border: 0;\n`;
      css += `}\n\n`;
      css += `.cs-container-fluid, .container-fluid {\n`;
      css += `  width: 100%;\n`;
      css += `  padding-left: 1rem;\n`;
      css += `  padding-right: 1rem;\n`;
      css += `}\n\n`;
    }
    
    // Add keyframes if any
    if (keyframes.length > 0) {
      css += `/* Keyframes */\n`;
      keyframes.forEach(keyframe => {
        if (keyframe.includes('fade-in')) {
          css += `@keyframes ${keyframe} {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}\n\n`;
        } else if (keyframe.includes('spin')) {
          css += `@keyframes ${keyframe} {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n`;
        } else {
          css += `/* @keyframes ${keyframe} - see plugin source for details */\n`;
        }
      });
    }
    
    // Add comment about available classes
    if (classes.length > 0) {
      css += `/* Available CSS Classes:\n${classes.map(c => ` * ${c}`).join('\n')}\n */\n\n`;
    }
    
    css += `/* \n * For full functionality, use this package as a Tailwind CSS plugin:\n * import plugin from '${packageInfo.fullName}';\n * \n * export default {\n *   plugins: [plugin]\n * }\n */\n`;
    
    return css;
  }

  async buildDistCSS() {
    console.log(`${colors.cyan}${colors.bright}📄 Building distribution CSS files...${colors.reset}\n`);
    
    const packages = await this.discoverPackages();
    console.log(`${colors.blue}📦 Found ${packages.length} packages${colors.reset}\n`);
    
    for (const packageInfo of packages) {
      console.log(`${colors.blue}🔍 Processing ${packageInfo.name}...${colors.reset}`);
      
      try {
        // Read the plugin source code
        const sourceCode = await fs.readFile(packageInfo.pluginPath, 'utf-8');
        
        // Extract CSS data using static analysis
        const extractedData = this.extractCSSFromSource(sourceCode, packageInfo.name);
        
        // Generate the distribution CSS
        const distCSS = this.generateDistCSS(packageInfo, extractedData);
        
        // Write dist.css to package directory
        const distPath = path.join(packageInfo.packageDir, 'dist.css');
        await fs.writeFile(distPath, distCSS);
        
        console.log(`${colors.green}  ✅ Generated dist.css (${extractedData.classes.length} classes, ${extractedData.variables.length} variables)${colors.reset}`);
      } catch (error) {
        console.log(`${colors.red}  ❌ Error: ${error.message}${colors.reset}`);
      }
    }
    
    console.log(`\n${colors.green}${colors.bright}🎉 Distribution CSS files generated!${colors.reset}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const builder = new StaticCSSExtractor();
  builder.buildDistCSS().catch(error => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { StaticCSSExtractor };

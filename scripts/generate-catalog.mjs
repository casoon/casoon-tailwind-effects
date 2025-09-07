#!/usr/bin/env node

/**
 * CSS Classes Catalog Generator for @casoon/tailwindcss-effects
 * 
 * This script automatically generates a comprehensive catalog of all CSS classes
 * and CSS variables from all packages for better AI assistant discoverability.
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

class CatalogGenerator {
  constructor() {
    this.rootDir = rootDir;
    this.packagesDir = path.join(rootDir, 'packages');
    this.effectsPackagePath = path.join(this.packagesDir, 'tailwindcss-effects');
    this.catalogPath = path.join(this.effectsPackagePath, 'catalog.md');
    this.packageData = new Map();
  }

  async discoverPackages() {
    const packageJsonFiles = await glob('*/package.json', {
      cwd: this.packagesDir,
      absolute: true
    });

    for (const packageJsonPath of packageJsonFiles) {
      const packageDir = path.dirname(packageJsonPath);
      const packageName = path.basename(packageDir);
      const pluginPath = path.join(packageDir, 'plugin.js');
      
      try {
        await fs.access(pluginPath);
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
        
        this.packageData.set(packageName, {
          name: packageName,
          fullName: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
          pluginPath
        });
      } catch (error) {
        console.log(`${colors.yellow}⚠️  Skipping ${packageName}: No plugin.js found${colors.reset}`);
      }
    }

    return Array.from(this.packageData.keys());
  }

  async extractDataFromPlugin(pluginPath, packageName) {
    try {
      // Use static analysis instead of dynamic plugin execution
      const sourceCode = await fs.readFile(pluginPath, 'utf-8');
      const { classes, variables } = this.extractCSSFromSource(sourceCode, packageName);
      
      console.log(`${colors.cyan}  📄 ${packageName}: Static analysis complete${colors.reset}`);
      
      return { classes: new Set(classes), variables: new Set(variables) };
    } catch (error) {
      console.error(`${colors.red}Error extracting from ${packageName}:${colors.reset}`, error.message);
      return { classes: new Set(), variables: new Set() };
    }
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

  extractFromObj(obj, classes, variables, depth = 0) {
    if (depth > 3) return; // Prevent infinite recursion

    Object.entries(obj).forEach(([key, value]) => {
      // Extract CSS classes
      if (key.startsWith('.')) {
        classes.add(key);
      }
      
      // Extract CSS variables
      if (key.startsWith('--cs-')) {
        variables.add(key);
      }

      // Extract variables from property values
      if (typeof value === 'string' && value.includes('--cs-')) {
        const matches = value.match(/--cs-[a-z0-9-]+/g);
        if (matches) {
          matches.forEach(match => variables.add(match));
        }
      }

      // Recursively process nested objects
      if (typeof value === 'object' && value !== null) {
        this.extractFromObj(value, classes, variables, depth + 1);
      }
    });
  }


  async generateCatalog() {
    console.log(`${colors.cyan}${colors.bright}📝 Generating CSS Classes Catalog...${colors.reset}\n`);

    const packages = await this.discoverPackages();
    console.log(`${colors.blue}📦 Found ${packages.length} packages${colors.reset}\n`);

    const catalogData = new Map();

    // Extract data from each package
    for (const packageName of packages) {
      const packageInfo = this.packageData.get(packageName);
      console.log(`${colors.blue}🔍 Analyzing ${packageName}...${colors.reset}`);
      
      const { classes, variables } = await this.extractDataFromPlugin(packageInfo.pluginPath, packageName);
      
      catalogData.set(packageName, {
        ...packageInfo,
        classes: Array.from(classes).sort(),
        variables: Array.from(variables).sort()
      });

      console.log(`${colors.green}  ✅ Found ${classes.size} classes, ${variables.size} variables${colors.reset}`);
    }

    // Generate aggregated markdown content for effects package
    const aggregatedCatalogContent = await this.generateAggregatedCatalog(catalogData);
    
    // Write aggregated catalog to effects package
    await fs.writeFile(this.catalogPath, aggregatedCatalogContent);
    console.log(`\n${colors.green}✅ Aggregated catalog generated: ${this.catalogPath}${colors.reset}`);

    // Generate individual package catalogs
    await this.generateIndividualCatalogs(catalogData);
  }

  async generateAggregatedCatalog(catalogData) {
    // Filter out the effects package itself to avoid recursion
    const filteredData = new Map();
    for (const [packageName, data] of catalogData) {
      if (!packageName.includes('tailwindcss-effects')) {
        filteredData.set(packageName, data);
      }
    }
    
    const header = `# @casoon/tailwindcss-effects - Complete CSS Effects Library

> **Meta-package containing all @casoon CSS effects and utilities for Tailwind CSS v4**

> **For AI Assistants**: This is the complete collection of CSS classes and utilities from all @casoon packages. All CSS custom properties use the consistent \`--cs-\` prefix for easy identification.

## Package Overview

This meta-package includes all individual packages with consistent \`--cs-{package}-*\` naming for CSS custom properties:

- **Animations**: \`--cs-anim-*\` (duration, easing, keyframes)
- **Glass**: \`--cs-glass-*\` (colors, backgrounds, borders, glassmorphism)  
- **Loading**: \`--cs-loading-*\` (spinner colors, states)
- **Navigation**: \`--cs-nav-*\` (primary, text, border colors)
- **Orbs**: \`--cs-orb-*\` (gradients, sizes, animations)
- **Gradients**: \`--cs-gradient-*\` (color stops, directions)
- **Scroll**: \`--cs-scroll-*\` (thumb, track colors, behavior)
- **Micro-interactions**: \`--cs-micro-*\` (focus, hover, button states)
- **Utilities**: Core utilities (screen readers, containers)

## Complete Class & Variable Reference

`;

    let content = header;
    let packageIndex = 1;

    // Collect all classes and variables from all packages
    const allClasses = new Set();
    const allVariables = new Set();
    
    for (const [packageName, data] of filteredData) {
      data.classes.forEach(cls => allClasses.add(cls));
      data.variables.forEach(variable => allVariables.add(variable));
      
      content += `### ${packageIndex}. ${data.fullName}\n\n`;
      content += `> ${data.description}\n\n`;

      // Add classes section
      if (data.classes.length > 0) {
        content += `**CSS Classes (${data.classes.length}):**\n`;
        data.classes.forEach(className => {
          content += `- \`${className}\`\n`;
        });
        content += '\n';
      }

      // Add variables section  
      if (data.variables.length > 0) {
        content += `**CSS Variables (${data.variables.length}):**\n\`\`\`css\n`;
        data.variables.forEach(variable => {
          content += `${variable}: /* value */\n`;
        });
        content += '```\n\n';
      }

      packageIndex++;
    }
    
    // Add summary section
    content += `## Summary\n\n`;
    content += `**Total CSS Classes:** ${allClasses.size}\n`;
    content += `**Total CSS Variables:** ${allVariables.size}\n`;
    content += `**Individual Packages:** ${filteredData.size}\n\n`;

    // Add usage examples footer
    content += `## Usage Examples

### As Tailwind Plugin
\`\`\`js
import effects from '@casoon/tailwindcss-effects';

export default {
  plugins: [effects()]
}
\`\`\`

### Direct CSS Import
\`\`\`css
@import "@casoon/tailwindcss-effects/index.css";
\`\`\`

### Individual Package Import
\`\`\`js
import animations from '@casoon/tailwindcss-animations';
import glass from '@casoon/tailwindcss-glass';

export default {
  plugins: [animations(), glass()]
}
\`\`\`

## CSS Variable Customization

Override any CSS variable to customize the design:

\`\`\`css
:root {
  --cs-anim-duration-md: 400ms;
  --cs-glass-bg-light: rgba(255, 255, 255, 0.15);
  --cs-nav-primary: #6366f1;
}
\`\`\`

---

> **Note for AI Assistants**: This catalog is automatically generated and updated. When suggesting classes, prioritize the documented classes above and mention the consistent \`--cs-\` prefix for CSS variables. All animations respect \`prefers-reduced-motion\` for accessibility.
`;

    return content;
  }

  async generateAggregatedCatalog(catalogData) {
    // Filter out the effects package itself to avoid recursion
    const filteredData = new Map();
    for (const [packageName, data] of catalogData) {
      if (!packageName.includes('tailwindcss-effects')) {
        filteredData.set(packageName, data);
      }
    }
    
    const header = `# @casoon/tailwindcss-effects - Complete CSS Effects Library

> **Meta-package containing all @casoon CSS effects and utilities for Tailwind CSS v4**

> **For AI Assistants**: This is the complete collection of CSS classes and utilities from all @casoon packages. All CSS custom properties use the consistent \`--cs-\` prefix for easy identification.

## Package Overview

This meta-package includes all individual packages with consistent \`--cs-{package}-*\` naming for CSS custom properties:

- **Animations**: \`--cs-anim-*\` (duration, easing, keyframes)
- **Glass**: \`--cs-glass-*\` (colors, backgrounds, borders, glassmorphism)  
- **Loading**: \`--cs-loading-*\` (spinner colors, states)
- **Navigation**: \`--cs-nav-*\` (primary, text, border colors)
- **Orbs**: \`--cs-orb-*\` (gradients, sizes, animations)
- **Gradients**: \`--cs-gradient-*\` (color stops, directions)
- **Scroll**: \`--cs-scroll-*\` (thumb, track colors, behavior)
- **Micro-interactions**: \`--cs-micro-*\` (focus, hover, button states)
- **Utilities**: Core utilities (screen readers, containers)

## Complete Class & Variable Reference

`;

    let content = header;
    let packageIndex = 1;

    // Collect all classes and variables from all packages
    const allClasses = new Set();
    const allVariables = new Set();
    
    for (const [packageName, data] of filteredData) {
      data.classes.forEach(cls => allClasses.add(cls));
      data.variables.forEach(variable => allVariables.add(variable));
      
      content += `### ${packageIndex}. ${data.fullName}\n\n`;
      content += `> ${data.description}\n\n`;

      // Add classes section
      if (data.classes.length > 0) {
        content += `**CSS Classes (${data.classes.length}):**\n`;
        data.classes.forEach(className => {
          content += `- \`${className}\`\n`;
        });
        content += '\n';
      }

      // Add variables section  
      if (data.variables.length > 0) {
        content += `**CSS Variables (${data.variables.length}):**\n\`\`\`css\n`;
        data.variables.forEach(variable => {
          content += `${variable}: /* value */\n`;
        });
        content += '```\n\n';
      }

      packageIndex++;
    }
    
    // Add summary section
    content += `## Summary\n\n`;
    content += `**Total CSS Classes:** ${allClasses.size}\n`;
    content += `**Total CSS Variables:** ${allVariables.size}\n`;
    content += `**Individual Packages:** ${filteredData.size}\n\n`;
    
    // Add usage examples footer
    content += `## Usage Examples

### As Tailwind Plugin (All Effects)
\`\`\`js
import effects from '@casoon/tailwindcss-effects';

export default {
  plugins: [effects]
}
\`\`\`

### Direct CSS Import (All Effects)
\`\`\`css
@import "@casoon/tailwindcss-effects/dist.css";
\`\`\`

### Individual Package Import
\`\`\`js
import animations from '@casoon/tailwindcss-animations';
import glass from '@casoon/tailwindcss-glass';

export default {
  plugins: [animations, glass]
}
\`\`\`

## CSS Variable Customization

Override any CSS variable to customize the design:

\`\`\`css
:root {
  --cs-anim-duration-md: 400ms;
  --cs-glass-bg-light: rgba(255, 255, 255, 0.15);
  --cs-nav-primary: #6366f1;
}
\`\`\`

---

> **Note for AI Assistants**: This catalog is automatically generated and updated. When suggesting classes, prioritize the documented classes above and mention the consistent \`--cs-\` prefix for CSS variables. All animations respect \`prefers-reduced-motion\` for accessibility.
`;

    return content;
  }

  async generateIndividualCatalogs(catalogData) {
    console.log(`\n${colors.cyan}📦 Generating individual package catalogs...${colors.reset}`);

    for (const [packageName, data] of catalogData) {
      // Skip the effects package since we already generated its aggregated catalog
      if (packageName.includes('tailwindcss-effects')) {
        continue;
      }
      
      const packageCatalogPath = path.join(this.packagesDir, packageName, 'catalog.md');
      
      // Create package-specific catalog content
      const packageCatalogContent = await this.generatePackageCatalog(data);
      
      // Write package catalog
      await fs.writeFile(packageCatalogPath, packageCatalogContent);
      console.log(`${colors.green}  ✅ ${packageName}/catalog.md${colors.reset}`);
    }
  }

  async generatePackageCatalog(packageData) {
    const header = `# ${packageData.fullName} - CSS Classes Catalog

> **${packageData.description}**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent \`--cs-\` prefix.

## Package Information

- **Package**: \`${packageData.fullName}\`
- **Version**: \`${packageData.version}\`
- **Type**: Tailwind CSS v4 Plugin

`;

    let content = header;

    // Add classes section
    if (packageData.classes.length > 0) {
      content += `## CSS Classes (${packageData.classes.length})

`;
      packageData.classes.forEach(className => {
        content += `- \`${className}\`\n`;
      });
      content += '\n';
    }

    // Add variables section  
    if (packageData.variables.length > 0) {
      content += `## CSS Variables (${packageData.variables.length})

\`\`\`css\n`;
      packageData.variables.forEach(variable => {
        content += `${variable}: /* value */\n`;
      });
      content += '```\n\n';
    }

    // Add usage examples for this specific package
    content += `## Usage Examples

### As Tailwind Plugin
\`\`\`js
import plugin from '${packageData.fullName}';

export default {
  plugins: [plugin()]
}
\`\`\`

### Direct CSS Import
\`\`\`css
@import "${packageData.fullName}/index.css";
\`\`\`

### With Custom Configuration
\`\`\`js
import plugin from '${packageData.fullName}';

export default {
  plugins: [
    plugin({
      // Package-specific configuration options
      tokens: {
        // Override default tokens
      }
    })
  ]
}
\`\`\`

## CSS Variable Customization

Override any CSS variable to customize the design:

\`\`\`css
:root {
  /* Customize this package's tokens */`;

    // Add example customizations from the package's variables
    if (packageData.variables.length > 0) {
      const exampleVars = packageData.variables.slice(0, 3); // Show first 3 as examples
      exampleVars.forEach(variable => {
        content += `\n  ${variable}: /* your custom value */;`;
      });
    }

    content += `\n}\n\`\`\`\n\n---\n\n> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).
`;

    return content;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new CatalogGenerator();
  generator.generateCatalog().catch(error => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
}

export { CatalogGenerator };

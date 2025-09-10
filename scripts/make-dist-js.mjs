#!/usr/bin/env node
/**
 * Creates dist.js file for a package that imports CSS for side effects
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const packageName = process.argv[2] || process.env.npm_package_name?.split('/').pop() || 'unknown';

// Determine the path - if called from package directory, use current dir
// If called with package name, assume we're in root
const isFromPackage = process.cwd().includes('packages/');
const distJsPath = isFromPackage 
  ? resolve(process.cwd(), 'dist.js')
  : resolve(process.cwd(), `packages/${packageName}/dist.js`);

const content = `// Side-effect CSS import for bundlers
import "./dist.css";
`;

writeFileSync(distJsPath, content);
console.log(`✓ Created dist.js for ${packageName}`);

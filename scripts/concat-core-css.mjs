#!/usr/bin/env node

/**
 * concat-core-css.mjs
 * 
 * This script takes all modular CSS files from tailwindcss-core/src
 * and concatenates them into a single file for build/validation purposes,
 * while preserving the modular development architecture.
 */

import fs from 'fs/promises';
import path from 'path';

const BASE_DIR = path.resolve(process.cwd(), 'packages/tailwindcss-core/src');
const OUTPUT_FILE = path.resolve(BASE_DIR, 'index-concat.css');
const HEADER_FILE = path.resolve(BASE_DIR, 'index.css');

async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (err) {
    console.error(`Error reading file ${filePath}: ${err.message}`);
    return null;
  }
}

async function extractImportContent(importPath) {
  const fullPath = path.resolve(BASE_DIR, importPath);
  
  try {
    // Check if file exists
    await fs.access(fullPath);
    const content = await readFile(fullPath);
    return content || '';
  } catch (err) {
    console.error(`Import file not found: ${fullPath}`);
    return '';
  }
}

async function processImports(content) {
  // Match all import statements
  const importRegex = /@import\s+["'](.+?)["']\s*;/g;
  let match;
  let result = content;
  
  // Replace each import with its file content
  while ((match = importRegex.exec(content)) !== null) {
    const [fullMatch, importPath] = match;
    const importContent = await extractImportContent(importPath);
    result = result.replace(fullMatch, importContent || '/* Import not found */');
  }
  
  return result;
}

async function extractHeader(filePath) {
  const content = await readFile(filePath);
  if (!content) return '';
  
  // Extract the header comment and imports
  const headerMatch = /^\/\*![\s\S]*?\*\//.exec(content);
  return headerMatch ? headerMatch[0] : '';
}

async function concatenateCssFiles() {
  try {
    // Get the header from the index.css file
    const header = await extractHeader(HEADER_FILE);
    
    // Read the index file to find all imports
    const indexContent = await readFile(HEADER_FILE);
    if (!indexContent) {
      console.error('Failed to read index.css');
      process.exit(1);
    }
    
    // Process all imports in the file
    const processedContent = await processImports(indexContent);
    
    // Write the concatenated file
    await fs.writeFile(OUTPUT_FILE, processedContent);
    console.log(`✅ Successfully concatenated CSS modules to ${OUTPUT_FILE}`);
    
    // Temporarily replace the index.css with the concatenated version for build/validation
    await fs.rename(HEADER_FILE, path.resolve(BASE_DIR, 'index-with-imports.css'));
    await fs.copyFile(OUTPUT_FILE, HEADER_FILE);
    console.log(`✅ Temporarily replaced index.css with concatenated version for build/validation`);
    
    return true;
  } catch (err) {
    console.error(`Error concatenating CSS files: ${err.message}`);
    return false;
  }
}

// Execute the function
concatenateCssFiles();
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @casoon/tailwindcss-micro-interactions - Tailwind CSS Plugin
 * 
 * @casoon/tailwindcss-micro-interactions utilities for Tailwind CSS v4
 */
export default function microinteractionsPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, theme }) => {
      // Load flattened CSS content
      let cssContent = '';
      try {
        cssContent = readFileSync(join(__dirname, 'dist.css'), 'utf8');
      } catch (err) {
        // Fallback to original CSS if dist.css doesn't exist
        cssContent = readFileSync(join(__dirname, 'index.css'), 'utf8');
      }
      
      // Parse CSS content and extract utilities/components
      // For now, inject as raw CSS - this will be optimized in future versions
      if (cssContent.includes('@layer components')) {
        const componentsMatch = cssContent.match(/@layer components \{([\s\S]*?)\}(?=\s*(@layer|$))/);
        if (componentsMatch) {
          addComponents(componentsMatch[1]);
        }
      }
      
      if (cssContent.includes('@layer utilities')) {
        const utilitiesMatch = cssContent.match(/@layer utilities \{([\s\S]*?)\}(?=\s*(@layer|$))/);
        if (utilitiesMatch) {
          addUtilities(utilitiesMatch[1]);
        }
      }
      
      // If no @layer detected, inject as utilities
      if (!cssContent.includes('@layer')) {
        addUtilities(cssContent);
      }
    },
    config: {
      theme: {
        extend: {
          // Package-specific theme extensions will be added here
        }
      }
    }
  };
}

// Export both default and named export for flexibility
export { microinteractionsPlugin as microinteractions };
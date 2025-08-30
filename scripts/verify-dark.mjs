#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'packages');

const SHOULD_HAVE_DARK = new Set([
  'tailwindcss-utilities',
  'tailwindcss-glass',
  'tailwindcss-gradients',
  'tailwindcss-navigation',
]);

function hasAllBlocks(css) {
  return css.includes(':root') && css.includes('prefers-color-scheme: dark') && css.match(/\.(?:dark)\b|\[data-theme="dark"\]/);
}

function main() {
  let missing = 0;
  for (const pkg of fs.readdirSync(PKG_DIR)) {
    if (!SHOULD_HAVE_DARK.has(pkg)) continue;
    const tokens = path.join(PKG_DIR, pkg, 'tokens.css');
    if (!fs.existsSync(tokens)) continue;
    const css = fs.readFileSync(tokens, 'utf8');
    if (!hasAllBlocks(css)) {
      console.error(`✖ ${pkg}: tokens.css missing dark-mode scaffolding (:root, media dark, class .dark/[data-theme])`);
      missing++;
    }
  }
  if (missing) process.exit(1);
  console.log('✓ Dark-mode scaffolding present in required tokens.css files');
}

main();


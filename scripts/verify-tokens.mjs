#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'packages');

function read(file) { return fs.readFileSync(file, 'utf8'); }

const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/g;
const RGB_RE = /\brgba?\(/g;
const HSL_RE = /\bhsl[a]?\(/g;

function isInsideVar(css, idx) {
  // naive: look back for last 'var(' before idx, and next ')' after idx
  const before = css.lastIndexOf('var(', idx);
  if (before === -1) return false;
  const after = css.indexOf(')', before);
  return after !== -1 && after >= idx;
}

function checkFile(file) {
  const css = read(file);
  const failures = [];

  // flag hex occurrences not used as var() fallback
  let m;
  while ((m = HEX_RE.exec(css))) {
    const match = m[0];
    const idx = m.index;
    // allow fully transparent shorthand '#0000' and '#00000000'
    if (match.toLowerCase() === '#0000' || match.toLowerCase() === '#00000000') continue;
    if (!isInsideVar(css, idx)) {
      const around = css.slice(Math.max(0, idx - 40), Math.min(css.length, idx + 40)).replace(/\n/g, ' ');
      failures.push(`hex '${match}' not in var() fallback …${around}…`);
    }
  }

  // forbid raw rgb/rgba/hsl usage completely (tokens should be used)
  if (RGB_RE.test(css)) failures.push('found rgb()/rgba() usage');
  if (HSL_RE.test(css)) failures.push('found hsl()/hsla() usage');

  return failures;
}

function main() {
  let errors = 0;
  for (const pkg of fs.readdirSync(PKG_DIR)) {
    const idx = path.join(PKG_DIR, pkg, 'index.css');
    if (!fs.existsSync(idx)) continue;
    const fails = checkFile(idx);
    if (fails.length) {
      console.error(`✖ ${pkg}:`);
      for (const f of fails) console.error(`  - ${f}`);
      errors++;
    }
  }
  if (errors) {
    console.error(`\n${errors} package(s) have hard-coded color usage. Use tokens + color-mix.`);
    process.exit(1);
  }
  console.log('✓ No hard-coded colors in index.css files');
}

main();


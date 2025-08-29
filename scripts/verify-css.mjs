#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'packages');
const EXPECT = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests', 'expectations.json'), 'utf8'));

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function classesFromCss(css) {
  // strip comments and @imports to reduce noise
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const classes = new Set();
  // very naive: find .class sequences in selectors
  const re = /\.[a-zA-Z0-9_-]+/g;
  let m;
  while ((m = re.exec(noComments))) classes.add(m[0].slice(1));
  return classes;
}

function assert(ok, msg) {
  if (!ok) throw new Error(msg);
}

function checkImports(file, expectedImports) {
  const css = read(file);
  for (const im of expectedImports) {
    assert(css.includes(im), `Missing import in ${path.relative(ROOT,file)}: ${im}`);
  }
}

function main() {
  let failures = 0;

  for (const [pkgName, spec] of Object.entries(EXPECT.packages)) {
    const pkgPath = path.join(PKG_DIR, pkgName);
    const idx = path.join(pkgPath, 'index.css');
    assert(fs.existsSync(idx), `Missing index.css for ${pkgName}`);
    const classes = classesFromCss(read(idx));
    for (const need of spec.classes || []) {
      if (!classes.has(need)) {
        console.error(`✖ ${pkgName}: missing class .${need}`);
        failures++;
      }
    }
  }

  // Cross-package CSS imports in effects
  const effectsCss = path.join(PKG_DIR, 'tailwindcss-effects', 'index.css');
  checkImports(effectsCss, [
    '@casoon/tailwindcss-glass/index.css',
    '@casoon/tailwindcss-orbs/index.css',
    '@casoon/tailwindcss-gradients/index.css',
    '@casoon/tailwindcss-scroll/index.css',
  ]);

  if (failures > 0) {
    console.error(`\n${failures} missing CSS selectors.`);
    process.exit(1);
  }
  console.log('✓ CSS presence checks passed');
}

main();


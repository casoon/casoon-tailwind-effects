#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'packages');

function read(file) { return fs.readFileSync(file, 'utf8'); }

function classesFromCss(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const classes = new Set();
  const re = /\.[a-zA-Z0-9_-]+/g;
  let m; while ((m = re.exec(noComments))) classes.add(m[0].slice(1));
  return classes;
}

function main() {
  const reserved = new Set([
    'click-ripple','click-bounce','click-squish',
    'hover-magnetic','hover-tilt','hover-float',
    'focus-glow','focus-scale','focus-rotate',
    'state-loading','state-success','state-error',
  ]);

  const packages = fs.readdirSync(PKG_DIR).filter(p => fs.existsSync(path.join(PKG_DIR, p, 'index.css')));
  const offenders = [];
  for (const pkg of packages) {
    const idx = path.join(PKG_DIR, pkg, 'index.css');
    const css = read(idx);
    const classes = classesFromCss(css);
    for (const name of reserved) {
      if (classes.has(name) && pkg !== 'tailwindcss-micro-interactions') {
        offenders.push({ pkg, name });
      }
    }
  }

  if (offenders.length) {
    for (const o of offenders) console.error(`✖ Reserved micro-interaction class in ${o.pkg}: .${o.name}`);
    process.exit(1);
  }
  console.log('✓ Prefix/reserved class checks passed');
}

main();


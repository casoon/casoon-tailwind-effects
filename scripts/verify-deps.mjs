#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'packages');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function assert(ok, msg) {
  if (!ok) throw new Error(msg);
}

function main() {
  let failures = 0;
  const root = readJson(path.join(ROOT, 'package.json'));
  const expectVer = `^${root.version}`;

  const effects = readJson(path.join(PKG_DIR, 'tailwindcss-effects', 'package.json'));
  const effDeps = effects.dependencies || {};
  const required = [
    '@casoon/tailwindcss-animations',
    '@casoon/tailwindcss-glass',
    '@casoon/tailwindcss-orbs',
    '@casoon/tailwindcss-gradients',
    '@casoon/tailwindcss-scroll',
    '@casoon/tailwindcss-navigation',
    '@casoon/tailwindcss-utilities',
    '@casoon/tailwindcss-loading',
    '@casoon/tailwindcss-micro-interactions',
  ];
  for (const dep of required) {
    const got = effDeps[dep];
    if (!got || got.startsWith('file:')) {
      console.error(`✖ effects dependency invalid: ${dep} -> ${String(got)}`);
      failures++;
    }
  }

  // scroll must depend on animations
  const scroll = readJson(path.join(PKG_DIR, 'tailwindcss-scroll', 'package.json'));
  const scrDeps = scroll.dependencies || {};
  if (!scrDeps['@casoon/tailwindcss-animations']) {
    console.error('✖ scroll missing dependency on @casoon/tailwindcss-animations');
    failures++;
  }

  // peerDep tailwindcss across all packages
  const pkgs = fs.readdirSync(PKG_DIR);
  for (const p of pkgs) {
    const j = readJson(path.join(PKG_DIR, p, 'package.json'));
    const peer = j.peerDependencies || {};
    if (peer['tailwindcss'] !== '^4.0.0') {
      console.error(`✖ ${j.name}: tailwindcss peer should be ^4.0.0`);
      failures++;
    }
  }

  if (failures > 0) process.exit(1);
  console.log('✓ Dependency checks passed');
}

main();

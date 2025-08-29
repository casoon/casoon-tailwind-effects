#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PKGS_DIR = path.join(ROOT, 'packages');
const DRY = Boolean(process.env.DRY_RUN) || process.argv.includes('--dry');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }

function bump(version, type) {
  const [maj, min, pat] = version.split('.').map(n => parseInt(n, 10));
  if (Number.isNaN(maj) || Number.isNaN(min) || Number.isNaN(pat)) throw new Error(`Invalid semver: ${version}`);
  if (type === 'major') return `${maj + 1}.0.0`;
  if (type === 'minor') return `${maj}.${min + 1}.0`;
  return `${maj}.${min}.${pat + 1}`; // patch default
}

function listPackages() {
  return fs.readdirSync(PKGS_DIR).filter((d) => {
    const full = path.join(PKGS_DIR, d);
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'package.json'));
  });
}

function main() {
  const type = (process.argv[2] || 'patch').toLowerCase();
  if (!['patch','minor','major'].includes(type)) {
    console.error('Usage: node scripts/bump-version.mjs [patch|minor|major] [--dry]');
    process.exit(1);
  }

  const rootPath = path.join(ROOT, 'package.json');
  const root = readJson(rootPath);
  const next = bump(root.version, type);

  console.log(`Bumping versions: ${root.version} -> ${next}${DRY ? ' (dry)' : ''}`);

  if (!DRY) {
    root.version = next;
    writeJson(rootPath, root);
  }

  const changed = [];
  for (const dir of listPackages()) {
    const p = path.join(PKGS_DIR, dir, 'package.json');
    const j = readJson(p);
    const old = j.version;
    if (!DRY) {
      j.version = next;
      // Optional: align meta bundle dependency ranges
      if (j.name === '@casoon/tailwindcss-effects' && j.dependencies) {
        for (const [k, v] of Object.entries(j.dependencies)) {
          if (k.startsWith('@casoon/')) j.dependencies[k] = `^${next}`;
        }
      }
      writeJson(p, j);
    }
    changed.push(`${j.name}: ${old} -> ${next}`);
  }

  console.log('Packages updated:\n' + changed.join('\n'));
  console.log('\nNote: No git tags/commits are created by this script.');
}

main();


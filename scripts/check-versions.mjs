#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PKGS_DIR = path.join(ROOT, "packages");

function readPkgJson(dir) {
  const p = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
  return p;
}

function listPackages() {
  return fs.readdirSync(PKGS_DIR).filter((d) => {
    const full = path.join(PKGS_DIR, d);
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, "package.json"));
  });
}

function main() {
  const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const rootVersion = rootPkg.version;
  
  console.log(`🔍 Checking package versions against root version: ${rootVersion}\n`);
  
  const packages = listPackages();
  let allMatch = true;
  
  for (const pkgDir of packages) {
    const pkg = readPkgJson(path.join(PKGS_DIR, pkgDir));
    const matches = pkg.version === rootVersion;
    
    if (matches) {
      console.log(`✅ ${pkg.name}: ${pkg.version}`);
    } else {
      console.log(`❌ ${pkg.name}: ${pkg.version} (should be ${rootVersion})`);
      allMatch = false;
    }
  }
  
  console.log(`\n${allMatch ? '🎉 All packages match root version!' : '⚠️  Some packages have mismatched versions!'}`);
  
  if (!allMatch) {
    process.exit(1);
  }
}

main();

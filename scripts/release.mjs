#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync, spawnSync } from "node:child_process";

const ROOT = process.cwd();
const PKGS_DIR = path.join(ROOT, "packages");
const DRY = Boolean(process.env.DRY_RUN);
const TAG = process.env.NPM_TAG || null;
const PROVENANCE = process.env.NPM_PROVENANCE ? ["--provenance"] : [];

function sh(cmd, opts = {}) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"], encoding: "utf8", ...opts }).trim();
  } catch (e) {
    return null;
  }
}

function assertNpmLogin() {
  const who = sh("npm whoami");
  if (!who) {
    console.error("✖ Not logged in to npm. Run `npm login` and try again.");
    process.exit(1);
  }
  console.log("✓ npm logged in as:", who);
}

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

function isVersionPublished(name, version) {
  // Query specific version; returns null if not found
  const out = sh(`npm view ${name}@${version} version --silent`);
  return out === version;
}

function publishPackage(dir) {
  const pkg = readPkgJson(dir);
  const { name, version } = pkg;
  console.log("\n— Package:", name, "v" + version);

  if (isVersionPublished(name, version)) {
    console.log("⏭  Already published:", name, "@", version);
    return;
  }

  const args = ["publish"];
  // Respect per-package publishConfig.access=public (set in each package), so no --access needed
  if (TAG) { args.push("--tag", TAG); }
  args.push(...PROVENANCE);

  console.log("→ npm", args.join(" "));
  if (DRY) {
    console.log("   (dry run: skipping real publish)");
    return;
  }

  const res = spawnSync("npm", args, { cwd: dir, stdio: "inherit", shell: true });
  if (res.status !== 0) {
    console.error("✖ Publish failed for", name);
    process.exit(res.status || 1);
  }
  console.log("✓ Published", name, "@", version, TAG ? `(tag: ${TAG})` : "");
}

function main() {
  assertNpmLogin();

  const arg = process.argv[2];
  let targets = [];
  if (arg && arg !== "all") {
    // Single package by name or folder
    const byFolder = path.join(PKGS_DIR, arg);
    if (fs.existsSync(byFolder)) {
      targets = [byFolder];
    } else {
      // resolve by package name
      const all = listPackages().map((f) => path.join(PKGS_DIR, f));
      const match = all.find((d) => readPkgJson(d).name === arg);
      if (!match) {
        console.error("✖ Package not found:", arg);
        process.exit(1);
      }
      targets = [match];
    }
  } else {
    targets = listPackages().map((f) => path.join(PKGS_DIR, f));
  }

  // Publish in dependency order: animations first, then others, meta last
  targets.sort((a, b) => {
    const A = readPkgJson(a).name;
    const B = readPkgJson(b).name;
    const order = [
      "@casoon/tailwindcss-animations",
      "@casoon/tailwindcss-glass",
      "@casoon/tailwindcss-orbs",
      "@casoon/tailwindcss-gradients",
      "@casoon/tailwindcss-scroll",
      "@casoon/tailwindcss-utilities",
      "@casoon/tailwindcss-navigation",
      "@casoon/tailwindcss-effects"
    ];
    return order.indexOf(A) - order.indexOf(B);
  });

  for (const dir of targets) publishPackage(dir);
}

main();

# Repository Guidelines

## Project Structure & Modules
- `packages/*`: Publishable CSS modules for Tailwind v4:
  - `tailwindcss-utilities`, `tailwindcss-animations`, `tailwindcss-glass`, `tailwindcss-gradients`, `tailwindcss-navigation`, `tailwindcss-orbs`, `tailwindcss-scroll`, `tailwindcss-effects` (meta bundle).
- `scripts/`: Release and version tooling (`release.mjs`, `check-versions.mjs`).
- Root `package.json`: PNPM workspaces, shared scripts; no separate build step.

## Build, Test, and Development
- Install deps: `pnpm install` (workspace root).
- **Full Test Suite**: `npm test` — runs class compatibility, syntax, and verification tests.
- **Class Testing**: `npm run test:classes` — validates all CSS classes across packages.
- Check versions: `npm run version:check` — verifies all package versions match root + syncs class definitions.
- Bump versions: `npm run version:patch|minor|major` — bumps all workspaces.
- **Validation**: `npm run validate` — comprehensive validation before publishing.
- Dry-run publish: `npm run release:dry` — simulates publish order.
- Publish all: `npm run release:all` — publishes packages in dependency order.
  - Optional env: `NPM_TAG=next NPM_PROVENANCE=1 npm run release:all`.

## Coding Style & Naming
- CSS only (ESM used in scripts). Prefer focused, composable utilities.
- Class prefixes: use `cs-` (e.g., `cs-card`, `cs-grid-cards`) - **Note**: Glass package uses `.glass` prefix for legacy compatibility.
- Tokens: define with CSS custom properties using `--cs-*` in `tokens.css`.
- Kebab-case for class names; two-space indentation; group related utilities.
- Keep cross-package APIs consistent; avoid breaking renames without a deprecation note in the package README.

## Class Management & Backwards Compatibility
- **Global Class Registry**: All CSS classes are tracked in `class-definitions.json`
- **Critical Classes**: Classes marked as "critical" cannot be removed without major version bump
- **Adding New Classes**: 
  1. Add class to `plugin.js`
  2. Run `npm run test:classes:extract` to see new classes
  3. Update `class-definitions.json` to include new classes
  4. Run `npm run validate` to verify everything works
- **Removing Classes**: Follow deprecation policy - deprecate for one minor version before removal
- **Class Testing**: Automated tests ensure no accidental deletions or renames across all packages

## Testing Guidelines
- **Automated Class Testing**: Global system prevents accidental class removal/renaming:
  - `npm run test:classes` — Test all packages for class compatibility
  - `npm run test:classes:extract` — Extract and analyze classes from all plugins
  - `npm run validate` — Full validation including version sync and compatibility
  - **Breaking Change Detection**: Critical classes in `class-definitions.json` cannot be removed without major version bump
  - **Version Synchronization**: Automatically syncs package versions in test definitions
- **Manual Validation**: Additionally validate changes by:
  - Importing locally: `@import "tailwindcss"; @import "@casoon/<pkg>/index.css";`.
  - Manually verifying class behavior (hover/focus/motion safety, reduced-motion).
  - Checking in modern browsers; prefer no layout thrash (use transforms, opacity).
- **Pre-Publish Safety**: All packages automatically run compatibility tests before publishing.

## Commit & Pull Requests
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:` (see git history).
- Scope by package when helpful: `feat(utilities): add cs-grid-12 helpers`.
- PRs should include:
  - Summary, rationale, affected packages, and before/after snippet or screenshot.
  - Changelog note (README update) when adding/removing utilities.
  - Version alignment: run `npm run version:check` before requesting review.

## Security & Publishing
- Ensure you’re logged in to npm before releasing: `npm whoami` / `npm login`.
- Use `release:dry` for verification; prefer `NPM_TAG=next` for experimental changes.

## Useful Paths & Examples
- Example import: `packages/tailwindcss-utilities/index.css`.
- Add a utility in `index.css`; add/adjust tokens in `tokens.css`.

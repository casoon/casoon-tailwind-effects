# Repository Guidelines

## Project Structure & Modules
- `packages/*`: Publishable CSS modules for Tailwind v4:
  - `tailwindcss-utilities`, `tailwindcss-animations`, `tailwindcss-glass`, `tailwindcss-gradients`, `tailwindcss-navigation`, `tailwindcss-orbs`, `tailwindcss-scroll`, `tailwindcss-effects` (meta bundle).
- `scripts/`: Release and version tooling (`release.mjs`, `check-versions.mjs`).
- Root `package.json`: PNPM workspaces, shared scripts; no separate build step.

## Build, Test, and Development
- Install deps: `pnpm install` (workspace root).
- Check versions: `npm run version:check` — verifies all package versions match root.
- Bump versions: `npm run version:patch|minor|major` — bumps all workspaces.
- Dry-run publish: `npm run release:dry` — simulates publish order.
- Publish all: `npm run release:all` — publishes packages in dependency order.
  - Optional env: `NPM_TAG=next NPM_PROVENANCE=1 npm run release:all`.

## Coding Style & Naming
- CSS only (ESM used in scripts). Prefer focused, composable utilities.
- Class prefixes: use `cs-` (e.g., `cs-card`, `cs-grid-cards`).
- Tokens: define with CSS custom properties using `--cs-*` in `tokens.css`.
- Kebab-case for class names; two-space indentation; group related utilities.
- Keep cross-package APIs consistent; avoid breaking renames without a deprecation note in the package README.

## Testing Guidelines
- No automated tests yet. Validate changes by:
  - Importing locally: `@import "tailwindcss"; @import "@casoon/<pkg>/index.css";`.
  - Manually verifying class behavior (hover/focus/motion safety, reduced-motion).
  - Checking in modern browsers; prefer no layout thrash (use transforms, opacity).

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

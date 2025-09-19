# Repository Guidelines

## Project Structure & Modules
- `packages/*`: Publishable CSS modules for Tailwind v4 (pure CSS architecture):
  - `tailwindcss-utilities`, `tailwindcss-animations`, `tailwindcss-glass`, `tailwindcss-gradients`, `tailwindcss-navigation`, `tailwindcss-orbs`, `tailwindcss-scroll`, `tailwindcss-effects` (meta bundle).
- `scripts/`: CSS validation, minification, and utility scripts.
- Root `package.json`: PNPM workspaces, shared scripts for validation and minification.

## Build, Test, and Development
- Install deps: `pnpm install` (workspace root).
- **CSS Validation**: `npm test` or `npm run validate` — comprehensive CSS validation (syntax, prefixes, file sizes).
- **CSS Minification**: `npm run minify` — creates production-optimized dist.min.css files.
- **Combined Build**: `npm run build:all` — minifies all packages for production.
- Check versions: `npm run version:check` — verifies all package versions match root.
- Bump versions: `npm run version:patch|minor|major` — bumps all workspaces.
- Publish all: `npm run release:all` — runs validation + minification + publishing.
  - Optional env: `NPM_TAG=next NPM_PROVENANCE=1 npm run release:all`.

## Coding Style & Naming
- **Pure CSS Architecture**: No plugins, only CSS files. ESM used in utility scripts.
- Class prefixes: use `cs-` (e.g., `cs-card`, `cs-grid-cards`) for all utilities.
- Tokens: define with CSS custom properties using `--cs-*` in CSS files.
- Kebab-case for class names; clean formatting; group related utilities.
- Keep cross-package APIs consistent; avoid breaking renames without deprecation.

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

## Tailwind v4 On-Demand CSS Architecture

### Core Principles
- **Definition Library**: This library provides Tailwind v4 class definitions using `@utility`, `@theme`, and `@custom-variant`.
- **Consumer Processing**: The `@utility` directives are processed by Tailwind in the consumer's project, enabling tree-shaking.
- **Dual-Build Strategy**: `index.css` for Tailwind projects, `dist.css` for non-Tailwind projects.

### Library Structure (Our Responsibility)
1. **Tailwind Directive Definitions** (`index.css`)
   - Use `@utility` for class definitions that Tailwind will process at the consumer's end.
   - Use `@theme` for tokens (colors, spacing, animations, keyframes).
   - Use `@custom-variant` for custom responsive/state variants.
   - These definitions are **not processed here** - they're consumed by Tailwind in the user's project.

2. **Standard CSS Fallback** (`dist.css`)
   - Generated standard CSS classes (`.cs-glass { ... }`) for projects without Tailwind.
   - Full CSS output for drop-in usage with any purging system.
   - Compatible with non-Tailwind build systems.

### Required Structure for `index.css`
1. **Pure Tailwind Definitions**
   ```css
   @import "tailwindcss";
   
   @theme {
     --cs-anim-duration-sm: 200ms;
     --animate-cs-fade-in: cs-fade-in var(--cs-anim-duration-sm) ease-out;
     @keyframes cs-fade-in { 0%{opacity:0} 100%{opacity:1} }
   }
   
   @utility cs-anim { 
     animation-fill-mode: both; 
     animation-iteration-count: 1; 
   }
   
   @utility cs-fade-in { animation-name: cs-fade-in; }
   ```

2. **Tree-Shakable Complex Selectors**
   - Complex selectors (stagger, child combinators) within `@utility` blocks.
   - Only appear in consumer's CSS when the utility class is used.
   ```css
   @utility cs-stagger-100 {
     > .cs-anim:nth-child(1) { --cs-anim-delay: 0ms; }
     > .cs-anim:nth-child(2) { --cs-anim-delay: 100ms; }
   }
   ```

3. **No Pre-compiled CSS in index.css**
   - Never include `.cs-class { ... }` selectors in `index.css`.
   - Only `@utility`, `@theme`, and `@custom-variant` directives.
   - Let Tailwind handle the CSS generation at the consumer's end.

### Build Process
1. **index.css**: Contains only Tailwind directives for on-demand processing.
2. **dist.css**: Generated from a separate build that compiles directives to standard CSS.
3. **dist.min.css**: Minified version of dist.css.

### Consumer Usage
**Tailwind Projects** (On-Demand):
```css
@import "tailwindcss";
@source "./src/**/*.{html,js,ts,tsx,jsx,vue,svelte,astro}";
@import "@casoon/tailwindcss-effects/index.css";
```

**Non-Tailwind Projects** (Full CSS):
```css
@import "@casoon/tailwindcss-effects/dist.css";
```

### Example Package Structure
```
packages/tailwindcss-animations/
├── src/
│   ├── index.css          # Tailwind directives (@utility, @theme)
│   └── build-dist.css     # Template for generating dist.css
├── dist.css               # Compiled standard CSS
├── dist.min.css          # Minified standard CSS
└── package.json
```

### Migration Strategy
- **Phase 1**: Convert existing CSS classes to `@utility` definitions in `src/index.css`.
- **Phase 2**: Create build process to generate `dist.css` from directives.
- **Phase 3**: Test both on-demand (Tailwind) and standard CSS (non-Tailwind) usage.
- **Phase 4**: Update documentation and examples for both usage patterns.

## Useful Paths & Examples
- Example import: `packages/tailwindcss-utilities/index.css`.
- Add a utility in `index.css`; add/adjust tokens in `tokens.css`.

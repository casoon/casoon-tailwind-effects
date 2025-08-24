# Casoon Effects – Pure CSS Monorepo (Tailwind v4)

**CSS-first** Libraries (no `@apply`, no JS plugins required). Ready to publish to npm.

## Packages
- `@casoon/tokens` – shared `@theme` tokens & keyframes
- `@casoon/tailwindcss-glass` – glassmorphism components/utilities
- `@casoon/tailwindcss-orbs` – orb backgrounds & helpers
- `@casoon/tailwindcss-gradients` – gradient backgrounds & text
- `@casoon/tailwindcss-scroll` – scroll animation primitives
- `@casoon/tailwindcss-effects` – meta CSS that imports all above

## Install (consumer project)
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/index.css"; /* loads tokens + all effects */
```
or granular:
```css
@import "tailwindcss";
@import "@casoon/tokens/index.css";
@import "@casoon/tailwindcss-glass/index.css";
@import "@casoon/tailwindcss-orbs/index.css";
@import "@casoon/tailwindcss-gradients/index.css";
@import "@casoon/tailwindcss-scroll/index.css";
```

## Releasing to npm
1. `npm login` (with 2FA if enabled)
2. Optional: export a tag `export NPM_TAG=next` (or omit for default `latest`)
3. Dry run: `pnpm run release:dry`
4. Publish all: `pnpm run release:all`

The release script skips packages whose **exact version** already exists on npm.

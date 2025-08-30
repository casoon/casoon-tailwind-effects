# @casoon/tailwindcss-loading

Tailwind CSS v4 compatible loading primitives: skeletons, progress indicators, and lightweight loading overlays. Built with CSS custom properties for consistent theming and motion safety.

## Classes

- Skeleton: `.skeleton`, `.skeleton-text`, `.skeleton-avatar`
- Progress: `.progress-circle`, `.progress-steps`, `.progress-timeline`
- Overlays/Spinners: `.loading-spinner`, `.loading-dots`, `.loading-bars`

## Import

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-loading/index.css";
```

## 🌓 Dark Mode

- Loading visuals follow `currentColor` and tokens. Override `--loading-*` or shared `--cs-*` per mode; `.dark` is supported with OS fallback.

## Notes

- Honors `prefers-reduced-motion` for shimmer and spinning effects.
- Customize via `tokens.css` exposed variables (duration, sizes, colors).

## Tokens

Use the following CSS custom properties to customize behavior and appearance:

- `--loading-duration`: base shimmer/bar animation duration (default `1.2s`)
- `--loading-duration-fast`: faster animation duration (default `.8s`)
- `--loading-duration-slow`: slower animation duration (default `1.8s`)
- `--loading-ease`: easing function for loading animations
- `--loading-color`: background/track color for skeletons/bars (uses `currentColor` mix)
- `--loading-accent`: active/foreground color (defaults to `currentColor`)
- `--skeleton-radius`: corner radius for skeleton blocks
- `--skeleton-height`: minimum skeleton block height
- `--skeleton-sheen`: gradient used for the skeleton shimmer
- `--avatar-size`: default size for `.skeleton-avatar`
- `--progress-size`: diameter for `.progress-circle`

## Guidelines

- Prefer setting colors via `color` on a wrapper; components derive from `currentColor`.
- Avoid overly fast shimmer to reduce distraction; use `--loading-duration-slow` if needed.
- Ensure contrast of overlays with underlying content for readability.

## Accessibility & Motion

- Respects `prefers-reduced-motion: reduce` by slowing/limiting animations.
- Skeletons should not convey essential information; pair with ARIA live regions for real status.
- Use spinners sparingly; progress components communicate state more clearly.

## 🎨 Theme Overrides

Common per‑mode overrides for masks and accents:

```css
:root {
  --loading-color: color-mix(in oklab, currentColor 12%, transparent);
  --loading-accent: currentColor;
  --loading-mask-ink:#000;
}
:where(.dark){
  --loading-mask-ink:#000;
}
```

# @casoon/tailwindcss-micro-interactions

Compact, accessible micro‑interaction utilities for Tailwind CSS v4: click effects, hover affordances, focus treatments, and simple state helpers. Motion‑safe and token‑driven.

## Classes

- Click: `.click-ripple`, `.click-bounce`, `.click-squish`
- Hover: `.hover-magnetic`, `.hover-tilt`, `.hover-float`
- Focus: `.focus-glow`, `.focus-scale`, `.focus-rotate`
- State: `.state-loading`, `.state-success`, `.state-error`

## Import

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-micro-interactions/index.css";
```

## Dark Mode

- Utilities derive visuals from `currentColor` and tokens. Enabling `.dark` on the root integrates with your theme; override `--mi-*` tokens as needed in `.dark`.

## Notes

- Respects `prefers-reduced-motion` by softening or disabling animations.
- Customize timing, distances, and colors via `tokens.css`.

## Tokens

Customize timing, distances, and feedback styling via CSS variables:

- `--mi-duration-xs|sm|md|lg`: timing presets for transitions/animations
- `--mi-ease-standard`, `--mi-ease-bounce`: easing curves
- `--mi-translate-sm|md`: small/medium translate distances
- `--mi-rotate`: rotation used by `.focus-rotate`
- `--mi-tilt-3d`: perspective depth used by `.hover-tilt`
- `--mi-focus-color`: outer focus glow color (mixed with currentColor)
- `--mi-success`, `--mi-error`: ring colors for `.state-success|error`

## Guidelines

- Reserved naming: the classes in this package are the canonical `click-*/hover-*/focus-*/state-*` utilities. Do not duplicate them in other packages.
- Keep interactions subtle (scale/translate within a few px/percent) to avoid layout jank.
- Use `:focus-visible` patterns to preserve keyboard accessibility.

## Accessibility & Motion

- Honors `prefers-reduced-motion: reduce` by toning down or disabling transforms.
- Do not remove outlines on focusable elements; `.focus-*` utilities provide additive affordances.
- Provide semantic states (ARIA) alongside visual `state-*` classes when relevant.

## 🎨 Theme Overrides

Define ring colors and shadow ink per mode:

```css
:root {
  --mi-focus-color: color-mix(in oklab, currentColor 55%, transparent);
  --mi-success: oklch(62% 0.15 150);
  --mi-error: oklch(62% 0.2 25);
  --mi-shadow-ink:#000;
}
:where(.dark){
  --mi-shadow-ink:#000;
}
```

@casoon/tailwindcss-glass
=========================

CSS-first Tailwind v4 glassmorphism utilities and components as `@utility` classes.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-glass";
```

- Use

```
<div class="cs-acrylic">Frosted surface</div>
<button class="cs-glass cs-glow">Glass button</button>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- `backdrop-filter` fallbacks are provided via @supports.
- Media/supports/container rules are nested inside utilities for tree‑shaking.


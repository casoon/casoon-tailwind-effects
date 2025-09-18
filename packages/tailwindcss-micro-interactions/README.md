@casoon/tailwindcss-micro-interactions
=====================================

CSS-first Tailwind v4 micro-interactions (`hover`, `focus`, `active`) and subtle effects as `@utility` classes.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-micro-interactions";
```

- Use

```
<button class="cs-focus-scale-105 cs-elev-2 forced-colors:cs-focus-ring-2">Click</button>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Fallbacks for `:focus-visible` are included via @supports.
- Effects and media guards are scoped per utility for optimal tree‑shaking.

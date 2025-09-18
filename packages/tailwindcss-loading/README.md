@casoon/tailwindcss-loading
==========================

CSS-first Tailwind v4 loading states, spinners, and overlays as `@utility` classes.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-loading";
```

- Use

```
<div class="cs-loading-overlay cs-spinner"></div>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`

Notes
- Keyframes for spinners are co-located and only ship when used.
- Reduced-motion fallbacks are applied via `motion-reduce` or @media.


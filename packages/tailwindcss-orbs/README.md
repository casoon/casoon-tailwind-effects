@casoon/tailwindcss-orbs
=======================

CSS-first Tailwind v4 orb/blob visual effects as `@utility` classes.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-orbs";
```

- Use

```
<div class="cs-orb cs-orb-md cs-orb-float motion-reduce:cs-orb-slow"></div>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Keyframes live with utilities; only referenced ones ship.
- Media/Supports/Container rules are nested inside utilities for tree‑shaking.


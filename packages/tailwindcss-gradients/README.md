@casoon/tailwindcss-gradients
=============================

CSS-first Tailwind v4 gradient utilities/components. Includes animated presets and text/background helpers.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-gradients";
```

- Use

```
<div class="cs-gradient-sunset cs-bg-preset-intense motion-reduce:cs-bg-preset-breathe"></div>
<h1 class="cs-gradient-text cs-gradient-text-ocean">Hello</h1>
```

- Variants (`@custom-variant`)
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Utilities/components are tree‑shakeable.
- Keyframes and media guards are scoped to utilities for optimal output.


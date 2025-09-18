@casoon/tailwindcss-navigation
=============================

CSS-first Tailwind v4 navigation components (navbar, tabs, pills, drawer) as `@utility` classes.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-navigation";
```

- Use

```
<ul class="cs-nav cs-nav-tabs">
  <li class="cs-nav-item cs-nav-item--active"><a class="cs-nav-link">Tab</a></li>
</ul>
<nav class="cs-navbar cs-navbar--acrylic motion-reduce:cs-nav-fade-in">…</nav>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Utilities/components are tree‑shakeable.
- Pseudo elements/states use CSS nesting for minimal output.


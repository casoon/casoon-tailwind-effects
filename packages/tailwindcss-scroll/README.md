@casoon/tailwindcss-scroll
=========================

CSS-first Tailwind v4 scroll utilities: behavior, snap, shadows, and scrollbar styling.

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-scroll";
```

- Use

```
<div class="cs-scrollbar cs-scrollbar-thin cs-scroll-snap-y contrast-more:cs-scrollbar">…</div>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Scrollbar rules target Firefox + WebKit and are nested under utilities.
- Accessibility guards (contrast/forced-colors/print) are utility-scoped.


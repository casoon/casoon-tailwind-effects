@casoon/tailwindcss-animations
================================

CSS-first Tailwind v4 animations as `@utility` classes. Ships custom variants and keyframes.

- Import: add to your CSS entry after Tailwind

```
@import "tailwindcss";
@import "@casoon/tailwindcss-animations";
```

- Use: compose `cs-*` utilities directly in markup

```
<button class="cs-anim cs-fade-in cs-anim-sm motion-reduce:cs-anim">Fade In</button>
```

- Variants: defined via `@custom-variant`
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Utilities are tree‑shakeable; only used rules are emitted.
- Keyframes are co-located and included when their utilities are referenced.


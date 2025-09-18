@casoon/tailwindcss-forms
========================

CSS-first Tailwind v4 form presets and components as `@utility` classes (modern + glass styles).

- Import

```
@import "tailwindcss";
@import "@casoon/tailwindcss-forms";
```

- Use

```
<form class="cs-form-modern">
  <div class="cs-field-modern">
    <label class="cs-label">Email</label>
    <input class="cs-input" placeholder="you@example.com" />
  </div>
</form>
```

- Variants
  - `motion-safe`, `motion-reduce`, `contrast-more`, `forced-colors`, `dark`, `light`

Notes
- Utilities/components are tree‑shakeable.
- Keyframes and media/supports rules are nested inside utilities.

# @casoon/tailwindcss-effects (CSS-only)

Meta CSS that imports tokens + all effect modules.

## Usage
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/index.css";
```

## 🎨 Theme Overrides

Use per‑package overrides to brand the bundle. Example minimal set:

```css
/* Utilities baseline */
:root { --cs-text-primary: oklch(18% 0.03 260); --cs-bg-surface: oklch(100% 0 0); }
:where(.dark) { --cs-text-primary: oklch(92% 0.03 260); --cs-bg-surface: oklch(22% 0.02 260); }

/* Glass */
:root { --glass-bg: rgba(255,255,255,.08); }
:where(.dark) { --glass-bg: rgba(15,23,42,.90); }

/* Navigation */
:root { --nav-bg:#fff; --nav-fg:#0f172a; }
:where(.dark){ --nav-bg:rgba(15,23,42,.90); --nav-fg:#e5e7eb; }
```

## Dark Mode

- All included packages support Tailwind `.dark` and OS fallback. Add `.dark` to your root element to switch themes across the bundle; override tokens per package in `.dark` as needed.

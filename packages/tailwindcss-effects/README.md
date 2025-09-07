# @casoon/tailwindcss-effects (CSS-only)

Meta CSS that imports tokens + all effect modules.

## Usage

### CSS Import (Recommended)
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/index.css";
```

### Tailwind Plugin
```js
// tailwind.config.js
import effectsPlugin from '@casoon/tailwindcss-effects/plugin.js';

export default {
  plugins: [
    ...effectsPlugin(), // Use spread operator!
    // Or with options:
    // ...effectsPlugin({
    //   utilities: { /* options */ },
    //   animations: { /* options */ },
    //   glass: { /* options */ }
    // })
  ]
};
```

> **Note:** The plugin returns an array of plugins, so you must use the spread operator (`...`) when adding it to your plugins array.

## 🎨 Theme Overrides

Use per‑package overrides to brand the bundle. Example minimal set:

```css
/* Utilities baseline */
:root { --cs-text-primary: oklch(18% 0.03 260); --cs-bg-surface: oklch(100% 0 0); }
:where(.dark) { --cs-text-primary: oklch(92% 0.03 260); --cs-bg-surface: oklch(22% 0.02 260); }

/* Glass */
:root { --cs-glass-bg: rgba(255,255,255,.08); }
:where(.dark) { --cs-glass-bg: rgba(15,23,42,.90); }

/* Navigation */
:root { --cs-nav-bg:#fff; --cs-nav-fg:#0f172a; }
:where(.dark){ --cs-nav-bg:rgba(15,23,42,.90); --cs-nav-fg:#e5e7eb; }
```

## Dark Mode

- All included packages support Tailwind `.dark` and OS fallback. Add `.dark` to your root element to switch themes across the bundle; override tokens per package in `.dark` as needed.

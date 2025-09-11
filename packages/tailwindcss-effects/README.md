# @casoon/tailwindcss-effects

Complete collection of CSS effects for Tailwind CSS v4 - Available in **70KB Core** and **144KB Full** variants.

## 🎯 **Why Use the Core Version?**

- **51% smaller** - Perfect for production apps
- **All essential effects** - Utilities, animations, navigation, interactions
- **Zero breaking changes** - Drop-in replacement
- **Better performance** - Faster load times

## Variants

### 🎯 **Core Version** (70KB - Recommended)
Essential effects without decorative elements - **51% smaller**:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/core.css";
```

**✅ Included (70KB):**
- **Utilities** - Layout, accessibility, 7-layer architecture (32KB)
- **Animations** - Fade, slide, bounce, 3D effects (12KB) 
- **Loading** - Spinners, progress bars, skeleton states (8KB)
- **Micro-interactions** - Hover, focus, press effects (11KB)
- **Navigation** - Nav bars, breadcrumbs, drawers (14KB)
- **Scroll** - Smooth scrolling, snap points, custom scrollbars (5KB)

**❌ Decorative Effects (use separately if needed):**
- **Glass effects** (32KB) → `@casoon/tailwindcss-glass`
- **Gradients** (36KB) → `@casoon/tailwindcss-gradients`
- **Orbs** (18KB) → `@casoon/tailwindcss-orbs`

**Perfect for:** Production apps, SaaS dashboards, e-commerce sites

### 🎨 **Full Version** (144KB)
Complete package with all effects including decorative elements:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/styles.css";
```

**✅ Everything from Core +**
- **Glass effects** - Glassmorphism, backdrop blur, tinted glass
- **Gradients** - Linear, radial, conic, animated gradients
- **Orbs** - Floating blob effects, animated backgrounds

**Perfect for:** Design systems, marketing sites, portfolios

## 📊 **Quick Comparison**

| Feature | Core (70KB) | Full (144KB) |
|---------|-------------|-------------|
| **Utilities & Layout** | ✅ | ✅ |
| **Animations & Loading** | ✅ | ✅ |
| **Navigation & Interactions** | ✅ | ✅ |
| **Glass Effects** | ❌ | ✅ |
| **Gradients** | ❌ | ✅ |
| **Orbs** | ❌ | ✅ |
| **Size Reduction** | **51% smaller** | - |
| **Best for** | Production apps | Design systems |

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

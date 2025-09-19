# 🎨 CSS Usage Guide - Casoon Tailwind Effects v0.9.0

Quick start guide for using Casoon Tailwind Effects in your projects.

## 🚀 Option 1: Complete System with Tailwind v4

### Full Collection (All Features)
Use this for projects that want all available utilities and effects:

```css
/* Import complete collection with Tailwind v4 */
@import "path/to/casoon-tailwind-effects/index.css";
```

**Includes:**
- ✅ Tailwind CSS v4 base styles
- ✅ 200+ Utilities (forms, cards, buttons, typography, scroll)  
- ✅ 80+ Animations (entrance, continuous, 3D, stagger system)
- ✅ Glass-morphism effects with smart fallbacks
- ✅ Gradient orb system for decorative elements
- ✅ Complete accessibility support

**Bundle Size:** ~157KB uncompressed / ~103KB minified

### Core Collection (Essentials Only)
Use this for projects that want utilities + animations without glass effects:

```css
/* Import core essentials with Tailwind v4 */
@import "path/to/casoon-tailwind-effects/core.css";
```

**Includes:**
- ✅ Tailwind CSS v4 base styles
- ✅ 200+ Essential Utilities
- ✅ 80+ Modern Animations
- ✅ Complete accessibility support
- ❌ No glass effects or gradient orbs (smaller bundle)

**Bundle Size:** ~100KB uncompressed / ~72KB minified

## 📦 Option 2: Pre-compiled CSS (Legacy Projects)

### For Non-Tailwind Projects

If you can't use Tailwind CSS v4, use the pre-compiled versions:

```html
<!-- Complete system (all features) -->
<link rel="stylesheet" href="path/to/casoon-tailwind-effects/dist.min.css">

<!-- Core system (essentials only) -->
<link rel="stylesheet" href="path/to/casoon-tailwind-effects/dist.core.min.css">
```

## 🎯 Option 3: Individual Packages

For maximum control, install specific packages:

```css
@import "tailwindcss";

/* Pick only what you need */
@import "@casoon/tailwindcss-utilities";    /* Forms, buttons, cards, etc. */
@import "@casoon/tailwindcss-animations";   /* Entrance, 3D, stagger animations */
@import "@casoon/tailwindcss-glass";        /* Glass-morphism effects */
@import "@casoon/tailwindcss-orbs";         /* Gradient orb decorations */
```

## 📊 Bundle Size Comparison

| Import Method | Features | Uncompressed | Minified | Tree-Shaking |
|---------------|----------|--------------|----------|--------------|
| `index.css` | All features | ~157KB | ~103KB | ✅ Yes |
| `core.css` | Essentials only | ~100KB | ~72KB | ✅ Yes |
| `dist.min.css` | All features | ~157KB | ~103KB | ❌ No |
| Individual packages | Custom selection | Variable | Variable | ✅ Yes |

## 💡 Recommendations

### 🎯 For New Projects with Tailwind v4
```css
@import "casoon-tailwind-effects/index.css";
```
**Best choice:** Full tree-shaking, only used utilities included in build.

### ⚡ For Performance-Critical Projects  
```css
@import "casoon-tailwind-effects/core.css";
```
**Smaller bundle:** Essential utilities + animations only.

### 🔧 For Legacy Projects
```html
<link rel="stylesheet" href="casoon-tailwind-effects/dist.core.min.css">
```
**No build step:** Pre-compiled CSS works everywhere.

### 🎨 For Custom Selection
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-utilities";
@import "@casoon/tailwindcss-animations";
/* Skip glass/orbs for smaller bundle */
```

## 🎨 Quick Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    @import "casoon-tailwind-effects/core.css";
  </style>
</head>
<body>
  <!-- Staggered card grid -->
  <div class="cs-stagger-100 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <div class="cs-card-product cs-fade-in cs-anim">
      <h3 class="cs-text-gradient">Premium Plan</h3>
      <p>Perfect for growing teams</p>
      <button class="cs-btn cs-btn-primary">Choose Plan</button>
    </div>
    
    <div class="cs-card-product cs-scale-in cs-anim">
      <h3 class="cs-text-gradient">Business Plan</h3>
      <p>Advanced features included</p>
      <button class="cs-btn cs-btn-primary">Choose Plan</button>
    </div>
    
    <div class="cs-card-product cs-slide-up cs-anim">
      <h3 class="cs-text-gradient">Enterprise Plan</h3>
      <p>Custom solutions available</p>
      <button class="cs-btn cs-btn-primary">Choose Plan</button>
    </div>
  </div>
</body>
</html>
```

## 🔗 More Information

- 📚 [Full Documentation](./README.md)
- 🎬 [Animation Examples](./packages/tailwindcss-animations/README.md)  
- ✨ [Glass Effects Guide](./packages/tailwindcss-glass/README.md)
- 🛠️ [Utilities Reference](./packages/tailwindcss-utilities/README.md)
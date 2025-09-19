# @casoon/tailwindcss-effects

[![npm version](https://badge.fury.io/js/%40casoon%2Ftailwindcss-effects.svg)](https://www.npmjs.com/package/@casoon/tailwindcss-effects)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Complete collection of animation and UI effects for **Tailwind CSS v4** with **On-Demand Tree-Shaking**.

**🎉 NEW in v0.9.0**: Consolidated from 16 packages to 6 packages (-62% reduction) with 300+ utilities!

## 🚀 What's New in v0.9.0

- 🎯 **Major Consolidation** - 16 packages → 6 packages (-62% reduction)
- ✨ **300+ Utilities** - Complete utility system with animations, glass effects
- 🔄 **Enhanced Features** - Stagger system, 3D animations, scroll-timeline
- 📦 **Legacy CSS Support** - Pre-compiled dist.css for non-Tailwind projects
- ♿ **Full Accessibility** - Complete prefers-reduced-motion support
- ⚡ **Performance Optimized** - Hardware acceleration and modern CSS
- 📖 **Comprehensive Docs** - Real-world examples and migration guides

## 📦 Installation

```bash
npm install @casoon/tailwindcss-effects
```

## 🎯 Quick Start

### For Tailwind CSS v4 (Recommended - Tree-Shaking)

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/index.css";
```

Only the CSS utilities you actually use will be included in the final build!

### For Non-Tailwind Projects (All Styles)

```css
@import "@casoon/tailwindcss-effects";
/* or */
@import "@casoon/tailwindcss-effects/dist.css";
```

## 🎨 What's Included

This meta-package includes all Casoon effects in the new consolidated architecture:

### 🌟 Core Packages (v0.9.0)
| Package | Description | Features | Size |
|---------|-------------|----------|------|
| **utilities** | Complete utility system | 200+ utilities, forms, cards, typography, scroll | ~27KB |
| **animations** | Modern animation system | 80+ animations, stagger, 3D, scroll-timeline | ~24KB |
| **glass** | Glass-morphism effects | Backdrop filters, components, fallbacks | ~13KB |

### 🎯 Specialized Packages  
| Package | Description | Features | Size |
|---------|-------------|----------|------|
| **orbs** | Gradient orb system | Complex floating gradient effects | ~10KB |

**Total**: ~74KB (all styles) vs ~25KB+ (tree-shaken based on usage)

## 📖 Usage Examples

### 🎆 Enhanced Animations (v0.9.0)
```html
<!-- Staggered animations -->
<div class="cs-stagger-100">
  <div class="cs-fade-in cs-anim cs-ease-spring">Item 1</div>
  <div class="cs-scale-in cs-anim cs-ease-bounce">Item 2</div>
  <div class="cs-slide-up cs-anim cs-delay-300">Item 3</div>
</div>

<!-- 3D animations -->
<div class="cs-preserve-3d">
  <div class="cs-reveal-3d-up cs-anim cs-anim-lg">
    3D reveal effect
  </div>
</div>
```

### ✨ Glass Morphism (New!)
```html
<!-- Glass card components -->
<div class="cs-glass-card p-6">
  <h3>Glass Card</h3>
  <p>Beautiful frosted glass effect</p>
</div>

<!-- Colored glass variants -->
<div class="cs-glass-blue p-4 rounded-xl">
  Blue tinted glass
</div>
```

### 🛠️ Complete Utilities (200+)
```html
<!-- Enhanced form system -->
<form class="cs-space-y-4">
  <div class="cs-input-group">
    <label class="cs-label">Email</label>
    <input type="email" class="cs-input cs-focus-ring">
  </div>
  <button class="cs-btn cs-btn-primary cs-btn-lg">
    <span class="cs-spinner" style="display: none;"></span>
    Submit
  </button>
</form>

<!-- Product cards -->
<div class="cs-card-product">
  <h3 class="cs-text-gradient">Premium Product</h3>
  <div class="cs-badge cs-badge-success">New</div>
</div>

<!-- Loading states -->
<div class="cs-skeleton h-4 rounded mb-2"></div>
<div class="cs-progress">
  <div class="cs-progress-bar" style="width: 60%;"></div>
</div>
```

## 🏗️ Architecture

### On-Demand Build (Tailwind v4)
```
@import "@casoon/effects/index.css"
         ↓
Uses @utility directives
         ↓  
Tree-shaking by Tailwind
         ↓
Only used classes in output
```

### Traditional Build (Legacy/Non-Tailwind)
```  
@import "@casoon/effects"
         ↓
Pre-compiled CSS
         ↓
All styles included
         ↓
~140KB output
```

## 📚 Package Details

### 🎆 v0.9.0 Consolidated Packages

Install individual packages for granular control:

#### 🌟 Core Packages (Essential)
- `@casoon/tailwindcss-utilities` - 200+ utilities (forms, cards, typography, scroll)
- `@casoon/tailwindcss-animations` - 80+ animations (stagger, 3D, scroll-timeline)
- `@casoon/tailwindcss-glass` - Glass morphism effects (backdrop filters, fallbacks)

#### 🎯 Specialized Packages (Optional)
- `@casoon/tailwindcss-orbs` - Complex gradient orb system
- `@casoon/tailwindcss-core` - Base design tokens

#### ❌ Deprecated (Consolidated into core packages)
~~`tailwindcss-cards`~~, ~~`tailwindcss-forms`~~, ~~`tailwindcss-loading`~~, ~~`tailwindcss-navigation`~~, ~~`tailwindcss-scroll`~~, ~~`tailwindcss-typography`~~, ~~`tailwindcss-gradients`~~, ~~`tailwindcss-micro-interactions`~~ 

→ All features moved to `tailwindcss-utilities` and `tailwindcss-animations`

### Build Variants

| Import | Build Type | Output Size | Tree-Shaking |
|--------|------------|-------------|--------------|
| `/index.css` | On-Demand | Minimal | ✅ Yes |
| `/dist.css` | Full Build | ~140KB | ❌ No |
| `/core.css` | Core Only | ~70KB | ❌ No |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build:all

# Validate CSS
npm run validate

# Minify for production
npm run minify
```

## 📄 License

MIT © [Casoon](https://github.com/casoon)

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](../../CONTRIBUTING.md) first.

---

**Made with ❤️ for the Tailwind CSS community**
# @casoon/tailwindcss-utilities

[![npm version](https://badge.fury.io/js/%40casoon%2Ftailwindcss-utilities.svg)](https://www.npmjs.com/package/@casoon/tailwindcss-utilities)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Complete utility system for Tailwind CSS v4** with accessibility-first components, modern design system, and tree-shaking support.

## 🚀 Features

- ✅ **Complete @utility System** - 120+ utilities as native Tailwind v4 directives
- ✅ **Tree-Shaking Ready** - Only used utilities in final build
- ✅ **Accessibility First** - WCAG compliant with screen reader support
- ✅ **Modern Design System** - Comprehensive tokens with light/dark theme
- ✅ **Progressive Enhancement** - Fallbacks for modern CSS features
- ✅ **Container Queries** - Responsive design with modern CSS
- ✅ **Performance Optimized** - Reduced motion and high contrast support

## 📦 Installation

```bash
npm install @casoon/tailwindcss-utilities
```

## 🎯 Usage

### For Tailwind CSS v4 (Recommended - Tree-Shaking)
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-utilities/index.css";
```

### For Non-Tailwind Projects
```css
@import "@casoon/tailwindcss-utilities/dist.css";
```

## 🧩 Complete Utility Reference

### 🎨 Design System

#### Theme System
```html
<!-- Automatic theme based on system preference -->
<html class="">
  
<!-- Manual theme override -->  
<html class="cs-theme-light">
<html class="cs-theme-dark">
```

#### Typography System
```html
<p class="cs-text-xs">Extra small text</p>
<p class="cs-text-sm">Small text</p>
<p class="cs-text-md">Medium text (default)</p>
<p class="cs-text-lg">Large text</p>
<p class="cs-text-xl">Extra large text</p>
<p class="cs-text-2xl">2XL text</p>

<p class="cs-font-sans">System sans-serif</p>
<p class="cs-font-mono">System monospace</p>
```

### 🎯 Accessibility Utilities

#### Screen Reader & Focus Management
```html
<!-- Screen reader only content -->
<span class="cs-sr-only">Hidden from view, visible to screen readers</span>

<!-- Focus ring for interactive elements -->
<button class="cs-btn cs-focus-ring">Accessible button</button>

<!-- Focus within container -->
<div class="cs-focus-ring-within">
  <input type="text" />
</div>
```

### 📏 Layout System

#### Container System
```html
<!-- Responsive fluid container -->
<div class="cs-container-fluid">
  <h1>Page Content</h1>
</div>
```

#### Grid System
```html
<!-- 12-column grid system -->
<div class="cs-grid-12">
  <div class="cs-col-4">4 columns</div>
  <div class="cs-col-8">8 columns</div>
</div>

<!-- Fixed column grids -->
<div class="cs-grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Auto-fit responsive grids -->
<div class="cs-grid-auto-fit-md">
  <div>Responsive item</div>
  <div>Responsive item</div>
</div>
```

#### Modern Layout Patterns
```html
<!-- Vertical stack with consistent spacing -->
<div class="cs-stack">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Horizontal cluster that wraps -->
<div class="cs-cluster">
  <span>Tag 1</span>
  <span>Tag 2</span>
</div>

<!-- Center content -->
<div class="cs-center">
  <span>Centered content</span>
</div>

<!-- Custom aspect ratio -->
<div class="cs-aspect" style="--cs-aspect: 21/9;">
  <img src="..." alt="..." />
</div>
```

### 📐 Spacing System

#### Gap Utilities
```html
<div class="cs-space-1">Small gaps</div>
<div class="cs-space-2">Medium gaps</div>
<div class="cs-space-4">Large gaps</div>
```

#### Padding & Margin
```html
<!-- Padding -->
<div class="cs-p-1">Minimal padding</div>
<div class="cs-p-4">Standard padding</div>
<div class="cs-p-8">Large padding</div>

<!-- Directional padding -->
<div class="cs-px-4">Horizontal padding</div>
<div class="cs-py-2">Vertical padding</div>

<!-- Margin -->
<div class="cs-m-2">Margin all sides</div>
```

### 🏗️ Component System

#### Button System
```html
<!-- Button variants -->
<button class="cs-btn cs-btn-primary cs-focus-ring">Primary</button>
<button class="cs-btn cs-btn-secondary cs-focus-ring">Secondary</button>
<button class="cs-btn cs-btn-outline cs-focus-ring">Outline</button>
<button class="cs-btn cs-btn-ghost cs-focus-ring">Ghost</button>

<!-- Button sizes -->
<button class="cs-btn cs-btn-primary cs-btn-sm">Small</button>
<button class="cs-btn cs-btn-primary">Default</button>
<button class="cs-btn cs-btn-primary cs-btn-lg">Large</button>
```

#### Card System
```html
<!-- Card variants -->
<div class="cs-card">
  <h3>Basic Card</h3>
  <p>Card content</p>
</div>

<div class="cs-card-elevated">
  <h3>Elevated Card</h3>
  <p>Enhanced shadow</p>
</div>
```

#### Alert System
```html
<!-- Semantic alerts -->
<div class="cs-alert cs-alert-info">
  <span>ℹ️</span>
  <div>Info message</div>
</div>

<div class="cs-alert cs-alert-success">
  <span>✅</span>
  <div>Success message</div>
</div>

<div class="cs-alert cs-alert-warning">
  <span>⚠️</span>
  <div>Warning message</div>
</div>

<div class="cs-alert cs-alert-danger">
  <span>❌</span>
  <div>Error message</div>
</div>
```

#### Badge System
```html
<!-- Badge variants -->
<span class="cs-badge cs-badge-primary">Primary</span>
<span class="cs-badge cs-badge-secondary">Secondary</span>
<span class="cs-badge cs-badge-success">Success</span>
<span class="cs-badge cs-badge-warning">Warning</span>
<span class="cs-badge cs-badge-danger">Danger</span>
<span class="cs-badge cs-badge-outline">Outline</span>
```

### 🌟 Surface System

#### Background Surfaces
```html
<!-- Surface levels -->
<div class="cs-surface">Base surface</div>
<div class="cs-surface-elevated">Elevated surface</div>
<div class="cs-surface-raised">Raised surface</div>

<!-- Brand background -->
<div class="cs-bg-brand">Brand colored background</div>
```

#### Acrylic (Glassmorphism)
```html
<!-- Modern glass effect with backdrop-filter -->
<div class="cs-acrylic">
  <h3>Glass Effect</h3>
  <p>Content with backdrop blur</p>
</div>
```

### 🎬 Animation System

#### Micro-Interactions
```html
<!-- Pulse animation -->
<div class="cs-pulse">Pulsing element</div>

<!-- Shimmer loading effect -->
<div class="cs-shimmer">Loading shimmer</div>

<!-- Fade in with delay -->
<div class="cs-fade-delayed">Delayed fade in</div>

<!-- Spinning animation -->
<div class="cs-spin">🔄</div>

<!-- Glow effect -->
<div class="cs-glow cs-glow-active">Glowing element</div>
```

### 📱 Responsive Utilities

#### Container Query Visibility
```html
<!-- Show/hide based on container size -->
<div class="cs-show-mobile">Mobile only</div>
<div class="cs-show-tablet">Tablet only</div>
<div class="cs-show-desktop">Desktop only</div>

<div class="cs-hide-mobile">Hidden on mobile</div>
<div class="cs-hide-tablet">Hidden on tablet</div>
<div class="cs-hide-desktop">Hidden on desktop</div>
```

### 📚 Z-Index System

Complete z-index scale for modern UI layering:

```html
<div class="cs-z-10">Base level</div>
<div class="cs-z-popover">Popover level (30)</div>
<div class="cs-z-tooltip">Tooltip level (40)</div>
<div class="cs-z-toast">Toast level (50)</div>
<div class="cs-z-modal">Modal level (60)</div>
<div class="cs-z-max">Maximum level</div>
```

### 🎭 Utility Classes

#### Performance & Layout
```html
<div class="cs-sticky">Sticky positioning</div>
<div class="cs-will-change-transform">Optimized transforms</div>
<div class="cs-will-change-opacity">Optimized opacity</div>
```

#### Border Radius & Shadows
```html
<div class="cs-radius-sm">Small radius</div>
<div class="cs-radius">Default radius</div>
<div class="cs-radius-lg">Large radius</div>

<div class="cs-shadow">Light shadow</div>
<div class="cs-shadow-lg">Strong shadow</div>
```

## 🎨 Design Token System

The package includes a comprehensive design token system:

```css
/* Color System */
--cs-bg, --cs-surface, --cs-elev1, --cs-elev2
--cs-text, --cs-text-muted, --cs-border
--cs-brand, --cs-brand-contrast
--cs-success, --cs-warning, --cs-danger, --cs-info

/* Typography System */
--cs-font-sans, --cs-font-mono
--cs-fs-xs through --cs-fs-2xl (fluid typography)

/* Spacing System */
--cs-space-1 through --cs-space-8
--cs-density (for scaling all spacing)

/* Layout System */
--cs-radius, --cs-radius-sm, --cs-radius-lg
--cs-shadow-1, --cs-shadow-2
--cs-page-max, --cs-page-pad

/* Motion System */
--cs-transition, --cs-anim-duration-*, --cs-anim-ease-*

/* Z-Index System */
--cs-z-* (complete scale from 0 to max)
```

## ♿ Accessibility Features

- **WCAG Compliant**: Focus management, color contrast, touch targets
- **Screen Reader Support**: `cs-sr-only` utility for accessible content
- **Keyboard Navigation**: Focus rings and proper tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` preference  
- **High Contrast**: Respects `prefers-contrast: high` preference
- **Touch Targets**: Minimum 44px touch targets for mobile

## 🏗️ Architecture

Built with modern Tailwind CSS v4 features:

- **@utility Directives**: Native tree-shaking support
- **@theme Integration**: Seamless token integration  
- **Container Queries**: Modern responsive design
- **CSS Nesting**: Clean, maintainable code
- **Progressive Enhancement**: Fallbacks for all modern features

## 📱 Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful fallbacks for:
  - `color-mix()` → RGBA fallbacks
  - `backdrop-filter` → Solid backgrounds  
  - `container queries` → Media query fallbacks

## 🔧 Customization

Override design tokens to match your brand:

```css
@theme {
  --cs-brand: #your-brand-color;
  --cs-radius: 8px;
  --cs-space-4: 20px;
}
```

## 📚 Related Packages

Part of the [@casoon/tailwindcss-effects](../tailwindcss-effects/) collection:

- `@casoon/tailwindcss-glass` - Glassmorphism effects
- `@casoon/tailwindcss-animations` - Animation utilities  
- `@casoon/tailwindcss-micro-interactions` - Hover/focus effects

## 📄 License

MIT © [Casoon](https://github.com/casoon)
# @casoon/tailwindcss-effects

🎨 **Modern CSS Effects for Tailwind CSS v4** - Pure CSS approach with complete design system integration.

## 🚀 Quick Start

### Installation

```bash
npm install @casoon/tailwindcss-effects
```

### Usage with Tailwind CSS v4

**Import all effects (recommended):**

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects";
```

**Or import individual packages:**

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-animations";
@import "@casoon/tailwindcss-glass";
@import "@casoon/tailwindcss-utilities";
```

**That's it!** All CSS classes are ready to use with `cs-` prefix.

## ✨ What You Get

- **🎯 Pure CSS Architecture** - No JavaScript plugins needed
- **📦 9 Specialized Packages** - Import only what you need
- **🎨 Complete Effect Library** - Animations, glass effects, gradients, utilities
- **⚡ CSS Variables** - Fully customizable design system
- **♿ Accessibility First** - Motion-safe variants, focus management
- **🔧 Optional JavaScript** - Enhanced navigation and scroll functionality

## 📦 Available Packages

| Package | CSS Classes | JavaScript | Size |
|---------|------------|------------|------|
| `@casoon/tailwindcss-effects` | All packages combined | ✅ nav.js, scroll.js | ~32KB |
| `@casoon/tailwindcss-animations` | 51 animation classes | ❌ | ~9KB |
| `@casoon/tailwindcss-glass` | 51 glass effect classes | ❌ | ~14KB |
| `@casoon/tailwindcss-utilities` | Essential utilities | ❌ | ~140B |
| `@casoon/tailwindcss-gradients` | Gradient utilities | ❌ | ~4.5KB |
| `@casoon/tailwindcss-orbs` | Floating orb backgrounds | ❌ | ~3.5KB |
| `@casoon/tailwindcss-loading` | Loading states & spinners | ❌ | ~660B |
| `@casoon/tailwindcss-scroll` | Scroll animations | ✅ scroll.js | ~2KB |
| `@casoon/tailwindcss-navigation` | Navigation components | ✅ nav.js | ~1.7KB |
| `@casoon/tailwindcss-micro-interactions` | Hover & focus effects | ❌ | ~3.2KB |

> All CSS classes use the `cs-` prefix to avoid conflicts with Tailwind's built-in classes.

## 🎨 Examples

### Animations

```html
<!-- Fade in animation -->
<div class="cs-fade-in cs-anim-lg">
  Smooth fade in over 500ms
</div>

<!-- Slide up with spring easing -->
<div class="cs-slide-up cs-ease-spring cs-anim-xl">
  Slides up with bounce effect
</div>

<!-- 3D reveal effect -->
<div class="cs-reveal-3d-up cs-anim-lg">
  3D rotation reveal from top
</div>
```

### Glass Effects

```html
<!-- Basic glass effect -->
<div class="cs-glass">
  Standard glass morphism
</div>

<!-- Strong glass card with color -->
<div class="cs-glass-strong cs-glass-blue cs-glass-rounded-xl">
  <h2>Glass Card</h2>
  <p>Beautiful glassmorphism with blue tint</p>
</div>

<!-- Interactive glass button -->
<button class="cs-glass-button cs-glass-green">
  Click me
</button>
```

### Hover Effects

```html
<!-- Scale on hover -->
<div class="cs-hover-scale-105 transition-transform">
  Scales to 105% on hover
</div>

<!-- Lift effect -->
<div class="cs-hover-lift-sm">
  Lifts up on hover
</div>

<!-- Combined effects -->
<div class="cs-hover-scale-110 cs-hover-lift-md transition-all duration-300">
  Scale and lift together
</div>
```

### Utilities

```html
<!-- Container with fluid padding -->
<div class="cs-container-fluid">
  Full width with consistent padding
</div>

<!-- Screen reader only text -->
<p class="cs-sr-only">
  Hidden from visual users, available to screen readers
</p>
```

## 🔧 JavaScript Helpers (Optional)

For enhanced functionality, some packages provide JavaScript modules:

### Navigation Helper

```js
// Enhanced navigation with accessibility features
import { initSidebarDrawer } from '@casoon/tailwindcss-navigation/nav.js';

const sidebar = initSidebarDrawer({
  trigger: '[data-sidebar-toggle]',
  drawer: '.sidebar',
  overlay: '.sidebar-overlay'
});
```

### Scroll Animations

```js
// Advanced scroll-triggered animations
import '@casoon/tailwindcss-scroll/scroll.js';

// Auto-initializes on page load
// Provides AOS (Animate On Scroll) compatibility
// Custom events: 'scroll:enter', 'scroll:exit'
```

## 🎯 Customization

All effects use CSS custom properties for easy customization:

```css
:root {
  /* Animation system */
  --cs-anim-duration-md: 400ms;
  --cs-anim-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Glass effects */
  --cs-glass-bg-light: color-mix(in srgb, #ffffff 10%, transparent);
  --cs-glass-border-medium: color-mix(in srgb, #ffffff 20%, transparent);
  
  /* Container padding */
  --cs-container-padding: 2rem;
}
```

## 📋 Requirements

- **Tailwind CSS v4.0+**
- **Modern CSS support**: CSS custom properties, `color-mix()`, `@container`
- **Build tool**: Any CSS processor that supports `@import`

## 🏗️ Architecture

This project has been completely rewritten for Tailwind CSS v4:

- **Pure CSS**: Each package exports a `dist.css` file with all CSS classes
- **No Plugins**: CSS files are directly imported, no JavaScript build step needed  
- **CSS Variables**: Complete design system using CSS custom properties
- **Modern CSS**: Uses `color-mix()`, `@container`, `@layer`, and other modern features
- **Tree Shakeable**: Import individual packages to reduce bundle size

## 🧪 Testing

A test project is included to verify all effects work correctly:

```bash
# Development server
npm run dev

# Build test
npm run build:test
```

## 📄 License

MIT - see [LICENSE](LICENSE)

## 👨‍💻 Author

Created by [Jörn Seidel](https://github.com/jseidel19) - [@jseidel19](https://github.com/jseidel19)

---

**Ready for production** ✨ - All packages are stable and tested with Tailwind CSS v4.

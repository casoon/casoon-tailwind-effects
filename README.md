# @casoon/tailwindcss-effects

🎨 **Modern CSS Effects for Tailwind CSS v4** - Pure CSS approach with complete design system integration.

## 🚀 Quick Start

### Installation

```bash
npm install @casoon/tailwindcss-effects
```

### Usage with Tailwind CSS v4

**🎯 Tailwind v4 Integration (Recommended):**

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects";
```

**💎 Legacy/Standalone Version (~69KB minified):**

```html
<link rel="stylesheet" href="node_modules/@casoon/tailwindcss-effects/dist.min.css">
```

**📦 Individual Core Packages:**

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-animations";
@import "@casoon/tailwindcss-glass";
@import "@casoon/tailwindcss-utilities";
@import "@casoon/tailwindcss-orbs";
```

**That's it!** All CSS classes are ready to use with `cs-` prefix.

## ✨ Version 0.9.0 - Consolidated Architecture

**🎯 Streamlined from 16 to 4 Core Packages:**
- `@casoon/tailwindcss-utilities` - Layout, forms, cards, typography, loading, navigation, micro-interactions, scroll
- `@casoon/tailwindcss-animations` - 50+ animation classes and keyframes  
- `@casoon/tailwindcss-glass` - Complete glassmorphism system
- `@casoon/tailwindcss-orbs` - Floating orb backgrounds and effects

**📦 Meta Package:** `@casoon/tailwindcss-effects` combines all core packages.

**🏗️ Build System:**
- `index.css` - For Tailwind v4 integration (includes `@import "tailwindcss"`)
- `dist.css` - Standalone CSS for legacy projects (no Tailwind dependency)
- Full minification and tree-shaking support

## Common Variants & Usage Patterns

Utilities
- Focus rings and accessibility helpers:

```
<button class="cs-focus-ring cs-focus-scale-105 contrast-more:cs-focus-ring">Click me</button>
```

- Layout and presets from `@casoon/tailwindcss-utilities` can be mixed with effect utilities:

```
<section class="cs-surface cs-grid-cards dark:cs-surface-contrast motion-reduce:cs-transition-none">…</section>
```

Typography
- Prose presets are additive; combine with effects and variants:

```
<article class="cs-prose-base cs-prose-blog dark:cs-prose-invert forced-colors:cs-prose-high-contrast">…</article>
```

- Inline emphasis and code blocks integrate with theme tokens; you can layer interactions:

```
<code class="cs-code cs-hover-highlight motion-safe:cs-pulse">npm run build</code>
```

### ⚠️ Important Setup Note

For **gradient effects** to work properly, you need to add the `cs-root` class to your HTML:

```html
<body class="cs-root">
  <!-- Your content here -->
</body>
```

Or alternatively to your root element:

```html
<html class="cs-root">
  <!-- Your content here -->
</html>
```

This class provides the CSS variables needed for gradient backgrounds and text effects like `cs-gradient-sunset`, `cs-gradient-ocean`, `cs-gradient-fire`, etc.

## ✨ What You Get

- **🎯 Pure CSS Architecture** - No JavaScript plugins needed
- **📦 4 Core Packages** - Consolidated and optimized
- **🎨 200+ Ready-to-Use Classes** - Complete design system
- **⚡ CSS Variables & @theme** - Fully customizable with Tailwind v4
- **♿ Accessibility First** - Motion-safe variants, focus management
- **🏗️ Modern Build System** - Both Tailwind v4 and standalone support
- **🗜️ Optimized Sizes** - 69KB minified for full effects library

## 📦 Available Packages (v0.9.0)

| Package | Description | Source Size | Minified |
|---------|-------------|-------------|----------|
| **`@casoon/tailwindcss-effects`** | **Meta package - all utilities combined** | **98KB** | **69KB** |
| `@casoon/tailwindcss-utilities` | Layout, forms, cards, typography, navigation, scroll, micro-interactions | 30KB | 21KB |
| `@casoon/tailwindcss-animations` | 50+ animation classes and keyframes | 26KB | 18KB |
| `@casoon/tailwindcss-glass` | Complete glassmorphism system | 33KB | 25KB |
| `@casoon/tailwindcss-orbs` | Floating orb backgrounds and gradient effects | 7KB | 5KB |

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

### Gradients

```html
<!-- Gradient backgrounds -->
<div class="cs-gradient-sunset p-6">
  Beautiful sunset gradient
</div>

<div class="cs-gradient-ocean p-6">
  Ocean gradient background
</div>

<div class="cs-gradient-fire p-6">
  Fire gradient effect
</div>

<!-- Gradient text -->
<h1 class="cs-gradient-text-sunset">
  Gradient text effect
</h1>

<p class="cs-gradient-text-ocean">
  Ocean colored text
</p>
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

### Preset Components

**Forms:**

```html
<!-- Modern contact form -->
<form class="cs-form-modern">
  <div class="cs-form-group">
    <label for="email" class="cs-label-modern">Email</label>
    <input type="email" id="email" class="cs-input-modern" placeholder="your@email.com">
    <div class="cs-input-validation cs-validation-error">
      <span class="cs-validation-icon">⚠</span>
      Please enter a valid email
    </div>
  </div>
  
  <button type="submit" class="cs-button-primary-modern">
    Send Message
  </button>
</form>

<!-- Glass form variant -->
<form class="cs-form-glass">
  <input type="text" class="cs-input-glass" placeholder="Username">
  <input type="password" class="cs-input-glass" placeholder="Password">
  <button class="cs-button-primary-glass">Sign In</button>
</form>
```

**Cards:**

```html
<!-- Product card -->
<div class="cs-card-product">
  <img src="product.jpg" alt="Product" class="cs-card-image">
  <div class="cs-card-content">
    <h3 class="cs-card-title">Premium Product</h3>
    <p class="cs-card-description">High-quality product with excellent features</p>
    <div class="cs-card-price">$99.99</div>
  </div>
  <div class="cs-card-actions">
    <button class="cs-button-primary-card">Add to Cart</button>
  </div>
</div>

<!-- Testimonial card with orbs -->
<div class="cs-card-testimonial-orb">
  <div class="cs-testimonial-quote">
    "This product changed everything for our team."
  </div>
  <div class="cs-testimonial-author">
    <img src="avatar.jpg" alt="Author" class="cs-testimonial-avatar">
    <div class="cs-testimonial-info">
      <div class="cs-testimonial-name">Sarah Chen</div>
      <div class="cs-testimonial-role">CTO, TechCorp</div>
    </div>
  </div>
</div>
```

**Typography:**

```html
<!-- Blog content -->
<article class="cs-prose-blog">
  <h1 class="cs-heading-blog">Amazing Blog Post Title</h1>
  <div class="cs-blog-meta">
    <span class="cs-blog-author">By John Doe</span>
    <span class="cs-blog-date">March 15, 2024</span>
  </div>
  <p class="cs-blog-lead">This is the engaging introduction to the blog post...</p>
  <p>Regular blog content with perfect spacing and readability...</p>
</article>

<!-- Marketing content -->
<section class="cs-prose-marketing">
  <h1 class="cs-heading-hero">Transform Your Business</h1>
  <p class="cs-marketing-subtitle">Powerful tools for modern teams</p>
  <div class="cs-features-grid">
    <div class="cs-feature-item">
      <h3 class="cs-feature-title">Fast Setup</h3>
      <p class="cs-feature-description">Get started in minutes</p>
    </div>
  </div>
</section>
```

### Advanced Patterns

```html
<!-- Complex glass card with hover effects -->
<div class="cs-glass-card-complex">
  <div class="cs-card-header">
    <h3>Advanced Card</h3>
  </div>
  <div class="cs-card-content">
    <p>Enhanced glass morphism with structured layout</p>
  </div>
  <div class="cs-card-actions">
    <button>Action</button>
  </div>
</div>

<!-- Enhanced disclosure with animations -->
<details class="cs-disclosure-pattern">
  <summary>Click to expand</summary>
  <div class="cs-disclosure-content">
    <p>Content with smooth animations</p>
  </div>
</details>

<!-- Responsive layout with container queries -->
<div class="cs-responsive-layout-pattern">
  <header class="cs-layout-header">Header</header>
  <nav class="cs-layout-sidebar">Sidebar</nav>
  <main class="cs-layout-main">Main content</main>
  <aside class="cs-layout-aside">Aside</aside>
  <footer class="cs-layout-footer">Footer</footer>
</div>
```

### Theme System

```html
<!-- Theme switching -->
<body data-theme="dark">
  <!-- Dark theme applied -->
</body>

<body data-theme="high-contrast">
  <!-- High contrast theme for accessibility -->
</body>

<!-- Density controls -->
<div data-density="compact">
  <!-- Tighter spacing and smaller components -->
</div>

<div data-density="comfortable">
  <!-- More spacious layout -->
</div>
```

### Debug Utilities

```html
<!-- Debug outlines -->
<div data-debug="outlines">
  <!-- All elements get red outlines -->
</div>

<!-- Debug grid -->
<div data-debug="grid">
  <!-- Shows alignment grid overlay -->
</div>

<!-- Debug spacing -->
<div data-debug="spacing">
  <!-- Highlights element spacing -->
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

<!-- Responsive visibility -->
<div class="cs-hide-mobile">
  Hidden on mobile devices
</div>

<div class="cs-hide-desktop">
  Hidden on desktop devices
</div>
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

## 🔧 Development & Build

**For maintainers and contributors:**

```bash
# Build all dist.css files for individual packages
npm run build:dist

# Build meta package (effects) from all core packages  
npm run build:effects

# Complete build pipeline (dist + effects + minification)
npm run build:all

# Validate all packages (checks for cs- prefixed classes)
npm run validate

# Pre-publish workflow (validate + build + minify)
npm run prepublish
```

**Architecture:**
- **`index.css`** - Source files with `@import "tailwindcss"` for v4 integration
- **`dist.css`** - Standalone CSS files without Tailwind dependency
- **`dist.min.css`** - Minified versions for production

## 📋 Requirements

- **Tailwind CSS v4.0+**
- **Modern CSS support**: CSS custom properties, `color-mix()`, `@container`
- **Build tool**: Any CSS processor that supports `@import`

## 🏗️ Architecture

This project has been completely rewritten for Tailwind CSS v4 with a sophisticated **7-layer CSS architecture**:

### 🔧 **New 7-Layer CSS System**

```css
@layer cs-reset, cs-tokens, cs-base, cs-components, cs-patterns, cs-utilities, cs-overrides;
```

**Layer Structure:**

1. **`cs-reset`** - CSS resets & normalization
2. **`cs-tokens`** - Design tokens & CSS custom properties  
3. **`cs-base`** - Base elements, keyframes, system styles
4. **`cs-components`** - Simple UI components
5. **`cs-patterns`** - Complex composed patterns
6. **`cs-utilities`** - Atomic utility classes
7. **`cs-overrides`** - Theme overrides, debug utils

### 🎯 **Benefits of This Architecture**

- **Better Organization**: Clear separation of concerns across layers
- **Enhanced Theming**: Robust dark/light/high-contrast theme system
- **Improved Performance**: Strategic layer ordering for optimal CSS cascade
- **Developer Experience**: Debug utilities and maintainable structure
- **Accessibility First**: Built-in reduced motion and high contrast support
- **Future-Proof**: Scalable architecture for continued growth

### 🛠️ **Technical Features**

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

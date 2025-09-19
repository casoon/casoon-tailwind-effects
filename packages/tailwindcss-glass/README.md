# ✨ @casoon/tailwindcss-glass

> Complete glass-morphism effects library for Tailwind CSS v4

[![NPM Version](https://img.shields.io/npm/v/@casoon/tailwindcss-glass)](https://www.npmjs.com/package/@casoon/tailwindcss-glass)
[![License](https://img.shields.io/npm/l/@casoon/tailwindcss-glass)](./LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@casoon/tailwindcss-glass)](https://bundlephobia.com/package/@casoon/tailwindcss-glass)

A comprehensive glass-morphism effects library for Tailwind CSS v4 with modern backdrop-filter support, intelligent fallbacks, and responsive design patterns.

## ✨ Features

- 🎨 **Complete Glass System** - Backdrop filters, borders, shadows, and gradients
- 🔍 **Multiple Blur Levels** - From subtle to intense glass effects
- 🎭 **Smart Fallbacks** - Graceful degradation for unsupported browsers
- 🌈 **Color Variants** - Light, dark, and colored glass effects
- 📱 **Responsive Design** - Optimized for mobile and desktop
- 🎯 **Component-Ready** - Cards, navigation, modals, and panels
- ⚡ **Performance Optimized** - Efficient CSS with modern features
- ♿ **Accessibility Focused** - High contrast and reduced transparency modes

## 🚀 Quick Start

### Installation

```bash
npm install @casoon/tailwindcss-glass
# or
pnpm add @casoon/tailwindcss-glass
```

### Usage with Tailwind CSS v4

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-glass";
```

### Legacy Usage (without Tailwind)

For projects not using Tailwind CSS v4, use the pre-compiled CSS:

```html
<link rel="stylesheet" href="node_modules/@casoon/tailwindcss-glass/dist.min.css">
```

### Basic Example

```html
<!-- Simple glass card -->
<div class="cs-glass p-6 rounded-xl">
  <h3>Glass Card</h3>
  <p>Beautiful frosted glass effect</p>
</div>

<!-- Glass navigation -->
<nav class="cs-glass-nav">
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</nav>
```

## 📖 API Reference

### 🔍 Basic Glass Effects

Core glass-morphism utilities with different intensity levels:

| Class | Blur Level | Opacity | Use Case |
|-------|-----------|---------|----------|
| `cs-glass` | 16px | Medium | General cards, panels |
| `cs-glass-light` | 8px | Light | Subtle overlays |
| `cs-glass-blur` | 24px | Strong | Hero sections, modals |
| `cs-glass-dark` | 16px | Dark theme | Dark mode interfaces |

```html
<!-- Different glass intensities -->
<div class="cs-glass-light">Subtle glass effect</div>
<div class="cs-glass">Standard glass effect</div>
<div class="cs-glass-blur">Strong glass effect</div>
```

### 📏 Glass Size Variants

Control the intensity and size of glass effects:

```html
<!-- Size variants -->
<div class="cs-glass-sm">Small glass effect</div>
<div class="cs-glass-md">Medium glass effect</div>
<div class="cs-glass-lg">Large glass effect</div>
<div class="cs-glass-xl">Extra large glass effect</div>
```

### 🎨 Colored Glass Effects

Tinted glass effects for branded interfaces:

```html
<!-- Colored glass variants -->
<div class="cs-glass-blue">Blue tinted glass</div>
<div class="cs-glass-purple">Purple tinted glass</div>
<div class="cs-glass-green">Green tinted glass</div>
<div class="cs-glass-pink">Pink tinted glass</div>
<div class="cs-glass-amber">Amber tinted glass</div>
```

### 🏗️ Component Classes

Ready-to-use glass components for common UI patterns:

#### Glass Cards

```html
<!-- Basic glass card -->
<div class="cs-glass-card">
  <h3>Card Title</h3>
  <p>Card content with beautiful glass effect.</p>
  <button>Action</button>
</div>

<!-- Light variant card -->
<div class="cs-glass-card-light">
  <h3>Light Glass Card</h3>
  <p>Subtle glass effect for elegant interfaces.</p>
</div>
```

#### Glass Navigation

```html
<!-- Glass navigation bar -->
<nav class="cs-glass-nav">
  <div class="nav-brand">
    <img src="logo.png" alt="Logo">
  </div>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- Light navigation variant -->
<nav class="cs-glass-nav-light">
  <!-- Navigation content -->
</nav>

<!-- Dark navigation variant -->
<nav class="cs-glass-nav-dark">
  <!-- Navigation content -->
</nav>
```

#### Glass Modals & Overlays

```html
<!-- Glass modal backdrop -->
<div class="cs-glass-backdrop">
  <div class="cs-glass-modal">
    <h2>Modal Title</h2>
    <p>Modal content with glass effect.</p>
    <div class="modal-actions">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>

<!-- Glass panel/sidebar -->
<aside class="cs-glass-panel">
  <h3>Sidebar Title</h3>
  <nav>
    <a href="#item1">Menu Item 1</a>
    <a href="#item2">Menu Item 2</a>
    <a href="#item3">Menu Item 3</a>
  </nav>
</aside>
```

## 🎨 Design Tokens

The library uses CSS custom properties for easy theming:

```css
:root {
  /* Glass background colors */
  --cs-glass-white: #ffffff;
  --cs-glass-black: #000000;
  --cs-glass-blue: #3b82f6;
  --cs-glass-purple: #9333ea;
  --cs-glass-green: #22c55e;
  --cs-glass-pink: #ec4899;
  --cs-glass-amber: #f59e0b;

  /* Glass opacity levels */
  --cs-glass-bg-light: hsla(0, 0%, 100%, 0.1);
  --cs-glass-bg-medium: hsla(0, 0%, 100%, 0.15);
  --cs-glass-bg-strong: hsla(0, 0%, 100%, 0.2);

  /* Glass borders */
  --cs-glass-border-light: hsla(0, 0%, 100%, 0.1);
  --cs-glass-border-medium: hsla(0, 0%, 100%, 0.2);
  --cs-glass-border-strong: hsla(0, 0%, 100%, 0.3);

  /* Glass shadows */
  --cs-glass-shadow-light: rgba(0, 0, 0, 0.05);
  --cs-glass-shadow-medium: rgba(0, 0, 0, 0.1);
  --cs-glass-shadow-strong: rgba(0, 0, 0, 0.15);

  /* Glass blur levels */
  --cs-glass-blur-sm: blur(8px);
  --cs-glass-blur: blur(16px);
  --cs-glass-blur-lg: blur(24px);
  --cs-glass-blur-xl: blur(32px);
}
```

## 🎯 Real-World Examples

### Landing Page Hero

```html
<section class="relative min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
  <!-- Background image -->
  <img src="hero-bg.jpg" alt="Background" class="absolute inset-0 w-full h-full object-cover">
  
  <!-- Glass overlay content -->
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="cs-glass-card text-center text-white p-8 max-w-2xl mx-4">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Welcome to the Future
      </h1>
      <p class="text-xl mb-8 text-gray-100">
        Experience the next generation of web design with beautiful glass morphism effects.
      </p>
      <div class="space-x-4">
        <button class="cs-glass-light px-8 py-3 rounded-full font-semibold hover:cs-glass-blur transition-all">
          Get Started
        </button>
        <button class="cs-glass px-8 py-3 rounded-full font-semibold hover:cs-glass-blur transition-all">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>
```

### Dashboard Interface

```html
<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
  <!-- Glass navigation -->
  <nav class="cs-glass-nav">
    <div class="nav-brand">
      <h1 class="text-xl font-bold">Dashboard</h1>
    </div>
    <div class="nav-links">
      <a href="#overview">Overview</a>
      <a href="#analytics">Analytics</a>
      <a href="#settings">Settings</a>
    </div>
  </nav>

  <div class="container mx-auto p-6">
    <!-- Glass card grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Revenue card -->
      <div class="cs-glass-card">
        <h3 class="text-lg font-semibold mb-2">Revenue</h3>
        <p class="text-3xl font-bold text-green-400">$24,500</p>
        <p class="text-sm text-gray-400">+12% from last month</p>
      </div>

      <!-- Users card -->
      <div class="cs-glass-card">
        <h3 class="text-lg font-semibold mb-2">Active Users</h3>
        <p class="text-3xl font-bold text-blue-400">1,234</p>
        <p class="text-sm text-gray-400">+5% from last month</p>
      </div>

      <!-- Orders card -->
      <div class="cs-glass-card">
        <h3 class="text-lg font-semibold mb-2">Orders</h3>
        <p class="text-3xl font-bold text-purple-400">856</p>
        <p class="text-sm text-gray-400">+8% from last month</p>
      </div>
    </div>

    <!-- Glass chart panel -->
    <div class="cs-glass-panel mt-8 p-6">
      <h2 class="text-xl font-semibold mb-4">Analytics Overview</h2>
      <!-- Chart content would go here -->
      <div class="h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
        <p class="text-gray-400">Chart Placeholder</p>
      </div>
    </div>
  </div>
</div>
```

### Mobile App Interface

```html
<div class="max-w-sm mx-auto bg-gradient-to-b from-indigo-500 to-purple-600 min-h-screen">
  <!-- Status bar -->
  <div class="cs-glass-light px-4 py-2">
    <div class="flex justify-between items-center text-white text-sm">
      <span>9:41 AM</span>
      <span>100%</span>
    </div>
  </div>

  <!-- App content -->
  <div class="p-4 space-y-4">
    <!-- Profile card -->
    <div class="cs-glass-card text-center">
      <img src="avatar.jpg" alt="Profile" class="w-20 h-20 rounded-full mx-auto mb-4">
      <h2 class="text-xl font-semibold text-white">John Doe</h2>
      <p class="text-gray-200">Software Developer</p>
    </div>

    <!-- Quick actions -->
    <div class="grid grid-cols-2 gap-4">
      <button class="cs-glass-light p-4 rounded-xl text-center text-white">
        <div class="text-2xl mb-2">📊</div>
        <span>Analytics</span>
      </button>
      <button class="cs-glass-light p-4 rounded-xl text-center text-white">
        <div class="text-2xl mb-2">⚙️</div>
        <span>Settings</span>
      </button>
    </div>

    <!-- Recent activity -->
    <div class="cs-glass-card">
      <h3 class="font-semibold mb-3 text-white">Recent Activity</h3>
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <div class="w-2 h-2 bg-green-400 rounded-full"></div>
          <span class="text-gray-200 text-sm">Completed project review</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span class="text-gray-200 text-sm">Updated profile settings</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span class="text-gray-200 text-sm">Joined team meeting</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 🎨 Customization

### Custom Glass Colors

Create your own glass color variants:

```css
:root {
  --cs-glass-brand: #7c3aed;
  --cs-glass-accent: #06b6d4;
}

@utility cs-glass-brand {
  background: color-mix(in srgb, var(--cs-glass-brand) 10%, transparent);
  backdrop-filter: var(--cs-glass-blur);
  border: 1px solid color-mix(in srgb, var(--cs-glass-brand) 20%, transparent);
  box-shadow: 0 8px 32px color-mix(in srgb, var(--cs-glass-brand) 15%, transparent);
}
```

### Responsive Glass Effects

Different glass effects for different screen sizes:

```css
/* Mobile-first approach */
.responsive-glass {
  @apply cs-glass-light;
}

@media (min-width: 768px) {
  .responsive-glass {
    @apply cs-glass-blur;
  }
}

@media (min-width: 1024px) {
  .responsive-glass {
    @apply cs-glass-xl;
  }
}
```

## 📊 Performance & Compatibility

### Browser Support

- ✅ **Modern Browsers** - Full backdrop-filter support
- ✅ **Safari 14+** - Complete glass effects
- ✅ **Chrome 76+** - Full feature support
- ✅ **Firefox 103+** - Complete compatibility
- ⚠️ **IE/Legacy** - Graceful fallbacks to solid backgrounds

### Performance Tips

1. **Use backdrop-filter sparingly** - Can be expensive on low-end devices
2. **Combine with will-change** - Optimize for animation performance
3. **Test on mobile** - Glass effects can impact battery life
4. **Progressive enhancement** - Fallbacks ensure universal compatibility

## ♿ Accessibility

### High Contrast Mode Support

Glass effects automatically adjust for users with high contrast preferences:

```css
@media (prefers-contrast: high) {
  .cs-glass,
  .cs-glass-card {
    backdrop-filter: none;
    background: var(--cs-surface);
    border: 2px solid var(--cs-text);
  }
}
```

### Reduced Transparency

Respects user preferences for reduced transparency:

```css
@media (prefers-reduced-transparency: reduce) {
  .cs-glass,
  .cs-glass-card {
    backdrop-filter: none;
    background: var(--cs-surface);
    opacity: 1;
  }
}
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ by [Casoon](https://github.com/casoon)**

[📚 View all packages](https://github.com/casoon/tailwindcss-effects) • [🐛 Report Bug](https://github.com/casoon/tailwindcss-effects/issues) • [✨ Request Feature](https://github.com/casoon/tailwindcss-effects/issues)
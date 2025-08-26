# Casoon Effects – Pure CSS Monorepo for Tailwind CSS v4

A collection of **CSS-first** libraries that provide beautiful visual effects and components for Tailwind CSS v4. No JavaScript plugins required, no `@apply` directives – just pure, performant CSS that works seamlessly with your Tailwind workflow.

## ✨ Features

- **Pure CSS**: No JavaScript dependencies or plugins required
- **Tailwind v4 Ready**: Built specifically for Tailwind CSS v4 with `@theme` support
- **Modular**: Import only what you need or use the meta package
- **Performance**: Lightweight and optimized CSS utilities
- **Modern**: Glassmorphism, gradients, scroll animations, layout utilities, navigation components, and animations
- **Production Ready**: Comprehensive utility classes for real-world applications
- **Self-Contained**: Each package includes its own design tokens and CSS variables

## 📦 Packages

| Package | Description | Size |
|---------|-------------|------|
| [`@casoon/tailwindcss-animations`](./packages/tailwindcss-animations) | Animation utilities & keyframes | ~3KB |
| [`@casoon/tailwindcss-glass`](./packages/tailwindcss-glass) | Glassmorphism components & utilities | ~16KB |
| [`@casoon/tailwindcss-orbs`](./packages/tailwindcss-orbs) | Orb backgrounds & helper utilities | ~8KB |
| [`@casoon/tailwindcss-gradients`](./packages/tailwindcss-gradients) | Gradient backgrounds & text effects | ~6KB |
| [`@casoon/tailwindcss-scroll`](./packages/tailwindcss-scroll) | Scroll animation primitives | ~4KB |
| [`@casoon/tailwindcss-utilities`](./packages/tailwindcss-utilities) | Layout utilities, cards, text effects & responsive helpers | ~8KB |
| [`@casoon/tailwindcss-navigation`](./packages/tailwindcss-navigation) | Navigation components, variants & subnav systems | ~12KB |
| [`@casoon/tailwindcss-effects`](./packages/tailwindcss-effects) | Meta package that imports all effects | ~60KB |

## 🚀 Quick Start

### Option 1: All-in-One (Recommended)
Import the meta package to get all effects at once:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/index.css";
```

### Option 2: Granular Imports
Import only the packages you need:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-animations/index.css";
@import "@casoon/tailwindcss-glass/index.css";
@import "@casoon/tailwindcss-orbs/index.css";
@import "@casoon/tailwindcss-gradients/index.css";
@import "@casoon/tailwindcss-scroll/index.css";
@import "@casoon/tailwindcss-utilities/index.css";
@import "@casoon/tailwindcss-navigation/index.css";
```

## 📋 Requirements

- Tailwind CSS v4+
- Modern browser support (CSS custom properties, CSS Grid, Flexbox)

## 🔧 Installation

```bash
npm install @casoon/tailwindcss-effects
# or
yarn add @casoon/tailwindcss-effects
# or
pnpm add @casoon/tailwindcss-effects
```

## 💡 Usage Examples

### Glassmorphism
```html
<div class="glass bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6">
  <h2 class="text-2xl font-bold text-white">Glass Card</h2>
  <p class="text-white/80">Beautiful glassmorphism effect</p>
</div>
```

### Orb Backgrounds
```html
<div class="orb-bg orb-bg-blue-500/20 orb-size-lg">
  <div class="p-8 text-center">
    <h1 class="text-4xl font-bold">Orb Background</h1>
  </div>
</div>
```

### Gradient Text
```html
<h1 class="gradient-text gradient-text-sunset text-6xl font-bold">
  Beautiful Gradient Text
</h1>
```

### Scroll Animations
```html
<div class="s s-in s-delay-200">
  <p>This content animates in on scroll</p>
</div>
```

### Layout Utilities
```html
<div class="util-container">
  <section class="util-section">
    <div class="util-hero">
      <h1 class="util-text-accent-gradient-enhanced text-6xl font-bold">Hero Section</h1>
    </div>
  </section>
</div>
```

### Navigation Components
```html
<nav class="nav nav--horizontal nav--underline nav-surface">
  <a href="#" class="nav-link" aria-current="page">Home</a>
  <a href="#" class="nav-link">About</a>
  <a href="#" class="nav-link nav-link--primary">Get Started</a>
</nav>
```

## 🎨 Available Utilities

### Animations (`@casoon/tailwindcss-animations`)
- Animation utilities and keyframes for Tailwind CSS v4
- Custom animation classes and transitions
- Performance-optimized CSS animations

### Glassmorphism (`@casoon/tailwindcss-glass`)
- `.glass` - Base glassmorphism component
- `.glass-sm`, `.glass-md`, `.glass-lg` - Size variants
- `.glass-border` - Border variants
- `.glass-shadow` - Shadow variants

### Orbs (`@casoon/tailwindcss-orbs`)
- `.orb-bg` - Orb background container
- `.orb-size-*` - Size variants (sm, md, lg, xl)
- `.orb-color-*` - Color variants with opacity support

### Gradients (`@casoon/tailwindcss-gradients`)
- `.gradient-bg` - Background gradient variants
- `.gradient-text` - Text gradient variants
- `.gradient-accent-text` - Enhanced accent text gradients
- `.gradient-bg-animated` - Animated background gradients

### Scroll Animations (`@casoon/tailwindcss-scroll`)
- `.s` - Scroll animation base class
- `.s-in` - Animation trigger
- `.s-delay-*` - Delay variants
- `.s-speed-*` - Speed variants

### Utilities (`@casoon/tailwindcss-utilities`)
- **Layout**: `.util-container`, `.util-section`, `.util-hero`, `.util-grid-cards`
- **Text**: `.util-text-primary`, `.util-text-accent-gradient`, `.util-text-accent-gradient-enhanced`
- **Cards**: `.util-card`, `.util-card-hover-lift`, `.util-card-pad`
- **Transitions**: `.util-content-transition`, `.util-hero-overlay-top`, `.util-page-transition`
- **Responsive**: Mobile-first responsive helpers and grid systems

### Navigation (`@casoon/tailwindcss-navigation`)
- **Core**: `.nav`, `.nav-link`, `.nav-item` with flexible orientation
- **Variants**: `.nav--underline`, `.nav--tabs`, `.nav--pills`, `.nav--ghost`
- **Density**: `.nav--compact`, `.nav--roomy` for different spacing needs
- **Special**: `.nav-link--primary` CTA button with enhanced hover effects
- **Advanced**: Subnav panels, flyout menus, and responsive navigation patterns

## 🎯 Key Features

### CSS-First Approach
- **No JavaScript dependencies** - Pure CSS solutions that work immediately
- **Tailwind v4 optimized** - Built specifically for the latest Tailwind CSS version
- **CSS Custom Properties** - Each package includes its own design tokens
- **Performance focused** - Lightweight and optimized for production use

### Modular Architecture
- **Granular imports** - Import only what you need to keep bundle size minimal
- **Self-contained packages** - Each package includes its own tokens and CSS variables
- **Consistent API** - Unified design patterns across all packages
- **Extensible** - Easy to customize and extend with package-specific CSS variables
- **No global dependencies** - Each package works independently

## 🏗️ Development

This is a monorepo managed with pnpm workspaces.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Release packages
pnpm release
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

For detailed documentation on each package, see the individual README files in each package directory.

---

**Made with ❤️ by the Casoon team**



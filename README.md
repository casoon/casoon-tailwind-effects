# Casoon Effects – Pure CSS Monorepo for Tailwind CSS v4

A collection of **CSS-first** libraries that provide beautiful visual effects and components for Tailwind CSS v4. No JavaScript plugins required, no `@apply` directives – just pure, performant CSS that works seamlessly with your Tailwind workflow.

## ✨ Features

- **Pure CSS**: No JavaScript dependencies or plugins required
- **Tailwind v4 Ready**: Built specifically for Tailwind CSS v4 with `@theme` support
- **Modular**: Import only what you need or use the meta package
- **Performance**: Lightweight and optimized CSS utilities
- **Modern**: Glassmorphism, gradients, scroll animations, and more

## 📦 Packages

| Package | Description | Size |
|---------|-------------|------|
| [`@casoon/tokens`](./packages/tokens) | Shared `@theme` tokens, variables & keyframes | ~2KB |
| [`@casoon/tailwindcss-glass`](./packages/tailwindcss-glass) | Glassmorphism components & utilities | ~5KB |
| [`@casoon/tailwindcss-orbs`](./packages/tailwindcss-orbs) | Orb backgrounds & helper utilities | ~8KB |
| [`@casoon/tailwindcss-gradients`](./packages/tailwindcss-gradients) | Gradient backgrounds & text effects | ~6KB |
| [`@casoon/tailwindcss-scroll`](./packages/tailwindcss-scroll) | Scroll animation primitives | ~4KB |
| [`@casoon/tailwindcss-effects`](./packages/tailwindcss-effects) | Meta package that imports all effects | ~25KB |

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
@import "@casoon/tokens/index.css";
@import "@casoon/tailwindcss-glass/index.css";
@import "@casoon/tailwindcss-orbs/index.css";
@import "@casoon/tailwindcss-gradients/index.css";
@import "@casoon/tailwindcss-scroll/index.css";
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
<div class="sa sa-in sa-delay-200">
  <p>This content animates in on scroll</p>
</div>
```

## 🎨 Available Utilities

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
- `.gradient-bg-*` - Background gradient variants
- `.gradient-text-*` - Text gradient variants
- `.gradient-border-*` - Border gradient variants

### Scroll Animations (`@casoon/tailwindcss-scroll`)
- `.sa` - Scroll animation base class
- `.sa-in` - Animation trigger
- `.sa-delay-*` - Delay variants
- `.sa-speed-*` - Speed variants

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



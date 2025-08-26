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
<div class="scroll scroll-in scroll-delay-200 scroll-fade-up">
  <p>This content animates in on scroll</p>
  <!-- Optional: stagger for children -->
  <div class="scroll-stagger">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</div>
```

### Layout Utilities
```html
<div class="cs-container">
  <section class="cs-section">
    <div class="cs-hero">
      <h1 class="cs-text-primary text-6xl font-bold">Hero Section</h1>
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
- `.gradient-bg`, `.gradient-bg-linear`, `.gradient-bg-radial`, `.gradient-bg-conic`
- `.gradient-bg-animated` - animated brand gradient
- `.gradient-text`, `.gradient-accent-text` - text gradients
- `.gradient-overlay`, `.gradient-interactive`, `.gradient-focusable`
- `.gradient-border`, `.gradient-ring` - gradient borders/rings
- Presets: `.gradient-accent`, `.gradient-primary`, `.gradient-success`, `.gradient-warning`, `.gradient-neutral`

### Scroll Animations (`@casoon/tailwindcss-scroll`)
- `.scroll` - base (hidden until in-view)
- `.scroll-in` - activate animation
- Effect aliases: `.scroll-fade*`, `.scroll-slide-*`, `.scroll-zoom-*`, `.scroll-rotate-in`, `.scroll-reveal-3d-*`, `.scroll-blur-in`
- Timing: `.scroll-delay-*`, `.scroll-fast|normal|slow`, `.scroll-loop`
- Helpers: `.scroll-stagger`, `.scroll-parallax`

### Utilities (`@casoon/tailwindcss-utilities`)
- **Page/Surface**: `.cs-page`, `.cs-surface`, `.cs-surface-elevated`
- **Layout**: `.cs-container`, `.cs-section`, `.cs-stack(-sm|-lg)`, `.cs-cluster`, `.cs-grid-cards`, `.cs-grid-sidebar`, `.cs-grid-12`, `.cs-col-span`
- **Hero**: `.cs-hero`
- **Cards**: `.cs-card`, `.cs-card-hover-lift`, `.cs-card-pad`, `.cs-card-pad-lg`, `.cs-card-inset`
- **Typography**: `.cs-text-primary`, `.cs-text-secondary`, `.cs-text-muted`, `.cs-text-balance`, `.cs-text-pretty`, `.cs-text-truncate`, `.cs-text-2lines`, `.cs-hyphens-auto`
- **Media/Aspect**: `.cs-aspect`, `.cs-aspect-square`, `.cs-media-fit-cover`, `.cs-media-fit-contain`, `.cs-media-rounded`
- **Forms/Buttons**: `.cs-input`, `.cs-btn`, `.cs-field`, `.cs-field-inline`
- **A11y/Focus**: `.cs-focus-ring`, `.cs-visually-hidden`, `.cs-kbd`
- **Helpers**: `.cs-safe-pi`, `.cs-safe-pb`, `.cs-safe-pt`, `.cs-center`, `.cs-max-w-prose`

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

This is a monorepo managed with pnpm workspaces and unified versioning.

### 📦 Version Management

All packages use the same version number for consistency. To update versions:

```bash
# Check current versions
npm run version:check

# Update all packages to next patch version (0.2.0 → 0.2.1)
npm run version:patch

# Update all packages to next minor version (0.2.0 → 0.3.0)
npm run version:minor

# Update all packages to next major version (0.2.0 → 1.0.0)
npm run version:major
```

**Note:** These commands automatically update both the root `package.json` and all package versions simultaneously.

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



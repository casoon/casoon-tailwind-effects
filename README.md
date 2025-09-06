# @casoon/tailwindcss-effects

A comprehensive collection of modern CSS effects and utilities for **Tailwind CSS v4**. Built with performance in mind, these plugins provide glassmorphism effects, animations, gradients, scroll animations, and essential utility classes—all optimized for modern build tools and framework compatibility.

> **🚀 Latest (v0.5.6)**: Complete pure Tailwind CSS v4 plugins with **configurable design tokens**, **JavaScript helpers**, **automated class testing**, and modern ESM architecture!

## ✨ Features

- **🔌 Pure Plugin Architecture**: Modern Tailwind CSS v4 plugins with ESM-first design
- **🎨 Configurable Design Tokens**: Override default values through plugin configuration  
- **📦 Framework Compatible**: Works seamlessly with Vite, Astro, Next.js, and other modern build tools
- **⚡ Performance Optimized**: Tree-shakeable with minimal bundle impact
- **🎯 Complete Toolkit**: Animations, glassmorphism, gradients, scroll effects, navigation, and utilities
- **📜 JavaScript Helpers**: Optional JS modules for scroll animations and navigation interactions
- **🚀 Zero Configuration**: Works out of the box, customize only what you need
- **🧪 Automated Testing**: Global class compatibility testing prevents breaking changes
- **♠ Accessibility First**: Motion-safe variants and proper focus management
- **🌗 Dark Mode Ready**: Built-in dark mode support with CSS custom properties

## 📦 Packages

| Package | Description | Features |
|---------|-------------|----------|
| [`@casoon/tailwindcss-animations`](./packages/tailwindcss-animations) | Animation utilities & keyframes | ✅ Plugin + Token Config |
| [`@casoon/tailwindcss-glass`](./packages/tailwindcss-glass) | Glassmorphism components & utilities | ✅ Plugin + Token Config |
| [`@casoon/tailwindcss-orbs`](./packages/tailwindcss-orbs) | Orb backgrounds & helper utilities | ✅ Plugin + Keyframes |
| [`@casoon/tailwindcss-gradients`](./packages/tailwindcss-gradients) | Gradient backgrounds & text effects | ✅ Plugin + Animations |
| [`@casoon/tailwindcss-scroll`](./packages/tailwindcss-scroll) | Scroll animation primitives | ✅ Plugin + **JS Helper** |
| [`@casoon/tailwindcss-utilities`](./packages/tailwindcss-utilities) | Layout utilities, cards, text effects & responsive helpers | ✅ Plugin Only |
| [`@casoon/tailwindcss-navigation`](./packages/tailwindcss-navigation) | Navigation components, variants & subnav systems | ✅ Plugin + **JS Helper** |
| [`@casoon/tailwindcss-effects`](./packages/tailwindcss-effects) | Meta package (standalone, no dependencies) | ✅ Plugin Bundle |
| [`@casoon/tailwindcss-loading`](./packages/tailwindcss-loading) | Skeletons, progress indicators, and loading overlays | ✅ Plugin + Keyframes |
| [`@casoon/tailwindcss-micro-interactions`](./packages/tailwindcss-micro-interactions) | Click/Hover/Focus micro‑interaction utilities | ✅ Plugin + Transitions |

> **All packages v0.5.6** • Configurable design tokens • Pure plugin architecture • Automated class testing

## 🚀 Quick Start

### Plugin Installation 🔌

**All Effects (Bundle)**
```js
// tailwind.config.js
import effects from '@casoon/tailwindcss-effects';

export default {
  plugins: [effects()]
}
```

**Individual Plugins (Granular Control)**
```js
// tailwind.config.js
import animations from '@casoon/tailwindcss-animations';
import glass from '@casoon/tailwindcss-glass';
import utilities from '@casoon/tailwindcss-utilities';

export default {
  plugins: [
    utilities(),
    animations(),
    glass()
  ]
}
```

**With Token Customization** ⭐ *New in v0.5.1*
```js
// tailwind.config.js
import animations from '@casoon/tailwindcss-animations';

export default {
  plugins: [
    animations({
      tokens: {
        durations: {
          md: '400ms'  // Override default 300ms
        },
        easing: {
          standard: 'ease-out'  // Simpler easing
        }
      }
    })
  ]
}
```

## 🛠️ Framework Compatibility

| Framework | Plugin Support | Status |
|-----------|----------------|--------|
| **Vite** | ✅ ESM | Full support |
| **Next.js** | ✅ ESM | Full support |
| **Astro** | ✅ ESM | Full support |
| **SvelteKit** | ✅ ESM | Full support |
| **Nuxt** | ✅ ESM | Full support |
| **Remix** | ✅ ESM | Full support |
| **Webpack** | ✅ ESM | Full support |

### Framework Examples

<details>
<summary><strong>Vite + Tailwind CSS</strong></summary>

```js
// tailwind.config.js
import effects from '@casoon/tailwindcss-effects';

export default {
  content: ['./src/**/*.{html,js,svelte,ts,vue}'],
  plugins: [effects()]
}
```
</details>

<details>
<summary><strong>Next.js</strong></summary>

```js
// tailwind.config.js
import effects from '@casoon/tailwindcss-effects';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [effects()],
}
```
</details>

<details>
<summary><strong>Astro</strong></summary>

```js
// tailwind.config.mjs
import effects from '@casoon/tailwindcss-effects';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [effects()]
}
```
</details>

<details>
<summary><strong>SvelteKit</strong></summary>

```js
// tailwind.config.js
import effects from '@casoon/tailwindcss-effects';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [effects()]
}
```
</details>

## 📋 Requirements

- **Tailwind CSS v4.0+**
- **Node.js 16+** (for plugin usage)
- **Modern browser support**: CSS custom properties, CSS Grid, Flexbox
- **Build tool**: Vite, Webpack, or compatible bundler

## 🔧 Installation

```bash
npm install @casoon/tailwindcss-effects
# or
yarn add @casoon/tailwindcss-effects
# or
pnpm add @casoon/tailwindcss-effects
```

## 🎨 Token Customization ⭐ *v0.5.1*

All plugins support **configurable design tokens**. Override default values without writing custom CSS:

```js
// Customize animation durations and easing
import animations from '@casoon/tailwindcss-animations';

export default {
  plugins: [
    animations({
      tokens: {
        durations: { md: '400ms', lg: '800ms' },
        easing: { standard: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
        colors: { shadowInk: '#333' }
      }
    })
  ]
}
```

**Available token categories:**
- `tokens.durations` - Animation and transition durations
- `tokens.easing` - Timing functions and easing curves  
- `tokens.colors` - Theme colors and shadow tints
- `tokens.spacing` - Layout spacing and sizing values
- `tokens.effects` - Effect-specific parameters

> 📝 Full token reference available in our documentation

## 📜 JavaScript Helpers ⭐ *Optional*

Some packages include optional JavaScript modules for enhanced functionality:

### Scroll Animations
```js
// Import the scroll reveal helper (AOS-compatible)
import '@casoon/tailwindcss-scroll/scroll.js';

// Or import programmatically
import { ScrollRevealX } from '@casoon/tailwindcss-scroll/js';
ScrollRevealX.init({ threshold: 0.2 });
```

```html
<!-- Use with CSS classes -->
<div class="scroll scroll-fade-up" data-scroll-delay="100">
  Reveals on scroll with fade-up animation
</div>

<!-- AOS-compatible syntax -->
<div data-aos="fade-up" data-aos-duration="800">
  AOS-style animation (auto-converted)
</div>
```

### Navigation Helpers
```js
// Import navigation utilities
import { initSidebarDrawer, initActiveLinkSync } from '@casoon/tailwindcss-navigation/js';

// Initialize sidebar with focus management
const sidebar = initSidebarDrawer({
  trigger: document.querySelector('[data-sidebar-open]'),
  drawer: document.querySelector('.sidebar')
});

// Auto-sync active navigation links
const linkSync = initActiveLinkSync({
  selector: '.nav-link[href^="#"]'
});
```

## 💡 Usage Examples

### Animations with Custom Timing
```html
<!-- Use default timing -->
<div class="anim fade-in scale-in anim-md ease-standard">
  Default fade + scale animation
</div>

<!-- Override timing with tokens -->
<div class="anim fade-in slide-up anim-lg ease-spring">
  Slower animation with spring easing
</div>
```

### Glassmorphism Effects
```html
<div class="glass bg-white/10 p-6 rounded-xl">
  <h2 class="text-2xl font-bold text-white">Glass Card</h2>
  <p class="text-white/80">Beautiful glassmorphism effect</p>
</div>

<!-- Different glass variants -->
<div class="glass-dark glass-lg p-4">
  Dark glass with stronger blur
</div>
```

### Orb Effects with Animations
```html
<!-- Animated floating orbs -->
<div class="orb orb-lg orb-float orb-gradient-blue absolute top-10 left-10">
</div>
<div class="orb orb-md orb-pulse orb-gradient-purple absolute bottom-20 right-20">
</div>

<!-- Custom orb with background -->
<div class="orb orb-xl orb-drift bg-gradient-to-r from-blue-400 to-purple-500">
</div>
```

### Gradient Text & Backgrounds
```html
<!-- Gradient text -->
<h1 class="gradient-text-sunset text-6xl font-bold">
  Beautiful Gradient Text
</h1>

<!-- Animated gradient background -->
<div class="gradient-ocean gradient-animate p-8 rounded-xl">
  <p class="text-white">Animated gradient background</p>
</div>

<!-- Gradient borders -->
<div class="gradient-border p-4">
  Card with gradient border
</div>
```

### Scroll Effects & Utilities
```html
<!-- Scroll reveal animations (requires JS helper) -->
<div class="scroll scroll-fade-up" data-scroll-delay="200">
  <p>This content animates in on scroll</p>
</div>

<!-- Scroll behavior utilities -->
<div class="scroll-smooth scroll-snap-y h-screen overflow-y-auto">
  <section class="snap-center h-screen">Section 1</section>
  <section class="snap-center h-screen">Section 2</section>
</div>

<!-- Custom scrollbar -->
<div class="scrollbar-thin scrollbar-thumb-blue overflow-auto h-64">
  <p>Content with styled scrollbar</p>
</div>
```

### Navigation Components
```html
<!-- Navigation with styling -->
<nav class="nav">
  <div class="nav-item">
    <a href="#" class="nav-link active">Home</a>
  </div>
  <div class="nav-item">
    <a href="#" class="nav-link">About</a>
  </div>
</nav>

<!-- Pills style navigation -->
<ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
</ul>
```

### Loading & Micro-Interactions
```html
<!-- Loading spinner -->
<div class="spinner"></div>
<div class="loading opacity-50">Content in loading state</div>

<!-- Interactive elements -->
<button class="interactive hover-scale-105 focus-ring-2 p-3 bg-blue-500 text-white rounded">
  Interactive Button
</button>

<div class="hover-lift-md hover-rotate-1 p-4 bg-white rounded-lg shadow">
  Card with hover effects
</div>
```
<div class="progress progress-striped progress-animated mt-4" style="--progress: 60%">
  <div class="progress-fill"></div>
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

### Glass Glow
```html
<div class="glass glass-glow p-6">
  <h3 class="text-white font-semibold">Glowing Glass</h3>
</div>
```

## 🎨 Available Utilities

### Animations (`@casoon/tailwindcss-animations`)
- Core keyframes and timing/easing utilities
- Hover utilities: `hover-lift-*`, `hover-scale-*`, `hover-rotate-*`, `hover-skew-*`, `hover-blur-*`, `hover-brightness-*`
- Timing helpers: `transition-*`, `delay-700`, `stagger-1..5`, `ease-*`
- Extra effects: `morph-*`, `wave-*`, `shake-*`, `pulse-{slow,fast,bounce}`

### Glassmorphism (`@casoon/tailwindcss-glass`)
- Variants: `.glass-frosted`, `.glass-clear`, `.glass-smoke`, `.glass-mirror`
- Interactions: `.glass-hover`, `.glass-focus`, `.glass-active`
- Backdrop filters: `.backdrop-blur-(sm|md|lg)`
- Sizing & shape: `.glass-(xs|sm|md|lg|xl)`, `.glass-(rounded|pill|hexagon)`
- Overlays: `.glass-(overlay|mask|clip)`, glow: `.glass-(glow|border-glow|shadow)`

### Orbs (`@casoon/tailwindcss-orbs`)
- Animations: `.orb-(float|pulse|rotate|bounce)`
- Patterns & shapes: `.orb-(stripes|dots|waves)`, `.orb-(oval|hexagon|star)`
- Interactions & UX: `.orb-(hover|focus|active)`, `.orb-transition-(fast|slow)`
- Responsive sizes: `.orb-responsive-(sm|md|lg)`

### Gradients (`@casoon/tailwindcss-gradients`)
- Backgrounds: `.gradient-bg(-linear|-radial|-conic)`, `.gradient-bg-animated`
- Helpers: `.gradient-(rotate|pulse|hover|focus|active)`
- Masks & overlays: `.gradient-mask-(radial|conic)`, `.gradient-overlay-(light|dark)`
- Patterns & text: `.gradient-(stripes|dots|grid)`, `.gradient-text(-3d|-shadow)`
- Presets: `.gradient-(accent|primary|success|warning|neutral)`

### Scroll Animations (`@casoon/tailwindcss-scroll`)
- Effects: `.scroll-fade*`, `.scroll-slide-*`, `.scroll-zoom-*`, `.scroll-rotate-in`, `.scroll-reveal-3d-*`, `.scroll-blur-in`
- Timing/loop: `.scroll-delay-*`, `.scroll-(fast|normal|slow)`, `.scroll-loop{,-reverse,-alternate}`
- Triggers: `.scroll-trigger-(top|center|bottom)` influence IO threshold
- Helpers: `.scroll-stagger{,-2,-3,-4}`, `.scroll-parallax{,-slow,-fast}`
- Micro UX: `.scroll-hover-lift`, `.scroll-hover-scale`, `.scroll-focus-(ring|glow)`, `.scroll-active-(pulse|bounce)`

### Utilities (`@casoon/tailwindcss-utilities`)
- Page/Surface/Layout: `.cs-page`, `.cs-surface`, `.cs-container`, `.cs-section`, stacks/grids
- Forms: `.cs-input(-sm|-lg)`, variants `.cs-input-(outline|filled|minimal)`, groups `.cs-input-group`
- Buttons: `.cs-btn`, variants `.cs-btn-(outline|ghost|link|3d)`, sizes `.cs-btn-(sm|lg|xl)`, groups `.cs-btn-group{,-vertical}`
- Loading: `.spinner-(dots|bars|rings|pulse)`, `.loading`, `.loading-overlay`, `.loading-skeleton`, `.progress{,-striped,-animated}`
- Cards, Media, Typography, A11y helpers as before

### Navigation (`@casoon/tailwindcss-navigation`)
- Core/Variants/Density as before
- Hovers: `.nav-hover-(slide|fade|scale)`
- Active/Focus: `.nav-active-(glow|pulse|bounce)`, `.nav-focus-(ring|glow|scale)`
- Subnav: `.subnav-(expand|slide|collapse)`
- Mobile: `.mobile-menu-(overlay|slide|fade)`

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

### Automated Quality Assurance 🆕 *New in v0.5.6*
- **Global Class Testing** - Automated extraction and validation of all CSS classes across packages
- **Breaking Change Prevention** - Critical classes cannot be removed without major version bump
- **Version Synchronization** - Automatic version syncing between packages and test definitions  
- **Plugin API Integration** - Uses Tailwind’s plugin API directly for 100% accurate class extraction
- **Pre-Publish Safety** - All packages automatically tested before publishing
- **200+ Classes Monitored** - Comprehensive coverage across all 10 packages

## 🏗️ Development

This is a monorepo managed with pnpm workspaces and unified versioning.

### 🧪 Testing & Quality Assurance

All packages include automated testing to prevent breaking changes:

```bash
# Run full test suite (includes class compatibility testing)
npm test

# Test class compatibility across all packages  
npm run test:classes

# Extract and analyze classes from all plugins
npm run test:classes:extract

# Run comprehensive validation before publishing
npm run validate
```

### 📦 Version Management

All packages use the same version number for consistency. To update versions:

```bash
# Check current versions (includes class definition sync)
npm run version:check

# Update all packages to next patch version (0.5.5 → 0.5.6)
npm run version:patch

# Update all packages to next minor version (0.5.5 → 0.6.0)
npm run version:minor

# Update all packages to next major version (0.5.5 → 1.0.0)
npm run version:major
```

**Note:** These commands automatically update both the root `package.json` and all package versions simultaneously, plus sync class definitions.

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
### Loading (`@casoon/tailwindcss-loading`)
- Skeletons: `.skeleton`, `.skeleton-text`, `.skeleton-avatar`
- Progress: `.progress-circle`, `.progress-steps`, `.progress-timeline`
- Overlays/Spinners: `.loading-spinner`, `.loading-dots`, `.loading-bars`

### Micro‑Interactions (`@casoon/tailwindcss-micro-interactions`)
- Click: `.click-ripple`, `.click-bounce`, `.click-squish`
- Hover: `.hover-magnetic`, `.hover-tilt`, `.hover-float`
- Focus: `.focus-glow`, `.focus-scale`, `.focus-rotate`
- State: `.state-loading`, `.state-success`, `.state-error`

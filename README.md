# @casoon/tailwindcss-effects

A comprehensive collection of modern CSS effects and utilities for **Tailwind CSS v4**. Built with performance in mind, these plugins provide glassmorphism effects, animations, gradients, scroll animations, and essential utility classes—all optimized for modern build tools and framework compatibility.

> **🚀 Latest (v0.5.1)**: Pure Tailwind CSS v4 plugins with **configurable design tokens** and modern ESM architecture!

## ✨ Features

- **🔌 Pure Plugin Architecture**: Modern Tailwind CSS v4 plugins with ESM-first design
- **🎨 Configurable Design Tokens**: Override default values through plugin configuration
- **📦 Framework Compatible**: Works seamlessly with Vite, Astro, Next.js, and other modern build tools
- **⚡ Performance Optimized**: Tree-shakeable with minimal bundle impact
- **🎯 Complete Toolkit**: Animations, glassmorphism, gradients, scroll effects, and utility classes
- **🚀 Zero Configuration**: Works out of the box, customize only what you need
- **♿ Accessibility First**: Motion-safe variants and proper focus management
- **🌗 Dark Mode Ready**: Built-in dark mode support with CSS custom properties

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@casoon/tailwindcss-animations`](./packages/tailwindcss-animations) | Animation utilities & keyframes | ✅ v0.5.1 |
| [`@casoon/tailwindcss-glass`](./packages/tailwindcss-glass) | Glassmorphism components & utilities | ✅ v0.5.1 |
| [`@casoon/tailwindcss-orbs`](./packages/tailwindcss-orbs) | Orb backgrounds & helper utilities | ✅ v0.5.1 |
| [`@casoon/tailwindcss-gradients`](./packages/tailwindcss-gradients) | Gradient backgrounds & text effects | ✅ v0.5.1 |
| [`@casoon/tailwindcss-scroll`](./packages/tailwindcss-scroll) | Scroll animation primitives | ✅ v0.5.1 |
| [`@casoon/tailwindcss-utilities`](./packages/tailwindcss-utilities) | Layout utilities, cards, text effects & responsive helpers | ✅ v0.5.1 |
| [`@casoon/tailwindcss-navigation`](./packages/tailwindcss-navigation) | Navigation components, variants & subnav systems | ✅ v0.5.1 |
| [`@casoon/tailwindcss-effects`](./packages/tailwindcss-effects) | Meta package that imports all effects | ✅ v0.5.1 |
| [`@casoon/tailwindcss-loading`](./packages/tailwindcss-loading) | Skeletons, progress indicators, and loading overlays | ✅ v0.5.1 |
| [`@casoon/tailwindcss-micro-interactions`](./packages/tailwindcss-micro-interactions) | Click/Hover/Focus micro‑interaction utilities | ✅ v0.5.1 |

> All packages support **configurable design tokens** as of v0.5.1

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

### Loading, Spinners & Progress
```html
<div class="flex items-center gap-4">
  <div class="spinner spinner-dots"><span></span></div>
  <div class="spinner-rings"></div>
  <div class="spinner-bars"></div>
</div>

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
### Loading (`@casoon/tailwindcss-loading`)
- Skeletons: `.skeleton`, `.skeleton-text`, `.skeleton-avatar`
- Progress: `.progress-circle`, `.progress-steps`, `.progress-timeline`
- Overlays/Spinners: `.loading-spinner`, `.loading-dots`, `.loading-bars`

### Micro‑Interactions (`@casoon/tailwindcss-micro-interactions`)
- Click: `.click-ripple`, `.click-bounce`, `.click-squish`
- Hover: `.hover-magnetic`, `.hover-tilt`, `.hover-float`
- Focus: `.focus-glow`, `.focus-scale`, `.focus-rotate`
- State: `.state-loading`, `.state-success`, `.state-error`

# @casoon/tailwindcss-gradients

A comprehensive gradient library for Tailwind CSS v4, providing beautiful gradient backgrounds, text effects, and interactive gradient components. Built with CSS custom properties for easy customization and consistent design tokens.

## ✨ Features

### Core Gradients
- **Multiple Gradient Types** - Linear, radial, and conic gradients
- **Text Gradients** - Beautiful gradient text effects
- **Interactive Gradients** - Hover effects and animations
- **Preset Themes** - Pre-built gradient combinations
- **Customizable Tokens** - CSS custom properties for easy theming

### 🆕 v0.8.1 - Advanced Background System
- **🎨 Canvas Backgrounds** - Particle systems, geometric patterns, organic textures
- **✨ Glow/Schimmer Effects** - CSS-based glow effects in multiple colors
- **🌈 Dynamic Color Systems** - Theme-aware, time-based, and seasonal color shifting
- **🎭 3D Background Effects** - Depth layers, parallax, perspective transforms
- **🎯 Advanced Particles** - Rain, snow, fire, smoke effects (optional)
- **📱 Material Textures** - Fabric, wood, metal, paper, glass textures
- **⚡ Performance Optimized** - GPU acceleration, will-change optimization
- **♿ Accessibility First** - Motion safety, high contrast, reduced transparency

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-gradients/index.css";
```

### ⚠️ Important Setup Note

For gradients to work properly, you need to add the `cs-root` class to your HTML:

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

This class provides the CSS variables needed for all gradient effects like `cs-gradient-sunset`, `cs-gradient-ocean`, `cs-gradient-fire`, etc.

## 🌓 Dark Mode

- Works with Tailwind `.dark` and OS fallback. Tune text and neutral stops per mode:

```css
:root {
  --cs-text-grad-from: #ffffff;
  --cs-text-grad-to:   #94a3b8;
}
:where(.dark) {
  --cs-text-grad-from: #e5e7eb;
  --cs-text-grad-to:   #94a3b8;
}
```

## 🎯 Basic Usage

### 1. Background Gradients
```html
<div class="cs-gradient-sunset">
  <h2>Gradient Background</h2>
  <p>Beautiful gradient background</p>
</div>
```

### 2. Text Gradients
```html
<h1 class="cs-gradient-text-sunset">
  Beautiful Gradient Text
</h1>
```

### 3. Animated Gradients
```html
<div class="cs-gradient-ocean cs-gradient-animate">
  <h2>Animated Gradient</h2>
  <p>Moving gradient background</p>
</div>
```

## 🎨 Available Classes

### Preset Background Gradients
- **`.cs-gradient-sunset`** - Sunset colors (red → yellow → green)
- **`.cs-gradient-ocean`** - Ocean colors (blue → purple) 
- **`.cs-gradient-fire`** - Fire colors (pink → red)
- **`.cs-gradient-mint`** - Mint colors (light blue → turquoise)
- **`.cs-gradient-purple`** - Purple tones (mint → pink)
- **`.cs-gradient-orange`** - Orange tones (yellow → orange)
- **`.cs-gradient-blue`** - Blue tones (light → dark blue)
- **`.cs-gradient-pink`** - Pink tones (pink → yellow)
- **`.cs-gradient-custom`** - ✨ **NEW**: Fully customizable gradient

### Preset Text Gradients
- **`.cs-gradient-text`** - Base gradient text (transparent color)
- **`.cs-gradient-text-sunset`** - Sunset gradient text
- **`.cs-gradient-text-ocean`** - Ocean gradient text
- **`.cs-gradient-text-fire`** - Fire gradient text
- **`.cs-gradient-text-custom`** - ✨ **NEW**: Custom gradient text

### Advanced Gradients
- **`.gradient-radial-center`** - Radial gradient from center
- **`.gradient-radial-top`** - Radial gradient from top
- **`.gradient-radial-bottom`** - Radial gradient from bottom
- **`.gradient-conic`** - Conic gradient
- **`.gradient-conic-center`** - Conic gradient from center
- **`.gradient-border`** - Gradient border effect
- **`.gradient-animate`** - Animated gradient (moving effect)

## 🎨 Customization System

### 🎆 Using .gradient-custom

The new `.gradient-custom` and `.gradient-text-custom` classes are **fully configurable**:

```js
// tailwind.config.js
import gradients from '@casoon/tailwindcss-gradients';

export default {
  plugins: [
    gradients({
      tokens: {
        colors: {
          // Define your custom gradient
          'custom-start': '#ff0000',    // Start color
          'custom-mid': '#00ff00',      // Optional middle color
          'custom-end': '#0000ff'       // End color
        }
      }
    })
  ]
}
```

**Usage:**
```html
<!-- Custom gradient background -->
<div class="gradient-custom p-8 text-white">
  My custom gradient!
</div>

<!-- Custom gradient text -->
<h1 class="gradient-text-custom text-4xl font-bold">
  Custom Gradient Text
</h1>
```

### 🌌 Override Preset Gradients

You can also customize the preset gradients:

```js
// Change the sunset gradient to your brand colors
gradients({
  tokens: {
    colors: {
      'sunset-start': '#your-brand-primary',
      'sunset-mid': '#your-brand-secondary', 
      'sunset-end': '#your-brand-accent'
    }
  }
})
```

**Two-Color vs Three-Color Gradients:**
- If `custom-mid` is `null` or omitted: 2-color gradient
- If `custom-mid` has a value: 3-color gradient

### Surface Gradients
- **`.gradient-bg-surface-subtle`** - Subtle surface gradient

### Interactive Gradients
- **`.gradient-interactive`** - Interactive gradient with hover effects
- **`.gradient-focusable`** - Gradient with focus ring styling

### Overlay & Effects
- **`.gradient-overlay`** - Gradient overlay with noise and blend modes
- **`.gradient-border`** - Gradient border effect
- **`.gradient-ring`** - Gradient ring effect

### Mask & Clipping
- **`.gradient-mask-top`** - Top fade mask
- **`.gradient-mask-bottom`** - Bottom fade mask
- **`.gradient-mask-fade`** - Center fade mask

### Preset Themes
- **`.gradient-accent`** - Accent color gradient
- **`.gradient-primary`** - Primary color gradient
- **`.gradient-success`** - Success color gradient
- **`.gradient-warning`** - Warning color gradient
- **`.gradient-neutral`** - Neutral color gradient

## 🔧 Advanced Usage

### Custom Gradient Backgrounds
```html
<div class="gradient-bg-linear bg-gradient-to-r from-blue-500 to-purple-600">
  <h2>Custom Linear Gradient</h2>
  <p>Using Tailwind's gradient utilities</p>
</div>
```

### Interactive Gradient Cards
```html
<div class="gradient-bg gradient-interactive p-6 rounded-lg">
  <h3>Interactive Card</h3>
  <p>Hover to see the gradient shift</p>
</div>
```

### Gradient Borders
```html
<div class="gradient-border p-6 rounded-lg">
  <h3>Gradient Border</h3>
  <p>Beautiful border with gradient effect</p>
</div>
```

### Gradient Text with Background
```html
<div class="gradient-bg-surface-subtle p-8 rounded-xl">
  <h1 class="gradient-text text-4xl font-bold mb-4">
    Gradient Hero Text
  </h1>
  <p class="text-gray-700">
    Beautiful gradient text on subtle background
  </p>
</div>
```

## 🧭 Utilities Cheatsheet

Angle presets for quick orientation:
```html
<div class="gradient-bg gradient-angle-45"></div>
<div class="gradient-bg gradient-angle-90"></div>
```

Radial shape/size and position helpers:
```html
<div class="gradient-bg-radial gradient-shape-circle gradient-size-farthest-corner gradient-pos-tl"></div>
<div class="gradient-bg-radial gradient-shape-ellipse gradient-size-closest-side gradient-pos-bc"></div>
```

Conic progress ring (CSS‑only):
```html
<div class="gradient-conic-progress" style="--value:72; --g-size:64px; --g-thickness:10px; --g-color: var(--cs-gradient-primary-from)"></div>
```

Stop density presets (control mid stop position):
```html
<div class="gradient-bg gradient-accent gradient-stops-compact"></div>
<div class="gradient-bg gradient-accent gradient-stops-even"></div>
<div class="gradient-bg gradient-accent gradient-stops-wide"></div>
```

Text gradient angles:
```html
<h1 class="gradient-text gradient-text-angle-90">Vertical Text Gradient</h1>
```

Layered background (accent + primary):
```html
<div class="gradient-bg-duo p-8 rounded-xl text-white">
  Dual-layer gradient background
  <!-- Optionally tune angles and mid stop with existing utilities -->
</div>
```

## 🎭 Examples

### Hero Section with Gradients
```html
<div class="min-h-screen gradient-bg-animated flex items-center justify-center p-4">
  <div class="text-center text-white">
    <h1 class="gradient-text text-6xl font-bold mb-6">
      Welcome to the Future
    </h1>
    <p class="text-xl mb-8 opacity-90">
      Experience the power of modern gradient design
    </p>
    <button class="gradient-bg px-8 py-3 rounded-lg hover:scale-105 transition-transform">
      Get Started
    </button>
  </div>
</div>
```

### Gradient Card Grid
```html
<div class="min-h-screen bg-gray-900 p-8">
  <div class="max-w-6xl mx-auto">
    <h2 class="gradient-text text-4xl font-bold text-center mb-12">
      Our Services
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="gradient-bg gradient-interactive p-6 rounded-xl text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
        <p class="opacity-90">Blazing fast performance with modern optimization.</p>
      </div>
      
      <div class="gradient-bg gradient-interactive p-6 rounded-xl text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Reliable</h3>
        <p class="opacity-90">Built with reliability and stability in mind.</p>
      </div>
      
      <div class="gradient-bg gradient-interactive p-6 rounded-xl text-white">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Beautiful</h3>
        <p class="opacity-90">Stunning visual design that captivates users.</p>
      </div>
    </div>
  </div>
</div>
```

### Gradient Navigation
```html
<nav class="gradient-bg-surface-subtle border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <h1 class="gradient-text text-xl font-bold">Logo</h1>
      </div>
      
      <div class="flex space-x-8">
        <a href="#home" class="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
        <a href="#about" class="text-gray-700 hover:text-gray-900 transition-colors">About</a>
        <a href="#services" class="text-gray-700 hover:text-gray-900 transition-colors">Services</a>
        <a href="#contact" class="gradient-bg px-4 py-2 rounded-lg text-white">Contact</a>
      </div>
    </div>
  </div>
</nav>
```

### Gradient Forms
```html
<div class="min-h-screen gradient-bg-surface-subtle flex items-center justify-center p-4">
  <div class="gradient-border bg-white p-8 rounded-xl max-w-md w-full">
    <h2 class="gradient-text text-2xl font-bold text-center mb-6">
      Contact Us
    </h2>
    
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your name"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your@email.com"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea 
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your message"
        ></textarea>
      </div>
      
      <button type="submit" class="w-full gradient-bg text-white py-2 rounded-md hover:scale-105 transition-transform">
        Send Message
      </button>
    </form>
  </div>
</div>
```

## 🎨 Customization

### CSS Variables
Override default values with CSS custom properties:

```css
:root {
  --cs-gradient-angle: 135deg;
  --cs-gradient-stop-1: #667eea;
  --cs-gradient-stop-2: #764ba2;
  --cs-gradient-stop-3: #f093fb;
  --cs-gradient-accent-from: #ff6b6b;
  --cs-gradient-accent-to: #4ecdc4;
  --cs-gradient-surface-subtle-from: #f8fafc;
  --cs-gradient-surface-subtle-to: #e2e8f0;
}
```

### Custom Gradient Classes
Create your own gradient effects:

```css
.gradient-custom {
  background: linear-gradient(
    var(--cs-gradient-angle),
    var(--cs-gradient-stop-1),
    var(--cs-gradient-stop-2),
    var(--cs-gradient-stop-3)
  );
}
```

### Theme Integration
```css
/* Light theme */
.gradient-theme-light {
  --cs-gradient-surface-subtle-from: #f8fafc;
  --cs-gradient-surface-subtle-to: #e2e8f0;
  --cs-gradient-text-from: #1e293b;
  --cs-gradient-text-to: #475569;
}

/* Dark theme */
.gradient-theme-dark {
  --cs-gradient-surface-subtle-from: #1e293b;
  --cs-gradient-surface-subtle-to: #334155;
  --cs-gradient-text-from: #f1f5f9;
  --cs-gradient-text-to: #cbd5e1;
}
```

## ♿ Accessibility

### Contrast Considerations
- Ensure sufficient contrast between gradient text and backgrounds
- Use gradient overlays for better text readability
- Test with high contrast mode enabled

### Motion Safety
- Respect `prefers-reduced-motion` preferences
- Provide static alternatives for animated gradients
- Ensure gradients don't interfere with focus visibility

### Screen Reader Support
- Maintain semantic HTML structure
- Use descriptive text for gradient elements
- Ensure proper heading hierarchy

## 🔧 Integration

### With Tailwind CSS
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-gradients/index.css";

/* Combine with Tailwind utilities */
.my-gradient-component {
  @apply gradient-bg gradient-interactive p-6 rounded-lg text-white;
}
```

### With JavaScript Frameworks
```jsx
// React example
const GradientCard = ({ title, children, variant = 'default' }) => (
  <div className={`gradient-bg ${variant === 'interactive' ? 'gradient-interactive' : ''}`}>
    <h3 className="gradient-text text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
);
```

### With CSS-in-JS
```javascript
// Styled-components example
const GradientContainer = styled.div`
  ${gradientStyles}
  background: ${props => props.gradient || 'var(--cs-gradient-default)'};
`;
```

## 📦 Package Contents

- **`index.css`** - Main gradient components and utilities
- **`tokens.css`** - CSS custom properties and design tokens
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Custom Properties**: Required for token system
- **CSS Gradients**: Required for gradient effects
- **CSS Mask/Clip**: Optional enhancement for mask effects

## 🔥 Optional Extensions (v0.8.1)

Extend your gradient system with powerful optional modules:

### 🎨 Canvas Background Effects
```css
@import "@casoon/tailwindcss-gradients";
@import "@casoon/tailwindcss-gradients/src/optional/glow-effects.css";
```

Available classes:
- `cs-canvas-dots` - Floating particle dots
- `cs-canvas-grid` - Animated grid pattern
- `cs-canvas-circuit` - Circuit-like patterns
- `cs-canvas-stars` - Twinkling star field
- `cs-canvas-hexagons` - Hexagonal patterns
- `cs-canvas-bubbles` - Floating bubbles

### ✨ Glow/Schimmer Effects
```css
@import "@casoon/tailwindcss-gradients/src/optional/glow-effects.css";
```

CSS-based glow effects as alternative to Canvas JavaScript:
- `cs-glow-red` - Red glow/schimmer
- `cs-glow-blue` - Blue glow
- `cs-glow-green` - Green glow  
- `cs-glow-gold` - Golden glow
- `cs-glow-purple` - Purple glow
- `cs-glow-white` - White glow
- `cs-glow-subtle/intense` - Intensity modifiers
- `cs-glow-pulse/wave/rotate` - Animation variants

### 🎭 3D Background Effects
```css
@import "@casoon/tailwindcss-gradients/src/optional/3d-effects.css";
```

Räumliche Tiefe mit CSS 3D transforms:
- `cs-3d-scene` - 3D container with perspective
- `cs-3d-parallax-far/mid/near/front` - Parallax layers
- `cs-3d-cubes` - 3D cube patterns
- `cs-3d-tunnel` - Tunnel zoom effect
- `cs-3d-spotlight` - Moving spotlight
- `cs-3d-orbital` - Orbital movement
- `cs-3d-rotate-x/y-15/30/45` - Rotation utilities
- `cs-3d-perspective-500/800/1200` - Perspective utilities

### 🌈 Dynamic Color Systems
```css
@import "@casoon/tailwindcss-gradients/src/optional/dynamic-colors.css";
```

Intelligent, adaptive color systems:
- `cs-theme-light/dark/auto` - Theme-aware colors
- `cs-time-morning/noon/evening/night` - Time-based colors
- `cs-season-spring/summer/autumn/winter` - Seasonal colors
- `cs-ambient-warm/cool/neutral` - Ambient light simulation
- `cs-mood-energetic/calm/focus` - Mood-based colors
- `cs-color-responsive` - Interactive color changes

### 🎯 Advanced Particles (Optional)
```css
@import "@casoon/tailwindcss-gradients/src/optional/particles.css";
```

Natural weather and particle effects:
- `cs-particles-rain-light/heavy` - Rain effects
- `cs-particles-snow-light` - Snow effects
- `cs-particles-fire` - Fire effects
- `cs-particles-smoke` - Smoke effects
- `cs-particles-sparkles` - Sparkle effects
- `cs-particles-subtle/intense` - Intensity controls

### ⚡ Performance Optimizations
```css
@import "@casoon/tailwindcss-gradients/src/optional/performance.css";
```

GPU acceleration and optimization:
- `cs-gpu-accelerated` - Force GPU acceleration
- `cs-perf-fade-in/slide-up/scale-in` - Optimized animations
- `cs-observe-animate` - Intersection Observer ready
- `cs-performance-low/high/ultra` - Performance modes
- `cs-will-change-transform/opacity` - Will-change optimization
- `cs-contain-layout/style/paint` - CSS containment

### 📏 Material Textures
Realistic material simulations:
- `cs-texture-fabric` - Woven fabric
- `cs-texture-wood` - Wood grain
- `cs-texture-metal` - Brushed metal
- `cs-texture-paper` - Paper texture
- `cs-texture-glass` - Frosted glass

## 🎆 Complete Usage Example

```html
<!-- Advanced 3D scene with particles and glow -->
<div class="cs-3d-scene cs-glow-base cs-glow-blue cs-performance-high">
  <!-- Far parallax layer with canvas pattern -->
  <div class="cs-3d-parallax-far cs-canvas-stars"></div>
  
  <!-- Mid layer with particles -->
  <div class="cs-3d-parallax-mid cs-particles-snow-light"></div>
  
  <!-- Near layer with 3D cubes -->
  <div class="cs-3d-parallax-near cs-3d-cubes"></div>
  
  <!-- Content layer with dynamic colors -->
  <div class="cs-3d-parallax-front cs-theme-auto cs-time-cycle">
    <div class="cs-texture-glass p-8 rounded-xl">
      <h1 class="gradient-text text-4xl font-bold mb-4">
        Advanced Background System
      </h1>
      <p class="text-white/80">
        Experience the power of layered backgrounds
      </p>
    </div>
  </div>
</div>
```

## 📏 Related Packages

- **`@casoon/tailwindcss-effects`** - Meta package with all effects
- **`@casoon/tailwindcss-utilities`** - Layout and utility components

## 🤝 Contributing

Contributions are welcome! Please ensure all components respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

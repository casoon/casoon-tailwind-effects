# 🎬 @casoon/tailwindcss-animations

> Modern, performant, and accessible animations for Tailwind CSS v4

[![NPM Version](https://img.shields.io/npm/v/@casoon/tailwindcss-animations)](https://www.npmjs.com/package/@casoon/tailwindcss-animations)
[![License](https://img.shields.io/npm/l/@casoon/tailwindcss-animations)](./LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@casoon/tailwindcss-animations)](https://bundlephobia.com/package/@casoon/tailwindcss-animations)

A comprehensive animation library for Tailwind CSS v4 with 80+ utilities, advanced easing functions, stagger system, scroll-timeline animations, and full accessibility support.

## ✨ Features

- 🚀 **80+ Animation Utilities** - Entrance, continuous, 3D, and component animations
- ⚡ **Advanced Easing Functions** - Spring, bounce, elastic, and material design easings
- 🎼 **Smart Stagger System** - Orchestrate up to 12 elements with precise timing
- 📜 **Modern Scroll Animations** - CSS scroll-timeline with fallbacks
- ♿ **Full Accessibility** - Complete `prefers-reduced-motion` support
- 🎯 **Component-Ready** - Button presses, navigation, notifications, loading states
- 🛠️ **Performance Optimized** - Hardware acceleration hints and efficient keyframes
- 📱 **Device-Responsive** - Touch and print optimizations
- 🎭 **3D Transform Support** - Perspective-based animations with fallbacks

## 🚀 Quick Start

### Installation

```bash
npm install @casoon/tailwindcss-animations
# or
pnpm add @casoon/tailwindcss-animations
```

### Usage with Tailwind CSS v4

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-animations";
```

> **Note**: The package assumes you import `@import "tailwindcss";` in your main CSS file.

### Legacy Usage (without Tailwind)

For projects not using Tailwind CSS v4, use the pre-compiled CSS:

```html
<link rel="stylesheet" href="node_modules/@casoon/tailwindcss-animations/dist.min.css">
```

### Basic Example

```html
<!-- Fade in with spring easing -->
<div class="cs-fade-in cs-anim cs-ease-spring">
  Welcome to the future!
</div>

<!-- Staggered grid animation -->
<div class="cs-stagger-100">
  <div class="cs-scale-in cs-anim">Item 1</div>
  <div class="cs-scale-in cs-anim">Item 2</div>
  <div class="cs-scale-in cs-anim">Item 3</div>
</div>
```

## 📖 API Reference

### 🎯 Core Animation Classes

All animations use the `cs-anim` base class with optional modifiers:

```html
<div class="cs-fade-in cs-anim cs-anim-lg cs-ease-spring cs-delay-200">
  Animated content
</div>
```

### 🚀 Entrance Animations

Perfect for revealing content with smooth, natural motions:

| Class | Description | Use Case |
|-------|-------------|----------|
| `cs-fade-in` | Opacity 0→1 | Text, images, cards |
| `cs-scale-in` | Scale 0.8→1 | Modals, tooltips |
| `cs-zoom-in` | Scale 0→1 with bounce | Call-to-action buttons |
| `cs-slide-up` | Translate Y 20px→0 | Content sections |
| `cs-slide-down` | Translate Y -20px→0 | Dropdowns |
| `cs-slide-left` | Translate X 20px→0 | Side panels |
| `cs-slide-right` | Translate X -20px→0 | Navigation items |
| `cs-blur-in` | Blur 10px→0 + fade | Hero sections |
| `cs-rotate-in` | Rotate -10°→0° + fade | Icons, badges |
| `cs-flip-in` | 3D flip + scale | Cards, tiles |

```html
<!-- Hero section with staggered reveal -->
<section class="cs-stagger-150">
  <h1 class="cs-blur-in cs-anim cs-anim-lg">Amazing Product</h1>
  <p class="cs-slide-up cs-anim cs-delay-300">Revolutionary features</p>
  <button class="cs-scale-in cs-anim cs-delay-600">Get Started</button>
</section>
```

### 🔄 Continuous Animations

Infinite animations for dynamic elements:

| Class | Description | Best For |
|-------|-------------|----------|
| `cs-pulse` | Gentle scale breathing | Notifications, status |
| `cs-bounce` | Up/down bouncing | Loading states |
| `cs-rotate` | 360° continuous rotation | Loading spinners |
| `cs-wiggle` | Subtle side-to-side | Error states |
| `cs-shake` | Horizontal shake | Form validation |
| `cs-heartbeat` | Pulse with pause | Live indicators |
| `cs-rubber-band` | Elastic scale effect | Interactive elements |
| `cs-float` | Gentle vertical float | Floating action buttons |
| `cs-sway` | Natural tree-like sway | Decorative elements |

```html
<!-- Interactive button with hover animations -->
<button class="cs-heartbeat hover:cs-rubber-band">
  🔴 Live Now
</button>

<!-- Loading spinner -->
<div class="cs-rotate cs-will-transform">⚡</div>
```

### 🎭 3D Animations

Hardware-accelerated 3D transforms:

| Class | Description | Transform |
|-------|-------------|-----------|
| `cs-reveal-3d-up` | 3D reveal from bottom | rotateX(-90°→0°) |
| `cs-reveal-3d-right` | 3D reveal from left | rotateY(-90°→0°) |
| `cs-reveal-3d-left` | 3D reveal from right | rotateY(90°→0°) |
| `cs-flip-3d-x` | Horizontal 3D flip | rotateX(0°→360°) |
| `cs-flip-3d-y` | Vertical 3D flip | rotateY(0°→360°) |

**Required:** Use `cs-preserve-3d` on parent container:

```html
<div class="cs-preserve-3d">
  <div class="cs-reveal-3d-up cs-anim cs-anim-lg">
    3D Card Content
  </div>
</div>
```

### ⚡ Advanced Easing Functions

Natural motion curves for professional animations:

| Class | Curve | Best For |
|-------|-------|----------|
| `cs-ease-standard` | Material Standard | General UI transitions |
| `cs-ease-emphasized` | Material Emphasized | Important state changes |
| `cs-ease-spring` | Spring physics | Playful interactions |
| `cs-ease-bounce` | Bounce effect | Success states |
| `cs-ease-elastic` | Elastic snap | Attention-grabbing |
| `cs-ease-overshoot` | Slight overshoot | Satisfying feedback |

```html
<!-- Different easing for different purposes -->
<div class="cs-slide-up cs-anim cs-ease-spring">Playful</div>
<div class="cs-fade-in cs-anim cs-ease-standard">Professional</div>
<div class="cs-scale-in cs-anim cs-ease-bounce">Success!</div>
```

### 🎼 Advanced Stagger System

Orchestrate multiple elements with precise timing:

| Class | Delay Between Items |
|-------|-------------------|
| `cs-stagger-50` | 50ms |
| `cs-stagger-75` | 75ms |
| `cs-stagger-100` | 100ms |
| `cs-stagger-125` | 125ms |
| `cs-stagger-150` | 150ms |
| `cs-stagger-200` | 200ms |

**Supports up to 12 items** with automatic delay calculation:

```html
<!-- Card grid with 100ms stagger -->
<div class="grid grid-cols-3 cs-stagger-100">
  <div class="cs-scale-in cs-anim">Card 1</div>
  <div class="cs-scale-in cs-anim">Card 2</div>
  <div class="cs-scale-in cs-anim">Card 3</div>
  <!-- ... up to 12 items -->
</div>
```

### 🎯 Component Animations

Ready-to-use component interaction animations:

#### Button Animations

```html
<!-- Button press feedback -->
<button class="cs-btn-press">Click me!</button>

<!-- Material ripple effect -->
<button class="cs-btn-ripple bg-blue-500">Ripple Button</button>
```

#### Loading States

```html
<!-- Skeleton loading -->
<div class="cs-skeleton-shimmer h-4 bg-gray-200 rounded"></div>

<!-- Progress bar -->
<div class="cs-progress-grow h-2 bg-blue-500 rounded-full"></div>

<!-- Dot loader -->
<div class="flex gap-1">
  <div class="w-2 h-2 bg-blue-500 rounded-full cs-dot-loader"></div>
  <div class="w-2 h-2 bg-blue-500 rounded-full cs-dot-loader" style="animation-delay: 0.2s;"></div>
  <div class="w-2 h-2 bg-blue-500 rounded-full cs-dot-loader" style="animation-delay: 0.4s;"></div>
</div>
```

### 📜 Scroll-Timeline Animations

Modern scroll-driven animations with fallbacks:

```html
<!-- Reveal on scroll -->
<div class="cs-scroll-reveal">
  Appears when scrolled into view
</div>

<!-- Scale on scroll -->
<div class="cs-scroll-scale">
  Scales up when in viewport
</div>

<!-- Parallax effect -->
<div class="cs-parallax-scroll">
  Smooth parallax motion
</div>
```

### ⏱️ Duration System

Precise timing control with T-shirt sizing:

| Class | Duration | Use Case |
|-------|----------|----------|
| `cs-anim-xxs` | 75ms | Micro-interactions |
| `cs-anim-xs` | 150ms | Quick feedback |
| `cs-anim-sm` | 200ms | Standard buttons |
| `cs-anim-md` | 300ms | **Default** modals |
| `cs-anim-lg` | 500ms | Page transitions |
| `cs-anim-xl` | 700ms | Hero animations |
| `cs-anim-2xl` | 1000ms | Dramatic reveals |
| `cs-anim-3xl` | 1500ms | Storytelling |

### 🛠️ Performance Utilities

Hardware acceleration and optimization hints:

| Class | Property | Benefit |
|-------|----------|---------|
| `cs-will-transform` | `will-change: transform` | Transform optimizations |
| `cs-will-opacity` | `will-change: opacity` | Opacity optimizations |
| `cs-will-filter` | `will-change: filter` | Filter optimizations |
| `cs-backface-hidden` | `backface-visibility: hidden` | 3D performance |
| `cs-preserve-3d` | `transform-style: preserve-3d` | 3D context |

## ♿ Accessibility

This library fully supports accessibility standards:

### Reduced Motion Support

When `prefers-reduced-motion: reduce` is enabled:

- ✅ **Infinite animations are disabled**
- ✅ **Essential animations become instant** (0.01ms duration)
- ✅ **3D transforms are removed** to prevent motion sickness
- ✅ **Respect user preferences** automatically

```html
<!-- This animation respects user preferences -->
<div class="cs-fade-in cs-anim">
  <!-- Normal: 300ms fade in -->
  <!-- Reduced motion: instant appearance -->
</div>
```

## 🎨 Real-World Examples

### Landing Page Hero

```html
<section class="cs-stagger-200">
  <!-- Background fades in first -->
  <div class="cs-fade-in cs-anim cs-anim-xl">
    <img src="hero-bg.jpg" alt="Hero background" />
  </div>
  
  <!-- Title with blur effect -->
  <h1 class="cs-blur-in cs-anim cs-anim-lg cs-ease-spring">
    Revolutionary Product
  </h1>
  
  <!-- Subtitle slides up -->
  <p class="cs-slide-up cs-anim cs-ease-standard">
    Change the way you work forever
  </p>
  
  <!-- CTA bounces in -->
  <button class="cs-scale-in cs-anim cs-ease-bounce cs-btn-press">
    Get Started Free
  </button>
</section>
```

### Form Validation

```html
<!-- Error state with shake -->
<input 
  type="email" 
  class="border-red-500 cs-shake"
  placeholder="Please enter valid email"
/>

<!-- Success state with bounce -->
<div class="cs-scale-in cs-anim cs-ease-bounce">
  ✅ Email verified successfully!
</div>
```

## 📊 Performance Guidelines

### Best Practices

1. **Use Hardware Acceleration**
   ```html
   <div class="cs-scale-in cs-anim cs-will-transform">
     Optimized animation
   </div>
   ```

2. **Batch Animations**
   - Use stagger system instead of individual delays
   - Group related animations in single containers

3. **Consider Reduced Motion**
   - All animations automatically respect user preferences

### Performance Metrics

- ✅ **Hardware Accelerated** - Uses GPU for transforms
- ✅ **60 FPS Optimized** - Smooth animation performance
- ✅ **Minimal Bundle Size** - Only includes used animations
- ✅ **No JavaScript Required** - Pure CSS animations
- ✅ **Mobile Optimized** - Faster on touch devices

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ by [Casoon](https://github.com/casoon)**

[📚 View all packages](https://github.com/casoon/tailwindcss-effects) • [🐛 Report Bug](https://github.com/casoon/tailwindcss-effects/issues) • [✨ Request Feature](https://github.com/casoon/tailwindcss-effects/issues)
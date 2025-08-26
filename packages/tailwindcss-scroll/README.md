# @casoon/tailwindcss-scroll

A powerful scroll-triggered animation library for Tailwind CSS v4, featuring AOS compatibility, parallax effects, and smooth reveal animations. Built on top of `@casoon/tailwindcss-animations` for seamless integration.

## ✨ Features

- **Scroll-Triggered Animations** - Elements animate when they enter the viewport
- **AOS Compatible** - Drop-in replacement for Animate On Scroll library
- **Parallax Effects** - Smooth parallax scrolling with CSS variables
- **Stagger Animations** - Sequential animations for child elements
- **Performance Optimized** - Uses IntersectionObserver and requestAnimationFrame
- **Accessibility First** - Respects motion preferences and provides fallbacks
- **CSS-First Approach** - Minimal JavaScript, maximum CSS control

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-animations/index.css";
@import "@casoon/tailwindcss-scroll/index.css";
```

## 🎯 Basic Usage

### 1. Simple Scroll Reveal
```html
<div class="scroll scroll-in scroll-fade-up">
  This element fades up when scrolled into view
</div>
```

### 2. With Custom Timing
```html
<div class="scroll scroll-in scroll-delay-200 scroll-slow">
  This element has a 200ms delay and slow animation
</div>
```

### 3. Stagger Effect for Lists
```html
<div class="scroll scroll-stagger">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## 🎨 Available Classes

### Base Classes
- **`.scroll`** - Base class for scroll animations (hidden until in view)
- **`.scroll-in`** - Activates the animation when element enters viewport
- **`.is-inview`** - Applied automatically when element is visible

### Effect Classes
These map to the underlying animation keyframes:

- **Fade Effects**: `.scroll-fade`, `.scroll-fade-up`, `.scroll-fade-down`, `.scroll-fade-left`, `.scroll-fade-right`
- **Slide Effects**: `.scroll-slide-up`, `.scroll-slide-down`, `.scroll-slide-left`, `.scroll-slide-right`
- **Zoom Effects**: `.scroll-zoom-in`, `.scroll-zoom-out`
- **3D Effects**: `.scroll-reveal-3d-up`, `.scroll-reveal-3d-right`
- **Special Effects**: `.scroll-rotate-in`, `.scroll-blur-in`

### Timing Classes
- **Delays**: `.scroll-delay-0`, `.scroll-delay-50`, `.scroll-delay-100`, `.scroll-delay-150`, `.scroll-delay-200`, `.scroll-delay-300`, `.scroll-delay-500`
- **Speed**: `.scroll-fast`, `.scroll-normal`, `.scroll-slow`
- **Loop**: `.scroll-loop`

### Utility Classes
- **`.scroll-stagger`** - Enables staggered animations for children
- **`.scroll-parallax`** - Enables parallax scrolling effects

## 🔧 JavaScript API

### ScrollRevealX Object
The library provides a global `ScrollRevealX` object for advanced control:

```javascript
// Initialize with custom options
ScrollRevealX.init({
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1,
  once: true,
  mirror: false,
  useAOSCompat: true
});

// Refresh all elements
ScrollRevealX.refresh();

// Check if element is in view
const isVisible = ScrollRevealX.inView(element);
```

### Configuration Options
- **`root`** - Root element for intersection (default: null)
- **`rootMargin`** - Margin around root (default: '0px 0px -12% 0px')
- **`threshold`** - Intersection threshold (default: 0.15)
- **`once`** - Animate only once (default: true)
- **`mirror`** - Reverse animation on exit (default: false)
- **`useAOSCompat`** - Enable AOS compatibility (default: true)

## 🎭 AOS Compatibility

### Drop-in Replacement
The library automatically detects and converts AOS attributes:

```html
<!-- AOS syntax - automatically converted -->
<div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
  This uses AOS attributes
</div>

<!-- Native syntax -->
<div class="scroll scroll-in scroll-fade-up" style="--anim-duration: 1000ms; --anim-delay: 200ms;">
  This uses native classes
</div>
```

### AOS Attribute Mapping
- `data-aos="fade"` → `.scroll-fade`
- `data-aos="fade-up"` → `.scroll-fade-up`
- `data-aos="slide-up"` → `.scroll-slide-up`
- `data-aos="zoom-in"` → `.scroll-zoom-in`
- `data-aos="flip-left"` → `.scroll-reveal-3d-right`
- `data-aos="blur-in"` → `.scroll-blur-in`

### AOS Options Support
- `data-aos-duration` → `--anim-duration`
- `data-aos-delay` → `--anim-delay`
- `data-aos-easing` → `--anim-ease`
- `data-aos-once` → `data-scroll-once`

## 🌊 Parallax Effects

### Basic Parallax
```html
<div class="scroll scroll-parallax" data-scroll-parallax-y="0.5">
  This element moves slower than scroll
</div>
```

### Advanced Parallax
```html
<div class="scroll scroll-parallax" 
     data-scroll-parallax-x="0.3"
     data-scroll-parallax-y="0.5"
     data-scroll-parallax-scale="0.1">
  This element has X, Y, and scale parallax
</div>
```

### Parallax Attributes
- **`data-scroll-parallax-x`** - Horizontal parallax factor (default: 0)
- **`data-scroll-parallax-y`** - Vertical parallax factor (default: 0)
- **`data-scroll-parallax-scale`** - Scale parallax factor (default: 0)

## ⚡ Stagger Animations

### Automatic Stagger
```html
<div class="scroll scroll-stagger">
  <div>Item 1 (0ms delay)</div>
  <div>Item 2 (80ms delay)</div>
  <div>Item 3 (160ms delay)</div>
</div>
```

### Custom Stagger Timing
```html
<div class="scroll scroll-stagger" data-scroll-stagger="120">
  <div>Item 1 (0ms delay)</div>
  <div>Item 2 (120ms delay)</div>
  <div>Item 3 (240ms delay)</div>
</div>
```

## 🎨 Advanced Examples

### Hero Section with Stagger
```html
<section class="hero">
  <div class="scroll scroll-in scroll-fade-up">
    <h1 class="scroll scroll-in scroll-fade-up scroll-delay-100">
      Welcome to our site
    </h1>
    <p class="scroll scroll-in scroll-fade-up scroll-delay-200">
      Discover amazing content
    </p>
    <div class="scroll scroll-in scroll-fade-up scroll-delay-300">
      <button class="btn">Get Started</button>
    </div>
  </div>
</section>
```

### Card Grid with Stagger
```html
<div class="grid grid-cols-3 gap-6">
  <div class="scroll scroll-stagger">
    <div class="card scroll scroll-in scroll-fade-up">
      <h3>Card 1</h3>
      <p>Content here</p>
    </div>
    <div class="card scroll scroll-in scroll-fade-up">
      <h3>Card 2</h3>
      <p>Content here</p>
    </div>
    <div class="card scroll scroll-in scroll-fade-up">
      <h3>Card 3</h3>
      <p>Content here</p>
    </div>
  </div>
</div>
```

### Parallax Hero
```html
<div class="hero relative overflow-hidden">
  <div class="scroll scroll-parallax" data-scroll-parallax-y="0.3">
    <h1 class="text-6xl font-bold">Parallax Title</h1>
  </div>
  <div class="scroll scroll-parallax" data-scroll-parallax-y="0.5">
    <p class="text-xl">This moves slower</p>
  </div>
</div>
```

## 🔧 Customization

### CSS Variables
Override default values with CSS custom properties:

```css
:root {
  --scroll-root-margin: 0px 0px -20% 0px;
  --scroll-threshold: 0.1;
  --scroll-stagger-step: 100ms;
  --scroll-parallax-max: 100px;
  --scroll-parallax-scale: 1.08;
}
```

### Custom Scroll Classes
Extend the library with your own scroll effects:

```css
.scroll-custom {
  animation-name: my-custom-animation;
  animation-duration: var(--anim-duration);
  animation-timing-function: var(--anim-ease);
}
```

## 📡 Events

### Custom Events
The library dispatches custom events for integration:

```javascript
// Element enters viewport
element.addEventListener('scroll:enter', () => {
  console.log('Element entered viewport');
});

// Element exits viewport
element.addEventListener('scroll:exit', () => {
  console.log('Element exited viewport');
});

// Animation completes
element.addEventListener('scroll:complete', () => {
  console.log('Animation finished');
});
```

## ♿ Accessibility

### Motion Preferences
Automatically respects user motion preferences:

- **Reduced Motion**: Animations are disabled or minimized
- **Duration**: Set to 1ms for instant feedback
- **Transforms**: Disabled to prevent disorientation

### Focus Management
- Elements remain focusable during animations
- Screen readers can access content immediately
- No interference with keyboard navigation

## 🔧 Integration

### With Other Libraries
```javascript
// Initialize after other libraries
document.addEventListener('DOMContentLoaded', () => {
  // Your other library initialization
  AOS.init();
  
  // Then initialize scroll reveal
  ScrollRevealX.init();
});
```

### With Framework Components
```javascript
// React example
useEffect(() => {
  ScrollRevealX.refresh();
}, [items]);

// Vue example
mounted() {
  this.$nextTick(() => {
    ScrollRevealX.refresh();
  });
}
```

## 📦 Package Contents

- **`index.css`** - Scroll animation utilities and CSS classes
- **`tokens.css`** - CSS custom properties for scroll effects
- **`scroll.js`** - JavaScript implementation with AOS compatibility
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **IntersectionObserver**: Required for scroll detection
- **CSS Custom Properties**: Required for token system
- **CSS Animations**: Required for keyframe animations

## 📚 Dependencies

- **`@casoon/tailwindcss-animations`** - Required for animation keyframes and utilities

## 🤝 Contributing

Contributions are welcome! Please ensure all features respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

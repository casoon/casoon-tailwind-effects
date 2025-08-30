# @casoon/tailwindcss-animations

A comprehensive animation library for Tailwind CSS v4, providing CSS-first animation utilities, keyframes, and interaction patterns. Built with performance and accessibility in mind.

## ✨ Features

- **Pure CSS Animations** - No JavaScript required for basic animations
- **Token-Based System** - Uses CSS custom properties for consistent timing and easing
- **Accessibility First** - Respects `prefers-reduced-motion` preferences
- **Performance Optimized** - Includes `will-change` utilities and optimized keyframes
- **AOS Compatible** - Works seamlessly with scroll reveal libraries
- **Composable** - Mix and match utilities for custom animation combinations

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-animations/index.css";
```

## 🌓 Dark Mode

- Animations are token-driven and largely color-agnostic. Hover-lift shadows use `--anim-shadow-ink`; define it per mode if needed.

## 🎯 Basic Usage

### 1. Base Animation Class
```html
<div class="anim fade-in">
  This element fades in with default timing
</div>
```

### 2. Customize Duration
```html
<div class="anim fade-in anim-fast">
  This fades in quickly (160ms)
</div>

<div class="anim fade-in anim-lg">
  This fades in slowly (480ms)
</div>
```

### 3. Customize Easing
```html
<div class="anim fade-in ease-spring">
  This fades in with a springy bounce
</div>
```

## 🎨 Available Animation Classes

### Basic Effects
Combine these with `.anim` and timing/easing utilities:

- **Fade**: `.fade-in`, `.fade-out`
- **Scale**: `.scale-in`, `.scale-out`
- **Blur**: `.blur-in`, `.blur-out`
- **Slide**: `.slide-up`, `.slide-down`, `.slide-left`, `.slide-right`
- **Rotate**: `.rotate-in`, `.rotate`
- **3D Reveal**: `.reveal-3d-up`, `.reveal-3d-right`
- **Attention**: `.pulse`, `.bounce`, `.wiggle`
- **Continuous**: `.marquee`, `.parallax-y`
- **Progress**: `.progress-grow`

### Duration Utilities
- `.anim-xxs` - 120ms
- `.anim-xs` - 160ms
- `.anim-sm` - 220ms
- `.anim-md` - 320ms (default)
- `.anim-lg` - 480ms
- `.anim-xl` - 720ms
- `.anim-2xl` - 1200ms

### Easing Utilities
- `.ease-standard` - Smooth, natural motion
- `.ease-emphasized` - Dramatic, attention-grabbing
- `.ease-decelerate` - Fast start, slow finish
- `.ease-accelerate` - Slow start, fast finish
- `.ease-spring` - Bouncy, playful
- `.ease-soft-spring` - Gentle bounce

### Control Utilities
- `.anim-infinite` - Repeat forever
- `.anim-reverse` - Play backwards
- `.anim-alt` - Alternate forward/backward
- `.anim-both` - Fill both directions
- `.anim-forward` - Fill forwards only

### Performance Utilities
- `.will-transform` - Optimize for transforms
- `.will-opacity` - Optimize for opacity changes
- `.will-filter` - Optimize for filter effects
- `.will-layout` - Optimize for layout changes

## 🔧 Advanced Usage

### Compound Effects
Pre-built animation combinations:

```html
<!-- Card entrance -->
<div class="enter-card">
  Smooth card entrance with blur and scale
</div>

<!-- Toast notifications -->
<div class="enter-toast">
  Slides up from bottom
</div>

<!-- Modal animations -->
<div class="enter-modal">
  Scales in with emphasis
</div>
```

### Interaction Patterns
Hover and focus effects without JavaScript:

```html
<!-- Hover lift effect -->
<button class="hover-raise">
  Lifts on hover
</button>

<!-- Press feedback -->
<button class="hover-press">
  Presses down when clicked
</button>

<!-- Focus ring -->
<input class="focus-ring" type="text">
```

### ARIA Integration
```html
<!-- Accordion with animations -->
<details class="anim-reveal">
  <summary>Click to expand</summary>
<div>Content animates in/out</div>
</details>

## 🎨 Theme Overrides

Only needed if you want to adjust shadow ink for hover-lift utilities:

```css
:root { --anim-shadow-ink:#000; }
:where(.dark){ --anim-shadow-ink:#000; }
```

<!-- Expandable content -->
<div class="anim-expand-target" aria-expanded="false">
  Content that expands/collapses
</div>
```

### Transform Origins
```html
<div class="fade-in t-origin-top">
  Animates from top
</div>

<div class="fade-in t-origin-bottom">
  Animates from bottom
</div>

<div class="reveal-3d-up t-preserve-3d">
  3D effect with preserved perspective
</div>
```

## 🎭 Examples

### Hero Section
```html
<div class="hero">
  <h1 class="anim fade-in anim-lg ease-emphasized">
    Welcome to our site
  </h1>
  <p class="anim fade-in anim-lg ease-emphasized anim-delay-200">
    Discover amazing content
  </p>
  <button class="anim fade-in anim-lg ease-emphasized anim-delay-400 hover-raise">
    Get Started
  </button>
</div>
```

### Card Grid
```html
<div class="grid grid-cols-3 gap-4">
  <div class="card anim fade-in anim-delay-100 hover-raise">
    Card 1
  </div>
  <div class="card anim fade-in anim-delay-200 hover-raise">
    Card 2
  </div>
  <div class="card anim fade-in anim-delay-300 hover-raise">
    Card 3
  </div>
</div>
```

### Loading States
```html
<div class="loading">
  <div class="progress-bar">
    <div class="progress-fill progress-grow"></div>
  </div>
</div>
```

## 🎨 Customization

### CSS Variables
All animations use CSS custom properties that can be overridden:

```css
:root {
  --anim-duration: 500ms;
  --anim-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --anim-translate-md: 24px;
  --anim-scale-sm: 0.9;
}
```

### Custom Keyframes
Extend the library with your own animations:

```css
@keyframes my-custom-animation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.my-custom {
  animation-name: my-custom-animation;
}
```

## ♿ Accessibility

The library automatically respects user motion preferences:

- **Reduced Motion**: Animations are disabled or minimized
- **Duration**: Set to 1ms for instant feedback
- **Easing**: Changed to linear for predictable motion
- **Transforms**: Disabled to prevent disorientation

## 🔧 Integration

### With Scroll Libraries
Works seamlessly with scroll reveal libraries like AOS:

```html
<div data-aos="fade-up" data-aos-duration="1000">
  This will use AOS for scroll triggering
</div>
```

### With JavaScript
```javascript
// Add animation class dynamically
element.classList.add('anim', 'fade-in', 'anim-lg');

// Listen for animation events
element.addEventListener('animationend', () => {
  console.log('Animation completed');
});
```

## 📦 Package Contents

- **`index.css`** - Main animation utilities and keyframes
- **`tokens.css`** - CSS custom properties and design tokens
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Custom Properties**: Required for token system
- **CSS Animations**: Required for keyframe animations
- **CSS Grid/Flexbox**: Required for layout utilities

## 📚 Related Packages

- **`@casoon/tailwindcss-scroll`** - Scroll-triggered animations
- **`@casoon/tailwindcss-effects`** - Meta package with all effects

## 🤝 Contributing

Contributions are welcome! Please ensure all animations respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

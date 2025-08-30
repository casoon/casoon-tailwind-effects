# @casoon/tailwindcss-orbs

A beautiful orb background library for Tailwind CSS v4, providing decorative orb elements, floating backgrounds, and subtle visual enhancements. Built with CSS custom properties for easy customization and consistent design tokens.

## ✨ Features

- **Orb Backgrounds** - Beautiful floating orb elements for backgrounds
- **Multiple Sizes** - Small, medium, large, and extra-large orb variants
- **Color Variants** - Pre-built color schemes with opacity support
- **Customizable Tokens** - CSS custom properties for easy theming
- **Performance Optimized** - Efficient CSS with minimal repaints
- **Accessibility First** - Non-intrusive decorative elements
- **Responsive Design** - Mobile-first approach with consistent spacing

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-orbs/index.css";
```

## 🌓 Dark Mode

- Orbs use background tokens; no special setup is required. Add `.dark` on the root to switch themes and override `--bg-glow-*` per mode.

## 🎯 Basic Usage

### 1. Simple Orb Background
```html
<div class="bg-orbs">
  <h2>Content with Orb Background</h2>
  <p>Beautiful floating orb effect</p>
</div>
```

### 2. Size Variants
```html
<div class="orb orb-sm"></div>
<div class="orb orb-md"></div>
<div class="orb orb-lg"></div>
```

### 3. Color Variants
```html
<!-- Use tokens or Tailwind bg utilities on wrappers to influence glow colors -->
<div class="orb orb-md" style="--bg-glow-2:#60a5fa"></div>
<div class="orb orb-md" style="--bg-glow-2:#a78bfa"></div>
<div class="orb orb-md" style="--bg-glow-2:#34d399"></div>
```

## 🎨 Available Classes

### Base Orb
- **`.orb-bg`** - Base orb background component
 - Also supports interaction utilities like `orb-hover-*` below

### Size Variants
- **`.orb-size-sm`** - Small orb (default)
- **`.orb-size-md`** - Medium orb
- **`.orb-size-lg`** - Large orb
- **`.orb-size-xl`** - Extra large orb

### Color Variants
- **`.orb-color-blue-500/20`** - Blue orb with 20% opacity
- **`.orb-color-purple-500/30`** - Purple orb with 30% opacity
- **`.orb-color-green-500/25`** - Green orb with 25% opacity
- **`.orb-color-pink-500/15`** - Pink orb with 15% opacity
- **`.orb-color-yellow-500/25`** - Yellow orb with 25% opacity
- **`.orb-color-red-500/20`** - Red orb with 20% opacity
- **`.orb-color-indigo-500/25`** - Indigo orb with 25% opacity
- **`.orb-color-teal-500/20`** - Teal orb with 20% opacity

### Interactions & Transitions
- **`.orb-hover-scale`** - Scales the orb slightly on hover
- **`.orb-hover-glow`** - Adds a soft glow outline on hover
- **`.orb-hover-blur`** - Applies a subtle blur + saturation on hover
- **`.orb-transition-fast`** - Faster transitions for orb state changes
- **`.orb-transition-slow`** - Slower, smoother transitions

### Responsive Presets
- **`.orb-responsive-sm`** - Responsive small size via `clamp()`
- **`.orb-responsive-md`** - Responsive medium size via `clamp()`
- **`.orb-responsive-lg`** - Responsive large size via `clamp()`

### Custom Opacity
- **`.orb-color-{color}-{opacity}`** - Any Tailwind color with custom opacity

## 🔧 Advanced Usage

### Multiple Orbs
```html
<div class="relative overflow-hidden">
  <div class="orb-bg orb-size-lg orb-color-blue-500/20 absolute top-10 left-10"></div>
  <div class="orb-bg orb-size-md orb-color-purple-500/30 absolute top-32 right-20"></div>
  <div class="orb-bg orb-size-sm orb-color-green-500/25 absolute bottom-20 left-1/2"></div>
  
  <div class="relative z-10 p-8">
    <h1>Content with Multiple Orbs</h1>
    <p>Beautiful layered orb background</p>
  </div>
</div>
```

### Orb with Content
```html
<div class="orb-bg orb-size-lg orb-color-blue-500/20 orb-hover-scale orb-transition-fast p-8 rounded-2xl">
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Feature Title</h2>
    <p class="text-gray-700">Description of the feature with beautiful orb background</p>
  </div>
</div>
```

### Responsive Orbs
```html
<div class="bg-orbs orb-responsive-sm md:orb-responsive-md lg:orb-responsive-lg orb-hover-glow orb-transition-slow">
  <div class="p-6">
    <h3>Responsive Orb</h3>
    <p>This orb changes size based on screen size</p>
  </div>
</div>
```

## 🎭 Examples

### Hero Preset
```html
<section class="min-h-[60svh] bg-orbs-hero text-white grid place-items-center p-8">
  <div class="max-w-prose text-center">
    <h1 class="text-4xl font-bold mb-4">Stunning Hero</h1>
    <p class="text-white/80">Beautiful orb glows with a subtle base gradient.</p>
  </div>
</section>
```

Note: On mobile, we avoid `background-attachment: fixed` to reduce jank (handled in CSS via a media query override).

### Parallax (CSS‑only)
```html
<section class="min-h-[60svh] bg-orbs-parallax grid place-items-center p-8">
  <h2 class="text-3xl font-semibold">Parallax‑style Background</h2>
</section>
```
Tweak speed using `--orbs-parallax-speed` (e.g., `24s`–`60s`). `prefers-reduced-motion` disables the animation.

## 🎨 Theme Overrides

Orbs read from background tokens; define them per mode:

```css
:root {
  --bg-base-from:#0ea5e9;
  --bg-base-to:#6366f1;
  --bg-glow-1:#22d3ee;
  --bg-glow-2:#a78bfa;
  --bg-glow-3:#f472b6;
}
:where(.dark){
  --bg-base-from:#0b1220;
  --bg-base-to:#0f172a;
  --bg-glow-1:#22d3ee;
  --bg-glow-2:#a78bfa;
  --bg-glow-3:#f472b6;
}
```

### Hero Section with Orbs
```html
<div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
  <!-- Background Orbs -->
  <div class="orb-bg orb-size-xl orb-color-blue-500/20 absolute top-20 left-20"></div>
  <div class="orb-bg orb-size-lg orb-color-purple-500/30 absolute top-40 right-32"></div>
  <div class="orb-bg orb-size-md orb-color-pink-500/25 absolute bottom-32 left-1/3"></div>
  
  <!-- Content -->
  <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
    <div class="text-center text-white">
      <h1 class="text-5xl font-bold mb-6">
        Welcome to the Future
      </h1>
      <p class="text-xl mb-8 opacity-90 max-w-2xl">
        Experience the beauty of modern design with our cutting-edge orb backgrounds and visual effects.
      </p>
      <button class="bg-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors">
        Get Started
      </button>
    </div>
  </div>
</div>
```

### Feature Grid with Orbs
```html
<div class="min-h-screen bg-gray-50 p-8">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-12">Our Features</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="orb-bg orb-size-md orb-color-blue-500/20 p-6 rounded-xl text-center">
        <div class="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
        <p class="text-gray-600">Blazing fast performance with modern optimization techniques.</p>
      </div>
      
      <div class="orb-bg orb-size-md orb-color-purple-500/20 p-6 rounded-xl text-center">
        <div class="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Reliable</h3>
        <p class="text-gray-600">Built with reliability and stability in mind.</p>
      </div>
      
      <div class="orb-bg orb-size-md orb-color-green-500/20 p-6 rounded-xl text-center">
        <div class="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Beautiful</h3>
        <p class="text-gray-600">Stunning visual design that captivates users.</p>
      </div>
    </div>
  </div>
</div>
```

### Card with Floating Orbs
```html
<div class="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-8">
  <div class="max-w-4xl mx-auto">
    <div class="relative overflow-hidden">
      <!-- Floating Orbs -->
      <div class="orb-bg orb-size-lg orb-color-white/20 absolute -top-10 -right-10"></div>
      <div class="orb-bg orb-size-md orb-color-white/15 absolute -bottom-8 -left-8"></div>
      
      <!-- Content Card -->
      <div class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl relative z-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Welcome to Our Platform</h2>
        <p class="text-gray-600 text-lg mb-6">
          Experience the perfect blend of functionality and aesthetics with our modern design system.
          The floating orbs create a subtle, engaging background that enhances your content.
        </p>
        <div class="flex space-x-4">
          <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Learn More
          </button>
          <button class="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Dashboard with Subtle Orbs
```html
<div class="min-h-screen bg-gray-100">
  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <nav class="space-y-2">
        <a href="#overview" class="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          Overview
        </a>
        <a href="#analytics" class="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          Analytics
        </a>
        <a href="#reports" class="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          Reports
        </a>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div class="relative overflow-hidden">
        <!-- Background Orbs -->
        <div class="orb-bg orb-size-lg orb-color-blue-500/10 absolute top-20 right-20"></div>
        <div class="orb-bg orb-size-md orb-color-purple-500/15 absolute bottom-20 left-20"></div>
        
        <!-- Content -->
        <div class="relative z-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h2>
          <p class="text-gray-600 text-lg mb-8">
            Here's what's happening with your projects today.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Active Projects</h3>
              <p class="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Completed Tasks</h3>
              <p class="text-3xl font-bold text-green-600">89</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Team Members</h3>
              <p class="text-3xl font-bold text-purple-600">24</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

## 🎨 Customization

### CSS Variables
Override default values with CSS custom properties:

```css
:root {
  --orb-size-sm: 120px;
  --orb-size-md: 200px;
  --orb-size-lg: 300px;
  --orb-size-xl: 400px;
  --orb-blur: 40px;
  --orb-opacity: 0.2;
}
```

### Custom Orb Classes
Create your own orb effects:

```css
.orb-custom {
  position: absolute;
  width: var(--orb-size);
  height: var(--orb-size);
  background: var(--orb-color);
  border-radius: 50%;
  filter: blur(var(--orb-blur));
  opacity: var(--orb-opacity);
}
```

### Theme Integration
```css
/* Light theme */
.orb-theme-light {
  --orb-color-blue: rgba(59, 130, 246, 0.1);
  --orb-color-purple: rgba(147, 51, 234, 0.1);
  --orb-color-green: rgba(34, 197, 94, 0.1);
}

/* Dark theme */
.orb-theme-dark {
  --orb-color-blue: rgba(59, 130, 246, 0.2);
  --orb-color-purple: rgba(147, 51, 234, 0.2);
  --orb-color-green: rgba(34, 197, 94, 0.2);
}
```

## ♿ Accessibility

### Decorative Elements
- Orbs are purely decorative and don't interfere with content
- Maintain sufficient contrast for content readability
- Ensure orbs don't create visual noise that distracts from content

### Focus Management
- Orbs don't interfere with focus indicators
- Maintain clear focus visibility on interactive elements
- Test with high contrast mode enabled

### Screen Reader Support
- Orbs are ignored by screen readers (decorative)
- Maintain semantic HTML structure
- Ensure proper heading hierarchy

## 🔧 Integration

### With Tailwind CSS
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-orbs/index.css";

/* Combine with Tailwind utilities */
.my-orb-component {
  @apply orb-bg orb-size-lg orb-color-blue-500/20 p-6 rounded-xl;
}
```

### With JavaScript Frameworks
```jsx
// React example
const OrbCard = ({ title, children, size = 'md', color = 'blue' }) => (
  <div className={`orb-bg orb-size-${size} orb-color-${color}-500/20 p-6 rounded-xl`}>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
);
```

### With CSS-in-JS
```javascript
// Styled-components example
const OrbContainer = styled.div`
  ${orbStyles}
  --orb-size: ${props => props.size || '200px'};
  --orb-color: ${props => props.color || 'rgba(59, 130, 246, 0.2)'};
`;
```

## 📦 Package Contents

- **`index.css`** - Main orb components and utilities
- **`tokens.css`** - CSS custom properties and design tokens
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Custom Properties**: Required for token system
- **CSS Filters**: Required for blur effects
- **CSS Positioning**: Required for absolute positioning

## 📚 Related Packages

- **`@casoon/tailwindcss-effects`** - Meta package with all effects
- **`@casoon/tailwindcss-utilities`** - Layout and utility components

## 🤝 Contributing

Contributions are welcome! Please ensure all components respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

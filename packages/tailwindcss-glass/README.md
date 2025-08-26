# @casoon/tailwindcss-glass

A beautiful glassmorphism library for Tailwind CSS v4, providing modern glass effects, backdrop blur, and translucent components. Built with CSS custom properties for easy customization and consistent design tokens.

## ✨ Features

- **Glassmorphism Effects** - Modern translucent glass components with backdrop blur
- **Backdrop Blur** - Smooth blur effects for content behind glass elements
- **Customizable Tokens** - CSS custom properties for colors, blur, and borders
- **Multiple Variants** - Size, border, and shadow variations
- **Responsive Design** - Mobile-first approach with consistent spacing
- **Accessibility First** - High contrast support and focus management
- **Performance Optimized** - Efficient CSS with minimal repaints

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-glass/index.css";
```

## 🎯 Basic Usage

### 1. Simple Glass Effect
```html
<div class="glass">
  <h2>Glass Card</h2>
  <p>Beautiful translucent effect</p>
</div>
```

### 2. With Background
```html
<div class="glass bg-white/20">
  <h2>Glass with Background</h2>
  <p>Custom background opacity</p>
</div>
```

### 3. Size Variants
```html
<div class="glass glass-sm">Small Glass</div>
<div class="glass glass-md">Medium Glass</div>
<div class="glass glass-lg">Large Glass</div>
```

## 🎨 Available Classes

### Base Glass
- **`.glass`** - Base glassmorphism component with default styling

### Size Variants
- **`.glass-sm`** - Small glass component
- **`.glass-md`** - Medium glass component (default)
- **`.glass-lg`** - Large glass component

### Border Variants
- **`.glass-border`** - Glass with enhanced border styling
- **`.glass-border-thin`** - Thin border variant
- **`.glass-border-thick`** - Thick border variant

### Shadow Variants
- **`.glass-shadow`** - Glass with enhanced shadow
- **`.glass-shadow-soft`** - Soft shadow variant
- **`.glass-shadow-strong`** - Strong shadow variant

### Special Variants
- **`.glass-frosted`** - Extra frosted glass effect
- **`.glass-clear`** - Minimal glass effect
- **`.glass-mirror`** - Mirror-like reflective effect

## 🔧 Advanced Usage

### Glass Card with Custom Background
```html
<div class="glass bg-gradient-to-r from-blue-500/20 to-purple-500/20">
  <h2 class="text-white font-bold">Gradient Glass</h2>
  <p class="text-white/80">Beautiful gradient background</p>
</div>
```

### Glass Navigation
```html
<nav class="glass glass-border bg-white/10 backdrop-blur-md">
  <div class="flex items-center justify-between p-4">
    <h1 class="text-white font-bold">Logo</h1>
    <div class="flex space-x-4">
      <a href="#home" class="text-white/80 hover:text-white">Home</a>
      <a href="#about" class="text-white/80 hover:text-white">About</a>
      <a href="#contact" class="text-white/80 hover:text-white">Contact</a>
    </div>
  </div>
</nav>
```

### Glass Modal
```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center">
  <div class="glass glass-lg glass-shadow max-w-md mx-4 p-6">
    <h2 class="text-xl font-bold mb-4">Modal Title</h2>
    <p class="mb-4">This is a glass modal with backdrop blur.</p>
    <button class="bg-blue-500 text-white px-4 py-2 rounded">
      Close
    </button>
  </div>
</div>
```

### Glass Form Elements
```html
<div class="glass glass-border p-6">
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2">Email</label>
      <input 
        type="email" 
        class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md backdrop-blur-sm"
        placeholder="Enter your email"
      >
    </div>
    <button type="submit" class="w-full bg-white/20 text-white py-2 rounded-md hover:bg-white/30">
      Subscribe
    </button>
  </form>
</div>
```

## 🎭 Examples

### Hero Section with Glass
```html
<div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
  <div class="glass glass-lg glass-shadow text-center p-12 max-w-2xl">
    <h1 class="text-4xl font-bold text-white mb-6">
      Welcome to the Future
    </h1>
    <p class="text-xl text-white/80 mb-8">
      Experience the beauty of modern glassmorphism design with our cutting-edge components.
    </p>
    <button class="bg-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors">
      Get Started
    </button>
  </div>
</div>
```

### Glass Card Grid
```html
<div class="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-8">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="glass glass-border p-6 text-center">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
        <p class="text-white/80">Blazing fast performance with modern optimization techniques.</p>
      </div>
      
      <div class="glass glass-border p-6 text-center">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Reliable</h3>
        <p class="text-white/80">Built with reliability and stability in mind.</p>
      </div>
      
      <div class="glass glass-border p-6 text-center">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Beautiful</h3>
        <p class="text-white/80">Stunning visual design that captivates users.</p>
      </div>
    </div>
  </div>
</div>
```

### Glass Sidebar
```html
<div class="flex min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
  <aside class="w-64 glass glass-border bg-white/5">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-white mb-8">Dashboard</h1>
      
      <nav class="space-y-2">
        <a href="#overview" class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          Overview
        </a>
        <a href="#analytics" class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          Analytics
        </a>
        <a href="#reports" class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          Reports
        </a>
        <a href="#settings" class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          Settings
        </a>
      </nav>
    </div>
  </aside>
  
  <main class="flex-1 p-8">
    <div class="glass glass-border p-8">
      <h2 class="text-3xl font-bold text-white mb-6">Welcome Back</h2>
      <p class="text-white/80 text-lg">
        This is your main content area with a beautiful glass background.
      </p>
    </div>
  </main>
</div>
```

## 🎨 Customization

### CSS Variables
Override default values with CSS custom properties:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-blur: 10px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  --glass-radius: 16px;
}
```

### Custom Glass Variants
Create your own glass effects:

```css
.glass-custom {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow);
}
```

### Theme Integration
```css
/* Light theme */
.glass-theme-light {
  --glass-bg: rgba(0, 0, 0, 0.05);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
.glass-theme-dark {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

## ♿ Accessibility

### Contrast Considerations
- Ensure sufficient contrast between text and glass backgrounds
- Use semi-transparent backgrounds for better readability
- Consider dark text on light glass for better accessibility

### Focus Management
- Maintain clear focus indicators on interactive elements
- Ensure glass effects don't interfere with focus visibility
- Test with high contrast mode enabled

### Screen Reader Support
- Maintain semantic HTML structure
- Ensure proper heading hierarchy
- Use descriptive text for glass elements

## 🔧 Integration

### With Tailwind CSS
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-glass/index.css";

/* Combine with Tailwind utilities */
.my-glass-component {
  @apply glass glass-lg bg-blue-500/20 text-white p-6;
}
```

### With JavaScript Frameworks
```jsx
// React example
const GlassCard = ({ title, children, variant = 'default' }) => (
  <div className={`glass ${variant === 'large' ? 'glass-lg' : ''}`}>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
);
```

### With CSS-in-JS
```javascript
// Styled-components example
const GlassContainer = styled.div`
  ${glassStyles}
  background: ${props => props.bg || 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.border || 'rgba(255, 255, 255, 0.2)'};
`;
```

## 📦 Package Contents

- **`index.css`** - Main glass components and utilities
- **`tokens.css`** - CSS custom properties and design tokens
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Custom Properties**: Required for token system
- **Backdrop Filter**: Required for blur effects (fallback for older browsers)
- **CSS Grid/Flexbox**: Required for layout utilities

## 📚 Related Packages

- **`@casoon/tailwindcss-effects`** - Meta package with all effects
- **`@casoon/tailwindcss-utilities`** - Layout and utility components

## 🤝 Contributing

Contributions are welcome! Please ensure all components respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

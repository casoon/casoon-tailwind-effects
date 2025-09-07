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
<div class="cs-glass">
  <h2>Glass Card</h2>
  <p>Beautiful translucent effect</p>
</div>
```

### 2. With Background
```html
<div class="cs-glass bg-white/20">
  <h2>Glass with Background</h2>
  <p>Custom background opacity</p>
</div>
```

### 3. Size Variants
```html
<div class="cs-glass cs-glass-sm">Small Glass</div>
<div class="cs-glass cs-glass-lg">Large Glass</div>
```

## 🎨 Available Classes

### Base Glass
- **`.cs-glass`** - Base glassmorphism component with default styling
- **`.cs-glass-dark`** - Dark variant with dark background

### Size Variants
- **`.cs-glass-sm`** - Small glass component (8px blur)
- **`.cs-glass-lg`** - Large glass component (24px blur)

### Intensity Variants
- **`.cs-glass-weak`** - Weak glass effect (4px blur)
- **`.cs-glass-medium`** - Medium glass effect (16px blur)
- **`.cs-glass-strong`** - Strong glass effect (32px blur)

### Color Variants
- **`.cs-glass-blue`** - Blue tinted glass
- **`.cs-glass-purple`** - Purple tinted glass
- **`.cs-glass-green`** - Green tinted glass
- **`.cs-glass-pink`** - Pink tinted glass
- **`.cs-glass-amber`** - Amber tinted glass

### Border Radius Variants
- **`.cs-glass-rounded-sm`** - Small border radius (0.25rem)
- **`.cs-glass-rounded`** - Default border radius (0.5rem)
- **`.cs-glass-rounded-lg`** - Large border radius (0.75rem)
- **`.cs-glass-rounded-xl`** - Extra large border radius (1rem)
- **`.cs-glass-rounded-2xl`** - 2XL border radius (1.5rem)
- **`.cs-glass-rounded-3xl`** - 3XL border radius (2rem)

### Shadow Variants
- **`.cs-glass-shadow-sm`** - Small shadow
- **`.cs-glass-shadow`** - Default shadow
- **`.cs-glass-shadow-lg`** - Large shadow
- **`.cs-glass-shadow-xl`** - Extra large shadow

### Component Classes
- **`.cs-glass-card`** - Complete glass card component
- **`.cs-glass-card-light`** - Light variant glass card
- **`.cs-glass-nav`** - Glass navigation component
- **`.cs-glass-nav-light`** - Light variant navigation
- **`.cs-glass-button`** - Interactive glass button
- **`.cs-glass-toast`** - Glass toast notification
- **`.cs-glass-tooltip`** - Glass tooltip component
- **`.cs-glass-dropdown`** - Glass dropdown component
- **`.cs-glass-responsive`** - Responsive glass with container queries

## 🔧 Advanced Usage

### Glass Card with Custom Background
```html
<div class="cs-glass bg-gradient-to-r from-blue-500/20 to-purple-500/20">
  <h2 class="text-white font-bold">Gradient Glass</h2>
  <p class="text-white/80">Beautiful gradient background</p>
</div>
```

### Glass Navigation
```html
<nav class="cs-glass-nav bg-white/10">
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
  <div class="cs-glass cs-glass-lg cs-glass-shadow max-w-md mx-4 p-6">
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
<div class="cs-glass-card p-6">
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2">Email</label>
      <input 
        type="email" 
        class="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md backdrop-blur-sm"
        placeholder="Enter your email"
      >
    </div>
    <button type="submit" class="w-full cs-glass-button">
      Subscribe
    </button>
  </form>
</div>
```

## 🎭 Examples

### Hero Section with Glass
```html
<div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
  <div class="cs-glass-card text-center max-w-2xl">
    <h1 class="text-4xl font-bold text-white mb-6">
      Welcome to the Future
    </h1>
    <p class="text-xl text-white/80 mb-8">
      Experience the beauty of modern glassmorphism design with our cutting-edge components.
    </p>
    <button class="cs-glass-button">
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
      <div class="cs-glass-card text-center">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
        <p class="text-white/80">Blazing fast performance with modern optimization techniques.</p>
      </div>
      
      <div class="cs-glass-card text-center">
        <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">Reliable</h3>
        <p class="text-white/80">Built with reliability and stability in mind.</p>
      </div>
      
      <div class="cs-glass-card text-center">
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
  <aside class="w-64 cs-glass-nav bg-white/5">
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
    <div class="cs-glass-card">
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
  --cs-glass-bg: rgba(255, 255, 255, 0.1);
  --cs-glass-border: rgba(255, 255, 255, 0.2);
  --cs-glass-blur: 10px;
  --cs-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  --cs-glass-radius: 16px;
}
```

### Custom Glass Variants
Create your own glass effects:

```css
.glass-custom {
  background: var(--cs-glass-bg);
  border: 1px solid var(--cs-glass-border);
  border-radius: var(--cs-glass-radius);
  backdrop-filter: blur(var(--cs-glass-blur));
  box-shadow: var(--cs-glass-shadow);
}
```

### Theme Integration
```css
/* Light theme */
.glass-theme-light {
  --cs-glass-bg: rgba(0, 0, 0, 0.05);
  --cs-glass-border: rgba(0, 0, 0, 0.1);
  --cs-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
.glass-theme-dark {
  --cs-glass-bg: rgba(255, 255, 255, 0.1);
  --cs-glass-border: rgba(255, 255, 255, 0.2);
  --cs-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

## 🌓 Dark Mode

- Enable Tailwind dark mode by toggling the `.dark` class on a root element. Our tokens provide OS fallback via `prefers-color-scheme`.
- Example overrides:

```css
:root { /* light */
  --cs-glass-bg: rgba(255,255,255,.08);
  --cs-nav-bg: var(--cs-glass-bg);
}
:where(.dark) { /* dark */
  --cs-glass-bg: rgba(15,23,42,.90);
  --cs-nav-bg: var(--cs-glass-bg);
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

## 🧪 Testing & Quality Assurance

This package includes automated testing to prevent accidental removal or renaming of CSS classes:

### Class Compatibility Testing

```bash
# Run all compatibility tests (recommended before publishing)
npm test

# Extract and compare classes with definitions
npm run test:classes

# Run comprehensive compatibility test suite
npm run test:compatibility

# Validate package integrity
npm run validate
```

### Test Suite Features

- **🔍 Class Extraction**: Automatically extracts all CSS classes from plugin.js
- **📋 Definition Comparison**: Compares against `class-definitions.json` for consistency
- **🚨 Breaking Change Detection**: Identifies removal of critical classes
- **⚡ Webkit Prefix Validation**: Ensures browser compatibility prefixes are present
- **✅ Syntax Validation**: Verifies plugin structure and exports
- **🔒 Pre-publish Hooks**: Automatically runs tests before publishing

### Critical Classes

These classes are considered critical and cannot be removed without a major version bump:
```
.glass, .glass-dark, .glass-sm, .glass-lg,
.glass-card, .glass-card-light, 
.glass-nav, .glass-nav-light, .glass-button
```

### Adding New Classes

When adding new classes:
1. Add the class to `plugin.js`
2. Run `npm run test:classes` to see new classes
3. Update `class-definitions.json` to include new classes
4. Run `npm test` to verify everything works

## 📦 Package Contents

- **`plugin.js`** - Main Tailwind CSS plugin
- **`class-definitions.json`** - Class compatibility reference
- **`scripts/`** - Testing and validation scripts
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


## 🎨 Theme Overrides

Quick per‑mode overrides for core glass tokens:

```css
:root {
  --cs-glass-bg: rgba(255,255,255,.08);
  --cs-glass-border: rgba(255,255,255,.15);
  --cs-glass-shadow: 0 8px 32px rgba(0,0,0,.30);
  --cs-glass-fg: #fff;
}
:where(.dark) {
  --cs-glass-bg: rgba(15,23,42,.90);
  --cs-glass-border: rgba(255,255,255,.28);
  --cs-glass-shadow: 0 12px 32px rgba(0,0,0,.45);
  --cs-glass-fg: #e5e7eb;
}
```

---

**Made with ❤️ by the Casoon team**

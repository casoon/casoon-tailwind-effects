# @casoon/tailwindcss-navigation

A comprehensive navigation component library for Tailwind CSS v4, featuring flexible navigation patterns, subnav systems, and responsive navigation solutions. Built with accessibility and customization in mind.

## ✨ Features

- **Flexible Navigation** - Horizontal, vertical, and responsive navigation layouts
- **Multiple Variants** - Underline, tabs, pills, ghost, and custom styles
- **Subnav Support** - Dropdown menus and flyout navigation
- **Responsive Design** - Mobile-first with breakpoint switching
- **Accessibility First** - ARIA support, keyboard navigation, and screen reader friendly
- **Customizable Themes** - Light/dark theme support and custom styling
- **Performance Optimized** - CSS-only solutions with minimal JavaScript requirements

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-navigation/index.css";
```

## 🌓 Dark Mode

- Tokens include light and dark values. Enable Tailwind dark mode with `.dark` at the root; OS fallback is supported.
- Example overrides:

```css
:root { /* light */
  --nav-bg: #ffffff;
  --nav-fg: #0f172a;
}
:where(.dark) { /* dark */
  --nav-bg: rgba(15,23,42,.90);
  --nav-fg: #e5e7eb;
}
```

## 🎯 Basic Usage

### 1. Simple Navigation
```html
<nav class="nav nav--horizontal">
  <a href="#home" class="nav-link">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#contact" class="nav-link">Contact</a>
</nav>
```

### 2. With Surface Container
```html
<nav class="nav nav--horizontal nav-surface">
  <a href="#home" class="nav-link">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#contact" class="nav-link nav-link--primary">Get Started</a>
</nav>
```

### 3. Responsive Navigation
```html
<nav class="nav nav--switch-md">
  <a href="#home" class="nav-link">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#contact" class="nav-link">Contact</a>
</nav>
```

## 🎨 Available Classes

### Core Navigation
- **`.nav`** - Base navigation container
- **`.nav-item`** - Navigation item wrapper
- **`.nav-link`** - Navigation link with hover effects

### Density Variants
- **`.nav--compact`** - Tight spacing for dense layouts
- **`.nav--roomy`** - Generous spacing for prominent navigation

### Surface & Container
- **`.nav-surface`** - Surface container with background and border
- **`.nav--horizontal`** - Horizontal layout (default)
- **`.nav--vertical`** - Vertical layout
- **`.nav--justify`** - Justify content between items

### Style Variants
- **`.nav--underline`** - Underline indicator for active items
- **`.nav--tabs`** - Tab-style navigation
- **`.nav--pills`** - Pill-style navigation
- **`.nav--ghost`** - Minimal styling with hover effects

### Special Links
- **`.nav-link--primary`** - Primary CTA button with gradient text
- **`.nav-link[aria-current="page"]`** - Active page indicator
- **`.nav-link[data-active="true"]`** - Programmatic active state

### Subnav System
- **`.subnav`** - Subnav container
- **`.subnav-toggle`** - Subnav trigger button
- **`.subnav-panel`** - Dropdown/flyout panel
- **`.subnav-link`** - Subnav menu items

### Utility Classes
- **`.nav-wrap`** - Flexible wrapping navigation
- **`.nav-scroll-x`** - Horizontal scrolling navigation
- **`.nav-scroll-y`** - Vertical scrolling navigation
- **`.nav--switch-md`** - Responsive switching at medium breakpoint

### Dividers & Badges
- **`.nav-divider-horizontal`** - Horizontal divider line
- **`.nav-divider-vertical`** - Vertical divider line
- **`.nav-badge`** - Notification badge

### Theme Support
- **`.nav-theme-light`** - Light theme styling
- **`.nav-theme-dark`** - Dark theme styling

## 📚 Sidebar

Build vertical, sticky sidebars using dedicated helpers:

```html
<aside class="sidebar sidebar-sticky sidebar-scroll" style="--sidebar-top: 4rem">
  <div class="sidebar-section">
    <div class="sidebar-heading">Docs</div>
    <a class="sidebar-link" href="#intro">Introduction</a>
    <a class="sidebar-link" href="#install" aria-current="page">Installation</a>
  </div>

  <details class="sidebar-group">
    <summary>Guides</summary>
    <ul class="sidebar-nested sidebar--marker">
      <li class="sidebar-level-1"><a class="sidebar-link" href="#setup">Setup</a></li>
      <li class="sidebar-level-1"><a class="sidebar-link" href="#theming" data-active="true">Theming</a></li>
      <li class="sidebar-level-1"><a class="sidebar-link" href="#deploy">Deploy</a></li>
    </ul>
  </details>
</aside>
```

Helpers
- `.sidebar`: vertical rail with `--sidebar-width`, uses `--nav-*` tokens
- `.sidebar-sticky`: `position: sticky; top: var(--sidebar-top)`
- `.sidebar-scroll`: constrained scroll area (100dvh)
- `.sidebar-section`, `.sidebar-heading`: structure + small heading style
- `.sidebar-link`: full-width link; hover/active use nav tokens
- `.sidebar--marker`: active left marker via `--sidebar-active-marker`
- `.sidebar-nested` + `.sidebar-level-1..3`: nested indent control
- `.sidebar-group` (`<details>`): collapsible section with animated expand

### Mobile Sidebar (Drawer)

```html
<button id="openSidebar" class="nav-link">Menu</button>
<div class="sidebar-overlay" id="sidebarOverlay"></div>
<aside class="sidebar-drawer" id="sidebarDrawer" aria-expanded="false">
  <nav class="sidebar sidebar-scroll">
    <div class="sidebar-section">
      <div class="sidebar-heading">Menu</div>
      <a class="sidebar-link" href="#home">Home</a>
      <a class="sidebar-link" href="#about">About</a>
    </div>
  </nav>
  <!-- place a close button inside for accessibility -->
  <button class="nav-link" id="closeSidebar">Close</button>
  <!-- toggle by setting [data-open=true] or [aria-expanded=true] on .sidebar-drawer and .sidebar-overlay -->
</aside>
```

JS (example):
```js
import { initSidebarDrawer } from '@casoon/tailwindcss-navigation/nav.js';

const drawer = document.getElementById('sidebarDrawer');
const overlay = document.getElementById('sidebarOverlay');
const trigger = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');

// Adds focus-trap, Escape to close, overlay-click to close, focus restore
const controls = initSidebarDrawer({ trigger, drawer, overlay, closeButton: closeBtn });
```

### Mobile Top Nav

Use existing helpers for overlays and panels:
```html
<button id="openMenu" class="nav-link">Menu</button>
<div class="mobile-menu-overlay" id="menuOverlay"></div>
<div class="mobile-menu-slide" id="menuPanel" aria-expanded="false">
  <nav class="nav nav--vertical p-2">
    <a class="nav-link" href="#home">Home</a>
    <a class="nav-link" href="#about">About</a>
  </nav>
</div>
```

### Active Link Sync (Observer)

```js
import { initActiveLinkSync } from '@casoon/tailwindcss-navigation/nav.js';
const teardown = initActiveLinkSync();
```

### Accessibility Notes
- Drawer toggles `aria-expanded` on the panel and keeps focus within the drawer using a focus trap.
- Escape closes the drawer; focus returns to the element that opened it.
- The overlay is clickable to dismiss and does not trap scroll behind it.
- Ensure triggers reference the drawer with `aria-controls` when possible.

## 🎨 Theme Overrides

Set surface and text tokens per mode:

```css
:root {
  --nav-bg:#fff;
  --nav-fg:#0f172a;
  --nav-border:rgba(0,0,0,.12);
  --nav-bg-hover: rgba(0,0,0,.06);
}
:where(.dark){
  --nav-bg:rgba(15,23,42,.90);
  --nav-fg:#e5e7eb;
  --nav-border:rgba(255,255,255,.28);
  --nav-bg-hover: rgba(255,255,255,.10);
}
```

## 🔧 Advanced Usage

### Underline Navigation
```html
<nav class="nav nav--horizontal nav--underline">
  <a href="#home" class="nav-link" aria-current="page">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#services" class="nav-link">Services</a>
  <a href="#contact" class="nav-link">Contact</a>
</nav>
```

### Tab Navigation
```html
<nav class="nav nav--tabs">
  <a href="#tab1" class="nav-link" aria-current="page">Tab 1</a>
  <a href="#tab2" class="nav-link">Tab 2</a>
  <a href="#tab3" class="nav-link">Tab 3</a>
</nav>
```

### Pill Navigation
```html
<nav class="nav nav--pills">
  <a href="#filter1" class="nav-link">All</a>
  <a href="#filter2" class="nav-link" aria-current="page">Active</a>
  <a href="#filter3" class="nav-link">Completed</a>
</nav>
```

### Subnav with Flyout
```html
<nav class="nav nav--horizontal">
  <a href="#home" class="nav-link">Home</a>
  
  <div class="subnav">
    <button class="subnav-toggle">Products</button>
    <div class="subnav-panel">
      <a href="#product1" class="subnav-link">Product 1</a>
      <a href="#product2" class="subnav-link">Product 2</a>
      <a href="#product3" class="subnav-link">Product 3</a>
    </div>
  </div>
  
  <a href="#contact" class="nav-link">Contact</a>
</nav>
```

### Responsive Navigation
```html
<nav class="nav nav--switch-md nav-surface">
  <div class="nav--horizontal md:flex-col">
    <a href="#home" class="nav-link">Home</a>
    <a href="#about" class="nav-link">About</a>
    <a href="#services" class="nav-link">Services</a>
    <a href="#contact" class="nav-link nav-link--primary">Contact</a>
  </div>
</nav>
```

### Scrolling Navigation
```html
<nav class="nav nav--horizontal nav-scroll-x">
  <a href="#item1" class="nav-link">Item 1</a>
  <a href="#item2" class="nav-link">Item 2</a>
  <a href="#item3" class="nav-link">Item 3</a>
  <a href="#item4" class="nav-link">Item 4</a>
  <a href="#item5" class="nav-link">Item 5</a>
  <a href="#item6" class="nav-link">Item 6</a>
</nav>
```

## 🎭 Examples

### Main Navigation Bar
```html
<header class="bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="nav nav--horizontal nav--justify">
      <div class="nav--horizontal">
        <a href="#logo" class="text-xl font-bold">Logo</a>
      </div>
      
      <div class="nav--horizontal">
        <a href="#home" class="nav-link">Home</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#services" class="nav-link">Services</a>
        <a href="#contact" class="nav-link nav-link--primary">Get Started</a>
      </div>
    </nav>
  </div>
</header>
```

### Sidebar Navigation
```html
<aside class="w-64 bg-gray-50 border-r border-gray-200">
  <nav class="nav nav--vertical nav--roomy p-4">
    <a href="#dashboard" class="nav-link" aria-current="page">
      Dashboard
    </a>
    
    <div class="subnav">
      <button class="subnav-toggle">Analytics</button>
      <div class="subnav-panel">
        <a href="#reports" class="subnav-link">Reports</a>
        <a href="#metrics" class="subnav-link">Metrics</a>
        <a href="#insights" class="subnav-link">Insights</a>
      </div>
    </div>
    
    <a href="#settings" class="nav-link">Settings</a>
    <a href="#profile" class="nav-link">Profile</a>
  </nav>
</aside>
```

### Tabbed Interface
```html
<div class="bg-white rounded-lg border border-gray-200">
  <nav class="nav nav--tabs border-b border-gray-200">
    <a href="#overview" class="nav-link" aria-current="page">Overview</a>
    <a href="#details" class="nav-link">Details</a>
    <a href="#settings" class="nav-link">Settings</a>
  </nav>
  
  <div class="p-6">
    <div id="overview" class="tab-content">
      <h2>Overview Content</h2>
      <p>This is the overview tab content.</p>
    </div>
  </div>
</div>
```

### Mobile-First Navigation
```html
<nav class="nav nav--switch-md nav-surface">
  <!-- Mobile: Vertical, Desktop: Horizontal -->
  <div class="nav--horizontal md:flex-row">
    <a href="#home" class="nav-link">Home</a>
    <a href="#about" class="nav-link">About</a>
    <a href="#services" class="nav-link">Services</a>
    <a href="#contact" class="nav-link nav-link--primary">Contact</a>
  </div>
</nav>
```

## 🎨 Customization

### CSS Variables
Override default values with CSS custom properties:

```css
:root {
  --nav-gap: 1rem;
  --nav-link-py: 0.5rem;
  --nav-link-px: 1rem;
  --nav-link-radius: 0.375rem;
  --nav-fg: #374151;
  --nav-bg-hover: #f3f4f6;
  --nav-accent-from: #3b82f6;
  --nav-accent-to: #1d4ed8;
}
```

### Custom Themes
Create your own navigation themes:

```css
.nav-theme-custom {
  --nav-bg: var(--custom-bg);
  --nav-fg: var(--custom-fg);
  --nav-bg-hover: var(--custom-hover);
  --nav-border: var(--custom-border);
}
```

### Custom Variants
Extend the library with your own navigation styles:

```css
.nav--custom .nav-link {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border-radius: 20px;
  padding: 0.75rem 1.5rem;
}
```

## ♿ Accessibility

### ARIA Support
- **`aria-current="page"`** - Indicates current page
- **`aria-expanded`** - For subnav panels
- **`aria-label`** - For navigation descriptions

### Keyboard Navigation
- Tab navigation through all links
- Enter/Space activation for subnav toggles
- Escape key closes subnav panels
- Arrow key navigation in subnav menus

### Screen Reader Support
- Semantic navigation structure
- Proper heading hierarchy
- Descriptive link text
- Hidden content for screen readers

## 🔧 Integration

### With JavaScript Frameworks
```javascript
// React example
const [activeTab, setActiveTab] = useState('overview');

<nav className="nav nav--tabs">
  <a 
    href="#overview" 
    className={`nav-link ${activeTab === 'overview' ? 'aria-current="page"' : ''}`}
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </a>
</nav>
```

### With State Management
```javascript
// Vue example
<template>
  <nav class="nav nav--tabs">
    <a 
      v-for="tab in tabs" 
      :key="tab.id"
      :href="`#${tab.id}`"
      :class="['nav-link', { 'aria-current="page"': activeTab === tab.id }]"
      @click="activeTab = tab.id"
    >
      {{ tab.label }}
    </a>
  </nav>
</template>
```

## 📦 Package Contents

- **`index.css`** - Main navigation components and utilities
- **`tokens.css`** - CSS custom properties and design tokens
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Custom Properties**: Required for token system
- **CSS Grid/Flexbox**: Required for layouts
- **CSS Container Queries**: Optional enhancement for responsive features

## 📚 Related Packages

- **`@casoon/tailwindcss-effects`** - Meta package with all effects
- **`@casoon/tailwindcss-utilities`** - Layout and utility components

## 🤝 Contributing

Contributions are welcome! Please ensure all components respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

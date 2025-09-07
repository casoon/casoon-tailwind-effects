# @casoon/tailwindcss-utilities

A comprehensive utility library for Tailwind CSS v4, providing practical layout components, responsive grids, typography helpers, and form utilities. Built with a neutral design system that adapts to any project.

## ✨ Features

- **Layout Components** - Container, sections, hero areas, and grid systems
- **Responsive Design** - Mobile-first responsive utilities with CSS Container Queries
- **Typography Helpers** - Text utilities, balance, truncation, and line clamping
- **Form Components** - Inputs, buttons, and form layouts with consistent styling
- **Card System** - Flexible card components with hover effects and variants
- **Accessibility First** - Focus management, screen reader support, and motion safety
- **Design Token System** - CSS custom properties for consistent spacing and colors

## 🚀 Quick Start

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-utilities/index.css";
```

## 🎯 Basic Usage

### 1. Page Layout
```html
<div class="cs-page">
  <div class="cs-container">
    <section class="cs-section">
      <h1>Welcome to our site</h1>
    </section>
  </div>
</div>
```

### 2. Responsive Grid
```html
<div class="cs-grid-cards">
  <div class="cs-card cs-card-pad">Card 1</div>
  <div class="cs-card cs-card-pad">Card 2</div>
  <div class="cs-card cs-card-pad">Card 3</div>
</div>
```

### 3. Typography
```html
<p class="cs-text-primary cs-text-balance">
  This text is balanced and uses the primary color
</p>
```

## 🎨 Available Classes

### Page & Surface
- **`.cs-page`** - Full page background and text colors
- **`.cs-surface`** - Surface background with primary text
- **`.cs-surface-elevated`** - Elevated surface with shadow

### Layout & Containers
- **`.cs-container`** - Responsive container with max-width and padding
- **`.cs-section`** - Section with responsive vertical padding
- **`.cs-hero`** - Hero section with centered content and minimum height

### Grid Systems
- **`.cs-stack`** - Vertical stack with consistent gap
- **`.cs-stack-sm`** - Small gap stack
- **`.cs-stack-lg`** - Large gap stack
- **`.cs-cluster`** - Horizontal cluster with wrapping
- **`.cs-grid-cards`** - Auto-fit responsive card grid
- **`.cs-grid-sidebar`** - Content + sidebar layout
- **`.cs-grid-12`** - 12-column utility grid

### Cards
- **`.cs-card`** - Base card with surface background and border
- **`.cs-card-hover-lift`** - Card that lifts on hover
- **`.cs-card-pad`** - Standard card padding
- **`.cs-card-pad-lg`** - Large card padding
- **`.cs-card-inset`** - Inset border variant

### Typography
- **`.cs-text-primary`** - Primary text color
- **`.cs-text-secondary`** - Secondary text color
- **`.cs-text-muted`** - Muted text color
- **`.cs-text-balance`** - Balanced text wrapping
- **`.cs-text-pretty`** - Pretty text wrapping
- **`.cs-text-truncate`** - Single line truncation
- **`.cs-text-2lines`** - Two line truncation
- **`.cs-hyphens-auto`** - Automatic hyphenation

### Media & Aspect Ratios
- **`.cs-aspect`** - Aspect ratio container
- **`.cs-aspect-square`** - Square aspect ratio
- **`.cs-media-fit-cover`** - Cover fit for media
- **`.cs-media-fit-contain`** - Contain fit for media
- **`.cs-media-rounded`** - Rounded media corners

### Forms & Buttons
- **`.cs-input`** - Form input with consistent styling
- **`.cs-btn`** - Button component with hover states
- **`.cs-field`** - Form field with label spacing
- **`.cs-field-inline`** - Inline form field layout
 - **`.cs-input-group`** - Horizontal input group wrapper (merged borders)
 - **`.cs-input-group-horizontal`** - Explicit horizontal group
 - **`.cs-input-group-vertical`** - Vertical stacked group
 - **`.cs-input-addon`** - Text/label/button addon visually attached to inputs

### Accessibility & Focus
- **`.cs-focus-ring`** - Consistent focus ring styling
- **`.cs-visually-hidden`** - Hide content visually, keep accessible
- **`.cs-kbd`** - Keyboard shortcut styling

### Utility Helpers
- **`.cs-safe-pi`** - Safe area padding inline
- **`.cs-safe-pb`** - Safe area padding bottom
- **`.cs-safe-pt`** - Safe area padding top
- **`.cs-center`** - Center content with grid
- **`.cs-max-w-prose`** - Maximum width for readable text

## 🔧 Advanced Usage

### Responsive Grid with Container Queries
```html
<div class="cs-grid-sidebar">
  <main class="cs-section">
    <h1>Main Content</h1>
    <p>This content area adapts to the sidebar</p>
  </main>
  <aside class="cs-section">
    <h2>Sidebar</h2>
    <p>Sidebar content</p>
  </aside>
</div>
```

### 12-Column Grid System
```html
<div class="cs-grid-12">
  <div class="cs-col-span" style="--span: 8">
    <h2>8-column content</h2>
  </div>
  <div class="cs-col-span" style="--span: 4">
    <h2>4-column sidebar</h2>
  </div>
</div>
```

### Form Layouts
```html
<form class="cs-stack">
  <div class="cs-field">
    <label for="name">Name</label>
    <input type="text" id="name" class="cs-input">
  </div>
  
  <div class="cs-field-inline">
    <input type="checkbox" id="agree" class="cs-input">
    <label for="agree">I agree to terms</label>
  </div>
  
  <button type="submit" class="cs-btn">Submit</button>
</form>
```

### Input Groups & Addons
Horizontal group with leading addon:
```html
<div class="cs-input-group">
  <span class="cs-input-addon">@</span>
  <input type="text" class="cs-input" placeholder="username" />
  <span class="cs-input-addon">.com</span>
  <button class="cs-input-addon">Check</button>
  <!-- The group will show a unified focus outline when any child is focused -->
  <!-- Tip: Wrap the entire group in a <label> for clickable prefix/suffix semantics -->
  <!-- Focus state is applied via :focus-within on the group container -->
</div>
```

Vertical group (stacked inputs merged):
```html
<div class="cs-input-group-vertical" style="max-width: 24rem">
  <input type="text" class="cs-input" placeholder="First name" />
  <input type="text" class="cs-input" placeholder="Last name" />
  <div class="cs-input-addon">Optional note</div>
  <button class="cs-btn">Save</button>
  <!-- .cs-input-group-vertical merges adjacent borders and rounds first/last -->
</div>
```

### Card Grid with Hover Effects
```html
<div class="cs-grid-cards">
  <article class="cs-card cs-card-hover-lift cs-card-pad">
    <h3>Article Title</h3>
    <p class="cs-text-secondary">Article description</p>
  </article>
  
  <article class="cs-card cs-card-hover-lift cs-card-pad">
    <h3>Another Article</h3>
    <p class="cs-text-secondary">More content here</p>
  </article>
</div>
```

## 🎭 Examples

### Landing Page Layout
```html
<div class="cs-page">
  <header class="cs-section">
    <div class="cs-container">
      <nav class="cs-cluster">
        <h1>Logo</h1>
        <div class="cs-cluster">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  </header>
  
  <main>
    <section class="cs-hero">
      <div class="cs-container">
        <h1 class="cs-text-primary cs-text-balance">
          Welcome to our amazing platform
        </h1>
        <p class="cs-text-secondary cs-text-balance">
          Discover the power of modern web development
        </p>
      </div>
    </section>
    
    <section class="cs-section">
      <div class="cs-container">
        <div class="cs-grid-cards">
          <div class="cs-card cs-card-pad">
            <h2>Feature 1</h2>
            <p class="cs-text-secondary">Description here</p>
          </div>
          <div class="cs-card cs-card-pad">
            <h2>Feature 2</h2>
            <p class="cs-text-secondary">Description here</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
```

### Dashboard Layout
```html
<div class="cs-page">
  <div class="cs-grid-sidebar">
    <aside class="cs-section">
      <nav class="cs-stack">
        <a href="#dashboard">Dashboard</a>
        <a href="#analytics">Analytics</a>
        <a href="#settings">Settings</a>
      </nav>
    </aside>
    
    <main class="cs-section">
      <div class="cs-container">
        <h1>Dashboard</h1>
        
        <div class="cs-grid-12">
          <div class="cs-col-span" style="--span: 6">
            <div class="cs-card cs-card-pad">
              <h3>Stats</h3>
              <p class="cs-text-secondary">Statistics here</p>
            </div>
          </div>
          <div class="cs-col-span" style="--span: 6">
            <div class="cs-card cs-card-pad">
              <h3>Charts</h3>
              <p class="cs-text-secondary">Charts here</p>
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
  --cs-container-max: 1200px;
  --cs-container-pad-inline: 2rem;
  --cs-section-min: 4rem;
  --cs-section-max: 8rem;
  --cs-grid-gap: 1.5rem;
  --cs-grid-min: 300px;
  --cs-radius: 0.5rem;
  --cs-shadow-1: 0 1px 3px rgba(0,0,0,0.1);
  --cs-shadow-2: 0 4px 6px rgba(0,0,0,0.1);
}
```

### Custom Components
Extend the library with your own utilities:

```css
.cs-custom-card {
  background: var(--cs-bg-surface);
  border: 2px solid var(--cs-border-color);
  border-radius: var(--cs-radius);
}
```

## 🌓 Dark Mode

- Tailwind Standard: toggling the `.dark` class on a root element enables dark mode; OS fallback via `prefers-color-scheme` is supported by the tokens.
- Override tokens per mode to brand your app:

```css
:root {
  --cs-text-primary: oklch(18% 0.03 260);
  --cs-bg-surface: oklch(100% 0 0);
}
:where(.dark) {
  --cs-text-primary: oklch(92% 0.03 260);
  --cs-bg-surface: oklch(22% 0.02 260);
}
```

## ♿ Accessibility

## 🎨 Theme Overrides

Use these minimal per‑mode overrides to align utilities with your brand:

```css
:root {
  --cs-text-primary: oklch(18% 0.03 260);
  --cs-bg-surface: oklch(100% 0 0);
  --cs-border-color: oklch(84% 0.02 260);
}
:where(.dark) {
  --cs-text-primary: oklch(92% 0.03 260);
  --cs-bg-surface: oklch(22% 0.02 260);
  --cs-border-color: oklch(36% 0.03 260);
}
```

### Focus Management
- Consistent focus rings across all interactive elements
- Proper focus order in form layouts
- Screen reader friendly hidden content

### Motion Safety
- Respects `prefers-reduced-motion` preferences
- Smooth transitions that don't interfere with navigation
- Hover effects that work with keyboard focus

### Semantic Structure
- Proper heading hierarchy support
- Form labels and associations
- ARIA-compatible component structure

## 🔧 Integration

### With Tailwind CSS
```css
@import "tailwindcss";
@import "@casoon/tailwindcss-utilities/index.css";

/* Use with Tailwind utilities */
.my-component {
  @apply cs-card cs-card-pad bg-blue-50 border-blue-200;
}
```

### With Custom Design Systems
```css
/* Override tokens for your brand */
:root {
  --cs-bg-surface: var(--cs-brand-surface);
  --cs-text-primary: var(--cs-brand-text);
  --cs-border-color: var(--cs-brand-border);
}
```

## 📦 Package Contents

- **`index.css`** - Main utility classes and components
- **`tokens.css`** - CSS custom properties and design tokens
- **`README.md`** - This documentation

## 🎯 Browser Support

- **Modern Browsers**: Full support for all features
- **CSS Custom Properties**: Required for token system
- **CSS Grid**: Required for grid layouts
- **CSS Container Queries**: Required for responsive sidebar (optional enhancement)

## 📚 Related Packages

- **`@casoon/tailwindcss-effects`** - Meta package with all effects
- **`@casoon/tailwindcss-navigation`** - Navigation components

## 🤝 Contributing

Contributions are welcome! Please ensure all utilities respect accessibility guidelines and include proper fallbacks.

---

**Made with ❤️ by the Casoon team**

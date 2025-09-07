# Casoon Tailwind Effects - CSS Classes Catalog

> **For AI Assistants**: This catalog provides a comprehensive list of all available CSS classes in the @casoon/tailwindcss-effects library. All CSS custom properties use the consistent `--cs-` prefix for easy identification.

## Package Overview

All packages use consistent `--cs-{package}-*` naming for CSS custom properties:

- **Animations**: `--cs-anim-*` (duration, easing, etc.)
- **Glass**: `--cs-glass-*` (colors, backgrounds, borders)  
- **Loading**: `--cs-loading-*` (spinner colors)
- **Navigation**: `--cs-nav-*` (primary, text, border colors)
- **Orbs**: `--cs-orbs-*` (gradients, sizes)
- **Gradients**: `--cs-gradients-*` (color stops)
- **Scroll**: `--cs-scroll-*` (thumb, track colors)
- **Micro-interactions**: `--cs-micro-*` (button states)

## 1. @casoon/tailwindcss-utilities

> Utility CSS classes for Tailwind CSS v4

### CSS Classes
- `.container-fluid`
- `.sr-only`

## 2. @casoon/tailwindcss-scroll

> undefined

### CSS Classes
- `.scroll-auto`
- `.scroll-m-0`
- `.scroll-m-1`
- `.scroll-m-16`
- `.scroll-m-2`
- `.scroll-m-4`
- `.scroll-m-8`
- `.scroll-p-0`
- `.scroll-p-1`
- `.scroll-p-16`
- `.scroll-p-2`
- `.scroll-p-4`
- `.scroll-p-8`
- `.scroll-smooth`
- `.scroll-snap-both`
- `.scroll-snap-none`
- `.scroll-snap-proximity`
- `.scroll-snap-x`
- `.scroll-snap-y`
- `.scrollbar-auto`
- `.scrollbar-none`
- `.scrollbar-none::-webkit-scrollbar`
- `.scrollbar-thin`
- `.scrollbar-thumb-blue`
- `.scrollbar-thumb-gray`
- `.scrollbar-track-transparent`
- `.snap-align-none`
- `.snap-always`
- `.snap-center`
- `.snap-end`
- `.snap-normal`
- `.snap-start`

### CSS Variables
```css
--cs-scroll-thumb-blue: /* value */
--cs-scroll-thumb-gray: /* value */
```

## 3. @casoon/tailwindcss-orbs

>  for Tailwind CSS v4

### CSS Classes
- `.orb`
- `.orb-2xl`
- `.orb-absolute`
- `.orb-blur-lg`
- `.orb-blur-md`
- `.orb-blur-none`
- `.orb-blur-sm`
- `.orb-drift`
- `.orb-fixed`
- `.orb-float`
- `.orb-gradient-blue`
- `.orb-gradient-custom`
- `.orb-gradient-pink`
- `.orb-gradient-purple`
- `.orb-lg`
- `.orb-md`
- `.orb-pulse`
- `.orb-sm`
- `.orb-xl`
- `.orb-xs`

### CSS Variables
```css
--cs-orb-blue: /* value */
--cs-orb-blue-light: /* value */
--cs-orb-blue-lighter: /* value */
--cs-orb-custom-accent: /* value */
--cs-orb-custom-primary: /* value */
--cs-orb-custom-secondary: /* value */
--cs-orb-gradient-blue: /* value */
--cs-orb-gradient-custom: /* value */
--cs-orb-gradient-pink: /* value */
--cs-orb-gradient-purple: /* value */
--cs-orb-pink: /* value */
--cs-orb-pink-light: /* value */
--cs-orb-pink-lighter: /* value */
--cs-orb-purple: /* value */
--cs-orb-purple-light: /* value */
--cs-orb-purple-lighter: /* value */
```

## 4. @casoon/tailwindcss-navigation

> Navigation components and utilities for Tailwind CSS v4

### CSS Classes
- `.nav`
- `.nav-item`
- `.nav-link`
- `.nav-link.active`
- `.nav-link:hover`
- `.nav-pills .nav-item .nav-link`
- `.nav-pills .nav-item .nav-link.active`
- `.nav-tabs .nav-item .nav-link`
- `.nav-tabs .nav-item .nav-link.active`
- `.navbar-brand`
- `.navbar-nav`
- `.navbar-nav .nav-link`

### CSS Variables
```css
--cs-nav-border: /* value */
--cs-nav-primary: /* value */
--cs-nav-text-muted: /* value */
--cs-nav-white: /* value */
```

## 5. @casoon/tailwindcss-micro-interactions

>  for Tailwind CSS v4

### CSS Classes
- `.active-scale-95`
- `.active-scale-98`
- `.focus-ring-2`
- `.focus-ring-4`
- `.focus-scale-105`
- `.hover-brighten`
- `.hover-darken`
- `.hover-fade-in`
- `.hover-fade-out`
- `.hover-rotate-1`
- `.hover-rotate-3`
- `.hover-rotate-6`
- `.hover-scale-105`
- `.hover-scale-110`
- `.hover-scale-95`
- `.hover-translate-y-1`
- `.hover-translate-y-2`
- `.interactive`
- `.smooth-interaction`
- `.smooth-interaction-fast`
- `.smooth-interaction-slow`
- `.tap-highlight-none`
- `.tap-scale-95`

### CSS Variables
```css
--cs-micro-focus-ring: /* value */
--cs-micro-focus-ring-medium: /* value */
--cs-micro-focus-ring-strong: /* value */
--cs-micro-shadow: /* value */
--cs-micro-shadow-light: /* value */
```

## 6. @casoon/tailwindcss-loading

>  for Tailwind CSS v4

### CSS Classes
- `.loading`
- `.spinner`

### CSS Variables
```css
--cs-loading-spinner-active: /* value */
--cs-loading-spinner-base: /* value */
```

## 7. @casoon/tailwindcss-gradients

> Beautiful gradient utilities for Tailwind CSS v4

### CSS Classes
- `.gradient-animate`
- `.gradient-blue`
- `.gradient-border`
- `.gradient-border::before`
- `.gradient-conic`
- `.gradient-conic-center`
- `.gradient-custom`
- `.gradient-fire`
- `.gradient-mint`
- `.gradient-ocean`
- `.gradient-orange`
- `.gradient-pink`
- `.gradient-purple`
- `.gradient-radial-bottom`
- `.gradient-radial-center`
- `.gradient-radial-top`
- `.gradient-sunset`
- `.gradient-text`
- `.gradient-text-custom`
- `.gradient-text-fire`
- `.gradient-text-ocean`
- `.gradient-text-sunset`

### CSS Variables
```css
--cs-gradient-blue-end: /* value */
--cs-gradient-blue-start: /* value */
--cs-gradient-custom-end: /* value */
--cs-gradient-custom-mid: /* value */
--cs-gradient-custom-start: /* value */
--cs-gradient-fire-end: /* value */
--cs-gradient-fire-start: /* value */
--cs-gradient-mint-end: /* value */
--cs-gradient-mint-start: /* value */
--cs-gradient-ocean-end: /* value */
--cs-gradient-ocean-start: /* value */
--cs-gradient-orange-end: /* value */
--cs-gradient-orange-start: /* value */
--cs-gradient-pink-end: /* value */
--cs-gradient-pink-start: /* value */
--cs-gradient-purple-end: /* value */
--cs-gradient-purple-start: /* value */
--cs-gradient-stops: /* value */
--cs-gradient-sunset-end: /* value */
--cs-gradient-sunset-mid: /* value */
--cs-gradient-sunset-start: /* value */
--cs-gradient-white: /* value */
```

## 8. @casoon/tailwindcss-glass

> Glass morphism components and utilities for Tailwind CSS v4

### CSS Classes
- `.glass`
- `.glass, .glass-card, .glass-nav, .glass-button`
- `.glass-amber`
- `.glass-blue`
- `.glass-button`
- `.glass-card`
- `.glass-card, .glass-card-light, .glass-button, .glass-toast`
- `.glass-card-light`
- `.glass-dark`
- `.glass-dropdown`
- `.glass-green`
- `.glass-lg`
- `.glass-medium`
- `.glass-nav`
- `.glass-nav-light`
- `.glass-pink`
- `.glass-purple`
- `.glass-responsive`
- `.glass-rounded`
- `.glass-rounded-2xl`
- `.glass-rounded-3xl`
- `.glass-rounded-lg`
- `.glass-rounded-sm`
- `.glass-rounded-xl`
- `.glass-shadow`
- `.glass-shadow-lg`
- `.glass-shadow-sm`
- `.glass-shadow-xl`
- `.glass-sm`
- `.glass-strong`
- `.glass-toast`
- `.glass-tooltip`
- `.glass-weak`

### CSS Variables
```css
--cs-glass-amber: /* value */
--cs-glass-bg-amber: /* value */
--cs-glass-bg-amber-fallback: /* value */
--cs-glass-bg-blue: /* value */
--cs-glass-bg-blue-fallback: /* value */
--cs-glass-bg-contrast: /* value */
--cs-glass-bg-dark: /* value */
--cs-glass-bg-dark-contrast: /* value */
--cs-glass-bg-dark-fallback: /* value */
--cs-glass-bg-dark-strong: /* value */
--cs-glass-bg-fallback: /* value */
--cs-glass-bg-green: /* value */
--cs-glass-bg-green-fallback: /* value */
--cs-glass-bg-hover: /* value */
--cs-glass-bg-light: /* value */
--cs-glass-bg-light-hover: /* value */
--cs-glass-bg-medium: /* value */
--cs-glass-bg-pink: /* value */
--cs-glass-bg-pink-fallback: /* value */
--cs-glass-bg-purple: /* value */
--cs-glass-bg-purple-fallback: /* value */
--cs-glass-bg-strong: /* value */
--cs-glass-bg-weak: /* value */
--cs-glass-black: /* value */
--cs-glass-blue: /* value */
--cs-glass-border-amber: /* value */
--cs-glass-border-blue: /* value */
--cs-glass-border-green: /* value */
--cs-glass-border-light: /* value */
--cs-glass-border-medium: /* value */
--cs-glass-border-pink: /* value */
--cs-glass-border-purple: /* value */
--cs-glass-border-strong: /* value */
--cs-glass-focus-ring: /* value */
--cs-glass-green: /* value */
--cs-glass-pink: /* value */
--cs-glass-purple: /* value */
--cs-glass-shadow-light: /* value */
--cs-glass-shadow-medium: /* value */
--cs-glass-shadow-strong: /* value */
--cs-glass-shadow-xl: /* value */
--cs-glass-tooltip-bg: /* value */
--cs-glass-white: /* value */
```

## 9. @casoon/tailwindcss-effects

> Complete collection of animation and UI effects for Tailwind CSS v4

## 10. @casoon/tailwindcss-animations

> Animation utilities and keyframes for Tailwind CSS v4

### CSS Classes
- `.anim`
- `.anim, .fade-in, .fade-out, .scale-in, .scale-out, .slide-up, .slide-down, .slide-left, .slide-right, .blur-in, .blur-out, .rotate-in, .rotate, .pulse, .bounce, .wiggle, .reveal-3d-up, .reveal-3d-right, .enter-card, .enter-modal, .exit-modal`
- `.anim-2xl`
- `.anim-alternate`
- `.anim-both`
- `.anim-forwards`
- `.anim-infinite`
- `.anim-lg`
- `.anim-md`
- `.anim-reverse`
- `.anim-sm`
- `.anim-xl`
- `.anim-xs`
- `.anim-xxs`
- `.blur-in`
- `.blur-out`
- `.bounce`
- `.ease-accelerate`
- `.ease-decelerate`
- `.ease-emphasized`
- `.ease-soft-spring`
- `.ease-spring`
- `.ease-standard`
- `.enter-card`
- `.enter-modal`
- `.exit-modal`
- `.fade-in`
- `.fade-out`
- `.hover-lift-md`
- `.hover-lift-sm`
- `.hover-lift-sm:hover, .hover-lift-md:hover, .hover-scale-105:hover, .hover-scale-110:hover`
- `.hover-scale-105`
- `.hover-scale-110`
- `.pulse`
- `.reveal-3d-right`
- `.reveal-3d-up`
- `.rotate`
- `.rotate-in`
- `.scale-in`
- `.scale-out`
- `.slide-down`
- `.slide-left`
- `.slide-right`
- `.slide-up`
- `.t-origin-bottom`
- `.t-origin-center`
- `.t-origin-top`
- `.t-preserve-3d`
- `.wiggle`
- `.will-filter`
- `.will-opacity`
- `.will-transform`

### CSS Variables
```css
--cs-anim-delay: /* value */
--cs-anim-direction: /* value */
--cs-anim-duration: /* value */
--cs-anim-duration-2xl: /* value */
--cs-anim-duration-lg: /* value */
--cs-anim-duration-md: /* value */
--cs-anim-duration-sm: /* value */
--cs-anim-duration-xl: /* value */
--cs-anim-duration-xs: /* value */
--cs-anim-duration-xxs: /* value */
--cs-anim-ease: /* value */
--cs-anim-ease-accelerate: /* value */
--cs-anim-ease-decelerate: /* value */
--cs-anim-ease-emphasized: /* value */
--cs-anim-ease-soft-spring: /* value */
--cs-anim-ease-spring: /* value */
--cs-anim-ease-standard: /* value */
--cs-anim-fill: /* value */
--cs-anim-reduced-motion-duration: /* value */
--cs-anim-reduced-motion-ease: /* value */
--cs-anim-shadow-ink: /* value */
```

## Usage Examples

### As Tailwind Plugin
```js
import effects from '@casoon/tailwindcss-effects';

export default {
  plugins: [effects()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-effects/index.css";
```

### Individual Package Import
```js
import animations from '@casoon/tailwindcss-animations';
import glass from '@casoon/tailwindcss-glass';

export default {
  plugins: [animations(), glass()]
}
```

## CSS Variable Customization

Override any CSS variable to customize the design:

```css
:root {
  --cs-anim-duration-md: 400ms;
  --cs-glass-bg-light: rgba(255, 255, 255, 0.15);
  --cs-nav-primary: #6366f1;
}
```

---

> **Note for AI Assistants**: This catalog is automatically generated and updated. When suggesting classes, prioritize the documented classes above and mention the consistent `--cs-` prefix for CSS variables. All animations respect `prefers-reduced-motion` for accessibility.

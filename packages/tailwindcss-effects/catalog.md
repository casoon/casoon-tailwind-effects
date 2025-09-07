# @casoon/tailwindcss-effects - Complete CSS Effects Library

> **Meta-package containing all @casoon CSS effects and utilities for Tailwind CSS v4**

> **For AI Assistants**: This is the complete collection of CSS classes and utilities from all @casoon packages. All CSS custom properties use the consistent `--cs-` prefix for easy identification.

## Package Overview

This meta-package includes all individual packages with consistent `--cs-{package}-*` naming for CSS custom properties:

- **Animations**: `--cs-anim-*` (duration, easing, keyframes)
- **Glass**: `--cs-glass-*` (colors, backgrounds, borders, glassmorphism)  
- **Loading**: `--cs-loading-*` (spinner colors, states)
- **Navigation**: `--cs-nav-*` (primary, text, border colors)
- **Orbs**: `--cs-orb-*` (gradients, sizes, animations)
- **Gradients**: `--cs-gradient-*` (color stops, directions)
- **Scroll**: `--cs-scroll-*` (thumb, track colors, behavior)
- **Micro-interactions**: `--cs-micro-*` (focus, hover, button states)
- **Utilities**: Core utilities (screen readers, containers)

## Complete Class & Variable Reference

### 1. @casoon/tailwindcss-utilities

> Utility CSS classes for Tailwind CSS v4

**CSS Classes (4):**
- `.container-fluid`
- `.cs-container-fluid`
- `.cs-sr-only`
- `.sr-only`

### 2. @casoon/tailwindcss-scroll

> undefined

**CSS Classes (31):**
- `.cs-scroll-auto`
- `.cs-scroll-m-0`
- `.cs-scroll-m-1`
- `.cs-scroll-m-16`
- `.cs-scroll-m-2`
- `.cs-scroll-m-4`
- `.cs-scroll-m-8`
- `.cs-scroll-p-0`
- `.cs-scroll-p-1`
- `.cs-scroll-p-16`
- `.cs-scroll-p-2`
- `.cs-scroll-p-4`
- `.cs-scroll-p-8`
- `.cs-scroll-smooth`
- `.cs-scroll-snap-both`
- `.cs-scroll-snap-none`
- `.cs-scroll-snap-proximity`
- `.cs-scroll-snap-x`
- `.cs-scroll-snap-y`
- `.cs-scrollbar-auto`
- `.cs-scrollbar-none`
- `.cs-scrollbar-thin`
- `.cs-scrollbar-thumb-blue`
- `.cs-scrollbar-thumb-gray`
- `.cs-scrollbar-track-transparent`
- `.cs-snap-align-none`
- `.cs-snap-always`
- `.cs-snap-center`
- `.cs-snap-end`
- `.cs-snap-normal`
- `.cs-snap-start`

**CSS Variables (2):**
```css
--cs-scroll-thumb-blue: /* value */
--cs-scroll-thumb-gray: /* value */
```

### 3. @casoon/tailwindcss-orbs

>  for Tailwind CSS v4

**CSS Classes (20):**
- `.cs-orb`
- `.cs-orb-2xl`
- `.cs-orb-absolute`
- `.cs-orb-blur-lg`
- `.cs-orb-blur-md`
- `.cs-orb-blur-none`
- `.cs-orb-blur-sm`
- `.cs-orb-drift`
- `.cs-orb-fixed`
- `.cs-orb-float`
- `.cs-orb-gradient-blue`
- `.cs-orb-gradient-custom`
- `.cs-orb-gradient-pink`
- `.cs-orb-gradient-purple`
- `.cs-orb-lg`
- `.cs-orb-md`
- `.cs-orb-pulse`
- `.cs-orb-sm`
- `.cs-orb-xl`
- `.cs-orb-xs`

**CSS Variables (16):**
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

### 4. @casoon/tailwindcss-navigation

> Navigation components and utilities for Tailwind CSS v4

**CSS Classes (5):**
- `.cs-nav`
- `.cs-nav-item`
- `.cs-nav-link`
- `.cs-navbar-brand`
- `.cs-navbar-nav`

**CSS Variables (4):**
```css
--cs-nav-border: /* value */
--cs-nav-primary: /* value */
--cs-nav-text-muted: /* value */
--cs-nav-white: /* value */
```

### 5. @casoon/tailwindcss-micro-interactions

>  for Tailwind CSS v4

**CSS Classes (23):**
- `.cs-active-scale-95`
- `.cs-active-scale-98`
- `.cs-focus-ring-2`
- `.cs-focus-ring-4`
- `.cs-focus-scale-105`
- `.cs-hover-brighten`
- `.cs-hover-darken`
- `.cs-hover-fade-in`
- `.cs-hover-fade-out`
- `.cs-hover-rotate-1`
- `.cs-hover-rotate-3`
- `.cs-hover-rotate-6`
- `.cs-hover-scale-105`
- `.cs-hover-scale-110`
- `.cs-hover-scale-95`
- `.cs-hover-translate-y-1`
- `.cs-hover-translate-y-2`
- `.cs-interactive`
- `.cs-smooth-interaction`
- `.cs-smooth-interaction-fast`
- `.cs-smooth-interaction-slow`
- `.cs-tap-highlight-none`
- `.cs-tap-scale-95`

**CSS Variables (5):**
```css
--cs-micro-focus-ring: /* value */
--cs-micro-focus-ring-medium: /* value */
--cs-micro-focus-ring-strong: /* value */
--cs-micro-shadow: /* value */
--cs-micro-shadow-light: /* value */
```

### 6. @casoon/tailwindcss-loading

>  for Tailwind CSS v4

**CSS Classes (2):**
- `.cs-loading`
- `.cs-spinner`

**CSS Variables (2):**
```css
--cs-loading-spinner-active: /* value */
--cs-loading-spinner-base: /* value */
```

### 7. @casoon/tailwindcss-gradients

> Beautiful gradient utilities for Tailwind CSS v4

**CSS Classes (21):**
- `.cs-gradient-animate`
- `.cs-gradient-blue`
- `.cs-gradient-border`
- `.cs-gradient-conic`
- `.cs-gradient-conic-center`
- `.cs-gradient-custom`
- `.cs-gradient-fire`
- `.cs-gradient-mint`
- `.cs-gradient-ocean`
- `.cs-gradient-orange`
- `.cs-gradient-pink`
- `.cs-gradient-purple`
- `.cs-gradient-radial-bottom`
- `.cs-gradient-radial-center`
- `.cs-gradient-radial-top`
- `.cs-gradient-sunset`
- `.cs-gradient-text`
- `.cs-gradient-text-custom`
- `.cs-gradient-text-fire`
- `.cs-gradient-text-ocean`
- `.cs-gradient-text-sunset`

**CSS Variables (22):**
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

### 8. @casoon/tailwindcss-glass

> Glass morphism components and utilities for Tailwind CSS v4

**CSS Classes (40):**
- `.cs-glass`
- `.cs-glass-amber`
- `.cs-glass-blue`
- `.cs-glass-button`
- `.cs-glass-card`
- `.cs-glass-card-light`
- `.cs-glass-dark`
- `.cs-glass-dropdown`
- `.cs-glass-green`
- `.cs-glass-lg`
- `.cs-glass-medium`
- `.cs-glass-nav`
- `.cs-glass-nav-light`
- `.cs-glass-pink`
- `.cs-glass-purple`
- `.cs-glass-responsive`
- `.cs-glass-rounded`
- `.cs-glass-rounded-2xl`
- `.cs-glass-rounded-3xl`
- `.cs-glass-rounded-lg`
- `.cs-glass-rounded-sm`
- `.cs-glass-rounded-xl`
- `.cs-glass-shadow`
- `.cs-glass-shadow-lg`
- `.cs-glass-shadow-sm`
- `.cs-glass-shadow-xl`
- `.cs-glass-sm`
- `.cs-glass-strong`
- `.cs-glass-toast`
- `.cs-glass-tooltip`
- `.cs-glass-weak`
- `.glass`
- `.glass-button`
- `.glass-card`
- `.glass-card-light`
- `.glass-dark`
- `.glass-lg`
- `.glass-nav`
- `.glass-nav-light`
- `.glass-sm`

**CSS Variables (43):**
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

### 9. @casoon/tailwindcss-animations

> Animation utilities and keyframes for Tailwind CSS v4

**CSS Classes (50):**
- `.cs-anim`
- `.cs-anim-2xl`
- `.cs-anim-alternate`
- `.cs-anim-both`
- `.cs-anim-forwards`
- `.cs-anim-infinite`
- `.cs-anim-lg`
- `.cs-anim-md`
- `.cs-anim-reverse`
- `.cs-anim-sm`
- `.cs-anim-xl`
- `.cs-anim-xs`
- `.cs-anim-xxs`
- `.cs-blur-in`
- `.cs-blur-out`
- `.cs-bounce`
- `.cs-ease-accelerate`
- `.cs-ease-decelerate`
- `.cs-ease-emphasized`
- `.cs-ease-soft-spring`
- `.cs-ease-spring`
- `.cs-ease-standard`
- `.cs-enter-card`
- `.cs-enter-modal`
- `.cs-exit-modal`
- `.cs-fade-in`
- `.cs-fade-out`
- `.cs-hover-lift-md`
- `.cs-hover-lift-sm`
- `.cs-hover-scale-105`
- `.cs-hover-scale-110`
- `.cs-pulse`
- `.cs-reveal-3d-right`
- `.cs-reveal-3d-up`
- `.cs-rotate`
- `.cs-rotate-in`
- `.cs-scale-in`
- `.cs-scale-out`
- `.cs-slide-down`
- `.cs-slide-left`
- `.cs-slide-right`
- `.cs-slide-up`
- `.cs-t-origin-bottom`
- `.cs-t-origin-center`
- `.cs-t-origin-top`
- `.cs-t-preserve-3d`
- `.cs-wiggle`
- `.cs-will-filter`
- `.cs-will-opacity`
- `.cs-will-transform`

**CSS Variables (21):**
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

## Summary

**Total CSS Classes:** 194
**Total CSS Variables:** 115
**Individual Packages:** 9

## Usage Examples

### As Tailwind Plugin (All Effects)
```js
import effects from '@casoon/tailwindcss-effects';

export default {
  plugins: [effects]
}
```

### Direct CSS Import (All Effects)
```css
@import "@casoon/tailwindcss-effects/dist.css";
```

### Individual Package Import
```js
import animations from '@casoon/tailwindcss-animations';
import glass from '@casoon/tailwindcss-glass';

export default {
  plugins: [animations, glass]
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

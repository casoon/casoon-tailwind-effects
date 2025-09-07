# @casoon/tailwindcss-animations - CSS Classes Catalog

> **Animation utilities and keyframes for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-animations`
- **Version**: `0.6.2`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (52)

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

## CSS Variables (21)

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
import plugin from '@casoon/tailwindcss-animations';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-animations/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-animations';

export default {
  plugins: [
    plugin({
      // Package-specific configuration options
      tokens: {
        // Override default tokens
      }
    })
  ]
}
```

## CSS Variable Customization

Override any CSS variable to customize the design:

```css
:root {
  /* Customize this package's tokens */
  --cs-anim-delay: /* your custom value */;
  --cs-anim-direction: /* your custom value */;
  --cs-anim-duration: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

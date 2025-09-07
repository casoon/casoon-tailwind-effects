# @casoon/tailwindcss-animations - CSS Classes Catalog

> **Animation utilities and keyframes for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-animations`
- **Version**: `0.7.0`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (50)

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

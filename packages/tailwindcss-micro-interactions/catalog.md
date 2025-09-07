# @casoon/tailwindcss-micro-interactions - CSS Classes Catalog

> ** for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-micro-interactions`
- **Version**: `0.6.4`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (23)

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

## CSS Variables (5)

```css
--cs-micro-focus-ring: /* value */
--cs-micro-focus-ring-medium: /* value */
--cs-micro-focus-ring-strong: /* value */
--cs-micro-shadow: /* value */
--cs-micro-shadow-light: /* value */
```

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-micro-interactions';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-micro-interactions/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-micro-interactions';

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
  --cs-micro-focus-ring: /* your custom value */;
  --cs-micro-focus-ring-medium: /* your custom value */;
  --cs-micro-focus-ring-strong: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

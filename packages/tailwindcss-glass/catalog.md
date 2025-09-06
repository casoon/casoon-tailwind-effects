# @casoon/tailwindcss-glass - CSS Classes Catalog

> **Glass morphism components and utilities for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-glass`
- **Version**: `0.5.9`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (33)

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

## CSS Variables (43)

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

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-glass';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-glass/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-glass';

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
  --cs-glass-amber: /* your custom value */;
  --cs-glass-bg-amber: /* your custom value */;
  --cs-glass-bg-amber-fallback: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

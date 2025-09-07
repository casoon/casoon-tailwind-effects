# @casoon/tailwindcss-navigation - CSS Classes Catalog

> **Navigation components and utilities for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-navigation`
- **Version**: `0.6.4`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (12)

- `.cs-nav`
- `.cs-nav-item`
- `.cs-nav-link`
- `.cs-nav-link.active`
- `.cs-nav-link:hover`
- `.cs-nav-pills .cs-nav-item .cs-nav-link`
- `.cs-nav-pills .cs-nav-item .cs-nav-link.active`
- `.cs-nav-tabs .cs-nav-item .cs-nav-link`
- `.cs-nav-tabs .cs-nav-item .cs-nav-link.active`
- `.cs-navbar-brand`
- `.cs-navbar-nav`
- `.cs-navbar-nav .cs-nav-link`

## CSS Variables (4)

```css
--cs-nav-border: /* value */
--cs-nav-primary: /* value */
--cs-nav-text-muted: /* value */
--cs-nav-white: /* value */
```

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-navigation';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-navigation/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-navigation';

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
  --cs-nav-border: /* your custom value */;
  --cs-nav-primary: /* your custom value */;
  --cs-nav-text-muted: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

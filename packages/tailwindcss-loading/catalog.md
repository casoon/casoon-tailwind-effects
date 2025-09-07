# @casoon/tailwindcss-loading - CSS Classes Catalog

> ** for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-loading`
- **Version**: `0.7.1`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (2)

- `.cs-loading`
- `.cs-spinner`

## CSS Variables (2)

```css
--cs-loading-spinner-active: /* value */
--cs-loading-spinner-base: /* value */
```

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-loading';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-loading/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-loading';

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
  --cs-loading-spinner-active: /* your custom value */;
  --cs-loading-spinner-base: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

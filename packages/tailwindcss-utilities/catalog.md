# @casoon/tailwindcss-utilities - CSS Classes Catalog

> **Utility CSS classes for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-utilities`
- **Version**: `0.6.4`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (4)

- `.container-fluid`
- `.cs-container-fluid`
- `.cs-sr-only`
- `.sr-only`

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-utilities';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-utilities/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-utilities';

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
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

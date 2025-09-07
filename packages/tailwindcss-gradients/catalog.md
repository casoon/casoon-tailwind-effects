# @casoon/tailwindcss-gradients - CSS Classes Catalog

> **Beautiful gradient utilities for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-gradients`
- **Version**: `0.6.1`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (22)

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

## CSS Variables (22)

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

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-gradients';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-gradients/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-gradients';

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
  --cs-gradient-blue-end: /* your custom value */;
  --cs-gradient-blue-start: /* your custom value */;
  --cs-gradient-custom-end: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

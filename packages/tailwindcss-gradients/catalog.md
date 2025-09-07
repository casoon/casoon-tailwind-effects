# @casoon/tailwindcss-gradients - CSS Classes Catalog

> **Beautiful gradient utilities for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-gradients`
- **Version**: `0.7.0`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (21)

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

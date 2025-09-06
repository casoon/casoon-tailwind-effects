# @casoon/tailwindcss-orbs - CSS Classes Catalog

> ** for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-orbs`
- **Version**: `0.6.0`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (20)

- `.orb`
- `.orb-2xl`
- `.orb-absolute`
- `.orb-blur-lg`
- `.orb-blur-md`
- `.orb-blur-none`
- `.orb-blur-sm`
- `.orb-drift`
- `.orb-fixed`
- `.orb-float`
- `.orb-gradient-blue`
- `.orb-gradient-custom`
- `.orb-gradient-pink`
- `.orb-gradient-purple`
- `.orb-lg`
- `.orb-md`
- `.orb-pulse`
- `.orb-sm`
- `.orb-xl`
- `.orb-xs`

## CSS Variables (16)

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

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-orbs';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-orbs/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-orbs';

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
  --cs-orb-blue: /* your custom value */;
  --cs-orb-blue-light: /* your custom value */;
  --cs-orb-blue-lighter: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

# @casoon/tailwindcss-orbs - CSS Classes Catalog

> ** for Tailwind CSS v4**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-orbs`
- **Version**: `0.7.1`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (20)

- `.cs-orb`
- `.cs-orb-2xl`
- `.cs-orb-absolute`
- `.cs-orb-blur-lg`
- `.cs-orb-blur-md`
- `.cs-orb-blur-none`
- `.cs-orb-blur-sm`
- `.cs-orb-drift`
- `.cs-orb-fixed`
- `.cs-orb-float`
- `.cs-orb-gradient-blue`
- `.cs-orb-gradient-custom`
- `.cs-orb-gradient-pink`
- `.cs-orb-gradient-purple`
- `.cs-orb-lg`
- `.cs-orb-md`
- `.cs-orb-pulse`
- `.cs-orb-sm`
- `.cs-orb-xl`
- `.cs-orb-xs`

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

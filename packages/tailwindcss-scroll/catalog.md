# @casoon/tailwindcss-scroll - CSS Classes Catalog

> **undefined**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-scroll`
- **Version**: `0.6.4`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (32)

- `.cs-scroll-auto`
- `.cs-scroll-m-0`
- `.cs-scroll-m-1`
- `.cs-scroll-m-16`
- `.cs-scroll-m-2`
- `.cs-scroll-m-4`
- `.cs-scroll-m-8`
- `.cs-scroll-p-0`
- `.cs-scroll-p-1`
- `.cs-scroll-p-16`
- `.cs-scroll-p-2`
- `.cs-scroll-p-4`
- `.cs-scroll-p-8`
- `.cs-scroll-smooth`
- `.cs-scroll-snap-both`
- `.cs-scroll-snap-none`
- `.cs-scroll-snap-proximity`
- `.cs-scroll-snap-x`
- `.cs-scroll-snap-y`
- `.cs-scrollbar-auto`
- `.cs-scrollbar-none`
- `.cs-scrollbar-none::-webkit-scrollbar`
- `.cs-scrollbar-thin`
- `.cs-scrollbar-thumb-blue`
- `.cs-scrollbar-thumb-gray`
- `.cs-scrollbar-track-transparent`
- `.cs-snap-align-none`
- `.cs-snap-always`
- `.cs-snap-center`
- `.cs-snap-end`
- `.cs-snap-normal`
- `.cs-snap-start`

## CSS Variables (2)

```css
--cs-scroll-thumb-blue: /* value */
--cs-scroll-thumb-gray: /* value */
```

## Usage Examples

### As Tailwind Plugin
```js
import plugin from '@casoon/tailwindcss-scroll';

export default {
  plugins: [plugin()]
}
```

### Direct CSS Import
```css
@import "@casoon/tailwindcss-scroll/index.css";
```

### With Custom Configuration
```js
import plugin from '@casoon/tailwindcss-scroll';

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
  --cs-scroll-thumb-blue: /* your custom value */;
  --cs-scroll-thumb-gray: /* your custom value */;
}
```

---

> **Generated automatically** from plugin analysis. For the complete collection, see [@casoon/tailwindcss-effects](https://www.npmjs.com/package/@casoon/tailwindcss-effects).

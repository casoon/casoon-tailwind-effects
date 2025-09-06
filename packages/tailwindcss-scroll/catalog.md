# @casoon/tailwindcss-scroll - CSS Classes Catalog

> **undefined**

> This catalog provides a comprehensive list of all available CSS classes and variables in this package. All CSS custom properties use the consistent `--cs-` prefix.

## Package Information

- **Package**: `@casoon/tailwindcss-scroll`
- **Version**: `0.5.8`
- **Type**: Tailwind CSS v4 Plugin

## CSS Classes (32)

- `.scroll-auto`
- `.scroll-m-0`
- `.scroll-m-1`
- `.scroll-m-16`
- `.scroll-m-2`
- `.scroll-m-4`
- `.scroll-m-8`
- `.scroll-p-0`
- `.scroll-p-1`
- `.scroll-p-16`
- `.scroll-p-2`
- `.scroll-p-4`
- `.scroll-p-8`
- `.scroll-smooth`
- `.scroll-snap-both`
- `.scroll-snap-none`
- `.scroll-snap-proximity`
- `.scroll-snap-x`
- `.scroll-snap-y`
- `.scrollbar-auto`
- `.scrollbar-none`
- `.scrollbar-none::-webkit-scrollbar`
- `.scrollbar-thin`
- `.scrollbar-thumb-blue`
- `.scrollbar-thumb-gray`
- `.scrollbar-track-transparent`
- `.snap-align-none`
- `.snap-always`
- `.snap-center`
- `.snap-end`
- `.snap-normal`
- `.snap-start`

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

# Tailwind CSS v4 Migration Guide

## ✅ Migration Complete

All @casoon/tailwindcss-* packages have been successfully migrated to Tailwind CSS v4 plugin API.

## Changes Made

### 1. Plugin Structure Update

**Before (v3):**
```js
export default function pluginName(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, addBase }) => {
      // Plugin implementation
    }
  };
}
```

**After (v4):**
```js
import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addUtilities, addComponents, addBase, theme }) {
  // Plugin implementation
}, {
  theme: {
    extend: {
      pluginName: {
        // Theme configuration
      }
    }
  }
});
```

### 2. Keyframes Handling

**Before (v3):**
```js
addKeyframes({
  'animation-name': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  }
});
```

**After (v4):**
```js
addBase({
  '@keyframes animation-name': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  }
});
```

### 3. Pure CSS Utilities

Some plugins like `tailwindcss-utilities` have been converted to pure CSS objects:

```js
export default {
  '@layer utilities': {
    '.cs-sr-only': {
      'position': 'absolute',
      // ...
    }
  }
};
```

### 4. Configuration via Theme

Configuration is now handled via the theme system:

```js
// tailwind.config.js
export default {
  theme: {
    glass: {
      tokens: {
        colors: {
          'custom-color': '#your-color'
        }
      }
    }
  },
  plugins: [
    require('@casoon/tailwindcss-glass')
  ]
}
```

## Usage Remains the Same

- All class names remain unchanged (e.g., `.cs-glass`, `.cs-fade-in`, etc.)
- All functionality is preserved
- No breaking changes for end users

## Verification

Run the test script to verify v4 compatibility:

```bash
node test-v4-plugins.mjs
```

Expected output: `🎉 All plugins successfully converted to v4 API!`

## Package Status

| Package | Status | Notes |
|---------|--------|-------|
| `@casoon/tailwindcss-utilities` | ✅ | Converted to pure CSS object |
| `@casoon/tailwindcss-animations` | ✅ | Plugin API + keyframes in addBase |
| `@casoon/tailwindcss-glass` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-gradients` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-orbs` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-scroll` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-navigation` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-loading` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-micro-interactions` | ✅ | Plugin API with theme config |
| `@casoon/tailwindcss-effects` | ✅ | Meta-package exporting plugin array |

## Benefits of v4 Migration

1. **Better Performance**: Improved purging and tree-shaking
2. **Modern API**: Uses latest Tailwind CSS plugin patterns  
3. **Theme Integration**: Configuration via theme system
4. **Type Safety**: Better TypeScript support (when available)
5. **Future Proof**: Ready for Tailwind CSS v4 stable release

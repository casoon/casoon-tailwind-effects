# Optional Gradient Presets

This directory contains extended gradient collections that are **not included by default** in the main gradients package to keep the core size under 40KB.

## Available Collections

### 📦 Core Gradients (Included by Default)
The main package includes:
- **CASOON Original & Variations** (4 gradients)
- **Essential Core Themes** (4 gradients) 
- **Essential Utilities** (grain textures, performance optimizations)

### 🎨 Extended Gradient Presets (Optional)
Import for the complete collection of **25+ additional gradients**:

```css
@import "@casoon/tailwindcss-gradients/src/optional/gradient-presets-extended.css";
```

**What you get:**
- **Cosmic & Space Themes** (3 gradients): `cs-bg-galaxy-spiral`, `cs-bg-stardust`, `cs-bg-aurora-borealis`
- **Ocean & Water Themes** (2 gradients): `cs-bg-coral-reef`, `cs-bg-tropical-lagoon` 
- **Sunset & Dawn Themes** (3 gradients): `cs-bg-desert-sunset`, `cs-bg-mountain-dawn`, `cs-bg-volcanic-glow`
- **Tech & Cyber Themes** (2 gradients): `cs-bg-cyber-punk`, `cs-bg-matrix-flow`
- **Modern & Trendy** (7 gradients): Instagram, Discord, Spotify themes, Synthwave, Vaporwave, Cotton Candy, Pastel Dreams
- **Magical & Fantasy** (3 gradients): `cs-bg-enchanted-forest`, `cs-bg-fairy-dust`, `cs-bg-dragon-breath`
- **Elegant & Sophisticated** (3 gradients): `cs-bg-pearl-elegance`, `cs-bg-rose-gold`, `cs-bg-midnight-luxury`
- **Professional & Corporate** (2 gradients): `cs-bg-financial-gold`, `cs-bg-tech-minimal`
- **Seasonal & Natural** (5 gradients): All four seasons plus `cs-bg-aurora-green`

### 🛠️ Extended Utilities (Also Optional)
**Included in the extended file:**
- Size variants (`cs-bg-preset-xs` through `cs-bg-preset-xl`)
- Opacity variants (`cs-bg-preset-opacity-10` through `cs-bg-preset-opacity-90`)
- Extended blend modes (8 different modes)
- Background attachment utilities (`fixed`, `local`, `scroll`)
- Additional grain textures (`cs-bg-grain-coarse`, `cs-bg-grain-vintage`)
- Animation variants (`cs-bg-preset-animated`, `cs-bg-preset-breathe`, `cs-bg-preset-pulse`)
- Dark mode optimizations
- Performance optimizations

## Usage Examples

### Basic Import
```css
/* In your CSS file */
@import "tailwindcss";
@import "@casoon/tailwindcss-gradients"; /* Core gradients only */
@import "@casoon/tailwindcss-gradients/src/optional/gradient-presets-extended.css"; /* All additional gradients */
```

### In Tailwind Config
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,svelte,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@casoon/tailwindcss-gradients'),
  ],
  // Import extended presets in your CSS file instead
}
```

### HTML Usage
```html
<!-- Core CASOON gradient (always available) -->
<div class="cs-bg-casoon-original cs-bg-grain-positioned cs-bg-grain-fine">
  Your content with the signature CASOON gradient
</div>

<!-- Extended gradients (after importing optional file) -->
<div class="cs-bg-synthwave cs-bg-preset-animated cs-bg-preset-opacity-80">
  Synthwave gradient with animation and transparency
</div>

<div class="cs-bg-fairy-dust cs-bg-preset-lg cs-bg-preset-breathe">
  Magical fairy dust gradient with breathing animation
</div>
```

## File Sizes

| Package | Size | Gradients | Description |
|---------|------|-----------|-------------|
| **Core** | ~35KB | 8 | Essential gradients including CASOON original |
| **Extended** | ~45KB | 25+ | Complete collection with all themes and utilities |
| **Total** | ~80KB | 33+ | When using both core + extended |

## Performance Notes

- **Core gradients** are optimized for the best performance/size ratio
- **Extended gradients** include more complex multi-layer effects
- Use `cs-bg-preset-gpu-optimized` for animation-heavy gradients
- Mobile optimizations automatically disable grain textures on small screens
- All gradients respect `prefers-reduced-motion` and `prefers-contrast` settings

## Customization

All gradients use CSS custom properties and can be customized:

```css
.my-custom-casoon {
  /* Override CASOON gradient colors */
  --cs-gradient-casoon-blue: #your-blue;
  --cs-gradient-casoon-cyan: #your-cyan;  
  --cs-gradient-casoon-orange: #your-orange;
}
```

Combine classes for unique effects:
```html
<div class="cs-bg-casoon-original cs-bg-preset-subtle cs-bg-grain-fine cs-bg-preset-gpu-optimized">
  Optimized CASOON gradient with fine grain texture
</div>
```
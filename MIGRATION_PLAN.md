# Tailwind v4 CSS-first Migration Plan

## ✅ Abgeschlossene Packages

### 1. tailwindcss-utilities
```
packages/tailwindcss-utilities/
├─ src/
│  ├─ index.css                 # Main entry mit @imports
│  ├─ styles/
│  │  ├─ theme.css             # @theme tokens
│  │  ├─ variants.css          # @custom-variant
│  │  ├─ utilities/
│  │  │  ├─ core.css           # Layout, focus, typography
│  │  │  ├─ colors.css         # Brand & color utilities
│  │  │  └─ effects.css        # Keyframes & animations
│  │  ├─ components/
│  │  │  ├─ acrylic.css        # Glassmorphism surface
│  │  │  ├─ banner.css         # Semantic feedback
│  │  │  ├─ modal.css          # Dialog/overlay primitives  
│  │  │  └─ disclosure.css     # HAS() enhanced components
│  │  └─ fallbacks.css         # A11y, print, reduced-motion
├─ dist.css                     # Build output (existing)
├─ dist.js                      # JS shim: import "./dist.css"
```

### 2. tailwindcss-animations  
```
packages/tailwindcss-animations/
├─ src/
│  ├─ index.css                 # Main entry
│  ├─ styles/
│  │  ├─ theme.css             # Animation tokens (durations, easing)
│  │  ├─ variants.css          # Stagger variants
│  │  ├─ utilities/
│  │  │  ├─ core.css           # .cs-anim engine, controls
│  │  │  ├─ effects.css        # Keyframes + name utilities
│  │  │  └─ stagger.css        # Orchestration utilities
│  │  ├─ components/
│  │  │  ├─ button.css         # .cs-btn-press, .cs-btn-ripple
│  │  │  └─ navigation.css     # .cs-nav-underline-*, .cs-pill-*
│  │  └─ fallbacks.css         # Reduced motion, small screens
├─ dist.js                      # JS shim
```

## 🔄 Noch zu migrieren

### 3. tailwindcss-glass
**Struktur:**
```
src/styles/
├─ theme.css          # --cs-glass-* tokens, color-mix() @supports
├─ variants.css       # Container/media query variants
├─ utilities/
│  ├─ core.css        # .cs-glass base, size variants
│  ├─ colors.css      # Colored glass variants  
│  └─ effects.css     # Acrylic, frosted-edge, noise utilities
├─ components/
│  ├─ card.css        # .cs-glass-card, .cs-glass-card-light
│  ├─ navigation.css  # .cs-glass-nav*  
│  ├─ button.css      # .cs-glass-button
│  └─ overlays.css    # .cs-glass-tooltip, .cs-glass-dropdown
└─ fallbacks.css      # Backdrop-filter fallbacks, contrast, forced-colors
```

### 4. tailwindcss-gradients
**Struktur:**
```
src/styles/
├─ theme.css          # --cs-gradient-* color stops
├─ utilities/
│  ├─ backgrounds.css # Linear/radial/conic gradients
│  ├─ text.css        # Gradient text utilities
│  ├─ borders.css     # .cs-gradient-border
│  └─ effects.css     # Animated gradients, overlays
├─ components/
│  └─ acrylic.css     # .cs-acrylic surface
└─ fallbacks.css      # Print styles, reduced motion
```

### 5. tailwindcss-loading
**Struktur:**
```
src/styles/
├─ theme.css          # Loading colors, sizes, durations
├─ utilities/
│  ├─ states.css      # .cs-loading (disable interactions)
│  └─ helpers.css     # .cs-visually-hidden, .cs-will-change
├─ components/
│  ├─ spinners.css    # .cs-spinner variants
│  └─ overlays.css    # .cs-loading-overlay
└─ fallbacks.css      # Reduced motion
```

### 6-9. Weitere Packages
- **tailwindcss-micro-interactions**
- **tailwindcss-navigation** 
- **tailwindcss-orbs**
- **tailwindcss-scroll**

## 🎯 Zentrale Änderung: tailwindcss-effects

**Vor:** Zusammengeführter Code aus allen anderen Packages  
**Nach:** Import-basiertes Meta-Package

```css
/* packages/tailwindcss-effects/src/index.css */
@import "tailwindcss";

/* Import andere Packages als Dependencies */
@import "@casoon/tailwindcss-utilities";
@import "@casoon/tailwindcss-animations";  
@import "@casoon/tailwindcss-glass";
@import "@casoon/tailwindcss-gradients";
@import "@casoon/tailwindcss-loading";
@import "@casoon/tailwindcss-micro-interactions";
@import "@casoon/tailwindcss-navigation";
@import "@casoon/tailwindcss-orbs";
@import "@casoon/tailwindcss-scroll";
```

## 📦 Package.json Updates

**Für jedes einzelne Package:**
```json
{
  "main": "./dist.js",
  "module": "./dist.js", 
  "style": "./dist.css",
  "sideEffects": [
    "./dist.js",
    "./dist.css", 
    "./dist.min.css"
  ],
  "files": [
    "dist.css",
    "dist.min.css",
    "dist.js",
    "README.md",
    "LICENSE"
  ]
}
```

## 🔨 Build System

**Neue Build Commands:**
```json
{
  "scripts": {
    "build": "tailwindcss -i src/index.css -o dist.css --minify",
    "build:dev": "tailwindcss -i src/index.css -o dist.css --watch",
    "validate": "node ../../scripts/validate-css.mjs"
  }
}
```

## 📋 Nächste Schritte

1. **Glass Package migrieren** (geschätzt: 30min)
2. **Gradients Package migrieren** (geschätzt: 20min)  
3. **Loading Package migrieren** (geschätzt: 15min)
4. **4 weitere Packages analysieren und migrieren** (geschätzt: 1h)
5. **tailwindcss-effects zu Import-System ändern** (geschätzt: 15min)
6. **Alle package.json aktualisieren** (geschätzt: 20min)
7. **Build-System für neue Struktur einrichten** (geschätzt: 30min)

**Total geschätzte Zeit:** ~3.5 Stunden

## 🎉 Vorteile der neuen Struktur

1. **Modulare Entwicklung** - Jeder Aspekt ist klar getrennt
2. **Bessere Wartbarkeit** - Kleinere, fokussierte Dateien
3. **Tailwind v4 CSS-first** - Native @theme, @utility, @custom-variant  
4. **Tree-shakable** - Nur benötigte Module importieren
5. **Bessere DX** - Klare Import-Reihenfolge und Dependency-Struktur
6. **Zukunftssicher** - Bereit für Tailwind v4 Features

## 🔗 Mapping-Listen

Siehe detaillierte Block-zu-Datei Mappings in den abgeschlossenen Packages für Referenz bei den verbleibenden Migrationen.

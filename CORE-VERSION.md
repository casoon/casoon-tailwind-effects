# Core Version - Size Optimization

The `@casoon/tailwindcss-effects` package now offers two variants:

## 🎯 **Core Version (70KB - Recommended)**

**51% smaller** than the full version while keeping all essential functionality.

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/core.css";
```

### Included:
- ✅ **Utilities** - Layout, accessibility, essential patterns (32KB)
- ✅ **Animations** - Keyframes, components, interactions (12KB) 
- ✅ **Loading states** - Spinners, overlays (8KB)
- ✅ **Micro-interactions** - Hover, focus, transitions (11KB)
- ✅ **Navigation** - Nav components, drawers, breadcrumbs (14KB)
- ✅ **Scroll utilities** - Behavior, snap, scrollbar styling (5KB)

### Excluded (use separately if needed):
- ❌ **Glass effects** (32KB) → `@casoon/tailwindcss-glass`
- ❌ **Gradients** (36KB) → `@casoon/tailwindcss-gradients`  
- ❌ **Orbs** (18KB) → `@casoon/tailwindcss-orbs`

## 🎨 **Full Version (144KB)**

Complete package with all decorative effects:

```css
@import "tailwindcss";
@import "@casoon/tailwindcss-effects/styles.css";
```

## Size Comparison

| Version | Size | Reduction | Use Case |
|---------|------|-----------|----------|
| **Core** | 70KB | **51% smaller** | Production apps, essential effects |
| **Full** | 144KB | - | Design systems, maximum features |

## Migration

**No breaking changes!** The default import remains the same:

```css
/* Still works - imports full version */
@import "@casoon/tailwindcss-effects";

/* New - imports core version */  
@import "@casoon/tailwindcss-effects/core.css";
```

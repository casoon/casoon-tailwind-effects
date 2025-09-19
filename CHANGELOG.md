# Changelog

All notable changes to the Casoon Tailwind Effects packages will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2025-01-19 🎉 MAJOR CONSOLIDATION RELEASE

### 🚨 BREAKING CHANGES

**Package Consolidation**: Reduced from 16 packages to 6 packages (-62% reduction)

#### Removed Packages (Functionality Moved to Core Packages)
- ❌ `tailwindcss-cards` → ✅ **Integrated into `tailwindcss-utilities`**
- ❌ `tailwindcss-forms` → ✅ **Integrated into `tailwindcss-utilities`**
- ❌ `tailwindcss-loading` → ✅ **Integrated into `tailwindcss-utilities`**
- ❌ `tailwindcss-navigation` → ✅ **Integrated into `tailwindcss-utilities`**
- ❌ `tailwindcss-micro-interactions` → ✅ **Integrated into `tailwindcss-animations`**
- ❌ `tailwindcss-scroll` → ✅ **Integrated into `tailwindcss-utilities`**
- ❌ `tailwindcss-typography` → ✅ **Integrated into `tailwindcss-utilities`**
- ❌ `tailwindcss-gradients` → ✅ **Already included in `tailwindcss-utilities`**

#### Migration Path
```css
/* Before v0.9.0 */
@import "@casoon/tailwindcss-cards";
@import "@casoon/tailwindcss-forms";
@import "@casoon/tailwindcss-loading";

/* After v0.9.0 */
@import "@casoon/tailwindcss-utilities"; /* All features included */
```

### ✨ NEW FEATURES

#### 🛠️ @casoon/tailwindcss-utilities v0.9.0
- **🔄 Loading System**: Added `cs-spinner`, `cs-skeleton`, `cs-progress`, `cs-progress-indeterminate`
- **🎨 Enhanced Cards**: Added `cs-card-product`, `cs-card-hero`, `cs-card-compact`
- **📜 Scroll Utilities**: Added `cs-scroll-smooth`, `cs-scrollbar-none`, `cs-snap-*` classes
- **📚 Typography System**: Added `cs-text-balance`, `cs-prose`, `cs-font-feature-numbers`
- **🎯 200+ Total Utilities**: Complete system with forms, buttons, badges, avatars, alerts

#### 🎬 @casoon/tailwindcss-animations v0.9.0
- **🎼 Advanced Stagger System**: Up to 12 elements with precise timing (`cs-stagger-*`)
- **🎭 3D Animations**: Hardware-accelerated transforms (`cs-reveal-3d-*`, `cs-flip-3d-*`)
- **⚡ Advanced Easing**: Spring, bounce, elastic curves (`cs-ease-spring`, `cs-ease-bounce`)
- **📜 Scroll-Timeline**: Modern CSS scroll animations with fallbacks
- **🎯 Component Animations**: Button press, ripple effects, notifications
- **🔄 Loading States**: Skeleton shimmer, progress grow, dot loaders
- **📰 Marquee**: Continuous scrolling text effects
- **🛠️ Performance**: Hardware acceleration hints (`cs-will-transform`)

#### ✨ @casoon/tailwindcss-glass v0.9.0 (New!)
- **🎨 Complete Glass System**: Full glass-morphism library
- **🔍 Multiple Blur Levels**: `cs-glass-light`, `cs-glass`, `cs-glass-blur`
- **🌈 Color Variants**: Blue, purple, green, pink, amber glass effects
- **🏗️ Component Classes**: `cs-glass-card`, `cs-glass-nav`, `cs-glass-modal`
- **🎭 Smart Fallbacks**: Graceful degradation for unsupported browsers
- **📱 Responsive**: Mobile and desktop optimizations

### 🔧 IMPROVEMENTS

#### All Core Packages
- **📦 Legacy CSS Support**: Pre-compiled `dist.css` and `dist.min.css` for non-Tailwind projects
- **🎯 Tree-Shaking**: Only used utilities included in final build
- **♿ Accessibility**: Complete `prefers-reduced-motion` support
- **📱 Device Optimization**: Touch device and print media support
- **🎨 Design Tokens**: Comprehensive CSS custom properties system
- **📖 Documentation**: Extensive README with real-world examples

#### Performance Optimizations
- **⚡ Hardware Acceleration**: Optimized transforms and animations
- **🗜️ Bundle Size**: Efficient CSS with modern compression
- **🔄 Modern CSS**: CSS custom properties and container queries
- **💾 Caching**: Better browser caching with stable class names

### 📊 METRICS

#### Package Reduction
- **Before**: 16 packages
- **After**: 6 packages (-62% reduction)
- **Maintenance Effort**: Significantly reduced

#### Feature Consolidation
- **tailwindcss-utilities**: 200+ utilities (was 120+)
- **tailwindcss-animations**: 80+ animations (was 60+)  
- **tailwindcss-glass**: New comprehensive glass system
- **Total Features**: 300+ utilities and effects

#### Bundle Sizes (Minified)
- **tailwindcss-utilities**: 27KB
- **tailwindcss-animations**: ~20KB
- **tailwindcss-glass**: ~15KB
- **Total**: ~62KB for complete system

### 🏗️ INFRASTRUCTURE

#### Build System
- **dist.css Generation**: Automated legacy CSS compilation
- **Minification**: Automated dist.min.css creation
- **Validation**: Enhanced CSS validation and testing
- **Tree-Shaking Tests**: Comprehensive build reference files

#### Documentation
- **README Updates**: Complete API documentation for all packages
- **Real-World Examples**: Production-ready code examples
- **Migration Guides**: Clear upgrade paths
- **Performance Guidelines**: Optimization best practices

### 🎯 FINAL PACKAGE STRUCTURE

```
packages/
├── tailwindcss-utilities/     # 🌟 CORE v0.9.0 (200+ utilities)
├── tailwindcss-animations/    # 🎬 CORE v0.9.0 (80+ animations)
├── tailwindcss-glass/         # ✨ CORE v0.9.0 (glass morphism)
├── tailwindcss-orbs/          # 🎯 SPECIALIZED (gradient orbs)
├── tailwindcss-core/          # 🏗️ BASE (design tokens)
└── tailwindcss-effects/       # 📦 META (bundle)
```

### 🔄 MIGRATION GUIDE

#### Step 1: Update Dependencies
```bash
# Remove old packages
npm uninstall @casoon/tailwindcss-cards @casoon/tailwindcss-forms @casoon/tailwindcss-loading

# Update to v0.9.0
npm install @casoon/tailwindcss-utilities@^0.9.0
npm install @casoon/tailwindcss-animations@^0.9.0
npm install @casoon/tailwindcss-glass@^0.9.0
```

#### Step 2: Update Imports
```css
/* Remove old imports */
/* @import "@casoon/tailwindcss-cards"; */
/* @import "@casoon/tailwindcss-forms"; */
/* @import "@casoon/tailwindcss-loading"; */

/* Use consolidated imports */
@import "tailwindcss";
@import "@casoon/tailwindcss-utilities";
@import "@casoon/tailwindcss-animations";
@import "@casoon/tailwindcss-glass"; /* Optional */
```

#### Step 3: Update Classes (Most are unchanged!)
```html
<!-- Cards: No changes needed -->
<div class="cs-card">...</div>

<!-- Forms: No changes needed -->
<input class="cs-input cs-focus-ring">

<!-- Loading: New utilities available -->
<div class="cs-skeleton"></div> <!-- Same as before -->
<div class="cs-progress">...</div> <!-- Enhanced -->

<!-- Animations: Enhanced with new features -->
<div class="cs-fade-in cs-anim cs-ease-spring">...</div> <!-- New easing -->

<!-- Glass: New package -->
<div class="cs-glass">...</div> <!-- New! -->
```

### ⚠️ COMPATIBILITY

- **Tailwind CSS v4**: Full support with tree-shaking
- **Legacy Projects**: Use `dist.css` files for non-Tailwind projects
- **Browser Support**: Modern browsers with graceful fallbacks
- **Node.js**: v16+ recommended

### 🙏 ACKNOWLEDGMENTS

This major release represents months of consolidation work to create a more maintainable, performant, and user-friendly package ecosystem. Thank you to all contributors and users who provided feedback during the development process.

---

## Previous Releases

### [0.8.x] - Various dates
- Individual package releases
- Initial Tailwind CSS v4 support
- Basic utility systems

### [0.7.x] - Various dates
- Legacy Tailwind CSS v3 support
- Initial package structure
- Foundation work

---

For older releases, see individual package changelogs in their respective directories.
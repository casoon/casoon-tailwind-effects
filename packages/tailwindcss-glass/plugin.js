// plugin.js — @casoon/tailwindcss-glass (Tailwind v4 plugin)
// Usage in your app CSS:
//   @import "tailwindcss";
//   @plugin "@casoon/tailwindcss-glass/plugin";

import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addBase, addComponents, addUtilities }) {
  /* ---------------------------
   * 0) Base tokens & keyframes
   * --------------------------- */
  addBase({
    ':root': {
      colorScheme: 'light dark',

      /* Brand/Base colors */
      '--cs-glass-white': '#ffffff',
      '--cs-glass-black': '#000000',
      '--cs-glass-blue': '#3b82f6',
      '--cs-glass-purple': '#9333ea',
      '--cs-glass-green': '#22c55e',
      '--cs-glass-pink': '#ec4899',
      '--cs-glass-amber': '#f59e0b',

      /* Backgrounds (hard rgba fallbacks) */
      '--cs-glass-bg-light': 'rgba(255,255,255,0.10)',
      '--cs-glass-bg-weak': 'rgba(255,255,255,0.05)',
      '--cs-glass-bg-medium': 'rgba(255,255,255,0.15)',
      '--cs-glass-bg-strong': 'rgba(255,255,255,0.20)',
      '--cs-glass-bg-dark': 'rgba(0,0,0,0.10)',
      '--cs-glass-bg-dark-strong': 'rgba(0,0,0,0.20)',

      '--cs-glass-bg-blue': 'rgba(59,130,246,0.10)',
      '--cs-glass-bg-purple': 'rgba(147,51,234,0.10)',
      '--cs-glass-bg-green': 'rgba(34,197,94,0.10)',
      '--cs-glass-bg-pink': 'rgba(236,72,153,0.10)',
      '--cs-glass-bg-amber': 'rgba(245,158,11,0.10)',

      /* Borders (hard rgba fallbacks) */
      '--cs-glass-border-light': 'rgba(255,255,255,0.10)',
      '--cs-glass-border-medium': 'rgba(255,255,255,0.20)',
      '--cs-glass-border-strong': 'rgba(255,255,255,0.30)',
      '--cs-glass-border-blue': 'rgba(59,130,246,0.20)',
      '--cs-glass-border-purple': 'rgba(147,51,234,0.20)',
      '--cs-glass-border-green': 'rgba(34,197,94,0.20)',
      '--cs-glass-border-pink': 'rgba(236,72,153,0.20)',
      '--cs-glass-border-amber': 'rgba(245,158,11,0.20)',

      /* Shadow colors (hard rgba fallbacks) */
      '--cs-glass-shadow-light': 'rgba(0,0,0,0.05)',
      '--cs-glass-shadow-medium': 'rgba(0,0,0,0.10)',
      '--cs-glass-shadow-strong': 'rgba(0,0,0,0.15)',
      '--cs-glass-shadow-xl': 'rgba(0,0,0,0.20)',

      /* Misc backgrounds */
      '--cs-glass-tooltip-bg': 'rgba(0,0,0,0.80)',
      '--cs-glass-bg-hover': 'rgba(255,255,255,0.15)',
      '--cs-glass-bg-light-hover': 'rgba(255,255,255,0.25)',
      '--cs-glass-bg-contrast': 'rgba(255,255,255,0.20)',
      '--cs-glass-bg-dark-contrast': 'rgba(0,0,0,0.20)',

      /* Fallbacks (no backdrop-filter) */
      '--cs-glass-bg-fallback': 'rgba(255,255,255,0.25)',
      '--cs-glass-bg-dark-fallback': 'rgba(0,0,0,0.25)',
      '--cs-glass-bg-blue-fallback': 'rgba(59,130,246,0.20)',
      '--cs-glass-bg-purple-fallback': 'rgba(147,51,234,0.20)',
      '--cs-glass-bg-green-fallback': 'rgba(34,197,94,0.20)',
      '--cs-glass-bg-pink-fallback': 'rgba(236,72,153,0.20)',
      '--cs-glass-bg-amber-fallback': 'rgba(245,158,11,0.20)',

      /* Focus ring */
      '--cs-glass-focus-ring': 'rgba(59,130,246,0.50)',

      /* Parametric tokens */
      '--cs-glass-blur-sm': 'blur(8px)',
      '--cs-glass-blur': 'blur(16px)',
      '--cs-glass-blur-lg': 'blur(24px)',
      '--cs-glass-blur-xl': 'blur(32px)',

      '--cs-glass-radius-sm': '.25rem',
      '--cs-glass-radius': '.5rem',
      '--cs-glass-radius-lg': '.75rem',
      '--cs-glass-radius-xl': '1rem',
      '--cs-glass-radius-2xl': '1.5rem',
      '--cs-glass-radius-3xl': '2rem',

      /* Box-shadow presets */
      '--cs-glass-shadow-sm-def': '0 1px 2px var(--cs-glass-shadow-light)',
      '--cs-glass-shadow-def': '0 8px 32px var(--cs-glass-shadow-medium)',
      '--cs-glass-shadow-lg-def': '0 20px 40px var(--cs-glass-shadow-strong)',
      '--cs-glass-shadow-xl-def': '0 25px 50px var(--cs-glass-shadow-xl)',

      /* Timings & backdrop fine-tuning */
      '--cs-glass-transition': '.3s',
      '--cs-glass-backdrop-filter-extra': 'none',
    },

    /* color-mix upgrades */
    '@supports (color: color-mix(in srgb, white 10%, transparent))': {
      ':root': {
        '--cs-glass-bg-light':
          'color-mix(in srgb, var(--cs-glass-white) 10%, transparent)',
        '--cs-glass-bg-weak':
          'color-mix(in srgb, var(--cs-glass-white) 5%, transparent)',
        '--cs-glass-bg-medium':
          'color-mix(in srgb, var(--cs-glass-white) 15%, transparent)',
        '--cs-glass-bg-strong':
          'color-mix(in srgb, var(--cs-glass-white) 20%, transparent)',
        '--cs-glass-bg-dark':
          'color-mix(in srgb, var(--cs-glass-black) 10%, transparent)',
        '--cs-glass-bg-dark-strong':
          'color-mix(in srgb, var(--cs-glass-black) 20%, transparent)',

        '--cs-glass-bg-blue':
          'color-mix(in srgb, var(--cs-glass-blue) 10%, transparent)',
        '--cs-glass-bg-purple':
          'color-mix(in srgb, var(--cs-glass-purple) 10%, transparent)',
        '--cs-glass-bg-green':
          'color-mix(in srgb, var(--cs-glass-green) 10%, transparent)',
        '--cs-glass-bg-pink':
          'color-mix(in srgb, var(--cs-glass-pink) 10%, transparent)',
        '--cs-glass-bg-amber':
          'color-mix(in srgb, var(--cs-glass-amber) 10%, transparent)',

        '--cs-glass-border-light':
          'color-mix(in srgb, var(--cs-glass-white) 10%, transparent)',
        '--cs-glass-border-medium':
          'color-mix(in srgb, var(--cs-glass-white) 20%, transparent)',
        '--cs-glass-border-strong':
          'color-mix(in srgb, var(--cs-glass-white) 30%, transparent)',
        '--cs-glass-border-blue':
          'color-mix(in srgb, var(--cs-glass-blue) 20%, transparent)',
        '--cs-glass-border-purple':
          'color-mix(in srgb, var(--cs-glass-purple) 20%, transparent)',
        '--cs-glass-border-green':
          'color-mix(in srgb, var(--cs-glass-green) 20%, transparent)',
        '--cs-glass-border-pink':
          'color-mix(in srgb, var(--cs-glass-pink) 20%, transparent)',
        '--cs-glass-border-amber':
          'color-mix(in srgb, var(--cs-glass-amber) 20%, transparent)',

        '--cs-glass-shadow-light':
          'color-mix(in srgb, var(--cs-glass-black) 5%, transparent)',
        '--cs-glass-shadow-medium':
          'color-mix(in srgb, var(--cs-glass-black) 10%, transparent)',
        '--cs-glass-shadow-strong':
          'color-mix(in srgb, var(--cs-glass-black) 15%, transparent)',
        '--cs-glass-shadow-xl':
          'color-mix(in srgb, var(--cs-glass-black) 20%, transparent)',

        '--cs-glass-tooltip-bg':
          'color-mix(in srgb, var(--cs-glass-black) 80%, transparent)',
        '--cs-glass-bg-hover':
          'color-mix(in srgb, var(--cs-glass-white) 15%, transparent)',
        '--cs-glass-bg-light-hover':
          'color-mix(in srgb, var(--cs-glass-white) 25%, transparent)',
        '--cs-glass-bg-contrast':
          'color-mix(in srgb, var(--cs-glass-white) 20%, transparent)',
        '--cs-glass-bg-dark-contrast':
          'color-mix(in srgb, var(--cs-glass-black) 20%, transparent)',

        '--cs-glass-bg-fallback':
          'color-mix(in srgb, var(--cs-glass-white) 25%, transparent)',
        '--cs-glass-bg-dark-fallback':
          'color-mix(in srgb, var(--cs-glass-black) 25%, transparent)',
        '--cs-glass-bg-blue-fallback':
          'color-mix(in srgb, var(--cs-glass-blue) 20%, transparent)',
        '--cs-glass-bg-purple-fallback':
          'color-mix(in srgb, var(--cs-glass-purple) 20%, transparent)',
        '--cs-glass-bg-green-fallback':
          'color-mix(in srgb, var(--cs-glass-green) 20%, transparent)',
        '--cs-glass-bg-pink-fallback':
          'color-mix(in srgb, var(--cs-glass-pink) 20%, transparent)',
        '--cs-glass-bg-amber-fallback':
          'color-mix(in srgb, var(--cs-glass-amber) 20%, transparent)',
      },
    },

    /* dark scheme tuning */
    '@media (prefers-color-scheme: dark)': {
      ':root': {
        '--cs-glass-bg-light':
          'color-mix(in srgb, var(--cs-glass-black) 12%, transparent)',
        '--cs-glass-border-medium':
          'color-mix(in srgb, var(--cs-glass-white) 28%, transparent)',
        '--cs-glass-shadow-medium':
          'color-mix(in srgb, var(--cs-glass-black) 14%, transparent)',
      },
    },

    /* mobile performance */
    '@media (max-width: 480px)': {
      ':root': {
        '--cs-glass-blur': 'var(--cs-glass-blur-sm)',
      },
    },

    /* keyframes */
    '@keyframes glassMorphIn': {
      from: {
        opacity: '0',
        transform: 'scale(0.95)',
        backdropFilter: 'blur(0px)',
      },
      to: {
        opacity: '1',
        transform: 'scale(1)',
        backdropFilter: 'var(--cs-glass-blur)',
      },
    },
    '@keyframes glassMorphOut': {
      from: {
        opacity: '1',
        transform: 'scale(1)',
      },
      to: {
        opacity: '0',
        transform: 'scale(0.95)',
      },
    },
    '@keyframes glassSkeletonShimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  });

  /* ----------------------------------------
   * Helpers to reduce duplication
   * ---------------------------------------- */
  const baseBackdrop = {
    WebkitBackdropFilter: 'var(--cs-glass-blur) var(--cs-glass-backdrop-filter-extra)',
    backdropFilter: 'var(--cs-glass-blur) var(--cs-glass-backdrop-filter-extra)',
    backgroundClip: 'padding-box',
  };

  const components = {};

  // 1) Base glass/backdrop for groups
  [
    '.cs-glass',
    '.cs-glass-dark',
    '.cs-glass-sm',
    '.cs-glass-lg',
    '.cs-glass-weak',
    '.cs-glass-medium',
    '.cs-glass-strong',
  ].forEach((sel) => (components[sel] = { ...baseBackdrop }));

  ['.cs-glass-blue', '.cs-glass-purple', '.cs-glass-green', '.cs-glass-pink', '.cs-glass-amber'].forEach(
    (sel) => (components[sel] = { ...baseBackdrop }),
  );

  ['.cs-glass-card', '.cs-glass-card-light', '.cs-glass-nav', '.cs-glass-nav-light', '.cs-glass-button', '.cs-glass-toast', '.cs-glass-tooltip', '.cs-glass-dropdown'].forEach(
    (sel) => (components[sel] = { ...baseBackdrop, backgroundClip: 'padding-box' }),
  );

  // 2) Utilities
  Object.assign(components, {
    /* Base Glass Effects */
    '.cs-glass': {
      ...components['.cs-glass'],
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
    },
    '.cs-glass-dark': {
      ...components['.cs-glass-dark'],
      background: 'var(--cs-glass-bg-dark)',
      border: '1px solid var(--cs-glass-border-light)',
    },

    /* Size Variants */
    '.cs-glass-sm': { '--cs-glass-blur': 'var(--cs-glass-blur-sm)' },
    '.cs-glass-lg': { '--cs-glass-blur': 'var(--cs-glass-blur-lg)' },

    /* Intensity Variants */
    '.cs-glass-weak': {
      '--cs-glass-blur': 'var(--cs-glass-blur-sm)',
      background: 'var(--cs-glass-bg-weak)',
      border: '1px solid var(--cs-glass-border-light)',
    },
    '.cs-glass-medium': {
      '--cs-glass-blur': 'var(--cs-glass-blur)',
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
    },
    '.cs-glass-strong': {
      '--cs-glass-blur': 'var(--cs-glass-blur-xl)',
      background: 'var(--cs-glass-bg-medium)',
      border: '1px solid var(--cs-glass-border-strong)',
    },

    /* Colored Glass Variants */
    '.cs-glass-blue': {
      background: 'var(--cs-glass-bg-blue)',
      border: '1px solid var(--cs-glass-border-blue)',
    },
    '.cs-glass-purple': {
      background: 'var(--cs-glass-bg-purple)',
      border: '1px solid var(--cs-glass-border-purple)',
    },
    '.cs-glass-green': {
      background: 'var(--cs-glass-bg-green)',
      border: '1px solid var(--cs-glass-border-green)',
    },
    '.cs-glass-pink': {
      background: 'var(--cs-glass-bg-pink)',
      border: '1px solid var(--cs-glass-border-pink)',
    },
    '.cs-glass-amber': {
      background: 'var(--cs-glass-bg-amber)',
      border: '1px solid var(--cs-glass-border-amber)',
    },

    /* Border Radius Variants */
    '.cs-glass-rounded-sm': { borderRadius: 'var(--cs-glass-radius-sm)' },
    '.cs-glass-rounded': { borderRadius: 'var(--cs-glass-radius)' },
    '.cs-glass-rounded-lg': { borderRadius: 'var(--cs-glass-radius-lg)' },
    '.cs-glass-rounded-xl': { borderRadius: 'var(--cs-glass-radius-xl)' },
    '.cs-glass-rounded-2xl': { borderRadius: 'var(--cs-glass-radius-2xl)' },
    '.cs-glass-rounded-3xl': { borderRadius: 'var(--cs-glass-radius-3xl)' },

    /* Shadow Variants */
    '.cs-glass-shadow-sm': { boxShadow: 'var(--cs-glass-shadow-sm-def)' },
    '.cs-glass-shadow': { boxShadow: 'var(--cs-glass-shadow-def)' },
    '.cs-glass-shadow-lg': { boxShadow: 'var(--cs-glass-shadow-lg-def)' },
    '.cs-glass-shadow-xl': { boxShadow: 'var(--cs-glass-shadow-xl-def)' },

    /* Components */
    '.cs-glass-card': {
      ...components['.cs-glass-card'],
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: 'var(--cs-glass-shadow-def)',
      transition: 'all var(--cs-glass-transition) ease',
    },
    '.cs-glass-card:hover': {
      background: 'var(--cs-glass-bg-hover)',
      boxShadow: '0 20px 40px var(--cs-glass-shadow-strong)',
      transform: 'translateY(-2px)',
      border: '1px solid var(--cs-glass-border-strong)',
    },
    '.cs-glass-card:focus-within': {
      outline: '2px solid var(--cs-glass-focus-ring)',
      outlineOffset: '2px',
    },

    '.cs-glass-card-light': {
      ...components['.cs-glass-card-light'],
      background: 'var(--cs-glass-bg-medium)',
      border: '1px solid var(--cs-glass-border-strong)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: 'var(--cs-glass-shadow-def)',
      transition: 'all var(--cs-glass-transition) ease',
    },
    '.cs-glass-card-light:hover': {
      background: 'var(--cs-glass-bg-light-hover)',
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 24px var(--cs-glass-shadow-strong)',
    },
    '.cs-glass-card-light:focus-within': {
      outline: '2px solid var(--cs-glass-focus-ring)',
      outlineOffset: '2px',
    },

    '.cs-glass-nav': {
      ...components['.cs-glass-nav'],
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: '12px',
      boxShadow: 'var(--cs-glass-shadow-def)',
      transition: 'all var(--cs-glass-transition) ease',
    },
    '.cs-glass-nav-light': {
      ...components['.cs-glass-nav-light'],
      background: 'var(--cs-glass-bg-medium)',
      border: '1px solid var(--cs-glass-border-strong)',
      borderRadius: '12px',
      boxShadow: 'var(--cs-glass-shadow-def)',
      transition: 'all var(--cs-glass-transition) ease',
    },

    '.cs-glass-button': {
      ...components['.cs-glass-button'],
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: '12px',
      padding: '0.75rem 1.5rem',
      transition: 'all var(--cs-glass-transition) ease',
      cursor: 'pointer',
      minHeight: '2.5rem',
      minWidth: '2.5rem',
      WebkitTapHighlightColor: 'transparent',
    },
    '.cs-glass-button:hover': {
      background: 'var(--cs-glass-bg-hover)',
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 16px var(--cs-glass-shadow-medium)',
    },
    '.cs-glass-button:focus, .cs-glass-button:focus-visible': {
      outline: '2px solid var(--cs-glass-focus-ring)',
      outlineOffset: '2px',
    },
    '.cs-glass-button:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 8px var(--cs-glass-shadow-medium)',
    },

    '.cs-glass-toast': {
      ...components['.cs-glass-toast'],
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: '0.75rem',
      padding: '1rem 1.5rem',
      boxShadow: '0 8px 32px var(--cs-glass-shadow-strong)',
      position: 'relative',
      overflow: 'hidden',
    },

    '.cs-glass-tooltip': {
      ...components['.cs-glass-tooltip'],
      background: 'var(--cs-glass-tooltip-bg)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: '0.5rem',
      padding: '0.5rem 0.75rem',
      boxShadow: '0 4px 16px var(--cs-glass-shadow-xl)',
      fontSize: '0.875rem',
      color: 'white',
      whiteSpace: 'nowrap',
      zIndex: '50',
    },

    '.cs-glass-dropdown': {
      ...components['.cs-glass-dropdown'],
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--cs-glass-shadow-def)',
      padding: '0.5rem',
      minWidth: '12rem',
      zIndex: '50',
    },

    /* Pro: animated morph effects */
    '.cs-glass-morph-in': {
      animation: 'glassMorphIn 0.4s ease-out both',
    },
    '.cs-glass-morph-out': {
      animation: 'glassMorphOut 0.3s ease-in both',
    },

    /* Pro: 3D hover */
    '.cs-glass-3d-hover': {
      transformStyle: 'preserve-3d',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    '.cs-glass-3d-hover:hover': {
      transform: 'rotateX(6deg) rotateY(-4deg) scale(1.02)',
      boxShadow: '0 24px 48px var(--cs-glass-shadow-xl)',
    },

    /* Pro: glossy highlights */
    '.cs-glass-gloss-top::before, .cs-glass-gloss-left::before, .cs-glass-gloss-right::before, .cs-glass-gloss-bottom::before': {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: '2',
      mixBlendMode: 'soft-light',
    },
    '.cs-glass-gloss-top::before': {
      top: '0',
      left: '0',
      right: '0',
      height: '20%',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
    },
    '.cs-glass-gloss-left::before': {
      top: '0',
      bottom: '0',
      left: '0',
      width: '15%',
      background: 'linear-gradient(to right, rgba(255,255,255,0.35), transparent)',
    },
    '.cs-glass-gloss-right::before': {
      top: '0',
      bottom: '0',
      right: '0',
      width: '15%',
      background: 'linear-gradient(to left, rgba(255,255,255,0.35), transparent)',
    },
    '.cs-glass-gloss-bottom::before': {
      bottom: '0',
      left: '0',
      right: '0',
      height: '20%',
      background: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)',
    },

    /* Pro: skeleton blocks */
    '.cs-glass-skeleton': {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--cs-glass-bg-light)',
      border: '1px solid var(--cs-glass-border-medium)',
      borderRadius: 'var(--cs-glass-radius)',
      minHeight: '2rem',
      isolation: 'isolate',
    },
    '.cs-glass-skeleton::after': {
      content: '""',
      position: 'absolute',
      inset: '0',
      background:
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      animation: 'glassSkeletonShimmer 1.2s infinite',
    },

    /* Pro: theme presets */
    '.cs-glass-theme-neon': {
      '--cs-glass-bg-light': 'rgba(58, 227, 255, 0.1)',
      '--cs-glass-border-medium': 'rgba(58, 227, 255, 0.25)',
      '--cs-glass-shadow-def': '0 8px 32px rgba(58, 227, 255, 0.25)',
      '--cs-glass-focus-ring': 'rgba(58, 227, 255, 0.6)',
    },
    '.cs-glass-theme-carbon': {
      '--cs-glass-bg-light': 'rgba(30, 30, 30, 0.25)',
      '--cs-glass-border-medium': 'rgba(255, 255, 255, 0.08)',
      '--cs-glass-shadow-def': '0 8px 32px rgba(0,0,0,0.4)',
      '--cs-glass-focus-ring': 'rgba(255, 255, 255, 0.3)',
    },
    '.cs-glass-theme-pastel': {
      '--cs-glass-bg-light': 'rgba(255, 230, 250, 0.12)',
      '--cs-glass-border-medium': 'rgba(255, 230, 250, 0.25)',
      '--cs-glass-shadow-def': '0 8px 32px rgba(255, 230, 250, 0.25)',
      '--cs-glass-focus-ring': 'rgba(255, 230, 250, 0.6)',
    },

    /* Container queries */
    '@container (min-width: 320px)': {
      '.cs-glass-responsive': { '--cs-glass-blur': 'var(--cs-glass-blur-sm)' },
    },
    '@container (min-width: 640px)': {
      '.cs-glass-responsive': { '--cs-glass-blur': 'var(--cs-glass-blur)' },
    },
    '@container (min-width: 1024px)': {
      '.cs-glass-responsive': { '--cs-glass-blur': 'var(--cs-glass-blur-lg)' },
    },

    /* Motion Safety & Contrast */
    '@media (prefers-reduced-motion: reduce)': {
      '.cs-glass-card, .cs-glass-card-light, .cs-glass-button, .cs-glass-toast': {
        transition: 'none',
      },
      '.cs-glass-card:hover, .cs-glass-card-light:hover, .cs-glass-button:hover, .cs-glass-toast:hover': {
        transform: 'none',
      },
    },

    '@media (prefers-contrast: high)': {
      '.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button': {
        borderWidth: '2px',
        background: 'var(--cs-glass-bg-contrast)',
      },
      '.cs-glass-dark': {
        background: 'var(--cs-glass-bg-dark-contrast)',
        borderColor: 'var(--cs-glass-border-strong)',
      },
    },

    /* Windows High Contrast (forced colors) */
    '@media (forced-colors: active)': {
      '.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button': {
        background: 'Canvas',
        borderColor: 'CanvasText',
        boxShadow: 'none',
      },
      '.cs-glass-tooltip': {
        background: 'CanvasText',
        color: 'Canvas',
        borderColor: 'CanvasText',
        boxShadow: 'none',
      },
    },

    /* Fallbacks (no backdrop-filter) */
    '@supports not (backdrop-filter: blur(16px))': {
      '.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button': {
        background: 'var(--cs-glass-bg-fallback)',
        boxShadow: '0 4px 16px var(--cs-glass-shadow-medium)',
      },
      '.cs-glass-dark': { background: 'var(--cs-glass-bg-dark-fallback)' },

      '.cs-glass-blue': { background: 'var(--cs-glass-bg-blue-fallback)' },
      '.cs-glass-purple': { background: 'var(--cs-glass-bg-purple-fallback)' },
      '.cs-glass-green': { background: 'var(--cs-glass-bg-green-fallback)' },
      '.cs-glass-pink': { background: 'var(--cs-glass-bg-pink-fallback)' },
      '.cs-glass-amber': { background: 'var(--cs-glass-bg-amber-fallback)' },
    },
  });

  /* ----------------------------------------
   * 3) Atomic-ish utilities (z-index, blends…)
   * ---------------------------------------- */
  addUtilities(
    {
      /* Text contrast helpers */
      '.cs-glass-on': { color: 'var(--cs-glass-on, #0f172a)' },
      '.cs-glass-on-invert': { color: 'var(--cs-glass-on-invert, #ffffff)' },

      /* Disabled/read-only helper */
      '.cs-glass-disabled': {
        opacity: '.6',
        filter: 'grayscale(20%)',
        pointerEvents: 'none',
      },

      /* Elevation helpers */
      '.cs-glass-elev-1': { zIndex: '10' },
      '.cs-glass-elev-2': { zIndex: '20' },
      '.cs-glass-elev-3': { zIndex: '30' },
      '.cs-glass-elev-4': { zIndex: '40' },
      '.cs-glass-elev-5': { zIndex: '50' },

      /* Blend modes */
      '.cs-glass-blend-overlay': { mixBlendMode: 'overlay' },
      '.cs-glass-blend-screen': { mixBlendMode: 'screen' },
      '.cs-glass-blend-multiply': { mixBlendMode: 'multiply' },

      /* Layout helpers */
      '.cs-glass-sticky': { position: 'sticky', top: '0' },
      '.cs-glass-will-change': { willChange: 'transform, backdrop-filter' },

      /* Acrylic opt-in */
      '.cs-glass-acrylic': {
        '--cs-glass-backdrop-filter-extra': 'saturate(135%) contrast(110%)',
      },

      /* Frosted edge */
      '.cs-glass-frosted-edge': {
        boxShadow:
          'inset 0 1px 0 color-mix(in srgb, var(--cs-glass-white) 40%, transparent), var(--cs-glass-shadow-def)',
      },

      /* Noise overlay container + layer */
      '.cs-glass-noise': { position: 'relative', isolation: 'isolate' },
      '.cs-glass-noise::after': {
        content: '""',
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        opacity: '.07',
        backgroundImage: 'var(--cs-glass-noise-img, none)',
        backgroundSize: '200px 200px',
        zIndex: '1',
      },
    },
    { respectImportant: false },
  );
});

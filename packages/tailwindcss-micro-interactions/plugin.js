import plugin from 'tailwindcss/plugin';

/**
 * @casoon/tailwindcss-micro-interactions - Tailwind CSS Plugin
 * 
 * Micro-interaction utilities for Tailwind CSS v4.
 */
export default plugin(function ({ addUtilities, addBase, theme }) {
  // Get configuration options from theme
  const options = theme('microInteractions') || {};
  
  // Default color tokens for micro-interactions
  const defaultTokens = {
    colors: {
      'focus-ring': '#3b82f6', // Blue focus color
      'shadow': '#000000'      // Black shadow
    },
    opacity: {
      'focus-strong': '50%',
      'focus-medium': '30%',
      'shadow-light': '10%'
    }
  };
  
  // Merge with user options
  const tokens = {
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) },
    opacity: { ...defaultTokens.opacity, ...(options.tokens?.opacity || {}) }
  };
      // Add CSS custom properties (tokens)
      addBase({
        ':root': {
          '--cs-micro-focus-ring': tokens.colors['focus-ring'],
          '--cs-micro-shadow': tokens.colors.shadow,
          // Focus ring colors with color-mix
          '--cs-micro-focus-ring-strong': `color-mix(in srgb, var(--cs-micro-focus-ring) ${tokens.opacity['focus-strong']}, transparent)`,
          '--cs-micro-focus-ring-medium': `color-mix(in srgb, var(--cs-micro-focus-ring) ${tokens.opacity['focus-medium']}, transparent)`,
          '--cs-micro-shadow-light': `color-mix(in srgb, var(--cs-micro-shadow) ${tokens.opacity['shadow-light']}, transparent)`
        }
      });
      // Micro-interaction utilities
      addUtilities({
        // Hover scale effects
        '.cs-hover-scale-95': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'scale(0.95)' }
        },
        '.cs-hover-scale-105': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'scale(1.05)' }
        },
        '.cs-hover-scale-110': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'scale(1.10)' }
        },
        
        // Hover fade effects
        '.cs-hover-fade-in': {
          'opacity': '0.7',
          'transition': 'opacity 0.2s ease',
          '&:hover': { 'opacity': '1' }
        },
        '.cs-hover-fade-out': {
          'opacity': '1',
          'transition': 'opacity 0.2s ease',
          '&:hover': { 'opacity': '0.7' }
        },
        
        // Hover brightness effects
        '.cs-hover-brighten': {
          'transition': 'filter 0.2s ease',
          '&:hover': { 'filter': 'brightness(1.1)' }
        },
        '.cs-hover-darken': {
          'transition': 'filter 0.2s ease',
          '&:hover': { 'filter': 'brightness(0.9)' }
        },
        
        // Hover rotation effects
        '.cs-hover-rotate-1': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'rotate(1deg)' }
        },
        '.cs-hover-rotate-3': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'rotate(3deg)' }
        },
        '.cs-hover-rotate-6': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'rotate(6deg)' }
        },
        
        // Hover translate effects
        '.cs-hover-translate-y-1': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'translateY(-0.25rem)' }
        },
        '.cs-hover-translate-y-2': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'translateY(-0.5rem)' }
        },
        
        // Active (press) effects
        '.cs-active-scale-95': {
          '&:active': { 'transform': 'scale(0.95)' }
        },
        '.cs-active-scale-98': {
          '&:active': { 'transform': 'scale(0.98)' }
        },
        
        // Focus effects
        '.cs-focus-scale-105': {
          'transition': 'transform 0.2s ease',
          '&:focus': { 'transform': 'scale(1.05)' }
        },
        '.cs-focus-ring-2': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 2px var(--cs-micro-focus-ring-strong)'
          }
        },
        '.cs-focus-ring-4': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 4px var(--cs-micro-focus-ring-medium)'
          }
        },
        
        // Tap effects (mobile)
        '.cs-tap-highlight-none': {
          '-webkit-tap-highlight-color': 'transparent'
        },
        '.cs-tap-scale-95': {
          'transition': 'transform 0.1s ease',
          '&:active': { 'transform': 'scale(0.95)' }
        },
        
        // Smooth interactions
        '.cs-smooth-interaction': {
          'transition': 'all 0.2s ease'
        },
        '.cs-smooth-interaction-fast': {
          'transition': 'all 0.1s ease'
        },
        '.cs-smooth-interaction-slow': {
          'transition': 'all 0.3s ease'
        },
        
        // Button-like interactions
        '.cs-interactive': {
          'cursor': 'pointer',
          'transition': 'transform 0.1s ease, box-shadow 0.1s ease',
          '&:hover': {
            'transform': 'translateY(-1px)',
            'box-shadow': '0 4px 8px var(--cs-micro-shadow-light)'
          },
          '&:active': {
            'transform': 'translateY(0)',
            'box-shadow': '0 2px 4px var(--cs-micro-shadow-light)'
          }
        }
      });
}, {
  // Theme configuration
  theme: {
    extend: {
      microInteractions: {
        // Default configuration can be overridden by users
        tokens: {
          colors: {
            'focus-ring': '#3b82f6',
            'shadow': '#000000'
          },
          opacity: {
            'focus-strong': '50%',
            'focus-medium': '30%',
            'shadow-light': '10%'
          }
        }
      }
    }
  }
});

// Export both default and named export for flexibility
export { plugin as microInteractions };

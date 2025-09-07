/**
 * @casoon/tailwindcss-glass - Tailwind CSS v4 Plugin
 */
const plugin = {
  handler: ({ addUtilities, addComponents, addBase }) => {
    // Comprehensive tokens definition for v4 compatibility
    const tokens = {
      colors: {
        // Basic colors
        white: '#ffffff',
        black: '#000000',
        // Glass colors
        blue: '#3b82f6',
        purple: '#8b5cf6',
        green: '#10b981',
        pink: '#ec4899',
        amber: '#f59e0b',
        // Orb colors
        'blue-light': '#60a5fa',
        'blue-lighter': '#93c5fd',
        'purple-light': '#a78bfa',
        'purple-lighter': '#c4b5fd',
        'pink-light': '#f472b6',
        'pink-lighter': '#f9a8d4',
        'custom-primary': '#3b82f6',
        'custom-secondary': '#8b5cf6', 
        'custom-accent': '#ec4899',
        // Gradient colors
        'sunset-start': '#f59e0b',
        'sunset-mid': '#ef4444',
        'sunset-end': '#ec4899',
        'ocean-start': '#0ea5e9',
        'ocean-end': '#3b82f6',
        'fire-start': '#ef4444',
        'fire-end': '#dc2626',
        'mint-start': '#10b981',
        'mint-end': '#059669',
        'purple-start': '#8b5cf6',
        'purple-end': '#7c3aed',
        'orange-start': '#f97316',
        'orange-end': '#ea580c',
        'blue-start': '#3b82f6',
        'blue-end': '#2563eb',
        'pink-start': '#ec4899',
        'pink-end': '#db2777',
        'custom-start': '#3b82f6',
        'custom-mid': '#8b5cf6',
        'custom-end': '#ec4899',
        // Loading colors
        'spinner-base': '#e5e7eb',
        'spinner-active': '#3b82f6',
        // Micro-interactions colors
        'focus-ring': '#3b82f6',
        shadow: '#000000',
        // Navigation colors
        primary: '#3b82f6',
        'text-muted': '#6b7280',
        border: '#e5e7eb',
        // Animation colors
        shadowInk: '#000000'
      },
      opacity: {
        weak: '15%',
        light: '20%',
        medium: '40%',
        strong: '60%',
        'border-light': '20%',
        'border-medium': '30%',
        'border-strong': '50%',
        'shadow-light': '10%',
        'shadow-medium': '25%',
        'shadow-strong': '40%',
        'shadow-xl': '60%',
        tooltip: '90%',
        'focus-strong': '40%',
        'focus-medium': '25%'
      },
      durations: {
        xxs: '100ms',
        xs: '150ms',
        sm: '200ms',
        md: '300ms',
        lg: '500ms',
        xl: '700ms',
        '2xl': '1000ms'
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        softSpring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      motionSafety: {
        duration: '100ms',
        ease: 'linear'
      }
    };

      // Add CSS custom properties (tokens)
      addBase({
        ':root': {
          // Base colors
          '--cs-glass-white': tokens.colors.white,
          '--cs-glass-black': tokens.colors.black,
          '--cs-glass-blue': tokens.colors.blue,
          '--cs-glass-purple': tokens.colors.purple,
          '--cs-glass-green': tokens.colors.green,
          '--cs-glass-pink': tokens.colors.pink,
          '--cs-glass-amber': tokens.colors.amber,
          // Glass backgrounds with color-mix
          '--cs-glass-bg-light': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity.light}, transparent)`,
          '--cs-glass-bg-weak': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity.weak}, transparent)`,
          '--cs-glass-bg-medium': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity.medium}, transparent)`,
          '--cs-glass-bg-strong': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity.strong}, transparent)`,
          '--cs-glass-bg-dark': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity.light}, transparent)`,
          '--cs-glass-bg-dark-strong': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity.strong}, transparent)`,
          // Colored glass backgrounds
          '--cs-glass-bg-blue': `color-mix(in srgb, var(--cs-glass-blue) ${tokens.opacity.light}, transparent)`,
          '--cs-glass-bg-purple': `color-mix(in srgb, var(--cs-glass-purple) ${tokens.opacity.light}, transparent)`,
          '--cs-glass-bg-green': `color-mix(in srgb, var(--cs-glass-green) ${tokens.opacity.light}, transparent)`,
          '--cs-glass-bg-pink': `color-mix(in srgb, var(--cs-glass-pink) ${tokens.opacity.light}, transparent)`,
          '--cs-glass-bg-amber': `color-mix(in srgb, var(--cs-glass-amber) ${tokens.opacity.light}, transparent)`,
          // Borders
          '--cs-glass-border-light': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity['border-light']}, transparent)`,
          '--cs-glass-border-medium': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-border-strong': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity['border-strong']}, transparent)`,
          // Colored borders
          '--cs-glass-border-blue': `color-mix(in srgb, var(--cs-glass-blue) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-border-purple': `color-mix(in srgb, var(--cs-glass-purple) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-border-green': `color-mix(in srgb, var(--cs-glass-green) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-border-pink': `color-mix(in srgb, var(--cs-glass-pink) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-border-amber': `color-mix(in srgb, var(--cs-glass-amber) ${tokens.opacity['border-medium']}, transparent)`,
          // Shadows
          '--cs-glass-shadow-light': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity['shadow-light']}, transparent)`,
          '--cs-glass-shadow-medium': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity['shadow-medium']}, transparent)`,
          '--cs-glass-shadow-strong': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity['shadow-strong']}, transparent)`,
          '--cs-glass-shadow-xl': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity['shadow-xl']}, transparent)`,
          // Special cases
          '--cs-glass-tooltip-bg': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity.tooltip}, transparent)`,
          // Interactive state backgrounds
          '--cs-glass-bg-hover': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity.medium}, transparent)`,
          '--cs-glass-bg-light-hover': `color-mix(in srgb, var(--cs-glass-white) 25%, transparent)`,
          // High contrast backgrounds
          '--cs-glass-bg-contrast': `color-mix(in srgb, var(--cs-glass-white) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-bg-dark-contrast': `color-mix(in srgb, var(--cs-glass-black) ${tokens.opacity['border-medium']}, transparent)`,
          // Fallback backgrounds
          '--cs-glass-bg-fallback': `color-mix(in srgb, var(--cs-glass-white) 25%, transparent)`,
          '--cs-glass-bg-dark-fallback': `color-mix(in srgb, var(--cs-glass-black) 25%, transparent)`,
          // Colored fallback backgrounds
          '--cs-glass-bg-blue-fallback': `color-mix(in srgb, var(--cs-glass-blue) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-bg-purple-fallback': `color-mix(in srgb, var(--cs-glass-purple) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-bg-green-fallback': `color-mix(in srgb, var(--cs-glass-green) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-bg-pink-fallback': `color-mix(in srgb, var(--cs-glass-pink) ${tokens.opacity['border-medium']}, transparent)`,
          '--cs-glass-bg-amber-fallback': `color-mix(in srgb, var(--cs-glass-amber) ${tokens.opacity['border-medium']}, transparent)`,
          // Focus ring
          '--cs-glass-focus-ring': `color-mix(in srgb, var(--cs-glass-blue) 50%, transparent)`
        }
      });
      // CSS Layers for better specificity control
      addBase({
        '@layer glass-base, glass-utilities, glass-components;': {}
      });

      // Base glass utilities with webkit fallback and motion safety
      addUtilities({
        '@layer glass-utilities': {
          // Base glass effects
          '.cs-glass': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-light)',
            'border': '1px solid var(--cs-glass-border-medium)'
          },
          '.cs-glass-dark': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-dark)',
            'border': '1px solid var(--cs-glass-border-light)'
          },

          // Size variants
          '.cs-glass-sm': {
            'backdrop-filter': 'blur(8px)',
            '-webkit-backdrop-filter': 'blur(8px)'
          },
          '.cs-glass-lg': {
            'backdrop-filter': 'blur(24px)',
            '-webkit-backdrop-filter': 'blur(24px)'
          },

          // Intensity variants
          '.cs-glass-weak': {
            'backdrop-filter': 'blur(4px)',
            '-webkit-backdrop-filter': 'blur(4px)',
            'background': 'var(--cs-glass-bg-weak)',
            'border': '1px solid var(--cs-glass-border-light)'
          },
          '.cs-glass-medium': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-light)',
            'border': '1px solid var(--cs-glass-border-medium)'
          },
          '.cs-glass-strong': {
            'backdrop-filter': 'blur(32px)',
            '-webkit-backdrop-filter': 'blur(32px)',
            'background': 'var(--cs-glass-bg-medium)',
            'border': '1px solid var(--cs-glass-border-strong)'
          },

          // Colored glass variants
          '.cs-glass-blue': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-blue)',
            'border': '1px solid var(--cs-glass-border-blue)'
          },
          '.cs-glass-purple': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-purple)',
            'border': '1px solid var(--cs-glass-border-purple)'
          },
          '.cs-glass-green': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-green)',
            'border': '1px solid var(--cs-glass-border-green)'
          },
          '.cs-glass-pink': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-pink)',
            'border': '1px solid var(--cs-glass-border-pink)'
          },
          '.cs-glass-amber': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-amber)',
            'border': '1px solid var(--cs-glass-border-amber)'
          },

          // Border radius variants
          '.cs-glass-rounded-sm': { 'border-radius': '0.25rem' },
          '.cs-glass-rounded': { 'border-radius': '0.5rem' },
          '.cs-glass-rounded-lg': { 'border-radius': '0.75rem' },
          '.cs-glass-rounded-xl': { 'border-radius': '1rem' },
          '.cs-glass-rounded-2xl': { 'border-radius': '1.5rem' },
          '.cs-glass-rounded-3xl': { 'border-radius': '2rem' },

          // Shadow variants
          '.cs-glass-shadow-sm': {
            'box-shadow': '0 1px 2px var(--cs-glass-shadow-light)'
          },
          '.cs-glass-shadow': {
            'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)'
          },
          '.cs-glass-shadow-lg': {
            'box-shadow': '0 20px 40px var(--cs-glass-shadow-strong)'
          },
          '.cs-glass-shadow-xl': {
            'box-shadow': '0 25px 50px var(--cs-glass-shadow-xl)'
          }
        }
      });

      // Glass components with interactive states
      addComponents({
        '@layer glass-components': {
          // Advanced components - new ones without legacy duplicates
          '.cs-glass-toast': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-light)',
            'border': '1px solid var(--cs-glass-border-medium)',
            'border-radius': '0.75rem',
            'padding': '1rem 1.5rem',
            'box-shadow': '0 8px 32px var(--cs-glass-shadow-strong)',
            'position': 'relative',
            'overflow': 'hidden'
          },
          '.cs-glass-tooltip': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-tooltip-bg)',
            'border': '1px solid var(--cs-glass-border-medium)',
            'border-radius': '0.5rem',
            'padding': '0.5rem 0.75rem',
            'box-shadow': '0 4px 16px var(--cs-glass-shadow-xl)',
            'font-size': '0.875rem',
            'color': 'white',
            'white-space': 'nowrap'
          },
          '.cs-glass-dropdown': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'var(--cs-glass-bg-light)',
            'border': '1px solid var(--cs-glass-border-medium)',
            'border-radius': '0.75rem',
            'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
            'padding': '0.5rem',
            'min-width': '12rem'
          }
        }
      });

      // Accessibility and motion safety
      addUtilities({
        '@media (prefers-reduced-motion: reduce)': {
          '.cs-glass-card, .cs-glass-card-light, .cs-glass-button, .cs-glass-toast': {
            'transition': 'none',
            '&:hover': {
              'transform': 'none'
            }
          }
        },
        '@media (prefers-contrast: high)': {
          '.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button': {
            'border-width': '2px',
            'background': 'var(--cs-glass-bg-contrast)'
          },
          '.cs-glass-dark': {
            'background': 'var(--cs-glass-bg-dark-contrast)',
            'border-color': 'var(--cs-glass-border-strong)'
          }
        }
      });

      // Container queries support
      addUtilities({
        '@container (min-width: 320px)': {
          '.cs-glass-responsive': {
            'backdrop-filter': 'blur(8px)',
            '-webkit-backdrop-filter': 'blur(8px)'
          }
        },
        '@container (min-width: 640px)': {
          '.cs-glass-responsive': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)'
          }
        },
        '@container (min-width: 1024px)': {
          '.cs-glass-responsive': {
            'backdrop-filter': 'blur(24px)',
            '-webkit-backdrop-filter': 'blur(24px)'
          }
        }
      });

      // Fallbacks for browsers without backdrop-filter support
      addComponents({
        '@supports not (backdrop-filter: blur(16px))': {
          '.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button': {
            'background': 'var(--cs-glass-bg-fallback)',
            'box-shadow': '0 4px 16px var(--cs-glass-shadow-medium)'
          },
          '.cs-glass-dark': {
            'background': 'var(--cs-glass-bg-dark-fallback)'
          },
          '.cs-glass-blue': { 'background': 'var(--cs-glass-bg-blue-fallback)' },
          '.cs-glass-purple': { 'background': 'var(--cs-glass-bg-purple-fallback)' },
          '.cs-glass-green': { 'background': 'var(--cs-glass-bg-green-fallback)' },
          '.cs-glass-pink': { 'background': 'var(--cs-glass-bg-pink-fallback)' },
          '.cs-glass-amber': { 'background': 'var(--cs-glass-bg-amber-fallback)' }
        }
      });

      // Enhanced legacy components with interactive states

      addComponents({
        '.cs-glass-card': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)',
          'border-radius': '20px',
          'padding': '2rem',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'var(--cs-glass-bg-hover)',
            'box-shadow': '0 20px 40px var(--cs-glass-shadow-strong)',
            'transform': 'translateY(-2px)',
            'border': '1px solid var(--cs-glass-border-strong)'
          },
          '&:focus-within': {
            'outline': '2px solid var(--cs-glass-focus-ring)',
            'outline-offset': '2px'
          }
        },
        '.cs-glass-card-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-medium)',
          'border': '1px solid var(--cs-glass-border-strong)',
          'border-radius': '20px',
          'padding': '2rem',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'var(--cs-glass-bg-light-hover)',
            'transform': 'translateY(-1px)',
            'box-shadow': '0 12px 24px var(--cs-glass-shadow-strong)'
          },
          '&:focus-within': {
            'outline': '2px solid var(--cs-glass-focus-ring)',
            'outline-offset': '2px'
          }
        },
        '.cs-glass-nav': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease'
        },
        '.cs-glass-nav-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-medium)',
          'border': '1px solid var(--cs-glass-border-strong)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease'
        },
        '.cs-glass-button': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)',
          'border-radius': '12px',
          'padding': '0.75rem 1.5rem',
          'transition': 'all 0.3s ease',
          'cursor': 'pointer',
          '&:hover': {
            'background': 'var(--cs-glass-bg-hover)',
            'transform': 'translateY(-1px)',
            'box-shadow': '0 8px 16px var(--cs-glass-shadow-medium)'
          },
          '&:focus': {
            'outline': '2px solid var(--cs-glass-focus-ring)',
            'outline-offset': '2px'
          },
          '&:active': {
            'transform': 'translateY(0)',
            'box-shadow': '0 4px 8px var(--cs-glass-shadow-medium)'
          }
        }
      });

      // Legacy class aliases for backward compatibility
      addComponents({
        // Basic glass effects
        '.glass': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)'
        },
        '.glass-dark': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-dark)',
          'border': '1px solid var(--cs-glass-border-light)'
        },
        
        // Size variants
        '.glass-sm': {
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)'
        },
        '.glass-lg': {
          'backdrop-filter': 'blur(24px)',
          '-webkit-backdrop-filter': 'blur(24px)'
        },
        
        // Component variants
        '.glass-card': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)',
          'border-radius': '20px',
          'padding': '2rem',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease'
        },
        '.glass-card-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-medium)',
          'border': '1px solid var(--cs-glass-border-strong)',
          'border-radius': '20px',
          'padding': '2rem',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease'
        },
        '.glass-nav': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease'
        },
        '.glass-nav-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-medium)',
          'border': '1px solid var(--cs-glass-border-strong)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px var(--cs-glass-shadow-medium)',
          'transition': 'all 0.3s ease'
        },
        '.glass-button': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'var(--cs-glass-bg-light)',
          'border': '1px solid var(--cs-glass-border-medium)',
          'border-radius': '12px',
          'padding': '0.75rem 1.5rem',
          'transition': 'all 0.3s ease',
          'cursor': 'pointer'
        },
        
        // Fallback for browsers without backdrop-filter support
        '@supports not (backdrop-filter: blur(16px))': {
          '.cs-glass, .cs-glass-card, .cs-glass-nav, .cs-glass-button, .glass, .glass-card, .glass-nav, .glass-button': {
            'background': 'var(--cs-glass-bg-contrast)'
          },
          '.cs-glass-dark, .glass-dark': {
            'background': 'var(--cs-glass-bg-dark-contrast)'
          }
        }
      });
    }
};

export default plugin;

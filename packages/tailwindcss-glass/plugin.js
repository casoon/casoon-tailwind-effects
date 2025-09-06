/**
 * @casoon/tailwindcss-glass - Tailwind CSS Plugin
 * 
 * Glassmorphism components and utilities for Tailwind CSS v4.
 * Features: backdrop blur, intensity variants, colored glass, interactive states,
 * accessibility support, container queries, and browser fallbacks.
 */
export default function glassPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, addBase }) => {
      // CSS Layers for better specificity control
      addBase({
        '@layer glass-base, glass-utilities, glass-components;': {}
      });

      // Base glass utilities with webkit fallback and motion safety
      addUtilities({
        '@layer glass-utilities': {
          // Base glass effects
          '.glass': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(255, 255, 255, 0.1)',
            'border': '1px solid rgba(255, 255, 255, 0.2)'
          },
          '.glass-dark': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(0, 0, 0, 0.1)',
            'border': '1px solid rgba(255, 255, 255, 0.1)'
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

          // Intensity variants
          '.glass-weak': {
            'backdrop-filter': 'blur(4px)',
            '-webkit-backdrop-filter': 'blur(4px)',
            'background': 'rgba(255, 255, 255, 0.05)',
            'border': '1px solid rgba(255, 255, 255, 0.1)'
          },
          '.glass-medium': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(255, 255, 255, 0.1)',
            'border': '1px solid rgba(255, 255, 255, 0.2)'
          },
          '.glass-strong': {
            'backdrop-filter': 'blur(32px)',
            '-webkit-backdrop-filter': 'blur(32px)',
            'background': 'rgba(255, 255, 255, 0.15)',
            'border': '1px solid rgba(255, 255, 255, 0.3)'
          },

          // Colored glass variants
          '.glass-blue': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(59, 130, 246, 0.1)',
            'border': '1px solid rgba(59, 130, 246, 0.2)'
          },
          '.glass-purple': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(147, 51, 234, 0.1)',
            'border': '1px solid rgba(147, 51, 234, 0.2)'
          },
          '.glass-green': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(34, 197, 94, 0.1)',
            'border': '1px solid rgba(34, 197, 94, 0.2)'
          },
          '.glass-pink': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(236, 72, 153, 0.1)',
            'border': '1px solid rgba(236, 72, 153, 0.2)'
          },
          '.glass-amber': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(245, 158, 11, 0.1)',
            'border': '1px solid rgba(245, 158, 11, 0.2)'
          },

          // Border radius variants
          '.glass-rounded-sm': { 'border-radius': '0.25rem' },
          '.glass-rounded': { 'border-radius': '0.5rem' },
          '.glass-rounded-lg': { 'border-radius': '0.75rem' },
          '.glass-rounded-xl': { 'border-radius': '1rem' },
          '.glass-rounded-2xl': { 'border-radius': '1.5rem' },
          '.glass-rounded-3xl': { 'border-radius': '2rem' },

          // Shadow variants
          '.glass-shadow-sm': {
            'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.05)'
          },
          '.glass-shadow': {
            'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)'
          },
          '.glass-shadow-lg': {
            'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.15)'
          },
          '.glass-shadow-xl': {
            'box-shadow': '0 25px 50px rgba(0, 0, 0, 0.2)'
          }
        }
      });

      // Glass components with interactive states
      addComponents({
        '@layer glass-components': {
          // Advanced components - new ones without legacy duplicates
          '.glass-toast': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(255, 255, 255, 0.1)',
            'border': '1px solid rgba(255, 255, 255, 0.2)',
            'border-radius': '0.75rem',
            'padding': '1rem 1.5rem',
            'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.15)',
            'position': 'relative',
            'overflow': 'hidden'
          },
          '.glass-tooltip': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(0, 0, 0, 0.8)',
            'border': '1px solid rgba(255, 255, 255, 0.2)',
            'border-radius': '0.5rem',
            'padding': '0.5rem 0.75rem',
            'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.2)',
            'font-size': '0.875rem',
            'color': 'white',
            'white-space': 'nowrap'
          },
          '.glass-dropdown': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)',
            'background': 'rgba(255, 255, 255, 0.1)',
            'border': '1px solid rgba(255, 255, 255, 0.2)',
            'border-radius': '0.75rem',
            'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
            'padding': '0.5rem',
            'min-width': '12rem'
          }
        }
      });

      // Accessibility and motion safety
      addUtilities({
        '@media (prefers-reduced-motion: reduce)': {
          '.glass-card, .glass-card-light, .glass-button, .glass-toast': {
            'transition': 'none',
            '&:hover': {
              'transform': 'none'
            }
          }
        },
        '@media (prefers-contrast: high)': {
          '.glass, .glass-card, .glass-nav, .glass-button': {
            'border-width': '2px',
            'background': 'rgba(255, 255, 255, 0.2)'
          },
          '.glass-dark': {
            'background': 'rgba(0, 0, 0, 0.2)',
            'border-color': 'rgba(255, 255, 255, 0.3)'
          }
        }
      });

      // Container queries support
      addUtilities({
        '@container (min-width: 320px)': {
          '.glass-responsive': {
            'backdrop-filter': 'blur(8px)',
            '-webkit-backdrop-filter': 'blur(8px)'
          }
        },
        '@container (min-width: 640px)': {
          '.glass-responsive': {
            'backdrop-filter': 'blur(16px)',
            '-webkit-backdrop-filter': 'blur(16px)'
          }
        },
        '@container (min-width: 1024px)': {
          '.glass-responsive': {
            'backdrop-filter': 'blur(24px)',
            '-webkit-backdrop-filter': 'blur(24px)'
          }
        }
      });

      // Fallbacks for browsers without backdrop-filter support
      addComponents({
        '@supports not (backdrop-filter: blur(16px))': {
          '.glass, .glass-card, .glass-nav, .glass-button': {
            'background': 'rgba(255, 255, 255, 0.25)',
            'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.1)'
          },
          '.glass-dark': {
            'background': 'rgba(0, 0, 0, 0.25)'
          },
          '.glass-blue': { 'background': 'rgba(59, 130, 246, 0.2)' },
          '.glass-purple': { 'background': 'rgba(147, 51, 234, 0.2)' },
          '.glass-green': { 'background': 'rgba(34, 197, 94, 0.2)' },
          '.glass-pink': { 'background': 'rgba(236, 72, 153, 0.2)' },
          '.glass-amber': { 'background': 'rgba(245, 158, 11, 0.2)' }
        }
      });

      // Enhanced legacy components with interactive states

      addComponents({
        '.glass-card': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '20px',
          'padding': '2rem',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.15)',
            'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.15)',
            'transform': 'translateY(-2px)',
            'border': '1px solid rgba(255, 255, 255, 0.3)'
          },
          '&:focus-within': {
            'outline': '2px solid rgba(59, 130, 246, 0.5)',
            'outline-offset': '2px'
          }
        },
        '.glass-card-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.2)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
          'border-radius': '20px',
          'padding': '2rem',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.25)',
            'transform': 'translateY(-1px)',
            'box-shadow': '0 12px 24px rgba(0, 0, 0, 0.15)'
          },
          '&:focus-within': {
            'outline': '2px solid rgba(59, 130, 246, 0.5)',
            'outline-offset': '2px'
          }
        },
        '.glass-nav': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.3s ease'
        },
        '.glass-nav-light': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.2)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.3s ease'
        },
        '.glass-button': {
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '12px',
          'padding': '0.75rem 1.5rem',
          'transition': 'all 0.3s ease',
          'cursor': 'pointer',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.15)',
            'transform': 'translateY(-1px)',
            'box-shadow': '0 8px 16px rgba(0, 0, 0, 0.1)'
          },
          '&:focus': {
            'outline': '2px solid rgba(59, 130, 246, 0.5)',
            'outline-offset': '2px'
          },
          '&:active': {
            'transform': 'translateY(0)',
            'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)'
          }
        }
      });

      // Fallback for legacy classes
      addComponents({
        '@supports not (backdrop-filter: blur(16px))': {
          '.glass, .glass-card, .glass-nav, .glass-button': {
            'background': 'rgba(255, 255, 255, 0.2)'
          },
          '.glass-dark': {
            'background': 'rgba(0, 0, 0, 0.2)'
          }
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { glassPlugin as glass };

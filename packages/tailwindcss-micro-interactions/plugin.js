/**
 * @casoon/tailwindcss-micro-interactions - Tailwind CSS Plugin
 * 
 * Micro-interaction utilities for Tailwind CSS v4.
 */
export default function microInteractionsPlugin(options = {}) {
  return {
    handler: ({ addUtilities }) => {
      // Micro-interaction utilities
      addUtilities({
        // Hover scale effects
        '.hover-scale-95': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'scale(0.95)' }
        },
        '.hover-scale-105': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'scale(1.05)' }
        },
        '.hover-scale-110': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'scale(1.10)' }
        },
        
        // Hover fade effects
        '.hover-fade-in': {
          'opacity': '0.7',
          'transition': 'opacity 0.2s ease',
          '&:hover': { 'opacity': '1' }
        },
        '.hover-fade-out': {
          'opacity': '1',
          'transition': 'opacity 0.2s ease',
          '&:hover': { 'opacity': '0.7' }
        },
        
        // Hover brightness effects
        '.hover-brighten': {
          'transition': 'filter 0.2s ease',
          '&:hover': { 'filter': 'brightness(1.1)' }
        },
        '.hover-darken': {
          'transition': 'filter 0.2s ease',
          '&:hover': { 'filter': 'brightness(0.9)' }
        },
        
        // Hover rotation effects
        '.hover-rotate-1': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'rotate(1deg)' }
        },
        '.hover-rotate-3': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'rotate(3deg)' }
        },
        '.hover-rotate-6': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'rotate(6deg)' }
        },
        
        // Hover translate effects
        '.hover-translate-y-1': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'translateY(-0.25rem)' }
        },
        '.hover-translate-y-2': {
          'transition': 'transform 0.2s ease',
          '&:hover': { 'transform': 'translateY(-0.5rem)' }
        },
        
        // Active (press) effects
        '.active-scale-95': {
          '&:active': { 'transform': 'scale(0.95)' }
        },
        '.active-scale-98': {
          '&:active': { 'transform': 'scale(0.98)' }
        },
        
        // Focus effects
        '.focus-scale-105': {
          'transition': 'transform 0.2s ease',
          '&:focus': { 'transform': 'scale(1.05)' }
        },
        '.focus-ring-2': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 2px rgba(59, 130, 246, 0.5)'
          }
        },
        '.focus-ring-4': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 4px rgba(59, 130, 246, 0.3)'
          }
        },
        
        // Tap effects (mobile)
        '.tap-highlight-none': {
          '-webkit-tap-highlight-color': 'transparent'
        },
        '.tap-scale-95': {
          'transition': 'transform 0.1s ease',
          '&:active': { 'transform': 'scale(0.95)' }
        },
        
        // Smooth interactions
        '.smooth-interaction': {
          'transition': 'all 0.2s ease'
        },
        '.smooth-interaction-fast': {
          'transition': 'all 0.1s ease'
        },
        '.smooth-interaction-slow': {
          'transition': 'all 0.3s ease'
        },
        
        // Button-like interactions
        '.interactive': {
          'cursor': 'pointer',
          'transition': 'transform 0.1s ease, box-shadow 0.1s ease',
          '&:hover': {
            'transform': 'translateY(-1px)',
            'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)'
          },
          '&:active': {
            'transform': 'translateY(0)',
            'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
          }
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { microInteractionsPlugin as microInteractions };

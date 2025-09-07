/**
 * @casoon/tailwindcss-micro-interactions - Tailwind CSS v4 Plugin
 */
const plugin = {
  handler: ({ addUtilities, addBase }) => {
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
    }
};

export default plugin;

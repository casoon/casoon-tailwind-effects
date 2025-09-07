/**
 * @casoon/tailwindcss-navigation - Tailwind CSS v4 Plugin
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
          '--cs-nav-primary': tokens.colors['primary'],
          '--cs-nav-white': tokens.colors['white'],
          '--cs-nav-text-muted': tokens.colors['text-muted'],
          '--cs-nav-border': tokens.colors['border']
        }
      });
      // Navigation components
      addComponents({
        '.cs-nav': {
          'display': 'flex',
          'flex-wrap': 'wrap',
          'padding-left': '0',
          'margin-bottom': '0',
          'list-style': 'none'
        },
        '.cs-nav-item': {
          'display': 'block'
        },
        '.cs-nav-link': {
          'display': 'block',
          'padding': '0.5rem 1rem',
          'color': 'inherit',
          'text-decoration': 'none',
          'transition': 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out'
        },
        '.cs-nav-link:hover': {
          'text-decoration': 'none'
        },
        '.cs-nav-link.active': {
          'font-weight': '600'
        }
      });

      // Navigation utilities
      addUtilities({
        '.cs-nav-pills .cs-nav-item .cs-nav-link': {
          'border-radius': '0.25rem'
        },
        '.cs-nav-pills .cs-nav-item .cs-nav-link.active': {
          'background-color': 'var(--cs-nav-primary)',
          'color': 'var(--cs-nav-white)'
        },
        '.cs-nav-tabs .cs-nav-item .cs-nav-link': {
          'border': '1px solid transparent',
          'border-top-left-radius': '0.25rem',
          'border-top-right-radius': '0.25rem'
        },
        '.cs-nav-tabs .cs-nav-item .cs-nav-link.active': {
          'color': 'var(--cs-nav-text-muted)',
          'background-color': 'var(--cs-nav-white)',
          'border-color': 'var(--cs-nav-border) var(--cs-nav-border) var(--cs-nav-white)'
        },
        '.cs-navbar-brand': {
          'display': 'inline-block',
          'padding-top': '0.3125rem',
          'padding-bottom': '0.3125rem',
          'margin-right': '1rem',
          'font-size': '1.25rem',
          'line-height': 'inherit',
          'white-space': 'nowrap'
        },
        '.cs-navbar-nav': {
          'display': 'flex',
          'flex-direction': 'column',
          'padding-left': '0',
          'margin-bottom': '0',
          'list-style': 'none'
        },
        '.cs-navbar-nav .cs-nav-link': {
          'padding-right': '0',
          'padding-left': '0'
        }
      });
    }
};

export default plugin;

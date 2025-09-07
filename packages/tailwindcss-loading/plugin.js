/**
 * @casoon/tailwindcss-loading - Tailwind CSS v4 Plugin
 */
const plugin = {
  handler: ({ addUtilities, addKeyframes, addBase }) => {
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
          '--cs-loading-spinner-base': tokens.colors['spinner-base'],
          '--cs-loading-spinner-active': tokens.colors['spinner-active']
        }
      });
      // Add keyframes for loading animations
      addKeyframes({
        'spin': {
          '0%': { 'transform': 'rotate(0deg)' },
          '100%': { 'transform': 'rotate(360deg)' }
        }
      });

      // Loading utilities
      addUtilities({
        '.cs-spinner': {
          'border': '4px solid var(--cs-loading-spinner-base)',
          'border-top': '4px solid var(--cs-loading-spinner-active)',
          'border-radius': '50%',
          'width': '40px',
          'height': '40px',
          'animation': 'spin 2s linear infinite'
        },
        '.cs-loading': {
          'opacity': '0.5',
          'pointer-events': 'none'
        }
      });
    }
};

export default plugin;

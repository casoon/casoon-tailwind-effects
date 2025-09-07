/**
 * @casoon/tailwindcss-gradients - Tailwind CSS v4 Plugin
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
          '--cs-gradient-sunset-start': tokens.colors['sunset-start'],
          '--cs-gradient-sunset-mid': tokens.colors['sunset-mid'],
          '--cs-gradient-sunset-end': tokens.colors['sunset-end'],
          '--cs-gradient-ocean-start': tokens.colors['ocean-start'],
          '--cs-gradient-ocean-end': tokens.colors['ocean-end'],
          '--cs-gradient-fire-start': tokens.colors['fire-start'],
          '--cs-gradient-fire-end': tokens.colors['fire-end'],
          '--cs-gradient-mint-start': tokens.colors['mint-start'],
          '--cs-gradient-mint-end': tokens.colors['mint-end'],
          '--cs-gradient-purple-start': tokens.colors['purple-start'],
          '--cs-gradient-purple-end': tokens.colors['purple-end'],
          '--cs-gradient-orange-start': tokens.colors['orange-start'],
          '--cs-gradient-orange-end': tokens.colors['orange-end'],
          '--cs-gradient-blue-start': tokens.colors['blue-start'],
          '--cs-gradient-blue-end': tokens.colors['blue-end'],
          '--cs-gradient-pink-start': tokens.colors['pink-start'],
          '--cs-gradient-pink-end': tokens.colors['pink-end'],
          // Custom gradient tokens
          '--cs-gradient-custom-start': tokens.colors['custom-start'],
          '--cs-gradient-custom-mid': tokens.colors['custom-mid'],
          '--cs-gradient-custom-end': tokens.colors['custom-end'],
          '--cs-gradient-white': tokens.colors['white']
        }
      });
      
      // Gradient utilities
      addUtilities({
        // Popular gradient backgrounds
        '.cs-gradient-sunset': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-sunset-start), var(--cs-gradient-sunset-mid), var(--cs-gradient-sunset-end))'
        },
        '.cs-gradient-ocean': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end))'
        },
        '.cs-gradient-fire': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-fire-start), var(--cs-gradient-fire-end))'
        },
        '.cs-gradient-mint': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-mint-start), var(--cs-gradient-mint-end))'
        },
        '.cs-gradient-purple': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-purple-start), var(--cs-gradient-purple-end))'
        },
        '.cs-gradient-orange': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-orange-start), var(--cs-gradient-orange-end))'
        },
        '.cs-gradient-blue': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-blue-start), var(--cs-gradient-blue-end))'
        },
        '.cs-gradient-pink': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-pink-start), var(--cs-gradient-pink-end))'
        },
        '.cs-gradient-custom': {
          'background': tokens.colors['custom-mid'] 
            ? `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-mid), var(--cs-gradient-custom-end))`
            : `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-end))`
        },
        
        // Gradient text utilities
        '.cs-gradient-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.cs-gradient-text-sunset': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-sunset-start), var(--cs-gradient-sunset-mid), var(--cs-gradient-sunset-end))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.cs-gradient-text-ocean': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.cs-gradient-text-fire': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-fire-start), var(--cs-gradient-fire-end))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.cs-gradient-text-custom': {
          'background': tokens.colors['custom-mid'] 
            ? `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-mid), var(--cs-gradient-custom-end))`
            : `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-end))`,
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        
        // Radial gradients
        '.cs-gradient-radial-center': {
          'background': 'radial-gradient(circle at center, var(--cs-gradient-stops, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end)))'
        },
        '.cs-gradient-radial-top': {
          'background': 'radial-gradient(circle at top, var(--cs-gradient-stops, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end)))'
        },
        '.cs-gradient-radial-bottom': {
          'background': 'radial-gradient(circle at bottom, var(--cs-gradient-stops, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end)))'
        },
        
        // Conic gradients
        '.cs-gradient-conic': {
          'background': 'conic-gradient(var(--cs-gradient-stops, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end)))'
        },
        '.cs-gradient-conic-center': {
          'background': 'conic-gradient(from 0deg at 50% 50%, var(--cs-gradient-stops, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end)))'
        },
        
        // Gradient borders (using pseudo-elements)
        '.cs-gradient-border': {
          'position': 'relative',
          'background': 'linear-gradient(135deg, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end))',
          'border-radius': '0.5rem'
        },
        '.cs-gradient-border::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '1px',
          'background': 'var(--cs-gradient-white)',
          'border-radius': 'calc(0.5rem - 1px)'
        },
        
        // Animated gradients
        '.cs-gradient-animate': {
          'background-size': '400% 400%',
          'animation': 'gradient-shift 4s ease infinite'
        },
        '@keyframes gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      });
    }
};

export default plugin;

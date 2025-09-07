/**
 * @casoon/tailwindcss-orbs - Tailwind CSS v4 Plugin
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
          // Base colors
          '--cs-orb-blue': tokens.colors.blue,
          '--cs-orb-blue-light': tokens.colors['blue-light'],
          '--cs-orb-blue-lighter': tokens.colors['blue-lighter'],
          '--cs-orb-purple': tokens.colors.purple,
          '--cs-orb-purple-light': tokens.colors['purple-light'],
          '--cs-orb-purple-lighter': tokens.colors['purple-lighter'],
          '--cs-orb-pink': tokens.colors.pink,
          '--cs-orb-pink-light': tokens.colors['pink-light'],
          '--cs-orb-pink-lighter': tokens.colors['pink-lighter'],
          // Custom orb colors
          '--cs-orb-custom-primary': tokens.colors['custom-primary'],
          '--cs-orb-custom-secondary': tokens.colors['custom-secondary'],
          '--cs-orb-custom-accent': tokens.colors['custom-accent'],
          // Orb gradients with color-mix
          '--cs-orb-gradient-blue': `radial-gradient(circle, 
            color-mix(in srgb, var(--cs-orb-blue) ${tokens.opacity.strong}, transparent) 0%, 
            color-mix(in srgb, var(--cs-orb-blue-light) ${tokens.opacity.medium}, transparent) 50%, 
            color-mix(in srgb, var(--cs-orb-blue-lighter) ${tokens.opacity.weak}, transparent) 100%)`,
          '--cs-orb-gradient-purple': `radial-gradient(circle, 
            color-mix(in srgb, var(--cs-orb-purple) ${tokens.opacity.strong}, transparent) 0%, 
            color-mix(in srgb, var(--cs-orb-purple-light) ${tokens.opacity.medium}, transparent) 50%, 
            color-mix(in srgb, var(--cs-orb-purple-lighter) ${tokens.opacity.weak}, transparent) 100%)`,
          '--cs-orb-gradient-pink': `radial-gradient(circle, 
            color-mix(in srgb, var(--cs-orb-pink) ${tokens.opacity.strong}, transparent) 0%, 
            color-mix(in srgb, var(--cs-orb-pink-light) ${tokens.opacity.medium}, transparent) 50%, 
            color-mix(in srgb, var(--cs-orb-pink-lighter) ${tokens.opacity.weak}, transparent) 100%)`,
          '--cs-orb-gradient-custom': `radial-gradient(circle, 
            color-mix(in srgb, var(--cs-orb-custom-primary) ${tokens.opacity.strong}, transparent) 0%, 
            color-mix(in srgb, var(--cs-orb-custom-secondary) ${tokens.opacity.medium}, transparent) 50%, 
            color-mix(in srgb, var(--cs-orb-custom-accent) ${tokens.opacity.weak}, transparent) 100%)`
        }
      });
      // Orb animation keyframes
      addKeyframes({
        'orb-float': {
          '0%, 100%': { 'transform': 'translateY(0px)' },
          '50%': { 'transform': 'translateY(-20px)' }
        },
        'orb-pulse': {
          '0%, 100%': { 'opacity': '0.7', 'transform': 'scale(1)' },
          '50%': { 'opacity': '1', 'transform': 'scale(1.05)' }
        },
        'orb-drift': {
          '0%': { 'transform': 'translateX(0px)' },
          '33%': { 'transform': 'translateX(30px)' },
          '66%': { 'transform': 'translateX(-20px)' },
          '100%': { 'transform': 'translateX(0px)' }
        }
      });

      // Orb utilities
      addUtilities({
        // Base orb styles
        '.cs-orb': {
          'border-radius': '50%',
          'filter': 'blur(1px)',
          'opacity': '0.7',
          'pointer-events': 'none'
        },
        
        // Orb sizes
        '.cs-orb-xs': { 'width': '50px', 'height': '50px' },
        '.cs-orb-sm': { 'width': '75px', 'height': '75px' },
        '.cs-orb-md': { 'width': '100px', 'height': '100px' },
        '.cs-orb-lg': { 'width': '150px', 'height': '150px' },
        '.cs-orb-xl': { 'width': '200px', 'height': '200px' },
        '.cs-orb-2xl': { 'width': '300px', 'height': '300px' },
        
        // Orb blur levels
        '.cs-orb-blur-none': { 'filter': 'blur(0)' },
        '.cs-orb-blur-sm': { 'filter': 'blur(2px)' },
        '.cs-orb-blur-md': { 'filter': 'blur(4px)' },
        '.cs-orb-blur-lg': { 'filter': 'blur(8px)' },
        
        // Orb animations
        '.cs-orb-float': {
          'animation': 'orb-float 6s ease-in-out infinite'
        },
        '.cs-orb-pulse': {
          'animation': 'orb-pulse 4s ease-in-out infinite'
        },
        '.cs-orb-drift': {
          'animation': 'orb-drift 8s ease-in-out infinite'
        },
        
        // Orb positioning helpers
        '.cs-orb-absolute': {
          'position': 'absolute'
        },
        '.cs-orb-fixed': {
          'position': 'fixed'
        },
        
        // Common orb colors with modern color-mix
        '.cs-orb-gradient-blue': {
          'background': 'var(--cs-orb-gradient-blue)'
        },
        '.cs-orb-gradient-purple': {
          'background': 'var(--cs-orb-gradient-purple)'
        },
        '.cs-orb-gradient-pink': {
          'background': 'var(--cs-orb-gradient-pink)'
        },
        '.cs-orb-gradient-custom': {
          'background': 'var(--cs-orb-gradient-custom)'
        }
      });
    }
};

export default plugin;

/**
 * @casoon/tailwindcss-orbs - Tailwind CSS Plugin
 * 
 * Animated orb and blob components for Tailwind CSS v4.
 */
export default function orbsPlugin(options = {}) {
  // Default color tokens for orb effects
  const defaultTokens = {
    colors: {
      // Base colors for orbs
      'blue': '#3b82f6',
      'blue-light': '#93c5fd',
      'blue-lighter': '#dbeafe',
      'purple': '#9333ea',
      'purple-light': '#c4b5fd',
      'purple-lighter': '#ede9fe',
      'pink': '#ec4899',
      'pink-light': '#fbcfe8',
      'pink-lighter': '#fdf2f8',
      // Custom orb colors (user-definable)
      'custom-primary': '#667eea',
      'custom-secondary': '#764ba2',
      'custom-accent': '#f093fb'
    },
    opacity: {
      'strong': '50%',
      'medium': '30%', 
      'weak': '10%'
    }
  };
  
  // Merge with user options
  const tokens = {
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) },
    opacity: { ...defaultTokens.opacity, ...(options.tokens?.opacity || {}) }
  };
  
  return {
    handler: ({ addUtilities, addKeyframes, addBase }) => {
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
        '.orb': {
          'border-radius': '50%',
          'filter': 'blur(1px)',
          'opacity': '0.7',
          'pointer-events': 'none'
        },
        
        // Orb sizes
        '.orb-xs': { 'width': '50px', 'height': '50px' },
        '.orb-sm': { 'width': '75px', 'height': '75px' },
        '.orb-md': { 'width': '100px', 'height': '100px' },
        '.orb-lg': { 'width': '150px', 'height': '150px' },
        '.orb-xl': { 'width': '200px', 'height': '200px' },
        '.orb-2xl': { 'width': '300px', 'height': '300px' },
        
        // Orb blur levels
        '.orb-blur-none': { 'filter': 'blur(0)' },
        '.orb-blur-sm': { 'filter': 'blur(2px)' },
        '.orb-blur-md': { 'filter': 'blur(4px)' },
        '.orb-blur-lg': { 'filter': 'blur(8px)' },
        
        // Orb animations
        '.orb-float': {
          'animation': 'orb-float 6s ease-in-out infinite'
        },
        '.orb-pulse': {
          'animation': 'orb-pulse 4s ease-in-out infinite'
        },
        '.orb-drift': {
          'animation': 'orb-drift 8s ease-in-out infinite'
        },
        
        // Orb positioning helpers
        '.orb-absolute': {
          'position': 'absolute'
        },
        '.orb-fixed': {
          'position': 'fixed'
        },
        
        // Common orb colors with modern color-mix
        '.orb-gradient-blue': {
          'background': 'var(--cs-orb-gradient-blue)'
        },
        '.orb-gradient-purple': {
          'background': 'var(--cs-orb-gradient-purple)'
        },
        '.orb-gradient-pink': {
          'background': 'var(--cs-orb-gradient-pink)'
        },
        '.orb-gradient-custom': {
          'background': 'var(--cs-orb-gradient-custom)'
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { orbsPlugin as orbs };

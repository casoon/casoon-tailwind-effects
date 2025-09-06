/**
 * @casoon/tailwindcss-gradients - Tailwind CSS Plugin
 * 
 * Beautiful gradient utilities for Tailwind CSS v4.
 */
export default function gradientsPlugin(options = {}) {
  // Default color tokens
  const defaultTokens = {
    colors: {
      // Sunset gradient colors
      'sunset-start': '#ff6b6b',
      'sunset-mid': '#ffd93d', 
      'sunset-end': '#6bcf7f',
      // Ocean gradient colors
      'ocean-start': '#667eea',
      'ocean-end': '#764ba2',
      // Fire gradient colors
      'fire-start': '#f093fb',
      'fire-end': '#f5576c',
      // Mint gradient colors
      'mint-start': '#4facfe',
      'mint-end': '#00f2fe',
      // Purple gradient colors
      'purple-start': '#a8edea',
      'purple-end': '#fed6e3',
      // Orange gradient colors
      'orange-start': '#ffeaa7',
      'orange-end': '#fab1a0',
      // Blue gradient colors
      'blue-start': '#74b9ff',
      'blue-end': '#0984e3',
      // Pink gradient colors
      'pink-start': '#fd79a8',
      'pink-end': '#fdcb6e',
      // Custom gradient colors (user-definable)
      'custom-start': '#667eea',
      'custom-mid': null,  // Optional middle color
      'custom-end': '#764ba2',
      // Neutral colors
      'white': '#ffffff'
    }
  };
  
  // Merge with user options
  const tokens = {
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) }
  };
  
  return {
    handler: ({ addUtilities, addBase }) => {
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
        '.gradient-sunset': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-sunset-start), var(--cs-gradient-sunset-mid), var(--cs-gradient-sunset-end))'
        },
        '.gradient-ocean': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end))'
        },
        '.gradient-fire': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-fire-start), var(--cs-gradient-fire-end))'
        },
        '.gradient-mint': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-mint-start), var(--cs-gradient-mint-end))'
        },
        '.gradient-purple': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-purple-start), var(--cs-gradient-purple-end))'
        },
        '.gradient-orange': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-orange-start), var(--cs-gradient-orange-end))'
        },
        '.gradient-blue': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-blue-start), var(--cs-gradient-blue-end))'
        },
        '.gradient-pink': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-pink-start), var(--cs-gradient-pink-end))'
        },
        '.gradient-custom': {
          'background': tokens.colors['custom-mid'] 
            ? `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-mid), var(--cs-gradient-custom-end))`
            : `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-end))`
        },
        
        // Gradient text utilities
        '.gradient-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-sunset': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-sunset-start), var(--cs-gradient-sunset-mid), var(--cs-gradient-sunset-end))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-ocean': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-fire': {
          'background': 'linear-gradient(135deg, var(--cs-gradient-fire-start), var(--cs-gradient-fire-end))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-custom': {
          'background': tokens.colors['custom-mid'] 
            ? `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-mid), var(--cs-gradient-custom-end))`
            : `linear-gradient(135deg, var(--cs-gradient-custom-start), var(--cs-gradient-custom-end))`,
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        
        // Radial gradients
        '.gradient-radial-center': {
          'background': 'radial-gradient(circle at center, var(--tw-gradient-stops))'
        },
        '.gradient-radial-top': {
          'background': 'radial-gradient(circle at top, var(--tw-gradient-stops))'
        },
        '.gradient-radial-bottom': {
          'background': 'radial-gradient(circle at bottom, var(--tw-gradient-stops))'
        },
        
        // Conic gradients
        '.gradient-conic': {
          'background': 'conic-gradient(var(--tw-gradient-stops))'
        },
        '.gradient-conic-center': {
          'background': 'conic-gradient(from 0deg at 50% 50%, var(--tw-gradient-stops))'
        },
        
        // Gradient borders (using pseudo-elements)
        '.gradient-border': {
          'position': 'relative',
          'background': 'linear-gradient(135deg, var(--cs-gradient-ocean-start), var(--cs-gradient-ocean-end))',
          'border-radius': '0.5rem'
        },
        '.gradient-border::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '1px',
          'background': 'var(--cs-gradient-white)',
          'border-radius': 'calc(0.5rem - 1px)'
        },
        
        // Animated gradients
        '.gradient-animate': {
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
}

// Export both default and named export for flexibility
export { gradientsPlugin as gradients };

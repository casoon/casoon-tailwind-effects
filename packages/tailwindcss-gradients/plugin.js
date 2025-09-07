import plugin from 'tailwindcss/plugin';

/**
 * @casoon/tailwindcss-gradients - Tailwind CSS Plugin
 * 
 * Beautiful gradient utilities for Tailwind CSS v4.
 */
export default plugin(function ({ addUtilities, addBase, theme }) {
  // Get configuration options from theme
  const options = theme('gradients') || {};
  
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
        }
      });
      
      // Add keyframes for animated gradients
      addBase({
        '@keyframes gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      });
}, {
  // Theme configuration
  theme: {
    extend: {
      gradients: {
        // Default configuration can be overridden by users
        tokens: {
          colors: {
            'sunset-start': '#ff6b6b',
            'sunset-mid': '#ffd93d', 
            'sunset-end': '#6bcf7f',
            'ocean-start': '#667eea',
            'ocean-end': '#764ba2',
            'fire-start': '#f093fb',
            'fire-end': '#f5576c',
            'mint-start': '#4facfe',
            'mint-end': '#00f2fe',
            'purple-start': '#a8edea',
            'purple-end': '#fed6e3',
            'orange-start': '#ffeaa7',
            'orange-end': '#fab1a0',
            'blue-start': '#74b9ff',
            'blue-end': '#0984e3',
            'pink-start': '#fd79a8',
            'pink-end': '#fdcb6e',
            'custom-start': '#667eea',
            'custom-mid': null,
            'custom-end': '#764ba2',
            'white': '#ffffff'
          }
        }
      }
    }
  }
});

// Export both default and named export for flexibility
export { plugin as gradients };

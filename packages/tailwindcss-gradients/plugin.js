/**
 * @casoon/tailwindcss-gradients - Tailwind CSS Plugin
 * 
 * Beautiful gradient utilities for Tailwind CSS v4.
 */
export default function gradientsPlugin(options = {}) {
  return {
    handler: ({ addUtilities }) => {
      // Gradient utilities
      addUtilities({
        // Popular gradient backgrounds
        '.gradient-sunset': {
          'background': 'linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcf7f)'
        },
        '.gradient-ocean': {
          'background': 'linear-gradient(135deg, #667eea, #764ba2)'
        },
        '.gradient-fire': {
          'background': 'linear-gradient(135deg, #f093fb, #f5576c)'
        },
        '.gradient-mint': {
          'background': 'linear-gradient(135deg, #4facfe, #00f2fe)'
        },
        '.gradient-purple': {
          'background': 'linear-gradient(135deg, #a8edea, #fed6e3)'
        },
        '.gradient-orange': {
          'background': 'linear-gradient(135deg, #ffeaa7, #fab1a0)'
        },
        '.gradient-blue': {
          'background': 'linear-gradient(135deg, #74b9ff, #0984e3)'
        },
        '.gradient-pink': {
          'background': 'linear-gradient(135deg, #fd79a8, #fdcb6e)'
        },
        
        // Gradient text utilities
        '.gradient-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-sunset': {
          'background': 'linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcf7f)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-ocean': {
          'background': 'linear-gradient(135deg, #667eea, #764ba2)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        },
        '.gradient-text-fire': {
          'background': 'linear-gradient(135deg, #f093fb, #f5576c)',
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
          'background': 'linear-gradient(135deg, #667eea, #764ba2)',
          'border-radius': '0.5rem'
        },
        '.gradient-border::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '1px',
          'background': 'white',
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

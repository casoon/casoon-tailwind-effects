/**
 * @casoon/tailwindcss-effects - Tailwind CSS Plugin
 * 
 * Complete collection of modern CSS effects and utilities for Tailwind CSS v4.
 * THIS IS A STANDALONE VERSION - NO EXTERNAL DEPENDENCIES
 */
export default function effectsPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, addKeyframes }) => {
      // Essential animations keyframes
      addKeyframes({
        'anim-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'anim-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      });

      // Core utilities from all packages
      addUtilities({
        // Animations
        '.anim': {
          'animation-duration': '300ms',
          'animation-timing-function': 'ease-out',
          'animation-fill-mode': 'both'
        },
        '.fade-in': { 'animation-name': 'anim-fade-in' },
        
        // Glass effects
        '.glass': {
          'backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)'
        },
        
        // Loading
        '.spinner': {
          'border': '4px solid #f3f3f3',
          'border-top': '4px solid #3498db',
          'border-radius': '50%',
          'width': '40px',
          'height': '40px',
          'animation': 'anim-spin 2s linear infinite'
        },
        
        // Utilities
        '.sr-only': {
          'position': 'absolute',
          'width': '1px',
          'height': '1px',
          'padding': '0',
          'margin': '-1px',
          'overflow': 'hidden',
          'clip': 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border': '0'
        }
      });
    }
  };
}

// Export the main plugin as both default and named export
export { effectsPlugin, effectsPlugin as effects };

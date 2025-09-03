/**
 * @casoon/tailwindcss-loading - Tailwind CSS Plugin
 * 
 * Loading animations and spinners for Tailwind CSS v4.
 */
export default function loadingPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addKeyframes }) => {
      // Add keyframes for loading animations
      addKeyframes({
        'spin': {
          '0%': { 'transform': 'rotate(0deg)' },
          '100%': { 'transform': 'rotate(360deg)' }
        }
      });

      // Loading utilities
      addUtilities({
        '.spinner': {
          'border': '4px solid #f3f3f3',
          'border-top': '4px solid #3498db',
          'border-radius': '50%',
          'width': '40px',
          'height': '40px',
          'animation': 'spin 2s linear infinite'
        },
        '.loading': {
          'opacity': '0.5',
          'pointer-events': 'none'
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { loadingPlugin as loading };

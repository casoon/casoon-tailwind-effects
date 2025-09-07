/**
 * @casoon/tailwindcss-loading - Tailwind CSS Plugin
 * 
 * Loading animations and spinners for Tailwind CSS v4.
 */
export default function loadingPlugin(options = {}) {
  // Default color tokens
  const defaultTokens = {
    colors: {
      'spinner-base': '#f3f3f3',
      'spinner-active': '#3498db'
    }
  };
  
  // Merge with user options
  const tokens = {
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) }
  };
  
  return {
    handler: ({ addUtilities, addKeyframes, addBase }) => {
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
}

// Export both default and named export for flexibility
export { loadingPlugin as loading };

import plugin from 'tailwindcss/plugin';

/**
 * @casoon/tailwindcss-loading - Tailwind CSS Plugin
 * 
 * Loading animations and spinners for Tailwind CSS v4.
 */
export default plugin(function ({ addUtilities, addBase, theme }) {
  // Get configuration options from theme
  const options = theme('loading') || {};
  
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
      // Add CSS custom properties (tokens)
      addBase({
        ':root': {
          '--cs-loading-spinner-base': tokens.colors['spinner-base'],
          '--cs-loading-spinner-active': tokens.colors['spinner-active']
        }
      });
      
      // Add keyframes for loading animations directly to base for v4 compatibility
      addBase({
        '@keyframes spin': {
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
}, {
  // Theme configuration
  theme: {
    extend: {
      loading: {
        // Default configuration can be overridden by users
        tokens: {
          colors: {
            'spinner-base': '#f3f3f3',
            'spinner-active': '#3498db'
          }
        }
      }
    }
  }
});

// Export both default and named export for flexibility
export { plugin as loading };

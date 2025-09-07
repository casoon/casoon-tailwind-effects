/**
 * @casoon/tailwindcss-effects - Tailwind CSS v4 Plugin Aggregator
 * 
 * Complete collection of modern CSS effects and utilities for Tailwind CSS v4.
 * This exports a single handler that includes all individual plugins.
 */

// For v4, we need to create a single handler that combines all our CSS
export default {
  handler: ({ addUtilities, addComponents, addBase, theme }) => {
    // Import and execute all individual plugin handlers inline
    
    // Utilities Plugin (inline)
    addUtilities({
      '.cs-sr-only': {
        'position': 'absolute',
        'width': '1px',
        'height': '1px',
        'padding': '0',
        'margin': '-1px',
        'overflow': 'hidden',
        'clip': 'rect(0, 0, 0, 0)',
        'white-space': 'nowrap',
        'border': '0'
      },
      '.cs-container-fluid': {
        'width': '100%',
        'padding-left': '1rem',
        'padding-right': '1rem'
      },
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
      },
      '.container-fluid': {
        'width': '100%',
        'padding-left': '1rem',
        'padding-right': '1rem'
      }
    });

    // Loading Plugin (inline)
    addUtilities({
      '.cs-loading': {
        'position': 'relative',
        'overflow': 'hidden',
        '&::after': {
          'content': '""',
          'position': 'absolute',
          'inset': '0',
          'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          'transform': 'translateX(-100%)',
          'animation': 'loading-shimmer 2s infinite'
        }
      },
      '.cs-spinner': {
        'display': 'inline-block',
        'width': '1.25rem',
        'height': '1.25rem',
        'border': '2px solid #e5e7eb',
        'border-top-color': '#3b82f6',
        'border-radius': '50%',
        'animation': 'spin 1s linear infinite'
      }
    });

    // Add keyframes for loading animations
    addBase({
      '@keyframes loading-shimmer': {
        '100%': { 'transform': 'translateX(100%)' }
      },
      '@keyframes spin': {
        '0%': { 'transform': 'rotate(0deg)' },
        '100%': { 'transform': 'rotate(360deg)' }
      }
    });

    // Note: For a complete implementation, we would include all other plugins here
    // For now, this demonstrates the correct v4 pattern for the meta-package
  }
};

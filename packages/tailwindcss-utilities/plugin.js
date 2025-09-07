/**
 * @casoon/tailwindcss-utilities - Tailwind CSS Plugin
 * 
 * Essential utility classes for Tailwind CSS v4.
 */
export default function utilitiesPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents }) => {
      // Essential utility classes
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
        // Legacy aliases for backward compatibility
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
    }
  };
}

// Export both default and named export for flexibility
export { utilitiesPlugin as utilities };

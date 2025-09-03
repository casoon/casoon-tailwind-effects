/**
 * @casoon/tailwindcss-glass - Tailwind CSS Plugin
 * 
 * Glassmorphism components and utilities for Tailwind CSS v4.
 */
export default function glassPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents }) => {
      // Glass effect utilities
      addUtilities({
        '.glass': {
          'backdrop-filter': 'blur(16px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)'
        },
        '.glass-dark': {
          'backdrop-filter': 'blur(16px)',
          'background': 'rgba(0, 0, 0, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.1)'
        },
        '.glass-sm': {
          'backdrop-filter': 'blur(8px)'
        },
        '.glass-lg': {
          'backdrop-filter': 'blur(24px)'
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { glassPlugin as glass };

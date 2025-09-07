import plugin from 'tailwindcss/plugin';

/**
 * @casoon/tailwindcss-navigation - Tailwind CSS Plugin
 * 
 * Navigation components and utilities for Tailwind CSS v4.
 */
export default plugin(function ({ addUtilities, addComponents, addBase, theme }) {
  // Get configuration options from theme
  const options = theme('navigation') || {};
  
  // Default color tokens
  const defaultTokens = {
    colors: {
      'primary': '#007bff',
      'white': '#ffffff',
      'text-muted': '#495057',
      'border': '#dee2e6'
    }
  };
  
  // Merge with user options
  const tokens = {
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) }
  };
      // Add CSS custom properties (tokens)
      addBase({
        ':root': {
          '--cs-nav-primary': tokens.colors['primary'],
          '--cs-nav-white': tokens.colors['white'],
          '--cs-nav-text-muted': tokens.colors['text-muted'],
          '--cs-nav-border': tokens.colors['border']
        }
      });
      // Navigation components
      addComponents({
        '.cs-nav': {
          'display': 'flex',
          'flex-wrap': 'wrap',
          'padding-left': '0',
          'margin-bottom': '0',
          'list-style': 'none'
        },
        '.cs-nav-item': {
          'display': 'block'
        },
        '.cs-nav-link': {
          'display': 'block',
          'padding': '0.5rem 1rem',
          'color': 'inherit',
          'text-decoration': 'none',
          'transition': 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out'
        },
        '.cs-nav-link:hover': {
          'text-decoration': 'none'
        },
        '.cs-nav-link.active': {
          'font-weight': '600'
        }
      });

      // Navigation utilities
      addUtilities({
        '.cs-nav-pills .cs-nav-item .cs-nav-link': {
          'border-radius': '0.25rem'
        },
        '.cs-nav-pills .cs-nav-item .cs-nav-link.active': {
          'background-color': 'var(--cs-nav-primary)',
          'color': 'var(--cs-nav-white)'
        },
        '.cs-nav-tabs .cs-nav-item .cs-nav-link': {
          'border': '1px solid transparent',
          'border-top-left-radius': '0.25rem',
          'border-top-right-radius': '0.25rem'
        },
        '.cs-nav-tabs .cs-nav-item .cs-nav-link.active': {
          'color': 'var(--cs-nav-text-muted)',
          'background-color': 'var(--cs-nav-white)',
          'border-color': 'var(--cs-nav-border) var(--cs-nav-border) var(--cs-nav-white)'
        },
        '.cs-navbar-brand': {
          'display': 'inline-block',
          'padding-top': '0.3125rem',
          'padding-bottom': '0.3125rem',
          'margin-right': '1rem',
          'font-size': '1.25rem',
          'line-height': 'inherit',
          'white-space': 'nowrap'
        },
        '.cs-navbar-nav': {
          'display': 'flex',
          'flex-direction': 'column',
          'padding-left': '0',
          'margin-bottom': '0',
          'list-style': 'none'
        },
        '.cs-navbar-nav .cs-nav-link': {
          'padding-right': '0',
          'padding-left': '0'
        }
      });
}, {
  // Theme configuration
  theme: {
    extend: {
      navigation: {
        // Default configuration can be overridden by users
        tokens: {
          colors: {
            'primary': '#007bff',
            'white': '#ffffff',
            'text-muted': '#495057',
            'border': '#dee2e6'
          }
        }
      }
    }
  }
});

// Export both default and named export for flexibility
export { plugin as navigation };

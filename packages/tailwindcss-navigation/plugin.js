/**
 * @casoon/tailwindcss-navigation - Tailwind CSS Plugin
 * 
 * Navigation components and utilities for Tailwind CSS v4.
 */
export default function navigationPlugin(options = {}) {
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
  
  return {
    handler: ({ addUtilities, addComponents, addBase }) => {
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
        '.nav': {
          'display': 'flex',
          'flex-wrap': 'wrap',
          'padding-left': '0',
          'margin-bottom': '0',
          'list-style': 'none'
        },
        '.nav-item': {
          'display': 'block'
        },
        '.nav-link': {
          'display': 'block',
          'padding': '0.5rem 1rem',
          'color': 'inherit',
          'text-decoration': 'none',
          'transition': 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out'
        },
        '.nav-link:hover': {
          'text-decoration': 'none'
        },
        '.nav-link.active': {
          'font-weight': '600'
        }
      });

      // Navigation utilities
      addUtilities({
        '.nav-pills .nav-item .nav-link': {
          'border-radius': '0.25rem'
        },
        '.nav-pills .nav-item .nav-link.active': {
          'background-color': 'var(--cs-nav-primary)',
          'color': 'var(--cs-nav-white)'
        },
        '.nav-tabs .nav-item .nav-link': {
          'border': '1px solid transparent',
          'border-top-left-radius': '0.25rem',
          'border-top-right-radius': '0.25rem'
        },
        '.nav-tabs .nav-item .nav-link.active': {
          'color': 'var(--cs-nav-text-muted)',
          'background-color': 'var(--cs-nav-white)',
          'border-color': 'var(--cs-nav-border) var(--cs-nav-border) var(--cs-nav-white)'
        },
        '.navbar-brand': {
          'display': 'inline-block',
          'padding-top': '0.3125rem',
          'padding-bottom': '0.3125rem',
          'margin-right': '1rem',
          'font-size': '1.25rem',
          'line-height': 'inherit',
          'white-space': 'nowrap'
        },
        '.navbar-nav': {
          'display': 'flex',
          'flex-direction': 'column',
          'padding-left': '0',
          'margin-bottom': '0',
          'list-style': 'none'
        },
        '.navbar-nav .nav-link': {
          'padding-right': '0',
          'padding-left': '0'
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { navigationPlugin as navigation };

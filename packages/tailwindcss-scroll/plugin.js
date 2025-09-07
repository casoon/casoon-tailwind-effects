/**
 * @casoon/tailwindcss-scroll - Tailwind CSS Plugin
 * 
 * Scroll-based animations and utilities for Tailwind CSS v4.
 */
export default function scrollPlugin(options = {}) {
  // Default color tokens
  const defaultTokens = {
    colors: {
      'thumb-gray': '#6b7280',
      'thumb-blue': '#3b82f6'
    }
  };
  
  // Merge with user options
  const tokens = {
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) }
  };
  
  return {
    handler: ({ addUtilities, addBase }) => {
      // Add CSS custom properties (tokens)
      addBase({
        ':root': {
          '--cs-scroll-thumb-gray': tokens.colors['thumb-gray'],
          '--cs-scroll-thumb-blue': tokens.colors['thumb-blue']
        }
      });
      // Scroll behavior utilities
      addUtilities({
        // Scroll behavior
        '.scroll-smooth': {
          'scroll-behavior': 'smooth'
        },
        '.scroll-auto': {
          'scroll-behavior': 'auto'
        },
        
        // Scroll snap utilities
        '.scroll-snap-none': {
          'scroll-snap-type': 'none'
        },
        '.scroll-snap-x': {
          'scroll-snap-type': 'x mandatory'
        },
        '.scroll-snap-y': {
          'scroll-snap-type': 'y mandatory'
        },
        '.scroll-snap-both': {
          'scroll-snap-type': 'both mandatory'
        },
        '.scroll-snap-proximity': {
          'scroll-snap-type': 'y proximity'
        },
        
        // Scroll snap alignment
        '.snap-start': {
          'scroll-snap-align': 'start'
        },
        '.snap-end': {
          'scroll-snap-align': 'end'
        },
        '.snap-center': {
          'scroll-snap-align': 'center'
        },
        '.snap-align-none': {
          'scroll-snap-align': 'none'
        },
        
        // Scroll snap stop
        '.snap-normal': {
          'scroll-snap-stop': 'normal'
        },
        '.snap-always': {
          'scroll-snap-stop': 'always'
        },
        
        // Scroll margin utilities
        '.scroll-m-0': { 'scroll-margin': '0px' },
        '.scroll-m-1': { 'scroll-margin': '0.25rem' },
        '.scroll-m-2': { 'scroll-margin': '0.5rem' },
        '.scroll-m-4': { 'scroll-margin': '1rem' },
        '.scroll-m-8': { 'scroll-margin': '2rem' },
        '.scroll-m-16': { 'scroll-margin': '4rem' },
        
        // Scroll padding utilities
        '.scroll-p-0': { 'scroll-padding': '0px' },
        '.scroll-p-1': { 'scroll-padding': '0.25rem' },
        '.scroll-p-2': { 'scroll-padding': '0.5rem' },
        '.scroll-p-4': { 'scroll-padding': '1rem' },
        '.scroll-p-8': { 'scroll-padding': '2rem' },
        '.scroll-p-16': { 'scroll-padding': '4rem' },
        
        // Scrollbar utilities (WebKit)
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none'
        },
        '.cs-scrollbar-none::-webkit-scrollbar': {
          'display': 'none'
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin'
        },
        '.scrollbar-auto': {
          'scrollbar-width': 'auto'
        },
        
        // Custom scrollbar styling (WebKit)
        '.scrollbar-thumb-gray': {
          'scrollbar-color': 'var(--cs-scroll-thumb-gray) transparent'
        },
        '.scrollbar-thumb-blue': {
          'scrollbar-color': 'var(--cs-scroll-thumb-blue) transparent'
        },
        '.scrollbar-track-transparent': {
          'scrollbar-color': 'inherit transparent'
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { scrollPlugin as scroll };

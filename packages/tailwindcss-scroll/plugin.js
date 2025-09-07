/**
 * @casoon/tailwindcss-scroll - Tailwind CSS v4 Plugin
 * 
 * Scroll-based animations and utilities for Tailwind CSS v4.
 */
const scrollPlugin = {
  handler: ({ addUtilities, addBase }) => {
    // Add CSS custom properties (tokens)
    addBase({
      ':root': {
        '--cs-scroll-thumb-gray': '#6b7280',
        '--cs-scroll-thumb-blue': '#3b82f6'
      }
    });
    
    // Scroll behavior utilities
    addUtilities({
      // Scroll behavior
      '.cs-scroll-smooth': {
        'scroll-behavior': 'smooth'
      },
      '.cs-scroll-auto': {
        'scroll-behavior': 'auto'
      },
      
      // Scroll snap utilities
      '.cs-scroll-snap-none': {
        'scroll-snap-type': 'none'
      },
      '.cs-scroll-snap-x': {
        'scroll-snap-type': 'x mandatory'
      },
      '.cs-scroll-snap-y': {
        'scroll-snap-type': 'y mandatory'
      },
      '.cs-scroll-snap-both': {
        'scroll-snap-type': 'both mandatory'
      },
      '.cs-scroll-snap-proximity': {
        'scroll-snap-type': 'y proximity'
      },
      
      // Scroll snap alignment
      '.cs-snap-start': {
        'scroll-snap-align': 'start'
      },
      '.cs-snap-end': {
        'scroll-snap-align': 'end'
      },
      '.cs-snap-center': {
        'scroll-snap-align': 'center'
      },
      '.cs-snap-align-none': {
        'scroll-snap-align': 'none'
      },
      
      // Scroll snap stop
      '.cs-snap-normal': {
        'scroll-snap-stop': 'normal'
      },
      '.cs-snap-always': {
        'scroll-snap-stop': 'always'
      },
      
      // Scroll margin utilities
      '.cs-scroll-m-0': { 'scroll-margin': '0px' },
      '.cs-scroll-m-1': { 'scroll-margin': '0.25rem' },
      '.cs-scroll-m-2': { 'scroll-margin': '0.5rem' },
      '.cs-scroll-m-4': { 'scroll-margin': '1rem' },
      '.cs-scroll-m-8': { 'scroll-margin': '2rem' },
      '.cs-scroll-m-16': { 'scroll-margin': '4rem' },
      
      // Scroll padding utilities
      '.cs-scroll-p-0': { 'scroll-padding': '0px' },
      '.cs-scroll-p-1': { 'scroll-padding': '0.25rem' },
      '.cs-scroll-p-2': { 'scroll-padding': '0.5rem' },
      '.cs-scroll-p-4': { 'scroll-padding': '1rem' },
      '.cs-scroll-p-8': { 'scroll-padding': '2rem' },
      '.cs-scroll-p-16': { 'scroll-padding': '4rem' },
      
      // Scrollbar utilities (WebKit)
      '.cs-scrollbar-none': {
        'scrollbar-width': 'none',
        '-ms-overflow-style': 'none'
      },
      '.cs-scrollbar-none::-webkit-scrollbar': {
        'display': 'none'
      },
      '.cs-scrollbar-thin': {
        'scrollbar-width': 'thin'
      },
      '.cs-scrollbar-auto': {
        'scrollbar-width': 'auto'
      },
      
      // Custom scrollbar styling (WebKit)
      '.cs-scrollbar-thumb-gray': {
        'scrollbar-color': 'var(--cs-scroll-thumb-gray) transparent'
      },
      '.cs-scrollbar-thumb-blue': {
        'scrollbar-color': 'var(--cs-scroll-thumb-blue) transparent'
      },
      '.cs-scrollbar-track-transparent': {
        'scrollbar-color': 'inherit transparent'
      }
    });
  }
};

export default scrollPlugin;
export { scrollPlugin as scroll };

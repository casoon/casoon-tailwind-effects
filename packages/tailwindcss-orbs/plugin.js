/**
 * @casoon/tailwindcss-orbs - Tailwind CSS Plugin
 * 
 * Animated orb and blob components for Tailwind CSS v4.
 */
export default function orbsPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addKeyframes }) => {
      // Orb animation keyframes
      addKeyframes({
        'orb-float': {
          '0%, 100%': { 'transform': 'translateY(0px)' },
          '50%': { 'transform': 'translateY(-20px)' }
        },
        'orb-pulse': {
          '0%, 100%': { 'opacity': '0.7', 'transform': 'scale(1)' },
          '50%': { 'opacity': '1', 'transform': 'scale(1.05)' }
        },
        'orb-drift': {
          '0%': { 'transform': 'translateX(0px)' },
          '33%': { 'transform': 'translateX(30px)' },
          '66%': { 'transform': 'translateX(-20px)' },
          '100%': { 'transform': 'translateX(0px)' }
        }
      });

      // Orb utilities
      addUtilities({
        // Base orb styles
        '.orb': {
          'border-radius': '50%',
          'filter': 'blur(1px)',
          'opacity': '0.7',
          'pointer-events': 'none'
        },
        
        // Orb sizes
        '.orb-xs': { 'width': '50px', 'height': '50px' },
        '.orb-sm': { 'width': '75px', 'height': '75px' },
        '.orb-md': { 'width': '100px', 'height': '100px' },
        '.orb-lg': { 'width': '150px', 'height': '150px' },
        '.orb-xl': { 'width': '200px', 'height': '200px' },
        '.orb-2xl': { 'width': '300px', 'height': '300px' },
        
        // Orb blur levels
        '.orb-blur-none': { 'filter': 'blur(0)' },
        '.orb-blur-sm': { 'filter': 'blur(2px)' },
        '.orb-blur-md': { 'filter': 'blur(4px)' },
        '.orb-blur-lg': { 'filter': 'blur(8px)' },
        
        // Orb animations
        '.orb-float': {
          'animation': 'orb-float 6s ease-in-out infinite'
        },
        '.orb-pulse': {
          'animation': 'orb-pulse 4s ease-in-out infinite'
        },
        '.orb-drift': {
          'animation': 'orb-drift 8s ease-in-out infinite'
        },
        
        // Orb positioning helpers
        '.orb-absolute': {
          'position': 'absolute'
        },
        '.orb-fixed': {
          'position': 'fixed'
        },
        
        // Common orb colors (can be combined with Tailwind colors)
        '.orb-gradient-blue': {
          'background': 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(147,197,253,0.3) 50%, rgba(219,234,254,0.1) 100%)'
        },
        '.orb-gradient-purple': {
          'background': 'radial-gradient(circle, rgba(147,51,234,0.5) 0%, rgba(196,181,253,0.3) 50%, rgba(237,233,254,0.1) 100%)'
        },
        '.orb-gradient-pink': {
          'background': 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(251,207,232,0.3) 50%, rgba(253,242,248,0.1) 100%)'
        }
      });
    }
  };
}

// Export both default and named export for flexibility
export { orbsPlugin as orbs };

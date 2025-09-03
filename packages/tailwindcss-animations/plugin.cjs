const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * @casoon/tailwindcss-animations - Tailwind CSS Plugin (CommonJS)
 * 
 * Provides comprehensive animation utilities and keyframes for Tailwind CSS v4.
 * Includes transitions, transforms, and motion-safe variants.
 */
function animationsPlugin(options = {}) {
  return {
    handler: ({ addUtilities, addComponents, theme }) => {
      // Add keyframes programmatically (extracted from CSS)
      const keyframes = {
        'anim-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'anim-fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'anim-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'anim-scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' }
        },
        'anim-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'anim-slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'anim-slide-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'anim-slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'anim-blur-in': {
          '0%': { opacity: '0', filter: 'blur(4px)' },
          '100%': { opacity: '1', filter: 'blur(0)' }
        },
        'anim-blur-out': {
          '0%': { opacity: '1', filter: 'blur(0)' },
          '100%': { opacity: '0', filter: 'blur(4px)' }
        },
        'anim-rotate-in': {
          '0%': { opacity: '0', transform: 'rotate(-5deg)' },
          '100%': { opacity: '1', transform: 'rotate(0deg)' }
        },
        'anim-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'anim-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'anim-bounce': {
          '0%, 100%': { transform: 'translateY(0)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(-25%)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' }
        },
        'anim-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' }
        }
      };

      // Add custom keyframes to theme
      theme.extend = theme.extend || {};
      theme.extend.keyframes = { ...theme.extend.keyframes, ...keyframes };

      // Add animation utilities
      const animations = {
        '.anim': {
          'animation-duration': 'var(--anim-duration, 300ms)',
          'animation-timing-function': 'var(--anim-ease, ease-out)',
          'animation-iteration-count': '1',
          'animation-direction': 'var(--anim-direction, normal)',
          'animation-fill-mode': 'var(--anim-fill, both)',
          'animation-delay': 'var(--anim-delay, 0ms)'
        },
        '.fade-in': { 'animation-name': 'anim-fade-in' },
        '.fade-out': { 'animation-name': 'anim-fade-out' },
        '.scale-in': { 'animation-name': 'anim-scale-in' },
        '.scale-out': { 'animation-name': 'anim-scale-out' },
        '.slide-up': { 'animation-name': 'anim-slide-up' },
        '.slide-down': { 'animation-name': 'anim-slide-down' },
        '.slide-left': { 'animation-name': 'anim-slide-left' },
        '.slide-right': { 'animation-name': 'anim-slide-right' },
        '.blur-in': { 'animation-name': 'anim-blur-in' },
        '.blur-out': { 'animation-name': 'anim-blur-out' },
        '.rotate-in': { 'animation-name': 'anim-rotate-in' },
        '.rotate': { 'animation-name': 'anim-rotate' },
        '.pulse': { 'animation-name': 'anim-pulse' },
        '.bounce': { 'animation-name': 'anim-bounce' },
        '.wiggle': { 'animation-name': 'anim-wiggle' },
        // Duration utilities
        '.anim-xxs': { '--anim-duration': '100ms' },
        '.anim-xs': { '--anim-duration': '150ms' },
        '.anim-sm': { '--anim-duration': '200ms' },
        '.anim-md': { '--anim-duration': '300ms' },
        '.anim-lg': { '--anim-duration': '500ms' },
        '.anim-xl': { '--anim-duration': '700ms' },
        '.anim-2xl': { '--anim-duration': '1000ms' },
        // Easing utilities
        '.ease-standard': { '--anim-ease': 'cubic-bezier(0.2, 0, 0, 1)' },
        '.ease-emphasized': { '--anim-ease': 'cubic-bezier(0.3, 0, 0.8, 0.15)' },
        '.ease-decelerate': { '--anim-ease': 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
        '.ease-accelerate': { '--anim-ease': 'cubic-bezier(0.3, 0, 1, 1)' },
        '.ease-spring': { '--anim-ease': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        '.ease-soft-spring': { '--anim-ease': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        // Hover effects
        '.hover-lift-sm': {
          'transition': 'transform 200ms cubic-bezier(0.2, 0, 0, 1), box-shadow 200ms cubic-bezier(0.2, 0, 0, 1)',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 6px 12px color-mix(in oklab, var(--anim-shadow-ink, #000) 10%, transparent)'
          }
        },
        '.hover-scale-105': {
          'transition': 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
          '&:hover': { 'transform': 'scale(1.05)' }
        },
        // Motion safety
        '@media (prefers-reduced-motion: reduce)': {
          '.anim, .fade-in, .fade-out, .scale-in, .scale-out, .slide-up, .slide-down, .slide-left, .slide-right, .blur-in, .blur-out, .rotate-in, .rotate, .pulse, .bounce, .wiggle': {
            'animation-duration': '1ms !important',
            'animation-iteration-count': '1 !important',
            'animation-timing-function': 'ease !important',
            'transition': 'none !important'
          },
          '.hover-lift-sm:hover, .hover-scale-105:hover': {
            'transform': 'none !important'
          }
        }
      };

      addUtilities(animations);
    },
    config: {
      theme: {
        extend: {
          transitionDuration: {
            'xxs': '100ms',
            'xs': '150ms',
            'sm': '200ms',
            'md': '300ms',
            'lg': '500ms',
            'xl': '700ms',
            '2xl': '1000ms'
          },
          transitionTimingFunction: {
            'standard': 'cubic-bezier(0.2, 0, 0, 1)',
            'emphasized': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
            'decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
            'accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
            'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            'soft-spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }
        }
      }
    }
  };
}

module.exports = animationsPlugin;
module.exports.animationsPlugin = animationsPlugin;
module.exports.default = animationsPlugin;

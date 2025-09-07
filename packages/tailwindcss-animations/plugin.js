/**
 * @casoon/tailwindcss-animations - Tailwind CSS Plugin
 * 
 * Provides comprehensive animation utilities and keyframes for Tailwind CSS v4.
 * Includes transitions, transforms, and motion-safe variants.
 * 
 * @param {Object} options - Plugin configuration options
 * @param {Object} options.tokens - Token overrides for customization
 * @param {Object} options.tokens.durations - Duration token overrides
 * @param {Object} options.tokens.easing - Easing function token overrides  
 * @param {Object} options.tokens.colors - Color token overrides
 * @param {Object} options.tokens.motionSafety - Motion safety token overrides
 */
export default function animationsPlugin(options = {}) {
  // Default tokens
  const defaultTokens = {
    durations: {
      xxs: '100ms',
      xs: '150ms', 
      sm: '200ms',
      md: '300ms',
      lg: '500ms',
      xl: '700ms',
      '2xl': '1000ms'
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      emphasized: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
      decelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      softSpring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    colors: {
      shadowInk: '#000'
    },
    motionSafety: {
      duration: '1ms',
      ease: 'ease'
    }
  };

  // Merge user tokens with defaults
  const tokens = {
    durations: { ...defaultTokens.durations, ...(options.tokens?.durations || {}) },
    easing: { ...defaultTokens.easing, ...(options.tokens?.easing || {}) },
    colors: { ...defaultTokens.colors, ...(options.tokens?.colors || {}) },
    motionSafety: { ...defaultTokens.motionSafety, ...(options.tokens?.motionSafety || {}) }
  };

  return {
    handler: ({ addUtilities, addComponents, addKeyframes, addBase }) => {
      // CSS Custom Properties (Design Tokens)
      addBase({
        ':root': {
          // Animation Durations
          '--cs-anim-duration-xxs': tokens.durations.xxs,
          '--cs-anim-duration-xs': tokens.durations.xs,
          '--cs-anim-duration-sm': tokens.durations.sm,
          '--cs-anim-duration-md': tokens.durations.md,
          '--cs-anim-duration-lg': tokens.durations.lg,
          '--cs-anim-duration-xl': tokens.durations.xl,
          '--cs-anim-duration-2xl': tokens.durations['2xl'],
          
          // Animation Easing Functions
          '--cs-anim-ease-standard': tokens.easing.standard,
          '--cs-anim-ease-emphasized': tokens.easing.emphasized,
          '--cs-anim-ease-decelerate': tokens.easing.decelerate,
          '--cs-anim-ease-accelerate': tokens.easing.accelerate,
          '--cs-anim-ease-spring': tokens.easing.spring,
          '--cs-anim-ease-soft-spring': tokens.easing.softSpring,
          
          // Motion Safety
          '--cs-anim-reduced-motion-duration': tokens.motionSafety.duration,
          '--cs-anim-reduced-motion-ease': tokens.motionSafety.ease,
          
          // Shadow for hover effects
          '--cs-anim-shadow-ink': tokens.colors.shadowInk
        }
      });

      // Add keyframes
      addKeyframes({
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
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }
        },
        'anim-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' }
        },
        'anim-reveal-3d-up': {
          '0%': { opacity: '0', transform: 'rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'rotateX(0deg)' }
        },
        'anim-reveal-3d-right': {
          '0%': { opacity: '0', transform: 'rotateY(90deg)' },
          '100%': { opacity: '1', transform: 'rotateY(0deg)' }
        },
        'anim-marquee': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'anim-parallax-y': {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(10px)' }
        },
        'anim-progress-grow': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      });

      // Add base animation components
      addComponents({
        '.anim': {
          'animation-duration': 'var(--cs-anim-duration, var(--cs-anim-duration-md))',
          'animation-timing-function': 'var(--cs-anim-ease, var(--cs-anim-ease-standard))',
          'animation-iteration-count': '1',
          'animation-direction': 'var(--cs-anim-direction, normal)',
          'animation-fill-mode': 'var(--cs-anim-fill, both)',
          'animation-delay': 'var(--cs-anim-delay, 0ms)'
        },
        
        // Animation Control Utilities
        '.anim-infinite': { 'animation-iteration-count': 'infinite' },
        '.anim-reverse': { 'animation-direction': 'reverse' },
        '.anim-alternate': { 'animation-direction': 'alternate' },
        '.anim-both': { 'animation-fill-mode': 'both' },
        '.anim-forwards': { 'animation-fill-mode': 'forwards' },
        
        // Performance Hints
        '.will-transform': { 'will-change': 'transform' },
        '.will-opacity': { 'will-change': 'opacity' },
        '.will-filter': { 'will-change': 'filter' },
        
        // Transform Origins
        '.t-origin-top': { 'transform-origin': 'top' },
        '.t-origin-center': { 'transform-origin': 'center' },
        '.t-origin-bottom': { 'transform-origin': 'bottom' },
        '.t-preserve-3d': { 'transform-style': 'preserve-3d' }
      });

      // Add animation utilities
      addUtilities({
        // Duration utilities
        '.anim-xxs': { '--cs-anim-duration': 'var(--cs-anim-duration-xxs)' },
        '.anim-xs': { '--cs-anim-duration': 'var(--cs-anim-duration-xs)' },
        '.anim-sm': { '--cs-anim-duration': 'var(--cs-anim-duration-sm)' },
        '.anim-md': { '--cs-anim-duration': 'var(--cs-anim-duration-md)' },
        '.anim-lg': { '--cs-anim-duration': 'var(--cs-anim-duration-lg)' },
        '.anim-xl': { '--cs-anim-duration': 'var(--cs-anim-duration-xl)' },
        '.anim-2xl': { '--cs-anim-duration': 'var(--cs-anim-duration-2xl)' },
        
        // Easing utilities
        '.ease-standard': { '--cs-anim-ease': 'var(--cs-anim-ease-standard)' },
        '.ease-emphasized': { '--cs-anim-ease': 'var(--cs-anim-ease-emphasized)' },
        '.ease-decelerate': { '--cs-anim-ease': 'var(--cs-anim-ease-decelerate)' },
        '.ease-accelerate': { '--cs-anim-ease': 'var(--cs-anim-ease-accelerate)' },
        '.ease-spring': { '--cs-anim-ease': 'var(--cs-anim-ease-spring)' },
        '.ease-soft-spring': { '--cs-anim-ease': 'var(--cs-anim-ease-soft-spring)' },
        
        // Animation name utilities
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
        '.reveal-3d-up': { 'animation-name': 'anim-reveal-3d-up' },
        '.reveal-3d-right': { 'animation-name': 'anim-reveal-3d-right' },
        
        // Hover effects
        '.hover-lift-sm': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard), box-shadow var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 6px 12px color-mix(in oklab, var(--cs-anim-shadow-ink) 10%, transparent)'
          }
        },
        '.hover-lift-md': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard), box-shadow var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': {
            'transform': 'translateY(-4px)',
            'box-shadow': '0 10px 18px color-mix(in oklab, var(--cs-anim-shadow-ink) 14%, transparent)'
          }
        },
        '.hover-scale-105': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': { 'transform': 'scale(1.05)' }
        },
        '.hover-scale-110': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': { 'transform': 'scale(1.10)' }
        },
        
        // Composed animations
        '.enter-card': { 
          'animation': 'anim-fade-in var(--cs-anim-duration-md) var(--cs-anim-ease-decelerate) both'
        },
        '.enter-modal': { 
          'animation': 'anim-scale-in var(--cs-anim-duration-md) var(--cs-anim-ease-emphasized) both'
        },
        '.exit-modal': { 
          'animation': 'anim-scale-out var(--cs-anim-duration-md) var(--cs-anim-ease-accelerate) both'
        },
        
        // Motion safety
        '@media (prefers-reduced-motion: reduce)': {
          '.anim, .fade-in, .fade-out, .scale-in, .scale-out, .slide-up, .slide-down, .slide-left, .slide-right, .blur-in, .blur-out, .rotate-in, .rotate, .pulse, .bounce, .wiggle, .reveal-3d-up, .reveal-3d-right, .enter-card, .enter-modal, .exit-modal': {
            'animation-duration': 'var(--cs-anim-reduced-motion-duration) !important',
            'animation-iteration-count': '1 !important',
            'animation-timing-function': 'var(--cs-anim-reduced-motion-ease) !important',
            'transition': 'none !important'
          },
          '.cs-hover-lift-sm:hover, .cs-hover-lift-md:hover, .hover-scale-105:hover, .hover-scale-110:hover': {
            'transform': 'none !important'
          }
        }
      });
    }
  };
}

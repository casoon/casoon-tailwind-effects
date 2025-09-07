/**
 * @casoon/tailwindcss-animations - Tailwind CSS v4 Plugin
 */
const plugin = {
  handler: ({ addUtilities, addComponents, addKeyframes, addBase }) => {
    // Comprehensive tokens definition for v4 compatibility
    const tokens = {
      colors: {
        // Basic colors
        white: '#ffffff',
        black: '#000000',
        // Glass colors
        blue: '#3b82f6',
        purple: '#8b5cf6',
        green: '#10b981',
        pink: '#ec4899',
        amber: '#f59e0b',
        // Orb colors
        'blue-light': '#60a5fa',
        'blue-lighter': '#93c5fd',
        'purple-light': '#a78bfa',
        'purple-lighter': '#c4b5fd',
        'pink-light': '#f472b6',
        'pink-lighter': '#f9a8d4',
        'custom-primary': '#3b82f6',
        'custom-secondary': '#8b5cf6', 
        'custom-accent': '#ec4899',
        // Gradient colors
        'sunset-start': '#f59e0b',
        'sunset-mid': '#ef4444',
        'sunset-end': '#ec4899',
        'ocean-start': '#0ea5e9',
        'ocean-end': '#3b82f6',
        'fire-start': '#ef4444',
        'fire-end': '#dc2626',
        'mint-start': '#10b981',
        'mint-end': '#059669',
        'purple-start': '#8b5cf6',
        'purple-end': '#7c3aed',
        'orange-start': '#f97316',
        'orange-end': '#ea580c',
        'blue-start': '#3b82f6',
        'blue-end': '#2563eb',
        'pink-start': '#ec4899',
        'pink-end': '#db2777',
        'custom-start': '#3b82f6',
        'custom-mid': '#8b5cf6',
        'custom-end': '#ec4899',
        // Loading colors
        'spinner-base': '#e5e7eb',
        'spinner-active': '#3b82f6',
        // Micro-interactions colors
        'focus-ring': '#3b82f6',
        shadow: '#000000',
        // Navigation colors
        primary: '#3b82f6',
        'text-muted': '#6b7280',
        border: '#e5e7eb',
        // Animation colors
        shadowInk: '#000000'
      },
      opacity: {
        weak: '15%',
        light: '20%',
        medium: '40%',
        strong: '60%',
        'border-light': '20%',
        'border-medium': '30%',
        'border-strong': '50%',
        'shadow-light': '10%',
        'shadow-medium': '25%',
        'shadow-strong': '40%',
        'shadow-xl': '60%',
        tooltip: '90%',
        'focus-strong': '40%',
        'focus-medium': '25%'
      },
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
        emphasized: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        softSpring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      motionSafety: {
        duration: '100ms',
        ease: 'linear'
      }
    };

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
        '.cs-anim': {
          'animation-duration': 'var(--cs-anim-duration, var(--cs-anim-duration-md))',
          'animation-timing-function': 'var(--cs-anim-ease, var(--cs-anim-ease-standard))',
          'animation-iteration-count': '1',
          'animation-direction': 'var(--cs-anim-direction, normal)',
          'animation-fill-mode': 'var(--cs-anim-fill, both)',
          'animation-delay': 'var(--cs-anim-delay, 0ms)'
        },
        
        // Animation Control Utilities
        '.cs-anim-infinite': { 'animation-iteration-count': 'infinite' },
        '.cs-anim-reverse': { 'animation-direction': 'reverse' },
        '.cs-anim-alternate': { 'animation-direction': 'alternate' },
        '.cs-anim-both': { 'animation-fill-mode': 'both' },
        '.cs-anim-forwards': { 'animation-fill-mode': 'forwards' },
        
        // Performance Hints
        '.cs-will-transform': { 'will-change': 'transform' },
        '.cs-will-opacity': { 'will-change': 'opacity' },
        '.cs-will-filter': { 'will-change': 'filter' },
        
        // Transform Origins
        '.cs-t-origin-top': { 'transform-origin': 'top' },
        '.cs-t-origin-center': { 'transform-origin': 'center' },
        '.cs-t-origin-bottom': { 'transform-origin': 'bottom' },
        '.cs-t-preserve-3d': { 'transform-style': 'preserve-3d' }
      });

      // Add animation utilities
      addUtilities({
        // Duration utilities
        '.cs-anim-xxs': { '--cs-anim-duration': 'var(--cs-anim-duration-xxs)' },
        '.cs-anim-xs': { '--cs-anim-duration': 'var(--cs-anim-duration-xs)' },
        '.cs-anim-sm': { '--cs-anim-duration': 'var(--cs-anim-duration-sm)' },
        '.cs-anim-md': { '--cs-anim-duration': 'var(--cs-anim-duration-md)' },
        '.cs-anim-lg': { '--cs-anim-duration': 'var(--cs-anim-duration-lg)' },
        '.cs-anim-xl': { '--cs-anim-duration': 'var(--cs-anim-duration-xl)' },
        '.cs-anim-2xl': { '--cs-anim-duration': 'var(--cs-anim-duration-2xl)' },
        
        // Easing utilities
        '.cs-ease-standard': { '--cs-anim-ease': 'var(--cs-anim-ease-standard)' },
        '.cs-ease-emphasized': { '--cs-anim-ease': 'var(--cs-anim-ease-emphasized)' },
        '.cs-ease-decelerate': { '--cs-anim-ease': 'var(--cs-anim-ease-decelerate)' },
        '.cs-ease-accelerate': { '--cs-anim-ease': 'var(--cs-anim-ease-accelerate)' },
        '.cs-ease-spring': { '--cs-anim-ease': 'var(--cs-anim-ease-spring)' },
        '.cs-ease-soft-spring': { '--cs-anim-ease': 'var(--cs-anim-ease-soft-spring)' },
        
        // Animation name utilities
        '.cs-fade-in': { 'animation-name': 'anim-fade-in' },
        '.cs-fade-out': { 'animation-name': 'anim-fade-out' },
        '.cs-scale-in': { 'animation-name': 'anim-scale-in' },
        '.cs-scale-out': { 'animation-name': 'anim-scale-out' },
        '.cs-slide-up': { 'animation-name': 'anim-slide-up' },
        '.cs-slide-down': { 'animation-name': 'anim-slide-down' },
        '.cs-slide-left': { 'animation-name': 'anim-slide-left' },
        '.cs-slide-right': { 'animation-name': 'anim-slide-right' },
        '.cs-blur-in': { 'animation-name': 'anim-blur-in' },
        '.cs-blur-out': { 'animation-name': 'anim-blur-out' },
        '.cs-rotate-in': { 'animation-name': 'anim-rotate-in' },
        '.cs-rotate': { 'animation-name': 'anim-rotate' },
        '.cs-pulse': { 'animation-name': 'anim-pulse' },
        '.cs-bounce': { 'animation-name': 'anim-bounce' },
        '.cs-wiggle': { 'animation-name': 'anim-wiggle' },
        '.cs-reveal-3d-up': { 'animation-name': 'anim-reveal-3d-up' },
        '.cs-reveal-3d-right': { 'animation-name': 'anim-reveal-3d-right' },
        
        // Hover effects
        '.cs-hover-lift-sm': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard), box-shadow var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 6px 12px color-mix(in oklab, var(--cs-anim-shadow-ink) 10%, transparent)'
          }
        },
        '.cs-hover-lift-md': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard), box-shadow var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': {
            'transform': 'translateY(-4px)',
            'box-shadow': '0 10px 18px color-mix(in oklab, var(--cs-anim-shadow-ink) 14%, transparent)'
          }
        },
        '.cs-hover-scale-105': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': { 'transform': 'scale(1.05)' }
        },
        '.cs-hover-scale-110': {
          'transition': 'transform var(--cs-anim-duration-sm) var(--cs-anim-ease-standard)',
          '&:hover': { 'transform': 'scale(1.10)' }
        },
        
        // Composed animations
        '.cs-enter-card': { 
          'animation': 'anim-fade-in var(--cs-anim-duration-md) var(--cs-anim-ease-decelerate) both'
        },
        '.cs-enter-modal': { 
          'animation': 'anim-scale-in var(--cs-anim-duration-md) var(--cs-anim-ease-emphasized) both'
        },
        '.cs-exit-modal': { 
          'animation': 'anim-scale-out var(--cs-anim-duration-md) var(--cs-anim-ease-accelerate) both'
        },
        
        // Motion safety
        '@media (prefers-reduced-motion: reduce)': {
          '.cs-anim, .cs-fade-in, .cs-fade-out, .cs-scale-in, .cs-scale-out, .cs-slide-up, .cs-slide-down, .cs-slide-left, .cs-slide-right, .cs-blur-in, .cs-blur-out, .cs-rotate-in, .cs-rotate, .cs-pulse, .cs-bounce, .cs-wiggle, .cs-reveal-3d-up, .cs-reveal-3d-right, .cs-enter-card, .cs-enter-modal, .cs-exit-modal': {
            'animation-duration': 'var(--cs-anim-reduced-motion-duration) !important',
            'animation-iteration-count': '1 !important',
            'animation-timing-function': 'var(--cs-anim-reduced-motion-ease) !important',
            'transition': 'none !important'
          },
          '.cs-hover-lift-sm:hover, .cs-hover-lift-md:hover, .cs-hover-scale-105:hover, .cs-hover-scale-110:hover': {
            'transform': 'none !important'
          }
        }
      });
    }
};

export default plugin;

// scroll.js — AOS-kompatibler Reveal, der animations.css nutzt
(() => {
    const CSSVars = getComputedStyle(document.documentElement);
    const DEFAULTS = {
      root: null,
      rootMargin: (CSSVars.getPropertyValue('--scroll-root-margin').trim() || '0px 0px -12% 0px'),
      threshold: parseFloat(CSSVars.getPropertyValue('--scroll-threshold')) || 0.15,
      once: true,
      mirror: false,
      useAOSCompat: true
    };
  
    const STATE = { items: [], parallax: new Set(), ticking: false };
  
    // Map AOS -> deine Effektklassen/Keyframes
    const AOS_MAP = {
      'fade': 'scroll-fade',
      'fade-up': 'scroll-fade-up',
      'fade-down': 'scroll-fade-down',
      'fade-left': 'scroll-fade-left',
      'fade-right': 'scroll-fade-right',
      'slide-up': 'scroll-slide-up',
      'slide-down': 'scroll-slide-down',
      'slide-left': 'scroll-slide-left',
      'slide-right': 'scroll-slide-right',
      'zoom-in': 'scroll-zoom-in',
      'zoom-out': 'scroll-zoom-out',
      'flip-left': 'scroll-reveal-3d-right',  // oder eigenes Mapping
      'flip-right': 'scroll-reveal-3d-up',
      'blur-in': 'scroll-blur-in',
    };
  
    function selectElements() {
      const a = document.querySelectorAll('.scroll');
      const b = document.querySelectorAll('[data-scroll]');
      const c = document.querySelectorAll('[data-aos]');
      return Array.from(new Set([...a, ...b, ...c]));
    }
  
    function applyAOSCompat(el) {
      const effect = el.getAttribute('data-aos');
      if (!effect) return;
      el.classList.add('scroll');
      const mapped = AOS_MAP[effect];
      if (mapped) el.classList.add(mapped);
      const dur = el.getAttribute('data-aos-duration');
      const del = el.getAttribute('data-aos-delay');
      const eas = el.getAttribute('data-aos-easing');
      if (dur) el.style.setProperty('--anim-duration', `${parseInt(dur,10)}ms`);
      if (del) el.style.setProperty('--anim-delay', `${parseInt(del,10)}ms`);
      if (eas) el.style.setProperty('--anim-ease', eas);
      const once = el.getAttribute('data-aos-once');
      if (once != null) el.setAttribute('data-scroll-once', once);
    }
  
    function readOptions(el) {
      const v = (name, fb) => el.getAttribute(name) ?? fb;
      const f = (name, fb) => {
        const s = v(name, null); if (s==null) return fb;
        if (s === '' || s === 'true') return true;
        if (s === 'false') return false;
        return Boolean(s);
      };
      return {
        once: f('data-scroll-once', DEFAULTS.once),
        mirror: f('data-scroll-mirror', DEFAULTS.mirror),
        offset: parseInt(v('data-scroll-offset', '0'), 10),
        parallaxY: parseFloat(v('data-scroll-parallax-y', '0')),
        parallaxX: parseFloat(v('data-scroll-parallax-x', '0')),
        parallaxScale: parseFloat(v('data-scroll-parallax-scale', '0')),
      };
    }
  
    function computeRootMargin(offsetPx=0) {
      const base = DEFAULTS.rootMargin.split(' ');
      const top = parseInt(base[0]) - offsetPx;
      base[0] = `${top}px`;
      return base.join(' ');
    }
  
    function onIntersect(entries) {
      for (const entry of entries) {
        const el = entry.target;
        const opt = el.__srx || {};
        if (entry.isIntersecting) {
          // autom. deine Animations-Basisklasse aktivieren
          el.classList.add('anim', 'scroll-in', 'is-inview');
          if (!el.__animatedOnce) {
            el.dispatchEvent(new CustomEvent('scroll:enter'));
            if (opt.once) el.__animatedOnce = true;
          }
        } else {
          el.classList.remove('is-inview');
          if (opt.mirror) {
            el.classList.remove('scroll-in');
            el.dispatchEvent(new CustomEvent('scroll:exit'));
          }
        }
      }
    }
  
    function parallaxTick() {
      if (STATE.ticking) return;
      STATE.ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight || 1;
        const max = pxVar('--scroll-parallax-max');
        const scl = parseFloat(getVar('--scroll-parallax-scale')) || 1.06;
  
        STATE.parallax.forEach(el => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height/2;
          const t = (center - vh/2) / (vh/2); // -1..1
          const sy = t * (el.__py || 0) * max;
          const sx = t * (el.__px || 0) * max;
          const ss = 1 + Math.abs(t) * (el.__ps || 0) * (scl - 1);
          el.style.setProperty('--sy', `${sy}px`);
          el.style.setProperty('--sx', `${sx}px`);
          el.style.setProperty('--ss', ss.toFixed(4));
        });
  
        STATE.ticking = false;
      });
    }
  
    const getVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const pxVar  = (n) => parseFloat(getVar(n)) || 0;
  
    function setup() {
      const els = selectElements();
  
      // AOS-Kompat
      els.forEach(el => { if (DEFAULTS.useAOSCompat && el.hasAttribute('data-aos')) applyAOSCompat(el); });
  
      // Beobachter pro Element (Offset-sensitiv)
      els.forEach(el => {
        const opt = readOptions(el);
        el.__srx = opt;
        // Default Effekt fallback: wenn keine Effektklasse gesetzt, nimm fade-in
        if (![...el.classList].some(c => c.startsWith('scroll-'))) {
          el.classList.add('scroll-fade');
        }
        // IO mit individuellem offset
        const io = new IntersectionObserver(onIntersect, {
          root: DEFAULTS.root,
          rootMargin: computeRootMargin(opt.offset),
          threshold: DEFAULTS.threshold
        });
        io.observe(el);
        STATE.items.push({ el, io });
  
        // Parallax
        if (opt.parallaxX || opt.parallaxY || opt.parallaxScale) {
          el.classList.add('scroll-parallax');
          el.__px = opt.parallaxX;
          el.__py = opt.parallaxY;
          el.__ps = opt.parallaxScale;
          STATE.parallax.add(el);
        }
      });
  
      // Stagger per Container-Attribut (überschreibt nth-child-Variante)
      document.querySelectorAll('.scroll-stagger[data-scroll-stagger]').forEach(ct => {
        const step = parseInt(ct.getAttribute('data-scroll-stagger'), 10) || 80;
        ct.style.setProperty('--scroll-stagger-step', `${step}ms`);
        Array.from(ct.children).forEach((ch, i) => ch.style.setProperty('--anim-delay', `${i * step}ms`));
      });
  
      window.addEventListener('scroll', parallaxTick, { passive: true });
      window.addEventListener('resize', parallaxTick);
      parallaxTick();
  
      document.addEventListener('animationend', (e) => {
        if (e.target?.classList?.contains('scroll-in')) {
          e.target.dispatchEvent(new CustomEvent('scroll:complete'));
        }
      });
    }
  
    window.ScrollRevealX = {
      init(opts={}) { Object.assign(DEFAULTS, opts); setup(); },
      refresh() {
        STATE.items.forEach(({el, io}) => io.unobserve(el));
        STATE.items = []; STATE.parallax.clear();
        setup();
      },
      inView(el) {
        const r = el.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0;
      }
    };
  
    if (document.readyState !== 'loading') ScrollRevealX.init();
    else document.addEventListener('DOMContentLoaded', () => ScrollRevealX.init());
  })();
  
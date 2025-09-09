// cs-scroll.js — AOS-kompatibler, barrierearmer Reveal + Parallax
// v1.1.0 • 2025-09-08 • Namespace-safe (cs-*), rAF-throttled, observer pooling

(() => {
  const doc = document;
  const rootEl = doc.documentElement;
  const CSSVars = getComputedStyle(rootEl);

  // -------- Tokens (lesen aus --cs-*) mit robusten Fallbacks
  const tokens = {
    rootMargin: (CSSVars.getPropertyValue('--cs-scroll-root-margin').trim() || '0px 0px -12% 0px'),
    threshold: parseFloat(CSSVars.getPropertyValue('--cs-scroll-threshold')) || 0.15,
    parallaxMax: () => parseFloat(getVar('--cs-scroll-parallax-max')) || 0.6, // multiplikator auf viewport
    parallaxScale: () => parseFloat(getVar('--cs-scroll-parallax-scale')) || 1.06
  };

  // -------- Defaults
  const DEFAULTS = {
    root: null,
    rootMargin: tokens.rootMargin,
    threshold: tokens.threshold,
    once: true,
    mirror: false,
    useAOSCompat: true,
    reduceMotion: matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  // -------- Interner State
  const STATE = {
    items: [],
    parallax: new Set(),
    ticking: false,
    ios: new Map(), // Observer-Pool: key = `${threshold}|${rootMargin}`
    inited: false
  };

  // -------- AOS → cs- Klassen Mapping
  const AOS_MAP = {
    'fade': 'cs-scroll-fade',
    'fade-up': 'cs-scroll-fade-up',
    'fade-down': 'cs-scroll-fade-down',
    'fade-left': 'cs-scroll-fade-left',
    'fade-right': 'cs-scroll-fade-right',
    'slide-up': 'cs-scroll-slide-up',
    'slide-down': 'cs-scroll-slide-down',
    'slide-left': 'cs-scroll-slide-left',
    'slide-right': 'cs-scroll-slide-right',
    'zoom-in': 'cs-scroll-zoom-in',
    'zoom-out': 'cs-scroll-zoom-out',
    'flip-left': 'cs-scroll-reveal-3d-right',
    'flip-right': 'cs-scroll-reveal-3d-up',
    'blur-in': 'cs-scroll-blur-in'
  };

  // -------- Utils
  const getVar = (n) => getComputedStyle(rootEl).getPropertyValue(n).trim();
  const pxVar  = (n) => parseFloat(getVar(n)) || 0;

  const selectElements = () => {
    // Neu bevorzugt (.cs-scroll / [data-cs-scroll]), aber abwärtskompatibel
    const a = doc.querySelectorAll('.cs-scroll, [data-cs-scroll]');
    const b = doc.querySelectorAll('[data-scroll]'); // legacy
    const c = doc.querySelectorAll('[data-aos]');    // AOS Kompat
    return Array.from(new Set([...a, ...b, ...c]));
  };

  function applyAOSCompat(el) {
    const effect = el.getAttribute('data-aos');
    if (!effect) return;
    el.classList.add('cs-scroll');
    const mapped = AOS_MAP[effect];
    if (mapped) el.classList.add(mapped);

    // Dauer/Delay/Easing → cs-Variablen
    const dur = el.getAttribute('data-aos-duration');
    const del = el.getAttribute('data-aos-delay');
    const eas = el.getAttribute('data-aos-easing');
    if (dur) el.style.setProperty('--cs-anim-duration', `${parseInt(dur,10)}ms`);
    if (del) el.style.setProperty('--cs-anim-delay', `${parseInt(del,10)}ms`);
    if (eas) el.style.setProperty('--cs-anim-ease', eas);

    const once = el.getAttribute('data-aos-once');
    if (once != null) el.setAttribute('data-cs-scroll-once', once);
  }

  function readOptions(el) {
    const attr = (name, fb) => el.getAttribute(name) ?? fb;
    const flag = (name, fb) => {
      const s = attr(name, null); if (s==null) return fb;
      if (s === '' || s === 'true') return true;
      if (s === 'false') return false;
      return Boolean(s);
    };

    // Trigger aus Klassen (legacy) oder data-Attr
    const classes = el.classList;
    let trigger = 'top';
    if (classes.contains('cs-scroll-trigger-center') || classes.contains('scroll-trigger-center')) trigger = 'center';
    if (classes.contains('cs-scroll-trigger-bottom') || classes.contains('scroll-trigger-bottom')) trigger = 'bottom';

    const trigAttr = attr('data-cs-scroll-trigger', attr('data-scroll-trigger', null));
    if (trigAttr) trigger = trigAttr;

    return {
      once: flag('data-cs-scroll-once', flag('data-scroll-once', DEFAULTS.once)),
      mirror: flag('data-cs-scroll-mirror', flag('data-scroll-mirror', DEFAULTS.mirror)),
      offset: parseInt(attr('data-cs-scroll-offset', attr('data-scroll-offset', '0')), 10),
      trigger,
      parallaxY: parseFloat(attr('data-cs-scroll-parallax-y', attr('data-scroll-parallax-y', '0'))),
      parallaxX: parseFloat(attr('data-cs-scroll-parallax-x', attr('data-scroll-parallax-x', '0'))),
      parallaxScale: parseFloat(attr('data-cs-scroll-parallax-scale', attr('data-scroll-parallax-scale', '0')))
    };
  }

  function computeRootMargin(offsetPx=0, base = DEFAULTS.rootMargin) {
    const parts = base.split(' ');
    const top = (parseInt(parts[0]) || 0) - (offsetPx || 0);
    parts[0] = `${top}px`;
    return parts.join(' ');
  }

  function observerFor({ threshold, rootMargin }) {
    const key = `${threshold}|${rootMargin}`;
    if (STATE.ios.has(key)) return STATE.ios.get(key);

    const io = new IntersectionObserver(onIntersect, {
      root: DEFAULTS.root,
      rootMargin,
      threshold
    });
    STATE.ios.set(key, io);
    return io;
  }

  function onIntersect(entries) {
    for (const entry of entries) {
      const el = entry.target;
      const opt = el.__csx || {};

      if (entry.isIntersecting) {
        el.classList.add('cs-anim', 'cs-scroll-in', 'cs-is-inview');

        if (!el.__animatedOnce) {
          // Events (neu + legacy-compat)
          el.dispatchEvent(new CustomEvent('cs:enter'));
          el.dispatchEvent(new CustomEvent('scroll:enter'));
          if (opt.once) el.__animatedOnce = true;
        }
      } else {
        el.classList.remove('cs-is-inview');
        if (opt.mirror) {
          el.classList.remove('cs-scroll-in');
          el.dispatchEvent(new CustomEvent('cs:exit'));
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
      const max = tokens.parallaxMax(); // faktor
      const scl = tokens.parallaxScale();

      STATE.parallax.forEach(el => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height/2;
        const t = (center - vh/2) / (vh/2); // -1..1 in Viewportmitte

        const sy = t * (el.__py || 0) * (vh * max);
        const sx = t * (el.__px || 0) * (vh * max);
        const ss = 1 + Math.abs(t) * (el.__ps || 0) * (scl - 1);

        el.style.setProperty('--cs-sy', `${sy.toFixed(2)}px`);
        el.style.setProperty('--cs-sx', `${sx.toFixed(2)}px`);
        el.style.setProperty('--cs-ss', ss.toFixed(4));
      });

      STATE.ticking = false;
    });
  }

  function triggerOptions(trigger) {
    if (trigger === 'center') return { threshold: 0.5, rootMargin: DEFAULTS.rootMargin };
    if (trigger === 'bottom') return { threshold: 0.05, rootMargin: DEFAULTS.rootMargin };
    return { threshold: DEFAULTS.threshold, rootMargin: DEFAULTS.rootMargin };
  }

  function setup() {
    // Reduced motion: Animationen nicht erzwingen, IO Schwelle erhöhen
    if (DEFAULTS.reduceMotion) {
      DEFAULTS.threshold = Math.min(0.5, Math.max(DEFAULTS.threshold, 0.25));
    }

    const els = selectElements();

    // AOS-Kompat
    els.forEach(el => {
      if (DEFAULTS.useAOSCompat && el.hasAttribute('data-aos')) applyAOSCompat(el);
    });

    // Beobachtung
    els.forEach(el => {
      const opt = readOptions(el);
      el.__csx = opt;

      // Default Effekt: soften fade-in, wenn keine cs-scroll-* Klasse vorhanden
      if (![...el.classList].some(c => c.startsWith('cs-scroll-'))) {
        el.classList.add('cs-scroll-fade');
      }

      // IntersectionObserver aus Pool (gleiche Schwelle/RootMargin teilen)
      const trig = triggerOptions(opt.trigger);
      const rootMargin = computeRootMargin(opt.offset, trig.rootMargin);
      const io = observerFor({ threshold: trig.threshold, rootMargin });
      io.observe(el);

      STATE.items.push({ el, io, key: `${trig.threshold}|${rootMargin}` });

      // Parallax opt-in
      if (opt.parallaxX || opt.parallaxY || opt.parallaxScale) {
        el.classList.add('cs-scroll-parallax');
        el.__px = opt.parallaxX;
        el.__py = opt.parallaxY;
        el.__ps = opt.parallaxScale;
        STATE.parallax.add(el);
      }
    });

    // Stagger per Container
    doc.querySelectorAll('.cs-scroll-stagger[data-cs-scroll-stagger], .scroll-stagger[data-scroll-stagger]').forEach(ct => {
      const stepAttr = ct.getAttribute('data-cs-scroll-stagger') ?? ct.getAttribute('data-scroll-stagger');
      const step = parseInt(stepAttr, 10) || 80;
      ct.style.setProperty('--cs-scroll-stagger-step', `${step}ms`);
      Array.from(ct.children).forEach((ch, i) => ch.style.setProperty('--cs-anim-delay', `${i * step}ms`));
    });

    window.addEventListener('scroll', parallaxTick, { passive: true });
    window.addEventListener('resize', parallaxTick, { passive: true });
    parallaxTick();

    // Completion Events
    doc.addEventListener('animationend', (e) => {
      const t = e.target;
      if (t?.classList?.contains('cs-scroll-in')) {
        t.dispatchEvent(new CustomEvent('cs:complete'));
        t.dispatchEvent(new CustomEvent('scroll:complete')); // legacy
      }
    });

    STATE.inited = true;
  }

  function teardown() {
    // Beobachter trennen & Sets räumen
    STATE.items.forEach(({ el, io }) => { try { io.unobserve(el); } catch(_){} });
    STATE.items = [];
    STATE.parallax.clear();

    // Observer schließen
    STATE.ios.forEach(io => { try { io.disconnect(); } catch(_){} });
    STATE.ios.clear();

    window.removeEventListener('scroll', parallaxTick);
    window.removeEventListener('resize', parallaxTick);

    STATE.inited = false;
  }

  // -------- Öffentliche API (namespaced)
  const API = {
    /**
     * Initialisiert den Reveal.
     * @param {Object} opts - { root, rootMargin, threshold, once, mirror, useAOSCompat }
     */
    init(opts = {}) {
      if (STATE.inited) this.refresh(); // idempotent
      Object.assign(DEFAULTS, opts);

      // Smooth-Scroll bei reduziertem Motion ausschalten (sanft)
      if (DEFAULTS.reduceMotion) {
        doc.documentElement.classList.remove('cs-scroll-smooth');
      }

      // Fallback ohne IntersectionObserver
      if (!('IntersectionObserver' in window)) {
        // Sofort sichtbar markieren
        selectElements().forEach(el => {
          el.classList.add('cs-anim', 'cs-scroll-in', 'cs-is-inview');
          el.dispatchEvent(new CustomEvent('cs:enter'));
          el.dispatchEvent(new CustomEvent('scroll:enter'));
          el.dispatchEvent(new CustomEvent('cs:complete'));
          el.dispatchEvent(new CustomEvent('scroll:complete'));
        });
        STATE.inited = true;
        return;
      }

      setup();
    },

    /**
     * Re-scan DOM, Observer neu verdrahten (z.B. nach AJAX/Router-Wechsel)
     */
    refresh() {
      teardown();
      setup();
    },

    /**
     * Prüft Sichtbarkeit im Viewport.
     * @param {Element} el
     * @returns {boolean}
     */
    inView(el) {
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    },

    /**
     * Alles abschalten (Observer, Listener) — für CSP/SPA Routenwechsel.
     */
    destroy() {
      teardown();
    }
  };

  // Global, aber eindeutig: window.CSScroll
  window.CSScroll = API;

  // Auto-Init
  if (doc.readyState !== 'loading') API.init();
  else doc.addEventListener('DOMContentLoaded', () => API.init());


  // -------- Erweiterung: Scroll Pulse + Shadow
  function scrollEffectsExtras() {
    const headerEls = doc.querySelectorAll('.cs-scroll-shadow-top');
    const pulseEls = doc.querySelectorAll('.cs-scroll-pulse');

    const hasScrolled = () => window.scrollY > 10;

    // Top-Shadow anzeigen, wenn Content über dem Element existiert
    const updateShadows = () => {
      headerEls.forEach(el => {
        if (el.offsetTop > 0 || hasScrolled()) {
          el.classList.add('cs-has-shadow');
        } else {
          el.classList.remove('cs-has-shadow');
        }
      });
    };

    // Pulse-Animation bei Scroll
    const triggerPulse = () => {
      pulseEls.forEach(el => {
        el.classList.remove('cs-pulse-active'); // Reset
        // retrigger animation
        void el.offsetWidth;
        el.classList.add('cs-pulse-active');
      });
    };

    // Events binden
    window.addEventListener('scroll', () => {
      updateShadows();
      triggerPulse();
    }, { passive: true });

    updateShadows(); // Initialzustand setzen
  }

  // Auto-init Zusatz-Effekte nach Haupt-Init
  setTimeout(scrollEffectsExtras, 50);




})();

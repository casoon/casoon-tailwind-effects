// @casoon/tailwindcss-navigation optional helpers (no deps)

function focusables(root) {
  return Array.from(root.querySelectorAll(
    'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  ));
}

function trapFocus(root) {
  const nodes = () => focusables(root).filter(el => el.offsetParent !== null || el === document.activeElement);
  function onKeydown(e) {
    if (e.key !== 'Tab') return;
    const list = nodes();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  document.addEventListener('keydown', onKeydown);
  return () => document.removeEventListener('keydown', onKeydown);
}

export function initSidebarDrawer({ trigger, drawer, overlay, closeButton } = {}) {
  if (!drawer) throw new Error('initSidebarDrawer: drawer element required');
  const btnOpen = trigger || document.querySelector('[data-sidebar-open]');
  const btnClose = closeButton || drawer.querySelector('[data-sidebar-close]');
  const ovl = overlay || document.querySelector('.sidebar-overlay');

  let restoreFocus = null;
  let releaseTrap = null;

  function open() {
    if (drawer.hasAttribute('data-open')) return;
    restoreFocus = document.activeElement;
    drawer.setAttribute('data-open', 'true');
    drawer.setAttribute('aria-expanded', 'true');
    if (ovl) ovl.setAttribute('data-open', 'true');

    // focus management
    const list = focusables(drawer);
    (list[0] || drawer).focus({ preventScroll: true });
    releaseTrap = trapFocus(drawer);

    // esc to close
    document.addEventListener('keydown', onEsc, { capture: true });
  }

  function close() {
    if (!drawer.hasAttribute('data-open')) return;
    drawer.removeAttribute('data-open');
    drawer.setAttribute('aria-expanded', 'false');
    if (ovl) ovl.removeAttribute('data-open');
    if (releaseTrap) { releaseTrap(); releaseTrap = null; }
    document.removeEventListener('keydown', onEsc, { capture: true });
    // restore focus
    if (restoreFocus && typeof restoreFocus.focus === 'function') {
      restoreFocus.focus({ preventScroll: true });
    }
    restoreFocus = null;
  }

  function onEsc(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } }

  // wire events
  btnOpen && btnOpen.addEventListener('click', open);
  btnClose && btnClose.addEventListener('click', close);
  ovl && ovl.addEventListener('click', close);

  // expose controls
  return { open, close, destroy() {
    btnOpen && btnOpen.removeEventListener('click', open);
    btnClose && btnClose.removeEventListener('click', close);
    ovl && ovl.removeEventListener('click', close);
    if (releaseTrap) releaseTrap();
    document.removeEventListener('keydown', onEsc, { capture: true });
  }};
}

export function initActiveLinkSync({ selector = '.sidebar-link[href^="#"]', rootMargin = '-30% 0px -60% 0px' } = {}) {
  const links = Array.from(document.querySelectorAll(selector));
  const targets = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if (!links.length || !targets.length) return () => {};
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b)=> b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach(l => l.removeAttribute('aria-current'));
    const active = links.find(l => l.getAttribute('href') === '#' + visible.target.id);
    if (active) active.setAttribute('aria-current','page');
  }, { rootMargin, threshold: [0, .25, .5, .75, 1] });
  targets.forEach(t => io.observe(t));
  return () => io.disconnect();
}


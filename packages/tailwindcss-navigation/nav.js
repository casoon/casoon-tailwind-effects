// @casoon/tailwindcss-navigation helpers (no deps, ESM)

/** ---------------------------------------------------------
 * Focus utils
 * --------------------------------------------------------- */

/** Query focusable elements inside a root (visible-only filter applied later). */
function focusables(root) {
  const selector = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]:not([contenteditable="false"])'
  ].join(',');
  return Array.from(root.querySelectorAll(selector));
}

/** Element is visible for focus cycling (no display:none, no visibility:hidden, within layout). */
function isVisible(el) {
  if (!(el instanceof Element)) return false;
  const style = el.ownerDocument.defaultView.getComputedStyle(el);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  if (el.hasAttribute('inert')) return false;
  // Skip fully off-layout items
  if (el.offsetParent === null && el !== document.activeElement) return false;
  return true;
}

/** Trap focus within a container; returns a cleanup function. */
function trapFocus(root) {
  const nodes = () => focusables(root).filter(isVisible);
  function onKeydown(e) {
    if (e.key !== 'Tab') return;
    const list = nodes();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    const active = root.contains(document.activeElement) ? document.activeElement : null;

    if (e.shiftKey) {
      if (active === first || !active) { e.preventDefault(); last.focus(); }
    } else {
      if (active === last || !active) { e.preventDefault(); first.focus(); }
    }
  }
  document.addEventListener('keydown', onKeydown, true);
  return () => document.removeEventListener('keydown', onKeydown, true);
}

/** Body scroll lock (idempotent). */
function lockBodyScroll() {
  const doc = document.documentElement;
  const body = document.body;
  const prev = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight
  };
  const scrollbarW = window.innerWidth - doc.clientWidth;
  body.style.overflow = 'hidden';
  if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
  return () => {
    body.style.overflow = prev.overflow;
    body.style.paddingRight = prev.paddingRight;
  };
}

/** Set/unset inert on siblings of a node (accessibility for modal-like drawers). */
function inertSiblings(node, on) {
  const parent = node.parentElement;
  if (!parent) return () => {};
  const changed = [];
  Array.from(parent.children).forEach((sib) => {
    if (sib === node) return;
    if (on && !sib.hasAttribute('inert')) {
      sib.setAttribute('inert', '');
      changed.push(sib);
    } else if (!on && sib.hasAttribute('inert')) {
      sib.removeAttribute('inert');
    }
  });
  return () => changed.forEach((el) => el.removeAttribute('inert'));
}

/** Ensure an overlay element exists (creates one if missing). */
function ensureOverlay(overlay) {
  if (overlay && overlay.nodeType === 1) return overlay;
  const ovl = document.createElement('div');
  ovl.className = 'cs-drawer-overlay';
  // Hidden by default; CSS should show it when [data-open] is present on the drawer or overlay
  ovl.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ovl);
  return ovl;
}

/** Small helper to find first match for multiple selectors. */
function qsaFirst(selectors) {
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el) return el;
  }
  return null;
}

/** ---------------------------------------------------------
 * Sidebar Drawer (left/right sheet) controller
 * --------------------------------------------------------- */
/**
 * Options:
 *  - trigger: HTMLElement (open button). Fallback: [data-cs-drawer-open], [data-sidebar-open]
 *  - drawer:  required HTMLElement (the panel)
 *  - overlay: optional HTMLElement or auto-created .cs-drawer-overlay
 *  - closeButton: optional close button. Fallback: [data-cs-drawer-close], [data-sidebar-close]
 *  - lockScroll: boolean (default true) — lock body scroll while open
 *  - inertSiblings: boolean (default true) — set inert on siblings while open
 *  - attribute: string (default 'data-open') — state attribute added when open
 *  - expandedAria: boolean (default true) — sync aria-expanded on drawer
 *  - closeOnEsc: boolean (default true)
 *  - closeOnOverlay: boolean (default true)
 */
export function initSidebarDrawer({
  trigger,
  drawer,
  overlay,
  closeButton,
  lockScroll: shouldLockScroll = true,
  inertSiblings: shouldInertSiblings = true,
  attribute = 'data-open',
  expandedAria = true,
  closeOnEsc = true,
  closeOnOverlay = true
} = {}) {
  if (!drawer) throw new Error('initSidebarDrawer: drawer element required');

  const btnOpen = trigger || qsaFirst(['[data-cs-drawer-open]', '[data-sidebar-open]']);
  const btnClose = closeButton || drawer.querySelector('[data-cs-drawer-close], [data-sidebar-close]');
  const ovl = ensureOverlay(overlay || qsaFirst(['.cs-drawer-overlay', '.sidebar-overlay']));

  // A11y wiring
  drawer.setAttribute('role', drawer.getAttribute('role') || 'dialog');
  drawer.setAttribute('aria-modal', 'true');

  let restoreFocusEl = null;
  let releaseTrap = null;
  let unlockScroll = null;
  let releaseInert = null;
  let isOpen = false;

  const hasAttr = () => drawer.hasAttribute(attribute);

  function open() {
    if (isOpen || hasAttr()) return;
    isOpen = true;
    restoreFocusEl = document.activeElement;

    drawer.setAttribute(attribute, 'true');
    if (expandedAria) drawer.setAttribute('aria-expanded', 'true');
    ovl && ovl.setAttribute(attribute, 'true');

    // Focus management
    const list = focusables(drawer).filter(isVisible);
    (list[0] || drawer).focus({ preventScroll: true });
    releaseTrap = trapFocus(drawer);

    // Side effects
    if (shouldLockScroll) unlockScroll = lockBodyScroll();
    if (shouldInertSiblings) releaseInert = inertSiblings(drawer, true);

    if (closeOnEsc) document.addEventListener('keydown', onEsc, true);
    if (closeOnOverlay && ovl) ovl.addEventListener('click', close, { once: false });
  }

  function close() {
    if (!isOpen && !hasAttr()) return;
    isOpen = false;

    drawer.removeAttribute(attribute);
    if (expandedAria) drawer.setAttribute('aria-expanded', 'false');
    ovl && ovl.removeAttribute(attribute);

    if (releaseTrap) { releaseTrap(); releaseTrap = null; }
    if (unlockScroll) { unlockScroll(); unlockScroll = null; }
    if (releaseInert) { releaseInert(); releaseInert = null; }

    document.removeEventListener('keydown', onEsc, true);
    if (restoreFocusEl && typeof restoreFocusEl.focus === 'function') {
      restoreFocusEl.focus({ preventScroll: true });
    }
    restoreFocusEl = null;
  }

  function toggle() { (isOpen || hasAttr()) ? close() : open(); }
  function onEsc(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } }

  // wire events
  btnOpen && btnOpen.addEventListener('click', open);
  btnClose && btnClose.addEventListener('click', close);

  // expose controls
  return {
    open, close, toggle,
    destroy() {
      btnOpen && btnOpen.removeEventListener('click', open);
      btnClose && btnClose.removeEventListener('click', close);
      ovl && ovl.removeEventListener('click', close);
      document.removeEventListener('keydown', onEsc, true);
      if (releaseTrap) releaseTrap();
      if (unlockScroll) unlockScroll();
      if (releaseInert) releaseInert();
    }
  };
}

/** ---------------------------------------------------------
 * Active link sync for in-page nav (TOC/Sidebar)
 * --------------------------------------------------------- */
/**
 * Options:
 *  - selector: links to observe (default '.cs-sidebar-link[href^="#"]')
 *  - rootMargin: IntersectionObserver rootMargin (default '-30% 0px -60% 0px')
 *  - threshold: thresholds array (default [0, 0.25, 0.5, 0.75, 1])
 *  - currentAttr: attribute to mark active (default aria-current="page")
 */
export function initActiveLinkSync({
  selector = '.cs-sidebar-link[href^="#"]',
  rootMargin = '-30% 0px -60% 0px',
  threshold = [0, 0.25, 0.5, 0.75, 1],
  currentAttr = 'aria-current'
} = {}) {
  const links = Array.from(document.querySelectorAll(selector));
  const idFromHref = (href) => {
    try {
      const u = new URL(href, window.location.href);
      return u.hash && u.hash !== '#' ? u.hash.slice(1) : null;
    } catch { return (href || '').replace(/^#/, '') || null; }
  };

  const targetMap = new Map();
  links.forEach((l) => {
    const id = idFromHref(l.getAttribute('href'));
    if (!id) return;
    const t = document.getElementById(id);
    if (t) targetMap.set(t, l);
  });

  const targets = Array.from(targetMap.keys());
  if (!links.length || !targets.length) return () => {};

  const clear = () => links.forEach((l) => l.removeAttribute(currentAttr));
  const setActive = (el) => {
    clear();
    const link = targetMap.get(el);
    if (link) link.setAttribute(currentAttr, 'page');
  };

  // Observer
  const io = new IntersectionObserver((entries) => {
    // Pick most visible intersecting section
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target);
  }, { rootMargin, threshold });

  targets.forEach((t) => io.observe(t));

  // Also react to hashchange (e.g., user clicks a link or external jump)
  const onHash = () => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;
    const el = document.getElementById(id);
    if (el && targetMap.has(el)) setActive(el);
  };
  window.addEventListener('hashchange', onHash, false);

  // Initial hash sync (if page opened with a hash)
  onHash();

  return () => {
    io.disconnect();
    window.removeEventListener('hashchange', onHash, false);
  };
}

/** ---------------------------------------------------------
 * Back-compat named export aliases (optional)
 * --------------------------------------------------------- */
export const initDrawer = initSidebarDrawer;

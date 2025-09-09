// plugin.js — Minimalprobe für Tailwind v4
import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addBase, addUtilities, addComponents }) {
  // 1) Sichtbar im Terminal (Astro/Vite dev + build)
  //    -> Wenn das NIE erscheint, wird das Plugin nicht geladen.
  console.log('[casoon-glass] Tailwind plugin loaded');

  // 2) Immer emittiert (ohne Scanner): sollte im finalen CSS auftauchen
  addBase({
    ':root': { '--__casoon_probe': '1' }
  });

  // 3) Nur bei „Benutzung“ emittiert: class="__casoon-probe"
  addUtilities({
    '.__casoon-probe': { outline: '3px solid magenta' }
  });

  // 4) Beispiel-Komponente (ebenfalls on-demand – wenn verwendet)
  addComponents({
    '.cs-glass-card': {
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.20)',
      borderRadius: '20px',
      padding: '2rem',
      backdropFilter: 'blur(16px)'
    }
  });
});

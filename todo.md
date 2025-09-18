Tailwind v4 Migration: Manuelle @utility-Umstellung je Package

Ziel: Alle vorhandenen `.cs-*` Klassen in Tailwind v4 kompatible, CSS‑first Utilities überführen, sodass nur verwendete Utilities im Output landen (Tree‑Shaking durch Tailwind v4). Keine automatische Suchen/Ersetzen‑Konvertierung – jede Regel wird bewusst und korrekt in `@utility` inkl. Verschachtelungen/Varianten übertragen.

—

Überblick (Ist‑Stand, analysiert)
- Packages mit `.cs-*` Klassen:
  - `tailwindcss-animations`: 5 Dateien mit Klassen
    - styles/components/button.css
    - styles/components/navigation.css
    - styles/fallbacks.css
    - styles/utilities/core.css
    - styles/utilities/stagger.css
  - `tailwindcss-gradients`: viele Dateien mit Klassen
    - optional/: 3d-effects.css, dynamic-colors.css, glow-effects.css, gradient-presets-extended.css, performance.css
    - styles/base/: fallbacks.css, tokens.css
    - styles/components/: borders.css, surfaces.css
    - styles/effects/: advanced-particles.css, animations.css, canvas-effects.css, interactive-effects.css, material-compact.css, material-textures.css, pro-effects.css
    - styles/utilities/: backgrounds.css, gradient-presets-core.css, gradient-presets.css, helpers.css, shapes.css, text.css
- Packages ohne `.cs-*` Klassen (Audit weiter erforderlich, aber voraussichtlich geringere Umstellung):
  - tailwindcss-utilities, tailwindcss-glass, tailwindcss-loading, tailwindcss-micro-interactions, tailwindcss-navigation, tailwindcss-orbs, tailwindcss-scroll, tailwindcss-forms, tailwindcss-typography, tailwindcss-effects (Meta)

—

Leitlinien für die Umstellung (Tailwind v4 CSS‑first)
- Utilities: Jede `.cs-…` Klasse wird zu einem `@utility` Block: `@utility cs-… { … }`.
  - Verschachtelungen via CSS Nesting mit `& …` abbilden (Descendants, States, Modifier).
  - Kombinierte Selektoren wie `.cs-foo.cs-bar` auftrennen: Basis in `@utility cs-foo { … }` und spezifische Regeln in `@utility cs-bar { &.cs-foo { … } }`, damit Regeln nur enthalten sind, wenn `cs-bar` tatsächlich benutzt wird.
- Varianten: Zustände responsiv/State-spezifisch mit `@variant` statt separater Klassenketten.
  - Beispiel: `@variant hover { &:hover { … } }`, `@variant focus { &:focus-visible { … } }`.
  - Eigene Variants definieren: `@custom-variant motion-safe (prefers-reduced-motion: no-preference);` und `@custom-variant motion-reduce (prefers-reduced-motion: reduce);`.
- Tokens: Paketweite Design‑Tokens in `@theme` konsolidieren (statt verstreuter `tokens.css`).
  - Beispiel: `@theme { --cs-anim-duration-md: 250ms; --cs-gradient-sunset-start: … }`.
- Keyframes: Weiterhin als globale `@keyframes` definieren; Utilities referenzieren sie mit `animation-name`.
- Imports/Ordnung: In jedem `src/index.css` zuerst `@import "tailwindcss";`, dann `@import` der Paketdateien (theme → variants → utilities → components → fallbacks).
- Keine Auto-Konvertierung verwenden (scripts/convert-to-utilities.mjs überspringen) – jede Datei manuell prüfen/umschreiben.

—

Beispiel-Konvertierungen
- Einfacher Utility‑Name
  alt:
  `.cs-fade-in { animation-name: anim-fade-in }`
  neu:
  `@utility cs-fade-in { animation-name: anim-fade-in }`

- State/Variant innerhalb einer Utility
  alt:
  `.cs-nav-underline-in:hover { transform: scaleX(1) }`
  neu:
  `@utility cs-nav-underline-in { @variant hover { &:hover { transform: scaleX(1) } } }`

- Descendant/Globale Wirkung minimal halten
  alt:
  `.cs-performance-low * { will-change: auto }`
  neu:
  `@utility cs-performance-low { & * { will-change: auto } }`

- Kombinierte Selektoren auftrennen (Tree‑Shaking-freundlich)
  alt:
  `.cs-lazy-load.cs-loaded { opacity: 1 }`
  neu (split):
  `@utility cs-loaded { &.cs-lazy-load { opacity: 1 } }`

- Motion Variants
  Setup (einmal pro Package):
  `@custom-variant motion-safe (prefers-reduced-motion: no-preference);`
  `@custom-variant motion-reduce (prefers-reduced-motion: reduce);`
  Nutzung:
  `@utility cs-marquee { @variant motion-safe { animation: anim-marquee 30s linear infinite } }`

—

Package-Aufgaben

1) tailwindcss-animations
- Add/Verify: `src/styles/theme.css` mit `@theme` Tokens (Durations, Easing, Delays).
- Add/Verify: `src/styles/variants.css` mit `@custom-variant` (motion-safe, motion-reduce). 
- `src/styles/utilities/core.css`: Alle `.cs-anim*`, `.cs-ease-*`, `.cs-delay-*`, `.cs-*-name` zu `@utility` migrieren.
- `src/styles/utilities/stagger.css`: Orchestrierungs‑Utilities (`.cs-stagger-*`) zu `@utility` inkl. CSS nesting.
- `src/styles/components/button.css`: `.cs-btn-press`, `.cs-btn-ripple` zu `@utility`; Keyframes bleiben global.
- `src/styles/components/navigation.css`: `.cs-nav-underline-*`, `.cs-pill-*` zu `@utility` (hover/focus als `@variant`).
- `src/styles/fallbacks.css`: Motion‑Reduced/Print/Compat-Regeln erhalten; wenn klassengebunden → `@utility` + `@variant motion-reduce`.
- Index/Imports: `src/index.css` Reihenfolge prüfen: tailwindcss → theme → variants → utilities → components → fallbacks.
- Validieren/Minifizieren: `npm run validate`, `npm run minify`.

2) tailwindcss-gradients
- Add/Verify: `src/styles/base/tokens.css` → konsolidieren/umziehen nach `src/styles/theme.css` (via `@theme`).
- Utilities migrieren:
  - `styles/utilities/backgrounds.css`: `.cs-gradient-*` → `@utility cs-gradient-*`.
  - `styles/utilities/text.css`: `.cs-text-gradient*` → `@utility` (mit `background-clip: text`).
  - `styles/utilities/gradient-presets*.css`: Presets `.cs-bg-*` → `@utility cs-bg-*`.
  - `styles/utilities/helpers.css`, `styles/utilities/shapes.css`: Alle `.cs-*` → `@utility` (Nesting für Pseudo/Descendant).
- Components/Effekte:
  - `styles/components/borders.css`, `styles/components/surfaces.css`: alle `.cs-*` → `@utility` (Zustände via `@variant`).
  - `styles/effects/*.css`, `optional/*.css`: animierte, responsive und performance Utilities → `@utility` (ggf. `& *` nutzen; kombinierte Selektoren aufsplitten).
- Fallbacks: `styles/base/fallbacks.css` reduziert/print-spezifisch; falls klassengebunden → `@utility` + passende `@variant`/`@media`.
- Index/Imports aktualisieren und `npm run validate`, `npm run minify`.

3) tailwindcss-glass
- Tokens in `@theme` (Farben, Blurs, opacities).
- Utilities: `.cs-glass*` (core, color‑variants, effects) → `@utility` inkl. `@supports (backdrop-filter)` fallback-Strategie in `fallbacks.css`.
- Components: `card.css`, `navigation.css`, `button.css`, `overlays.css` → `@utility` + `@variant`.
- Reihenfolge/Validate/Minify wie oben.

4) tailwindcss-loading
- Tokens in `@theme` (sizes, durations, colors).
- States/Components: `.cs-loading`, `.cs-spinner*`, `.cs-loading-overlay` → `@utility`; Keyframes global.
- Helpers: `.cs-visually-hidden`, `.cs-will-change` → `@utility`.
- Reihenfolge/Validate/Minify.

5) tailwindcss-utilities (Audit)
- Prüfen, ob noch `.cs-*` Klassen außerhalb `@utility` existieren; falls ja → migrieren.
- Tokens in `@theme` verankern, `variants.css` konsolidieren.

6) tailwindcss-micro-interactions, tailwindcss-navigation, tailwindcss-orbs, tailwindcss-scroll, tailwindcss-forms, tailwindcss-typography
- Audit je Package: `.cs-*` Vorkommen suchen und zu `@utility` migrieren.
- Varianten (`@custom-variant`) bei Bedarf hinzufügen (hover/focus/active, open/closed, supports/forced-colors, motion-safe/-reduce).
- Tokens nach `@theme`; Index/Imports ordnen; Validate/Minify.

7) tailwindcss-effects (Meta-Package)
- `src/index.css` auf Import‑basierte Struktur umstellen (nur `@import` der Einzel‑Packages nach `@import "tailwindcss";`).
- Sicherstellen, dass Meta‑Package selbst keine großen, un‑shakable CSS‑Blöcke enthält.

—

Qualitäts-/Abnahme-Checkliste je Datei
- Enthält die Datei noch `.cs-*` Selektoren? → in `@utility` übertragen.
- Enthält sie kombinierte Selektoren `.cs-a.cs-b`, Pseudos oder Descendants? → korrekt mit `&`/Split lösen.
- Werden Zustände als eigene Klassen (z. B. `-hover`/`-focus`) missbraucht? → in `@variant` wandeln.
- Stehen Tokenwerte hartkodiert? → in `@theme` auslagern.
- Keyframes global, Utilities referenzieren nur Namen.
- Importreihenfolge korrekt: tailwindcss → theme → variants → utilities → components → fallbacks.

—

Prüfung & Build
- Lokal prüfen: `npm run validate`
- Minifizieren: `npm run minify` bzw. `npm run build:all`
- Visuell testen (optional): `test-project-v4` verwenden (`npm run dev` im Unterprojekt)

—

Hinweise/Risiken
- Die automatische Regex‑Konvertierung (scripts/convert-to-utilities.mjs) NICHT verwenden – sie behandelt verschachtelte/kombinierte Selektoren und Variants nicht korrekt.
- Beim Aufsplitten kombinierter Selektoren darauf achten, dass Tree‑Shaking gewahrt bleibt (Regeln dem spezifischeren Utility zuordnen).
- Motion/Performance‑Utilities stets mit `@custom-variant motion-safe/motion-reduce` absichern.


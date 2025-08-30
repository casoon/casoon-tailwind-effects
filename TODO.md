# TODO: Dark‑Mode-Konzept (Tailwind v4 Standard) & Verbesserungen

## Zielbild
- Einheitlicher Light/Dark‑Mechanismus für alle Packages in `packages/*`.
- Kompatibel zum Tailwind‑Standard: Umschaltung via `.dark` Klasse (empfohlen) und Unterstützung von `prefers-color-scheme` (Media‑Fallback).
- Alle Farben nur noch über Tokens (`--cs-*` bzw. paket‑spezifische Tokens) – keine harten Hexwerte in Utilities/Komponenten.
- Saubere Priorität: manuelle Klassen‑Umschaltung gewinnt vor OS‑Einstellung.
- Keine Layout‑Thrash, Motion‑safe, barrierearm (Kontrast/Focus, `color-scheme`).

## Strategie & Architektur
- Modus‑Strategie:
  - Class‑Mode: Root erhält `.dark` (Tailwind‑Standard, `dark:` Varianten). Optional auch `[data-theme="dark"]`.
  - Media‑Fallback: `@media (prefers-color-scheme: dark)` setzt Dark‑Tokens, wenn keine Klasse gesetzt ist.
- Priorität:
  1) `.dark` / `[data-theme="dark"]` (höchste Prio, explizit)  
  2) `@media (prefers-color-scheme: dark)` (implizit, OS)  
  3) `:root` (Light‑Defaults)
- Token‑Modell:
  - Gemeinsame, semantische Grund‑Tokens in jedem Paket: z. B. `--cs-bg-page`, `--cs-bg-surface`, `--cs-text-primary`, `--cs-border-color`, …
  - Paket‑spezifische Tokens bleiben bestehen (z. B. `--glass-*`, `--nav-*`, `--orb-*`) und werden über Light/Dark konsistent übersteuert.
  - Keine Direktfarben in Klassen – alles via `var(--… )`.
- CSS‑Schichten:
  - Tokens in `@layer base` (bzw. `@theme` wo bereits genutzt) definieren und überschreiben; Utilities/Komponenten in `@layer utilities`/`components` konsumieren nur `var()`.
- UA‑Hinweis:
  - `color-scheme: light dark;` auf `:root`, sowie `color-scheme: dark;` im Dark‑Scope, damit Form Controls/Scrollbars korrekt rendern.

## Referenz‑Skelett für Tokens (pro Paket in `tokens.css`)

```css
/* 1) Defaults (Light) */
:root {
  color-scheme: light dark; /* UA Hints */
  /* Beispiel: Grundtokens */
  --cs-text-primary:   oklch(18% 0.03 260);
  --cs-text-secondary: oklch(45% 0.03 260);
  --cs-text-muted:     oklch(60% 0.02 260);
  --cs-bg-page:        oklch(98% 0.01 260);
  --cs-bg-surface:     oklch(100% 0 0);
  --cs-bg-elevated:    oklch(97% 0.01 260);
  --cs-border-color:   oklch(84% 0.02 260);
  /* … weitere Paket‑/Komponenten‑Tokens … */
}

/* 2) Media‑Fallback (OS Dark) – nur aktiv wenn keine .dark Klasse gesetzt ist */
@media (prefers-color-scheme: dark) {
  :root {
    --cs-text-primary:   oklch(92% 0.03 260);
    --cs-text-secondary: oklch(75% 0.02 260);
    --cs-text-muted:     oklch(65% 0.02 260);
    --cs-bg-page:        oklch(18% 0.02 260);
    --cs-bg-surface:     oklch(22% 0.02 260);
    --cs-bg-elevated:    oklch(26% 0.02 260);
    --cs-border-color:   oklch(36% 0.03 260);
    /* paket‑spezifische Dark‑Mappings (z. B. --glass-*, --nav-*) */
  }
}

/* 3) Class‑Mode (Tailwind Standard) – höchste Priorität */
:where(.dark, [data-theme="dark"]) {
  color-scheme: dark; /* UA Hints */
  --cs-text-primary:   oklch(92% 0.03 260);
  --cs-text-secondary: oklch(75% 0.02 260);
  --cs-text-muted:     oklch(65% 0.02 260);
  --cs-bg-page:        oklch(18% 0.02 260);
  --cs-bg-surface:     oklch(22% 0.02 260);
  --cs-bg-elevated:    oklch(26% 0.02 260);
  --cs-border-color:   oklch(36% 0.03 260);
  /* paket‑spezifische Dark‑Mappings */
}
```

Hinweise:
- `:where()` reduziert Spezifität, damit Nutzer‑Overrides einfacher bleiben.
- Reihenfolge im Stylesheet: `:root` → `@media (dark)` → `:where(.dark)` (so gewinnt Class‑Mode).
- Wo bereits `[data-theme="dark"]` existiert: `.dark` zusätzlich einführen; bestehendes beibehalten (keine Breaking Changes).

## Auswirkungen je Paket (Kurzfassung)
- `tailwindcss-utilities`:
  - Bereits Tokens vorhanden; ergänzen um `.dark` + `@media` Fallback und `color-scheme`.
  - Sicherstellen, dass alle `.cs-*` Klassen nur `var(--cs-*)` verwenden (Audit auf harte Farben).
- `tailwindcss-animations`:
  - Farben in Keyframe‑Effekten (Glows, shadows) auf Tokens umlenken, z. B. via `--anim-accent`/`--anim-shadow` mit Light/Dark‑Werten.
  - Respect `prefers-reduced-motion` weiterhin; keine Farb‑Transitions beim Theme‑Wechsel erzwingen.
- `tailwindcss-glass`:
  - `--glass-*` Bases dual definieren (Light/Dark) inkl. Schatten/Border‑Alpha.
  - Nav‑Tokens (`--nav-*`) für beide Modi konsistent setzen; Transparenzen in Dark ggf. erhöhen.
- `tailwindcss-gradients`:
  - Gradient‑Stops über semantische Tokens (`--grad-from`, `--grad-to`) abbilden; Dark leicht abdunkeln/kontrastieren.
- `tailwindcss-navigation`:
  - Active/Hover/Focus via Tokens; Kontrast in Dark hoch halten, Focus‑Ring sichtbar.
- `tailwindcss-orbs`:
  - Lichteffekte/blur‑Shadows über Tokens dimmen/aufhellen je Modus.
- `tailwindcss-scroll`:
  - Reveal‑Overlays/Masken im Dark‑Modus anpassen; Intersection‑Logik unverändert.
- `tailwindcss-effects` (Meta):
  - Nur Re‑Exports; sicherstellen, dass Reihenfolge der Imports Tokens → Komponenten/Utilities ist.

## Migrationsrichtlinien (für Nutzer)
- Empfohlen: `<html class="dark">` setzen, um die Tailwind `dark:` Variante und unsere Tokens synchron zu schalten. Alternativ: `<html data-theme="dark">`.
- Ohne Klassentoggle greift OS‑Dark via `prefers-color-scheme` automatisch.
- Branding: Eigene Markenfarben per Überschreiben der Tokens in `:root` und `.dark`/`[data-theme=dark]`.

## QA‑Checkliste
- Token‑Audit: Keine harten Farben in `index.css` Dateien (nur `var(--…)`).
- Visuelle Prüfung: Light/Dark pro Paket (Page/Surface, Card, Input, Nav, Gradients, Glass).
- Accessibility: Kontrast ≥ WCAG AA, Focus‑Ring klar sichtbar in beiden Modi.
- Motion: Keine abrupten Farb‑Transitions beim Umschalten; `prefers-reduced-motion` respektiert.
- Browser: Aktuelle Chromium/Firefox/Safari, Scrollbars/Form Controls prüfen (via `color-scheme`).

## Automatisierung (Vorschläge)
- `scripts/verify-tokens.mjs`: Fail wenn in `packages/*/index.css` Hex/RGB(A)/HSL vorkommt (Whitelist: keyframes‑intern oder Tokens‑Definitionen).
- `scripts/verify-dark.mjs`: Prüft pro Paket das Vorhandensein der drei Blöcke (`:root`, `@media (prefers-color-scheme: dark)`, `:where(.dark, [data-theme=dark])`).
- `npm run version:check` vor PRs; Readmes: Dark‑Hinweis und Snippet ergänzen.

## Code‑Beispiele zum Einbau

Utilities (Beispiel):
```css
/* tokens.css – siehe Skelett oben */
@import "./tokens.css";

@layer utilities {
  .cs-page { background: var(--cs-bg-page); color: var(--cs-text-primary); }
  .cs-surface { background: var(--cs-bg-surface); color: var(--cs-text-primary); }
  .cs-card { background: var(--cs-bg-surface); border: 1px solid var(--cs-border-color); }
  .cs-text-muted { color: var(--cs-text-muted); }
}
```

Glass (Dark‑Mapping, Auszug):
```css
:root {
  --glass-bg: rgba(255,255,255,.08);
  --nav-bg: var(--glass-bg);
  /* … */
}
@media (prefers-color-scheme: dark) { :root {
  --glass-bg: rgba(15,23,42,.85);
  --nav-bg: var(--glass-bg);
} }
:where(.dark, [data-theme="dark"]) {
  --glass-bg: rgba(15,23,42,.90);
  --nav-bg: var(--glass-bg);
}
```

## Weitere Verbesserungen (Vorschläge)
- Konsolidierte Theme‑Hooks: Kleines „Core‑Tokens“-Dok (README Abschnitt) mit empfohlenen semantischen Tokens je Paket.
- High‑Contrast Support: optionale Varianten via `@media (prefers-contrast: more)` für Border/Focus‑Ring.
- Reduced‑Transparency Mode: `[data-reduce-transparency]` mindert Glas/Blur‑Effekte (Barrierefreiheit).
- Spezifitäts‑Hygiene: Systematisch `:where()` in Scopes verwenden, damit Userland‑Overrides trivial bleiben.
- Linting: `verify-css.mjs` erweitern, um `@import`‑Reihenfolge Tokens→Utilities sicherzustellen.
- Doku: Dark‑Mode Abschnitt in jedem Paket‑README mit Copy‑Paste Snippets (`.dark` Umschalter, lokale Token‑Overrides).

---
Status: Konzept fixiert; nächste Schritte: pro Paket `tokens.css` angleichen, Farbhärten entfernen, Readmes ergänzen, Verifier‑Skripte hinzufügen.

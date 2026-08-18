# Falcon Rotating — Editorial Redesign

A redesign of the **Falcon Rotating** homepage, restyled to the
**"Eindhoven Design District"** design system (see `/reference`):
editorial brutalism on white paper — black-on-white, oversized display
typography, pill ghost buttons, a single signal-red editorial accent, raw
rectangular photography, and zero shadows or gradients.

The **content** (company, services, rotating-equipment scope, equipment
rental, the four Gulf offices, FAQ, contact details) is taken verbatim from
the existing Falcon Rotating site — only the **visual design** has changed.

## View it

It's a plain static site — no build step, no dependencies.

- **Just open `index.html`** in any modern browser (double-click). All asset
  paths are relative, so it works straight from the file system.
- Or serve the folder: `npx serve .` / `python3 -m http.server`.

## Structure

```
test-3d-website/
├── index.html               # the redesigned homepage
├── assets/
│   ├── css/styles.css        # design-system → Falcon layout
│   ├── js/main.js            # reveals, count-up, mobile menu (vanilla JS)
│   └── images/               # real Falcon photography + logos
├── reference/                # the design system this is styled after
│   ├── DESIGN.md  variables.css  theme.css  tokens.json
└── README.md
```

## Design system applied

| Token | Value | Use |
|-------|-------|-----|
| Charcoal Ink | `#000000` | all text, borders, icon strokes |
| Paper White | `#ffffff` | primary canvas |
| Newsprint Gray | `#e8e8e8` | alternating section bands |
| Pewter | `#bfbfbf` | dividers, muted lines |
| Signal Red | `#ff0000` | **editorial category labels only** |

- **Type:** HelveticaNow (system substitute: Helvetica Neue / Arial), a single
  family in weights 400/600. Display at ~150px, line-height 0.93,
  letter-spacing −0.05em; one hero word set horizontally, one rotated 90°.
- **Shape:** border-radius is only ever `0` (cards, images) or `500px`
  (buttons, tags, language pill). No other rounding.
- **Buttons:** pill ghost (1px black outline on white) and pill filled
  (solid black, white text). No shadows, no gradients.
- **Cards:** full-bleed photo on top, red category label, weight-600 title,
  3-line excerpt — flat rectangles, no border/shadow.
- **Rhythm:** full-width bands alternate white ↔ `#e8e8e8`; the tonal shift
  is the only divider.

## Notes

- Accessibility: semantic landmarks, skip link, `prefers-reduced-motion`
  support (reveals and count-ups disable), keyboard-focusable controls.
- SEO: title/description, Open Graph + Twitter tags, canonical, and
  Organization + FAQ JSON-LD carried over from the source site.
- This folder does **not** modify the Falcon website; it is a standalone
  redesign concept.

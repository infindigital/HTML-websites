# MidNotaryPro — Design System (Master)

Direction: government service meets premium legal-tech. Trust & Authority + Conversion;
accessible and restrained. No gradients, glassmorphism, neon, blobs, heavy shadows or emoji icons.

## Colour tokens (`assets/css/site.css :root`)

| Token | Value | Use |
|-------|-------|-----|
| `--navy-900` | `#0b1b33` | primary dark surfaces, headings |
| `--ivory-50` | `#fbf8f2` | page background |
| `--gold-500` | `#ae8a4f` | accents, rules, seals (on dark) |
| `--gold-700` | `#7e5f2c` | gold text on light (AA contrast) |
| `--blue-500` | `#3c6ea5` | links, map routes, secondary accent |

## Typography

- Display: **EB Garamond** (editorial serif headings)
- Body: **Public Sans** (USWDS government typeface), 16px base, 1.6 line height
- Labels / document numbers: **IBM Plex Mono**, uppercase, tracked

## Motion

GSAP + ScrollTrigger, 400–800 ms, ease-out. Reveals, word-staggered headings, parallax,
pinned horizontal "why" track (≥1100px), sticky apostille story, counters, magnetic CTAs,
cursor tag, View Transitions between pages. Everything is in the HTML first; with
`prefers-reduced-motion: reduce` or no JS, content renders statically.

## Components

Buttons (`.btn`, `--gold`, `--ghost`, `--light`), animated-underline `.link`, service panels,
route finder, timeline, legalization map, split panels, document stack, world-map explorer,
reviews with marquee, accordion FAQ, page hero, forms, article prose with TOC.

## Accessibility

WCAG AA contrast, visible focus rings, keyboard-operable dropdowns / drawer (focus trap, Esc),
tabs and accordions with ARIA, 44px touch targets, axe-core clean on every page.

# Midwest Apostille & Notary: Design System (Master, v5)

Source of truth for every page. Implemented as tokens on `:root` in `assets/css/site.css`, the
Python components in `_build/components.py` and `_build/page_home.py`, and one motion config in
`assets/js/site.js`. One website: one grid, one type system, one colour system, one motion system.

## How this was chosen

Decisions come from the UI/UX Pro Max skill (`.claude/skills/ui-ux-pro-max`):

| Query | Used | Rejected |
|---|---|---|
| `--domain style "editorial minimal swiss grid print"` | **Editorial Grid / Magazine**: asymmetric grid, section dividers, large imagery, print typography | Glass, bento, gradient-mesh and other SaaS styles |
| `--domain color "legal professional services trust navy"` | Legal Services profile: authority navy plus a restrained gold. Refined to the client's direction: pure white page, near-black ink, deep navy, muted blue, brass used only for rules and marks | Bright blue CTA, blue-tinted page background |
| `--domain typography "newspaper editorial magazine serif sans"` | **Magazine Style: Libre Bodoni + Public Sans**. A high-contrast Bodoni cut for text sizes, bold and very dark at display size; Public Sans is the U.S. Web Design System typeface, which suits government document work | EB Garamond and Newsreader (rejected by the client earlier), Cormorant (too light), Playfair + Inter (generic), Source Serif 4 + Inter (v4, judged not premium enough) |
| `--design-system "legal document authentication editorial premium white"` | Black plus gold accent, restraint | The suggested Liquid Glass style and the off-white #FAFAF9 background: both conflict with the brief (pure white, no glass) |
| `--domain gsap "scroll storytelling sticky mask reveal"` | Pin at most 1 to 2 sections per page; reveals are 8 to 16px fades; nothing crawlable hidden without a no-JS fallback | Back and elastic eases |

## Colour

| Token | Hex | Use |
|---|---|---|
| `--white` | `#FFFFFF` | Page background. White dominates. |
| `--ink` | `#0B0D10` | Headings, strong rules, primary text (19.6:1) |
| `--ink-2` | `#1D2228` | Body text (16:1) |
| `--ink-3` | `#434A53` | Labels, captions, inactive states (8.9:1). The lightest text colour on white. |
| `--navy` | `#0F2236` | Primary buttons, the route chapter |
| `--ink-deep` | `#0A121C` | Footer |
| `--slate` | `#3D5670` | Stamps, Hague countries on maps |
| `--brass` | `#A8834B` | The one accent: rules, seals, quote marks, map routes. Never body text. |
| `--brass-ink` | `#6B4D1F` | Accent text on white (running numbers) |
| `--mist` | `#EEF1F4` | Image placeholders and map land only. Never a section ground. |
| `--paper` | `#FFFFFF` | Paper objects are white and separated by a hairline and `--shadow-paper` |

Section rhythm on the home page: white hero, **navy** route chapter, then white to the end, closed by
the **ink** footer. No off-white, cream, grey or tinted grounds anywhere; sections are separated by
the section header's black rule, not by background changes.

Rules: no gradients, glows, blobs or glass. Inactive states change colour, never opacity below
contrast. One shadow token (`--shadow-paper`), used only on paper objects and the dropdown.

## Typography

Two families. No italics.

| Role | Font | Size | Weight / leading |
|---|---|---|---|
| Display (home H1 line) | Libre Bodoni | `--fs-display` clamp(3.1rem … 8.75rem) | 600 / 0.94, tracking -0.03em |
| H1 (inner) | Libre Bodoni | `--fs-h1` clamp(2.5rem … 4.5rem) | 600 / 1.04 |
| H2 (section) | Libre Bodoni | `--fs-h2` clamp(2rem … 3.4rem) | 600 / 1.08, max 19ch |
| H3 | Libre Bodoni | `--fs-h3` clamp(1.35rem … 1.75rem) | 600 / 1.2 |
| Stats | Libre Bodoni | clamp(3.2rem … 6.5rem) | 500 / 0.95, tabular numbers |
| Body | Public Sans | 1.0625rem | 400 / 1.65 |
| Lead | Public Sans | clamp(1.06rem … 1.22rem) | 400 |
| Eyebrow / label | Public Sans | 0.75rem uppercase, 0.14em | 600 / 700 |
| Navigation / button | Public Sans | 0.9375rem | 500 / 600 |
| Caption | Public Sans | 0.8125rem | 400 |

Eyebrow labels (hero, inner hero, closing CTA) start with a small brass seal mark (ring and centre dot), echoing the document seal. No dash rules.

The home H1 is one element: a small eyebrow line ("Apostille & Notary Services in Kansas City", the
keyword) and the display lines "Documents ready / for the world.", set across the full grid with the
second line indented like a printed front page.

## Grid, spacing, shape

- Container 1280px plus gutter `clamp(16px, 4vw, 48px)`. Every section uses it.
- 12 columns. Section headers: number and label in columns 1 to 3, heading in 4 to 11. Split
  compositions use 1 to 6 / 8 to 12 (or 1 to 7 / 9 to 12), so edges line up down the page.
- Spacing scale: 8, 16, 24, 32, 48, 64, 96, 128 (`--s1` to `--s8`). Section padding
  `clamp(4rem, 2rem + 6vw, 8rem)`.
- Radius 2px on buttons and inputs, 0 elsewhere; circles only for dots and seals.
- Hairlines instead of boxes. No card grids.

## Signature motif

A paper document that is signed, sealed and stamped **READY FOR INTERNATIONAL USE**.
It appears in the hero ledger (the four stages drawn in order), the route builder (the stamp presses when the route
changes), the process section (the document gains a notary stamp, an apostille and the final stamp)
and the notary slip (signature draws, stamp, "Notarized").

## Components (home)

Story order: Hero, 01 Document route, 02 Apostille journey, 03 Services, 04 FBI Hague vs non-Hague,
05 Notary, 06 Document preparation, 07 Country explorer, 08 Trust, 09 Questions, Final CTA.

| Section | Interaction |
|---|---|
| Hero | No photograph. Full-width Bodoni headline over the world map (routes from Kansas City to ten destinations: hover a country for its name, hover a destination for its route, click one to fill the route builder; routes cycle when idle). Lines rise on load; the base rule opens left to right; the ledger plays Document (lines written), Signed (signature drawn), Sealed (seal turns in), Ready (stamp presses) while a black rule fills above it. Click the ledger to replay. On scroll the two headline lines part slightly. |
| 01 Route builder (navy) | The chapter opens from the container edges to full bleed as it arrives (scrubbed clip; without JS it is simply full). Document, destination (or type a country), purpose. The route re-renders with a drawn connecting line and the stamp presses. Radios, so arrow keys work. |
| Apostille process | The only pinned section: 300vh on desktop, four stages driven by scroll, track buttons jump to a stage. Phones: no pin; the document plays its four states once in view, then all steps stay readable. |
| FBI paths (mist) | Hague and non-Hague columns with a central divider that fills on scroll; steps light as they enter; the switch highlights one path. |
| Notary | Three tabs (arrow keys), photo swaps through a side mask, signing slip completes in view and replays on tab change. |
| Document preparation | Seven rows (fixed height); hover, click or arrow keys bring that sheet to the front of the stack; the description is printed on the sheet. |
| Country explorer | Search, text-tab regions, map, destination record. |
| Trust | Four figures count up once in view (50 states, the computed Hague count, 100+ destinations, 4 languages), then one quote at a time, numbered index of reviewers, previous and next. No autoplay. |
| Questions | Accordion plus the two guides as ruled text links (no image cards). Quiet. |

## Motion

One system, mirrored in CSS and JS (`T` in `site.js`):

| Token | Duration | Use |
|---|---|---|
| micro | 200ms | Hover colour, underline |
| UI | 400ms | Tabs, toggles, crossfades |
| reveal | 800ms | Section entrances (fade plus 16px rise) |
| story | 1100ms | Hero lines, signature, process states |

Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` (GSAP `power3.out`), no bounce. Wow moments: hero and route
builder. Interactive: services, process, FBI, notary, document preparation. Quiet: FAQ, guides,
footer. Scroll work runs only while a section is on screen (`whileVisible`). Under
`prefers-reduced-motion` and without JavaScript everything renders in its final, readable state.

## Images

Client photos only, WebP in two sizes with `srcset`, explicit dimensions, lazy below the fold. One
shared grade (`saturate(0.86) contrast(1.02)`) so the set reads as one. The hero document is HTML and SVG; the world map behind every hero is the site's own SVG map.

## Writing rules

- No em dash characters anywhere (enforced by the build).
- Banned phrases (enforced by the build): "whether you", "seamless", "unlock", "empower", "elevate",
  "game-changing", "cutting-edge", "in today's", "at the intersection", "your trusted partner".
  Client reviews are quoted as written and exempt.
- Only facts from the client's content PDF. Prices and turnaround live in `_build/facts.py`. The
  Hague count is computed from `_build/countries.py`.

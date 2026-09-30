# Midwest Apostille & Notary: Design System (Master, v4)

Source of truth for every page. Implemented as tokens on `:root` in `assets/css/site.css`, the
Python components in `_build/components.py` and `_build/page_home.py`, and one motion config in
`assets/js/site.js`. One website: one grid, one type system, one colour system, one motion system.

## How this was chosen

Decisions come from the UI/UX Pro Max skill (`.claude/skills/ui-ux-pro-max`):

| Query | Used | Rejected |
|---|---|---|
| `--domain style "editorial minimal swiss grid print"` | **Editorial Grid / Magazine**: asymmetric grid, section dividers, large imagery, print typography | Glass, bento, gradient-mesh and other SaaS styles |
| `--domain color "legal professional services trust navy"` | Legal Services profile: authority navy plus a restrained gold. Refined to the client's direction: pure white page, near-black ink, deep navy, muted blue, brass used only for rules and marks | Bright blue CTA, blue-tinted page background |
| `--domain typography "editorial serif legal professional trustworthy"` | Serif display plus neutral sans. The first two matches (EB Garamond, Newsreader) were rejected by the client in earlier rounds, so the client chose **Source Serif 4** (sharp, upright, contemporary) with **Inter** | EB Garamond, Newsreader, Plus Jakarta Sans (display) |
| `--domain gsap "scroll storytelling sticky mask reveal"` | Pin at most 1 to 2 sections per page; reveals are 8 to 16px fades; nothing crawlable hidden without a no-JS fallback | Back and elastic eases |

## Colour

| Token | Hex | Use |
|---|---|---|
| `--white` | `#FFFFFF` | Page background. White dominates. |
| `--ink` | `#111418` | Headings, strong rules |
| `--ink-2` | `#3B4048` | Body text |
| `--ink-3` | `#626B76` | Labels, captions, inactive states (5.3:1 on white) |
| `--navy` | `#152536` | Primary buttons, the route builder section, hero plate |
| `--ink-deep` | `#0E1620` | Footer |
| `--slate` | `#536B80` | Muted blue: stamps, Hague countries, "the world." |
| `--brass` | `#B08D57` | Rules, seals, quote marks. Never body text. |
| `--brass-ink` | `#7A5B2B` | Accent text on white (numbers) |
| `--mist` | `#F4F5F7` | The only light neutral ground (FBI paths, country explorer on inner pages) |
| `--paper` | `#FBFAF7` | Paper objects only (under-sheets, certificates) |

Section rhythm on the home page: white, white, white, **navy** (route builder), white, **mist** (FBI),
white, white, white, white, white, **ink** (footer). No cream, beige or alternating tints.

Rules: no gradients, glows, blobs or glass. Inactive states change colour, never opacity below
contrast. One shadow token (`--shadow-paper`), used only on paper objects and the dropdown.

## Typography

Two families. No italics.

| Role | Font | Size | Weight / leading |
|---|---|---|---|
| Display (home H1 line) | Source Serif 4 | `--fs-display` clamp(3rem … 6.4rem) | 600 / 0.98, tracking -0.028em |
| H1 (inner) | Source Serif 4 | `--fs-h1` clamp(2.5rem … 4.5rem) | 600 / 1.04 |
| H2 (section) | Source Serif 4 | `--fs-h2` clamp(2rem … 3.4rem) | 600 / 1.08, max 19ch |
| H3 | Source Serif 4 | `--fs-h3` clamp(1.35rem … 1.75rem) | 600 / 1.2 |
| Stats | Source Serif 4 | clamp(3.2rem … 6.5rem) | 500 / 0.95, tabular numbers |
| Body | Inter | 1.0625rem | 400 / 1.65 |
| Lead | Inter | clamp(1.06rem … 1.22rem) | 400 |
| Eyebrow / label | Inter | 0.75rem uppercase, 0.14em | 600 |
| Navigation / button | Inter | 0.9375rem | 500 / 600 |
| Caption | Inter | 0.8125rem | 400 |

The home H1 is one element: a small eyebrow line ("Apostille & Notary Services in Kansas City", the
keyword) and the display line "Documents ready for the world."

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
It appears in the hero (the full sequence), the route builder (the stamp presses when the route
changes), the process section (the document gains a notary stamp, an apostille and the final stamp)
and the notary slip (signature draws, stamp, "Notarized").

## Components (home)

| Section | Interaction |
|---|---|
| Hero | Headline lines rise; plate opens from the bottom; document fields fill, signature draws, seal turns in, stamp presses; step labels light Document / Signed / Sealed / Ready. Click the document to replay. Scroll drifts the layers; pointer adds depth on desktop. |
| Stats band | Numbers count up once in view. |
| Service directory | Rows have a fixed height (no hover jitter). Hover or focus: row rule draws, name shifts, "View service" replaces the meta, preview image opens through a mask, counter and description update. Phones: all descriptions shown. |
| Route builder (navy) | Document, destination (or type a country), purpose. The route re-renders with a drawn connecting line and the stamp presses. Radios, so arrow keys work. |
| Apostille process | The only pinned section: 300vh on desktop, four stages driven by scroll, track buttons jump to a stage. Phones: no pin; the document plays its four states once in view, then all steps stay readable. |
| FBI paths (mist) | Hague and non-Hague columns with a central divider that fills on scroll; steps light as they enter; the switch highlights one path. |
| Notary | Three tabs (arrow keys), photo swaps through a side mask, signing slip completes in view and replays on tab change. |
| Document preparation | Seven rows (fixed height); hover, click or arrow keys bring that sheet to the front of the stack; the description is printed on the sheet. |
| Country explorer | Search, text-tab regions, map, destination record. |
| Reviews | One quote at a time, numbered index of reviewers, previous and next. No autoplay. |
| FAQ, guides, footer | Quiet. |

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
shared grade (`saturate(0.86) contrast(1.02)`) so the set reads as one. No stock globes or maps in the
hero; the hero visual is HTML and SVG.

## Writing rules

- No em dash characters anywhere (enforced by the build).
- Banned phrases (enforced by the build): "whether you", "seamless", "unlock", "empower", "elevate",
  "game-changing", "cutting-edge", "in today's", "at the intersection", "your trusted partner".
  Client reviews are quoted as written and exempt.
- Only facts from the client's content PDF. Prices and turnaround live in `_build/facts.py`. The
  Hague count is computed from `_build/countries.py`.

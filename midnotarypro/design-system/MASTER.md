# Midwest Apostille & Notary: Design System (Master)

Source of truth for every page. Implemented in `assets/css/site.css` (tokens on `:root`)
and the Python components in `_build/components.py`.

## How this was chosen

Decisions come from the UI/UX Pro Max skill (`.claude/skills/ui-ux-pro-max`):

| Query | Result used | Rejected |
|---|---|---|
| `--design-system "legal document authentication editorial institutional premium"` | Pattern: **Scroll-Triggered Storytelling** (readable without motion, progress indicator, final state under reduced motion). Palette direction: dark ink + warm metallic accent on warm off-white. | Style "Liquid Glass" (brief forbids glass and blur). Cormorant / Montserrat (fashion mood). |
| `--domain style "editorial print magazine"` | **Editorial Grid / Magazine**: asymmetric grid, section dividers, large imagery, print typography. Cost low, accessibility risk low. | Exaggerated minimalism, Bauhaus. |
| `--domain typography "editorial serif authoritative readable professional"` + `--domain google-fonts` | **Newsreader** (variable, optical sizes 6 to 72, designed for reading). Body: **Schibsted Grotesk**, a grotesk drawn for a news publisher. | EB Garamond / Public Sans (previous version, felt generic); Playfair; Roboto. |
| `--domain gsap "image mask clip reveal"`, `"pinned scroll storytelling"` | Reveal y offsets 8 to 24px; scrub 0.5 to 1.5; **pin at most 1 to 2 sections per page**; never hide crawlable content without a no-JS fallback. | Back-eased stagger presets (too bouncy for the brand). |

## Colour

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#141a22` | Headings, primary text |
| `--ink-2` | `#3b434e` | Body text |
| `--ink-3` | `#5c6570` | Labels, captions (4.5:1 on ivory) |
| `--navy` | `#16263a` | Primary buttons, dark sections |
| `--navy-deep` | `#0f1b2a` | Footer |
| `--slate` | `#48627a` | Muted blue: Hague countries, notary stamp |
| `--ivory` | `#f4f0e7` | Page background (with 4.5% paper grain) |
| `--paper` | `#fbfaf6` | Soft white surfaces |
| `--bone` | `#ebe5d8` | Alternate band |
| `--brass` | `#b08d57` | Warm metallic accent: rules, markers, seals |
| `--brass-ink` | `#7a5b2b` | Accent text on light backgrounds |
| `--seal` | `#8c2d27` | Wax red, used only for ribbons, errors and callout rules |

Rules: no gradients except the two small foil seals; no glow, no blur, no glass. One shadow
style (soft, long, low) and only on paper objects (certificates, document cards, dropdown).

## Typography

Two families only.

| Role | Font | Size | Weight / leading |
|---|---|---|---|
| Display (home H1 line) | Newsreader | clamp(3.4rem … 8.1rem) | 330 / 0.93, tracking -0.032em, italic second line |
| H1 (inner) | Newsreader | clamp(2.5rem … 5.6rem) | 340 / 1.0 |
| H2 (section) | Newsreader | clamp(2.1rem … 4rem) | 360 / 1.04, max 19ch |
| H3 | Newsreader | 1.25 to 1.9rem | 400 to 430 / 1.2 |
| H4 / prose H3 | Schibsted Grotesk | 1.02rem | 700 |
| Body | Schibsted Grotesk | 1.0625rem | 400 / 1.65 |
| Small / caption | Schibsted Grotesk or Newsreader italic | 0.75 to 0.875rem | |
| Navigation | Schibsted Grotesk | 0.9375rem | 500 |
| Buttons | Schibsted Grotesk | 0.9375rem | 600 |
| Labels | Schibsted Grotesk | 0.75rem uppercase, 0.14em tracking | 600 |
| Numbers | Newsreader italic in brass-ink | 1 to 1.1rem | editorial numbering (01, 02…) |

## Grid and spacing

- Container 1360px plus a fluid gutter `clamp(16px, 4vw, 48px)`.
- 12 columns. Section headers put the number/label in columns 1 to 3 and the H2 in columns 4 to 11.
- Section padding `clamp(4rem, 2.25rem + 5vw, 7.5rem)`.
- Hairline rules (`--rule`, 14% ink) separate everything instead of boxes. Radius is 2px on
  buttons and inputs and 0 elsewhere.

## Components

| Component | Where | Notes |
|---|---|---|
| Header | all | Transparent over ivory, turns solid with a hairline and compact height after 16px of scroll. Brass progress line. Dropdowns are plain link lists, no descriptions. EN / ES switch. |
| Drawer | < 1100px | Full-screen ivory sheet, serif links, clip-path reveal, focus trap, Escape to close. |
| Section header (`shead`) | all | Running number, label, serif H2, optional lead. |
| Rows | all | Numbered editorial rows instead of icon cards. 1, 2, 3 or 4 columns. |
| Checklist | all | Hairline list with a small brass check. |
| Buttons | all | Primary navy, secondary outline, light / outline-light on navy, text. Fill wipes in from the left on hover, arrow nudges. |
| Links | all | Underline retracts and redraws on hover, arrow moves 4px. |
| Hero composition | home | Photographed plate + inset photo + HTML apostille certificate with drawn signature and foil seal. |
| Document journey | home | Sticky document stage that gains a stamp, seal, apostille, translation and shipping route across 7 chapters. |
| Service index | home, services, 404 | Large serif service names; hover or focus swaps a masked image in a sticky preview. |
| Route tabs | home, services, apostille | Hague vs non-Hague stations with a destination lookup. |
| Country explorer | home, apostille, FBI apostille | Map + crawlable region lists + "record card" panel. |
| FBI timeline / legalization route | FBI pages | Sticky image, progress line; navy map with arc to the destination embassy. |
| Record card | explorer, legal route | Paper card with a dashed inner rule, like an official record. |
| Pull quote | about, notary, doc prep | Navy band, Newsreader italic. |
| Price facts | apostille | Large serif figures under a heavy rule. |
| Forms | contact | Visible labels, required marked in text, errors under the field, focus ring. |
| Breadcrumbs | every inner page | Slash separated, plus BreadcrumbList JSON-LD. |
| Final CTA | all | Navy with faint ruled-paper lines. |

## Motion

GSAP 3.12 + ScrollTrigger (deferred, CDN). Hierarchy:

| Level | Where | Motion |
|---|---|---|
| High | Home hero | Word rise on the display line, plate mask reveal, inset wipe, certificate drops in, fields draw, signature writes, seal presses. Scroll moves the three layers at different speeds. |
| Medium | Section headings, image masks, journey stage | Word rise, clip-path reveals from the bottom edge, stage state changes (CSS transitions). |
| Subtle | Rows, lists, panels | 14 to 24px fade-up, stagger 0.06s, max 10 items. |
| Micro | Buttons, links, CTAs | Fill wipe, arrow nudge, magnetic pull on the two main CTAs. |
| Very subtle | Navigation | Underline, header compaction. |
| None | Footer | |

Durations 0.45 to 1.2s; easing `power3.out` / `power4.out`, never back or elastic, except the seal "press".
Only one sticky storytelling section per page. Under `prefers-reduced-motion` all transitions are
removed and every element renders in its final state; without JavaScript the journey stage shows
the completed document. A 2.5s CSS guard (`motion-pending`) prevents a flash before GSAP sets the
hero start state.

## Images

Client photos only, WebP in two sizes (`-sm` 800w, `-lg` up to 1600w) with `srcset`, explicit
width and height, lazy below the fold, preloaded with `fetchpriority="high"` for each page hero.
Every image has an `alt` attribute; images inside decorative compositions use `alt=""`.

## Writing rules

- No em dash characters anywhere (enforced by the build).
- Banned phrases (enforced by the build): "whether you", "seamless", "unlock", "empower", "elevate",
  "game-changing", "cutting-edge", "in today's", "at the intersection", "your trusted partner".
  Client reviews are quoted as written and exempt.
- Short, direct, American English. One idea per paragraph.
- Only facts from the client's content PDF. Prices and turnaround live in `_build/facts.py`.

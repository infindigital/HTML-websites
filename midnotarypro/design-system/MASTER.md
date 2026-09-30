# Midwest Apostille & Notary: Design System (Master)

Source of truth for every page. Implemented in `assets/css/site.css` (tokens on `:root`)
and the Python components in `_build/components.py`.

## How this was chosen

Decisions come from the UI/UX Pro Max skill (`.claude/skills/ui-ux-pro-max`):

| Query | Result used | Rejected |
|---|---|---|
| `--design-system "legal document authentication editorial institutional premium"` | Pattern: **Scroll-Triggered Storytelling** (readable without motion, progress indicator, final state under reduced motion). Palette direction: dark ink + warm metallic accent on white (client asked for a white theme). | Style "Liquid Glass" (brief forbids glass and blur). Cormorant / Montserrat (fashion mood). |
| `--domain style "editorial print magazine"` | **Editorial Grid / Magazine**: asymmetric grid, section dividers, large imagery, print typography. Cost low, accessibility risk low. | Exaggerated minimalism, Bauhaus. |
| `--domain typography "professional modern sans corporate"` + `--domain google-fonts` | Headings **Plus Jakarta Sans** (500 to 800), body **Inter** (400 to 700). Chosen by the client. | EB Garamond and Newsreader (earlier versions, rejected by the client); Playfair; Roboto. |
| `--domain gsap "image mask clip reveal"`, `"pinned scroll storytelling"` | Reveal y offsets 8 to 24px; scrub 0.5 to 1.5; **pin at most 1 to 2 sections per page**; never hide crawlable content without a no-JS fallback. | Back-eased stagger presets (too bouncy for the brand). |

## Colour

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0f1a2b` | Headings, primary text |
| `--ink-2` | `#3a4556` | Body text |
| `--ink-3` | `#5b6678` | Labels, captions (4.5:1 on white and paper) |
| `--navy` | `#16263a` | Primary buttons, dark sections |
| `--navy-deep` | `#0f1b2a` | Footer |
| `--slate` | `#48627a` | Muted blue: Hague countries, notary stamp |
| `--ivory` | `#ffffff` | Page background (pure white, no grain) |
| `--paper` | `#f6f8fb` | Cool grey bands (hero fact band, alternate sections) |
| `--bone` | `#eef2f7` | Alternate band, kicker and frame fills |
| `--brass` | `#b08d57` | Warm metallic accent: rules, markers, seals |
| `--brass-ink` | `#7a5b2b` | Accent text on light backgrounds |
| `--seal` | `#8c2d27` | Wax red, used only for ribbons, errors and callout rules |

Rules: no gradients except the two small foil seals and hard colour splits (no blends); no glow, no blur, no glass. One shadow
style (soft, long, low) and only on paper objects (certificates, document cards, dropdown).

## Typography

Two families only. No italics anywhere.

| Role | Font | Size | Weight / leading |
|---|---|---|---|
| Home H1 kicker | Inter | 0.95 to 1.1rem | 600, bone fill with brass left rule |
| Home display line | Plus Jakarta Sans | clamp(2.6rem … 5.1rem) | 800 / 1.02, tracking -0.035em, second line in slate |
| H1 (inner) | Plus Jakarta Sans | clamp(2.3rem … 4.7rem) | 800 / 1.05 |
| H2 (section) | Plus Jakarta Sans | clamp(1.9rem … 3.3rem) | 750 / 1.1, max 20ch |
| H3 | Plus Jakarta Sans | 1.25 to 1.9rem | 600 to 700 / 1.2 |
| Body | Inter | 1.0625rem | 400 / 1.65 |
| Navigation, buttons | Inter | 0.9375rem | 500 / 600 |
| Labels | Inter | 0.75rem uppercase, 0.14em tracking | 600 |
| Numbers | Plus Jakarta Sans in brass-ink | 1 to 1.1rem | editorial numbering (01, 02…) |

## Grid and spacing

- Container 1360px plus a fluid gutter `clamp(16px, 4vw, 48px)`.
- 12 columns. Section headers put the number/label in columns 1 to 3 and the H2 in columns 4 to 11.
- Section padding `clamp(4rem, 2.25rem + 5vw, 7.5rem)`.
- Hairline rules (`--rule`, 14% ink) separate everything instead of boxes. Radius is 2px on
  buttons and inputs and 0 elsewhere.

## Components

| Component | Where | Notes |
|---|---|---|
| Header | all | Transparent over white, turns solid with a hairline and compact height after 16px of scroll. Brass progress line. Dropdowns are plain link lists, no descriptions. EN / ES switch. |
| Drawer | < 1100px | Full-screen white sheet, heading-font links, clip-path reveal, focus trap, Escape to close. |
| Section header (`shead`) | all | Running number, label, serif H2, optional lead. |
| Rows | all | Numbered editorial rows instead of icon cards. 1, 2, 3 or 4 columns. |
| Checklist | all | Hairline list with a small brass check. |
| Buttons | all | Primary navy, secondary outline, light / outline-light on navy, text. Fill wipes in from the left on hover, arrow nudges. |
| Links | all | Underline retracts and redraws on hover, arrow moves 4px. |
| Home hero | home | World map with route arcs from Kansas City, destination checker (Hague or legalization), photographed plate, HTML apostille certificate, document review status card, seal inset, facts row and six service cards. |
| Inner hero | all inner pages | Faint route map, framed photo with an office card (real address and phone), fact band on cool grey. |
| Document journey | home | Sticky document stage that gains a stamp, seal, apostille, translation and shipping route across 7 chapters. |
| Service index | home, services, 404 | Large serif service names; hover or focus swaps a masked image in a sticky preview. |
| Route tabs | home, services, apostille | Hague vs non-Hague stations with a destination lookup. |
| Country explorer | home, apostille, FBI apostille | Map + crawlable region lists + "record card" panel. |
| FBI timeline / legalization route | FBI pages | Sticky image, progress line; navy map with arc to the destination embassy. |
| Record card | explorer, legal route | Paper card with a dashed inner rule, like an official record. |
| Pull quote | about, notary, doc prep | Navy band, Plus Jakarta Sans 500/600. |
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

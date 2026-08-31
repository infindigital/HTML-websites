# INFIN Digital — Interactive Website (Redesign)

A colourful, premium, interactive, animated and 3D redesign of the INFIN Digital
website. Built as a self-contained static experience — no build step, no external
CDN dependency (all libraries and fonts are self-hosted).

> Positioning: **Design, search and paid media working as one growth system.**
> A Mangalore web design & digital marketing agency.

## Run it

Any static server works. From this `site/` folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` via `file://` will not work because it uses ES modules
and an import map — serve it over HTTP.)

## Stack

- **HTML + CSS + vanilla JS** (ES modules) — zero framework, fast to load.
- **GSAP + ScrollTrigger** — the animation system (reveals, pins, parallax, counters, magnetic, marquees).
- **Lenis** — smooth scroll, synced to ScrollTrigger.
- **Three.js** — two custom 3D scenes (hero + final CTA). Lazy-loaded, desktop/tablet only.
- **Self-hosted fonts** — Space Grotesk (display), Inter (body), Space Mono (labels).

Everything degrades gracefully: `prefers-reduced-motion`, touch devices and phones
drop the custom cursor, 3D and heavy parallax while keeping the layout, colour and
content intact.

## Structure

```
site/
├── index.html          # all sections, real INFIN content, SEO + structured data
├── css/
│   ├── styles.css      # design system + every section
│   ├── fonts.css       # @font-face (self-hosted)
│   └── fonts/          # woff2 subsets
├── js/
│   ├── main.js         # interaction & animation system
│   ├── scene.js        # Three.js hero + CTA compositions
│   └── vendor/         # gsap, ScrollTrigger, lenis, three (self-hosted)
└── assets/
    ├── img/            # optimised WebP + brand/trust PNGs
    └── svg/            # in/fin logo (light + dark)
```

## Homepage sections

01 Hero (3D) · marquee · 02 Big statement · 03 About (floating brand plates) ·
04 Trust / clients · 05 Services intro · 06 Services (sticky) · 07 Growth system
(pinned) · 08 Work (horizontal scroll) · 09 Creative Lab (parallax collage) ·
10 Results (counters) · 11 Case study (from click to conversion) · 12 Why INFIN
(colour transitions) · 13 Testimonials · 14 Insights · 15 Final CTA (3D) · 16 Footer

## Content & data — where to edit

All copy is real, taken from `INFIN_Digital_Website_Content.pdf` (the live site).
Two things are intentionally **editable placeholders** and flagged here:

- **Results counters** (`data-count` in the Results section) use the *published
  homepage* figures — 550+ customers, 98% rating, 1000+ projects, 10 yrs. The
  live site has conflicting legacy figures elsewhere; verify before publishing.
- **Testimonial avatars** use initials monograms rather than the supplied
  portrait photos, because the portraits could not be reliably matched to the
  named people. Swap in real photos only where identity is confirmed.

See `ASSET-MAP.md` for exactly how every supplied asset was used.

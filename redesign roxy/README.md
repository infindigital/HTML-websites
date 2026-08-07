# Roxy Houseboat — Website Redesign

A premium redesign of the Roxy Houseboat Nileshwar website — a static, hand-built
HTML/CSS/JS site with no framework or build step. The design communicates a
Kerala backwater luxury experience: calm, authentic, trustworthy and premium.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Homepage — hero, about, packages, testimonials, houseboats, CTA, why choose, contact, FAQ |
| `about-us.html` | About — who we are, our story, vision, what sets us apart |
| `services.html` | Services — accommodation & dining, events & conferences |
| `packages.html` | Packages — 6 cruise packages in alternating detail rows |
| `gallery.html` | Gallery — masonry image mosaic |
| `contact-us.html` | Contact — form, contact details, map, FAQ |

## Design system

- **Palette:** Deep Ocean Blue · Warm Gold · White · Soft Cream · Muted Grey
- **Type:** Cormorant Garamond (serif display) + Jost (sans body), via Google Fonts
- **Tokens & components:** one shared stylesheet (`assets/css/styles.css`) using
  CSS custom properties and reusable component classes across all pages
- **Behaviour:** one shared script (`assets/js/main.js`) — sticky nav scroll
  state, mobile menu, FAQ accordion, scroll-reveal (IntersectionObserver),
  auto copyright year

## Structure

```
redesign roxy/
├── index.html · about-us.html · services.html · packages.html · gallery.html · contact-us.html
├── assets/
│   ├── css/styles.css     # shared design system
│   ├── js/main.js         # shared interactions
│   ├── images/            # photography, logo, review badge
│   ├── docs/              # (reserved)
│   └── video/             # (reserved)
└── references/            # screenshots of the original site
```

## Features

- Mobile-first, fully responsive layouts (no horizontal scroll, touch-friendly)
- Lazy-loaded images with explicit dimensions
- Semantic, accessible markup (landmarks, ARIA on interactive controls, focus styles)
- Subtle motion only, with `prefers-reduced-motion` support
- Content preserved from the original site — packages, contact details, FAQs and
  section order are unchanged

## Local preview

Open any `.html` file directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

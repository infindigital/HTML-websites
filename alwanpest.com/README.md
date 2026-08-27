# Alwan Pest Control — alwanpest.com

A high-fidelity, production-ready **static website** for Alwan Pest Control
(Al Jubail, Saudi Arabia), recreated from the original site design.

Built with **HTML5, CSS3 and vanilla JavaScript only** — no frameworks, no
build step, no backend. Every asset is local; the site can be served by any
static host (or opened straight from disk).

---

## Tech & principles

- **No dependencies:** no React/Vue/Angular, no Bootstrap/Tailwind, no jQuery.
  Only Google Fonts (Poppins) is loaded remotely, with a system-font fallback.
- **Modular, multi-page architecture** — shared header/footer/blocks are
  generated consistently across pages; CSS and JS are centralized and reused.
- **Desktop-first responsive design** with breakpoints at 1200 / 1024 / 900 /
  768 / 560 / 400 px. Verified to have **no horizontal scroll** from 360 px up
  to 1440 px.
- **Accessibility:** skip link, keyboard-operable menu/search, ARIA attributes,
  visible focus states, semantic landmarks, descriptive `alt` text.
- **SEO:** unique `<title>`, meta description, canonical URL, Open Graph and
  Twitter cards, and JSON-LD (`PestControl` / `Service` / `BreadcrumbList`) on
  every page; a single `<h1>` per page; `sitemap.xml` and `robots.txt`.
- **Progressive enhancement:** content is fully visible without JavaScript
  (scroll-reveal animations are gated behind a `.js` class added at runtime).

## Directory structure

```
alwanpest.com/
├── index.html                 # Home
├── about.html                 # About
├── termites.html              # Termites
├── services.html              # Services listing
├── clients.html               # Our Clients / Business Partners
├── contact.html               # Contact (form + Google Map)
├── 404.html                   # Not-found page (noindex)
├── services/                  # 7 service detail pages
│   ├── commercial-petrochemical-residential.html
│   ├── pre-post-construction-termite-treatment.html
│   ├── garden-insects-control.html
│   ├── container-fumigation-services.html
│   ├── crawling-control.html
│   ├── termite-infestation-wooden-frame.html
│   └── post-construction-termite-control.html
├── css/
│   ├── style.css              # Reset, design tokens, layout, header/footer, home
│   ├── components.css         # Reusable components (cards, grids, forms, etc.)
│   └── responsive.css         # Breakpoints & mobile menu
├── js/
│   ├── navigation.js          # Mobile menu, dropdown accordion, sticky header, search
│   ├── main.js                # Hero slider, counters, testimonials, scroll reveal
│   └── forms.js               # Client-side form validation (no backend)
├── assets/
│   ├── logos/                 # Brand logo
│   ├── images/                # Photography & certificates
│   ├── icons/                 # Pest / feature icons
│   └── client-logos/          # Client brand logos
├── sitemap.xml
├── robots.txt
└── README.md
```

## Business information

- **Email:** info@alwanpest.com
- **Phone / Hotline:** +966 54 247 7485 · +966 54 935 8786
- **WhatsApp:** +966 54 935 8786 (floating button + header CTA on every page)
- **Head office:** 2404 Taibah District 8845, Postal Code 35513, Al Jubail, KSA
- **Branches:** Dammam · Al Khobar · Al-Hassa
- **Working hours:** Saturday – Thursday, 6 AM – 6 PM

## Forms & map

- The **booking** and **contact** forms are validated entirely on the client
  side and show a friendly confirmation on submit. There is **no backend** — to
  make them deliver mail, point the `<form>` at your handler (e.g. Formspree,
  or a server endpoint) and remove `novalidate`/the mock success handler in
  `js/forms.js` as needed.
- The contact page embeds a Google Maps iframe for the Al Jubail location.

## Local preview

No build step is required. Serve the folder with any static server, e.g.:

```bash
cd alwanpest.com
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Notes on fidelity

- The site is a faithful visual recreation from the original design; layout,
  sections, palette (teal `#0a303a`, cyan `#2596be`, orange `#dc5a3b`) and
  copy follow the source.
- **Corrected source bug:** on the original *Garden Insects Control* page the
  hero heading incorrectly read *"Pre & Post Construction Termite Treatment"*.
  This has been corrected to **"Garden Insects Control Services"** to match the
  page's own content and URL (better for users and SEO).
- The footer copyright year is rendered dynamically (current year) via
  `js/main.js`.

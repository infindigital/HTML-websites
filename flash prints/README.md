# Flash Print Solution — Static Website

A production-ready, fully static recreation of the Flash Print Solution website
(printing services in Dubai). Built with **HTML5, CSS3 and vanilla JavaScript** —
no frameworks, no build step required to deploy, no backend.

## What's included

- **Homepage** — hero, services grid, product tabs (Best Selling / New Arrivals /
  Latest Collection), about, 4-step process, testimonials, SEO content, FAQ,
  contact form + map, and CTA.
- **127 individual product pages** (`/product/*.html`) with content sourced from
  the supplied product PDF.
- **Products archive** (`/products.html`) — client-side search, category filter
  and pagination over the full catalogue.
- **6 service / category pages** (`/services/*.html`) + services overview.
- **About, Contact, FAQ, Privacy Policy, Terms & Conditions, custom 404.**
- **SEO**: unique titles + meta descriptions, canonicals, Open Graph + Twitter
  cards, JSON-LD (LocalBusiness, BreadcrumbList, Product, FAQPage), `sitemap.xml`
  and `robots.txt`.
- **Accessibility**: semantic landmarks, skip link, keyboard-accessible nav,
  tabs, accordions and forms, visible focus, reduced-motion support.

## Images

All images are currently **styled placeholders** sized to the final dimensions,
so real images drop in without breaking layout. See **`IMAGE-ASSETS.md`** for the
full list of expected files and paths.

## Deploying

Upload the contents of this folder to any static host (Apache, Nginx, cPanel,
Netlify, Vercel, Cloudflare Pages, GitHub Pages). No server-side code needed.
Set the site's base domain in the canonical/OG tags via `build/data.py` if it
differs from `https://flashprintsolution.com`.

The contact form has no backend by default. Set `FORM_ENDPOINT` in
`assets/js/forms.js` to a real endpoint (Formspree, Web3Forms, a serverless
function, etc.) to enable live submissions.

## Rebuilding

The HTML pages are generated from the product data + shared templates:

```bash
cd build
python3 build.py   # regenerates all HTML, sitemap.xml and robots.txt
```

- `build/products.json` — product content parsed from the supplied PDF.
- `build/data.py` — business info, navigation, categories, FAQ, testimonials.
- `build/partials.py` — shared head/SEO, header, footer, logo, icons.
- `build/build.py` — page templates + generator.

## Structure

```
flash prints/
├── index.html  about.html  services.html  products.html  contact.html  faq.html
├── privacy-policy.html  terms-conditions.html  404.html
├── robots.txt  sitemap.xml
├── services/        # 6 service category pages
├── product/         # 127 product pages
├── assets/
│   ├── css/         # variables, base, components, header, footer, pages, responsive
│   ├── js/          # main, navigation, tabs, faq, forms, products
│   └── images/      # placeholders today — see IMAGE-ASSETS.md
└── build/           # generator (not part of the deployable site)
```

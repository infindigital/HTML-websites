# Falcon Rotating — Website Planning & SEO Document

**Company:** Falcon Rotating Contracting & General Maintenance L.L.C.
**Canonical domain (assumed):** `https://falconrotating.com`  *(alt brand domain in brochure: arabianfalconsa.com — [CLIENT TO CONFIRM] which is primary)*
**Prepared:** 2026-08-13
**Deliverable web root:** `Falcon/site/` (static HTML, no build step required to serve)

> **Source-of-truth policy.** Every factual claim on the site is taken from the company brochure (the primary source). Nothing about services, equipment, offices or the company story is invented. Where the brochure is silent, the copy uses neutral, non-committal language and unknowns are flagged `[CLIENT TO CONFIRM]` (see Section K). The site contains **no** fabricated testimonials, reviews, star ratings, client logos, case studies, project statistics, awards or certifications.

---

## A. Sitemap (18 URLs)

| # | URL | Page | Template |
|---|-----|------|----------|
| 1 | `/` | Home | Home |
| 2 | `/about/` | About | Standard |
| 3 | `/services/` | Services index | Hub |
| 4 | `/services/construction-contracting/` | Construction Contracting | Service detail |
| 5 | `/services/piling/` | Piling Work | Service detail |
| 6 | `/services/rotating-equipment/` | Rotating Equipment Overhauling & Maintenance | Service detail |
| 7 | `/services/excavation-backfilling/` | Excavation & Backfilling | Service detail |
| 8 | `/equipment-rental/` | Equipment Rental **(single canonical page)** | Service detail |
| 9 | `/locations/` | Locations index | Hub |
| 10 | `/locations/dubai/` | Dubai office | Location |
| 11 | `/locations/abu-dhabi/` | Abu Dhabi office | Location |
| 12 | `/locations/yanbu/` | Yanbu office (Head Office) | Location |
| 13 | `/locations/al-jubail/` | Al Jubail office | Location |
| 14 | `/contact/` | Contact | Contact |
| 15 | `/request-a-quote/` | Request a Quote | Form |
| 16 | `/blog/` | Insights & News (index; posts marked "Coming soon") | Blog |
| 17 | `/privacy-policy/` | Privacy Policy | Legal |
| 18 | `/terms-and-conditions/` | Terms & Conditions | Legal |
| — | `/404.html` | Not Found | Utility (noindex) |
| — | `/sitemap.xml`, `/robots.txt` | Crawl files | — |

**Equipment Rental note:** it appears in the top nav **and** inside the Services dropdown, but resolves to **one** canonical URL `/equipment-rental/` from both entry points — no duplicate page, no duplicate content.

---

## B. Navigation Architecture (exactly as specified — unchanged)

```
HOME | ABOUT | SERVICES ▼ | EQUIPMENT RENTAL | LOCATIONS ▼ | CONTACT | [ REQUEST A QUOTE ]
```

- **SERVICES ▼:** Construction Contracting · Piling Work · Rotating Equipment · Excavation & Backfilling · Equipment Rental
- **LOCATIONS ▼:** Dubai · Abu Dhabi · Yanbu · Al Jubail
- **REQUEST A QUOTE** is a visually distinct primary button, present in header and reinforced by the footer CTA band on every page.
- Desktop: hover-reveal dropdowns. Mobile (≤820px): hamburger toggle, dropdowns expand on tap; full keyboard support (Enter/Space to open, Escape to close, outside-click to dismiss), `aria-expanded` maintained in JS.
- Footer mirrors the primary architecture plus legal links.

---

## C. Keyword Map (intent-based; no fabricated metrics)

> No search-volume, difficulty, CPC, competition or ranking figures are quoted — those require live tool data the client should validate. Below is an **intent/topic** map only.

| Page | Primary topic | Supporting terms |
|------|---------------|------------------|
| Home | construction & maintenance contractor UAE / Saudi Arabia | rotating equipment, piling, equipment rental, industrial contractor |
| About | engineering & contracting company | vision, mission, private & government clients |
| Construction Contracting | construction contracting | civil construction, piping works, industrial maintenance, steel fabrication, electrical maintenance |
| Piling | piling contractor / foundation works | site preparation, foundation support, piling equipment |
| Rotating Equipment | rotating equipment overhauling & maintenance | steam turbine overhaul, pump/compressor maintenance, gearbox repair |
| Excavation & Backfilling | excavation and backfilling | earthworks, trenching, compaction, site grading |
| Equipment Rental | heavy equipment rental | crane rental, excavator hire, generator rental, dump truck hire |
| Locations (+4) | \<city\> construction / equipment rental | Dubai, Abu Dhabi, Yanbu, Al Jubail |
| Contact / Quote | contact / request a quote | enquiry, get in touch |

Each keyword is expressed through headings, body copy and internal anchor text drawn from brochure wording — never keyword-stuffed.

---

## D. Title & Meta Strategy

Rules applied: unique per page · title ≤ ~60 chars of visible text where practical · description ~150–160 chars · brand suffix "| Falcon Rotating" · one H1 per page distinct from the `<title>`. Full generated set:

| URL | `<title>` |
|-----|-----------|
| `/` | Falcon Rotating \| Construction, Rotating Equipment & Piling Contractor UAE & KSA |
| `/about/` | About Falcon Rotating \| Engineering & Contracting Company |
| `/services/` | Services \| Construction, Piling, Rotating Equipment & Rental \| Falcon Rotating |
| `/services/construction-contracting/` | Construction Contracting \| Civil, Industrial & Steel Works \| Falcon Rotating |
| `/services/piling/` | Piling Work \| Foundation & Piling Contractor \| Falcon Rotating |
| `/services/rotating-equipment/` | Rotating Equipment Overhauling & Maintenance \| Falcon Rotating |
| `/services/excavation-backfilling/` | Excavation & Backfilling \| Earthworks & Groundwork \| Falcon Rotating |
| `/equipment-rental/` | Equipment Rental \| Heavy Machinery & Vehicle Hire \| Falcon Rotating |
| `/locations/` | Locations \| Offices in UAE & Saudi Arabia \| Falcon Rotating |
| `/locations/dubai/` | Dubai Office \| Construction & Equipment Rental \| Falcon Rotating |
| `/locations/abu-dhabi/` | Abu Dhabi Office \| Construction & Equipment Rental \| Falcon Rotating |
| `/locations/yanbu/` | Yanbu Office \| Construction & Equipment Rental \| Falcon Rotating |
| `/locations/al-jubail/` | Al Jubail Office \| Construction & Equipment Rental \| Falcon Rotating |
| `/contact/` | Contact Falcon Rotating \| Get in Touch |
| `/request-a-quote/` | Request a Quote \| Falcon Rotating |
| `/blog/` | Insights & News \| Falcon Rotating |
| `/privacy-policy/` | Privacy Policy \| Falcon Rotating |
| `/terms-and-conditions/` | Terms & Conditions \| Falcon Rotating |

Every page also emits a matching `<meta name="description">`, Open Graph (`og:title/description/url/image/type/site_name/locale`) and Twitter card (`summary_large_image`) — all populated from the same source copy.

---

## E. Wireframes (section order per template)

**Home:** Sticky header → Hero (H1 "Engineering Strength. Delivering Excellence.", lead, dual CTA, hero image) → Company overview (brochure paragraphs) → Services grid (5 cards) → Why-us feature grid → Equipment-rental highlight band → Locations mini-cards (4) → FAQ → CTA band → Footer.

**Service detail:** Page hero + breadcrumb → intro paragraphs → capabilities/checklist (brochure list) → supporting section (equipment types / activities) → related services → FAQ → CTA band.

**Location:** Page hero + breadcrumb → office entity card (legal name, address, phone, email, office tag) → Google Maps embed → services available locally → CTA band.

**Contact / Quote:** Page hero → form (name, company, email, phone, service, message) with front-end validation + demo handler → office contact details → map/links.

**Legal / Blog:** Page hero + breadcrumb → prose column (legal) or post grid with "Coming soon" badges (blog).

Layout system: white-dominant (~70%), 1240px container, generous whitespace, industrial-premium tone, Manrope typeface, subtle `IntersectionObserver` scroll-reveal (disabled under `prefers-reduced-motion` and via `<noscript>`).

---

## F. Internal Linking Plan

- **Header/footer** link every top-level and dropdown destination site-wide (global equity distribution).
- **Home** links out to all 5 services, all 4 locations, contact and quote.
- **Services index** links to each service; **each service** links to 2–3 *related services* + the quote page.
- **Locations index** links to each office; **each office** links to relevant services + quote.
- **CTA band** (every page) links to `/request-a-quote/` and `/contact/`.
- **Breadcrumbs** provide hierarchical up-links on every non-home page (HTML + `BreadcrumbList` schema).
- Anchor text is descriptive and keyword-relevant (e.g. "rotating equipment overhauling"), never "click here".

---

## G. Image Extraction & Optimization Plan

- **Source:** images extracted from the company brochure/reference pack (the committed `falcon website references.zip`). No stock or invented imagery for company-specific content.
- **Format:** all photos converted to **WebP**; logo provided as PNG **and** WebP (light + white variants); favicon as SVG.
- **Filenames:** SEO-descriptive, prefixed `falcon-rotating-` (e.g. `falcon-rotating-steam-turbine-overhaul.webp`, `falcon-rotating-crawler-crane.webp`). 29 optimized images in use.
- **Delivery:** responsive sizing via CSS, `loading="lazy"` on below-the-fold images, hero image `preload` + `fetchpriority="high"`; descriptive `alt` text on every `<img>` (validated — 0 missing).
- **Weight:** total image payload ≈ 2.9 MB across the whole site; individual pages load only what they show.

---

## H. Technical SEO Plan

- **Clean URLs:** folder + `index.html`, trailing slash, root-relative internal paths.
- **Canonical** `<link rel="canonical">` on every page (self-referencing).
- **robots.txt:** allows all, points to `sitemap.xml`.
- **sitemap.xml:** all 18 indexable URLs with `lastmod`; excludes 404.
- **`meta robots`:** `index, follow, max-image-preview:large` on content pages; `noindex` on 404 and the root redirect stub.
- **Single H1** per page (validated). Logical H2/H3 outline.
- **Mobile-first**, responsive, `viewport` meta, 820px nav breakpoint.
- **Performance / Core Web Vitals:** system-lean CSS (one stylesheet), one small vanilla-JS file (no frameworks/libraries), font `preconnect`+`preload`+`display=swap`, lazy images, hero preload → targets fast LCP, ~0 CLS, low INP.
- **Accessibility:** skip-link, ARIA on nav/dropdowns/breadcrumbs, keyboard operable, `prefers-reduced-motion` respected, `<noscript>` reveals all content.
- **Favicon / theme-color / apple-touch-icon** present.

---

## I. Schema / Structured Data Plan (JSON-LD, validated)

| Schema type | Where |
|-------------|-------|
| `GeneralContractor` / Organization (name, logo, slogan, contact, areaServed) | Home + sitewide identity |
| `WebSite` | Home |
| `Service` | Each of the 5 service pages |
| `BreadcrumbList` | Every non-home page |
| `LocalBusiness` (per branch: legal name, address, geo query, phone, email) | Each of the 4 location pages |
| `FAQPage` | Home, service pages, equipment rental (where FAQs exist) |
| `ContactPage` | Contact page |

All JSON-LD is emitted with correct (unescaped) entity handling and passes `json.loads` validation for all 19 pages.

---

## J. Content Plan (grounded in brochure)

- **Taglines** (both authentic from brochure): "Powering Progress. Building Confidence." (front) and "Engineering Strength. Delivering Excellence." (back, used as hero).
- **Company overview:** three brochure paragraphs used verbatim.
- **Services & capability lists:** taken directly from the brochure —
  - *Construction:* civil construction, piping works, industrial & electrical maintenance, equipment installation, steel fabrication & sheet metal, carpentry & finishing, fabrication & erection of stairs/handrails/beams & columns.
  - *Piling:* "Strong Foundations. Built for Performance." + 7 capability points.
  - *Rotating Equipment:* "Precision Maintenance. Reliable Performance." + 11 equipment types (steam turbine, centrifugal/reciprocating pumps & compressors, agitator, extruder, rotary feeder, gearbox, expander, etc.).
  - *Excavation:* "Precision in Every Dig. Strength in Every Fill." + 8 capability points.
  - *Equipment Rental:* "Power Your Projects with Confidence." + fleet list (welding machines, generators, automobiles, forklifts, earth-moving equipment, cranes, crawler cranes, boom trucks, dump trucks, loaders, excavators, air compressors, tower lights & dewatering pumps); brochure states a fleet of "more than hundreds of equipments".
  - *Vision & Mission* bullets used on About.
- **Offices:** four real offices with brochure legal names, addresses, phones, emails; Yanbu marked Head Office.
- **Blog:** launched empty and honest — posts show a "Coming soon" badge (no fabricated articles).

---

## K. [CLIENT TO CONFIRM] List

Items intentionally left for the client to supply/verify before launch (site is otherwise complete):

1. **Primary domain** — brochure shows both `falconrotating.com` and `arabianfalconsa.com`; confirm the canonical one (site currently assumes `falconrotating.com`).
2. **Privacy Policy** — placeholder legal framework; needs the client's finalised legal wording / data-handling specifics. *(marked in page)*
3. **Terms & Conditions** — same; needs finalised legal wording. *(marked in page)*
4. **Contact form endpoint** — form is a validated front-end demo; needs connection to the client's email/CRM to receive submissions. *(noted on Contact & Quote)*
5. **Business hours** — not in brochure; omitted rather than invented.
6. **Registration / licence numbers, VAT/TRN** — not in brochure; omit or supply.
7. **Social media profiles** — not in brochure; add to footer + Organization `sameAs` when provided.
8. **Any certifications / memberships** — none claimed (would need proof before display).
9. **Exact map pins** — embeds use address/landmark queries; confirm precise pin per office if desired.

*(10 `[CLIENT TO CONFIRM]` markers currently sit in the four form/legal pages.)*

---

## L. Accessibility & Performance Summary

- Skip-to-content link; semantic landmarks; ARIA on interactive nav.
- Keyboard-operable menus; visible focus; `prefers-reduced-motion` honoured; `<noscript>` content fallback (all `.reveal` content visible without JS).
- Colour system meets the brand palette with dark-on-light contrast for body text.
- No render-blocking third-party scripts; no tracking added (client to add analytics/consent as needed).

---

## M. SEO Report / Pre-launch Checklist

**Automated validation (all 19 pages): ✓ PASS**
- Single `<h1>` per page · valid JSON-LD (parses) · every `<img>` has `alt` · all internal links resolve · all referenced assets exist · no HTML-entity double-escaping in titles/meta/schema.

**Ready at launch**
- ✅ Unique titles + meta descriptions (18 pages) · ✅ canonical tags · ✅ OG + Twitter cards · ✅ robots.txt + sitemap.xml · ✅ breadcrumbs (HTML + schema) · ✅ Organization/Service/LocalBusiness/FAQ/Contact schema · ✅ mobile responsive · ✅ WebP + lazy-load + hero preload · ✅ 404 page · ✅ accessibility baseline.

**Client actions before go-live** (see Section K)
1. Confirm canonical domain and deploy `Falcon/site/` as the web root.
2. Wire the contact/quote form to a real endpoint.
3. Replace legal placeholders with finalised Privacy & Terms text.
4. Add analytics + cookie/consent per jurisdiction (UAE/KSA).
5. Verify property in Google Search Console & Bing Webmaster Tools; submit `sitemap.xml`.
6. Provide social profiles / any licences to complete footer + `sameAs`.

**Explicitly NOT done (per brief / integrity):**
- ❌ No ranking, first-page or #1 promises. ❌ No fabricated search volume / difficulty / CPC / competition / positions. ❌ No fake testimonials, reviews, ratings, client logos, case studies, statistics, awards or certifications.

---

*Deliverable folders:* `Falcon/site/` (deployable site) · `Falcon/build/` (Python generator: `_common.py`, `pages_core.py`, `pages_more.py`, `build_all.py`) · `Falcon/index.html` (redirect stub to `site/`).

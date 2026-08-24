# Crossline — Static Website

A production-ready, fully static conversion of the Crossline WordPress site,
built with **HTML5, CSS3 and vanilla JavaScript only** — no frameworks, no
build step, no server-side code. It can be uploaded as-is to any static host
(Hostinger, cPanel/Apache, Nginx, Vercel, Netlify, GitHub Pages, …).

---

## 1. Project overview

Five pages reproduce the original site with high visual and functional
fidelity, using the supplied Crossline image assets and the corrected
production contact details:

| Page          | File            | Highlights                                                   |
|---------------|-----------------|--------------------------------------------------------------|
| Home          | `index.html`    | Hero, feature cards, about, CTA, services, clients, why-us, HVAC products, testimonials, FAQ |
| About Us      | `about.html`    | Company intro, vision/mission, stats counters, clients, why-us, testimonials |
| Services      | `services.html` | 6 services, CTA, why-us, HVAC products, factory process      |
| Products      | `products.html` | HVAC product range, clients, why-us, CTA, factory process, testimonials |
| Contact Us    | `contact.html`  | Contact info card, validated form, responsive Google Map     |

---

## 2. Folder structure

```
crosslinesa/
├── index.html            # Home
├── about.html            # About Us
├── services.html         # Services
├── products.html         # Products
├── contact.html          # Contact Us
├── README.md
│
├── sitemap.xml           # SEO — list of all pages
├── robots.txt            # SEO — crawler rules + sitemap link
│
├── contact-handler.php   # Form → email (PHPMailer / SMTP)
├── config.example.php    # SMTP settings sample (copy to config.php)
├── composer.json/.lock   # PHPMailer dependency
├── vendor/               # PHPMailer library (bundled for drop-in hosting)
├── .htaccess             # Protects config/vendor on Apache/Hostinger
│
├── assets/
│   └── images/           # All supplied Crossline .webp assets
│
├── css/
│   ├── style.css         # Design tokens, reset, base, top bar, header, page hero, footer
│   ├── components.css     # Buttons, cards, sliders, accordion, forms, sections
│   └── responsive.css    # Media queries + prefers-reduced-motion
│
└── js/
    ├── navigation.js     # Mobile menu, sticky header, back-to-top
    ├── animations.js     # Scroll reveal, animated counters, FAQ accordion
    ├── forms.js          # Client-side form validation (see integration note)
    └── main.js           # Small shared helpers (dynamic footer year)
```

---

## 3. How to run locally

No build tooling is required. Because the pages load assets by relative
path, open them through a local web server (opening the file directly with
`file://` also works, but a server matches production more closely):

```bash
cd crosslinesa
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Any equivalent static server works (`npx serve`, `php -S localhost:8000`, the
VS Code “Live Server” extension, etc.).

---

## 4. How to deploy

Upload the entire `crosslinesa/` folder to your host’s web root.

- **Hostinger / cPanel / Apache / Nginx** – copy the files into `public_html`
  (or the server root). No `.htaccess` or config is required.
- **Netlify / Vercel** – drag-and-drop the folder, or point the project at
  this directory. No build command; publish directory = the folder itself.
- **GitHub Pages** – enable Pages for the branch/folder containing these files.

All internal links use relative `.html` paths, so the site works from a
sub-directory or a domain root without changes.

---

## 5. Where things live

- **Images** – `assets/images/` (supplied Crossline `.webp` files, used as-is).
- **Styles** – `css/` (tokens live at the top of `style.css` under `:root`).
- **Scripts** – `js/` (all loaded with `defer`).

---

## 6. How to change the contact information

The production contact details appear in the **top bar**, **footer** (every
page) and the **contact page**. To update them, search-and-replace these
values across the `.html` files:

| What          | Value                                                                                  |
|---------------|----------------------------------------------------------------------------------------|
| Phone         | `+966 59 398 1232` (links use `tel:+966593981232`)                                      |
| Email         | `info@crosslinesa.com` (links use `mailto:info@crosslinesa.com`)                        |
| Office address| `Building No. 8453, Jafar Ibn Abi Talib Street, Al Dana District, Al Jubail – 35514 KSA`|

The footer copyright year updates automatically via `js/main.js`
(`<span data-year>`).

---

## 7. How to add a new service

1. Open `services.html` and copy an existing `<article class="serve-item">`
   block inside the left or right column of `.services-columns`.
2. Replace the inline `<svg>` icon, the `<h3>` title and the `<p>` description.
3. (Optional) add the same title to the **Services** column of the footer on
   every page (`<ul class="footer__links">`).

---

## 8. How to add a new product

1. Open `products.html` (and/or `services.html` / `index.html`, which share the
   grid) and copy an existing `<article class="product-card">` inside
   `.products-grid`.
2. Point the `<img>` at an image in `assets/images/` with a descriptive `alt`.
3. Fill in the `<h3>` and either a `<ul>` of bullet points or a `<p>` summary.

---

## 9. Contact form (live email — PHP + PHPMailer / SMTP)

The contact form (`contact.html`) and the FAQ “ask a question” form
(`index.html`) submit to **`contact-handler.php`**, which emails the enquiry
to `info@crosslinesa.com` over authenticated SMTP using
[PHPMailer](https://github.com/PHPMailer/PHPMailer) (bundled in `vendor/`).
The front-end (`js/forms.js`) validates every field, POSTs the data as JSON,
and shows the success message **only on a real 2xx response** from the server
— no false “message sent” confirmations.

This needs PHP (Hostinger and any cPanel/Apache host have it). On a purely
static host (Netlify/Vercel/GitHub Pages) the PHP file won’t run — use a
form service there instead.

### One-time setup

1. Upload the whole `crosslinesa/` folder to `public_html` (it already
   contains `vendor/` with PHPMailer, so no Composer step is required on the
   server).
2. Copy the sample config and fill in the SMTP details:
   ```bash
   cp config.example.php config.php
   ```
   `config.php` is **git-ignored** so credentials never enter the repo.
3. Edit `config.php`. Two options, both explained in the file:

   | | **Hostinger mailbox (recommended)** | **Gmail / Workspace** |
   |---|---|---|
   | Host | `smtp.hostinger.com` | `smtp.gmail.com` |
   | Port / secure | `465` / `ssl` | `587` / `tls` |
   | Username | full mailbox, e.g. `info@crosslinesa.com` | your Gmail address |
   | Password | mailbox password | a Google **App Password** |
   | `SMTP_FROM` | same mailbox (on-domain) | the same Gmail address |

   The client’s mailbox password is only needed for **Option A**. For
   **Option B** you never touch the client’s password — you authenticate as
   the sending Gmail account; the enquiry still arrives at `info@crosslinesa.com`
   (set as `MAIL_TO`).

### Staying out of spam

- **Use an on-domain From.** Because `crosslinesa.com` is on Hostinger,
  Option A sends from `…@crosslinesa.com`, which Hostinger auto-signs with
  **SPF + DKIM** — the single biggest anti-spam factor. With Gmail (Option B),
  keep `SMTP_FROM` = the Gmail address (aligned with what you authenticate as);
  don’t forge `…@crosslinesa.com` as the From or it fails alignment.
- Confirm DNS in hPanel → Emails → your domain has **SPF** and **DKIM**
  records (Hostinger adds these automatically); add a **DMARC** record
  (`v=DMARC1; p=none; rua=mailto:info@crosslinesa.com`) to round it out.
- The visitor’s address is set as **Reply-To**, so hitting “Reply” answers the
  customer directly while the message itself is sent from your own domain.
- A hidden **honeypot** field and server-side validation drop automated spam.

### Local test

```bash
cp config.example.php config.php   # fill in real SMTP to actually send
php -S localhost:8000
# open http://localhost:8000/contact.html and submit
```

---

## 10. Accessibility, SEO & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`),
  one `<h1>` per page, logical heading order, skip link, visible focus states,
  keyboard-operable menu and accordion (`aria-expanded` / `aria-controls`).
- Per-page `<title>`, `meta description`, `canonical`, `robots`, Open Graph and
  Twitter card tags (with absolute image URLs); descriptive `alt` text on
  meaningful images.
- **Structured data (JSON-LD):** a `LocalBusiness` block on every page (name,
  logo, phone, email, address, geo, area served); `WebSite` + `FAQPage` on the
  home page; `BreadcrumbList` on the inner pages. Test with Google’s
  [Rich Results Test](https://search.google.com/test/rich-results).
- **`sitemap.xml`** (all 5 pages) and **`robots.txt`** (references the sitemap,
  blocks server-side/dependency files). After going live, submit the sitemap in
  [Google Search Console](https://search.google.com/search-console).
- **Google Analytics 4** (`gtag.js`, ID `G-P4QVT02NWB`) is loaded in the
  `<head>` of every page. To change or remove it, edit the `<!-- Google tag -->`
  block near the top of each `.html` file.
- Lazy-loaded map iframe, deferred scripts, CSS custom properties, no external
  JS libraries. Fonts: Google Fonts **Poppins** (swap for a self-hosted font if
  you prefer zero external requests).
- Animations respect `@media (prefers-reduced-motion: reduce)`.

> **Note:** `sitemap.xml`, `robots.txt`, the canonical/OG URLs and the JSON-LD
> all use the domain `https://crosslinesa.com/`. If the site is deployed under a
> different domain, search-and-replace that host across the `.html` files,
> `sitemap.xml` and `robots.txt`.

---

## 11. Assumptions made during conversion

- **Contact details** – the live staging site showed placeholder values
  (`info@lightskyblue-gull-443771.hostingersite.com`, `0761-8523-398`,
  `info@halloulr.com`, `www.domainsite.com`). These were replaced everywhere
  with the supplied production details. The website is shown as
  `crosslinesa.com` (the link points to `https://www.crosslinesa.com`).
- **Section headings** – a few headings on the original home page are revealed
  by an animation and did not appear in the reference screenshots. They were
  reconstructed from the identical sections on the About/Services pages
  (e.g. *“Building Trust Through Innovation and Excellence”*, *“Why Partner
  with Crossline?”*).
- **Products hero** – the original staging hero for this page was labelled
  “Projects”; it is presented here as **Products** to match the navigation
  item and page purpose.
- **FAQ answers** – only the first FAQ answer was expanded in the reference.
  The remaining answers were written to be consistent with the site’s stated
  services and the production contact details.
- **Icons** – small UI/section icons are lightweight inline SVGs matching the
  original line-icon style (no icon library is loaded). All photographic and
  logo assets are the supplied Crossline files, used unmodified.
- **Decorative blueprint background** – the faint architectural line pattern
  behind some sections is reproduced with an inline SVG (it was not supplied as
  an asset).
- **`pngegg.webp`** from the ZIP was a corrupt/undecodable file and is not used.
- **Favicon** – the browser-tab icon (`assets/images/favicon.png`) is the Crossline
  monogram, cropped from the supplied wide logo.
- **Layout width** – content uses a `1200px` container (`1320px` on the few
  wide sections), matching the original site’s proportions.
- **Parallax** – the “From Concept to Completion” banner uses a fixed background so
  the image drifts on scroll; it falls back to a normal scrolling background on
  touch devices and when `prefers-reduced-motion` is set.
- **Client logos** – the logo strip is identical on every page it appears (Home,
  About, Products), shown in full colour inside a bordered marquee.
```

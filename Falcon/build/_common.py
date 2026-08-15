# -*- coding: utf-8 -*-
"""Shared components, data and helpers for the Falcon Rotating site generator."""
import json, os, html
from urllib.parse import quote_plus

SITE = "https://falconrotating.com"
OUT = os.path.join(os.path.dirname(__file__), "..", "site")
COMPANY = "Falcon Rotating Contracting & General Maintenance L.L.C."
COMPANY_SHORT = "Falcon Rotating"
PRIMARY_PHONE = "+971 56 393 1684"
PRIMARY_PHONE_HREF = "+971563931684"
PRIMARY_EMAIL = "info@falconrotating.com"

# ---------------------------------------------------------------- Branch data
BRANCHES = [
    {
        "slug": "dubai", "city": "Dubai", "country": "United Arab Emirates",
        "cc": "AE", "region": "Dubai", "tag": "Branch Office",
        "legal": "Falcon Rotating Contracting L.L.C.",
        "phone": "+971 56 393 1684", "phone_href": "+971563931684",
        "email": "info@falconrotating.com",
        "address": "5th Floor, HBL Habib Bank Limited, Al Abbas Building 2, Bur Dubai, Near Metro Station of Sharaf DG and Burjuman Station",
        "locality": "Bur Dubai, Dubai",
        "map_q": "Burjuman Metro Station, Bur Dubai, Dubai, UAE",
    },
    {
        "slug": "abu-dhabi", "city": "Abu Dhabi", "country": "United Arab Emirates",
        "cc": "AE", "region": "Abu Dhabi", "tag": "Branch Office",
        "legal": "Falcon Rotating Maintenance & General Contracting L.L.C.",
        "phone": "+971 50 676 2127", "phone_href": "+971506762127",
        "email": "infouae@arabianfalconsa.com",
        "address": "Al Sawari Tower-B, Office C13, Sector W8, Al Khalidiya, Abu Dhabi",
        "locality": "Al Khalidiya, Abu Dhabi",
        "map_q": "Al Khalidiya, Abu Dhabi, UAE",
    },
    {
        "slug": "yanbu", "city": "Yanbu", "country": "Saudi Arabia",
        "cc": "SA", "region": "Al Madinah", "tag": "Head Office",
        "legal": "Arabian Falcon Contracting Co.",
        "phone": "+966 14 322 7866", "phone_href": "+966143227866",
        "email": "info@arabianfalconsa.com",
        "address": "P.O. Box 3742, Al Saaydah District, Yanbu Al Bahar, Kingdom of Saudi Arabia",
        "locality": "Yanbu Al Bahar",
        "map_q": "Yanbu Al Bahar, Saudi Arabia",
    },
    {
        "slug": "al-jubail", "city": "Al Jubail", "country": "Saudi Arabia",
        "cc": "SA", "region": "Eastern Province", "tag": "Branch Office",
        "legal": "Arabian Falcon Contracting Co.",
        "phone": "+966 13 361 7096", "phone_href": "+966133617096",
        "email": "jubail@arabianfalconsa.com",
        "address": "Abubacker Siddik Street, Al Jubail, Kingdom of Saudi Arabia",
        "locality": "Al Jubail",
        "map_q": "Abubacker Siddik Street, Al Jubail, Saudi Arabia",
    },
]
BR = {b["slug"]: b for b in BRANCHES}

SERVICES = [
    ("construction-contracting", "Construction Contracting",
     "Civil construction, industrial maintenance, piping, electrical and steel fabrication.", "/services/construction-contracting/"),
    ("piling", "Piling Work",
     "Reliable piling and foundation works engineered for structural stability.", "/services/piling/"),
    ("rotating-equipment", "Rotating Equipment",
     "Overhauling, maintenance, inspection and repair of critical rotating machinery.", "/services/rotating-equipment/"),
    ("excavation-backfilling", "Excavation & Backfilling",
     "Earthworks, trenching, backfilling and compaction for stable ground preparation.", "/services/excavation-backfilling/"),
    ("equipment-rental", "Equipment Rental",
     "Heavy construction machinery and vehicles available on a flexible rental basis.", "/equipment-rental/"),
]

# ---------------------------------------------------------------- Icons
def _svg(inner, vb="0 0 24 24", cls=""):
    c = f' class="{cls}"' if cls else ""
    return (f'<svg{c} viewBox="{vb}" fill="none" stroke="currentColor" '
            f'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{inner}</svg>')

ICONS = {
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "check": '<path d="M20 6L9 17l-5-5"/>',
    "phone": '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    "pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    "globe": '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "building": '<path d="M4 21h16M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11"/><path d="M9 8h1M9 12h1M9 16h1"/>',
    "piling": '<path d="M12 2v20M8 6l4-3 4 3M6 22h12M9 22l1-8h4l1 8"/>',
    "gear": '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    "dig": '<path d="M3 20h18M4 20l3-6 5 2M13 15l6-9 2 1-5 9M13 15l-1 5"/>',
    "truck": '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    "shield": '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
    "badge": '<circle cx="12" cy="9" r="6"/><path d="m9 14-1 8 4-2 4 2-1-8"/>',
    "users": '<circle cx="9" cy="8" r="3.2"/><path d="M2 20a7 7 0 0 1 14 0M16 5.5a3.2 3.2 0 0 1 0 6M22 20a7 7 0 0 0-5-6.7"/>',
    "target": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    "tool": '<path d="M14.5 5.5a3.7 3.7 0 0 0 4.9 4.9L21 12l-9 9-3-3 9-9-1.6-1.6a3.7 3.7 0 0 0-1.9-4.9z"/>',
    "layers": '<path d="m12 3 9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5"/>',
    "clipboard": '<rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h6"/>',
    "bolt": '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    "wrench": '<path d="M14.5 5.5a3.7 3.7 0 0 0 4.9 4.9L21 12l-9 9-3-3 9-9-1.6-1.6a3.7 3.7 0 0 0-1.9-4.9z"/>',
    "compass": '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z"/>',
    "flag": '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    "leaf": '<path d="M11 20a8 8 0 0 1 8-8c0-5-8-9-8-9M11 20C6 20 4 15 4 12c3 0 6 1 7 3"/>',
    "crane": '<path d="M4 21h16M6 21V4l10 3M6 7h12M12 8v5M9 13h6"/>',
    "cube": '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM12 12v9M4 7.5 12 12l8-4.5"/>',
    "route": '<circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/>',
}
def icon(name, cls=""):
    return _svg(ICONS[name], cls=cls)

def maps_iframe(query, title):
    q = quote_plus(query)
    return (f'<iframe class="map-embed" title="{html.escape(title)}" loading="lazy" '
            f'referrerpolicy="no-referrer-when-downgrade" '
            f'src="https://maps.google.com/maps?q={q}&z=14&output=embed"></iframe>')

# ---------------------------------------------------------------- HEAD
def head(title, desc, path, *, og_img="/assets/images/falcon-rotating-steam-turbine-overhaul.webp",
         preload_hero=None, jsonld=None):
    canonical = SITE + path
    og_abs = SITE + og_img
    preload = ""
    if preload_hero:
        preload = f'\n  <link rel="preload" as="image" href="{preload_hero}" fetchpriority="high">'
    ld = ""
    if jsonld:
        for block in jsonld:
            ld += '\n  <script type="application/ld+json">' + json.dumps(block, ensure_ascii=False) + '</script>'
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(desc)}">
  <link rel="canonical" href="{canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#1F4FA3">
  <meta name="author" content="{COMPANY}">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="{COMPANY_SHORT}">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(desc)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{og_abs}">
  <meta property="og:locale" content="en_US">
  <!-- Twitter/X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(title)}">
  <meta name="twitter:description" content="{html.escape(desc)}">
  <meta name="twitter:image" content="{og_abs}">
  <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/images/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/assets/css/styles.css">{preload}{ld}
  <noscript><style>.reveal{{opacity:1 !important;transform:none !important}}</style></noscript>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
"""

# ---------------------------------------------------------------- HEADER
def header(active=""):
    def cur(key):
        return ' aria-current="page"' if active == key else ""
    svc_items = "".join(
        f'<li><a href="{url}">{name}</a></li>'
        for slug, name, desc, url in SERVICES
    )
    loc_items = "".join(
        f'<li><a href="/locations/{b["slug"]}/">{b["city"]}</a></li>'
        for b in BRANCHES
    )
    return f"""<header class="site-header">
  <nav class="container nav" aria-label="Primary">
    <a class="brand" href="/" aria-label="{COMPANY_SHORT} home">
      <img src="/assets/images/falcon-rotating-logo.webp" alt="{COMPANY_SHORT} logo" width="900" height="605">
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a class="nav-link" href="/"{cur('home')}>Home</a></li>
      <li><a class="nav-link" href="/about/"{cur('about')}>About</a></li>
      <li class="has-dropdown" data-open="false">
        <button class="nav-link" aria-expanded="false" aria-haspopup="true">Services {icon('arrow','caret')}</button>
        <ul class="dropdown" aria-label="Services">{svc_items}</ul>
      </li>
      <li><a class="nav-link" href="/equipment-rental/"{cur('equipment-rental')}>Equipment Rental</a></li>
      <li class="has-dropdown" data-open="false">
        <button class="nav-link" aria-expanded="false" aria-haspopup="true">Locations {icon('arrow','caret')}</button>
        <ul class="dropdown" aria-label="Locations">{loc_items}</ul>
      </li>
      <li><a class="nav-link" href="/contact/"{cur('contact')}>Contact</a></li>
      <li class="nav-mobile-cta"><a class="btn" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a></li>
    </ul>
    <div class="nav-cta">
      <a class="btn btn--quote" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a>
      <button class="nav-toggle btn--menu" aria-label="Open menu" aria-controls="nav-links" aria-expanded="false"><span></span></button>
    </div>
  </nav>
</header>
"""

# caret uses .caret sizing; arrow icon fine.

# ---------------------------------------------------------------- CRUMBS
def crumbs(items):
    """items: list of (label, url|None). Last is current."""
    lis = []
    for i, (label, url) in enumerate(items):
        if url and i < len(items) - 1:
            lis.append(f'<li><a href="{url}">{html.escape(label)}</a></li>')
        else:
            lis.append(f'<li><span aria-current="page">{html.escape(label)}</span></li>')
    return f'<nav class="crumbs" aria-label="Breadcrumb"><ol>{"".join(lis)}</ol></nav>'

def breadcrumb_ld(items):
    el = []
    for i, (label, url) in enumerate(items):
        item = {"@type": "ListItem", "position": i + 1, "name": label}
        if url:
            item["item"] = SITE + url
        el.append(item)
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": el}

# ---------------------------------------------------------------- FOOTER
def footer():
    svc_links = "".join(f'<li><a href="{url}">{name}</a></li>' for _, name, _, url in SERVICES)
    loc_links = "".join(f'<li><a href="/locations/{b["slug"]}/">{b["city"]}, {b["country"]}</a></li>' for b in BRANCHES)
    return f"""<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="/assets/images/falcon-rotating-logo-white.webp" alt="{COMPANY_SHORT} logo" width="900" height="605" loading="lazy">
        <p>Your dependable partner for construction, rotating equipment overhauling, piling, excavation and equipment rental services across the UAE and Saudi Arabia.</p>
        <a class="btn btn--ghost-white" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>{svc_links}</ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/services/">All Services</a></li>
          <li><a href="/equipment-rental/">Equipment Rental</a></li>
          <li><a href="/locations/">Locations</a></li>
          <li><a href="/blog/">Insights</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Get in Touch</h4>
        <ul class="footer-contact">
          <li>{icon('phone')}<a href="tel:{PRIMARY_PHONE_HREF}">{PRIMARY_PHONE}</a></li>
          <li>{icon('mail')}<a href="mailto:{PRIMARY_EMAIL}">{PRIMARY_EMAIL}</a></li>
          <li>{icon('globe')}<a href="https://arabianfalconsa.com" rel="noopener">arabianfalconsa.com</a></li>
          <li>{icon('pin')}<span>Dubai · Abu Dhabi · Yanbu · Al Jubail</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-row">
        <p>&copy; <span data-year>2026</span> {COMPANY}. All rights reserved.</p>
        <div class="legal">
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms-and-conditions/">Terms &amp; Conditions</a>
          <a href="/request-a-quote/">Request a Quote</a>
        </div>
      </div>
      <div class="footer-credit-row">
        <span class="footer-credit">Developed by <a href="https://infindigital.in/" target="_blank" rel="noopener">In/Fin</a></span>
      </div>
    </div>
  </div>
</footer>
<a class="wa-float" href="https://wa.me/{PRIMARY_PHONE_HREF.lstrip('+')}" target="_blank" rel="noopener" aria-label="Chat with {COMPANY_SHORT} on WhatsApp">
  <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" aria-hidden="true"><path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.593 4.463 1.72 6.406L3.2 28.8l6.55-1.716a12.74 12.74 0 0 0 6.25 1.632h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.716-12.804-12.716zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.017 1.053 1.072-3.916-.252-.402a10.56 10.56 0 0 1-1.62-5.65c0-5.867 4.774-10.64 10.646-10.64 2.843 0 5.514 1.108 7.524 3.12a10.56 10.56 0 0 1 3.116 7.526c0 5.867-4.773 10.62-10.634 10.62zm5.834-7.958c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.95-.848-1.592-1.895-1.779-2.215-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.987-2.375-.26-.624-.524-.54-.72-.55l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.669 0 1.574 1.146 3.095 1.306 3.308.16.213 2.253 3.44 5.46 4.826.763.33 1.358.526 1.822.674.766.243 1.463.209 2.014.127.614-.092 1.892-.773 2.159-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z"/></svg>
</a>
<script src="/assets/js/main.js" defer></script>
</body>
</html>
"""

# ---------------------------------------------------------------- Reusable blocks
def cta_band(heading, text, primary=("Request a Quote", "/request-a-quote/"),
             secondary=("Contact Our Team", "/contact/")):
    return f"""<section class="cta-band">
  <div class="container cta-band__inner">
    <div class="reveal">
      <h2>{heading}</h2>
      <p>{text}</p>
    </div>
    <div class="btn-row reveal" data-d="1">
      <a class="btn btn--white btn--lg" href="{primary[1]}">{primary[0]} {icon('arrow','ar')}</a>
      <a class="btn btn--ghost-white btn--lg" href="{secondary[1]}">{secondary[0]}</a>
    </div>
  </div>
</section>
"""

def faq_block(items, heading="Frequently Asked Questions",
              eyebrow="FAQ", intro=None):
    rows = ""
    for q, a in items:
        ap = "".join(f"<p>{p}</p>" for p in a)
        rows += f"""<details><summary>{q}</summary><div class="faq__a">{ap}</div></details>"""
    intro_html = f'<p class="lead mt-s">{intro}</p>' if intro else ""
    return f"""<section class="section">
  <div class="container narrow">
    <div class="section-head reveal">
      <p class="eyebrow">{eyebrow}</p>
      <h2>{heading}</h2>{intro_html}
    </div>
    <div class="faq reveal">{rows}</div>
  </div>
</section>
"""

def faq_ld(items):
    return {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": " ".join(a)}}
            for q, a in items
        ]
    }

def write(path, content):
    """path like '/about/' -> site/about/index.html ; '/' -> site/index.html"""
    if path == "/":
        fp = os.path.join(OUT, "index.html")
    else:
        fp = os.path.join(OUT, path.strip("/"), "index.html")
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)
    return fp

# ---------------------------------------------------------------- Schema helpers
def org_ld():
    return {
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        "@id": SITE + "/#organization",
        "name": COMPANY,
        "alternateName": COMPANY_SHORT,
        "url": SITE + "/",
        "logo": SITE + "/assets/images/falcon-rotating-logo.png",
        "image": SITE + "/assets/images/falcon-rotating-steam-turbine-overhaul.webp",
        "description": ("Engineering and contracting company providing construction, "
                        "rotating equipment overhauling and maintenance, piling, excavation "
                        "and backfilling, and heavy equipment rental across the UAE and Saudi Arabia."),
        "slogan": "Engineering Strength. Delivering Excellence.",
        "areaServed": [{"@type": "Country", "name": "United Arab Emirates"},
                       {"@type": "Country", "name": "Saudi Arabia"}],
        "contactPoint": [
            {"@type": "ContactPoint", "telephone": b["phone"], "email": b["email"],
             "contactType": "sales", "areaServed": b["cc"], "availableLanguage": ["en", "ar"]}
            for b in BRANCHES
        ],
        "address": [
            {"@type": "PostalAddress", "streetAddress": b["address"],
             "addressLocality": b["city"], "addressCountry": b["cc"]}
            for b in BRANCHES
        ],
    }

def website_ld():
    return {
        "@context": "https://schema.org", "@type": "WebSite",
        "@id": SITE + "/#website", "url": SITE + "/",
        "name": COMPANY_SHORT, "publisher": {"@id": SITE + "/#organization"},
        "inLanguage": "en",
    }

def service_ld(name, desc, path, area="United Arab Emirates"):
    return {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": name, "name": f"{name} | {COMPANY_SHORT}",
        "provider": {"@id": SITE + "/#organization"},
        "areaServed": [{"@type": "Country", "name": "United Arab Emirates"},
                       {"@type": "Country", "name": "Saudi Arabia"}],
        "url": SITE + path, "description": desc,
    }

def localbusiness_ld(b):
    return {
        "@context": "https://schema.org", "@type": "GeneralContractor",
        "@id": SITE + f"/locations/{b['slug']}/#business",
        "name": b["legal"], "parentOrganization": {"@id": SITE + "/#organization"},
        "url": SITE + f"/locations/{b['slug']}/",
        "image": SITE + "/assets/images/falcon-rotating-construction-contracting.webp",
        "telephone": b["phone"], "email": b["email"],
        "address": {"@type": "PostalAddress", "streetAddress": b["address"],
                    "addressLocality": b["city"], "addressRegion": b["region"],
                    "addressCountry": b["cc"]},
        "areaServed": {"@type": "City", "name": b["city"]},
    }

# -*- coding: utf-8 -*-
"""Nearprint static site generator.

Reads data.py (content + SEO) and img_manifest.json (image dimensions) and
writes 13 static HTML pages plus robots.txt, sitemap.xml and site.webmanifest
into the nearprint/ folder. Output is pure static HTML, class names match
assets/css/styles.css exactly.
"""
import os, sys, json, html, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)                 # nearprint/
sys.path.insert(0, HERE)
import data                                  # noqa: E402
from icons import icon                       # noqa: E402

with open(os.path.join(HERE, "img_manifest.json")) as fh:
    MANIFEST = json.load(fh)

S = data.SITE
YEAR = 2026

# icon per service key (mega menu, cards, page hero)
SVC_ICON = {
    "business-stationery": "stationery",
    "marketing": "megaphone",
    "signage": "signage",
    "branding": "branding",
    "stickers-labels": "sticker",
    "packaging": "box",
    "workwear": "shirt",
    "corporate-gifts": "gift",
}

# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------
def esc(s):
    return html.escape(str(s), quote=True)


def local(slug):
    """Relative href for on-disk browsing."""
    if slug == "":
        return "index.html"
    return "%s.html" % slug


def canon(slug):
    """Absolute clean URL for canonical / sitemap / OG."""
    if slug == "":
        return S["domain"] + "/"
    return "%s/%s" % (S["domain"], slug)


def dims(path):
    return MANIFEST.get(path)


def img(path, alt, cls="", eager=False, sizes=None, srcset=None, extra=""):
    wh = dims(path)
    dim = ' width="%d" height="%d"' % (wh[0], wh[1]) if wh else ""
    src = path.lstrip("/")
    cls_a = ' class="%s"' % cls if cls else ""
    load = ' fetchpriority="high"' if eager else ' loading="lazy" decoding="async"'
    ss = ' srcset="%s"' % srcset if srcset else ""
    sz = ' sizes="%s"' % sizes if sizes else ""
    return ('<img src="%s"%s%s%s alt="%s"%s%s%s>'
            % (src, ss, sz, cls_a, esc(alt), dim, load, extra))


def product_slugs(svc):
    """Replicate optimize_images dedup so filenames line up."""
    out = []
    seen = {}
    for g in svc["groups"]:
        gp = []
        for name, _src in g["products"]:
            slug = data.slugify(name)
            if slug in seen:
                seen[slug] += 1
                slug = "%s-%d" % (slug, seen[slug])
            else:
                seen[slug] = 1
            gp.append((name, "/assets/img/%s/%s.webp" % (svc["folder"], slug)))
        out.append((g["title"], gp))
    return out


def client_paths():
    out = []
    for s in data.CLIENT_LOGOS:
        idx = s.split("_img")[1].split(".")[0]
        out.append("/assets/img/clients/client-%s.webp" % idx)
    return out


# ---------------------------------------------------------------------------
# partials
# ---------------------------------------------------------------------------
NAV_ITEMS = [
    ("Home", ""),
    ("About", "about"),
    ("Clients", "clients"),
    ("Contact", "contact"),
]


def head(page):
    """page: dict with title, desc, slug, og_type, jsonld(list of dicts)."""
    slug = page["slug"]
    url = canon(slug)
    og_img = S["domain"] + S["og_image"]
    robots = "noindex, follow" if slug == "404" else "index, follow"
    blocks = "\n".join(
        '<script type="application/ld+json">%s</script>'
        % json.dumps(b, ensure_ascii=False, separators=(",", ":"))
        for b in page.get("jsonld", [])
    )
    return """<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<meta name="robots" content="%(robots)s">
<link rel="canonical" href="%(url)s">
<meta name="theme-color" content="#17232F">
<meta name="author" content="Nearprint">
<meta property="og:type" content="%(ogtype)s">
<meta property="og:site_name" content="Nearprint">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:url" content="%(url)s">
<meta property="og:image" content="%(ogimg)s">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_AE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(title)s">
<meta name="twitter:description" content="%(desc)s">
<meta name="twitter:image" content="%(ogimg)s">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/img/brand/favicon-16.png">
<link rel="apple-touch-icon" href="assets/img/brand/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap">
<link rel="stylesheet" href="assets/css/styles.css">
%(blocks)s""" % {
        "title": esc(page["title"]), "desc": esc(page["desc"]),
        "url": esc(url), "robots": robots, "ogtype": page.get("og_type", "website"),
        "ogimg": esc(og_img), "blocks": blocks,
    }


def mega():
    links = "".join(
        '<a class="mega__link" href="%s">%s</a>'
        % (local(svc["slug"]), esc(svc["short"]))
        for svc in data.SERVICES
    )
    return (
        '<div class="mega" role="menu" aria-label="Services">'
        '<div class="mega__list">%s</div></div>' % links
    )


def header(active):
    links = []
    # Home
    links.append(nav_link("Home", "", active))
    links.append(nav_link("About", "about", active))
    # Services mega
    svc_active = active in [s["slug"] for s in data.SERVICES]
    ac = ' aria-current="page"' if svc_active else ""
    links.append(
        '<li class="nav__item nav__item--mega">'
        '<a class="nav__link" href="%s"%s aria-haspopup="true">Services '
        '<span class="chev">%s</span></a>%s</li>'
        % (local("business-stationery-printing"), ac, icon("chevron-down"), mega())
    )
    links.append(nav_link("Clients", "clients", active))
    links.append(nav_link("Contact", "contact", active))
    return (
        '<header class="site-header" id="siteHeader">'
        '<div class="site-header__inner">'
        '%s'
        '<nav class="nav" aria-label="Primary">'
        '<ul class="nav__list">%s</ul>'
        '<a class="btn btn--accent btn--sm" href="%s">Get a Quote</a>'
        '</nav>'
        '<button class="nav-toggle" id="navToggle" aria-label="Open menu" '
        'aria-expanded="false" aria-controls="mobileNav"><span></span></button>'
        '</div></header>'
        % (brand_mark(True), "".join(links), local("contact"))
    )


def nav_link(label, slug, active):
    ac = ' aria-current="page"' if active == slug else ""
    return '<li class="nav__item"><a class="nav__link" href="%s"%s>%s</a></li>' % (
        local(slug), ac, esc(label))


def brand_mark(in_header):
    mark = img("/assets/img/brand/nearprint-mark-160.png", "Nearprint logo",
               cls="brand__mark", eager=in_header)
    return ('<a class="brand" href="%s" aria-label="Nearprint home">%s'
            '<span class="brand__word">Near<b>print</b></span></a>'
            % (local(""), mark))


def mobile_nav():
    svc_links = "".join(
        '<a href="%s">%s</a>' % (local(s["slug"]), esc(s["short"]))
        for s in data.SERVICES
    )
    return (
        '<div class="nav-backdrop" id="navBackdrop"></div>'
        '<aside class="mobile-nav" id="mobileNav" aria-label="Mobile" aria-hidden="true">'
        '<div class="mobile-nav__head">'
        '<span class="brand__word" style="color:#fff">Near<b style="color:var(--cyan)">print</b></span>'
        '<button class="mobile-nav__close" id="navClose" aria-label="Close menu">&times;</button>'
        '</div>'
        '<nav class="mobile-nav__list" aria-label="Mobile primary">'
        '<a class="mobile-nav__link" href="%s">Home</a>'
        '<a class="mobile-nav__link" href="%s">About</a>'
        '<details class="mobile-nav__group"><summary>Services</summary>'
        '<div class="mobile-nav__sub">%s</div></details>'
        '<a class="mobile-nav__link" href="%s">Clients</a>'
        '<a class="mobile-nav__link" href="%s">Contact</a>'
        '</nav>'
        '<div class="mobile-nav__cta">'
        '<a class="btn btn--accent btn--block" href="%s">Get a Quote</a>'
        '<a class="btn btn--wa btn--block" href="%s" target="_blank" rel="noopener">%s WhatsApp</a>'
        '</div></aside>'
        % (local(""), local("about"), svc_links, local("clients"),
           local("contact"), local("contact"), S["whatsapp"], icon("whatsapp"))
    )


def floaters():
    return (
        '<div class="floaters">'
        '<a class="floater floater--wa" href="%s" target="_blank" rel="noopener" '
        'aria-label="Chat on WhatsApp">%s</a>'
        '<button class="floater floater--top" id="backToTop" aria-label="Back to top">%s</button>'
        '</div>' % (S["whatsapp"], icon("whatsapp"), icon("arrow-up"))
    )


def cta_band(title="Ready to start your next print project?",
             text="Tell us what you need and our team will recommend the right "
                  "print, signage or branding solution for your business."):
    return (
        '<section class="section"><div class="container reveal">'
        '<div class="cta"><div class="cta__inner">'
        '<div class="cta__text"><h2>%s</h2><p>%s</p></div>'
        '<div class="btn-row">'
        '<a class="btn btn--accent btn--lg" href="%s">Get a Quote %s</a>'
        '<a class="btn btn--outline-light btn--lg" href="tel:%s">%s Call Us</a>'
        '</div></div></div></div></section>'
        % (esc(title), esc(text), local("contact"), icon("arrow-right"),
           S["phone_e164"], icon("phone"))
    )


def footer():
    svc_links = "".join(
        '<a href="%s">%s</a>' % (local(s["slug"]), esc(s["short"]))
        for s in data.SERVICES
    )
    quick = "".join(
        '<a href="%s">%s</a>' % (local(sl), esc(lb))
        for lb, sl in [("Home", ""), ("About", "about"),
                       ("Clients", "clients"), ("Contact", "contact")]
    )
    return (
        '<footer class="site-footer"><div class="container--wide container">'
        '<div class="site-footer__grid">'
        '<div class="footer-brand">'
        '<span class="footer-brand__logo">%s<b>Near<i>print</i></b></span>'
        '<p>%s Your print partner for printing, signage, branding, packaging '
        'and corporate gifts across all seven emirates.</p>'
        '</div>'
        '<div><h4>Services</h4><nav class="footer-links" aria-label="Footer services">%s</nav></div>'
        '<div><h4>Company</h4><nav class="footer-links" aria-label="Footer links">%s</nav></div>'
        '<div><h4>Get in Touch</h4><div class="footer-contact">'
        '<div class="footer-contact__item">%s<span>%s</span></div>'
        '<div class="footer-contact__item">%s<a href="tel:%s">%s</a></div>'
        '<div class="footer-contact__item">%s<a href="mailto:%s">%s</a></div>'
        '<div class="footer-contact__item">%s<a href="%s" target="_blank" rel="noopener">WhatsApp Chat</a></div>'
        '</div></div>'
        '</div>'
        '<div class="site-footer__bottom">'
        '<p>&copy; %d Nearprint. All rights reserved.</p>'
        '<p class="site-footer__credit">Designed &amp; Developed by '
        '<a href="https://www.infindigital.in/" target="_blank" rel="noopener">IN/FIN</a></p>'
        '<div class="site-footer__social">'
        '<a href="%s" target="_blank" rel="noopener" aria-label="WhatsApp">%s</a>'
        '</div></div>'
        '</div></footer>'
        % (img("/assets/img/brand/nearprint-mark-160.png", "Nearprint logo"),
           esc(S["statement"] + "."), svc_links, quick,
           icon("pin"), esc(S["address_line"]),
           icon("phone"), S["phone_e164"], esc(S["phone_display"]),
           icon("mail"), S["email"], esc(S["email"]),
           icon("whatsapp"), S["whatsapp"],
           YEAR, S["whatsapp"], icon("whatsapp"))
    )


def page_hero(h1, lede, slug, eyebrow="Nearprint", icon_name=None):
    crumb = (
        '<nav class="breadcrumb" aria-label="Breadcrumb"><ol>'
        '<li><a href="%s">Home</a></li>'
        '<li aria-current="page">%s</li></ol></nav>'
        % (local(""), esc(h1))
    )
    watermark = ('<span class="page-hero__mark" aria-hidden="true">%s</span>'
                 % icon(icon_name)) if icon_name else ""
    return (
        '<section class="page-hero">'
        '<span class="page-hero__blob page-hero__blob--1" aria-hidden="true"></span>'
        '<span class="page-hero__blob page-hero__blob--2" aria-hidden="true"></span>'
        '<span class="page-hero__dots" aria-hidden="true"></span>'
        '%s'
        '<div class="container page-hero__inner reveal">'
        '%s'
        '<span class="ink-bar page-hero__bar" aria-hidden="true">'
        '<span></span><span></span><span></span><span></span></span>'
        '<p class="eyebrow">%s</p><h1>%s</h1><p>%s</p>'
        '</div></section>'
        % (watermark, crumb, esc(eyebrow), esc(h1), esc(lede))
    )


def media_hero(h1, lede, slug, eyebrow, bg_path, bg_alt):
    """Template-style full-bleed image hero for interior pages (e.g. About)."""
    crumb = (
        '<nav class="breadcrumb" aria-label="Breadcrumb"><ol>'
        '<li><a href="%s">Home</a></li>'
        '<li aria-current="page">%s</li></ol></nav>'
        % (local(""), esc(h1))
    )
    bg = img(bg_path, bg_alt, eager=True, sizes="100vw")
    return (
        '<section class="sub-hero"><div class="sub-hero__media">%s</div>'
        '<div class="sub-hero__overlay"></div>'
        '<div class="container sub-hero__inner"><div class="sub-hero__content">'
        '%s'
        '<span class="ink-bar" aria-hidden="true">'
        '<span></span><span></span><span></span><span></span></span>'
        '<p class="eyebrow">%s</p><h1>%s</h1><p>%s</p>'
        '<div class="btn-row"><a class="btn btn--accent btn--lg" href="%s">Get a Quote %s</a>'
        '<a class="btn btn--outline-light btn--lg" href="%s">View Services</a></div>'
        '</div></div></section>'
        % (bg, crumb, esc(eyebrow), esc(h1), esc(lede),
           local("contact"), icon("arrow-right"),
           local("business-stationery-printing"))
    )


def faq_block(faqs):
    items = "".join(
        '<details class="faq__item"><summary>%s</summary>'
        '<div class="faq__answer"><p>%s</p></div></details>'
        % (esc(q), esc(a)) for q, a in faqs
    )
    return (
        '<section class="section section--soft"><div class="container">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">FAQ</p>'
        '<h2>Frequently Asked Questions</h2></div>'
        '<div class="faq mx-auto reveal">%s</div>'
        '</div></section>' % items
    )


def document(page, body):
    return "<!doctype html>\n<html lang=\"en\">\n<head>\n%s\n</head>\n<body>\n%s\n</body>\n</html>\n" % (
        head(page), body)


def chrome(active, main_html):
    return (
        '<a class="skip-link" href="#main">Skip to content</a>'
        + header(active)
        + mobile_nav()
        + '<main id="main">' + main_html + '</main>'
        + footer()
        + floaters()
        + '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">'
          '<button class="lightbox__close" id="lightboxClose" aria-label="Close">&times;</button>'
          '<img id="lightboxImg" src="" alt=""><span class="lightbox__cap" id="lightboxCap"></span></div>'
        + '<script src="assets/js/main.js" defer></script>'
    )


# ---------------------------------------------------------------------------
# JSON-LD builders
# ---------------------------------------------------------------------------
def ld_localbusiness():
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": S["domain"] + "/#business",
        "name": "Nearprint",
        "description": "Printing, signage, branding, packaging and corporate gifts company in Dubai serving the UAE.",
        "url": S["domain"] + "/",
        "telephone": S["phone_e164"],
        "email": S["email"],
        "image": S["domain"] + S["og_image"],
        "logo": S["domain"] + "/assets/img/brand/nearprint-mark-320.png",
        "priceRange": "$$",
        "slogan": S["statement"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": S["address"]["street"],
            "addressLocality": S["address"]["city"],
            "addressRegion": S["address"]["region"],
            "addressCountry": S["address"]["country"],
        },
        "areaServed": {"@type": "Country", "name": "United Arab Emirates"},
        "sameAs": [S["whatsapp"]],
    }


def ld_breadcrumb(name, slug):
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": canon("")},
            {"@type": "ListItem", "position": 2, "name": name, "item": canon(slug)},
        ],
    }


def ld_service(svc):
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": svc["name"],
        "serviceType": svc["name"],
        "description": svc["desc"],
        "url": canon(svc["slug"]),
        "areaServed": {"@type": "Country", "name": "United Arab Emirates"},
        "provider": {"@type": "LocalBusiness", "name": "Nearprint", "@id": S["domain"] + "/#business"},
    }


def ld_faq(faqs):
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in faqs
        ],
    }


def ld_website():
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Nearprint",
        "url": S["domain"] + "/",
    }


# ---------------------------------------------------------------------------
# page bodies
# ---------------------------------------------------------------------------
def build_home():
    hero_srcset = ("assets/img/brand/hero-640.webp 640w, "
                   "assets/img/brand/hero-1000.webp 1000w, "
                   "assets/img/brand/hero-1600.webp 1600w")
    hero_img = img("/assets/img/brand/hero-1600.webp",
                   "Nearprint print and signage production in Dubai",
                   eager=True, sizes="100vw", srcset=hero_srcset)
    stats = "".join(
        '<div class="hero__stat"><b>%d%s</b><span>%s</span></div>'
        % (st["value"], st["suffix"], esc(st["label"])) for st in data.STATS[:3]
    )
    hero = (
        '<section class="hero"><div class="hero__media">%s</div>'
        '<div class="hero__overlay"></div>'
        '<div class="container hero__inner"><div class="hero__content">'
        '<span class="hero__eyebrow"><span class="dot"></span>%s</span>'
        '<h1 class="hero__title">Printing, Signage &amp; <span class="accent">Branding</span> Company in Dubai</h1>'
        '<p class="hero__text">%s We are your print partner across all seven '
        'emirates, with in-house production for sharper quality and faster turnaround.</p>'
        '<div class="hero__actions btn-row"><a class="btn btn--accent btn--lg" href="%s">Get a Quote %s</a>'
        '<a class="btn btn--outline-light btn--lg" href="%s">Explore Services</a></div>'
        '<div class="hero__stats">%s</div>'
        '</div></div>'
        '<div class="hero__scroll"><span class="mouse"></span><span>Scroll</span></div>'
        '</section>'
        % (hero_img, esc(S["tagline"]), esc(S["statement"] + "."),
           local("contact"), icon("arrow-right"),
           local("business-stationery-printing"), stats)
    )

    # pillars
    pillar_icons = ["stationery", "signage", "gift", "box"]
    pillars = "".join(
        '<article class="pillar"><span class="pillar__num">0%d</span>'
        '<span class="pillar__icon">%s</span><h3>%s</h3><p>%s</p></article>'
        % (i + 1, icon(pillar_icons[i]), esc(p["title"]), esc(p["text"]))
        for i, p in enumerate(data.PILLARS)
    )
    pillars_sec = (
        '<section class="section"><div class="container">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">What We Do</p>'
        '<h2>Everything your brand needs to look its best in print</h2>'
        '<p>From the first business card to full shopfront signage, Nearprint '
        'covers the print and branding essentials under one roof.</p></div>'
        '<div class="grid cols-4 stagger">%s</div></div></section>' % pillars
    )

    # service cards
    cards = "".join(
        '<article class="svc-card"><div class="svc-card__media">%s'
        '<span class="svc-card__icon">%s</span></div>'
        '<div class="svc-card__body"><h3 class="svc-card__title"><a href="%s">%s</a></h3>'
        '<p class="svc-card__text">%s</p>'
        '<span class="svc-card__link link-arrow">View service %s</span>'
        '</div></article>'
        % (img("/assets/img/cards/%s.webp" % s["key"], s["name"], cls=""),
           icon(SVC_ICON[s["key"]]), local(s["slug"]), esc(s["name"]),
           esc(s["intro"]), icon("arrow-right"))
        for s in data.SERVICES
    )
    services_sec = (
        '<section class="section section--soft"><div class="container container--wide">'
        '<div class="section-head reveal"><p class="eyebrow">Our Services</p>'
        '<h2>One partner for print, signage, branding and more</h2>'
        '<p>Eight service areas, all produced and coordinated by a single '
        'accountable team so your brand stays consistent everywhere.</p></div>'
        '<div class="svc-grid stagger">%s</div></div></section>' % cards
    )

    # why us
    why_icons = ["factory", "globe", "users", "handshake"]
    feats = "".join(
        '<article class="feature"><span class="feature__icon">%s</span>'
        '<h3>%s</h3><p>%s</p></article>'
        % (icon(why_icons[i]), esc(w["title"]), esc(w["text"]))
        for i, w in enumerate(data.WHY_US)
    )
    chips = "".join('<span class="chip">%s</span>' % esc(l) for l in data.LANGUAGES)
    why_sec = (
        '<section class="section section--ink"><div class="container container--wide">'
        '<div class="section-head reveal"><p class="eyebrow">Why Nearprint</p>'
        '<h2>A print partner built for the UAE market</h2>'
        '<p>We keep production in-house and communication clear, so your project '
        'is handled quickly and looks the way you intended.</p></div>'
        '<div class="grid cols-4 stagger">%s</div>'
        '<div class="reveal" style="margin-top:2.5rem">'
        '<p class="eyebrow">Multilingual Sales Team</p><div class="chips">%s</div></div>'
        '</div></section>' % (feats, chips)
    )

    # stats band
    stat_items = "".join(
        '<div class="stat"><span class="stat__num">%d<span class="stat__suffix">%s</span></span>'
        '<span class="stat__label">%s</span></div>'
        % (st["value"], st["suffix"], esc(st["label"])) for st in data.STATS
    )
    stats_sec = (
        '<section class="section section--ink section--tight"><div class="container">'
        '<div class="stats reveal">%s</div></div></section>' % stat_items
    )

    # machines
    machines = "".join(
        '<article class="machine"><div class="machine__media">%s</div>'
        '<div class="machine__body"><h3>%s</h3><p>%s</p></div></article>'
        % (img("/assets/img/machines/%s.webp" % data.slugify(m["name"]), m["name"]),
           esc(m["name"]), esc(m["text"]))
        for m in data.MACHINES
    )
    machines_sec = (
        '<section class="section"><div class="container">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">In-house Production</p>'
        '<h2>Machines that keep quality and timing in our hands</h2>'
        '<p>CNC routing, laser cutting and UV flatbed printing on site mean '
        'tighter control and quicker turnaround for signage and fabrication.</p></div>'
        '<div class="grid cols-3 stagger">%s</div></div></section>' % machines
    )

    # clients strip (subset)
    logos = client_paths()[:10]
    logo_items = "".join(
        '<div class="logo-wall__item">%s</div>'
        % img(p, "Client of Nearprint") for p in logos
    )
    clients_sec = (
        '<section class="section section--soft"><div class="container container--wide">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">Our Clients</p>'
        '<h2>Trusted by brands across the UAE</h2>'
        '<p>Businesses of every size rely on Nearprint for print, signage and '
        'branding they can count on.</p></div>'
        '<div class="logo-wall stagger">%s</div>'
        '<div class="btn-row btn-row--center reveal" style="margin-top:2rem">'
        '<a class="btn btn--outline" href="%s">See all clients %s</a></div>'
        '</div></section>' % (logo_items, local("clients"), icon("arrow-right"))
    )

    body = chrome("", hero + pillars_sec + services_sec + why_sec
                  + stats_sec + machines_sec + clients_sec + cta_band())
    page = {
        "slug": data.HOME["slug"], "title": data.HOME["title"],
        "desc": data.HOME["desc"], "og_type": "website",
        "jsonld": [ld_localbusiness(), ld_website()],
    }
    return page, body


def build_about():
    A = data.ABOUT
    hero = media_hero(
        A["h1"],
        "A UAE printing and branding company with in-house production, "
        "multilingual support and one accountable team for your whole brand.",
        A["slug"], "About Nearprint",
        "/assets/img/brand/hero-1600.webp",
        "Nearprint printing and branding production in Dubai")

    intro = (
        '<section class="section"><div class="container">'
        '<div class="split"><div class="about-media reveal--left reveal">'
        '<div class="about-media__main">%s</div>'
        '<div class="about-media__sub">%s</div>'
        '<div class="split__badge"><b>%s</b><span>Years serving the UAE</span></div></div>'
        '<div class="reveal--right reveal"><p class="eyebrow">Who We Are</p>'
        '<h2>%s</h2>'
        '<p>Nearprint is a Dubai based printing, signage and branding company. '
        'We bring business stationery, marketing collateral, signage, packaging, '
        'workwear and corporate gifts together under one roof, so your brand looks '
        'consistent across every touchpoint.</p>'
        '<p>Our sales team speaks eight languages and our production runs in-house, '
        'which means clearer briefs, tighter quality control and faster turnaround. '
        'We deliver and install across all seven emirates.</p>'
        '<ul class="split__list">'
        '<li>%s<span>In-house CNC, laser and UV flatbed production</span></li>'
        '<li>%s<span>Delivery and installation across the UAE</span></li>'
        '<li>%s<span>A single team accountable for your whole brand</span></li>'
        '</ul></div></div></div></section>'
        % (img("/assets/img/brand/facility.webp", "Nearprint production facility in Dubai"),
           img("/assets/img/cards/signage.webp", "Custom signage produced by Nearprint"),
           esc(S["founded_years"]), esc(S["statement"]),
           icon("check"), icon("check"), icon("check"))
    )

    # values / why
    why_icons = ["factory", "globe", "users", "handshake"]
    feats = "".join(
        '<article class="feature"><span class="feature__icon">%s</span>'
        '<h3>%s</h3><p>%s</p></article>'
        % (icon(why_icons[i]), esc(w["title"]), esc(w["text"]))
        for i, w in enumerate(data.WHY_US)
    )
    why = (
        '<section class="section section--soft"><div class="container container--wide">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">Why Work With Us</p>'
        '<h2>Built to make your brand easy to produce</h2></div>'
        '<div class="grid cols-4 stagger">%s</div></div></section>' % feats
    )

    # machines
    machines = "".join(
        '<article class="machine"><div class="machine__media">%s</div>'
        '<div class="machine__body"><h3>%s</h3><p>%s</p></div></article>'
        % (img("/assets/img/machines/%s.webp" % data.slugify(m["name"]), m["name"]),
           esc(m["name"]), esc(m["text"]))
        for m in data.MACHINES
    )
    machines_sec = (
        '<section class="section"><div class="container">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">Our Equipment</p>'
        '<h2>In-house machines behind our signage and fabrication</h2></div>'
        '<div class="grid cols-3 stagger">%s</div></div></section>' % machines
    )

    stat_items = "".join(
        '<div class="stat"><span class="stat__num">%d<span class="stat__suffix">%s</span></span>'
        '<span class="stat__label">%s</span></div>'
        % (st["value"], st["suffix"], esc(st["label"])) for st in data.STATS
    )
    stats_sec = (
        '<section class="section section--ink section--tight"><div class="container">'
        '<div class="stats reveal">%s</div></div></section>' % stat_items
    )

    body = chrome("about", hero + intro + why + machines_sec + stats_sec + cta_band())
    page = {
        "slug": A["slug"], "title": A["title"], "desc": A["desc"],
        "jsonld": [ld_localbusiness(), ld_breadcrumb("About", A["slug"])],
    }
    return page, body


def build_service(svc):
    hero = page_hero(svc["h1"], svc["intro"], svc["slug"],
                     eyebrow=svc["short"], icon_name=SVC_ICON[svc["key"]])

    # intro lede + tagline
    lede = (
        '<section class="section section--tight"><div class="container">'
        '<div class="section-head reveal"><p class="eyebrow">%s</p>'
        '<h2>%s</h2><p>%s</p></div>'
        '<div class="btn-row reveal"><a class="btn btn--primary" href="%s">Request a Quote %s</a>'
        '<a class="btn btn--wa" href="%s" target="_blank" rel="noopener">%s WhatsApp Us</a>'
        '</div></div></section>'
        % (esc(svc["short"]), esc(svc["tagline"]), esc(svc["intro"]),
           local("contact"), icon("arrow-right"), S["whatsapp"], icon("whatsapp"))
    )

    # product groups
    groups = product_slugs(svc)
    multi = len(groups) > 1
    blocks = []
    for title, prods in groups:
        prod_html = "".join(
            '<article class="product"><div class="product__media" '
            'data-full="%s" data-name="%s" role="button" tabindex="0" '
            'aria-label="View %s">%s'
            '<span class="product__zoom">%s</span></div>'
            '<p class="product__name">%s</p></article>'
            % (path.lstrip("/"), esc(name), esc(name),
               img(path, name), icon("zoom"), esc(name))
            for name, path in prods
        )
        htag = "h2" if multi else "h2"
        head_html = (
            '<div class="product-group__head"><%s>%s</%s>'
            '<span class="product-group__count">%d items</span></div>'
            % (htag, esc(title), htag, len(prods))
        ) if multi else ""
        blocks.append(
            '<div class="product-group reveal">%s'
            '<div class="product-grid stagger">%s</div></div>'
            % (head_html, prod_html)
        )
    if not multi:
        section_head = (
            '<div class="section-head reveal"><p class="eyebrow">Product Range</p>'
            '<h2>What we produce</h2></div>'
        )
    else:
        section_head = (
            '<div class="section-head reveal"><p class="eyebrow">Product Range</p>'
            '<h2>What we produce</h2><p>Browse the range below. Click any item '
            'to see it larger.</p></div>'
        )
    products_sec = (
        '<section class="section section--soft"><div class="container container--wide">'
        '%s%s</div></section>' % (section_head, "".join(blocks))
    )

    faqs = faq_block(svc["faqs"])

    body = chrome(svc["slug"], hero + lede + products_sec + faqs + cta_band(
        title="Need %s in the UAE?" % svc["short"].lower(),
        text="Share your requirement and our team will get back to you with the "
             "right options, materials and a quote."))
    page = {
        "slug": svc["slug"], "title": svc["title"], "desc": svc["desc"],
        "jsonld": [ld_localbusiness(), ld_breadcrumb(svc["short"], svc["slug"]),
                   ld_service(svc), ld_faq(svc["faqs"])],
    }
    return page, body


def build_clients():
    C = data.CLIENTS
    hero = page_hero(
        C["h1"],
        "Businesses across the UAE trust Nearprint for printing, signage, "
        "branding and corporate gifts.",
        C["slug"], eyebrow="Our Clients")
    logos = client_paths()
    items = "".join(
        '<div class="logo-wall__item">%s</div>' % img(p, "Client of Nearprint")
        for p in logos
    )
    wall = (
        '<section class="section"><div class="container container--wide">'
        '<div class="section-head section-head--center reveal">'
        '<p class="eyebrow eyebrow--center">Brands We Work With</p>'
        '<h2>Trusted across industries in the UAE</h2>'
        '<p>A selection of the organisations that count on Nearprint as their '
        'print partner.</p></div>'
        '<div class="logo-wall stagger">%s</div></div></section>' % items
    )
    body = chrome("clients", hero + wall + cta_band(
        title="Join the brands that print with us",
        text="Whether you need a single run or an ongoing print partner, we are "
             "ready to help."))
    page = {
        "slug": C["slug"], "title": C["title"], "desc": C["desc"],
        "jsonld": [ld_localbusiness(), ld_breadcrumb("Clients", C["slug"])],
    }
    return page, body


def build_contact():
    C = data.CONTACT
    hero = page_hero(
        C["h1"],
        "Call, email or WhatsApp our team, or send your requirement using the "
        "form and we will get back to you.",
        C["slug"], eyebrow="Contact")

    svc_options = "".join(
        '<option value="%s">%s</option>' % (esc(s["short"]), esc(s["short"]))
        for s in data.SERVICES
    )
    form = (
        '<div class="card-panel reveal--left reveal">'
        '<h2>Send us your requirement</h2>'
        '<form class="form" id="contactForm" novalidate>'
        '<div class="form__row">'
        '<div class="field"><label for="cf-name">Name <span class="req">*</span></label>'
        '<input id="cf-name" name="name" type="text" autocomplete="name" required>'
        '<span class="field__error" data-for="name"></span></div>'
        '<div class="field"><label for="cf-company">Company</label>'
        '<input id="cf-company" name="company" type="text" autocomplete="organization">'
        '<span class="field__error" data-for="company"></span></div>'
        '</div>'
        '<div class="form__row">'
        '<div class="field"><label for="cf-email">Email <span class="req">*</span></label>'
        '<input id="cf-email" name="email" type="email" autocomplete="email" required>'
        '<span class="field__error" data-for="email"></span></div>'
        '<div class="field"><label for="cf-phone">Phone <span class="req">*</span></label>'
        '<input id="cf-phone" name="phone" type="tel" autocomplete="tel" required>'
        '<span class="field__error" data-for="phone"></span></div>'
        '</div>'
        '<div class="field"><label for="cf-service">Service of interest</label>'
        '<select id="cf-service" name="service"><option value="">Select a service</option>%s</select>'
        '<span class="field__error" data-for="service"></span></div>'
        '<div class="field"><label for="cf-message">Message <span class="req">*</span></label>'
        '<textarea id="cf-message" name="message" required></textarea>'
        '<span class="field__error" data-for="message"></span></div>'
        '<div class="form__status" id="formStatus" role="status" aria-live="polite"></div>'
        '<button class="btn btn--accent btn--lg btn--block" type="submit">Send Enquiry %s</button>'
        '<p class="form__note">Prefer to talk now? Call %s or message us on WhatsApp.</p>'
        '</form></div>'
        % (svc_options, icon("arrow-right"), esc(S["phone_display"]))
    )

    info = (
        '<div class="reveal--right reveal">'
        '<div class="contact-list">'
        '<div class="contact-list__item"><span class="contact-list__icon">%s</span>'
        '<div><h3>Call Us</h3><a href="tel:%s">%s</a></div></div>'
        '<div class="contact-list__item"><span class="contact-list__icon">%s</span>'
        '<div><h3>Email</h3><a href="mailto:%s">%s</a></div></div>'
        '<div class="contact-list__item"><span class="contact-list__icon">%s</span>'
        '<div><h3>WhatsApp</h3><a href="%s" target="_blank" rel="noopener">Start a chat</a></div></div>'
        '<div class="contact-list__item"><span class="contact-list__icon">%s</span>'
        '<div><h3>Visit Us</h3><p>%s</p></div></div>'
        '<div class="contact-list__item"><span class="contact-list__icon">%s</span>'
        '<div><h3>Website</h3><p>%s</p></div></div>'
        '</div>'
        '<iframe class="map-embed" title="Nearprint location, Business Bay, Dubai" '
        'loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
        'src="https://www.google.com/maps?q=Iris%%20Bay%%20Tower%%20Business%%20Bay%%20Dubai&output=embed"></iframe>'
        '</div>'
        % (icon("phone"), S["phone_e164"], esc(S["phone_display"]),
           icon("mail"), S["email"], esc(S["email"]),
           icon("whatsapp"), S["whatsapp"],
           icon("pin"), esc(S["address_line"]),
           icon("globe"), esc(S["website"]))
    )

    sec = (
        '<section class="section"><div class="container">'
        '<div class="contact-grid">%s%s</div></div></section>' % (form, info)
    )
    body = chrome("contact", hero + sec)
    page = {
        "slug": C["slug"], "title": C["title"], "desc": C["desc"],
        "jsonld": [ld_localbusiness(), ld_breadcrumb("Contact", C["slug"])],
    }
    return page, body


def build_404():
    N = data.NOTFOUND
    svc_links = "".join(
        '<a class="btn btn--outline btn--sm" href="%s">%s</a>' % (local(s["slug"]), esc(s["short"]))
        for s in data.SERVICES
    )
    body = (
        '<a class="skip-link" href="#main">Skip to content</a>'
        + header("")
        + mobile_nav()
        + '<main id="main"><section class="notfound"><div class="container">'
        '<div class="notfound__code">404</div>'
        '<h1>Page Not Found</h1>'
        '<p class="measure mx-auto" style="color:var(--text-muted)">The page you '
        'are looking for could not be found. It may have moved. Explore our '
        'services or head back home.</p>'
        '<div class="btn-row btn-row--center" style="margin:1.75rem 0 2.5rem">'
        '<a class="btn btn--primary" href="%s">Back to Home</a>'
        '<a class="btn btn--accent" href="%s">Contact Us</a></div>'
        '<div class="btn-row btn-row--center">%s</div>'
        '</div></section></main>' % (local(""), local("contact"), svc_links)
        + footer()
        + floaters()
        + '<script src="assets/js/main.js" defer></script>'
    )
    page = {"slug": N["slug"], "title": N["title"], "desc": N["desc"],
            "jsonld": [ld_localbusiness()]}
    return page, body


# ---------------------------------------------------------------------------
# extra files
# ---------------------------------------------------------------------------
def write_sitemap(slugs):
    urls = "".join(
        "  <url><loc>%s</loc><changefreq>monthly</changefreq>"
        "<priority>%s</priority></url>\n"
        % (canon(sl), "1.0" if sl == "" else "0.8")
        for sl in slugs
    )
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + urls + '</urlset>\n')
    with open(os.path.join(ROOT, "sitemap.xml"), "w") as fh:
        fh.write(xml)


def write_robots():
    txt = ("User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n"
           % S["domain"])
    with open(os.path.join(ROOT, "robots.txt"), "w") as fh:
        fh.write(txt)


def write_manifest_json():
    man = {
        "name": "Nearprint",
        "short_name": "Nearprint",
        "description": "Printing, signage and branding company in Dubai, UAE.",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#FFFFFF",
        "theme_color": "#17232F",
        "icons": [
            {"src": "/assets/img/brand/favicon-32.png", "sizes": "32x32", "type": "image/png"},
            {"src": "/assets/img/brand/nearprint-mark-320.png", "sizes": "320x401", "type": "image/png"},
            {"src": "/assets/img/brand/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"},
        ],
    }
    with open(os.path.join(ROOT, "site.webmanifest"), "w") as fh:
        json.dump(man, fh, indent=2)


def write_favicons():
    """Generate favicon PNGs from the badge logo."""
    try:
        from PIL import Image
    except Exception:
        print("   (Pillow unavailable, skipping favicons)")
        return
    badge = os.path.join(ROOT, "_extracted", "logo_extract", "badge_clean.png")
    if not os.path.exists(badge):
        print("   (badge missing, skipping favicons)")
        return
    src = Image.open(badge).convert("RGBA")
    bdir = os.path.join(ROOT, "assets", "img", "brand")
    for size, name in [(32, "favicon-32.png"), (16, "favicon-16.png")]:
        h = round(src.height * size / src.width)
        r = src.resize((size, h), Image.LANCZOS)
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        canvas.paste(r, (0, (size - h) // 2), r)
        canvas.save(os.path.join(bdir, name), "PNG", optimize=True)
    # apple touch icon on ink background
    tsize = 180
    ink = Image.new("RGBA", (tsize, tsize), (23, 35, 47, 255))
    pad = 26
    inner = tsize - 2 * pad
    ih = round(src.height * inner / src.width)
    r = src.resize((inner, ih), Image.LANCZOS)
    ink.paste(r, (pad, (tsize - ih) // 2), r)
    ink.convert("RGB").save(os.path.join(bdir, "apple-touch-icon.png"), "PNG", optimize=True)


# ---------------------------------------------------------------------------
def main():
    builders = [build_home, build_about, build_clients, build_contact, build_404]
    pages = []
    for b in builders:
        pages.append(b())
    for svc in data.SERVICES:
        pages.append(build_service(svc))

    written_slugs = []
    for page, body in pages:
        slug = page["slug"]
        fname = "index.html" if slug == "" else "%s.html" % slug
        with open(os.path.join(ROOT, fname), "w") as fh:
            fh.write(document(page, body))
        print("   wrote %s" % fname)
        if slug != "404":
            written_slugs.append(slug)

    # sitemap in menu order: home, about, services, clients, contact
    order = [""] + ["about"] + [s["slug"] for s in data.SERVICES] + ["clients", "contact"]
    order = [s for s in order if s in written_slugs]
    write_sitemap(order)
    write_robots()
    write_manifest_json()
    write_favicons()
    print(">> sitemap.xml, robots.txt, site.webmanifest, favicons written")
    print("DONE: %d pages" % len(pages))


if __name__ == "__main__":
    main()

"""Shared layout + components for the static site generator.

Every page is rendered to <route>/index.html so the live URLs are preserved.
Content comes from midnotarypro-website-content.pdf — keep it verbatim.
"""
import html
import json
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SITE = "https://midnotarypro.com"

BOOK = "https://midwestidentityservices.com/book-an-appointment/"
APPT = "https://midwestidentityservices.com/appointment/"
PHONE = "816-442-0295"
PHONE_FMT = "(816) 442-0295"
TEL = "tel:8164420295"
JAIL_PHONE = "(816) 654-3074"
JAIL_TEL = "tel:8166543074"
EMAIL = "moservices.midwest@gmail.com"
ADDRESS = "8101 East Bannister Rd Kansas City MO 64134"
ADDRESS_SHORT = "8101 E. Bannister Rd., Kansas City, MO 64134"
SOCIAL = [
    ("Instagram", "instagram", "https://www.instagram.com/midwestidentityservices/?hl=en"),
    ("Facebook", "facebook", "https://www.facebook.com/people/Quick-Sign-Marriage-Elopement-Services/61574582079939/"),
    ("LinkedIn", "linkedin", "https://www.linkedin.com/company/106789121/"),
    ("WhatsApp", "whatsapp", "https://api.whatsapp.com/send/?phone=18166058096&amp;text&amp;type=phone_number&amp;app_absent=0"),
]
WHATSAPP = "https://api.whatsapp.com/send/?phone=18166058096&amp;text&amp;type=phone_number&amp;app_absent=0"
MAP_EMBED = ("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.2775731243896!2d-94.49497319999999!3d38.9513604"
             "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0e6db7ae27acf%3A0xf7274205787e0618!2s8101%20Bannister"
             "%20Rd%2C%20Kansas%20City%2C%20MO%2064134%2C%20USA!5e1!3m2!1sen!2sin!4v1790685544606!5m2!1sen!2sin")
DISCLAIMER = (
    "Midwest Apostille &amp; Notary Services is a document-services provider, not a law firm, "
    "and does not provide legal advice. Apostille, legalization, and translation requirements are set "
    "by the destination country and may change — always confirm current requirements with the relevant "
    "embassy, consulate, or authority."
)

_DIMS = json.load(open(os.path.join(os.path.dirname(__file__), "image-dims.json")))
_ICONS = open(os.path.join(os.path.dirname(__file__), "icons.svg")).read()


def esc(s):
    return html.escape(s, quote=True)


def icon(name, cls=""):
    c = f"icon {cls}".strip()
    return f'<svg class="{c}" aria-hidden="true" focusable="false"><use href="#i-{name}"/></svg>'


def arrow(cls=""):
    return icon("arrow-right", f"icon--arrow {cls}".strip())


def img(key, alt, sizes="100vw", eager=False, cls="", attrs=""):
    lw, lh = _DIMS[f"{key}-lg"]
    sw, _ = _DIMS[f"{key}-sm"]
    srcset = f"/assets/img/{key}-sm.webp {sw}w"
    if lw != sw:
        srcset += f", /assets/img/{key}-lg.webp {lw}w"
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    c = f' class="{cls}"' if cls else ""
    return (f'<img src="/assets/img/{key}-lg.webp" srcset="{srcset}" sizes="{sizes}" '
            f'width="{lw}" height="{lh}" alt="{esc(alt)}" decoding="async" {load}{c} {attrs}>').replace(" >", ">")


def btn(label, href, kind="", ico="arrow-right", external=False, magnetic=False, extra=""):
    cls = "btn" + (f" btn--{kind}" if kind else "")
    ext = ' target="_blank" rel="noopener"' if external else ""
    i = icon(ico, "icon--arrow" if ico == "arrow-right" else "") if ico else ""
    a = f'<a class="{cls}" href="{href}"{ext}{extra}>{label}{i}</a>'
    return f'<span class="magnetic" data-magnetic>{a}</span>' if magnetic else a


def book_btn(label="Make an Appointment", kind="", href=BOOK, magnetic=True):
    return btn(label, href, kind, "calendar-check", external=True, magnetic=magnetic)


def call_btn(kind="ghost", label=None):
    return btn(label or f"Call Now {PHONE}", TEL, kind, "phone")


def eyebrow(t):
    return f'<p class="eyebrow">{t}</p>'


def stars(n=5):
    return '<span class="stars" role="img" aria-label="5 out of 5 stars">' + icon("star") * n + "</span>"


GOOGLE_G = ('<svg class="gmark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>'
            '<path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>'
            '<path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>'
            '<path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>')


# --------------------------------------------------------------------------- navigation
SERVICES_MENU = [
    ("/apostille-services/", "stamp", "Apostille Services", "Apostille & authentication — ¡También en Español!"),
    ("/notary-services/", "signature", "Notary Services", "Mobile, remote online and in-office notarization"),
    ("/document-preparation-services/", "file-pen-line", "Document Preparation Services", "Formatted and ready for notarization or apostille"),
    ("/jail-notary-kansas-city/", "building-2", "Jail Notary Kansas City", "Same-day notarizations for inmates"),
    ("/services/", "files", "All Services", "Every service in one overview"),
]
RESOURCES_MENU = [
    ("FBI background checks", [
        ("/fbi-apostille-for-hague-countries/", "fingerprint", "FBI Apostille for Hague Countries", "U.S. Dept. of State apostille"),
        ("/fbi-attestation-legalization/", "landmark", "FBI Attestation Legalization", "Embassy legalization for non-Hague countries"),
    ]),
    ("Guides", [
        ("/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/", "book-open",
         "How to Get an Apostille in Kansas City", "Birth certificates, custodian documents & more"),
        ("/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/", "clock",
         "Urgent Notary Services in Kansas City", "Jail, hospital & after-hours help"),
    ]),
    ("English | Español", [
        ("/notary-apostille-services/", "languages", "Notary & Apostille Services", "English"),
        ("/servicios-de-notaria-y-apostilla/", "languages", "Servicios de Notaría y Apostilla", "Español"),
        ("/notaria-en-carceles-de-kansas-cit/", "languages", "Notaría en Cárceles de Kansas City", "Español"),
    ]),
]
NAV = [
    ("home", "Home", "/"),
    ("about", "About", "/about-us/"),
    ("services", "Services", "/services/"),
    ("apostille", "Apostille", "/apostille-services/"),
    ("notary", "Notary", "/notary-services/"),
    ("docprep", "Document Preparation", "/document-preparation-services/"),
    ("resources", "Resources", None),
    ("contact", "Contact", "/contact-us/"),
]
CTA_LABEL = "Start Your Document Review"


def _dd_link(href, ic, title, sub):
    return f'<li><a href="{href}">{icon(ic)}<strong>{title}</strong><span>{sub}</span></a></li>'


def header(active, lang_alt=None):
    items = []
    for key, label, href in NAV:
        cur = ' aria-current="page"' if key == active else ""
        if key == "services":
            dd = "".join(_dd_link(*x) for x in SERVICES_MENU)
            items.append(
                f'<li class="nav__item" data-dropdown><a class="nav__link" href="{href}"{cur}>{label}</a>'
                f'<button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="dd-services">'
                f'<span class="sr-only">Show {label} menu</span>{icon("chevron-down")}</button>'
                f'<ul class="dropdown" id="dd-services" role="list">{dd}</ul></li>')
        elif key == "resources":
            dd = ""
            for group, links in RESOURCES_MENU:
                dd += f'<li class="dropdown__label">{group}</li>' + "".join(_dd_link(*x) for x in links)
            rcur = ' aria-current="page"' if active == "resources" else ""
            items.append(
                f'<li class="nav__item" data-dropdown><button class="nav__link nav__toggle nav__toggle--full" type="button" aria-expanded="false" aria-controls="dd-resources"{rcur}>'
                f'{label}{icon("chevron-down")}</button><ul class="dropdown" id="dd-resources" role="list">{dd}</ul></li>')
        else:
            items.append(f'<li class="nav__item"><a class="nav__link" href="{href}"{cur}>{label}</a></li>')

    # lang_alt = (english_path, spanish_path, current_lang) on bilingual page pairs
    en, es, lang_cur = lang_alt or ("/notary-apostille-services/", "/servicios-de-notaria-y-apostilla/", "")
    return f'''
<aside class="topbar on-dark" aria-label="Contact information">
  <div class="container topbar__inner">
    <p class="topbar__note">{icon("shield-check", "icon--sm")}Apostille &amp; notary services across Kansas City, Missouri, and nationwide</p>
    <div class="topbar__links">
      <a href="{TEL}">{icon("phone", "icon--sm")}{PHONE}</a>
      <a class="topbar__email" href="mailto:{EMAIL}">{icon("mail", "icon--sm")}{EMAIL}</a>
      <span class="topbar__lang">{icon("languages", "icon--sm")}<a href="{en}" hreflang="en" lang="en"{' aria-current="true"' if lang_cur == "en" else ""}>English</a><span aria-hidden="true">|</span><a href="{es}" hreflang="es" lang="es"{' aria-current="true"' if lang_cur == "es" else ""}>Español</a></span>
    </div>
  </div>
</aside>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="Midwest Apostille &amp; Notary Services — Home">
      <img src="/assets/img/logo-navy.png" width="375" height="139" alt="Midwest Apostille &amp; Notary Services">
    </a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list" role="list">{"".join(items)}</ul>
    </nav>
    <span class="magnetic header-cta" data-magnetic><a class="btn btn--sm" href="{BOOK}" target="_blank" rel="noopener">{CTA_LABEL}{arrow()}</a></span>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="drawer" data-menu-open>{icon("menu")}Menu</button>
  </div>
  <div class="scroll-progress" data-progress aria-hidden="true"></div>
</header>
{drawer()}'''


def drawer():
    def sub(links):
        return "".join(f'<li><a href="{h}">{icon(i)}{t}</a></li>' for h, i, t, _ in links)
    res = "".join(sub(links) for _, links in RESOURCES_MENU)
    return f'''
<div class="drawer on-dark" id="drawer" role="dialog" aria-modal="true" aria-label="Menu" data-drawer>
  <div class="drawer__head">
    <img src="/assets/img/logo-light.png" width="375" height="139" alt="">
    <button class="drawer__close" type="button" data-menu-close>{icon("x")}Close</button>
  </div>
  <div class="drawer__body">
    <ul class="drawer__list" role="list">
      <li><a href="/">Home {icon("arrow-right")}</a></li>
      <li><a href="/about-us/">About {icon("arrow-right")}</a></li>
      <li><details><summary>Services {icon("plus")}</summary><ul class="drawer__sub" role="list">{sub(SERVICES_MENU)}</ul></details></li>
      <li><a href="/apostille-services/">Apostille {icon("arrow-right")}</a></li>
      <li><a href="/notary-services/">Notary {icon("arrow-right")}</a></li>
      <li><a href="/document-preparation-services/">Document Preparation {icon("arrow-right")}</a></li>
      <li><details><summary>Resources {icon("plus")}</summary><ul class="drawer__sub" role="list">{res}</ul></details></li>
      <li><a href="/contact-us/">Contact {icon("arrow-right")}</a></li>
    </ul>
  </div>
  <div class="drawer__foot">
    <a class="btn btn--gold" href="{BOOK}" target="_blank" rel="noopener">{CTA_LABEL}{arrow()}</a>
    <a class="btn btn--outline-light" href="{TEL}">{icon("phone")}Call {PHONE}</a>
  </div>
</div>'''


def footer():
    social = "".join(
        f'<a href="{u}" target="_blank" rel="noopener" aria-label="{n}">{icon(i)}</a>' for n, i, u in SOCIAL)
    return f'''
<footer class="site-footer on-dark">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <a href="/" aria-label="Home"><img src="/assets/img/logo-light.png" width="375" height="139" alt="Midwest Apostille &amp; Notary Services" loading="lazy"></a>
        <p>Midwest Apostille &amp; Notary provides fast, reliable, and professional apostille and notary services across Kansas City, Missouri, and nationwide including courier services and document preparation.</p>
        <div>{book_btn("Make an Appointment", "gold")}</div>
      </div>
      <nav class="footer__col" aria-labelledby="f-page">
        <h2 id="f-page">Page</h2>
        <ul role="list">
          <li><a href="/">Home</a></li>
          <li><a href="/about-us/">About Us</a></li>
          <li><a href="/services/">Services</a></li>
          <li><a href="{APPT}" target="_blank" rel="noopener">Appointment</a></li>
          <li><a href="/contact-us/">Contact Us</a></li>
        </ul>
      </nav>
      <nav class="footer__col" aria-labelledby="f-services">
        <h2 id="f-services">Services</h2>
        <ul role="list">
          <li><a href="/apostille-services/">Apostille Services</a></li>
          <li><a href="/notary-services/">Notary Services</a></li>
          <li><a href="/document-preparation-services/">Document Preparation</a></li>
          <li><a href="/jail-notary-kansas-city/">Jail Notary Kansas City</a></li>
          <li><a href="/fbi-apostille-for-hague-countries/">FBI Apostille (Hague)</a></li>
          <li><a href="/fbi-attestation-legalization/">FBI Attestation Legalization</a></li>
        </ul>
      </nav>
      <nav class="footer__col" aria-labelledby="f-res">
        <h2 id="f-res">Resources</h2>
        <ul role="list">
          <li><a href="/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/">How to Get an Apostille in Kansas City</a></li>
          <li><a href="/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/">Urgent Notary Services in Kansas City</a></li>
          <li><a href="/notary-apostille-services/" lang="en">Notary &amp; Apostille (English)</a></li>
          <li><a href="/servicios-de-notaria-y-apostilla/" lang="es">Notaría y Apostilla (Español)</a></li>
          <li><a href="/notaria-en-carceles-de-kansas-cit/" lang="es">Notaría en Cárceles (Español)</a></li>
        </ul>
      </nav>
      <div class="footer__col">
        <h2>Contact Us</h2>
        <ul class="footer__contact" role="list">
          <li>{icon("phone", "icon--sm")}<a href="{TEL}">{PHONE}</a></li>
          <li>{icon("map-pin", "icon--sm")}<a href="https://www.google.com/maps/search/?api=1&amp;query=8101+East+Bannister+Rd+Kansas+City+MO+64134" target="_blank" rel="noopener">{ADDRESS}</a></li>
          <li>{icon("mail", "icon--sm")}<a href="mailto:{EMAIL}">{EMAIL}</a></li>
        </ul>
        <h2 style="margin-top:22px">Social Media</h2>
        <div class="footer__social">{social}</div>
      </div>
    </div>
    <p class="footer__disclaimer">{DISCLAIMER}</p>
    <div class="footer__bottom">
      <p>Copyright © 2025 Midwest Apostille &amp; Notary Services @ All rights reserved. Developed and Managed by Infin Digital</p>
      <ul class="footer__legal" role="list">
        <li><a href="#" data-todo="privacy">Privacy Policy</a></li>
        <li><a href="#" data-todo="terms">Terms of Use</a></li>
        <li><a href="#" data-todo="document-handling">Document handling</a></li>
        <li><a href="#" data-todo="shipping">Shipping &amp; returns</a></li>
        <li><a class="to-top" href="#top">Back to top {icon("arrow-up-right", "icon--sm")}</a></li>
      </ul>
    </div>
  </div>
</footer>'''


def action_bar():
    return (f'<div class="action-bar" data-action-bar><a class="btn btn--ghost" href="{TEL}">{icon("phone")}Call</a>'
            f'<a class="btn btn--ghost" href="{WHATSAPP}" target="_blank" rel="noopener">{icon("whatsapp")}WhatsApp</a>'
            f'<a class="btn" href="{BOOK}" target="_blank" rel="noopener">Start Review{arrow()}</a></div>')


LOCAL_BUSINESS = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Midwest Apostille & Notary Services",
    "url": SITE + "/",
    "telephone": "+1-816-442-0295",
    "email": EMAIL,
    "image": SITE + "/assets/img/hero-world-documents-lg.webp",
    "logo": SITE + "/assets/img/logo-navy.png",
    "address": {"@type": "PostalAddress", "streetAddress": "8101 East Bannister Rd",
                "addressLocality": "Kansas City", "addressRegion": "MO", "postalCode": "64134", "addressCountry": "US"},
    "areaServed": ["Kansas City", "Missouri", "Kansas", "United States"],
    "sameAs": [u for n, _, u in SOCIAL if n != "WhatsApp"],
}


def faq_schema(items):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": re.sub("<[^>]+>", "", q),
                            "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in items]}


def page(path, title, desc, body, active="", lang="en", schema=None, lang_alt=None, og_image="hero-world-documents",
         body_class=""):
    canonical = SITE + path
    blocks = [LOCAL_BUSINESS] + (schema or [])
    ld = "".join(f'<script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>' for b in blocks)
    alt_links = ""
    if lang_alt:
        alt_links = (f'<link rel="alternate" hreflang="en" href="{SITE}{lang_alt[0]}">'
                     f'<link rel="alternate" hreflang="es" href="{SITE}{lang_alt[1]}">')
    doc = f'''<!doctype html>
<html lang="{lang}" id="top">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{canonical}">{alt_links}
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE}/assets/img/{og_image}-lg.webp">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b1b33">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Public+Sans:wght@400;500;600;700&amp;display=swap">
<link rel="stylesheet" href="/assets/css/site.css?v={VERSION}">
<script>document.documentElement.classList.add("js");</script>
{ld}
</head>
<body class="{body_class}">
<a class="skip-link" href="#main">Skip to content</a>
{_ICONS}
{header(active, lang_alt)}
<main id="main" class="page-fade">
{body}
</main>
{footer()}
{action_bar()}
<div class="cursor-tag" data-cursor-tag aria-hidden="true">View</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/site.js?v={VERSION}" defer></script>
</body>
</html>
'''
    out_dir = os.path.join(ROOT, path.strip("/"))
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "index.html"), "w") as f:
        f.write(doc)
    return path


VERSION = "1"

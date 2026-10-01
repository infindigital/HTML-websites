"""Shared layout, SEO head and structured data for the static site generator.

Every page is rendered to <route>/index.html so the live URLs are preserved.
Each call to page() registers the route, which is later used for sitemap.xml,
robots.txt and the internal SEO audit (docs/seo-audit.md).
"""
import datetime
import hashlib
import html
import json
import os
import re

from facts import GOOGLE_RATING, HOURS_TEXT, HOURS_TEXT_ES, OPENING_HOURS, PARTNER, PARTNER_URL, PRICE_RANGE

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SITE = "https://midnotarypro.com"
BRAND = "Midwest Apostille & Notary Services"
BRAND_SHORT = "Midwest Apostille & Notary"
YEAR = datetime.date.today().year
TODAY = datetime.date.today().isoformat()

BOOK = "https://midwestidentityservices.com/book-an-appointment/"
APPT = "https://midwestidentityservices.com/appointment/"
PHONE = "816-442-0295"
PHONE_FMT = "(816) 442-0295"
TEL = "tel:+18164420295"
JAIL_PHONE = "(816) 654-3074"
JAIL_TEL = "tel:+18166543074"
EMAIL = "moservices.midwest@gmail.com"
STREET = "8101 E. Bannister Rd."
CITY_LINE = "Kansas City, MO 64134"
ADDRESS = f"{STREET}, {CITY_LINE}"
MAPS_URL = "https://www.google.com/maps/search/?api=1&amp;query=8101+E+Bannister+Rd+Kansas+City+MO+64134"
GEO = (38.9513604, -94.4949732)  # from the client's Google Maps embed
WHATSAPP = "https://api.whatsapp.com/send/?phone=18166058096&amp;text&amp;type=phone_number&amp;app_absent=0"
SOCIAL = [
    ("Instagram", "instagram", "https://www.instagram.com/midwestidentityservices/"),
    ("LinkedIn", "linkedin", "https://www.linkedin.com/company/106789121/"),
    ("WhatsApp", "whatsapp", WHATSAPP),
]
MAP_EMBED = ("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.2775731243896!2d-94.49497319999999!3d38.9513604"
             "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0e6db7ae27acf%3A0xf7274205787e0618!2s8101%20Bannister"
             "%20Rd%2C%20Kansas%20City%2C%20MO%2064134%2C%20USA!5e1!3m2!1sen!2sin!4v1790685544606!5m2!1sen!2sin")
DISCLAIMER = (
    "Midwest Apostille &amp; Notary Services is a document services provider, not a law firm, and does not give "
    "legal advice. Apostille, legalization and translation requirements are set by the destination country and can "
    "change. Confirm current requirements with the relevant embassy, consulate or authority. Midwest Apostille &amp; Notary "
    "Services is a private document service and is not affiliated with any government agency."
)
DISCLAIMER_ES = (
    "Midwest Apostille &amp; Notary Services es un proveedor de servicios de documentos, no un despacho de abogados, "
    "y no ofrece asesoría legal. Los requisitos de apostilla, legalización y traducción los fija el país de destino "
    "y pueden cambiar. Confirme los requisitos vigentes con la embajada, el consulado o la autoridad correspondiente. "
    "No somos abogados y no ofrecemos asesoría legal ni de inmigración. Midwest Apostille &amp; Notary Services es un "
    "servicio privado de documentos y no está afiliado a ninguna agencia del gobierno."
)
NO_ADVICE_ES = "No somos abogados y no ofrecemos asesoría legal ni de inmigración."
NO_ADVICE = "We do not give immigration or legal advice."
CTA_LABEL = "Start Your Document Review"
CTA_LABEL_ES = "Iniciar revisión de documentos"

_DIMS = json.load(open(os.path.join(os.path.dirname(__file__), "image-dims.json")))
_ICONS = open(os.path.join(os.path.dirname(__file__), "icons.svg")).read()
_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Content hash of the CSS and JS, so a changed file always gets a new URL and never reuses a cached one.
VERSION = hashlib.sha1(b"".join(
    open(os.path.join(_ROOT, "assets", sub), "rb").read() for sub in ("css/site.css", "js/site.js")
)).hexdigest()[:10]


def esc(s):
    return html.escape(s, quote=True)


def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s))


def icon(name, cls=""):
    c = f"icon {cls}".strip()
    return f'<svg class="{c}" aria-hidden="true" focusable="false"><use href="#i-{name}"/></svg>'


def img(key, alt, sizes="100vw", eager=False, cls="", attrs=""):
    lw, lh = _DIMS[f"{key}-lg"]
    sw, _ = _DIMS[f"{key}-sm"]
    srcset = f"/assets/img/{key}-sm.webp {sw}w"
    if lw != sw:
        srcset += f", /assets/img/{key}-lg.webp {lw}w"
    load = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    c = f' class="{cls}"' if cls else ""
    a = f" {attrs}" if attrs else ""
    return (f'<img src="/assets/img/{key}-lg.webp" srcset="{srcset}" sizes="{sizes}" width="{lw}" height="{lh}" '
            f'alt="{esc(alt)}" decoding="async" {load}{c}{a}>')


def btn(label, href, kind="primary", ico="arrow-right", external=False, magnetic=False, extra=""):
    ext = ' target="_blank" rel="noopener"' if external else ""
    i = f'<span class="btn__icon">{icon(ico)}</span>' if ico else ""
    a = f'<a class="btn btn--{kind}" href="{href}"{ext}{extra}><span class="btn__label">{label}</span>{i}</a>'
    return f'<span class="magnetic" data-magnetic>{a}</span>' if magnetic else a


def cta_btn(kind="primary", label=CTA_LABEL, magnetic=False):
    return btn(label, BOOK, kind, "arrow-up-right", external=True, magnetic=magnetic)


def call_btn(kind="secondary", label=None):
    return btn(label or f"Call {PHONE}", TEL, kind, "phone")


def label(t, cls=""):
    c = f"label {cls}".strip()
    return f'<p class="{c}">{t}</p>'


def link(text, href, cls="", extra=""):
    c = f"link {cls}".strip()
    return f'<a class="{c}" href="{href}"{extra}><span>{text}</span>{icon("arrow-right")}</a>'


# --------------------------------------------------------------------------- navigation
SERVICES_MENU = [
    ("/apostille-services/", "Apostille Services"),
    ("/missouri-apostille-services/", "Missouri Apostille"),
    ("/kansas-apostille-services/", "Kansas Apostille"),
    ("/fbi-fingerprinting-apostille-kansas-city/", "FBI Fingerprinting &amp; Apostille"),
    ("/fbi-attestation-legalization/", "FBI Legalization"),
    ("/certified-translation-services/", "Certified Translation"),
    ("/notary-services/", "Notary Services"),
    ("/document-preparation-services/", "Document Preparation"),
    ("/jail-notary-kansas-city/", "Jail Notary"),
    ("/business-accounts/", "Business Accounts"),
]
RESOURCES_MENU = [
    ("/guides/", "Guides", ""),
    ("/faq/", "FAQ", ""),
    ("/apostille-services/#by-document", "Apostille by document", ""),
    ("/apostille-services/#by-country", "Apostille by country", ""),
    ("/apostille-for-dual-citizenship/", "Dual citizenship", ""),
    ("/fbi-apostille-for-hague-countries/", "FBI apostille guide", ""),
    ("/servicios-de-notaria-y-apostilla/", "Español", "es"),
    ("/ar/", "العربية", "ar"),
    ("/fr/", "Français", "fr"),
]
NAV = [
    ("home", "Home", "/", None),
    ("about", "About", "/about-us/", None),
    ("services", "Services", "/services/", SERVICES_MENU),
    ("pricing", "Pricing", "/pricing/", None),
    ("resources", "Resources", "/guides/", RESOURCES_MENU),
    ("contact", "Contact", "/contact-us/", None),
]
LANGS = [("en", "EN", "English", "/"), ("es", "ES", "Español", "/servicios-de-notaria-y-apostilla/"),
         ("ar", "AR", "العربية", "/ar/"), ("fr", "FR", "Français", "/fr/")]
ES_DEFAULT = "/servicios-de-notaria-y-apostilla/"


def _menu(items):
    out = []
    for it in items:
        href, text = it[0], it[1]
        lang = it[2] if len(it) > 2 and it[2] else ""
        la = f' lang="{lang}" hreflang="{lang}"' if lang else ""
        out.append(f'<li><a href="{href}"{la}>{text}</a></li>')
    return "".join(out)


def lang_switch(alt=None, lang="en", long=False):
    out = []
    for code, short, name, default in LANGS:
        href = (alt or {}).get(code, default)
        cur = ' aria-current="true"' if code == lang else ""
        out.append(f'<a href="{href}" lang="{code}" hreflang="{code}"{cur} aria-label="{name}">{name if long else short}</a>')
    sep = '<span aria-hidden="true">/</span>'
    return f'<p class="lang-switch{" lang-switch--lg" if long else ""}">{sep.join(out)}</p>'


def header(active, alt=None, lang="en"):
    items = []
    for key, text, href, sub in NAV:
        if key == "home":
            continue  # the logo links home
        cur = ' aria-current="page"' if key == active else ""
        if sub:
            items.append(
                f'<li class="nav__item" data-dropdown><a class="nav__link" href="{href}"{cur}>{text}</a>'
                f'<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="dd-{key}">'
                f'<span class="sr-only">{text} menu</span>{icon("chevron-down")}</button>'
                f'<ul class="dropdown" id="dd-{key}" role="list">{_menu(sub)}</ul></li>')
        else:
            items.append(f'<li class="nav__item"><a class="nav__link" href="{href}"{cur}>{text}</a></li>')
    cta = CTA_LABEL_ES if lang == "es" else CTA_LABEL
    hl = ' lang="en"' if lang in ("ar", "fr") else ""
    return f'''
<header class="site-header" data-header{hl}>
  <div class="container site-header__inner">
    <a class="brand" href="/"><img src="/assets/img/logo-navy.png" width="375" height="139" alt="{esc(BRAND)}, home"></a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list" role="list">{"".join(items)}</ul>
    </nav>
    <div class="site-header__tools">
      {lang_switch(alt, lang)}
      <a class="btn btn--primary btn--sm header-cta" href="{BOOK}" target="_blank" rel="noopener"><span class="btn__label">{cta}</span><span class="btn__icon">{icon("arrow-up-right")}</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="drawer" data-menu-open><span class="menu-toggle__bars" aria-hidden="true"></span><span class="menu-toggle__text">Menu</span></button>
    </div>
  </div>
  <div class="scroll-progress" data-progress aria-hidden="true"></div>
</header>
{drawer(alt, lang)}'''


def drawer(alt=None, lang="en"):
    cta = CTA_LABEL_ES if lang == "es" else CTA_LABEL
    return f'''
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu" data-drawer hidden>
  <div class="drawer__head">
    <img src="/assets/img/logo-navy.png" width="375" height="139" alt="">
    <button class="drawer__close" type="button" data-menu-close>{icon("x")}<span>Close</span></button>
  </div>
  <nav class="drawer__body" aria-label="Mobile">
    <ul class="drawer__list" role="list">
      <li><a href="/">Home</a></li>
      <li><a href="/about-us/">About</a></li>
      <li><details><summary>Services<span class="drawer__plus" aria-hidden="true"></span></summary><ul class="drawer__sub" role="list"><li><a href="/services/">All services</a></li>{_menu(SERVICES_MENU)}</ul></details></li>
      <li><details><summary>Resources<span class="drawer__plus" aria-hidden="true"></span></summary><ul class="drawer__sub" role="list">{_menu(RESOURCES_MENU)}</ul></details></li>
      <li><a href="/pricing/">Pricing</a></li>
      <li><a href="/contact-us/">Contact</a></li>
    </ul>
  </nav>
  <div class="drawer__foot">
    {lang_switch(alt, lang, long=True)}
    <a class="btn btn--primary" href="{BOOK}" target="_blank" rel="noopener"><span class="btn__label">{cta}</span><span class="btn__icon">{icon("arrow-up-right")}</span></a>
    <a class="btn btn--secondary" href="{TEL}"><span class="btn__label">Call {PHONE}</span><span class="btn__icon">{icon("phone")}</span></a>
  </div>
</div>'''


def footer(lang="en"):
    es = lang == "es"
    legal_links = ((("Privacidad", "Términos", "Reembolsos", "Aviso legal", "Accesibilidad") if es else
                    ("Privacy", "Terms", "Refunds", "Disclaimer", "Accessibility")),
                   ("/privacy-policy/", "/terms-and-conditions/", "/refund-and-cancellation-policy/", "/disclaimer/",
                    "/accessibility/"))
    legal = "".join(f'<li><a href="{p}"{hl}>{n}</a></li>' for n, p in zip(*legal_links)
                    for hl in [' hreflang="en"' if es else ""])
    social = "".join(
        f'<li><a href="{u}" target="_blank" rel="noopener" aria-label="{n}">{icon(i)}</a></li>' for n, i, u in SOCIAL)
    svc = "".join(f'<li><a href="{h}">{t}</a></li>' for h, t in SERVICES_MENU[:8])
    hours = HOURS_TEXT_ES if es else HOURS_TEXT
    fl = ' lang="en"' if lang in ("ar", "fr") else ""
    return f'''
<footer class="site-footer"{fl}>
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <a href="/" class="footer__logo"><img src="/assets/img/logo-light.png" width="375" height="139" alt="{esc(BRAND)}" loading="lazy"></a>
        <address class="footer__nap">
          <strong>{esc(BRAND)}</strong>
          <a href="{MAPS_URL}" target="_blank" rel="noopener">{STREET}, {CITY_LINE}</a>
          <span class="footer__hours"><b>{"Horario" if es else "Hours"}:</b> {hours}</span>
          <a class="footer__tel" href="{TEL}">{icon("phone")}{PHONE}</a>
          <a href="mailto:{EMAIL}">{EMAIL}</a>
        </address>
        <div class="footer__map"><iframe src="{MAP_EMBED}" title="{"Mapa de" if es else "Map of"} 8101 E. Bannister Rd., Kansas City, MO 64134" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      </div>
      <nav class="footer__col" aria-labelledby="f-services"><h2 id="f-services">{"Servicios" if es else "Services"}</h2><ul role="list">{svc}<li><a href="/services/">{"Todos los servicios" if es else "All services"}</a></li></ul></nav>
      <nav class="footer__col" aria-labelledby="f-res"><h2 id="f-res">{"Recursos" if es else "Resources"}</h2><ul role="list">
        <li><a href="/pricing/">{"Precios" if es else "Pricing"}</a></li>
        <li><a href="/order/">{"Ordenar en línea" if es else "Order online"}</a></li>
        <li><a href="/faq/">{"Preguntas frecuentes" if es else "FAQ"}</a></li>
        <li><a href="/guides/">{"Guías" if es else "Guides"}</a></li>
        <li><a href="/business-accounts/">{"Cuentas empresariales" if es else "Business accounts"}</a></li>
        <li><a href="/servicios-de-notaria-y-apostilla/" lang="es" hreflang="es">Servicios en español</a></li>
        <li><a href="/ar/" lang="ar" hreflang="ar">العربية</a></li>
        <li><a href="/fr/" lang="fr" hreflang="fr">Français</a></li>
      </ul></nav>
      <nav class="footer__col" aria-labelledby="f-co"><h2 id="f-co">{"Empresa" if es else "Company"}</h2><ul role="list">
        <li><a href="/about-us/">{"Nosotros" if es else "About"}</a></li>
        <li><a href="/contact-us/">{"Contacto" if es else "Contact"}</a></li>
        <li><a href="{APPT}" target="_blank" rel="noopener">{"Citas" if es else "Appointments"}</a></li>
        <li><a href="{PARTNER_URL}" target="_blank" rel="noopener">{"Socio de huellas digitales" if es else "Fingerprinting partner"}: {PARTNER}</a></li>
      </ul>
      <ul class="footer__social" role="list">{social}</ul></nav>
    </div>
    <p class="footer__disclaimer">{DISCLAIMER_ES if es else DISCLAIMER}</p>
    <div class="footer__bottom">
      <p>© {YEAR} {esc(BRAND)}. {"Todos los derechos reservados." if es else "All rights reserved."} Developed and managed by Infin Digital.</p>
      <ul class="footer__legal" role="list">{legal}</ul>
      <a class="footer__top-link" href="#top">{"Volver arriba" if es else "Back to top"}{icon("arrow-up-right")}</a>
    </div>
  </div>
</footer>'''


def action_bar(lang="en"):
    es = lang == "es"
    return (f'<div class="action-bar" data-action-bar>'
            f'<a href="{TEL}">{icon("phone")}<span>{"Llamar" if es else "Call"}</span></a>'
            f'<a href="{WHATSAPP}" target="_blank" rel="noopener">{icon("whatsapp")}<span>WhatsApp</span></a>'
            f'<a class="is-primary" href="{BOOK}" target="_blank" rel="noopener"><span>{"Iniciar revisión" if es else "Start review"}</span>{icon("arrow-up-right")}</a></div>')


# --------------------------------------------------------------------------- structured data
BUSINESS_ID = SITE + "/#business"
WEBSITE_ID = SITE + "/#website"


def business_schema():
    biz = {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": BUSINESS_ID,
        "name": BRAND,
        "alternateName": BRAND_SHORT,
        "url": SITE + "/",
        "telephone": "+1-816-442-0295",
        "email": EMAIL,
        "image": SITE + "/assets/img/apostille-certificates-lg.webp",
        "logo": SITE + "/assets/img/logo-navy.png",
        "address": {"@type": "PostalAddress", "streetAddress": STREET, "addressLocality": "Kansas City",
                    "addressRegion": "MO", "postalCode": "64134", "addressCountry": "US"},
        "geo": {"@type": "GeoCoordinates", "latitude": GEO[0], "longitude": GEO[1]},
        "areaServed": [{"@type": "City", "name": "Kansas City, MO"}, {"@type": "State", "name": "Missouri"},
                       {"@type": "State", "name": "Kansas"}, {"@type": "Country", "name": "United States"}],
        "knowsLanguage": ["en", "es", "ar", "fr"],
        "priceRange": PRICE_RANGE,
        "hasMap": MAPS_URL.replace("&amp;", "&"),
        "sameAs": [u for n, _, u in SOCIAL if n != "WhatsApp"],
    }
    if OPENING_HOURS:
        biz["openingHoursSpecification"] = [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": days.split(), "opens": o, "closes": c}
            for days, o, c in OPENING_HOURS]
    if GOOGLE_RATING:
        biz["aggregateRating"] = {"@type": "AggregateRating", "ratingValue": GOOGLE_RATING[0],
                                  "reviewCount": GOOGLE_RATING[1], "bestRating": "5"}
    return biz


def website_schema():
    return {"@type": "WebSite", "@id": WEBSITE_ID, "url": SITE + "/", "name": BRAND,
            "inLanguage": ["en", "es"], "publisher": {"@id": BUSINESS_ID}}


def breadcrumb_schema(path, crumbs, lang="en"):
    items = [({"es": "Inicio", "ar": "الرئيسية", "fr": "Accueil"}.get(lang, "Home"), "/")] + [(strip_tags(n), p) for n, p in crumbs]
    return {"@type": "BreadcrumbList", "@id": SITE + path + "#breadcrumb",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + p}
                                for i, (n, p) in enumerate(items)]}


def service_schema(path, name, desc, service_type, area=None):
    return {"@type": "Service", "@id": SITE + path + "#service", "name": name, "serviceType": service_type,
            "description": strip_tags(desc), "provider": {"@id": BUSINESS_ID}, "url": SITE + path,
            "areaServed": area or [{"@type": "City", "name": "Kansas City, MO"}, {"@type": "Country", "name": "United States"}]}


def faq_schema(path, items):
    return {"@type": "FAQPage", "@id": SITE + path + "#faq",
            "mainEntity": [{"@type": "Question", "name": strip_tags(q),
                            "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}} for q, a in items]}


def article_schema(path, headline, desc, image):
    return {"@type": "BlogPosting", "@id": SITE + path + "#article", "headline": strip_tags(headline),
            "description": strip_tags(desc), "image": f"{SITE}/assets/img/{image}-lg.webp",
            "author": {"@id": BUSINESS_ID}, "publisher": {"@id": BUSINESS_ID},
            "mainEntityOfPage": {"@id": SITE + path}, "inLanguage": "en"}


# --------------------------------------------------------------------------- page shell
PAGES = []
HEAD_SCRIPT = ('''<script>(function(d){d.classList.add("js");if(!matchMedia("(prefers-reduced-motion: reduce)").matches)'''
               '''{d.classList.add("motion-pending");setTimeout(function(){d.classList.remove("motion-pending")},2500)}})'''
               '''(document.documentElement)</script>''')
FONTS = ("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500..800"
         "&amp;family=Inter:wght@400..700&amp;display=swap")
BANNED = ["whether you", "seamless", "unlock", "empower", "elevate", "game-changing", "cutting-edge",
          "in today's", "at the intersection", "your trusted partner"]


def _check(path, doc):
    if "—" in doc:
        i = doc.index("—")
        raise SystemExit(f"Em dash found on {path}: …{doc[max(0, i - 60):i + 20]}…")
    text = re.sub(r'<div class="review[^"]*".*?</div>', "", doc, flags=re.S)  # client reviews are quoted verbatim
    text = re.sub(r"<blockquote.*?</blockquote>", "", text, flags=re.S).lower()
    for b in BANNED:
        if b in text:
            raise SystemExit(f"Banned phrase '{b}' on {path}")


def page(path, title, desc, body, *, active="", lang="en", crumbs=None, schema=(), alt=None,
         og_image="apostille-certificates", og_alt="Apostille certificates with gold seals and passports on a desk",
         body_class="", index=True, og_type="website", preload=None, h1=None, keyword="", out=None):
    """Render one page. crumbs: [(name, path), ...] after Home; alt: {"en": path, "es": path}."""
    canonical = SITE + path
    crumbs = crumbs or []
    graph = [business_schema(), website_schema()]
    webpage = {"@type": "WebPage", "@id": canonical + "#webpage", "url": canonical, "name": title,
               "description": desc, "inLanguage": lang, "isPartOf": {"@id": WEBSITE_ID},
               "about": {"@id": BUSINESS_ID},
               "primaryImageOfPage": {"@type": "ImageObject", "url": f"{SITE}/assets/img/{og_image}-lg.webp"}}
    if crumbs:
        graph.append(breadcrumb_schema(path, crumbs, lang))
        webpage["breadcrumb"] = {"@id": canonical + "#breadcrumb"}
    graph.append(webpage)
    graph += list(schema)
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")
    alt_links = ""
    if alt and index:
        alt_links = "".join(f'\n<link rel="alternate" hreflang="{k}" href="{SITE}{v}">' for k, v in alt.items())
        alt_links += f'\n<link rel="alternate" hreflang="x-default" href="{SITE}{alt["en"]}">'
    ow, oh = _DIMS[f"{og_image}-lg"]
    robots = "index, follow, max-image-preview:large" if index else "noindex, follow"
    pre = ""
    if preload:
        sw = _DIMS[f"{preload[0]}-sm"][0]
        lw = _DIMS[f"{preload[0]}-lg"][0]
        pre = (f'\n<link rel="preload" as="image" href="/assets/img/{preload[0]}-lg.webp" '
               f'imagesrcset="/assets/img/{preload[0]}-sm.webp {sw}w, /assets/img/{preload[0]}-lg.webp {lw}w" '
               f'imagesizes="{preload[1]}" fetchpriority="high">')
    locale = {"es": "es_US", "ar": "ar_AR", "fr": "fr_FR"}.get(lang, "en_US")
    main_dir = ' dir="rtl"' if lang == "ar" else ""
    doc = f'''<!doctype html>
<html lang="{lang}" id="top">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{canonical}">{alt_links}
<meta property="og:site_name" content="{esc(BRAND)}">
<meta property="og:type" content="{og_type}">
<meta property="og:locale" content="{locale}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE}/assets/img/{og_image}-lg.webp">
<meta property="og:image:width" content="{ow}">
<meta property="og:image:height" content="{oh}">
<meta property="og:image:alt" content="{esc(og_alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{SITE}/assets/img/{og_image}-lg.webp">
<meta name="theme-color" content="#ffffff">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>{pre}
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="/assets/css/site.css?v={VERSION}">
{HEAD_SCRIPT}
<script type="application/ld+json">{ld}</script>
</head>
<body class="{body_class}">
<a class="skip-link" href="#main">{"Saltar al contenido" if lang == "es" else "Skip to content"}</a>
{_ICONS}
{header(active, alt, lang)}
<main id="main"{main_dir}>
{body}
</main>
{footer(lang)}
{action_bar(lang)}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/site.js?v={VERSION}" defer></script>
</body>
</html>
'''
    _check(path, doc)
    target = out or os.path.join(ROOT, path.strip("/"), "index.html")
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "w") as f:
        f.write(doc)
    PAGES.append(dict(path=path, title=title, desc=desc, lang=lang, index=index, alt=alt, keyword=keyword,
                      crumbs=crumbs, file=target))
    return path


# --------------------------------------------------------------------------- sitemap + robots
def write_sitemap():
    """One line per indexable page, home first, then shallow pages before deeper ones, then alphabetical.
    Language alternates are declared in each page's <head>, so they are not repeated here."""
    paths = sorted((p["path"] for p in PAGES if p["index"]),
                   key=lambda u: (len([s for s in u.split("/") if s]), u))
    urls = [f"  <url><loc>{SITE}{u}</loc><lastmod>{TODAY}</lastmod></url>" for u in paths]
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<!-- Generated by _build/build.py. Run "python3 _build/build.py" after adding or removing pages.\n'
           '     A page is listed when it is indexable (not marked noindex). -->\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + "\n".join(urls) + "\n</urlset>\n")
    with open(os.path.join(ROOT, "sitemap.xml"), "w") as f:
        f.write(xml)
    with open(os.path.join(ROOT, "robots.txt"), "w") as f:
        f.write(f"# robots.txt - {BRAND}\n# {SITE}/\n\n"
                "User-agent: *\nAllow: /\n\n"
                "# Build tooling, internal notes and the form handler are not content.\n"
                "Disallow: /_build/\nDisallow: /docs/\nDisallow: /design-system/\nDisallow: /contact-handler.php\n\n"
                f"Sitemap: {SITE}/sitemap.xml\n")
    return len(urls)

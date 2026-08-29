# -*- coding: utf-8 -*-
"""Reusable HTML fragments: <head> (SEO), logo, header, footer, WhatsApp, icons."""
import html
from data import SITE, CATEGORIES

def esc(s):
    return html.escape(s or "", quote=True)

# ---- Icons (inline SVG, currentColor) -------------------------------------
ICONS = {
    "arrow": '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    "caret": '<svg class="nav__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>',
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    "pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    "clock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    "search": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    "image": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
    "chat": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.9L3 21l1.9-4.9A8.4 8.4 0 1 1 21 11.5Z"/></svg>',
    "bulb": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>',
    "gear": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4l-.2.1a2 2 0 1 1-2.8-2.9l.1-.1A1.6 1.6 0 0 0 4.6 15H4.5a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 11 4.6V4.5a2 2 0 0 1 4 0v.1A1.6 1.6 0 0 0 17.7 6l.2-.1a2 2 0 1 1 2.8 2.9l-.1.1A1.6 1.6 0 0 0 21.4 11h.1a2 2 0 0 1 0 4h-.1Z"/></svg>',
    "hand": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11V6a1.5 1.5 0 0 1 3 0v5M12 11V4.5a1.5 1.5 0 0 1 3 0V11M15 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7l-2.3-3.4a1.6 1.6 0 0 1 2.5-2L9 12"/></svg>',
    "wa": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.6-1.5-.9-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.9 4.2 1.8.8 2.5.9 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>',
    "instagram": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    "linkedin": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21H21v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H13z"/></svg>',
    "youtube": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.4a2.5 2.5 0 0 0-1.8 1.9C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.4a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12Zm-13 3V9l5 3Z"/></svg>',
}

def icon(name):
    return ICONS.get(name, "")

def social_anchors():
    """Standard social-media link row used in the home hero and the footer.
    WhatsApp uses the pre-filled enquiry link; Instagram points at the real
    Flash Print Solution profile."""
    s = SITE
    wa = s.get("whatsapp_url", "https://wa.me/%s" % s["whatsapp"])
    order = [
        ("Facebook", s["social"]["facebook"], "facebook"),
        ("WhatsApp", wa, "wa"),
        ("Instagram", s["social"]["instagram"], "instagram"),
        ("YouTube", s["social"]["youtube"], "youtube"),
        ("LinkedIn", s["social"]["linkedin"], "linkedin"),
    ]
    return "".join(
        '<a href="%s" target="_blank" rel="noopener" aria-label="%s">%s</a>'
        % (esc(url), label, icon(ic))
        for label, url, ic in order
    )

def logo(dark=False, depth=0, both=False):
    """Brand logo — the original Flash Print Solution artwork (image).
    `both=True` (header) renders both the white knock-out and the dark
    wordmark; CSS shows the correct one for the transparent-over-hero state
    vs. the sticky/light state. Otherwise a single variant is rendered:
    `dark=True` -> original dark wordmark (white footer card, mobile panel);
    `dark=False` -> white knock-out."""
    r = rel(depth)
    dark_src = "assets/images/logo/flash-logo.avif"
    light_src = "assets/images/logo/flash-logo-white.avif"
    if both:
        imgs = (
            '<img class="logo__img logo__img--light" src="%s%s" alt="Flash Print Solution" width="196" height="74" decoding="async">'
            '<img class="logo__img logo__img--dark" src="%s%s" alt="Flash Print Solution" width="196" height="74" decoding="async">'
        ) % (r, esc(light_src), r, esc(dark_src))
    else:
        src = dark_src if dark else light_src
        imgs = '<img class="logo__img" src="%s%s" alt="Flash Print Solution" width="196" height="74" decoding="async">' % (r, esc(src))
    return (
        '<a class="logo" href="{home}" aria-label="Flash Print Solution — home">'
        '%s</a>'
    ) % imgs

def rel(depth):
    """Relative path prefix for a page nested `depth` folders deep."""
    return "../" * depth

def head(page, depth=0):
    """Build the full <head>. `page` supplies title/description/canonical/og/jsonld."""
    r = rel(depth)
    canonical = SITE["domain"] + "/" + page.get("path", "")
    og_image = SITE["domain"] + "/assets/images/og/flash-print-solution-og.jpg"
    parts = []
    parts.append('<!DOCTYPE html>')
    parts.append('<html lang="en">')
    parts.append('<head>')
    parts.append('<meta charset="utf-8">')
    parts.append('<meta name="viewport" content="width=device-width, initial-scale=1">')
    parts.append('<title>%s</title>' % esc(page["title"]))
    parts.append('<meta name="description" content="%s">' % esc(page["description"]))
    parts.append('<link rel="canonical" href="%s">' % esc(canonical))
    parts.append('<meta name="theme-color" content="#100a06">')
    parts.append('<meta name="robots" content="index, follow">')
    # Open Graph
    parts.append('<meta property="og:type" content="%s">' % page.get("og_type", "website"))
    parts.append('<meta property="og:site_name" content="Flash Print Solution">')
    parts.append('<meta property="og:title" content="%s">' % esc(page["title"]))
    parts.append('<meta property="og:description" content="%s">' % esc(page["description"]))
    parts.append('<meta property="og:url" content="%s">' % esc(canonical))
    parts.append('<meta property="og:image" content="%s">' % esc(og_image))
    parts.append('<meta property="og:locale" content="en_AE">')
    # Twitter
    parts.append('<meta name="twitter:card" content="summary_large_image">')
    parts.append('<meta name="twitter:title" content="%s">' % esc(page["title"]))
    parts.append('<meta name="twitter:description" content="%s">' % esc(page["description"]))
    parts.append('<meta name="twitter:image" content="%s">' % esc(og_image))
    # Fonts
    parts.append('<link rel="preconnect" href="https://fonts.googleapis.com">')
    parts.append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
    parts.append('<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">')
    # Favicon (inline SVG data URI of the bolt)
    parts.append('<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 48 48\'%3E%3Crect width=\'48\' height=\'48\' rx=\'12\' fill=\'%23F7931E\'/%3E%3Cpath d=\'M26 9 15 26h7l-2 13 13-18h-7l2.4-12Z\' fill=\'white\'/%3E%3C/svg%3E">')
    # Styles
    for css in ["variables", "base", "components", "header", "footer", "pages", "responsive"]:
        parts.append('<link rel="stylesheet" href="%sassets/css/%s.css">' % (r, css))
    # Enable scroll-reveal only when JS runs (avoids hidden content without JS)
    parts.append('<script>document.documentElement.classList.add("reveal-ready");</script>')
    # JSON-LD
    for block in page.get("jsonld", []):
        parts.append('<script type="application/ld+json">%s</script>' % block)
    parts.append('</head>')
    return "\n".join(parts)

def _nav_links(depth, active):
    r = rel(depth)
    def cur(key):
        return ' aria-current="page"' if active == key else ""
    services_dd = "".join(
        '<a href="%sservices/%s.html">%s</a>' % (r, c["slug"], esc(c["short"]))
        for c in CATEGORIES
    )
    return r, cur, services_dd

def header(depth=0, active="", light=False):
    r, cur, services_dd = _nav_links(depth, active)
    cls = "site-header" + (" site-header--light" if light else "")
    logo_html = logo(depth=depth, both=True).replace("{home}", r + "index.html")
    return '''
<header class="{cls}">
  <div class="container">
    <nav class="nav" aria-label="Primary">
      {logo}
      <ul class="nav__menu">
        <li><a class="nav__link" href="{r}index.html"{home}>Home</a></li>
        <li><a class="nav__link" href="{r}about.html"{about}>About Us</a></li>
        <li class="has-dropdown">
          <a class="nav__link" href="{r}services.html"{services}>Services {caret}</a>
          <div class="dropdown">{services_dd}</div>
        </li>
        <li><a class="nav__link" href="{r}products.html"{products}>Products</a></li>
        <li><a class="nav__link" href="{r}contact.html"{contact}>Contact Us</a></li>
      </ul>
      <a class="btn btn--light nav__cta" href="{r}contact.html">Get in Touch</a>
      <button class="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </div>
</header>
{mobile}
'''.format(
        cls=cls, logo=logo_html, r=r, caret=icon("caret"), services_dd=services_dd,
        home=cur("home"), about=cur("about"), services=cur("services"),
        products=cur("products"), contact=cur("contact"),
        mobile=mobile_nav(depth),
    )

def mobile_nav(depth=0):
    r = rel(depth)
    services_dd = "".join(
        '<a href="%sservices/%s.html">%s</a>' % (r, c["slug"], esc(c["short"]))
        for c in CATEGORIES
    )
    return '''
<div class="mobile-nav" id="mobileNav" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="mobile-nav__overlay" tabindex="-1"></div>
  <div class="mobile-nav__panel">
    <div class="mobile-nav__head">
      {logo}
      <button class="mobile-nav__close" type="button" aria-label="Close menu">&times;</button>
    </div>
    <a class="m-link" href="{r}index.html">Home</a>
    <a class="m-link" href="{r}about.html">About Us</a>
    <div class="m-accordion">
      <button class="m-accordion__toggle" type="button" aria-expanded="false">Services <span class="plus">+</span></button>
      <div class="m-accordion__body m-sub">
        <a href="{r}services.html">All Services</a>
        {services_dd}
      </div>
    </div>
    <a class="m-link" href="{r}products.html">Products</a>
    <a class="m-link" href="{r}contact.html">Contact Us</a>
    <a class="btn btn--primary btn--block mobile-nav__cta" href="{r}contact.html">Get in Touch</a>
  </div>
</div>
'''.format(logo=logo(dark=True, depth=depth).replace("{home}", r + "index.html"), r=r, services_dd=services_dd)

def footer(depth=0):
    r = rel(depth)
    s = SITE
    services_links = "".join(
        '<li><a href="%sservices/%s.html">%s%s</a></li>' % (r, c["slug"], icon("arrow"), esc(c["short"]))
        for c in CATEGORIES
    )
    quick = [
        ("Home", r + "index.html"), ("About Us", r + "about.html"),
        ("Services", r + "services.html"), ("Products", r + "products.html"),
        ("FAQ", r + "faq.html"), ("Contact Us", r + "contact.html"),
    ]
    quick_links = "".join(
        '<li><a href="%s">%s%s</a></li>' % (href, icon("arrow"), esc(label)) for label, href in quick
    )
    socials = social_anchors()
    return '''
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        {logo}
        <p style="color:var(--color-muted);max-width:34ch;margin:1rem 0 1.2rem;">Professional printing services in Dubai — helping brands communicate better through high quality print, signage and branding.</p>
        <div class="footer-socials">{socials}</div>
      </div>
      <div class="footer-col">
        <h4>Our Services</h4>
        <ul class="footer-links">{services_links}</ul>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul class="footer-links">{quick_links}</ul>
      </div>
      <div class="footer-col">
        <h4>Get in Touch</h4>
        <ul class="footer-contact">
          <li>{ph}<a href="tel:{phone_e164}">{phone_display}</a></li>
          <li>{ml}<a href="mailto:{email}">{email}</a></li>
        </ul>
        <div class="footer-block">
          <h5>Business Hours</h5>
          <p>Monday to Saturday<br>9:30 AM to 7:00 PM</p>
        </div>
        <div class="footer-block">
          <h5>Address</h5>
          <p>{address}</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year">2026</span> Flash Print Solution. All Rights Reserved.</p>
      <nav aria-label="Legal">
        <a href="{r}privacy-policy.html">Privacy Policy</a>
        <a href="{r}terms-conditions.html">Terms &amp; Conditions</a>
      </nav>
    </div>
  </div>
</footer>
<a class="wa-float" href="https://wa.me/{whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">{wa}</a>
'''.format(
        logo=logo(dark=True, depth=depth).replace("{home}", r + "index.html"),
        socials=socials, services_links=services_links, quick_links=quick_links,
        ph=icon("phone"), ml=icon("mail"), phone_e164=s["phone_e164"],
        phone_display=esc(s["phone_display"]), email=esc(s["email"]),
        address=esc(s["address"]), r=r, whatsapp=s["whatsapp"], wa=icon("wa"),
    )

def scripts(depth=0, extra=None):
    r = rel(depth)
    files = ["main", "navigation"]
    if extra:
        files += extra
    return "\n".join('<script src="%sassets/js/%s.js" defer></script>' % (r, f) for f in files)

def placeholder(label, note="", ratio_class="", extra_class="", show_label=True):
    """Styled image placeholder that preserves layout until real assets arrive.
    Set show_label=False for background placeholders (texture only, no caption)."""
    comment = "<!-- TODO: Replace placeholder with %s -->" % esc(note) if note else ""
    mark = ''
    if show_label:
        mark = '<span class="ph-mark">{img}<span>{label}</span></span>'.format(img=icon("image"), label=esc(label))
    return (
        '{comment}<div class="image-placeholder {extra}">{mark}</div>'
    ).format(comment=comment, extra=extra_class, mark=mark)

def img(src, alt, depth=0, cls="", w=600, h=600, eager=False, sizes=""):
    """Render a real <img>. `src` is a site-root-relative path
    (e.g. assets/images/lib/032.avif); it is prefixed for the page depth."""
    r = rel(depth)
    loading = 'decoding="async"' if eager else 'loading="lazy" decoding="async"'
    dims = (' width="%d" height="%d"' % (w, h)) if (w and h) else ""
    clsattr = (' class="%s"' % cls) if cls else ""
    sz = (' sizes="%s"' % esc(sizes)) if sizes else ""
    return '<img src="%s%s" alt="%s"%s %s%s%s>' % (
        r, esc(src), esc(alt), dims, loading, sz, clsattr)

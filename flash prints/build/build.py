# -*- coding: utf-8 -*-
"""Static-site generator for Flash Print Solution.
Reads products.json (parsed from the supplied PDF) + data.py and emits every
HTML page, sitemap.xml and robots.txt into the site root (parent folder)."""
import os, json, html, re, datetime
import data as D
from data import SITE, CATEGORIES, CAT_BY_SLUG, CATEGORY_RULES, DEFAULT_CATEGORY, CATEGORY_OVERRIDES, TABS, FAQS, TESTIMONIALS, PROCESS, AREAS
import partials as P
from partials import esc, icon, header, footer, head, scripts, placeholder, img
import imgmap

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
def out(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)

# --------------------------------------------------------------------------
# Load + prepare products
# --------------------------------------------------------------------------
with open(os.path.join(os.path.dirname(__file__), "products.json"), encoding="utf-8") as f:
    PRODUCTS = json.load(f)

def assign_category(slug):
    if slug in CATEGORY_OVERRIDES:
        return CATEGORY_OVERRIDES[slug]
    for cat, keys in CATEGORY_RULES:
        for k in keys:
            if k in slug:
                return cat
    return DEFAULT_CATEGORY

# Drop exact-duplicate products (same name + identical content appears twice in
# the source PDF). This yields the true unique catalogue.
_uniq = []
_sig = set()
for p in PRODUCTS:
    key = (p["slug"], p["intro"], tuple(p["desc_paras"]))
    if key in _sig:
        continue
    _sig.add(key)
    _uniq.append(p)
PRODUCTS = _uniq

# ensure slugs are unique (differentiate any remaining same-slug different-content)
seen = {}
for p in PRODUCTS:
    base = p["slug"]
    if base in seen:
        seen[base] += 1
        p["slug"] = "%s-%d" % (base, seen[base])
    else:
        seen[base] = 1
    p["category"] = assign_category(p["slug"])
    p["url"] = "product/%s.html" % p["slug"]

# Assign a real brand image to every product from the supplied asset library.
_IMG = imgmap.assign_images(PRODUCTS)
for p in PRODUCTS:
    p["img_index"] = _IMG[p["slug"]]
    p["image"] = imgmap.img_path(p["img_index"])          # site-root relative
    p["gallery"] = imgmap.gallery_for(p["img_index"], _IMG)

BY_SLUG = {p["slug"]: p for p in PRODUCTS}
for c in CATEGORIES:
    c["products"] = [p for p in PRODUCTS if p["category"] == c["slug"]]

# Representative image for each service / category page.
CATEGORY_IMG = {
    "business-printing": 58,
    "promotional-printing": 158,
    "large-format-printing": 157,
    "signage-solutions": 105,
    "corporate-printing": 57,
    "custom-event-printing": 5,
}
for c in CATEGORIES:
    c["img_index"] = CATEGORY_IMG.get(c["slug"], imgmap.GENERIC[0])
    c["image"] = imgmap.img_path(c["img_index"])

# Fixed scene images used for hero / about / process / cta / page backgrounds.
SCENES = {
    "hero":          6,    # production printing press
    "about":         9,    # full brand collection
    "process_bg":    163,  # dark press / ink closeup
    "cta_bg":        88,    # dark exhibition backdrop
    # Every page hero shares the same background image as the home hero (image 6),
    # per the reference brief ("all hero sections must use the same background image").
    "products_bg":   6,
    "services_bg":   6,
    "about_bg":      6,
    "contact_bg":    6,
    "faq_bg":        6,
}
def scene(key, alt, depth=0, w=1280, h=720, eager=False):
    return img(imgmap.img_path(SCENES[key]), alt, depth=depth, w=w, h=h, eager=eager)

# Homepage tab membership — each of the 3 collections fills 5 pages of products.
PER_PAGE = 10
TAB_PAGES = 5
TAB_TARGET = PER_PAGE * TAB_PAGES  # 50 products per collection

def build_tab_set(curated, offset):
    """Curated slugs first (in order), then top up from the catalogue so each
    collection has TAB_TARGET products. Offset staggers the three tabs."""
    seen, res = set(), []
    for n in curated:
        if n in BY_SLUG and n not in seen:
            seen.add(n); res.append(BY_SLUG[n])
    L = len(PRODUCTS)
    i = 0
    while len(res) < TAB_TARGET and len(seen) < L:
        p = PRODUCTS[(offset + i) % L]
        i += 1
        if p["slug"] in seen:
            continue
        seen.add(p["slug"]); res.append(p)
    return res[:TAB_TARGET]

_TAB_OFFSETS = {"best-selling": 0, "new-arrivals": len(PRODUCTS) // 3,
                "latest-collection": (2 * len(PRODUCTS)) // 3}
TAB_SETS = {k: build_tab_set(v, _TAB_OFFSETS.get(k, 0)) for k, v in TABS.items()}

# --------------------------------------------------------------------------
# JSON-LD helpers
# --------------------------------------------------------------------------
def jsonld(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))

def ld_org():
    return jsonld({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": SITE["domain"] + "/#business",
        "name": SITE["name"],
        "url": SITE["domain"] + "/",
        "telephone": SITE["phone_e164"],
        "email": SITE["email"],
        "image": SITE["domain"] + "/assets/images/og/flash-print-solution-og.jpg",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Silver Tower – BB-SIT-#87 – 20 Marasi Dr",
            "addressLocality": "Business Bay",
            "addressRegion": "Dubai",
            "addressCountry": "AE",
        },
        "areaServed": [{"@type": "City", "name": a} for a in ["Dubai", "Sharjah", "Abu Dhabi", "Ajman"]],
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:30", "closes": "19:00",
        }],
        "sameAs": [SITE["social"]["facebook"], SITE["social"]["instagram"], SITE["social"]["linkedin"], SITE["social"]["youtube"]],
    })

def ld_breadcrumbs(crumbs):
    return jsonld({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": name,
             "item": SITE["domain"] + "/" + path if path else SITE["domain"] + "/"}
            for i, (name, path) in enumerate(crumbs)
        ],
    })

def ld_faq(faqs):
    return jsonld({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in faqs
        ],
    })

def ld_product(p, cat):
    return jsonld({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p["name"],
        "description": p["intro"],
        "category": cat["short"],
        "brand": {"@type": "Brand", "name": SITE["name"]},
        "url": SITE["domain"] + "/" + p["url"],
        "image": SITE["domain"] + "/" + p["image"],
    })

# --------------------------------------------------------------------------
# Shared UI fragments
# --------------------------------------------------------------------------
def breadcrumbs_html(crumbs, depth):
    r = "../" * depth
    items = []
    last = len(crumbs) - 1
    for i, (name, path) in enumerate(crumbs):
        if i == last:
            items.append('<span aria-current="page">%s</span>' % esc(name))
        else:
            href = (r + path) if path else (r + "index.html")
            items.append('<a href="%s">%s</a>' % (href, esc(name)))
    return '<nav class="breadcrumbs" aria-label="Breadcrumb">' + '<span class="sep">/</span>'.join(items) + '</nav>'

def product_card(p, depth):
    r = "../" * depth
    im = img(p["image"], "%s — Flash Print Solution Dubai" % p["name"], depth=depth,
             w=600, h=600, sizes="(max-width:600px) 45vw, 220px")
    return (
        '<article class="product-card product-cell" data-name="{name_l}" data-category="{cat}">'
        '<a class="product-card__link" href="{r}{url}">'
        '<div class="media">{im}</div>'
        '<h3 class="product-card__title">{name}</h3>'
        '</a></article>'
    ).format(name_l=esc(p["name"].lower()), cat=p["category"], r=r, url=p["url"],
             im=im, name=esc(p["name"]))

def cta_band(depth):
    r = "../" * depth
    return '''
<section class="cta-band">
  <div class="cta-band__bg">{bg}</div>
  <span class="cta-band__watermark" aria-hidden="true">Flash Print</span>
  <div class="container">
    <p class="eyebrow eyebrow--center">Work With Flash Print Solution</p>
    <h2 class="cta-band__title">Bring Your Print Ideas to Life Today</h2>
    <p class="cta-band__text">Tell us what you need and we&rsquo;ll help you choose the right materials, finishes, and printing solutions for your business.</p>
    <a class="btn btn--light" href="{r}contact.html">Get a Quote {arrow}</a>
  </div>
</section>
'''.format(bg=scene("cta_bg", "Flash Print Solution exhibition backdrop", depth, 1280, 720),
           r=r, arrow=icon("arrow"))

def faq_items_html(faqs):
    rows = []
    for i, (q, a) in enumerate(faqs):
        rows.append('''
<div class="faq-item">
  <button class="faq-item__q" type="button" aria-expanded="false" aria-controls="faq-a-{i}">
    <span>{q}</span><span class="faq-item__icon" aria-hidden="true">+</span>
  </button>
  <div class="faq-item__a" id="faq-a-{i}" role="region">
    <div class="faq-item__a-inner">{a}</div>
  </div>
</div>'''.format(i=i, q=esc(q), a=esc(a)))
    return '<div class="faq">' + "".join(rows) + '</div>'

def page_shell(page, depth, body, active="", light=False, extra_js=None):
    return "\n".join([
        head(page, depth),
        '<body>',
        '<a class="skip-link" href="#main">Skip to content</a>',
        header(depth, active=active, light=light),
        '<main id="main">',
        body,
        '</main>',
        footer(depth),
        scripts(depth, extra_js),
        '</body>', '</html>',
    ])

# --------------------------------------------------------------------------
# PAGE: Home
# --------------------------------------------------------------------------
def build_home():
    depth = 0
    # Services grid (6 cards)
    svc_cards = []
    for c in CATEGORIES:
        svc_cards.append('''
<a class="service-card" href="services/{slug}.html" aria-label="{title}">
  <div class="media">{ph}</div>
  <span class="service-card__bar">
    <span class="service-card__title">{nav}</span>
    <span class="service-card__btn">Learn More {arrow}</span>
  </span>
</a>'''.format(slug=c["slug"], title=esc(c["title"]),
               ph=img(c["image"], "%s — Flash Print Solution" % c["nav"], depth=0, w=600, h=400),
               nav=esc(c["nav"]), arrow=icon("arrow")))
    services_section = '''
<section class="section" id="services">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">What We Do</p>
      <h2 class="section-title">Our <span class="accent">Printing Services</span></h2>
    </div>
    <div class="grid services-grid" data-reveal>{cards}</div>
    <div class="services-cta"><a class="btn btn--ghost" href="services.html">Explore All Services {arrow}</a></div>
  </div>
</section>'''.format(cards="".join(svc_cards), arrow=icon("arrow"))

    # Product tabs
    tab_meta = [("best-selling", "Best Selling"), ("new-arrivals", "New Arrivals"), ("latest-collection", "Latest Collection")]
    tab_buttons = []
    panels = []
    for idx, (key, label) in enumerate(tab_meta):
        sel = "true" if idx == 0 else "false"
        tab_buttons.append('<button class="tab" role="tab" id="tab-{k}" aria-controls="panel-{k}" aria-selected="{sel}" tabindex="{ti}">{label}</button>'.format(
            k=key, sel=sel, ti="0" if idx == 0 else "-1", label=esc(label)))
        items = TAB_SETS[key]
        pages_html = []
        n_pages = max(1, -(-len(items) // PER_PAGE))  # ceil
        for pg in range(n_pages):
            chunk = items[pg * PER_PAGE:(pg + 1) * PER_PAGE]
            cards = "".join(product_card(p, depth) for p in chunk)
            pages_html.append('<div class="collection__page grid grid--5" data-page="{n}"{hidden}>{cards}</div>'.format(
                n=pg + 1, hidden="" if pg == 0 else " hidden", cards=cards))
        # numbered pager
        nums = "".join(
            '<button type="button" class="collection__pagebtn" data-goto="{n}"{cur}>{n}</button>'.format(
                n=pg + 1, cur=' aria-current="true"' if pg == 0 else "")
            for pg in range(n_pages))
        pager = ('<nav class="pagination collection__pager" aria-label="{label} pages">'
                 '<button type="button" class="collection__nav" data-goto="prev" aria-label="Previous page">{caret_l}</button>'
                 '{nums}'
                 '<button type="button" class="collection__nav" data-goto="next" aria-label="Next page">{caret_r}</button>'
                 '</nav>').format(label=esc(label), nums=nums,
                                  caret_l="&lsaquo;", caret_r="&rsaquo;")
        panels.append('<div class="tabpanel" role="tabpanel" id="panel-{k}" aria-labelledby="tab-{k}"{hidden}>'
                      '<div class="collection" data-collection>{pages}{pager}</div></div>'.format(
                          k=key, hidden="" if idx == 0 else " hidden",
                          pages="".join(pages_html), pager=pager))
    products_section = '''
<section class="section section--soft" id="products">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Our Products</p>
      <h2 class="section-title"><span class="accent">Quality Printed</span> Products<br>for Every Need</h2>
    </div>
    <div class="tabs" role="tablist" aria-label="Product collections">{buttons}</div>
    {panels}
    <div class="services-cta" style="margin-top:2.5rem"><a class="btn btn--primary" href="products.html">View All Products {arrow}</a></div>
  </div>
</section>'''.format(buttons="".join(tab_buttons), panels="".join(panels), arrow=icon("arrow"))

    # About
    about_section = '''
<section class="section" id="about">
  <div class="container">
    <div class="about" data-reveal>
      <div class="about__body">
        <p class="eyebrow">About Us</p>
        <h2 class="section-title">Your Trusted Partner<br>for Complete <span class="accent">Printing Solutions</span></h2>
        <p style="margin-top:1.2rem">Flash Print Solution is a professional printing company dedicated to helping businesses communicate better through high quality print and branding solutions. With modern technology, skilled expertise, and a commitment to deadlines, we support brands of all sizes with reliable and cost effective printing services.</p>
        <div class="about__stats">
          <div class="about__stat"><b>127+</b><span>Print products</span></div>
          <div class="about__stat"><b>6</b><span>Service categories</span></div>
          <div class="about__stat"><b>100%</b><span>On-time focus</span></div>
        </div>
        <a class="btn btn--ghost" href="about.html">Learn More {arrow}</a>
      </div>
      <div class="about__media">{ph}</div>
    </div>
  </div>
</section>'''.format(arrow=icon("arrow"), ph=img(imgmap.img_path(SCENES["about"]), "Flash Print Solution branded print materials", depth=0, w=800, h=640))

    # Process
    proc_cards = []
    for i, (title, text, ic) in enumerate(PROCESS):
        active = " process-card--active" if i == 0 else ""
        proc_cards.append('''
<div class="process-card{active}">
  <span class="process-card__icon">{icon}</span>
  <h3>{title}</h3>
  <p>{text}</p>
  <span class="process-card__num" aria-hidden="true">0{n}</span>
</div>'''.format(active=active, icon=icon(ic), title=esc(title), text=esc(text), n=i + 1))
    process_section = '''
<section class="section">
  <div class="container">
    <div class="process section" style="padding-inline:clamp(1.2rem,4vw,3rem)">
      <div class="process__bg">{bg}</div>
      <div class="container" style="padding-inline:0">
        <div class="section-head section-head--center">
          <p class="eyebrow eyebrow--center">Our Process</p>
          <h2 class="section-title">Simple, Smooth, and<br>Reliable <span class="accent">Printing Process</span></h2>
        </div>
        <div class="grid process-grid">{cards}</div>
      </div>
    </div>
  </div>
</section>'''.format(bg=scene("process_bg", "Printing production line", 0, 1280, 720), cards="".join(proc_cards))

    # Testimonials (photo left, quote right — photo kept as a placeholder to be
    # supplied later by the client)
    t_cards = []
    for body, name, role in TESTIMONIALS:
        photo = placeholder(esc(name), note="client photo of %s" % name,
                            extra_class="testimonial__photo-ph", show_label=False)
        t_cards.append('''
<figure class="testimonial">
  <div class="testimonial__photo">{photo}</div>
  <div class="testimonial__content">
    <span class="testimonial__quote" aria-hidden="true">&rdquo;</span>
    <blockquote class="testimonial__body">{body}</blockquote>
    <figcaption class="testimonial__person">
      <span class="testimonial__name">{name}</span>
      <span class="testimonial__role">{role}</span>
    </figcaption>
  </div>
</figure>'''.format(body=esc(body), name=esc(name), role=esc(role), photo=photo))
    testimonials_section = '''
<section class="section section--soft">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center">Testimonials</p>
      <h2 class="section-title">What Our <span class="accent">Clients</span> Say About Us</h2>
    </div>
    <div class="grid testimonials-grid" data-reveal>{cards}</div>
  </div>
</section>'''.format(cards="".join(t_cards))

    # SEO content + areas
    areas_html = ", ".join(AREAS)
    seo_section = '''
<section class="section">
  <div class="container container--narrow">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center">Printing Company in Dubai</p>
      <h2 class="section-title">High Quality <span class="accent">Printing Services in Dubai</span></h2>
    </div>
    <div class="prose">
      <p>Flash Print Solution is a trusted printing press in Dubai offering a complete range of digital printing, business printing and large format printing services. From business card printing and corporate stationery to signage printing, promotional printing and event branding, we help companies present themselves professionally across every medium.</p>
      <p>Whether you need a small run of premium business cards or a full corporate rollout of signage and branded materials, our team combines modern printing technology with careful finishing to deliver sharp, vibrant and durable results. We handle both small and large print orders, and offer fast, express options when your deadline is tight.</p>
      <p>We proudly serve businesses across Dubai and the wider UAE, including {areas} and beyond. Tell us what you need and our team will recommend the right materials, finishes and printing solutions for your brand.</p>
    </div>
  </div>
</section>'''.format(areas=esc(areas_html))

    # FAQ (dark)
    faq_section = '''
<section class="section section--dark">
  <div class="container container--narrow">
    <div class="section-head section-head--center">
      <p class="eyebrow eyebrow--center">FAQ</p>
      <h2 class="section-title">Frequently Asked <span class="accent">Questions</span></h2>
    </div>
    {faqs}
  </div>
</section>'''.format(faqs=faq_items_html(FAQS))

    contact_section = contact_block(depth, heading_eyebrow="Get in Touch",
                                    heading="Let&rsquo;s Talk About Your <span class=\"accent\">Printing</span> Requirements",
                                    text="Have a question or need a quote for your printing project? Reach out to Flash Print Solution and our team will assist you with the right solutions, pricing, and timelines.")

    hero = '''
<section class="hero">
  <div class="hero__bg">{bg}</div>
  <div class="container">
    <div class="hero__inner">
      <span class="hero__badge">Fast. Reliable. Professional Printing</span>
      <h1 class="hero__title"><span class="accent">Printing Services in Dubai</span> That Bring Your Brand to Life</h1>
      <p class="hero__text">We deliver high-quality printing services in Dubai, helping businesses create impactful materials from business cards to signage and branding solutions.</p>
      <a class="btn btn--light" href="contact.html">Get a Quote {arrow}</a>
    </div>
  </div>
  <span class="scroll-hint" aria-hidden="true">Scroll Down
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
  </span>
  <div class="hero__socials">
    <a href="{li}" target="_blank" rel="noopener" aria-label="LinkedIn">{li_i}</a>
    <a href="{ig}" target="_blank" rel="noopener" aria-label="Instagram">{ig_i}</a>
    <a href="{fb}" target="_blank" rel="noopener" aria-label="Facebook">{fb_i}</a>
  </div>
</section>'''.format(bg=scene("hero", "Printing press producing branded materials in Dubai", 0, 1920, 1080, eager=True),
                     arrow=icon("arrow"),
                     li=SITE["social"]["linkedin"], ig=SITE["social"]["instagram"], fb=SITE["social"]["facebook"],
                     li_i=icon("linkedin"), ig_i=icon("instagram"), fb_i=icon("facebook"))

    body = hero + services_section + products_section + about_section + process_section + testimonials_section + seo_section + faq_section + contact_section + cta_band(depth)

    page = {
        "title": "Flash Print Solution | Printing Services in Dubai",
        "description": "Flash Print Solution offers professional printing services in Dubai — business cards, signage, large format, promotional and corporate printing. Fast, reliable and high quality. Get a quote today.",
        "path": "", "og_type": "website",
        "jsonld": [ld_org(), ld_faq(FAQS),
                   ld_breadcrumbs([("Home", "")])],
    }
    out("index.html", page_shell(page, depth, body, active="home", light=False, extra_js=["tabs", "collections", "faq", "forms"]))

# --------------------------------------------------------------------------
# Shared contact block (home + contact page)
# --------------------------------------------------------------------------
def contact_block(depth, heading_eyebrow, heading, text, soft=False):
    r = "../" * depth
    cls = "section section--soft" if soft else "section"
    return '''
<section class="{cls}" id="contact">
  <div class="container">
    <div class="contact" data-reveal>
      <div>
        <p class="eyebrow">{eyebrow}</p>
        <h2 class="section-title">{heading}</h2>
        <p class="lead" style="margin:1rem 0 1.6rem">{text}</p>
        <form class="contact-form" novalidate>
          <div class="field">
            <label for="cf-name">Name</label>
            <input id="cf-name" name="name" type="text" autocomplete="name" placeholder="Your name" required>
            <span class="field__error">Please enter your name.</span>
          </div>
          <div class="field">
            <label for="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
            <span class="field__error">Please enter a valid email address.</span>
          </div>
          <div class="field">
            <label for="cf-message">Message</label>
            <textarea id="cf-message" name="message" placeholder="Tell us about your printing project — product, quantity, size and timeline." required></textarea>
            <span class="field__error">Please add a few more details.</span>
          </div>
          <p class="form-note">By submitting this form you agree to be contacted about your enquiry. This static form is ready to connect to your preferred endpoint.</p>
          <div class="form-status" role="status" aria-live="polite"></div>
          <button class="btn btn--primary btn--block" type="submit">Send</button>
        </form>
      </div>
      <div>
        <div class="map-embed">
          <iframe src="{map}" title="Flash Print Solution location — Silver Tower, Business Bay, Dubai" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div class="contact-cards">
          <div class="contact-card">{ph}<div><h4>Call Us</h4><a href="tel:{phe}">{phd}</a></div></div>
          <div class="contact-card">{ml}<div><h4>Email</h4><a href="mailto:{email}">{email}</a></div></div>
          <div class="contact-card">{cl}<div><h4>Business Hours</h4><p>Mon–Sat, 9:30 AM – 7:00 PM</p></div></div>
          <div class="contact-card">{pin}<div><h4>Visit Us</h4><p>{addr_short}</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>'''.format(cls=cls, eyebrow=esc(heading_eyebrow), heading=heading, text=esc(text),
                     map=esc(SITE["map_embed"]), ph=icon("phone"), phe=SITE["phone_e164"], phd=esc(SITE["phone_display"]),
                     ml=icon("mail"), email=esc(SITE["email"]), cl=icon("clock"), pin=icon("pin"),
                     addr_short=esc(SITE["address_short"]))

# --------------------------------------------------------------------------
# PAGE: Products archive
# --------------------------------------------------------------------------
def build_products():
    depth = 0
    chips = ['<button class="filter-chip" data-category="all" aria-pressed="true">All Products</button>']
    for c in CATEGORIES:
        chips.append('<button class="filter-chip" data-category="%s" aria-pressed="false">%s</button>' % (c["slug"], esc(c["short"])))
    cards = "".join(product_card(p, depth) for p in PRODUCTS)
    crumbs = [("Home", ""), ("Products", "products.html")]
    body = '''
<section class="page-hero">
  <div class="page-hero__bg">{bg}</div>
  <div class="container">
    <div class="page-hero__inner">
      {crumbs_ld}
      <p class="eyebrow eyebrow--center">Our Products</p>
      <h1 class="page-hero__title">Quality <span class="accent">Printed Products</span> in Dubai</h1>
      <p class="page-hero__text">Browse our complete catalogue of {n} print products — from business stationery and promotional items to signage, large format and custom event printing.</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="archive-toolbar">
      <div class="archive-search">
        {search}
        <input id="archiveSearch" type="search" placeholder="Search products…" aria-label="Search products">
      </div>
      <p class="archive-count" id="archiveCount">{n} products</p>
    </div>
    <div class="archive-filters" role="group" aria-label="Filter by category">{chips}</div>
    <div class="grid archive-grid" id="archiveGrid" data-per-page="12" style="margin-top:2rem">{cards}</div>
    <p class="no-results" id="noResults">No products match your search. Try a different keyword or category.</p>
    <nav class="pagination" id="archivePagination" aria-label="Products pagination"></nav>
  </div>
</section>
'''.format(bg=scene("products_bg", "Flash Print Solution printed products display", 0, 1280, 720),
           crumbs_ld=breadcrumbs_html(crumbs, depth), n=len(PRODUCTS),
           search=icon("search"), chips="".join(chips), cards=cards)
    body += cta_band(depth)
    page = {
        "title": "Products | Flash Print Solution — Printing Products in Dubai",
        "description": "Explore 127+ printing products from Flash Print Solution in Dubai — business cards, banners, signage, stickers, corporate stationery, promotional items and more.",
        "path": "products.html", "og_type": "website",
        "jsonld": [ld_org(), ld_breadcrumbs(crumbs)],
    }
    out("products.html", page_shell(page, depth, body, active="products", light=False, extra_js=["products"]))

# --------------------------------------------------------------------------
# PAGE: individual product
# --------------------------------------------------------------------------
def build_product(p):
    depth = 1
    cat = CAT_BY_SLUG[p["category"]]
    crumbs = [("Home", ""), ("Products", "products.html"), (cat["short"], "services/%s.html" % cat["slug"]), (p["name"], p["url"])]
    desc_html = "".join("<p>%s</p>" % esc(par) for par in p["desc_paras"])
    related = [x for x in cat["products"] if x["slug"] != p["slug"]][:5]
    if len(related) < 5:  # top up from full catalogue so the row is always full
        for x in PRODUCTS:
            if x["slug"] != p["slug"] and x not in related:
                related.append(x)
            if len(related) >= 5:
                break
    related_cards = "".join(product_card(x, depth) for x in related[:5])
    wa_text = "Hi Flash Print Solution, I'd like a quote for %s." % p["name"]
    wa_href = "https://wa.me/%s?text=%s" % (SITE["whatsapp"], html.escape(wa_text.replace(" ", "%20"), quote=True))
    meta_desc = (p["intro"][:150] + "…") if len(p["intro"]) > 155 else p["intro"]

    # Gallery: main image + thumbnails (complementary brand shots)
    gallery = p["gallery"]
    main_src = imgmap.img_path(gallery[0])
    main_img = img(main_src, p["name"], depth=depth, w=800, h=800, eager=True)
    thumbs = []
    for i, gi in enumerate(gallery):
        src = imgmap.img_path(gi)
        thumbs.append(
            '<button type="button" class="product-thumbs__btn" data-full="{full}"{cur} aria-label="View image {n}">{im}</button>'.format(
                full=esc(P.rel(depth) + src), n=i + 1,
                cur=' aria-current="true"' if i == 0 else "",
                im=img(src, "%s thumbnail %d" % (p["name"], i + 1), depth=depth, w=160, h=160)))
    thumbs_html = "".join(thumbs)

    body = '''
<section class="page-hero" style="padding-bottom:2rem">
  <div class="page-hero__bg">{bg}</div>
  <div class="container"><div class="page-hero__inner">{crumbs}</div></div>
</section>
<section class="section" style="padding-top:2.5rem">
  <div class="container">
    <div class="product-detail">
      <div class="product-gallery" data-gallery>
        <div class="product-gallery__main">
          <button type="button" class="product-gallery__zoom" data-zoom aria-label="Zoom image">{search}</button>
          {main}
        </div>
        <div class="product-thumbs">{thumbs}</div>
      </div>
      <div class="product-info">
        <div class="product-meta"><span class="badge">{cat}</span></div>
        <h1>{name}</h1>
        <p class="intro">{intro}</p>
        <div class="product-actions">
          <a class="btn btn--primary" href="../contact.html">Enquire Now {arrow}</a>
          <a class="btn btn--wa" href="{wa}" target="_blank" rel="noopener">{wa_i} Whatsapp Us</a>
        </div>
        <div class="product-accordion" data-accordion>
          <div class="product-accordion__item">
            <button type="button" class="product-accordion__head" aria-expanded="true" aria-controls="pa-desc">
              <span>Description</span><span class="pa-icon" aria-hidden="true">&minus;</span>
            </button>
            <div class="product-accordion__panel" id="pa-desc">
              <div class="product-accordion__inner">{desc}</div>
            </div>
          </div>
          <div class="product-accordion__item">
            <button type="button" class="product-accordion__head" aria-expanded="false" aria-controls="pa-rev">
              <span>Reviews</span><span class="pa-icon" aria-hidden="true">+</span>
            </button>
            <div class="product-accordion__panel" id="pa-rev" hidden>
              <div class="product-accordion__inner"><p class="product-reviews-empty">There are no reviews yet. Be the first to enquire about {name}.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section section--soft related">
  <div class="container">
    <div class="section-head"><p class="eyebrow">You may also like</p><h2 class="section-title">Related <span class="accent">Products</span></h2></div>
    <div class="grid grid--5">{related}</div>
  </div>
</section>
<div class="lightbox" data-lightbox aria-hidden="true">
  <button type="button" class="lightbox__close" data-lightbox-close aria-label="Close">&times;</button>
  <img src="{main_src}" alt="{name}">
</div>
'''.format(bg=img(main_src, p["name"], depth=depth, w=1280, h=720),
           crumbs=breadcrumbs_html(crumbs, depth),
           search=icon("search"), main=main_img, thumbs=thumbs_html,
           cat=esc(cat["short"]), name=esc(p["name"]), intro=esc(p["intro"]),
           arrow=icon("arrow"), wa=wa_href, wa_i=icon("wa"), desc=desc_html,
           related=related_cards, main_src=esc(P.rel(depth) + main_src))
    body += cta_band(depth)
    page = {
        "title": "%s in Dubai | Flash Print Solution" % p["name"],
        "description": meta_desc,
        "path": p["url"], "og_type": "product",
        "jsonld": [ld_org(), ld_breadcrumbs(crumbs), ld_product(p, cat)],
    }
    out(p["url"], page_shell(page, depth, body, active="products", light=False, extra_js=["product"]))

# --------------------------------------------------------------------------
# PAGE: Services overview
# --------------------------------------------------------------------------
def build_services():
    depth = 0
    rows = []
    for c in CATEGORIES:
        chips = "".join("<li>%s</li>" % esc(x["name"]) for x in c["products"][:6])
        rows.append('''
<div class="service-row">
  <div class="service-row__media">{ph}</div>
  <div class="service-row__body">
    <p class="eyebrow">{tag}</p>
    <h2>{title}</h2>
    <p>{intro}</p>
    <ul>{chips}</ul>
    <a class="btn btn--ghost" href="services/{slug}.html">View {short} {arrow}</a>
  </div>
</div>'''.format(ph=img(c["image"], "%s — Flash Print Solution" % c["nav"], depth=0, w=640, h=480),
                 tag=esc(c["tag"]), title=esc(c["title"]), intro=esc(c["intro"]),
                 chips=chips, slug=c["slug"], short=esc(c["short"]), arrow=icon("arrow")))
    crumbs = [("Home", ""), ("Services", "services.html")]
    body = '''
<section class="page-hero">
  <div class="page-hero__bg">{bg}</div>
  <div class="container"><div class="page-hero__inner">
    {crumbs}
    <p class="eyebrow eyebrow--center">What We Do</p>
    <h1 class="page-hero__title">Our <span class="accent">Printing Services</span> in Dubai</h1>
    <p class="page-hero__text">From everyday business stationery to large format signage and complete brand rollouts, Flash Print Solution offers six core service areas covering every printing need.</p>
  </div></div>
</section>
<section class="section"><div class="container">{rows}</div></section>
'''.format(bg=scene("services_bg", "Flash Print Solution exhibition and signage", 0, 1280, 720),
           crumbs=breadcrumbs_html(crumbs, depth), rows="".join(rows))
    body += cta_band(depth)
    page = {
        "title": "Printing Services in Dubai | Flash Print Solution",
        "description": "Discover the full range of printing services in Dubai from Flash Print Solution — business stationery, promotional, large format, signage, corporate and custom event printing.",
        "path": "services.html", "og_type": "website",
        "jsonld": [ld_org(), ld_breadcrumbs(crumbs)],
    }
    out("services.html", page_shell(page, depth, body, active="services", light=False))

# --------------------------------------------------------------------------
# PAGE: service / category
# --------------------------------------------------------------------------
def build_category(c):
    depth = 1
    crumbs = [("Home", ""), ("Services", "services.html"), (c["short"], "services/%s.html" % c["slug"])]
    cards = "".join(product_card(p, depth) for p in c["products"])
    other = [x for x in CATEGORIES if x["slug"] != c["slug"]]
    other_links = "".join('<a class="btn btn--ghost btn--sm" href="%s.html">%s</a>' % (x["slug"], esc(x["short"])) for x in other)
    body = '''
<section class="page-hero">
  <div class="page-hero__bg">{bg}</div>
  <div class="container"><div class="page-hero__inner">
    {crumbs}
    <p class="eyebrow eyebrow--center">{tag}</p>
    <h1 class="page-hero__title">{title}</h1>
    <p class="page-hero__text">{intro}</p>
    <a class="btn btn--light" href="../contact.html">Request a Quote {arrow}</a>
  </div></div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">{n} products</p><h2 class="section-title">{short} <span class="accent">Products</span></h2></div>
    <div class="grid grid--4">{cards}</div>
    <div class="services-cta" style="margin-top:2.5rem;gap:.6rem;flex-wrap:wrap">{other}</div>
  </div>
</section>
'''.format(bg=img(c["image"], "%s — Flash Print Solution" % c["nav"], depth=1, w=1280, h=720),
           crumbs=breadcrumbs_html(crumbs, depth), tag=esc(c["tag"]), title=esc(c["title"]),
           intro=esc(c["intro"]), arrow=icon("arrow"), n=len(c["products"]), short=esc(c["short"]),
           cards=cards, other=other_links)
    body += cta_band(depth)
    page = {
        "title": "%s | Flash Print Solution" % c["title"],
        "description": c["meta"],
        "path": "services/%s.html" % c["slug"], "og_type": "website",
        "jsonld": [ld_org(), ld_breadcrumbs(crumbs)],
    }
    out("services/%s.html" % c["slug"], page_shell(page, depth, body, active="services", light=False))

# --------------------------------------------------------------------------
# PAGE: About
# --------------------------------------------------------------------------
def build_about():
    depth = 0
    crumbs = [("Home", ""), ("About Us", "about.html")]
    values = [
        ("Quality First", "Every job is produced with modern technology and careful finishing for sharp, consistent results."),
        ("On-Time Delivery", "We respect your deadlines and offer fast, express options when time is tight."),
        ("End-to-End Support", "From design and artwork to printing, finishing and delivery, we handle the whole process."),
        ("Fair, Clear Pricing", "Cost-effective printing for businesses of every size, with transparent quotes."),
    ]
    vcards = "".join('<div class="process-card" style="min-height:auto"><h3 style="font-size:1.15rem">{t}</h3><p>{d}</p></div>'.format(t=esc(t), d=esc(d)) for t, d in values)
    body = '''
<section class="page-hero">
  <div class="page-hero__bg">{bg}</div>
  <div class="container"><div class="page-hero__inner">
    {crumbs}
    <p class="eyebrow eyebrow--center">About Us</p>
    <h1 class="page-hero__title">Your Trusted Partner for <span class="accent">Printing Solutions</span></h1>
    <p class="page-hero__text">A professional printing company in Dubai helping brands of all sizes communicate better through high quality print, signage and branding.</p>
  </div></div>
</section>
<section class="section"><div class="container">
  <div class="about">
    <div class="about__body">
      <p class="eyebrow">Who We Are</p>
      <h2 class="section-title">Complete <span class="accent">Printing Solutions</span> in Dubai</h2>
      <p style="margin-top:1.2rem">Flash Print Solution is a professional printing company dedicated to helping businesses communicate better through high quality print and branding solutions. With modern technology, skilled expertise, and a commitment to deadlines, we support brands of all sizes with reliable and cost effective printing services.</p>
      <p>From business stationery and promotional materials to large format signage, corporate branding and custom event printing, we bring your ideas to life with precision and care — handling both small and large print orders across Dubai and the wider UAE.</p>
      <a class="btn btn--primary" href="contact.html">Work With Us {arrow}</a>
    </div>
    <div class="about__media">{ph}</div>
  </div>
</div></section>
<section class="section section--soft"><div class="container">
  <div class="section-head section-head--center"><p class="eyebrow eyebrow--center">Why Choose Us</p><h2 class="section-title">Built on <span class="accent">Quality &amp; Trust</span></h2></div>
  <div class="grid grid--4">{vcards}</div>
</div></section>
'''.format(bg=scene("about_bg", "Flash Print Solution office branding", 0, 1280, 720),
           crumbs=breadcrumbs_html(crumbs, depth), arrow=icon("arrow"),
           ph=img(imgmap.img_path(SCENES["about"]), "Flash Print Solution branded print materials", depth=0, w=800, h=640),
           vcards=vcards)
    body += cta_band(depth)
    page = {
        "title": "About Us | Flash Print Solution — Printing Company in Dubai",
        "description": "Flash Print Solution is a professional printing company in Dubai delivering high quality print, signage and branding for businesses of all sizes across the UAE.",
        "path": "about.html", "og_type": "website",
        "jsonld": [ld_org(), ld_breadcrumbs(crumbs)],
    }
    out("about.html", page_shell(page, depth, body, active="about", light=False))

# --------------------------------------------------------------------------
# PAGE: Contact
# --------------------------------------------------------------------------
def build_contact():
    depth = 0
    crumbs = [("Home", ""), ("Contact Us", "contact.html")]
    body = '''
<section class="page-hero">
  <div class="page-hero__bg">{bg}</div>
  <div class="container"><div class="page-hero__inner">
    {crumbs}
    <p class="eyebrow eyebrow--center">Get in Touch</p>
    <h1 class="page-hero__title">Contact <span class="accent">Flash Print Solution</span></h1>
    <p class="page-hero__text">Have a question or need a quote for your printing project? Our Dubai team is ready to help with the right solutions, pricing and timelines.</p>
  </div></div>
</section>
'''.format(bg=scene("contact_bg", "Flash Print Solution reception", 0, 1280, 720),
           crumbs=breadcrumbs_html(crumbs, depth))
    body += contact_block(depth, "Send a Message",
                          "Let&rsquo;s Talk About Your <span class=\"accent\">Printing</span> Requirements",
                          "Reach out and our team will assist you with the right printing solutions, pricing, and timelines for your business.")
    body += cta_band(depth)
    page = {
        "title": "Contact Us | Flash Print Solution — Printing in Dubai",
        "description": "Contact Flash Print Solution in Business Bay, Dubai. Call +971 58 891 7109, email sales@flashprintsolution.com or send a message for a printing quote.",
        "path": "contact.html", "og_type": "website",
        "jsonld": [ld_org(), ld_breadcrumbs(crumbs)],
    }
    out("contact.html", page_shell(page, depth, body, active="contact", light=False, extra_js=["forms"]))

# --------------------------------------------------------------------------
# PAGE: FAQ
# --------------------------------------------------------------------------
def build_faq():
    depth = 0
    crumbs = [("Home", ""), ("FAQ", "faq.html")]
    body = '''
<section class="page-hero">
  <div class="page-hero__bg">{bg}</div>
  <div class="container"><div class="page-hero__inner">
    {crumbs}
    <p class="eyebrow eyebrow--center">FAQ</p>
    <h1 class="page-hero__title">Frequently Asked <span class="accent">Questions</span></h1>
    <p class="page-hero__text">Answers to common questions about our printing services, turnaround times and how to get a quote.</p>
  </div></div>
</section>
<section class="section"><div class="container container--narrow">{faqs}</div></section>
'''.format(bg=scene("faq_bg", "Flash Print Solution services", 0, 1280, 720),
           crumbs=breadcrumbs_html(crumbs, depth), faqs=faq_items_html(FAQS))
    body += cta_band(depth)
    page = {
        "title": "FAQ | Flash Print Solution — Printing Services in Dubai",
        "description": "Frequently asked questions about Flash Print Solution's printing services in Dubai — turnaround times, design help, order sizes and how to get a quote.",
        "path": "faq.html", "og_type": "website",
        "jsonld": [ld_org(), ld_faq(FAQS), ld_breadcrumbs(crumbs)],
    }
    out("faq.html", page_shell(page, depth, body, active="", light=False, extra_js=["faq"]))

# --------------------------------------------------------------------------
# Simple content pages: privacy, terms, 404
# --------------------------------------------------------------------------
def simple_page(path, title, desc, active, h1, blocks, crumbs, depth=0, is404=False):
    inner = "".join(blocks)
    if is404:
        body = '''
<section class="section" style="padding-top:calc(var(--header-h) + 3rem)">
  <div class="container">
    <div class="error-page">
      <p class="code">404</p>
      <h1 class="section-title">Page Not Found</h1>
      <p class="lead mx-auto" style="margin:1rem auto 0">The page you are looking for may have been moved or no longer exists. Let&rsquo;s get you back on track.</p>
      <div class="actions">
        <a class="btn btn--primary" href="index.html">Back to Home {arrow}</a>
        <a class="btn btn--ghost" href="products.html">Browse Products</a>
        <a class="btn btn--ghost" href="contact.html">Contact Us</a>
      </div>
    </div>
  </div>
</section>'''.format(arrow=icon("arrow"))
    else:
        body = '''
<section class="page-hero">
  <div class="container"><div class="page-hero__inner">
    {crumbs}
    <h1 class="page-hero__title">{h1}</h1>
  </div></div>
</section>
<section class="section"><div class="container"><div class="prose">{inner}</div></div></section>
'''.format(crumbs=breadcrumbs_html(crumbs, depth), h1=esc(h1), inner=inner)
    page = {"title": title, "description": desc, "path": path, "og_type": "website",
            "jsonld": [ld_org()] + ([ld_breadcrumbs(crumbs)] if not is404 else [])}
    # 404 should not be indexed
    shell = page_shell(page, depth, body, active=active, light=(True if is404 else False))
    if is404:
        shell = shell.replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, follow">')
    out(path, shell)

def build_legal_and_404():
    today = datetime.date.today().strftime("%B %Y")
    privacy_blocks = [
        "<p>This Privacy Policy explains how Flash Print Solution (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information collected through this website. Last updated: %s.</p>" % esc(today),
        "<h2>Information We Collect</h2><p>When you submit an enquiry or quote request, we collect the details you provide such as your name, email address and message. We use this information solely to respond to your enquiry and provide our printing services.</p>",
        "<h2>How We Use Your Information</h2><ul><li>To respond to enquiries and prepare quotes</li><li>To provide and improve our printing services</li><li>To communicate with you about your orders</li></ul>",
        "<h2>Data Sharing</h2><p>We do not sell your personal information. We only share details with trusted partners where necessary to fulfil your order.</p>",
        "<h2>Contact</h2><p>For any privacy questions, contact us at <a href=\"mailto:%s\">%s</a> or %s.</p>" % (SITE["email"], SITE["email"], esc(SITE["phone_display"])),
    ]
    simple_page("privacy-policy.html", "Privacy Policy | Flash Print Solution",
                "Privacy Policy for Flash Print Solution — how we collect, use and protect information submitted through our website.",
                "", "Privacy Policy", privacy_blocks, [("Home", ""), ("Privacy Policy", "privacy-policy.html")])

    terms_blocks = [
        "<p>These Terms &amp; Conditions govern your use of the Flash Print Solution website and services. By using this site you agree to these terms. Last updated: %s.</p>" % esc(today),
        "<h2>Quotes &amp; Orders</h2><p>All quotes are provided based on the specifications you supply. Final pricing, materials and timelines are confirmed before production begins.</p>",
        "<h2>Artwork &amp; Approvals</h2><p>You are responsible for ensuring artwork is accurate and print-ready, or you may use our design services. Production proceeds only after your approval.</p>",
        "<h2>Intellectual Property</h2><p>All content on this website is the property of Flash Print Solution unless otherwise stated and may not be reproduced without permission.</p>",
        "<h2>Contact</h2><p>Questions about these terms? Contact us at <a href=\"mailto:%s\">%s</a>.</p>" % (SITE["email"], SITE["email"]),
    ]
    simple_page("terms-conditions.html", "Terms & Conditions | Flash Print Solution",
                "Terms & Conditions for using the Flash Print Solution website and printing services in Dubai.",
                "", "Terms & Conditions", terms_blocks, [("Home", ""), ("Terms & Conditions", "terms-conditions.html")])

    simple_page("404.html", "Page Not Found | Flash Print Solution",
                "The page you are looking for could not be found.", "", "Page Not Found", [], [], is404=True)

# --------------------------------------------------------------------------
# sitemap.xml + robots.txt
# --------------------------------------------------------------------------
def build_sitemap():
    today = datetime.date.today().isoformat()
    urls = ["", "about.html", "services.html", "products.html", "contact.html", "faq.html",
            "privacy-policy.html", "terms-conditions.html"]
    urls += ["services/%s.html" % c["slug"] for c in CATEGORIES]
    urls += [p["url"] for p in PRODUCTS]
    rows = []
    for u in urls:
        loc = SITE["domain"] + "/" + u
        if u == "":
            pr, cf = "1.0", "weekly"
        elif u.startswith("product/"):
            pr, cf = "0.7", "monthly"
        elif u.startswith("services/") or u in ("products.html", "services.html"):
            pr, cf = "0.8", "monthly"
        else:
            pr, cf = "0.6", "monthly"
        rows.append("  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n    <changefreq>%s</changefreq>\n    <priority>%s</priority>\n  </url>" % (esc(loc), today, cf, pr))
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n"
    out("sitemap.xml", xml)

    robots = "User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n" % SITE["domain"]
    out("robots.txt", robots)

# --------------------------------------------------------------------------
# Run
# --------------------------------------------------------------------------
def main():
    build_home()
    build_products()
    build_services()
    build_about()
    build_contact()
    build_faq()
    build_legal_and_404()
    for c in CATEGORIES:
        build_category(c)
    for p in PRODUCTS:
        build_product(p)
    build_sitemap()

    # category distribution report
    from collections import Counter
    dist = Counter(p["category"] for p in PRODUCTS)
    print("Products: %d" % len(PRODUCTS))
    for c in CATEGORIES:
        print("  %-22s %d" % (c["short"], dist[c["slug"]]))
    print("Pages written: home, about, services, products, contact, faq, privacy, terms, 404,")
    print("  %d category pages, %d product pages, sitemap.xml, robots.txt" % (len(CATEGORIES), len(PRODUCTS)))

if __name__ == "__main__":
    main()

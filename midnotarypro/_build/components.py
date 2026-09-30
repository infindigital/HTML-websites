"""Reusable editorial sections. Facts come from the client's content PDF; see facts.py for
time-sensitive values (pricing, turnaround)."""
from countries import HAGUE, HAGUE_NOTES, LEGALIZATION, NON_HAGUE_MENTIONED, REVIEWED_LIST, slug
from facts import (APOSTILLE_RUSH_OTHER_STATES, APOSTILLE_STD_PRICE, APOSTILLE_STD_TIME, APOSTILLE_VIP_PRICE,
                   LANGUAGES)
from lib import (ADDRESS, BOOK, STREET, CITY_LINE, DISCLAIMER, DISCLAIMER_ES, EMAIL, MAPS_URL, PHONE, TEL, WHATSAPP, btn, call_btn,
                 cta_btn, esc, icon, img, label, link)


# ----------------------------------------------------------------------------- primitives
def shead(num, lab, heading, hid, lead="", extra="", cls=""):
    """Editorial section header: running number + label, serif H2, optional lead."""
    lead_html = f'<p class="shead__lead">{lead}</p>' if lead else ""
    c = f"shead {cls}".strip()
    meta = f'<span class="shead__num">{num}</span>' if num else ""
    return f'''
    <div class="{c}">
      <p class="shead__meta">{meta}<span>{lab}</span></p>
      <h2 class="shead__title" id="{hid}" data-split>{heading}</h2>
      {lead_html}{extra}
    </div>'''


def rows(items, start=1, cls=""):
    """Numbered editorial rows (title + short text), used instead of icon cards."""
    lis = "".join(
        f'<li class="rows__item"><span class="rows__n">{i + start:02d}</span><h3 class="rows__title">{t}</h3>'
        f'{f"<p>{d}</p>" if d else ""}</li>' for i, (t, d) in enumerate(items))
    c = f"rows {cls}".strip()
    return f'<ol class="{c}" role="list" data-stagger>{lis}</ol>'


def checklist(items, cols=False):
    lis = "".join(f"<li>{icon('check')}<span>{x}</span></li>" for x in items)
    return f'<ul class="checklist{" checklist--cols" if cols else ""}" role="list">{lis}</ul>'


def breadcrumbs(crumbs, lang="en"):
    home = "Inicio" if lang == "es" else "Home"
    items = [f'<li><a href="/">{home}</a></li>']
    for i, (name, path) in enumerate(crumbs):
        if i == len(crumbs) - 1:
            items.append(f'<li aria-current="page">{name}</li>')
        else:
            items.append(f'<li><a href="{path}">{name}</a></li>')
    return f'<nav class="crumbs" aria-label="{"Ruta de navegación" if lang == "es" else "Breadcrumb"}"><ol role="list">{"".join(items)}</ol></nav>'


PHERO_STRIP = [
    ("zap", "Same-day apostille", "Missouri and Kansas documents"),
    ("globe", "All 50 states", "Courier and international shipping"),
    ("languages", "Four languages", "English, Spanish, Arabic, French"),
]
PHERO_STRIP_ES = [
    ("zap", "Apostilla el mismo día", "Documentos de Missouri y Kansas"),
    ("globe", "Los 50 estados", "Mensajería y envío internacional"),
    ("languages", "Cuatro idiomas", "Inglés, español, árabe y francés"),
]


def page_hero(h1, lead, crumbs, image=None, alt="", lab="", buttons="", plate="", lang="en", extra="", tone=""):
    media = ""
    es = lang == "es"
    if image:
        cap = f'<figcaption><span>{plate}</span></figcaption>' if plate else ""
        office = (f'<div class="phero__card" aria-hidden="true"><p class="phero__card-head"><span class="phero__pulse"></span>'
                  f'{"Oficina en Kansas City" if es else "Kansas City office"}</p>'
                  f'<p class="phero__card-addr">{STREET}<br>{CITY_LINE}</p><p class="phero__card-tel">{icon("phone")}{PHONE}</p></div>')
        media = (f'<div class="phero__art"><span class="phero__frame" aria-hidden="true"></span>'
                 f'<figure class="phero__media" data-mask>{img(image, alt, "(min-width: 1024px) 42vw, 100vw", eager=True, attrs="data-parallax")}'
                 f'{cap}</figure>{office}</div>')
    strip = PHERO_STRIP_ES if es else PHERO_STRIP
    facts = "".join(f'<li>{icon(ic)}<span><strong>{t}</strong>{d}</span></li>' for ic, t, d in strip)
    return f'''
<section class="phero{" phero--" + tone if tone else ""}{" phero--noimg" if not image else ""}{" phero--long" if len(h1) > 60 else ""}" aria-labelledby="page-h1">
  <div class="phero__bgmap" data-world-map="hero" aria-hidden="true"></div>
  <div class="container phero__grid">
    <div class="phero__copy" data-hero-copy>
      {breadcrumbs(crumbs, lang)}
      {label(lab) if lab else ""}
      <h1 id="page-h1" class="phero__title" data-split="hero">{h1}</h1>
      <p class="phero__lead">{lead}</p>
      {f'<div class="btn-row">{buttons}</div>' if buttons else ""}
      {extra}
    </div>
    {media}
  </div>
  <div class="phero__band"><div class="container"><ul class="phero__facts" role="list">{facts}</ul></div></div>
</section>'''


def split(image, alt, content, rev=False, tone="", hid=None, plate="", sid=None):
    cap = f'<figcaption>{plate}</figcaption>' if plate else ""
    idattr = f' id="{sid}"' if sid else ""
    return f'''
<section class="section {tone}"{idattr}{f' aria-labelledby="{hid}"' if hid else ""}>
  <div class="container split{" split--rev" if rev else ""}">
    <figure class="split__media" data-mask>{img(image, alt, "(min-width: 1024px) 46vw, 100vw", attrs="data-parallax")}{cap}</figure>
    <div class="split__copy">{content}</div>
  </div>
</section>'''


def pull_quote(quote, cite="", tone="section--navy"):
    c = f"<figcaption>{cite}</figcaption>" if cite else ""
    return f'''
<section class="section {tone} quote-sec">
  <div class="container">
    <figure class="pquote"><blockquote><p data-split>{quote}</p></blockquote>{c}</figure>
  </div>
</section>'''


# ----------------------------------------------------------------------------- journey
JOURNEY = [
    ("document", "Document", "It starts with the original.",
     "Birth and marriage certificates, diplomas, FBI reports, powers of attorney and business records. We check what you have and whether a certified copy is needed first.",
     ("How to get an apostille in Kansas City", "/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/")),
    ("prepare", "Prepare", "Formatted for the office that will read it.",
     "We draft and format affidavits, powers of attorney, travel consent forms and custodian statements so they meet official requirements.",
     ("Document preparation", "/document-preparation-services/")),
    ("notarize", "Notarize", "Signed before a commissioned notary.",
     "In our Kansas City office, at your home or office, or online through remote online notarization.",
     ("Notary services", "/notary-services/")),
    ("authenticate", "Authenticate", "Certified by the right authority.",
     "State documents go to the Secretary of State. Federal documents, like an FBI Identity History Summary, go to the U.S. Department of State.",
     ("FBI apostille", "/fbi-apostille-for-hague-countries/")),
    ("apostille", "Apostille or legalize", "One certificate, or the embassy route.",
     "Hague member countries accept a single apostille. Other countries need embassy legalization, often followed by a Ministry of Foreign Affairs step in the country.",
     ("Apostille services", "/apostille-services/")),
    ("translate", "Translate", "In the language of the destination.",
     "Certified translation support in Spanish, Arabic and French, coordinated so it arrives together with the document.",
     ("FBI legalization and translation", "/fbi-attestation-legalization/")),
    ("deliver", "Deliver", "Back in your hands, or on its way abroad.",
     "Priority shipping with return tracking, local courier delivery, and FedEx or DHL international return shipping on request.",
     ("Contact us about delivery", "/contact-us/")),
]


def journey(hid="journey-h", num="02"):
    n = len(JOURNEY)
    chapters = "".join(f'''
      <article class="chapter" data-chapter="{i + 1}" id="step-{k}">
        <p class="chapter__n"><span>{i + 1:02d}</span><span class="chapter__of">/ {n:02d}</span><span class="chapter__k">{name}</span></p>
        <h3 class="chapter__title">{t}</h3>
        <p>{d}</p>
        {link(ln[0], ln[1])}
      </article>''' for i, (k, name, t, d, ln) in enumerate(JOURNEY))
    rail = "".join(f'<li><a href="#step-{k}" data-rail="{i + 1}"><span>{i + 1:02d}</span>{name}</a></li>'
                   for i, (k, name, *_rest) in enumerate(JOURNEY))
    sig = ('<svg class="jdoc__sig" viewBox="0 0 160 44" aria-hidden="true"><path pathLength="1" '
           'd="M4 32 C 16 8, 26 6, 28 26 S 40 40, 50 20 S 66 4, 70 24 S 86 38, 98 18 S 118 8, 124 22 S 140 30, 156 14"/></svg>')
    stage_classes = " ".join(f"is-{i}" for i in range(1, n + 1))
    return f'''
<section class="section journey" aria-labelledby="{hid}" data-journey>
  <div class="container">
    {shead(num, "The route of a document", "Seven steps between your desk and a foreign office.", hid,
           "Not every document needs every step. We tell you which ones apply before you send anything.")}
    <div class="journey__grid">
      <div class="journey__sticky">
        <div class="jstage {stage_classes}" data-stage aria-hidden="true">
          <div class="jstage__paper jdoc">
            <p class="jdoc__head"><span>Public document</span><span>No. 0418</span></p>
            <p class="jdoc__title">Certificate</p>
            <span class="jline"></span><span class="jline jline--m"></span><span class="jline"></span>
            <span class="jline jline--s"></span><span class="jline"></span><span class="jline jline--m"></span>
            <div class="jdoc__foot">{sig}<span class="jdoc__signline">Signature</span></div>
            <span class="jdoc__notary">Notary<br>Public<br><small>Missouri</small></span>
            <span class="jdoc__seal"><span>Secretary<br>of State</span></span>
          </div>
          <div class="jstage__trans jtrans"><p>Certified translation</p><span class="jline"></span><span class="jline jline--m"></span><span class="jline"></span><b>EN &#8594; ES</b></div>
          <div class="jstage__cert jcert">
            <p class="jcert__title">Apostille</p>
            <p class="jcert__sub">Convention de La Haye du 5 octobre 1961</p>
            <ol><li>Country</li><li>Signed by</li><li>Acting as</li><li>Bears the seal of</li><li>Certified at</li><li>By</li></ol>
            <span class="jcert__ribbon"></span>
          </div>
          <div class="jstage__ship jship">
            <svg viewBox="0 0 300 90" aria-hidden="true"><path class="jship__line" pathLength="1" d="M18 70 C 90 10, 200 4, 282 40"/><circle cx="18" cy="70" r="4"/><circle cx="282" cy="40" r="4"/></svg>
            <span class="jship__from">Kansas City, MO</span><span class="jship__to">Destination</span>
          </div>
          <p class="jstage__count"><b data-stage-num>{n:02d}</b><span>/ {n:02d}</span><span data-stage-name>{JOURNEY[-1][1]}</span></p>
        </div>
        <ol class="rail" role="list">{rail}</ol>
      </div>
      <div class="journey__chapters">{chapters}</div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- service index
SERVICE_INDEX = [
    ("Apostille Services", "/apostille-services/", "apostille-certificates", "Kansas City &middot; All 50 states",
     "Same-day VIP apostille for Missouri and Kansas documents, standard processing, and service in every state."),
    ("Embassy Legalization", "/apostille-services/#embassy-legalization", "international-route", "Non-Hague countries",
     "For countries outside the Hague Convention: U.S. Department of State certification, then consular legalization."),
    ("Notary Services", "/notary-services/", "notary-stamp", "Missouri &amp; Kansas",
     "Acknowledgments, jurats, oaths, affidavits and loan signings, in our office or at your location."),
    ("Mobile Notary", "/notary-services/#mobile-notary", "notary-signing", "Kansas City metro",
     "We meet you at your home, office or a convenient public location. Evenings and weekends available."),
    ("Remote Online Notary", "/notary-services/#remote-online-notary", "remote-online-notary", "Online",
     "Sign by video with our Missouri notary through a secure digital platform, from wherever you are."),
    ("Document Preparation", "/document-preparation-services/", "document-handover", "Nationwide",
     "Powers of attorney, affidavits, travel consent and immigration form support, formatted for notarization or apostille."),
    ("Jail Notary", "/jail-notary-kansas-city/", "jail-notary", "Jackson &amp; Wyandotte counties",
     "Same-day notarizations for inmates. We go to the facility, including evenings, weekends and holidays."),
    ("FBI Apostille", "/fbi-apostille-for-hague-countries/", "apostille-documents", "Hague countries",
     "Your FBI background check apostilled by the U.S. Department of State. Fingerprinting available."),
    ("FBI Legalization", "/fbi-attestation-legalization/", "hero-world-documents", "UAE, Qatar, Egypt and more",
     "Embassy legalization for FBI background checks going to countries outside the Hague Convention."),
]


def service_index(heading, hid, num="03", lab="Services", lead="", items=None):
    items = items or SERVICE_INDEX
    rows_html, figs = [], []
    for i, (t, href, im, meta, d) in enumerate(items):
        rows_html.append(f'''
        <li class="sindex__row">
          <a class="sindex__link" href="{href}" data-sindex="{i}">
            <span class="sindex__n">{i + 1:02d}</span>
            <span class="sindex__name">{t}</span>
            <span class="sindex__desc">{d}</span>
            <span class="sindex__meta">{meta}</span>
            <span class="sindex__thumb">{img(im, "", "120px")}</span>
            <span class="sindex__go" aria-hidden="true">{icon("arrow-up-right")}</span>
          </a>
        </li>''')
        figs.append(img(im, "", "(min-width: 1100px) 34vw, 1px", cls="is-on" if i == 0 else "", attrs=f'data-sindex-img="{i}"'))
    return f'''
<section class="section sindex-sec" aria-labelledby="{hid}">
  <div class="container">
    {shead(num, lab, heading, hid, lead)}
    <div class="sindex" data-sindex-root>
      <ol class="sindex__list" role="list">{"".join(rows_html)}</ol>
      <div class="sindex__preview" aria-hidden="true"><div class="sindex__frame">{"".join(figs)}</div><p class="sindex__cap" data-sindex-cap>{items[0][0]}</p></div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- Hague vs non-Hague
ROUTE_A = [("Document", "Certified copy or original"), ("Notarization", "Only for signed documents such as POAs and affidavits"),
           ("Certification", "Secretary of State, or U.S. Department of State for federal documents"),
           ("Apostille", "One certificate"), ("Accepted abroad", "No embassy step")]
ROUTE_B = [("Document", "Certified copy or original"), ("Notarization", "Only for signed documents"),
           ("State certification", "Secretary of State, where required"),
           ("U.S. Department of State", "Authentication"), ("Embassy legalization", "Destination embassy, Washington, DC"),
           ("Ministry of Foreign Affairs", "Final step in the destination country")]


def _stations(items):
    return "".join(f'<li class="stations__item"><span class="stations__dot" aria-hidden="true"></span><strong>{t}</strong><span>{d}</span></li>' for t, d in items)


def route_options():
    seen, opts = set(), []
    for names in HAGUE.values():
        for n in names:
            seen.add(n)
            opts.append(f'<option value="{esc(n)}" data-status="hague"></option>')
    for row in LEGALIZATION:
        if row[0] not in seen:
            opts.append(f'<option value="{esc(row[0])}" data-status="legalization"></option>')
    for n, _ in NON_HAGUE_MENTIONED:
        opts.append(f'<option value="{esc(n)}" data-status="legalization"></option>')
    return "".join(opts)


def route_compare(hid="routes-h", num="04", explorer_href="#countries", sid=None):
    idattr = f' id="{sid}"' if sid else ""
    return f'''
<section class="section section--bone routes"{idattr} aria-labelledby="{hid}" data-routes>
  <div class="container">
    {shead(num, "Apostille or legalization", "Where it is going decides how it is certified.", hid,
           "Hague Convention members accept an apostille. Everyone else needs the longer embassy route. Check your destination.")}
    <div class="routes__lookup">
      <label for="route-country">Destination country</label>
      <div class="field-inline">{icon("search")}<input id="route-country" type="text" list="route-countries" autocomplete="off" placeholder="For example, Spain or Qatar" data-route-country></div>
      <datalist id="route-countries" data-route-list>{route_options()}</datalist>
      <p class="routes__status" aria-live="polite" data-route-status>Not sure? <a href="{explorer_href}">Browse the country list</a>.</p>
    </div>
    <div class="tabs" data-tabs>
      <div class="tabs__list" role="tablist" aria-label="Certification route">
        <button class="tabs__tab" role="tab" type="button" id="tab-hague" aria-controls="panel-hague" aria-selected="true" data-tab="hague"><span class="tabs__k">Route A</span>Hague country: apostille</button>
        <button class="tabs__tab" role="tab" type="button" id="tab-legal" aria-controls="panel-legal" aria-selected="false" tabindex="-1" data-tab="legal"><span class="tabs__k">Route B</span>Non-Hague country: legalization</button>
      </div>
      <div class="tabs__panel" role="tabpanel" id="panel-hague" aria-labelledby="tab-hague" data-panel="hague">
        <ol class="stations" role="list">{_stations(ROUTE_A)}</ol>
        <div class="routes__foot"><p>One certificate, recognized by every member of the 1961 Hague Apostille Convention. Federal documents must be apostilled by the U.S. Department of State, not a state office.</p>{link("Apostille services", "/apostille-services/")}</div>
      </div>
      <div class="tabs__panel" role="tabpanel" id="panel-legal" aria-labelledby="tab-legal" data-panel="legal" hidden>
        <ol class="stations stations--long" role="list">{_stations(ROUTE_B)}</ol>
        <div class="routes__foot"><p>An apostille alone is rejected by non-Hague countries such as the UAE, Qatar, Kuwait and Egypt. We handle the full U.S. side of the chain.</p>{link("Embassy legalization", "/apostille-services/#embassy-legalization")}</div>
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- country explorer
def countries_explorer(heading="Find your destination.", hid="countries-h", num="", lead=None, tone="", sid="countries"):
    all_hague = {n for v in HAGUE.values() for n in v}
    blocks = []
    region_counts = {}
    for r, names in HAGUE.items():
        region_counts[r] = len(names)
        lis = []
        for n in names:
            note = HAGUE_NOTES.get(n)
            note_html = f' <small>({note})</small>' if note else ""
            lis.append(f'<li><button type="button" data-country="{esc(n)}" data-slug="{slug(n)}" data-status="hague" '
                       f'data-region="{r}">{n}{note_html}</button></li>')
        blocks.append(f'''
        <section class="region" data-region-block="{r}" aria-labelledby="rg-{sid}-{r.lower()}">
          <h3 id="rg-{sid}-{r.lower()}">{r}</h3>
          <ul class="region__list" role="list">{"".join(lis)}</ul>
        </section>''')
    lis = []
    for name, region, embassy, translation, final, uses in LEGALIZATION:
        if name in all_hague:
            continue
        tr = f' data-translation="{esc(translation)}"' if translation else ""
        lis.append(f'<li><button type="button" data-country="{esc(name)}" data-slug="{slug(name)}" data-status="legalization" '
                   f'data-region="Non-Hague" data-embassy="{esc(embassy)}" data-final="{esc(final)}" data-uses="{esc("|".join(uses))}"{tr}>{name}</button></li>')
    for name, region in NON_HAGUE_MENTIONED:
        lis.append(f'<li><button type="button" data-country="{esc(name)}" data-slug="{slug(name)}" data-status="legalization" data-region="Non-Hague">{name}</button></li>')
    blocks.append(f'''
        <section class="region region--legal" data-region-block="Non-Hague" aria-labelledby="rg-{sid}-nonhague">
          <h3 id="rg-{sid}-nonhague">Non-Hague: embassy legalization</h3>
          <ul class="region__list" role="list">{"".join(lis)}</ul>
        </section>''')
    chips = ['<button class="filter is-active" type="button" data-filter="all" aria-pressed="true">All</button>']
    for r in HAGUE:
        chips.append(f'<button class="filter" type="button" data-filter="{r}" aria-pressed="false">{r}</button>')
    chips.append('<button class="filter" type="button" data-filter="Non-Hague" aria-pressed="false">Non-Hague</button>')
    lead = lead if lead is not None else ("Search a country or choose it on the map. Hague members accept an apostille; "
                                          "the others need embassy legalization.")
    head = shead(num, "Country explorer", heading, hid, lead) if num else shead("", "Country explorer", heading, hid, lead)
    return f'''
<section class="section {tone}" id="{sid}" aria-labelledby="{hid}">
  <div class="container">
    {head}
    <div class="explorer" data-explorer>
      <div class="explorer__bar">
        <div class="field-inline">{icon("search")}<label class="sr-only" for="{sid}-search">Search countries</label>
          <input id="{sid}-search" type="search" placeholder="Search a country" autocomplete="off" data-country-search></div>
        <div class="filters" role="group" aria-label="Filter by region">{"".join(chips)}</div>
      </div>
      <div class="explorer__main">
        <div class="explorer__map">
          <div class="world-map" data-world-map="explorer"><div class="world-map__tip" data-map-tip></div></div>
          <p class="legend" aria-hidden="true"><span><i class="legend__h"></i>Hague member: apostille</span><span><i class="legend__l"></i>Non-Hague: legalization</span><span><i class="legend__n"></i>Not on our lists</span></p>
        </div>
        <aside class="record" aria-live="polite" data-country-panel>
          <p class="record__status">Record</p>
          <h3>Select a destination</h3>
          <p>Choose a country from the map or the lists below to see which route applies and what to do next.</p>
        </aside>
      </div>
      <p class="sr-only" aria-live="polite" data-country-count></p>
      <div class="regions" data-regions>{"".join(blocks)}</div>
      <p class="explorer__empty" data-country-empty hidden>No country on our published lists matches that search. <a href="/contact-us/">Contact us</a> and we will confirm the route.</p>
      <p class="fine">Country lists last reviewed {REVIEWED_LIST}. {DISCLAIMER}</p>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- FBI timeline (Hague)
FBI_STEPS = [
    ("Get your FBI report", "Use your existing FBI Identity History Summary, or we take your fingerprints and obtain it for you. No separate channeler needed.", "notary-signing"),
    ("We review the package", "You complete the DS-4194 and we check every detail against your report. A form completed incorrectly is the most common reason for rejection.", "document-handover"),
    ("Submitted to the State Department", "Your report goes to the U.S. Department of State Office of Authentications for the apostille. We track it and keep you updated.", "international-route"),
    ("Returned to you", "The apostilled report ships back, with a certified translation if your destination requires one, as one package ready to submit.", "hero-world-documents"),
]


def fbi_timeline(heading, hid, num="03", lead="Four steps. Unlike many apostille services, we can handle the first one too."):
    items, imgs = [], []
    for i, (t, d, im) in enumerate(FBI_STEPS):
        imgs.append(img(im, "", "(min-width: 1024px) 44vw, 100vw", cls="is-on" if i == 0 else "", attrs=f'data-tl-img="{i}"'))
        items.append(f'<li class="tl__step{" is-on" if i == 0 else ""}" data-tl-step="{i}"><span class="tl__n">{i + 1:02d}</span><div><h3>{t}</h3><p>{d}</p></div></li>')
    return f'''
<section class="section" aria-labelledby="{hid}">
  <div class="container">
    {shead(num, "Start to finish", heading, hid, lead)}
    <div class="tl" data-timeline>
      <div class="tl__media"><div class="tl__frame">{"".join(imgs)}</div>
        <dl class="facts">
          <div><dt>Authenticated by</dt><dd>U.S. Department of State, Office of Authentications</dd></div>
          <div><dt>Embassy legalization</dt><dd>Not required in Hague member countries</dd></div>
          <div><dt>Report age</dt><dd>Often 90 days or less. Confirm with the receiving authority.</dd></div>
        </dl>
      </div>
      <ol class="tl__list" role="list"><span class="tl__bar" aria-hidden="true" data-tl-bar></span>{"".join(items)}</ol>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- non-Hague legalization
LEGAL_STEPS = [
    ("Get your FBI report", "Use your existing FBI Identity History Summary, or we take your fingerprints and obtain it. We accept the official FBI eDO electronic PDF, so you can start from any state."),
    ("We review the package", "You complete the DS-4194 and we review it with your report before anything is submitted. A legalization chain is costly to redo."),
    ("U.S. Department of State", "Your report is authenticated by the Office of Authentications, the first required stamp in the chain."),
    ("Embassy legalization", 'The destination country\'s embassy in Washington, DC legalizes the authenticated report. We submit and track it for you. <span class="dyn" data-legal-embassy></span>'),
    ("Returned to you", 'Ships back with certified translation when required, ready for the final Ministry of Foreign Affairs attestation in the destination country. <span class="dyn" data-legal-final></span>'),
]


def legal_route(heading, hid, num="04", lead="Five steps. More than an apostille, and we manage every stage on the U.S. side."):
    chips = []
    for i, (name, region, embassy, translation, final, uses) in enumerate(LEGALIZATION):
        chips.append(f'<button class="filter" type="button" aria-pressed="{"true" if i == 0 else "false"}" data-legal-country data-slug="{slug(name)}" '
                     f'data-name="{esc(name)}" data-embassy="{esc(embassy)}" data-final="{esc(final)}" '
                     f'data-translation="{esc(translation or "")}" data-uses="{esc("|".join(uses))}">{name}</button>')
    steps = "".join(f'<li class="lsteps__item" data-legal-step="{i}"><span class="lsteps__n">{i + 1:02d}</span><div><h3>{t}</h3><p>{d}</p></div></li>'
                    for i, (t, d) in enumerate(LEGAL_STEPS))
    f = LEGALIZATION[0]
    return f'''
<section class="section section--navy" aria-labelledby="{hid}">
  <div class="container">
    {shead(num, "Embassy legalization", heading, hid, lead)}
    <div class="legal" data-legal>
      <div>
        <div class="legal__map" data-world-map="legal"><div class="legal__labels" data-legal-labels></div></div>
        <p class="label" id="legal-pick">Select a destination</p>
        <div class="filters filters--wrap" role="group" aria-labelledby="legal-pick">{"".join(chips)}</div>
        <div class="record record--dark" aria-live="polite" data-legal-card>
          <p class="record__status">Destination record</p>
          <h3>{f[0]}</h3>
          <dl><dt>Embassy</dt><dd>{f[2]}</dd><dt>Translation</dt><dd>{f[3]}</dd><dt>Final step</dt><dd>{f[4]}</dd><dt>Common uses</dt><dd>{", ".join(f[5])}</dd></dl>
        </div>
      </div>
      <ol class="lsteps" role="list">{steps}</ol>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- reviews
REVIEWS = [
    ("Elaundra Nichols", "I would highly recommend this notary service. Al was very professional, provided great and quick service for my notary needs."),
    ("Kentt Malaluan", "I was impressed with the quick and efficient service, Hussain was very friendly and hands-on the whole time, the service he gave us exceeded my expectations. Everything was smoothly done and it only took a few days for me to get my documents notarized and apostilled to used here in the philippines. Thanks"),
    ("T", "I had a great experience with Midwest EPCS &amp; Notary Services. I Would definitely recommend Alhussian for your notary needs!"),
    ("ash al", "Everything went seamlessly from scheduling the appointment to completing the service Thank you so much!"),
    ("Haley D", "Such a great experience! Was so fast and friendly!!"),
    ("cassandra bradford", "We need a notary at the last minute found this gentleman on google called him , he got us right in very nice fast and you can tell he enjoys what he does because he was so nice took care of us I would recommend him.. he has our just got new customers ."),
    ("Anthony", "Got an affidavit for license reinstatement and notarized same day by this company here in kansas city missouri. The team is fast and exactly knew what I needed. Very professional and rapid repsonse!"),
    ("Tiffany Black", "A kind owner with flexible hours. It was a very convenient notary signing. Highly recommended!"),
    ("Iman Al-Hassan", "I had an amazing experience with Midwest EPCS and notary! I needed a last-minute apostille service for a document going overseas And they handled everything professionally and quickly. I’m located in Kansas City and they were able to apostle my Missouri document the same day what really impressed me was how knowledgeable and responsive they were. They walked me through the entire process, including how the apostle works for international use. They also partner with Midwest identity services for fingerprinting, which made it so convenient because I was able to get my FD – 258 fingerprinting card done at the same location. If you are looking for notary services near Kansas City or need help with apostille documents. For immigration, foreign travel, or business, I highly recommend Midwest EPCS and notary. They truly care about the customers and go above and beyond. They are a hidden gym from anyone needing a apostille services In Missouri or Kansas, and even offer nationwide apostille Courier service!!! I’ll definitely be using them again"),
    ("Lee Brown", "Great service good guy. Got us situated on a weekend"),
]


NO_TAB = ' tabindex="-1"'


def reviews_section(hid="reviews-h", num="06", heading="In their words."):
    n = len(REVIEWS)
    panels, tabs = [], []
    for i, (name, text) in enumerate(REVIEWS):
        panels.append(f'''
        <div class="review{" is-on" if i == 0 else ""}" id="review-{i}" role="tabpanel" aria-labelledby="rt-{i}" data-review{"" if i == 0 else " hidden"}>
          <blockquote class="review__quote{" review__quote--long" if len(text) > 240 else ""}"><p>{text}</p></blockquote>
          <p class="review__by"><strong>{name}</strong><span>Google review, 5 of 5</span></p>
        </div>''')
        tabs.append(f'<li role="presentation"><button type="button" role="tab" id="rt-{i}" aria-controls="review-{i}" aria-selected="{"true" if i == 0 else "false"}"{"" if i == 0 else NO_TAB}><span class="sr-only">Review {i + 1}: </span>{name}</button></li>')
    return f'''
<section class="section section--paper" aria-labelledby="{hid}">
  <div class="container">
    {shead(num, "Client reviews", heading, hid, "Reviews from clients on Google, quoted as written.")}
    <div class="reviews" data-reviews>
      <div class="reviews__stage">{"".join(panels)}</div>
      <div class="reviews__nav">
        <p class="reviews__count" aria-hidden="true"><b data-review-num>01</b> / {n:02d}</p>
        <button class="icon-btn" type="button" data-review-prev aria-label="Previous review">{icon("chevron-left")}</button>
        <button class="icon-btn" type="button" data-review-next aria-label="Next review">{icon("chevron-right")}</button>
      </div>
      <ul class="reviews__tabs" role="tablist" aria-label="Choose a review">{"".join(tabs)}</ul>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- FAQ
def faq_section(items, hid="faq-h", num="", heading="Questions, answered.", lab="FAQ", lead="", tone="", aside=""):
    accs = "".join(f'''
      <details class="acc" data-acc>
        <summary><span class="acc__q">{q}</span><span class="acc__icon" aria-hidden="true"></span></summary>
        <div class="acc__body"><div class="acc__inner"><p>{a}</p></div></div>
      </details>''' for q, a in items)
    return f'''
<section class="section {tone}" aria-labelledby="{hid}">
  <div class="container faq">
    <div class="faq__head">{shead(num, lab, heading, hid, lead, extra=aside, cls="shead--stack")}</div>
    <div class="faq__list">{accs}</div>
  </div>
</section>'''


HOME_FAQ = [
    ("What is an apostille?", "An apostille is a certification that authenticates the origin of a public document so it can be used in another country that is a member of the Hague Apostille Convention."),
    ("How long does an apostille take?", f"For Missouri and Kansas documents, same-day VIP apostille is available ({APOSTILLE_VIP_PRICE}) and standard processing takes {APOSTILLE_STD_TIME} ({APOSTILLE_STD_PRICE}). For documents from other states, our rush service takes {APOSTILLE_RUSH_OTHER_STATES}."),
    ("Do you offer same-day apostille services?", "Yes, for Missouri and Kansas documents that are ready to be certified. Call us first so we can confirm your document qualifies."),
    ("What is the difference between an apostille and legalization?", "An apostille is one certificate accepted by Hague Convention member countries. Countries outside the convention require embassy legalization: U.S. Department of State certification followed by the destination embassy, and often a final Ministry of Foreign Affairs step."),
    ("Can I notarize documents online?", "Yes. We offer remote online notarization (RON) through our Missouri-based secure digital platform."),
    ("Do you provide FBI apostille services?", 'Yes. We can take your fingerprints, obtain your FBI Identity History Summary and have it apostilled by the U.S. Department of State. For non-Hague countries we handle <a href="/fbi-attestation-legalization/">FBI background check legalization</a>.'),
    ("Do you offer mobile notary services?", "Yes. Our mobile notaries meet clients at homes, offices and public locations across the Kansas City area, with daytime, evening and weekend availability."),
]


# ----------------------------------------------------------------------------- closing blocks
def cta_final(heading="Get clarity before you send your documents.",
              text="Tell us what the document is and where it is going. We confirm the route, the price and a realistic timeline before anything is submitted.",
              lang="en"):
    es = lang == "es"
    return f'''
<section class="cta" aria-labelledby="cta-h">
  <div class="container cta__inner">
    <p class="label label--light">{"Próximo paso" if es else "Next step"}</p>
    <h2 id="cta-h" class="cta__title" data-split>{heading}</h2>
    <div class="cta__row">
      <p>{text}</p>
      <div class="btn-row">{cta_btn("light", "Iniciar revisión de documentos" if es else "Start Your Document Review", magnetic=True)}{call_btn("outline-light", f"Llamar {PHONE}" if es else None)}</div>
    </div>
    <ul class="cta__contacts" role="list">
      <li><span>{"Oficina" if es else "Office"}</span><a href="{MAPS_URL}" target="_blank" rel="noopener">{ADDRESS}</a></li>
      <li><span>Email</span><a href="mailto:{EMAIL}">{EMAIL}</a></li>
      <li><span>WhatsApp</span><a href="{WHATSAPP}" target="_blank" rel="noopener">{"Enviar mensaje" if es else "Send a message"}</a></li>
    </ul>
  </div>
</section>'''


def contact_strip(heading="Ready when you are.", hid="ready-h", num="",
                  lead="Send us your details and we will reply with pricing and a realistic timeline."):
    return f'''
<section class="section section--bone" aria-labelledby="{hid}">
  <div class="container split split--text">
    <div>{shead(num, "Contact", heading, hid, lead, cls="shead--stack")}<div class="btn-row">{cta_btn()}</div></div>
    <dl class="contact-list">
      <div><dt>Call or text</dt><dd><a href="{TEL}">{PHONE}</a></dd></div>
      <div><dt>Email</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
      <div><dt>Office</dt><dd><a href="{MAPS_URL}" target="_blank" rel="noopener">{ADDRESS}</a></dd></div>
    </dl>
  </div>
</section>'''


# ----------------------------------------------------------------------------- doc stack
def doc_stack(items, hid, num, heading, lead, note, more=""):
    btns = "".join(
        f'<li><button type="button" data-stack-btn="{i}" aria-pressed="{"true" if i == 0 else "false"}">'
        f'<span class="stack-list__n">{i + 1:02d}</span><span>{t}</span></button></li>' for i, (t, _) in enumerate(items))
    cards = "".join(
        f'<article class="stack__card" data-stack-card="{i}"><header><span>Form {i + 1:02d} / {len(items):02d}</span><span>Prepared</span></header>'
        f'<h3>{t}</h3><p>{d}</p><span class="jline"></span><span class="jline jline--m"></span><span class="jline jline--s"></span>'
        f'<footer><span class="stack__sig"></span><span>Ready to notarize</span></footer></article>'
        for i, (t, d) in enumerate(items))
    return f'''
<section class="section section--bone" aria-labelledby="{hid}">
  <div class="container stackwrap">
    <div class="stackwrap__copy">
      {shead(num, "Document preparation", heading, hid, lead, cls="shead--stack")}
      <ul class="stack-list" role="list" data-stack-list>{btns}</ul>
      <p class="fine">{note}</p>
      {more}
    </div>
    <div class="stack" data-stack aria-live="polite">{cards}</div>
  </div>
</section>'''


def pricing_note():
    return (f'<dl class="facts facts--price"><div><dt>Same-day VIP</dt><dd><b>{APOSTILLE_VIP_PRICE}</b>Missouri and Kansas documents</dd></div>'
            f'<div><dt>Standard</dt><dd><b>{APOSTILLE_STD_PRICE}</b>{APOSTILLE_STD_TIME}</dd></div>'
            f'<div><dt>Other states, rush</dt><dd><b>{APOSTILLE_RUSH_OTHER_STATES}</b>turnaround</dd></div></dl>')


def disclaimer(lang="en"):
    return f'<p class="fine">{DISCLAIMER_ES if lang == "es" else DISCLAIMER}</p>'



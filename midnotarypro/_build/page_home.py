"""Homepage: an editorial, scroll-told route from a document on your desk to a foreign office."""
from components import (HOME_FAQ, route_options, countries_explorer, cta_final, faq_section, journey, label, reviews_section,
                        route_compare, service_index, shead)
from lib import call_btn, cta_btn, faq_schema, icon, img, link, page

H1_KEYWORD = "Apostille &amp; Notary Services in Kansas City"


HERO_SERVICES = [
    ("stamp", "Apostille", "Same-day for MO &amp; KS", "/apostille-services/"),
    ("landmark", "Embassy legalization", "Non-Hague countries", "/apostille-services/#embassy-legalization"),
    ("signature", "Notary", "Office, mobile or online", "/notary-services/"),
    ("file-pen-line", "Document preparation", "POA, affidavits, forms", "/document-preparation-services/"),
    ("fingerprint", "FBI apostille", "Fingerprint to apostille", "/fbi-apostille-for-hague-countries/"),
    ("building-2", "Jail notary", "Jackson &amp; Wyandotte", "/jail-notary-kansas-city/"),
]
HERO_FACTS = [
    ("zap", "Same-day apostille", "Missouri and Kansas documents"),
    ("globe", "All 50 states", "Courier and international shipping"),
    ("laptop", "Remote online notary", "Sign from anywhere"),
    ("languages", "Four languages", "English, Spanish, Arabic, French"),
]


def hero():
    fields = "".join(f"<li><span>{i}.</span><em>{t}</em><i></i></li>" for i, t in enumerate(
        ["Country", "This public document", "has been signed by", "acting in the capacity of", "bears the seal of",
         "Certified at", "the", "by", "No."], start=1))
    sig = ('<svg class="acert__sig" viewBox="0 0 160 44" aria-hidden="true"><path pathLength="1" '
           'd="M4 30 C 18 6, 28 8, 30 26 S 44 38, 54 18 S 70 6, 74 24 S 92 36, 104 16 S 124 10, 132 24 S 146 28, 156 12"/></svg>')
    status = "".join(f'<li>{icon("check")}<span>{t}</span></li>' for t in
                     ["Document received", "Route confirmed: apostille", "Certified by the Secretary of State", "Shipped with tracking"])
    facts = "".join(f'<li>{icon(ic)}<span><strong>{t}</strong>{d}</span></li>' for ic, t, d in HERO_FACTS)
    cards = "".join(f'<li><a href="{h}"><span class="hsvc__icon">{icon(ic)}</span><span class="hsvc__txt"><strong>{t}</strong><span>{d}</span></span>{icon("arrow-up-right", "hsvc__go")}</a></li>'
                    for ic, t, d, h in HERO_SERVICES)
    return f'''
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__bgmap" data-world-map="hero" aria-hidden="true"></div>
  <div class="container hero__grid">
    <div class="hero__copy" data-hero-copy>
      {label("Kansas City, Missouri &middot; Nationwide", "hero__label")}
      <h1 class="hero__title" id="hero-h"><span class="hero__kicker">{H1_KEYWORD}<span class="sr-only">:</span></span>
        <span class="hero__display" data-split="hero">Documents ready<br> <em>for the world.</em></span></h1>
      <p class="hero__lead">Apostille, embassy legalization, notarization and document preparation for Missouri, Kansas and clients in all 50 states. We confirm the route before anything is submitted.</p>
      <div class="btn-row">{cta_btn(magnetic=True)}{call_btn()}</div>
      <form class="hcheck" role="search" aria-label="Check a destination country" data-hcheck>
        <label class="hcheck__label" for="hcheck-in">Where is your document going?</label>
        <div class="hcheck__field">{icon("search")}<input id="hcheck-in" type="text" list="hcheck-list" autocomplete="off" placeholder="Type a country, for example Spain" data-hcheck-in><button class="hcheck__btn" type="submit">Check route</button></div>
        <datalist id="hcheck-list">{route_options()}</datalist>
        <p class="hcheck__out" aria-live="polite" data-hcheck-out>Hague countries accept an apostille. Other countries need embassy legalization.</p>
      </form>
    </div>
    <div class="hero__art" aria-hidden="true" data-hero-art>
      <figure class="hero__inset" data-hero-inset>{img("notary-seal", "", "(min-width: 1024px) 16vw, 40vw")}</figure>
      <div class="acert" data-hero-cert>
        <p class="acert__title">Apostille</p>
        <p class="acert__sub">(Convention de La Haye du 5 octobre 1961)</p>
        <ol class="acert__fields" role="list">{fields}</ol>
        <div class="acert__foot">{sig}<span class="acert__seal" data-hero-seal><span>Certified</span></span></div>
      </div>
      <div class="hstatus" data-hero-status>
        <p class="hstatus__head"><span class="hstatus__pulse"></span>Document review<b>Kansas City, MO</b></p>
        <ol class="hstatus__list" role="list">{status}</ol>
      </div>
    </div>
  </div>
  <div class="container">
    <ul class="hero__facts" role="list">{facts}</ul>
    <nav class="hsvc" aria-label="Service shortcuts"><ul role="list">{cards}</ul></nav>
  </div>
</section>'''


def intro():
    return f'''
<section class="section intro" aria-labelledby="intro-h">
  <div class="container">
    {shead("01", "Midwest Apostille &amp; Notary", "A document office in Kansas City, working for clients everywhere.", "intro-h")}
    <div class="intro__grid">
      <p class="intro__big" data-reveal>We prepare, notarize, authenticate and ship documents for immigration, study, marriage, business and dual citizenship. One office handles the whole chain, so nothing is lost between hand-offs.</p>

    </div>
  </div>
</section>'''


def in_person_online():
    return f'''
<section class="section section--paper" aria-labelledby="notary-h">
  <div class="container">
    {shead("05", "Notary", "In person, or on a screen.", "notary-h", "Notary appointments in our office, at your location in the Kansas City area, or online.")}
    <div class="duo">
      <article class="duo__item">
        <figure class="duo__media" data-mask>{img("notary-signing", "Notary signing a document next to a notary stamp", "(min-width: 900px) 46vw, 100vw", attrs="data-parallax")}</figure>
        <p class="label">Missouri &amp; Kansas</p>
        <h3 class="duo__title">Mobile notary</h3>
        <p>We meet you at your home, office or a convenient public location anywhere in the Kansas City area, with daytime, evening and weekend availability. Real estate and loan signings included.</p>
        {link("Mobile notary in Kansas City", "/notary-services/#mobile-notary")}
      </article>
      <article class="duo__item">
        <figure class="duo__media" data-mask>{img("remote-online-notary", "Remote online notarization on a laptop video call", "(min-width: 900px) 46vw, 100vw", attrs="data-parallax")}</figure>
        <p class="label">Anywhere</p>
        <h3 class="duo__title">Remote online notary</h3>
        <p>Sign by video in front of our Missouri notary through a secure digital platform. For U.S. citizens and foreign nationals alike, with no travel time.</p>
        {link("How remote online notarization works", "/notary-services/#remote-online-notary")}
      </article>
    </div>
  </div>
</section>'''


def guides():
    posts = [
        ("/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/", "apostille-documents",
         "Apostille guide", "How to get an apostille in Kansas City: birth certificates, custodian documents and more"),
        ("/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/", "jail-notary",
         "Notary guide", "Urgent notary services in Kansas City: jail, hospital and after-hours help"),
    ]
    items = "".join(f'''
      <li class="guide">
        <a href="{h}">
          <span class="guide__media">{img(im, "", "(min-width: 900px) 22vw, 40vw")}</span>
          <span class="label">{k}</span>
          <span class="guide__title">{t}</span>
        </a>
      </li>''' for h, im, k, t in posts)
    return f'''
<section class="section" aria-labelledby="guides-h">
  <div class="container">
    {shead("08", "Guides", "Read before you send.", "guides-h", "Short, practical guides written from the questions clients ask us most.", extra=link("All guides and FBI resources", "/guides/", "shead__link"))}
    <ul class="guides" role="list">{items}</ul>
  </div>
</section>'''


def build():
    body = "".join([
        hero(),
        intro(),
        journey(num="02"),
        service_index("Nine services, one office.", "services-h", num="03", lab="Services",
                      lead="Choose a service to see what it covers, where we provide it and how to book."),
        route_compare(num="04"),
        in_person_online(),
        countries_explorer(num="06", heading="Is your destination a Hague country?", tone="section--bone"),
        reviews_section(num="07"),
        guides(),
        faq_section(HOME_FAQ, num="09", heading="Questions, answered.",
                    lead='More detail on the <a class="text-link" href="/apostille-services/">apostille</a> and <a class="text-link" href="/notary-services/">notary</a> pages.'),
        cta_final(),
    ])
    return page("/", "Apostille & Notary Services in Kansas City | Midwest",
                "Apostille, embassy legalization, notary and document preparation in Kansas City, MO. Same-day apostille for Missouri and Kansas, and service in all 50 states.",
                body, active="home", schema=[faq_schema("/", HOME_FAQ)], body_class="is-home",
                preload=("hero-world-documents", "(min-width: 1024px) 44vw, 92vw"),
                keyword="apostille and notary services Kansas City")


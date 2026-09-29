"""Homepage — an interactive storytelling journey (16 sections)."""
from components import (HOME_FAQ, apostille_story, countries_explorer, cta_final, faq_section, fbi_timeline,
                        legal_route, reviews_section, services_section)
from lib import (BOOK, CTA_LABEL, DISCLAIMER, PHONE, TEL, arrow, book_btn, btn, eyebrow, faq_schema, icon, img, page)

NO_TAB = ' tabindex="-1"'

HERO_DOCS = [
    ("fbi", "fingerprint", "FBI Background Check"),
    ("birth", "scroll-text", "Birth / Marriage Certificate"),
    ("federal", "landmark", "Federal Document"),
    ("diploma", "graduation-cap", "Diploma / Transcript"),
    ("poa", "signature", "Power of Attorney"),
    ("notarized", "stamp", "Notarized Document"),
]


def hero():
    chips = "".join(
        f'<button class="chip" type="button" data-doc="{k}" aria-pressed="{"true" if i == 0 else "false"}">{icon(ic)}{t}</button>'
        for i, (k, ic, t) in enumerate(HERO_DOCS))
    return f'''
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__map" data-world-map="hero" aria-hidden="true"></div>
  <div class="container hero__grid">
    <div class="hero__copy" data-hero-copy>
      {eyebrow("Midwest Apostille &amp; Notary")}
      <h1 class="hero__title" id="hero-h" data-split="hero">Fast, reliable, and professional apostille and notary services.</h1>
      <p class="hero__sub">Midwest Apostille &amp; Notary provides fast, reliable, and professional apostille and notary services across Kansas City, Missouri, and nationwide including courier services and document preparation.</p>
      <div class="btn-row">
        <span class="magnetic" data-magnetic><a class="btn" href="{BOOK}" target="_blank" rel="noopener">{CTA_LABEL}{arrow()}</a></span>
        {btn(f"Call {PHONE}", TEL, "ghost", "phone")}
      </div>
      <div class="hero__fbi">
        <a class="link" href="/fbi-apostille-for-hague-countries/">FBI Apostille for Hague Convention Countries {arrow()}</a>
        <a class="link" href="/fbi-attestation-legalization/">FBI Attestation legalization {arrow()}</a>
      </div>
    </div>
    <div class="hero__visual">
      <div class="hero__frame" data-parallax-wrap>
        {img("hero-world-documents", "Apostilled certificates with gold seals and passports in front of an illuminated world map", "(min-width: 1024px) 50vw, 100vw", eager=True, attrs="data-parallax")}
        <p class="hero__stamp">{icon("globe", "icon--sm")}Kansas City → Worldwide</p>
      </div>
      <div class="route-panel" data-hero-route>
        <div class="route-panel__head">
          <h2 class="route-panel__title" id="hr-h">What do you need to authenticate?</h2>
          <span class="doc-no">Route preview</span>
        </div>
        <div class="chips" role="group" aria-labelledby="hr-h">{chips}</div>
        <div class="route-panel__result" aria-live="polite">
          <ol class="route-panel__steps" role="list" data-hr-steps>
            <li>FBI report</li><li>Package review</li><li>U.S. Dept. of State</li><li>Apostille or legalization</li>
          </ol>
          <p class="route-panel__note" data-hr-note>Because an FBI background check is a federal document, it must be apostilled by the U.S. Department of State — not a state Secretary of State. <a class="text-link" href="/fbi-apostille-for-hague-countries/">Hague countries</a> · <a class="text-link" href="/fbi-attestation-legalization/">Non-Hague countries</a></p>
        </div>
        <p class="route-panel__foot">A route preview is general information, not legal advice. <a class="text-link" href="#route-finder">Build your full route</a></p>
      </div>
    </div>
  </div>
</section>'''


TRUST = [
    ("globe", "Nationwide Service", "Apostille services in all 50 U.S. states"),
    ("shield-check", "Secure Document Handling", "Secure, convenient, and efficient document processing"),
    ("laptop", "Remote Online Notary", "Notarize documents from anywhere in the world"),
    ("plane", "International Document Support", "Courier options to over 100 countries"),
    ("zap", "Same-Day Options", "Same-day apostille services in Missouri and Kansas"),
]


def trust():
    items = "".join(
        f'<li class="trust__item"><span class="icon-badge" data-icon-pop>{icon(ic)}</span><div><strong>{t}</strong><span>{d}</span></div></li>'
        for ic, t, d in TRUST)
    stats = [
        ("50", "", "U.S. states — nationwide apostille services with local courier delivery"),
        ("126", "", "countries recognize a U.S. Dept. of State apostille"),
        ("100", "+", "countries — international apostille courier options"),
        ("4", "", "languages — English, Spanish, Arabic, and French support"),
    ]
    st = "".join(
        f'<div class="stat"><p class="stat__num"><span data-count="{n}">{n}</span>{f"<sup>{s}</sup>" if s else ""}</p><p class="stat__label">{l}</p></div>'
        for n, s, l in stats)
    return f'''
<section class="trust" aria-label="Why clients trust us">
  <div class="container" style="padding-inline:0">
    <ul class="trust__list" role="list" data-stagger>{items}</ul>
    <div class="stats" data-stagger>{st}</div>
  </div>
</section>'''


def about():
    tags = ["Fully Remote", "State-Approved Notaries", "Same-Day Availability"]
    return f'''
<section class="section" aria-labelledby="about-h">
  <div class="container editorial">
    <div class="editorial__aside">
      {eyebrow("About Us")}
      <h2 id="about-h" data-split>Trusted Online Notary Services, Available 24/7</h2>
      <ul class="tag-list" role="list">{"".join(f'<li class="tag">{icon("badge-check")}{t}</li>' for t in tags)}</ul>
      <p>{btn("See Detail", "/about-us/", "ghost")}</p>
    </div>
    <div class="editorial__body" data-reveal>
      <p>Midwest Apostille &amp; Notary provides fast, reliable, and professional apostille and notary services across Kansas City, Missouri, and nationwide. We specialize in same day apostille services in Missouri and Kansas, with VIP rush processing starting at $650 and standard options from $190.</p>
      <p>We offer nationwide apostille services in all 50 U.S. states with local courier delivery and international document shipping. Whether you’re authenticating documents for Hague Apostille Convention countries (like Spain, France, Saudi Arabia, Morocco, Venezuela, Mexico India etc.), or for non-Hague countries (like Canada, China, Egypt, or the UAE), our team ensures proper certification, translation, and logistics support.</p>
      <p>We also offer mobile notary, remote online notarization, and jail notary services in Missouri and Kansas.</p>
    </div>
  </div>
</section>'''


FINDER_DOCS = HERO_DOCS + [("unsure", "circle-help", "I’m not sure")]
PURPOSES = ["Residency Visas", "Work Permits", "Student Visas", "Marriage &amp; Family", "Adoption",
            "Business Registration", "Immigration", "Dual citizenship"]
NODES = [
    ("document", "file-text", "Document"),
    ("notarization", "signature", "Notarization"),
    ("authentication", "landmark", "Authentication"),
    ("apostille", "stamp", "Apostille / Legalization"),
    ("translation", "languages", "Translation"),
    ("delivery", "truck", "Delivery"),
]


def finder():
    def radios(name, opts, first=None):
        return "".join(
            f'<button class="chip" type="button" role="radio" data-{name}="{k}" aria-checked="{"true" if k == first else "false"}"'
            f'{"" if k == first else NO_TAB}>{icon(ic)}{t}</button>' for k, ic, t in opts)
    dest = [("hague", "badge-check", "Hague member country"), ("nonhague", "landmark", "Non-Hague country"),
            ("unsure", "circle-help", "Not sure yet")]
    purposes = [(p.lower().replace(" ", "-").replace("&amp;", "and"), "briefcase", p) for p in PURPOSES]
    nodes = "".join(
        f'<li class="route__node" data-node="{k}" data-state="required"><span class="route__dot">{icon(ic)}</span>'
        f'<div class="route__text"><div class="route__label"><strong>{t}</strong><span class="route__badge" data-badge>Required</span></div>'
        f'<p class="route__detail" data-detail></p></div></li>' for k, ic, t in NODES)
    return f'''
<section class="section finder on-dark" id="route-finder" aria-labelledby="finder-h">
  <div class="finder__bg" data-parallax-bg aria-hidden="true">{img("international-route", "", "100vw")}</div>
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Find your document route")}<h2 id="finder-h" data-split>Before you send documents, see the route.</h2></div>
      <p class="lead">Tell us what document you have, where it will be used, and why. The route below shows the typical path — our team confirms the exact next step with you.</p>
    </div>
    <div class="finder__grid" data-finder>
      <form class="finder__form" onsubmit="return false" aria-describedby="finder-disc">
        <fieldset class="finder__step">
          <legend><span class="doc-no">01</span>Document type</legend>
          <div class="chips" role="radiogroup" aria-label="Document type">{radios("fdoc", FINDER_DOCS, "fbi")}</div>
        </fieldset>
        <fieldset class="finder__step">
          <legend><span class="doc-no">02</span>Destination</legend>
          <div class="finder__country">{icon("search")}<label class="sr-only" for="finder-country">Destination country</label>
            <input id="finder-country" type="text" list="finder-countries" placeholder="Type a country (optional)" autocomplete="off" data-fcountry>
            <datalist id="finder-countries" data-fcountry-list></datalist>
            <p class="finder__country-status" data-fcountry-status aria-live="polite"></p>
          </div>
          <div class="chips" role="radiogroup" aria-label="Destination type">{radios("fdest", dest, "hague")}</div>
        </fieldset>
        <fieldset class="finder__step">
          <legend><span class="doc-no">03</span>Purpose</legend>
          <div class="chips" role="radiogroup" aria-label="Purpose">{radios("fpurpose", purposes, "residency-visas")}</div>
        </fieldset>
      </form>
      <div class="route" data-route>
        <div class="route__head">
          <div>
            <span class="doc-no">Your document route</span>
            <p class="route__title" data-route-title>FBI Background Check → Hague member country</p>
            <p class="route__summary" data-route-summary>Purpose: Residency Visas</p>
          </div>
          <span class="route__badge" style="background:var(--navy-900);color:var(--white)">Typical route</span>
        </div>
        <ol class="route__nodes" role="list">{nodes}</ol>
        <div class="route__foot">
          <p class="disclaimer" id="finder-disc">{DISCLAIMER} A route review does not guarantee acceptance.</p>
          {book_btn(CTA_LABEL, "")}
        </div>
      </div>
    </div>
  </div>
</section>'''


def mobile_remote():
    return f'''
<section class="section section--white" aria-labelledby="mr-h">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Mobile Notary · Remote Online Notary")}<h2 id="mr-h" data-split>We come to you — or meet you online.</h2></div>
      <p class="lead">We also offer mobile notary, remote online notarization, and jail notary services in Missouri and Kansas.</p>
    </div>
    <div class="split" data-stagger>
      <article class="split__panel">
        <div class="split__img" data-parallax-img>{img("notary-signing", "Notary signing a document with a pen beside a notary stamp", "(min-width: 900px) 50vw, 100vw")}</div>
        <div class="split__content">
          <div class="split__kicker"><span class="doc-no">01 · Missouri &amp; Kansas</span></div>
          <h3>Mobile Notary</h3>
          <p>Busy schedule? We come to you. Our mobile notaries meet clients at offices, homes, or convenient public locations anywhere in the Kansas City area.</p>
          <div class="split__extra"><div>
            <ul class="check-list" role="list"><li>{icon("check")}<span>Flexible Scheduling — daytime, evening, and weekend availability</span></li><li>{icon("check")}<span>Real Estate &amp; Loan Signings</span></li><li>{icon("check")}<span>Jail and hospital visits in the Kansas City metro</span></li></ul>
            <p style="margin-top:18px"><a class="link" href="/notary-services/">Notary Services {arrow()}</a></p>
          </div></div>
        </div>
      </article>
      <article class="split__panel">
        <div class="split__img" data-parallax-img>{img("remote-online-notary", "Remote online notarization on a laptop video call with a digitally signed document", "(min-width: 900px) 50vw, 100vw")}</div>
        <div class="split__content">
          <div class="split__kicker"><span class="doc-no">02 · Anywhere in the world</span></div>
          <h3>Remote Online Notary</h3>
          <p>Remote Online Notary (RON) – Legally notarize documents from anywhere in the world using our Missouri-based secure digital platform.</p>
          <div class="split__extra"><div>
            <ul class="check-list" role="list"><li>{icon("check")}<span>Remote Convenience — eliminate travel time and delays</span></li><li>{icon("check")}<span>International Clients Welcome — for U.S. citizens and foreign nationals alike</span></li></ul>
            <p style="margin-top:18px"><a class="link" href="/notary-services/">Remote Online Notary {arrow()}</a></p>
          </div></div>
        </div>
      </article>
    </div>
  </div>
</section>'''


DOCS_STACK = [
    ("signature", "Power of Attorney", "Power of Attorney (General, Durable, Medical)"),
    ("scale", "Affidavits", "Affidavits &amp; Declarations"),
    ("luggage", "Travel Consent", "Minor Child Travel Consent Forms — essential for domestic flights and international travel."),
    ("file-check", "Immigration Forms", "U.S. Immigration Forms Support (I-130, I-864, DS-260, etc.)"),
    ("fingerprint", "FBI Documents", "FBI Background Check Apostille Support Documents"),
    ("languages", "Translations", "Certified Translations + Document Formatting for International Submissions"),
    ("package-check", "Embassy Packages", "Embassy Legalization Package Assembly"),
]


def docprep():
    btns = "".join(
        f'<li><button type="button" data-stack-btn="{i}" aria-pressed="{"true" if i == 0 else "false"}" aria-controls="stack-card-{i}">'
        f'<span class="doc-no">{i + 1:02d}</span><span>{t}</span>{icon("arrow-right")}</button></li>'
        for i, (_, t, _) in enumerate(DOCS_STACK))
    cards = "".join(
        f'<article class="stack__card" id="stack-card-{i}" data-stack-card="{i}">'
        f'<header><span class="doc-no">Form {i + 1:02d} / {len(DOCS_STACK):02d}</span>{icon(ic)}</header>'
        f'<h3>{t}</h3><p>{d}</p><span class="paper__line"></span><span class="paper__line paper__line--mid"></span>'
        f'<span class="paper__line paper__line--short"></span><footer><span>Prepared · Formatted</span><span>Ready to notarize</span></footer></article>'
        for i, (ic, t, d) in enumerate(DOCS_STACK))
    return f'''
<section class="section section--ivory" aria-labelledby="dp-h">
  <div class="container docprep">
    <div class="stack-copy">
      {eyebrow("Document Preparation &amp; Assistance")}
      <h2 id="dp-h" data-split>Paperwork shouldn’t hold up your progress.</h2>
      <p>We help you prepare legally sound, professionally formatted documents for personal, business, immigration, and international use — ready for notarization, apostille, or embassy legalization.</p>
      <ul class="doc-list" role="list" data-stack-list>{btns}</ul>
      <p class="disclaimer">We do not offer legal advice, but we help you complete and format your documents for official submission — including providing the notary and apostille services that follow.</p>
      <p>{btn("Document Preparation Services", "/document-preparation-services/", "ghost")}</p>
    </div>
    <div class="stack" data-stack aria-live="polite">{cards}</div>
  </div>
</section>'''


WHY = [
    ("clock", "Flexible Scheduling", "We offer daytime, evening, and weekend availability"),
    ("shield-check", "Secure &amp; Compliant", "All notarizations meet Missouri/Kansas state law and national compliance standards"),
    ("laptop", "Remote Convenience", "Eliminate travel time and delays with our fast and secure remote notary option"),
    ("globe", "International Clients Welcome", "Our remote platform allows notarizations for U.S. citizens and foreign nationals alike"),
    ("package-check", "Full-Service Handling", "From notarization and preparation to submission, tracking, and final delivery, we manage the entire process on your behalf."),
    ("languages", "Bilingual Expertise", "We make sure you understand every step in the process. Our bilingual team communicates clearly in your preferred language."),
]


def why():
    cards = "".join(
        f'<article class="hs-card"><span class="hs-card__num" aria-hidden="true">{i + 1:02d}</span><h3>{t}</h3><p>{d}</p>'
        f'<span class="icon-badge">{icon(ic)}</span></article>' for i, (ic, t, d) in enumerate(WHY))
    return f'''
<section class="section section--navy on-dark" aria-labelledby="why-h" data-hscroll-section>
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Why choose us")}<h2 id="why-h" data-split>One trusted provider, from preparation to delivery.</h2></div>
      <div class="stack-copy" style="justify-items:start">
        <p class="lead">Prepare, notarize, and apostille your documents through one trusted provider.</p>
        <div class="hscroll__controls" data-hs-controls><button class="icon-btn" type="button" data-hs-prev aria-label="Previous reason">{icon("chevron-left")}</button><button class="icon-btn" type="button" data-hs-next aria-label="Next reason">{icon("chevron-right")}</button></div>
      </div>
    </div>
  </div>
  <div class="hscroll" data-hscroll>
    <div class="container" style="overflow:visible">
      <div class="hscroll__track" data-hs-track tabindex="0" role="region" aria-label="Reasons to choose us (scrollable)">{cards}</div>
      <div class="hscroll__bar" aria-hidden="true"><span data-hs-bar></span></div>
    </div>
  </div>
</section>'''


def resources():
    return f'''
<section class="section" aria-labelledby="res-h">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Blog &amp; resources")}<h2 id="res-h" data-split>Blog</h2></div>
      <p class="lead">Guides from our team on urgent notary help and getting an apostille in Kansas City.</p>
    </div>
    <div class="res-grid" data-stagger>
      <a class="post-card" href="/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/">
        <div class="post-card__media">{img("jail-notary", "", "(min-width: 900px) 25vw, 100vw")}</div>
        <div class="post-card__body"><span class="doc-no">Notary · Kansas City</span><h3>Urgent Notary Services in Kansas City: Jail, Hospital &amp; After-Hours Help</h3><p>Mobile Notary for Inmates – Jackson County Jail &amp; Correctional Facilities…</p><span class="link">Read article {arrow()}</span></div>
      </a>
      <a class="post-card" href="/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/">
        <div class="post-card__media">{img("apostille-documents", "", "(min-width: 900px) 25vw, 100vw")}</div>
        <div class="post-card__body"><span class="doc-no">Apostille · Guide</span><h3>How to Get an Apostille in Kansas City: Birth Certificates, Custodian Documents &amp; More</h3><p>Apostille Services in Kansas City – Birth Certificates, Custodian…</p><span class="link">Read article {arrow()}</span></div>
      </a>
    </div>
    <div class="lang-grid" data-stagger>
      <div class="lang-card"><h3>Notary &amp; Apostille Services</h3><div class="btn-row"><a class="btn btn--sm btn--ghost" href="/notary-apostille-services/" hreflang="en">English</a><a class="btn btn--sm btn--ghost" href="/servicios-de-notaria-y-apostilla/" hreflang="es" lang="es">Español</a></div></div>
      <div class="lang-card"><h3>Jail Notary Kansas City</h3><div class="btn-row"><a class="btn btn--sm btn--ghost" href="/jail-notary-kansas-city/" hreflang="en">English</a><a class="btn btn--sm btn--ghost" href="/notaria-en-carceles-de-kansas-cit/" hreflang="es" lang="es">Español</a></div></div>
    </div>
  </div>
</section>'''


def build():
    body = "".join([
        hero(), trust(), about(), finder(),
        services_section("Services", "From Midwest Apostille &amp; Notary Service identity proofing and digital certificates to remote notarisations and mobile visits, our services are designed to simplify compliance and documentation quickly, securely, and nationwide."),
        apostille_story(), fbi_timeline(), legal_route(), mobile_remote(), docprep(), why(),
        countries_explorer(), reviews_section(), faq_section(HOME_FAQ, tone="section--ivory"), resources(), cta_final(),
    ])
    return page("/", "Professional Apostille & Notary Services Across Kansas City | Midwest Apostille & Notary",
                "We provide fast, reliable, and professional apostille and notary services across Kansas City, Missouri, and nationwide including courier services.",
                body, active="home", schema=[faq_schema(HOME_FAQ)], body_class="is-home")

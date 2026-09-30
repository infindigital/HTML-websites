"""Homepage: one editorial composition built around a single idea, a document made ready for the world.

Signature motif (hero, route builder, process): a paper document that is signed, sealed and finally
stamped READY FOR INTERNATIONAL USE. Every section below keeps its full text in the HTML; motion only
changes emphasis, never availability.
"""
from components import (HOME_FAQ, NO_TAB, countries_explorer, cta_final, faq_section, label, reviews_section, route_options,
                        service_index, shead)
from countries import HAGUE
from lib import cta_btn, faq_schema, icon, img, link, page

H1_KEYWORD = "Apostille &amp; Notary Services in Kansas City"
HAGUE_COUNT = sum(len(v) for v in HAGUE.values())

SIG_PATH = ("M4 30 C 18 6, 28 8, 30 26 S 44 38, 54 18 S 70 6, 74 24 S 92 36, 104 16 S 124 10, 132 24 "
            "S 146 28, 156 12")


def signature(cls):
    return (f'<svg class="{cls}" viewBox="0 0 160 44" aria-hidden="true"><path pathLength="1" d="{SIG_PATH}"/></svg>')


def seal(cls="seal"):
    """Flat engraved seal: two rings, circular legend, star. No gradients."""
    return f'''<svg class="{cls}" viewBox="0 0 120 120" aria-hidden="true">
      <defs><path id="{cls}-ring" d="M60 60 m-43 0 a43 43 0 1 1 86 0 a43 43 0 1 1 -86 0"/></defs>
      <circle cx="60" cy="60" r="57" class="seal__edge"/>
      <circle cx="60" cy="60" r="52" class="seal__line"/>
      <circle cx="60" cy="60" r="33" class="seal__line"/>
      <text class="seal__text"><textPath href="#{cls}-ring" startOffset="0">APOSTILLE &#183; CONVENTION DE LA HAYE &#183; 1961 &#183;</textPath></text>
      <path class="seal__star" d="M60 40 L65.3 53.5 L79.8 53.8 L68.4 62.6 L72.4 76.5 L60 68.4 L47.6 76.5 L51.6 62.6 L40.2 53.8 L54.7 53.5 Z"/>
    </svg>'''


def ready_stamp(cls="stamp"):
    return f'<span class="{cls}" aria-hidden="true"><small>Ready for</small><b>International use</b></span>'


# ----------------------------------------------------------------------------- 1. hero
HERO_LEDGER = [
    ("Document", "The original, or a certified copy"),
    ("Signed", "Notarized where the office requires it"),
    ("Sealed", "Apostille, or embassy legalization"),
    ("Ready", "Returned or shipped with tracking"),
]


def _ledger_art(i):
    """One drawn detail per stage: ruled lines, a signature, a seal, the final stamp."""
    if i == 0:
        return '<span class="ledger__sheet"><span class="pline"></span><span class="pline pline--m"></span><span class="pline"></span><span class="pline pline--s"></span></span>'
    if i == 1:
        return signature("ledger__sig")
    if i == 2:
        return seal("ledger__seal")
    return ready_stamp("stamp ledger__stamp")


def hero():
    cells = "".join(f'<li class="ledger__cell" data-ledger="{i}"><span class="ledger__art">{_ledger_art(i)}</span>'
                    f'<span class="ledger__n">{i + 1:02d}</span><strong>{t}</strong><span class="ledger__d">{d}</span></li>'
                    for i, (t, d) in enumerate(HERO_LEDGER))
    return f'''
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__bgmap" data-world-map="hero" aria-hidden="true"></div>
  <div class="container hero__inner" data-hero-copy>
    <h1 class="hero__title" id="hero-h">
      <span class="hero__eyebrow">{H1_KEYWORD}</span>
      <span class="hero__display"><span class="hl"><span>Documents ready</span></span> <span class="hl"><span>for the world.</span></span></span>
    </h1>
    <div class="hero__base">
      <div class="hero__intro">
        <p class="hero__lead">Apostille, embassy legalization, notarization and document preparation for Missouri, Kansas and all 50 states. We confirm the route before anything is submitted.</p>
        <div class="btn-row">{cta_btn(magnetic=True)}<a class="btn btn--quiet" href="#route-builder"><span class="btn__label">Find your document route</span><span class="btn__icon">{icon("arrow-down")}</span></a></div>
      </div>
      <div class="hero__ledger" data-hero-art>
        <p class="ledger__k" aria-hidden="true"><span>From your desk</span><span>To a foreign office</span></p>
        <ol class="ledger" role="list" aria-label="How a document becomes ready for international use">{cells}</ol>
        <span class="ledger__bar" aria-hidden="true"><i data-ledger-bar></i></span>
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- 2. stats (inside Trust)
def stats():
    items = [("50", "States", "Apostille service nationwide"),
             (str(HAGUE_COUNT), "Hague countries", "Accept a single apostille"),
             ("100+", "Destinations", "International courier shipping"),
             ("4", "Languages", "English, Spanish, Arabic, French")]
    cells = "".join(f'<div class="stats__item"><dt><span class="stats__k">{k}</span><span class="stats__d">{d}</span></dt>'
                    f'<dd class="stats__n" data-count="{n}">{n}</dd></div>' for n, k, d in items)
    return f'<dl class="stats__list stats">{cells}</dl>'


# ----------------------------------------------------------------------------- 3. services
HOME_SERVICES = [
    ("Apostille Services", "/apostille-services/", "apostille-certificates", "Kansas City &middot; All 50 states",
     "Same-day VIP apostille for Missouri and Kansas documents, standard processing, and embassy legalization for countries outside the Hague Convention."),
    ("Notary Services", "/notary-services/", "notary-stamp", "Office, mobile or online",
     "Acknowledgments, jurats, oaths and loan signings in our office, at your location in the Kansas City area, or by remote online notarization."),
    ("Document Preparation", "/document-preparation-services/", "document-preparation", "Nationwide",
     "Powers of attorney, affidavits, travel consent and immigration form support, formatted so they are ready to notarize or apostille."),
    ("Jail Notary", "/jail-notary-kansas-city/", "jail-notary", "Jackson &amp; Wyandotte counties",
     "Same-day notarizations for inmates. We go to the facility, including evenings, weekends and holidays."),
    ("FBI Apostille", "/fbi-apostille-for-hague-countries/", "international-route", "Hague countries",
     "Fingerprinting, your FBI Identity History Summary and the U.S. Department of State apostille, handled as one request."),
    ("FBI Legalization", "/fbi-attestation-legalization/", "hero-world-documents", "UAE, Qatar, Egypt and more",
     "Embassy legalization for FBI background checks going to countries outside the Hague Convention."),
]


# ----------------------------------------------------------------------------- 4. route builder
RB_DOCS = [("fbi", "FBI report"), ("birth", "Birth certificate"), ("marriage", "Marriage certificate"),
           ("diploma", "Diploma or transcript"), ("poa", "Power of attorney"), ("business", "Business document")]
RB_DEST = [("hague", "Hague country"), ("legal", "Non-Hague country"), ("unsure", "Not sure")]
RB_PURPOSE = [("visa", "Visa"), ("work", "Work"), ("study", "Study"), ("marriage", "Marriage"),
              ("immigration", "Immigration"), ("business", "Business")]


def _choices(name, items, first):
    return "".join(
        f'<label class="rb__opt"><input type="radio" name="{name}" value="{v}"{" checked" if v == first else ""}>'
        f'<span>{t}</span></label>' for v, t in items)


def route_builder():
    default = [("Your document", "FBI Identity History Summary, or fingerprints taken by us"),
               ("Package review", "DS-4194 checked against your report"),
               ("U.S. Department of State", "Apostille issued by the Office of Authentications"),
               ("Ready for international use", "Shipped back with tracking")]
    stations = "".join(f'<li class="rb__st"><span class="rb__dot"></span><strong>{t}</strong><span>{d}</span></li>' for t, d in default)
    return f'''
<section class="section section--navy rb" id="route-builder" aria-labelledby="rb-h" data-rb>
  <div class="container">
    {shead("01", "Your document route", "Three answers. One clear route.", "rb-h",
           "Choose the document, where it is going and why. The route updates as you go.")}
    <div class="rb__grid">
      <form class="rb__form" data-rb-form>
        <fieldset class="rb__step"><legend><span class="rb__num">01</span>Document</legend>
          <div class="rb__opts">{_choices("doc", RB_DOCS, "fbi")}</div></fieldset>
        <fieldset class="rb__step"><legend><span class="rb__num">02</span>Destination</legend>
          <div class="rb__opts">{_choices("dest", RB_DEST, "hague")}</div>
          <div class="rb__country"><label for="rb-country">Or type the country</label>
            <input id="rb-country" type="text" list="rb-countries" autocomplete="off" placeholder="For example, Spain or Qatar" data-rb-country>
            <datalist id="rb-countries">{route_options()}</datalist>
            <p class="rb__hint" aria-live="polite" data-rb-hint></p></div></fieldset>
        <fieldset class="rb__step"><legend><span class="rb__num">03</span>Purpose</legend>
          <div class="rb__opts">{_choices("purpose", RB_PURPOSE, "visa")}</div></fieldset>
      </form>
      <div class="rb__out" data-rb-out>
        <p class="rb__label">Your document route</p>
        <p class="rb__summary" aria-live="polite" data-rb-summary>FBI report, going to a Hague country, for a visa.</p>
        <ol class="rb__route" role="list" data-rb-route>{stations}</ol>
        <p class="rb__note" data-rb-note>We confirm every step with you before anything is submitted.</p>
        <div class="rb__end">{ready_stamp("stamp stamp--light rb__stamp")}<div class="btn-row">{cta_btn("light")}</div></div>
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- 5. apostille process
PROCESS = [
    ("document", "Document", "It starts with the original.",
     "Birth and marriage certificates, diplomas, FBI reports, powers of attorney and business records. We check what you have and whether a certified copy is needed first."),
    ("authenticate", "Authentication", "Signed, then certified by the right office.",
     "Signed documents are notarized. State documents are certified by the Secretary of State; federal documents, like an FBI report, go to the U.S. Department of State."),
    ("apostille", "Apostille", "One certificate, or the embassy route.",
     "Hague member countries accept a single apostille. Countries outside the convention need embassy legalization, often followed by a Ministry of Foreign Affairs step."),
    ("ready", "International use", "Back in your hands, or on its way abroad.",
     "Priority shipping with return tracking, local courier delivery, or FedEx and DHL international shipping. Certified translation in Spanish, Arabic or French when required."),
]


def process():
    n = len(PROCESS)
    track = "".join(f'<li><button type="button" data-proc-go="{i}"><span>{i + 1:02d}</span>{name}</button></li>'
                    for i, (_k, name, *_r) in enumerate(PROCESS))
    steps = "".join(f'''
        <article class="proc__step{" is-on" if i == 0 else ""}" data-proc-step="{i}" id="how-{k}">
          <p class="proc__n"><span>{i + 1:02d}</span> / {n:02d} &middot; {name}</p>
          <h3>{t}</h3>
          <p>{d}</p>
        </article>''' for i, (k, name, t, d) in enumerate(PROCESS))
    return f'''
<section class="section proc" aria-labelledby="proc-h" data-proc>
  <div class="container">
    {shead("02", "The apostille journey", "From your desk to a foreign office, in four stages.", "proc-h",
           "Not every document needs every stage. We tell you which ones apply before you send anything.")}
  </div>
  <div class="proc__pin" data-proc-pin>
    <div class="container proc__inner">
      <ol class="proc__track" role="list" data-proc-track>{track}<span class="proc__bar" aria-hidden="true"><i data-proc-bar></i></span></ol>
      <div class="proc__stage">
        <div class="pdoc is-0" data-proc-doc aria-hidden="true">
          <div class="pdoc__paper">
            <p class="pdoc__head"><span>Public document</span><span>No. 0418</span></p>
            <p class="pdoc__title">Certificate</p>
            <span class="pline"></span><span class="pline pline--m"></span><span class="pline"></span><span class="pline pline--s"></span><span class="pline pline--m"></span>
            <div class="pdoc__sign">{signature("pdoc__sig")}<span>Signature</span></div>
            <span class="pdoc__notary">Notary public<br><small>Missouri</small></span>
          </div>
          <div class="pdoc__cert"><p>Apostille</p><small>Convention de La Haye du 5 octobre 1961</small>
            <span class="pline"></span><span class="pline pline--m"></span><span class="pline"></span>{seal("pdoc__seal")}</div>
          {ready_stamp("stamp pdoc__stamp")}
        </div>
        <div class="proc__steps">{steps}</div>
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- 6. FBI paths
FBI_HAGUE = [("FBI report", "Your existing Identity History Summary, or we take your fingerprints and obtain it."),
             ("Package review", "We check the DS-4194 against your report. Incorrect forms are the most common reason for rejection."),
             ("U.S. Department of State", "The Office of Authentications issues the apostille. We track it for you."),
             ("Ready to submit", "Returned with a certified translation if your destination requires one.")]
FBI_LEGAL = [("FBI report", "Existing report, fingerprints taken by us, or the official FBI eDO electronic PDF."),
             ("Package review", "We review the DS-4194 with your report. A legalization chain is costly to redo."),
             ("U.S. Department of State", "Authentication by the Office of Authentications, the first stamp in the chain."),
             ("Embassy legalization", "The destination embassy in Washington, DC legalizes the report. We submit and track it."),
             ("Ministry of Foreign Affairs", "Returned ready for the final attestation in the destination country.")]


def fbi_paths():
    def col(key, title, sub, items, href, cta):
        lis = "".join(f'<li class="fbi__row" data-fbi-row><span class="fbi__n">{i + 1:02d}</span><div><h4>{t}</h4><p>{d}</p></div></li>'
                      for i, (t, d) in enumerate(items))
        return f'''
        <div class="fbi__col" data-fbi-col="{key}">
          <p class="fbi__k">{sub}</p>
          <h3>{title}</h3>
          <ol class="fbi__list" role="list">{lis}</ol>
          {link(cta, href)}
        </div>'''
    return f'''
<section class="section fbi" aria-labelledby="fbi-h" data-fbi>
  <div class="container">
    {shead("04", "FBI background checks", "Two paths. We walk the right one with you.", "fbi-h",
           "An apostille alone is rejected by countries outside the Hague Convention, such as the UAE, Qatar, Kuwait and Egypt.")}
    <div class="fbi__switch" role="group" aria-label="Highlight a path">
      <button type="button" aria-pressed="false" data-fbi-pick="hague">Hague country</button>
      <button type="button" aria-pressed="false" data-fbi-pick="legal">Non-Hague country</button>
    </div>
    <div class="fbi__paths">
      {col("hague", "FBI apostille", "Hague countries &middot; 4 steps", FBI_HAGUE, "/fbi-apostille-for-hague-countries/", "FBI apostille for Hague countries")}
      <div class="fbi__divider" aria-hidden="true"><i data-fbi-line></i></div>
      {col("legal", "FBI legalization", "Non-Hague countries &middot; 5 steps", FBI_LEGAL, "/fbi-attestation-legalization/", "FBI legalization for non-Hague countries")}
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- 7. notary (human)
NOTARY_MODES = [
    ("mobile", "Mobile notary", "notary-signing", "Notary signing a document next to a notary stamp",
     "We meet you at your home, office or a convenient public location anywhere in the Kansas City area, with daytime, evening and weekend availability. Real estate and loan signings included.",
     ("Mobile notary in Kansas City", "/notary-services/#mobile-notary")),
    ("office", "In our office", "document-handover", "Client signing documents across a desk with a notary",
     "Meet us at our office at 8101 E. Bannister Rd. for acknowledgments, jurats, oaths, affidavits and apostille paperwork, handled in one visit.",
     ("Notary services", "/notary-services/")),
    ("online", "Remote online notary", "remote-online-notary", "Remote online notarization session on a secure platform",
     "Sign by video in front of our Missouri notary through a secure digital platform. For U.S. citizens and foreign nationals alike, with no travel time.",
     ("How remote online notarization works", "/notary-services/#remote-online-notary")),
]


def notary():
    tabs, panels, photos = [], [], []
    for i, (k, t, im, alt, d, ln) in enumerate(NOTARY_MODES):
        on = i == 0
        tabs.append(f'<button type="button" role="tab" id="nt-{k}" aria-controls="np-{k}" aria-selected="{"true" if on else "false"}"'
                    f'{"" if on else NO_TAB} data-nt="{i}"><span>{i + 1:02d}</span>{t}</button>')
        panels.append(f'<div class="nt__panel" role="tabpanel" id="np-{k}" aria-labelledby="nt-{k}" data-np="{i}"{"" if on else " hidden"}>'
                      f'<h3>{t}</h3><p>{d}</p>{link(ln[0], ln[1])}</div>')
        photos.append(img(im, alt, "(min-width: 1024px) 50vw, 100vw", cls="is-on" if on else "", attrs=f'data-nphoto="{i}"'))
    return f'''
<section class="section nt" aria-labelledby="nt-h" data-nt-root>
  <div class="container nt__grid">
    <div class="nt__media">
      <div class="nt__frame">{"".join(photos)}</div>
      <div class="nslip" aria-hidden="true" data-nslip>
        <p class="nslip__k">Acknowledgment</p>
        <span class="pline"></span><span class="pline pline--m"></span>
        <div class="nslip__row"><div class="nslip__sign">{signature("nslip__sig")}<span>Signed before me</span></div>
          <span class="nslip__stamp">Notary<br>public</span></div>
        <p class="nslip__ok">{icon("check")}Notarized</p>
      </div>
    </div>
    <div class="nt__copy">
      {shead("05", "Notary", "In person, at your door, or on a screen.", "nt-h", cls="shead--stack")}
      <div class="nt__tabs" role="tablist" aria-label="Notary options" data-nt-tabs>{"".join(tabs)}</div>
      {"".join(panels)}
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- 8. document preparation
DOCS = [("Power of Attorney", "General, limited and durable powers of attorney, drafted and formatted for notarization."),
        ("Affidavit", "Sworn statements for courts, agencies and license reinstatement, ready to sign."),
        ("Travel Consent", "Minor travel consent letters, drafted and ready for notarization."),
        ("Immigration Forms", "Support preparing and assembling immigration forms and supporting documents."),
        ("FBI Documents", "DS-4194 and FBI report packages checked before submission."),
        ("Translations", "Certified translation in Spanish, Arabic and French, coordinated with the original."),
        ("Embassy Package", "Documents assembled into one package for embassy legalization.")]


def doc_prep():
    btns = "".join(f'<li><button type="button" data-dp="{i}" aria-pressed="{"true" if i == 0 else "false"}">'
                   f'<span class="dp__n">{i + 1:02d}</span><span class="dp__t">{t}</span><span class="dp__d">{d}</span></button></li>'
                   for i, (t, d) in enumerate(DOCS))
    sheets = "".join(f'<div class="dp__sheet" data-dp-sheet="{i}" style="--i:{i}"><p class="dp__sk">Prepared &middot; {i + 1:02d}</p>'
                     f'<p class="dp__st">{t}</p><p class="dp__sd">{d}</p><span class="pline"></span><span class="pline pline--m"></span>'
                     f'<span class="pline pline--s"></span><span class="dp__sl">Ready to notarize</span></div>'
                     for i, (t, d) in enumerate(DOCS))
    return f'''
<section class="section dp" aria-labelledby="dp-h" data-dp-root>
  <div class="container dp__grid">
    <div class="dp__copy">
      {shead("06", "Document preparation", "Drafted right before anyone signs.", "dp-h",
             "We prepare and format the paperwork so it is accepted the first time.", cls="shead--stack")}
      <ul class="dp__list" role="list">{btns}</ul>
      {link("Document preparation services", "/document-preparation-services/")}
    </div>
    <div class="dp__stack" aria-hidden="true" data-dp-stack>{sheets}</div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- 9. guides (inside Questions)
GUIDES = [
    ("/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/", "Apostille guide",
     "How to get an apostille in Kansas City: birth certificates, custodian documents and more"),
    ("/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/", "Notary guide",
     "Urgent notary services in Kansas City: jail, hospital and after-hours help"),
]


def guides():
    items = "".join(f'<li><a href="{h}"><span class="label">{k}</span><span class="glist__t">{t}</span>'
                    f'<span class="glist__i">{icon("arrow-up-right")}</span></a></li>' for h, k, t in GUIDES)
    return (f'<div class="glist"><p class="label">Read before you send</p><ul class="glist__list" role="list">{items}</ul>'
            f'{link("All guides and FBI resources", "/guides/")}</div>')


def build():
    body = "".join([
        hero(),
        route_builder(),
        process(),
        service_index("Six services, one office.", "services-h", num="03", lab="Services",
                      lead="Choose a service to see what it covers and how to start.", items=HOME_SERVICES),
        fbi_paths(),
        notary(),
        doc_prep(),
        countries_explorer(num="07", heading="Is your destination a Hague country?"),
        reviews_section(num="08", lab="Trust", pre=stats()),
        faq_section(HOME_FAQ, num="09", heading="Questions, answered.",
                    lead='More detail on the <a class="text-link" href="/apostille-services/">apostille</a> and <a class="text-link" href="/notary-services/">notary</a> pages.',
                    aside=guides()),
        cta_final(),
    ])
    return page("/", "Apostille & Notary Services in Kansas City | Midwest",
                "Apostille, embassy legalization, notary and document preparation in Kansas City, MO. Same-day apostille for Missouri and Kansas, and service in all 50 states.",
                body, active="home", schema=[faq_schema("/", HOME_FAQ)], body_class="is-home",
                keyword="apostille and notary services Kansas City")

"""Reusable content sections. All copy is verbatim from the content PDF."""
from countries import (HAGUE, HAGUE_NOTES, LEGALIZATION, NON_HAGUE_MENTIONED, slug)
from lib import (APPT, BOOK, DISCLAIMER, EMAIL, GOOGLE_G, PHONE, PHONE_FMT, TEL, ADDRESS_SHORT,
                 arrow, book_btn, btn, call_btn, esc, eyebrow, icon, img, stars)

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


def _initial(name):
    return name.strip()[0].upper()


def reviews_section(heading="Client Reviews", tone="section--white"):
    mains, thumbs = [], []
    for i, (name, text) in enumerate(REVIEWS):
        active = " is-active" if i == 0 else ""
        long_cls = ' class="is-long"' if len(text) > 260 else ""
        mains.append(f'''
      <div class="review-main{active}" id="review-{i}" role="tabpanel" aria-labelledby="rt-{i}" data-review>
        {icon("quote", "review-main__mark")}
        <blockquote{long_cls}><p>{text}</p></blockquote>
        <div class="review-main__cap">
          <span class="avatar" aria-hidden="true">{_initial(name)}</span>
          <span class="review-meta"><strong>{name}</strong>{stars()}</span>
          <span class="gbadge">{GOOGLE_G}5★ Google review</span>
        </div>
      </div>''')
        thumbs.append(f'''
        <li role="presentation"><button class="review-thumb" type="button" role="tab" id="rt-{i}" aria-controls="review-{i}" aria-selected="{"true" if i == 0 else "false"}"{"" if i == 0 else ' tabindex="-1"'}>
          <span class="who"><span class="avatar" aria-hidden="true">{_initial(name)}</span>{name}</span>
          <p>{text}</p>
        </button></li>''')
    marquee_items = "".join(
        f'<span class="marquee__item">{stars()}{name}</span>' for name, _ in REVIEWS)
    return f'''
<section class="section {tone}" aria-labelledby="reviews-h">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Google reviews")}<h2 id="reviews-h" data-split>{heading}</h2></div>
      <p class="lead">Read what clients across Kansas City and beyond say about their notary and apostille experience.</p>
    </div>
    <div class="reviews" data-reviews>
      <div>
        <div class="reviews__stage" aria-live="polite">{"".join(mains)}</div>
        <div class="reviews__controls">
          <button class="icon-btn" type="button" data-review-prev aria-label="Previous review">{icon("chevron-left")}</button>
          <button class="icon-btn" type="button" data-review-next aria-label="Next review">{icon("chevron-right")}</button>
          <button class="icon-btn" type="button" data-review-toggle aria-label="Pause automatic rotation" aria-pressed="false">{icon("pause")}</button>
          <div class="reviews__progress" aria-hidden="true"><span data-review-progress></span></div>
        </div>
      </div>
      <ul class="review-thumbs" role="tablist" aria-label="Choose a review">{"".join(thumbs)}</ul>
    </div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="marquee__track">{marquee_items}{marquee_items}</div></div>
</section>'''


# ----------------------------------------------------------------------------- FAQ
def faq_section(items, heading="Frequently Asked Questions", eyebrow_t="Good to know", intro="", tone="",
                hid="faq-h", aside_extra=""):
    accs = []
    for i, (q, a) in enumerate(items):
        accs.append(f'''
      <details class="acc" data-acc>
        <summary><span class="doc-no">{i + 1:02d}</span><span>{q}</span><span class="acc__icon" aria-hidden="true"></span></summary>
        <div class="acc__body"><div class="acc__inner"><p>{a}</p></div></div>
      </details>''')
    intro_html = f'<p class="lead">{intro}</p>' if intro else ""
    return f'''
<section class="section {tone}" aria-labelledby="{hid}">
  <div class="container faq">
    <div class="faq__head">{eyebrow(eyebrow_t)}<h2 id="{hid}" data-split>{heading}</h2>{intro_html}{aside_extra}</div>
    <div class="accordion" data-stagger>{"".join(accs)}</div>
  </div>
</section>'''


HOME_FAQ = [
    ("What is an apostille?", "An apostille is a certification that authenticates the origin of a public document for use in another country that is a member of the Hague Apostille Convention."),
    ("How long does the apostille process take?", "For Missouri and Kansas residents, we offer same-day VIP apostille services ($650) and standard 7-14 business day processing ($190). For all other states, turnaround time is 48 to 72 hours for our rush time sensitive service."),
    ("Can I notarize documents remotely?", "Yes, we offer remote online notarization services for residents in Missouri and Kansas."),
    ("What countries are part of the Hague Convention?", 'Please refer to the “<a href="/apostille-services/#countries">Apostille</a>” page where you can see all the countries.'),
    ("What if my document is for a non-Hague country?", "We also offer Embassy Legalization Services, including U.S. Department of State certification and consular legalization, for countries not part of the Hague Apostille Convention."),
]


# ----------------------------------------------------------------------------- booking band
def booking_band(text="Need a Public Notary and apostille certificate? Book Trusted, Certified Services Today!",
                 heading="Book a Session with Our Experienced Team for Expert Guidance", label="Make an Appointment",
                 href=BOOK, extra="", bg="notary-seal", hid="book-h"):
    return f'''
<section class="section section--navy on-dark booking" aria-labelledby="{hid}" style="overflow:hidden">
  <div class="finder__bg" data-parallax-bg>{img(bg, "", "100vw")}</div>
  <div class="container" style="position:relative">
    <div class="two-col">
      <div class="stack-copy">
        {eyebrow("Appointments")}
        <h2 id="{hid}" data-split>{heading}</h2>
      </div>
      <div class="stack-copy">
        <p class="lead">{text}</p>
        {extra}
        <div class="btn-row">{book_btn(label, "gold", href)}{btn(f"Call {PHONE}", TEL, "outline-light", "phone")}</div>
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- final CTA
def cta_final(heading="Get clarity before you send your documents.",
              text="Book a Session with Our Experienced Team for Expert Guidance. Need a Public Notary and apostille certificate? Book Trusted, Certified Services Today!",
              label="Make an Appointment", href=BOOK):
    lines = []
    for i in range(9):
        y = 40 + i * 60
        dash = ' class="is-dash"' if i % 3 == 1 else ""
        lines.append(f'<path{dash} d="M-50 {y} C 300 {y - 80}, 700 {y + 120}, 1500 {y - 20}"/>')
    return f'''
<section class="section cta on-dark" aria-labelledby="cta-h">
  <svg class="cta__lines" viewBox="0 0 1440 560" preserveAspectRatio="none" aria-hidden="true" data-cta-lines>{"".join(lines)}</svg>
  <div class="container">
    {eyebrow("Start with the right route")}
    <h2 id="cta-h" data-split>{heading}</h2>
    <p>{text}</p>
    <div class="btn-row">{book_btn(label, "gold", href)}{btn(f"Call {PHONE}", TEL, "outline-light", "phone")}</div>
    <p class="disclaimer">{DISCLAIMER}</p>
  </div>
</section>'''


# ----------------------------------------------------------------------------- services
SERVICES = [
    ("Apostille Services (VIP Same-Day &amp; Standard Processing)", "/apostille-services/", "apostille-certificates",
     "Same-day VIP apostille services ($650) and standard 7-14 business day processing ($190) for Missouri and Kansas residents — nationwide apostille services in all 50 U.S. states.",
     ["Powers of Attorney (Poder Notarial)", "Birth and Marriage Certificates", "School Records and Diplomas"]),
    ("Embassy Legalization Services", "/fbi-attestation-legalization/", "international-route",
     "For non-Hague Convention countries requiring consular authentication — including U.S. Department of State certification and consular legalization.",
     ["Countries like Canada, China, Egypt, or the UAE", "Certification, translation, and logistics support"]),
    ("Mobile Notary (Missouri &amp; Kansas)", "/notary-services/", "notary-signing",
     "Busy schedule? We come to you. Our mobile notaries meet clients at offices, homes, or convenient public locations anywhere in the Kansas City area.",
     ["Daytime, evening, and weekend availability", "Real Estate &amp; Loan Signings"]),
    ("Remote Online Notary", "/notary-services/", "remote-online-notary",
     "Legally notarize documents from anywhere in the world using our Missouri-based secure digital platform.",
     ["Eliminate travel time and delays", "For U.S. citizens and foreign nationals alike"]),
    ("Jail Notary Services", "/jail-notary-kansas-city/", "jail-notary",
     "Professional, Fast &amp; Discreet Notary Services – Right at the Jail. We visit the jail directly – no need for inmate transport.",
     ["Same-Day Notarizations for Inmates in Jackson &amp; Wyandotte Counties", "Evenings, Weekends &amp; Holidays Available"]),
    ("Document Preparation &amp; Assistance", "/document-preparation-services/", "document-handover",
     "We help you prepare legally sound, professionally formatted documents for personal, business, immigration, and international use.",
     ["Power of Attorney (General &amp; Specific)", "Minor Travel Consent Forms", "Document Translation (English, Spanish, Arabic, French)"]),
    ("FBI Apostille for Hague Convention Countries", "/fbi-apostille-for-hague-countries/", "apostille-documents",
     "Get your FBI background check authenticated for use in any Hague member country — from fingerprinting to finished, apostilled document.",
     ["Authenticated by U.S. Dept. of State", "No Embassy Legalization Required"]),
    ("FBI Attestation Legalization", "/fbi-attestation-legalization/", "notary-stamp",
     "When your destination country is not a member of the Hague Apostille Convention, your FBI background check must go through a two-stage embassy legalization process — we handle the entire U.S. side, fingerprint to embassy.",
     ["U.S. Dept. of State Authentication", "Destination Embassy Legalization"]),
]


def services_section(heading="Services", intro="", hid="services-h", ids=None):
    cards = []
    for i, (title, href, im, desc, more) in enumerate(SERVICES):
        cid = f' id="{ids[i]}"' if ids else ""
        lis = "".join(f"<li>{icon('check')}<span>{m}</span></li>" for m in more)
        cards.append(f'''
      <article class="svc"{cid}>
        <a class="svc__link" href="{href}" data-cursor="View">
          <div class="svc__media">{img(im, "", "(min-width: 1100px) 55vw, (min-width: 760px) 50vw, 100vw")}<span class="svc__num">{i + 1:02d} / {len(SERVICES):02d}</span></div>
          <div class="svc__body">
            <h3 class="svc__title">{title}</h3>
            <div><p class="svc__desc">{desc}</p><div class="svc__more"><ul role="list" style="padding-top:12px">{lis}</ul></div></div>
            <div class="svc__cta"><span>Learn more</span><span class="svc__arrow" aria-hidden="true">{icon("arrow-up-right")}</span></div>
          </div>
        </a>
      </article>''')
    intro_html = f'<p class="lead">{intro}</p>' if intro else ""
    return f'''
<section class="section" aria-labelledby="{hid}">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("What we do")}<h2 id="{hid}" data-split>{heading}</h2></div>
      {intro_html}
    </div>
    <div class="services-grid" data-stagger="svc">{"".join(cards)}</div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- reasons grid
def reasons(items, icons_=None):
    icons_ = icons_ or ["clock", "shield-check", "laptop", "globe", "users-round", "languages", "package-check"]
    out = []
    for i, (t, d) in enumerate(items):
        out.append(f'<article class="reason"><span class="icon-badge">{icon(icons_[i % len(icons_)])}</span>'
                   f'<span class="doc-no">{i + 1:02d}</span><h3>{t}</h3><p>{d}</p></article>')
    return f'<div class="reasons" data-stagger>{"".join(out)}</div>'


def reasons_section(items, heading="Why Choose Us?", icons_=None, tone="", hid=None, intro=""):
    import re as _re
    hid = hid or "h-" + _re.sub(r"[^a-z0-9]+", "-", _re.sub(r"&\w+;", "", heading.lower())).strip("-")
    intro_html = f'<p class="lead">{intro}</p>' if intro else ""
    return f'''
<section class="section {tone}" aria-labelledby="{hid}">
  <div class="container">
    <div class="section-head section-head--split"><div>{eyebrow("Why clients choose us")}<h2 id="{hid}" data-split>{heading}</h2></div>{intro_html}</div>
    {reasons(items, icons_)}
  </div>
</section>'''


# ----------------------------------------------------------------------------- country explorer
def countries_explorer(heading="Hague Apostille Convention Countries (2025)", hid="countries-h", intro=None,
                       tone="section--white", sid="countries"):
    legal_names = {row[0] for row in LEGALIZATION}
    regions = list(HAGUE.keys())
    region_counts = {r: len(v) for r, v in HAGUE.items()}
    blocks = []
    for r in regions:
        lis = []
        for n in HAGUE[r]:
            note = HAGUE_NOTES.get(n)
            note_html = f' <small>({note})</small>' if note else ""
            also = next((row for row in LEGALIZATION if row[0] == n), None)
            extra = ' data-also-legal="1"' if also else ""
            lis.append(f'<li><button type="button" data-country="{esc(n)}" data-slug="{slug(n)}" data-status="hague" '
                       f'data-region="{r}"{extra}>{n}{note_html}</button></li>')
        blocks.append(f'''
        <section class="region" data-region-block="{r}" aria-labelledby="rg-{r.lower()}">
          <h3 id="rg-{r.lower()}">{r}<span class="doc-no">{region_counts[r]:02d}</span></h3>
          <ul class="country-list" role="list">{"".join(lis)}</ul>
        </section>''')
    # Non-Hague (legalization) block
    lis = []
    for name, region, embassy, translation, final, uses in LEGALIZATION:
        if name in {n for v in HAGUE.values() for n in v}:
            continue
        tr = f' data-translation="{esc(translation)}"' if translation else ""
        uses_attr = esc("|".join(uses))
        lis.append(f'<li><button type="button" data-country="{esc(name)}" data-slug="{slug(name)}" data-status="legalization" '
                   f'data-region="Non-Hague" data-embassy="{esc(embassy)}" data-final="{esc(final)}" data-uses="{uses_attr}"{tr}>{name}</button></li>')
    for name, region in NON_HAGUE_MENTIONED:
        lis.append(f'<li><button type="button" data-country="{esc(name)}" data-slug="{slug(name)}" data-status="legalization" data-region="Non-Hague">{name}</button></li>')
    blocks.append(f'''
        <section class="region" data-region-block="Non-Hague" aria-labelledby="rg-nonhague">
          <h3 id="rg-nonhague">Non-Hague (embassy legalization)<span class="doc-no">{len(lis):02d}</span></h3>
          <ul class="country-list" role="list">{"".join(lis)}</ul>
        </section>''')
    # Vietnam appears in both lists on the client site: carry the guide data on its Hague entry too.
    vn = next(row for row in LEGALIZATION if row[0] == "Vietnam")
    total = sum(region_counts.values())
    chips = [f'<button class="chip is-active" type="button" data-filter="all" aria-pressed="true">All regions</button>']
    for r in regions:
        chips.append(f'<button class="chip" type="button" data-filter="{r}" aria-pressed="false">{r} <span class="count">{region_counts[r]}</span></button>')
    chips.append(f'<button class="chip" type="button" data-filter="Non-Hague" aria-pressed="false">Non-Hague <span class="count">{len(lis)}</span></button>')
    intro = intro or ("We provide apostille services for documents going to the following Hague Convention countries. "
                      "For documents being sent to non-Hague Convention countries, we also offer full Embassy Legalization "
                      "Services, which include U.S. Department of State certification and consular legalization.")
    return f'''
<section class="section {tone}" id="{sid}" aria-labelledby="{hid}">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Country explorer")}<h2 id="{hid}" data-split>{heading}</h2></div>
      <p class="lead">{intro}</p>
    </div>
    <div class="explorer" data-explorer data-vn-embassy="{esc(vn[2])}" data-vn-translation="{esc(vn[3])}" data-vn-final="{esc(vn[4])}" data-vn-uses="{esc('|'.join(vn[5]))}">
      <div class="explorer__bar">
        <div class="search">{icon("search")}<label class="sr-only" for="{sid}-search">Search countries</label>
          <input id="{sid}-search" type="search" placeholder="Search a country…" autocomplete="off" data-country-search></div>
        <div class="filters" role="group" aria-label="Filter by region">{"".join(chips)}</div>
      </div>
      <div class="explorer__main">
        <div>
          <div class="world-map" data-world-map="explorer"><div class="world-map__tip" data-map-tip></div></div>
          <div class="legend" aria-hidden="true"><span><i style="background:var(--navy-600)"></i>Hague member — apostille</span><span><i style="background:var(--gold-400)"></i>Non-Hague — embassy legalization</span><span><i style="background:var(--ivory-200)"></i>Not on our published lists</span></div>
        </div>
        <aside class="country-panel" aria-live="polite" data-country-panel>
          <span class="status">{icon("globe", "icon--sm")}Select a country</span>
          <h3>Where will your document be used?</h3>
          <p>Choose a country on the map or from the lists below to see whether it is on the Hague Apostille Convention list or needs embassy legalization.</p>
        </aside>
      </div>
      <p class="sr-only" aria-live="polite" data-country-count></p>
      <div class="regions" data-regions>{"".join(blocks)}</div>
      <p class="explorer__empty" data-country-empty hidden>No country on our published lists matches that search. For destinations not listed here, <a class="text-link" href="/contact-us/">contact us</a> to confirm whether an apostille or embassy legalization applies.</p>
      <p class="disclaimer">{DISCLAIMER}</p>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- FBI apostille timeline
FBI_STEPS = [
    ("Get Your FBI Report", "Use your existing FBI Identity History Summary, or we capture your fingerprints and obtain it for you. We can handle this step — no need to find a separate channeler.", "notary-signing"),
    ("We Review Your Package", "You complete the DS-4194; we review every detail alongside your report and confirm everything is submission-ready. A miscompleted form is the most common cause of rejection.", "document-handover"),
    ("Submitted to State Dept.", "Your document is submitted to the U.S. Department of State Office of Authentications for the apostille. We monitor progress and keep you updated.", "international-route"),
    ("Returned to You", "Your apostilled report ships back — with a certified translation included if your destination country requires one. Everything arrives as one submission-ready package.", "hero-world-documents"),
]


def fbi_timeline(heading="How Your FBI Apostille Works", tone="section--white", hid="fbi-h", link=True):
    items, imgs, meter = [], [], []
    for i, (t, d, im) in enumerate(FBI_STEPS):
        imgs.append(img(im, "", "(min-width: 1024px) 50vw, 100vw", cls="is-active" if i == 0 else "", attrs=f'data-tl-img="{i}"'))
        meter.append('<span class="is-on"></span>' if i == 0 else "<span></span>")
        items.append(f'''
        <li class="timeline__item{" is-active" if i == 0 else ""}" data-tl-step="{i}">
          <span class="timeline__num" aria-hidden="true">{i + 1}</span>
          <div><span class="doc-no">Step {i + 1}</span><h3>{t}</h3><p>{d}</p></div>
        </li>''')
    more = f'<p style="margin-top:28px">{btn("FBI Apostille for Hague Countries", "/fbi-apostille-for-hague-countries/", "ghost")}</p>' if link else ""
    return f'''
<section class="section {tone}" aria-labelledby="{hid}">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("FBI apostille · Start to finish")}<h2 id="{hid}" data-split>{heading}</h2></div>
      <p class="lead">Four steps — and unlike most apostille services, we can handle the very first one too.</p>
    </div>
    <div class="timeline" data-timeline>
      <div class="timeline__media">
        <div class="timeline__frame">{"".join(imgs)}
          <div class="timeline__caption"><strong data-tl-caption>{FBI_STEPS[0][0]}</strong><span class="timeline__meter" aria-hidden="true">{"".join(meter)}</span></div>
        </div>
        <dl class="facts" style="margin-top:14px">
          <div class="fact"><dt>Authenticated By</dt><dd>U.S. Dept. of State — Office of Authentications</dd></div>
          <div class="fact"><dt>Embassy Legalization</dt><dd>Not required for Hague member countries</dd></div>
          <div class="fact"><dt>Validity</dt><dd>Often ~90 days — confirm with your authority</dd></div>
        </dl>
      </div>
      <div>
        <ol class="timeline__list" role="list"><span class="timeline__progress" data-tl-progress aria-hidden="true"></span>{"".join(items)}</ol>
        {more}
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- non-Hague legalization
LEGAL_STEPS = [
    ("Get Your FBI Report", "Use your existing FBI Identity History Summary, or we capture your fingerprints and obtain it for you. We accept the official FBI eDO electronic PDF — you can start remotely from any state."),
    ("We Review Your Package", "You complete the DS-4194; we review every detail alongside your report before anything is submitted. A non-Hague legalization chain is costly to redo — we catch issues before they become rejections."),
    ("State Dept. Authentication", "Your report is authenticated by the U.S. Department of State Office of Authentications — the first and required stamp in the legalization chain."),
    ("Embassy Legalization", 'The destination country\'s embassy in Washington, DC legalizes the authenticated report. We handle submission and tracking for this stage entirely on your behalf. <span class="dyn" data-legal-embassy></span>'),
    ("Returned to You", 'Ships back with certified translation included — ready for the final Ministry of Foreign Affairs (MOFA) attestation once it arrives in your destination country. Everything in one submission-ready package. <span class="dyn" data-legal-final></span>'),
]


def legal_route(heading="How FBI Attestation Works", hid="legal-h", intro="Five steps — more than a Hague apostille, but we manage every stage on the U.S. side.", link=True):
    guide = [row for row in LEGALIZATION]
    chips = []
    for i, (name, region, embassy, translation, final, uses) in enumerate(guide):
        chips.append(f'<button class="chip" type="button" aria-pressed="{"true" if i == 0 else "false"}" data-legal-country data-slug="{slug(name)}" '
                     f'data-name="{esc(name)}" data-embassy="{esc(embassy)}" data-final="{esc(final)}" '
                     f'data-translation="{esc(translation or "")}" data-uses="{esc("|".join(uses))}">{name}</button>')
    steps = "".join(
        f'<li class="legal__step" data-legal-step="{i}"><span class="legal__step-n" aria-hidden="true">{i + 1}</span>'
        f'<div><span class="doc-no">Step {i + 1}</span><h3>{t}</h3><p>{d}</p></div></li>' for i, (t, d) in enumerate(LEGAL_STEPS))
    first = guide[0]
    more = f'<p style="margin-top:24px">{btn("FBI Attestation Legalization", "/fbi-attestation-legalization/", "outline-light")}</p>' if link else ""
    return f'''
<section class="section section--navy on-dark" aria-labelledby="{hid}">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Non-Hague countries · Embassy legalization")}<h2 id="{hid}" data-split>{heading}</h2></div>
      <p class="lead">{intro}</p>
    </div>
    <div class="legal" data-legal>
      <div>
        <div class="legal__map" data-world-map="legal"><div class="legal__labels" data-legal-labels></div></div>
        <p class="doc-no" style="margin-top:18px" id="legal-pick">FBI Background Check Attestation by Country — select a destination</p>
        <div class="legal__picker" role="group" aria-labelledby="legal-pick">{"".join(chips)}</div>
        <div class="legal__card" aria-live="polite" data-legal-card>
          <h3>{first[0]}</h3>
          <dl>
            <dt>Embassy</dt><dd>{first[2]}</dd>
            <dt>Translation</dt><dd>{first[3]}</dd>
            <dt>Final In-Country Step</dt><dd>{first[4]}</dd>
            <dt>Common Uses</dt><dd>{", ".join(first[5])}</dd>
          </dl>
        </div>
      </div>
      <div>
        <ol class="legal__steps" role="list">{steps}</ol>
        <div class="callout" style="margin-top:22px">{icon("circle-help")}<div><strong>Important:</strong><p>Submitting an apostilled document to a non-Hague country will result in rejection. Countries like the UAE, Qatar, Kuwait, and Egypt require full embassy legalization — an apostille alone is not accepted.</p></div></div>
        {more}
      </div>
    </div>
  </div>
</section>'''


# ----------------------------------------------------------------------------- apostille story
def apostille_story(hid="story-h"):
    steps = [
        ("01 · Document", "What Is an Apostille?",
         "<p>An apostille is an official certification that makes your document legally valid abroad under the Hague Convention. This certification is often required for:</p>"
         '<ul class="check-list" role="list">' + "".join(f"<li>{icon('check')}<span>{x}</span></li>" for x in [
             "Powers of Attorney (Poder Notarial)", "Birth and Marriage Certificates", "Business Formation Documents",
             "School Records and Diplomas", "Legal Affidavits"]) + "</ul>"),
        ("02 · Authentication", "Authenticating the origin",
         "<p>An apostille is a certification that authenticates the origin of a public document for use in another country that is a member of the Hague Apostille Convention.</p>"
         "<p style=\"margin-top:14px\">Our team ensures that your document is either notarized and certified by the Secretary of State, or submitted as a certified vital record (no notary needed).</p>"),
        ("03 · Apostille", "The Hague Apostille Convention",
         "<p>The 1961 Hague Apostille Convention streamlines document authentication between member countries. Instead of multiple rounds of government legalization, a single apostille is all foreign authorities need to recognize your document as authentic.</p>"),
        ("04 · International Use", "Ready for use abroad",
         "<p>We provide apostille services for documents going to Hague Convention countries. For documents being sent to non-Hague Convention countries such as Canada, China, Egypt, or the UAE, we also offer full Embassy Legalization Services, which include U.S. Department of State certification and consular legalization.</p>"
         f'<p style="margin-top:22px">{btn("Explore Apostille Services", "/apostille-services/", "ghost")}</p>'),
    ]
    step_html = "".join(
        f'<article class="story__step{" is-active" if i == 0 else ""}" data-story-step="{i}"><span class="doc-no">{k}</span><h3 class="h2">{t}</h3>{b}</article>'
        for i, (k, t, b) in enumerate(steps))
    sig = '<svg viewBox="0 0 120 40" aria-hidden="true"><path d="M4 30 C 14 6, 22 6, 24 24 S 34 36, 42 18 S 56 4, 60 22 S 74 34, 84 16 S 100 10, 116 20"/></svg>'
    return f'''
<section class="section section--ivory" aria-labelledby="{hid}">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("How an apostille works")}<h2 id="{hid}" data-split>From a signed document to international use.</h2></div>
      <p class="lead">When your documents need to be recognised internationally, Midwest Apostille Notary Service delivers secure, reliable apostille and authentication services with efficiency and care.</p>
    </div>
    <div class="story" data-story>
      <div class="story__stage" aria-hidden="true">
        <div class="story__canvas" data-story-canvas>
          <div class="story__backdrop">{img("apostille-certificates", "", "(min-width: 1024px) 45vw, 90vw")}</div>
          <div class="paper" data-paper>
            <div class="paper__head"><span class="doc-no">Public document</span><strong>Certificate</strong></div>
            <span class="paper__line"></span><span class="paper__line paper__line--mid"></span><span class="paper__line"></span>
            <span class="paper__line paper__line--short"></span><span class="paper__line paper__line--mid"></span><span class="paper__line"></span>
            <div class="paper__sig">{sig}<span>Signature</span></div>
            <div class="stamp" data-stamp>Notarized<br>&amp;<br>Certified</div>
          </div>
          <div class="apostille-sheet" data-apostille>
            <p class="apostille-sheet__title">Apostille</p>
            <p class="apostille-sheet__sub">(Convention de La Haye du 5 octobre 1961)</p>
            <ol><li>Country<span></span></li><li>Signed by<span></span></li><li>Acting in the capacity of<span></span></li><li>Bears the seal of<span></span></li><li>Certified<span></span></li></ol>
            <div class="seal">{icon("badge-check")}</div>
          </div>
          <div class="story__globe" data-globe>{icon("globe")}</div>
          <p class="story__stageLabel"><b data-story-label>01</b><span data-story-name>Document</span></p>
        </div>
      </div>
      <div class="story__steps">{step_html}</div>
    </div>
  </div>
</section>'''


def page_hero(title, lead, crumbs, image=None, alt="", eyebrow_t="", tag=None, buttons="", navy=False, chain=None,
              map_bg=False, extra=""):
    bc = '<li><a href="/">Home</a></li>' + "".join(
        f'<li><a href="{h}">{t}</a></li>' if h else f'<li aria-current="page">{t}</li>' for t, h in crumbs)
    chain_html = ""
    if chain:
        chain_html = '<ul class="hero-chain" role="list">' + "".join(f"<li>{icon(i)}{t}</li>" for i, t in chain) + "</ul>"
    media = ""
    if image:
        tag_html = f'<p class="page-hero__tag">{icon(tag[0])}{tag[1]}</p>' if tag else ""
        media = f'<div class="page-hero__media" data-parallax-wrap>{img(image, alt, "(min-width: 1024px) 45vw, 100vw", eager=True, attrs="data-parallax")}{tag_html}</div>'
    mapdiv = '<div class="page-hero__map" data-world-map="deco" aria-hidden="true"></div>' if map_bg else ""
    cls = "page-hero page-hero--navy on-dark" if navy else "page-hero"
    return f'''
<section class="{cls}">
  {mapdiv}
  <div class="container">
    <div class="page-hero__grid"{' style="grid-template-columns:1fr"' if not image else ""}>
      <div class="page-hero__copy" data-hero-copy>
        <nav aria-label="Breadcrumb"><ol class="breadcrumb" role="list">{bc}</ol></nav>
        {eyebrow(eyebrow_t) if eyebrow_t else ""}
        <h1 data-split="hero">{title}</h1>
        <p class="lead">{lead}</p>
        {chain_html}
        {f'<div class="btn-row">{buttons}</div>' if buttons else ""}
        {extra}
      </div>
      {media}
    </div>
  </div>
</section>'''


def feature_list(items, cols=True, dark=False):
    lis = "".join(f'<li><span class="doc-no">{i + 1:02d}</span><span>{x}</span></li>' for i, x in enumerate(items))
    return f'<ul class="feature-list{" feature-list--2" if cols else ""}" role="list" data-stagger>{lis}</ul>'


def check_list(items, cols=False):
    lis = "".join(f"<li>{icon('check')}<span>{x}</span></li>" for x in items)
    return f'<ul class="check-list{" check-list--cols" if cols else ""}" role="list" data-stagger>{lis}</ul>'


def quote_band(quote, text, cta=True, tone="section--white", label="Make an Appointment", href=BOOK):
    c = f'<div class="btn-row" style="justify-content:center;margin-top:28px">{book_btn(label, "", href)}</div>' if cta else ""
    return f'''
<section class="section {tone} quote-band">
  <div class="container">
    {icon("quote")}
    <blockquote data-split><p>{quote}</p></blockquote>
    <p>{text}</p>
    {c}
  </div>
</section>'''


def ready_block(title="Ready When You Are"):
    return f'''
<section class="section section--ivory" aria-labelledby="ready-h">
  <div class="container">
    <div class="two-col">
      <div class="stack-copy">{eyebrow("Pricing & timeline")}<h2 id="ready-h" data-split>{title}</h2>
        <p class="lead">Send us your details and we'll reply with pricing and a realistic timeline — any time, day or night.</p>
        <div class="btn-row">{book_btn("Book an Appointment", "")}</div></div>
      <div class="contact-cards" data-stagger>
        <a class="contact-card" href="{TEL}"><span class="icon-badge">{icon("phone")}</span><span><small>Call</small><strong>{PHONE_FMT}</strong></span></a>
        <a class="contact-card" href="mailto:{EMAIL}"><span class="icon-badge">{icon("mail")}</span><span><small>Email</small><strong>{EMAIL}</strong></span></a>
        <div class="contact-card"><span class="icon-badge">{icon("map-pin")}</span><span><small>Office</small><strong>{ADDRESS_SHORT}</strong></span></div>
      </div>
    </div>
  </div>
</section>'''

"""Internal pages. One primary search intent per page; see docs/seo-route-map.md."""
import os

from components import (APOSTILLE_FAQ_BASE, FBI_STEPS, HOME_FAQ, JOURNEY, SERVICE_INDEX, breadcrumbs, checklist, contact_strip,
                        countries_explorer, cta_final, partner_section, disclaimer, doc_stack, faq_section, fbi_timeline, label,
                        legal_route, page_hero, pricing_note, pull_quote, reviews_section, route_compare, rows,
                        service_index, shead, split)
from countries import LEGALIZATION
from facts import JAIL_PRICES_EN, JAIL_PRICES_ES, KS_STD, MO_STD, PARTNER, PARTNER_LINE, PARTNER_URL
from lib import (YEAR, ADDRESS, APPT, BOOK, NO_ADVICE, NO_ADVICE_ES, PHONE, EMAIL, JAIL_PHONE, JAIL_TEL, MAP_EMBED, MAPS_URL, PHONE, ROOT, SITE, TEL,
                 WHATSAPP, article_schema, btn, call_btn, cta_btn, esc, faq_schema, icon, img, link, page,
                 service_schema)

ES_PAIR = {"en": "/notary-apostille-services/", "es": "/servicios-de-notaria-y-apostilla/"}
JAIL_PAIR = {"en": "/jail-notary-kansas-city/", "es": "/notaria-en-carceles-de-kansas-city/"}
SVC = ("Services", "/services/")


# =========================================================================== About
def about():
    path = "/about-us/"
    crumbs = [("About", path)]
    body = page_hero(
        "About Midwest Apostille &amp; Notary Services",
        "Behind every document is a story: a marriage abroad, a family relocation, a student visa, a legal milestone. "
        "We handle the paperwork with care so the next chapter can start on time.",
        crumbs, image="document-handover", alt="Notary presenting a certificate in a leather folder to a client",
        lab="Kansas City, Missouri", buttons=cta_btn() + call_btn(), plate="Plate 01. A finished certificate")
    body += f'''
<section class="section" aria-labelledby="what-h">
  <div class="container">
    {shead("01", "What we do", "Apostille, legalization, notary and preparation under one roof.", "what-h",
           "We serve clients across the United States and abroad, making sure documents meet the standard required at home and overseas.")}
    {rows([("Apostille for Hague countries", "Including FBI background checks, birth certificates and legal documents."),
           ("Embassy legalization", "For countries that are not part of the Hague Apostille Convention."),
           ("Remote online notarization", "Notarize from anywhere through our secure Missouri-based platform."),
           ("Document preparation", "Powers of attorney, minor travel consent, legal agreements and more."),
           ("Certified translation support", "Spanish, Arabic and French translation for official use."),
           ("International courier options", "Shipping apostilled documents to more than 100 countries."),
           ("Bilingual support", "We speak English, Spanish, Arabic and French.")], cls="rows--2")}
  </div>
</section>'''
    body += pull_quote("We don’t just notarize documents. We notarize life’s defining moments.", "Midwest Apostille &amp; Notary Services")
    body += split("apostille-certificates", "Apostille certificates with gold seals, a magnifier and a fountain pen", f'''
      {shead("02", "How we work", "Handled with precision and care.", "care-h", cls="shead--stack")}
      <p>Whether it is an immigration file, an international move or a new chapter abroad, we check the route first, prepare what is missing, and manage every hand-off until the document is back with you.</p>
      <p>{link("See every service", "/services/")}</p>''', hid="care-h", plate="Plate 02. Certificates and seals")
    body += partner_section("03", tone="section--paper")
    body += reviews_section(num="04") + cta_final()
    return page(path, "About Midwest Apostille & Notary | Kansas City",
                "Midwest Apostille & Notary Services is a Kansas City office for apostille, embassy legalization, notarization and document preparation, in English and Spanish.",
                body, active="about", crumbs=crumbs, og_image="document-handover",
                og_alt="Notary presenting a certificate in a leather folder", keyword="Midwest Apostille & Notary")


# =========================================================================== Services
DOCS_HANDLED = ["Power of attorney (general and specific)", "Minor travel consent forms", "Birth certificates", "Marriage certificates",
                "Death certificates", "Divorce decrees", "FBI background checks", "School transcripts and diplomas",
                "Corporate documents (articles of incorporation, operating agreements)", "Adoption dossiers",
                "Document translation (English, Spanish, Arabic, French)"]


def services():
    path = "/services/"
    crumbs = [SVC]
    body = page_hero("Apostille, Notary and Document Services",
                     "Every service we offer, in one place. Open a service to see what it covers, where we provide it, and how to book.",
                     crumbs, lab="Services", buttons=cta_btn() + call_btn())
    body += service_index("Choose a service.", "all-h", num="01", lab="All services")
    body += f'''
<section class="section section--paper" aria-labelledby="docs-h">
  <div class="container split split--text">
    <div>{shead("02", "Documents", "Documents we handle every week.", "docs-h", "If yours is not listed, ask. We will tell you whether it can be apostilled or legalized and what it needs first.", cls="shead--stack")}
      <p>{link("Document preparation services", "/document-preparation-services/")}</p></div>
    {checklist(DOCS_HANDLED, cols=True)}
  </div>
</section>'''
    body += route_compare(num="03", explorer_href="/apostille-services/#countries") + cta_final()
    item_list = {"@type": "ItemList", "@id": SITE + path + "#services", "name": "Services",
                 "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": t, "url": SITE + h}
                                     for i, (t, h, *_r) in enumerate(SERVICE_INDEX)]}
    return page(path, "Apostille, Notary & Document Services | Kansas City",
                "All our services in one place: apostille, embassy legalization, mobile and online notary, jail notary, FBI apostille and document preparation in Kansas City.",
                body, active="services", crumbs=crumbs, schema=[item_list], keyword="apostille and notary services (overview)")


def redirect_page(old, new, title):
    os.makedirs(os.path.join(ROOT, old.strip("/")), exist_ok=True)
    with open(os.path.join(ROOT, old.strip("/"), "index.html"), "w") as f:
        f.write(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{title}</title>'
                f'<meta name="robots" content="noindex"><link rel="canonical" href="{SITE}{new}">'
                f'<meta http-equiv="refresh" content="0; url={new}"></head><body><p><a href="{new}">{title}</a></p></body></html>\n')
    return f"{old} (301 on the server, meta refresh fallback)"


def service_redirect():
    return redirect_page("/service/", "/services/", "Services")


def jail_es_redirect():
    return redirect_page("/notaria-en-carceles-de-kansas-cit/", "/notaria-en-carceles-de-kansas-city/", "Notaría en cárceles de Kansas City")


def not_found():
    body = page_hero("Page not found",
                     "The page you are looking for may have moved. These links cover most of what clients look for.",
                     [("Page not found", "/404.html")], buttons=btn("Back to home", "/") + btn("Contact us", "/contact-us/", "secondary"))
    body += service_index("Popular services", "nf-h", num="", lab="Services")
    return page("/404.html", "Page not found | Midwest Apostille & Notary", "The page you are looking for may have moved.",
                body, index=False, out=os.path.join(ROOT, "404.html"))


# =========================================================================== Apostille
APOSTILLE_FAQ = [HOME_FAQ[0], HOME_FAQ[1], HOME_FAQ[2]] + APOSTILLE_FAQ_BASE + [
    ("Where can I get an apostille near me?", 'At our office at 8101 E. Bannister Rd., Kansas City, MO, or by mail from anywhere. See <a href="/missouri-apostille-services/">Missouri</a> and <a href="/kansas-apostille-services/">Kansas apostille services</a> and the cities we serve.'),
    ("Do you offer embassy legalization in Kansas City?", "Yes. For countries outside the Hague Convention we handle document authentication and embassy legalization, including the U.S. Department of State step."),
]


def apostille_hubs():
    from pages_countries import COUNTRIES, country_path
    from pages_docs import DOCS
    from pages_local import CITIES, city_path
    docs = "".join(f'<a href="{d["path"]}"><b>{d["short"]} apostille</b><span>What you need first, price, turnaround</span></a>' for d in DOCS)
    docs += '<a href="/apostille-for-dual-citizenship/"><b>Dual citizenship</b><span>Italian, Irish and Polish files</span></a>'
    ctry = "".join(f'<a href="{country_path(c)}"><b>{c.get("title_name", c["name"])}</b><span>{"Apostille" if c["route"] == "apostille" else "Embassy legalization"}{", " + c["tr"] + " translation" if c["tr"] else ""}</span></a>' for c in COUNTRIES)
    cities = "".join(f'<a href="{city_path(c)}"><b>{c["city"]}</b><span>{c["county"]}</span></a>' for c in CITIES)
    return f'''
<section class="section" id="by-document" aria-labelledby="bydoc-h">
  <div class="container">{shead("07", "By document", "Apostille by document.", "bydoc-h")}<div class="linkgrid">{docs}</div></div>
</section>
<section class="section section--paper" id="by-country" aria-labelledby="byc-h">
  <div class="container">{shead("08", "By destination", "Apostille and legalization by country.", "byc-h")}<div class="linkgrid linkgrid--4">{ctry}</div></div>
</section>
<section class="section" id="by-state" aria-labelledby="bys-h">
  <div class="container">{shead("09", "Missouri and Kansas", "Statewide, by mail, from one Kansas City office.", "bys-h", "Apostille and remote online notary are available statewide. Mobile notary and jail notary are Kansas City metro only.")}
    <div class="linkgrid"><a href="/missouri-apostille-services/"><b>Missouri apostille services</b><span>Missouri Secretary of State, Jefferson City</span></a><a href="/kansas-apostille-services/"><b>Kansas apostille services</b><span>Kansas Secretary of State, Topeka</span></a></div>
    <div class="linkgrid linkgrid--4" style="margin-top:0.75rem">{cities}</div></div>
</section>'''


def apostille():
    path = "/apostille-services/"
    crumbs = [SVC, ("Apostille Services", path)]
    body = page_hero(
        "Apostille Services in Kansas City",
        f"Apostille and authentication for documents going abroad. Missouri apostilles from {MO_STD} and Kansas from {KS_STD}, with same-day service for Missouri and Kansas documents, and apostilles for documents issued in every other state.",
        crumbs, image="apostille-documents", alt="Certificates with wax seals, a notary stamp and a fountain pen",
        lab="Apostille &amp; authentication", plate="Plate 01. Sealed certificates",
        buttons=cta_btn() + call_btn())
    body += split("apostille-certificates", "Apostille certificate with a gold seal next to passports", f'''
      {shead("01", "What an apostille does", "One certificate that makes a document valid abroad.", "what-h", cls="shead--stack")}
      <p>An apostille authenticates the origin of a public document for use in countries that belong to the 1961 Hague Apostille Convention. It replaces the older chain of government legalizations with a single certificate.</p>
      <p class="label">Commonly required for</p>
      {checklist(["Powers of attorney (poder notarial)", "Birth and marriage certificates", "Business formation documents", "School records and diplomas", "Legal affidavits", "FBI background checks"], cols=True)}''', hid="what-h")
    body += f'''
<section class="section section--paper" aria-labelledby="price-h">
  <div class="container">
    {shead("02", "Pricing and turnaround", "Published prices, no surprises.", "price-h", "Same-day service applies to Missouri and Kansas documents only.")}
    {pricing_note()}
    <p class="fine">Timelines for federal documents depend on the U.S. Department of State. {link("Full price list", "/pricing/")}</p>
  </div>
</section>
<section class="section" aria-labelledby="how-h">
  <div class="container">
    {shead("03", "How it works", "Four steps, handled for you.", "how-h")}
    {rows([("Send or bring the document", "Mail-in, drop-off, or pickup for local clients, and in-office or mobile appointments."),
           ("We check the route", "We confirm whether it needs a certified copy, a notarization or a custodian statement first."),
           ("Certification and apostille", "By the Missouri Secretary of State, the issuing state, or the U.S. Department of State for federal documents."),
           ("Returned and shipped", "Priority shipping with tracking, and FedEx or DHL international return shipping on request.")], cls="rows--4")}
  </div>
</section>'''
    body += route_compare(num="04", sid="embassy-legalization")
    body += f'''
<section class="section" aria-labelledby="why-h">
  <div class="container">
    {shead("05", "Why clients choose us", "Built for deadlines.", "why-h")}
    {rows([("Same-day processing", "For Missouri and Kansas documents that are ready to be certified, so you do not wait days or weeks."),
           ("Mobile apostille help", "Our mobile notaries meet clients at offices, homes or public locations across the Kansas City area."),
           ("In-office appointments", "Secure document handling and personal help at our Kansas City office."),
           ("English and Spanish", "Our bilingual team explains every step in your preferred language."),
           ("Full-service handling", "Preparation, notarization, submission, tracking and final delivery, managed for you.")], cls="rows--2")}
  </div>
</section>'''
    body += countries_explorer(num="06", heading="Check your destination country.", tone="section--bone")
    body += apostille_hubs()
    body += faq_section(APOSTILLE_FAQ, num="10", heading="Apostille questions.")
    body += cta_final()
    return page(path, "Apostille Services in Kansas City, MO | Midwest",
                f"Apostille in Kansas City: Missouri from {MO_STD}, Kansas from {KS_STD}, same day for Missouri and Kansas documents. Birth certificates, diplomas, POAs and more.",
                body, active="services", crumbs=crumbs, og_image="apostille-documents",
                og_alt="Certificates with wax seals and a notary stamp",
                schema=[service_schema(path, "Apostille Services in Kansas City", "Apostille and authentication services for documents used abroad, with same-day service for Missouri and Kansas documents.", "Apostille services"),
                        faq_schema(path, APOSTILLE_FAQ)],
                preload=("apostille-documents", "(min-width: 1024px) 42vw, 100vw"), keyword="apostille services Kansas City")


# =========================================================================== Notary
NOTARY_INCLUDES = [
    ("General notary work", "Acknowledgments, jurats, oaths and affirmations."),
    ("Powers of attorney", "Including medical authorizations and legal declarations."),
    ("Loan signing agent", "Real estate closing notary and loan signings, at our office or at your location."),
    ("I-9 verification", "Employment eligibility verification for remote hires, as the employer’s authorized representative."),
    ("Vehicle title notary", "Vehicle titles, bills of sale and related forms."),
    ("Immigration documents", "Notarization of immigration forms and supporting letters."),
    ("Minor travel consent", "Travel consent forms and guardianship documents."),
    ("Copies and affidavits", "Notarized copies, affidavits and sworn statements."),
    ("Bilingual notary", "Spanish, Arabic and French speaking support."),
    ("Remote online notary", "Sign by video from anywhere in the world."),
]
NOTARY_FAQ = [
    ("Can I notarize documents online?", HOME_FAQ[4][1]),
    ("Do you offer mobile notary services?", HOME_FAQ[6][1]),
    ("Do you have evening and weekend appointments?", "Yes. We offer daytime, evening and weekend availability for notary appointments."),
    ("Do you notarize immigration documents?", "Yes, including immigration forms, affidavits and notarized copies."),
    ("Can you notarize a document for someone in jail?", 'Yes. See our <a href="/jail-notary-kansas-city/">jail notary service</a> for Kansas City area facilities and pricing.'),
    ("Do you offer 24 hour or emergency notary service?", f"For urgent documents, call or text {PHONE}. We offer same-day notary appointments, evenings, weekends and holidays, and tell you the earliest time we can reach you."),
    ("Is there a notary near me in Kansas City?", "Our notary public office is at 8101 E. Bannister Rd., Kansas City, MO 64134, and our mobile notaries travel across the Kansas City metro in Missouri and Kansas."),
    ("Do you notarize at hospitals and nursing homes?", 'Yes, in the Kansas City area. See <a href="/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/">urgent notary: jail, hospital and after hours</a>.'),
]


def notary():
    path = "/notary-services/"
    crumbs = [SVC, ("Notary Services", path)]
    body = page_hero(
        "Notary Services in Kansas City",
        "Notary public in Kansas City, MO for Missouri and Kansas: in our office on E. Bannister Rd., at your home, office, hospital or nursing home, or online through remote online notarization.",
        crumbs, image="notary-stamp", alt="Notary pressing a stamp onto a signed document", lab="Notary public",
        plate="Plate 01. The stamp", buttons=cta_btn() + call_btn())
    body += f'''
<section class="section" aria-labelledby="inc-h">
  <div class="container">
    {shead("01", "What we notarize", "Signatures that hold up.", "inc-h", "Notarized properly and in line with Missouri and Kansas law, for legal, financial and immigration use.")}
    {rows(NOTARY_INCLUDES, cls="rows--4")}
  </div>
</section>'''
    body += split("notary-signing", "Notary signing a document beside a notary stamp", f'''
      {shead("02", "Mobile notary", "We come to you.", "mobile-h", cls="shead--stack")}
      <p>Our mobile notaries meet clients at offices, homes or convenient public locations anywhere in the Kansas City area.</p>
      {checklist(["Same-day notary, plus evening and weekend availability", "Real estate closings and loan signings", "Hospital notary and nursing home notary visits", "Jail visits in the Kansas City metro"])}
      <p>{link("Urgent notary help: jail, hospital, after hours", "/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/")}</p>''', hid="mobile-h", sid="mobile-notary")
    body += split("remote-online-notary", "Remote online notarization session on a laptop", f'''
      {shead("03", "Remote online notary", "Notarize from anywhere.", "ron-h", cls="shead--stack")}
      <p>Remote online notarization (RON) lets you sign by video in front of our Missouri notary through a secure digital platform.</p>
      {checklist(["No travel time or delays", "For U.S. citizens and foreign nationals alike", "Pairs with our apostille service for documents going abroad"])}
      <p>{link("Apostille services", "/apostille-services/")}</p>''', rev=True, tone="section--paper", hid="ron-h", sid="remote-online-notary")
    body += pull_quote("Every notarized signature secures a moment of truth, trust or transition.", "Midwest Apostille &amp; Notary Services")
    body += faq_section(NOTARY_FAQ, num="04", heading="Notary questions.")
    body += cta_final()
    return page(path, "Notary Services in Kansas City, MO | Midwest",
                "In-office, mobile and remote online notary services in Kansas City. Evening and weekend appointments, bilingual support, and RON for clients anywhere.",
                body, active="services", crumbs=crumbs, og_image="notary-stamp", og_alt="Notary pressing a stamp onto a document",
                schema=[service_schema(path, "Notary Services in Kansas City", "In-office, mobile and remote online notary services in Kansas City, Missouri and Kansas.", "Notary public services"),
                        faq_schema(path, NOTARY_FAQ)],
                preload=("notary-stamp", "(min-width: 1024px) 42vw, 100vw"), keyword="notary services Kansas City")


# =========================================================================== Document preparation
DOCPREP_ITEMS = [
    ("Power of attorney", "General, durable and medical, formatted for notarization or apostille."),
    ("Affidavits and declarations", "Sworn statements prepared for official submission."),
    ("Certified translations", "Translation plus formatting for international submissions."),
    ("Real estate authorization letters", "Ready to sign in front of a notary."),
    ("FBI apostille support documents", "Paperwork that goes with your FBI background check."),
    ("Minor child travel consent", "Essential for domestic flights and international travel."),
    ("Name change and divorce consent", "Statements and consent forms."),
    ("U.S. immigration forms support", "I-130, I-864, DS-260 and similar forms."),
    ("Embassy legalization packages", "Assembled in the order the embassy expects."),
    ("Custom templates", "For apostille or notarization."),
]


def docprep():
    path = "/document-preparation-services/"
    crumbs = [SVC, ("Document Preparation", path)]
    body = page_hero(
        "Document Preparation Services in Kansas City",
        "Legally sound, professionally formatted documents for personal, business, immigration and international use, ready for notarization, apostille or embassy legalization.",
        crumbs, image="document-handover", alt="Professional handing over a prepared certificate in a leather folder",
        lab="Document preparation", plate="Plate 01. Prepared and signed", buttons=cta_btn() + call_btn())
    body += doc_stack(DOCPREP_ITEMS, "dp-h", "01", "What we prepare.",
                      "Choose a document to see what we do with it.",
                      "We do not give immigration or legal advice. We help you complete and format documents for official submission, then provide the notary and apostille services that follow.")
    body += split("document-preparation", "Client reviewing prepared documents across a desk", f'''
      {shead("02", "Who we help", "Individuals, families and the professionals who work for them.", "who-h", cls="shead--stack")}
      <p>Our clients include individuals, law firms, immigration attorneys, healthcare professionals, educators and families who need accurate, fast and confidential document drafting.</p>
      {link("Apostille services for prepared documents", "/apostille-services/")}''', hid="who-h")
    body += f'''
<section class="section section--paper" aria-labelledby="dwhy-h">
  <div class="container">
    {shead("03", "Why prepare with us", "One office from draft to apostille.", "dwhy-h")}
    {rows([("All in one place", "Prepare, notarize and apostille your documents with one provider."),
           ("Four languages", "English, Spanish, Arabic and French support."),
           ("Nationwide", "We prepare documents for clients across the U.S. and abroad."),
           ("Formatted to be accepted", "Prepared for U.S. agencies, foreign consulates and international institutions.")], cls="rows--4")}
  </div>
</section>'''
    body += pull_quote("Paperwork shouldn’t hold up your progress. We help turn your documents into action.", "Midwest Apostille &amp; Notary Services")
    body += cta_final()
    return page(path, "Document Preparation Services | Kansas City, MO",
                "Power of attorney, affidavits, travel consent forms, immigration form support and embassy packages, formatted and ready for notarization or apostille.",
                body, active="services", crumbs=crumbs, og_image="document-handover", og_alt="Prepared certificate in a leather folder",
                schema=[service_schema(path, "Document Preparation Services", "Document preparation and formatting for notarization, apostille and embassy legalization.", "Document preparation")],
                preload=("document-handover", "(min-width: 1024px) 42vw, 100vw"), keyword="document preparation services Kansas City")


# =========================================================================== Contact
def contact():
    path = "/contact-us/"
    crumbs = [("Contact", path)]
    body = page_hero("Contact Midwest Apostille &amp; Notary",
                     "Tell us about your document and where it is going. We reply with the route, pricing and a realistic timeline.",
                     crumbs, lab="Contact", buttons=cta_btn() + call_btn())
    body += f'''
<section class="section section--paper" aria-labelledby="form-h">
  <div class="container contact">
    <div class="contact__form">
      {shead("01", "Send a message", "Write to us.", "form-h", cls="shead--stack")}
      <form class="form" action="/contact-handler.php" method="post" novalidate data-contact-form>
        <div class="form__row">
          <div class="field"><label for="f-first">First name <span class="req">(required)</span></label><input id="f-first" name="first_name" autocomplete="given-name" required aria-describedby="e-first"><p class="field__error" id="e-first"></p></div>
          <div class="field"><label for="f-last">Last name</label><input id="f-last" name="last_name" autocomplete="family-name"></div>
        </div>
        <div class="form__row">
          <div class="field"><label for="f-email">Email <span class="req">(required)</span></label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email"><p class="field__error" id="e-email"></p></div>
          <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
        </div>
        <div class="field"><label for="f-msg">What is the document, and where is it going? <span class="req">(required)</span></label><textarea id="f-msg" name="message" rows="5" required aria-describedby="e-msg"></textarea><p class="field__error" id="e-msg"></p></div>
        <div class="hp" aria-hidden="true"><label for="f-company">Company</label><input id="f-company" name="company" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="form_source" value="Contact page">
        <p class="form__status" role="status" tabindex="-1" data-form-status></p>
        <div class="btn-row"><button class="btn btn--primary" type="submit"><span class="btn__label">Send message</span><span class="btn__icon">{icon("send")}</span></button></div>
        {disclaimer()}
      </form>
    </div>
    <div class="contact__side">
      <dl class="contact-list">
        <div><dt>Call or text</dt><dd><a href="{TEL}">{PHONE}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a href="{WHATSAPP}" target="_blank" rel="noopener">Message us on WhatsApp</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
        <div><dt>Office</dt><dd><a href="{MAPS_URL}" target="_blank" rel="noopener">{ADDRESS}</a></dd></div>
        <div><dt>Appointments</dt><dd><a href="{BOOK}" target="_blank" rel="noopener">Book online</a></dd></div>
      </dl>
      <div class="map-embed"><iframe src="{MAP_EMBED}" title="Map of 8101 E. Bannister Rd., Kansas City, MO 64134" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    </div>
  </div>
</section>'''
    body += cta_final()
    return page(path, "Contact Midwest Apostille & Notary | Kansas City",
                f"Call {PHONE}, email or visit us at 8101 E. Bannister Rd., Kansas City, MO 64134. Tell us about your document and we will confirm the route.",
                body, active="contact", crumbs=crumbs, keyword="contact apostille notary Kansas City",
                schema=[{"@type": "ContactPage", "@id": SITE + path + "#contact", "url": SITE + path, "about": {"@id": SITE + "/#business"}}])


# =========================================================================== FBI apostille (Hague)
FBI_REASONS = [
    ("Residency visas", "Non-lucrative, retirement and passive income visas require a clean record from your home country."),
    ("Work permits", "Employer-sponsored and digital nomad visas commonly require an apostilled background check."),
    ("Student visas", "Long-term study and university enrollment often require authentication."),
    ("Marriage and family", "Marriage abroad and family reunification visas often require apostilled records."),
    ("Adoption", "International adoption in Hague member countries requires background check authentication."),
]
FBI_FAQ = [
    ("Can I use a state apostille on my FBI report?", "No. An FBI background check is a federal document, so it must be apostilled by the U.S. Department of State, not a state Secretary of State. State-level apostilles on federal documents are commonly rejected abroad."),
    ("Do Hague countries still need embassy legalization?", "No. One apostille from the U.S. Department of State is enough in any Hague member country. No embassy visit or consulate stamp."),
    ("Can I apostille a digital (PDF) FBI report?", "Yes. We accept the official FBI eDO electronic PDF issued by the FBI or an approved channeler, so you can start remotely from anywhere in the country."),
    ("How recent does my FBI background check need to be?", "Most countries expect a report issued within 90 days, but this varies. Confirm the window with the consulate or authority handling your application."),
    ("Do I need a certified translation?", "Many non-English-speaking Hague countries require one. We coordinate translation in parallel so both documents arrive together."),
    ("How long does the whole process take?", "An FBI report through electronic fingerprinting takes a few days. Apostille processing varies with State Department volume. We confirm current timing on your quote."),
]


def fbi_apostille():
    path = "/fbi-apostille-for-hague-countries/"
    crumbs = [("Guides", "/guides/"), ("FBI Apostille", path)]
    body = page_hero(
        "FBI Apostille for Hague Countries",
        "Your FBI Identity History Summary apostilled by the U.S. Department of State for use in any Hague member country, from fingerprinting to the finished document.",
        crumbs, image="apostille-certificates", alt="FBI background check apostille certificates with gold seals",
        lab="FBI background check apostille", plate="Plate 01. Federal apostille", buttons=cta_btn() + call_btn(),
        extra='<dl class="facts facts--inline"><div><dt>Authenticated by</dt><dd>U.S. Department of State</dd></div><div><dt>Embassy step</dt><dd>Not required</dd></div><div><dt>Report format</dt><dd>Paper or FBI eDO PDF</dd></div></dl>')
    body += f'''
<section class="section" aria-labelledby="fed-h">
  <div class="container split split--text">
    <div>{shead("01", "Why it matters", "A federal document needs a federal apostille.", "fed-h", cls="shead--stack")}</div>
    <div>
      <p>The 1961 Hague Apostille Convention lets one apostille replace rounds of government legalization. For an FBI background check, that apostille must come from the U.S. Department of State Office of Authentications.</p>
      <p class="callout"><strong>Important.</strong> Spain, Germany, Australia and other Hague members reject a state-level apostille on a federal document.</p>
      <p>{link("Going to a non-Hague country? See FBI legalization", "/fbi-attestation-legalization/")}</p>
    </div>
  </div>
</section>'''
    body += fbi_timeline("How your FBI apostille works.", "fbi-h", num="02")
    body += f'''
<section class="section section--paper" aria-labelledby="reasons-h">
  <div class="container">
    {shead("03", "Common reasons", "Why people apostille an FBI check.", "reasons-h", "Most Hague member countries require a recent, apostilled background check from your country of citizenship for long-stay applications.")}
    {rows(FBI_REASONS, cls="rows--2")}
  </div>
</section>
<section class="section" aria-labelledby="exp-h">
  <div class="container">
    {shead("04", "Timeline", "What to expect.", "exp-h")}
    {rows([("FBI report", "A few days when fingerprints are submitted electronically. We can handle this from anywhere in the country."),
           ("Apostille processing", "Varies with State Department volume. Expedited handling is available; ask for current turnaround."),
           ("Certified translation", "Optional, coordinated in parallel so it arrives with the apostille.")], cls="rows--3")}
  </div>
</section>'''
    body += countries_explorer(num="05", heading="Hague member countries.", tone="section--bone",
                               lead="One U.S. Department of State apostille is enough for every country marked as a Hague member.")
    body += faq_section(FBI_FAQ, num="06", heading="FBI apostille questions.")
    body += f'''
<section class="section section--paper" aria-labelledby="one-h">
  <div class="container">
    {shead("07", "One provider", "Fingerprint to apostille.", "one-h")}
    {rows([("We originate the FBI check", "We take fingerprints and obtain the report, then apostille it. Fewer hand-offs."),
           ("Start by email", "We accept the official FBI eDO digital PDF from any state."),
           ("Translation in-house", "English, Spanish, Arabic and French, delivered as one package."),
           ("Prepared right the first time", "A DS-4194 completed incorrectly gets rejected. We review everything before submission.")], cls="rows--4")}
  </div>
</section>'''
    body += contact_strip() + cta_final()
    return page(path, "FBI Apostille Services for Hague Countries | Midwest",
                "Apostille for your FBI Identity History Summary from the U.S. Department of State. We can take fingerprints, obtain the report and review the DS-4194.",
                body, active="resources", crumbs=crumbs, og_image="apostille-certificates",
                schema=[service_schema(path, "FBI Apostille for Hague Countries", "FBI background check apostille from the U.S. Department of State for Hague member countries.", "FBI background check apostille",
                                       area=[{"@type": "Country", "name": "United States"}]),
                        faq_schema(path, FBI_FAQ)],
                preload=("apostille-certificates", "(min-width: 1024px) 42vw, 100vw"), keyword="FBI apostille")


# =========================================================================== FBI legalization (non-Hague)
LEGAL_REASONS = [
    ("Employment and work visas", "Employer sponsorship and most work permits require an attested background check."),
    ("Residency and long-stay visas", "Long-term residency, retirement and golden visa programs commonly require attestation."),
    ("Family sponsorship", "Sponsoring a spouse or dependents often requires an attested police clearance."),
    ("Professional licensing", "Healthcare, law and engineering credentials typically require attestation."),
    ("Business registration", "Company formation, investment visas and free-zone setup may require it."),
]
LEGAL_FAQ = [
    ("What is embassy legalization or attestation?", "The process used for countries outside the Hague Apostille Convention. Your FBI background check is authenticated by the U.S. Department of State, then legalized by the destination country's embassy in Washington, DC."),
    ("Why can't I use an apostille for these countries?", "An apostille is only valid in Hague member countries. Non-Hague countries such as the UAE, Qatar, Kuwait and Egypt do not recognize it, and an apostilled document will be rejected."),
    ("Do I need a certified translation?", "Almost always. Countries with Arabic as an official language require a certified Arabic translation, and Malaysia and Vietnam require translations in their languages. We prepare it and legalize it together with your report."),
    ("What is the MOFA step?", "After U.S. legalization, most non-Hague countries require a final attestation by their Ministry of Foreign Affairs once the document arrives. We prepare your documents so they are ready for it."),
    ("How recent does my FBI check need to be?", "Most non-Hague countries expect a report issued within 3 to 6 months, but requirements vary. Confirm the window with your employer or the authority."),
    ("Can I use a digital (PDF) FBI report?", "Yes. We accept the official FBI eDO electronic PDF, so you can start remotely from anywhere in the country."),
]


def fbi_attestation():
    path = "/fbi-attestation-legalization/"
    crumbs = [("Guides", "/guides/"), ("FBI Legalization", path)]
    body = page_hero(
        "FBI Background Check Legalization for Non-Hague Countries",
        "When your destination is not a Hague member, your FBI background check goes through a two-stage embassy legalization, also called attestation. We handle the entire U.S. side, from fingerprint to embassy.",
        crumbs, image="international-route", alt="Certificates and passports in front of an illuminated world map",
        lab="Embassy legalization &middot; attestation", plate="Plate 01. Two stages, one package", buttons=cta_btn() + call_btn(),
        extra='<dl class="facts facts--inline"><div><dt>Stage 1</dt><dd>U.S. Department of State</dd></div><div><dt>Stage 2</dt><dd>Destination embassy, Washington, DC</dd></div><div><dt>In country</dt><dd>Ministry of Foreign Affairs</dd></div></dl>')
    body += f'''
<section class="section" aria-labelledby="cmp-h">
  <div class="container">
    {shead("01", "Legalization, not apostille", "Not every country accepts an apostille.", "cmp-h", "Legalization takes longer and costs more than a single apostille. We sequence both stages for you.")}
    <div class="compare">
      <div class="compare__col"><p class="label">Hague country</p><h3>Single apostille</h3><p>One certificate from the U.S. Department of State. No embassy step, faster and lower cost.</p>{link("FBI apostille for Hague countries", "/fbi-apostille-for-hague-countries/")}</div>
      <div class="compare__col compare__col--hl"><p class="label">Non-Hague country</p><h3>Two-stage legalization</h3><p>U.S. Department of State authentication plus embassy legalization, then a final Ministry of Foreign Affairs attestation in the country.</p></div>
    </div>
    <p class="callout"><strong>Important.</strong> Submitting an apostilled document to a non-Hague country results in rejection. The UAE, Qatar, Kuwait and Egypt require full embassy legalization.</p>
  </div>
</section>
<section class="section section--paper" aria-labelledby="lreasons-h">
  <div class="container">
    {shead("02", "Common reasons", "Why an FBI check gets attested.", "lreasons-h", "Non-Hague countries require a legalized background check for most long-stay, employment and residency applications.")}
    {rows(LEGAL_REASONS, cls="rows--2")}
  </div>
</section>'''
    body += legal_route("How FBI legalization works.", "legal-h", num="03")
    guide = []
    for i, (name, _, embassy, translation, final, uses) in enumerate(LEGALIZATION):
        tr = f"<div><dt>Translation</dt><dd>{translation}</dd></div>" if translation else ""
        guide.append(f'''
      <details class="acc" data-acc><summary><span class="acc__q">{name}</span><span class="acc__icon" aria-hidden="true"></span></summary>
        <div class="acc__body"><div class="acc__inner"><dl class="facts facts--tight"><div><dt>Embassy</dt><dd>{embassy}</dd></div>{tr}<div><dt>Final step</dt><dd>{final}</dd></div><div><dt>Common uses</dt><dd>{", ".join(uses)}</dd></div></dl></div></div>
      </details>''')
    body += f'''
<section class="section" aria-labelledby="guide-h">
  <div class="container faq">
    <div class="faq__head">{shead("04", "Country by country", "FBI background check legalization by country.", "guide-h", "Each non-Hague country has its own embassy and requirements.", cls="shead--stack")}</div>
    <div class="faq__list">{"".join(guide)}</div>
  </div>
</section>'''
    body += faq_section(LEGAL_FAQ, hid="lfaq-h", num="05", heading="Legalization questions.", tone="section--paper")
    body += f'''
<section class="section" aria-labelledby="lone-h">
  <div class="container">
    {shead("06", "One provider", "Fingerprint to embassy.", "lone-h")}
    {rows([("We originate the FBI check", "Fingerprints, report and both legalization stages in one engagement."),
           ("Start by email", "We accept the official FBI eDO digital PDF from any state."),
           ("Certified translation in-house", "Arabic, Spanish, French and more, legalized together with your report."),
           ("Prepared right the first time", "We review every detail before each stage to avoid rejections.")], cls="rows--4")}
  </div>
</section>'''
    body += contact_strip() + cta_final()
    return page(path, "FBI Background Check Legalization | Midwest",
                "Embassy legalization (attestation) for FBI background checks going to the UAE, Qatar, Egypt and other non-Hague countries. We handle the full U.S. side.",
                body, active="resources", crumbs=crumbs, og_image="international-route",
                og_alt="Certificates and passports in front of a world map",
                schema=[service_schema(path, "FBI Background Check Legalization", "Embassy legalization of FBI background checks for countries outside the Hague Apostille Convention.", "FBI background check legalization",
                                       area=[{"@type": "Country", "name": "United States"}]),
                        faq_schema(path, LEGAL_FAQ)],
                preload=("international-route", "(min-width: 1024px) 42vw, 100vw"), keyword="FBI background check legalization")


# =========================================================================== Bilingual (EN / ES)
def bilingual(lang):
    es = lang == "es"
    path = ES_PAIR[lang]
    T = dict(
        h1="Servicios de Notaría y Apostilla en Kansas City" if es else "Bilingual Notary and Apostille Services",
        lead=("Servicios de notaría y apostilla en inglés y español, en Kansas City y a nivel nacional. Le explicamos cada paso en su idioma."
              if es else "Notary and apostille help in English and Spanish, in Kansas City and nationwide. We explain every step in your language."),
        lab="Español &middot; English" if es else "English &middot; Español",
        n_h="Notaría en Kansas City, Missouri y Kansas City, Kansas" if es else "Notary in Kansas City, Missouri and Kansas City, Kansas",
        n_p=("Ofrecemos notarizaciones confiables para:" if es else "We provide trusted notarization for:"),
        n_l=["Documentos legales", "Formularios de inmigración", "Poderes notariales", "Contratos y formularios escolares", "Servicios notariales móviles y en línea"]
        if es else ["Legal documents", "Immigration forms", "Power of attorney", "Contracts and school forms", "Mobile and online notary services"],
        a_h="Apostilla para documentos de cualquier estado" if es else "Apostille for documents from every state",
        a_p="¿Documentos para uso internacional? Nos encargamos de todo el proceso para:" if es else "Need international document authentication? We handle the full process for:",
        a_l=["Actas de nacimiento", "Certificados de matrimonio", "Documentos escolares", "Poderes notariales", "Documentos comerciales", "Entrega por mensajería disponible"]
        if es else ["Birth certificates", "Marriage records", "School transcripts", "Business documents", "Power of attorney", "Courier delivery available"],
        m_h="Permiso de viaje para menores" if es else "Minor travel consent form",
        m_p=("¿Su hijo o hija viaja solo o con otro familiar? Notarizamos cartas de permiso de viaje para vuelos nacionales y viajes internacionales, para evitar problemas en aeropuertos o aduanas."
             if es else "Is your child traveling alone or with someone other than a parent? We notarize minor travel consent forms for domestic flights and international travel, to prevent issues at airports or borders."),
        o_h="Otros servicios frecuentes" if es else "Other popular services",
        o_l=[("Declaraciones juradas", ""), ("Traducción y notarización", ""), ("Poder notarial (duradero, médico, limitado)", ""), ("Certificados escolares para estudiantes internacionales", ""), ("Formularios de inmigración", "")]
        if es else [("Affidavits and sworn statements", ""), ("Translation and notarization", ""), ("Power of attorney (durable, medical, limited)", ""), ("School certificates for international students", ""), ("Immigration form notarization", "")],
        crumb="Servicios en español" if es else "Bilingual Services",
    )
    crumbs = [(T["crumb"], path)]
    book = cta_btn(label="Iniciar revisión de documentos" if es else "Start Your Document Review")
    body = page_hero(T["h1"], T["lead"], crumbs, image="notary-agreement",
                     alt="Profesional de notaría y cliente dándose la mano sobre documentos firmados" if es else "Notary and client shaking hands over signed documents",
                     lab=T["lab"], buttons=book + call_btn(label=f"Llamar {PHONE}" if es else None), lang=lang, plate="Lámina 01. Acuerdo firmado" if es else "Plate 01. A signed agreement")
    body += split("notary-consultation", "Revisión de documentos con un cliente en nuestra oficina" if es else "Notary reviewing documents with a client", f'''
      {shead("01", "Notaría" if es else "Notary", T["n_h"], "bn-h", cls="shead--stack")}
      <p>{T["n_p"]}</p>{checklist(T["n_l"])}
      <p>{link("Servicios notariales (inglés)" if es else "Notary services", "/notary-services/")}</p>''', hid="bn-h")
    body += split("apostille-certificates", "Certificados con apostilla y sellos dorados" if es else "Apostille certificates with gold seals", f'''
      {shead("02", "Apostilla" if es else "Apostille", T["a_h"], "ba-h", cls="shead--stack")}
      <p>{T["a_p"]}</p>{checklist(T["a_l"])}
      <p>{link("Servicios de apostilla (inglés)" if es else "Apostille services", "/apostille-services/")}</p>''', rev=True, tone="section--paper", hid="ba-h")
    body += split("minor-travel", "Niña viajando con su maleta en un aeropuerto" if es else "Child traveling with a suitcase through an airport", f'''
      {shead("03", "Viajes" if es else "Travel", T["m_h"], "bm-h", cls="shead--stack")}
      <p>{T["m_p"]}</p>''', hid="bm-h")
    body += f'''
<section class="section section--paper" aria-labelledby="bo-h">
  <div class="container">
    {shead("04", "Notaría" if es else "Notary", T["o_h"], "bo-h")}
    {rows(T["o_l"], cls="rows--names")}
  </div>
</section>'''
    from pages_countries import COUNTRIES, country_path
    es_c = [c for c in COUNTRIES if c.get("es")]
    links = "".join(f'<a href="{country_path(c, "es" if es else "en")}"{"" if es else ""}><b>{"Apostilla para " + c["es"]["name"] if es else "Apostille for " + c["name"]}</b><span>{"Apostilla y traducción al español" if es else "Apostille and Spanish translation"}</span></a>' for c in es_c)
    body += f'''
<section class="section" aria-labelledby="bc-h">
  <div class="container">{shead("05", "Por país" if es else "By country", "Apostilla por país." if es else "Apostille by country.", "bc-h")}<div class="linkgrid">{links}</div>
  <p class="fine">{"Precios: apostilla de Missouri $90 ($180 el mismo día), Kansas $110 ($250 el mismo día)." if es else "Prices: Missouri apostille $90 ($180 same day), Kansas $110 ($250 same day)."} {NO_ADVICE_ES if es else NO_ADVICE}</p></div>
</section>'''
    body += cta_final(heading="Obtenga claridad antes de enviar sus documentos." if es else "Get clarity before you send your documents.",
                      text=("Cuéntenos qué documento tiene y a dónde va. Confirmamos la ruta, el precio y un plazo realista antes de enviar nada."
                            if es else "Tell us what the document is and where it is going. We confirm the route, the price and a realistic timeline before anything is submitted."),
                      lang=lang)
    if es:
        return page(path, "Servicios de Notaría y Apostilla en Kansas City | Midwest",
                    "Notaría y apostilla en español en Kansas City: documentos legales, formularios de inmigración, poderes notariales y permisos de viaje para menores.",
                    body, active="resources", lang="es", crumbs=crumbs, alt=ES_PAIR, og_image="notary-agreement",
                    og_alt="Profesional de notaría y cliente dándose la mano", keyword="notaría y apostilla Kansas City",
                    schema=[service_schema(path, "Servicios de Notaría y Apostilla", "Servicios bilingües de notaría y apostilla en Kansas City.", "Notary and apostille services")])
    return page(path, "Bilingual Notary & Apostille Services | Kansas City",
                "Notary and apostille help in English and Spanish in Kansas City: legal documents, immigration forms, powers of attorney and minor travel consent forms.",
                body, active="resources", crumbs=crumbs, alt=ES_PAIR, og_image="notary-agreement",
                og_alt="Notary and client shaking hands", keyword="bilingual notary and apostille Kansas City",
                schema=[service_schema(path, "Bilingual Notary and Apostille Services", "Bilingual English and Spanish notary and apostille services in Kansas City.", "Notary and apostille services")])


# =========================================================================== Jail notary (EN / ES)
def jail(lang):
    es = lang == "es"
    path = JAIL_PAIR[lang]
    if es:
        T = dict(
            h1="Servicios de Notaría en Cárceles de Kansas City",
            lab="Notarizaciones el mismo día para reclusos en los condados de Jackson y Wyandotte",
            lead="Servicio notarial profesional, rápido y discreto, directamente en la cárcel. Atendemos Kansas y Missouri, con disponibilidad en noches, fines de semana y días festivos.",
            call="Llamar o enviar mensaje",
            about_h="Vamos a la cárcel, no hace falta trasladar al recluso.",
            about_p="Ofrecemos notaría móvil en cárceles para familias, abogados y seres queridos de personas encarceladas en Kansas City.",
            about_l=["Visitamos directamente la cárcel.", "Notarizamos poderes notariales, declaraciones juradas, declaraciones, autorizaciones de reclusos y más.",
                     "Disponibles por las noches, fines de semana y días festivos.", "Con la confianza de las familias de Kansas City por un servicio profesional y discreto."],
            who_h="A quién ayudamos", jails_h="Cárceles que atendemos",
            who_l=["Familiares que necesitan poderes legales en una emergencia.", "Abogados que requieren firmas rápidas de reclusos.",
                   "Seres queridos que necesitan documentos importantes firmados por una persona encarcelada."],
            jails=["Centro de Detención del Condado de Jackson", "Cárcel del Condado de Wyandotte", "Centro de Detención para Adultos del Condado de Johnson",
                   "Cárcel del Condado de Clay", "Otros centros del área de Kansas City (a solicitud)"],
            why_h="Por qué elegirnos",
            why=[("Respuesta rápida", "Citas el mismo día y por la tarde."), ("Expertos locales", "Conocemos los sistemas carcelarios de Kansas City."),
                 ("Servicio móvil", "Vamos directamente a la cárcel."), ("Discreto y confiable", "Atención privada y profesional."),
                 ("Precios claros", "Tarifas planas y transparentes.")],
            price_h="Precios", prices=JAIL_PRICES_ES, how_h="Cómo funciona",
            how=["Contáctenos con el nombre del recluso, la ubicación y el tipo de documento.", "Confirme el precio y la hora de la cita.",
                 "Pague el depósito por Cash App o Zelle.", "Visitamos la cárcel y realizamos la notarización.",
                 "Le devolvemos o enviamos los documentos según sea necesario."],
            faq_h="Preguntas frecuentes",
            faq=[("¿Qué necesito para programar una notaría en la cárcel?", "El nombre completo del recluso, el centro de detención, el tipo de documento y la hora de la cita."),
                 ("¿Puede firmar el recluso sin identificación?", "Sí, la mayoría de las cárceles aceptan el brazalete del recluso o una identificación interna. Llame para confirmar."),
                 ("¿Necesito estar presente?", "No siempre. Podemos coordinar directamente con el personal de la cárcel según el documento.")],
            crumb="Notaría en cárceles", switch=("English", "en"), book="Programar una cita",
        )
    else:
        T = dict(
            h1="Jail Notary Services in Kansas City",
            lab="Same-day notarizations for inmates in Jackson and Wyandotte counties",
            lead="Professional, fast and discreet notary service at the jail. Serving Kansas and Missouri, with evenings, weekends and holidays available.",
            call="Call or text",
            about_h="We go to the jail. No inmate transport needed.",
            about_p="Fully mobile jail notary services for families, attorneys and loved ones of incarcerated people in Kansas City.",
            about_l=["We visit the jail directly.", "We notarize powers of attorney, affidavits, declarations, inmate authorizations and more.",
                     "Available evenings, weekends and holidays.", "Trusted by Kansas City families for professional, discreet service."],
            who_h="Who we help", jails_h="Jails we serve",
            who_l=["Family members who need legal powers in an emergency.", "Attorneys who need fast inmate signatures.",
                   "Loved ones who need important documents signed by an incarcerated person."],
            jails=["Jackson County Detention Center", "Wyandotte County Jail", "Johnson County Adult Detention", "Clay County Jail", "Other Kansas City area facilities (on request)"],
            why_h="Why choose us",
            why=[("Fast response", "Same-day and evening appointments."), ("Local experience", "We know Kansas City jail systems well."),
                 ("Mobile service", "We go directly to the jail."), ("Discreet and reliable", "Private, professional handling."),
                 ("Clear pricing", "Transparent, flat-rate pricing.")],
            price_h="Pricing", prices=JAIL_PRICES_EN, how_h="How it works",
            how=["Contact us with the inmate’s name, location and document type.", "Confirm pricing and time.", "Pay the deposit by Cash App or Zelle.",
                 "We visit the jail and complete the notarization.", "Documents are returned or forwarded as needed."],
            faq_h="Jail notary questions",
            faq=[("What do I need to book a jail notary?", "The inmate’s full name, the facility, the document type and the appointment time."),
                 ("Can inmates sign without ID?", "Yes, most jails accept inmate wristbands or internal ID. Call to confirm."),
                 ("Do I need to be present?", "Not always. We coordinate with jail staff when appropriate.")],
            crumb="Jail Notary", switch=("Español", "es"), book="Book an appointment",
        )
    crumbs = [("Servicios" if es else "Services", "/services/"), (T["crumb"], path)]
    buttons = (cta_btn(label="Iniciar revisión de documentos" if es else "Start Your Document Review")
               + btn(f'{T["call"]}: {JAIL_PHONE}', JAIL_TEL, "secondary", "phone"))
    body = page_hero(T["h1"], T["lead"], crumbs, image="jail-notary",
                     alt="Mazo y sello notarial sobre un escritorio" if es else "Gavel, wax seal and notary stamp on a desk",
                     lab=T["lab"], buttons=buttons, lang=lang, plate="Lámina 01" if es else "Plate 01. Seal and stamp")
    body += split("notary-gavel", "Mazo sobre un escritorio durante una firma" if es else "Gavel on a desk during a signing", f'''
      {shead("01", "Nosotros" if es else "About", T["about_h"], "ja-h", cls="shead--stack")}
      <p>{T["about_p"]}</p>{checklist(T["about_l"])}''', hid="ja-h")
    body += f'''
<section class="section section--paper" aria-labelledby="jw-h">
  <div class="container split split--text">
    <div>{shead("02", T["who_h"], T["who_h"] + ".", "jw-h", cls="shead--stack")}{checklist(T["who_l"])}</div>
    <div><h3 class="h3">{T["jails_h"]}</h3>{rows([(j, "") for j in T["jails"]], cls="rows--names")}</div>
  </div>
</section>
<section class="section" aria-labelledby="jp-h">
  <div class="container split split--text">
    <div>{shead("03", T["price_h"], T["price_h"] + ".", "jp-h", cls="shead--stack")}
      <table class="price-table"><caption class="sr-only">{T["price_h"]}</caption><tbody>{"".join(f'<tr><th scope="row">{a}</th><td><b>{b}</b>{f"<small>{c}</small>" if c else ""}</td></tr>' for a, b, c in T["prices"])}</tbody></table>
    </div>
    <div>{shead("", T["how_h"], T["how_h"] + ".", "jh-h", cls="shead--stack")}{rows([(s, "") for s in T["how"]])}</div>
  </div>
</section>
<section class="section section--paper" aria-labelledby="jy-h">
  <div class="container">{shead("04", T["why_h"], T["why_h"] + ".", "jy-h")}{rows(T["why"], cls="rows--names-desc")}</div>
</section>'''
    body += faq_section(T["faq"], num="05", heading=T["faq_h"] + ".", lab="FAQ", hid="jfaq-h")
    body += cta_final(heading="Obtenga claridad antes de enviar sus documentos." if es else "Get clarity before you send your documents.",
                      text=("Llámenos con el nombre del recluso, el centro y el tipo de documento. Confirmamos el precio y la hora."
                            if es else "Call with the inmate’s name, the facility and the document type. We confirm the price and time."),
                      lang=lang)
    area = [{"@type": "AdministrativeArea", "name": n} for n in ["Jackson County, MO", "Wyandotte County, KS", "Johnson County, KS", "Clay County, MO"]]
    if es:
        return page(path, "Notaría en Cárceles de Kansas City | Midwest",
                    "Notaría móvil para reclusos en los condados de Jackson, Wyandotte, Johnson y Clay. Visitas el mismo día, noches y fines de semana, con tarifas planas.",
                    body, active="resources", lang="es", crumbs=crumbs, alt=JAIL_PAIR, og_image="jail-notary", og_alt="Mazo y sello notarial",
                    schema=[service_schema(path, "Notaría en Cárceles de Kansas City", T["lead"], "Jail notary services", area), faq_schema(path, T["faq"])],
                    keyword="notaría en cárceles Kansas City")
    return page(path, "Jail Notary Services in Kansas City | Midwest",
                "Mobile jail notary for inmates at Jackson, Wyandotte, Johnson and Clay County facilities. Same-day, evening and weekend visits with flat-rate pricing.",
                body, active="services", crumbs=crumbs, alt=JAIL_PAIR, og_image="jail-notary", og_alt="Gavel, wax seal and notary stamp",
                schema=[service_schema(path, "Jail Notary Services in Kansas City", T["lead"], "Jail notary services", area), faq_schema(path, T["faq"])],
                preload=("jail-notary", "(min-width: 1024px) 42vw, 100vw"), keyword="jail notary Kansas City")


# =========================================================================== Guides hub
POSTS = [
    ("/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/", "apostille-documents", "Apostille guide",
     f"How to Get an Apostille in Missouri ({YEAR}): Birth Certificates, Custodian Documents &amp; More",
     "Which documents need a notary, what a custodian certification is, and which countries ask for an apostille."),
    ("/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/", "jail-notary", "Notary guide",
     f"Urgent Notary Services in Kansas City ({YEAR}): Jail, Hospital &amp; After-Hours Help",
     "Jail and hospital notarizations, after-hours appointments, and the facilities we travel to."),
]


def guides_hub():
    path = "/guides/"
    crumbs = [("Guides", path)]
    body = page_hero("Apostille and Notary Guides",
                     "Plain-language guides on apostilles, FBI background checks, embassy legalization and urgent notary help in Kansas City.",
                     crumbs, lab="Resources")
    posts = "".join(f'''
      <li class="guide guide--row"><a href="{h}"><span class="guide__media">{img(im, "", "(min-width: 900px) 30vw, 100vw")}</span>
        <span class="guide__body"><span class="label">{k}</span><span class="guide__title">{t}</span><span class="guide__desc">{d}</span></span></a></li>''' for h, im, k, t, d in POSTS)
    body += f'''
<section class="section" aria-labelledby="g-h">
  <div class="container">{shead("01", "Guides", "Articles.", "g-h")}<ul class="guides guides--rows" role="list">{posts}</ul></div>
</section>
<section class="section section--paper" id="fbi" aria-labelledby="fbi-h">
  <div class="container">
    {shead("02", "FBI resources", "FBI background checks for use abroad.", "fbi-h", "Which route applies depends on whether the destination is a Hague Convention member.")}
    <div class="compare">
      <div class="compare__col"><p class="label">Hague countries</p><h3>FBI apostille</h3><p>One apostille from the U.S. Department of State. Fingerprinting, report and DS-4194 review available.</p>{link("FBI apostille for Hague countries", "/fbi-apostille-for-hague-countries/")}</div>
      <div class="compare__col"><p class="label">Non-Hague countries</p><h3>FBI legalization</h3><p>U.S. Department of State authentication, then embassy legalization and a final ministry step.</p>{link("FBI background check legalization", "/fbi-attestation-legalization/")}</div>
    </div>
  </div>
</section>
<section class="section" aria-labelledby="lang-h">
  <div class="container">
    {shead("03", "Languages", "English and Spanish pages.", "lang-h")}
    <div class="compare">
      <div class="compare__col"><p class="label">English</p><h3>Bilingual notary and apostille</h3>{link("Bilingual notary and apostille services", "/notary-apostille-services/")}{link("Jail notary in Kansas City", "/jail-notary-kansas-city/")}</div>
      <div class="compare__col" lang="es"><p class="label">Español</p><h3>Notaría y apostilla</h3>{link("Servicios de notaría y apostilla", "/servicios-de-notaria-y-apostilla/", extra=' hreflang="es"')}{link("Notaría en cárceles de Kansas City", "/notaria-en-carceles-de-kansas-city/", extra=' hreflang="es"')}</div>
    </div>
  </div>
</section>'''
    body += cta_final()
    items = {"@type": "ItemList", "@id": SITE + path + "#guides",
             "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": SITE + h} for i, (h, *_r) in enumerate(POSTS)]}
    return page(path, "Apostille & Notary Guides | Midwest Apostille & Notary",
                "Plain-language guides on apostilles, FBI background checks, embassy legalization and urgent notary help in Kansas City.",
                body, active="resources", crumbs=crumbs, schema=[items], keyword="apostille guides (informational)")


# =========================================================================== Articles
def article(path, title, h1, desc, crumb, image, image_alt, sections, related, keyword):
    crumbs = [("Guides", "/guides/"), (crumb, path)]
    toc = "".join(f'<li><a href="#{sid}">{h}</a></li>' for sid, h, _ in sections)
    content = "".join(f'<h2 id="{sid}">{h}</h2>{b}' for sid, h, b in sections)
    rel = "".join(f"<li>{link(t, h)}</li>" for t, h in related)
    body = '<div class="reading-progress" data-reading aria-hidden="true"></div>'
    body += page_hero(h1, desc, crumbs, image=image, alt=image_alt, lab="Guide")
    body += f'''
<section class="section section--paper">
  <div class="container article">
    <aside class="article__aside">
      <nav class="toc" aria-labelledby="toc-h" data-toc><h2 id="toc-h" class="label">On this page</h2><ol role="list">{toc}</ol></nav>
      <div class="related"><h2 class="label">Related services</h2><ul role="list">{rel}</ul></div>
    </aside>
    <article class="prose" data-article>{content}</article>
  </div>
</section>'''
    body += cta_final()
    return page(path, title, desc, body, active="resources", crumbs=crumbs, og_image=image, og_alt=image_alt,
                og_type="article", schema=[article_schema(path, h1, desc, image)], keyword=keyword)


def ul(items, cols=False):
    return ('<ul class="cols">' if cols else "<ul>") + "".join(f"<li>{x}</li>" for x in items) + "</ul>"


def blog_urgent():
    sections = [
        ("inmates", "Mobile notary for inmates at Jackson County Jail and other facilities",
         "<p>Need a document notarized for someone in custody at Jackson County Jail or a nearby detention center? We provide secure, legally compliant jail notary services in the Kansas City metro, working with public defenders, families and legal professionals on:</p>"
         + ul(["Power of attorney for inmates", "Custody affidavits and declarations", "Legal affidavits and sworn statements", "Release of property or inmate authorization forms"])
         + "<h3>Facilities we serve</h3>"
         + ul(["Jackson County Detention Center (CJC)", "Clay County Jail", "Platte County Jail", "Cass County Detention Center", "Wyandotte County Adult Detention Center", "Kansas City Municipal Correctional Institution"])
         + '<p>We coordinate directly with jail administration on access, ID verification and security clearance. Pricing and booking details are on our <a href="/jail-notary-kansas-city/">jail notary page</a>.</p>'),
        ("hospitals", "Emergency hospital notary in the Kansas City area",
         "<p>In a medical crisis, families often need documents notarized at the bedside. We offer hospital notary visits with professionalism and compassion.</p><h3>We notarize</h3>"
         + ul(["Durable and medical power of attorney", "Advance directives and living wills", "Health care proxy forms", "Consent for treatment or surgery", "Court-ordered or immigration forms"])
         + "<h3>Hospitals and care centers we travel to</h3>"
         + ul(["Truman Medical Center (University Health)", "Saint Luke’s Hospital (Plaza and North)", "North Kansas City Hospital", "Research Medical Center", "Menorah Medical Center", "KU Medical Center", "AdventHealth Shawnee Mission", "Children’s Mercy Hospital", "Liberty Hospital", "Rehabilitation and hospice centers"], cols=True)),
        ("after-hours", "After-hours mobile notary in Kansas City",
         "<p>Can’t find a notary after 6 PM or on a weekend? Our mobile notary service covers evenings, weekends and holidays throughout Kansas City and surrounding cities. Text us to confirm availability.</p><h3>Common after-hours requests</h3>"
         + ul(["Travel consent forms", "Time-sensitive legal documents", "Real estate and loan closings", "Power of attorney and affidavits", "Notarizations for jail and hospital visits"])
         + '<p>See all <a href="/notary-services/">notary services in Kansas City</a>, including remote online notarization.</p>'),
        ("apostille", "Need an apostille or custodian certification?",
         '<p>We also offer apostille services and custodian of record certifications for documents used abroad. Read <a href="/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/">how to get an apostille in Kansas City</a>.</p>'),
        ("why", "Why clients call us",
         ul(["Same-day mobile and emergency appointments", "Remote online notary options", "Missouri commissioned notaries",
             f'Fingerprinting through our partner, <a href="{PARTNER_URL}" target="_blank" rel="noopener">{PARTNER}</a>, at the same location'])),
        ("schedule", "Schedule a mobile notary appointment",
         f'<p>Call or text <a href="{TEL}">{PHONE}</a>, or <a href="{BOOK}" target="_blank" rel="noopener">book online</a>.</p>'
         "<p>We serve Jackson, Clay, Platte, Cass and Wyandotte counties and the wider Kansas City metro.</p><h3>Cities we serve</h3>"
         "<p>Kansas City, Independence, Raytown, Lee’s Summit, Blue Springs, Grandview, North Kansas City, Gladstone, Liberty, Belton, Raymore, Grain Valley, Oak Grove, Sugar Creek, Riverside, Parkville, Kearney, Harrisonville, Leawood, Overland Park, Shawnee, Merriam, Olathe, Mission, Roeland Park.</p>"),
    ]
    return article("/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/",
                   f"Urgent Notary in Kansas City ({YEAR}): Jail & Hospital",
                   f"Urgent Notary Services in Kansas City ({YEAR}): Jail, Hospital &amp; After-Hours Help",
                   "How to get a document notarized fast in Kansas City: jail and hospital visits, after-hours appointments, and the facilities we travel to.",
                   "Urgent Notary Services", "jail-notary", "Gavel, wax seal and notary stamp on a desk", sections,
                   [("Jail notary in Kansas City", "/jail-notary-kansas-city/"), ("Notary services", "/notary-services/"), ("Remote online notary", "/notary-services/#remote-online-notary")],
                   "urgent notary Kansas City")


def blog_apostille():
    sections = [
        ("kansas-city", "Apostille services in Kansas City",
         '<p>Sending U.S. documents overseas for immigration, study, marriage or dual citizenship? This guide explains where to get an apostille in Missouri and what each document needs first. To order, see <a href="/missouri-apostille-services/">Missouri apostille services</a> or the <a href="/pricing/">price list</a>.</p>'),
        ("document-types", "Common apostille document types",
         ul(["Birth certificates (certified copies from Missouri Vital Records)", "Marriage certificates", "Divorce decrees", "Death certificates", "Custodian notarized documents", "Power of attorney", "School transcripts and diplomas", 'FBI background checks (federal apostille, see <a href="/fbi-apostille-for-hague-countries/">FBI apostille</a>)', "Corporate records, articles of incorporation, IRS letters", "Single status affidavit, affidavit of law"], cols=True)
         + "<p>Your document is either notarized and certified by the Secretary of State, or submitted as a certified vital record, which needs no notary.</p>"),
        ("countries", "Countries that commonly require an apostille",
         "<p>We prepare apostille-ready documents for clients with family, legal or business ties to Hague Convention countries, including El Salvador, Nicaragua, Mexico, Morocco, Colombia, Ecuador, Brazil, Spain, Italy, France, the Philippines, India, Peru, Chile and Ukraine.</p>"
         "<p>We also support countries outside the convention that require authentication and embassy legalization, such as the United Arab Emirates, Qatar, Egypt, Lebanon and Kuwait.</p>"
         '<p><a href="/apostille-services/#countries">Check a country in our explorer</a>.</p>'),
        ("custodian", "What is a custodian document certification?",
         "<p>A custodian of record document is a notarized declaration that a copy is a true and accurate reproduction of the original. It is often used for:</p>"
         + ul(["Diplomas", "Business licenses", "Medical records", "Legal documents you don’t want to submit in original form"])
         + "<p>Missouri requires the custodian (the holder of the document) to sign a sworn statement that is notarized. That document can then be apostilled through the Secretary of State. We help you draft and notarize the statement, then process it for apostille.</p>"),
        ("faqs", "Apostille questions",
         '<h3>How do I get a birth certificate apostille in Missouri?</h3><p>We can request your certified birth certificate and submit it to the Missouri Secretary of State for apostille. Turnaround depends on the service level; see <a href="/apostille-services/#price-h">apostille pricing and turnaround</a>.</p>'
         "<h3>Do I need a notary for an apostille?</h3><p>Only for documents like powers of attorney or affidavits. Certified vital records such as birth and marriage certificates are submitted as originals.</p>"
         "<h3>Can I get an apostille for a document in Spanish?</h3><p>Yes, as long as it is notarized in English. We also assist with translated documents for many countries.</p>"
         '<h3>Where can I get an apostille near me in Kansas City?</h3><p>At our office at 8101 E. Bannister Rd., serving Kansas City, Jackson County, Independence, North Kansas City and all of Missouri. See <a href="/apostille-services/">apostille services in Kansas City</a>.</p>'),
        ("process", "We handle the process",
         ul(["Mail-in, drop-off or pickup for local clients", "FedEx and DHL international return shipping on request", "Same-day apostille processing for urgent Missouri and Kansas documents"])),
        ("contact", "Get started",
         f'<p>Call or text <a href="{TEL}">{PHONE}</a>, or <a href="/contact-us/">send us a message</a> with the document and destination.</p>'),
    ]
    return article("/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/",
                   f"How to Get an Apostille in Missouri ({YEAR}) | Midwest",
                   f"How to Get an Apostille in Missouri ({YEAR}): Birth Certificates, Custodian Documents &amp; More",
                   "A practical guide to apostilles in Kansas City: which documents need a notary, custodian certifications, and which countries require an apostille.",
                   "How to Get an Apostille", "apostille-documents", "Certificates with wax seals and a notary stamp", sections,
                   [("Missouri apostille services", "/missouri-apostille-services/"), ("Apostille services in Kansas City", "/apostille-services/"), ("Birth certificate apostille", "/birth-certificate-apostille-missouri-kansas/"), ("Pricing", "/pricing/")],
                   "how to get an apostille Kansas City")


def build_all():
    return [about(), services(), service_redirect(), apostille(), notary(), docprep(), contact(), fbi_apostille(),
            fbi_attestation(), bilingual("en"), bilingual("es"), jail("en"), jail("es"), guides_hub(), blog_urgent(),
            blog_apostille(), not_found(), jail_es_redirect()]

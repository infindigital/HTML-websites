"""Pages added from the client change list (Website_Updates_for_Developer.pdf, October 2026):
pricing, FBI fingerprinting, certified translation, business accounts, FAQ, online order, dual citizenship."""
from components import (APOSTILLE_FAQ_BASE, HOME_FAQ, checklist, cta_final, faq_section, label, partner_section,
                        price_notes, price_table, rows, shead, split)
from countries import HAGUE
from facts import (APOSTILLE_STD_TIME, CUTOFFS, FBI_APOSTILLE, FBI_PACKAGE, FBI_PRINTS, GUARANTEE, JAIL_PRICES_EN,
                   KS_SAME, KS_STD, MO_SAME, MO_STD, OTHER_STD, PARTNER, PARTNER_LINE, PARTNER_URL, PAYMENT_DEPOSIT_URL,
                   PAYMENT_FULL_URL, POLICY, PRICE_NOTE, PRICES, SHIP_US, TRANSLATION_PAGE, TRANSLATION_PAGE_3PLUS,
                   TX_EXP, TX_EXP_TIME, TX_STD)
from lib import (NO_ADVICE, PHONE, SITE, TEL, btn, call_btn, cta_btn, esc, faq_schema, icon, link, page,
                 service_schema)
from components import page_hero

SVC = ("Services", "/services/")


def order_btn(kind="primary", label="Order Now"):
    return btn(label, "/order/", kind, "arrow-right")


def sec(num, lab, heading, hid, inner, lead="", tone="", sid=None):
    idattr = f' id="{sid}"' if sid else ""
    return f'''
<section class="section {tone}"{idattr} aria-labelledby="{hid}">
  <div class="container">
    {shead(num, lab, heading, hid, lead)}
    {inner}
  </div>
</section>'''


def offer_catalog(path, name, rows_):
    offers = []
    for svc, std, _ in rows_:
        if std.startswith("$"):
            price = std.split()[0].replace("$", "")
            offers.append({"@type": "Offer", "name": svc, "price": price, "priceCurrency": "USD"})
    return {"@type": "OfferCatalog", "@id": SITE + path + "#offers", "name": name, "itemListElement": offers}


def translation_cost(pages):
    return pages * (TRANSLATION_PAGE_3PLUS if pages >= 3 else TRANSLATION_PAGE)


# =========================================================================== Pricing
def pricing():
    path = "/pricing/"
    crumbs = [("Pricing", path)]
    body = page_hero("Apostille, Notary and Translation Prices",
                     f"Every price in one place. Missouri apostilles from {MO_STD}, Kansas from {KS_STD}, FBI fingerprint and apostille package {FBI_PACKAGE}, certified translation from ${TRANSLATION_PAGE} per page.",
                     crumbs, lab="Pricing", buttons=order_btn() + call_btn())
    body += sec("01", "Price list", "Standard and same-day prices.", "plist-h",
                price_table() + price_notes(),
                "Same-day service applies to Missouri and Kansas documents only. Texas has an expedited option; other states are quoted on request.")
    body += f'''
<section class="section section--paper" aria-labelledby="same-h">
  <div class="container split split--text">
    <div>{shead("02", "Same-day apostille", "Same day for Missouri and Kansas documents.", "same-h", cls="shead--stack")}</div>
    <div class="prose-block">
      <p>{CUTOFFS}</p>
      <p>Documents issued in any other state are not offered same-day: Texas documents can be expedited in {TX_EXP_TIME} ({TX_EXP}), and expedited service for other states is quoted on request.</p>
      <p><strong>Same-day guarantee.</strong> {GUARANTEE}</p>
      <p>Standard processing for Missouri and Kansas documents takes {APOSTILLE_STD_TIME}.</p>
    </div>
  </div>
</section>'''
    tr_rows = [(f"{n} page{'s' if n > 1 else ''}", f"${translation_cost(n)}", None) for n in (1, 2, 3, 5, 10)]
    body += sec("03", "Certified translation", f"${TRANSLATION_PAGE} per page, ${TRANSLATION_PAGE_3PLUS} from three pages.", "trp-h",
                price_table(rows=tr_rows, caption="Certified translation examples")
                + f'<p class="fine">Documents of three pages or more are ${TRANSLATION_PAGE_3PLUS} per page for every page. {link("Certified translation services", "/certified-translation-services/")}</p>',
                "Examples of the total for one document.")
    jail_rows = [(a, b, c or None) for a, b, c in JAIL_PRICES_EN]
    body += sec("04", "Jail notary", "Jail notary pricing.", "jailp-h",
                price_table(rows=jail_rows, caption="Jail notary prices")
                + f'<p class="fine">{link("Jail notary in Kansas City", "/jail-notary-kansas-city/")}</p>',
                "Flat rates for visits to Kansas City area facilities.", tone="section--paper")
    body += f'''
<section class="section" aria-labelledby="pinc-h">
  <div class="container split split--text">
    <div>{shead("05", "What is included", "What the price covers.", "pinc-h", cls="shead--stack")}</div>
    <div class="prose-block">
      <p>{PRICE_NOTE} Prices are per document. Return shipping is added at checkout: {SHIP_US} flat for tracked FedEx within the U.S., with overnight available for an extra fee. International shipping by FedEx or DHL is quoted by destination.</p>
      <p>Embassy legalization for countries outside the Hague Convention is quoted per country and document, because each embassy sets its own fees.</p>
      <p class="fine">{POLICY}</p>
      <div class="btn-row">{order_btn()}</div>
    </div>
  </div>
</section>'''
    body += cta_final()
    return page(path, "Apostille & Notary Prices | Midwest Apostille & Notary",
                f"Apostille prices: Missouri {MO_STD} ({MO_SAME} same day), Kansas {KS_STD} ({KS_SAME} same day), other states {OTHER_STD}. FBI package {FBI_PACKAGE}. Translation from ${TRANSLATION_PAGE}.",
                body, active="pricing", crumbs=crumbs, keyword="apostille prices Missouri Kansas",
                schema=[offer_catalog(path, "Apostille, notary and translation prices", PRICES)])


# =========================================================================== FBI fingerprinting
FBI_FP_FAQ = [
    ("Where do I get fingerprinted?", f"At our office at 8101 E. Bannister Rd., Kansas City. {PARTNER_LINE}"),
    ("Can I use a state apostille on my FBI report?", "No. An FBI background check is a federal document, so it must be apostilled by the U.S. Department of State. State apostilles on FBI reports are rejected abroad."),
    ("I already have my FBI report. Can I just order the apostille?", f"Yes. The FBI background check apostille is {FBI_APOSTILLE} on its own. We accept the paper report or the official FBI electronic PDF."),
    ("How recent does the FBI report need to be?", "Most countries expect a report issued within 90 days, and some non-Hague countries allow three to six months. Confirm the window with the authority handling your application."),
    ("My destination is the UAE, Qatar or Egypt. Is an apostille enough?", 'No. Those countries are not Hague members and need embassy legalization. See <a href="/fbi-attestation-legalization/">FBI background check legalization</a>.'),
    ("Do I need a certified translation?", 'Many non-English-speaking countries require one. We translate FBI reports from $45 per page. See <a href="/certified-translation-services/">certified translation</a>.'),
]


def fbi_fingerprinting():
    path = "/fbi-fingerprinting-apostille-kansas-city/"
    crumbs = [SVC, ("FBI Fingerprinting &amp; Apostille", path)]
    body = page_hero(
        "FBI Fingerprinting and Apostille in Kansas City",
        "Get fingerprinted in Kansas City, receive your FBI background check, and have it apostilled by the U.S. Department of State, all through one office.",
        crumbs, image="apostille-certificates", alt="Apostilled documents with gold seals on a desk",
        lab="FBI fingerprinting Kansas City", plate="Plate 01. Federal apostille", buttons=cta_btn() + call_btn(),
        extra=f'<p class="price-hero"><b>{FBI_PACKAGE}</b><span>Fingerprints, FBI background check and U.S. Department of State apostille, as one package.</span></p>')
    body += sec("01", "Package price", "One package, or each part on its own.", "fbp-h",
                price_table(rows=[r for r in PRICES if r[0].startswith("FBI")], caption="FBI fingerprinting and apostille prices")
                + '<ul class="pnotes" role="list">'
                + f'<li>{icon("check")}<span>The package saves you the cost of booking fingerprinting and the apostille separately.</span></li>'
                + f'<li>{icon("check")}<span>U.S. return shipping is {SHIP_US} flat by tracked FedEx. International shipping is quoted by destination.</span></li></ul>',
                "Prices per person.")
    steps = [
        ("Fingerprints", "Fingerprints are taken at our Kansas City office through our partner, Midwest Identity Services, including the FD-258 card if your application asks for one."),
        ("FBI submission", "Your fingerprints are submitted electronically to the FBI for your Identity History Summary, the FBI background check."),
        ("Your report", "The FBI issues the report, usually within a few days of an electronic submission. We check it against your DS-4194 request form."),
        ("Apostille", "We submit the report to the U.S. Department of State Office of Authentications for the federal apostille."),
        ("Tracked return", "The apostilled report ships back to you by tracked FedEx, or with a certified translation when your destination needs one."),
    ]
    body += sec("02", "How it works", "Five steps, from fingerprints to apostille.", "fbsteps-h", rows(steps, cls="rows--2"), tone="section--paper")
    body += sec("03", "Turnaround", "Realistic timing.", "fbtime-h", rows([
        ("Fingerprinting", "Done in one visit to our office."),
        ("FBI report", "A few days for an electronic submission. Paper submissions mailed to the FBI take much longer."),
        ("U.S. Department of State apostille", "Depends on the department’s current volume and is the longest step. We give you the current estimate when you order."),
        ("Return shipping", f"Tracked FedEx within the U.S. ({SHIP_US}), with overnight available for an extra fee."),
    ], cls="rows--4"), "The FBI and the U.S. Department of State set their own processing times. We tell you the current estimate before you start, not a promise we cannot keep.")
    body += partner_section(num="04", tone="section--bone")
    body += f'''
<section class="section" aria-labelledby="nonh-h">
  <div class="container split split--text">
    <div>{shead("05", "Non-Hague countries", "Going to the UAE, Qatar or Egypt?", "nonh-h", cls="shead--stack")}</div>
    <div class="prose-block">
      <p>An apostille is only accepted by Hague Convention members. The United Arab Emirates, Qatar, Egypt and other non-Hague countries need embassy legalization instead: U.S. Department of State authentication, then the destination embassy in Washington, DC.</p>
      <p>{link("FBI background check legalization", "/fbi-attestation-legalization/")}</p>
      <p>{link("FBI apostille for Hague countries: full guide", "/fbi-apostille-for-hague-countries/")}</p>
    </div>
  </div>
</section>'''
    body += faq_section(FBI_FP_FAQ, num="06", heading="FBI fingerprinting questions.", tone="section--paper")
    body += cta_final()
    return page(path, "FBI Fingerprinting & Apostille in Kansas City | Midwest",
                f"FBI fingerprinting in Kansas City ({FBI_PRINTS}), FBI background check apostille ({FBI_APOSTILLE}), or both as one {FBI_PACKAGE} package, returned by tracked FedEx.",
                body, active="services", crumbs=crumbs, og_image="apostille-certificates",
                schema=[service_schema(path, "FBI Fingerprinting and Apostille", "FBI fingerprinting in Kansas City and FBI background check apostille through the U.S. Department of State.", "FBI fingerprinting and apostille"),
                        faq_schema(path, FBI_FP_FAQ)],
                preload=("apostille-certificates", "(min-width: 1024px) 42vw, 100vw"), keyword="FBI fingerprinting Kansas City")


# =========================================================================== Certified translation
TRANSLATION_FAQ = [
    ("Is your translation accepted by USCIS?", "USCIS requires a complete English translation of any foreign-language document, with the translator’s signed certification that the translation is complete and accurate and that they are competent to translate. Our certified translations include that certification."),
    ("Do you translate before or after the apostille?", "It depends on the destination country. Some want the translation apostilled together with the document, others want the document apostilled first and translated afterwards, and some only accept translators in their own country. We confirm the order with you before we start."),
    ("Which languages do you translate?", "Spanish, Arabic and French, and several other languages on request. Ask us about your language pair."),
    ("How is the price calculated?", f"${TRANSLATION_PAGE} per page. Documents of three pages or more are ${TRANSLATION_PAGE_3PLUS} per page for every page: 2 pages are ${translation_cost(2)}, 3 pages are ${translation_cost(3)}, and 10 pages are ${translation_cost(10)}."),
]


def translation():
    path = "/certified-translation-services/"
    crumbs = [SVC, ("Certified Translation", path)]
    body = page_hero(
        "Certified Translation Services in Kansas City",
        f"Certified translation of birth, marriage and divorce records, diplomas and FBI reports, in Spanish, Arabic, French and other languages. ${TRANSLATION_PAGE} per page, ${TRANSLATION_PAGE_3PLUS} per page from three pages.",
        crumbs, image="notary-consultation", alt="Documents being reviewed across a desk",
        lab="Certified translation", plate="Plate 01. Reviewed line by line", buttons=cta_btn() + call_btn())
    body += sec("01", "What we translate", "Certified translation for the documents clients bring us most.", "trwhat-h",
                checklist(["Birth certificates", "Marriage certificates", "Divorce decrees", "Diplomas and transcripts",
                           "FBI background checks", "Other civil and school records on request"], cols=True)
                + f'<p class="fine">{NO_ADVICE}</p>')
    calc = f'''
    <div class="estimate" data-tcalc data-rate="{TRANSLATION_PAGE}" data-rate3="{TRANSLATION_PAGE_3PLUS}">
      <label class="estimate__label" for="tcalc-pages">Pages in your document</label>
      <input id="tcalc-pages" type="number" min="1" max="200" value="2" inputmode="numeric" data-tcalc-in>
      <output for="tcalc-pages" aria-live="polite" data-tcalc-out>${translation_cost(2)}</output>
      <small data-tcalc-note>${TRANSLATION_PAGE} per page</small>
    </div>'''
    tr_rows = [(f"{n} page{'s' if n > 1 else ''}", f"${translation_cost(n)}", None) for n in (1, 2, 3, 10)]
    body += f'''
<section class="section section--paper" aria-labelledby="trprice-h">
  <div class="container pricing">
    <div class="pricing__head">
      {shead("02", "Pricing", f"${TRANSLATION_PAGE} per page. ${TRANSLATION_PAGE_3PLUS} per page from three pages.", "trprice-h", "Documents of three pages or more are charged at the lower rate for every page.", cls="shead--stack")}
      {calc}
    </div>
    {price_table(rows=tr_rows, caption="Certified translation price examples")}
  </div>
</section>'''
    body += sec("03", "Languages", "Spanish, Arabic, French and more.", "trlang-h", rows([
        ("Spanish translation in Kansas City", "Birth and marriage records for Mexico, Colombia, Venezuela, Honduras and Spain, and Spanish-language records coming into the U.S."),
        ("Arabic translation in Kansas City", "For embassy legalization in the UAE, Qatar, Egypt and Saudi Arabia, which usually require Arabic, and Arabic records coming into the U.S."),
        ("French translation", "For France, Morocco, Tunisia, Senegal and other French-speaking destinations."),
        ("Other languages", "Ask us about your language pair. We tell you before we start whether we can take it on."),
    ], cls="rows--2"), tone="")
    body += sec("04", "USCIS and immigration", "Certified translation for USCIS.", "truscis-h",
                f'''<div class="prose-block"><p>USCIS requires a complete English translation of every foreign-language document you submit, with the translator’s certification that it is complete and accurate and that the translator is competent to translate from that language into English.</p>
                <p>Our certified translations of birth, marriage and divorce records include that certification. {NO_ADVICE}</p></div>''', tone="section--bone")
    body += sec("05", "Translation and apostille", "Before or after the apostille?", "trorder-h",
                '''<div class="prose-block"><p>The destination country decides whether the translation happens before or after the apostille. Some countries want the translation apostilled together with the original, some want the original apostilled first and translated afterwards, and some only accept translations made in their own country.</p>
                <p>We confirm the order for each client before we start, so you do not pay for a translation the receiving office will not accept.</p></div>''')
    body += faq_section(TRANSLATION_FAQ, num="06", heading="Translation questions.", tone="section--paper")
    body += cta_final()
    return page(path, "Certified Translation Services in Kansas City | Midwest",
                f"Certified translation in Kansas City: Spanish, Arabic, French and more. Birth, marriage, divorce, diplomas, FBI reports and USCIS. ${TRANSLATION_PAGE} per page.",
                body, active="services", crumbs=crumbs, og_image="notary-consultation",
                schema=[service_schema(path, "Certified Translation Services", "Certified translation of civil records, diplomas and FBI reports in Spanish, Arabic, French and other languages.", "Certified translation"),
                        faq_schema(path, TRANSLATION_FAQ)],
                preload=("notary-consultation", "(min-width: 1024px) 42vw, 100vw"), keyword="certified translation Kansas City")


# =========================================================================== Business accounts
def business():
    path = "/business-accounts/"
    crumbs = [SVC, ("Business Accounts", path)]
    body = page_hero(
        "Business Accounts for Apostille and Notary Services",
        "For employers, schools, law firms, immigration attorneys and staffing agencies that send documents regularly: monthly invoicing, volume pricing and one point of contact.",
        crumbs, image="notary-agreement", alt="Handshake across a desk over signed documents", lab="Business accounts",
        plate="Plate 01. One point of contact", buttons=btn("Request a business account", "#business-form", "primary", "arrow-right") + call_btn())
    body += sec("01", "Who it is for", "Built for organizations with recurring documents.", "bwho-h", rows([
        ("Employers", "Degrees, background checks and employment letters for staff moving abroad, and I-9 verification support."),
        ("Schools and universities", "Diplomas and transcripts for students and graduates who study or work overseas."),
        ("Law firms", "Powers of attorney, affidavits, court documents and corporate records for international matters."),
        ("Immigration attorneys", "Certified translations, notarizations and apostilles for client files, coordinated with your deadlines."),
        ("Staffing agencies", "Background checks and credentials for placements abroad, handled in batches."),
    ], cls="rows--2"))
    body += sec("02", "What you get", "One account, one contact, one invoice.", "bget-h", rows([
        ("Monthly invoicing", "One invoice a month for every order your team places."),
        ("Volume pricing", "Pricing based on how many documents you send. Tell us your typical monthly volume."),
        ("One point of contact", "One person who knows your files and your deadlines."),
    ], cls="rows--3"), tone="section--paper")
    body += f'''
<section class="section section--bone" id="business-form" aria-labelledby="bform-h">
  <div class="container contact">
    <div class="contact__form">
      {shead("03", "Business enquiry", "Request a business account.", "bform-h", "Tell us about your organization. We reply with volume pricing and set up your account.", cls="shead--stack")}
      <form class="form" action="/contact-handler.php" method="post" novalidate data-contact-form>
        <div class="form__row">
          <div class="field"><label for="b-org">Organization <span class="req">(required)</span></label><input id="b-org" name="x_organization" autocomplete="organization" required aria-describedby="e-org"><p class="field__error" id="e-org"></p></div>
          <div class="field"><label for="b-type">Type of organization</label><select id="b-type" name="x_organization_type"><option>Employer</option><option>School or university</option><option>Law firm</option><option>Immigration attorney</option><option>Staffing agency</option><option>Other</option></select></div>
        </div>
        <div class="form__row">
          <div class="field"><label for="b-first">Your name <span class="req">(required)</span></label><input id="b-first" name="first_name" autocomplete="name" required aria-describedby="e-bfirst"><p class="field__error" id="e-bfirst"></p></div>
          <div class="field"><label for="b-vol">Documents per month</label><select id="b-vol" name="x_monthly_volume"><option>1 to 5</option><option>6 to 20</option><option>21 to 50</option><option>More than 50</option></select></div>
        </div>
        <div class="form__row">
          <div class="field"><label for="b-email">Work email <span class="req">(required)</span></label><input id="b-email" name="email" type="email" autocomplete="email" required aria-describedby="e-bemail"><p class="field__error" id="e-bemail"></p></div>
          <div class="field"><label for="b-phone">Phone</label><input id="b-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
        </div>
        <div class="field"><label for="b-msg">Which documents and countries do you usually handle? <span class="req">(required)</span></label><textarea id="b-msg" name="message" rows="5" required aria-describedby="e-bmsg"></textarea><p class="field__error" id="e-bmsg"></p></div>
        <div class="hp" aria-hidden="true"><label for="b-company">Company</label><input id="b-company" name="company" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="form_source" value="Business accounts">
        <p class="form__status" role="status" tabindex="-1" data-form-status></p>
        <p class="form__consent">By sending this form you agree to our <a href="/privacy-policy/">privacy policy</a> and <a href="/terms-and-conditions/">terms and conditions</a>.</p>
        <div class="btn-row"><button class="btn btn--primary" type="submit"><span class="btn__label">Send enquiry</span><span class="btn__icon">{icon("send")}</span></button></div>
      </form>
    </div>
    <div class="contact__side">
      <dl class="contact-list">
        <div><dt>Call or text</dt><dd><a href="{TEL}">{PHONE}</a></dd></div>
        <div><dt>Office</dt><dd>8101 E. Bannister Rd., Kansas City, MO 64134</dd></div>
      </dl>
    </div>
  </div>
</section>'''
    body += cta_final()
    return page(path, "Business Accounts: Apostille & Notary | Midwest",
                "Apostille, notary and translation accounts for employers, schools, law firms, immigration attorneys and staffing agencies: monthly invoicing, volume pricing.",
                body, active="services", crumbs=crumbs, og_image="notary-agreement", keyword="business apostille account",
                schema=[service_schema(path, "Business Accounts", "Apostille, notary and certified translation accounts for organizations, with monthly invoicing and volume pricing.", "Business document services")])


# =========================================================================== FAQ
SECURITY_FAQ = [
    ("How do you handle my original documents?", "Originals are kept in our office from the moment they arrive until they are submitted for certification, and they come back to you by tracked FedEx or by pickup."),
    ("Are my ID and personal information kept private?", "Yes. Copies of IDs and personal information are used only to process your order and are shared only with the offices that must receive the document, such as the Secretary of State, the U.S. Department of State or an embassy."),
    ("Can I track my document?", "Yes. Every return shipment has FedEx tracking, and you can call or text us at any point for a status update."),
]
PRICE_FAQ = [
    ("What does an apostille cost?", f"Missouri {MO_STD} ({MO_SAME} same day), Kansas {KS_STD} ({KS_SAME} same day), Texas {TX_STD} ({TX_EXP} expedited in {TX_EXP_TIME}), and {OTHER_STD} for every other state. {PRICE_NOTE} See the <a href=\"/pricing/\">full price list</a>."),
    ("What are the same-day cutoff times?", f"{CUTOFFS} Same-day service is only offered for Missouri and Kansas documents."),
    ("What if you miss the same-day deadline?", GUARANTEE),
    ("What if the destination changes its requirements?", POLICY),
]


def faq_page():
    path = "/faq/"
    crumbs = [("FAQ", path)]
    body = page_hero("Apostille and Notary Questions",
                     "Answers about apostilles, pricing, same-day cutoffs, document security and notary services. If your question is not here, call or text us.",
                     crumbs, lab="FAQ", buttons=cta_btn() + call_btn())
    general = HOME_FAQ + APOSTILLE_FAQ_BASE
    body += faq_section(general, hid="faq1-h", num="01", heading="Apostille and notary.")
    body += faq_section(PRICE_FAQ, hid="faq2-h", num="02", heading="Pricing and same-day service.", tone="section--paper")
    body += faq_section(SECURITY_FAQ, hid="faq3-h", num="03", heading="Document security and privacy.", lab="Document security",
                        lead="How we handle, store and return your originals.")
    body += cta_final()
    return page(path, "Apostille & Notary FAQ | Midwest Apostille & Notary",
                "Apostille and notary questions answered: prices, same-day cutoffs, the same-day guarantee, document security, privacy and what happens to your originals.",
                body, active="resources", crumbs=crumbs, keyword="apostille FAQ",
                schema=[faq_schema(path, general + PRICE_FAQ + SECURITY_FAQ)])


# =========================================================================== Order
def order():
    path = "/order/"
    crumbs = [("Order online", path)]
    pay_links = ""
    if PAYMENT_DEPOSIT_URL or PAYMENT_FULL_URL:
        pay_links = (f' data-pay-deposit="{esc(PAYMENT_DEPOSIT_URL or "")}" data-pay-full="{esc(PAYMENT_FULL_URL or "")}"')
    countries = sorted({n for v in HAGUE.values() for n in v})
    body = page_hero("Order an Apostille Online",
                     "Tell us what you are sending and choose your options. You see an estimate as you go, and we confirm the total and send payment details before you mail anything.",
                     crumbs, lab="Order online", buttons=call_btn("secondary", f"Questions? Call {PHONE}"))
    body += f'''
<section class="section section--paper" aria-labelledby="oform-h">
  <div class="container contact">
    <div class="contact__form">
      {shead("01", "Order details", "Your order.", "oform-h", cls="shead--stack")}
      <form class="form" action="/contact-handler.php" method="post" novalidate data-contact-form data-order{pay_links}>
        <fieldset><legend>1. Service</legend>
          <div class="form__row">
            <div class="field"><label for="o-svc">Service</label><select id="o-svc" name="x_service" data-o-svc>
              <option value="state">State apostille</option><option value="fbi_package">FBI fingerprint + apostille package ({FBI_PACKAGE})</option>
              <option value="fbi_apostille">FBI background check apostille ({FBI_APOSTILLE})</option><option value="fbi_prints">FBI fingerprinting only ({FBI_PRINTS})</option>
              <option value="translation">Certified translation only</option><option value="legalization">Embassy legalization (quoted)</option></select></div>
            <div class="field" data-o-statefield><label for="o-state">State that issued the document</label><select id="o-state" name="x_state" data-o-state>
              <option value="MO">Missouri</option><option value="KS">Kansas</option><option value="TX">Texas</option><option value="OTHER">Another state</option></select></div>
          </div>
          <div class="form__row">
            <div class="field" data-o-speedfield><label for="o-speed">Speed</label><select id="o-speed" name="x_speed" data-o-speed>
              <option value="standard">Standard</option><option value="fast">Same day</option></select></div>
            <div class="field"><label for="o-qty">Number of documents</label><input id="o-qty" name="x_documents" type="number" min="1" max="50" value="1" inputmode="numeric" data-o-qty></div>
          </div>
          <div class="field"><label for="o-dest">Destination country</label><input id="o-dest" name="x_destination" list="o-dest-list" autocomplete="off" placeholder="For example, Mexico"><datalist id="o-dest-list">{"".join(f'<option value="{esc(c)}"></option>' for c in countries)}</datalist></div>
        </fieldset>
        <fieldset><legend>2. Add-ons</legend>
          <div class="choices choices--2">
            <label class="choice"><input type="checkbox" name="x_extra_copies" value="yes" data-o-copies> Extra certified copies (quoted)</label>
            <label class="choice"><input type="checkbox" name="x_translation" value="yes" data-o-tr> Certified translation</label>
            <label class="choice"><input type="checkbox" name="x_overnight" value="yes" data-o-overnight> Overnight shipping (extra fee, quoted)</label>
          </div>
          <div class="field" data-o-trfield hidden><label for="o-pages">Pages to translate</label><input id="o-pages" name="x_translation_pages" type="number" min="1" max="200" value="1" inputmode="numeric" data-o-pages></div>
        </fieldset>
        <fieldset><legend>3. Return and payment</legend>
          <div class="form__row">
            <div class="field"><label for="o-ship">Return shipping</label><select id="o-ship" name="x_return" data-o-ship>
              <option value="us">Tracked FedEx in the U.S. ({SHIP_US})</option><option value="intl">International FedEx or DHL (quoted)</option><option value="pickup">Pickup at our office</option></select></div>
            <div class="field"><label for="o-pay">Payment</label><select id="o-pay" name="x_payment"><option>Pay a deposit</option><option>Pay the full amount</option></select></div>
          </div>
          <div class="choices choices--2" role="group" aria-label="Status updates">
            <label class="choice"><input type="checkbox" name="x_updates_text" value="yes" checked> Text me status updates</label>
            <label class="choice"><input type="checkbox" name="x_updates_email" value="yes" checked> Email me status updates</label>
          </div>
        </fieldset>
        <div class="estimate" aria-live="polite"><p>Estimated total</p><output data-o-total>$90</output><small data-o-note>Missouri apostille, standard. {PRICE_NOTE}</small></div>
        <fieldset><legend>4. Your details</legend>
          <div class="form__row">
            <div class="field"><label for="o-first">Full name <span class="req">(required)</span></label><input id="o-first" name="first_name" autocomplete="name" required aria-describedby="e-ofirst"><p class="field__error" id="e-ofirst"></p></div>
            <div class="field"><label for="o-phone">Mobile phone</label><input id="o-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
          </div>
          <div class="field"><label for="o-email">Email <span class="req">(required)</span></label><input id="o-email" name="email" type="email" autocomplete="email" required aria-describedby="e-oemail"><p class="field__error" id="e-oemail"></p></div>
          <div class="field"><label for="o-msg">What are the documents? <span class="req">(required)</span></label><textarea id="o-msg" name="message" rows="4" required aria-describedby="e-omsg" placeholder="For example, Missouri birth certificate for a residency visa in Spain"></textarea><p class="field__error" id="e-omsg"></p></div>
        </fieldset>
        <input type="hidden" name="x_estimate" value="" data-o-estimate>
        <div class="hp" aria-hidden="true"><label for="o-company">Company</label><input id="o-company" name="company" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="form_source" value="Online order">
        <p class="form__status" role="status" tabindex="-1" data-form-status></p>
        <p class="form__consent">By sending this form you agree to our <a href="/privacy-policy/">privacy policy</a> and <a href="/terms-and-conditions/">terms and conditions</a>.</p>
        <div class="btn-row"><button class="btn btn--primary" type="submit"><span class="btn__label">Place order</span><span class="btn__icon">{icon("send")}</span></button></div>
        <p class="fine">After you place the order we confirm the total and send you a secure payment link for the deposit or the full amount, with the mailing address for your documents. {GUARANTEE}</p>
      </form>
    </div>
    <div class="contact__side">
      {shead("", "Prices", "Quick reference.", "oprice-h", cls="shead--stack")}
      {price_table(rows=PRICES[:7])}
      {price_notes(guarantee=False)}
    </div>
  </div>
</section>'''
    return page(path, "Order an Apostille Online | Midwest Apostille & Notary",
                "Order a Missouri, Kansas or out-of-state apostille, FBI apostille or certified translation online. See an estimate, add translation or overnight shipping.",
                body, active="pricing", crumbs=crumbs, keyword="order apostille online")


# =========================================================================== Dual citizenship
DUAL_FAQ = [
    ("How many documents will I need?", "Usually several: your own birth certificate, your parents’ and sometimes grandparents’ birth, marriage and death records, and divorce decrees where they apply. The consulate or registry gives you the exact list."),
    ("Do the documents need to be translated?", "Usually yes, into the language of the country. Some countries only accept translations made by translators they recognize. We confirm before we translate anything."),
    ("Can you get the certified copies for me?", "Yes, for Missouri and Kansas records. For records from other states we tell you where to order them and apostille them when they arrive."),
]


def dual_citizenship():
    path = "/apostille-for-dual-citizenship/"
    crumbs = [("Apostille Services", "/apostille-services/"), ("Dual Citizenship", path)]
    body = page_hero(
        "Apostille for Dual Citizenship",
        "Italian, Irish and Polish citizenship by descent, and other dual citizenship applications, usually need several U.S. records apostilled and translated. We handle the full set in one order.",
        crumbs, image="international-route", alt="Certificates and passports in front of a world map", lab="Dual citizenship",
        plate="Plate 01. A family file", buttons=cta_btn() + call_btn())
    body += sec("01", "By country", "Italian, Irish and Polish dual citizenship.", "dualc-h", rows([
        ("Italian dual citizenship", "Italian consulates and comuni generally ask for U.S. birth, marriage and death records with an apostille and an Italian translation, for each person in the line of descent."),
        ("Irish dual citizenship", "Applications through Ireland’s Foreign Births Register ask for certified civil records for you and the Irish-born ancestor’s line. Whether each record needs an apostille depends on the document, and we confirm it before you send anything."),
        ("Polish dual citizenship", "Polish authorities generally ask for apostilled U.S. civil records translated into Polish, often by a translator recognized in Poland. We apostille the records and coordinate the translation step."),
        ("Other countries", "Spain, Mexico, Colombia and other countries also confirm nationality by descent. Use the country explorer to check whether an apostille or embassy legalization applies."),
    ], cls="rows--2"))
    body += sec("02", "Documents", "Records clients send us for citizenship files.", "dualdocs-h",
                f'''<div class="linkgrid">
                <a href="/birth-certificate-apostille-missouri-kansas/"><b>Birth certificates</b><span>Missouri and Kansas certified copies</span></a>
                <a href="/marriage-certificate-apostille/"><b>Marriage certificates</b><span>County and state records</span></a>
                <a href="/divorce-decree-apostille/"><b>Divorce decrees</b><span>Certified court copies</span></a>
                <a href="/certified-translation-services/"><b>Certified translation</b><span>From ${TRANSLATION_PAGE} per page</span></a>
                <a href="/power-of-attorney-apostille/"><b>Powers of attorney</b><span>For a representative abroad</span></a>
                <a href="/pricing/"><b>Pricing</b><span>Every document, one order</span></a></div>''', tone="section--paper")
    body += sec("03", "Pricing", "Priced per document.", "dualp-h",
                price_table(rows=PRICES[:4]) + price_notes(guarantee=False),
                "Citizenship files often include records from several states. Each document is priced by the state that issued it.")
    body += faq_section(DUAL_FAQ, num="04", heading="Dual citizenship questions.", tone="section--paper")
    body += cta_final()
    return page(path, "Apostille for Dual Citizenship: Italy, Ireland, Poland",
                "Apostille and certified translation for Italian, Irish and Polish dual citizenship: birth, marriage, death and divorce records handled as one order.",
                body, active="resources", crumbs=crumbs, og_image="international-route", keyword="apostille for dual citizenship",
                schema=[service_schema(path, "Apostille for Dual Citizenship", "Apostille and certified translation of U.S. civil records for dual citizenship applications.", "Apostille services"),
                        faq_schema(path, DUAL_FAQ)])


def build_all():
    return [pricing(), fbi_fingerprinting(), translation(), business(), faq_page(), order(), dual_citizenship()]

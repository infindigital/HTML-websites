"""Internal pages — same design system, content verbatim from the content PDF."""
from components import (HOME_FAQ, REVIEWS, apostille_story, booking_band, check_list, countries_explorer, cta_final,
                        faq_section, fbi_timeline, feature_list, legal_route, page_hero, quote_band, ready_block,
                        reasons, reasons_section, reviews_section, services_section)
from countries import LEGALIZATION
from lib import (ADDRESS, APPT, BOOK, DISCLAIMER, EMAIL, JAIL_PHONE, JAIL_TEL, MAP_EMBED, PHONE, PHONE_FMT, TEL,
                 WHATSAPP, arrow, book_btn, btn, call_btn, esc, eyebrow, faq_schema, icon, img, page)

ES_PAIR = ("/notary-apostille-services/", "/servicios-de-notaria-y-apostilla/")
JAIL_PAIR = ("/jail-notary-kansas-city/", "/notaria-en-carceles-de-kansas-cit/")


# =========================================================================== About
def about():
    specialized = [
        "Apostille Services for Hague Convention Countries (including FBI background checks, birth certificates, and legal documents)",
        "Remote Online Notarization (RON) — notarize documents from anywhere in the world using our secure Missouri-based notary platform",
        "Document Preparation Services (Power of Attorney, Consent for Minor Travel, Legal Agreements, etc.)",
        "Embassy Legalization for Non-Hague Convention Countries",
        "Certified Translation Assistance — Spanish, Arabic, and French document translation support for official use",
        "International Apostille Courier Options — shipping apostilled documents to over 100 countries",
        "Bilingual Customer Support — We speak Spanish, Arabic, and French",
    ]
    icons_ = ["stamp", "laptop", "file-pen-line", "landmark", "languages", "plane", "message-square"]
    rows = "".join(
        f'<li><span class="icon-badge">{icon(icons_[i])}</span><span>{s}</span></li>' for i, s in enumerate(specialized))
    body = page_hero(
        "About Us",
        "At Midwest Apostille &amp; Notary Services, we understand that behind every document is a story — a marriage abroad, a family relocation, a student visa, or a legal milestone. That’s why our team provides secure, convenient, and efficient document processing tailored to your unique needs.",
        [("About Us", None)], image="document-handover", alt="Notary presenting an apostilled certificate to a client across a desk",
        eyebrow_t="Midwest Apostille &amp; Notary Services", tag=("globe", "Serving clients across the United States and around the world"),
        buttons=book_btn("Make an Appointment") + call_btn())
    body += f'''
<section class="section section--white" aria-labelledby="ab-h">
  <div class="container editorial">
    <div class="editorial__aside">{eyebrow("Our work")}<h2 id="ab-h" data-split>Documents that meet the standard — at home and abroad.</h2></div>
    <div class="editorial__body" data-reveal>
      <p>We proudly serve clients across the United States and around the world with trusted solutions for apostille certification, document preparation, and remote online notarization — ensuring that your documents meet the legal standards required for both domestic and international use</p>
    </div>
  </div>
</section>
<section class="section section--navy on-dark quote-band">
  <div class="container">{icon("quote")}<blockquote data-split><p>“We don’t just notarize documents — we notarize life’s defining moments.”</p></blockquote></div>
</section>
<section class="section" aria-labelledby="spec-h">
  <div class="container two-col" style="align-items:start">
    <div class="stack-copy">
      {eyebrow("What we offer")}<h2 id="spec-h" data-split>Our Specialized Services Include:</h2>
      <p>Whether you’re navigating immigration, preparing for an international move, handling legal paperwork, or starting a new chapter abroad, Midwest Apostille &amp; Notary Services is here to ensure your documents are handled with precision and care.</p>
      <div class="media-frame">{img("apostille-certificates", "Apostille certificates with gold seals, a magnifying glass and a fountain pen on a navy desk", "(min-width: 1024px) 45vw, 100vw")}</div>
    </div>
    <ul class="feature-list feature-list--icons" role="list" data-stagger>{rows}</ul>
  </div>
</section>'''
    body += booking_band() + reviews_section() + cta_final()
    return page("/about-us/", "About Us | Midwest Apostille & Notary Services",
                "At Midwest Apostille & Notary Services, we understand that behind every document is a story — a marriage abroad, a family relocation, a student visa, or a legal milestone.",
                body, active="about", og_image="document-handover")


# =========================================================================== Services
DOC_PREP_HOME = [
    "Power of Attorney (General &amp; Specific)", "Minor Travel Consent Forms", "Birth Certificates", "Marriage Certificates",
    "Death Certificates", "Divorce Decrees", "FBI Background Checks", "School Transcripts &amp; Diplomas",
    "Corporate Documents (Articles of Incorporation, Operating Agreements)", "Adoption Dossiers",
    "Document Translation (English, Spanish, Arabic, French)",
]


def services():
    body = page_hero(
        "Services",
        "From Midwest Apostille &amp; Notary Service identity proofing and digital certificates to remote notarisations and mobile visits, our services are designed to simplify compliance and documentation quickly, securely, and nationwide.",
        [("Services", None)], eyebrow_t="Apostille · Legalization · Notary · Preparation", map_bg=True,
        chain=[("stamp", "Apostille Services"), ("landmark", "Embassy Legalization"), ("car", "Mobile Notary"),
               ("laptop", "Remote Online Notary"), ("building-2", "Jail Notary"), ("file-pen-line", "Document Preparation")],
        buttons=book_btn("Make an Appointment") + call_btn())
    body += services_section("Our services", ids=["apostille", "embassy-legalization", "mobile-notary", "remote-online-notary",
                                                  "jail-notary", "document-preparation", "fbi-apostille", "fbi-attestation"])
    body += f'''
<section class="section section--white" aria-labelledby="dpa-h">
  <div class="container two-col">
    <div class="stack-copy">{eyebrow("Document Preparation")}<h2 id="dpa-h" data-split>Document Preparation &amp; Assistance:</h2>
      <p>{btn("Document Preparation Services", "/document-preparation-services/", "ghost")}</p></div>
    {feature_list(DOC_PREP_HOME)}
  </div>
</section>'''
    body += booking_band() + countries_explorer() + cta_final()
    return page("/services/", "Services | Midwest Apostille & Notary Services",
                "From Midwest Apostille & Notary Service identity proofing and digital certificates to remote notarisations and mobile visits, our services are designed to simplify compliance and documentation.",
                body, active="services")


def service_redirect():
    import os
    from lib import ROOT, SITE
    os.makedirs(os.path.join(ROOT, "service"), exist_ok=True)
    with open(os.path.join(ROOT, "service", "index.html"), "w") as f:
        f.write(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Services</title>'
                f'<link rel="canonical" href="{SITE}/services/"><meta http-equiv="refresh" content="0; url=/services/">'
                f'<meta name="robots" content="noindex"></head><body><p><a href="/services/">Services</a></p></body></html>\n')
    return "/service/ (redirect)"


def not_found():
    """Custom 404 — served as /404.html by Vercel and via ErrorDocument on Apache."""
    import os
    from lib import ROOT
    buttons = btn("Back to home", "/", "gold") + btn("Contact us", "/contact-us/", "ghost")
    body = page_hero("Page not found", "The page you are looking for may have moved. Use the links below to find "
                     "our apostille, notary and document preparation services.",
                     [("Page not found", None)], buttons=buttons)
    page("/404/", "Page not found | Midwest Apostille & Notary", "Page not found.", body)
    src = os.path.join(ROOT, "404", "index.html")
    html = open(src).read().replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"', 1)
    with open(os.path.join(ROOT, "404.html"), "w") as f:
        f.write(html)
    os.remove(src)
    os.rmdir(os.path.join(ROOT, "404"))
    return "/404.html"


# =========================================================================== Apostille
APOSTILLE_WHY = [
    ("Same-Day Apostille Processing", "When timing is critical, we provide same-day services for documents that are ready to be certified, so you don’t have to wait days or weeks."),
    ("Mobile Apostille Services", "Busy schedule? We come to you. Our mobile notaries meet clients at offices, homes, or convenient public locations anywhere in the Kansas City area."),
    ("In-Office Appointments", "Prefer an in-office experience? Visit our comfortable Kansas City location for secure document handling and personal assistance."),
    ("Bilingual Expertise (English &amp; Spanish)", "We make sure you understand every step in the process. Our bilingual team communicates clearly in your preferred language."),
    ("Full-Service Handling", "From notarization and preparation to submission, tracking, and final delivery, we manage the entire process on your behalf."),
]


def apostille():
    body = page_hero(
        "Apostille &amp; Authentication Services in Kansas City – Fast, Trusted, and Professional (¡También en Español!)",
        "When your documents need to be recognised internationally, Midwest Apostille Notary Service delivers secure, reliable apostille and authentication services with efficiency and care. Whether you’re preparing paperwork for overseas business, applying for dual citizenship, or validating personal records, our experienced team ensures the process is smooth and fully compliant.",
        [("Services", "/services/"), ("Apostille Services", None)], image="apostille-documents",
        alt="Certificates with wax seals, a notary stamp and a fountain pen", eyebrow_t="Apostille Services",
        tag=("badge-check", "VIP Same-Day &amp; Standard Processing"),
        buttons=book_btn("Make an Appointment") + btn("Español", "/servicios-de-notaria-y-apostilla/", "ghost", "languages"))
    body += apostille_story()
    body += reasons_section(APOSTILLE_WHY, icons_=["zap", "car", "building-2", "languages", "package-check"], tone="section--white")
    body += booking_band(
        text="We offer clear, upfront pricing with no surprises:",
        extra=check_list(["Includes notarization, priority shipping, and return tracking", "Optional Spanish translation and formatting services available"]),
        bg="apostille-certificates")
    body += countries_explorer(tone="")
    body += faq_section(HOME_FAQ, tone="section--ivory")
    body += cta_final()
    return page("/apostille-services/", "Apostille Services in Kansas City | Midwest Apostille & Notary",
                "When your documents need to be recognised internationally, Midwest Apostille Notary Service delivers secure, reliable apostille and authentication services.",
                body, active="apostille", schema=[faq_schema(HOME_FAQ)], og_image="apostille-documents")


# =========================================================================== Notary
NOTARY_INCLUDES = [
    "<strong>Remote Online Notary (RON)</strong> – Legally notarize documents from anywhere in the world using our Missouri-based secure digital platform",
    "Power of Attorney, Medical Authorizations, &amp; Legal Declarations",
    "Real Estate &amp; Loan Signings",
    "<strong>Bilingual Notary Services</strong> – Spanish, Arabic, and French speaking support available",
    "<strong>General Notary Work</strong> – Acknowledgments, Jurats, Oaths &amp; Affirmations",
    "Minor Travel Consent Forms &amp; Guardianship Documents",
    "Immigration Document Notarization",
    "Notarized Copies &amp; Affidavits",
]
NOTARY_WHY = [
    ("Flexible Scheduling", "We offer daytime, evening, and weekend availability"),
    ("Secure &amp; Compliant", "All notarizations meet Missouri/Kansas state law and national compliance standards"),
    ("Remote Convenience", "Eliminate travel time and delays with our fast and secure remote notary option"),
    ("International Clients Welcome", "Our remote platform allows notarizations for U.S. citizens and foreign nationals alike"),
]


def notary():
    body = page_hero(
        "Notary Services – Midwest Apostille &amp; Notary Services",
        "At Midwest Apostille &amp; Notary Services, we provide fast, professional, and legally compliant notary public services for clients across Missouri and Kansas — with the added convenience of Remote Online Notarization (RON) available to clients anywhere in the United States or around the world.",
        [("Services", "/services/"), ("Notary Services", None)], image="remote-online-notary",
        alt="Remote online notarization session on a laptop with a signed digital document", eyebrow_t="Notary Services",
        tag=("laptop", "Remote Online Notarization (RON)"), buttons=book_btn("Make an Appointment") + call_btn())
    body += f'''
<section class="section section--white" aria-labelledby="ni-h">
  <div class="container two-col" style="align-items:start">
    <div class="stack-copy">
      {eyebrow("Notary public services")}<h2 id="ni-h" data-split>Our Notary Services Include:</h2>
      <p>We understand that notarizing important documents is a critical step in legal, financial, and immigration processes. Whether you’re preparing a power of attorney, handling a real estate transaction, or submitting documents for international use, we ensure your forms are notarized properly, securely, and in full compliance with state and federal law.</p>
      <div class="media-frame">{img("apostille-documents", "Notarized documents with wax seals and stamps", "(min-width: 1024px) 45vw, 100vw")}</div>
    </div>
    {feature_list(NOTARY_INCLUDES, cols=False)}
  </div>
</section>'''
    body += quote_band("“Every notarized signature secures a moment of truth, trust, or transition — that’s why we treat every document like it matters, because it does.”",
                       "Whether you’re notarizing a personal affidavit, business contract, or immigration support letter, trust Midwest Apostille &amp; Notary Services to deliver a seamless and professional notary experience",
                       tone="section--ivory")
    body += reasons_section(NOTARY_WHY, icons_=["clock", "shield-check", "laptop", "globe"], tone="section--white")
    body += cta_final()
    return page("/notary-services/", "Notary Services | Midwest Apostille & Notary Services",
                "At Midwest Apostille & Notary Services, we provide fast, professional, and legally compliant notary public services for clients across Missouri and Kansas.",
                body, active="notary", og_image="remote-online-notary")


# =========================================================================== Document preparation
DOCPREP_INCLUDES = [
    "Power of Attorney (General, Durable, Medical)", "Affidavits &amp; Declarations",
    "Certified Translations + Document Formatting for International Submissions", "Real Estate Authorization Letters",
    "FBI Background Check Apostille Support Documents", "Minor Child Travel Consent Forms",
    "Name Change Statements &amp; Divorce Consent Forms", "U.S. Immigration Forms Support (I-130, I-864, DS-260, etc.)",
    "Embassy Legalization Package Assembly", "Custom Templates for Apostille or Notarization",
]
DOCPREP_WHY = [
    ("All-in-One Convenience", "Prepare, notarize, and apostille your documents through one trusted provider"),
    ("Multilingual Services", "English, Spanish, Arabic, and French support"),
    ("Nationwide Reach", "We assist clients across all 50 U.S. states and abroad"),
    ("Professionally Formatted Documents", "Accepted by U.S. government agencies, foreign consulates, and international institutions"),
]


def docprep():
    body = page_hero(
        "Document Preparation Services – Midwest Apostille &amp; Notary Services",
        "At Midwest Apostille &amp; Notary Services, we help you prepare legally sound, professionally formatted documents for personal, business, immigration, and international use. Whether you’re submitting paperwork to a court, a foreign government, or a U.S. agency, we ensure your documents meet official requirements and are ready for notarization, apostille, or embassy legalization.",
        [("Services", "/services/"), ("Document Preparation Services", None)], image="document-handover",
        alt="Professional handing over a prepared certificate in a leather folder", eyebrow_t="Document Preparation",
        tag=("file-check", "Ready for notarization, apostille, or embassy legalization"), buttons=book_btn("Make an Appointment") + call_btn())
    body += f'''
<section class="section section--white" aria-labelledby="dc-h">
  <div class="container editorial">
    <div class="editorial__aside">{eyebrow("Who we help")}<h2 id="dc-h" data-split>Accurate, fast, and confidential support.</h2></div>
    <div class="editorial__body" data-reveal><p>Our clients include individuals, law firms, immigration attorneys, healthcare professionals, educators, and families who rely on us for accurate, fast, and confidential document drafting and support.</p></div>
  </div>
</section>
<section class="section" aria-labelledby="dpi-h">
  <div class="container two-col" style="align-items:start">
    <div class="stack-copy">
      {eyebrow("Preparation services")}<h2 id="dpi-h" data-split>Our Document Preparation Services Include:</h2>
      <div class="media-frame">{img("document-preparation", "Client reviewing prepared documents across a desk", "(min-width: 1024px) 45vw, 100vw")}</div>
      <div class="callout">{icon("circle-help")}<div><strong>Please note</strong><p>We do not offer legal advice, but we help you complete and format your documents for official submission — including providing the notary and apostille services that follow.</p></div></div>
    </div>
    {feature_list(DOCPREP_INCLUDES, cols=False)}
  </div>
</section>'''
    body += quote_band("“Paperwork shouldn’t hold up your progress — we help turn your documents into action.”",
                       "Let us handle the formatting, compliance, and delivery preparation — so you can focus on what matters most. Midwest Apostille &amp; Notary Services is your trusted partner for fast, secure, and accurate document preparation.",
                       tone="section--navy on-dark")
    body += reasons_section(DOCPREP_WHY, icons_=["package-check", "languages", "globe", "file-check"], tone="section--white")
    body += cta_final()
    return page("/document-preparation-services/", "Document Preparation Services | Midwest Apostille & Notary",
                "At Midwest Apostille & Notary Services, we help you prepare legally sound, professionally formatted documents for personal, business, immigration, and international use.",
                body, active="docprep", og_image="document-handover")


# =========================================================================== Contact
def contact():
    body = page_hero("Contact Us", "Have questions or need to book a service? Reach out to us.", [("Contact Us", None)],
                     eyebrow_t="Midwest Apostille &amp; Notary Services", map_bg=True,
                     buttons=book_btn("Make an Appointment") + call_btn())
    body += f'''
<section class="section section--white" aria-labelledby="ct-h" style="padding-top:clamp(2rem,1rem+3vw,4rem)">
  <div class="container contact-grid">
    <div>
      {eyebrow("Contact Form")}
      <h2 id="ct-h" data-split style="margin:14px 0 28px">Get in Touch with Our Experienced Legal Team</h2>
      <form class="form" action="/contact-handler.php" method="post" novalidate data-contact-form>
        <div class="form__row">
          <div class="field"><label for="f-first">First Name <span class="req" aria-hidden="true">*</span></label><input id="f-first" name="first_name" autocomplete="given-name" required aria-describedby="e-first"><p class="field__error" id="e-first"></p></div>
          <div class="field"><label for="f-last">Last Name</label><input id="f-last" name="last_name" autocomplete="family-name"></div>
        </div>
        <div class="form__row">
          <div class="field"><label for="f-email">Your Email <span class="req" aria-hidden="true">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email"><p class="field__error" id="e-email"></p></div>
          <div class="field"><label for="f-phone">Your Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
        </div>
        <div class="field"><label for="f-msg">Message <span class="req" aria-hidden="true">*</span></label><textarea id="f-msg" name="message" required aria-describedby="e-msg"></textarea><p class="field__error" id="e-msg"></p></div>
        <div class="hp" aria-hidden="true"><label for="f-company">Company</label><input id="f-company" name="company" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="form_source" value="Contact page">
        <p class="form__status" role="status" tabindex="-1" data-form-status></p>
        <div class="btn-row"><button class="btn" type="submit">Send Message {icon("send")}</button><span class="small muted">* Required fields</span></div>
        <p class="disclaimer">{DISCLAIMER}</p>
      </form>
    </div>
    <div class="contact-cards" data-stagger>
      <a class="contact-card" href="{TEL}"><span class="icon-badge">{icon("phone")}</span><span><small>Call</small><strong>{PHONE}</strong></span></a>
      <a class="contact-card" href="{WHATSAPP}" target="_blank" rel="noopener"><span class="icon-badge">{icon("whatsapp")}</span><span><small>WhatsApp</small><strong>Message us on WhatsApp</strong></span></a>
      <a class="contact-card" href="mailto:{EMAIL}"><span class="icon-badge">{icon("mail")}</span><span><small>Email</small><strong>{EMAIL}</strong></span></a>
      <a class="contact-card" href="https://www.google.com/maps/search/?api=1&amp;query=8101+East+Bannister+Rd+Kansas+City+MO+64134" target="_blank" rel="noopener"><span class="icon-badge">{icon("map-pin")}</span><span><small>Office</small><strong>{ADDRESS}</strong></span></a>
      <a class="contact-card" href="/"><span class="icon-badge">{icon("globe")}</span><span><small>Website</small><strong>midnotarypro.com</strong></span></a>
      <div class="map-embed"><iframe src="{MAP_EMBED}" title="Map: 8101 East Bannister Rd, Kansas City, MO 64134" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    </div>
  </div>
</section>'''
    body += cta_final()
    return page("/contact-us/", "Contact Us | Midwest Apostille & Notary Services",
                "Have questions or need to book a service? Reach out to us.", body, active="contact")


# =========================================================================== FBI Apostille (Hague)
FBI_REASONS = [
    ("Residency Visas", "Non-lucrative, retirement, and passive income visas require a clean criminal record from your home country."),
    ("Work Permits", "Employer-sponsored and digital-nomad visas commonly require an apostilled background check."),
    ("Student Visas", "Long-term study programs and university enrollment often require authentication for entry."),
    ("Marriage &amp; Family", "Marriage abroad and family reunification visas often require apostilled documentation."),
    ("Adoption", "International adoption processes in Hague member countries require background check authentication."),
]
FBI_FAQ = [
    ("Can I use a state apostille on my FBI report?", "No. An FBI background check is a federal document — it must be apostilled by the U.S. Department of State, not a state Secretary of State. State-level apostilles on federal documents are commonly rejected by foreign authorities, even in Hague member countries."),
    ("Do Hague countries still need embassy legalization?", "No. A single apostille from the U.S. Department of State is sufficient — no embassy visit, no consulate stamp, no further legalization required in any Hague member country."),
    ("Can I apostille a digital (PDF) FBI report?", "Yes. We accept the official FBI eDO electronic PDF issued by the FBI or an approved channeler. This lets you start the process remotely from anywhere in the country without mailing originals first."),
    ("How recent does my FBI background check need to be?", "Most countries expect a report issued within 90 days, but this varies. Always confirm the current window with the specific consulate or authority handling your application before submitting."),
    ("Do I need a certified translation?", "Many non-English-speaking Hague countries require a certified translation of the apostilled report. We coordinate translation in parallel so both documents arrive together as one submission-ready package."),
    ("How long does the whole process take?", "FBI report generation via electronic fingerprint takes a few days. Apostille processing varies with State Department volume. We confirm current timing on your personalized quote."),
]
FBI_WHY = [
    ("We Originate the FBI Check Too", "Many apostille shops can't. We capture fingerprints and obtain the report, then apostille it — one engagement, fewer hand-offs."),
    ("Nationwide, Start by Email", "We accept the official FBI eDO digital PDF, so you can begin from any state without mailing originals first."),
    ("Translation Handled In-House", "We coordinate certified translation (English, Spanish, Arabic, French) so everything arrives as one submission-ready package."),
    ("Prepared Right the First Time", "A miscompleted DS-4194 or altered report gets rejected. We review every detail before submission to avoid restarts."),
]


def fbi_apostille():
    body = page_hero(
        "FBI Apostille for Hague Convention Countries",
        "Get your FBI background check authenticated for use in any Hague member country — from fingerprinting to finished, apostilled document.",
        [("FBI Apostille for Hague Countries", None)], image="apostille-certificates",
        alt="FBI background check apostille certificates with gold seals", eyebrow_t="Hague Apostille Convention",
        chain=[("badge-check", "Authenticated by U.S. Dept. of State"), ("globe", "Valid in 126 Countries"), ("check", "No Embassy Legalization Required")],
        buttons=book_btn("Book an Appointment"))
    body += f'''
<section class="section section--white" aria-labelledby="hc-h">
  <div class="container two-col" style="align-items:start">
    <div class="stack-copy">
      {eyebrow("What This Means for You")}<h2 id="hc-h" data-split>The Hague Apostille Convention</h2>
      <p>The 1961 Hague Apostille Convention streamlines document authentication between member countries. Instead of multiple rounds of government legalization, a single apostille issued by the U.S. Department of State is all foreign authorities need to recognize your FBI background check as authentic.</p>
      <p>Because an FBI background check is a <strong>federal document</strong>, it must be apostilled by the U.S. Department of State — not a state Secretary of State. Spain, Germany, Australia, and all other Hague member countries will reject a state-level apostille on a federal document.</p>
      <div class="callout callout--warn">{icon("circle-help")}<div><strong>Important:</strong><p>Only the U.S. Department of State Office of Authentications can apostille federal documents like your FBI Identity History Summary. State-level apostilles are not accepted.</p></div></div>
    </div>
    <div class="stack-copy">
      <h3>An apostille is commonly required for:</h3>
      {check_list(["Powers of Attorney (Poder Notarial)", "Birth and Marriage Certificates", "Business Formation Documents", "School Records and Diplomas", "Legal Affidavits", "FBI Background Check Reports"])}
      <p>{book_btn("Book an Appointment", "")}</p>
    </div>
  </div>
</section>'''
    body += reasons_section(FBI_REASONS, heading="Common Reasons to Apostille Your FBI Check", icons_=["map-pinned", "briefcase", "graduation-cap", "heart-handshake", "users-round"],
                            intro="Most Hague member countries require a recent, apostilled background check from your country of citizenship for long-stay applications.")
    body += fbi_timeline(link=False)
    body += f'''
<section class="section" aria-labelledby="exp-h">
  <div class="container">
    <div class="section-head section-head--split"><div>{eyebrow("Timeline &amp; Cost")}<h2 id="exp-h" data-split>What to Expect</h2></div></div>
    {reasons([("FBI Report", "A few days when fingerprints are submitted electronically through a channeler. We can handle this step for you from anywhere in the country."),
              ("Apostille Processing", "Varies. Standard mail-in is subject to State Department backlog. Expedited handling available — ask for current turnaround times on your quote."),
              ("Certified Translation", "Optional but coordinated in parallel, so your translation arrives together with the apostille as one complete, submission-ready package.")],
             ["fingerprint", "clock", "languages"])}
    <p style="margin-top:28px">{book_btn("Book an Appointment", "")}</p>
  </div>
</section>'''
    body += countries_explorer("Hague Apostille Member Countries (2025)", intro="Your FBI apostille is recognized in all 126 of the following countries. A single U.S. Department of State apostille is sufficient — no embassy legalization required.")
    body += faq_section(FBI_FAQ, tone="section--ivory")
    body += reasons_section(FBI_WHY, heading="One Provider, Fingerprint to Apostille", icons_=["fingerprint", "mail", "languages", "file-check"], tone="section--white")
    body += ready_block()
    body += cta_final()
    return page("/fbi-apostille-for-hague-countries/", "FBI Apostille for Hague Countries | Midwest Apostille & Notary",
                "Get your FBI background check authenticated for use in any Hague member country — from fingerprinting to finished, apostilled document.",
                body, active="resources", schema=[faq_schema(FBI_FAQ)], og_image="apostille-certificates")


# =========================================================================== FBI Attestation (non-Hague)
LEGAL_REASONS = [
    ("Employment &amp; Work Visa", "Employer sponsorship and most work permits require an attested background check from your home country."),
    ("Residency &amp; Long-Stay Visa", "Long-term residency, retirement, and golden visa programs commonly require attestation as part of the application."),
    ("Family Sponsorship", "Sponsoring a spouse or dependents often requires an attested police clearance from your country of origin."),
    ("Professional Licensing", "Licensed professions — healthcare, law, engineering — typically require attestation for credential recognition."),
    ("Business Registration", "Company formation, investment visa, and free-zone setup may require an attested background check."),
]
LEGAL_FAQ = [
    ("What is embassy legalization / attestation?", "Embassy legalization (also called attestation) is the process used for countries not in the Hague Apostille Convention. Instead of a single apostille, your FBI background check goes through two stages: first authenticated by the U.S. Department of State, then legalized by the destination country's embassy in Washington, DC."),
    ("Why can't I just use an apostille for these countries?", "An apostille is only valid for Hague Convention member countries. Non-Hague countries — including the UAE, Qatar, Kuwait, Egypt, and others on this list — do not recognize an apostille. Submitting an apostilled document to a non-Hague country will result in rejection."),
    ("Do I need a certified translation?", "Almost always, yes. Countries with Arabic as an official language require a certified Arabic translation alongside the document. Malaysia and Vietnam require translations in their respective languages. We prepare certified translations in-house and legalize them together with your report as one package."),
    ("What is the MOFA step?", "After U.S. legalization, most non-Hague countries require a final attestation by their Ministry of Foreign Affairs (MOFA) once the document arrives in-country. We prepare your documents so they're ready for that final step — we handle the entire U.S. side of the process."),
    ("How recent does my FBI check need to be?", "Most non-Hague countries expect a report issued within 3 to 6 months, but requirements vary by country and employer. Confirm the required window with your employer or the relevant authority before ordering."),
    ("Can I use a digital (PDF) FBI report?", "Yes. We accept the official FBI eDO electronic PDF, so you can start the process remotely from anywhere in the country without mailing paper originals first."),
]
LEGAL_WHY = [
    ("We Originate the FBI Check Too", "Many services can't. We capture fingerprints, obtain the report, then handle both legalization stages — one engagement, no hand-offs."),
    ("Nationwide, Start by Email", "We accept the official FBI eDO digital PDF, so you can begin from any state without mailing originals first."),
    ("Certified Translation In-House", "We prepare certified translations (Arabic, Spanish, French, and more) ourselves — your report and translation are legalized together as one accepted package."),
    ("Prepared Right the First Time", "A non-Hague legalization chain is costly to redo. We review every detail before each stage to avoid rejections and timeline delays."),
]


def fbi_attestation():
    body = page_hero(
        "FBI Background Check Attestation for Non-Hague Countries",
        "When your destination country is not a member of the Hague Apostille Convention, your FBI background check must go through a two-stage embassy legalization process — we handle the entire U.S. side, fingerprint to embassy.",
        [("FBI Attestation Legalization", None)], eyebrow_t="Embassy Legalization / Attestation", navy=True, map_bg=True,
        chain=[("landmark", "Step 1: U.S. Dept. of State Authentication"), ("building-2", "Step 2: Destination Embassy Legalization"), ("stamp", "Step 3: In-Country MOFA Attestation")],
        buttons=book_btn("Book an Appointment", "gold"),
        extra='''<dl class="facts" style="margin-top:10px">
          <div class="fact"><dt>Step 1 — Authenticated By</dt><dd>U.S. Department of State Office of Authentications</dd></div>
          <div class="fact"><dt>Step 2 — Legalized By</dt><dd>Destination Country Embassy, Washington DC</dd></div>
          <div class="fact"><dt>Step 3 — Final Attestation</dt><dd>Destination Country Ministry of Foreign Affairs</dd></div></dl>''')
    body += f'''
<section class="section section--white" aria-labelledby="wl-h">
  <div class="container">
    <div class="section-head section-head--split">
      <div>{eyebrow("Why Legalization, Not Apostille")}<h2 id="wl-h" data-split>Not every country accepts a simple apostille.</h2></div>
      <p class="lead">When your destination country is not a member of the 1961 Hague Apostille Convention, your FBI background check must go through a two-stage embassy legalization process — also called attestation. This process takes longer and costs more than a single apostille, but we sequence both stages for you and handle the entire U.S. side from fingerprint to embassy.</p>
    </div>
    <div class="compare" data-stagger>
      <article class="compare__card"><span class="doc-no">Hague Country (Apostille)</span><h3>Single Apostille</h3><p>One stamp from the U.S. Dept. of State. No embassy visit needed. Faster processing, lower cost. Accepted in 126 countries worldwide.</p></article>
      <article class="compare__card compare__card--hl on-dark"><span class="doc-no">Non-Hague Country (Attestation)</span><h3>Two-Stage Legalization</h3><p>U.S. Dept. of State authentication plus embassy legalization — then final MOFA attestation in-country. We manage the entire U.S. side for you.</p></article>
    </div>
    <div class="callout callout--warn" style="margin-top:18px">{icon("circle-help")}<div><strong>Important:</strong><p>Submitting an apostilled document to a non-Hague country will result in rejection. Countries like the UAE, Qatar, Kuwait, and Egypt require full embassy legalization — an apostille alone is not accepted.</p></div></div>
  </div>
</section>'''
    body += reasons_section(LEGAL_REASONS, heading="Common Reasons to Get Your FBI Check Attested", icons_=["briefcase", "map-pinned", "users-round", "badge-check", "building-2"],
                            intro="Non-Hague countries require a legalized background check from your country of citizenship for most long-stay, employment, and residency applications.")
    body += legal_route(link=False)
    # Crawlable country-by-country guide.
    guide = []
    for i, (name, _, embassy, translation, final, uses) in enumerate(LEGALIZATION):
        rows = f"<dt>Embassy</dt><dd>{embassy}</dd>" + (f"<dt>Translation</dt><dd>{translation}</dd>" if translation else "") + f"<dt>Final In-Country Step</dt><dd>{final}</dd>"
        guide.append(f'''<details class="acc" data-acc><summary><span class="doc-no">{i + 1:02d}</span><span>{name}</span><span class="acc__icon" aria-hidden="true"></span></summary>
          <div class="acc__body"><div class="acc__inner"><dl class="facts" style="background:transparent">{"".join(f'<div class="fact"><dt>{a}</dt><dd>{b}</dd></div>' for a, b in _pairs(rows))}</dl>
          <p><strong>Common Uses</strong></p>{check_list(uses, cols=True)}</div></div></details>''')
    body += f'''
<section class="section" aria-labelledby="bc-h">
  <div class="container faq">
    <div class="faq__head">{eyebrow("Country-by-Country Guide")}<h2 id="bc-h" data-split>FBI Background Check Attestation by Country</h2><p class="lead">Each non-Hague country has a specific embassy and requirements. Use this guide to understand what's needed for your destination.</p></div>
    <div class="accordion">{"".join(guide)}</div>
  </div>
</section>'''
    body += faq_section(LEGAL_FAQ, tone="section--ivory", hid="lfaq-h")
    body += reasons_section(LEGAL_WHY, heading="One Provider, Fingerprint to Embassy", icons_=["fingerprint", "mail", "languages", "file-check"], tone="section--white")
    body += ready_block()
    body += cta_final()
    return page("/fbi-attestation-legalization/", "FBI Attestation Legalization for Non-Hague Countries | Midwest Apostille & Notary",
                "When your destination country is not a member of the Hague Apostille Convention, your FBI background check must go through a two-stage embassy legalization process.",
                body, active="resources", schema=[faq_schema(LEGAL_FAQ)], og_image="international-route")


def _pairs(rows):
    import re
    return re.findall(r"<dt>(.*?)</dt><dd>(.*?)</dd>", rows)


# =========================================================================== Notary & Apostille (EN / ES)
def bilingual(lang):
    es = lang == "es"
    T = {
        "h1": "Apostilla y Notario del Medio Oeste – Servicios (English | Español)" if es else "Midwest Apostille &amp; Notary – Services (English | Español)",
        "lead": "Midwest Apostille &amp; Notary Services ofrece servicios confiables de notario y apostilla bilingües a nivel local y nacional." if es else "Midwest Apostille &amp; Notary Services offers trusted bilingual notary and apostille services locally and nationwide.",
        "n_h": "¿Necesita un notario confiable en Kansas City, Missouri o Kansas City, Kansas?" if es else "Notary Services in Kansas City and Surrounding Areas",
        "n_p": "¿Busca un notario confiable en Kansas City, Missouri o Kansas City, Kansas? En Midwest Apostille &amp; Notary Services, ofrecemos servicios de notarización confiables para:" if es else "Looking for a reliable notary in Kansas City, Missouri or Kansas City, Kansas? At Midwest Apostille &amp; Notary Services, we provide trusted notarisation for:",
        "n_l": ["Documentos legales", "Formularios de inmigración", "Poderes notariales", "Contratos y formularios escolares", "Servicios notariales móviles y en línea disponibles"] if es else ["Legal documents", "Immigration forms", "Power of attorney", "Contracts &amp; school forms", "Mobile and online notary services available"],
        "a_h": "Servicios de Apostilla en los 50 Estados" if es else "Apostille Services in All 50 States",
        "a_p": "¿Documentos para uso internacional? Nosotros nos encargamos de todo:" if es else "Need international document authentication? We handle the full process for:",
        "a_l": ["Actas de nacimiento", "Certificados de matrimonio", "Documentos escolares", "Poderes notariales", "Documentos comerciales"] if es else ["Birth certificates", "Marriage records", "School transcripts", "Business documents", "Power of attorney"],
        "a_f": "Entrega por mensajería disponible" if es else "Courier delivery options available",
        "m_h": "Formulario de Consentimiento de Viaje para Menores" if es else "Minor Travel Consent Form",
        "m_p": "¿Su hijo(a) viaja solo o con otro familiar? Notarizamos <strong>cartas de permiso de viaje para menores</strong>, necesarias para:" if es else "Is your child traveling alone or with someone other than a parent? We notarize <strong>minor travel consent forms</strong>, essential for:",
        "m_l": ["Vuelos nacionales", "Viajes internacionales"] if es else ["Domestic flights", "International travel"],
        "m_f": "Evite problemas en aeropuertos o aduanas." if es else "Prevent issues at airports or borders.",
        "b_h": "Reserve una sesión con nuestro equipo experimentado para recibir orientación experta." if es else "Book a Session with Our Experienced Team for Expert Guidance",
        "b_p": "¿Necesita un certificado de notario público y apostilla? ¡Contrate hoy mismo nuestros servicios certificados y de confianza!" if es else "Need a Public Notary and apostille certificate? Book Trusted, Certified Services Today!",
        "b_btn": "Programar una cita" if es else "Make an Appointment",
        "o_h": "Otros Servicios Frecuentes de Notaría" if es else "Other Popular Notary Services",
        "o_l": ["Declaraciones juradas", "Traducción y notarización de documentos", "Poder notarial (duradero, médico, limitado )", "Certificados escolares para estudiantes internacionales", "Formularios de inmigración"] if es else ["Affidavits and sworn statements", "Document translation + notarization", "Power of attorney (durable, medical, limited)", "School certificates for international students", "Immigration form notarization"],
        "crumb": "Servicios de Notaría y Apostilla" if es else "Notary &amp; Apostille Services",
        "call": "Llamar" if es else "Call",
        "eyebrow": "Español | English" if es else "English | Español",
        "switch": ("English", "/notary-apostille-services/", "en") if es else ("Español", "/servicios-de-notaria-y-apostilla/", "es"),
    }
    sw = T["switch"]
    switch_btn = f'<a class="btn btn--ghost" href="{sw[1]}" hreflang="{sw[2]}" lang="{sw[2]}">{icon("languages")}{sw[0]}</a>'
    body = page_hero(T["h1"], T["lead"], [(T["crumb"], None)], image="notary-agreement",
                     alt="Notario y cliente dándose la mano sobre documentos firmados" if es else "Notary and client shaking hands over signed documents",
                     eyebrow_t=T["eyebrow"], buttons=book_btn("Book Now", href=APPT) + switch_btn)
    body += f'''
<section class="section section--white" aria-labelledby="bn-h">
  <div class="container two-col">
    <div class="stack-copy">{eyebrow("Notary" if not es else "Notaría")}<h2 id="bn-h" data-split>{T["n_h"]}</h2><p>{T["n_p"]}</p>{check_list(T["n_l"])}</div>
    <div class="media-frame">{img("notary-consultation", "", "(min-width: 1024px) 45vw, 100vw")}</div>
  </div>
</section>
<section class="section" aria-labelledby="ba-h">
  <div class="container two-col two-col--rev">
    <div class="stack-copy">{eyebrow("Apostille" if not es else "Apostilla")}<h2 id="ba-h" data-split>{T["a_h"]}</h2><p>{T["a_p"]}</p>{check_list(T["a_l"])}<p class="tag" style="justify-self:start">{icon("truck")}{T["a_f"]}</p></div>
    <div class="media-frame">{img("apostille-certificates", "", "(min-width: 1024px) 45vw, 100vw")}</div>
  </div>
</section>
<section class="section section--white" aria-labelledby="bm-h">
  <div class="container two-col">
    <div class="stack-copy">{eyebrow("Travel" if not es else "Viajes")}<h2 id="bm-h" data-split>{T["m_h"]}</h2><p>{T["m_p"]}</p>{check_list(T["m_l"])}<p class="lead">{T["m_f"]}</p></div>
    <div class="media-frame media-frame--tall">{img("minor-travel", "Niña viajando con su maleta en un aeropuerto" if es else "Child travelling with a suitcase through an airport", "(min-width: 1024px) 45vw, 100vw")}</div>
  </div>
</section>'''
    body += booking_band(T["b_p"], T["b_h"], T["b_btn"], href=APPT)
    body += f'''
<section class="section" aria-labelledby="bo-h">
  <div class="container">
    <div class="section-head"><div>{eyebrow("Notary" if not es else "Notaría")}<h2 id="bo-h" data-split>{T["o_h"]}</h2></div></div>
    {reasons([(x, "") for x in T["o_l"]], ["scale", "languages", "signature", "graduation-cap", "file-check"])}
  </div>
</section>'''
    body = body.replace("<p></p></article>", "</article>")
    body += cta_final(heading="Obtenga claridad antes de enviar sus documentos." if es else "Get clarity before you send your documents.",
                      text=T["b_p"], label=T["b_btn"], href=APPT)
    if es:
        return page("/servicios-de-notaria-y-apostilla/", "Servicios de Notaría y Apostilla | Midwest Apostille & Notary",
                    "Midwest Apostille & Notary Services ofrece servicios confiables de notario y apostilla bilingües a nivel local y nacional.",
                    body, active="resources", lang="es", lang_alt=ES_PAIR + ("es",), og_image="notary-agreement")
    return page("/notary-apostille-services/", "Notary & Apostille Services | Midwest Apostille & Notary",
                "Midwest Apostille & Notary Services offers trusted bilingual notary and apostille services locally and nationwide.",
                body, active="resources", lang_alt=ES_PAIR + ("en",), og_image="notary-agreement")


# =========================================================================== Jail notary (EN / ES)
def jail(lang):
    es = lang == "es"
    if es:
        T = dict(
            h1="Servicios de Notaría Móvil en Cárceles de Kansas City",
            h4="Notarizaciones el Mismo Día para Reclusos en los Condados de Jackson y Wyandotte",
            lead="Servicio Notarial Profesional, Rápido y Discreto – Directamente en la Cárcel.",
            serve="Atendiendo Kansas y Missouri | Disponible en Noches, Fines de Semana y Días Festivos",
            call="Llame o Envíe un Mensaje", email="Correo Electrónico",
            about_p="Ofrecemos servicios de notaría móvil en cárceles, diseñados para familias, abogados y seres queridos de personas encarceladas en Kansas City.",
            about_l=["Visitamos directamente la cárcel – no se necesita trasladar al recluso.",
                     "Notarizamos: Poderes notariales (POA), declaraciones juradas, declaraciones, autorizaciones de reclusos y más.",
                     "Disponibles por las noches, fines de semana y días festivos.",
                     "Con la confianza de las familias de Kansas City por nuestro servicio profesional y discreto."],
            who_h="A Quién Ayudamos", serve_h="Atendemos a",
            who_l=["Familiares que necesitan poderes legales en situaciones de emergencia.", "Abogados que requieren firmas rápidas de reclusos.",
                   "Seres queridos que necesitan documentos importantes firmados por una persona encarcelada."],
            who_p="Ya sea un Poder Notarial, una declaración para el tribunal o una autorización, lo manejamos de manera rápida, compasiva y profesional.",
            jails_h="Cárceles que Atendemos",
            jails=["Centro de Detención del Condado de Jackson", "Cárcel del Condado de Wyandotte", "Centro de Detención para Adultos del Condado de Johnson",
                   "Cárcel del Condado de Clay", "Otros centros de detención en el área de Kansas City (a solicitud)"],
            b_h="Reserve una sesión con nuestro equipo experimentado para recibir orientación experta.",
            b_p="¿Necesita un certificado de notario público y apostilla? ¡Contrate hoy mismo nuestros servicios certificados y de confianza!",
            b_btn="Programar una cita", why_h="Por Qué Elegirnos",
            why=[("Respuesta Rápida", "Citas el mismo día y por la tarde."), ("Expertos Locales", "Conocemos a fondo los sistemas carcelarios de Kansas City."),
                 ("Servicio Móvil", "Vamos directamente a la cárcel."), ("Discreto y Confiable", "Atención privada y profesional."),
                 ("Precios Asequibles", "Tarifas planas y transparentes.")],
            price_h="Precios",
            prices=[("Condado de Jackson (antes de las 6 PM)", "$79", ""), ("Condado de Wyandotte (antes de las 6 PM)", "$99", ""),
                    ("Después de las 6 PM (cualquier condado)", "$200", "tarifa fija (incluye 1 notarización + traslado)"),
                    ("Documentos adicionales", "+$10", "cada uno"), ("Tiempo de espera extra (después de 30 min)", "+$20", "por cada 30 minutos"),
                    ("Testigo (si es necesario)", "+$20", "")],
            how_h="Cómo Funciona",
            how=["Contáctenos con el nombre del recluso, la ubicación y el tipo de documento.", "Confirme el precio y la hora de la cita.",
                 "Realice el pago del depósito a través de Cash App o Zelle.", "Visitamos la cárcel y realizamos la notarización.",
                 "Los documentos se le devuelven o se envían según sea necesario."],
            faq_h="Preguntas Frecuentes",
            faq=[("¿Qué necesito para programar una notaría en la cárcel?", "El nombre completo del recluso, el centro de detención, el tipo de documento y la hora de la cita."),
                 ("¿Puede firmar el recluso sin identificación?", "Sí, la mayoría de las cárceles aceptan brazaletes del recluso o identificación interna (llame para confirmar)."),
                 ("¿Necesito estar presente?", "No siempre. Podemos coordinar directamente con el personal de la cárcel según el documento.")],
            crumb="Notaría en Cárceles de Kansas City", switch=("English", "/jail-notary-kansas-city/", "en"), about_h="Sobre nosotros",
        )
    else:
        T = dict(
            h1="Mobile Jail Notary Services in Kansas City",
            h4="Same-Day Notarizations for Inmates in Jackson &amp; Wyandotte Counties",
            lead="Professional, Fast &amp; Discreet Notary Services – Right at the Jail.",
            serve="Serving Kansas &amp; Missouri | Evenings, Weekends &amp; Holidays Available",
            call="Call or Text Now", email="Email",
            about_p="We offer fully mobile jail notary services designed for families, attorneys, and loved ones of incarcerated individuals in Kansas City.",
            about_l=["We visit the jail directly – no need for inmate transport.",
                     "We notarize: Power of Attorney (POA), affidavits, declarations, inmate authorizations, and more.",
                     "Available evenings, weekends, and holidays.", "Trusted by Kansas City families for professional, discreet service."],
            who_h="Who We Help", serve_h="We Serve",
            who_l=["Family members needing legal powers in emergencies.", "Attorneys who require fast inmate signatures.",
                   "Loved ones needing important documents signed by an incarcerated person."],
            who_p="Whether it’s a <strong>Power of Attorney</strong>, court declaration, or authorization— we handle it <strong>quickly, compassionately, and professionally</strong>.",
            jails_h="Jails We Serve",
            jails=["Jackson County Detention Center", "Wyandotte County Jail", "Johnson County Adult Detention", "Clay County Jail", "Other Kansas City area facilities (upon request)"],
            b_h="Book a Session with Our Experienced Team for Expert Guidance",
            b_p="Need a Public Notary and apostille certificate? Book Trusted, Certified Services Today!",
            b_btn="Make an Appointment", why_h="Why Choose Us",
            why=[("Fast Response", "Same-day &amp; evening appointments."), ("Local Experts", "We know KC jail systems inside and out."),
                 ("Mobile Service", "We go directly to the jail."), ("Discreet &amp; Reliable", "Private, professional handling."),
                 ("Affordable", "Transparent, flat-rate pricing.")],
            price_h="Pricing",
            prices=[("Jackson County (before 6 PM)", "$79", ""), ("Wyandotte County (before 6 PM)", "$99", ""),
                    ("After 6 PM (any county)", "$200", "flat (incl. 1 notarization + travel)"), ("Additional Documents", "+$10", "each"),
                    ("Extra Wait Time (after 30 mins)", "+$20", "per 30 mins"), ("Witness (if required)", "+$20", "")],
            how_h="How It Works",
            how=["Contact us with inmate’s name, location, and document type.", "Confirm pricing and time.", "Pay deposit via Cash App or Zelle.",
                 "We visit the jail and complete notarization.", "Documents are returned or forwarded as needed."],
            faq_h="FAQs",
            faq=[("What do I need to book a jail notary?", "Inmate’s full name, facility, document type, and appointment time."),
                 ("Can inmates sign without ID?", "Yes, most jails accept inmate wristbands or internal ID (call to confirm)."),
                 ("Do I need to be present?", "Not always. We coordinate with jail staff when appropriate.")],
            crumb="Jail Notary Kansas City", switch=("Español", "/notaria-en-carceles-de-kansas-cit/", "es"), about_h="About Us",
        )
    sw = T["switch"]
    contact_line = (f'<p class="hero-chain" style="display:flex;flex-wrap:wrap;gap:10px">'
                    f'<a class="btn btn--sm btn--ghost btn--wrap" href="{JAIL_TEL}">{icon("phone")}{T["call"]}: {JAIL_PHONE}</a>'
                    f'<a class="btn btn--sm btn--ghost btn--wrap" href="mailto:{EMAIL}">{icon("mail")}{T["email"]}: {EMAIL}</a></p>')
    body = page_hero(T["h1"], T["lead"], [(T["crumb"], None)], image="jail-notary", alt=("Mazo y balanza de la justicia sobre un escritorio durante una consulta legal" if es else "Gavel and scales of justice on a desk during a legal consultation"), eyebrow_t=T["h4"],
                     tag=("clock", T["serve"]),
                     buttons=book_btn("Book Now", href=APPT) + f'<a class="btn btn--ghost" href="{sw[1]}" hreflang="{sw[2]}" lang="{sw[2]}">{icon("languages")}{sw[0]}</a>',
                     extra=contact_line)
    rows = "".join(f'<tr><th scope="row">{a}</th><td>{b}{f"<small>{c}</small>" if c else ""}</td></tr>' for a, b, c in T["prices"])
    steps = "".join(f"<li><p>{s}</p></li>" for s in T["how"])
    body += f'''
<section class="section section--white" aria-labelledby="ja-h">
  <div class="container two-col">
    <div class="stack-copy">{eyebrow(T["about_h"])}<h2 id="ja-h" data-split>{T["lead"]}</h2><p class="lead">{T["about_p"]}</p>{check_list(T["about_l"])}</div>
    <div class="media-frame media-frame--tall">{img("notary-gavel", "", "(min-width: 1024px) 45vw, 100vw")}</div>
  </div>
</section>
<section class="section" aria-labelledby="jw-h">
  <div class="container">
    <div class="section-head"><div>{eyebrow(T["who_h"])}<h2 id="jw-h" data-split>{T["serve_h"]}</h2></div></div>
    <div class="two-col" style="align-items:start">
      <div class="stack-copy">{check_list(T["who_l"])}<p class="lead">{T["who_p"]}</p></div>
      <div class="stack-copy"><h3>{T["jails_h"]}</h3>{feature_list(T["jails"], cols=False)}</div>
    </div>
  </div>
</section>'''
    body += booking_band(T["b_p"], T["b_h"], T["b_btn"], href=APPT, bg="jail-notary")
    body += reasons_section(T["why"], heading=T["why_h"], icons_=["zap", "map-pin", "car", "lock", "badge-check"], tone="section--white")
    body += f'''
<section class="section" aria-labelledby="jp-h">
  <div class="container two-col" style="align-items:start">
    <div class="stack-copy">
      {eyebrow(T["price_h"])}<h2 id="jp-h" data-split>{T["price_h"]}</h2>
      <table class="price-table" data-reveal><caption class="sr-only">{T["price_h"]}</caption><tbody>{rows}</tbody></table>
    </div>
    <div class="stack-copy">
      {eyebrow(T["how_h"])}<h2 data-split>{T["how_h"]}</h2>
      <ol class="steps-h" role="list" style="grid-template-columns:1fr" data-stagger>{steps}</ol>
    </div>
  </div>
</section>'''
    body += faq_section(T["faq"], heading=T["faq_h"], eyebrow_t=T["faq_h"], tone="section--ivory")
    body += cta_final(heading="Obtenga claridad antes de enviar sus documentos." if es else "Get clarity before you send your documents.",
                      text=T["b_p"], label=T["b_btn"], href=APPT)
    if es:
        return page("/notaria-en-carceles-de-kansas-cit/", "Notaría en Cárceles de Kansas City | Midwest Apostille & Notary",
                    "Notarizaciones el Mismo Día para Reclusos en los Condados de Jackson y Wyandotte", body, active="resources", lang="es",
                    lang_alt=JAIL_PAIR + ("es",), schema=[faq_schema(T["faq"])], og_image="jail-notary")
    return page("/jail-notary-kansas-city/", "Jail Notary Kansas City | Midwest Apostille & Notary",
                "Professional, Fast & Discreet Notary Services – Right at the Jail.", body, active="services",
                lang_alt=JAIL_PAIR + ("en",), schema=[faq_schema(T["faq"])], og_image="jail-notary")


# =========================================================================== Blog posts
def article(path, title, desc, crumb, image, sections, og, lead=""):
    toc = "".join(f'<li><a href="#{sid}">{h}</a></li>' for sid, h, _ in sections)
    content = "".join(f'<h2 id="{sid}">{h}</h2>{b}' for sid, h, b in sections)
    body = '<div class="reading-progress" data-reading aria-hidden="true"></div>'
    body += page_hero(esc(title), lead, [(crumb, None)], image=image, alt="", eyebrow_t="Blog")
    body += f'''
<section class="section section--white" style="padding-top:clamp(2.5rem,1.5rem+3vw,4.5rem)">
  <div class="container article">
    <nav class="toc" aria-labelledby="toc-h" data-toc><h2 id="toc-h">On this page</h2><ol role="list">{toc}</ol></nav>
    <article class="prose" data-article>{content}</article>
  </div>
</section>'''
    body += cta_final()
    return page(path, title + " - Midwest", desc, body, active="resources", og_image=og)


def ul(items, cols=False):
    return ('<ul class="cols">' if cols else "<ul>") + "".join(f"<li>{x}</li>" for x in items) + "</ul>"


def blog_urgent():
    sections = [
        ("inmates", "Mobile Notary for Inmates – Jackson County Jail &amp; Correctional Facilities",
         "<p>Need a document notarized for someone in custody at Jackson County Jail or any nearby detention center?</p>"
         "<p>Midwest Apostille &amp; Notary Service provides fast, secure, and legally compliant jail notary services in the Kansas City metro. We work with public defenders, families, and legal professionals to provide:</p>"
         + ul(["Power of Attorney for inmates", "Custody affidavits and declarations", "Legal affidavits and sworn statements", "Release of property or inmate authorization forms"])
         + "<h3>Facilities we serve:</h3>"
         + ul(["Jackson County Detention Center (CJC)", "Clay County Jail", "Platte County Jail", "Cass County Detention Center", "Wyandotte County Adult Detention Center", "Kansas City Municipal Correctional Institution"])
         + '<p>We coordinate directly with jail administration to ensure access, ID verification, and security clearance.</p><p><a href="/jail-notary-kansas-city/">Jail Notary Kansas City</a></p>'),
        ("hospitals", "Emergency Notary for Hospitals – Kansas City Area",
         "<p>In times of medical crisis, families often need urgent documents notarized at the bedside. We offer emergency hospital notary services with professionalism and compassion.</p><h3>We notarize:</h3>"
         + ul(["Durable and medical power of attorney (POA)", "Advance directives and living wills", "Health care proxy forms", "Consent for treatment or surgery", "Court-ordered or immigration forms"])
         + "<h3>We travel to all major hospitals and care centers in the metro:</h3>"
         + ul(["Truman Medical Center (University Health)", "Saint Luke’s Hospital (Plaza &amp; North)", "North Kansas City Hospital", "Research Medical Center", "Menorah Medical Center", "KU Medical Center", "AdventHealth Shawnee Mission", "Children’s Mercy Hospital", "Liberty Hospital", "Rehabilitation and hospice centers"], cols=True)),
        ("after-hours", "After-Hours &amp; 24/7 Mobile Notary – Kansas City Open Late",
         "<p>Can’t find a notary after 6 PM or during weekends? We provide after-hours and 24/7 notary services throughout Kansas City and surrounding cities.</p><h3>Our services include:</h3>"
         + ul(["Travel consent forms", "Time-sensitive legal documents", "Real estate and loan closings", "Power of attorney and affidavits", "Notarizations for jail and hospital visits"])
         + "<p>Our on-demand mobile notary service covers evenings, weekends, and holidays. Text us to confirm availability.</p>"),
        ("apostille", "Need Apostille Services or Custodian Document Certification?",
         '<p>We also offer certified apostille services and custodian of record certifications for use in foreign countries.</p><p><a href="/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/">Learn More</a></p>'),
        ("why", "Why Choose Midwest Apostille &amp; Notary Service?",
         ul(["100+ verified 5-star reviews on Google", "HIPAA-compliant, jail-cleared, and Missouri commissioned", "Same-day mobile and emergency appointments", "Remote Online Notary (RON) options available", "Parent company Midwest Identity Services offers full mobile notary, jail notary, and apostille services"])),
        ("schedule", "Schedule Your Mobile Notary Appointment Today",
         f'<p>Call/Text: <a href="{TEL}">{PHONE}</a><br>Book Online: <a href="/">https://midnotarypro.com/</a></p>'
         "<p>Serving all of Jackson County, Clay County, Platte County, Cass County, Wyandotte County, and the entire Kansas City metro area.</p><h3>Cities We Serve:</h3>"
         "<p>Kansas City, Independence, Raytown, Lee’s Summit, Blue Springs, Grandview, North Kansas City, Gladstone, Liberty, Belton, Raymore, Grain Valley, Oak Grove, Sugar Creek, Riverside, Parkville, Kearney, Harrisonville, Leawood, Overland Park, Shawnee, Merriam, Olathe, Mission, Roeland Park</p>"),
    ]
    return article("/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/",
                   "Urgent Notary Services in Kansas City: Jail, Hospital &amp; After-Hours Help".replace("&amp;", "&"),
                   "Need a document notarized for someone in custody at Jackson County Jail or any nearby detention center?",
                   "Urgent Notary Services in Kansas City", "jail-notary", sections, "jail-notary",
                   lead="Need a document notarized for someone in custody at Jackson County Jail or any nearby detention center?")


def blog_apostille():
    sections = [
        ("kansas-city", "Apostille Services in Kansas City – Birth Certificates, Custodian Documents &amp; More",
         "<p>Need to send U.S. documents overseas for immigration, study, marriage, or dual citizenship?</p>"
         "<p>At Midwest Apostille &amp; Notary Services, we help individuals, families, and attorneys get their documents certified through apostille or custodian verification — fast, legally, and accurately.</p>"
         "<p>We handle the full apostille process in Missouri, including:</p>"),
        ("document-types", "Common Apostille Document Types",
         ul(["Birth certificates (certified copies from MO Vital Records)", "Marriage certificates", "Divorce decrees", "Death certificates", "Custodian notarized documents", "Power of attorney", "School transcripts &amp; diplomas", "FBI background checks (via DOJ or federal apostille)", "Corporate records, articles of incorporation, IRS letters", "Single Status Affidavit / Affidavit of Law"], cols=True)
         + "<p>Our team ensures that your document is either:</p>" + ul(["Notarized and certified by the Secretary of State, or", "Submitted as a certified vital record (no notary needed)"])),
        ("countries", "Countries That Commonly Require Apostille Services",
         "<p>We provide apostille-ready documents for clients in Kansas City with family, legal, or business ties to countries that are part of the Hague Convention. These include:</p>"
         "<p>El Salvador, Nicaragua, Mexico, Morocco, Colombia, Ecuador, Brazil, Spain, Italy, France, Philippines, India, Peru, Chile, Ukraine</p>"
         "<p>We also support non-Hague countries that require authentication + embassy legalization, like:</p>"
         '<p>China, United Arab Emirates (UAE), Qatar, Egypt, Lebanon, Kuwait</p><p><a href="/apostille-services/#countries">Explore the country list</a></p>'),
        ("custodian", "What is a Custodian Document Certification?",
         "<p>A custodian of record document is a notarized declaration that verifies a copy of a document is a true and accurate reproduction of the original — often used for:</p>"
         + ul(["Diplomas", "Business licenses", "Medical records", "Legal documents you don’t want to submit in original form"])
         + "<p>Missouri requires that the custodian (holder of the document) sign a sworn statement that is notarized. This document can then be apostilled through the Secretary of State.</p>"
         "<p>We help you draft and notarize this statement properly, then process it for apostille.</p>"),
        ("faqs", "Apostille FAQs",
         "<h3>How to get a birth certificate apostille in Missouri?</h3><p>We can request your certified birth certificate and submit it to the Missouri Secretary of State for apostille. Processing takes 1–3 business days on average.</p>"
         "<h3>Do I need a notary for an apostille?</h3><p>Only for documents like POAs or affidavits. Certified vital records (birth, marriage, etc.) do not need to be notarized — they are submitted as originals.</p>"
         "<h3>Can I get an apostille for a document in Spanish?</h3><p>Yes — as long as it’s notarized in English, we can process the apostille. We also assist with translated documents for many countries.</p>"
         "<h3>Where do I get apostille services near me in Kansas City?</h3><p>Midwest Apostille &amp; Notary Services is your trusted apostille partner, serving Kansas City, Jackson County, Independence, North KC, and statewide.</p>"),
        ("process", "We Handle the Process, So You Don’t Have To",
         "<p>Whether you need a Missouri apostille for a birth certificate, a notarized affidavit, or a custodian certification, we make it simple.</p>"
         + ul(["We offer mail-in, drop-off, or pickup services for local clients", "We also offer FedEx and DHL international return shipping (available upon request)", "Same-day apostille processing available for urgent needs"])),
        ("contact", "Contact Us",
         f'<p>Call/Text to Begin: <a href="{TEL}">{PHONE}</a><br>Learn more or book online: <a href="/">https://midnotarypro.com/</a></p><p>Serving all of Kansas City + statewide apostille assistance available</p>'),
    ]
    return article("/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/",
                   "How to Get an Apostille in Kansas City: Birth Certificates, Custodian Documents & More",
                   "Need to send U.S. documents overseas for immigration, study, marriage, or dual citizenship?",
                   "How to Get an Apostille in Kansas City", "apostille-documents", sections, "apostille-documents",
                   lead="Need to send U.S. documents overseas for immigration, study, marriage, or dual citizenship?")


def build_all():
    return [about(), services(), service_redirect(), apostille(), notary(), docprep(), contact(), fbi_apostille(),
            fbi_attestation(), bilingual("en"), bilingual("es"), jail("en"), jail("es"), blog_urgent(), blog_apostille(), not_found()]

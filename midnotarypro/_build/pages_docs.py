"""Document pages: one page per document type clients search for (change list, section 3)."""
from components import cta_final, faq_section, page_hero, price_notes, price_table, rows, shead, state_prices
from facts import APOSTILLE_STD_TIME, KS_SAME, KS_STD, MO_SAME, MO_STD, OTHER_STD
from lib import call_btn, cta_btn, faq_schema, link, page, service_schema
from pages_new import sec

DOCS = [
    dict(path="/birth-certificate-apostille-missouri-kansas/", short="Birth Certificate",
         h1="Birth Certificate Apostille for Missouri and Kansas",
         title="Birth Certificate Apostille: Missouri & Kansas | Midwest",
         desc=f"Apostille for Missouri and Kansas birth certificates: which certified copy you need, how each state works, {MO_STD} Missouri and {KS_STD} Kansas, same day available.",
         lead="Apostille for Missouri birth certificates and Kansas birth certificates, for dual citizenship, residency, marriage abroad and adoption. We tell you which certified copy you need and can order it for you.",
         image="apostille-certificates", kw="birth certificate apostille Missouri Kansas",
         first=[("A certified copy, not a photocopy", "The apostille is placed on a certified copy issued by the state or a local vital records office. Hospital souvenir certificates and photocopies cannot be apostilled."),
                ("Recently issued, if your destination asks", "Some consulates want a copy issued in the last few months. We check that before you order."),
                ("Certified copy of a Missouri or Kansas birth certificate", "We can request the certified copy for you, then apostille it in the same order.")],
         mo="A certified copy from the Missouri Bureau of Vital Records in Jefferson City or any Missouri local public health agency. It goes straight to the Missouri Secretary of State; no notary is involved.",
         ks="A certified copy from the KDHE Office of Vital Statistics in Topeka. It goes to the Kansas Secretary of State for the Kansas birth certificate apostille; no notary is involved.",
         dest=["Mexico (registering Mexican nationality)", "Spain and Italy (citizenship by descent)", "Colombia and Venezuela", "The Philippines", "India", "China (family visas)"],
         faq=[("Can I apostille a birth certificate from another state?", f"Yes. A birth certificate from another state is apostilled by that state; we handle it for {OTHER_STD} standard. Texas birth certificates can be expedited."),
              ("Do I need a translation?", 'Usually, for non-English-speaking countries. We confirm whether it is done before or after the apostille. See <a href="/certified-translation-services/">certified translation</a>.'),
              ("Can you get the certified copy for me?", "Yes, for Missouri and Kansas births. We request it, apostille it and ship it in one order."),
              ("Do you handle adoption document apostilles?", "Yes. International adoption files usually include birth certificates, home studies, court orders and notarized statements. We apostille each one, or legalize them for non-Hague countries.")]),
    dict(path="/diploma-transcript-apostille/", short="Diploma &amp; Transcript",
         h1="Diploma and Transcript Apostille",
         title="Diploma & Transcript Apostille | Midwest Apostille & Notary",
         desc="Apostille for diplomas and transcripts from Missouri and Kansas schools and universities, for teaching English abroad, work visas and graduate study.",
         lead="Apostille for diplomas and transcripts, for teaching English abroad, work visas, graduate study and professional licensing. School records are apostilled through a notarized copy, and we prepare it for you.",
         image="document-preparation", kw="diploma apostille",
         first=[("A notarized copy from the school", "Most schools will have the registrar sign a copy in front of a notary. That notarization is what the Secretary of State authenticates."),
                ("Or a custodian statement", "If the school will not notarize, you sign a statement as custodian that the copy is true and complete, and we notarize it."),
                ("The version your destination accepts", "Some countries want the original diploma notarized, others a copy. We confirm which before you start.")],
         mo="Copies notarized by a Missouri notary are apostilled by the Missouri Secretary of State in Jefferson City.",
         ks="Copies notarized by a Kansas notary are apostilled by the Kansas Secretary of State in Topeka.",
         dest=["South Korea, China and Japan (apostille for teaching English abroad)", "Spain (student and work visas)", "UAE and Qatar (embassy legalization of degrees)", "Saudi Arabia (apostille for work visa)"],
         faq=[("Which state apostilles my diploma?", "The state where the notary who signed it is commissioned. A copy notarized in Missouri gets a Missouri apostille, even if the school is in another state."),
              ("Can you apostille an online or electronic transcript?", "A printed transcript can be apostilled through a notarized copy or custodian statement. We confirm your destination accepts that before you order."),
              ("My degree is for the UAE or Qatar.", 'Those countries need embassy legalization instead of an apostille. See <a href="/embassy-legalization-for-uae-kansas-city/">UAE</a> and <a href="/embassy-legalization-for-qatar-kansas-city/">Qatar</a>.')]),
    dict(path="/marriage-certificate-apostille/", short="Marriage Certificate",
         h1="Marriage Certificate Apostille",
         title="Marriage Certificate Apostille | Midwest Apostille & Notary",
         desc=f"Apostille for Missouri and Kansas marriage certificates: where to get the certified copy, how each state works, {MO_STD} Missouri, {KS_STD} Kansas, same day available.",
         lead="Apostille for marriage certificates, for residency and family visas, name changes abroad, citizenship by descent and apostille for marriage abroad when you need to prove your status.",
         image="notary-agreement", kw="marriage certificate apostille",
         first=[("A certified copy of the marriage certificate", "Not the decorative certificate from the ceremony. It must be a certified copy from the office that recorded the marriage."),
                ("For marriage abroad", "If you are getting married abroad, the foreign registry usually asks for a birth certificate and a single status affidavit instead. We prepare and notarize the affidavit and apostille both."),
                ("Translation", "Most non-English-speaking countries ask for a translation as well.")],
         mo="A certified copy from the Recorder of Deeds in the county where the license was issued, apostilled by the Missouri Secretary of State.",
         ks="A certified copy from the KDHE Office of Vital Statistics in Topeka, or from the district court that issued the license, apostilled by the Kansas Secretary of State.",
         dest=["Mexico and Colombia (registering the marriage)", "Spain and Italy (family visas and citizenship)", "The Philippines", "UAE, Egypt and Qatar (embassy legalization for family sponsorship)"],
         faq=[("I am getting married abroad. What do I need?", "Usually a birth certificate and a single status affidavit, both apostilled, and sometimes translated. We confirm the list with you for your destination."),
              ("Can I use the certificate from our ceremony?", "No. Only a certified copy issued by the recorder or the state can be apostilled."),
              ("How long does it take?", f"Missouri and Kansas certificates can be apostilled the same day when they reach us by the cutoff. Standard processing takes {APOSTILLE_STD_TIME}.")]),
    dict(path="/divorce-decree-apostille/", short="Divorce Decree",
         h1="Divorce Decree Apostille",
         title="Divorce Decree Apostille | Midwest Apostille & Notary",
         desc="Apostille for Missouri and Kansas divorce decrees and court documents, including Jackson County and Johnson County: certified copies, pricing and turnaround.",
         lead="Apostille for divorce decrees and other court documents, for remarriage abroad, name changes and citizenship applications. Includes court document apostilles for Jackson County and Johnson County.",
         image="notary-gavel", kw="divorce decree apostille",
         first=[("A certified copy from the court clerk", "The decree must be certified by the clerk of the court that granted it. A plain copy from your files cannot be apostilled."),
                ("The full decree, if asked", "Some countries want the complete decree rather than a short certificate. We confirm which before you order it."),
                ("Court document apostille", "The same route applies to custody orders, name change orders and other court documents.")],
         mo="A certified copy from the Circuit Clerk of the county where the divorce was granted, such as the Jackson County Circuit Court in Kansas City or Independence, apostilled by the Missouri Secretary of State.",
         ks="A certified copy from the clerk of the district court that granted the divorce, such as the Johnson County District Court in Olathe, apostilled by the Kansas Secretary of State.",
         dest=["Mexico, Colombia and the Philippines (remarriage)", "Spain and Italy (civil registry updates)", "India (property and family matters)"],
         faq=[("Can you apostille a Jackson County court document?", "Yes. Order a certified copy from the Jackson County Circuit Clerk and we submit it to the Missouri Secretary of State."),
              ("Can you apostille a Johnson County court document?", "Yes. Order a certified copy from the Johnson County District Court clerk in Olathe and we submit it to the Kansas Secretary of State."),
              ("Do I need a translation?", "Usually, for non-English-speaking countries. We confirm whether it happens before or after the apostille.")]),
    dict(path="/power-of-attorney-apostille/", short="Power of Attorney",
         h1="Power of Attorney Apostille",
         title="Power of Attorney Apostille | Midwest Apostille & Notary",
         desc="Power of attorney apostille in Kansas City: we prepare, notarize and apostille your POA for property, banking and family matters abroad. Poder notarial welcome.",
         lead="Prepare, notarize and apostille a power of attorney for property, banking, inheritance or family matters abroad, including a poder notarial for Mexico and Latin America.",
         image="notary-signing", kw="power of attorney apostille",
         first=[("A properly worded document", "The receiving country may need specific powers, names exactly as on passports, or a bilingual format. We format it for notarization and apostille. We do not give legal advice."),
                ("Signed in front of a notary", "In our office, at your location in the Kansas City area with our mobile notary, or online by remote online notary."),
                ("Then the apostille", "The notary’s signature is authenticated by the Secretary of State of the state where the notary is commissioned.")],
         mo="Signed in front of a Missouri notary (in our office or by remote online notary), then apostilled by the Missouri Secretary of State.",
         ks="Signed in front of a Kansas notary, then apostilled by the Kansas Secretary of State. Kansas notarized documents are apostilled in Topeka.",
         dest=["Mexico, Honduras, Colombia and Venezuela (poder notarial)", "Spain and Italy (property and inheritance)", "The Philippines (special power of attorney)", "India (property)"],
         faq=[("Can you write the power of attorney for me?", 'We prepare and format the document from your instructions, but we do not give legal advice. See <a href="/document-preparation-services/">document preparation</a>.'),
              ("Can I sign online?", "Yes. Remote online notarization works from anywhere, and the notarized document can then be apostilled."),
              ("Does it need a translation?", "Often. A bilingual power of attorney or a certified translation may be required by the receiving office.")]),
    dict(path="/business-document-apostille/", short="Business Document",
         h1="Business Document Apostille",
         title="Business Document Apostille | Midwest Apostille & Notary",
         desc="Business document apostille: certificates of good standing, articles of incorporation, corporate resolutions and IRS letters, for Missouri, Kansas and more.",
         lead="Apostille for articles of incorporation, certificates of good standing, corporate resolutions and other company records, for opening a branch, a bank account or a contract abroad.",
         image="notary-agreement", kw="certificate of good standing apostille",
         first=[("State-issued records", "Certificates of good standing and certified articles of incorporation are issued by the Secretary of State and apostilled directly."),
                ("Company-signed documents", "Resolutions, powers of attorney and letters signed by an officer are notarized first, then apostilled."),
                ("Federal documents", "IRS letters and other federal records are authenticated by the U.S. Department of State instead of a state office.")],
         mo="A certificate of good standing or certified articles from the Missouri Secretary of State, or a company document notarized by a Missouri notary, apostilled in Jefferson City.",
         ks="A certificate of good standing or certified articles from the Kansas Secretary of State, or a company document notarized by a Kansas notary, apostilled in Topeka.",
         dest=["China (company registration and contracts)", "Mexico and Colombia (subsidiaries and bank accounts)", "UAE and Qatar (embassy legalization for business setup)", "India (branch offices)"],
         faq=[("Can you order the certificate of good standing for us?", "Yes, for Missouri and Kansas companies. We request it and apostille it in one order."),
              ("Our company is registered in Delaware. Can you help?", f"Yes. Documents issued by other states are apostilled by that state, for {OTHER_STD} standard."),
              ("We send documents abroad every month.", 'See <a href="/business-accounts/">business accounts</a> for monthly invoicing and volume pricing.')]),
]


def doc_page(d):
    path = d["path"]
    crumbs = [("Apostille Services", "/apostille-services/"), (d["short"] + " Apostille", path)]
    body = page_hero(d["h1"], d["lead"], crumbs, image=d["image"], alt="Documents with seals ready for apostille", lab="Apostille by document",
                     buttons=cta_btn() + call_btn())
    body += sec("01", "What you need first", "Start with the right version of the document.", "first-h", rows(d["first"], cls="rows--3"))
    body += sec("02", "Missouri and Kansas", "How it works in each state.", "mk-h", rows([
        ("Missouri", d["mo"]), ("Kansas", d["ks"])], cls="rows--2"), tone="section--paper")
    body += sec("03", "Pricing and turnaround", f"Missouri {MO_STD}, Kansas {KS_STD}.", "dprice-h",
                price_table(rows=state_prices("Missouri") + state_prices("Kansas") + state_prices("All other")) + price_notes()
                + f'<p class="fine">Same day: {MO_SAME} Missouri, {KS_SAME} Kansas. Standard processing takes {APOSTILLE_STD_TIME}. {link("Full price list", "/pricing/")}</p>')
    dest = "".join(f"<li>{x}</li>" for x in d["dest"])
    body += sec("04", "Destinations", "Where clients send it.", "dest-h",
                f'<div class="prose-block"><ul>{dest}</ul><p>Hague Convention countries accept an apostille. Others need embassy legalization. {link("Check your destination", "/apostille-services/#countries")}</p></div>',
                tone="section--bone")
    body += faq_section(d["faq"], num="05", heading="Questions.")
    body += cta_final()
    return page(path, d["title"], d["desc"], body, active="services", crumbs=crumbs, og_image=d["image"], keyword=d["kw"],
                schema=[service_schema(path, d["h1"], d["lead"], "Apostille services"), faq_schema(path, d["faq"])])


def build_all():
    return [doc_page(d) for d in DOCS]

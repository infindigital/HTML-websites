"""Statewide apostille pages (Missouri, Kansas) and city pages.

One office (8101 E. Bannister Rd., Kansas City, MO). Apostille and remote online notary are available statewide;
mobile notary and jail notary are Kansas City metro only (change list, section 3). Every city page has its own
content: how clients there send documents, where certified copies are issued locally, pricing and turnaround.
"""
from components import checklist, cta_final, faq_section, page_hero, price_notes, price_table, rows, shead, state_prices
from facts import APOSTILLE_STD_TIME, KS_SAME, KS_STD, MO_SAME, MO_STD, SHIP_US
from lib import ADDRESS, NO_ADVICE, call_btn, cta_btn, faq_schema, link, page, service_schema
from pages_new import sec

METRO_NOTE = "Mobile notary and jail notary are available in the Kansas City metro only."

STATES = {
    "MO": dict(
        name="Missouri", path="/missouri-apostille-services/", sos="Missouri Secretary of State", capital="Jefferson City",
        std=MO_STD, same=MO_SAME, cutoff="1 PM",
        docs=[
            ("Birth certificates", "Certified copies issued by the Missouri Bureau of Vital Records in Jefferson City or by a Missouri local public health agency.", "/birth-certificate-apostille-missouri-kansas/"),
            ("Marriage certificates", "Certified copies from the Recorder of Deeds in the county where the marriage license was issued.", "/marriage-certificate-apostille/"),
            ("Divorce decrees", "Certified copies from the Circuit Clerk of the court that granted the divorce.", "/divorce-decree-apostille/"),
            ("Diplomas and transcripts", "A copy notarized by a school official, or a custodian statement we prepare and notarize.", "/diploma-transcript-apostille/"),
            ("Powers of attorney", "Signed in front of a Missouri notary, in our office, at your location in the Kansas City area, or online.", "/power-of-attorney-apostille/"),
            ("Business documents", "Certificates of good standing and articles of incorporation issued by the Missouri Secretary of State.", "/business-document-apostille/"),
        ],
        faq=[
            ("Where do I get an apostille in Missouri?", "Missouri apostilles are issued by the Missouri Secretary of State in Jefferson City. You can submit documents yourself, or send them to us and we handle the request, the return shipping and any notarization or certified copy the document needs first."),
            ("Can I get a same-day apostille in Missouri?", f"Yes. Missouri documents received by 1 PM are apostilled the same day for {MO_SAME}. Standard processing is {MO_STD} and takes {APOSTILLE_STD_TIME}."),
            ("Do you have offices in other Missouri cities?", f"No. We have one office, at {ADDRESS}. Clients anywhere in Missouri mail their documents to us and we return them by tracked FedEx."),
            ("Is Midwest Apostille &amp; Notary part of the Secretary of State’s office?", "No. We are a private document service and are not affiliated with any government agency. We prepare and submit documents to the Secretary of State for you."),
        ],
    ),
    "KS": dict(
        name="Kansas", path="/kansas-apostille-services/", sos="Kansas Secretary of State", capital="Topeka",
        std=KS_STD, same=KS_SAME, cutoff="10 AM",
        docs=[
            ("Birth certificates", "Certified copies issued by the Kansas Department of Health and Environment (KDHE) Office of Vital Statistics in Topeka.", "/birth-certificate-apostille-missouri-kansas/"),
            ("Marriage certificates", "Certified copies from KDHE Vital Statistics, or from the district court that issued the license.", "/marriage-certificate-apostille/"),
            ("Divorce decrees", "Certified copies from the clerk of the district court that granted the divorce.", "/divorce-decree-apostille/"),
            ("Diplomas and transcripts", "A copy notarized by a school official, or a custodian statement we prepare and notarize.", "/diploma-transcript-apostille/"),
            ("Kansas notarized documents", "Powers of attorney, affidavits and consent letters signed in front of a Kansas notary.", "/power-of-attorney-apostille/"),
            ("Business documents", "Certificates of good standing and articles of incorporation issued by the Kansas Secretary of State.", "/business-document-apostille/"),
        ],
        faq=[
            ("Where do I get an apostille in Kansas?", "Kansas apostilles are issued by the Kansas Secretary of State in Topeka. Send your document to us and we handle the request, any certified copy or notarization it needs first, and the return shipping."),
            ("Can I get a same-day Kansas apostille?", f"Yes. Kansas documents received by 10 AM are apostilled the same day for {KS_SAME}. Standard processing is {KS_STD} and takes {APOSTILLE_STD_TIME}."),
            ("Do you have an office in Kansas?", f"No. We have one office, at {ADDRESS}, in the Kansas City metro. Clients across Kansas mail documents to us; Johnson and Wyandotte County clients can also drop them off."),
            ("My document was notarized in Missouri. Can Kansas apostille it?", "No. A notarized document is apostilled by the state where the notary is commissioned. A Missouri notarization gets a Missouri apostille, and a Kansas notarization gets a Kansas apostille."),
        ],
    ),
}

# Each city: county, metro or not, how documents reach us, where records come from locally, local context, FAQ.
CITIES = [
    dict(slug="st-louis-mo", city="St. Louis", st="MO", county="St. Louis City and St. Louis County", metro=False,
         lead="Apostille service for St. Louis documents, handled by mail from our Kansas City office: birth and marriage records, court documents, university diplomas and business records.",
         send="St. Louis clients mail their documents to our Kansas City office by USPS, FedEx or UPS with tracking. We confirm the route before you ship, apostille the document through the Missouri Secretary of State, and send it back by tracked FedEx.",
         records=[("Birth certificates", "Any Missouri local public health or vital records office, including those serving St. Louis City and St. Louis County, issues certified copies of Missouri birth certificates. The Bureau of Vital Records in Jefferson City does too."),
                  ("Marriage certificates", "The City of St. Louis Recorder of Deeds, or the St. Louis County Recorder of Deeds in Clayton, depending on where the license was issued."),
                  ("Divorce decrees", "The Circuit Clerk in St. Louis City or in St. Louis County (Clayton), wherever the divorce was granted.")],
         local="St. Louis is home to Washington University in St. Louis and Saint Louis University, and we regularly apostille diplomas and transcripts for graduates heading abroad to teach, study or work.",
         faq=[("Is there a Midwest Apostille office in St. Louis?", "No. We have one office, in Kansas City. St. Louis clients send documents by mail, and we return them by tracked FedEx."),
              ("Is the City of St. Louis the same as St. Louis County for records?", "No. They are separate jurisdictions with separate recorders and courts. Order your certified copy from the one where the record was filed; we check it before it goes to the Secretary of State.")]),
    dict(slug="columbia-mo", city="Columbia", st="MO", county="Boone County", metro=False,
         lead="Apostille service for Columbia and Boone County documents: University of Missouri diplomas and transcripts, birth and marriage records, and powers of attorney, sent to us by mail.",
         send="Columbia clients mail documents to our Kansas City office with tracking. Students and graduates often order transcripts sent straight to us; we check the notarization and submit them to the Missouri Secretary of State.",
         records=[("Birth certificates", "Columbia/Boone County Public Health and Human Services issues certified Missouri birth certificates, as does the Bureau of Vital Records in Jefferson City."),
                  ("Marriage certificates", "The Boone County Recorder of Deeds in Columbia."),
                  ("Divorce decrees", "The Circuit Clerk at the Boone County Courthouse in Columbia.")],
         local="Columbia is home to the University of Missouri, Columbia College and Stephens College. Diplomas and transcripts are the most common documents we receive from Columbia, usually for teaching English abroad or graduate study overseas.",
         faq=[("Can the University of Missouri send my transcript directly to you?", "Yes. Ask the registrar to send a notarized copy, or an official transcript we can pair with a notarized custodian statement, to our office. We confirm which version your destination accepts before you order."),
              ("Do you offer mobile notary in Columbia?", f"No. {METRO_NOTE} For Columbia, documents can be notarized by remote online notary, then apostilled.")]),
    dict(slug="springfield-mo", city="Springfield", st="MO", county="Greene County", metro=False,
         lead="Apostille service for Springfield and Greene County: birth and marriage certificates, Missouri State University records, powers of attorney and business documents, by mail.",
         send="Springfield clients mail their documents to us with tracking, or order certified copies sent directly to our office. We submit them to the Missouri Secretary of State and return them by tracked FedEx.",
         records=[("Birth certificates", "The Springfield-Greene County Health Department issues certified Missouri birth certificates, as does the Bureau of Vital Records in Jefferson City."),
                  ("Marriage certificates", "The Greene County Recorder of Deeds in Springfield."),
                  ("Divorce decrees", "The Greene County Circuit Clerk in Springfield.")],
         local="Springfield is home to Missouri State University and Drury University, and to many employers that send staff overseas, so we see a mix of school records, employment letters and corporate documents.",
         faq=[("How do Springfield clients get same-day service?", "Ship your document so it reaches our office by 1 PM. Missouri documents received by then are apostilled the same day, and the return ships by tracked FedEx."),
              ("Can I order a certified birth certificate locally and send it straight to you?", "Yes. A certified copy from the Springfield-Greene County Health Department is accepted for a Missouri apostille. Have it mailed to our office or include it in your package.")]),
    dict(slug="jefferson-city-mo", city="Jefferson City", st="MO", county="Cole County", metro=False,
         lead="Apostille service for Jefferson City and Cole County documents. The Missouri Secretary of State and the Bureau of Vital Records are both in Jefferson City, and we handle the paperwork around them.",
         send="Jefferson City clients mail documents to our Kansas City office with tracking. We check whether the document needs a certified copy, a notarization or a translation first, then handle the Secretary of State submission and the tracked return.",
         records=[("Birth certificates", "The Missouri Bureau of Vital Records in Jefferson City issues certified copies of Missouri birth certificates."),
                  ("Marriage certificates", "The Cole County Recorder of Deeds in Jefferson City."),
                  ("Divorce decrees", "The Cole County Circuit Clerk in Jefferson City.")],
         local="Jefferson City is home to Lincoln University and to many state employees who need documents for assignments, study or family matters abroad.",
         faq=[("The Secretary of State is in Jefferson City. Why use a service?", "Many clients do not know which version of a document will be accepted, or that a document needs a notarization or certified copy first. We check that before submission, prepare what is missing, and handle the translation and shipping that often follow."),
              ("Do you have an office in Jefferson City?", "No. Our only office is in Kansas City. Jefferson City clients send documents by mail.")]),
    dict(slug="independence-mo", city="Independence", st="MO", county="Jackson County", metro=True,
         lead="Apostille and notary service for Independence and eastern Jackson County: drop off at our Kansas City office, book a mobile notary, or send documents by mail.",
         send="Independence is in the Kansas City metro, so you can drop documents off at our office on E. Bannister Rd., book a mobile notary at your home or office, or mail documents in with tracking.",
         records=[("Birth certificates", "Any Missouri local public health agency, including the Kansas City Health Department, issues certified Missouri birth certificates."),
                  ("Marriage certificates", "The Jackson County Recorder of Deeds, which has offices in Independence and downtown Kansas City."),
                  ("Court documents", "The Circuit Court of Jackson County sits in Independence and Kansas City. Certified copies of decrees and orders come from its clerk, and we apostille Jackson County court documents regularly.")],
         local="Many Independence clients come to us for a court document apostille from the Jackson County courthouse, along with powers of attorney signed with our mobile notary.",
         faq=[("Can a mobile notary come to my home in Independence?", "Yes. Independence is in our Kansas City metro service area for mobile notary, with daytime, evening and weekend availability."),
              ("Can you apostille a Jackson County court document?", "Yes. Order a certified copy from the Jackson County Circuit Clerk. We check the certification and submit it to the Missouri Secretary of State.")]),
    dict(slug="lees-summit-mo", city="Lee’s Summit", st="MO", county="Jackson County", metro=True,
         lead="Apostille and notary service for Lee’s Summit: close to our office on E. Bannister Rd., with in-office drop-off, mobile notary and same-day Missouri apostilles.",
         send="Lee’s Summit clients usually drop documents off at our Kansas City office or book a mobile notary for documents that still need to be signed. Mail-in with tracking works too.",
         records=[("Birth certificates", "Any Missouri local public health agency or the Bureau of Vital Records issues certified Missouri birth certificates."),
                  ("Marriage certificates", "The Jackson County Recorder of Deeds."),
                  ("Divorce decrees", "The Jackson County Circuit Clerk.")],
         local="Lee’s Summit families often need minor travel consent forms, powers of attorney for property abroad and birth certificate apostilles for dual citizenship, and many prefer a mobile notary visit for the signing.",
         faq=[("How fast can I get a Missouri apostille from Lee’s Summit?", f"Bring or send a Missouri document to our office by 1 PM and it is apostilled the same day ({MO_SAME}). Standard service is {MO_STD}."),
              ("Do you notarize at homes in Lee’s Summit?", "Yes. Lee’s Summit is in our Kansas City metro area for mobile notary, including evenings and weekends.")]),
    dict(slug="st-joseph-mo", city="St. Joseph", st="MO", county="Buchanan County", metro=False,
         lead="Apostille service for St. Joseph and Buchanan County documents, by mail or by a drive down to our Kansas City office.",
         send="St. Joseph clients can drive down to our Kansas City office or mail documents with tracking. We return everything by tracked FedEx, or hold it for pickup.",
         records=[("Birth certificates", "A Missouri local public health agency or the Bureau of Vital Records in Jefferson City issues certified Missouri birth certificates."),
                  ("Marriage certificates", "The Buchanan County Recorder of Deeds in St. Joseph."),
                  ("Divorce decrees", "The Buchanan County Circuit Clerk in St. Joseph.")],
         local="St. Joseph is home to Missouri Western State University; transcripts and diplomas for study or work abroad are common requests.",
         faq=[("Is St. Joseph in your mobile notary area?", f"No. {METRO_NOTE} St. Joseph documents that need a notarization can be signed by remote online notary or at our office."),
              ("Can I pick my documents up instead of shipping them?", "Yes. Choose pickup when you order and we will tell you when they are ready at our Kansas City office.")]),
    dict(slug="joplin-mo", city="Joplin", st="MO", county="Jasper and Newton counties", metro=False,
         lead="Apostille service for Joplin, Jasper County and Newton County documents, sent to us by mail from southwest Missouri.",
         send="Joplin clients mail documents to our Kansas City office with tracking. We confirm the route first, apostille Missouri documents through the Secretary of State and return them by tracked FedEx.",
         records=[("Birth certificates", "A Missouri local public health agency or the Bureau of Vital Records in Jefferson City issues certified Missouri birth certificates."),
                  ("Marriage certificates", "The Recorder of Deeds for the county where the license was issued: Jasper County (Carthage) or Newton County (Neosho)."),
                  ("Divorce decrees", "The Circuit Clerk in Jasper County or Newton County, wherever the case was filed.")],
         local="Joplin sits across two counties, so the right recorder or court depends on where your record was filed. Missouri Southern State University transcripts and diplomas are also common requests.",
         faq=[("Which county records apply to Joplin?", "Joplin spans Jasper and Newton counties. Order the certified copy from the county where the record was filed; if you are not sure, send us what you have and we will tell you."),
              ("Do you have an office in Joplin?", "No. Our only office is in Kansas City, and Joplin clients send documents by mail.")]),
    dict(slug="wichita-ks", city="Wichita", st="KS", county="Sedgwick County", metro=False,
         lead="Kansas apostille service for Wichita and Sedgwick County: birth and marriage certificates, court records, Wichita State University documents and business records, by mail.",
         send="Wichita clients mail documents to our Kansas City office with tracking. We submit Kansas documents to the Kansas Secretary of State and return them by tracked FedEx.",
         records=[("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates, online, by mail or in person."),
                  ("Marriage certificates", "KDHE Vital Statistics, or the Sedgwick County District Court if the license was issued there."),
                  ("Divorce decrees", "The clerk of the Sedgwick County District Court in Wichita.")],
         local="Wichita is home to Wichita State University and Friends University, and to aviation and manufacturing employers whose staff often need degrees and background checks authenticated for work abroad.",
         faq=[("How do Wichita clients get a same-day Kansas apostille?", f"Ship your document so it reaches our office by 10 AM. Kansas documents received by then are apostilled the same day for {KS_SAME}."),
              ("Is there an office in Wichita?", "No. We have one office, in Kansas City. Wichita clients send documents by mail.")]),
    dict(slug="overland-park-ks", city="Overland Park", st="KS", county="Johnson County", metro=True,
         lead="Apostille and notary service for Overland Park: in-office drop-off, mobile notary across Johnson County, and same-day Kansas apostilles.",
         send="Overland Park is in the Kansas City metro, so you can drop documents off at our office, book a mobile notary for documents that still need signing, or mail them in.",
         records=[("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Court documents", "The Johnson County District Court in Olathe issues certified copies of decrees and orders. We apostille Johnson County court documents regularly."),
                  ("Business documents", "Certificates of good standing for Overland Park companies come from the Kansas Secretary of State.")],
         local="Overland Park has a large corporate base, so we see many business documents, certificates of good standing and employment letters, as well as Johnson County Community College transcripts.",
         faq=[("Can a mobile notary meet me at my office in Overland Park?", "Yes. Overland Park is in our Kansas City metro area for mobile notary, including evenings and weekends."),
              ("My company needs documents apostilled every month. Is there an account option?", 'Yes. See <a href="/business-accounts/">business accounts</a> for monthly invoicing and volume pricing.')]),
    dict(slug="olathe-ks", city="Olathe", st="KS", county="Johnson County", metro=True,
         lead="Apostille and notary service for Olathe, the Johnson County seat: court documents, Kansas birth certificates and powers of attorney, with mobile notary available.",
         send="Olathe clients can drop documents off at our office, book a mobile notary in Johnson County, or mail documents in with tracking.",
         records=[("Court documents", "The Johnson County District Court is in Olathe. Order certified copies of divorce decrees and court orders from its clerk."),
                  ("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Marriage certificates", "KDHE Vital Statistics, or the Johnson County District Court if the license was issued there.")],
         local="Because the Johnson County courthouse is in Olathe, court document apostilles are among our most common Olathe requests, along with MidAmerica Nazarene University transcripts.",
         faq=[("Can you apostille a Johnson County court document?", "Yes. Order a certified copy from the Johnson County District Court clerk in Olathe and we submit it to the Kansas Secretary of State."),
              ("Do you offer mobile notary in Olathe?", "Yes. Olathe is in our Kansas City metro area for mobile notary.")]),
    dict(slug="topeka-ks", city="Topeka", st="KS", county="Shawnee County", metro=False,
         lead="Kansas apostille service for Topeka and Shawnee County. KDHE Vital Statistics and the Kansas Secretary of State are both in Topeka, and we handle everything around the submission.",
         send="Topeka clients mail documents to our Kansas City office with tracking. We check what the document needs first, submit it to the Kansas Secretary of State and return it by tracked FedEx.",
         records=[("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Marriage certificates", "KDHE Vital Statistics in Topeka, or the Shawnee County District Court if the license was issued there."),
                  ("Divorce decrees", "The clerk of the Shawnee County District Court in Topeka.")],
         local="Topeka is home to Washburn University and many state employees. Transcripts, birth certificates and powers of attorney are our most common Topeka requests.",
         faq=[("The Kansas Secretary of State is in Topeka. Why send documents to you?", "We check that the document is the version the destination will accept, prepare any notarization or translation it needs, and handle the submission and tracked return in one order."),
              ("Do you have a Topeka office?", "No. Our only office is in Kansas City.")]),
    dict(slug="lawrence-ks", city="Lawrence", st="KS", county="Douglas County", metro=False,
         lead="Apostille service for Lawrence and Douglas County: University of Kansas diplomas and transcripts, Kansas birth certificates and powers of attorney.",
         send="Lawrence clients mail documents to us with tracking, or drive over to our Kansas City office. We submit Kansas documents to the Kansas Secretary of State and return them by tracked FedEx.",
         records=[("Diplomas and transcripts", "The University of Kansas and Haskell Indian Nations University registrars can provide copies for notarization. We confirm which version your destination accepts."),
                  ("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Divorce decrees", "The clerk of the Douglas County District Court in Lawrence.")],
         local="With the University of Kansas in town, most Lawrence requests are diplomas and transcripts for teaching English abroad, graduate study or work visas.",
         faq=[("Can you apostille my University of Kansas diploma?", "Yes. A diploma is apostilled through a notarized copy, usually signed by a registrar or by you as custodian. We prepare the statement and handle the notarization."),
              ("Is Lawrence in your mobile notary area?", f"No. {METRO_NOTE} Lawrence clients can use remote online notary or come to our office.")]),
    dict(slug="kansas-city-ks", city="Kansas City, KS", st="KS", county="Wyandotte County", metro=True,
         lead="Apostille, notary and jail notary service for Kansas City, Kansas and Wyandotte County, from our office just across the state line.",
         send="Kansas City, Kansas clients drop documents off at our office, book a mobile notary, or mail documents in. Kansas documents go to the Kansas Secretary of State; Missouri documents go to Missouri.",
         records=[("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Court documents", "The Wyandotte County District Court issues certified copies of decrees and orders."),
                  ("Marriage certificates", "KDHE Vital Statistics, or the Wyandotte County District Court if the license was issued there.")],
         local="We also provide jail notary visits for the Wyandotte County Adult Detention Center, with flat-rate pricing, and Kansas City Kansas Community College transcripts are common apostille requests.",
         faq=[("Do you provide jail notary in Wyandotte County?", 'Yes. Wyandotte County jail notary visits are $99 before 6 PM. See <a href="/jail-notary-kansas-city/">jail notary</a> for details.'),
              ("I live in Kansas but my document is from Missouri. Which apostille do I need?", "The apostille comes from the state that issued or notarized the document, not the state you live in. We route each document to the right Secretary of State.")]),
    dict(slug="manhattan-ks", city="Manhattan", st="KS", county="Riley County", metro=False,
         lead="Apostille service for Manhattan and Riley County: Kansas State University records, military family documents and Kansas birth certificates, by mail.",
         send="Manhattan clients mail documents to our Kansas City office with tracking. We submit Kansas documents to the Kansas Secretary of State and return them by tracked FedEx.",
         records=[("Diplomas and transcripts", "Kansas State University registrar copies, notarized for apostille."),
                  ("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Marriage and divorce records", "KDHE Vital Statistics, or the Riley County District Court in Manhattan.")],
         local="Manhattan is home to Kansas State University and sits next to Fort Riley, so we see student records along with marriage and birth certificates for military families moving overseas.",
         faq=[("Can you help military families from Fort Riley?", "Yes. We apostille birth and marriage certificates, powers of attorney and school records for families moving abroad, and translate them when the destination requires it."),
              ("Do you have an office in Manhattan?", "No. Our only office is in Kansas City, and Manhattan clients send documents by mail.")]),
    dict(slug="salina-ks", city="Salina", st="KS", county="Saline County", metro=False,
         lead="Kansas apostille service for Salina and Saline County: birth and marriage certificates, school records and powers of attorney, sent to us by mail.",
         send="Salina clients mail documents to our Kansas City office with tracking. We submit Kansas documents to the Kansas Secretary of State and return them by tracked FedEx.",
         records=[("Birth certificates", "The KDHE Office of Vital Statistics in Topeka issues certified Kansas birth certificates."),
                  ("Marriage certificates", "KDHE Vital Statistics, or the Saline County District Court if the license was issued there."),
                  ("Divorce decrees", "The clerk of the Saline County District Court in Salina.")],
         local="Salina is home to Kansas Wesleyan University and K-State Salina, and many Salina requests are transcripts and diplomas along with family records.",
         faq=[("How long does a Kansas apostille take from Salina?", f"Kansas documents received at our office by 10 AM are apostilled the same day ({KS_SAME}); standard service ({KS_STD}) takes {APOSTILLE_STD_TIME}. Add shipping time each way."),
              ("Do you have an office in Salina?", "No. Our only office is in Kansas City.")]),
]


def city_path(c):
    return f"/apostille-services-{c['slug']}/"


def services_avail(metro, city):
    if metro:
        items = [("Apostille", "Missouri, Kansas and out-of-state documents."), ("Remote online notary", "Sign by video from anywhere."),
                 ("Mobile notary", f"We come to you in {city}, including evenings and weekends."), ("Jail notary", "Kansas City area facilities.")]
    else:
        items = [("Apostille", "Statewide, by mail."), ("Remote online notary", "Statewide, by video."),
                 ("Mobile notary", "Kansas City metro only."), ("Jail notary", "Kansas City metro only.")]
    return rows(items, cls="rows--4")


def state_page(code):
    s = STATES[code]
    path = s["path"]
    crumbs = [("Apostille Services", "/apostille-services/"), (f"{s['name']} Apostille", path)]
    cities = [c for c in CITIES if c["st"] == code]
    body = page_hero(
        f"{s['name']} Apostille Services",
        f"Apostilles for {s['name']} documents from anywhere in the state, submitted to the {s['sos']} in {s['capital']}. {s['std']} standard, {s['same']} same day for documents received by {s['cutoff']}.",
        crumbs, image="apostille-documents", alt="Certificates with wax seals and a notary stamp", lab=f"{s['name']} apostille",
        plate="Plate 01. Statewide by mail", buttons=cta_btn() + call_btn())
    body += f'''
<section class="section" aria-labelledby="sos-h">
  <div class="container split split--text">
    <div>{shead("01", f"{s['sos']} apostille", f"How a {s['name']} apostille works.", "sos-h", cls="shead--stack")}</div>
    <div class="prose-block">
      <p>{s['name']} apostilles are issued by the {s['sos']} in {s['capital']}. The office authenticates the signature of the official or notary on a {s['name']} document, so it can be used in any Hague Convention country.</p>
      <p>The document has to be the right version first: a certified copy of a vital record, a notarized copy of a school record, or a document signed in front of a {s['name']} notary. We check that before anything is submitted.</p>
      <p class="fine">Midwest Apostille &amp; Notary Services is a private document service and is not affiliated with the {s['sos']} or any government agency.</p>
    </div>
  </div>
</section>'''
    docs = "".join(f'<a href="{h}"><b>{t}</b><span>{d}</span></a>' for t, d, h in s["docs"])
    body += sec("02", "Common documents", f"{s['name']} documents we apostille.", "sdocs-h", f'<div class="linkgrid">{docs}</div>', tone="section--paper")
    body += sec("03", "Pricing and turnaround", f"{s['std']} standard, {s['same']} same day.", "sprice-h",
                price_table(rows=state_prices(s["name"])) + price_notes()
                + f'<p class="fine">Standard processing takes {APOSTILLE_STD_TIME}. {link("Full price list", "/pricing/")}</p>')
    body += sec("04", "From anywhere in the state", f"Mail your documents from anywhere in {s['name']}.", "smail-h", rows([
        ("Tell us about the document", "Order online or call. We confirm the route, the price and whether anything is needed first."),
        ("Mail it to our office", f"Send it with tracking to {ADDRESS}."),
        ("We apostille it", f"Submitted to the {s['sos']}, same day when it arrives by {s['cutoff']} and you choose same-day service."),
        ("Tracked return", f"Returned by tracked FedEx ({SHIP_US}), or shipped abroad by FedEx or DHL."),
    ], cls="rows--4"), tone="section--bone")
    body += sec("05", "Statewide or Kansas City only", "What is available where you live.", "savail-h",
                rows([("Apostille", "Statewide, by mail or drop-off."), ("Remote online notary", "Statewide, by video."),
                      ("Mobile notary", "Kansas City metro only."), ("Jail notary", "Kansas City metro only.")], cls="rows--4"))
    links = "".join(f'<a href="{city_path(c)}"><b>{c["city"]}</b><span>{c["county"]}</span></a>' for c in cities)
    body += sec("06", "Cities", f"{s['name']} cities we serve by mail and in person.", "scities-h",
                f'<div class="linkgrid linkgrid--4">{links}</div>', tone="section--paper", sid="cities")
    body += faq_section(s["faq"], num="07", heading=f"{s['name']} apostille questions.")
    body += cta_final()
    kw = "Missouri apostille services" if code == "MO" else "Kansas apostille services"
    return page(path, f"{s['name']} Apostille Services | Midwest Apostille & Notary",
                f"{s['name']} apostille from anywhere in the state: {s['std']} standard, {s['same']} same day by {s['cutoff']}. Birth, marriage, court, school and business documents.",
                body, active="services", crumbs=crumbs, og_image="apostille-documents", keyword=kw,
                schema=[service_schema(path, f"{s['name']} Apostille Services", f"Apostille of {s['name']} documents for clients anywhere in {s['name']}.", "Apostille services",
                                       area=[{"@type": "State", "name": s["name"]}]), faq_schema(path, s["faq"])])


def _city_desc(c, s):
    d = f"Apostille for {c['city']} documents: {s['std']} standard, {s['same']} same day. How to send documents and where to get certified copies in {c['county']}."
    if len(d) > 160:
        d = f"Apostille for {c['city']} documents: {s['std']} standard, {s['same']} same day. How to send documents and where to get certified copies locally."
    return d


def city_page(c):
    s = STATES[c["st"]]
    path = city_path(c)
    crumbs = [(f"{s['name']} Apostille", s["path"]), (c["city"], path)]
    st_abbr = c["st"]
    city_full = c["city"] if c["city"].endswith(", KS") else f"{c['city']}, {st_abbr}"
    body = page_hero(f"Apostille Services in {city_full}", c["lead"], crumbs, lab=f"{c['county']}", buttons=cta_btn() + call_btn())
    body += f'''
<section class="section" aria-labelledby="send-h">
  <div class="container split split--text">
    <div>{shead("01", "Getting documents to us", f"How {c['city'].replace(', KS', '')} clients send documents.", "send-h", cls="shead--stack")}</div>
    <div class="prose-block"><p>{c['send']}</p><p>{c['local']}</p></div>
  </div>
</section>'''
    body += sec("02", "Certified copies", f"Where to get certified copies in {c['county']}.", "rec-h",
                rows(c["records"], cls="rows--3"),
                "An apostille can only be placed on the right version of a document. These are the local offices that issue it.", tone="section--paper")
    body += sec("03", "Pricing and turnaround", f"{s['name']} apostille: {s['std']} standard, {s['same']} same day.", "cprice-h",
                price_table(rows=state_prices(s["name"])) + price_notes()
                + f'<p class="fine">Same-day service starts when your document reaches our office by {s["cutoff"]}; add shipping time each way. Standard processing takes {APOSTILLE_STD_TIME}. Documents issued by another state are priced on the {link("pricing page", "/pricing/")}.</p>')
    body += sec("04", "Services", f"Services for {c['city'].replace(', KS', '')} clients.", "cavail-h", services_avail(c["metro"], c["city"].replace(", KS", "")),
                "Apostille and remote online notary are available statewide. Mobile notary and jail notary are Kansas City metro only.", tone="section--bone")
    body += faq_section(c["faq"], num="05", heading="Questions from " + c["city"].replace(", KS", "") + " clients.")
    body += f'''
<section class="section section--paper" aria-labelledby="more-h">
  <div class="container">{shead("06", "More", "Related pages.", "more-h")}
    <div class="linkgrid">
      <a href="{s['path']}"><b>{s['name']} apostille services</b><span>Statewide guide</span></a>
      <a href="/birth-certificate-apostille-missouri-kansas/"><b>Birth certificate apostille</b><span>Missouri and Kansas</span></a>
      <a href="/order/"><b>Order online</b><span>Estimate and checkout</span></a>
    </div>
  </div>
</section>'''
    body += cta_final()
    title = f"Apostille Services in {city_full} | Midwest"
    if len(title) > 60:
        title = f"Apostille in {city_full} | Midwest Apostille"
    return page(path, title,
                _city_desc(c, s),
                body, active="services", crumbs=crumbs, keyword=f"apostille {c['city']}",
                schema=[service_schema(path, f"Apostille Services in {city_full}", c["lead"], "Apostille services",
                                       area=[{"@type": "City", "name": city_full}]), faq_schema(path, c["faq"])])


def build_all():
    return [state_page("MO"), state_page("KS")] + [city_page(c) for c in CITIES]

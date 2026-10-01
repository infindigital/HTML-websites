"""Country pages (change list, section 3): twelve destinations, plus Spanish versions for the Spanish-speaking ones.

Each country's route is checked against the country explorer lists (countries.py) at build time, so a page can
never say "apostille" for a country the explorer lists as non-Hague, or the other way round.
"""
from components import REVIEWS, cta_final, faq_section, page_hero, price_notes, price_table, rows, shead
from countries import HAGUE, LEGALIZATION
from facts import (APOSTILLE_STD_TIME, APOSTILLE_STD_TIME_ES, FBI_APOSTILLE, KS_STD, MO_STD, PRICES, PRICES_ES, TRANSLATION_PAGE,
                   TRANSLATION_PAGE_3PLUS)
from lib import NO_ADVICE, NO_ADVICE_ES, PHONE, call_btn, cta_btn, faq_schema, link, page, service_schema
from pages_new import sec

ALL_HAGUE = {n for v in HAGUE.values() for n in v}
ALL_LEGAL = {row[0] for row in LEGALIZATION}

COUNTRIES = [
    dict(slug="mexico", name="Mexico", list_name="Mexico", route="apostille", tr="Spanish",
         es=dict(slug="mexico", name="México"),
         docs=["Birth certificates for registering Mexican nationality (doble nacionalidad)", "Marriage certificates", "Powers of attorney (poder notarial) for property, vehicles and banking", "School records and diplomas", "Divorce decrees"],
         note="Mexico is a Hague Convention member, so one apostille from the state that issued your document is enough. Spanish translation is usually required; some Mexican offices only accept translations made in Mexico by an authorized translator, so we confirm before translating.",
         faq=[("Do I need an apostille to register my child’s Mexican nationality?", "Mexican consulates usually ask for an apostilled U.S. birth certificate, and often a Spanish translation. Confirm the current list with your consulate; we apostille and translate the certificate."),
              ("Can I sign a poder notarial here for use in Mexico?", "Yes. We prepare and notarize the power of attorney, apostille it, and add a Spanish translation when needed.")]),
    dict(slug="colombia", name="Colombia", list_name="Colombia", route="apostille", tr="Spanish",
         es=dict(slug="colombia", name="Colombia"),
         docs=["Birth certificates for the registro civil", "Marriage certificates", "Powers of attorney (poder notarial)", "Diplomas and transcripts for validation", "FBI background checks for visas"],
         note="Colombia accepts the apostille. Documents in English are usually translated into Spanish, and the translation itself may also need to be apostilled, depending on the office. We confirm the order before we start.",
         faq=[("Does the Spanish translation need its own apostille for Colombia?", "Sometimes. It depends on the office receiving it and whether the translation is made in the U.S. or in Colombia. We confirm before translating."),
              ("Can I use a power of attorney signed in Kansas City in Colombia?", "Yes, once it is notarized and apostilled, with a Spanish translation if it is in English.")]),
    dict(slug="venezuela", name="Venezuela", list_name="Venezuela", route="apostille", tr="Spanish",
         es=dict(slug="venezuela", name="Venezuela"),
         docs=["Powers of attorney (poder notarial) for property and banking", "Birth and marriage certificates", "School records", "Divorce decrees"],
         note="Venezuela is a Hague Convention member, so U.S. documents need an apostille rather than consular legalization. Spanish translation is usually required.",
         faq=[("Do Venezuelan offices accept a U.S. apostille?", "Yes. Venezuela is a member of the Hague Apostille Convention."),
              ("Can I give a family member power of attorney in Venezuela?", "Yes. We prepare and notarize the poder notarial, apostille it and translate it into Spanish when needed.")]),
    dict(slug="honduras", name="Honduras", list_name="Honduras", route="apostille", tr="Spanish",
         es=dict(slug="honduras", name="Honduras"),
         docs=["Powers of attorney (poder notarial)", "Birth certificates for registering children born in the U.S.", "Marriage certificates", "Divorce decrees"],
         note="Honduras is a Hague Convention member, so an apostille is enough. Spanish translation is usually required for English documents.",
         faq=[("Do I need the Honduran consulate for my documents?", "Not for authentication. Honduras accepts the apostille. The consulate may still have its own steps for registrations, which we can help you prepare for."),
              ("Can you translate my documents into Spanish?", f"Yes, certified translation from ${TRANSLATION_PAGE} per page.")]),
    dict(slug="spain", name="Spain", list_name="Spain", route="apostille", tr="Spanish",
         es=dict(slug="espana", name="España"),
         docs=["FBI background checks for residency, student and digital nomad visas", "Birth and marriage certificates", "Diplomas and transcripts for homologation", "Powers of attorney for property"],
         note="Spain accepts the apostille. FBI background checks must be apostilled by the U.S. Department of State, not a state office. Spain often requires the Spanish translation to be made by a translator authorized in Spain; we confirm which translation your consulate accepts.",
         faq=[("Can a state apostille be used on my FBI check for Spain?", "No. Spain rejects state apostilles on federal documents. Your FBI background check needs a U.S. Department of State apostille."),
              ("How recent must my FBI check be for a Spanish visa?", "Usually issued within the last 90 days at the time of your application. Confirm with your consulate.")]),
    dict(slug="china", name="China", list_name="China incl. HK & Macao", route="apostille", tr="Chinese",
         since="China has accepted the apostille since November 2023. Before then, documents needed consular legalization.",
         docs=["Diplomas and FBI background checks for work permits", "Birth and marriage certificates for family visas", "Business documents for company registration", "Powers of attorney"],
         note="Since November 2023, mainland China accepts the apostille in place of consular legalization. Chinese translation is usually required, and many offices ask for it to be done in China. We confirm before translating.",
         faq=[("Do I still need the Chinese consulate?", "No. Since November 2023, an apostille replaces consular legalization for mainland China."),
              ("Which apostille does my FBI check need for a Chinese work permit?", "A U.S. Department of State apostille, because the FBI report is a federal document.")]),
    dict(slug="philippines", name="the Philippines", title_name="Philippines", list_name="Philippines", route="apostille", tr=None,
         docs=["Special powers of attorney (SPA) for property and banking", "Birth and marriage certificates", "Divorce decrees and court documents", "School records"],
         note="The Philippines accepts the apostille, so documents no longer go through the Philippine consulate for authentication. English documents are accepted without translation.",
         review="Kentt Malaluan",
         faq=[("Do I still need the Philippine consulate?", "No. The Philippines accepts the apostille in place of consular authentication."),
              ("Can you notarize a special power of attorney for the Philippines?", "Yes. We notarize the SPA, apostille it and ship it to you or directly to the Philippines.")]),
    dict(slug="india", name="India", list_name="India", route="apostille", tr=None,
         docs=["Powers of attorney for property", "Birth and marriage certificates", "Diplomas and transcripts", "Business documents for branch offices"],
         note="India is a Hague Convention member, so U.S. documents need an apostille. English documents are generally accepted without translation.",
         faq=[("Can I sign a power of attorney here for property in India?", "Yes. We notarize it, apostille it and ship it to you or to India by FedEx or DHL."),
              ("Do Indian offices accept English documents?", "Generally yes. Some state offices may ask for a local-language translation, which we can arrange.")]),
    dict(slug="uae", name="the UAE", title_name="UAE", list_name="United Arab Emirates (UAE)", route="legalization", tr="Arabic",
         docs=["Degrees and transcripts for employment", "Marriage certificates for family sponsorship", "Birth certificates for dependents", "FBI background checks", "Business documents for company setup"],
         note="The United Arab Emirates is not a Hague member, so an apostille is not accepted. Documents need embassy legalization: state certification where needed, U.S. Department of State authentication, then the UAE Embassy in Washington, DC, followed by the UAE Ministry of Foreign Affairs. A certified Arabic translation is usually required.",
         faq=[("Is an apostille enough for the UAE?", "No. The UAE does not accept apostilles. Your document needs embassy legalization."),
              ("Do I need an Arabic translation for the UAE?", "Usually yes. We prepare the certified Arabic translation so it can be legalized with your document.")]),
    dict(slug="saudi-arabia", name="Saudi Arabia", list_name="Saudi Arabia", route="apostille", tr="Arabic",
         since="Saudi Arabia has accepted the apostille since December 2022. Before then, documents needed embassy legalization.",
         docs=["Degrees and FBI background checks for a work visa", "Marriage and birth certificates for family visas", "Business documents", "Powers of attorney"],
         note="Since December 2022, Saudi Arabia accepts the apostille in place of embassy legalization. An Arabic translation is usually required.",
         faq=[("Do I still need the Saudi embassy?", "No. Since December 2022, an apostille replaces embassy legalization for Saudi Arabia."),
              ("Do I need an Arabic translation?", "Usually yes. We prepare the certified Arabic translation.")]),
    dict(slug="egypt", name="Egypt", list_name="Egypt", route="legalization", tr="Arabic",
         docs=["Marriage and birth certificates", "Powers of attorney", "FBI background checks for work permits", "Business documents"],
         note="Egypt is not a Hague member, so documents need embassy legalization: U.S. Department of State authentication, then the Egyptian Embassy in Washington, DC, followed by the Egyptian Ministry of Foreign Affairs. A certified Arabic translation is typically required.",
         faq=[("Is an apostille enough for Egypt?", "No. Egypt requires embassy legalization."),
              ("Can you legalize a marriage certificate for Egypt?", "Yes. We handle the state and federal steps and the embassy submission, with the Arabic translation.")]),
    dict(slug="qatar", name="Qatar", list_name="Qatar", route="legalization", tr="Arabic",
         docs=["Degrees and transcripts for employment", "Marriage and birth certificates for family residence", "FBI background checks", "Professional licensing documents"],
         note="Qatar is not a Hague member, so documents need embassy legalization: U.S. Department of State authentication, then the Qatari Embassy in Washington, DC, followed by the Qatar Ministry of Foreign Affairs. An Arabic translation is usually required.",
         faq=[("Is an apostille enough for Qatar?", "No. Qatar requires embassy legalization."),
              ("Can you legalize my degree for a job in Qatar?", "Yes. We prepare the notarized copy, handle authentication and embassy legalization, and add the Arabic translation.")]),
]

ES_TEXT = {
    "mexico": dict(docs=["Actas de nacimiento para registrar la nacionalidad mexicana (doble nacionalidad)", "Actas de matrimonio", "Poderes notariales para propiedades, vehículos y bancos", "Documentos escolares y diplomas", "Sentencias de divorcio"],
                   note="México es miembro del Convenio de La Haya, así que basta con una apostilla del estado que emitió su documento. Por lo general se requiere traducción al español; algunas oficinas en México solo aceptan traducciones hechas en México por un traductor autorizado, por eso lo confirmamos antes de traducir."),
    "colombia": dict(docs=["Actas de nacimiento para el registro civil", "Actas de matrimonio", "Poderes notariales", "Diplomas y certificados de notas para convalidación", "Reportes del FBI para visas"],
                     note="Colombia acepta la apostilla. Los documentos en inglés normalmente se traducen al español, y según la oficina la traducción también puede necesitar apostilla. Confirmamos el orden antes de empezar."),
    "venezuela": dict(docs=["Poderes notariales para propiedades y bancos", "Actas de nacimiento y de matrimonio", "Documentos escolares", "Sentencias de divorcio"],
                      note="Venezuela es miembro del Convenio de La Haya, así que los documentos de EE. UU. necesitan una apostilla y no legalización consular. Normalmente se requiere traducción al español."),
    "honduras": dict(docs=["Poderes notariales", "Actas de nacimiento para registrar a hijos nacidos en EE. UU.", "Actas de matrimonio", "Sentencias de divorcio"],
                     note="Honduras es miembro del Convenio de La Haya, así que una apostilla es suficiente. Los documentos en inglés normalmente necesitan traducción al español."),
    "spain": dict(docs=["Reportes del FBI para visas de residencia, estudiante y nómada digital", "Actas de nacimiento y de matrimonio", "Diplomas y certificados de notas para homologación", "Poderes notariales para propiedades"],
                  note="España acepta la apostilla. El reporte del FBI debe apostillarse en el Departamento de Estado de EE. UU., no en una oficina estatal. España a menudo exige que la traducción la haga un traductor autorizado en España; confirmamos qué traducción acepta su consulado."),
}


def country_path(c, lang="en"):
    if lang == "es":
        return f"/apostilla-para-{c['es']['slug']}-kansas-city/"
    if c["route"] == "legalization":
        return f"/embassy-legalization-for-{c['slug']}-kansas-city/"
    return f"/apostille-for-{c['slug']}-kansas-city/"


def _check_routes():
    for c in COUNTRIES:
        listed = "apostille" if c["list_name"] in ALL_HAGUE else "legalization" if c["list_name"] in ALL_LEGAL else None
        if listed != c["route"]:
            raise SystemExit(f"Country route mismatch for {c['name']}: page says {c['route']}, explorer says {listed}")


def review_block(name):
    for n, text in REVIEWS:
        if n == name:
            return (f'<figure class="review-quote"><blockquote><p>{text}</p></blockquote>'
                    f'<footer><b>{n}</b>, Google review, 5 of 5</footer></figure>')
    return ""


def country_page(c):
    path = country_path(c)
    title_name = c.get("title_name", c["name"])
    apost = c["route"] == "apostille"
    crumbs = [("Apostille Services", "/apostille-services/"), (title_name, path)]
    if apost:
        h1 = f"Apostille for {title_name} from Kansas City"
        lead = f"Documents for {c['name']} need an apostille. We apostille Missouri, Kansas and out-of-state documents{', add the ' + c['tr'] + ' translation' if c['tr'] else ''} and ship them to you or abroad."
    else:
        h1 = f"Embassy Legalization for {title_name} from Kansas City"
        lead = f"{c['name'][0].upper() + c['name'][1:]} does not accept the apostille. We handle embassy legalization for your documents, with the {c['tr']} translation, and ship them to you or abroad."
    body = page_hero(h1, lead, crumbs, image="international-route", alt="Certificates and passports in front of a world map",
                     lab="Apostille" if apost else "Embassy legalization", buttons=cta_btn() + call_btn())
    since = f'<p><strong>{c["since"]}</strong></p>' if c.get("since") else ""
    body += f'''
<section class="section" aria-labelledby="route-h">
  <div class="container split split--text">
    <div>{shead("01", "Route", ("Apostille accepted." if apost else "Embassy legalization required."), "route-h", cls="shead--stack")}</div>
    <div class="prose-block">{since}<p>{c["note"]}</p><p class="fine">{NO_ADVICE}</p></div>
  </div>
</section>'''
    docs = "".join(f"<li>{d}</li>" for d in c["docs"])
    body += sec("02", "Common documents", f"Documents clients send to {c['name']}.", "cdocs-h",
                f'<div class="prose-block"><ul>{docs}</ul><p>{link("Apostille by document", "/apostille-services/#by-document")}</p></div>', tone="section--paper")
    tr_text = (f"{c['tr']} translation is usually required. We prepare certified translations for ${TRANSLATION_PAGE} per page, ${TRANSLATION_PAGE_3PLUS} per page from three pages, and confirm whether it is done before or after the {'apostille' if apost else 'legalization'}."
               if c["tr"] else "English documents are generally accepted without translation. If an office asks for one, we can arrange it.")
    body += sec("03", "Translation", "Translation needs.", "ctr-h", f'<div class="prose-block"><p>{tr_text}</p><p>{link("Certified translation", "/certified-translation-services/")}</p></div>')
    if apost:
        timeline = rows([("Missouri and Kansas documents", f"Same day when received by the cutoff, or {APOSTILLE_STD_TIME} standard."),
                         ("Other states", "Standard or expedited; Texas expedited in 2 to 3 business days, other states quoted on request."),
                         ("FBI background checks", f"U.S. Department of State apostille ({FBI_APOSTILLE}); timing depends on the department’s current volume."),
                         ("Shipping", "Tracked FedEx in the U.S., or FedEx and DHL internationally.")], cls="rows--4")
        prices = price_table(rows=PRICES[:4] + [PRICES[6]]) + price_notes(guarantee=False)
    else:
        timeline = rows([("State or federal certification", "Missouri and Kansas documents are certified first; federal documents go straight to the U.S. Department of State."),
                         ("U.S. Department of State", "Authentication; timing depends on the department’s current volume."),
                         ("Embassy in Washington, DC", "Legalization; each embassy sets its own processing time and fees."),
                         ("Ministry of Foreign Affairs", "Final attestation in the destination country.")], cls="rows--4")
        prices = ('<div class="prose-block"><p>Embassy legalization is quoted per document, because each embassy sets its own fees. '
                  f'Translation is ${TRANSLATION_PAGE} per page. We give you the full price before you send anything.</p>'
                  f'<p>{link("Full price list", "/pricing/")}</p></div>')
    body += sec("04", "Timeline", "What to expect.", "ctime-h", timeline, tone="section--bone")
    review = review_block(c["review"]) if c.get("review") else ""
    body += sec("05", "Price", "Pricing.", "cprice-h", prices + review)
    body += faq_section(c["faq"], num="06", heading=f"{title_name} questions.", tone="section--paper")
    body += cta_final()
    alt = {"en": path, "es": country_path(c, "es")} if c.get("es") else None
    title = (f"Apostille for {title_name} from Kansas City | Midwest" if apost else f"Embassy Legalization for {title_name} | Midwest")
    if len(title) > 60:
        title = f"Apostille for {title_name} | Midwest Apostille & Notary"
    desc = (f"Apostille for {c['name']} from Kansas City: common documents, {c['tr'] + ' translation, ' if c['tr'] else ''}timeline and price. Missouri {MO_STD}, Kansas {KS_STD}."
            if apost else f"Embassy legalization for {c['name']} from Kansas City: why an apostille is not accepted, {c['tr']} translation, timeline and pricing.")
    return page(path, title, desc, body, active="resources", crumbs=crumbs, og_image="international-route", alt=alt,
                keyword=("apostille for " if apost else "embassy legalization for ") + title_name,
                schema=[service_schema(path, h1, lead, "Apostille services" if apost else "Embassy legalization",
                                       area=[{"@type": "Country", "name": title_name}]), faq_schema(path, c["faq"])])


def country_page_es(c):
    path = country_path(c, "es")
    n = c["es"]["name"]
    t = ES_TEXT[c["slug"]]
    crumbs = [("Servicios en español", "/servicios-de-notaria-y-apostilla/"), (f"Apostilla para {n}", path)]
    lead = f"Los documentos para {n} necesitan una apostilla. Apostillamos documentos de Missouri, Kansas y otros estados, agregamos la traducción al español y los enviamos a usted o al extranjero."
    body = page_hero(f"Apostilla para {n} desde Kansas City", lead, crumbs, image="international-route",
                     alt="Certificados y pasaportes frente a un mapa del mundo", lab="Apostilla", lang="es",
                     buttons=cta_btn(label="Iniciar revisión de documentos") + call_btn(label=f"Llamar {PHONE}"))
    body += f'''
<section class="section" aria-labelledby="route-h">
  <div class="container split split--text">
    <div>{shead("01", "Ruta", "Se acepta la apostilla.", "route-h", cls="shead--stack")}</div>
    <div class="prose-block"><p>{t["note"]}</p><p class="fine">{NO_ADVICE_ES}</p></div>
  </div>
</section>'''
    docs = "".join(f"<li>{d}</li>" for d in t["docs"])
    body += sec("02", "Documentos", f"Documentos que nuestros clientes envían a {n}.", "cdocs-h", f'<div class="prose-block"><ul>{docs}</ul></div>', tone="section--paper")
    body += sec("03", "Traducción", "Traducción al español.", "ctr-h",
                f'<div class="prose-block"><p>Normalmente se requiere traducción al español. Hacemos traducciones certificadas por ${TRANSLATION_PAGE} por página, o ${TRANSLATION_PAGE_3PLUS} por página en documentos de tres páginas o más, y confirmamos si se hace antes o después de la apostilla.</p></div>')
    body += sec("04", "Plazos", "Qué esperar.", "ctime-h", rows([
        ("Documentos de Missouri y Kansas", f"El mismo día si llegan antes de la hora límite, o de {APOSTILLE_STD_TIME_ES} en servicio estándar."),
        ("Otros estados", "Servicio estándar o urgente; Texas urgente en 2 a 3 días hábiles, otros estados con cotización."),
        ("Reportes del FBI", f"Apostilla del Departamento de Estado de EE. UU. ({FBI_APOSTILLE}); el plazo depende del volumen del departamento."),
        ("Envío", "FedEx con rastreo en EE. UU., o FedEx y DHL al extranjero.")], cls="rows--4"), tone="section--bone")
    body += sec("05", "Precio", "Precios.", "cprice-h", price_table("es", rows=PRICES_ES[:4] + [PRICES_ES[6]]) + price_notes("es", guarantee=False))
    body += cta_final(heading="Obtenga claridad antes de enviar sus documentos.",
                      text="Cuéntenos qué documento tiene y a dónde va. Confirmamos la ruta, el precio y un plazo realista antes de enviar nada.", lang="es")
    alt = {"en": country_path(c), "es": path}
    title = f"Apostilla para {n} desde Kansas City | Midwest"
    return page(path, title,
                f"Apostilla para {n} desde Kansas City: documentos comunes, traducción al español, plazos y precios. Missouri {MO_STD}, Kansas {KS_STD}.",
                body, active="resources", lang="es", crumbs=crumbs, og_image="international-route", alt=alt,
                keyword=f"apostilla para {n}",
                schema=[service_schema(path, f"Apostilla para {n}", lead, "Apostille services", area=[{"@type": "Country", "name": c["name"]}])])


def build_all():
    _check_routes()
    out = [country_page(c) for c in COUNTRIES]
    out += [country_page_es(c) for c in COUNTRIES if c.get("es")]
    return out

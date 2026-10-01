"""Time-sensitive business facts, kept in one place so they can be updated without touching layouts.

Sources:
  - midnotarypro-website-content.pdf (the client's original published copy)
  - Website_Updates_for_Developer.pdf (client change list, October 2026): pricing, cutoffs,
    guarantee, policy wording, partner wording.
Values set to None are still to be supplied by the client; the templates leave them out
(or show the interim wording below) until they are filled in.
"""

REVIEWED = "2026-10"

# --------------------------------------------------------------------------- pricing (change list, section 2)
# (service, standard, same-day / expedited or None)
PRICES = [
    ("Missouri apostille", "$90", "$180 same day"),
    ("Kansas apostille", "$110", "$250 same day"),
    ("Texas apostille", "$190", "$400 expedited (2 to 3 business days)"),
    ("All other states", "$190", "Quoted on request"),
    ("FBI fingerprinting", "$90", None),
    ("FBI background check apostille", "$155", None),
    ("FBI fingerprint + apostille package", "$229", None),
    ("U.S. return shipping (tracked FedEx)", "$45 flat", "Overnight available for an extra fee"),
    ("International shipping (FedEx/DHL)", "Quoted by destination", None),
    ("Certified translation", "$45 per page; $35 per page for every page on documents of three pages or more", None),
]
PRICES_ES = [
    ("Apostilla de Missouri", "$90", "$180 el mismo día"),
    ("Apostilla de Kansas", "$110", "$250 el mismo día"),
    ("Apostilla de Texas", "$190", "$400 urgente (2 a 3 días hábiles)"),
    ("Otros estados", "$190", "Cotización a solicitud"),
    ("Huellas digitales del FBI", "$90", None),
    ("Apostilla del reporte del FBI", "$155", None),
    ("Paquete de huellas + apostilla del FBI", "$229", None),
    ("Envío de regreso en EE. UU. (FedEx con rastreo)", "$45 tarifa fija", "Envío nocturno disponible con costo adicional"),
    ("Envío internacional (FedEx/DHL)", "Cotización según destino", None),
    ("Traducción certificada", "$45 por página; $35 por página en todas las páginas de documentos de tres páginas o más", None),
]

MO_STD, MO_SAME = "$90", "$180"
KS_STD, KS_SAME = "$110", "$250"
TX_STD, TX_EXP, TX_EXP_TIME = "$190", "$400", "2 to 3 business days"
OTHER_STD = "$190"
FBI_PRINTS, FBI_APOSTILLE, FBI_PACKAGE = "$90", "$155", "$229"
SHIP_US = "$45"
TRANSLATION_PAGE, TRANSLATION_PAGE_3PLUS = 45, 35  # USD per page

PRICE_NOTE = "State filing fees are included in our pricing."
PRICE_NOTE_ES = "Las tarifas estatales de trámite están incluidas en nuestros precios."
CUTOFFS = "Kansas same-day: documents received by 10 AM. Missouri same-day: documents received by 1 PM."
CUTOFFS_ES = "Kansas el mismo día: documentos recibidos antes de las 10 AM. Missouri el mismo día: documentos recibidos antes de la 1 PM."
GUARANTEE = "If your document arrives before the same-day cutoff and we don’t complete it that day, we refund the expedited fee."
GUARANTEE_ES = "Si su documento llega antes de la hora límite del mismo día y no lo completamos ese día, le reembolsamos la tarifa urgente."
POLICY = ("Requirements are set by the destination country and can change. We are not responsible if a foreign office or "
          "embassy changes its requirements or rejects a document for reasons outside our control.")
POLICY_ES = ("Los requisitos los fija el país de destino y pueden cambiar. No somos responsables si una oficina o embajada "
             "extranjera cambia sus requisitos o rechaza un documento por razones fuera de nuestro control.")

# Multiple-document discount: the client is still deciding (change list, section 2). When set, it is shown under
# the pricing table, e.g. "$90 for the first Missouri document, $XX for each additional document".
MULTI_DOC_DISCOUNT = None

# Standard turnaround for Missouri and Kansas apostilles, from the original content PDF. To confirm with the client
# against the new pricing.
APOSTILLE_STD_TIME = "7 to 14 business days"
APOSTILLE_STD_TIME_ES = "7 a 14 días hábiles"

# Arabic and French pages stay noindex until the client's native speaker has reviewed them (change list, section 3).
INTL_REVIEWED = {"ar": False, "fr": False}

# --------------------------------------------------------------------------- business details still to be supplied
# Opening hours: open 24 hours, 7 days a week (client, October 2026). schema.org openingHoursSpecification rows.
OPENING_HOURS = [("Monday Tuesday Wednesday Thursday Friday Saturday Sunday", "00:00", "23:59")]
HOURS_TEXT = "Open 24 hours, 7 days a week"
HOURS_TEXT_ES = "Abierto las 24 horas, los 7 días de la semana"
# Google rating, e.g. ("5.0", 48). Left out of the schema until supplied.
GOOGLE_RATING = None
PRICE_RANGE = "$45-$400"

# Optional hosted payment links (Stripe or Square). When set, the order form links to them after submission.
PAYMENT_DEPOSIT_URL = None
PAYMENT_FULL_URL = None

# Jail notary pricing (content PDF, Jail Notary page).
JAIL_PRICES_EN = [
    ("Jackson County (before 6 PM)", "$79", ""),
    ("Wyandotte County (before 6 PM)", "$99", ""),
    ("After 6 PM (any county)", "$200", "flat, includes 1 notarization and travel"),
    ("Additional documents", "+$10", "each"),
    ("Extra wait time (after 30 min)", "+$20", "per 30 minutes"),
    ("Witness (if required)", "+$20", ""),
]
JAIL_PRICES_ES = [
    ("Condado de Jackson (antes de las 6 PM)", "$79", ""),
    ("Condado de Wyandotte (antes de las 6 PM)", "$99", ""),
    ("Después de las 6 PM (cualquier condado)", "$200", "tarifa fija, incluye 1 notarización y traslado"),
    ("Documentos adicionales", "+$10", "cada uno"),
    ("Tiempo de espera extra (después de 30 min)", "+$20", "por cada 30 minutos"),
    ("Testigo (si es necesario)", "+$20", ""),
]

# Languages the team supports (content PDF, About and Document Preparation pages).
LANGUAGES = "English, Spanish, Arabic and French"

# Partner for fingerprinting (change list, section 7).
PARTNER = "Midwest Identity Services"
PARTNER_URL = "https://midwestidentityservices.com/"
PARTNER_LINE = ("Fingerprinting is provided through our partner, Midwest Identity Services, at the same location, so you "
                "can get your FD-258 card or FBI fingerprints and your apostille in one visit.")

# Date shown on the legal pages (pages_legal.py). Update it whenever their wording changes.
LEGAL_UPDATED = "October 1, 2026"

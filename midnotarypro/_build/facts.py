"""Time-sensitive business facts, kept in one place so they can be updated without touching layouts.

Every value comes from midnotarypro-website-content.pdf (the client's published copy).
Review these with the client before each release; change REVIEWED when they are confirmed.
"""

REVIEWED = "2026-09"

# Apostille pricing and turnaround (content PDF, Apostille page FAQ).
APOSTILLE_VIP_PRICE = "$650"
APOSTILLE_STD_PRICE = "$190"
APOSTILLE_STD_TIME = "7 to 14 business days"
APOSTILLE_RUSH_OTHER_STATES = "48 to 72 hours"

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

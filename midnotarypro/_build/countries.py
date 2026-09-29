"""Country data for the Hague / non-Hague explorer.

Source of truth: midnotarypro-website-content.pdf
  - HAGUE: "Hague Apostille Member Countries (2025)" list on the
    FBI Apostille for Hague Countries page (pp. 28-29), the most complete list
    on the site. Region groupings are kept exactly as published there.
  - LEGALIZATION: "FBI Background Check Attestation by Country" guide on the
    FBI Attestation Legalization page (pp. 33-35), reproduced verbatim.
  - NON_HAGUE_MENTIONED: non-Hague countries named elsewhere on the site
    without a country guide entry (blog post, p. 51).
Nothing here is invented; do not add requirements that are not in the PDF.
"""

HAGUE = {
    "Americas": [
        "Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil",
        "Canada", "Chile", "Colombia", "Costa Rica", "Dominica",
        "Dominican Republic", "Ecuador", "El Salvador", "Grenada", "Guatemala",
        "Guyana", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama",
        "Paraguay", "Peru", "Saint Kitts and Nevis", "Saint Lucia",
        "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago",
        "United States", "Uruguay", "Venezuela",
    ],
    "Europe": [
        "Albania", "Andorra", "Austria", "Belarus", "Belgium",
        "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus",
        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany",
        "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia",
        "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova",
        "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway",
        "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia",
        "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey",
        "Ukraine", "United Kingdom",
    ],
    "Asia": [
        "Armenia", "Azerbaijan", "Bahrain", "Brunei", "Georgia", "India",
        "Indonesia", "Israel", "Japan", "Kazakhstan", "Kyrgyzstan", "Mongolia",
        "Oman", "Pakistan", "Philippines", "Republic of Korea", "Saudi Arabia",
        "Singapore", "Tajikistan", "Uzbekistan", "Vietnam",
    ],
    "Africa": [
        "Botswana", "Burundi", "Lesotho", "Liberia", "Malawi", "Morocco",
        "Namibia", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles",
        "South Africa", "Swaziland", "Tunisia",
    ],
    "Oceania": [
        "Australia", "Cook Islands", "Fiji", "Marshall Islands",
        "New Zealand", "Niue", "Palau", "Samoa", "Tonga", "Vanuatu",
    ],
    "Other": [
        "Antigua and Barbuda", "Bangladesh", "Cape Verde",
        "China incl. HK & Macao", "Kosovo", "Mauritius",
    ],
}

# Notes published alongside a country name in the PDF.
HAGUE_NOTES = {
    "Canada": "Joined Jan 2024, effective 2025",
}

# (name, region, embassy, translation or None, final in-country step, common uses)
LEGALIZATION = [
    ("United Arab Emirates (UAE)", "Asia", "UAE Embassy, Washington DC",
     "Certified Arabic required", "UAE Ministry of Foreign Affairs",
     ["Employment & work visa", "Long-term residency & Golden Visa",
      "Family sponsorship", "Professional licensing & business setup"]),
    ("Egypt", "Africa", "Egyptian Embassy, Washington DC",
     "Certified Arabic typically required", "Egyptian Ministry of Foreign Affairs",
     ["Work permit & employment", "Residency applications",
      "Marriage & family visa", "Business licensing"]),
    ("Ethiopia", "Africa", "Ethiopian Embassy, Washington DC",
     "Amharic may be required", "Ethiopian Ministry of Foreign Affairs",
     ["Employment visa", "Residency & work permit", "Family reunification",
      "Business registration"]),
    ("Iraq", "Asia", "Iraqi Embassy, Washington DC", None,
     "Iraqi Ministry of Foreign Affairs",
     ["Work permit & employment", "Residency applications",
      "Business & investment", "Family sponsorship"]),
    ("Jordan", "Asia", "Jordanian Embassy, Washington DC", None,
     "Jordanian Ministry of Foreign Affairs",
     ["Employment & work visa", "Residency applications",
      "Family sponsorship", "Professional licensing"]),
    ("Kuwait", "Asia", "Kuwait Embassy, Washington DC", None,
     "Kuwait Ministry of Foreign Affairs",
     ["Employment & work visa", "Residency permit", "Family sponsorship",
      "Business licensing"]),
    ("Libya", "Africa", "Libyan Embassy, Washington DC", None,
     "Libyan Ministry of Foreign Affairs",
     ["Work permit & employment", "Residency applications",
      "Business registration", "Family visa"]),
    ("Malaysia", "Asia", "Malaysian Embassy, Washington DC",
     "English accepted; Malay may be required",
     "Malaysian Ministry of Foreign Affairs",
     ["Employment pass & work visa", "MM2H residency program",
      "Business registration", "Professional licensing"]),
    ("Mozambique", "Africa", "Mozambican Embassy, Washington DC",
     "Certified Portuguese typically required",
     "Mozambican Ministry of Foreign Affairs",
     ["Work permit & employment", "Residency applications",
      "Business registration", "Family visa"]),
    ("Qatar", "Asia", "Qatari Embassy, Washington DC", None,
     "Qatar Ministry of Foreign Affairs",
     ["Employment & work visa", "Qatar residency permit",
      "Family sponsorship", "Professional licensing"]),
    ("Syria", "Asia", "Syrian Embassy (check current status)", None,
     "Syrian Ministry of Foreign Affairs",
     ["Work permit & employment", "Residency applications", "Family visa",
      "Business registration"]),
    ("Taiwan", "Asia", "TECRO, Washington DC",
     "Certified Chinese typically required", "Taiwan MOFA authentication",
     ["Employment & work permit", "Residency applications",
      "Business registration", "Marriage & family visa"]),
    ("Thailand", "Asia", "Royal Thai Embassy, Washington DC",
     "Certified Thai may be required", "Thai Ministry of Foreign Affairs",
     ["Work permit & non-immigrant visa", "Thailand Elite / LTR residency",
      "Business registration", "Marriage & family visa"]),
    ("Vietnam", "Asia", "Vietnamese Embassy, Washington DC",
     "Certified Vietnamese required", "Vietnamese Ministry of Foreign Affairs",
     ["Work permit & employment visa", "Temporary residency card",
      "Business registration", "Family sponsorship"]),
]

# Named as non-Hague on the site (blog, p. 51) without a guide entry.
NON_HAGUE_MENTIONED = [("Lebanon", "Asia")]

# Display name -> name used in the world-atlas dataset.
ATLAS_NAME = {
    "Bosnia and Herzegovina": "Bosnia and Herz.",
    "Czech Republic": "Czechia",
    "Dominican Republic": "Dominican Rep.",
    "North Macedonia": "Macedonia",
    "Republic of Korea": "South Korea",
    "United States": "United States of America",
    "Swaziland": "eSwatini",
    "Saint Kitts and Nevis": "St. Kitts and Nevis",
    "Saint Vincent and the Grenadines": "St. Vin. and Gren.",
    "Sao Tome and Principe": "São Tomé and Principe",
    "Marshall Islands": "Marshall Is.",
    "Cook Islands": "Cook Is.",
    "Cape Verde": "Cabo Verde",
    "Antigua and Barbuda": "Antigua and Barb.",
    "China incl. HK & Macao": "China",
    "United Arab Emirates (UAE)": "United Arab Emirates",
}


def slug(name):
    import re
    return re.sub(r"[^a-z0-9]+", "-", ATLAS_NAME.get(name, name).lower()).strip("-")

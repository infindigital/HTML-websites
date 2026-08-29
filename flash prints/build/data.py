# -*- coding: utf-8 -*-
"""Site-wide data: business info, navigation, categories, FAQ, testimonials,
and the product -> category mapping rules."""

SITE = {
    "name": "Flash Print Solution",
    "domain": "https://flashprintsolution.com",
    "tagline": "Printing Services in Dubai",
    "phone_display": "+971 58 891 7109",
    "phone_e164": "+971588917109",
    "whatsapp": "971588917109",
    "email": "sales@flashprintsolution.com",
    "hours": "Monday to Saturday, 9:30 AM to 7:00 PM",
    "address": "Silver Tower – BB-SIT-#87 – 20 Marasi Dr – Business Bay – Za’abeel – Dubai – United Arab Emirates",
    "address_short": "Silver Tower, Business Bay, Dubai, UAE",
    "map_embed": (
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9017687577457"
        "!2d55.264345600000006!3d25.184711699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768"
        "!4f13.1!3m3!1m2!1s0x3e5f69d18c9c2c6f%3A0xf4d6e248a09c329e!2sSilver%20Tower"
        "!5e1!3m2!1sen!2sin!4v1787923551604!5m2!1sen!2sin"
    ),
    "social": {
        "facebook": "https://www.facebook.com/",
        "instagram": "https://www.instagram.com/",
        "linkedin": "https://www.linkedin.com/",
        "youtube": "https://www.youtube.com/",
    },
    "google_reviews": "https://www.google.com/search?q=Flash+Print+Solution",
}

# The six service groups shown on the live site (home + footer).
CATEGORIES = [
    {
        "slug": "business-printing",
        "nav": "Business Stationery",
        "title": "Business Stationery Printing in Dubai",
        "short": "Business Printing",
        "tag": "Business Stationery",
        "intro": "Professional business stationery and office forms that keep your brand consistent across every touchpoint — from business cards and letterheads to invoice books and ID cards.",
        "meta": "Business stationery printing in Dubai — business cards, letterheads, envelopes, NCR forms, invoice books, ID cards and more from Flash Print Solution.",
    },
    {
        "slug": "promotional-printing",
        "nav": "Marketing & Promotional",
        "title": "Marketing & Promotional Printing in Dubai",
        "short": "Promotional Printing",
        "tag": "Marketing & Promotional",
        "intro": "Eye-catching marketing collateral and branded giveaways that get your business noticed — brochures, flyers, mugs, apparel, bags and promotional items printed to a premium finish.",
        "meta": "Marketing and promotional printing in Dubai — brochures, flyers, custom mugs, apparel, tote bags and branded merchandise by Flash Print Solution.",
    },
    {
        "slug": "large-format-printing",
        "nav": "Large Format & Signage",
        "title": "Large Format Printing in Dubai",
        "short": "Large Format Printing",
        "tag": "Large Format",
        "intro": "High-impact large format printing for exhibitions, retail and events — roll-up banners, flex banners, backdrops, canvas, wall murals and display systems in vivid, durable quality.",
        "meta": "Large format printing in Dubai — roll-up banners, flex banners, backdrops, canvas, pop-up displays and wall murals from Flash Print Solution.",
    },
    {
        "slug": "signage-solutions",
        "nav": "Outdoor & Indoor Signage",
        "title": "Signage Solutions in Dubai",
        "short": "Signage Solutions",
        "tag": "Signage",
        "intro": "Indoor and outdoor signage that builds a bold, professional brand presence — 3D letters, ACP and acrylic sign boards, light boxes, safety signage and complete wayfinding systems.",
        "meta": "Signage solutions in Dubai — 3D letter signage, ACP and acrylic sign boards, LED light boxes, safety signage and wayfinding by Flash Print Solution.",
    },
    {
        "slug": "corporate-printing",
        "nav": "Corporate & Branding",
        "title": "Corporate Printing & Branding in Dubai",
        "short": "Corporate Printing",
        "tag": "Corporate & Branding",
        "intro": "Polished corporate print and identity work that communicates credibility — company profiles, brand manuals, training manuals, certificates and full corporate identity kits.",
        "meta": "Corporate printing and branding in Dubai — company profiles, brand manuals, corporate identity kits, certificates and design services by Flash Print Solution.",
    },
    {
        "slug": "custom-event-printing",
        "nav": "Custom & Event",
        "title": "Custom & Event Printing in Dubai",
        "short": "Custom & Event Printing",
        "tag": "Custom & Event",
        "intro": "Bespoke printing for events, retail and vehicles — stickers and labels, vehicle branding, floor and window graphics, retail displays and custom packaging tailored to your idea.",
        "meta": "Custom and event printing in Dubai — stickers, vehicle branding, floor and window graphics, retail displays and custom packaging from Flash Print Solution.",
    },
]
CAT_BY_SLUG = {c["slug"]: c for c in CATEGORIES}

# Services landing catalogue — the full grid of service tiles shown on the
# Services page (mirrors the reference layout). Each tile: (title, library
# image index, internal service page slug it links to).
SERVICES_CATALOG = [
    ("Business Stationery", 4, "business-printing"),
    ("Marketing & Promotional Printing", 158, "promotional-printing"),
    ("Large Format & Signage", 8, "large-format-printing"),
    ("Outdoor Signage", 3, "signage-solutions"),
    ("Corporate Printing", 58, "corporate-printing"),
    ("Event & Exhibition", 87, "large-format-printing"),
    ("Indoor Signage", 10, "signage-solutions"),
    ("Branding & Corporate Identity", 11, "corporate-printing"),
    ("Vehicle Branding", 13, "signage-solutions"),
    ("Sticker & Label Printing", 14, "custom-event-printing"),
    ("Apparel & Fabric Printing", 15, "promotional-printing"),
    ("Packaging Printing", 16, "custom-event-printing"),
    ("Safety & Industrial Printing", 18, "signage-solutions"),
    ("Laser Cutting & Engraving", 101, "custom-event-printing"),
    ("POS & Retail Display Printing", 104, "promotional-printing"),
    ("Wall, Floor & Glass Branding", 112, "signage-solutions"),
    ("Construction & Site Printing", 96, "large-format-printing"),
    ("Architectural & Interior Graphics", 57, "signage-solutions"),
    ("Educational & Institutional Printing", 24, "business-printing"),
    ("Hospitality Printing", 25, "business-printing"),
    ("Healthcare & Medical Printing", 26, "business-printing"),
    ("Government & Compliance Printing", 27, "business-printing"),
    ("Sticker Materials", 17, "custom-event-printing"),
    ("Fabrication & Installation Services", 31, "signage-solutions"),
    ("Design & Creative Services", 149, "corporate-printing"),
    ("Maintenance & Replacement Services", 155, "signage-solutions"),
]

# Priority-ordered keyword rules (first hit wins) mapping a product slug to a
# category slug. Tuned against the real 133-item catalogue.
CATEGORY_RULES = [
    ("signage-solutions", [
        "3d-letter", "acp-sign", "acrylic", "backlit", "led-light", "neon",
        "flex-sign", "foam-board-sign", "directional", "wayfinding", "reception-signage",
        "room-signage", "name-board", "name-boards", "hospital-signage", "mandatory-signage",
        "regulatory", "reflective-signage", "safety-sign", "safety-board", "warning-label",
        "project-sign", "construction-board", "facility-identification", "sign-board-install",
        "sign-maintenance", "metal-engraving", "wood-engraving", "mdf-cutting", "letter-cutting",
        "plaques", "frosted-glass", "office-name", "patient-board", "danglers",
    ]),
    ("large-format-printing", [
        "flex-banner", "roll-up", "x-banner", "pop-up-display", "standee", "backdrop",
        "canvas", "vinyl-printing", "foam-board-printing", "wallpaper", "wall-mural",
        "hoarding", "one-way-vision", "exhibition-stand", "poster", "mesh",
    ]),
    ("custom-event-printing", [
        "vehicle", "wrap", "fleet", "car-sticker", "sticker", "floor-graphic", "floor-sticker",
        "glass-sticker", "wall-graphic", "window-display", "counter-display", "end-cap",
        "shelf-talker", "wobbler", "custom-box", "product-packaging", "product-labels",
        "packaging", "stage-branding", "magnetic", "die-cut", "pvc", "transparent",
        "reflective-sticker", "one-way", "tent-card", "table-mat", "restaurant-menu",
        "door-hanger", "event", "sticker-fixing", "sticker-removal",
    ]),
    ("corporate-printing", [
        "company-profile", "brand-manual", "corporate-identity", "training-manual",
        "office-branding", "on-site-branding", "rebranding", "logo-design", "graphic-design",
        "artwork", "print-ready", "diaries", "certificate",
    ]),
    ("business-printing", [
        "business-card", "letterhead", "envelope", "ncr", "invoice", "receipt", "id-card",
        "files-and-folders", "folder", "barcode", "label", "exam-paper", "report-card",
        "medical-form", "prescription", "doctor", "scrub", "uniform", "safety-vest", "stamp",
    ]),
    ("promotional-printing", [
        "brochure", "flyer", "leaflet", "mug", "pen", "cap", "keychain", "usb",
        "t-shirt", "polo", "hoodie", "paper-bag", "kraft-bag", "calendar",
    ]),
]
DEFAULT_CATEGORY = "promotional-printing"

# Manual overrides where a keyword rule would misfile a product.
CATEGORY_OVERRIDES = {
    "table-mats": "promotional-printing",
    "tent-cards": "promotional-printing",
    "tent-cards-2": "promotional-printing",
    "restaurant-menus": "promotional-printing",
    "door-hangers": "promotional-printing",
    "door-hangers-2": "promotional-printing",
    "danglers": "promotional-printing",
    "uniform-printing": "promotional-printing",
    "custom-t-shirts": "promotional-printing",
    "diaries": "business-printing",
    "certificates": "corporate-printing",
    "id-cards": "business-printing",
}

# Homepage product tabs. Exact per-page ordering mirrored from the live-site
# reference screenshots (Best Selling / New Arrivals / Latest Collection), each
# collection paginated 10 per page. `new-arrivals` and `latest-collection` are
# fully specified (rendered verbatim); `best-selling` lists the referenced first
# page and is topped up from the catalogue for the remaining pages.
TABS_EXACT = {"new-arrivals", "latest-collection"}
TABS = {
    # Reference: Screenshot 185109 (page 1). Remaining pages auto-filled.
    "best-selling": [
        "sticker-removal", "logo-design", "graphic-design", "on-site-branding",
        "transparent-stickers", "warning-labels", "medical-forms", "table-mats",
        "training-manuals", "id-cards", "business-cards-and-gold-foil", "roll-up-banners",
        "3d-letter-signage", "acp-sign-boards", "flyers-and-leaflets", "mugs",
        "custom-t-shirts", "vinyl-stickers", "foam-board-printing", "company-profile-printing",
    ],
    # Reference: Screenshots 185130 / 185204 / 185244 / 185319 / 185357 (pages 1-5).
    "new-arrivals": [
        # p1
        "damage-replacement-printing", "rebranding-services", "sign-maintenance",
        "sign-board-installation", "magnetic-stickers", "pvc-stickers", "patient-boards",
        "prescription-pads", "door-hangers", "restaurant-menus",
        # p2
        "exam-papers", "project-sign-boards", "wallpaper-printing", "floor-graphics",
        "glass-stickers", "wall-murals", "end-cap-displays", "metal-engraving",
        "wood-engraving", "reflective-signage",
        # p3
        "stage-branding", "exhibition-stands", "labels-and-tags", "product-packaging",
        "kraft-bags", "pens", "custom-t-shirts", "magnetic-stickers", "product-labels",
        "die-cut-stickers",
        # p4
        "full-vehicle-wrapping", "brand-manuals", "neon-sign-boards", "flex-sign-boards",
        "office-name-boards", "acrylic-sign-boards", "one-way-vision", "x-banners",
        "roll-up-banners", "tent-cards",
        # p5
        "danglers", "posters", "files-and-folders",
        "invoice-receipt-books-header-printing", "business-cards-and-gold-foil",
    ],
    # Reference: Screenshots 185147 / 185222 / 185301 / 185337 / 185413 (pages 1-5).
    "latest-collection": [
        # p1
        "print-ready-file-setup", "artwork-correction", "sticker-fixing",
        "vehicle-branding-installation", "reflective-stickers", "paper-stickers",
        "facility-identification-boards", "regulatory-stickers", "mandatory-signage",
        "hospital-signage",
        # p2
        "tent-cards", "room-signage", "report-cards", "hoarding-graphics", "safety-boards",
        "window-displays", "interior-panels", "canvas-printing", "wayfinding-graphics",
        "frosted-glass-film",
        # p3
        "counter-displays", "standee-displays", "shelf-talkers", "construction-boards",
        "warning-labels", "event-backdrops", "labels-and-tags", "custom-boxes",
        "polo-shirts", "t-shirt-printing",
        # p4
        "diaries", "barcode-labels", "transparent-stickers", "partial-wraps",
        "company-profile-printing", "led-light-boxes", "acp-sign-boards", "foam-board-signs",
        "foam-board-printing", "flex-banners",
        # p5
        "stickers", "flyers-and-leaflets", "ncr-carbonless-forms", "envelopes",
    ],
}

FAQS = [
    ("What printing services do you offer in Dubai?",
     "Flash Print Solution offers a complete range of printing services in Dubai — business stationery, marketing and promotional printing, large format printing, indoor and outdoor signage, corporate printing and branding, plus custom and event printing. Whatever your requirement, our team can help you choose the right material, finish and format."),
    ("Do you provide same-day or express printing?",
     "Yes. For many products we offer fast turnaround and express options depending on the quantity, size and finishing required. Share your deadline when you request a quote and we will confirm the fastest realistic delivery time for your job."),
    ("Can you handle both small and large print orders?",
     "Absolutely. We support businesses of every size — from a single set of business cards to large-format signage and bulk corporate print runs — with reliable, cost-effective results and consistent quality."),
    ("Can you help with the design if I don't have artwork ready?",
     "Yes. Our in-house design team can create or refine your artwork, correct print-ready files and develop complete brand identities, so you are never held back by missing or low-quality design files."),
    ("How do I get a quote for my printing job?",
     "Simply tell us what you need — the product, quantity, size and timeline — through our contact form, by phone on +971 58 891 7109, or on WhatsApp. Our team will recommend the right solution and send you a clear quote."),
]

# (quote, name, role) — names/roles/quotes taken from the live site references.
TESTIMONIALS = [
    ("Flash Print Solution consistently delivers high quality printing services in Dubai and always meets our deadlines. The team is professional, responsive, and very easy to work with.",
     "Ravi Kumar", "Marketing Manager"),
    ("We have been using their printing services in Dubai for our business needs, and the results are always reliable. The quality is excellent and the turnaround time is impressive.",
     "Abdul Shuhaid", "Business Owner"),
    ("The team at Flash Print Solution understands exactly what we need. Their printing services in Dubai are efficient, detail oriented, and always delivered on time without compromising quality.",
     "Riya", "Operations Head"),
    ("For all our branding and marketing materials, we depend on their printing services in Dubai. The consistency, professionalism, and finish of their work truly stand out.",
     "Asif Yunus", "Brand Consultant"),
]

PROCESS = [
    ("Share Your Requirement", "Tell us what you need, quantity, size, and timeline, and our team will guide you.", "chat"),
    ("Design & Approval", "We review artwork or assist with design to ensure accurate print results.", "bulb"),
    ("Printing & Finishing", "Using modern printing technology, we produce sharp, high quality prints with proper finishing.", "gear"),
    ("Delivery or Pickup", "Your order is completed on time and delivered or ready for pickup as scheduled.", "hand"),
]

# Dubai service areas mentioned naturally in local-SEO copy.
AREAS = [
    "Business Bay", "Downtown Dubai", "Dubai Marina", "DIFC", "JLT", "Deira",
    "Bur Dubai", "Al Quoz", "Dubai Silicon Oasis", "Dubai Internet City",
    "Dubai Media City", "JBR", "Palm Jumeirah", "Mirdif", "Al Barsha",
    "Dubai South", "Jebel Ali", "Sharjah", "Abu Dhabi", "Ajman",
]

# "Who We Work With" — Printing Solutions Across Every Industry (emoji, title, copy).
INDUSTRIES = [
    ("\U0001F3E2", "Corporate & Finance",
     "Branded stationery, letterheads, folders, annual reports, and presentation materials that reflect your company's professionalism."),
    ("\U0001F6CD️", "Retail & E-Commerce",
     "Product packaging, shopping bags, hang tags, shelf talkers, and in-store signage that drive purchases and build brand recall."),
    ("\U0001F3E8", "Hospitality & Tourism",
     "Hotel menus, room cards, banners, welcome kits, and event collateral designed to create memorable guest experiences."),
    ("\U0001F3D7️", "Construction & Real Estate",
     "Site hoardings, property brochures, floor plan printouts, safety signage, and large-format materials for project sites."),
    ("\U0001FA7A", "Healthcare & Medical",
     "Patient forms, awareness posters, clinic branding, prescription pads, and compliance-friendly safety labels and signage."),
    ("\U0001F393", "Education & Institutions",
     "School stationery, certificates, event banners, prospectuses, and institutional branding materials for campuses and universities."),
    ("\U0001F4C5", "Events & Exhibitions",
     "Exhibition stands, backdrop banners, pop-up displays, event signage, and branded giveaways for trade shows and corporate events."),
    ("\U0001F37D️", "Food & Beverage",
     "Custom menus, food labels, takeaway packaging, promotional flyers, and branded packaging for restaurants, cafes, and cloud kitchens."),
]

# "Everything You Should Know About Getting Printed in Dubai" — guide blocks.
GUIDE = [
    ("Why quality printing still matters in a digital world",
     "It's easy to assume that everything has moved online — but the reality in Dubai is different. Walk into any business meeting, trade show, or retail outlet and you'll find printed materials doing a job that no digital ad can fully replace. A well-designed business card, a sharp brochure, or a striking outdoor banner creates a physical impression that stays with people. In a city as competitive and image-conscious as Dubai, the quality of your print materials directly reflects the quality of your brand."),
    ("What to expect from professional printing services in Dubai",
     "Not all print providers are the same. When you're choosing a printing partner in Dubai, look beyond just price. Good print quality comes down to the machines being used, the paper or substrate you're printing on, and the expertise of the team doing the color work. At Flash Print Solution, we run quality checks at every stage — from the pre-press proof to the final packaged delivery — because we know that one color mismatch or a poorly trimmed edge can undo an otherwise great design."),
    ("How we handle both small and large print orders",
     "Whether you need 100 business cards or 10,000 product labels, our process stays the same. You get a proper consultation, a clear quote, a digital proof before printing begins, and a finished product delivered on time. We don't treat small orders as less important — because for a small business owner, those 100 cards are just as critical as a bulk corporate run is for a large brand. Every job goes through the same workflow."),
    ("Same-day and express printing — when you need it fast",
     "Dubai moves quickly, and sometimes print deadlines catch you off guard. We offer express and same-day printing services for clients who need materials urgently — whether it's a last-minute event, an unexpected client meeting, or a promotional campaign that got pushed forward. Just get in touch with us, tell us what you need and by when, and we'll tell you honestly whether we can do it. No false promises, just straight answers."),
    ("Corporate printing packages for businesses in the UAE",
     "If your company regularly needs printed materials — stationery, branded collateral, packaging, or marketing print — it makes sense to work with a single printing partner who understands your brand guidelines and maintains consistency across every order. We work with several corporate clients in Dubai on a retainer basis, handling everything from monthly stationery restocks to large campaign rollouts. One point of contact, consistent quality, and reliable turnarounds."),
    ("Large format and outdoor printing for Dubai's market",
     "Dubai's outdoor advertising landscape is one of the most active in the region. From highway billboards to building wraps, mall banners to vehicle graphics — large format printing is in constant demand here. Our wide-format printing capabilities cover everything from standard vinyl banners and flex signs to premium-grade exhibition displays and architectural graphics. We use UV-resistant inks and high-durability substrates built to withstand Dubai's heat and sun exposure."),
]

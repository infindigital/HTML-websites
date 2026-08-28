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

# Homepage product tabs. Curated slug lists (first page mirrors the live site).
TABS = {
    "best-selling": [
        "sticker-removal", "logo-design", "graphic-design", "on-site-branding",
        "transparent-stickers", "warning-labels", "medical-forms", "table-mats",
        "training-manuals", "id-cards", "business-cards-and-gold-foil", "roll-up-banners",
        "3d-letter-signage", "acp-sign-boards", "flyers-and-leaflets", "mugs",
        "custom-t-shirts", "vinyl-stickers", "foam-board-printing", "company-profile-printing",
    ],
    "new-arrivals": [
        "led-light-boxes", "neon-sign-boards", "full-vehicle-wrapping", "canvas-printing",
        "wall-murals", "floor-graphics", "custom-boxes", "product-packaging",
        "pop-up-displays", "x-banners", "acrylic-sign-boards", "reflective-signage",
        "corporate-identity-kits", "brand-manuals", "die-cut-stickers", "one-way-vision",
        "hoodies", "polo-shirts", "paper-bags", "usb-flash-drives",
    ],
    "latest-collection": [
        "wallpaper-printing", "frosted-glass-film", "window-displays", "counter-displays",
        "shelf-talkers", "wobblers", "wood-engraving", "metal-engraving",
        "plaques-and-trophies", "exhibition-stands", "event-backdrops", "stage-branding",
        "restaurant-menus", "tent-cards", "door-hangers", "keychains",
        "pens", "caps", "diaries", "certificates",
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

TESTIMONIALS = [
    ("Flash Print Solution consistently delivers high quality printing services in Dubai and always meets our deadlines. The team is professional, responsive, and very easy to work with.",
     "Operations Manager", "Business Bay, Dubai"),
    ("We have been using their printing services in Dubai for our business needs, and the results are always reliable. The quality is excellent and the turnaround time is impressive.",
     "Marketing Lead", "Downtown Dubai"),
    ("From signage to corporate stationery, everything was produced to a premium standard. Great communication and genuine attention to detail on every order.",
     "Brand Manager", "DIFC, Dubai"),
    ("Their large format printing made our exhibition stand look fantastic. Fast, dependable and competitively priced — exactly what we needed.",
     "Events Coordinator", "Dubai Marina"),
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

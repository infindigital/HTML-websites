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
    "whatsapp_url": ("https://api.whatsapp.com/send?phone=971588917109"
                     "&text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20printing%20"
                     "products%20and%20would%20like%20more%20information."),
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
        "instagram": "https://www.instagram.com/flashprintingsolution/",
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

# Internal service pages — the short marketing template (hero, intro, featured
# image + key features, "print that…" band with three numbered cards, and a
# mid-page dark CTA banner). Content transcribed verbatim from the reference
# designs. business-printing uses a separate long-form template (SERVICE_LONG).
SERVICE_PAGES = {
    "promotional-printing": {
        "hero_title_html": 'Promotional <span class="accent">Printing</span>',
        "heading": "Promotional Printing",
        "intro": "Our promotional printing services help businesses attract attention and communicate messages clearly. We produce visually appealing materials that support marketing campaigns, promotions, and brand awareness efforts.",
        "image": 158,
        "features": [
            "Eye catching promotional materials",
            "Vibrant color printing",
            "Suitable for marketing and advertising",
            "Multiple size and format options",
        ],
        "band_heading": "Print That Promotes Your Brand Effectively",
        "band_sub": "We combine quality printing with impactful designs to help your promotions stand out.",
        "cards": [
            ("High Visual Impact", "Bright colors and clear layouts that draw attention instantly."),
            ("Marketing Focused Output", "Designed to support promotions, offers, and campaigns."),
            ("Flexible Quantities", "Printing solutions for both small and large promotional needs."),
        ],
        "cta_html": 'Make Your <span class="accent">Promotions</span> More Visible',
        "banner_bg": "assets/images/og/prom.webp",
        "meta": "Promotional printing in Dubai from Flash Print Solution — eye catching, vibrant marketing materials for campaigns, promotions and brand awareness.",
    },
    "large-format-printing": {
        "hero_title_html": 'Large Format <span class="accent">Printing</span>',
        "heading": "Large Format Printing",
        "intro": "Large format printing is ideal for creating strong visual presence in indoor and outdoor spaces. We deliver bold, high resolution prints that help businesses gain visibility and attract customers.",
        "image": 8,
        "features": [
            "High resolution large scale prints",
            "Indoor and outdoor suitability",
            "Strong and durable materials",
            "Excellent color consistency",
        ],
        "band_heading": "Large Prints That Make a Big Impression",
        "band_sub": "Our large format solutions are designed to deliver clarity, durability, and maximum visibility.",
        "cards": [
            ("Bold Visuals", "Sharp and vibrant prints even at larger sizes."),
            ("Durable Materials", "Long lasting prints suitable for extended use."),
            ("Custom Sizes", "Tailored dimensions to match your space and requirements."),
        ],
        "cta_html": 'Increase Your Brand Visibility with <span class="accent">Large Prints</span>',
        "banner_bg": "assets/images/og/large.avif",
        "meta": "Large format printing in Dubai from Flash Print Solution — bold, high resolution banners, signage and displays for indoor and outdoor visibility.",
    },
    "signage-solutions": {
        "hero_title_html": '<span class="accent">Signage</span> Solutions',
        "heading": "Signage Solutions",
        "intro": "Our signage solutions help businesses communicate clearly and professionally through indoor and outdoor signs. From branding to directional signage, we deliver solutions that enhance visibility and customer experience.",
        "image": 3,
        "features": [
            "Indoor and outdoor signage options",
            "Clear and readable designs",
            "Strong and durable construction",
            "Custom branding solutions",
        ],
        "band_heading": "Signage That Guides and Attracts",
        "band_sub": "We create signage that improves navigation, visibility, and brand recognition.",
        "cards": [
            ("Clear Communication", "Easy to read signage for better customer experience."),
            ("Professional Appearance", "Clean and modern designs that match your brand."),
            ("Long Lasting Quality", "Built to withstand weather and daily usage."),
        ],
        "cta_html": 'Upgrade Your Business <span class="accent">Signage</span> Today',
        "meta": "Signage solutions in Dubai from Flash Print Solution — indoor and outdoor signs, directional and branded signage that enhance visibility.",
    },
    "corporate-printing": {
        "hero_title_html": 'Corporate <span class="accent">Printing</span>',
        "heading": "Corporate Printing",
        "intro": "Corporate printing services are designed for organizations that require consistent and professional branded materials. We support offices, institutions, and enterprises with reliable printing solutions.",
        "image": 58,
        "features": [
            "Corporate stationery and branding",
            "Uniform print consistency",
            "Professional presentation",
            "Suitable for internal and external use",
        ],
        "band_heading": "Printing Solutions for Corporate Standards",
        "band_sub": "We understand corporate requirements and deliver printing that reflects professionalism and trust.",
        "cards": [
            ("Brand Consistency", "Uniform designs across all corporate materials."),
            ("Professional Quality", "High standard printing suitable for official use."),
            ("Efficient Process", "Smooth workflow for regular corporate requirements."),
        ],
        "cta_html": 'Support Your <span class="accent">Corporate Printing</span> Needs',
        "meta": "Corporate printing in Dubai from Flash Print Solution — consistent, professional branded stationery and materials for offices and enterprises.",
    },
    "custom-event-printing": {
        "hero_title_html": 'Custom &amp; <span class="accent">Event Printing</span>',
        "heading": "Custom & Event Printing",
        "intro": "Custom and event printing services are ideal for special occasions, events, and personalized requirements. We help bring unique ideas to life with high quality prints tailored to your needs.",
        "image": 166,
        "features": [
            "Personalized printing solutions",
            "Event specific designs",
            "Flexible customization options",
            "Attention to detail",
        ],
        "band_heading": "Custom Prints for Memorable Events",
        "band_sub": "We focus on creativity and precision to make your events stand out.",
        "cards": [
            ("Customized Designs", "Tailored prints based on your event theme."),
            ("Quality Finishing", "Neat and premium output for special occasions."),
            ("Versatile Applications", "Suitable for corporate events, celebrations, and promotions."),
        ],
        "cta_html": 'Create Something Unique for Your <span class="accent">Event</span>',
        "meta": "Custom and event printing in Dubai from Flash Print Solution — personalized, event-specific prints for celebrations, corporate events and promotions.",
    },
}

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

SERVICE_LONG = {'hero_title_html': '<span class="accent">Business Stationery Printing Dubai:</span> Everything You Need to Know '
                    'Before You Order',
 'cta_html': 'Get Your <span class="accent">Business Printing</span> Started Today',
 'hero_subtitle': 'Professional, fast, and consistent stationery printing for Dubai businesses – from business cards '
                  'to full corporate identity kits.',
 'intro_eyebrow': 'Your Complete Guide',
 'intro_paragraphs': ['Business stationery printing in Dubai is one of those investments that quietly shapes how '
                      'your brand is perceived every single day. When you hand over a thick, well-finished business '
                      'card at a networking event in DIFC, or send a proposal in a branded presentation folder to a '
                      'client in Business Bay, you are communicating something about your company before a single '
                      'word is read.',
                      'Whether you are setting up a new company or refreshing an existing brand, understanding '
                      'business stationery printing in Dubai helps you make smarter decisions about materials, '
                      'finishes, and suppliers. This guide covers everything you need to know so you can order with '
                      'confidence and get results that actually represent your business properly.',
                      'From business cards and letterheads to NCR forms and branded envelopes, professional business '
                      'stationery printing in Dubai covers far more than most business owners realise. The goal of '
                      'this guide is to walk you through all of it, so you never end up with materials that '
                      'undersell your brand.'],
 'cover': {'eyebrow': 'Know Your Materials',
           'heading_html': 'What Does <span class="accent">Business Stationery Printing in Dubai</span> Actually '
                           'Cover?',
           'lead': 'Most people assume business stationery printing in Dubai means business cards and letterheads. '
                   'In reality, it covers every printed item that carries your brand identity across professional '
                   'communication and daily business operations. Here is the full picture.',
           'cards': [{'title': 'BUSINESS CARDS WITH GOLD FOIL',
                      'text': 'Premium business cards with gold foil finishing. The card that gets noticed and '
                              'remembered before a single word is read.'},
                     {'title': 'STANDARD BUSINESS CARDS',
                      'text': 'Sharp, professional cards in matte, gloss, or soft-touch finishes. The most portable '
                              'piece of branded marketing you own.'},
                     {'title': 'BRANDED ENVELOPES',
                      'text': 'Printed envelopes complete the mailing experience. When a client receives mail in '
                              'your branded envelope, it signals professionalism instantly.'},
                     {'title': 'PRESENTATION FOLDERS',
                      'text': 'Critical for proposals and tenders. A well-designed folder organises your materials '
                              'and creates a strong first impression.'},
                     {'title': 'INVOICE AND RECEIPT BOOKS',
                      'text': 'Even transactional documents carry your brand. Branded invoice books look '
                              'professional and reinforce trust with every transaction.'},
                     {'title': 'NCR AND CARBONLESS FORMS',
                      'text': 'Multi-part forms for delivery notes, job sheets, and purchase orders. Printed and '
                              'duplicated cleanly without carbon paper.'},
                     {'title': 'LETTERHEADS',
                      'text': 'Used for formal correspondence and proposals. A printed letterhead instantly elevates '
                              'a document from a printout to a professional communication.'},
                     {'title': 'COMPLIMENT SLIPS',
                      'text': 'Small but thoughtful. Often included with deliveries or correspondence as a personal, '
                              'brand-consistent touch that clients notice.'}],
           'callout': 'Flash Print Solution handles all types of business stationery printing in Dubai under one '
                      'roof. Designed, printed, and delivered across the city. No need to chase multiple vendors for '
                      'different pieces of your stationery set.'},
 'why': {'eyebrow': 'The Dubai Difference',
         'heading_html': 'Why <span class="accent">Business Stationery Printing in Dubai</span> Matters More Than '
                         'You Think',
         'blocks': [{'subheading': 'First Impressions in a High-Stakes Market',
                     'paragraphs': ['Dubai is a unique market. You might sit across the table from someone whose '
                                    'company spans three continents, and where the meeting you are walking into '
                                    'could change the direction of your business entirely. In that environment, the '
                                    'quality of your business stationery printing in Dubai gets noticed.',
                                    "There is also a cultural dimension. In many of Dubai's key business communities "
                                    'including Emirati, South Asian, East Asian, and European, printed materials are '
                                    'exchanged with a level of formality that is quietly important. Handing over a '
                                    'poorly printed or generic business card can read as carelessness, even if that '
                                    'is not your intention.',
                                    'And beyond first impressions, there is the branding consistency angle. When '
                                    'every piece of paper that leaves your office looks and feels like it belongs to '
                                    'the same brand, you are building something that separates businesses that look '
                                    'professional from businesses that actually are.']}],
         'dark_callout': {'title': "BUSINESS STATIONERY PRINTING DUBAI: YOUR BRAND'S SILENT AMBASSADOR",
                          'paragraphs': ['Professional business stationery printing in Dubai means your brand '
                                         'arrives before you do. It shows up in proposals, in mailers, in meeting '
                                         'rooms, and it stays behind after you leave.',
                                         'Smart businesses treat their business stationery printing in Dubai as part '
                                         'of the same conversation as their website, their office fit-out, and their '
                                         'team presentation. It is not decoration. It is communication.',
                                         'When all of these elements are consistent, clients and partners experience '
                                         'a coherent brand. And coherent brands inspire more confidence every single '
                                         'time.']}},
 'quality': {'heading_html': 'Paper, Finish and Quality for <span class="accent">Business Stationery Printing in '
                             'Dubai</span>',
             'intro': 'You do not need to become a print expert, but knowing the basics will help you ask the right '
                      'questions and avoid receiving something that looks nothing like what you expected from your '
                      'business stationery printing in Dubai order.',
             'subsections': [{'title': 'PAPER WEIGHT AND GSM FOR BUSINESS STATIONERY PRINTING DUBAI',
                              'paragraphs': ['Standard office printer paper runs at around 80 GSM which is fine for '
                                             'internal use, but it feels cheap for anything client-facing. For '
                                             'business cards, you are looking at 300 to 400 GSM. For letterheads, '
                                             '100 to 120 GSM gives a premium feel without being impractical. For '
                                             'folders and presentation kits, heavier stocks with lamination are the '
                                             'standard choice for professional business stationery printing in '
                                             'Dubai.']},
                             {'title': 'FINISH OPTIONS FOR YOUR DUBAI BUSINESS STATIONERY',
                              'paragraphs': ['The finish changes how your stationery looks and feels entirely. Matte '
                                             'lamination gives a sophisticated, non-reflective look popular with '
                                             'modern brands. Gloss lamination makes colours pop for image-heavy '
                                             'designs. Soft-touch lamination delivers a velvety feel increasingly '
                                             'favoured for premium business cards in Dubai. UV spot coating lets you '
                                             'highlight specific elements like your logo with a glossy layer over a '
                                             'matte base. Embossing and debossing create raised or pressed texture, '
                                             'often used for logos on business card stock.']},
                             {'title': 'DIGITAL VS OFFSET PRINTING FOR BUSINESS STATIONERY IN DUBAI',
                              'paragraphs': ['Digital printing is fast, cost-effective, and great for smaller '
                                             'quantities and quick turnarounds. Offset printing produces sharper, '
                                             'more consistent colour across large runs and is the standard for '
                                             'high-volume business stationery printing in Dubai. At Flash Print '
                                             'Solution, both technologies are available and the recommendation you '
                                             'receive will be based on your actual order size and timeline, not on '
                                             'what is most convenient for the printer.']}]},
 'choose': {'heading_html': 'How to Choose the Right <span class="accent">Business Stationery Printing Dubai</span> '
                            'Partner',
            'intro': 'Dubai has no shortage of print shops. The challenge with business stationery printing in Dubai '
                     'is not finding a printer. It is finding one that will not waste your time, your money, or your '
                     'brand reputation.',
            'cards': [{'title': 'FAST TURNAROUND FOR BUSINESS STATIONERY PRINTING DUBAI',
                       'text': "In Dubai's business environment, last-minute needs are the norm. You might close a "
                               'deal on a Tuesday and need branded stationery for a site visit on Thursday. A good '
                               'business stationery printing partner in Dubai will offer express options and be '
                               'honest when a request is not feasible, rather than overpromising.'},
                      {'title': 'CONSISTENT QUALITY ACROSS EVERY ORDER',
                       'text': 'Quality on your first order means nothing if the second batch looks different. '
                               'Colour consistency, paper stock matching, and finish uniformity across reprints are '
                               'signs of a well-managed business stationery printing operation in Dubai. Ask to see '
                               'repeat order samples, not just first-time work.'},
                      {'title': 'DESIGN SUPPORT INCLUDED',
                       'text': 'Not every business has an in-house designer. A business stationery printer in Dubai '
                               'that offers design services saves you the coordination of working with a separate '
                               'agency. Flash Print Solution includes design and creative services. Brief the team '
                               'and receive print-ready artwork, not just a job pushed through a machine.'},
                      {'title': 'TRANSPARENT PRICING WITH NO HIDDEN COSTS',
                       'text': 'Hidden costs are frustrating anywhere. In a city where business relationships are '
                               'built on trust, a business stationery printing company in Dubai that quotes one '
                               'thing and bills another will lose your business fast. Get a detailed quote that '
                               'breaks down quantity, paper, finish, and delivery before you commit.'},
                      {'title': 'DELIVERY ACROSS ALL OF DUBAI',
                       'text': 'A print shop on one side of the city does not help if your office is in DIFC and you '
                               'need business stationery printing in Dubai delivered the same day. A printer that '
                               'covers the full emirate from Deira to Dubai Marina, Business Bay to Jumeirah, is '
                               'simply more practical for most businesses.'}]},
 'mistakes': {'heading_html': 'Common Mistakes to Avoid with <span class="accent">Business Stationery Printing in '
                              'Dubai</span>',
              'intro': 'These mistakes come up constantly with business stationery printing in Dubai orders. Most of '
                       'them are easy to avoid once you know what to look out for before you go to press.',
              'items': [{'title': 'Sending low-resolution logos for your business stationery printing Dubai order.',
                         'text': 'A logo that looks sharp on screen can print blurry if it is not in the right '
                                 'format. Vector files like AI or EPS are ideal. Always confirm file requirements '
                                 'with your printer in Dubai before submitting artwork.'},
                        {'title': 'Ignoring bleed and margins.',
                         'text': 'Print files for business stationery printing in Dubai need to account for a bleed '
                                 'area that gets trimmed after printing. If your design does not extend into this '
                                 'bleed zone, you will get white edges where there should not be any.'},
                        {'title': 'Choosing the cheapest option for client-facing business stationery printing in '
                                  'Dubai.',
                         'text': 'Going budget on internal notepads makes sense. Going budget on materials that land '
                                 "in a client's hands does not. The cost difference between average and premium "
                                 'business stationery printing in Dubai is often smaller than you expect.'},
                        {'title': 'Ordering before the design is finalised.',
                         'text': 'Changes after print are expensive. Make sure your brand guidelines, contact '
                                 'details, and any regulatory information are confirmed before you place your '
                                 'business stationery printing in Dubai order.'},
                        {'title': 'Not ordering enough quantity.',
                         'text': 'Reprints cost more per unit than the original run. If you are confident you will '
                                 'use 1,000 cards in a year, ordering 500 now and 500 later will cost more in total. '
                                 'Plan your business stationery printing in Dubai quantities carefully and balance '
                                 'this with storage practicalities.'},
                        {'title': 'Skipping a physical proof for large business stationery printing Dubai orders.',
                         'text': 'A digital mock-up is useful, but for significant quantities it is worth requesting '
                                 'a physical proof. What looks right on a screen can occasionally surprise you on '
                                 'paper, especially with colour-critical business stationery.'}]},
 'our_services': {'heading_html': 'Our <span class="accent">Business Stationery Printing Dubai</span> Services',
                  'intro': 'Flash Print Solution offers a complete range of business stationery printing in Dubai. '
                           'Every product below is handled in-house and delivered across the city. Browse our '
                           'business stationery printing services in Dubai and click through to order directly.',
                  'cards': [{'title': 'BUSINESS CARDS WITH GOLD FOIL PRINTING DUBAI',
                             'text': 'Premium business card printing in Dubai with gold foil finishing. The card '
                                     'that commands attention and gets remembered at every meeting and event.'},
                            {'title': 'BUSINESS CARD PRINTING DUBAI',
                             'text': 'Sharp, professional business card printing in Dubai in matte, gloss, or '
                                     'soft-touch lamination. Available in standard and custom sizes to suit your '
                                     'brand.'},
                            {'title': 'ENVELOPE PRINTING DUBAI',
                             'text': 'Branded envelope printing in Dubai that completes the full mailing experience. '
                                     'When a client receives mail in your branded envelope, it signals a serious '
                                     'business.'},
                            {'title': 'PRESENTATION FOLDER PRINTING DUBAI',
                             'text': 'Professional folder printing in Dubai for proposals, tenders, and client '
                                     'presentations. A well-designed folder organises your materials and impresses '
                                     'before a page is turned.'},
                            {'title': 'INVOICE BOOK PRINTING DUBAI',
                             'text': 'Branded invoice and receipt book printing in Dubai with header printing. Even '
                                     'transactional documents carry your brand identity and reinforce '
                                     'professionalism with every transaction.'},
                            {'title': 'NCR PRINTING DUBAI',
                             'text': 'Multi-part carbonless NCR form printing in Dubai for delivery notes, job '
                                     'sheets, and purchase orders. Duplicated cleanly and accurately without carbon '
                                     'paper.'}],
                  'callout': 'Our business stationery printing in Dubai serves companies of all sizes, from solo '
                             'consultants needing a professional card to large corporations managing print across '
                             'multiple departments. Share your requirements, get a quote, approve the design, and '
                             'receive your order.'},
 'who': {'heading_html': 'Who Relies on <span class="accent">Business Stationery Printing in Dubai</span>',
         'intro': 'Business stationery printing in Dubai is important for every sector, but certain industries feel '
                  'the difference between average and excellent print quality most directly. Here are the businesses '
                  'that rely on professional business stationery printing in Dubai every day.',
         'cards': [{'title': 'REAL ESTATE AND PROPERTY',
                    'text': 'Agents and developers hand out business stationery at site visits and events. The '
                            'quality of a folder or business card can reflect directly on the property being sold.'},
                   {'title': 'LEGAL AND FINANCIAL SERVICES',
                    'text': 'Professionalism is the entire value proposition. Crisp business stationery printing in '
                            'Dubai communicates competence before a word is spoken in any meeting.'},
                   {'title': 'HEALTHCARE AND MEDICAL',
                    'text': 'Clinics and hospitals need business stationery printing in Dubai that conveys '
                            'cleanliness and reliability. Patient forms, appointment cards, and prescription pads '
                            'all carry the brand.'},
                   {'title': 'HOSPITALITY AND FOOD AND BEVERAGE',
                    'text': 'Hotels, restaurants, and catering businesses use branded business stationery in guest '
                            'communications and service delivery. Every printed detail matters in this sector.'},
                   {'title': 'CONSTRUCTION AND PROJECTS',
                    'text': 'Site documents, compliance notices, NCR forms, and company correspondence all need '
                            'consistent business stationery printing in Dubai on professional-grade materials.'},
                   {'title': 'EDUCATION AND TRAINING',
                    'text': 'Training centres and institutes need certificates, notepads, branded folders, and '
                            'course materials. Business stationery printing in Dubai helps project credibility and '
                            'institutional quality.'},
                   {'title': 'RETAIL AND E-COMMERCE',
                    'text': 'Branded packaging inserts, compliment slips, and labels are all part of business '
                            'stationery printing in Dubai that creates a memorable unboxing experience for '
                            'customers.'},
                   {'title': 'CORPORATE AND ENTERPRISE',
                    'text': 'Large organisations often have complex multi-department business stationery printing '
                            'needs in Dubai. One reliable printing partner who handles all of them consistently is '
                            'genuinely valuable.'}]},
 'image': 34,
 'meta': 'Business stationery printing in Dubai from Flash Print Solution — business cards, letterheads, folders, '
         'envelopes, NCR forms and complete corporate identity kits.',
 'hero_eyebrow': 'Business Printing'}

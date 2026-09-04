# -*- coding: utf-8 -*-
"""Nearprint website: single source of truth (content, SEO, image mappings)."""
import re

def slugify(s):
    s = s.lower().strip()
    s = s.replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")

# ---------------------------------------------------------------------------
# SITE / BRAND
# ---------------------------------------------------------------------------
SITE = {
    "brand": "Nearprint",
    "tagline": "Your Print Partner",
    "statement": "Creating Impressions That Last Beyond the Print",
    "domain": "https://nearprint.ae",
    "phone_display": "+971 5 252 87857",
    "phone_e164": "+971525287857",
    "whatsapp": "https://wa.me/971525287857",
    "email": "sales@nearprint.ae",
    "website": "nearprint.ae",
    "address_line": "#65 Iris Bay Tower, Business Bay, Dubai, United Arab Emirates",
    "address": {
        "street": "#65 Iris Bay Tower, Business Bay",
        "city": "Dubai",
        "region": "Dubai",
        "country": "AE",
    },
    "founded_years": "4+",
    "og_image": "/assets/img/brand/nearprint-og.jpg",
}

STATS = [
    {"value": 4, "suffix": "+", "label": "Years of Experience"},
    {"value": 7, "suffix": "", "label": "Emirates Covered"},
    {"value": 6, "suffix": "", "label": "Sales Professionals"},
    {"value": 3, "suffix": "", "label": "In-house Production Machines"},
]

PILLARS = [
    {"title": "Printing", "text": "Business stationery, marketing collateral, stickers, labels and packaging produced with a sharp, professional finish."},
    {"title": "Signage", "text": "Indoor, outdoor, LED and 3D signage fabricated in-house for maximum brand visibility across the UAE."},
    {"title": "Corporate Gifts", "text": "Branded gifts, mementos and welcome sets customised with your logo for events and client appreciation."},
    {"title": "Packaging", "text": "Rigid boxes, food boxes and printed bags engineered for strong branding and reliable protection."},
]

WHY_US = [
    {"title": "In-house Production", "text": "CNC routing, laser cutting and UV flatbed printing under one roof for tighter quality control and faster turnaround."},
    {"title": "All 7 Emirates Covered", "text": "Delivery and installation across Dubai, Abu Dhabi, Sharjah and the wider UAE."},
    {"title": "Multilingual Support", "text": "A sales team fluent in eight languages so your brief is understood exactly."},
    {"title": "One Print Partner", "text": "Printing, signage, gifts and packaging handled by a single, accountable team."},
]

MACHINES = [
    {"name": "CNC Router Cutting Machine", "src": "page18_img03.jpg",
     "text": "Precision routing and cutting of acrylic, wood and composite panels for 3D letters, fabrication and display."},
    {"name": "Laser Cutting Machine", "src": "page18_img01.jpg",
     "text": "Clean, accurate laser cutting and engraving for signage letters, acrylic parts and finishing detail."},
    {"name": "UV Flatbed Printer", "src": "page18_img02.jpg",
     "text": "Large-format UV and flatbed printing for vivid, durable graphics on rigid and flexible materials."},
]

LANGUAGES = ["Urdu", "English", "Hindi", "Tamil", "Telugu", "Malayalam", "Kannada", "Byari"]

# ---------------------------------------------------------------------------
# SERVICE PAGES  (order = mega-menu + home cards order)
# Each: key, name, short (nav/card label), slug(url), folder(image dir),
#       title, desc(meta), h1, tagline(card), intro(page lede),
#       card_img(home/nav image src), groups[], faqs[]
# ---------------------------------------------------------------------------
SERVICES = [
    {
        "key": "business-stationery",
        "name": "Business Stationery Printing",
        "short": "Business Stationery",
        "slug": "business-stationery-printing",
        "folder": "business-stationery",
        "title": "Business Stationery Printing Dubai | Cards, Letterheads",
        "desc": "Business cards, letterheads, folders, notebooks, stamps & ID cards printed in Dubai. Professional finish, fast delivery. Get a quote.",
        "h1": "Business Stationery Printing in Dubai",
        "tagline": "Cards, letterheads, folders & more",
        "intro": "High-quality business stationery printing that reflects your brand's professionalism, ensuring every business interaction looks polished and consistent.",
        "card_img": "page04_img02.jpg",
        "groups": [
            {"title": "Business Stationery", "products": [
                ("Presentation Folder", "page04_img01.jpg"),
                ("Premium Business Card", "page04_img02.jpg"),
                ("Company Profile", "page04_img03.jpg"),
                ("Letterheads", "page04_img04.jpg"),
                ("Notepad", "page04_img05.jpg"),
                ("Envelope", "page04_img06.jpg"),
                ("Certificate", "page04_img07.jpg"),
                ("Customised Notebook", "page04_img08.jpg"),
                ("Receipt & Invoice Book", "page04_img09.jpg"),
                ("Seal & Stamp", "page04_img10.jpg"),
                ("ID Card", "page04_img11.jpg"),
            ]},
        ],
        "faqs": [
            ("What business stationery can Nearprint print?", "Business cards, letterheads, presentation folders, company profiles, notepads, envelopes, certificates, custom notebooks, receipt and invoice books, seals and stamps, and ID cards, all matched to your brand."),
            ("Can you match my existing brand colours?", "Yes. We print to your supplied brand colours and can advise on stocks and finishes so every item looks consistent across your stationery set."),
            ("Do you offer premium finishes on business cards?", "We offer a range of stocks and finishes for a premium feel. Share your requirement and our team will recommend the best option for your budget."),
        ],
    },
    {
        "key": "marketing",
        "name": "Marketing & Promotional Printing",
        "short": "Marketing & Promotional",
        "slug": "marketing-promotional-printing",
        "folder": "marketing",
        "title": "Flyers, Brochures & Poster Printing in Dubai | Nearprint",
        "desc": "Flyers, brochures, catalogs, menus & posters printed in the UAE with a professional finish. Request a quote from Nearprint.",
        "h1": "Marketing & Promotional Printing in Dubai",
        "tagline": "Flyers, brochures, catalogs & posters",
        "intro": "Print marketing materials that help promote your business, strengthen brand visibility, and communicate your message with a professional finish.",
        "card_img": "page05_img02.jpg",
        "groups": [
            {"title": "Marketing & Promotional", "products": [
                ("Flyers", "page05_img01.jpg"),
                ("Brochure", "page05_img02.jpg"),
                ("Catalog", "page05_img03.jpg"),
                ("Menu", "page05_img04.jpg"),
                ("Calendar", "page05_img05.jpg"),
                ("Door Hangers", "page05_img06.jpg"),
                ("Tent Card", "page05_img07.jpg"),
                ("Gift Voucher", "page05_img08.jpg"),
                ("Leaflet", "page05_img09.jpg"),
                ("Danglers", "page05_img10.jpg"),
                ("Poster", "page05_img11.jpg"),
            ]},
        ],
        "faqs": [
            ("What marketing print materials do you produce?", "Flyers, brochures, catalogs, menus, calendars, door hangers, tent cards, gift vouchers, leaflets, danglers and posters, in the sizes and finishes your campaign needs."),
            ("Can you print short and long runs?", "Yes. We handle both small promotional runs and larger campaign volumes with a consistent, professional finish."),
            ("Do you help with print-ready artwork?", "Share your design and our team will check it for print. We can advise on bleed, resolution and finishing before we go to press."),
        ],
    },
    {
        "key": "signage",
        "name": "Signage & Branding",
        "short": "Signage",
        "slug": "signage-dubai",
        "folder": "signage",
        "title": "Signage Company in Dubai | Indoor, Outdoor & LED Signs",
        "desc": "Custom indoor, outdoor & LED signage in Dubai: acrylic, 3D letters, neon, flex & light boxes. In-house production. Get a quote.",
        "h1": "Signage Company in Dubai",
        "tagline": "Indoor, outdoor, 3D & LED signage",
        "intro": "Increase your brand visibility with custom signage and branding solutions designed to attract attention, strengthen your identity, and create a lasting impression.",
        "card_img": "page06_img07.jpg",
        "groups": [
            {"title": "Signage", "products": [
                ("Acrylic Sign Board", "page06_img01.jpg"),
                ("Office Door Sign Board", "page06_img02.jpg"),
                ("Directory Sign Board", "page06_img03.jpg"),
                ("Shop Sign Board", "page06_img04.jpg"),
                ("Way-Finding Signage", "page06_img05.jpg"),
                ("Flex Sign Board", "page06_img06.jpg"),
                ("3D Letter Sign Board", "page06_img07.jpg"),
                ("Neon Sign Board", "page06_img08.jpg"),
                ("Channelium Sign Board", "page06_img09.jpg"),
                ("Custom Fabrication", "page06_img10.jpg"),
                ("LED Sign Board", "page06_img11.jpg"),
                ("Reception Sign Board", "page06_img12.jpg"),
                ("Powder Coating Letter", "page06_img13.jpg"),
                ("SS Letter Sign Board", "page06_img14.jpg"),
            ]},
            {"title": "LED Displays", "products": [
                ("LED Standees", "page07_img01.jpg"),
                ("Building LED Screens", "page07_img02.jpg"),
                ("Mall LED Pillars", "page07_img03.jpg"),
            ]},
        ],
        "faqs": [
            ("What types of signage do you make?", "Acrylic, shop and office signs, 3D and SS letters, neon, channelium, flex and light-box signage, way-finding, reception boards and LED displays, all fabricated in-house."),
            ("Do you handle installation?", "Yes. We produce signage in-house and cover installation across the UAE. Share the site details and we will advise on the right build."),
            ("Can you make illuminated and 3D letters?", "Yes. 3D letters, SS letters, neon, channelium and LED-lit signage are core to our in-house signage production."),
        ],
    },
    {
        "key": "branding",
        "name": "Branding & Large Format",
        "short": "Branding",
        "slug": "branding",
        "folder": "branding",
        "title": "Branding & Large Format Printing Dubai | Vehicle Wraps",
        "desc": "Exhibition stands, vehicle branding, banners, flags & acrylic fabrication in the UAE. Build a consistent brand with Nearprint.",
        "h1": "Branding & Large Format Printing in Dubai",
        "tagline": "Exhibitions, vehicles, flags & fabrication",
        "intro": "Create a strong and consistent brand identity with custom branding solutions that enhance visibility, build customer trust, and make your business stand out across every touchpoint.",
        "card_img": "page09_img03.jpg",
        "groups": [
            {"title": "Exhibition & Event Display", "products": [
                ("Rollup Stand", "page08_img05.jpg"),
                ("Pop Up Backdrop", "page08_img04.jpg"),
                ("Adjustable Banner Stand", "page08_img07.jpg"),
                ("Broad Base Roll Up", "page08_img02.jpg"),
                ("Oval Pop Up Banner", "page08_img06.jpg"),
                ("X Banner", "page08_img01.jpg"),
                ("Curved Backdrop", "page08_img08.jpg"),
                ("Promotional Tent", "page08_img09.jpg"),
                ("Exhibition Booth Decoration", "page08_img10.jpg"),
            ]},
            {"title": "Vehicle Branding", "products": [
                ("Van Branding", "page09_img03.jpg"),
                ("Mini Truck Branding", "page09_img04.jpg"),
                ("Truck Branding", "page09_img05.jpg"),
                ("Car Branding", "page09_img06.jpg"),
            ]},
            {"title": "Large Format Printing", "products": [
                ("Vinyl Printing", "page09_img02.jpg"),
                ("Billboard", "page09_img08.jpg"),
                ("Banner Printing", "page09_img09.jpg"),
                ("Wall Graphics", "page09_img10.jpg"),
                ("Oneway Vision", "page09_img01.jpg"),
                ("Frosted Glass Film", "page09_img07.jpg"),
                ("Window Tinting", "page09_img11.jpg"),
            ]},
            {"title": "Flags", "products": [
                ("Indoor Flag", "page10_img03.jpg"),
                ("L Shape Flag", "page10_img06.jpg"),
                ("Tear Drop Flag", "page10_img04.jpg"),
                ("Telescopic Flag", "page10_img05.jpg"),
                ("Top Curve Flag", "page10_img07.jpg"),
                ("Table Top Flag", "page10_img08.jpg"),
                ("Flag Base", "page10_img09.jpg"),
            ]},
            {"title": "Info & Queue Stands", "products": [
                ("Info Stand", "page10_img10.jpg"),
                ("Snap Frame Info Stand", "page10_img11.jpg"),
                ("Heavy Duty Info Stand", "page10_img12.jpg"),
                ("Metal A Board", "page10_img15.jpg"),
                ("Wooden A Board", "page10_img13.jpg"),
                ("Gold Queue Stand", "page10_img02.jpg"),
                ("Silver Queue Stand", "page10_img01.jpg"),
                ("Metal Brochure Stand", "page10_img16.jpg"),
            ]},
            {"title": "Acrylic Fabrication", "products": [
                ("Card Holder", "page11_img01.jpg"),
                ("L Shape Stand", "page11_img02.jpg"),
                ("Brochure Holder", "page11_img03.jpg"),
                ("T Stand", "page11_img04.jpg"),
                ("Podium", "page11_img06.jpg"),
                ("Raffle Drum", "page11_img08.jpg"),
                ("Acrylic Figures", "page11_img07.jpg"),
                ("Custom Trophy", "page11_img05.jpg"),
                ("Suggestion Box", "page11_img09.jpg"),
                ("Tissue Box", "page11_img10.jpg"),
            ]},
        ],
        "faqs": [
            ("What does your branding service cover?", "Exhibition and event displays, vehicle branding, large-format printing, flags, info and queue stands, and custom acrylic fabrication, everything you need to present your brand consistently."),
            ("Can you brand a fleet of vehicles?", "Yes. We produce and apply van, truck and car branding so your fleet carries a consistent look on the road."),
            ("Do you build exhibition stands?", "Yes. Roll-ups, pop-up backdrops, banner stands, promotional tents and full booth decoration for events and exhibitions."),
        ],
    },
    {
        "key": "stickers-labels",
        "name": "Stickers & Labels Printing",
        "short": "Stickers & Labels",
        "slug": "stickers-labels-printing",
        "folder": "stickers-labels",
        "title": "Sticker & Label Printing in Dubai | Custom Labels",
        "desc": "Custom stickers & labels in Dubai: die-cut, transparent, UV DTF, food & product labels. Durable, sharp printing. Get a quote.",
        "h1": "Sticker & Label Printing in Dubai",
        "tagline": "Die-cut, transparent, UV DTF & more",
        "intro": "High-quality custom stickers and labels with sharp printing, durable materials, and professional finishing.",
        "card_img": "page12_img03.jpg",
        "groups": [
            {"title": "Stickers & Labels", "products": [
                ("Food Labels", "page12_img01.jpg"),
                ("Transparent Sticker", "page12_img02.jpg"),
                ("Die-Cut Sticker", "page12_img03.jpg"),
                ("Plain Labels", "page12_img04.jpg"),
                ("Paper Sticker", "page12_img05.jpg"),
                ("Sign Sticker", "page12_img06.jpg"),
                ("Speciality Labels", "page12_img07.jpg"),
                ("Metallic Label", "page12_img08.jpg"),
                ("Care Labels", "page12_img09.jpg"),
                ("UV DTF Sticker", "page12_img10.jpg"),
                ("Printed Labels", "page12_img11.jpg"),
            ]},
        ],
        "faqs": [
            ("What sticker and label types do you print?", "Die-cut, transparent, paper, metallic, UV DTF and sign stickers, plus food, product, care, speciality and printed labels, all on durable materials."),
            ("Are your labels suitable for food products?", "Yes. We print food and product labels with sharp detail and materials suited to the application. Share your requirement for the right stock."),
            ("Can you die-cut custom shapes?", "Yes. Die-cut stickers can be produced to your custom shape for a clean, professional result."),
        ],
    },
    {
        "key": "packaging",
        "name": "Packaging Material",
        "short": "Packaging",
        "slug": "packaging-material",
        "folder": "packaging",
        "title": "Custom Packaging Boxes & Bags Printing Dubai | Nearprint",
        "desc": "Branded boxes & bags printed in the UAE: rigid boxes, food boxes, paper & tote bags. Strong branding, reliable packaging.",
        "h1": "Custom Packaging Boxes & Bags in Dubai",
        "tagline": "Rigid boxes, food boxes & printed bags",
        "intro": "Custom printed bags and boxes designed for strong branding, attractive presentation, and reliable packaging.",
        "card_img": "page13_img05.jpg",
        "groups": [
            {"title": "Boxes", "products": [
                ("E-Commerce Box", "page13_img01.jpg"),
                ("Sliding Box", "page13_img02.jpg"),
                ("Magnetic Box", "page13_img03.jpg"),
                ("Date Box", "page13_img04.jpg"),
                ("Rigid Box", "page13_img05.jpg"),
                ("Burger Box", "page13_img06.jpg"),
                ("Sweet Box", "page13_img07.jpg"),
                ("Shoe Box", "page13_img08.jpg"),
                ("Meal Box", "page13_img09.jpg"),
                ("Cake Box", "page13_img10.jpg"),
            ]},
            {"title": "Bags", "products": [
                ("Premium Bag", "page13_img11.jpg"),
                ("Tote Bag", "page13_img12.jpg"),
                ("Brown Bag", "page13_img13.jpg"),
                ("Paper Bag", "page13_img14.jpg"),
                ("Gift Bags", "page13_img15.jpg"),
                ("Recycle Bag", "page13_img16.jpg"),
                ("Snacks Bag", "page13_img17.jpg"),
            ]},
        ],
        "faqs": [
            ("What packaging can you produce?", "Rigid, magnetic, sliding and e-commerce boxes, food boxes for burgers, sweets, meals and cakes, plus premium, tote, paper, brown, gift, recycle and snack bags."),
            ("Can packaging be printed with our branding?", "Yes. Boxes and bags are printed with your branding for a strong, consistent presentation from shelf to unboxing."),
            ("Do you offer food-grade packaging?", "We produce food boxes and bags suited to the application. Tell us the product and we will recommend the right material."),
        ],
    },
    {
        "key": "workwear",
        "name": "Workwear & Apparel",
        "short": "Workwear & Apparel",
        "slug": "workwear-apparel",
        "folder": "workwear",
        "title": "Uniforms & Workwear Printing in Dubai | Nearprint",
        "desc": "Custom uniforms, polos, safety jackets & corporate apparel in the UAE. On-brand, durable workwear. Request a quote.",
        "h1": "Uniforms & Workwear in Dubai",
        "tagline": "Uniforms, polos, safety & corporate wear",
        "intro": "Custom workwear and branded apparel for teams across hospitality, corporate, industrial and security sectors. Durable, comfortable and on-brand.",
        "card_img": "page14_img02.jpg",
        "groups": [
            {"title": "Workwear & Apparel", "products": [
                ("Safety Jackets", "page14_img01.jpg"),
                ("Restaurant Uniform", "page14_img02.jpg"),
                ("Business Suit", "page14_img03.jpg"),
                ("House Keeping", "page14_img04.jpg"),
                ("Ladies Business Suit", "page14_img05.jpg"),
                ("Formal Shirt", "page14_img06.jpg"),
                ("Sublimation T-Shirt", "page14_img07.jpg"),
                ("Polo T-Shirt", "page14_img08.jpg"),
                ("Security Set", "page14_img09.jpg"),
                ("SPA Attire", "page14_img10.jpg"),
            ]},
        ],
        "faqs": [
            ("What workwear do you supply?", "Safety jackets, restaurant and housekeeping uniforms, business suits, formal shirts, polo and sublimation t-shirts, security sets and spa attire, all branded for your team."),
            ("Which sectors do you cover?", "Hospitality, corporate, industrial and security teams. Tell us your sector and we will recommend durable, comfortable, on-brand options."),
            ("Can you add our logo to the uniforms?", "Yes. Uniforms and apparel are customised with your logo for a consistent, professional team look."),
        ],
    },
    {
        "key": "corporate-gifts",
        "name": "Corporate Gifts",
        "short": "Corporate Gifts",
        "slug": "corporate-gifts",
        "folder": "corporate-gifts",
        "title": "Corporate Gifts & Mementos in Dubai | Nearprint",
        "desc": "Branded corporate gifts, welcome sets, drinkware, pens & trophies in the UAE. Customised with your logo. Get a quote.",
        "h1": "Corporate Gifts & Mementos in Dubai",
        "tagline": "Welcome sets, drinkware, pens & trophies",
        "intro": "Premium corporate gifts and mementos customized with your brand logo, designed for events, employee recognition, client appreciation, and promotional campaigns.",
        "card_img": "page15_img02.jpg",
        "groups": [
            {"title": "Corporate Gifts", "products": [
                ("Laptop Bags", "page15_img01.jpg"),
                ("Corporate Set", "page15_img02.jpg"),
                ("Premium Memento", "page15_img03.jpg"),
                ("Pen", "page15_img04.jpg"),
                ("Drinkware", "page15_img05.jpg"),
                ("Key Chain", "page15_img06.jpg"),
                ("Notebook", "page15_img07.jpg"),
                ("Holder Set", "page15_img08.jpg"),
                ("Business Set", "page15_img09.jpg"),
                ("Tumblers", "page15_img10.jpg"),
                ("Employee Welcome Set", "page15_img11.jpg"),
            ]},
        ],
        "faqs": [
            ("What corporate gifts do you offer?", "Laptop bags, corporate and welcome sets, premium mementos, pens, drinkware, tumblers, key chains, notebooks, holder sets and trophies, all customised with your logo."),
            ("Are the gifts branded with our logo?", "Yes. Every item is customised with your brand logo for events, employee recognition, client appreciation and promotional campaigns."),
            ("Can you supply employee welcome sets?", "Yes. We put together branded welcome and corporate sets ideal for onboarding and events."),
        ],
    },
]

# ---------------------------------------------------------------------------
# CLIENT LOGOS  (page17_img01..61): dedupe near-duplicates
# ---------------------------------------------------------------------------
_LOGO_DUPES = {11, 37, 42, 45, 48, 57, 59}  # keep the first of each duplicate pair
CLIENT_LOGOS = [
    ("page17_img%02d.jpg" % i) for i in range(1, 62) if i not in _LOGO_DUPES
]

# ---------------------------------------------------------------------------
# STANDALONE PAGE META
# ---------------------------------------------------------------------------
HOME = {
    "slug": "",  # index
    "title": "Printing Company in Dubai | Signage & Branding | Nearprint",
    "desc": "Premium printing, signage, branding, packaging & corporate gifts across the UAE. 4+ years, in-house production. Get a quote from Nearprint.",
    "h1": "Printing, Signage & Branding Company in Dubai",
    "hero_img": "page02_img01.jpg",
}
ABOUT = {
    "slug": "about",
    "title": "About Nearprint | Printing & Branding Company Dubai",
    "desc": "Trusted UAE printing & branding company with 4+ years' experience, in-house signage production and multilingual sales support.",
    "h1": "About Nearprint",
    "hero_img": "page02_img01.jpg",
    "facility_img": "page03_img01.jpg",
}
CLIENTS = {
    "slug": "clients",
    "title": "Our Clients | Trusted by UAE Brands | Nearprint",
    "desc": "Nearprint is trusted by leading UAE organisations for printing, signage, branding and corporate gifts. See the brands we work with.",
    "h1": "Brands That Trust Nearprint",
}
CONTACT = {
    "slug": "contact",
    "title": "Contact Nearprint | Printing Company in Business Bay Dubai",
    "desc": "Contact Nearprint for printing, signage & branding in Dubai. Call +971 5 252 87857 or request a quote online.",
    "h1": "Contact Nearprint",
}
NOTFOUND = {
    "slug": "404",
    "title": "Page Not Found | Nearprint",
    "desc": "The page you are looking for could not be found. Explore Nearprint printing, signage and branding services in Dubai.",
    "h1": "Page Not Found",
}

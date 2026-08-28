# -*- coding: utf-8 -*-
"""
Real-image library + product/category matcher.

The supplied asset pack (assets/images/lib/NNN.avif) is a set of Flash Print
Solution branded mockups. Each usable image is tagged with keywords below.
Products (and service categories) are matched to the best-scoring image by
overlap between the product's name/slug tokens and an image's tags, with usage
spreading so the catalogue doesn't repeat the same shot back to back.
"""

EXT = ".avif"
LIB = "assets/images/lib"

# index -> space-separated keyword tags (only usable images are listed)
TAGS = {
    3:  "storefront shop sign outdoor signboard aframe standee",
    4:  "stationery corporate identity letterhead brand flatlay",
    5:  "exhibition tent canopy flag table cover event booth trade show",
    6:  "printing press production digital printing machine",
    7:  "printing press production digital printing machine swatch",
    8:  "large format plotter roll banner wide format printing",
    9:  "branding merchandise promotional apparel bag standee collection",
    10: "wall sign plaque acrylic office sign nameplate",
    11: "stationery letterhead mug notebook pen",
    12: "merchandise apparel tote mug promotional gift",
    13: "vehicle wrap van fleet delivery car branding",
    14: "sticker roll label decal adhesive",
    15: "apparel tshirt hoodie cap uniform bottle",
    16: "packaging box bag tape mailer carton corrugated",
    17: "sticker die cut decal vinyl label",
    18: "safety vest hard hat caution wet floor sign ppe",
    19: "promotional engraving keychain coaster tumbler gift corporate",
    20: "standee display loyalty card retail poster offer",
    21: "office branding reception welcome mat standee interior",
    22: "office branding reception counter interior desk",
    23: "construction safety sign site sign notice board hoarding",
    24: "event yard sign school standee mug lawn",
    25: "hospitality hotel menu door hanger signage restaurant",
    26: "medical healthcare sign poster clinic hospital",
    27: "compliance poster warning sign workplace label notice",
    28: "bottle label sticker promotional water",
    29: "vehicle wrap van team uniform fleet toolbox",
    30: "graphic design service prepress artwork swatch monitor",
    31: "signage install team out of order sign",
    32: "business card visiting card namecard",
    33: "business card visiting card namecard premium",
    34: "envelope stationery letterhead corporate",
    35: "invoice receipt ncr bill book form carbonless pad",
    36: "invoice bill book ncr form receipt pad",
    37: "presentation folder document folder",
    38: "flyer folder leaflet handbill",
    39: "rack card flyer dl leaflet brochure",
    40: "rack card flyer brochure leaflet hanging",
    41: "rack card flyer circle card leaflet",
    42: "door hanger hanging tag",
    43: "door hanger circle card hanging tag",
    44: "roll up banner standee pull up banner stand",
    45: "banner vinyl banner outdoor pvc",
    46: "poster framed print wall",
    47: "roll up banner standee pull up stand",
    48: "roll up banner standee folding stand",
    49: "wall sign acrylic office sign board",
    50: "poster wall sign board large",
    51: "storefront window sign signage shop",
    52: "3d sign dimensional letters storefront acrylic",
    53: "neon sign led sign illuminated glow",
    54: "lightbox outdoor sign pylon illuminated",
    55: "booklet company profile catalog magazine",
    56: "booklet brand manual catalog guide",
    57: "office branding interior wall graphics reception",
    58: "corporate identity kit stationery brand",
    59: "vehicle decal window decal car rear sticker",
    60: "vehicle wrap van fleet delivery",
    61: "vehicle decal car illuminated rear",
    62: "vehicle wrap car suv branding",
    63: "vehicle wrap car suv white",
    64: "sticker die cut decal qr scan label",
    65: "transparent sticker clear sticker label",
    66: "business card shipping box packaging label carton",
    67: "packaging box barcode label mailer carton",
    68: "label barcode decal sticker vinyl",
    69: "pen notebook promotional stationery gift",
    70: "keychain metal promotional gift",
    71: "notebook journal diary promotional gift",
    72: "usb flash drive promotional gift branded",
    73: "tshirt apparel uniform cotton",
    74: "polo shirt apparel uniform collar",
    75: "hoodie sweatshirt apparel uniform",
    76: "uniform workwear vest hard hat ppe safety",
    77: "lab coat medical uniform stethoscope clinic",
    78: "safety vest hi vis vest ppe workwear reflective",
    79: "scrubs medical uniform clinic hospital",
    80: "scrubs medical uniform clinic hospital",
    81: "paper bag shopping bag packaging retail",
    82: "paper bag shopping bag packaging retail",
    83: "kraft bag paper bag packaging eco",
    84: "packaging box product box carton white",
    85: "packaging box pouch label bottle product",
    86: "hang tag tag label packaging swing",
    87: "exhibition pop up booth backdrop trade show display",
    88: "exhibition booth trade show display large",
    89: "exhibition pop up backdrop display stand",
    90: "stage backdrop exhibition pop up event",
    91: "standee directional sign poster wayfinding",
    92: "safety sign warning sign first aid fire",
    93: "warning sign safety sign hazard caution",
    94: "floor sticker floor decal social distancing arrow",
    95: "safety sign warning sign first aid fire colored",
    96: "construction sign safety sign site sign board",
    97: "tshirt apparel uniform cotton blue",
    98: "cap hat apparel headwear",
    99: "mug cup promotional gift ceramic",
    100: "3d sign logo sign wood dimensional",
    101: "engraving logo wood laser",
    102: "metal sign engraving plaque logo",
    103: "award trophy plaque recognition acrylic",
    104: "retail display shelf pop point of sale",
    105: "3d sign channel letters metal signage",
    106: "retail display shelf talker dangler wobbler",
    107: "retail display counter display pop",
    108: "retail display shelf poster pop",
    109: "window graphics storefront signage qr",
    110: "floor decal floor sticker round graphic",
    111: "flag feather flag standee teardrop",
    112: "wall mural wallpaper wall graphics office",
    113: "frosted vinyl glass sign window etched",
    114: "wall mural directional sign cityscape",
    115: "canvas wall art wall graphics cityscape",
    116: "canvas framed print wall art",
    117: "poster flyer services why choose us",
    118: "poster lightbox services illuminated",
    119: "yard sign lawn sign real estate coming soon",
    120: "construction sign safety first site sign notice",
    121: "construction sign banner site printing",
    122: "site sign directional sign construction safety",
    123: "certificate award appreciation completion",
    124: "id card badge lanyard identity access",
    125: "training manual book booklet guide",
    126: "exam paper form education test",
    127: "menu restaurant menu food card",
    128: "placemat table mat restaurant paper",
    129: "door hanger hospitality welcome do not disturb",
    130: "office sign door sign nameplate conference",
    131: "tent card table tent card standee",
    132: "medical form healthcare form clinical",
    133: "prescription pad rx medical form pad",
    134: "hospital sign medical sign wayfinding emergency",
    135: "warning sign safety sign hazard high voltage",
    136: "medical form patient information form",
    137: "safety sign ppe sign hard hat eye protection",
    138: "safety sign workplace sign hygiene biohazard",
    139: "wayfinding directional sign office sign exit",
    140: "sticker label business open thank you delivery",
    141: "sticker label sale parking first aid retail",
    142: "warning sign safety sign danger stop no entry",
    143: "safety sign decal sticker no smoking parking",
    144: "road sign safety sign traffic stop caution",
    145: "sign install wall sign janitorial",
    146: "sign install acrylic sign wall sign",
    147: "sticker decal application peel press how to",
    148: "exhibition table cover booth event staff",
    149: "graphic design design service creative",
    150: "logo design design service branding identity",
    151: "prepress file setup design service artwork print ready",
    152: "sign install wall sign signage",
    153: "sign install wall sign signage",
    154: "on site branding signage van standee",
    155: "damage replacement reprint reprinting service",
    156: "artwork correction prepress design service fix",
    157: "large format printing roll up billboard banner",
    158: "promotional printing marketing rollup gym fitness",
    161: "logo branding mark identity",
    162: "logo branding mark identity",
    163: "printing press production ink machine",
    164: "promotional merchandise marketing giveaway",
    165: "large format banner event charity printing",
    166: "invitation greeting card announcement birthday wedding",
    167: "signage wayfinding monument sign outdoor directory",
    168: "stationery letterhead corporate identity",
}

# Good generic brand shots for products with no strong keyword match.
GENERIC = [9, 154, 117, 38, 55, 87, 58, 4, 20, 39, 21, 118, 91, 40, 22, 46, 50]

# Extra weighting to steer common product families to their best image.
BOOST = {
    "sticker-removal": [147, 145, 146],
    "logo-design": [150, 101, 100],
    "graphic-design": [149, 30, 156],
    "on-site-branding": [154, 31, 152],
    "artwork-correction": [156, 30, 151],
    "damage-replacement": [155],
    "large-format": [157, 8, 45],
    "id-cards": [124],
    "medical-forms": [132, 136, 133],
    "training-manuals": [125],
    "table-mats": [128],
    "exam-papers": [126],
    "restaurant-menu": [127],
    "menu-cards": [127],
    "transparent-stickers": [65, 17],
    "warning-labels": [142, 135, 27],
    "door-hangers": [42, 129, 43],
    "tent-cards": [131],
    "business-cards": [32, 33, 66],
    "certificates": [123],
    "prescription-pads": [133],
    "presentation-folders": [37],
    "invoice": [35, 36],
    "hang-tags": [86],
    "vehicle": [13, 62, 60],
    "banner": [45, 44, 157],
    "roll-up": [44, 47, 48],
    "flag": [111, 5],
    "canopy": [5, 148],
    "keychain": [70, 19],
    "usb": [72],
    "mug": [99, 11],
    "cap": [98, 15],
    "polo": [74],
    "hoodie": [75],
    "notebook": [71, 69],
    "envelope": [34],
    "lanyard": [124],
    "id-card": [124],
    "reflective": [78, 76],
    "floor": [94, 110],
    "neon": [53],
    "acrylic": [49, 146, 10],
    "wall-mural": [112, 114],
    "canvas": [116, 115],
    "backdrop": [90, 89, 87],
    "yard-sign": [119],
    "safety-sign": [92, 137, 138],
    "packaging": [16, 84, 85],
    "kraft": [83],
    "paper-bag": [81, 82, 83],
    "shopping-bag": [81, 82],
    "invitation": [166],
    "greeting": [166],
    "coaster": [19],
    "certificate": [123],
    "brochure": [39, 40, 55],
    "catalog": [55, 56],
    "booklet": [55, 56, 125],
    "letterhead": [11, 34, 168],
    "poster": [46, 50, 117],
    "flyer": [38, 117, 39],
    "signage": [3, 167, 105],
    "window": [109, 51, 113],
}


def _tokens(text):
    out = []
    for t in text.replace("/", "-").replace("_", "-").split("-"):
        t = t.strip().lower()
        if len(t) > 2:
            out.append(t)
    return out


def build_index_tokens():
    """index -> set of tag tokens"""
    return {i: set(tags.split()) for i, tags in TAGS.items()}


def assign_images(products):
    """
    Return dict slug -> image index. Deterministic; spreads usage so repeats
    are rare and never back-to-back.
    """
    idx_tokens = build_index_tokens()
    used = {i: 0 for i in TAGS}
    assigned = {}
    gen_ptr = 0

    # process in catalogue order for stable output
    for p in products:
        slug = p["slug"]
        name = p.get("name", slug)
        toks = set(_tokens(slug) + _tokens(name))

        # explicit boosts first (substring on slug)
        boost_pool = []
        for key, idxs in BOOST.items():
            if key in slug:
                boost_pool.extend(idxs)

        best, best_score = None, 0
        # score every image
        for i, itags in idx_tokens.items():
            score = len(toks & itags)
            if i in boost_pool:
                score += 5
            if score <= 0:
                continue
            # prefer less-used images on ties
            score = score * 100 - used[i]
            if score > best_score:
                best_score, best = score, i

        if best is None:
            # generic fallback, cycled
            best = GENERIC[gen_ptr % len(GENERIC)]
            gen_ptr += 1

        used[best] += 1
        assigned[slug] = best

    return assigned


def img_path(index, depth=0):
    return ("../" * depth) + f"{LIB}/{index:03d}{EXT}"


def gallery_for(index, assigned_indices):
    """
    Build a small gallery (main + up to 3 thumbnails) around the product's
    main image. Thumbnails are complementary brand shots so the layout mirrors
    the reference product page even though each product has one real photo.
    """
    thumbs = [index]
    # pull a few visually-related generic brand shots, rotated by the main
    # index so different products don't all show the same secondary thumbs
    n = len(GENERIC)
    start = index % n
    for k in range(n):
        cand = GENERIC[(start + k) % n]
        if cand == index or cand in thumbs:
            continue
        thumbs.append(cand)
        if len(thumbs) >= 4:
            break
    return thumbs

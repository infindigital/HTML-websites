# -*- coding: utf-8 -*-
"""Home, About, Services (index + details) and Equipment Rental pages."""
from _common import (
    head, header, crumbs, breadcrumb_ld, footer, cta_band, faq_block, faq_ld,
    write, org_ld, website_ld, service_ld, icon, SERVICES, BRANCHES, BR,
    SITE, COMPANY, COMPANY_SHORT, PRIMARY_PHONE, PRIMARY_PHONE_HREF, PRIMARY_EMAIL,
)
import html as _html

IMG = "/assets/images/"

# ---- Verified brochure content (source of truth) --------------------------
OVERVIEW = [
    ("Falcon Rotating Contracting &amp; General Maintenance L.L.C. is a trusted engineering and "
     "contracting company dedicated to supporting the UAE&rsquo;s rapidly growing industrial, "
     "infrastructure, and construction sectors. With a strong commitment to quality, safety, and "
     "customer satisfaction, the company has built a reputation for delivering reliable, "
     "cost-effective, and timely solutions across a wide range of projects."),
    ("Driven by technical expertise and a highly skilled workforce, the company has established "
     "itself as a dependable partner for both private and government clients. Through "
     "professionalism, operational excellence, and adherence to international standards, Falcon "
     "Rotating continues to strengthen its position as a preferred contractor in the region."),
    ("By embracing innovative engineering practices, modern equipment, and efficient project "
     "management, the company consistently delivers high-quality results while adapting to the "
     "evolving needs of the industry. Every project is executed with precision, integrity, and a "
     "commitment to exceeding client expectations."),
]

SVC_IMG = {
    "construction-contracting": ("construction-contracting", "Construction site with tower crane and structural works"),
    "piling": ("piling-work", "Rotary piling rig installing deep foundation piles"),
    "rotating-equipment": ("turbine-inspection", "Technician inspecting an industrial steam turbine rotor"),
    "excavation-backfilling": ("excavation-backfilling", "Excavator performing earthworks and site excavation"),
    "equipment-rental": ("equipment-rental-fleet", "Heavy construction equipment rental fleet"),
}
SVC_ICON = {
    "construction-contracting": "building", "piling": "piling",
    "rotating-equipment": "gear", "excavation-backfilling": "dig",
    "equipment-rental": "truck",
}


def _svc_cards(slugs=None):
    slugs = slugs or [s[0] for s in SERVICES]
    lookup = {s[0]: s for s in SERVICES}
    out = ""
    for i, slug in enumerate(slugs, 1):
        _, name, desc, url = lookup[slug]
        img, alt = SVC_IMG[slug]
        d = f' data-d="{i%3}"' if i % 3 else ""
        out += f"""
      <a class="svc-card reveal"{d} href="{url}">
        <span class="svc-card__img"><img src="{IMG}falcon-rotating-{img}.webp" alt="{alt}" loading="lazy" width="640" height="400"></span>
        <span class="svc-card__body">
          <span class="svc-card__num">0{i}</span>
          <h3>{name}</h3>
          <p>{desc}</p>
          <span class="svc-card__link">Explore service {icon('arrow','ar')}</span>
        </span>
      </a>"""
    return out


def _mini_loc_cards():
    out = ""
    for i, b in enumerate(BRANCHES, 1):
        out += f"""
      <div class="loc-card reveal" data-d="{i%3}">
        <span class="loc-card__tag">{b['tag']}</span>
        <h3>{b['city']}, {b['country']}</h3>
        <p class="entity">{b['legal']}</p>
        <dl>
          <div class="row">{icon('pin')}<span>{b['locality']}</span></div>
          <div class="row">{icon('phone')}<a href="tel:{b['phone_href']}">{b['phone']}</a></div>
          <div class="row">{icon('mail')}<a href="mailto:{b['email']}">{b['email']}</a></div>
        </dl>
        <p class="mt-m"><a class="svc-card__link" href="/locations/{b['slug']}/">View {b['city']} office {icon('arrow','ar')}</a></p>
      </div>"""
    return out


# =====================================================================  HOME
def build_home():
    hero_img = f"{IMG}falcon-rotating-steam-turbine-overhaul.webp"
    ld = [org_ld(), website_ld(),
          breadcrumb_ld([("Home", "/")]),
          faq_ld(HOME_FAQ)]
    doc = head(
        f"{COMPANY_SHORT} | Construction, Rotating Equipment & Piling Contractor UAE & KSA",
        ("Falcon Rotating Contracting & General Maintenance L.L.C. delivers construction "
         "contracting, rotating equipment overhauling, piling, excavation and heavy equipment "
         "rental across the UAE and Saudi Arabia. Request a quote today."),
        "/", preload_hero=hero_img, jsonld=ld,
    )
    doc += header("home")
    doc += f"""
<main id="main">
  <section class="hero">
    <div class="container hero__grid">
      <div class="hero__content">
        <p class="eyebrow">Contracting &amp; Industrial Maintenance &middot; UAE &amp; KSA</p>
        <h1>Engineering Strength.<br><span class="accent">Delivering Excellence.</span></h1>
        <p class="hero__lead">Your dependable partner for construction, rotating equipment overhauling, piling, excavation and equipment rental services across the UAE and Saudi Arabia.</p>
        <div class="btn-row">
          <a class="btn btn--lg" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a>
          <a class="btn btn--ghost btn--lg" href="/services/">Explore Services</a>
        </div>
        <ul class="hero__marks">
          <li><strong>05</strong><span>Core disciplines</span></li>
          <li><strong>04</strong><span>Regional offices</span></li>
          <li><strong>UAE &amp; KSA</strong><span>Gulf-wide delivery</span></li>
        </ul>
      </div>
      <div class="hero__figure">
        <div class="hero__img"><img src="{hero_img}" alt="Falcon Rotating technicians overhauling an industrial steam turbine" width="900" height="1125" fetchpriority="high"></div>
        <div class="hero__badge">
          <span class="hero__badge-ic">{icon('gear')}</span>
          <span class="hero__badge-tx"><b>Rotating Equipment</b><span>Overhaul &amp; maintenance specialists</span></span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container split split--wide-text">
      <div class="reveal">
        <p class="eyebrow">Who We Are</p>
        <h2>A Dependable Engineering &amp; Contracting Partner</h2>
        <p class="lead mt-s">{OVERVIEW[0]}</p>
        <p class="mt-m muted">{OVERVIEW[1]}</p>
        <div class="btn-row"><a class="btn btn--ghost" href="/about/">About Falcon Rotating {icon('arrow','ar')}</a></div>
      </div>
      <div class="split__media reveal" data-d="1">
        <img src="{IMG}falcon-rotating-industrial-maintenance-team.webp" alt="Falcon Rotating maintenance engineer working on process plant machinery" loading="lazy" width="900" height="1000">
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">What We Do</p>
        <h2>Our Core Services</h2>
        <p class="lead mt-s">Five integrated disciplines &mdash; delivered by one experienced engineering and contracting team across the Gulf.</p>
      </div>
      <div class="grid grid-3">{_svc_cards()}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head center reveal">
        <p class="eyebrow">Why Falcon Rotating</p>
        <h2>Built Around Reliability</h2>
      </div>
      <div class="values reveal">
        <div class="value"><div class="value__k">Quality &amp; Safety</div><h3>Standards-Driven Delivery</h3><p>A strong commitment to quality, safety and customer satisfaction on every project, guided by international standards.</p></div>
        <div class="value"><div class="value__k">Skilled Workforce</div><h3>Technical Expertise</h3><p>A highly skilled workforce and experienced technical teams driving precise, professional execution.</p></div>
        <div class="value"><div class="value__k">Modern Equipment</div><h3>Efficient Project Management</h3><p>Innovative engineering practices, modern equipment and efficient management for high-quality results.</p></div>
        <div class="value"><div class="value__k">Trusted Partner</div><h3>Private &amp; Government Clients</h3><p>A dependable partner for both private and government clients, and a preferred contractor in the region.</p></div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container split split--rev">
      <div class="split__media reveal">
        <img src="{IMG}falcon-rotating-steam-turbine-rotor.webp" alt="Steam turbine rotor undergoing precision overhaul and inspection" loading="lazy" width="900" height="640">
      </div>
      <div class="reveal" data-d="1">
        <p class="eyebrow">Rotating Equipment</p>
        <h2>Precision Maintenance. Reliable Performance.</h2>
        <p class="mt-s muted">Specialized overhauling, maintenance, inspection and repair for critical rotating machinery &mdash; restoring performance, improving reliability and minimizing unplanned downtime.</p>
        <div class="chips mt-m">
          <span class="chip">{icon('gear')}Steam Turbines</span>
          <span class="chip">{icon('gear')}Centrifugal Pumps</span>
          <span class="chip">{icon('gear')}Compressors</span>
          <span class="chip">{icon('gear')}Gearboxes</span>
          <span class="chip">{icon('gear')}Agitators</span>
        </div>
        <div class="btn-row mt-m"><a class="btn btn--ghost" href="/services/rotating-equipment/">Rotating equipment services {icon('arrow','ar')}</a></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="reveal">
        <p class="eyebrow">Equipment Rental</p>
        <h2>Power Your Projects with Confidence</h2>
        <p class="mt-s muted">An entire range of heavy construction machinery and vehicles, owned and operated by Falcon Rotating and provided directly under our clients&rsquo; control on an agreed rental basis.</p>
        <div class="chips mt-m">
          <span class="chip">{icon('crane')}Cranes &amp; Crawler Cranes</span>
          <span class="chip">{icon('truck')}Dump &amp; Boom Trucks</span>
          <span class="chip">{icon('dig')}Excavators &amp; Loaders</span>
          <span class="chip">{icon('bolt')}Generators &amp; Compressors</span>
        </div>
        <div class="btn-row mt-m"><a class="btn btn--ghost" href="/equipment-rental/">Explore equipment rental {icon('arrow','ar')}</a></div>
      </div>
      <div class="split__media reveal" data-d="1">
        <img src="{IMG}falcon-rotating-equipment-rental-fleet.webp" alt="Falcon Rotating heavy equipment rental fleet including crane and excavators" loading="lazy" width="900" height="640">
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Where We Operate</p>
        <h2>Regional Presence, Local Delivery</h2>
        <p class="lead mt-s">Offices across the United Arab Emirates and the Kingdom of Saudi Arabia.</p>
      </div>
      <div class="loc-grid">{_mini_loc_cards()}</div>
    </div>
  </section>
"""
    doc += faq_block(HOME_FAQ, heading="Frequently Asked Questions",
                     intro="Answers to common questions about our services, coverage and how to get started.")
    doc += cta_band("Let&rsquo;s Discuss Your Project",
                    "Tell us about your construction, maintenance, piling or equipment requirements and our team will prepare a tailored proposal.")
    doc += "\n</main>\n"
    doc += footer()
    write("/", doc)


HOME_FAQ = [
    ("What services does Falcon Rotating provide?",
     ["Falcon Rotating provides five core services: construction contracting, piling work, "
      "rotating equipment overhauling and maintenance, excavation and backfilling, and heavy "
      "equipment rental &mdash; supporting industrial, infrastructure and construction projects."]),
    ("Which regions does Falcon Rotating operate in?",
     ["We operate across the United Arab Emirates, with offices in Dubai and Abu Dhabi, and across "
      "the Kingdom of Saudi Arabia, with our head office in Yanbu and a branch in Al Jubail."]),
    ("What types of rotating equipment do you service?",
     ["Our team overhauls, maintains, inspects and repairs steam turbines, centrifugal and "
      "reciprocating pumps, agitators, extruders, rotary feeders, centrifugal and reciprocating "
      "compressors, gearboxes, expanders and other rotating equipment."]),
    ("Do you work with government clients?",
     ["Yes. Falcon Rotating is a dependable partner for both private and government clients and "
      "continues to strengthen its position as a preferred contractor in the region."]),
    ("How can I request a quote?",
     ["You can request a quote through our online form or by contacting your nearest office. Share "
      "your project scope and requirements and our team will prepare a tailored proposal."]),
]


# ====================================================================  ABOUT
def build_about():
    items = [("Home", "/"), ("About", None)]
    ld = [org_ld(), breadcrumb_ld(items)]
    doc = head(
        f"About {COMPANY_SHORT} | Engineering & Contracting Company",
        ("Learn about Falcon Rotating Contracting & General Maintenance L.L.C. — a trusted "
         "engineering and contracting company serving industrial, infrastructure and construction "
         "sectors across the UAE and Saudi Arabia."),
        "/about/", og_img="/assets/images/falcon-rotating-industrial-maintenance-team.webp", jsonld=ld,
    )
    doc += header("about")
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-industrial-maintenance-team.webp" alt="Falcon Rotating engineering team at an industrial facility" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">About Us</p>
      <h1>Engineering Trust Across the Gulf</h1>
      <p>A trusted engineering and contracting partner dedicated to supporting the region&rsquo;s industrial, infrastructure and construction growth.</p>
    </div>
  </section>

  <section class="section">
    <div class="container narrow">
      <div class="reveal">
        <p class="eyebrow">Company Overview</p>
        <h2>Who We Are</h2>
        <p class="lead mt-s">{OVERVIEW[0]}</p>
        <p class="mt-m muted">{OVERVIEW[1]}</p>
        <p class="mt-s muted">{OVERVIEW[2]}</p>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="split">
        <div class="reveal">
          <p class="eyebrow">Our Vision &amp; Mission</p>
          <h2>Setting a Standard of Excellence</h2>
          <p class="mt-s muted">Falcon Rotating is resolving to set a standard of excellence as one of the regional market leaders in the contracting industry. Our aim is to deliver exceptional services with a commitment to standards and fairness.</p>
        </div>
        <ul class="checks checks--single reveal" data-d="1">
          <li>{icon('check')}<div>People First<span>We believe in the value and potential of every employee and strive to create a healthy, safe environment that encourages teamwork, personal growth and dedication.</span></div></li>
          <li>{icon('check')}<div>Continual Improvement<span>We are committed to the continual improvement of our business processes and to maintaining a healthy growth rate, based on experience and sound practical management.</span></div></li>
          <li>{icon('check')}<div>Ethical Conduct<span>Our work is guided by ethical conduct and a commitment to achieving quality in trading and contracting.</span></div></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head center reveal">
        <p class="eyebrow">What Drives Us</p>
        <h2>Our Operating Principles</h2>
      </div>
      <div class="feat-grid reveal">
        <div class="feat"><div class="feat__ic">{icon('shield')}</div><div><h3>Quality &amp; Safety</h3><p>A strong commitment to quality, safety and customer satisfaction, delivered in line with international standards.</p></div></div>
        <div class="feat"><div class="feat__ic">{icon('users')}</div><div><h3>Skilled Workforce</h3><p>Technical expertise and a highly skilled workforce underpin every project we deliver.</p></div></div>
        <div class="feat"><div class="feat__ic">{icon('gear')}</div><div><h3>Modern Equipment</h3><p>Innovative engineering practices and modern equipment support efficient, high-quality results.</p></div></div>
        <div class="feat"><div class="feat__ic">{icon('badge')}</div><div><h3>Preferred Contractor</h3><p>A dependable partner for private and government clients, and a preferred contractor in the region.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Our Capabilities</p>
        <h2>Explore Our Services</h2>
      </div>
      <div class="grid grid-3">{_svc_cards()}</div>
    </div>
  </section>
"""
    doc += cta_band("Partner With a Team That Delivers",
                    "From industrial maintenance to civil construction and equipment rental, Falcon Rotating is ready to support your next project.")
    doc += "\n</main>\n"
    doc += footer()
    write("/about/", doc)


# =========================================================  SERVICES INDEX
def build_services_index():
    items = [("Home", "/"), ("Services", None)]
    ld = [breadcrumb_ld(items),
          service_ld("Construction, Piling, Rotating Equipment & Equipment Rental",
                     "Integrated construction contracting, piling, rotating equipment maintenance, excavation and equipment rental services.",
                     "/services/")]
    doc = head(
        f"Services | Construction, Piling, Rotating Equipment & Rental | {COMPANY_SHORT}",
        ("Explore Falcon Rotating's services: construction contracting, piling work, rotating "
         "equipment overhauling and maintenance, excavation and backfilling, and heavy equipment "
         "rental across the UAE and Saudi Arabia."),
        "/services/", og_img="/assets/images/falcon-rotating-construction-contracting.webp", jsonld=ld,
    )
    doc += header("services")
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-construction-contracting.webp" alt="Construction site delivered by Falcon Rotating" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">Our Services</p>
      <h1>Integrated Engineering &amp; Contracting Services</h1>
      <p>Five disciplines delivered by one experienced team &mdash; from civil construction and piling to rotating equipment overhauling and heavy equipment rental.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid-3">{_svc_cards()}</div>
    </div>
  </section>
"""
    doc += cta_band("Not Sure Which Service You Need?",
                    "Tell us about your project and our engineers will recommend the right approach and prepare a tailored quotation.")
    doc += "\n</main>\n"
    doc += footer()
    write("/services/", doc)


# ==================================================  SERVICE DETAIL PAGES
def _related_services(exclude):
    lookup = {s[0]: s for s in SERVICES}
    others = [s for s in SERVICES if s[0] != exclude][:3]
    cards = ""
    for slug, name, desc, url in others:
        cards += f'<a href="{url}"><strong>{name}</strong><span>{desc}</span></a>'
    return f'<div class="related">{cards}</div>'


def _service_page(slug, title_tag, meta, h1, hero_img, hero_alt, eyebrow,
                  intro_paras, cap_heading, capabilities, extra_sections, faq,
                  intro_img, intro_alt, intro_tag, intro_tag_icon,
                  band_img, band_alt, band_eyebrow, band_heading, band_text,
                  related_intro=None):
    _, name, short, url = next(s for s in SERVICES if s[0] == slug)
    items = [("Home", "/"), ("Services", "/services/"), (name, None)]
    ld = [breadcrumb_ld(items), service_ld(name, meta, url), faq_ld(faq)]
    doc = head(title_tag, meta, url, og_img=f"/assets/images/falcon-rotating-{hero_img}.webp", jsonld=ld)
    doc += header("services")
    intro_html = "".join(f'<p class="mt-s muted">{p}</p>' for p in intro_paras[1:])
    caps_html = "".join(
        f'<div class="cap-item">{icon("check")}<span>{c}</span></div>' for c in capabilities)
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-{hero_img}.webp" alt="{hero_alt}" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">{eyebrow}</p>
      <h1>{h1}</h1>
      <p>{intro_paras[0]}</p>
    </div>
  </section>

  <section class="section">
    <div class="container split split--wide-text">
      <div class="reveal">
        <p class="eyebrow">Overview</p>
        <h2>{name}</h2>
        {intro_html}
        <div class="btn-row mt-m"><a class="btn btn--ghost" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a></div>
      </div>
      <div class="media-frame media-frame--br reveal" data-d="1">
        <img src="{IMG}falcon-rotating-{intro_img}.webp" alt="{intro_alt}" loading="lazy" width="880" height="1100">
        <span class="media-frame__tag">{icon(intro_tag_icon)}{intro_tag}</span>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Capabilities</p>
        <h2>{cap_heading}</h2>
      </div>
      <div class="cap-grid reveal">{caps_html}</div>
    </div>
  </section>

  <section class="imgband">
    <img src="{IMG}falcon-rotating-{band_img}.webp" alt="{band_alt}" loading="lazy" width="1600" height="800">
    <div class="container imgband__inner reveal">
      <p class="eyebrow">{band_eyebrow}</p>
      <h2>{band_heading}</h2>
      <p>{band_text}</p>
      <div class="btn-row"><a class="btn btn--white btn--lg" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a><a class="btn btn--ghost-white btn--lg" href="/contact/">Talk to Our Team</a></div>
    </div>
  </section>
{extra_sections}
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Related Services</p><h2>Explore More</h2></div>
      {_related_services(slug)}
    </div>
  </section>
"""
    doc += faq_block(faq)
    doc += cta_band("Request a Quote for " + name,
                    "Share your scope and requirements and our team will prepare a tailored proposal for your project.")
    doc += "\n</main>\n"
    doc += footer()
    write(url, doc)


def build_service_construction():
    activities = ["Civil Construction", "Piping Works", "Industrial Maintenance",
                  "Electrical Maintenance", "Industrial Equipment Installation",
                  "Steel Fabrication &amp; Sheet Metal Works", "Carpentry &amp; Finish Works",
                  "Fabrication &amp; Erection of Stairs, Handrails, Beams &amp; Columns"]
    gallery = f"""
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">On Site</p><h2>Our Teams in Action</h2></div>
      <div class="gallery reveal">
        <figure><img src="{IMG}falcon-rotating-industrial-maintenance-team.webp" alt="Falcon Rotating industrial maintenance team on site" loading="lazy" width="520" height="390"><figcaption>Industrial Maintenance</figcaption></figure>
        <figure><img src="{IMG}falcon-rotating-technician.webp" alt="Skilled technician carrying out precision works" loading="lazy" width="520" height="390"><figcaption>Skilled Workforce</figcaption></figure>
        <figure><img src="{IMG}falcon-rotating-finishing-works.webp" alt="Interior finishing and tiling works" loading="lazy" width="520" height="390"><figcaption>Finishing Works</figcaption></figure>
      </div>
    </div>
  </section>"""
    faq = [
        ("What construction activities does Falcon Rotating undertake?",
         ["We undertake civil construction, piping works, industrial maintenance, electrical "
          "maintenance, industrial equipment installation, steel fabrication and sheet metal "
          "works, carpentry and finish works, and the fabrication and erection of stairs, "
          "handrails, beams and columns."]),
        ("Do you handle both commercial and industrial projects?",
         ["Yes. Falcon Rotating was formed to provide general contracting services and subcontract "
          "work across commercial and industrial industries."]),
        ("How do you manage site safety?",
         ["We maintain an ongoing safety program and conduct regular meetings to address job-site "
          "and personal safety, keeping field personnel informed on schedules and active project "
          "matters."]),
    ]
    _service_page(
        "construction-contracting",
        f"Construction Contracting | Civil, Industrial & Steel Works | {COMPANY_SHORT}",
        ("Falcon Rotating provides construction contracting across civil construction, piping, "
         "industrial and electrical maintenance, steel fabrication and finishing works for "
         "commercial and industrial projects."),
        "Construction Contracting",
        "construction-contracting",
        "Construction site with tower crane and structural works delivered by Falcon Rotating",
        "Construction Contracting",
        ["General contracting and subcontract work for commercial and industrial projects, delivered on time, safely and professionally.",
         "Falcon Rotating was formed to provide general contracting services and subcontract work in the commercial and industrial industries. We take pride in completing jobs on time, in a safe and professional manner.",
         "The most fundamental part of Falcon Rotating is our people. Our teams take extra care about job quality and go the extra step to ensure the correctness of work, supported by open communication and teamwork between management and field personnel."],
        "Major Construction Activities",
        activities, gallery, faq,
        intro_img="construction-worker",
        intro_alt="Falcon Rotating construction worker on an active project site",
        intro_tag="Civil &amp; Industrial", intro_tag_icon="building",
        band_img="civil-construction",
        band_alt="Civil construction structural works delivered by Falcon Rotating",
        band_eyebrow="Delivered With Discipline",
        band_heading="One Team, Many Disciplines",
        band_text="From civil construction and piping to industrial and electrical maintenance, steel fabrication and finishing works &mdash; we bring the right trades together to deliver complete, dependable results.",
    )


def build_service_piling():
    caps = ["Piling and foundation works", "Site preparation and mobilization",
            "Piling equipment operation", "Foundation support works",
            "Excavation and associated civil works", "Project execution and site coordination",
            "Quality and safety compliance"]
    extra = f"""
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">How We Work</p><h2>From Mobilization to Completion</h2></div>
      <div class="steps reveal">
        <div class="step"><div class="step__n"></div><div><h3>Site Preparation &amp; Mobilization</h3><p>Access, setup and mobilization of piling equipment, aligned to the project programme and prevailing ground conditions.</p></div></div>
        <div class="step"><div class="step__n"></div><div><h3>Piling &amp; Foundation Works</h3><p>Installation of piles using modern equipment, executed with precision for structural stability, strength and long-term performance.</p></div></div>
        <div class="step"><div class="step__n"></div><div><h3>Foundation Support &amp; Civil Works</h3><p>Associated excavation and civil works that integrate the piling into the wider foundation system.</p></div></div>
        <div class="step"><div class="step__n"></div><div><h3>Quality &amp; Safety Compliance</h3><p>Site coordination, inspection and compliance checks to confirm the works meet the required standards.</p></div></div>
      </div>
    </div>
  </section>"""
    faq = [
        ("What piling services does Falcon Rotating offer?",
         ["We provide piling and foundation works, site preparation and mobilization, piling "
          "equipment operation, foundation support works, associated excavation and civil works, "
          "site coordination, and quality and safety compliance."]),
        ("How do you approach different ground conditions?",
         ["Our piling solutions are tailored to each project&rsquo;s requirements and ground "
          "conditions, drawing on experienced personnel, modern equipment and effective site "
          "management."]),
        ("Why are reliable piling foundations important?",
         ["Piling provides reliable foundation solutions for construction and infrastructure "
          "projects, ensuring structural stability, strength and long-term performance."]),
    ]
    _service_page(
        "piling",
        f"Piling Work | Foundation & Piling Contractor | {COMPANY_SHORT}",
        ("Falcon Rotating delivers reliable piling and foundation works for construction and "
         "infrastructure projects — engineered for structural stability, strength and long-term "
         "performance."),
        "Piling Work",
        "piling-work",
        "Rotary piling rig installing deep foundation piles on a Falcon Rotating site",
        "Piling Work",
        ["Reliable foundation solutions engineered for structural stability, strength and long-term performance.",
         "Our piling services provide reliable foundation solutions for construction and infrastructure projects, ensuring structural stability, strength and long-term performance. We undertake piling works with a strong focus on precision, safety and efficient project execution."],
        "Our Piling Capabilities",
        caps, extra, faq,
        intro_img="piling-rig",
        intro_alt="Rotary piling rig installing deep foundation piles",
        intro_tag="Foundation Works", intro_tag_icon="piling",
        band_img="piling-work",
        band_alt="Piling and foundation works on a Falcon Rotating construction site",
        band_eyebrow="Strong Foundations",
        band_heading="Engineered for Structural Stability",
        band_text="With experienced personnel, modern equipment and effective site management, we deliver piling solutions tailored to each project&rsquo;s requirements and ground conditions &mdash; with precision, safety and efficient execution.",
    )


def build_service_rotating():
    types = ["Steam Turbine", "Centrifugal Pump", "Agitator", "Extruder", "Rotary Feeder",
             "Reciprocating Pump", "Centrifugal Compressor", "Reciprocating Compressor",
             "Gear Box", "Expander", "Other Rotating Equipment"]
    chips = "".join(f'<span class="chip">{icon("gear")}{t}</span>' for t in types)
    gallery = f"""
  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Machinery We Service</p><h2>Rotating Equipment We Overhaul</h2></div>
      <div class="showcase reveal">
        <figure class="sc-lg" data-label="Steam Turbines"><img src="{IMG}falcon-rotating-steam-turbine-blades.webp" alt="Steam turbine blade assembly during overhaul" loading="lazy" width="880" height="600"></figure>
        <figure class="sc-tall" data-label="Compressors"><img src="{IMG}falcon-rotating-centrifugal-compressor.webp" alt="Centrifugal compressor package" loading="lazy" width="500" height="600"></figure>
        <figure class="sc-sm" data-label="Centrifugal Pumps"><img src="{IMG}falcon-rotating-centrifugal-pump.webp" alt="Centrifugal pump units ready for installation" loading="lazy" width="500" height="300"></figure>
        <figure class="sc-sm" data-label="Gearboxes"><img src="{IMG}falcon-rotating-gearbox.webp" alt="Industrial gearbox internal gearing" loading="lazy" width="500" height="300"></figure>
        <figure class="sc-sm" data-label="Agitators"><img src="{IMG}falcon-rotating-agitator.webp" alt="Industrial agitator with drive assembly" loading="lazy" width="500" height="300"></figure>
      </div>
    </div>
  </section>"""
    extra = f"""
  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Equipment We Support</p><h2>A Wide Range of Critical Machinery</h2></div>
      <div class="chips reveal">{chips}</div>
    </div>
  </section>
{gallery}"""
    faq = [
        ("What rotating equipment services do you provide?",
         ["We provide specialized overhauling, maintenance, inspection and repair services for "
          "industrial and process rotating equipment, restoring performance, improving operational "
          "reliability and minimizing unplanned downtime."]),
        ("Which types of rotating equipment can you service?",
         ["We support steam turbines, centrifugal and reciprocating pumps, agitators, extruders, "
          "rotary feeders, centrifugal and reciprocating compressors, gearboxes, expanders and "
          "other rotating equipment."]),
        ("How do you ensure quality and reliability?",
         ["Our experienced technical team combines systematic inspection, expert maintenance "
          "practices, precision alignment and quality workmanship to ensure equipment operates "
          "safely and efficiently."]),
    ]
    _service_page(
        "rotating-equipment",
        f"Rotating Equipment Overhauling & Maintenance | {COMPANY_SHORT}",
        ("Specialized rotating equipment overhauling, maintenance, inspection and repair for steam "
         "turbines, pumps, compressors, gearboxes and more — restoring performance and minimizing "
         "downtime."),
        "Rotating Equipment Overhauling &amp; Maintenance",
        "steam-turbine-overhaul",
        "Falcon Rotating technicians overhauling an industrial steam turbine",
        "Rotating Equipment",
        ["Precision maintenance and reliable performance for critical rotating machinery.",
         "Falcon Rotating provides specialized rotating equipment overhauling, maintenance, inspection and repair services for industrial and process facilities. Our experienced technical team works with precision to restore equipment performance, improve operational reliability and minimize unplanned downtime.",
         "We support a wide range of critical rotating machinery, combining systematic inspection, expert maintenance practices, precision alignment and quality workmanship to ensure equipment operates safely and efficiently."],
        "Our Rotating Equipment Services",
        ["Overhauling of rotating equipment", "Preventive and corrective maintenance",
         "Systematic inspection and condition assessment", "Precision alignment",
         "Repair and performance restoration", "Reliability improvement and downtime reduction"],
        extra, faq,
        intro_img="turbine-inspection",
        intro_alt="Technician inspecting an industrial steam turbine rotor",
        intro_tag="Precision Overhaul", intro_tag_icon="gear",
        band_img="steam-turbine-rotor",
        band_alt="Steam turbine rotor undergoing precision overhaul and inspection",
        band_eyebrow="Reliability First",
        band_heading="Restoring Performance, Reducing Downtime",
        band_text="Our experienced technical team works with precision to restore equipment performance, improve operational reliability and minimise unplanned downtime across critical rotating machinery.",
    )


def build_service_excavation():
    caps = ["Site excavation and earthworks", "Foundation and trench excavation",
            "Soil removal and material handling", "Backfilling and layer-wise compaction",
            "Site grading and leveling", "Underground utility excavation",
            "Ground preparation and reinstatement", "Safe and efficient equipment operation"]
    extra = f"""
  <section class="section">
    <div class="container split split--rev">
      <div class="split__media reveal"><img src="{IMG}falcon-rotating-excavation-backfilling.webp" alt="Layer-wise backfilling and compaction on a construction site" loading="lazy" width="900" height="700"></div>
      <div class="reveal" data-d="1">
        <p class="eyebrow">Trenching to Reinstatement</p>
        <h2>Controlled Backfilling &amp; Compaction</h2>
        <p class="mt-s muted">From foundation and trench excavation to underground utility works, layer-wise backfilling and final reinstatement, we achieve the required depths, levels and site conditions through careful planning and precise execution.</p>
        <ul class="checks checks--single mt-m">
          <li>{icon('check')}<div>Foundation &amp; trench excavation</div></li>
          <li>{icon('check')}<div>Layer-wise backfilling &amp; compaction</div></li>
          <li>{icon('check')}<div>Site grading, leveling &amp; reinstatement</div></li>
        </ul>
      </div>
    </div>
  </section>"""
    faq = [
        ("What excavation and backfilling services do you offer?",
         ["We provide site excavation and earthworks, foundation and trench excavation, soil "
          "removal and material handling, backfilling and layer-wise compaction, site grading and "
          "leveling, underground utility excavation, ground preparation and reinstatement, and "
          "safe equipment operation."]),
        ("How do you ensure stable, durable groundwork?",
         ["We combine careful planning and precise execution with controlled backfilling and proper "
          "compaction to achieve the required depths, levels and site conditions for stable, "
          "durable construction."]),
        ("Who operates your excavation equipment?",
         ["Our excavation works are carried out by experienced operators using modern equipment, "
          "with a strong focus on safety and efficiency."]),
    ]
    _service_page(
        "excavation-backfilling",
        f"Excavation & Backfilling | Earthworks & Groundwork | {COMPANY_SHORT}",
        ("Falcon Rotating provides excavation and backfilling services — earthworks, trenching, "
         "soil removal, layer-wise compaction and site grading for stable, durable construction."),
        "Excavation &amp; Backfilling",
        "excavation-backfilling",
        "Excavator performing site excavation and earthworks for Falcon Rotating",
        "Excavation &amp; Backfilling",
        ["Efficient, reliable ground preparation for construction, infrastructure and industrial projects.",
         "Our excavation and backfilling services provide efficient and reliable ground preparation solutions for construction, infrastructure and industrial projects. We undertake excavation works with careful planning and precise execution to achieve the required depths, levels and site conditions."],
        "Our Capabilities",
        caps, extra, faq,
        intro_img="tracked-excavator",
        intro_alt="Tracked excavator performing site excavation and earthworks",
        intro_tag="Earthworks &amp; Groundwork", intro_tag_icon="dig",
        band_img="earthworks",
        band_alt="Excavator performing earthworks and site grading for Falcon Rotating",
        band_eyebrow="Groundwork Done Right",
        band_heading="Precision in Every Dig. Strength in Every Fill.",
        band_text="With experienced operators, modern equipment and a strong focus on safety, we ensure efficient material handling, controlled backfilling and proper compaction for stable, durable construction.",
    )


# =========================================================  EQUIPMENT RENTAL
def build_equipment_rental():
    items = [("Home", "/"), ("Equipment Rental", None)]
    fleet = ["Welding Machines", "Generators", "Automobiles", "Fork Lifts",
             "Earth Moving Equipment", "Cranes", "Crawler Cranes", "Boom Trucks",
             "Dump Trucks", "Loaders", "Excavators", "Air Compressors",
             "Tower Lights", "Dewatering Pumps"]
    chips = "".join(f'<span class="chip">{icon("truck")}{f}</span>' for f in fleet)
    ld = [breadcrumb_ld(items),
          service_ld("Heavy Equipment Rental",
                     "Heavy construction machinery and vehicle rental provided under clients' control on an agreed rental basis.",
                     "/equipment-rental/"),
          faq_ld(RENTAL_FAQ)]
    doc = head(
        f"Equipment Rental | Heavy Machinery & Vehicle Hire | {COMPANY_SHORT}",
        ("Rent heavy construction machinery and vehicles from Falcon Rotating — cranes, crawler "
         "cranes, excavators, loaders, dump and boom trucks, generators, compressors and more, "
         "operated under your control on a flexible rental basis."),
        "/equipment-rental/", og_img="/assets/images/falcon-rotating-equipment-rental-fleet.webp", jsonld=ld,
    )
    doc += header("equipment-rental")
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-equipment-rental-fleet.webp" alt="Falcon Rotating heavy equipment rental fleet" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">Equipment Rental</p>
      <h1>Power Your Projects with Confidence</h1>
      <p>Quality equipment, dependable performance and flexible rental solutions for every project &mdash; owned and operated by Falcon Rotating.</p>
    </div>
  </section>

  <section class="section">
    <div class="container narrow reveal">
      <p class="eyebrow">Overview</p>
      <h2>Our Equipment Rental Division</h2>
      <p class="lead mt-s">Falcon Rotating has an entire range of heavy construction machinery and services ready at your disposal. We own and operate a fleet of heavy equipment provided directly under our clients&rsquo; control on an agreed rental basis.</p>
      <p class="mt-m muted">Our Equipment Rental Division provides rental services through a network team, with a fleet of hundreds of units. On top of it, our supervisory staff is well experienced and stringently complies with all modern industrial technical standards and safety regulations.</p>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Our Fleet</p><h2>Machinery &amp; Vehicles Available</h2></div>
      <div class="chips reveal">{chips}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Fleet Highlights</p><h2>Equipment You Can Rely On</h2></div>
      <div class="cutgrid reveal">
        <div class="cut"><div class="cut__img"><img src="{IMG}falcon-rotating-crawler-crane.webp" alt="Crawler crane available for rental" loading="lazy"></div><h3>Crawler Cranes</h3><p>Heavy lifting for construction and industrial sites.</p></div>
        <div class="cut"><div class="cut__img"><img src="{IMG}falcon-rotating-forklift.webp" alt="Forklift available for rental" loading="lazy"></div><h3>Fork Lifts</h3><p>Material handling and on-site logistics.</p></div>
        <div class="cut"><div class="cut__img"><img src="{IMG}falcon-rotating-tracked-excavator.webp" alt="Tracked excavator available for rental" loading="lazy"></div><h3>Excavators</h3><p>Earthmoving, excavation and site preparation.</p></div>
        <div class="cut"><div class="cut__img"><img src="{IMG}falcon-rotating-wheel-loader.webp" alt="Wheel loader available for rental" loading="lazy"></div><h3>Loaders</h3><p>Loading, hauling and bulk material movement.</p></div>
        <div class="cut"><div class="cut__img"><img src="{IMG}falcon-rotating-pickup-truck.webp" alt="Pickup truck available for rental" loading="lazy"></div><h3>Automobiles</h3><p>Pickups, SUVs and site transport vehicles.</p></div>
        <div class="cut"><div class="cut__img"><img src="{IMG}falcon-rotating-coaster-bus.webp" alt="Coaster bus available for rental" loading="lazy"></div><h3>Buses &amp; Coasters</h3><p>Crew and personnel transport solutions.</p></div>
      </div>
    </div>
  </section>
"""
    doc += faq_block(RENTAL_FAQ)
    doc += cta_band("Need Equipment for Your Site?",
                    "Tell us what you need and for how long &mdash; we&rsquo;ll match the right machinery to your project and provide a rental quotation.")
    doc += "\n</main>\n"
    doc += footer()
    write("/equipment-rental/", doc)


RENTAL_FAQ = [
    ("What equipment can I rent from Falcon Rotating?",
     ["Our fleet includes welding machines, generators, automobiles, fork lifts, earth moving "
      "equipment, cranes, crawler cranes, boom trucks, dump trucks, loaders, excavators, air "
      "compressors, tower lights and dewatering pumps."]),
    ("How does the rental arrangement work?",
     ["We own and operate our fleet and provide equipment directly under our clients&rsquo; control "
      "on an agreed rental basis, supported by experienced supervisory staff."]),
    ("Do you comply with safety standards?",
     ["Yes. Our supervisory staff is well experienced and stringently complies with all modern "
      "industrial technical standards and safety regulations."]),
    ("How large is your rental fleet?",
     ["Our Equipment Rental Division operates through a network team with a fleet of hundreds of "
      "units of heavy construction machinery and vehicles."]),
]

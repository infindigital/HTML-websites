# -*- coding: utf-8 -*-
"""Locations, Contact, Request a Quote, Blog, legal pages, 404, sitemap, robots."""
import os, datetime, html
from _common import (
    head, header, crumbs, breadcrumb_ld, footer, cta_band, faq_block, faq_ld,
    write, org_ld, localbusiness_ld, service_ld, maps_iframe, icon,
    SERVICES, BRANCHES, BR, SITE, OUT, COMPANY, COMPANY_SHORT,
    PRIMARY_PHONE, PRIMARY_PHONE_HREF, PRIMARY_EMAIL,
)

IMG = "/assets/images/"


# =========================================================  LOCATIONS INDEX
def _loc_card(b, i):
    return f"""
      <div class="loc-card reveal" data-d="{i%3}">
        <span class="loc-card__tag">{b['tag']}</span>
        <h3>{b['city']}, {b['country']}</h3>
        <p class="entity">{b['legal']}</p>
        <dl>
          <div class="row">{icon('pin')}<span>{b['address']}</span></div>
          <div class="row">{icon('phone')}<a href="tel:{b['phone_href']}">{b['phone']}</a></div>
          <div class="row">{icon('mail')}<a href="mailto:{b['email']}">{b['email']}</a></div>
        </dl>
        <p class="mt-m"><a class="svc-card__link" href="/locations/{b['slug']}/">View {b['city']} office {icon('arrow','ar')}</a></p>
      </div>"""


def build_locations_index():
    items = [("Home", "/"), ("Locations", None)]
    ld = [breadcrumb_ld(items), org_ld()] + [localbusiness_ld(b) for b in BRANCHES]
    doc = head(
        f"Locations | Offices in UAE & Saudi Arabia | {COMPANY_SHORT}",
        ("Find Falcon Rotating offices across the UAE and Saudi Arabia — Dubai, Abu Dhabi, Yanbu "
         "(head office) and Al Jubail. Contact your nearest office for construction, maintenance "
         "and equipment rental services."),
        "/locations/", jsonld=ld,
    )
    doc += header("")
    cards = "".join(_loc_card(b, i) for i, b in enumerate(BRANCHES, 1))
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-construction-contracting.webp" alt="Falcon Rotating regional operations" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">Our Locations</p>
      <h1>Offices Across the UAE &amp; Saudi Arabia</h1>
      <p>Regional presence with local delivery &mdash; reach the Falcon Rotating team at the office closest to your project.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="loc-grid">{cards}</div>
    </div>
  </section>
"""
    doc += cta_band("Have a Project in the Region?",
                    "Wherever your site is, our nearest office can support you with construction, maintenance, piling, excavation and equipment rental.")
    doc += "\n</main>\n"
    doc += footer()
    write("/locations/", doc)


# =========================================================  LOCATION DETAIL
def build_location(slug):
    b = BR[slug]
    items = [("Home", "/"), ("Locations", "/locations/"), (b["city"], None)]
    ld = [breadcrumb_ld(items), localbusiness_ld(b)]
    other = [x for x in BRANCHES if x["slug"] != slug]
    doc = head(
        f"{b['city']} Office | Construction & Equipment Rental | {COMPANY_SHORT}",
        (f"Contact the Falcon Rotating {b['city']} office ({b['legal']}). Construction "
         f"contracting, rotating equipment maintenance, piling, excavation and equipment rental "
         f"services in {b['city']}, {b['country']}."),
        f"/locations/{slug}/", jsonld=ld,
    )
    doc += header("")
    svc_chips = "".join(
        f'<a href="{url}"><strong>{name}</strong><span>{short}</span></a>'
        for _, name, short, url in SERVICES[:3]
    )
    other_cards = "".join(
        f'<a href="/locations/{o["slug"]}/"><strong>{o["city"]}, {o["country"]}</strong><span>{o["legal"]}</span></a>'
        for o in other
    )
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-industrial-maintenance-team.webp" alt="Falcon Rotating {b['city']} operations" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">{b['tag']} &middot; {b['country']}</p>
      <h1>Falcon Rotating in {b['city']}</h1>
      <p>{b['legal']} &mdash; your local partner for construction, industrial maintenance, piling, excavation and equipment rental.</p>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="reveal">
        <p class="eyebrow">Contact This Office</p>
        <h2>{b['city']} {b['tag']}</h2>
        <div class="loc-card mt-m" style="border:1px solid var(--border)">
          <p class="entity">{b['legal']}</p>
          <dl>
            <div class="row">{icon('pin')}<span>{b['address']}</span></div>
            <div class="row">{icon('phone')}<a href="tel:{b['phone_href']}">{b['phone']}</a></div>
            <div class="row">{icon('mail')}<a href="mailto:{b['email']}">{b['email']}</a></div>
            <div class="row">{icon('globe')}<span>{b['city']}, {b['region']}, {b['country']}</span></div>
          </dl>
          <div class="btn-row mt-m">
            <a class="btn" href="/request-a-quote/">Request a Quote {icon('arrow','ar')}</a>
            <a class="btn btn--ghost" href="tel:{b['phone_href']}">Call Office</a>
          </div>
        </div>
      </div>
      <div class="split__media frame reveal" data-d="1">
        <div class="map-frame">{maps_iframe(b['map_q'], f"Map of Falcon Rotating {b['city']} office")}</div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Services in {b['city']}</p><h2>How We Can Help</h2></div>
      <div class="related reveal">{svc_chips}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Other Locations</p><h2>More Offices</h2></div>
      <div class="related reveal">{other_cards}</div>
    </div>
  </section>
"""
    doc += cta_band(f"Start a Project in {b['city']}",
                    "Contact your local Falcon Rotating team and we&rsquo;ll prepare a tailored proposal for your requirements.")
    doc += "\n</main>\n"
    doc += footer()
    write(f"/locations/{slug}/", doc)


# =================================================================  CONTACT
def build_contact():
    items = [("Home", "/"), ("Contact", None)]
    ld = [breadcrumb_ld(items), org_ld(),
          {"@context": "https://schema.org", "@type": "ContactPage",
           "url": SITE + "/contact/", "name": f"Contact {COMPANY_SHORT}"}]
    doc = head(
        f"Contact {COMPANY_SHORT} | Get in Touch",
        ("Contact Falcon Rotating Contracting & General Maintenance L.L.C. Reach our offices in "
         "Dubai, Abu Dhabi, Yanbu and Al Jubail for construction, maintenance and equipment rental "
         "enquiries."),
        "/contact/", jsonld=ld,
    )
    doc += header("contact")
    office_cards = "".join(
        f"""
        <div class="loc-card reveal" data-d="{i%3}">
          <span class="loc-card__tag">{b['tag']}</span>
          <h3>{b['city']}</h3>
          <p class="entity">{b['legal']}</p>
          <dl>
            <div class="row">{icon('phone')}<a href="tel:{b['phone_href']}">{b['phone']}</a></div>
            <div class="row">{icon('mail')}<a href="mailto:{b['email']}">{b['email']}</a></div>
            <div class="row">{icon('pin')}<span>{b['address']}</span></div>
          </dl>
        </div>""" for i, b in enumerate(BRANCHES, 1)
    )
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-technician.webp" alt="Falcon Rotating team member" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">Contact Us</p>
      <h1>Let&rsquo;s Talk About Your Project</h1>
      <p>If you have any queries or require further information, please do not hesitate to contact us.</p>
    </div>
  </section>

  <section class="section">
    <div class="container split split--wide-text">
      <div class="reveal">
        <p class="eyebrow">Send an Enquiry</p>
        <h2>Get in Touch</h2>
        <p class="mt-s muted">Complete the form and our team will respond with the information or proposal you need.</p>
        <form class="form-wrap mt-m" data-demo novalidate>
          <div class="form-grid">
            <div class="field"><label for="c-name">Full Name <span class="req">*</span></label><input id="c-name" name="name" type="text" autocomplete="name" required></div>
            <div class="field"><label for="c-company">Company</label><input id="c-company" name="company" type="text" autocomplete="organization"></div>
            <div class="field"><label for="c-email">Email <span class="req">*</span></label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
            <div class="field"><label for="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autocomplete="tel"></div>
            <div class="field full"><label for="c-office">Preferred Office</label>
              <select id="c-office" name="office">
                <option value="">Select an office</option>
                {"".join(f'<option>{b["city"]}, {b["country"]}</option>' for b in BRANCHES)}
              </select>
            </div>
            <div class="field full"><label for="c-msg">Message <span class="req">*</span></label><textarea id="c-msg" name="message" required></textarea></div>
          </div>
          <div class="btn-row mt-m"><button class="btn btn--lg" type="submit">Send Enquiry {icon('arrow','ar')}</button></div>
          <p class="form-note">This form is a front-end demo. Connect it to your email or CRM endpoint to receive submissions. [CLIENT TO CONFIRM]</p>
          <div class="form-status" role="status" aria-live="polite"></div>
        </form>
      </div>
      <div class="reveal" data-d="1">
        <p class="eyebrow">Direct Lines</p>
        <h2>Quick Contact</h2>
        <div class="loc-card mt-m">
          <dl>
            <div class="row">{icon('phone')}<a href="tel:{PRIMARY_PHONE_HREF}">{PRIMARY_PHONE}</a></div>
            <div class="row">{icon('mail')}<a href="mailto:{PRIMARY_EMAIL}">{PRIMARY_EMAIL}</a></div>
            <div class="row">{icon('globe')}<a href="https://arabianfalconsa.com" rel="noopener">arabianfalconsa.com</a></div>
            <div class="row">{icon('pin')}<span>Dubai &middot; Abu Dhabi &middot; Yanbu &middot; Al Jubail</span></div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head reveal"><p class="eyebrow">Our Offices</p><h2>Find Your Nearest Team</h2></div>
      <div class="loc-grid">{office_cards}</div>
    </div>
  </section>
"""
    doc += cta_band("Prefer a Formal Quotation?",
                    "Use our quick quote form to share your project scope and receive a tailored proposal.")
    doc += "\n</main>\n"
    doc += footer()
    write("/contact/", doc)


# ==========================================================  REQUEST A QUOTE
def build_quote():
    items = [("Home", "/"), ("Request a Quote", None)]
    ld = [breadcrumb_ld(items), org_ld()]
    doc = head(
        f"Request a Quote | {COMPANY_SHORT}",
        ("Request a quote from Falcon Rotating for construction contracting, rotating equipment "
         "maintenance, piling, excavation or equipment rental across the UAE and Saudi Arabia."),
        "/request-a-quote/", jsonld=ld,
    )
    doc += header("")
    svc_options = "".join(f'<option>{name}</option>' for _, name, _, _ in SERVICES)
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-construction-contracting.webp" alt="Falcon Rotating project delivery" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">Request a Quote</p>
      <h1>Get a Tailored Proposal</h1>
      <p>Tell us about your project and requirements. Our team will review the details and prepare a quotation suited to your scope.</p>
    </div>
  </section>

  <section class="section">
    <div class="container narrow">
      <form class="form-wrap reveal" data-demo novalidate>
        <div class="form-grid">
          <div class="field"><label for="q-name">Full Name <span class="req">*</span></label><input id="q-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="q-company">Company</label><input id="q-company" name="company" type="text" autocomplete="organization"></div>
          <div class="field"><label for="q-email">Email <span class="req">*</span></label><input id="q-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="q-phone">Phone <span class="req">*</span></label><input id="q-phone" name="phone" type="tel" autocomplete="tel" required></div>
          <div class="field"><label for="q-service">Service Required <span class="req">*</span></label>
            <select id="q-service" name="service" required><option value="">Select a service</option>{svc_options}</select>
          </div>
          <div class="field"><label for="q-location">Project Location</label>
            <select id="q-location" name="location"><option value="">Select nearest office</option>{"".join(f'<option>{b["city"]}, {b["country"]}</option>' for b in BRANCHES)}</select>
          </div>
          <div class="field full"><label for="q-details">Project Details <span class="req">*</span></label><textarea id="q-details" name="details" placeholder="Scope, timeline, site conditions, equipment or quantities…" required></textarea></div>
        </div>
        <div class="btn-row mt-m"><button class="btn btn--lg" type="submit">Submit Request {icon('arrow','ar')}</button></div>
        <p class="form-note">This form is a front-end demo. Connect it to your email or CRM endpoint to receive submissions. [CLIENT TO CONFIRM]</p>
        <div class="form-status" role="status" aria-live="polite"></div>
      </form>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="section-head center reveal"><p class="eyebrow">Prefer to Call?</p><h2>Speak With Our Team</h2></div>
      <div class="values reveal">
        <div class="value"><div class="value__k">Phone</div><h3><a href="tel:{PRIMARY_PHONE_HREF}">{PRIMARY_PHONE}</a></h3><p>UAE &mdash; Dubai office</p></div>
        <div class="value"><div class="value__k">Email</div><h3><a href="mailto:{PRIMARY_EMAIL}">Email Us</a></h3><p>{PRIMARY_EMAIL}</p></div>
        <div class="value"><div class="value__k">Offices</div><h3>4 Locations</h3><p>UAE &amp; Saudi Arabia</p></div>
        <div class="value"><div class="value__k">Services</div><h3>5 Disciplines</h3><p>One integrated team</p></div>
      </div>
    </div>
  </section>
</main>
"""
    doc += footer()
    write("/request-a-quote/", doc)


# ==================================================================  BLOG
BLOG_POSTS = [
    ("Rotating Equipment Overhauling: Restoring Reliability", "Rotating Equipment",
     "turbine-inspection", "How systematic inspection, precision alignment and expert maintenance restore performance and reduce unplanned downtime."),
    ("Understanding Piling &amp; Foundation Works", "Piling",
     "piling-work", "Why reliable piling is the foundation of structural stability, strength and long-term performance for any project."),
    ("Excavation &amp; Backfilling Done Right", "Excavation",
     "earthworks", "The role of careful planning, controlled backfilling and proper compaction in stable, durable construction."),
    ("Choosing the Right Equipment Rental for Your Site", "Equipment Rental",
     "equipment-rental-fleet", "Matching machinery to scope &mdash; from cranes and excavators to generators and dewatering pumps."),
    ("Construction Contracting: Delivering Quality &amp; Safety", "Construction",
     "civil-construction", "How an ongoing safety program and skilled teams keep commercial and industrial projects on time."),
    ("Why Modern Equipment Matters in Contracting", "Industry Insights",
     "industrial-maintenance-team", "The link between modern equipment, efficient project management and consistent, high-quality results."),
]


def build_blog():
    items = [("Home", "/"), ("Insights", None)]
    ld = [breadcrumb_ld(items)]
    doc = head(
        f"Insights & News | {COMPANY_SHORT}",
        ("Insights from Falcon Rotating on construction contracting, rotating equipment "
         "maintenance, piling, excavation and equipment rental across the UAE and Saudi Arabia."),
        "/blog/", jsonld=ld,
    )
    doc += header("")
    cards = ""
    for i, (title, cat, img, excerpt) in enumerate(BLOG_POSTS, 1):
        cards += f"""
      <article class="post reveal" data-d="{i%3}">
        <div class="post__img"><img src="{IMG}falcon-rotating-{img}.webp" alt="{title}" loading="lazy" width="520" height="325"></div>
        <div class="post__body">
          <p class="post__cat">{cat}</p>
          <h3>{title}</h3>
          <p>{excerpt}</p>
          <p class="mt-m"><span class="badge">Coming soon</span></p>
        </div>
      </article>"""
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__media"><img src="{IMG}falcon-rotating-turbine-inspection.webp" alt="Falcon Rotating insights" width="1400" height="700"></div>
    <div class="container pagehero__inner">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">Insights</p>
      <h1>Insights &amp; News</h1>
      <p>Practical perspectives on engineering, contracting and maintenance from the Falcon Rotating team.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <p class="lead reveal" style="max-width:760px">Our editorial library is being prepared. In the meantime, explore our services or get in touch to discuss your project.</p>
      <div class="post-grid mt-l">{cards}</div>
    </div>
  </section>
"""
    doc += cta_band("Have a Question for Our Engineers?",
                    "Reach out and our team will be glad to help with technical guidance or a project proposal.")
    doc += "\n</main>\n"
    doc += footer()
    write("/blog/", doc)


# ===============================================================  LEGAL PAGES
def _legal_page(path, title_tag, meta, h1, eyebrow, body_html):
    # h1 may carry HTML entities (e.g. &amp;); breadcrumb sinks (crumbs/JSON-LD)
    # expect plain text and escape/serialise themselves.
    label = html.unescape(h1)
    items = [("Home", "/"), (label, None)]
    ld = [breadcrumb_ld(items)]
    doc = head(title_tag, meta, path, jsonld=ld)
    doc += header("")
    doc += f"""
<main id="main">
  <section class="pagehero">
    <div class="pagehero__inner container" style="max-width:820px">
      {crumbs(items)}
      <p class="eyebrow" style="color:#9DBBF0">{eyebrow}</p>
      <h1>{h1}</h1>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="prose reveal">{body_html}</div>
    </div>
  </section>
</main>
"""
    doc += footer()
    write(path, doc)


def build_privacy():
    body = f"""
      <p><strong>Last updated:</strong> [CLIENT TO CONFIRM]</p>
      <p>This Privacy Policy explains how {COMPANY} (&ldquo;Falcon Rotating&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information collected through this website. Please review it alongside your organisation&rsquo;s finalised legal wording before publication. [CLIENT TO CONFIRM]</p>
      <h2>Information We Collect</h2>
      <p>When you submit an enquiry or quote request, we may collect the details you provide, such as your name, company, email address, phone number and project information. We collect this information only to respond to your request.</p>
      <h2>How We Use Information</h2>
      <ul>
        <li>To respond to enquiries and prepare quotations.</li>
        <li>To communicate with you about your project or request.</li>
        <li>To improve our services and website experience.</li>
      </ul>
      <h2>Sharing of Information</h2>
      <p>We do not sell your personal information. Information may be shared internally across our offices in the UAE and Saudi Arabia solely to service your request, or with service providers who support our operations under appropriate confidentiality. [CLIENT TO CONFIRM]</p>
      <h2>Data Retention</h2>
      <p>We retain enquiry information only for as long as necessary to fulfil the purposes described above or as required by applicable law. [CLIENT TO CONFIRM]</p>
      <h2>Your Rights</h2>
      <p>You may request access to, correction of, or deletion of the personal information you have provided. To make a request, contact us using the details below.</p>
      <h2>Contact Us</h2>
      <p>For any questions about this Privacy Policy, contact us at <a href="mailto:{PRIMARY_EMAIL}">{PRIMARY_EMAIL}</a> or <a href="tel:{PRIMARY_PHONE_HREF}">{PRIMARY_PHONE}</a>.</p>
    """
    _legal_page("/privacy-policy/", f"Privacy Policy | {COMPANY_SHORT}",
                "Privacy Policy for Falcon Rotating Contracting & General Maintenance L.L.C. — how we handle information submitted through this website.",
                "Privacy Policy", "Legal", body)


def build_terms():
    body = f"""
      <p><strong>Last updated:</strong> [CLIENT TO CONFIRM]</p>
      <p>These Terms &amp; Conditions govern your use of the {COMPANY} website. By using this website, you agree to these terms. Please review them alongside your organisation&rsquo;s finalised legal wording before publication. [CLIENT TO CONFIRM]</p>
      <h2>Use of This Website</h2>
      <p>The content on this website is provided for general information about Falcon Rotating and our services. It may be updated or amended at any time without notice.</p>
      <h2>Intellectual Property</h2>
      <p>All content, including text, graphics, logos and images, is the property of Falcon Rotating or its licensors and may not be reproduced without permission.</p>
      <h2>Enquiries &amp; Quotations</h2>
      <p>Information submitted through our forms is used to respond to your enquiry or prepare a quotation. Any quotation provided is subject to a separate formal agreement and does not constitute a binding contract until confirmed in writing. [CLIENT TO CONFIRM]</p>
      <h2>Limitation of Liability</h2>
      <p>While we aim to keep information accurate and up to date, Falcon Rotating makes no warranties regarding completeness or accuracy and accepts no liability for reliance on website content. [CLIENT TO CONFIRM]</p>
      <h2>External Links</h2>
      <p>This website may contain links to third-party websites. We are not responsible for the content or practices of those websites.</p>
      <h2>Contact Us</h2>
      <p>For any questions about these Terms &amp; Conditions, contact us at <a href="mailto:{PRIMARY_EMAIL}">{PRIMARY_EMAIL}</a> or <a href="tel:{PRIMARY_PHONE_HREF}">{PRIMARY_PHONE}</a>.</p>
    """
    _legal_page("/terms-and-conditions/", f"Terms & Conditions | {COMPANY_SHORT}",
                "Terms & Conditions for the Falcon Rotating Contracting & General Maintenance L.L.C. website.",
                "Terms &amp; Conditions", "Legal", body)


# =================================================================  404
def build_404():
    doc = head("Page Not Found | " + COMPANY_SHORT,
               "The page you are looking for could not be found. Explore Falcon Rotating services, locations or contact us.",
               "/404.html")
    doc += header("")
    svc_links = "".join(
        f'<a href="{url}"><strong>{name}</strong><span>{short}</span></a>'
        for _, name, short, url in SERVICES[:3]
    )
    doc += f"""
<main id="main">
  <section class="section" style="text-align:center">
    <div class="container narrow">
      <p class="eyebrow center">Error 404</p>
      <h1>Page Not Found</h1>
      <p class="lead mt-s">The page you&rsquo;re looking for may have moved or no longer exists. Let&rsquo;s get you back on track.</p>
      <div class="btn-row mt-m" style="justify-content:center">
        <a class="btn btn--lg" href="/">Back to Home {icon('arrow','ar')}</a>
        <a class="btn btn--ghost btn--lg" href="/contact/">Contact Us</a>
      </div>
    </div>
  </section>
  <section class="section section--tint">
    <div class="container">
      <div class="section-head center reveal"><p class="eyebrow">Popular Services</p><h2>Where to Next?</h2></div>
      <div class="related">{svc_links}</div>
    </div>
  </section>
</main>
"""
    doc += footer()
    # 404 lives at site root as 404.html
    fp = os.path.join(OUT, "404.html")
    with open(fp, "w", encoding="utf-8") as f:
        f.write(doc)


# ==========================================================  SITEMAP + ROBOTS
def build_sitemap():
    today = os.environ.get("BUILD_DATE") or datetime.date.today().isoformat()
    urls = ["/", "/about/", "/services/"]
    urls += [url for _, _, _, url in SERVICES if url.startswith("/services/")]
    urls += ["/equipment-rental/", "/locations/"]
    urls += [f"/locations/{b['slug']}/" for b in BRANCHES]
    urls += ["/contact/", "/request-a-quote/", "/blog/",
             "/privacy-policy/", "/terms-and-conditions/"]
    priority = {"/": "1.0", "/services/": "0.9", "/equipment-rental/": "0.9",
                "/contact/": "0.8", "/request-a-quote/": "0.8", "/about/": "0.8"}
    rows = ""
    for u in urls:
        p = priority.get(u, "0.7")
        cf = "weekly" if u in ("/", "/blog/") else "monthly"
        rows += (f"  <url>\n    <loc>{SITE}{u}</loc>\n    <lastmod>{today}</lastmod>\n"
                 f"    <changefreq>{cf}</changefreq>\n    <priority>{p}</priority>\n  </url>\n")
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           f"{rows}</urlset>\n")
    with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(xml)


def build_robots():
    txt = (f"User-agent: *\nAllow: /\n\n"
           f"Sitemap: {SITE}/sitemap.xml\n")
    with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(txt)

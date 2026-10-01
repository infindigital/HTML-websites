"""Legal pages: privacy policy, terms and conditions, refund and cancellation policy, disclaimer and accessibility.

Drafted from what the site actually does (contact, business and order forms sent by email; no analytics or advertising
cookies; Google Fonts, Google Maps, cdnjs and the partner's booking pages as third parties). The client should have
their attorney review the wording before launch; update LEGAL_UPDATED in facts.py whenever a page changes.
"""
from components import page_hero
from facts import CUTOFFS, GUARANTEE, LEGAL_UPDATED, PARTNER, PARTNER_URL, POLICY, PRICE_NOTE
from lib import ADDRESS, BRAND, EMAIL, PHONE, TEL, call_btn, esc, page

B = esc(BRAND)
CONTACT = (f'<p>{B}<br>{ADDRESS}<br>Phone: <a href="{TEL}">{PHONE}</a><br>'
           f'Email: <a href="mailto:{EMAIL}">{EMAIL}</a></p>')

LEGAL_LINKS = [
    ("Privacy policy", "/privacy-policy/"),
    ("Terms and conditions", "/terms-and-conditions/"),
    ("Refund and cancellation", "/refund-and-cancellation-policy/"),
    ("Disclaimer", "/disclaimer/"),
    ("Accessibility", "/accessibility/"),
]


def legal_page(path, crumb, h1, lead, title, desc, clauses):
    """clauses: [(anchor, heading, html), ...] rendered as a numbered contents list beside the text."""
    crumbs = [(crumb, path)]
    body = page_hero(h1, f"{lead} Last updated {LEGAL_UPDATED}.", crumbs, lab="Legal", buttons=call_btn())
    toc = "".join(f'<li><a href="#{a}">{h}</a></li>' for a, h, _ in clauses)
    text = "".join(f'<section class="policy__part" id="{a}" aria-labelledby="{a}-h"><h2 id="{a}-h">'
                   f'<span class="policy__num">{i:02d}</span>{h}</h2>{html}</section>'
                   for i, (a, h, html) in enumerate(clauses, 1))
    cur = ' aria-current="page"'
    others = "".join(f'<li><a href="{p}"{cur if p == path else ""}>{n}</a></li>' for n, p in LEGAL_LINKS)
    body += f'''
<section class="section policy">
  <div class="container policy__grid">
    <aside class="policy__aside">
      <nav aria-labelledby="toc-h"><h2 class="policy__aside-h" id="toc-h">On this page</h2><ol class="policy__toc" role="list">{toc}</ol></nav>
      <nav aria-labelledby="pol-h"><h2 class="policy__aside-h" id="pol-h">Policies</h2><ul class="policy__others" role="list">{others}</ul></nav>
    </aside>
    <div class="policy__text prose-block">{text}</div>
  </div>
</section>'''
    return page(path, title, desc, body, crumbs=crumbs, keyword=crumb.lower())


def privacy():
    return legal_page(
        "/privacy-policy/", "Privacy policy", "Privacy Policy",
        f"How {B} collects, uses and protects the personal information you share with us.",
        "Privacy Policy | Midwest Apostille & Notary",
        "How Midwest Apostille & Notary Services collects, uses, shares and protects personal information from forms, calls and the documents you send us.",
        [
            ("collect", "Information we collect", f'''
<p>We collect only what we need to handle your request:</p>
<ul>
  <li><b>Details you send through our forms:</b> your name, email, phone number, the document type, the destination country and your message. The order form also collects your return shipping address and the services you select.</li>
  <li><b>Documents and identification:</b> the documents you bring or send for apostille, legalization, notarization or translation, and a copy of your photo ID when a notarization or a government office requires it.</li>
  <li><b>Calls, texts, WhatsApp messages and emails</b> you send us.</li>
  <li><b>Basic technical data:</b> like any website, our hosting provider receives standard server logs, such as your IP address, browser type and the pages requested.</li>
</ul>'''),
            ("use", "How we use it", '''
<ul>
  <li>To confirm the right route, price and timeline for your document.</li>
  <li>To process your order, submit your document to the issuing or certifying office, and return it to you.</li>
  <li>To perform notarizations and keep the notary records that state law requires.</li>
  <li>To contact you about your order, answer your questions and send status updates.</li>
  <li>To keep our website secure and working.</li>
</ul>
<p>We do not sell your personal information, and we do not use it for advertising.</p>'''),
            ("share", "Who we share it with", f'''
<p>We share information only with the people and offices that must receive it to complete your request:</p>
<ul>
  <li>Government offices that issue or certify documents, such as the Missouri and Kansas Secretaries of State and the U.S. Department of State.</li>
  <li>Embassies and consulates, for embassy legalization.</li>
  <li>Couriers such as FedEx, to deliver and return documents.</li>
  <li>Translators working on your certified translation.</li>
  <li>Our fingerprinting partner, <a href="{PARTNER_URL}" target="_blank" rel="noopener">{PARTNER}</a>, when you book fingerprinting or use their appointment pages.</li>
  <li>Payment providers, when you pay online. We do not see or store your full card number.</li>
  <li>Authorities, when the law requires it.</li>
</ul>'''),
            ("cookies", "Cookies and third-party services", f'''
<p>Our website does not use analytics or advertising cookies, and it does not store information in your browser. Some pages load content from other companies, and these companies may receive your IP address and set their own cookies under their own privacy policies:</p>
<ul>
  <li>Google Fonts, for the typefaces on the site.</li>
  <li>Google Maps, for the map in the footer and on the contact page.</li>
  <li>cdnjs (Cloudflare), for the scripts that run page animations.</li>
  <li>WhatsApp, if you choose to message us there.</li>
  <li>{PARTNER}, whose website hosts our appointment booking pages.</li>
</ul>'''),
            ("keep", "How long we keep it", '''
<p>Original documents are returned to you when your order is complete. We keep copies, order details and messages only as long as we need them to complete your order, answer questions about it and meet legal, tax and notary record-keeping requirements. Notary journals and remote online notarization recordings are kept for the period Missouri law requires.</p>'''),
            ("protect", "How we protect it", '''
<p>Originals stay in our office from the moment they arrive until they are submitted for certification, and they return by tracked shipping or pickup. Access to your information is limited to the people working on your order. No method of storage or transmission is completely secure, so we cannot guarantee absolute security, but we take reasonable steps to protect what you share with us.</p>'''),
            ("rights", "Your choices", '''
<p>You can ask us to tell you what personal information we hold about you, to correct it, or to delete it when we no longer need to keep it by law. Email or call us and we will respond within a reasonable time. You can also choose not to use our online forms and contact us by phone or in person instead.</p>'''),
            ("children", "Children", '''
<p>Our services are meant for adults. We do not knowingly collect information from children under 13 through this website. Documents about a minor, such as a birth certificate or a travel consent letter, are handled at the request of a parent or legal guardian.</p>'''),
            ("changes", "Changes to this policy", '''
<p>We may update this policy as our services change. The date at the top of this page shows when it was last updated.</p>'''),
            ("contact", "Contact us", f"<p>Questions about this policy or your information:</p>{CONTACT}"),
        ])


def terms():
    return legal_page(
        "/terms-and-conditions/", "Terms and conditions", "Terms and Conditions",
        f"The terms that apply when you use this website or order services from {B}.",
        "Terms and Conditions | Midwest Apostille & Notary",
        "The terms for using this website and ordering apostille, embassy legalization, notary, translation and document services from Midwest Apostille & Notary.",
        [
            ("agreement", "Agreement", f'''
<p>By using this website, booking an appointment or placing an order, you agree to these terms. If you do not agree, please do not use the website or our services. In these terms, "we" and "us" mean {B}, and "you" means the person or business requesting services.</p>'''),
            ("services", "Our services", '''
<p>We provide apostille processing, embassy legalization, notarization (in person, mobile and remote online), certified translation, fingerprinting through our partner, and document preparation. We are a private document services company. We are not a government agency, not a law firm and not affiliated with any government office.</p>'''),
            ("advice", "No legal or immigration advice", '''
<p>We do not give legal or immigration advice, and nothing on this website or said by our staff is legal advice. Our document preparation service prepares documents from the information you provide. A notary public cannot advise you on which document you need or what it should say. For legal questions, please speak with a licensed attorney.</p>'''),
            ("you", "Your responsibilities", '''
<ul>
  <li>Give us accurate and complete information, including the correct destination country and how the document will be used.</li>
  <li>Send documents that are genuine, complete and issued or notarized correctly. Certification offices can refuse documents that do not meet their requirements.</li>
  <li>Confirm requirements with the receiving office, embassy or authority when they are unclear. We will tell you what we know, but the receiving party has the final say.</li>
  <li>For notarizations, appear in person (or by video for remote online notarization), present valid photo identification and sign willingly.</li>
</ul>'''),
            ("notary", "Notarizations", '''
<p>A notary may refuse to notarize a document when the signer cannot be properly identified, does not appear to understand or willingly sign the document, the document is incomplete, or the notarization would break the law. A notarization confirms the identity of the signer. It does not confirm that the contents of the document are true or legally valid.</p>'''),
            ("pricing", "Prices and payment", f'''
<p>Our current prices are listed on our <a href="/pricing/">pricing page</a>. {PRICE_NOTE} Embassy legalization, translations and some other services are quoted individually, and we confirm the total before we start. Payment is due as agreed when you order. Prices can change, but the price we confirm for your order will not.</p>'''),
            ("timing", "Turnaround times", f'''
<p>Turnaround times are estimates. They depend on the government offices, embassies and couriers involved, which are outside our control. {CUTOFFS} {GUARANTEE} Apart from that guarantee, we are not responsible for delays caused by government offices, embassies, couriers, holidays or weather.</p>'''),
            ("requirements", "Destination requirements", f"<p>{POLICY}</p>"),
            ("shipping", "Shipping and delivery", '''
<p>We return documents by tracked FedEx within the United States, by international courier, or by pickup. Once a shipment is handed to the courier, delivery times are set by the courier. If a package is lost or delayed, we will help you track it and file a claim with the courier.</p>'''),
            ("refunds", "Refunds and cancellations", '<p>Refunds and cancellations are covered by our <a href="/refund-and-cancellation-policy/">refund and cancellation policy</a>.</p>'),
            ("liability", "Limitation of liability", '''
<p>To the extent the law allows, our total liability for any claim related to our services is limited to the amount you paid us for the service involved. We are not liable for indirect or consequential losses, such as missed travel, appointments, deadlines or opportunities, or for decisions made by government offices, embassies, foreign authorities or couriers.</p>'''),
            ("website", "Use of this website", '''
<p>The information on this website is general information about our services and is not legal advice. Requirements change, so we cannot promise that every page is current for your situation. Links to other websites are provided for convenience, and we are not responsible for their content. The text, design and images on this site belong to us or are used with permission, and may not be copied without our written consent.</p>'''),
            ("law", "Governing law", '''
<p>These terms are governed by the laws of the State of Missouri. Any dispute will be handled in the state or federal courts serving Jackson County, Missouri.</p>'''),
            ("changes", "Changes to these terms", '''
<p>We may update these terms from time to time. The version on this page when you place your order applies to that order.</p>'''),
            ("contact", "Contact us", CONTACT),
        ])


def refunds():
    return legal_page(
        "/refund-and-cancellation-policy/", "Refund and cancellation", "Refund and Cancellation Policy",
        "When you can cancel an order, what can be refunded, and what happens to fees already paid to government offices.",
        "Refund & Cancellation Policy | Midwest Apostille",
        "Our refund and cancellation policy for apostille, legalization, notary and translation orders, including the same-day guarantee and government fees.",
        [
            ("guarantee", "Same-day guarantee", f"<p>{GUARANTEE}</p><p>{CUTOFFS}</p>"),
            ("cancel", "Cancelling an order", '''
<p>You can cancel an order by calling or emailing us. If we have not yet started work or paid any fees for your order, we refund what you paid. If we have already started, we refund the amount for the work not yet done, less any fees already paid out for your order.</p>'''),
            ("fees", "Fees paid to others", '''
<p>Fees paid to government offices, embassies, consulates, couriers and translators cannot be recovered once paid, so they cannot be refunded. This includes the state filing fees included in our prices once your document has been submitted.</p>'''),
            ("rejected", "Rejected documents", f'''
<p>If a certifying office or embassy refuses a document because of a problem with the document itself, such as a missing signature, an uncertified copy or an expired notary commission, we will explain what needs to be fixed. Fees already paid to that office cannot be refunded. {POLICY}</p>'''),
            ("notary", "Notary and appointment fees", '''
<p>Notary fees are earned once the notarization is completed. If you need to cancel or reschedule a mobile, jail, hospital or after-hours appointment, please let us know as early as possible. Travel fees may not be refundable once the notary is on the way.</p>'''),
            ("translation", "Translations", '''
<p>Once a translator has started on your document, the translation fee is not refundable. If you find an error in our translation, tell us and we will correct it at no charge.</p>'''),
            ("how", "How refunds are paid", '''
<p>Approved refunds are paid by the same method you used to pay, where possible. Your bank or card provider may take a few business days to show the refund.</p>'''),
            ("contact", "Contact us", CONTACT),
        ])


def disclaimer():
    return legal_page(
        "/disclaimer/", "Disclaimer", "Disclaimer",
        "Important limits on the information on this website and the services we provide.",
        "Disclaimer | Midwest Apostille & Notary Services",
        "Midwest Apostille & Notary Services is not a law firm or government agency and does not give legal or immigration advice. Read the full disclaimer.",
        [
            ("not-lawyers", "Not a law firm", f'''
<p>{B} is a document services provider, not a law firm. We are not attorneys and do not give legal or immigration advice. A notary public in the United States is not an attorney and cannot give legal advice, prepare immigration petitions or represent you before any agency.</p>'''),
            ("not-government", "Not a government agency", '''
<p>We are a private company and are not affiliated with, endorsed by or acting for any government office, including the Missouri and Kansas Secretaries of State, the U.S. Department of State, the FBI or any embassy or consulate. You can apply to these offices directly. Our prices include the state filing fees shown on our pricing page. Embassy fees are quoted separately.</p>'''),
            ("information", "General information only", f'''
<p>The information on this website is general and is provided for convenience. Apostille, legalization and translation requirements are set by the destination country and can change without notice. Confirm current requirements with the relevant embassy, consulate or authority. {POLICY}</p>'''),
            ("links", "Links to other websites", '''
<p>Links to other websites, including government websites and our partners, are provided for convenience. We do not control and are not responsible for their content or privacy practices.</p>'''),
            ("contact", "Contact us", CONTACT),
        ])


def accessibility():
    return legal_page(
        "/accessibility/", "Accessibility", "Accessibility Statement",
        "We want everyone to be able to use this website and our services, including people with disabilities.",
        "Accessibility | Midwest Apostille & Notary Services",
        "Our commitment to an accessible website, what we have done so far, and how to reach us if any part of the site or our services is hard to use.",
        [
            ("goal", "Our goal", '''
<p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. We build pages with clear headings, text alternatives for images, visible focus outlines, full keyboard access, readable color contrast and support for reduced-motion settings, and we test pages with automated accessibility tools.</p>'''),
            ("limits", "Known limits", '''
<p>Some content comes from other companies, such as the embedded Google map and our partner's booking pages, and we cannot fully control how accessible it is.</p>'''),
            ("help", "Other ways to reach us", f'''
<p>You can always call <a href="{TEL}">{PHONE}</a>, email us or visit our office instead of using the website. Our mobile notaries can also meet you at your home or another location in the Kansas City area.</p>'''),
            ("feedback", "Tell us about a problem", f'''
<p>If any part of this website or our services is hard to use, please tell us which page and what happened. We will reply and work to fix it.</p>{CONTACT}'''),
        ])


def build_all():
    return [privacy(), terms(), refunds(), disclaimer(), accessibility()]

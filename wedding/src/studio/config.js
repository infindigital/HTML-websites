// =====================================================================
//  WEDDING INVITATION STUDIO · BUSINESS CONFIG
//  ---------------------------------------------------------------------
//  Everything the business owner needs to edit lives here. No component
//  hard-codes the brand name, WhatsApp number or pricing.
//
//  >>> FILL THESE IN before going live (marked  // TODO ) <<<
// =====================================================================

const studio = {
  // --- Brand -----------------------------------------------------------
  //  The slash is part of the identity: IN / FIN. Rendered as a wordmark in
  //  the navbar and footer (see <Wordmark />).
  brandName: 'IN/FIN Invite',
  brandFull: 'IN/FIN Invite',
  tagline: 'Beautiful Digital Wedding Invitations',
  // One-line positioning used in the footer / SEO description.
  positioning:
    'Beautiful digital wedding invitations, designed to be opened, shared and remembered through one link.',

  // --- WhatsApp (primary conversion) ----------------------------------
  //  International format, digits only, no "+", no spaces.
  //  Example for India: 919900851873
  //  International format, digits only, no "+". (India country code 91 prefixed.)
  whatsappNumber: '918073302248',
  // Where enquiries without a specific collection go (hero / final CTA / nav).
  whatsappGeneralMessage:
    'Hi, I would like to order an IN/FIN Invite for ₹1,499. I would like to know more about the available collections.',

  // --- Contact / social (optional, shown in footer) -------------------
  email: '', //  TODO e.g. 'hello@infininvite.com'
  instagram: '', //  TODO e.g. 'https://instagram.com/yourstudio'

  // --- Pricing --------------------------------------------------------
  //  Single flat price for every invitation.
  currency: '₹',
  price: 1499,
  priceShowsStartingFrom: false,
}

// Format a numeric amount into e.g. "₹4,999" (Indian grouping).
export function formatPrice(amount) {
  const n = Number(amount) || 0
  return studio.currency + n.toLocaleString('en-IN')
}

// Single flat price -> { label, amount, display }.
export function tier() {
  return { label: '', amount: studio.price, display: formatPrice(studio.price) }
}

export default studio

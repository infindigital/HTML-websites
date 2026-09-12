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
  brandName: 'Wedora Films',
  brandFull: 'Wedora Films',
  tagline: 'Cinematic Wedding Invitations',
  // One-line positioning used in the footer / SEO description.
  positioning:
    'Premium cinematic wedding invitations, designed around your celebration and personalised with your names.',

  // --- WhatsApp (primary conversion) ----------------------------------
  //  International format, digits only, no "+", no spaces.
  //  Example for India: 919900851873
  whatsappNumber: '910000000000', //  TODO: your WhatsApp business number
  // Where enquiries without a specific template go (hero / final CTA).
  whatsappGeneralMessage:
    "Hi! I'd like to know more about your cinematic wedding invitations.",

  // --- Contact / social (optional, shown in footer) -------------------
  email: 'hello@example.com', //  TODO
  instagram: '', //  TODO e.g. 'https://instagram.com/yourstudio'

  // --- Pricing --------------------------------------------------------
  //  Single flat price for every invitation.
  currency: '₹',
  price: 499,
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

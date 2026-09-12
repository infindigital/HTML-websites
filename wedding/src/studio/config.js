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
  brandName: 'AURELIA', //  TODO: your studio name
  brandFull: 'Aurelia Invitation Studio',
  tagline: 'Cinematic Wedding Invitations',
  // One-line positioning used in the footer / SEO description.
  positioning:
    'Premium cinematic wedding invitations — Muslim, Hindu & Christian — designed around your celebration, your culture and your story.',

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
  //  PLACEHOLDER tiers. Prices are NOT final — confirm real numbers and
  //  edit here; every card/detail page reads from these tiers.
  currency: '₹',
  priceTiers: {
    essential: { label: 'Essential', amount: 2999 },
    signature: { label: 'Signature', amount: 4999 },
    cinematic: { label: 'Cinematic', amount: 7999 },
  },
  // Show prices as "Starting from ₹X,XXX" on cards.
  priceShowsStartingFrom: true,
}

// Format a numeric amount into e.g. "₹4,999" (Indian grouping).
export function formatPrice(amount) {
  const n = Number(amount) || 0
  return studio.currency + n.toLocaleString('en-IN')
}

// Resolve a tier key -> { label, amount, display }.
export function tier(key) {
  const t = studio.priceTiers[key] || studio.priceTiers.signature
  return { ...t, display: formatPrice(t.amount) }
}

export default studio

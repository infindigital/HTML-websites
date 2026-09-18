// =====================================================================
//  WHATSAPP ORDER FLOW - the primary conversion.
//  One place builds every wa.me link so the number lives only in config.
// =====================================================================

import studio from './config.js'
import { templatePrice } from './templates.js'

function encode(number, text) {
  const digits = String(number).replace(/[^\d]/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

// Generic enquiry (hero / final CTA / footer / nav).
export function generalOrderUrl() {
  return encode(studio.whatsappNumber, studio.whatsappGeneralMessage)
}

// Collection-specific order - pre-fills a tidy, brand-voiced message that
// names the chosen collection and the ₹499 price.
export function templateOrderUrl(template) {
  if (!template) return generalOrderUrl()
  const price = templatePrice(template).display
  const message =
    `Hi, I would like to order the ${template.title} invitation from ${studio.brandName} for ${price}. ` +
    `Please share the next steps to personalise it with our names and details.`
  return encode(studio.whatsappNumber, message)
}

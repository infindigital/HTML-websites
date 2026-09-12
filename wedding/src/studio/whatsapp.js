// =====================================================================
//  WHATSAPP ORDER FLOW
//  ---------------------------------------------------------------------
//  The primary conversion. One place builds every wa.me link so the
//  number (from studio config) is never hard-coded in a component.
// =====================================================================

import studio from './config.js'
import { getTheme } from './themes.js'
import { templatePrice } from './templates.js'

function encode(number, text) {
  const digits = String(number).replace(/[^\d]/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

// Generic enquiry (hero / final CTA / footer).
export function generalOrderUrl() {
  return encode(studio.whatsappNumber, studio.whatsappGeneralMessage)
}

// Template-specific order. Pre-fills a tidy message the owner can act on.
export function templateOrderUrl(template) {
  if (!template) return generalOrderUrl()
  const category = getTheme(template.category).label
  const price = templatePrice(template).display
  const message =
    `Hi ${studio.brandName}! I'd like to order this wedding invitation:\n\n` +
    `• Template: ${template.title}\n` +
    `• Category: ${category}\n` +
    `• Price: ${price}\n\n` +
    `Please share the next steps for personalising it with our names and details.`
  return encode(studio.whatsappNumber, message)
}

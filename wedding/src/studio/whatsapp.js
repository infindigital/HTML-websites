// =====================================================================
//  WHATSAPP ORDER FLOW — the primary conversion.
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

// Template-specific order — pre-fills a tidy message.
export function templateOrderUrl(template) {
  if (!template) return generalOrderUrl()
  const price = templatePrice(template).display
  const message =
    `Hi ${studio.brandName}! I'd like to order this wedding invitation:\n\n` +
    `• Design: ${template.title} — ${template.subtitle}\n` +
    `• Price: ${price}\n\n` +
    `Please share the next steps for personalising it with our names and details.`
  return encode(studio.whatsappNumber, message)
}

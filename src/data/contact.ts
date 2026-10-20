const env = import.meta.env

export const contactDetails = {
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  instagramUrl: env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/direct/inbox/',
  email: env.VITE_CONTACT_EMAIL || 'webhustle.in@gmail.com',
}

export function whatsappUrl(message: string) {
  const recipient = contactDetails.whatsappNumber ? `/${contactDetails.whatsappNumber}` : ''
  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`
}

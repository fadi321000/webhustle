const env = import.meta.env

export const contactDetails = {
  whatsappNumber: '918848904211',
  phoneNumber: '+918848904211',
  instagramUrl: 'https://www.instagram.com/webhustle.app/',
  email: env.VITE_CONTACT_EMAIL || 'webhustle.in@gmail.com',
}

export function whatsappUrl(message: string) {
  const recipient = contactDetails.whatsappNumber ? `/${contactDetails.whatsappNumber}` : ''
  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`
}

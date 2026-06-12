/**
 * Brand configuration — single source of truth for all brand constants.
 * Never hardcode these values in components.
 */
export const BRAND = {
  name: 'Alison Estevam',
  fullName: 'Alison Estevam Studio',
  tagline: 'Barbearia · Atendimento Exclusivo',
  description: 'Atendimento exclusivo, um cliente por vez. Uma experiência que vai além do corte.',
  foundedYear: 2018,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511975369904',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alisonestevan.com.br',
  instagram: 'https://instagram.com/alisonestevan',
} as const

export const BRAND_COLORS = {
  charcoal:    '#1C1C1A',
  charcoalMid: '#2E2E2B',
  charcoalDeep:'#141412',
  sage:        '#7A9182',
  sageLight:   '#A0B4A8',
  offwhite:    '#F5F0E8',
  offwhiteWarm:'#EDE8DF',
  cream:       '#FAF7F2',
  gold:        '#C9A96E',
  goldLight:   '#DBBE85',
  olive:       '#4B4D39',
} as const

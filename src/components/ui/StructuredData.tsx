import { BRAND } from '@/config/brand'

/**
 * Schema.org structured data for SEO.
 * Server component — renders as a <script> tag in the <head>.
 */
export function StructuredData() {
  const schema = {
    '@context':    'https://schema.org',
    '@type':       'BarberShop',
    name:          `${BRAND.name} Barbearia`,
    description:   'Atendimento exclusivo, um cliente por vez. Especialista em corte com tesoura e barba completa.',
    foundingDate:  String(BRAND.foundedYear),
    priceRange:    '$$',
    url:           BRAND.siteUrl,
    telephone:     `+${BRAND.whatsapp}`,
    sameAs:        [BRAND.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Serviços',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corte de Cabelo' }, price: '60', priceCurrency: 'BRL' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Barba Completa' },  price: '60', priceCurrency: 'BRL' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cabelo e Barba' },  price: '100', priceCurrency: 'BRL' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corte Feminino' },  price: '100', priceCurrency: 'BRL' },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

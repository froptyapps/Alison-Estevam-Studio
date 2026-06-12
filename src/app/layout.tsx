import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost, Lora } from 'next/font/google'
import { BRAND } from '@/config/brand'
import { StructuredData } from '@/components/ui/StructuredData'
import { Nav }             from '@/components/layout/Nav'
import { Footer }          from '@/components/layout/Footer'
import { Cursor }          from '@/components/ui/Cursor'
import { BookingProvider } from '@/components/booking/BookingProvider'
import { NavScheduleBtn }  from '@/components/layout/NavScheduleBtn'
import '@/app/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-lora',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default:  `${BRAND.name} — Barbearia`,
    template: `%s · ${BRAND.name}`,
  },
  description: 'Barbearia Alison Estevam — Atendimento exclusivo, um cliente por vez. Especialista em corte com tesoura, barba completa e Pixie Cut. Agende o seu momento.',
  keywords: ['barbearia', 'barbeiro', 'corte de cabelo', 'barba', 'Pixie Cut', 'Alison Estevam'],
  authors:  [{ name: BRAND.name }],
  creator:  BRAND.name,
  openGraph: {
    type:        'website',
    locale:      'pt_BR',
    url:         BRAND.siteUrl,
    siteName:    BRAND.fullName,
    title:       `${BRAND.name} — Barbearia`,
    description: 'Atendimento exclusivo, um cliente por vez. Uma experiência que vai além do corte.',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width:       'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor:  '#1C1C1A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${jost.variable} ${lora.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body>
        <BookingProvider>
          <Cursor />
          <Nav />
          <NavScheduleBtn />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  )
}

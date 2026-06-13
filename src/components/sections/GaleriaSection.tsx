'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const CORTES = [
  { src: '/images/corte1.png', alt: 'Corte de precisão com detalhe lateral', label: 'Precisão' },
  { src: '/images/corte2.png', alt: 'Cabelo volumoso com fade e barba', label: 'Volume & Barba' },
  { src: '/images/corte3.png', alt: 'Cabelo longo com barba — perfil', label: 'Cabelo Longo' },
  { src: '/images/corte4.png', alt: 'High fade com barba — perfil', label: 'High Fade' },
  { src: '/images/corte5.png', alt: 'Corte texturizado bowl cut', label: 'Texturizado' },
]

export function GaleriaSection() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="bg-charcoal section-wrap"
    >
      {/* Top: Alison + text */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-9 md:gap-[72px] items-end mb-[72px]">

        {/* Portrait */}
        <div className="relative">
          <div className="section-tag" aria-hidden="true">O Profissional</div>
          <div
            className="gallery-img relative aspect-[3/4] overflow-hidden"
            style={{ maxHeight: 520 }}
          >
            <Image
              src="/images/alison1.png"
              alt="Alison Estevam — barbeiro e fundador"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
            {/* subtle vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.55) 0%, transparent 45%)' }}
              aria-hidden="true"
            />
          </div>
          {/* Caption */}
          <div className="mt-5 flex items-center gap-3">
            <span className="block w-5 h-px bg-gold/45" aria-hidden="true" />
            <p className="font-body font-light text-xs tracking-[0.35em] uppercase text-offwhite/32">
              Alison Estevam · Fundador
            </p>
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col justify-end">
          <h2
            id="galeria-titulo"
            className="reveal font-display font-light text-5xl text-offwhite leading-[1.05] mb-6 text-balance"
          >
            Arte executada com precisão
          </h2>
          <p className="reveal reveal-d1 font-body font-light text-base leading-[2.1] text-offwhite/45 max-w-[390px] mb-8">
            Cada corte é resultado de anos de prática e uma escuta atenta ao que cada cliente precisa. Não existe fórmula — existe atenção aos detalhes.
          </p>

          {/* Segunda foto do Alison — com cliente */}
          <div className="gallery-img relative aspect-[16/9] overflow-hidden reveal reveal-d2">
            <Image
              src="/images/alison3.png"
              alt="Alison Estevam com cliente"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-offwhite/6 mb-[72px]" aria-hidden="true" />

      {/* Work gallery */}
      <div>
        <div className="flex items-center justify-between mb-[42px]">
          <div className="section-tag !mb-0" aria-hidden="true">Trabalhos</div>
          <p className="font-body font-light text-xs tracking-[0.3em] uppercase text-offwhite/20">
            {active + 1} / {CORTES.length}
          </p>
        </div>

        {/* Featured + thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-3">
          {/* Featured image */}
          <div className="gallery-img relative aspect-[3/4] md:aspect-[2/3] overflow-hidden">
            <Image
              src={CORTES[active].src}
              alt={CORTES[active].alt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-top transition-all duration-600"
              priority={active === 0}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(28,28,26,0.7) 0%, transparent 60%)' }}
              aria-hidden="true"
            />
            <p className="absolute bottom-5 left-6 font-body font-light text-xs tracking-[0.4em] uppercase text-offwhite/60">
              {CORTES[active].label}
            </p>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 gap-3">
            {CORTES.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={c.alt}
                className={cn(
                  'gallery-img relative overflow-hidden',
                  'border transition-all duration-300',
                  i === active
                    ? 'border-gold/50'
                    : 'border-transparent hover:border-offwhite/18'
                )}
                style={{ aspectRatio: '1 / 1' }}
              >
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-top"
                />
                {i !== active && (
                  <div
                    className="absolute inset-0 bg-charcoal/40 transition-opacity duration-300 hover:opacity-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
            {/* Alison portrait 2 — fills last cell */}
            <div className="gallery-img relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
              <Image
                src="/images/alison2.png"
                alt="Alison Estevam"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Complemento {
  label: string
}

interface Servico {
  num:          string
  nome:         string
  preco?:       string
  precoLabel?:  string
  desc:         string
  complementos?: Complemento[]
  isVip?:       boolean
  isComingSoon?: boolean
  delay?:       string
  vipData?: {
    title:  string
    desc:   string
    quote:  string
    btnUrl: string
  }
}

const SERVICOS: Servico[] = [
  {
    num: '01', nome: 'Corte de Cabelo', preco: 'R$60',
    desc: 'Corte personalizado no seu estilo. Cada detalhe executado com precisão, do início à finalização.',
    complementos: [{ label: 'Sobrancelha' }, { label: 'Contorno de Barba' }],
    delay: '',
  },
  {
    num: '02', nome: 'Barba Completa', preco: 'R$60',
    desc: 'Modelagem completa com vaporizador de ozônio e produtos selecionados. Um ritual que cuida da pele e valoriza o visual.',
    complementos: [{ label: 'Acabamento do Cabelo' }, { label: 'Sobrancelha' }],
    delay: 'reveal-d1',
  },
  {
    num: '03', nome: 'Cabelo e Barba', preco: 'R$100',
    desc: 'A experiência completa em um único atendimento. Corte e barba com toda a atenção que você merece.',
    complementos: [{ label: 'Sobrancelha' }],
    delay: 'reveal-d2',
  },
  {
    num: '04', nome: 'Corte Feminino', preco: 'R$100',
    desc: 'Especialidade em Pixie Cut — um corte que exige técnica, sensibilidade e olhar para o que valoriza cada rosto.',
    delay: 'reveal-d3',
  },
  {
    num: '05', nome: 'Tratamento Capilar',
    precoLabel: 'Em breve', isComingSoon: true,
    desc: 'Em breve. Um lavatório dedicado para cuidar do seu cabelo com a atenção que ele merece.',
    delay: 'reveal-d4',
  },
  {
    num: '06', nome: 'Horário VIP',
    precoLabel: 'Exclusivo', isVip: true,
    desc: '',
    vipData: {
      title: 'VIP',
      desc:  'Atendimento fora do expediente — para quem valoriza privacidade, exclusividade e flexibilidade de horário. Agendado diretamente comigo.',
      quote: '"O tempo que você dedica a si mesmo diz muito sobre quem você é."',
      btnUrl: `https://wa.me/5511975369904?text=${encodeURIComponent('Olá Alison, gostaria de agendar um Horário VIP.')}`,
    },
    delay: '',
  },
]

interface ServicosItemProps {
  servico:    Servico
  isOpen:     boolean
  onToggle:   () => void
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      className={cn('transition-transform duration-350 ease-brand-circ', open && 'rotate-45')}
      aria-hidden="true"
    >
      <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.2" />
      <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function ServicoItem({ servico, isOpen, onToggle }: ServicosItemProps) {
  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onToggle(); e.preventDefault() } }}
      className={cn(
        'reveal', servico.delay ?? '',
        'border-t border-olive/9 last:border-b last:border-olive/9',
        'overflow-hidden transition-colors duration-300',
        servico.isVip && 'bg-cream',
      )}
    >
      {/* Header row */}
      <div
        className={cn(
          'flex justify-between items-center py-[30px]',
          'transition-[padding] duration-350 ease-brand-out',
          'hover:pl-[10px]',
        )}
      >
        <div className="flex items-baseline gap-[26px]">
          <span className="font-body font-light text-2xs tracking-[0.3em] text-olive/32 min-w-[24px] shrink-0" aria-hidden="true">
            {servico.num}
          </span>
          <span
            className={cn(
              'font-display font-light text-4xl tracking-[0.03em] text-olive',
              'transition-colors duration-300',
              'group-hover:text-charcoal',
              'text-[clamp(22px,2.5vw,33px)]',
            )}
          >
            {servico.nome}
          </span>
        </div>

        <div className="flex items-center gap-[42px] shrink-0">
          {/* Price */}
          {servico.preco && (
            <span
              className="hidden sm:block font-display font-normal text-2xl text-gold tracking-[0.02em]"
              aria-label={servico.preco}
            >
              {servico.preco}
            </span>
          )}
          {servico.precoLabel && (
            <span
              className={cn(
                'hidden sm:block font-body font-light',
                servico.isComingSoon ? 'text-xs opacity-38 tracking-[0.15em]' : 'text-sm tracking-[0.1em]',
                'text-olive'
              )}
            >
              {servico.precoLabel}
            </span>
          )}

          {/* Toggle button */}
          <div
            className={cn(
              'w-[26px] h-[26px] rounded-full border border-olive/16 shrink-0',
              'flex items-center justify-center text-olive',
              'transition-all duration-300',
              isOpen && 'bg-sage border-sage text-white'
            )}
            aria-hidden="true"
          >
            <PlusIcon open={isOpen} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="overflow-hidden transition-[max-height] duration-450 ease-brand-circ"
        style={{ maxHeight: isOpen ? (servico.isVip ? '660px' : '320px') : '0' }}
      >
        {servico.isVip && servico.vipData ? (
          <VipContent vipData={servico.vipData} isOpen={isOpen} />
        ) : (
          <div className="pb-[42px] flex flex-col md:flex-row gap-[18px] md:gap-[68px] md:pl-[52px]">
            <p className="font-body font-light text-base leading-[1.95] text-olive/65 max-w-[380px]">
              {servico.desc}
            </p>
            {servico.complementos && servico.complementos.length > 0 && (
              <div>
                <h4 className="font-body font-light text-xs tracking-[0.38em] uppercase text-sage mb-[14px]">
                  Complementos disponíveis
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {servico.complementos.map(c => (
                    <span
                      key={c.label}
                      className={cn(
                        'inline-block font-body font-light text-sm tracking-[0.12em]',
                        'text-olive/65 border border-olive/16 rounded-full px-[13px] py-[6px]',
                        'transition-all duration-300',
                        'hover:border-gold hover:text-gold hover:bg-gold/5'
                      )}
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function VipContent({ vipData, isOpen }: { vipData: NonNullable<Servico['vipData']>; isOpen: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden mb-0',
        'bg-gradient-to-br from-charcoal-deep to-charcoal-mid',
        'border-t border-b border-gold/11'
      )}
    >
      {/* Ghost text */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[-2%] font-display font-light leading-none pointer-events-none select-none"
        style={{
          fontSize: 'clamp(120px, 16vw, 200px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,169,110,0.055)',
          letterSpacing: '0.05em',
        }}
        aria-hidden="true"
      >
        VIP
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 75% at 22% 50%, rgba(201,169,110,0.06) 0%, transparent 62%)' }}
        aria-hidden="true"
      />

      {/* Body */}
      <div
        className={cn(
          'relative z-10 px-[30px] py-[42px] md:px-[64px] md:py-[56px]',
          'transition-all duration-450 ease-brand-out',
          isOpen ? 'opacity-100 translate-y-0 [transition-delay:180ms]' : 'opacity-0 translate-y-5'
        )}
      >
        <div className="flex items-center gap-[13px] mb-[9px]">
          <span className="block w-[22px] h-px bg-gold opacity-48 shrink-0" aria-hidden="true" />
          <span className="font-body font-light text-2xs tracking-[0.55em] uppercase text-offwhite/42">
            Horário
          </span>
        </div>

        <div
          className="font-display font-medium text-gold leading-none mb-[30px] tracking-[0.14em]"
          style={{ fontSize: 'clamp(56px, 6.5vw, 84px)' }}
        >
          VIP
        </div>

        <div className="w-[38px] h-px bg-gold/32 mb-[30px]" aria-hidden="true" />

        <p className="font-body font-light text-base leading-[2] text-offwhite/66 tracking-[0.04em] max-w-[440px] mb-[18px]">
          {vipData.desc}
        </p>

        <p className="font-display font-light italic text-lg leading-[1.68] text-offwhite/40 tracking-[0.02em] max-w-[400px] mb-[42px]">
          {vipData.quote}
        </p>

        <a
          href={vipData.btnUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={cn(
            'group inline-flex items-center gap-[14px]',
            'font-body font-light text-xs tracking-[0.38em] uppercase',
            'text-charcoal-deep bg-gold px-7 py-[13px]',
            'relative overflow-hidden',
            'transition-all duration-300 ease-brand-out',
            'hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(201,169,110,0.26)]'
          )}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" aria-hidden="true" />
          Solicitar via WhatsApp
          <span
            className="text-sm transition-transform duration-300 ease-brand-out group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      </div>
    </div>
  )
}

export function ServicosSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (i: number) => {
    setOpenIndex(prev => prev === i ? null : i)
  }

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="servicos section-wrap bg-cream"
    >
      <div className="section-tag" aria-hidden="true">Serviços</div>

      <h2
        id="servicos-titulo"
        className="reveal font-display font-light text-5xl text-olive leading-[1.1] mb-[54px] text-balance"
      >
        O que ofereço
      </h2>

      <div role="list">
        {SERVICOS.map((s, i) => (
          <ServicoItem
            key={s.num}
            servico={s}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </section>
  )
}

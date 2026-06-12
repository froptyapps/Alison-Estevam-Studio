'use client'

import Link from 'next/link'
import { BRAND } from '@/config/brand'
import { buildVipRequestUrl } from '@/lib/whatsapp/messages'

const NAV_LINKS = [
  { href: '#sobre',       label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#servicos',    label: 'Serviços' },
  { href: '#vip',         label: 'Horário VIP' },
]

export function Footer() {
  const vipUrl = buildVipRequestUrl({ clientName: '' })
  const year   = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="bg-charcoal border-t border-offwhite/5 px-6 pt-[72px] pb-[52px] md:px-[60px]
                 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-9 items-start"
    >
      {/* Brand */}
      <div>
        <div className="font-display font-light text-3xl tracking-display uppercase text-offwhite leading-[1.4]">
          Alison<br />Estevam
        </div>
        <div className="w-5 h-px bg-gold/40 my-[17px]" aria-hidden="true" />
        <p className="font-body font-light text-2xs tracking-nav uppercase text-offwhite/20 leading-[1.85]">
          Barbearia · Atendimento Exclusivo<br />
          Fundada em {BRAND.foundedYear}
        </p>
      </div>

      {/* Navigation */}
      <nav aria-label="Navegação do rodapé">
        <p className="font-body font-light text-xs tracking-[0.4em] uppercase text-offwhite/18 mb-5">
          Navegação
        </p>
        <ul className="flex flex-col gap-3 list-none">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className="group font-body font-light text-sm tracking-[0.24em] uppercase
                           text-offwhite/28 hover:text-offwhite/60 transition-colors duration-300
                           inline-flex items-center gap-2"
              >
                <span className="block w-0 h-px bg-gold transition-[width] duration-300 ease-brand-out group-hover:w-[11px] shrink-0" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Scheduling */}
      <nav aria-label="Agendamento">
        <p className="font-body font-light text-xs tracking-[0.4em] uppercase text-offwhite/18 mb-5">
          Agendamento
        </p>
        <ul className="flex flex-col gap-3 list-none">
          <li>
            <button
              onClick={() => window.dispatchEvent(new Event('open-booking'))}
              className="group font-body font-light text-sm tracking-[0.24em] uppercase
                         text-offwhite/28 hover:text-offwhite/60 transition-colors duration-300
                         inline-flex items-center gap-2 bg-transparent border-none p-0"
              aria-label="Abrir agendamento"
            >
              <span className="block w-0 h-px bg-gold transition-[width] duration-300 ease-brand-out group-hover:w-[11px] shrink-0" aria-hidden="true" />
              Agendar horário
            </button>
          </li>
          <li>
            <a
              href={vipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-body font-light text-sm tracking-[0.24em] uppercase
                         text-offwhite/28 hover:text-offwhite/60 transition-colors duration-300
                         inline-flex items-center gap-2"
            >
              <span className="block w-0 h-px bg-gold transition-[width] duration-300 ease-brand-out group-hover:w-[11px] shrink-0" aria-hidden="true" />
              Solicitar VIP
            </a>
          </li>
        </ul>
      </nav>

      {/* Bottom bar */}
      <div className="col-span-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-7 border-t border-offwhite/4">
        <p className="font-body font-light text-xs tracking-[0.2em] text-offwhite/14">
          ©️ {year} {BRAND.name}. Todos os direitos reservados.
        </p>
        <p className="font-body font-light text-xs tracking-[0.2em] text-offwhite/14">
          Crafted with intention.
        </p>
      </div>
    </footer>
  )
}

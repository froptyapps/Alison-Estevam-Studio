# Alison Estevam Studio

Plataforma digital premium para a Barbearia Alison Estevam.

## Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Deploy:** Vercel (região `gru1` — São Paulo)

## Início rápido

```bash
# 1. Clone e instale dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves do Supabase

# 3. Execute as migrations no Supabase Dashboard
# ou via Supabase CLI: supabase db push

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

## Estrutura de pastas

```
src/
├── app/
│   ├── (public)/          # Site institucional + agendamento
│   ├── (client)/          # Portal do cliente (Fase 5)
│   ├── admin/             # Painel administrativo (Fase 4)
│   └── api/               # Route Handlers
├── components/
│   ├── ui/                # Componentes base (Button, Input, etc.)
│   ├── layout/            # Nav, Footer
│   ├── sections/          # Seções do site (Hero, Sobre, etc.)
│   ├── booking/           # Fluxo de agendamento
│   └── admin/             # Componentes do painel admin
├── lib/
│   ├── supabase/          # Clientes (browser + server)
│   ├── whatsapp/          # Templates de mensagem
│   └── validations/       # Schemas Zod
├── config/
│   ├── brand.ts           # Constantes da marca
│   └── booking.ts         # Regras de negócio do agendamento
├── hooks/                 # React hooks customizados
└── types/                 # TypeScript types
```

## Fases de desenvolvimento

- [x] **Fase 1** — Fundação (infraestrutura, design tokens, tipos)
- [ ] **Fase 2** — Área Pública (site institucional em Next.js)
- [ ] **Fase 3** — Sistema de Agendamento (persistência real)
- [ ] **Fase 4** — Painel Administrativo
- [ ] **Fase 5** — Portal do Cliente
- [ ] **Fase 6** — Financeiro e Relatórios
- [ ] **Fase 7** — Otimizações Premium

## WhatsApp

Número configurado: `+55 11 97536-9904`
Variável de ambiente: `NEXT_PUBLIC_WHATSAPP_NUMBER`

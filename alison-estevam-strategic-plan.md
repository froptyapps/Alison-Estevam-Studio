# Alison Estevam Studio
## Plano Estratégico — Plataforma Digital Premium
### Versão 1.0 · Junho 2026

---

# 1. DIAGNÓSTICO DA MARCA

## Como a marca é percebida atualmente

A identidade visual já existe e está bem definida. O HTML atual entrega um site institucional sofisticado que comunica corretamente os valores centrais: exclusividade, atenção ao detalhe e experiência premium. A paleta carvão + sálvia + areia dourada é coerente, a tipografia Cormorant Garamond / Jost funciona muito bem para o posicionamento, e o modal de agendamento inline é uma decisão inteligente que mantém o usuário no contexto.

A percepção atual é a de um profissional acima da média — mas o sistema digital ainda não está na altura da promessa da marca. Um cliente que vive o atendimento presencial de Alison Estevam encontra uma experiência muito superior ao que qualquer sistema digital oferece hoje.

## Pontos Fortes

- **Identidade visual consolidada** — paleta, tipografia e tom de voz já existem e são consistentes
- **Posicionamento claro** — "um cliente por vez" é um diferencial genuíno, não marketing vazio
- **Tom de voz sofisticado** — a copy atual é elevada, sem cair em clichês de barbearia
- **HTML semântico e acessível** — base técnica sólida, com ARIA, `role`, `focus-visible` e reduced-motion
- **Cursor customizado** — microdetalhe que já sinaliza que isso é diferente
- **Modal de agendamento integrado** — fluxo sem redirecionamento é correto para a experiência
- **VIP como serviço separado** — decisão de negócio que protege a exclusividade da marca

## Pontos Fracos

- **Agendamento sem backend** — o sistema atual é completamente frontend; não há persistência, não há validação de conflitos reais, não há histórico
- **Horários hard-coded** — `SLOTS_OCUPADOS` e `DIAS_OCUPADOS` no JavaScript são manutenção manual e quebram facilmente
- **Sem área do cliente** — o cliente não tem como ver seus próprios agendamentos, histórico ou cancelar
- **Sem área administrativa** — Alison gerencia tudo manualmente via WhatsApp, o que não escala
- **Sem confirmação real** — o "agendamento" atual gera apenas uma mensagem de WhatsApp pré-formatada; a confirmação depende inteiramente da resposta manual
- **Sem notificações** — sem lembretes automáticos, o índice de no-show deve ser alto
- **SEO limitado** — o site é uma SPA em HTML puro; não há Open Graph completo, sitemap, ou structured data além do básico
- **Nenhuma captura de base de clientes** — não existe CRM, nem histórico, nem fidelização digital

## Oportunidades de Evolução

1. **Agenda própria** — eliminar a dependência do WhatsApp para confirmação; agenda real com estado persistido
2. **Portal do cliente** — histórico de visitas, próximos agendamentos, preferências salvas
3. **Lembretes automáticos** — WhatsApp + e-mail 24h antes reduzem no-show em até 60%
4. **Plataforma de fidelidade** — contagem de visitas, benefícios automáticos após N visitas
5. **Dashboard financeiro** — visibilidade de receita, serviços mais populares, meses sazonais
6. **Lista de espera VIP** — gestão de clientes VIP com horários fora do expediente
7. **Galeria de trabalhos** — portfólio integrado que serve como prova social qualificada

---

# 2. DESIGN SYSTEM

## Filosofia

O design system não serve à plataforma. Ele serve à marca. Cada decisão deve reforçar que Alison Estevam não é uma barbearia — é um estúdio de experiência pessoal. Componentes genéricos, sombras excessivas, gradientes decorativos e bordas arredondadas são proibidos não por estética, mas porque contradizem o posicionamento.

## Paleta de Cores

### Cores Base (já definidas, ratificadas)

| Token | Hex | Uso |
|---|---|---|
| `--charcoal` | `#1C1C1A` | Background escuro principal |
| `--charcoal-mid` | `#2E2E2B` | Superfícies elevadas no escuro |
| `--charcoal-deep` | `#141412` | Profundidade, overlays |
| `--sage` | `#7A9182` | Acento primário, CTAs secundários |
| `--sage-light` | `#A0B4A8` | Hover states, texto secundário |
| `--offwhite` | `#F5F0E8` | Texto em fundos escuros, superfícies claras |
| `--offwhite-warm` | `#EDE8DF` | Background de seções claras |
| `--cream` | `#FAF7F2` | Background mais claro |
| `--gold` | `#C9A96E` | CTA primário, acentos premium |
| `--gold-light` | `#DBBE85` | Hover do gold |

### Cores Funcionais (novos tokens necessários)

| Token | Hex | Uso |
|---|---|---|
| `--success` | `#4A7C59` | Confirmações, agendamentos confirmados |
| `--warning` | `#C9953A` | Alertas, reagendamentos |
| `--error` | `#8B3A3A` | Erros, cancelamentos |
| `--surface-dark` | `rgba(28,28,26,0.96)` | Modais, overlays |
| `--border-subtle` | `rgba(245,240,232,0.07)` | Bordas em contexto escuro |
| `--border-warm` | `rgba(75,77,57,0.10)` | Bordas em contexto claro |

## Tipografia

### Hierarquia Completa

```
Display / Hero
  Família: Cormorant Garamond
  Peso: 300 (light) ou 500 (medium)
  Tamanho: clamp(48px, 7vw, 96px)
  Tracking: 0.12–0.16em
  Uso: títulos de seção hero, nome da marca

H1 / Page Title
  Família: Cormorant Garamond
  Peso: 300
  Tamanho: clamp(36px, 4.2vw, 58px)
  Linha: 1.14

H2 / Section Title
  Família: Cormorant Garamond
  Peso: 300
  Tamanho: clamp(28px, 3vw, 40px)

H3 / Card Title
  Família: Cormorant Garamond
  Peso: 400
  Tamanho: 20–24px

Label / Eyebrow
  Família: Jost
  Peso: 200
  Tamanho: 8.5–10px
  Tracking: 0.38–0.55em
  Transform: uppercase
  Uso: tags de seção, labels de formulário, metadados

Body
  Família: Jost
  Peso: 300
  Tamanho: 13–14px
  Linha: 1.85–1.95

Caption / Micro
  Família: Jost
  Peso: 200
  Tamanho: 9–11px
  Tracking: 0.2–0.3em

Data / Numbers
  Família: Lora
  Peso: 400
  Uso: métricas, preços, estatísticas — nunca para texto corrido
```

### Regras de Consistência Tipográfica

1. Cormorant Garamond é reservada para títulos, nomes, citações e elementos de identidade — nunca para labels, navegação ou interface funcional
2. Jost com peso 200 é o padrão para todo texto de suporte; 300 para texto corrido; 400 raramente
3. Letter-spacing em caps nunca abaixo de 0.35em; nunca acima de 0.6em
4. Itálico em Cormorant Garamond é uma ferramenta de ênfase premium — usar com parcimônia

## Espaçamentos

Sistema baseado em múltiplos de 4px com escala de 8 principais:

```
--space-1:  4px    micro (gap entre ícone e label)
--space-2:  8px    xsmall (padding interno de tags)
--space-3:  12px   small (gap entre itens de lista)
--space-4:  16px   base (padding de inputs)
--space-5:  24px   medium (gap entre campos de formulário)
--space-6:  32px   large (padding de cards)
--space-7:  48px   xlarge (padding de seções mobile)
--space-8:  64px   2xl (padding de seções desktop)
--space-9:  96px   3xl (gap entre blocos de conteúdo)
--space-10: 120px  4xl (padding de seções hero desktop)
```

## Componentes

### Botões

**Primário (Gold)**
- Background: `--gold`; Color: `--charcoal-deep`
- Font: Jost 300, 9px, tracking 0.38em, uppercase
- Padding: 14px 32px
- Sem border-radius
- Hover: `--gold-light`, translateY(-2px), shadow suave dourada
- Active: translateY(0)

**Secundário (Outline)**
- Background: transparent; Border: 1px solid rgba(245,240,232,0.2)
- Color: `--offwhite` em 60% opacidade
- Hover: border-color aumenta para 60%, color para 100%

**Ghost / Text**
- Apenas texto; sublinhado como underline-offset: 4px
- Hover: color para 100% opacidade

**Destrutivo**
- Background: rgba(139,58,58,0.08); Border: 1px solid rgba(139,58,58,0.25)
- Color: `#C97070`
- Hover: background aumenta sutilmente

### Inputs e Formulários

- Border-radius: 0 (consistente com a linguagem da marca)
- Background: `rgba(245,240,232,0.03)`
- Border: `1px solid rgba(245,240,232,0.09)`
- Focus: border-color transiciona para `--sage`; background levemente tintada
- Error: border `rgba(192,57,43,0.55)`, background `rgba(192,57,43,0.04)`
- Font: Cormorant Garamond 16px para o valor; Jost 200 8.5px para label
- Label sempre acima, nunca placeholder como substituto

### Cards

**Card Padrão (contexto escuro)**
- Background: `rgba(245,240,232,0.03)`
- Border: `1px solid rgba(245,240,232,0.07)`
- Padding: 32px
- Hover: background levemente mais opaco; sem elevação/sombra
- Sem border-radius

**Card de Agendamento**
- Estado: pendente, confirmado, cancelado, concluído
- Borda esquerda colorida (3px) como indicador de estado
- Não usa background colorido cheio — apenas a borda

### Badges / Tags

- Background: `rgba(122,145,130,0.09)`
- Border: `1px solid rgba(122,145,130,0.22)`
- Color: `--sage-light`
- Font: Jost 300, 9.5px, tracking 0.2em
- Padding: 4px 10px
- Border-radius: 20px (exceção deliberada — tags são elementos orgânicos)

### Divisores

- Sempre `1px solid` com opacidade baixa (0.06–0.10 em contexto escuro, 0.09–0.12 em contexto claro)
- Nunca decorativos sem função estrutural
- O padrão "linha + ponto + linha" do hero é um elemento de marca, não um componente reutilizável

### Estados Visuais

```
Default    → cor base, opacidade referência
Hover      → transição 0.2–0.3s ease-out; translateY(-1 a -2px) para CTAs
Focus      → outline: 2px solid --gold, offset: 3px (acessibilidade)
Active     → translateY(0), levemente mais escuro
Disabled   → opacity: 0.38–0.45, cursor not-allowed
Loading    → animação de pontos (já implementada) ou spinner em --sage
Error      → borda vermelha suave, sem ícones agressivos
Success    → borda em --success, texto em --sage-light
```

### Animações

- Duração padrão de transição: 0.2–0.3s para micro, 0.4–0.6s para macro
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` para entradas (ease-out agressivo)
- Reveal on scroll: `translateY(34px) → translateY(0)` + opacity 0→1, delay escalonado
- **Regra de ouro:** uma animação por contexto de atenção; nunca animar elementos simultâneos de forma chaótica
- Respeitar `prefers-reduced-motion` — já implementado no HTML atual

---

# 3. ARQUITETURA DA PLATAFORMA

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    alison.estevam.com.br                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ÁREA PÚBLICA          ÁREA DO CLIENTE       ÁREA ADMIN      │
│  /                     /minha-conta          /admin          │
│  /agendar              /agendamentos         /agenda         │
│  /servicos             /historico            /clientes       │
│  /vip                  /perfil               /servicos       │
│                                              /financeiro     │
│                                              /relatorios     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Módulos

### Módulo 1 — Área Pública (Landing)
- Hero com CTA de agendamento
- Sobre
- Experiência
- Serviços com preços
- VIP
- Footer

### Módulo 2 — Sistema de Agendamento
- Calendário com disponibilidade em tempo real
- Seleção de serviço
- Formulário de dados (nome + WhatsApp)
- Confirmação com código de referência
- Notificação automática para Alison (WhatsApp/email)
- Lembrete automático 24h antes (WhatsApp API)

### Módulo 3 — Área do Cliente
- Login por WhatsApp (OTP via mensagem) — sem senha, sem fricção
- Próximos agendamentos
- Histórico de visitas
- Reagendamento (até X horas antes)
- Cancelamento (política configurável)
- Preferências salvas (serviço favorito)

### Módulo 4 — Painel Administrativo
- Dashboard com visão geral do dia/semana
- Agenda visual (timeline ou lista)
- Gerenciar disponibilidade (bloquear datas, horários)
- Gerenciar clientes (ficha, histórico, notas)
- Gerenciar serviços e preços
- VIP: aprovar solicitações e definir horários

### Módulo 5 — Financeiro
- Receita por período
- Receita por serviço
- Agendamentos concluídos vs cancelados
- Exportação (PDF/CSV)

## Fluxos de Usuário

### Fluxo Principal — Novo Agendamento
```
Landing → Clica "Agendar" → Modal/Página de agendamento
  → Seleciona serviço → Seleciona data → Seleciona horário
  → Preenche nome + WhatsApp → Confirma
  → Recebe código de referência na tela
  → Recebe mensagem WhatsApp de confirmação
  → [24h antes] Recebe lembrete automático
```

### Fluxo — Cliente Recorrente
```
Recebe lembrete WhatsApp ou acessa portal
  → Login por OTP no WhatsApp
  → Vê próximo agendamento
  → Reagenda se necessário
  → Vê histórico de visitas
```

### Fluxo — Solicitação VIP
```
Landing (seção VIP) → Clica "Solicitar VIP"
  → Formulário: nome, WhatsApp, preferência de horário
  → Mensagem enviada para Alison
  → Alison aceita/define horário no admin
  → Cliente recebe confirmação via WhatsApp
```

## Fluxos Administrativos

### Fluxo — Início do Dia
```
Admin → Dashboard → Ver agenda do dia
  → Confirmar presença dos clientes (check-in)
  → Marcar como concluído após atendimento
  → Adicionar notas ao cliente se necessário
```

### Fluxo — Gestão de Disponibilidade
```
Admin → Agenda → Configurações
  → Definir horários de funcionamento padrão
  → Bloquear datas específicas (férias, feriados)
  → Definir horários VIP (fora do expediente)
  → Salvar → Disponibilidade atualizada em tempo real para clientes
```

---

# 4. BANCO DE DADOS

## Modelagem PostgreSQL (Supabase)

### Entidades Principais

```sql
-- Clientes
clients {
  id          uuid PK
  name        text NOT NULL
  whatsapp    text UNIQUE NOT NULL   -- formato E.164: +5519...
  email       text
  notes       text                  -- notas internas do barbeiro
  vip         boolean DEFAULT false
  created_at  timestamptz
  updated_at  timestamptz
}

-- Serviços
services {
  id          uuid PK
  name        text NOT NULL          -- "Corte de Cabelo"
  slug        text UNIQUE            -- "corte-cabelo"
  description text
  duration    int NOT NULL           -- em minutos
  price       numeric(8,2) NOT NULL
  active      boolean DEFAULT true
  position    int                    -- ordem de exibição
  created_at  timestamptz
}

-- Disponibilidade base (regras semanais)
availability_rules {
  id          uuid PK
  weekday     int NOT NULL           -- 0=Dom, 6=Sáb
  start_time  time NOT NULL          -- "09:00"
  end_time    time NOT NULL          -- "17:00"
  active      boolean DEFAULT true
}

-- Slots gerados automaticamente
time_slots {
  id          uuid PK
  date        date NOT NULL
  start_time  time NOT NULL
  end_time    time NOT NULL
  is_vip      boolean DEFAULT false
  status      text DEFAULT 'available'
              -- available | blocked | booked
}

-- Agendamentos
appointments {
  id               uuid PK
  reference_code   text UNIQUE        -- "AE-2026-0001" exibido ao cliente
  client_id        uuid FK → clients
  service_id       uuid FK → services
  slot_id          uuid FK → time_slots
  status           text DEFAULT 'pending'
                   -- pending | confirmed | completed | cancelled | no_show
  notes            text               -- notas do agendamento
  reminder_sent    boolean DEFAULT false
  cancelled_at     timestamptz
  cancellation_reason text
  created_at       timestamptz
  updated_at       timestamptz
}

-- Pagamentos (fase futura)
payments {
  id             uuid PK
  appointment_id uuid FK → appointments
  amount         numeric(8,2)
  method         text                 -- dinheiro | pix | cartao
  paid_at        timestamptz
  notes          text
}

-- Bloqueios manuais de agenda
blocked_periods {
  id          uuid PK
  date_start  date NOT NULL
  date_end    date NOT NULL
  reason      text                   -- "Férias", "Feriado"
  created_at  timestamptz
}
```

### Relacionamentos

```
clients         1 ──< N    appointments
services        1 ──< N    appointments
time_slots      1 ──< 1    appointments
appointments    1 ──< 1    payments
```

### Índices Críticos

```sql
CREATE INDEX idx_appointments_client    ON appointments(client_id);
CREATE INDEX idx_appointments_date      ON appointments(slot_id);
CREATE INDEX idx_appointments_status    ON appointments(status);
CREATE INDEX idx_slots_date             ON time_slots(date, status);
CREATE INDEX idx_clients_whatsapp       ON clients(whatsapp);
```

### Row Level Security (Supabase RLS)

```
clients:
  - SELECT: apenas o próprio cliente (via auth.uid = client_id)
  - ALL: service_role (admin)

appointments:
  - SELECT: cliente vê apenas os seus
  - INSERT: qualquer usuário autenticado pode criar o seu
  - UPDATE: apenas service_role ou o próprio cliente (para cancelar)

time_slots:
  - SELECT: público (para mostrar disponibilidade)
  - ALL: service_role (admin)
```

### Escalabilidade Futura

- Coluna `is_vip` em `clients` já prepara o módulo VIP
- `payments` separado de `appointments` permite adicionar gateway de pagamento online sem migração
- `availability_rules` permite múltiplas regras (ex: segunda diferente de sexta) sem alterar estrutura
- UUID como PK facilita sincronização offline e evita enumeração

---

# 5. ROADMAP DE DESENVOLVIMENTO

## Fase 1 — Fundação (Semana 1–2)

**Objetivo:** Infraestrutura sólida que suporte todas as fases seguintes.

```
□ Criar repositório Next.js 14 com App Router + TypeScript
□ Configurar Tailwind CSS com os tokens da marca (custom config)
□ Configurar Supabase (projeto, autenticação, banco)
□ Executar migrations do banco (todas as tabelas da fase 4)
□ Configurar Vercel com deploy automático
□ Criar design tokens como Tailwind theme extension
□ Configurar fontes (Cormorant Garamond + Jost via next/font)
□ Estrutura de pastas e convenções de código
□ Setup de linting (ESLint + Prettier + TypeScript strict)
```

**Entregável:** Repositório funcional, banco criado, deploy automático no Vercel.

---

## Fase 2 — Área Pública (Semana 2–3)

**Objetivo:** Recriar o site institucional em Next.js, mantendo 100% da identidade visual.

```
□ Layout base (Nav, Footer)
□ Seção Hero com animações de entrada
□ Seção Sobre
□ Seção Experiência
□ Seção Serviços (accordion)
□ Seção VIP
□ SEO: metadata, Open Graph, Schema.org completo
□ Sitemap.xml e robots.txt
□ Otimização de performance (Core Web Vitals)
□ Responsividade Mobile First validada
```

**Entregável:** Site institucional em produção substituindo o HTML atual.

---

## Fase 3 — Sistema de Agendamento (Semana 3–5)

**Objetivo:** Agendamento real com persistência, sem dependência de gerenciamento manual.

```
□ API de disponibilidade (lê time_slots do banco)
□ Componente de calendário premium (não usa biblioteca externa)
□ Componente de seleção de horários
□ Fluxo de agendamento em 3 etapas (já existe no HTML, recriar em React)
□ Geração de reference_code automático
□ Criação automática de client se não existir (pelo WhatsApp)
□ Confirmação via WhatsApp (mensagem pré-formatada, igual ao atual)
□ Email de confirmação (Resend ou SendGrid)
□ Webhook para notificar Alison de novos agendamentos
□ Lembrete automático 24h antes (cron job via Supabase Edge Functions)
□ Página de confirmação pós-agendamento
```

**Entregável:** Qualquer pessoa pode agendar e a confirmação é persistida no banco.

---

## Fase 4 — Área Administrativa (Semana 5–7)

**Objetivo:** Alison tem controle total da agenda sem precisar do WhatsApp para gestão.

```
□ Autenticação admin (email + senha, apenas Alison)
□ Dashboard — resumo do dia e da semana
□ Agenda visual — timeline do dia com agendamentos
□ Confirmar / Concluir / Cancelar agendamentos
□ Bloquear datas e períodos
□ Configurar horários de funcionamento
□ Visualizar ficha do cliente com histórico
□ Adicionar notas a clientes e agendamentos
□ Gestão de serviços (ativar, desativar, editar preço)
□ Gestão de solicitações VIP
```

**Entregável:** Alison gerencia a agenda inteiramente pela plataforma.

---

## Fase 5 — Gestão de Clientes (Semana 7–8)

**Objetivo:** CRM simples e poderoso para um atendimento verdadeiramente personalizado.

```
□ Portal do cliente (login por OTP via WhatsApp)
□ Visualizar próximos agendamentos
□ Histórico de visitas com serviços realizados
□ Reagendar (até 24h antes)
□ Cancelar (com política configurável)
□ Salvar preferências de serviço
□ Admin: busca avançada de clientes
□ Admin: filtros (VIP, frequência, último atendimento)
□ Admin: exportar lista de clientes
□ Admin: marcar cliente como VIP
```

**Entregável:** Clientes têm autonomia digital; Alison tem CRM próprio.

---

## Fase 6 — Financeiro e Relatórios (Semana 8–9)

**Objetivo:** Visibilidade de negócio sem planilhas manuais.

```
□ Registro de pagamento por agendamento (método + valor)
□ Dashboard financeiro: receita do dia, semana, mês
□ Receita por serviço (gráfico de barras simples)
□ Agendamentos: confirmados vs cancelados vs no-show
□ Ranking de serviços mais realizados
□ Relatório mensal exportável (PDF)
□ Meses sazonais (comparativo ano a ano)
```

**Entregável:** Alison vê o negócio em números sem trabalho manual.

---

## Fase 7 — Otimizações Premium (Semana 9–12)

**Objetivo:** Elevar a experiência para o nível que a marca merece.

```
□ Galeria de trabalhos integrada ao site
□ Sistema de fidelidade (X visitas → benefício automático)
□ Avaliação pós-atendimento (NPS simples via WhatsApp)
□ Lista de espera automática (cliente entra na fila se não tem vaga)
□ PWA — instalação no celular como app nativo
□ Animações de transição de página (Framer Motion)
□ Modo escuro total (já parcialmente implementado)
□ Analytics próprio (sem Google Analytics — Vercel Analytics)
□ Testes A/B de copy nos CTAs
```

**Entregável:** Plataforma de referência no mercado de barbearias premium.

---

# 6. MELHORIAS ESTRATÉGICAS

## Como se diferenciar de Trinks, Booksy e AgendaEdu

Essas plataformas são genéricas por design — atendem do salão popular ao espaço premium com a mesma interface. A plataforma de Alison Estevam deve ser o oposto: **feita para uma marca específica, com cada pixel justificado**.

### 1. Identidade Visual Proprietária
Trinks e Booksy têm a cara deles, não a sua. Aqui, cada tela é Alison Estevam. O cliente reconhece a marca em todo touchpoint.

### 2. Login sem atrito (WhatsApp OTP)
Nenhuma dessas plataformas faz isso bem. O cliente não cria conta, não lembra senha — recebe um código no WhatsApp que já usa. Fricção zero.

### 3. Ficha do Cliente com memória real
O admin não vê uma lista de agendamentos. Vê a **pessoa**: nome, quantas vezes veio, qual serviço prefere, última visita, notas pessoais ("prefere tesoura", "alérgico a X"). Isso é atendimento exclusivo digitalizado.

### 4. Agenda como objeto de design
A interface da agenda não parece um Google Calendar degradado. Parece um objeto editorial — a mesma sofisticação do site institucional levada para as telas internas.

### 5. Horário VIP como produto digital
Nas plataformas genéricas, VIP é só uma categoria de preço. Aqui, VIP tem fluxo próprio: solicitação, aprovação, comunicação exclusiva. A privacidade e exclusividade do produto físico refletem no produto digital.

### 6. Notificação por WhatsApp nativa
Lembrete 24h antes via WhatsApp (não email, não push notification) — onde o cliente já está. Taxa de abertura próxima de 98% vs 20% de email.

### 7. Nenhum logo de terceiro
O cliente nunca vê "Powered by Trinks". A plataforma é completamente proprietária, o que reforça a percepção de exclusividade.

### 8. Performance de produto de tecnologia
Core Web Vitals perfeitos, animações fluidas, zero loading spinner desnecessário. Isso é raro no setor — e percebido inconscientemente como qualidade.

---

# 7. TECNOLOGIAS RECOMENDADAS

## Stack Proposta (validada)

### Frontend — Next.js 14 + App Router ✓

**Justificativa:** O App Router viabiliza Server Components para SEO nativo, streaming para performance percebida, e Route Handlers para a API. A alternativa (Vite + React SPA) perderia SEO e performance de carregamento inicial — críticos para o site institucional.

**Riscos monitorados:** O App Router ainda tem nuances de caching que requerem atenção; `revalidatePath` e `unstable_cache` precisam ser usados com critério.

### TypeScript — Strict Mode ✓

**Justificativa:** O projeto vai crescer. TypeScript strict evita uma classe inteira de bugs em runtime, especialmente nas chamadas ao Supabase (tipos gerados automaticamente com `supabase gen types typescript`).

### Tailwind CSS — com configuração customizada ✓

**Justificativa:** Permite codificar os tokens do design system diretamente no `tailwind.config.ts`, garantindo que nenhum desenvolvedor use uma cor fora da paleta. A alternativa (CSS Modules + variáveis CSS) é válida, mas Tailwind + tokens customizados é mais produtivo e mais fácil de auditar.

**Configuração crítica:**
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      charcoal: { DEFAULT: '#1C1C1A', mid: '#2E2E2B', deep: '#141412' },
      sage: { DEFAULT: '#7A9182', light: '#A0B4A8' },
      gold: { DEFAULT: '#C9A96E', light: '#DBBE85' },
      offwhite: { DEFAULT: '#F5F0E8', warm: '#EDE8DF' },
      cream: '#FAF7F2',
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'Georgia', 'serif'],
      body: ['Jost', 'system-ui', 'sans-serif'],
      data: ['Lora', 'Georgia', 'serif'],
    },
  }
}
```

### Supabase ✓

**Justificativa:** Combina banco PostgreSQL, autenticação, storage, Edge Functions e realtime em um único serviço. Para esse projeto, elimina a necessidade de backend separado. O plano gratuito comporta as fases iniciais; o plano Pro ($ 25/mês) é suficiente para produção.

**Funcionalidades usadas:**
- `supabase-js` no frontend para queries tipadas
- Row Level Security para proteção por usuário
- Edge Functions para cron jobs (lembretes)
- Realtime para atualização da agenda em tempo real

**Risco:** vendor lock-in em Edge Functions. Mitigação: manter a lógica de negócio em funções TypeScript puras, usando Edge Functions apenas como executor.

### PostgreSQL (via Supabase) ✓

**Justificativa:** A modelagem do projeto usa relacionamentos reais (foreign keys, índices compostos) que um banco NoSQL tornaria complexo. PostgreSQL é a escolha correta para dados estruturados com integridade.

### Vercel ✓

**Justificativa:** Deploy automático por branch, preview deployments por PR, integração nativa com Next.js, CDN global, Analytics incluído. O plano Hobby suporta as fases iniciais; Pro ($ 20/mês) para produção com domínio customizado e mais recursos.

## Adições Recomendadas à Stack

| Biblioteca | Função | Justificativa |
|---|---|---|
| `next/font` | Fontes | Zero layout shift, carregamento otimizado |
| `zod` | Validação | Schema de validação tipado para formulários e APIs |
| `date-fns` | Datas | Leve, tree-shakeable, suporte a pt-BR |
| `resend` | Email transacional | API simples, deliverability alta, free tier generoso |
| `@vercel/analytics` | Analytics | Privacy-first, sem cookie banner |
| `framer-motion` | Animações (Fase 7) | Apenas quando necessário; não nas fases iniciais |

## O que NÃO usar

| Evitar | Motivo |
|---|---|
| `shadcn/ui` | Componentes elegantes, mas com aparência que contraria a identidade da marca. Usar apenas como referência de acessibilidade, nunca de estilo. |
| `react-datepicker` | Componentes de calendário genéricos. O calendário é um elemento de marca — precisa ser proprietário. |
| `react-hook-form` + UI libs | Formulários precisam seguir o design system; bibliotecas de UI de formulário não permitem esse controle. |
| `chart.js` / `recharts` | Na fase de financeiro, os gráficos precisam ter a estética da marca. Preferir SVG manual ou uma biblioteca minimal como `@visx`. |
| `moment.js` | Pesado e deprecated. Usar `date-fns`. |
| Google Analytics | Requer cookie banner na Europa; Vercel Analytics é privacy-first. |

---

# SUMÁRIO EXECUTIVO

A Barbearia Alison Estevam já tem o que a maioria dos negócios leva anos para construir: uma identidade clara, um posicionamento genuíno e uma experiência presencial que justifica o premium. O que falta é que o produto digital esteja à altura dessa promessa.

O plano proposto não é um sistema de agendamento. É a extensão digital da experiência Alison Estevam — do primeiro clique no site até o lembrete antes do atendimento. Cada módulo foi pensado para eliminar fricção operacional (para Alison) e reforçar a percepção de exclusividade (para o cliente).

A stack escolhida é conservadora onde precisa ser (Next.js, PostgreSQL, TypeScript strict) e elegante onde importa (design system proprietário, sem componentes genéricos, sem bibliotecas de UI que dominariam a aparência).

**Próximo passo após aprovação:** Iniciar a Fase 1 — configuração da infraestrutura e design tokens. Estimativa: primeiras telas funcionais em 10–14 dias.

---

*Documento preparado para: Alison Estevam Studio*
*Data: Junho 2026*
*Versão: 1.0 — Aguardando aprovação para início da implementação*

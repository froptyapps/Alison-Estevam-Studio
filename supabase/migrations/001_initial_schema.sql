-- ═══════════════════════════════════════════════════════════
-- Alison Estevam Studio — Initial Schema
-- Migration: 001_initial_schema
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Clients ───────────────────────────────────────────────
CREATE TABLE clients (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  whatsapp    TEXT NOT NULL UNIQUE,  -- E.164 format: +5511...
  email       TEXT,
  notes       TEXT,                  -- Internal notes (only admin sees)
  vip         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Services ──────────────────────────────────────────────
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  duration    INT NOT NULL,          -- minutes
  price       NUMERIC(8,2) NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  position    INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Availability rules (weekly schedule) ──────────────────
CREATE TABLE availability_rules (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  weekday     INT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT TRUE
);

-- ── Time slots ────────────────────────────────────────────
CREATE TABLE time_slots (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date        DATE NOT NULL,
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  is_vip      BOOLEAN NOT NULL DEFAULT FALSE,
  status      TEXT NOT NULL DEFAULT 'available'
              CHECK (status IN ('available', 'blocked', 'booked'))
);

-- ── Appointments ──────────────────────────────────────────
CREATE TABLE appointments (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code       TEXT NOT NULL UNIQUE,
  client_id            UUID NOT NULL REFERENCES clients(id),
  service_id           UUID NOT NULL REFERENCES services(id),
  slot_id              UUID NOT NULL REFERENCES time_slots(id),
  status               TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','confirmed','completed','cancelled','no_show')),
  notes                TEXT,
  reminder_sent        BOOLEAN NOT NULL DEFAULT FALSE,
  cancelled_at         TIMESTAMPTZ,
  cancellation_reason  TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Blocked periods ───────────────────────────────────────
CREATE TABLE blocked_periods (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date_start  DATE NOT NULL,
  date_end    DATE NOT NULL,
  reason      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────
CREATE INDEX idx_appointments_client  ON appointments(client_id);
CREATE INDEX idx_appointments_status  ON appointments(status);
CREATE INDEX idx_appointments_slot    ON appointments(slot_id);
CREATE INDEX idx_slots_date_status    ON time_slots(date, status);
CREATE INDEX idx_clients_whatsapp     ON clients(whatsapp);
CREATE INDEX idx_services_active      ON services(active, position);

-- ─────────────────────────────────────────────────────────
-- TRIGGERS — auto-update updated_at
-- ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────
-- SEED — Services
-- ─────────────────────────────────────────────────────────
INSERT INTO services (name, slug, description, duration, price, position) VALUES
  ('Corte de Cabelo',    'corte-cabelo',   'Corte personalizado no seu estilo. Cada detalhe executado com precisão, do início à finalização.', 60, 60.00, 1),
  ('Barba Completa',     'barba-completa', 'Modelagem completa com vaporizador de ozônio e produtos selecionados. Um ritual que cuida da pele e valoriza o visual.', 60, 60.00, 2),
  ('Cabelo e Barba',     'cabelo-barba',   'A experiência completa em um único atendimento. Corte e barba com toda a atenção que você merece.', 90, 100.00, 3),
  ('Corte Feminino',     'corte-feminino', 'Especialidade em Pixie Cut — um corte que exige técnica, sensibilidade e olhar para o que valoriza cada rosto.', 60, 100.00, 4),
  ('Tratamento Capilar', 'tratamento-capilar', 'Em breve. Um lavatório dedicado para cuidar do seu cabelo com a atenção que ele merece.', 60, 0.00, 5);

-- ─────────────────────────────────────────────────────────
-- SEED — Availability rules (Mon–Sat, 09:00–17:00)
-- ─────────────────────────────────────────────────────────
INSERT INTO availability_rules (weekday, start_time, end_time) VALUES
  (1, '09:00', '17:00'), -- Segunda
  (2, '09:00', '17:00'), -- Terça
  (3, '09:00', '17:00'), -- Quarta
  (4, '09:00', '17:00'), -- Quinta
  (5, '09:00', '17:00'), -- Sexta
  (6, '09:00', '17:00'); -- Sábado

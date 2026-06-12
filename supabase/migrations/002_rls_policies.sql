-- ═══════════════════════════════════════════════════════════
-- Row Level Security Policies
-- Migration: 002_rls_policies
-- ═══════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE clients         ENABLE ROW LEVEL SECURITY;
ALTER TABLE services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots      ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_periods ENABLE ROW LEVEL SECURITY;

-- ── Services: public read, admin write ────────────────────
CREATE POLICY "services_public_read"
  ON services FOR SELECT USING (active = TRUE);

CREATE POLICY "services_admin_all"
  ON services FOR ALL
  USING (auth.role() = 'service_role');

-- ── Time slots: public read available, admin all ──────────
CREATE POLICY "slots_public_read"
  ON time_slots FOR SELECT USING (status = 'available');

CREATE POLICY "slots_admin_all"
  ON time_slots FOR ALL
  USING (auth.role() = 'service_role');

-- ── Appointments: insert public, read/update own ──────────
CREATE POLICY "appointments_insert_anon"
  ON appointments FOR INSERT
  WITH CHECK (true);  -- Validated at API level

CREATE POLICY "appointments_admin_all"
  ON appointments FOR ALL
  USING (auth.role() = 'service_role');

-- ── Clients: admin only ───────────────────────────────────
CREATE POLICY "clients_admin_all"
  ON clients FOR ALL
  USING (auth.role() = 'service_role');

-- ── Blocked periods: public read, admin write ─────────────
CREATE POLICY "blocked_public_read"
  ON blocked_periods FOR SELECT USING (true);

CREATE POLICY "blocked_admin_all"
  ON blocked_periods FOR ALL
  USING (auth.role() = 'service_role');

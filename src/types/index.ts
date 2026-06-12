/**
 * Application-level types — derived from database types but shaped for the UI.
 * Keep API responses and UI state separate from raw DB rows.
 */
import type { Database } from './database'

// ── Raw DB rows (aliased for convenience) ──────────────────
export type Client      = Database['public']['Tables']['clients']['Row']
export type Service     = Database['public']['Tables']['services']['Row']
export type TimeSlot    = Database['public']['Tables']['time_slots']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type BlockedPeriod = Database['public']['Tables']['blocked_periods']['Row']

// ── Enriched types (joins) ──────────────────────────────────
export interface AppointmentWithDetails extends Appointment {
  client:  Client
  service: Service
  slot:    TimeSlot
}

// ── API request/response shapes ─────────────────────────────
export interface CreateAppointmentInput {
  name:       string
  whatsapp:   string
  email?:     string
  serviceId:  string
  slotId:     string
}

export interface AvailabilityDay {
  date:  string      // ISO date: 2026-06-15
  slots: SlotOption[]
}

export interface SlotOption {
  id:        string
  startTime: string  // HH:mm
  endTime:   string
  available: boolean
}

// ── UI-specific types ───────────────────────────────────────
export type BookingStep = 1 | 2 | 3

export interface BookingState {
  step:        BookingStep
  selectedDate: string | null  // ISO date
  selectedSlot: SlotOption | null
  selectedService: Service | null
}

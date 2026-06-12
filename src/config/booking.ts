/**
 * Booking configuration — business rules for the scheduling system.
 * All rules in one place; no logic scattered across components.
 */
export const BOOKING = {
  // Days of week blocked (0 = Sunday, 6 = Saturday)
  blockedWeekdays: [0] as number[],

  // Default time slots (HH:mm format)
  defaultSlots: [
    '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00',
  ] as string[],

  // Slot duration in minutes
  slotDurationMinutes: 60,

  // How many hours before appointment cancellation is allowed
  cancellationWindowHours: 24,

  // How many hours before reminder is sent
  reminderHoursBefore: 24,

  // Maximum days ahead a client can book
  maxDaysAhead: 60,

  // Reference code prefix (AE-YYYY-NNNN)
  referencePrefix: 'AE',
} as const

export const APPOINTMENT_STATUS = {
  PENDING:   'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW:   'no_show',
} as const

export type AppointmentStatus = typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS]

export const SLOT_STATUS = {
  AVAILABLE: 'available',
  BLOCKED:   'blocked',
  BOOKED:    'booked',
} as const

export type SlotStatus = typeof SLOT_STATUS[keyof typeof SLOT_STATUS]

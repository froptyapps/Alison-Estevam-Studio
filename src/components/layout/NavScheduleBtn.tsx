'use client'

import { useBookingModal } from '@/hooks/useBookingModal'
import { useEffect } from 'react'

/**
 * Wires the booking modal to the Nav's "Agendar" button via context.
 * We can't pass props from a Server layout to a Client Nav directly,
 * so this component bridges the gap.
 */
export function NavScheduleBtn() {
  const { open } = useBookingModal()

  useEffect(() => {
    // Dispatch custom event that Nav listens to
    const handler = () => open()
    window.addEventListener('open-booking', handler)
    return () => window.removeEventListener('open-booking', handler)
  }, [open])

  return null
}

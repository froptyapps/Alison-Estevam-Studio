'use client'

import { BookingModalContext, useBookingModalState } from '@/hooks/useBookingModal'
import { BookingModal } from './BookingModal'

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, open, close } = useBookingModalState()

  return (
    <BookingModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} />
    </BookingModalContext.Provider>
  )
}

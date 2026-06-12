'use client'

import { useContext, createContext, useState, useCallback } from 'react'

interface BookingModalCtx {
  isOpen: boolean
  open:   () => void
  close:  () => void
}

export const BookingModalContext = createContext<BookingModalCtx>({
  isOpen: false,
  open:   () => {},
  close:  () => {},
})

export function useBookingModal() {
  return useContext(BookingModalContext)
}

export function useBookingModalState() {
  const [isOpen, setIsOpen] = useState(false)
  const open  = useCallback(() => setIsOpen(true),  [])
  const close = useCallback(() => setIsOpen(false), [])
  return { isOpen, open, close }
}

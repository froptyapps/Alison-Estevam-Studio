'use client'

import { useBookingModal } from '@/hooks/useBookingModal'
import { HeroSection }     from './HeroSection'

export function HomeHero() {
  const { open } = useBookingModal()
  return <HeroSection onScheduleClick={open} />
}

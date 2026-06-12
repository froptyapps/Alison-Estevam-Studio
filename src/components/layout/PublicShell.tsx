'use client'

import { usePathname } from 'next/navigation'
import { Nav }           from './Nav'
import { NavScheduleBtn } from './NavScheduleBtn'
import { Footer }        from './Footer'
import { Cursor }        from '@/components/ui/Cursor'
import { BookingProvider } from '@/components/booking/BookingProvider'

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin  = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <BookingProvider>
      <Cursor />
      <Nav />
      <NavScheduleBtn />
      <main>{children}</main>
      <Footer />
    </BookingProvider>
  )
}

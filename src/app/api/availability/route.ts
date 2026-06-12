import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { BOOKING } from '@/config/booking'
import { addDays, format, startOfDay } from 'date-fns'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year  = parseInt(searchParams.get('year')  ?? String(new Date().getFullYear()))
  const month = parseInt(searchParams.get('month') ?? String(new Date().getMonth() + 1))

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 })
  }

  // Cast to any — Supabase v2.43 generics don't resolve table types reliably
  const db = await createServiceClient() as any

  const monthStart = format(new Date(year, month - 1, 1), 'yyyy-MM-dd')
  const monthEnd   = format(new Date(year, month, 0), 'yyyy-MM-dd')

  const { data: blocked } = await db
    .from('blocked_periods')
    .select('date_start, date_end')
    .lte('date_start', monthEnd)
    .gte('date_end', monthStart) as { data: { date_start: string; date_end: string }[] | null }

  const { data: slots } = await db
    .from('time_slots')
    .select('date, start_time, status, id')
    .gte('date', monthStart)
    .lte('date', monthEnd)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true }) as {
      data: { id: string; date: string; start_time: string; status: string }[] | null
    }

  const today = startOfDay(new Date())
  const maxDate = addDays(today, BOOKING.maxDaysAhead)

  const availability: Record<string, {
    available: boolean
    slots: { id: string; startTime: string; available: boolean }[]
  }> = {}

  const daysInMonth = new Date(year, month, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d)
    const dateStr = format(date, 'yyyy-MM-dd')

    if (startOfDay(date) < today) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    if (date > maxDate) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    if (BOOKING.blockedWeekdays.includes(date.getDay())) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    const isBlocked = blocked?.some(b =>
      dateStr >= b.date_start && dateStr <= b.date_end
    )
    if (isBlocked) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    const daySlots = slots?.filter(s => s.date === dateStr) ?? []
    const mappedSlots = daySlots.map(s => ({
      id:        s.id,
      startTime: s.start_time,
      available: s.status === 'available',
    }))

    availability[dateStr] = {
      available: mappedSlots.some(s => s.available),
      slots: mappedSlots,
    }
  }

  return NextResponse.json({ year, month, availability }, {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=120' },
  })
}

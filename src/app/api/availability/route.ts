import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { BOOKING } from '@/config/booking'
import { addDays, format, isWeekend, parseISO, startOfDay } from 'date-fns'

/**
 * GET /api/availability?year=2026&month=6
 * Returns available days and slots for the given month.
 * Public endpoint — no auth required.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year  = parseInt(searchParams.get('year')  ?? String(new Date().getFullYear()))
  const month = parseInt(searchParams.get('month') ?? String(new Date().getMonth() + 1))

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  // Get blocked periods for this month
  const monthStart = format(new Date(year, month - 1, 1), 'yyyy-MM-dd')
  const monthEnd   = format(new Date(year, month, 0), 'yyyy-MM-dd')

  const { data: blocked } = await supabase
    .from('blocked_periods')
    .select('date_start, date_end')
    .lte('date_start', monthEnd)
    .gte('date_end', monthStart)

  // Get existing slots for the month
  const { data: slots } = await supabase
    .from('time_slots')
    .select('date, start_time, status, id')
    .gte('date', monthStart)
    .lte('date', monthEnd)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })

  // Build availability map
  const today = startOfDay(new Date())
  const maxDate = addDays(today, BOOKING.maxDaysAhead)

  const availability: Record<string, {
    available: boolean
    slots: { id: string; startTime: string; available: boolean }[]
  }> = {}

  // Iterate each day of the month
  const daysInMonth = new Date(year, month, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d)
    const dateStr = format(date, 'yyyy-MM-dd')

    // Skip past dates
    if (startOfDay(date) < today) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    // Skip beyond max booking window
    if (date > maxDate) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    // Skip blocked weekdays
    if (BOOKING.blockedWeekdays.includes(date.getDay())) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    // Skip blocked periods
    const isBlocked = blocked?.some(b =>
      dateStr >= b.date_start && dateStr <= b.date_end
    )
    if (isBlocked) {
      availability[dateStr] = { available: false, slots: [] }
      continue
    }

    // Get slots for this day
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
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=120',
    },
  })
}

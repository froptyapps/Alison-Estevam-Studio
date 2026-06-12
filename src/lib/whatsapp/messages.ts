import { BRAND } from '@/config/brand'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * WhatsApp message templates — all messages the system sends.
 * Consistent tone, consistent format, consistent brand voice.
 */

export function buildBookingConfirmationUrl(params: {
  clientName: string
  serviceName: string
  date: string        // ISO date: 2026-06-15
  startTime: string   // HH:mm
  whatsapp: string
  referenceCode: string
}): string {
  const formattedDate = format(parseISO(params.date), "d 'de' MMMM", { locale: ptBR })

  const message =
    `Olá Alison! Sou ${params.clientName} e gostaria de confirmar meu agendamento:\n\n` +
    `• Serviço: ${params.serviceName}\n` +
    `• Data: ${formattedDate}\n` +
    `• Horário: ${params.startTime}\n` +
    `• WhatsApp: ${params.whatsapp}\n` +
    `• Código: ${params.referenceCode}`

  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`
}

export function buildVipRequestUrl(params: {
  clientName: string
  preferredTime?: string
}): string {
  const message =
    `Olá Alison! Sou ${params.clientName} e gostaria de solicitar um Horário VIP.` +
    (params.preferredTime ? `\n\nPreferência de horário: ${params.preferredTime}` : '')

  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`
}

export function buildReminderMessage(params: {
  clientName: string
  serviceName: string
  date: string
  startTime: string
  referenceCode: string
}): string {
  const formattedDate = format(parseISO(params.date), "EEEE, d 'de' MMMM", { locale: ptBR })

  return (
    `Olá ${params.clientName}! 👋\n\n` +
    `Lembrando do seu agendamento amanhã:\n\n` +
    `✦ ${params.serviceName}\n` +
    `📅 ${formattedDate} às ${params.startTime}\n\n` +
    `Código: ${params.referenceCode}\n\n` +
    `Até amanhã! — Alison Estevam`
  )
}

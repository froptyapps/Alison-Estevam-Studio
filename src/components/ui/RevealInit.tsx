'use client'

import { useRevealAll } from '@/hooks/useReveal'

/**
 * Drop this anywhere in a page to activate all .reveal elements.
 * Renders nothing — side-effect only.
 */
export function RevealInit() {
  useRevealAll()
  return null
}

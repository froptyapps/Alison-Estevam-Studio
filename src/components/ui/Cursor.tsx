'use client'

import { useEffect, useRef } from 'react'

/**
 * Custom cursor — pointer devices only.
 * Self-contained; attaches its own event listeners.
 * Reads from [data-cursor="expand"] attributes for expansion state.
 */
export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    // Only on pointer-fine devices
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      dot.style.left = `${e.clientX}px`
      dot.style.top  = `${e.clientY}px`
    }

    const animate = () => {
      const { mx, my, rx, ry } = pos.current
      pos.current.rx = rx + (mx - rx) * 0.11
      pos.current.ry = ry + (my - ry) * 0.11
      ring.style.left = `${pos.current.rx}px`
      ring.style.top  = `${pos.current.ry}px`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Expansion on interactive elements
    const SELECTORS = 'a, button, [data-cursor="expand"], .servico-item'
    const expand = () => dot.classList.add('cursor--expanded')
    const shrink = () => dot.classList.remove('cursor--expanded')

    document.querySelectorAll<HTMLElement>(SELECTORS).forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    // Re-bind on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(SELECTORS).forEach(el => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', shrink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove, { passive: true })

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current)
      else rafRef.current = requestAnimationFrame(animate)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor"      aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

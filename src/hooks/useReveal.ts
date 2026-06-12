'use client'

import { useEffect, useRef } from 'react'

/**
 * Scroll-triggered reveal animation hook.
 * Adds 'visible' class when element enters viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -36px 0px',
        ...options,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return ref
}

/**
 * Initialize all .reveal elements on the page.
 * Use in layout or page components to activate all reveals at once.
 */
export function useRevealAll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

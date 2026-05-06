'use client'
import { useEffect, useRef, useState } from 'react'
import { easeOutCubic, formatNumber } from '@/lib/utils'

export function LiveCounter({
  from = 0,
  to,
  duration = 1500,
  decimals = 0,
  delay = 0,
  inViewOnly = true,
  prefix,
  suffix,
}: {
  from?: number
  to: number
  duration?: number
  decimals?: number
  delay?: number
  inViewOnly?: boolean
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(from)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      setTimeout(() => {
        const startTs = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = easeOutCubic(t)
          setValue(from + (to - from) * eased)
          if (t < 1) requestAnimationFrame(tick)
          else setValue(to)
        }
        requestAnimationFrame(tick)
      }, delay)
    }

    if (!inViewOnly) {
      start()
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start()
            obs.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to, duration, delay, inViewOnly])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatNumber(value, decimals)}
      {suffix}
    </span>
  )
}

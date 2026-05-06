'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ProgressBar({
  value,
  max = 100,
  className,
  trackClassName,
  fillClassName,
  delay = 0,
  duration = 1.2,
}: {
  value: number
  max?: number
  className?: string
  trackClassName?: string
  fillClassName?: string
  delay?: number
  duration?: number
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('w-full', className)}>
      <div className={cn('relative h-2 w-full rounded-full bg-spot-border/60 overflow-hidden', trackClassName)}>
        <motion.div
          className={cn('h-full rounded-full bg-amber', fillClassName)}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  )
}

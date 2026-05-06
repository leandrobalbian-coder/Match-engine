'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from './Badge'
import { LiveCounter } from '@/components/demo/LiveCounter'

type Tone = 'red' | 'orange' | 'gray' | 'amber' | 'green'

const toneAccent: Record<Tone, string> = {
  red: 'text-alert-red',
  orange: 'text-alert-orange',
  gray: 'text-spot-dark',
  amber: 'text-amber',
  green: 'text-alert-green',
}

const toneBorder: Record<Tone, string> = {
  red: 'before:bg-alert-red',
  orange: 'before:bg-alert-orange',
  gray: 'before:bg-spot-mid/40',
  amber: 'before:bg-amber',
  green: 'before:bg-alert-green',
}

export function MetricCard({
  label,
  value,
  decimals = 0,
  prefix,
  suffix,
  sublabel,
  badge,
  badgeTone = 'gray',
  tone = 'gray',
  className,
  countFrom = 0,
  duration = 1400,
  delay = 0,
  inViewOnce = true,
}: {
  label: string
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  sublabel?: string
  badge?: string
  badgeTone?: 'red' | 'orange' | 'amber' | 'gray' | 'green'
  tone?: Tone
  className?: string
  countFrom?: number
  duration?: number
  delay?: number
  inViewOnce?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: inViewOnce, amount: 0.4 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: delay / 1000 }}
      className={cn(
        'relative bg-white rounded-xl border border-spot-border shadow-card p-6 overflow-hidden',
        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px]',
        toneBorder[tone],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-spot-mid">
          {label}
        </div>
        {badge && <Badge tone={badgeTone}>{badge}</Badge>}
      </div>
      <div className={cn('mt-3 flex items-baseline gap-1 font-black', toneAccent[tone])}>
        {prefix && <span className="text-2xl">{prefix}</span>}
        <span className="text-[44px] leading-none tracking-tight">
          <LiveCounter from={countFrom} to={value} duration={duration} decimals={decimals} delay={delay} />
        </span>
        {suffix && <span className="text-2xl">{suffix}</span>}
      </div>
      {sublabel && (
        <div className="mt-2 text-[13px] text-spot-mid font-medium">{sublabel}</div>
      )}
    </motion.div>
  )
}

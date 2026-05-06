'use client'
import { motion } from 'framer-motion'
import { LiveCounter } from './LiveCounter'
import { cn } from '@/lib/utils'

type Step = { value: number; label: string; filter: string }

export function FunnelChart({ steps }: { steps: readonly Step[] | Step[] }) {
  const max = steps[0].value
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const pct = (step.value / max) * 100
        const isFinal = i === steps.length - 1
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.18, duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-[110px_1fr_140px] items-center gap-4"
          >
            <div className={cn(
              'text-2xl font-black tabular-nums',
              isFinal ? 'text-alert-green' : 'text-spot-dark',
            )}>
              <LiveCounter from={max} to={step.value} duration={1100} delay={i * 180 + 200} />
            </div>
            <div className="relative h-7 rounded-md bg-spot-bg overflow-hidden border border-spot-border">
              <motion.div
                className={cn(
                  'absolute inset-y-0 left-0 rounded-md',
                  isFinal && 'bg-alert-green',
                  !isFinal && i === 0 && 'bg-amber',
                  !isFinal && i === 1 && 'bg-amber/70',
                  !isFinal && i === 2 && 'bg-amber/50',
                  !isFinal && i === 3 && 'bg-amber/30',
                )}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.18 + 0.1, duration: 0.9, ease: 'easeOut' }}
              />
              <div className="relative z-10 h-full flex items-center px-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-spot-dark/80">
                  {step.filter}
                </span>
              </div>
            </div>
            <div className="text-[12px] text-spot-mid font-medium leading-tight">
              {step.label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

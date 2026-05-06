'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export function ViewShell({
  eyebrow,
  title,
  description,
  badge,
  children,
  onBack,
  cta,
  className,
}: {
  eyebrow: string
  title: string
  description: string
  badge?: { text: string; tone?: 'amber' | 'red' | 'green' | 'gray' | 'dark' }
  children: React.ReactNode
  onBack: () => void
  cta?: { label: string; onClick: () => void }
  className?: string
}) {
  return (
    <div className={cn('h-full overflow-auto thin-scroll bg-spot-bg', className)}>
      <div className="px-8 py-7">
        <button
          onClick={onBack}
          className="text-[12px] font-bold text-spot-mid hover:text-spot-dark inline-flex items-center gap-1.5 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver a la demo
        </button>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-start justify-between gap-6 flex-wrap mb-6"
        >
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-dark">
              {eyebrow}
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-spot-dark mt-0.5">
              {title}
            </h1>
            <p className="text-[13px] text-spot-mid font-medium mt-1.5 max-w-2xl">
              {description}
            </p>
          </div>
          {badge && <Badge tone={badge.tone ?? 'dark'} uppercase>{badge.text}</Badge>}
        </motion.div>

        <div className="space-y-5">{children}</div>

        {cta && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={cta.onClick}
              className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-mid text-spot-charcoal font-bold px-5 py-3 rounded-md shadow-amber text-[13px]"
            >
              {cta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import { Users, Building2, Target, Clock, AlertTriangle } from 'lucide-react'
import { ViewShell } from './ViewShell'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { Badge } from '@/components/ui/Badge'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

const ORIGIN_DIST = [
  { label: 'Self-service (origin = 1)', value: 16234, color: '#FFAA00' },
  { label: 'Broker (origin = 2)', value: 3094, color: '#6E717F' },
  { label: 'Sin clasificar', value: 3976, color: '#E2E4EC' },
  { label: 'Referido (origin = 3)', value: 797, color: '#1C1F2A' },
]

export function DashboardView({
  onBack,
  onJumpToFlow,
}: {
  onBack: () => void
  onJumpToFlow: (i: number) => void
}) {
  const total = ORIGIN_DIST.reduce((a, b) => a + b.value, 0)

  return (
    <ViewShell
      eyebrow="Vista contextual · Dashboard"
      title="Dashboard general · Spot2 en tiempo real"
      description="Datos extraídos de la BD en marzo 2026 vía Dijin MCP. Esta vista es de contexto — no es parte del flujo de la demo."
      badge={{ text: 'Marzo 2026', tone: 'dark' }}
      onBack={onBack}
      cta={{ label: 'Volver a la demo · ver MatchAgent', onClick: () => onJumpToFlow(1) }}
    >
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Users}     label="Total leads activos" value={DATA.totalLeadsActivos} tone="dark" />
        <KpiCard icon={Building2} label="Spots públicos disponibles" value={DATA.spotsPublicosActivos} tone="dark" />
        <KpiCard icon={Target}    label="Conversión actual a visita" value={DATA.tasaConversionActual} suffix="%" decimals={2} tone="red" />
        <KpiCard icon={Clock}     label="Tiempo de respuesta" value={DATA.tiempoPrimeraRespuestaHrs} suffix="h" decimals={1} tone="orange" />
      </div>

      {/* Distribución por origen */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-spot-border rounded-xl shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">Distribución de leads por origen</div>
            <h3 className="font-bold text-spot-dark text-[16px] mt-0.5">
              {total.toLocaleString('es-MX')} leads · últimos 90 días
            </h3>
          </div>
          <Badge tone="amber" uppercase>Origin = 1 domina</Badge>
        </div>

        {/* Stacked bar */}
        <div className="flex h-3 rounded-md overflow-hidden border border-spot-border">
          {ORIGIN_DIST.map((s, i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              whileInView={{ width: `${(s.value / total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: i * 0.12 }}
              style={{ backgroundColor: s.color }}
              className="h-full"
            />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {ORIGIN_DIST.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className="text-[13px] text-spot-dark font-semibold flex-1 truncate">{s.label}</span>
              <span className="text-[13px] font-black text-spot-dark tabular-nums">{s.value.toLocaleString('es-MX')}</span>
              <span className="text-[11px] text-spot-mid font-bold w-12 text-right tabular-nums">
                {((s.value / total) * 100).toFixed(1)}%
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-spot-border bg-amber-light/40 -mx-6 -mb-6 px-6 py-4 rounded-b-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-dark shrink-0" />
          <div className="text-[13px] text-spot-dark font-semibold">
            El <strong className="text-amber-dark">53.6%</strong> de los leads muere en los primeros 7 días sin respuesta. Match Engine atiende los <strong className="text-amber-dark">3,636</strong> leads self-service activos en paralelo.
          </div>
        </div>
      </motion.div>
    </ViewShell>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  suffix,
  decimals = 0,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  suffix?: string
  decimals?: number
  tone: 'dark' | 'red' | 'orange'
}) {
  const accent = {
    dark: 'text-spot-dark',
    red: 'text-alert-red',
    orange: 'text-alert-orange',
  }[tone]
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-spot-border rounded-xl shadow-card p-5"
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-spot-mid">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <div className={cn('mt-2 flex items-baseline gap-1 font-black', accent)}>
        <span className="text-[34px] leading-none tracking-tight tabular-nums">
          <LiveCounter from={0} to={value} duration={1300} decimals={decimals} />
        </span>
        {suffix && <span className="text-xl">{suffix}</span>}
      </div>
    </motion.div>
  )
}

'use client'
import { motion } from 'framer-motion'
import { TrendingDown, Sparkles, Trophy, Users, AlertTriangle } from 'lucide-react'
import { ViewShell } from './ViewShell'
import { Badge } from '@/components/ui/Badge'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

const SEGMENTS = [
  { label: 'Top 4 brokers (+10 visitas)', count: 4,    visitsAvg: 35,  pct: 0.072,  color: '#FFAA00', tone: 'amber' as const },
  { label: 'Media (38 brokers · 1–9 visitas)', count: 38, visitsAvg: 5.4, pct: 0.685, color: '#FFBB33', tone: 'amber' as const },
  { label: 'Inactivos (5,498 brokers · 0 visitas)', count: 5498, visitsAvg: 0, pct: 99.243, color: '#E2E4EC', tone: 'gray' as const },
] as const

export function BrokersView({
  onBack,
  onJumpToFlow,
}: {
  onBack: () => void
  onJumpToFlow: (i: number) => void
}) {
  return (
    <ViewShell
      eyebrow="Vista contextual · Brokers"
      title="Actividad de brokers · últimos 30 días"
      description="Solo el 0.76% de los brokers registrados generó visitas en el período. La long tail de inactivos no escala."
      badge={{ text: '5,540 brokers totales', tone: 'dark' }}
      onBack={onBack}
      cta={{ label: 'Ver MatchAgent autónomo', onClick: () => onJumpToFlow(2) }}
    >
      {/* Stat hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-spot-border rounded-xl shadow-card p-8 flex items-center justify-between gap-8 flex-wrap"
      >
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">Brokers activos vs registrados</div>
          <div className="mt-2 flex items-baseline gap-2 font-black tracking-tight">
            <span className="text-alert-orange text-[68px] leading-none tabular-nums">
              <LiveCounter from={0} to={DATA.brokersActivos} duration={1300} />
            </span>
            <span className="text-spot-mid text-[28px]">/</span>
            <span className="text-spot-dark text-[42px] leading-none tabular-nums">
              <LiveCounter from={0} to={DATA.brokersRegistrados} duration={1500} />
            </span>
          </div>
          <p className="text-[13px] text-spot-mid font-medium mt-3">
            Solo el <strong className="text-alert-red">{DATA.porcentajeBrokersActivos}%</strong> de los brokers registrados generó al menos una visita en el último mes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-w-[260px]">
          <MiniStat icon={Trophy} label="Top broker · visitas" value="35" tone="amber" />
          <MiniStat icon={TrendingDown} label="Promedio activo" value="5.4" tone="gray" />
          <MiniStat icon={AlertTriangle} label="Inactivos" value="5,498" tone="red" />
          <MiniStat icon={Users} label={`Ratio top vs media`} value={`${DATA.ratioTopVsBottom}×`} tone="dark" />
        </div>
      </motion.div>

      {/* Distribución horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-spot-border rounded-xl shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">Distribución de actividad</div>
            <h3 className="font-bold text-spot-dark text-[16px] mt-0.5">Visitas mensuales por segmento</h3>
          </div>
          <Badge tone="red" uppercase>Long tail crítica</Badge>
        </div>

        <div className="space-y-3">
          {SEGMENTS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="grid grid-cols-[260px_1fr_120px] gap-4 items-center"
            >
              <div>
                <div className="text-[12px] font-bold text-spot-dark">{s.label}</div>
                <div className="text-[11px] text-spot-mid">
                  ~{s.visitsAvg} visitas/mes · promedio
                </div>
              </div>
              <div className="relative h-7 rounded-md bg-spot-bg overflow-hidden border border-spot-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(2, Math.min(100, (s.visitsAvg / 35) * 100))}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: i * 0.15 + 0.2 }}
                  style={{ backgroundColor: s.color }}
                  className="h-full rounded-md"
                />
              </div>
              <div className="text-right">
                <div className="font-black text-spot-dark text-[14px] tabular-nums">{s.count.toLocaleString('es-MX')}</div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">
                  {(s.pct).toFixed(s.pct < 1 ? 2 : 1)}% del total
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Callout */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-spot-charcoal text-white rounded-xl px-6 py-5 flex items-center gap-4"
      >
        <Sparkles className="w-5 h-5 text-amber shrink-0" />
        <div className="flex-1">
          <h4 className="font-bold">La diferencia entre top brokers y el promedio es {DATA.ratioTopVsBottom}×.</h4>
          <p className="text-[13px] text-white/70 mt-0.5">
            Match Engine replica el comportamiento del top 10% para todos los leads — no necesita brokers activos, actúa autónomamente.
          </p>
        </div>
      </motion.div>
    </ViewShell>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone: 'amber' | 'red' | 'dark' | 'gray'
}) {
  const accent = {
    amber: 'text-amber-dark bg-amber-light border-amber/30',
    red: 'text-alert-red bg-alert-redBg border-alert-red/20',
    dark: 'text-spot-dark bg-spot-bg border-spot-border',
    gray: 'text-spot-mid bg-spot-bg border-spot-border',
  }[tone]
  return (
    <div className={cn('border rounded-lg px-3 py-2.5', accent)}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold opacity-80">
        <Icon className="w-3 h-3" /> {label}
      </div>
      <div className="font-black mt-0.5 text-[16px] tabular-nums">{value}</div>
    </div>
  )
}

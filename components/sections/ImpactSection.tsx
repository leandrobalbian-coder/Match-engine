'use client'
import { motion } from 'framer-motion'
import { X, Check, Zap, Calendar, DollarSign, Github, RotateCcw, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

const COMPARE_ROWS = [
  {
    metric: 'Tiempo a primera respuesta',
    bad: '26.5 horas',
    good: '< 5 minutos',
  },
  {
    metric: 'Tiempo total a visita agendada',
    bad: 'Días o semanas',
    good: '47 segundos',
  },
  {
    metric: 'Conversión a visita',
    bad: '2.13%',
    good: '8.0% (objetivo mes 1)',
  },
  {
    metric: 'Brokers activos requeridos',
    bad: '42 (de 5,540)',
    good: '0 (proceso autónomo)',
  },
  {
    metric: 'Match con inventario',
    bad: 'Manual · sesgo del broker',
    good: 'Semántico · 5,554 spots',
  },
  {
    metric: 'Capacidad mensual',
    bad: '~36 visitas / mes',
    good: '+363 visitas adicionales',
  },
]

export function ImpactSection({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="h-full overflow-auto thin-scroll bg-spot-bg">
      <div className="px-8 py-7 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-amber-dark">
              <Sparkles className="w-3.5 h-3.5" /> Resultados · ROI proyectado
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-spot-dark mt-0.5">
              El argumento de negocio
            </h1>
            <p className="text-[13px] text-spot-mid font-medium mt-1">
              Comparativo Spot2 actual vs. con Match Engine en producción
            </p>
          </div>
          <Badge tone="dark" uppercase>Datos reales · BD Spot2</Badge>
        </div>

        {/* Comparativo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Sin */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-alert-redBg border-2 border-alert-red/20 rounded-xl overflow-hidden"
          >
            <div className="bg-alert-red text-white px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <X className="w-5 h-5" strokeWidth={3} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold opacity-80">Proceso actual</div>
                <h3 className="font-black">Sin MatchAgent</h3>
              </div>
            </div>
            <div className="divide-y divide-alert-red/10">
              {COMPARE_ROWS.map((r, i) => (
                <motion.div
                  key={r.metric}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="px-5 py-3 flex items-center justify-between gap-3"
                >
                  <span className="text-[12px] text-spot-mid font-semibold">{r.metric}</span>
                  <span className="text-[13px] font-bold text-alert-red text-right">{r.bad}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Con */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-alert-greenBg border-2 border-alert-green/30 rounded-xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-alert-green/10 rounded-full blur-3xl pointer-events-none" />
            <div className="bg-alert-green text-white px-5 py-4 flex items-center gap-3 stripe-bg">
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <Check className="w-5 h-5" strokeWidth={3} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold opacity-90">Proceso automatizado</div>
                <h3 className="font-black">Con Match Engine</h3>
              </div>
            </div>
            <div className="divide-y divide-alert-green/15">
              {COMPARE_ROWS.map((r, i) => (
                <motion.div
                  key={r.metric}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="px-5 py-3 flex items-center justify-between gap-3"
                >
                  <span className="text-[12px] text-spot-mid font-semibold">{r.metric}</span>
                  <span className="text-[13px] font-black text-alert-green text-right">{r.good}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3 impact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ImpactCard
            icon={Calendar}
            value={DATA.visitasAdicionalesMes1}
            label="Visitas adicionales · mes 1"
            sub="Estimado al cubrir 10% de los 3,636 leads inactivos."
            duration={1500}
          />
          <ImpactCard
            icon={Zap}
            value={DATA.factorMejora}
            suffix="×"
            label="Más rápido que el manual"
            sub="47 segundos vs 26.5 horas de tiempo de respuesta promedio."
            duration={1400}
          />
          <ImpactCard
            icon={DollarSign}
            value={DATA.pipelineRecuperadoMes1Num}
            decimals={1}
            prefix="$"
            suffix="M MXN"
            label="Pipeline recuperado · mes 1"
            sub="Conversión esperada del 8% sobre leads históricos dormidos."
            duration={1700}
            highlight
          />
        </div>

        {/* Créditos compactos · cierre */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-spot-border rounded-xl shadow-card px-7 py-6 flex items-center justify-between gap-6 flex-wrap"
        >
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">
              Hackathon Spot2 AI Edition · 2026
            </div>
            <div className="font-black text-spot-dark text-[18px] mt-0.5">
              Match Engine · Proyecto ganador #02/04
            </div>
            <div className="text-[13px] text-spot-mid mt-1">
              Propuesta original y diseño:{' '}
              <span className="font-bold text-spot-dark">Leandro Balbian</span>{' '}
              · Product Designer, Spot2
            </div>
            <div className="text-[12px] text-spot-mid mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              Construido sobre <strong className="text-spot-dark">Dijin</strong>, el MCP de Spot2 en producción.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRestart}
              className="bg-white border border-spot-border text-spot-dark font-bold px-4 py-2.5 rounded-md text-[13px] inline-flex items-center gap-2 hover:bg-spot-bg"
            >
              <RotateCcw className="w-4 h-4" />
              Volver al inicio
            </button>
            <a
              href="https://github.com/leandrobalbian-coder/Match-engine"
              target="_blank"
              rel="noreferrer"
              className="bg-amber hover:bg-amber-mid text-spot-charcoal font-bold px-4 py-2.5 rounded-md text-[13px] inline-flex items-center gap-2 shadow-amber"
            >
              <Github className="w-4 h-4" />
              Ver el código
              <span>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ImpactCard({
  icon: Icon,
  value,
  prefix,
  suffix,
  decimals = 0,
  label,
  sub,
  duration,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  sub: string
  duration: number
  highlight?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className={cn(
        'relative rounded-xl border-2 p-6 shadow-card overflow-hidden',
        highlight
          ? 'border-alert-green bg-alert-greenBg'
          : 'border-alert-green/30 bg-white',
      )}
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-alert-green/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-spot-mid">
        <Icon className="w-3.5 h-3.5 text-alert-green" />
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-1 font-black text-alert-green">
        {prefix && <span className="text-3xl">{prefix}</span>}
        <span className="text-[52px] leading-none tracking-tight">
          <LiveCounter from={0} to={value} duration={duration} decimals={decimals} />
        </span>
        {suffix && <span className="text-2xl">{suffix}</span>}
      </div>
      <p className="mt-3 text-[12px] text-spot-mid leading-relaxed">{sub}</p>
    </motion.div>
  )
}


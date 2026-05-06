'use client'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Clock, TrendingDown, Users, Activity, Sparkles } from 'lucide-react'
import { MetricCard } from '@/components/ui/MetricCard'
import { Badge } from '@/components/ui/Badge'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ProblemSection({ onActivate }: { onActivate: () => void }) {
  return (
    <div className="h-full overflow-auto thin-scroll bg-spot-bg">
      {/* Header */}
      <div className="px-8 pt-7 pb-5 bg-white border-b border-spot-border">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[26px] font-black tracking-tight text-spot-dark">
                MatchAgent — Centro de Operaciones
              </h1>
              <Badge tone="live" pulse>EN VIVO</Badge>
            </div>
            <p className="text-[13px] text-spot-mid mt-1.5 font-medium">
              Tiempo real · Actualizado hace 2 min · Datos extraídos de la BD de Spot2 · marzo 2026
            </p>
          </div>
          <button
            onClick={onActivate}
            className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-mid text-spot-charcoal font-bold px-5 py-2.5 rounded-md shadow-amber text-[13px]"
          >
            <Sparkles className="w-4 h-4" />
            Activar MatchAgent
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="px-8 py-7 space-y-6">
        {/* 3 metric cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MetricCard
            label="Leads sin atención"
            value={DATA.leadsSelfServiceSinAtencion}
            tone="red"
            badge="⚠ Crítico"
            badgeTone="red"
            sublabel="Self-service · sin broker asignado · Origin = 1"
          />
          <MetricCard
            label="Tiempo primera respuesta"
            value={DATA.tiempoPrimeraRespuestaHrs}
            decimals={1}
            suffix="h"
            tone="orange"
            badge="Alto"
            badgeTone="orange"
            sublabel="Promedio · vs 5 min target del mercado"
          />
          <MetricCard
            label="Conversión a visita"
            value={DATA.tasaConversionActual}
            decimals={2}
            suffix="%"
            tone="gray"
            badge="Crítico"
            badgeTone="red"
            sublabel={`${DATA.leadsConVisita} / ${DATA.totalLeadsActivos.toLocaleString('es-MX')} leads activos`}
          />
        </div>

        {/* Sub-row of micro-metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MicroMetric icon={Users} label="Leads activos en plataforma" value={DATA.totalLeadsActivos} />
          <MicroMetric icon={Activity} label="Spots públicos disponibles" value={DATA.spotsPublicosActivos} />
          <MicroMetric icon={TrendingDown} label="Brokers activos" value={DATA.brokersActivos} suffix={` / ${DATA.brokersRegistrados.toLocaleString('es-MX')}`} />
          <MicroMetric icon={Clock} label="Leads atendidos / semana" value={DATA.leadsAtendidosPorSemana} suffix={` de ${DATA.leadsNuevosPorSemana}`} />
        </div>

        {/* Two-column: table + charts */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-5">
          {/* Leads table */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl border border-spot-border shadow-card overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-spot-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-spot-dark text-[14px]">Leads sin atención · vista parcial</h3>
                <p className="text-[11px] text-spot-mid font-medium mt-0.5">5 de 3,636 leads activos · todos cumplen criterios completos</p>
              </div>
              <Badge tone="amber" uppercase>Real time</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-spot-bg/60 text-spot-mid">
                    <Th>Prospecto</Th>
                    <Th>Busca</Th>
                    <Th>Zona</Th>
                    <Th className="text-right">Sin respuesta</Th>
                    <Th>Estado</Th>
                  </tr>
                </thead>
                <tbody>
                  {DATA.leadsDemo.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="border-t border-spot-border hover:bg-amber-light/40 transition-colors cursor-pointer group"
                    >
                      <Td>
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            'w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px] text-white shrink-0',
                            i % 3 === 0 ? 'bg-amber' : i % 3 === 1 ? 'bg-spot-charcoal' : 'bg-alert-orange',
                          )}>
                            {lead.nombre.split(' ').map(w => w[0]).slice(0,2).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-spot-dark group-hover:text-amber-dark">{lead.nombre}</div>
                            <div className="text-[11px] text-spot-mid">#{lead.id} · {lead.origen}</div>
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <div className="text-spot-dark font-semibold">{lead.busca}</div>
                        <div className="text-[11px] text-spot-mid">{lead.area} · {lead.presupuesto}</div>
                      </Td>
                      <Td>
                        <div className="text-spot-dark">{lead.zona.split(' / ')[0]}</div>
                        <div className="text-[11px] text-spot-mid">{lead.zona.split(' / ')[1] ?? ''}</div>
                      </Td>
                      <Td className="text-right">
                        <span className={cn(
                          'font-black tabular-nums',
                          lead.horasSinRespuesta > 24 ? 'text-alert-red' : 'text-alert-orange',
                        )}>
                          {lead.horasSinRespuesta}h
                        </span>
                      </Td>
                      <Td>
                        {lead.horasSinRespuesta > 24 ? (
                          <Badge tone="red"><AlertTriangle className="w-3 h-3" /> Crítico</Badge>
                        ) : (
                          <Badge tone="orange">Sin contactar</Badge>
                        )}
                      </Td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="space-y-5">
            {/* Donut */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl border border-spot-border shadow-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-spot-dark text-[14px]">Conversión a visita</h3>
                <Badge tone="red">Crítico</Badge>
              </div>
              <Donut percentage={DATA.tasaConversionActual} />
              <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-alert-red" />
                  <span className="text-spot-mid">Con visita</span>
                  <span className="ml-auto font-bold text-spot-dark tabular-nums">{DATA.leadsConVisita}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-spot-border" />
                  <span className="text-spot-mid">Sin visita</span>
                  <span className="ml-auto font-bold text-spot-dark tabular-nums">{DATA.leadsSinVisita.toLocaleString('es-MX')}</span>
                </div>
              </div>
            </motion.div>

            {/* Brokers bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-xl border border-spot-border shadow-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-spot-dark text-[14px]">Actividad de brokers</h3>
                <span className="text-[11px] font-bold text-spot-mid">5,540 totales</span>
              </div>
              <BrokerBar />
              <p className="mt-3 text-[11px] text-spot-mid leading-relaxed">
                Top 4 brokers concentran el <span className="font-bold text-spot-dark">+10 visitas</span> mientras que <span className="font-bold text-alert-red">5,498</span> brokers no han registrado una sola visita en el período.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Insight bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-spot-charcoal text-white rounded-xl px-6 py-5 flex items-center gap-6 stripe-bg"
        >
          <div className="w-11 h-11 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white">El cuello de botella es operativo, no de demanda.</h4>
            <p className="text-[13px] text-white/70 mt-0.5">
              Hay <span className="font-bold text-amber">3,636 leads</span> con criterios completos, listos para recibir un match. El proceso manual no escala — un agente sí.
            </p>
          </div>
          <button
            onClick={onActivate}
            className="bg-amber hover:bg-amber-mid text-spot-charcoal font-bold px-5 py-2.5 rounded-md text-[13px] inline-flex items-center gap-2"
          >
            Ver MatchAgent en acción <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={cn('text-left text-[10px] uppercase tracking-wider font-bold px-5 py-2.5', className)}>
      {children}
    </th>
  )
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn('px-5 py-3 align-middle', className)}>{children}</td>
}

function MicroMetric({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  suffix?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-spot-border shadow-card p-4"
    >
      <div className="flex items-center gap-2 text-spot-mid text-[10px] uppercase tracking-wider font-bold">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-black text-spot-dark tabular-nums">
          <LiveCounter from={0} to={value} duration={1100} />
        </span>
        {suffix && <span className="text-[12px] text-spot-mid font-bold">{suffix}</span>}
      </div>
    </motion.div>
  )
}

function Donut({ percentage }: { percentage: number }) {
  const r = 56
  const c = 2 * Math.PI * r
  const filled = (percentage / 100) * c
  return (
    <div className="relative w-[180px] h-[180px] mx-auto">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="#E2E4EC" strokeWidth="14" fill="none" />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          stroke="#DC2626"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - filled }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-black text-alert-red tabular-nums">
          <LiveCounter from={0} to={percentage} duration={1200} decimals={2} />%
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">llegan a visita</span>
      </div>
    </div>
  )
}

function BrokerBar() {
  const segments = [
    { label: 'Top 4 (+10 visitas)', count: 4, color: '#FFAA00', pct: 0.072 },
    { label: '38 brokers (1–9 visitas)', count: 38, color: '#FFBB33', pct: 0.685 },
    { label: '5,498 brokers (0 visitas)', count: 5498, color: '#E2E4EC', pct: 99.243 },
  ]
  return (
    <>
      <div className="flex h-3 rounded-md overflow-hidden border border-spot-border">
        {segments.map((s, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            whileInView={{ width: `${s.pct * 100}%`.replace('%', '%') }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: i * 0.15 }}
            style={{
              backgroundColor: s.color,
              minWidth: i === 0 ? '6px' : i === 1 ? '14px' : 'auto',
            }}
            className="h-full"
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-[11px]">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-spot-mid">{s.label}</span>
            <span className="ml-auto font-bold text-spot-dark tabular-nums">
              {s.count.toLocaleString('es-MX')}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

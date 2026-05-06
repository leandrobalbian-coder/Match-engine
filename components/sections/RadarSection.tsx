'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Check, Loader2, MapPin, Briefcase, Ruler, DollarSign, Phone, Building, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { AgentThinking } from '@/components/demo/AgentThinking'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

const lead = DATA.leadsDemo[0]

const AGENT_LINES = [
  { text: 'Leyendo requerimiento del lead #8412…' },
  { text: 'Prospecto busca oficina 150–250 m²' },
  { text: 'en Polanco / Lomas de Chapultepec.' },
  { text: 'Budget: $90,000 MXN / mes.' },
  { text: 'Perfil: corporativo nivel medio-alto.' },
  { text: 'Buscando en 5,554 spots activos…' },
  { text: 'Ranking semántico vía Dijin (MCP Spot2)…' },
  { text: '✓ Match completado · 3 resultados encontrados', finalSuccess: true },
] as const

export function RadarSection({ onNext }: { onNext: () => void }) {
  const [agentDone, setAgentDone] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1

  return (
    <div className="h-full overflow-auto thin-scroll bg-spot-bg">
      <div className="px-8 py-7">
        {/* Title */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-spot-mid">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              MatchAgent activado
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-spot-dark mt-0.5">
              Radar · Lead detectado
            </h1>
          </div>
          <button
            onClick={onNext}
            disabled={!agentDone}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-[13px] font-bold transition-all',
              agentDone
                ? 'bg-amber text-spot-charcoal hover:bg-amber-mid cursor-pointer'
                : 'bg-spot-border text-spot-mid cursor-not-allowed opacity-60',
            )}
          >
            {agentDone ? (
              <>Continuar al matching <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Analizando… <Loader2 className="w-4 h-4 animate-spin" /></>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5">
          {/* Left col */}
          <div className="space-y-4">
            {/* Red banner */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-alert-redBg border border-alert-red/30 rounded-xl px-5 py-3.5 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-alert-red/15 border border-alert-red/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-alert-red" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-alert-red text-[14px]">Lead sin contacto · 18 horas</div>
                <div className="text-[12px] text-spot-mid">Detectado automáticamente por MatchAgent · sin broker asignado</div>
              </div>
              <Badge tone="red" pulse uppercase>Alerta</Badge>
            </motion.div>

            {/* Lead card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-spot-border rounded-xl shadow-card overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-spot-border flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber flex items-center justify-center text-spot-charcoal font-black text-base">
                  AG
                </div>
                <div className="flex-1">
                  <div className="font-bold text-spot-dark text-[15px]">{lead.nombre}</div>
                  <div className="text-[12px] text-spot-mid">{lead.empresa}</div>
                </div>
                <Badge tone="gray" uppercase>#{lead.id}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 px-5 py-4 text-[13px]">
                <Field icon={Briefcase} label="Busca" value={lead.busca} />
                <Field icon={Ruler} label="Área" value={lead.area} />
                <Field icon={MapPin} label="Zona" value={lead.zona} />
                <Field icon={DollarSign} label="Presupuesto" value={lead.presupuesto} />
                <Field icon={Phone} label="WhatsApp" value={lead.telefono} />
                <Field icon={Building} label="Origen" value={lead.origen} />
                <Field icon={Clock} label="Asignado a" value="— sin broker" valueClass="text-alert-red" />
                <Field icon={Clock} label="Último contacto" value="Nunca" valueClass="text-alert-red" />
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-spot-border rounded-xl shadow-card p-5"
            >
              <h3 className="text-[11px] uppercase tracking-wider font-bold text-spot-mid mb-4">Timeline del lead</h3>
              <div className="relative pl-6">
                <span className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px] bg-spot-border" />
                {[
                  { time: 'Hace 18h', text: 'Lead creado · self-service', tone: 'gray' as const },
                  { time: 'Hace 18h', text: 'Sin broker asignado', tone: 'gray' as const },
                  { time: 'Hace 18h', text: 'Sin respuesta de Spot2', tone: 'gray' as const },
                  { time: 'AHORA', text: 'MatchAgent activado · iniciando matching', tone: 'amber' as const },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="relative py-2"
                  >
                    <span
                      className={cn(
                        'absolute -left-[18px] top-3 w-3.5 h-3.5 rounded-full border-2 border-white',
                        m.tone === 'amber'
                          ? 'bg-amber'
                          : 'bg-spot-mid/40',
                      )}
                    />
                    <div className="flex items-center gap-3 text-[13px]">
                      <span className={cn(
                        'text-[10px] uppercase tracking-wider font-bold w-16',
                        m.tone === 'amber' ? 'text-amber-dark' : 'text-spot-mid',
                      )}>{m.time}</span>
                      <span className={cn(
                        'flex-1',
                        m.tone === 'amber' ? 'font-bold text-spot-dark' : 'text-spot-mid',
                      )}>
                        {m.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right col */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-spot-border rounded-xl shadow-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">Análisis del agente</h3>
                {agentDone ? (
                  <Badge tone="green" uppercase>Completado</Badge>
                ) : (
                  <Badge tone="gray" uppercase>Procesando</Badge>
                )}
              </div>
              <div className="space-y-2.5">
                <Check4 done={true} delay={0.4}>
                  Criterios completos: tipo · área · zona · presupuesto
                </Check4>
                <Check4 done={true} delay={0.9}>
                  Inventario disponible: <strong>5,554 spots activos</strong>
                </Check4>
                <Check4 done={true} delay={1.4}>
                  Contacto posible: WhatsApp registrado
                </Check4>
                <Check4 done={agentDone} delay={1.9}>
                  {agentDone ? '3 matches semánticos identificados' : 'Iniciando matching semántico…'}
                </Check4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-2"
            >
              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">
                    Procesando requerimiento
                  </span>
                  <span className="text-[10px] font-bold text-spot-dark tabular-nums">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
                <div className="h-1 bg-spot-border rounded-full overflow-hidden">
                  <motion.div
                    className={cn('h-full rounded-full', agentDone ? 'bg-alert-green' : 'bg-amber')}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <AgentThinking
                lines={[...AGENT_LINES]}
                totalDurationMs={3200}
                startDelay={600}
                onProgress={(i, total) => setProgress(i / total)}
                onComplete={() => {
                  setAgentDone(true)
                  setProgress(1)
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-3 gap-3"
            >
              <MiniStat label="latencia" value="0.4s" />
              <MiniStat label="confianza" value="94%" />
              <MiniStat label="modelo" value="dijin-mcp" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-spot-mid">
        <Icon className="w-3 h-3" /> {label}
      </div>
      <div className={cn('mt-0.5 font-semibold text-spot-dark', valueClass)}>{value}</div>
    </div>
  )
}

function Check4({
  children,
  done,
  delay,
}: {
  children: React.ReactNode
  done: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px]',
        done ? 'bg-alert-greenBg border border-alert-green/20' : 'bg-amber-light border border-amber/30',
      )}
    >
      {done ? (
        <Check className="w-4 h-4 text-alert-green shrink-0" strokeWidth={3} />
      ) : (
        <Loader2 className="w-4 h-4 text-amber-dark shrink-0 animate-spin" />
      )}
      <span className={cn(done ? 'text-spot-dark' : 'text-amber-dark font-semibold')}>
        {children}
      </span>
    </motion.div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-spot-border rounded-lg px-3 py-2.5 shadow-card">
      <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">{label}</div>
      <div className="font-black text-spot-dark mt-0.5">{value}</div>
    </div>
  )
}

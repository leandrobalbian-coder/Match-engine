'use client'
import { motion } from 'framer-motion'
import { Check, Calendar, Clock, MapPin, User, Building2, ArrowRight, Loader2, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ConfirmSection({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full overflow-auto thin-scroll bg-spot-bg">
      {/* Banner verde ancho completo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-[#16A34A] text-white px-8 py-6 flex items-center gap-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 250 }}
          className="w-14 h-14 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center shrink-0"
        >
          <motion.svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.path
              d="M5 12l5 5L20 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-[0.22em] font-bold opacity-90">Loop cerrado · Match Engine</div>
          <h2 className="text-[26px] font-black tracking-tight">Visita confirmada exitosamente</h2>
          <p className="text-white/90 text-[13px] mt-0.5">
            vs <strong>26.5h</strong> del proceso manual actual · 113× más rápido
          </p>
        </div>
        <div className="text-right pr-2">
          <div className="text-[11px] uppercase tracking-wider font-bold text-white/85">tiempo total del proceso</div>
          <div className="font-black tracking-tight text-white" style={{ fontSize: '64px', lineHeight: 1 }}>
            <LiveCounter from={0} to={47} duration={1400} delay={400} />
            <span className="text-3xl text-white/85 ml-1">SEG</span>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-7 space-y-6">
        {/* 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Detalles visita */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-amber rounded-xl shadow-card p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-amber-dark">
              <Sparkles className="w-3.5 h-3.5" /> Detalles de la visita
            </div>
            <h3 className="font-black text-spot-dark text-[16px] mt-1">Torre Corporativa Masaryk</h3>
            <div className="text-[12px] text-spot-mid">Piso 8 · Polanco · 210 m² · Clase A</div>

            <div className="mt-4 space-y-2.5">
              <DetailRow icon={Calendar} label="Fecha" value="Jueves 21 marzo 2026" />
              <DetailRow icon={Clock} label="Hora" value="11:00 hrs · 45 min de visita" />
              <DetailRow icon={MapPin} label="Dirección" value="Av. Presidente Masaryk 111, P8" />
              <DetailRow icon={User} label="Prospecto" value="Ana G. · Grupo Corporativo Torres" />
              <DetailRow icon={Building2} label="Broker asignado" value="Pedro R. · top 4 brokers" />
            </div>

            <div className="mt-4 pt-4 border-t border-spot-border flex items-center gap-2">
              <Badge tone="green" pulse uppercase>spot_stage = 2</Badge>
              <span className="text-[11px] text-spot-mid font-semibold">Persistido en BD · Dijin MCP</span>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white border-2 border-spot-charcoal/15 rounded-xl shadow-card p-5"
          >
            <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid mb-1">
              Timeline del proceso
            </div>
            <h3 className="font-black text-spot-dark text-[16px]">47 segundos · end-to-end</h3>

            <div className="relative pl-6 mt-4">
              <span className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px] bg-spot-border" />
              {[
                { time: '00:00', label: 'Lead detectado · 18h sin contacto', tone: 'amber' as const },
                { time: '00:04', label: 'Agente analiza criterios', tone: 'amber' as const },
                { time: '00:19', label: 'Match semántico vs 5,554 spots', tone: 'amber' as const },
                { time: '00:23', label: 'Ficha generada y enviada por WhatsApp', tone: 'amber' as const },
                { time: '00:47', label: 'Visita confirmada · jueves 11:00', tone: 'green' as const },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="relative py-1.5"
                >
                  <span
                    className={cn(
                      'absolute -left-[19px] top-2.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow',
                      m.tone === 'green' ? 'bg-alert-green' : 'bg-amber',
                    )}
                  />
                  <div className="flex items-baseline gap-3 text-[13px]">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-spot-mid w-12 tabular-nums">{m.time}</span>
                    <span className={cn('flex-1', m.tone === 'green' ? 'font-bold text-spot-dark' : 'text-spot-dark')}>{m.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 bg-amber-light border border-amber/30 rounded-lg px-4 py-3 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-dark" />
              <div>
                <div className="font-black text-amber-dark text-[18px] tabular-nums">
                  <LiveCounter from={1} to={DATA.factorMejora} duration={1400} delay={300} />×
                </div>
                <div className="text-[11px] text-spot-mid font-bold">más rápido que el proceso manual</div>
              </div>
            </div>
          </motion.div>

          {/* Acciones completadas */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white border-2 border-alert-green/30 rounded-xl shadow-card p-5"
          >
            <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid mb-1">
              Acciones automatizadas
            </div>
            <h3 className="font-black text-spot-dark text-[16px]">Sin intervención humana</h3>

            <div className="mt-4 space-y-2.5">
              {[
                'Análisis semántico de criterios',
                'Búsqueda en inventario (5,554 spots)',
                'Generación de ficha personalizada',
                'Envío vía WhatsApp Business API',
                'Calendario sincronizado · broker asignado',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.18, duration: 0.3 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md bg-alert-greenBg border border-alert-green/20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.18, type: 'spring', stiffness: 300 }}
                    className="w-5 h-5 rounded-full bg-alert-green flex items-center justify-center shrink-0"
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                  <span className="text-[13px] text-spot-dark font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-spot-border grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">Costo humano</div>
                <div className="font-black text-alert-green text-[18px] mt-0.5">$0 MXN</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">Costo Match Engine</div>
                <div className="font-black text-spot-dark text-[18px] mt-0.5">~$0.04 MXN</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cola de leads */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-spot-border rounded-xl shadow-card overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-spot-border flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">Próximos leads en cola</div>
              <h3 className="font-bold text-spot-dark text-[14px] mt-0.5">
                MatchAgent procesa <span className="text-amber-dark">3,636 leads</span> en paralelo
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone="amber" pulse uppercase>Procesando</Badge>
              <span className="text-[11px] text-spot-mid font-semibold">cola actual: 3,635 leads</span>
            </div>
          </div>
          <div className="divide-y divide-spot-border">
            {[
              { lead: DATA.leadsDemo[1], status: 'matching' as const },
              { lead: DATA.leadsDemo[2], status: 'queued' as const },
              { lead: DATA.leadsDemo[3], status: 'queued' as const },
            ].map(({ lead, status }, i) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="px-5 py-3 grid grid-cols-[1.4fr_1fr_1fr_auto] gap-4 items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-spot-charcoal flex items-center justify-center text-white font-black text-[11px]">
                    {lead.nombre.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-spot-dark text-[13px] truncate">{lead.nombre}</div>
                    <div className="text-[11px] text-spot-mid truncate">#{lead.id} · {lead.empresa}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-spot-dark">{lead.busca}</div>
                  <div className="text-[11px] text-spot-mid">{lead.zona}</div>
                </div>
                <div>
                  <div className="text-[12px] font-bold text-spot-dark">{lead.presupuesto}</div>
                  <div className="text-[11px] text-spot-mid">{lead.area}</div>
                </div>
                <div>
                  {status === 'matching' ? (
                    <Badge tone="amber" uppercase>
                      <Loader2 className="w-3 h-3 animate-spin" /> Procesando…
                    </Badge>
                  ) : (
                    <Badge tone="gray" uppercase>En cola</Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-mid text-spot-charcoal font-bold px-5 py-3 rounded-lg shadow-sm text-[13px]"
          >
            Ver resultados de negocio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md bg-amber-light border border-amber/30 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-amber-dark" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">{label}</div>
        <div className="text-[13px] font-semibold text-spot-dark truncate">{value}</div>
      </div>
    </div>
  )
}

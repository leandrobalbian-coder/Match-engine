'use client'
import { motion } from 'framer-motion'
import { Star, Check, ArrowRight, Send, Clock, MessageCircle, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { DATA } from '@/lib/data'
import { cn, formatMoney } from '@/lib/utils'

export function FichaSection({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full overflow-auto thin-scroll bg-spot-bg">
      <div className="px-8 py-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-amber-dark">
              <FileText className="w-3.5 h-3.5" /> MatchAgent · paso 3
            </div>
            <h1 className="text-[24px] font-black tracking-tight text-spot-dark mt-0.5">
              Ficha generada · listo para enviar
            </h1>
          </div>
          <button
            onClick={onNext}
            className="text-[12px] font-bold text-spot-mid hover:text-spot-dark inline-flex items-center gap-1.5"
          >
            Ver conversación en WhatsApp <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Ficha */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-spot-border rounded-xl shadow-card overflow-hidden"
          >
            <div className="bg-spot-charcoal px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-2xl bg-amber flex items-center justify-center text-spot-charcoal font-black text-sm">2</div>
              <div className="flex-1">
                <div className="text-white font-bold text-[14px]">Selección personalizada · Ana G.</div>
                <div className="text-white/60 text-[11px]">Basada en sus criterios · 18 marzo 2026 · 3 espacios</div>
              </div>
              <Badge tone="amber" uppercase>Spot2</Badge>
            </div>

            <div className="p-4 space-y-3">
              {DATA.espaciosMatch.map((e, i) => (
                <FichaRow key={e.id} espacio={e} index={i} />
              ))}
            </div>

            <div className="border-t border-spot-border bg-spot-bg/50 px-5 py-3 text-[12px] text-spot-mid font-medium">
              ¿Le interesa alguno? Responda directamente a este mensaje y agendamos visita.
            </div>
          </motion.div>

          {/* Send panel */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-spot-border rounded-xl shadow-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] uppercase tracking-wider font-bold text-spot-mid">
                  Mensaje WhatsApp · preview
                </h3>
                <Badge tone="green" uppercase>Optimizado</Badge>
              </div>
              <div className="bg-wa-bubbleIn border border-spot-border rounded-lg rounded-tl-sm p-3 text-[13px] text-spot-dark shadow-sm max-w-[85%]">
                <div className="font-bold text-spot-charcoal mb-1.5">¡Hola Ana! 👋</div>
                Soy <strong>MatchAgent de Spot2</strong>. Encontré 3 oficinas que coinciden con lo que buscas en Polanco/Lomas, en el rango de tu presupuesto. Te paso la selección 👇
                <div className="mt-2 text-[11px] text-spot-mid">12:42 · spot2.mx</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-3 gap-3"
            >
              <SendStat label="Tiempo de generación" value="4.2s" />
              <SendStat label="Match score promedio" value="88%" tone="amber" />
              <SendStat label="Canal" value="WhatsApp" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-alert-greenBg border-2 border-alert-green/30 rounded-xl p-5 flex items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                className="w-12 h-12 rounded-full bg-alert-green flex items-center justify-center shadow-lg"
              >
                <motion.svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M5 12l5 5L20 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  />
                </motion.svg>
              </motion.div>
              <div className="flex-1">
                <div className="font-bold text-alert-green text-[15px]">Enviado automáticamente</div>
                <div className="text-[12px] text-spot-mid mt-0.5 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> hace 4 segundos
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Send className="w-3 h-3" /> WhatsApp Business API
                  </span>
                </div>
              </div>
              <Badge tone="green" pulse uppercase>OK</Badge>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={onNext}
              className="w-full group bg-spot-charcoal hover:bg-spot-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-card"
            >
              <MessageCircle className="w-4 h-4 text-amber" />
              Ver conversación en WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FichaRow({ espacio, index }: { espacio: (typeof DATA.espaciosMatch)[number]; index: number }) {
  const isBest = index === 0
  const isWaiting = !espacio.disponible
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.18, duration: 0.45 }}
      className={cn(
        'border rounded-xl p-3 flex gap-3 items-stretch',
        isBest ? 'border-amber bg-amber-light' : 'border-spot-border bg-white',
      )}
    >
      <div
        className="w-32 shrink-0 rounded-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${isBest ? '#FFAA00' : '#6E717F'}26, ${isBest ? '#FFBB33' : '#434653'}40)`,
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-white/80 backdrop-blur px-1.5 py-0.5 rounded text-spot-dark">
          {espacio.id}
        </div>
        {isBest && (
          <div className="absolute bottom-2 left-2">
            <Badge tone="amber" uppercase className="!bg-amber !text-spot-charcoal !border-amber">
              <Star className="w-3 h-3" /> Mejor opción
            </Badge>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-bold text-spot-dark text-[14px]">{espacio.nombre}</h4>
          <Badge tone={espacio.score >= 90 ? 'green' : espacio.score >= 85 ? 'amber' : 'orange'} uppercase>
            {espacio.score}% match
          </Badge>
          {isWaiting && <Badge tone="gray" uppercase>{espacio.diasDisponible}d</Badge>}
        </div>
        <div className="text-[11px] text-spot-mid mt-0.5">
          {espacio.piso} · {espacio.zona} · Clase {espacio.clase}
        </div>
        <div className="mt-2 flex items-baseline gap-3 text-[13px]">
          <span className="font-black text-spot-dark">{formatMoney(espacio.precio)}</span>
          <span className="text-spot-mid">/ mes</span>
          <span className="font-bold text-spot-mid">·</span>
          <span className="font-bold text-spot-dark">{espacio.area} m²</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {espacio.amenidades.slice(0, 4).map((a) => (
            <span key={a} className="inline-flex items-center gap-1 text-[10px] bg-white border border-spot-border rounded px-1.5 py-0.5 text-spot-mid font-semibold">
              <Check className="w-2.5 h-2.5 text-alert-green" /> {a}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SendStat({ label, value, tone = 'gray' }: { label: string; value: string; tone?: 'gray' | 'amber' }) {
  return (
    <div className={cn(
      'border rounded-lg px-3 py-2.5',
      tone === 'amber' ? 'bg-amber-light border-amber/30' : 'bg-white border-spot-border',
    )}>
      <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">{label}</div>
      <div className={cn('font-black mt-0.5', tone === 'amber' ? 'text-amber-dark' : 'text-spot-dark')}>
        {value}
      </div>
    </div>
  )
}

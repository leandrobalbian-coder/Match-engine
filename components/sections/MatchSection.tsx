'use client'
import { motion } from 'framer-motion'
import { Building2, MapPin, Ruler, Wallet, Car, Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { Chip } from '@/components/ui/Chip'
import { Badge } from '@/components/ui/Badge'
import { FunnelChart } from '@/components/demo/FunnelChart'
import { DATA, FUNNEL_STEPS } from '@/lib/data'
import { cn, formatMoney } from '@/lib/utils'

export function MatchSection({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full overflow-auto thin-scroll bg-spot-bg">
      <div className="px-8 py-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-amber-dark">
              <Sparkles className="w-3.5 h-3.5" /> MatchAgent · paso 2
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-spot-dark mt-0.5">
              Matching en proceso · 5,554 → 3
            </h1>
          </div>
          <button
            onClick={onNext}
            className="text-[12px] font-bold text-spot-mid hover:text-spot-dark inline-flex items-center gap-1.5"
          >
            Ver ficha generada <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-5">
          {/* Left: requerimiento */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-xl border border-spot-border shadow-card p-5"
          >
            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber rounded-l-xl" />
            <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">
              El requerimiento
            </div>
            <h3 className="font-bold text-spot-dark text-[16px] mt-0.5">Ana G. busca:</h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: <Building2 />, text: 'Oficina corporativa' },
                { icon: <Ruler />, text: '150 – 250 m²' },
                { icon: <MapPin />, text: 'Polanco / Lomas' },
                { icon: <Wallet />, text: 'Hasta $90K MXN/mes' },
                { icon: <Car />, text: 'Estacionamiento' },
                { icon: <Calendar />, text: 'Disponible inmediato' },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <Chip icon={c.icon} tone="amber">{c.text}</Chip>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-t border-spot-border pt-4">
              <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">
                Interpretado por el agente
              </div>
              <ul className="mt-2 space-y-1.5 text-[12px] text-spot-mid">
                <li className="flex items-start gap-2">
                  <span className="text-amber font-black mt-0.5">›</span>
                  Perfil corporativo medio-alto · clase A preferida
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-black mt-0.5">›</span>
                  Sensible a tiempos de traslado desde Polanco
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-black mt-0.5">›</span>
                  Probable equipo de 12–18 personas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-black mt-0.5">›</span>
                  Ventana de decisión: ≤ 30 días
                </li>
              </ul>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <KPI label="Lead" value="#8412" />
              <KPI label="Score" value="A+" tone="amber" />
              <KPI label="Tiempo" value="0.4s" />
            </div>
          </motion.div>

          {/* Right: funnel + cards */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl border border-spot-border shadow-card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">
                    Funnel de matching · semántico
                  </div>
                  <h3 className="font-bold text-spot-dark text-[16px] mt-0.5">
                    De <span className="text-amber-dark">5,554 espacios</span> → 3 matches
                  </h3>
                </div>
                <Badge tone="amber" pulse uppercase>Dijin MCP</Badge>
              </div>
              <FunnelChart steps={FUNNEL_STEPS} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {DATA.espaciosMatch.map((e, i) => (
                <MatchCard key={e.id} espacio={e} delay={0.4 + i * 0.18} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPI({ label, value, tone = 'gray' }: { label: string; value: string; tone?: 'gray' | 'amber' }) {
  return (
    <div className={cn(
      'border rounded-lg px-2.5 py-2',
      tone === 'amber' ? 'bg-amber-light border-amber/30' : 'bg-spot-bg border-spot-border',
    )}>
      <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">{label}</div>
      <div className={cn('font-black mt-0.5', tone === 'amber' ? 'text-amber-dark' : 'text-spot-dark')}>
        {value}
      </div>
    </div>
  )
}

function MatchCard({
  espacio,
  delay,
}: {
  espacio: (typeof DATA.espaciosMatch)[number]
  delay: number
}) {
  const score = espacio.score
  const scoreTone: 'green' | 'gray' = score >= 85 ? 'green' : 'gray'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className={cn(
        'group bg-white rounded-xl border-2 shadow-card p-4 cursor-pointer transition-all',
        score >= 90 ? 'border-spot-dark/15 hover:border-spot-dark/30' : 'border-spot-border hover:border-spot-mid/40',
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge tone={scoreTone} uppercase>{score}% match</Badge>
        <span className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">{espacio.id}</span>
      </div>
      <div
        className="aspect-[16/10] rounded-lg overflow-hidden mb-3 relative bg-gradient-to-br from-spot-bg to-spot-border"
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/85 backdrop-blur px-2 py-0.5 rounded text-spot-dark">
            Clase {espacio.clase}
          </span>
          {espacio.disponible ? (
            <Badge tone="green" uppercase>Inmediato</Badge>
          ) : (
            <Badge tone="gray" uppercase>{espacio.diasDisponible}d</Badge>
          )}
        </div>
      </div>
      <h4 className="font-bold text-spot-dark text-[14px] leading-tight">{espacio.nombre}</h4>
      <div className="text-[12px] text-spot-mid mt-0.5">{espacio.piso} · {espacio.zona}</div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-spot-border">
        <div>
          <div className="text-[10px] uppercase font-bold text-spot-mid">Área</div>
          <div className="font-black text-spot-dark">{espacio.area} m²</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-spot-mid">Renta / mes</div>
          <div className="font-black text-spot-dark">{formatMoney(espacio.precio)}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {espacio.amenidades.slice(0, 3).map((a) => (
          <span key={a} className="text-[10px] bg-spot-bg border border-spot-border rounded px-1.5 py-0.5 text-spot-mid font-semibold">
            {a}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

'use client'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { ViewShell } from './ViewShell'
import { Badge } from '@/components/ui/Badge'
import { DATA } from '@/lib/data'
import { cn, formatMoney } from '@/lib/utils'

const EXTRA_SPACES = [
  {
    id: 'S-5102',
    nombre: 'Reforma Latino',
    piso: 'Piso 22',
    area: 320,
    precio: 145000,
    zona: 'Reforma',
    clase: 'A+',
    amenidades: ['Vista panorámica', 'Estacionamiento', 'Concierge', 'Gym'],
    disponible: true,
    diasDisponible: 0,
    score: 91,
    tipo: 'office' as const,
  },
  {
    id: 'S-2841',
    nombre: 'Parque Industrial Vallejo',
    piso: 'Nave 4',
    area: 3200,
    precio: 220000,
    zona: 'Vallejo',
    clase: 'B',
    amenidades: ['Andén de carga', 'Patio maniobras', 'Seguridad'],
    disponible: true,
    diasDisponible: 0,
    score: 86,
    tipo: 'industrial' as const,
  },
  {
    id: 'S-1947',
    nombre: 'Local Roma Norte',
    piso: 'Planta baja',
    area: 130,
    precio: 52000,
    zona: 'Roma Norte',
    clase: 'A',
    amenidades: ['Esquina', 'Frente vidriado', 'Cuarto de servicio'],
    disponible: true,
    diasDisponible: 0,
    score: 84,
    tipo: 'retail' as const,
  },
] as const

const ALL_SPACES: ReadonlyArray<{
  id: string
  nombre: string
  piso: string
  area: number
  precio: number
  zona: string
  clase: string
  amenidades: ReadonlyArray<string>
  disponible: boolean
  diasDisponible: number
  score: number
  tipo: 'office' | 'industrial' | 'retail'
}> = [
  ...DATA.espaciosMatch.map((s) => ({ ...s, tipo: 'office' as const })),
  ...EXTRA_SPACES,
]

type Tipo = 'todos' | 'office' | 'industrial' | 'retail'

export function EspaciosView({
  onBack,
  onJumpToFlow,
}: {
  onBack: () => void
  onJumpToFlow: (i: number) => void
}) {
  const [tipo, setTipo] = useState<Tipo>('todos')
  const [zona, setZona] = useState<string>('todas')

  const zonas = useMemo(() => Array.from(new Set(ALL_SPACES.map((s) => s.zona))), [])

  const filtered = useMemo(() => {
    return ALL_SPACES.filter(
      (s) => (tipo === 'todos' || s.tipo === tipo) && (zona === 'todas' || s.zona === zona),
    )
  }, [tipo, zona])

  return (
    <ViewShell
      eyebrow="Vista contextual · Espacios"
      title="Inventario activo · spots disponibles"
      description="5,554 espacios públicos disponibles hoy en la plataforma. Mostrando una muestra real."
      badge={{ text: '5,554 spots activos', tone: 'amber' }}
      onBack={onBack}
      cta={{ label: 'Ver el matching en acción', onClick: () => onJumpToFlow(3) }}
    >
      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <FilterTabs label="Tipo" value={tipo} onChange={(v) => setTipo(v as Tipo)} options={[
          { id: 'todos', label: 'Todos' },
          { id: 'office', label: 'Oficinas' },
          { id: 'industrial', label: 'Industrial' },
          { id: 'retail', label: 'Retail' },
        ]} />
        <span className="w-px h-6 bg-spot-border" />
        <FilterTabs label="Zona" value={zona} onChange={setZona} options={[
          { id: 'todas', label: 'Todas' },
          ...zonas.map((z) => ({ id: z, label: z })),
        ]} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <SpaceCard key={s.id} espacio={s} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full bg-white border border-spot-border rounded-xl p-10 text-center text-spot-mid font-semibold">
            Ningún espacio coincide con los filtros aplicados.
          </div>
        )}
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-amber-light border border-amber/30 rounded-xl px-6 py-5 flex items-center gap-4"
      >
        <Sparkles className="w-5 h-5 text-amber-dark shrink-0" />
        <div className="flex-1">
          <h4 className="font-bold text-spot-dark">El 64% del inventario no se actualiza en los últimos 30 días.</h4>
          <p className="text-[13px] text-spot-mid mt-0.5">
            Match Engine usa el <strong className="text-spot-dark">100% del inventario activo</strong> — no solo los spots que el broker recuerda.
          </p>
        </div>
      </motion.div>
    </ViewShell>
  )
}

function FilterTabs<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: { id: T; label: string }[]
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-spot-border rounded-md px-2 py-1.5">
      <span className="text-[10px] uppercase tracking-wider font-bold text-spot-mid pl-1">{label}</span>
      <div className="flex gap-1">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              'px-2.5 py-1 rounded text-[11px] font-bold transition-colors',
              value === o.id ? 'bg-spot-charcoal text-white' : 'text-spot-mid hover:bg-spot-bg',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function SpaceCard({
  espacio,
  index,
}: {
  espacio: (typeof ALL_SPACES)[number]
  index: number
}) {
  const score = espacio.score
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.07 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-xl border border-spot-border shadow-card p-4 hover:border-amber transition-all"
    >
      <div
        className="aspect-[16/10] rounded-lg overflow-hidden mb-3 relative"
        style={{
          background: `linear-gradient(135deg, ${score >= 90 ? '#FFAA00' : '#6E717F'}26, ${score >= 90 ? '#FFBB33' : '#434653'}40)`,
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/85 backdrop-blur px-1.5 py-0.5 rounded text-spot-dark">
            {espacio.id}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/85 backdrop-blur px-2 py-0.5 rounded text-spot-dark">
            Clase {espacio.clase}
          </span>
          {espacio.disponible ? (
            <Badge tone="green" uppercase>Disponible hoy</Badge>
          ) : (
            <Badge tone="amber" uppercase>{espacio.diasDisponible}d</Badge>
          )}
        </div>
      </div>
      <h4 className="font-bold text-spot-dark text-[14px] leading-tight">{espacio.nombre}</h4>
      <div className="text-[12px] text-spot-mid mt-0.5 flex items-center gap-1">
        <MapPin className="w-3 h-3" /> {espacio.zona} · {espacio.piso}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-spot-border">
        <div>
          <div className="text-[10px] uppercase font-bold text-spot-mid">Área</div>
          <div className="font-black text-spot-dark text-[14px] tabular-nums">
            {espacio.area.toLocaleString('es-MX')} m²
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-spot-mid">Renta / mes</div>
          <div className="font-black text-spot-dark text-[14px]">{formatMoney(espacio.precio)}</div>
        </div>
      </div>
    </motion.div>
  )
}

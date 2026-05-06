'use client'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, AlertTriangle, Sparkles } from 'lucide-react'
import { ViewShell } from './ViewShell'
import { Badge } from '@/components/ui/Badge'
import { DATA } from '@/lib/data'
import { cn } from '@/lib/utils'

type Filt = 'todos' | 'unassigned' | 'd7' | 'd14' | 'office' | 'industrial'

const EXTRA_LEADS = [
  {
    id: 8194,
    nombre: 'Pedro R.',
    empresa: 'Pedro Ramírez (cuenta personal)',
    busca: 'Oficina ejecutiva',
    area: '60 – 90 m²',
    zona: 'Roma Norte / Juárez',
    presupuesto: '$32,000 MXN/mes',
    horasSinRespuesta: 12,
    tipo: 'office' as const,
  },
  {
    id: 8082,
    nombre: 'Servicios Médicos del Valle',
    empresa: 'SMV Holdings',
    busca: 'Consultorios médicos',
    area: '180 – 240 m²',
    zona: 'Del Valle / Coyoacán',
    presupuesto: '$78,000 MXN/mes',
    horasSinRespuesta: 92,
    tipo: 'office' as const,
  },
] as const

const ALL_LEADS = [
  ...DATA.leadsDemo.map((l) => ({
    ...l,
    tipo: l.busca.toLowerCase().includes('bodega') || l.busca.toLowerCase().includes('nave')
      ? ('industrial' as const)
      : ('office' as const),
  })),
  ...EXTRA_LEADS,
]

export function LeadsView({
  onBack,
  onJumpToFlow,
}: {
  onBack: () => void
  onJumpToFlow: (i: number) => void
}) {
  const [filter, setFilter] = useState<Filt>('todos')

  const filtered = useMemo(() => {
    return ALL_LEADS.filter((l) => {
      if (filter === 'unassigned') return l.horasSinRespuesta > 0
      if (filter === 'd7') return l.horasSinRespuesta >= 24 * 7
      if (filter === 'd14') return l.horasSinRespuesta >= 24 * 14
      if (filter === 'office') return l.tipo === 'office'
      if (filter === 'industrial') return l.tipo === 'industrial'
      return true
    })
  }, [filter])

  const filters: { id: Filt; label: string; count?: number }[] = [
    { id: 'todos', label: 'Todos', count: ALL_LEADS.length },
    { id: 'unassigned', label: 'Sin asignar' },
    { id: 'd7', label: '+7 días sin respuesta' },
    { id: 'd14', label: '+14 días' },
    { id: 'office', label: 'Oficinas' },
    { id: 'industrial', label: 'Industrial' },
  ]

  return (
    <ViewShell
      eyebrow="Vista contextual · Leads"
      title="Leads activos · sin atención"
      description="3,636 prospectos self-service sin ninguna respuesta. Vista parcial — los datos completos viven en la BD de Spot2."
      badge={{ text: '3,636 leads activos', tone: 'red' }}
      onBack={onBack}
      cta={{ label: 'Ver cómo MatchAgent los atiende', onClick: () => onJumpToFlow(2) }}
    >
      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-spot-border rounded-xl shadow-card p-3 flex items-center gap-2 flex-wrap"
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-spot-mid px-2">
          <Filter className="w-3 h-3" /> Filtros
        </span>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-3 py-1.5 rounded-md border text-[12px] font-bold transition-colors inline-flex items-center gap-1.5',
              filter === f.id
                ? 'bg-amber border-amber text-spot-charcoal'
                : 'bg-spot-bg border-spot-border text-spot-mid hover:bg-white',
            )}
          >
            {f.label}
            {f.count !== undefined && (
              <span className={cn(
                'text-[10px] font-black tabular-nums',
                filter === f.id ? 'text-spot-charcoal/70' : 'text-spot-dark',
              )}>
                {f.count}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Tabla */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-spot-border rounded-xl shadow-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-spot-border flex items-center justify-between">
          <div>
            <h3 className="font-bold text-spot-dark text-[14px]">Listado de leads</h3>
            <p className="text-[11px] text-spot-mid font-medium mt-0.5">
              Mostrando {filtered.length} · todos cumplen criterios completos · ningún broker asignado
            </p>
          </div>
          <Badge tone="live" pulse uppercase>BD live</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-spot-bg/60 text-spot-mid">
                <Th>Prospecto</Th>
                <Th>Tipo</Th>
                <Th>Zona</Th>
                <Th className="text-right">Presupuesto</Th>
                <Th className="text-right">Sin respuesta</Th>
                <Th>Estado</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => {
                const isCritical = l.horasSinRespuesta > 24
                return (
                  <motion.tr
                    key={l.id}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-spot-border hover:bg-amber-light/40 transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center font-black text-[10px] text-white',
                          i % 4 === 0 ? 'bg-amber' : i % 4 === 1 ? 'bg-spot-charcoal' : i % 4 === 2 ? 'bg-alert-orange' : 'bg-spot-mid',
                        )}>
                          {l.nombre.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-spot-dark">{l.nombre}</div>
                          <div className="text-[11px] text-spot-mid">#{l.id} · {l.empresa.length > 28 ? l.empresa.slice(0, 28) + '…' : l.empresa}</div>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <div className="text-spot-dark font-semibold">{l.busca}</div>
                      <div className="text-[11px] text-spot-mid">{l.area}</div>
                    </Td>
                    <Td>
                      <div className="text-spot-dark">{l.zona.split(' / ')[0]}</div>
                      <div className="text-[11px] text-spot-mid">{l.zona.split(' / ')[1] ?? ''}</div>
                    </Td>
                    <Td className="text-right font-bold text-spot-dark">{l.presupuesto}</Td>
                    <Td className="text-right">
                      <span className={cn(
                        'font-black tabular-nums',
                        isCritical ? 'text-alert-red' : 'text-alert-orange',
                      )}>
                        {l.horasSinRespuesta < 24
                          ? `${l.horasSinRespuesta}h`
                          : `${Math.floor(l.horasSinRespuesta / 24)}d ${l.horasSinRespuesta % 24}h`}
                      </span>
                    </Td>
                    <Td>
                      {isCritical ? (
                        <Badge tone="red"><AlertTriangle className="w-3 h-3" /> Sin contacto</Badge>
                      ) : (
                        <Badge tone="amber">Nuevo</Badge>
                      )}
                    </Td>
                  </motion.tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-spot-mid font-semibold">
                    Ningún lead coincide con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insight strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-spot-charcoal text-white rounded-xl px-6 py-5 flex items-center gap-4"
      >
        <Sparkles className="w-5 h-5 text-amber shrink-0" />
        <div className="flex-1">
          <h4 className="font-bold text-white">MatchAgent atendería todos estos leads en menos de 5 minutos.</h4>
          <p className="text-[13px] text-white/70 mt-0.5">
            Hoy, el service desk manual atiende 9 leads por semana. Con Match Engine son 3,636 en paralelo.
          </p>
        </div>
        <button
          onClick={() => onJumpToFlow(2)}
          className="bg-amber hover:bg-amber-mid text-spot-charcoal font-bold px-4 py-2.5 rounded-md text-[12px] shrink-0"
        >
          Ver cómo funciona →
        </button>
      </motion.div>
    </ViewShell>
  )
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn('text-left text-[10px] uppercase tracking-wider font-bold px-5 py-2.5', className)}>{children}</th>
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn('px-5 py-3 align-middle', className)}>{children}</td>
}

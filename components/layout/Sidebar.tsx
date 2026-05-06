'use client'
import { LayoutDashboard, Users, Building2, UserCog, Sparkles, MapPin, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SCREENS } from '@/lib/data'

export type SidebarView = 'dashboard' | 'leads' | 'espacios' | 'brokers' | 'documentacion' | null

type Item = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  view: SidebarView
  section: 'Contexto' | 'Agente IA'
}

const ITEMS: Item[] = [
  { icon: LayoutDashboard, label: 'Dashboard',    view: 'dashboard',    section: 'Contexto' },
  { icon: Users,           label: 'Leads',        view: 'leads',        section: 'Contexto' },
  { icon: Building2,       label: 'Espacios',     view: 'espacios',     section: 'Contexto' },
  { icon: UserCog,         label: 'Brokers',      view: 'brokers',      section: 'Contexto' },
  { icon: Sparkles,        label: 'MatchAgent',   view: null,           section: 'Agente IA' },
  { icon: FileText,        label: 'Documentación', view: 'documentacion', section: 'Agente IA' },
]

export function Sidebar({
  current,
  onSelect,
  onViewSelect,
  activeView,
  className,
}: {
  current: number
  onSelect: (i: number) => void
  onViewSelect: (view: SidebarView) => void
  activeView: SidebarView
  className?: string
}) {
  const renderSection = (section: 'Contexto' | 'Agente IA') => {
    const items = ITEMS.filter((it) => it.section === section)
    return (
      <div key={section} className="mt-2">
        <div className="px-5 pt-2 pb-1.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
            {section}
          </span>
        </div>
        <div className="px-2 space-y-0.5">
          {items.map((it) => {
            const Icon = it.icon
            const isMatchAgent = it.view === null
            const isActive =
              (isMatchAgent && activeView === null) ||
              (!isMatchAgent && activeView === it.view)
            return (
              <button
                key={it.label}
                onClick={() => {
                  if (isMatchAgent) {
                    onViewSelect(null)
                    if (current === 0) onSelect(1)
                  } else {
                    onViewSelect(it.view)
                  }
                }}
                className={cn(
                  'group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-semibold transition-colors text-left',
                  isActive
                    ? 'bg-white/[0.06] text-white'
                    : 'text-white/55 hover:bg-white/[0.04] hover:text-white/85',
                )}
              >
                {isActive && (
                  <span
                    className={cn(
                      'absolute left-0 top-2 bottom-2 w-[3px] rounded-r',
                      isMatchAgent ? 'bg-amber' : 'bg-white/40',
                    )}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{it.label}</span>
                {isMatchAgent && (
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber bg-amber/10 border border-amber/30 rounded px-1.5 py-0.5">
                    AI
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'w-[240px] shrink-0 bg-spot-charcoal text-white/80 flex flex-col h-full',
        className,
      )}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-2xl bg-amber flex items-center justify-center text-spot-charcoal font-black text-sm">
              2
            </div>
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            spot<span className="text-amber">2</span>
          </span>
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40 font-bold">
          AI Edition · 2026
        </div>
      </div>

      {/* Nav with sections */}
      <nav className="flex-1 py-1 overflow-y-auto thin-scroll">
        {renderSection('Contexto')}
        {renderSection('Agente IA')}
      </nav>

      {/* Mini progress dots */}
      <div className="px-3 pt-3 pb-4 border-t border-white/5">
        <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-2 px-2">
          {activeView ? 'Vista contextual' : `Demo · pantalla ${Math.max(current, 1)} de 7`}
        </div>
        {!activeView && (
          <div className="px-2 flex flex-wrap gap-1.5">
            {SCREENS.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onViewSelect(null)
                  onSelect(s.id)
                }}
                title={s.label}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  current === s.id
                    ? 'bg-amber w-6'
                    : current > s.id
                    ? 'bg-amber/40 w-1.5'
                    : 'bg-white/15 w-1.5 hover:bg-white/30',
                )}
              />
            ))}
          </div>
        )}
        <div className="mt-3 px-2">
          <div className="flex items-center gap-1.5 text-[10px] text-white/40">
            <MapPin className="w-3 h-3" /> Ciudad de México · MX
          </div>
          <div className="text-[9px] text-white/35 mt-1">
            Leandro Balbian · Product Designer
          </div>
        </div>
      </div>
    </aside>
  )
}

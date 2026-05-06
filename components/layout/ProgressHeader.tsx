'use client'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SCREENS } from '@/lib/data'

const STEP_LABELS_SHORT = [
  'Inicio', 'Problema', 'Radar', 'Match', 'Ficha', 'WhatsApp', 'Confirmar', 'ROI',
]

export function ProgressHeader({
  current,
  onPrev,
  onNext,
  onGoto,
  presentation,
  togglePresentation,
  sidebarViewLabel,
  onClearView,
}: {
  current: number
  onPrev: () => void
  onNext: () => void
  onGoto: (i: number) => void
  presentation: boolean
  togglePresentation: () => void
  sidebarViewLabel?: string | null
  onClearView?: () => void
}) {
  const isContextView = !!sidebarViewLabel

  return (
    <header className="h-14 border-b border-spot-border bg-white flex items-center px-5 gap-4 sticky top-0 z-30">
      {/* Breadcrumb izquierdo */}
      <div className="flex items-center gap-2 min-w-0 w-[180px] shrink-0">
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-spot-mid">
          MATCH ENGINE
        </span>
        {isContextView && (
          <>
            <span className="text-[10px] text-spot-mid">/</span>
            <span className="text-[11px] font-bold text-spot-dark truncate">{sidebarViewLabel}</span>
          </>
        )}
      </div>

      {/* Centro */}
      <div className="flex-1 flex items-center justify-center">
        {isContextView ? (
          <button
            onClick={onClearView}
            className="text-[11px] font-bold text-spot-mid hover:text-spot-dark inline-flex items-center gap-1.5 border border-spot-border rounded-md px-3 py-1.5 bg-spot-bg hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Volver al flujo de la demo
          </button>
        ) : (
          <div className="flex items-center gap-0">
            {SCREENS.map((screen, idx) => {
              const isCompleted = current > screen.id
              const isActive = current === screen.id
              const isLast = idx === SCREENS.length - 1
              return (
                <div key={screen.id} className="flex items-center">
                  <button
                    onClick={() => onGoto(screen.id)}
                    className="flex flex-col items-center gap-1 group px-1.5"
                    title={screen.label}
                    aria-label={`Ir a ${screen.label}`}
                  >
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all',
                        isCompleted && 'bg-amber text-spot-charcoal',
                        isActive && 'bg-amber text-spot-charcoal ring-2 ring-amber/30 ring-offset-2',
                        !isCompleted && !isActive && 'bg-spot-border text-spot-mid group-hover:bg-spot-mid/40',
                      )}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3.5} /> : screen.id + 1}
                    </div>
                    <span
                      className={cn(
                        'text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap leading-none',
                        isActive
                          ? 'text-amber-dark opacity-100'
                          : 'text-spot-mid opacity-0 group-hover:opacity-70',
                      )}
                    >
                      {STEP_LABELS_SHORT[screen.id] || screen.label}
                    </span>
                  </button>
                  {!isLast && (
                    <div
                      className={cn(
                        'h-[1.5px] w-5 mx-0.5 transition-all',
                        isCompleted ? 'bg-amber' : 'bg-spot-border',
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Controles derecha */}
      <div className="flex items-center gap-1 w-[180px] justify-end shrink-0">
        <button
          onClick={togglePresentation}
          className="h-7 px-2 rounded border border-spot-border text-spot-mid hover:bg-spot-bg flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors"
          title="Modo presentación (P)"
        >
          {presentation ? (
            <>
              <Minimize2 className="w-3 h-3" /> Salir
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3" /> Pres.
            </>
          )}
        </button>
        <div className="ml-1 flex items-center bg-spot-bg border border-spot-border rounded overflow-hidden">
          <button
            onClick={onPrev}
            disabled={current === 0 || isContextView}
            className="h-7 w-7 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed text-spot-dark flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 text-[10px] font-bold text-spot-mid border-x border-spot-border h-7 flex items-center tabular-nums">
            {isContextView ? '··' : `${current + 1}/${SCREENS.length}`}
          </span>
          <button
            onClick={onNext}
            disabled={current === SCREENS.length - 1 || isContextView}
            className="h-7 w-7 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed text-spot-dark flex items-center justify-center transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}

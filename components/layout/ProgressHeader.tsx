'use client'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SCREENS } from '@/lib/data'

export function ProgressHeader({
  current,
  onPrev,
  onNext,
  presentation,
  togglePresentation,
}: {
  current: number
  onPrev: () => void
  onNext: () => void
  presentation: boolean
  togglePresentation: () => void
}) {
  const currentScreen = SCREENS.find((s) => s.id === current)

  return (
    <header className="h-12 border-b border-spot-border bg-white/80 backdrop-blur flex items-center px-5 gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-spot-mid">
          MATCH ENGINE · DEMO
        </span>
        <span className="text-[10px] text-spot-mid">/</span>
        <span className="text-[12px] font-bold text-spot-dark">{currentScreen?.label}</span>
      </div>

      <div className="flex-1 flex items-center justify-center gap-1.5">
        {SCREENS.map((s) => (
          <span
            key={s.id}
            className={cn(
              'h-1 rounded-full transition-all',
              current === s.id
                ? 'w-8 bg-amber'
                : current > s.id
                ? 'w-3 bg-amber/40'
                : 'w-3 bg-spot-border',
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={togglePresentation}
          className="h-8 px-2 rounded-md border border-spot-border text-spot-mid hover:bg-spot-bg flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
          title="Modo presentación (P)"
        >
          {presentation ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          {presentation ? 'Salir' : 'Pres.'}
        </button>
        <div className="ml-2 flex items-center bg-spot-bg border border-spot-border rounded-md overflow-hidden">
          <button
            onClick={onPrev}
            disabled={current === 0}
            className="h-8 px-2 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed text-spot-dark"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 text-[11px] font-bold text-spot-mid border-x border-spot-border h-8 flex items-center tabular-nums">
            {current + 1} / {SCREENS.length}
          </span>
          <button
            onClick={onNext}
            disabled={current === SCREENS.length - 1}
            className="h-8 px-2 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed text-spot-dark"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

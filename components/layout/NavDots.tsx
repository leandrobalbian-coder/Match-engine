'use client'
import { cn } from '@/lib/utils'
import { SCREENS } from '@/lib/data'

export function NavDots({
  current,
  onSelect,
  className,
}: {
  current: number
  onSelect: (i: number) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3',
        className,
      )}
    >
      {SCREENS.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          title={s.label}
          aria-label={s.label}
          className={cn(
            'group relative flex items-center justify-end gap-2 transition-all',
          )}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-spot-charcoal text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {s.label}
          </span>
          <span
            className={cn(
              'block transition-all rounded-full',
              current === s.id
                ? 'w-4 h-2 bg-amber'
                : 'w-2 h-2 bg-spot-mid/40 hover:bg-spot-mid',
            )}
          />
        </button>
      ))}
    </div>
  )
}

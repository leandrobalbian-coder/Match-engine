import { cn } from '@/lib/utils'

export function Chip({
  children,
  icon,
  className,
  tone = 'default',
}: {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  tone?: 'default' | 'amber' | 'dark'
}) {
  const tones = {
    default: 'bg-spot-bg border-spot-border text-spot-dark',
    amber: 'bg-amber-light border-amber/30 text-amber-dark',
    dark: 'bg-spot-charcoal/5 border-spot-charcoal/20 text-spot-charcoal',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border rounded-md px-2 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {icon && <span className="shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>}
      {children}
    </span>
  )
}

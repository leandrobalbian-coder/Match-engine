import { cn } from '@/lib/utils'

type Tone = 'amber' | 'red' | 'green' | 'gray' | 'dark' | 'blue' | 'orange' | 'live'

const toneClass: Record<Tone, string> = {
  amber: 'bg-amber-light text-amber-dark border-amber/40',
  red: 'bg-alert-redBg text-alert-red border-alert-red/30',
  green: 'bg-alert-greenBg text-alert-green border-alert-green/30',
  gray: 'bg-spot-bg text-spot-mid border-spot-border',
  dark: 'bg-spot-charcoal text-white border-spot-charcoal',
  blue: 'bg-alert-blueBg text-alert-blue border-alert-blue/30',
  orange: 'bg-orange-50 text-alert-orange border-alert-orange/30',
  live: 'bg-alert-greenBg text-alert-green border-alert-green/30',
}

export function Badge({
  children,
  tone = 'gray',
  className,
  pulse = false,
  uppercase = false,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
  pulse?: boolean
  uppercase?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide',
        uppercase && 'uppercase',
        toneClass[tone],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-50 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}

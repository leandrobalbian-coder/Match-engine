'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type AgentLine = { text: string; finalSuccess?: boolean }

export function AgentThinking({
  lines,
  totalDurationMs = 3200,
  startDelay = 250,
  onComplete,
  onProgress,
  className,
}: {
  lines: AgentLine[]
  /** Total duration of the typewriter animation, including pauses between lines. */
  totalDurationMs?: number
  startDelay?: number
  onComplete?: () => void
  onProgress?: (lineIndex: number, totalLines: number) => void
  className?: string
}) {
  const [displayed, setDisplayed] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    setDisplayed([])
    setDone(false)

    // Distribute total time across all characters + small pauses between lines.
    const totalChars = lines.reduce((acc, l) => acc + l.text.length, 0)
    // Reserve ~25% of the total for inter-line pauses; rest for typing.
    const typingBudget = Math.max(1200, totalDurationMs * 0.78)
    const pauseBudget = Math.max(200, totalDurationMs - typingBudget)
    const charDelay = Math.max(8, Math.floor(typingBudget / Math.max(1, totalChars)))
    const lineDelay = Math.floor(pauseBudget / Math.max(1, lines.length))

    const run = async () => {
      await wait(startDelay)
      const acc: string[] = []
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        let cur = ''
        for (let c = 0; c < line.text.length; c++) {
          if (cancelled) return
          cur += line.text[c]
          const next = [...acc, cur]
          setDisplayed(next)
          await wait(charDelay)
        }
        acc.push(cur)
        onProgress?.(i + 1, lines.length)
        if (i < lines.length - 1) await wait(lineDelay)
      }
      if (!cancelled) {
        setDone(true)
        onComplete?.()
      }
    }
    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, totalDurationMs, startDelay])

  return (
    <div
      className={cn(
        'rounded-xl bg-spot-charcoal text-emerald-300 font-mono text-[13px] leading-[1.65] p-5 shadow-card',
        'border border-white/10',
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-white/40 text-[11px] font-bold uppercase tracking-wider">
          MatchAgent · razonamiento
        </span>
      </div>
      <div className="space-y-1 min-h-[180px]">
        {displayed.map((text, i) => {
          const isFinalSuccess = lines[i]?.finalSuccess === true
          return (
            <div
              key={i}
              className={cn(
                'whitespace-pre-wrap break-words',
                isFinalSuccess && 'text-[#22C55E] font-bold',
              )}
            >
              {!isFinalSuccess && (
                <span className="text-emerald-500/60 select-none mr-2">›</span>
              )}
              {text}
              {i === displayed.length - 1 && !done && (
                <span className="inline-block w-2 h-4 bg-emerald-300 align-middle ml-0.5 animate-cursor-blink" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

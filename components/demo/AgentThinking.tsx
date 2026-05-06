'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Line = { text: string; pause?: number }

export function AgentThinking({
  lines,
  charDelay = 22,
  lineDelay = 350,
  startDelay = 300,
  className,
}: {
  lines: Line[]
  charDelay?: number
  lineDelay?: number
  startDelay?: number
  className?: string
}) {
  const [displayed, setDisplayed] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    setDisplayed([])
    setDone(false)

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
        await wait((line.pause ?? lineDelay))
      }
      if (!cancelled) setDone(true)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [lines, charDelay, lineDelay, startDelay])

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
      <div className="space-y-1 min-h-[160px]">
        {displayed.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            <span className="text-emerald-500/60 select-none mr-2">›</span>
            {line}
            {i === displayed.length - 1 && !done && (
              <span className="inline-block w-2 h-4 bg-emerald-300 align-middle ml-0.5 animate-cursor-blink" />
            )}
          </div>
        ))}
        {done && (
          <div className="pt-1">
            <span className="text-emerald-500/60 select-none mr-2">›</span>
            <span className="inline-block w-2 h-4 bg-emerald-300 align-middle ml-0.5 animate-cursor-blink" />
          </div>
        )}
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

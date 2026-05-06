'use client'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from '@/components/layout/Sidebar'
import { ProgressHeader } from '@/components/layout/ProgressHeader'
import { NavDots } from '@/components/layout/NavDots'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { RadarSection } from '@/components/sections/RadarSection'
import { MatchSection } from '@/components/sections/MatchSection'
import { FichaSection } from '@/components/sections/FichaSection'
import { WhatsAppSection } from '@/components/sections/WhatsAppSection'
import { ConfirmSection } from '@/components/sections/ConfirmSection'
import { ImpactSection } from '@/components/sections/ImpactSection'
import { SCREENS } from '@/lib/data'
import { screenVariants } from '@/lib/animations'

const TOTAL = SCREENS.length

export default function DemoPage() {
  const [current, setCurrent] = useState(0)
  const [presentation, setPresentation] = useState(false)

  const next = useCallback(() => setCurrent((c) => Math.min(TOTAL - 1, c + 1)), [])
  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const goto = useCallback((i: number) => setCurrent(Math.max(0, Math.min(TOTAL - 1, i))), [])
  const togglePres = useCallback(() => setPresentation((p) => !p), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault()
        togglePres()
      } else if (e.key.toLowerCase() === 'h' || e.key === 'Home') {
        e.preventDefault()
        goto(0)
      } else if (e.key === 'Escape') {
        if (presentation) setPresentation(false)
      } else if (/^[0-7]$/.test(e.key)) {
        goto(parseInt(e.key, 10))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, togglePres, goto, presentation])

  // Hero is full-bleed, others have sidebar/header
  const isHero = current === 0
  const showShell = !isHero && !presentation

  const sectionEl = (() => {
    switch (current) {
      case 0: return <HeroSection onStart={next} />
      case 1: return <ProblemSection onActivate={next} />
      case 2: return <RadarSection onNext={next} />
      case 3: return <MatchSection onNext={next} />
      case 4: return <FichaSection onNext={next} />
      case 5: return <WhatsAppSection onNext={next} />
      case 6: return <ConfirmSection onNext={next} />
      case 7: return <ImpactSection onRestart={() => goto(0)} />
      default: return null
    }
  })()

  return (
    <div className="fixed inset-0 bg-spot-bg flex">
      {showShell && <Sidebar current={current} onSelect={goto} />}

      <div className="flex-1 flex flex-col min-w-0">
        {showShell && (
          <ProgressHeader
            current={current}
            onPrev={prev}
            onNext={next}
            presentation={presentation}
            togglePresentation={togglePres}
          />
        )}

        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {sectionEl}
            </motion.div>
          </AnimatePresence>
        </main>

        {!isHero && presentation && (
          <button
            onClick={togglePres}
            className="absolute top-4 right-4 z-50 bg-white/90 border border-spot-border rounded-md text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 text-spot-dark hover:bg-white"
          >
            Salir presentación · Esc
          </button>
        )}
      </div>

      {!isHero && !presentation && <NavDots current={current} onSelect={goto} />}

      {/* Hint */}
      {isHero && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold pointer-events-none">
          ← / → navegar  ·  P presentación  ·  0–7 ir a pantalla
        </div>
      )}
    </div>
  )
}

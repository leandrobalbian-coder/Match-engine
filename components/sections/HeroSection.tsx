'use client'
import { motion } from 'framer-motion'
import { Zap, Clock, DollarSign } from 'lucide-react'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { HeroPhone } from '@/components/demo/HeroPhone'
import { DATA } from '@/lib/data'

export function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050505] text-white flex">
      {/* Background — pure black with a single very faint radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 45% at 38% 50%, rgba(255,170,0,0.07) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Logo top-left */}
      <div className="absolute top-7 left-10 z-30 flex items-center gap-2.5">
        <span className="text-[26px] font-black tracking-tight text-white leading-none">
          spot<span className="text-amber">2</span>
        </span>
      </div>

      {/* status indicator top-right */}
      <div className="absolute top-7 right-10 z-30 hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/35">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-50 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
        </span>
        v1.0 · live data
      </div>

      {/* LEFT — main content */}
      <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center px-10 lg:px-16 xl:pl-24">
        <div className="max-w-[760px] mx-auto w-full">
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 border border-amber/35 text-amber/90 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] font-mono">
              <span className="w-1 h-1 rounded-full bg-amber" />
              Hackathon Spot2 AI Edition 2026
            </span>
          </motion.div>

          {/* Massive number */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-amber font-black tracking-[-0.05em] text-center select-none"
            style={{
              fontSize: 'clamp(140px, 19vw, 300px)',
              lineHeight: 0.85,
            }}
          >
            <LiveCounter
              from={0}
              to={DATA.leadsSelfServiceSinAtencion}
              duration={1800}
              delay={400}
              inViewOnly={false}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.2 }}
            className="mt-6 text-center text-white/80 text-[16px] md:text-[19px] font-medium leading-snug"
          >
            leads activos esperando respuesta{' '}
            <span className="text-amber">ahora mismo</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.5 }}
            className="mt-9 flex justify-center"
          >
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2 bg-amber text-spot-charcoal font-bold px-6 py-2.5 rounded-full text-[13px] hover:bg-amber-mid hover:brightness-105 transition-all"
            >
              Ver la demo
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="mt-16 flex items-center justify-center gap-6 text-white/45 text-[11.5px] font-mono uppercase tracking-wider"
          >
            <Stat icon={<Zap className="w-3.5 h-3.5" strokeWidth={2} />} label="113× más rápido" />
            <Sep />
            <Stat icon={<Clock className="w-3.5 h-3.5" strokeWidth={2} />} label="47 segundos" />
            <Sep />
            <Stat icon={<DollarSign className="w-3.5 h-3.5" strokeWidth={2} />} label="$2.7M MXN" />
          </motion.div>
        </div>
      </div>

      {/* RIGHT — iPhone mockup */}
      <div className="hidden lg:flex relative z-10 w-[400px] xl:w-[440px] shrink-0 items-center justify-center pr-6 xl:pr-12">
        <HeroPhone />
      </div>
    </div>
  )
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="text-white/70">{icon}</span>
      <span>{label}</span>
    </span>
  )
}

function Sep() {
  return <span className="block w-px h-4 bg-white/15" />
}

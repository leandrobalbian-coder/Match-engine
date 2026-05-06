'use client'
import { motion } from 'framer-motion'
import { Zap, Clock, DollarSign } from 'lucide-react'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { HeroPhone } from '@/components/demo/HeroPhone'
import { DATA } from '@/lib/data'

export function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white flex">
      {/* Background — pure black with a single warm radial behind the number */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 38% 50%, rgba(255,170,0,0.18) 0%, rgba(255,170,0,0.06) 35%, transparent 70%)',
          }}
        />
        {/* Soft amber dot pattern very faint */}
        <div className="absolute inset-0 hero-dots opacity-[0.05]" />
      </div>

      {/* Logo top-left */}
      <div className="absolute top-7 left-10 z-30 flex items-center gap-2.5">
        <span className="text-[26px] font-black tracking-tight text-white leading-none">
          spot<span className="text-amber">2</span>
        </span>
      </div>

      {/* Hint bottom-center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/30 text-[10px] uppercase tracking-[0.22em] font-bold pointer-events-none"
      >
        ← / → navegar  ·  P presentación  ·  0–7 ir a pantalla
      </motion.div>

      {/* LEFT — main content */}
      <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center px-10 lg:px-16 xl:pl-24">
        <div className="max-w-[760px] mx-auto w-full">
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 border border-amber/45 text-amber rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold">
              Hackathon Spot2 AI Edition 2026
            </span>
          </motion.div>

          {/* Massive number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-amber font-black tracking-[-0.04em] text-center select-none"
            style={{
              fontSize: 'clamp(140px, 19vw, 300px)',
              lineHeight: 0.86,
              textShadow: '0 12px 80px rgba(255,170,0,0.22), 0 0 40px rgba(255,170,0,0.12)',
            }}
          >
            <LiveCounter
              from={0}
              to={DATA.leadsSelfServiceSinAtencion}
              duration={2000}
              delay={500}
              inViewOnly={false}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-5 text-center text-white/85 text-[18px] md:text-[22px] font-medium leading-snug"
          >
            leads activos esperando respuesta{' '}
            <span className="text-amber font-semibold">ahora mismo</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2 bg-amber text-spot-charcoal font-bold px-7 py-3 rounded-full text-[14px] hover:bg-amber-mid hover:brightness-105 transition-all"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
            >
              Ver la demo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="mt-14 flex items-center justify-center gap-7 text-white/55 text-[13px] font-medium"
          >
            <Stat icon={<Zap className="w-4 h-4" strokeWidth={2.2} />} label="113× más rápido" />
            <Sep />
            <Stat icon={<Clock className="w-4 h-4" strokeWidth={2.2} />} label="47 segundos" />
            <Sep />
            <Stat icon={<DollarSign className="w-4 h-4" strokeWidth={2.2} />} label="$2.7M MXN" />
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

'use client'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Zap } from 'lucide-react'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { DATA } from '@/lib/data'

export function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative w-full h-full hero-radial text-white overflow-hidden flex flex-col">
      {/* amber dot pattern — refuerza el brand sin robar foco */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,170,0,0.7) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* drifting orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full blur-[120px] bg-amber/20"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full blur-[140px] bg-amber/10"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* top bar */}
      <div className="relative z-10 px-10 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-2xl bg-amber flex items-center justify-center text-spot-charcoal font-black">
            2
          </div>
          <span className="text-2xl font-black tracking-tight">
            spot<span className="text-amber">2</span>
          </span>
          <span className="ml-3 text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold border-l border-white/15 pl-3">
            AI Edition · Hackathon 2026
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          datos en vivo · marzo 2026
        </div>
      </div>

      {/* center stage */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 border border-amber/30 bg-amber/10 text-amber rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Match Engine · Broker virtual en WhatsApp
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[12px] text-white/40 font-medium tracking-wide mb-6"
        >
          Demo creada por{' '}
          <span className="text-white/70 font-semibold">Leandro Balbian</span>{' '}
          — Product Designer, Spot2
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-black text-amber leading-none tracking-tight"
          style={{
            fontSize: 'clamp(96px, 18vw, 220px)',
            textShadow: '0 8px 60px rgba(255,170,0,0.25)',
          }}
        >
          <LiveCounter from={0} to={DATA.leadsSelfServiceSinAtencion} duration={2000} delay={400} inViewOnly={false} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-3 text-white/70 text-xl md:text-2xl font-medium max-w-2xl"
        >
          leads activos esperando respuesta <span className="text-amber font-bold">ahora mismo</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="mt-10 text-amber font-semibold flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Spot2 tiene la solución. Se llama Match Engine.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.85 }}
          onClick={onStart}
          className="mt-8 group inline-flex items-center gap-2 bg-amber text-spot-charcoal font-bold px-7 py-3.5 rounded-full text-[15px] hover:bg-amber-mid transition-colors shadow-amber animate-soft-pulse"
        >
          Ver la demo
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-12 flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/40 font-bold"
        >
          <span>113× más rápido</span>
          <span className="w-px h-3 bg-white/20" />
          <span>47 segundos por lead</span>
          <span className="w-px h-3 bg-white/20" />
          <span>$2.7M MXN recuperados · mes 1</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 pb-6 flex flex-col items-center text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold"
      >
        scroll · ↓ · presiona →
        <ArrowDown className="w-3.5 h-3.5 mt-1" />
      </motion.div>
    </div>
  )
}

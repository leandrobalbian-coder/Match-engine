'use client'
import { motion } from 'framer-motion'
import { BadgeCheck, ChevronLeft, Phone, Video, Plus, Camera, Mic, Smile, BedDouble, Bath, Ruler, CheckCheck } from 'lucide-react'

/**
 * HeroPhone — static iPhone mockup with a single WhatsApp property exchange.
 * Designed for the hero only. Uses CSS-only "night architecture" gradient
 * for the property image so we never depend on image assets.
 */
export function HeroPhone() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="relative"
      style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.6))' }}
    >
      {/* Outer titanium frame */}
      <div
        className="relative w-[340px] h-[700px] rounded-[54px] p-[3px]"
        style={{
          background:
            'linear-gradient(140deg, #4a4a4a 0%, #1a1a1a 35%, #2a2a2a 60%, #555 100%)',
        }}
      >
        {/* Inner bezel */}
        <div className="relative w-full h-full rounded-[51px] bg-black overflow-hidden">
          {/* Side highlight */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/8" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/8" />

          {/* Screen */}
          <div className="absolute inset-[6px] rounded-[46px] overflow-hidden bg-[#0B141A]">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[32px] rounded-full bg-black z-30" />

            {/* iOS Status bar */}
            <div className="relative z-20 pt-3 px-7 flex items-center justify-between text-white text-[13px] font-semibold">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            {/* WhatsApp Header */}
            <div className="relative mt-3 bg-[#1F2C33] px-3 py-2.5 flex items-center gap-2.5 border-b border-white/5">
              <ChevronLeft className="w-5 h-5 text-white/85" strokeWidth={2.4} />
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-spot-charcoal font-black text-[15px] shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #FFAA00 0%, #FFBB33 100%)',
                  boxShadow: '0 2px 6px rgba(255,170,0,0.4)',
                }}
              >
                M
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold text-[14px] truncate">MatchAgent · Spot2</span>
                  <BadgeCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" strokeWidth={2.5} />
                </div>
                <div className="text-white/55 text-[11px]">en línea</div>
              </div>
              <Video className="w-5 h-5 text-white/85" strokeWidth={2} />
              <Phone className="w-[17px] h-[17px] text-white/85" strokeWidth={2} />
            </div>

            {/* Chat */}
            <div
              className="relative h-[calc(100%-56px-50px-32px)] overflow-hidden px-3 py-3 space-y-2"
              style={{
                backgroundColor: '#0B141A',
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
                backgroundSize: '22px 22px, 44px 44px',
                backgroundPosition: '0 0, 11px 11px',
              }}
            >
              {/* Prospect → Agent (outgoing, right) */}
              <Bubble side="out" delay={0.9}>
                <div className="text-[12.5px] text-[#E9EDEF] leading-[1.35]">
                  Hola, me interesa conocer más información.
                </div>
                <Meta time="9:41 a.m." outgoing />
              </Bubble>

              {/* Agent → Prospect (incoming, left) — property card */}
              <Bubble side="in" delay={1.3} wide>
                <div className="text-[12.5px] text-[#E9EDEF] leading-[1.4] mb-2">
                  ¡Perfecto! Te comparto una propiedad que podría encajar con lo que buscas:
                </div>
                <PropertyCard />
                <div className="mt-2 text-[12.5px] text-[#E9EDEF] leading-[1.4]">
                  Ubicación premium, diseño moderno y acabados de lujo.
                </div>
                <Meta time="9:41 a.m." />
              </Bubble>

              {/* Prospect → Agent (outgoing, right) */}
              <Bubble side="out" delay={1.9}>
                <div className="text-[12.5px] text-[#E9EDEF] leading-[1.35]">
                  ¡Se ve increíble! Me gustaría agendar una visita.
                </div>
                <Meta time="9:41 a.m." outgoing />
              </Bubble>
            </div>

            {/* Input bar */}
            <div className="absolute bottom-0 inset-x-0 bg-[#1F2C33] px-2.5 py-2 flex items-center gap-2 border-t border-white/5">
              <Plus className="w-5 h-5 text-white/55" strokeWidth={2} />
              <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-2 text-[12px] text-white/40 flex items-center justify-between gap-2">
                <span>Mensaje</span>
                <Smile className="w-[18px] h-[18px] text-white/50" />
              </div>
              <Camera className="w-5 h-5 text-white/55" strokeWidth={2} />
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                <Mic className="w-4 h-4 text-[#0B141A]" strokeWidth={2.5} fill="#0B141A" />
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-[4px] rounded-full bg-white/40 z-30" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Bubble({
  side,
  children,
  delay = 0,
  wide = false,
}: {
  side: 'in' | 'out'
  children: React.ReactNode
  delay?: number
  wide?: boolean
}) {
  const isOut = side === 'out'
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      className={isOut ? 'flex justify-end' : 'flex justify-start'}
    >
      <div
        className={`relative px-2 py-1.5 rounded-lg shadow-sm ${
          isOut ? 'bg-[#005C4B] rounded-tr-sm' : 'bg-[#202C33] rounded-tl-sm'
        } ${wide ? 'max-w-[88%]' : 'max-w-[78%]'}`}
      >
        {children}
        {/* tail */}
        <span
          className={`absolute top-0 ${
            isOut ? '-right-[5px]' : '-left-[5px]'
          } w-2.5 h-2.5`}
          style={{
            backgroundColor: isOut ? '#005C4B' : '#202C33',
            clipPath: isOut ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)',
          }}
        />
      </div>
    </motion.div>
  )
}

function Meta({ time, outgoing = false }: { time: string; outgoing?: boolean }) {
  return (
    <div className="flex items-center justify-end gap-1 mt-0.5">
      <span className="text-[10px] text-white/45">{time}</span>
      {outgoing && <CheckCheck className="w-3 h-3 text-[#53BDEB]" strokeWidth={2.5} />}
    </div>
  )
}

function PropertyCard() {
  return (
    <div className="rounded-md overflow-hidden bg-black/30 border border-white/5">
      {/* Clean architectural wireframe — feels tech, not "fake photo" */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #131D24 0%, #0B141A 60%, #050A0E 100%)',
          }}
        />
        {/* Faint blueprint grid */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />
        {/* Architecture line drawing */}
        <svg
          viewBox="0 0 200 125"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Ground line */}
          <line x1="0" y1="105" x2="200" y2="105" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />

          {/* Modern villa — main horizontal block */}
          <rect
            x="38"
            y="60"
            width="86"
            height="45"
            fill="rgba(8,12,16,0.85)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.5"
          />
          {/* Cantilevered roof */}
          <rect
            x="34"
            y="56"
            width="94"
            height="4"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.4"
          />

          {/* Tall annex on the right */}
          <rect
            x="124"
            y="42"
            width="42"
            height="63"
            fill="rgba(8,12,16,0.85)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.5"
          />
          <rect
            x="120"
            y="38"
            width="50"
            height="4"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.4"
          />

          {/* Main villa — floor-to-ceiling glass strip */}
          <rect x="44" y="68" width="74" height="14" fill="rgba(255,170,0,0.55)" />
          <rect x="44" y="68" width="74" height="14" fill="none" stroke="rgba(255,170,0,0.85)" strokeWidth="0.3" />
          {/* mullions */}
          {[58, 72, 86, 100].map((x) => (
            <line key={x} x1={x} y1="68" x2={x} y2="82" stroke="rgba(255,170,0,0.25)" strokeWidth="0.3" />
          ))}

          {/* Lower band — entrance + secondary windows */}
          <rect x="44" y="88" width="14" height="13" fill="rgba(255,170,0,0.4)" />
          <rect x="64" y="88" width="14" height="13" fill="rgba(255,170,0,0.55)" />
          <rect x="84" y="88" width="14" height="13" fill="rgba(255,170,0,0.4)" />
          <rect x="104" y="88" width="14" height="13" fill="rgba(255,170,0,0.55)" />

          {/* Tall annex windows grid */}
          {[
            [128, 50], [144, 50], [156, 50],
            [128, 64], [144, 64], [156, 64],
            [128, 78], [144, 78],            [156, 78],
            [128, 92], [144, 92], [156, 92],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="9"
              height="10"
              fill={`rgba(255,170,0,${0.28 + ((i * 13) % 5) * 0.12})`}
            />
          ))}

          {/* Reflection / pool on the ground */}
          <rect x="44" y="106" width="100" height="6" fill="rgba(255,170,0,0.06)" />

          {/* Tree silhouettes */}
          <ellipse cx="14" cy="98" rx="6" ry="14" fill="rgba(0,0,0,0.85)" />
          <ellipse cx="186" cy="100" rx="5" ry="10" fill="rgba(0,0,0,0.85)" />
        </svg>

        {/* Subtle warm glow above the house */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 30% at 50% 70%, rgba(255,170,0,0.16) 0%, transparent 70%)',
          }}
        />
      </div>
      {/* Property info */}
      <div className="p-2.5 space-y-1">
        <div className="text-[12.5px] font-semibold text-[#E9EDEF] leading-tight">
          Casa en Lomas de Chapultepec
        </div>
        <div className="flex items-center gap-2.5 text-[10.5px] text-white/65">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="w-3 h-3" /> 3 recámaras
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="w-3 h-3" /> 3.5 baños
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler className="w-3 h-3" /> 340 m²
          </span>
        </div>
        <div className="text-[13px] font-bold text-[#E9EDEF]">$18,500,000 MXN</div>
      </div>
    </div>
  )
}

/* ---------- iOS status bar icons ---------- */

function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
      <rect x="0" y="7" width="3" height="4" rx="0.5" fill="white" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="white" />
      <rect x="9" y="3" width="3" height="8" rx="0.5" fill="white" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="white" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
      <path d="M7.5 2C4.5 2 2 3.2 0.3 5l1.4 1.4C3 5 5 4 7.5 4s4.5 1 5.8 2.4L14.7 5C13 3.2 10.5 2 7.5 2z" fill="white" />
      <path d="M7.5 5.5c-1.7 0-3.2.7-4.3 1.8l1.4 1.4C5.4 8 6.4 7.5 7.5 7.5s2.1.5 2.9 1.2l1.4-1.4c-1.1-1.1-2.6-1.8-4.3-1.8z" fill="white" />
      <circle cx="7.5" cy="9.5" r="1.2" fill="white" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="white" strokeOpacity="0.5" />
      <rect x="2" y="2" width="19" height="8" rx="1.5" fill="white" />
      <rect x="23" y="4" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.5" />
    </svg>
  )
}

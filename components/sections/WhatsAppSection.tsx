'use client'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Check,
  CheckCheck,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { WhatsAppMockup, type WAMessage } from '@/components/demo/WhatsAppMockup'
import { cn } from '@/lib/utils'

const WA_SCRIPT: WAMessage[] = [
  {
    id: 1,
    from: 'agent',
    text:
      '¡Hola Ana! 👋\nSoy MatchAgent de Spot2. Encontré 3 oficinas que coinciden con lo que buscas en Polanco/Lomas, dentro de tu presupuesto. Te paso la selección 👇',
    time: '12:42',
    delayBefore: 600,
    typingMs: 900,
  },
  {
    id: 2,
    from: 'agent',
    text:
      '⭐ Torre Corporativa Masaryk · Piso 8\n📐 210 m² · Clase A · Polanco\n💰 $87,500 MXN/mes\n✅ Estacionamiento · Elevador · A/C',
    time: '12:42',
    delayBefore: 700,
    typingMs: 700,
  },
  {
    id: 3,
    from: 'user',
    text: '¡Me interesa el de Masaryk! ¿Podría verlo el jueves?',
    time: '12:43',
    read: true,
    delayBefore: 1500,
    typingMs: 1100,
  },
  {
    id: 4,
    from: 'agent',
    text:
      '¡Perfecto! 🎯 Te propongo estos horarios el jueves 21 mar:\n• 11:00 hrs ✅\n• 13:00 hrs\n• 16:30 hrs\n¿Cuál te acomoda mejor?',
    time: '12:43',
    delayBefore: 800,
    typingMs: 1400,
  },
  {
    id: 5,
    from: 'user',
    text: 'El jueves a las 11 me viene perfecto 👍',
    time: '12:44',
    read: true,
    delayBefore: 1300,
    typingMs: 800,
  },
  {
    id: 6,
    from: 'agent',
    text:
      '¡Listo Ana! ✅\nVisita confirmada · jueves 21 mar · 11:00 hrs\nDirección: Av. Presidente Masaryk 111, Piso 8\nTe contacta Pedro R. (broker) por aquí mismo.\nNos vemos 🤝',
    time: '12:44',
    delayBefore: 900,
    typingMs: 1500,
  },
]

export function WhatsAppSection({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full overflow-hidden bg-spot-bg">
      <div className="px-8 pt-7 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-amber-dark">
              <Sparkles className="w-3.5 h-3.5" /> MatchAgent · paso 4
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-spot-dark mt-0.5">
              Conversación en vivo · WhatsApp
            </h1>
          </div>
          <button
            onClick={onNext}
            className="text-[12px] font-bold text-spot-mid hover:text-spot-dark inline-flex items-center gap-1.5"
          >
            Ver confirmación de visita <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-90px)] grid grid-cols-1 lg:grid-cols-[240px_1.4fr_360px] gap-4 px-8 pb-7">
        {/* Conversaciones */}
        <ConversationList />

        {/* Chat principal */}
        <ChatPanel />

        {/* Mockup mobile */}
        <div className="hidden lg:flex items-center justify-center">
          <WhatsAppMockup
            contactName="MatchAgent · Spot2"
            status="en línea · spot2.mx"
            messages={WA_SCRIPT}
            compact
          />
        </div>
      </div>
    </div>
  )
}

function ConversationList() {
  const items = [
    { name: 'Ana G.', sub: 'El jueves a las 11 me v…', time: '12:44', badge: { text: 'En curso', tone: 'green' as const, pulse: true }, active: true, init: 'AG', color: 'bg-amber' },
    { name: 'Logística NORTE', sub: 'Hola, necesitamos bo…', time: '12:31', badge: { text: 'Esperando', tone: 'gray' as const }, init: 'LN', color: 'bg-spot-charcoal' },
    { name: 'Retail Express', sub: '¿Tienen algo en Roma?', time: '12:18', badge: { text: 'Nuevo', tone: 'gray' as const }, init: 'RE', color: 'bg-alert-orange' },
    { name: 'Pedro R.', sub: 'Confirmo visita jueves 11', time: '11:52', badge: { text: 'Agendado', tone: 'green' as const }, init: 'PR', color: 'bg-alert-green' },
    { name: 'Manufactura del Valle', sub: 'Hola, busco bodega d…', time: '10:24', badge: { text: 'En cola', tone: 'gray' as const }, init: 'MV', color: 'bg-spot-mid' },
  ]
  return (
    <div className="bg-white border border-spot-border rounded-xl shadow-card flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-spot-border">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">
            Conversaciones · {items.length}
          </div>
          <Badge tone="live" pulse uppercase>Live</Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-spot-mid" />
          <input
            disabled
            placeholder="Buscar…"
            className="w-full bg-spot-bg border border-spot-border rounded-md pl-8 pr-2 py-1.5 text-[12px] text-spot-mid"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto thin-scroll">
        {items.map((it, i) => (
          <button
            key={i}
            className={cn(
              'w-full text-left px-3 py-2.5 border-b border-spot-border flex items-center gap-2.5 transition-colors',
              it.active ? 'bg-amber-light' : 'hover:bg-spot-bg',
            )}
          >
            <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-[11px] shrink-0', it.color)}>
              {it.init}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={cn('font-bold text-[12.5px] truncate', it.active ? 'text-amber-dark' : 'text-spot-dark')}>{it.name}</span>
                <span className="text-[10px] text-spot-mid font-semibold shrink-0">{it.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-[11px] text-spot-mid truncate">{it.sub}</span>
                <Badge tone={it.badge.tone} pulse={it.badge.pulse} uppercase className="!text-[9px] !px-1.5 !py-0 shrink-0">
                  {it.badge.text}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-spot-border bg-spot-bg/50">
        <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">MatchAgent · cola</div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-2xl font-black text-spot-dark">3,632</span>
          <span className="text-[11px] text-spot-mid font-semibold">leads en paralelo</span>
        </div>
      </div>
    </div>
  )
}

function ChatPanel() {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState<'agent' | 'user' | null>(null)
  const messages = WA_SCRIPT

  useEffect(() => {
    let cancelled = false
    setShown(0)
    setTyping(null)
    const run = async () => {
      for (let i = 0; i < messages.length; i++) {
        const m = messages[i]
        if (cancelled) return
        await wait(m.delayBefore ?? 600)
        if (cancelled) return
        setTyping(m.from)
        await wait(m.typingMs ?? (m.from === 'agent' ? 900 : 700))
        if (cancelled) return
        setTyping(null)
        setShown(i + 1)
      }
    }
    run()
    return () => { cancelled = true }
  }, [messages])

  const status = useMemo(() => {
    if (shown >= messages.length) return 'visita confirmada · jueves 11:00'
    if (typing === 'user') return 'Ana G. está escribiendo…'
    if (typing === 'agent') return 'MatchAgent está escribiendo…'
    return 'en línea · spot2.mx'
  }, [shown, typing, messages.length])

  return (
    <div className="bg-white border border-spot-border rounded-xl shadow-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-wa-headerBg text-white px-4 py-2.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber flex items-center justify-center text-spot-charcoal font-black text-sm">AG</div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[14px]">Ana G.</span>
            <BadgeCheck className="w-3.5 h-3.5 text-amber" />
            <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Lead #8412</span>
          </div>
          <div className="text-[11px] text-white/75">{status}</div>
        </div>
        <Video className="w-4.5 h-4.5 opacity-80" />
        <Phone className="w-4 h-4 opacity-80" />
        <MoreVertical className="w-4 h-4 opacity-80" />
      </div>

      {/* Lead bar */}
      <div className="bg-amber-light border-b border-amber/30 px-4 py-2 flex items-center justify-between gap-3">
        <div className="text-[11px] text-amber-dark font-semibold">
          Oficina 200 m² · Polanco/Lomas · $90K MXN/mes · score 94%
        </div>
        <Badge tone="amber" uppercase>3 espacios enviados</Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto thin-scroll wa-chat-bg px-6 py-4 space-y-2">
        <div className="flex justify-center">
          <span className="bg-white/80 text-spot-mid text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-sm">HOY · 18 mar</span>
        </div>
        <AnimatePresence initial={false}>
          {messages.slice(0, shown).map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={cn('flex', m.from === 'agent' ? 'justify-start' : 'justify-end')}
            >
              <div
                className={cn(
                  'max-w-[68%] px-3 py-2 rounded-lg text-[13px] leading-[1.4] shadow-sm',
                  m.from === 'agent'
                    ? 'bg-wa-bubbleIn text-spot-dark rounded-tl-sm'
                    : 'bg-wa-bubbleOut text-spot-dark rounded-tr-sm',
                )}
              >
                <div className="whitespace-pre-wrap break-words">{m.text}</div>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-spot-mid">
                  <span>{m.time}</span>
                  {m.from === 'user' &&
                    (m.read ? (
                      <CheckCheck className="w-3.5 h-3.5 text-wa-tickBlue" strokeWidth={2.5} />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-spot-mid" strokeWidth={2.5} />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn('flex', typing === 'agent' ? 'justify-start' : 'justify-end')}
            >
              <div
                className={cn(
                  'px-3 py-2 rounded-lg shadow-sm flex items-center gap-1',
                  typing === 'agent' ? 'bg-wa-bubbleIn rounded-tl-sm' : 'bg-wa-bubbleOut rounded-tr-sm',
                )}
              >
                <Dot delay={0} />
                <Dot delay={0.15} />
                <Dot delay={0.3} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="bg-[#F0F2F5] border-t border-spot-border px-3 py-2.5 flex items-center gap-2">
        <Smile className="w-5 h-5 text-spot-mid" />
        <Paperclip className="w-5 h-5 text-spot-mid" />
        <div className="flex-1 bg-white rounded-full px-3 py-2 text-[12px] text-spot-mid flex items-center gap-2">
          <span className="flex-1">MatchAgent está manejando esta conversación…</span>
          <Badge tone="amber" pulse uppercase>Modo automático</Badge>
        </div>
        <div className="w-9 h-9 rounded-full bg-wa-headerBg flex items-center justify-center">
          <Mic className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-spot-mid"
      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

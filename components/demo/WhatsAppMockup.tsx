'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Check, CheckCheck, Phone, Video, MoreVertical, Smile, Paperclip, Mic, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export type WAMessage = {
  id: number
  from: 'agent' | 'user'
  text: string
  time: string
  delayBefore?: number  // ms — typing indicator duration
  typingMs?: number     // ms — typing indicator duration (when from agent)
  read?: boolean
}

export function WhatsAppMockup({
  contactName = 'MatchAgent · Spot2',
  status = 'en línea',
  messages,
  autoplay = true,
  className,
  compact = false,
}: {
  contactName?: string
  status?: string
  messages: WAMessage[]
  autoplay?: boolean
  className?: string
  compact?: boolean
}) {
  const [shown, setShown] = useState<number>(0)
  const [typing, setTyping] = useState<'agent' | 'user' | null>(null)

  useEffect(() => {
    if (!autoplay) {
      setShown(messages.length)
      return
    }
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
    return () => {
      cancelled = true
    }
  }, [messages, autoplay])

  return (
    <div
      className={cn(
        'relative mx-auto rounded-[42px] bg-black shadow-2xl border-[10px] border-black overflow-hidden',
        compact ? 'w-[280px] h-[560px]' : 'w-[320px] h-[640px]',
        className,
      )}
      style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), 0 18px 36px -18px rgba(0,0,0,0.4)' }}
    >
      {/* iPhone notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-black rounded-b-[16px] z-30" />

      {/* Status bar */}
      <div className="bg-wa-headerBg text-white text-[11px] flex items-center justify-between px-6 pt-2 pb-1.5 z-20 relative">
        <span className="font-bold">9:41</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px]">●●●● 5G</span>
          <span className="ml-1 inline-block w-5 h-2 border border-white rounded-sm relative">
            <span className="absolute inset-y-[1px] left-[1px] w-[14px] bg-white rounded-[1px]" />
          </span>
        </div>
      </div>

      {/* WhatsApp header */}
      <div className="bg-wa-headerBg text-white px-3 py-2 flex items-center gap-2.5">
        <button className="text-white/90 text-lg leading-none">‹</button>
        <div className="w-9 h-9 rounded-full bg-amber flex items-center justify-center text-spot-charcoal font-black text-sm">
          M
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[14px] truncate">{contactName}</span>
            <BadgeCheck className="w-3.5 h-3.5 text-amber shrink-0" />
          </div>
          <div className="text-[11px] text-white/80 truncate">{status}</div>
        </div>
        <Video className="w-5 h-5 text-white/90" />
        <Phone className="w-4 h-4 text-white/90" />
        <MoreVertical className="w-4 h-4 text-white/90" />
      </div>

      {/* Chat area */}
      <div className="wa-chat-bg flex-1 h-[calc(100%-130px)] overflow-y-auto thin-scroll px-3 py-3 space-y-2">
        <div className="flex justify-center">
          <span className="bg-white/80 text-spot-mid text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
            HOY
          </span>
        </div>
        <AnimatePresence initial={false}>
          {messages.slice(0, shown).map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={cn(
                'flex',
                m.from === 'agent' ? 'justify-start' : 'justify-end',
              )}
            >
              <div
                className={cn(
                  'max-w-[78%] px-2.5 py-1.5 rounded-lg text-[13px] leading-[1.35] shadow-sm',
                  m.from === 'agent'
                    ? 'bg-wa-bubbleIn text-spot-dark rounded-tl-sm'
                    : 'bg-wa-bubbleOut text-spot-dark rounded-tr-sm',
                )}
              >
                <div className="whitespace-pre-wrap break-words">{m.text}</div>
                <div className="flex items-center justify-end gap-1 mt-0.5 text-[10px] text-spot-mid">
                  <span>{m.time}</span>
                  {m.from === 'user' && (
                    m.read ? (
                      <CheckCheck className="w-3.5 h-3.5 text-wa-tickBlue" strokeWidth={2.5} />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-spot-mid" strokeWidth={2.5} />
                    )
                  )}
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
                  typing === 'agent'
                    ? 'bg-wa-bubbleIn rounded-tl-sm'
                    : 'bg-wa-bubbleOut rounded-tr-sm',
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

      {/* Input bar */}
      <div className="absolute bottom-0 inset-x-0 bg-[#F0F2F5] px-2 py-2 flex items-center gap-2">
        <Smile className="w-5 h-5 text-spot-mid" />
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[12px] text-spot-mid">
          MatchAgent está manejando esta conversación…
        </div>
        <Paperclip className="w-5 h-5 text-spot-mid" />
        <div className="w-8 h-8 rounded-full bg-wa-headerBg flex items-center justify-center">
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

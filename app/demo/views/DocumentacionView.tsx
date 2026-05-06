'use client'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  GitBranch,
  Zap,
  Layers,
  Target,
  FileText,
  Sparkles,
  ArrowRight,
  Database,
  MessageSquare,
  Bot,
  Server,
} from 'lucide-react'
import { ViewShell } from './ViewShell'
import { Badge } from '@/components/ui/Badge'
import { LiveCounter } from '@/components/demo/LiveCounter'
import { cn } from '@/lib/utils'

export function DocumentacionView({
  onBack,
  onJumpToFlow,
}: {
  onBack: () => void
  onJumpToFlow: (i: number) => void
}) {
  return (
    <ViewShell
      eyebrow="Documentación · ideación · arquitectura"
      title="Match Engine — Documentación del proyecto"
      description="Diagnóstico, scope, arquitectura. La historia completa del por qué y el cómo, con datos reales de Spot2 vía Dijin MCP."
      badge={{ text: 'Hackathon Spot2 · 2026', tone: 'amber' }}
      onBack={onBack}
      cta={{ label: 'Volver al flujo de la demo', onClick: () => onJumpToFlow(1) }}
    >
      {/* Hero compacto */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-spot-charcoal text-white rounded-2xl px-8 py-7 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,170,0,0.7) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber" />
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-amber">
              Documentación del proyecto
            </span>
          </div>
          <h2 className="font-black tracking-tight text-white text-[28px] mt-2 leading-tight">
            Match Engine — un broker virtual que vive en WhatsApp
          </h2>
          <p className="text-white/70 text-[14px] mt-2">
            Ideación · diagnóstico · scope · arquitectura. Cada número que vas a leer salió de la BD real de Spot2.
          </p>
        </div>
      </motion.div>

      {/* SECCIÓN 1 — Origen */}
      <Section
        icon={AlertTriangle}
        iconTone="red"
        title="¿De dónde nace la idea?"
        eyebrow="Sección 1 · diagnóstico"
      >
        <p className="text-[14px] text-spot-dark leading-relaxed">
          Antes del hackathon usé <strong>Dijin</strong> — el MCP de Spot2 en producción — para consultar directamente la base de datos. Lo que encontré fue lo siguiente:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <DiagStat value={3636} suffix="" label="Leads self-service sin ninguna respuesta" tone="red" decimals={0} />
          <DiagStat value={2.13} suffix="%" label="Tasa de conversión lead → visita" tone="red" decimals={2} />
          <DiagStat value={26.5} suffix="h" label="Tiempo promedio de primera respuesta" tone="red" decimals={1} />
        </div>
        <div className="mt-5 bg-amber-light border border-amber/30 rounded-lg px-5 py-4 text-[13px] text-spot-dark">
          El <strong>94.8%</strong> de los leads tiene los 4 criterios de búsqueda completos
          (tipo, área, zona, presupuesto). Los <strong>5,554 spots</strong> existen.
          El matching <strong>ES</strong> posible. Solo nadie lo ejecuta a escala.
        </div>
      </Section>

      {/* SECCIÓN 2 — Iteración */}
      <Section
        icon={GitBranch}
        iconTone="amber"
        title="De MatchAgent a Match Engine"
        eyebrow="Sección 2 · iteración"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <IterCard
            step="1"
            title="MatchAgent"
            subtitle="Propuesta original · pre-hackathon"
            body="Un solo modo: lead → WhatsApp → visita agendada."
            tone="gray"
          />
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-7 h-7 text-amber" />
          </div>
          <IterCard
            step="2"
            title="Match Engine"
            subtitle="Proyecto ganador · #02/04"
            body="3 modos: nuevo lead, inventario fresco, leads históricos."
            tone="amber"
            badge="Hackathon"
          />
        </div>
      </Section>

      {/* SECCIÓN 3 — Modos */}
      <Section
        icon={Zap}
        iconTone="amber"
        title="Golden Path · los 3 modos de operación"
        eyebrow="Sección 3 · scope"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ModeCard
            n={1}
            tone="amber"
            title="Golden Path"
            trigger="origin = 1, last_spot_stage = NULL, +2h sin contacto"
            body="Lead nuevo → WhatsApp en menos de 5 min → visita agendada"
            badge="MVP del hackathon"
          />
          <ModeCard
            n={2}
            tone="gray"
            title="Inventario fresco"
            trigger="spot_state cambia a 2 (público)"
            body="Nuevo spot publicado → notificación a leads que lo buscaban"
            badge="Iteración 2"
          />
          <ModeCard
            n={3}
            tone="gray"
            title="Minería histórica"
            trigger="3,904 leads activos con espacios disponibles no mostrados"
            body="Lead histórico + match disponible → alerta automática"
            badge="Iteración 2"
          />
        </div>
      </Section>

      {/* SECCIÓN 4 — Stack */}
      <Section
        icon={Layers}
        iconTone="blue"
        title="Arquitectura · sin backend adicional"
        eyebrow="Sección 4 · stack"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StackChip
            icon={Database}
            name="Dijin"
            sub="MCP de Spot2"
            note="YA EN PRODUCCIÓN — backbone del agente"
            tone="amber"
          />
          <StackChip
            icon={MessageSquare}
            name="WhatsApp Business API"
            sub="Canal de salida al prospecto"
            note="Gestionado por proveedor oficial"
            tone="green"
          />
          <StackChip
            icon={Bot}
            name="LLM (Claude / GPT-4)"
            sub="Comprensión semántica + copy"
            note="Razonamiento del matching"
            tone="dark"
          />
          <StackChip
            icon={Server}
            name="MySQL spot2_service"
            sub="Sin modificar el esquema actual"
            note="Lectura vía Dijin · cero migraciones"
            tone="gray"
          />
        </div>
      </Section>

      {/* SECCIÓN 5 — Hipótesis */}
      <Section
        icon={Target}
        iconTone="green"
        title="La hipótesis que guía todo"
        eyebrow="Sección 5 · métricas"
      >
        <div className="bg-amber-light border-2 border-amber/30 rounded-xl px-5 py-4 text-[13px] text-spot-dark leading-relaxed">
          <span className="font-bold text-amber-dark">Si</span> Match Engine responde a leads self-service en menos de 5 minutos con un match semántico de los 3 mejores espacios, <span className="font-bold text-amber-dark">entonces</span> la tasa de conversión lead → visita subirá del 2.13% al 8% en 30 días — porque el problema no es el inventario ni los criterios, es la velocidad de respuesta.
        </div>

        <div className="mt-5 bg-white border border-spot-border rounded-xl shadow-card overflow-hidden">
          <div className="grid grid-cols-[160px_1fr_1fr] text-[12px]">
            <Hdr>Métrica</Hdr>
            <Hdr>Estado actual</Hdr>
            <Hdr>Objetivo · 30 días</Hdr>

            <Row label="Conversión a visita" current="2.13%" target="8% (mín. 5%)" tone="primary" />
            <Row label="Tiempo de respuesta" current="26.5 horas" target="< 5 minutos" />
            <Row label="Leads atendidos / semana" current="9 leads" target="58 leads (100%)" />
          </div>
        </div>
      </Section>

      {/* Footer firma */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-spot-border rounded-xl shadow-card px-6 py-5 flex items-center justify-between gap-6 flex-wrap"
      >
        <div>
          <div className="text-[11px] text-spot-mid">
            Esta documentación fue generada a partir del diagnóstico real de la BD de Spot2 mediante Dijin MCP en marzo 2026.
          </div>
          <div className="text-[13px] font-bold text-spot-dark mt-1">
            Leandro Balbian — Product Designer, Spot2 · Abril 2026
          </div>
        </div>
        <Badge tone="amber" pulse uppercase>
          <Sparkles className="w-3 h-3" /> Datos reales
        </Badge>
      </motion.div>
    </ViewShell>
  )
}

function Section({
  icon: Icon,
  iconTone,
  title,
  eyebrow,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  iconTone: 'red' | 'amber' | 'blue' | 'green'
  title: string
  eyebrow: string
  children: React.ReactNode
}) {
  const ringTones = {
    red: 'bg-alert-redBg border-alert-red/30 text-alert-red',
    amber: 'bg-amber-light border-amber/30 text-amber-dark',
    blue: 'bg-alert-blueBg border-alert-blue/30 text-alert-blue',
    green: 'bg-alert-greenBg border-alert-green/30 text-alert-green',
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-spot-border rounded-xl shadow-card p-6"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className={cn('w-10 h-10 rounded-lg border flex items-center justify-center shrink-0', ringTones[iconTone])}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">{eyebrow}</div>
          <h3 className="font-black text-spot-dark text-[18px] mt-0.5">{title}</h3>
        </div>
      </div>
      {children}
    </motion.section>
  )
}

function DiagStat({
  value,
  suffix,
  label,
  tone,
  decimals = 0,
}: {
  value: number
  suffix: string
  label: string
  tone: 'red' | 'amber' | 'green'
  decimals?: number
}) {
  const accent = {
    red: 'text-alert-red bg-alert-redBg border-alert-red/20',
    amber: 'text-amber-dark bg-amber-light border-amber/30',
    green: 'text-alert-green bg-alert-greenBg border-alert-green/20',
  }[tone]
  return (
    <div className={cn('border-2 rounded-xl px-5 py-4', accent)}>
      <div className="font-black text-[34px] leading-none tracking-tight tabular-nums">
        <LiveCounter from={0} to={value} duration={1300} decimals={decimals} />{suffix}
      </div>
      <div className="text-[12px] text-spot-mid font-semibold mt-2">{label}</div>
    </div>
  )
}

function IterCard({
  step,
  title,
  subtitle,
  body,
  tone,
  badge,
}: {
  step: string
  title: string
  subtitle: string
  body: string
  tone: 'gray' | 'amber'
  badge?: string
}) {
  const isAmber = tone === 'amber'
  return (
    <div className={cn(
      'border-2 rounded-xl p-5',
      isAmber ? 'border-amber bg-amber-light' : 'border-spot-border bg-spot-bg/50',
    )}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center font-black text-white',
          isAmber ? 'bg-amber' : 'bg-spot-mid',
        )}>
          {step}
        </div>
        {badge && <Badge tone={isAmber ? 'amber' : 'gray'} uppercase>{badge}</Badge>}
      </div>
      <h4 className="font-black text-spot-dark text-[16px]">{title}</h4>
      <div className="text-[11px] text-spot-mid font-semibold mt-0.5">{subtitle}</div>
      <p className="text-[13px] text-spot-dark mt-3">{body}</p>
    </div>
  )
}

function ModeCard({
  n,
  tone,
  title,
  trigger,
  body,
  badge,
}: {
  n: number
  tone: 'amber' | 'gray'
  title: string
  trigger: string
  body: string
  badge: string
}) {
  const isAmber = tone === 'amber'
  return (
    <div className={cn(
      'border-2 rounded-xl p-5 relative overflow-hidden',
      isAmber ? 'border-amber bg-amber-light' : 'border-spot-border bg-white',
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">Modo {n}</div>
        <Badge tone={isAmber ? 'amber' : 'gray'} uppercase>{badge}</Badge>
      </div>
      <h4 className={cn('font-black text-[16px]', isAmber ? 'text-amber-dark' : 'text-spot-dark')}>{title}</h4>
      <p className="text-[13px] text-spot-dark mt-2">{body}</p>
      <div className="mt-3 pt-3 border-t border-spot-border">
        <div className="text-[10px] uppercase tracking-wider font-bold text-spot-mid">Trigger</div>
        <div className="text-[11px] text-spot-mid font-mono mt-1 break-words">{trigger}</div>
      </div>
    </div>
  )
}

function StackChip({
  icon: Icon,
  name,
  sub,
  note,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  name: string
  sub: string
  note: string
  tone: 'amber' | 'green' | 'dark' | 'gray'
}) {
  const accent = {
    amber: 'border-amber bg-amber-light',
    green: 'border-alert-green/30 bg-alert-greenBg',
    dark: 'border-spot-charcoal/15 bg-spot-bg',
    gray: 'border-spot-border bg-white',
  }[tone]
  const iconBg = {
    amber: 'bg-amber text-spot-charcoal',
    green: 'bg-alert-green text-white',
    dark: 'bg-spot-charcoal text-white',
    gray: 'bg-spot-mid text-white',
  }[tone]
  return (
    <div className={cn('border-2 rounded-xl p-4 flex items-center gap-3', accent)}>
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', iconBg)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="font-black text-spot-dark text-[14px]">{name}</div>
        <div className="text-[11px] text-spot-mid font-semibold">{sub}</div>
        <div className="text-[11px] text-spot-dark font-medium mt-1">{note}</div>
      </div>
    </div>
  )
}

function Hdr({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-spot-bg/60 px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold text-spot-mid border-b border-spot-border">
      {children}
    </div>
  )
}

function Row({
  label,
  current,
  target,
  tone,
}: {
  label: string
  current: string
  target: string
  tone?: 'primary'
}) {
  return (
    <>
      <div className="px-4 py-3 border-b border-spot-border text-[13px] font-bold text-spot-dark">{label}</div>
      <div className="px-4 py-3 border-b border-spot-border text-[13px] text-alert-red font-bold tabular-nums">{current}</div>
      <div className={cn(
        'px-4 py-3 border-b border-spot-border text-[13px] font-black tabular-nums',
        tone === 'primary' ? 'text-alert-green' : 'text-spot-dark',
      )}>
        {target}
      </div>
    </>
  )
}

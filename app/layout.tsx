import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Match Engine — Hackathon Spot2 AI Edition 2026',
  description:
    '3,636 leads activos sin respuesta. Match Engine los convierte en visitas en 47 segundos.',
  openGraph: {
    title: 'Match Engine — Spot2 AI Edition 2026',
    description: '113× más rápido que el proceso manual',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

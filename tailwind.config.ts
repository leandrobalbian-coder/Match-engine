import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#FFAA00',
          light: '#FFF8E7',
          mid: '#FFBB33',
          dark: '#C67B00',
        },
        spot: {
          dark: '#434653',
          charcoal: '#1C1F2A',
          mid: '#6E717F',
          bg: '#F5F6F8',
          border: '#E2E4EC',
        },
        alert: {
          red: '#DC2626',
          redBg: '#FEF2F2',
          green: '#16A34A',
          greenBg: '#F0FDF4',
          blue: '#0288D1',
          blueBg: '#E3F2FD',
          orange: '#ED6C02',
        },
        wa: {
          headerBg: '#075E54',
          chatBg: '#ECE5DD',
          bubbleOut: '#DCF8C6',
          bubbleIn: '#FFFFFF',
          tickBlue: '#34B7F1',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-amber': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)',
        cardHover: '0 4px 8px rgba(16,24,40,0.10)',
      },
    },
  },
  plugins: [],
}

export default config

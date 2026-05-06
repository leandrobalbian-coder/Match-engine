import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatMoney(n: number): string {
  return `$${n.toLocaleString('es-MX')}`
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

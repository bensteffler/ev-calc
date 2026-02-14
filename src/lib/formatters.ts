/**
 * Formatting utilities for the EV calculator
 */

export function formatCurrency(value: number, showCents: boolean = false): string {
  const absValue = Math.abs(value)
  const formatted = absValue.toLocaleString('en-CA', {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  })
  const sign = value < 0 ? '-' : ''
  return `${sign}$${formatted}`
}

export function formatCostPerKm(value: number): string {
  return `$${value.toFixed(3)}/km`
}

export function parseNumericInput(value: string): number {
  const cleaned = value.replace(/[$,/a-zA-Z\s]/g, '').trim()
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

import { describe, it, expect } from 'vitest'
import {
  calculate,
  calculateMonthlyEVCost,
  calculateMonthlyGasCost,
  calculateCostPerKm,
} from '../lib/calc'
import { formatCurrency, formatCostPerKm, parseNumericInput } from '../lib/formatters'
import { DAYS_PER_MONTH } from '../lib/constants'

describe('calculateMonthlyEVCost', () => {
  it('calculates monthly EV cost with default inputs', () => {
    // (40/100) * 20 * 0.13 * 30.44 = 31.6576
    const result = calculateMonthlyEVCost(40, 20, 0.13)
    expect(result).toBeCloseTo(31.66, 1)
  })

  it('returns 0 when dailyKm is 0', () => {
    expect(calculateMonthlyEVCost(0, 20, 0.13)).toBe(0)
  })

  it('returns 0 when electricity rate is 0', () => {
    expect(calculateMonthlyEVCost(40, 20, 0)).toBe(0)
  })
})

describe('calculateMonthlyGasCost', () => {
  it('calculates monthly gas cost with default inputs', () => {
    // (40/100) * 10 * 1.50 * 30.44 = 182.64
    const result = calculateMonthlyGasCost(40, 10, 1.50)
    expect(result).toBeCloseTo(182.64, 1)
  })

  it('returns 0 when dailyKm is 0', () => {
    expect(calculateMonthlyGasCost(0, 10, 1.50)).toBe(0)
  })

  it('returns 0 when gas price is 0', () => {
    expect(calculateMonthlyGasCost(40, 10, 0)).toBe(0)
  })
})

describe('calculateCostPerKm', () => {
  it('calculates EV cost per km', () => {
    // (20/100) * 0.13 = 0.026
    expect(calculateCostPerKm(20, 0.13)).toBeCloseTo(0.026, 4)
  })

  it('calculates gas cost per km', () => {
    // (10/100) * 1.50 = 0.15
    expect(calculateCostPerKm(10, 1.50)).toBeCloseTo(0.15, 4)
  })
})

describe('calculate', () => {
  it('calculates all results with default SUV inputs', () => {
    const results = calculate({
      dailyKm: 40,
      evEfficiency: 20,
      gasConsumption: 10,
      electricityRate: 0.13,
      gasPrice: 1.50,
    })

    expect(results.monthlyEVCost).toBeCloseTo(31.66, 0)
    expect(results.monthlyGasCost).toBeCloseTo(182.64, 0)
    expect(results.monthlySavings).toBeCloseTo(150.98, 0)
    expect(results.annualSavings).toBeCloseTo(1811.81, 0)
    expect(results.costPerKmEV).toBeCloseTo(0.026, 3)
    expect(results.costPerKmGas).toBeCloseTo(0.15, 3)
    expect(results.savingsPercent).toBeGreaterThan(80)
  })

  it('handles zero daily km', () => {
    const results = calculate({
      dailyKm: 0,
      evEfficiency: 20,
      gasConsumption: 10,
      electricityRate: 0.13,
      gasPrice: 1.50,
    })

    expect(results.monthlyEVCost).toBe(0)
    expect(results.monthlyGasCost).toBe(0)
    expect(results.monthlySavings).toBe(0)
    expect(results.annualSavings).toBe(0)
    expect(results.savingsPercent).toBe(0)
  })

  it('handles case where EV is more expensive than gas', () => {
    const results = calculate({
      dailyKm: 40,
      evEfficiency: 28,
      gasConsumption: 8,
      electricityRate: 0.50,
      gasPrice: 0.80,
    })

    expect(results.monthlySavings).toBeLessThan(0)
    expect(results.annualSavings).toBeLessThan(0)
  })

  it('calculates compact/sedan class correctly', () => {
    const results = calculate({
      dailyKm: 40,
      evEfficiency: 16,
      gasConsumption: 8,
      electricityRate: 0.13,
      gasPrice: 1.50,
    })

    // EV: (40/100) * 16 * 0.13 * 30.44 = 25.33
    // Gas: (40/100) * 8 * 1.50 * 30.44 = 146.11
    expect(results.monthlyEVCost).toBeCloseTo(25.33, 0)
    expect(results.monthlyGasCost).toBeCloseTo(146.11, 0)
  })

  it('calculates truck class correctly', () => {
    const results = calculate({
      dailyKm: 40,
      evEfficiency: 28,
      gasConsumption: 13,
      electricityRate: 0.13,
      gasPrice: 1.50,
    })

    // EV: (40/100) * 28 * 0.13 * 30.44 = 44.32
    // Gas: (40/100) * 13 * 1.50 * 30.44 = 237.43
    expect(results.monthlyEVCost).toBeCloseTo(44.32, 0)
    expect(results.monthlyGasCost).toBeCloseTo(237.43, 0)
  })
})

describe('formatCurrency', () => {
  it('formats positive numbers with dollar sign', () => {
    expect(formatCurrency(1234)).toBe('$1,234')
  })

  it('formats negative numbers with minus sign', () => {
    expect(formatCurrency(-1234)).toBe('-$1,234')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('shows cents when requested', () => {
    expect(formatCurrency(1234.56, true)).toBe('$1,234.56')
  })

  it('rounds to whole numbers by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235')
  })
})

describe('formatCostPerKm', () => {
  it('formats cost per km with 3 decimal places', () => {
    expect(formatCostPerKm(0.026)).toBe('$0.026/km')
  })

  it('formats larger cost per km', () => {
    expect(formatCostPerKm(0.15)).toBe('$0.150/km')
  })
})

describe('parseNumericInput', () => {
  it('parses plain numbers', () => {
    expect(parseNumericInput('1234')).toBe(1234)
  })

  it('parses numbers with dollar sign', () => {
    expect(parseNumericInput('$1,234')).toBe(1234)
  })

  it('parses decimals', () => {
    expect(parseNumericInput('0.13')).toBe(0.13)
  })

  it('returns 0 for invalid input', () => {
    expect(parseNumericInput('abc')).toBe(0)
    expect(parseNumericInput('')).toBe(0)
  })

  it('strips suffix text', () => {
    expect(parseNumericInput('40 km')).toBe(40)
  })
})

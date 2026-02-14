/**
 * EV Cost to Drive Calculator - Core Calculation Functions
 *
 * All costs are in CAD. Efficiency in kWh/100km, consumption in L/100km.
 */

import { DAYS_PER_MONTH } from './constants'

export interface CalcInputs {
  dailyKm: number
  evEfficiency: number      // kWh per 100 km
  gasConsumption: number    // L per 100 km
  electricityRate: number   // $ per kWh
  gasPrice: number          // $ per L
}

export interface CalcResults {
  monthlyEVCost: number
  monthlyGasCost: number
  monthlySavings: number
  annualSavings: number
  costPerKmEV: number
  costPerKmGas: number
  savingsPercent: number
}

export function calculateMonthlyEVCost(
  dailyKm: number,
  evEfficiency: number,
  electricityRate: number
): number {
  return (dailyKm / 100) * evEfficiency * electricityRate * DAYS_PER_MONTH
}

export function calculateMonthlyGasCost(
  dailyKm: number,
  gasConsumption: number,
  gasPrice: number
): number {
  return (dailyKm / 100) * gasConsumption * gasPrice * DAYS_PER_MONTH
}

export function calculateCostPerKm(
  efficiencyPer100km: number,
  pricePerUnit: number
): number {
  return (efficiencyPer100km / 100) * pricePerUnit
}

export function calculate(inputs: CalcInputs): CalcResults {
  const { dailyKm, evEfficiency, gasConsumption, electricityRate, gasPrice } = inputs

  const monthlyEVCost = calculateMonthlyEVCost(dailyKm, evEfficiency, electricityRate)
  const monthlyGasCost = calculateMonthlyGasCost(dailyKm, gasConsumption, gasPrice)
  const monthlySavings = monthlyGasCost - monthlyEVCost
  const annualSavings = monthlySavings * 12
  const costPerKmEV = calculateCostPerKm(evEfficiency, electricityRate)
  const costPerKmGas = calculateCostPerKm(gasConsumption, gasPrice)
  const savingsPercent = monthlyGasCost > 0
    ? (monthlySavings / monthlyGasCost) * 100
    : 0

  return {
    monthlyEVCost,
    monthlyGasCost,
    monthlySavings,
    annualSavings,
    costPerKmEV,
    costPerKmGas,
    savingsPercent,
  }
}

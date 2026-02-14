'use client'

import { useState, useCallback, useMemo } from 'react'
import { NumberInput } from './NumberInput'
import { VehicleClassSelect } from './VehicleClassSelect'
import { Results } from './Results'
import { calculate } from '@/lib/calc'
import { getEVModel, getVehicleClass, DEFAULTS, LIMITS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

export function Calculator() {
  const [dailyKm, setDailyKm] = useState<number>(DEFAULTS.dailyKm)
  const [electricityRate, setElectricityRate] = useState<number>(DEFAULTS.electricityRate)
  const [gasPrice, setGasPrice] = useState<number>(DEFAULTS.gasPrice)
  const [evModelId, setEvModelId] = useState<string>(DEFAULTS.evModelId)

  const evModel = getEVModel(evModelId)
  const gasClass = getVehicleClass(evModel.gasClassId)

  const results = useMemo(() => {
    if (dailyKm <= 0) return null
    return calculate({
      dailyKm,
      evEfficiency: evModel.evEfficiency,
      gasConsumption: gasClass.gasConsumption,
      electricityRate,
      gasPrice,
    })
  }, [dailyKm, electricityRate, gasPrice, evModel, gasClass])

  const handleDailyKmChange = useCallback((value: number) => {
    trackEvent('input_started')
    if (value > 0) {
      trackEvent('daily_km_entered', { km: value })
    }
    setDailyKm(value)
  }, [])

  const handleElectricityRateChange = useCallback((value: number) => {
    trackEvent('input_started')
    trackEvent('electricity_rate_entered', { rate: value })
    setElectricityRate(value)
  }, [])

  const handleGasPriceChange = useCallback((value: number) => {
    trackEvent('input_started')
    trackEvent('gas_price_entered', { price: value })
    setGasPrice(value)
  }, [])

  const handleEvModelChange = useCallback((value: string) => {
    trackEvent('ev_model_selected', { model: value })
    setEvModelId(value)
  }, [])

  const handleCtaClick = useCallback(() => {
    trackEvent('cta_clicked')
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side - Inputs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6" style={{ overflow: 'visible' }}>
        <div className="space-y-6">
          <VehicleClassSelect
            value={evModelId}
            onChange={handleEvModelChange}
          />

          <NumberInput
            id="dailyKm"
            label="Daily driving distance"
            value={dailyKm}
            onChange={handleDailyKmChange}
            suffix="km"
            min={LIMITS.dailyKm.min}
            max={LIMITS.dailyKm.max}
            tooltip="Your average daily round-trip driving distance in kilometres."
          />

          <NumberInput
            id="electricityRate"
            label="Electricity rate"
            value={electricityRate}
            onChange={handleElectricityRateChange}
            prefix="$"
            suffix="/kWh"
            min={LIMITS.electricityRate.min}
            max={LIMITS.electricityRate.max}
            decimals={2}
            step={0.01}
            tooltip="Your home electricity rate. The Canadian average is about $0.13/kWh."
          />

          <NumberInput
            id="gasPrice"
            label="Gas price"
            value={gasPrice}
            onChange={handleGasPriceChange}
            prefix="$"
            suffix="/L"
            min={LIMITS.gasPrice.min}
            max={LIMITS.gasPrice.max}
            decimals={2}
            step={0.01}
            tooltip="Current gas price per litre in your area."
          />
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Estimates based on average efficiency for the selected vehicle class. Actual costs vary with driving habits, climate, and vehicle model.
        </p>
      </div>

      {/* Right side - Results */}
      <Results results={results} onCtaClick={handleCtaClick} />
    </div>
  )
}

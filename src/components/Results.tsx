'use client'

import { CalcResults } from '@/lib/calc'
import { formatCurrency, formatCostPerKm } from '@/lib/formatters'
import { Tooltip, InfoIcon } from './Tooltip'

interface ResultsProps {
  results: CalcResults | null
  onCtaClick: () => void
}

export function Results({ results, onCtaClick }: ResultsProps) {
  // Empty state
  if (!results) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 h-full flex flex-col min-h-[300px]">
        <p className="text-gray-900 font-medium text-center mb-4">Your estimated monthly savings</p>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-5xl font-bold text-gray-300">$0</p>
        </div>
        <p className="text-sm text-gray-400 text-center mt-4 mb-4">
          Enter your daily driving distance to see results
        </p>
        <a
          href="https://www.clutch.ca/vehicles?fuel_type=electric"
          onClick={onCtaClick}
          className="w-full px-6 py-3.5 font-medium rounded-full transition-colors text-center block"
          style={{ backgroundColor: '#FF464C', color: '#ffffff' }}
        >
          Browse EVs on Clutch
        </a>
      </div>
    )
  }

  const {
    monthlyEVCost,
    monthlyGasCost,
    monthlySavings,
    annualSavings,
    costPerKmEV,
    costPerKmGas,
  } = results

  const savingsColor = monthlySavings > 0
    ? '#16a34a'
    : monthlySavings < 0
      ? '#dc2626'
      : '#d1d5db'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <p className="text-gray-900 font-medium text-center">Your estimated monthly savings</p>

      {/* Hero number */}
      <p
        className="text-5xl sm:text-6xl font-bold text-center my-4"
        style={{ color: savingsColor }}
      >
        {formatCurrency(monthlySavings)}
      </p>

      {/* Breakdown */}
      <div className="space-y-3 mt-2 flex-1">
        <ResultRow
          label="Monthly EV cost"
          value={formatCurrency(monthlyEVCost, true)}
          tooltip="Estimated monthly electricity cost to charge your EV based on daily driving."
        />
        <ResultRow
          label="Monthly gas cost"
          value={formatCurrency(monthlyGasCost, true)}
          tooltip="Estimated monthly fuel cost for an equivalent gas vehicle."
        />

        <div className="border-t border-gray-200 my-3" />

        <ResultRow
          label="Monthly savings"
          value={formatCurrency(monthlySavings, true)}
          valueClass={monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}
        />
        <ResultRow
          label="Annual savings"
          value={formatCurrency(annualSavings)}
          valueClass={annualSavings >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}
          bold
        />

        <div className="border-t border-gray-200 my-3" />

        <ResultRow
          label="Cost per km (EV)"
          value={formatCostPerKm(costPerKmEV)}
        />
        <ResultRow
          label="Cost per km (gas)"
          value={formatCostPerKm(costPerKmGas)}
        />
      </div>

      {/* Segue */}
      <p className="text-sm text-gray-600 text-center mt-4 mb-4">
        Ready to make the switch? Find your next EV on Clutch.
      </p>

      {/* CTA */}
      <a
        href="https://www.clutch.ca/vehicles?fuel_type=electric"
        onClick={onCtaClick}
        className="w-full px-6 py-3.5 font-medium rounded-full transition-colors text-center block"
        style={{ backgroundColor: '#FF464C', color: '#ffffff' }}
      >
        Browse EVs on Clutch
      </a>
    </div>
  )
}

interface ResultRowProps {
  label: string
  value: string
  tooltip?: string
  valueClass?: string
  bold?: boolean
}

function ResultRow({ label, value, tooltip, valueClass, bold }: ResultRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm text-gray-600 flex items-center ${bold ? 'font-semibold text-gray-900' : ''}`}>
        {label}
        {tooltip && (
          <Tooltip content={tooltip}>
            <InfoIcon />
          </Tooltip>
        )}
      </span>
      <span className={`text-sm font-medium ${valueClass || 'text-gray-900'}`}>
        {value}
      </span>
    </div>
  )
}

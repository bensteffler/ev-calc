'use client'

import { vehicleClasses, getVehicleClass } from '@/lib/constants'

interface VehicleClassSelectProps {
  value: string
  onChange: (value: string) => void
}

export function VehicleClassSelect({ value, onChange }: VehicleClassSelectProps) {
  const selected = getVehicleClass(value)

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="vehicleClass" className="text-sm font-medium text-gray-900">
          Vehicle class
        </label>
        <div className="relative flex-1 max-w-[200px]">
          <select
            id="vehicleClass"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white appearance-none
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer"
          >
            {vehicleClasses.map((vc) => (
              <option key={vc.id} value={vc.id}>
                {vc.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        e.g. {selected.examples} &middot; {selected.evEfficiency} kWh/100km EV &middot; {selected.gasConsumption} L/100km gas
      </p>
    </div>
  )
}

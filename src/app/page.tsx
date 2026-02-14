'use client'

import { Calculator } from '@/components/Calculator'
import { DevPanel } from '@/components/DevPanel'

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 sm:py-12 bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            EV cost to drive calculator
          </h1>
          <p className="text-gray-500 mt-2">
            See how much you could save driving electric vs. gas
          </p>
        </div>

        {/* Calculator */}
        <Calculator />

        {/* Footer note */}
        <p className="text-sm text-gray-400">
          This calculator provides estimates only. Actual costs may vary based on your vehicle, driving habits, and local rates.
        </p>
      </div>

      {/* Dev panel for analytics */}
      <DevPanel />
    </main>
  )
}

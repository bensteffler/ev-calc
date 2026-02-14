import React from 'react'
import ReactDOM from 'react-dom/client'
import { Calculator } from '../src/components/Calculator'
import './widget.css'

// Widget entry point
function ClutchEVCalculator() {
  return (
    <div className="clutch-ev-calculator">
      <Calculator />
    </div>
  )
}

// Auto-mount when script loads
function mount() {
  const container = document.getElementById('clutch-ev-calculator')
  if (container) {
    const root = ReactDOM.createRoot(container)
    root.render(<ClutchEVCalculator />)
  }
}

// Mount on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}

// Also export for manual mounting
;(window as any).ClutchEVCalculator = {
  mount: (elementId: string) => {
    const container = document.getElementById(elementId)
    if (container) {
      const root = ReactDOM.createRoot(container)
      root.render(<ClutchEVCalculator />)
    }
  }
}

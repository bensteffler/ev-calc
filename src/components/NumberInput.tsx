'use client'

import { useState, ChangeEvent, FocusEvent } from 'react'
import { parseNumericInput } from '@/lib/formatters'
import { Tooltip, InfoIcon } from './Tooltip'

interface NumberInputProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  tooltip?: string
  step?: number
  min?: number
  max?: number
  decimals?: number
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  tooltip,
  step,
  min,
  max,
  decimals = 0,
}: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const formatDisplay = (val: number): string => {
    if (val === 0 && !isFocused) return ''
    if (isFocused) {
      return val > 0 ? (decimals > 0 ? val.toString() : val.toString()) : ''
    }
    const formatted = decimals > 0
      ? val.toFixed(decimals)
      : val.toLocaleString('en-CA')
    const parts: string[] = []
    if (prefix) parts.push(prefix)
    parts.push(formatted)
    if (suffix) parts.push(suffix)
    return parts.join(' ')
  }

  const displayValue = formatDisplay(value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const parsed = parseNumericInput(raw)
    if (max !== undefined && parsed > max) {
      onChange(max)
      return
    }
    if (min !== undefined && parsed < min) {
      onChange(min)
      return
    }
    onChange(parsed)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    setTimeout(() => e.target.select(), 0)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const placeholder = [prefix, '0', suffix].filter(Boolean).join(' ')

  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-900 flex items-center whitespace-nowrap">
        {label}
        {tooltip && (
          <Tooltip content={tooltip}>
            <InfoIcon />
          </Tooltip>
        )}
      </label>
      <div className="relative flex-1 max-w-[200px]">
        <input
          type="text"
          id={id}
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          step={step}
          className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 text-right focus:outline-none"
          style={{
            border: isFocused ? '2px solid #000000' : '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (!isFocused) {
              e.currentTarget.style.borderColor = '#000000'
            }
          }}
          onMouseLeave={(e) => {
            if (!isFocused) {
              e.currentTarget.style.borderColor = '#e5e7eb'
            }
          }}
        />
      </div>
    </div>
  )
}

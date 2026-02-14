/**
 * Local Analytics Event Tracking
 *
 * Tracks user interactions in console and in-memory storage.
 * No external services - all local.
 */

export type EventType =
  | 'input_started'
  | 'daily_km_entered'
  | 'electricity_rate_entered'
  | 'gas_price_entered'
  | 'ev_model_selected'
  | 'result_viewed'
  | 'cta_clicked'

export interface AnalyticsEvent {
  id: string
  type: EventType
  timestamp: Date
  metadata?: Record<string, unknown>
}

// In-memory event store
let events: AnalyticsEvent[] = []
let hasStartedInput = false

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function trackEvent(type: EventType, metadata?: Record<string, unknown>): void {
  // Skip duplicate input_started events
  if (type === 'input_started') {
    if (hasStartedInput) return
    hasStartedInput = true
  }

  const event: AnalyticsEvent = {
    id: generateId(),
    type,
    timestamp: new Date(),
    metadata,
  }

  events.push(event)

  // Log to console in dev
  console.log(`[Analytics] ${type}`, metadata || '')
}

export function getEvents(): AnalyticsEvent[] {
  return [...events]
}

export function clearEvents(): void {
  events = []
  hasStartedInput = false
}

export function getEventCounts(): Record<EventType, number> {
  const counts: Record<string, number> = {}

  for (const event of events) {
    counts[event.type] = (counts[event.type] || 0) + 1
  }

  return counts as Record<EventType, number>
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

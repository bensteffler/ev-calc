export interface VehicleClass {
  id: string
  label: string
  evEfficiency: number    // kWh per 100 km
  gasConsumption: number  // L per 100 km
  examples: string
}

export const vehicleClasses: VehicleClass[] = [
  {
    id: 'compact',
    label: 'Compact / Sedan',
    evEfficiency: 16,
    gasConsumption: 8,
    examples: 'Tesla Model 3, Hyundai Ioniq 6',
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    evEfficiency: 20,
    gasConsumption: 10,
    examples: 'Tesla Model Y, Hyundai Ioniq 5',
  },
  {
    id: 'truck',
    label: 'Truck / Large',
    evEfficiency: 28,
    gasConsumption: 13,
    examples: 'F-150 Lightning, RAM 1500',
  },
]

export const DEFAULTS = {
  dailyKm: 40,
  electricityRate: 0.13,
  gasPrice: 1.50,
  vehicleClassId: 'suv',
} as const

export const LIMITS = {
  dailyKm: { min: 0, max: 500 },
  electricityRate: { min: 0, max: 1.00 },
  gasPrice: { min: 0, max: 5.00 },
} as const

export const DAYS_PER_MONTH = 30.44

export function getVehicleClass(id: string): VehicleClass {
  return vehicleClasses.find((vc) => vc.id === id) ?? vehicleClasses[1]
}

export interface VehicleClass {
  id: string
  label: string
  gasConsumption: number  // L per 100 km
}

export const vehicleClasses: VehicleClass[] = [
  {
    id: 'compact',
    label: 'Compact / Sedan',
    gasConsumption: 8,
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    gasConsumption: 10,
  },
  {
    id: 'truck',
    label: 'Truck / Large',
    gasConsumption: 13,
  },
]

export interface EVModel {
  id: string
  name: string
  evEfficiency: number   // kWh per 100 km
  gasClassId: string     // maps to a vehicleClass for gas comparison
}

export const evModels: EVModel[] = [
  { id: 'model-3', name: 'Tesla Model 3', evEfficiency: 14, gasClassId: 'compact' },
  { id: 'ioniq-6', name: 'Hyundai Ioniq 6', evEfficiency: 16, gasClassId: 'compact' },
  { id: 'bolt-ev', name: 'Chevrolet Bolt EV', evEfficiency: 16, gasClassId: 'compact' },
  { id: 'leaf', name: 'Nissan Leaf', evEfficiency: 17, gasClassId: 'compact' },
  { id: 'model-y', name: 'Tesla Model Y', evEfficiency: 16, gasClassId: 'suv' },
  { id: 'ioniq-5', name: 'Hyundai Ioniq 5', evEfficiency: 19, gasClassId: 'suv' },
  { id: 'ev6', name: 'Kia EV6', evEfficiency: 19, gasClassId: 'suv' },
  { id: 'model-x', name: 'Tesla Model X', evEfficiency: 20, gasClassId: 'suv' },
  { id: 'mach-e', name: 'Ford Mustang Mach-E', evEfficiency: 21, gasClassId: 'suv' },
  { id: 'id4', name: 'VW ID.4', evEfficiency: 19, gasClassId: 'suv' },
  { id: 'equinox-ev', name: 'Chevrolet Equinox EV', evEfficiency: 20, gasClassId: 'suv' },
  { id: 'f150-lightning', name: 'Ford F-150 Lightning', evEfficiency: 32, gasClassId: 'truck' },
  { id: 'r1t', name: 'Rivian R1T', evEfficiency: 30, gasClassId: 'truck' },
  { id: 'silverado-ev', name: 'Chevrolet Silverado EV', evEfficiency: 30, gasClassId: 'truck' },
]

export const DEFAULTS = {
  dailyKm: 40,
  electricityRate: 0.13,
  gasPrice: 1.50,
  evModelId: 'model-y',
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

export function getEVModel(id: string): EVModel {
  return evModels.find((m) => m.id === id) ?? evModels.find((m) => m.id === 'model-y')!
}

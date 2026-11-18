export type EquipmentCategory =
  | 'Construction Equipment'
  | 'Agriculture Equipment'
  | 'Power Tools'
  | 'Heavy Machinery'
  | 'Electronics'
  | 'Vehicles'
  | 'Other'

export type RentalType = 'Daily' | 'Weekly' | 'Monthly'

export type EquipmentCondition = 'New' | 'Like New' | 'Good' | 'Fair'

export type EquipmentStatus = 'Pending' | 'Approved' | 'Rejected'

export interface EquipmentOwner {
  name: string
  email: string
  image: string
}

export interface Equipment {
  name: string
  description: string
  category: EquipmentCategory
  location: string
  rentalPrice: number
  rentalType: RentalType
  availableQuantity: number
  condition: EquipmentCondition
  brand?: string
  model?: string
  image: string
  rentalTerms: string
  status: EquipmentStatus
  owner: EquipmentOwner
}

export interface ApiSuccessResponse<T> {
  success: true
  message: string
  data: T
}

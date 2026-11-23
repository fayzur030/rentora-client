export type EquipmentCategory = string

export type RentalType = 'Daily' | 'Weekly' | 'Monthly'

export type EquipmentCondition = 'New' | 'Like New' | 'Good' | 'Fair'

export type EquipmentStatus = 'pending' | 'approved' | 'rejected'

export interface EquipmentOwner {
  ownerId: string
  name: string
  email: string
  image: string
}

export interface Equipment {
  _id?: string
  id?: string
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
  isFeatured: boolean
}

export interface ApiSuccessResponse<T> {
  success: true
  message: string
  data: T
}

// Owner dashboard: my equipments
export type MyEquipment = Equipment[]

// popular equipments by category

export interface PopularEquipments {
  name: string
  slug: string
  image: string
}

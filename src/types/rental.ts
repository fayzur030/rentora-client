export interface RentalOwner {
  ownerId: string
  name: string
  image: string
  email: string
}

export interface RentalCustomer {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  image: string
  createdAt: string
  updatedAt: string
  role: 'customer' | 'owner' | 'admin'
}

export interface RentalEquipment {
  _id: string
  name: string
  description: string
  category: string
  location: string
  rentalPrice: number
  rentalType: string
  availableQuantity: number
  condition: string
  brand: string
  model: string
  image: string
  rentalTerms: string
  status: string
  owner: RentalOwner
}

export interface RentalTransaction {
  paymentIntentId: string
  amount: number
  currency: string
  paidAt: string
}

export interface Rental {
  _id: string
  stripeSessionId: string
  equipmentName: string
  startDate: string
  endDate: string
  rentalDuration: number
  equipmentId: string
  quantity: number
  pricePerDay: number
  totalAmount: number
  userEmail: string
  contactNumber: string
  deliveryAddress: string
  additionalNotes: string
  bookingStatus: string
  paymentStatus: string
  transaction: RentalTransaction
  createdAt: string
  updatedAt: string
  customer: RentalCustomer | null
  owner: RentalOwner | null
  equipment: RentalEquipment | null
}

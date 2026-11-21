export interface BookingFormData {
  rentalStartDate: string
  rentalEndDate: string
  quantity: number
  contactNumber: string
  deliveryAddress: string
}

export interface BookingFormErrors {
  rentalStartDate?: string
  rentalEndDate?: string
  quantity?: string
  contactNumber?: string
  deliveryAddress?: string
}

export interface BookingPayload {
  userEmail: string
  equipmentId: string
  startDate: string
  endDate: string
  quantity: number
  contactNumber: string
  deliveryAddress: string
  additionalNotes?: string
}

export interface BookingResponse {
  success: boolean
  message: string
  data: {
    bookingId: string
    redirectUrl: string
  }
}

export interface BookingRental {
  _id: string
  stripeSessionId: string
  startDate: string
  endDate: string
  rentalDuration: number
  equipmentId: string
  equipmentName?: string
  customerName?: string
  quantity: number
  pricePerDay: number
  totalAmount: number
  userEmail: string
  contactNumber: string
  deliveryAddress: string
  additionalNotes: string
  bookingStatus: 'pending' | 'confirmed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  transaction: {
    paymentIntentId: string
    amount: number
    currency: string
    paidAt: string
  }
  createdAt: string
  updatedAt: string
}

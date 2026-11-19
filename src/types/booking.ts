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

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

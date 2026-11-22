import { BookingFormData, BookingFormErrors } from '@/types/booking'

export const validateBookingForm = (
  data: BookingFormData,
  availableQuantity: number
) => {
  const errors: BookingFormErrors = {}

  // Start Date Validation
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (!data.rentalStartDate) {
    errors.rentalStartDate = 'Start date is required'
  } else if (new Date(`${data.rentalStartDate}T00:00:00`) < today) {
    errors.rentalStartDate = 'Start date cannot be in the past'
  }

  // End Date Validation

  if (!data.rentalEndDate) {
    errors.rentalEndDate = 'End date is required'
  } else if (
    data.rentalStartDate &&
    data.rentalEndDate &&
    data.rentalEndDate <= data.rentalStartDate
  ) {
    errors.rentalEndDate = 'End date must be after start date'
  }
  // Quantity Validation
  if (!Number.isInteger(data.quantity) || data.quantity < 1) {
    errors.quantity = 'Quantity must be at least 1'
  } else if (data.quantity > availableQuantity) {
    errors.quantity = `Only ${availableQuantity} units available`
  }

  // Contact Number Validation
  const phone = data.contactNumber.replace(/[\s-]/g, '')
  if (!phone) {
    errors.contactNumber = 'Contact number is required'
  } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(phone)) {
    errors.contactNumber = 'Enter a valid Bangladeshi phone number'
  }
  // Delivery Address Validation
  if (!data.deliveryAddress.trim()) {
    errors.deliveryAddress = 'Delivery address is required'
  } else if (data.deliveryAddress.trim().length < 10) {
    errors.deliveryAddress = 'Address must be at least 10 characters'
  }
  return errors
}

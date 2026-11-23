import type { Equipment } from '@/types/equipment'

export const equipmentForm = (data: Equipment): string | null => {
  if (!data.name.trim()) {
    return 'Please enter the equipment name.'
  }

  if (!data.description.trim()) {
    return 'Please enter an equipment description.'
  }

  if (!data.category.trim()) {
    return 'Please choose an equipment category.'
  }

  if (!data.location.trim()) {
    return 'Please enter the equipment location.'
  }

  if (!Number.isFinite(data.rentalPrice) || data.rentalPrice <= 0) {
    return 'Rental price must be greater than 0.'
  }

  const rentalTypes = ['Daily', 'Weekly', 'Monthly']
  if (!rentalTypes.includes(data.rentalType)) {
    return 'Please choose a valid rental type.'
  }

  if (
    !Number.isInteger(data.availableQuantity) ||
    data.availableQuantity < 1
  ) {
    return 'Available quantity must be a whole number greater than 0.'
  }

  const conditions = ['New', 'Like New', 'Good', 'Fair']
  if (!conditions.includes(data.condition)) {
    return 'Please choose the equipment condition.'
  }

  if (!data.brand?.trim()) {
    return 'Please enter the equipment brand.'
  }

  if (!data.model?.trim()) {
    return 'Please enter the equipment model.'
  }

  if (!data.image.trim()) {
    return 'Please upload an equipment image.'
  }

  if (!data.rentalTerms.trim()) {
    return 'Please enter the rental terms and conditions.'
  }

  if (!data.owner.ownerId || !data.owner.name || !data.owner.email) {
    return 'Your owner information is missing. Please sign in again.'
  }

  return null
}

'use client'

import ErrorState from '@/components/shared/ErrorState'

interface MyEquipmentRentalsErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error boundary for Owner My Equipment Rentals page
 */
export default function MyEquipmentRentalsError({
  error,
  reset,
}: MyEquipmentRentalsErrorProps) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      title='Rental Bookings Error'
      message='Failed to load rental bookings for your equipment. Please try again.'
    />
  )
}

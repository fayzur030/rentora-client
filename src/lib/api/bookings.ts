import { BookingRental } from '@/types/booking'
import { baseUrl } from '../config'

export const getMyRentals = async (query = ''): Promise<BookingRental[]> => {
  const res = await fetch(`${baseUrl}/api/bookings/my-rentals?${query}`, {
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

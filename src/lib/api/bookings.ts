import { BookingRental } from '@/types/booking'
import { baseUrl } from '../config'

export const getMyRentals = async (
  token: string | null
): Promise<BookingRental[]> => {
  if (!token) {
    return []
  }

  const res = await fetch(`${baseUrl}/api/bookings/my-rentals?`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

// owner dashboard: => rentals of my equipment

export const getMyEquipmentRentals = async (
  token: string | null
): Promise<BookingRental[]> => {
  if (!token) {
    return []
  }

  const res = await fetch(`${baseUrl}/api/equipment/my-equipment-rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipment rentals')
  }

  return result.data
}

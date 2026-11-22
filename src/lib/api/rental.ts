import { Rental } from '@/types/rental'
import { getTokenFromServer } from '../auth/getTokenFromServer'
import { baseUrl } from '../config'

export const getAllRentals = async (): Promise<Rental[]> => {
  const token = await getTokenFromServer()

  if (!token) {
    return []
  }

  const response = await fetch(`${baseUrl}/api/bookings/admin/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to retrieve rentals')
  }

  return result.data
}

import { baseUrl } from '../config'
import type { Equipment } from '@/types/equipment'
import { getTokenFromServer } from '../auth/getTokenFromServer'

export const getFavorites = async (userId: string): Promise<Equipment[]> => {
  const token = await getTokenFromServer()

  if (!token) {
    throw new Error('Please log in to view favorites')
  }

  const query = new URLSearchParams({ userId })

  const res = await fetch(`${baseUrl}/api/favorite/favorites?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? 'Your session has expired. Please log in again.'
        : result.message || 'Failed to fetch favorites'
    )
  }

  return result.data
}

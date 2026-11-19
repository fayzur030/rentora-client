import { baseUrl } from '../config'
import type { Equipment } from '@/types/equipment'

export const getFavorites = async (userId: string): Promise<Equipment[]> => {
  const query = new URLSearchParams({ userId })

  const res = await fetch(`${baseUrl}/api/favorite/favorites?${query}`, {
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch favorites')
  }

  return result.data
}

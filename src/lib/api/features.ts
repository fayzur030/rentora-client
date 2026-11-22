import { baseUrl } from '../config'
import type { Equipment } from '@/types/equipment'

export const getFeaturedEquipments = async (): Promise<Equipment[]> => {
  const res = await fetch(`${baseUrl}/api/equipment/featured-equipment`, {
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch featured equipment')
  }

  return result.data
}

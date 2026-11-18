import { Equipment } from '@/types/equipment'
import { baseUrl } from '../config'

export const getAllEquipments = async (
  query: string = ''
): Promise<Equipment[]> => {
  const res = await fetch(`${baseUrl}/api/equipment/equipments?${query}`, {
    next: { revalidate: 60 },
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

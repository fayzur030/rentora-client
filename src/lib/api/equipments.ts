import { Equipment } from '@/types/equipment'
import { baseUrl } from '../config'

export const getAllEquipments = async (query = ''): Promise<Equipment[]> => {
  const res = await fetch(`${baseUrl}/api/equipment/equipments?${query}`, {
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipments')
  }

  return result.data
}

// get equipmentById

export const getEquipmentById = async (id: string): Promise<Equipment> => {
  const res = await fetch(`${baseUrl}/api/equipment/equipment/${id}`)

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch equipment')
  }

  return result.data
}

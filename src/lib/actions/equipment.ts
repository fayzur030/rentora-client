import { Equipment } from '@/types/equipment'
import { baseUrl } from '../config'

export const createEquipment = async (payload: Equipment) => {
  const res = await fetch(`${baseUrl}/api/equipment/add-equipment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to create equipment')
  }
  return result
}

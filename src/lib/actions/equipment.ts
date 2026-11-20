import { Equipment } from '@/types/equipment'
import { baseUrl } from '../config'
import { getTokenFromClient } from '../auth/getTokenFromClient'

export const createEquipment = async (payload: Equipment) => {
  const token = await getTokenFromClient()

  if (!token) {
    throw new Error('Please log in to add equipment')
  }

  const res = await fetch(`${baseUrl}/api/equipment/add-equipment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? 'Your session has expired. Please log in again.'
        : result.message || 'Failed to create equipment'
    )
  }
  return result
}

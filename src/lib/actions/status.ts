import { getTokenFromClient } from '../auth/getTokenFromClient'
import { baseUrl } from '../config'

export const updateEquipmentStatus = async (
  equipmentId: string,
  status: string
) => {
  const token = await getTokenFromClient()

  if (!token) {
    throw new Error('Please log in to update equipment status')
  }

  const res = await fetch(
    `${baseUrl}/api/equipment/update-status/${equipmentId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to update equipment status')
  }

  return result
}

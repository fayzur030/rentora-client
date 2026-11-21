import type { UserRole } from '@/types/users'
import { getTokenFromClient } from '../auth/getTokenFromClient'
import { baseUrl } from '../config'

export const updateUserRole = async (userId: string, role: UserRole) => {
  const token = await getTokenFromClient()

  if (!token) {
    throw new Error('Please log in to update a user role')
  }

  const res = await fetch(`${baseUrl}/api/users/update-role/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to update user role')
  }

  return result
}

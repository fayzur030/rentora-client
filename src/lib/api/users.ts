import type { Users } from '@/types/users'
import { baseUrl } from '../config'
import { getTokenFromServer } from '../auth/getTokenFromServer'

export const getAllUsers = async (): Promise<Users[]> => {
  const token = await getTokenFromServer()
  if (!token) {
    throw new Error('Please log in to view users')
  }
  const res = await fetch(`${baseUrl}/api/users/all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch users')
  }

  return result.data
}

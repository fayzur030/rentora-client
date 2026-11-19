import { baseUrl } from '../config'

export const addFavorite = async (userId: string, equipmentId: string) => {
  const res = await fetch(`${baseUrl}/api/favorite/add-favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      equipmentId,
    }),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to add favorite')
  }

  return result
}

// Remove favorite

export const removeFavorite = async (userId: string, equipmentId: string) => {
  const res = await fetch(`${baseUrl}/api/favorite/remove-favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, equipmentId }),
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Failed to remove favorite')
  }
  return result
}

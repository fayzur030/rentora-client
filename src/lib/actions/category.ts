import type { CreateCategoryInput } from '@/types/category'

import { baseUrl } from '../config'
import { getTokenFromClient } from '../auth/getTokenFromClient'

export const createCategory = async (payload: CreateCategoryInput) => {
  const token = await getTokenFromClient()

  if (!token) {
    throw new Error('Please log in to add a category')
  }

  const name = payload.name.trim()
  const slug = payload.slug.trim()

  if (!name || !slug) {
    throw new Error('Category name and slug are required')
  }

  const res = await fetch(`${baseUrl}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
    body: JSON.stringify({ name, slug }),
  })

  const result = await res.json()
  console.log(result)
  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? 'Your session has expired. Please log in again.'
        : result.message || 'Failed to create category'
    )
  }

  return result
}

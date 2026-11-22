import { Category } from '@/types/category'
import { baseUrl } from '../config'


export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: 'no-store',
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch categories')
  }

  return result.data
}

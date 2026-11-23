import type { Metadata } from 'next'
import CategoryManagement from '@/components/dashboard/admin/CategoryManagement'
import { getCategories } from '@/lib/api/category'
import type { Category } from '@/types/category'
import { unstable_rethrow } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Manage Categories',
  description: 'Create and manage equipment categories on Rentora.',
}

const AddCategoryPage = async () => {
  let categories: Category[] = []
  let errorMessage: string | null = null

  try {
    categories = await getCategories()
    console.log(categories)
  } catch (error) {
    unstable_rethrow(error)
    errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch categories'
  }

  return (
    <CategoryManagement categories={categories} errorMessage={errorMessage} />
  )
}

export default AddCategoryPage

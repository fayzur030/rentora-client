import CategoryManagement from '@/components/dashboard/admin/CategoryManagement'
import { getCategories } from '@/lib/api/category'
import type { Category } from '@/types/category'
import { unstable_rethrow } from 'next/navigation'

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

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import AddCategoryDialog from '@/components/dashboard/admin/AddCategoryDialog'
import CategoryTable from '@/components/dashboard/admin/CategoryTable'
import DeleteCategoryDialog from '@/components/dashboard/admin/DeleteCategoryDialog'
import UpdateCategoryDialog from '@/components/dashboard/admin/UpdateCategoryDialog'
import type { Category } from '@/types/category'

interface CategoryManagementProps {
  categories: Category[]
  errorMessage: string | null
}

const CategoryManagement = ({
  categories,
  errorMessage,
}: CategoryManagementProps) => {
  const router = useRouter()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null
  )

  const refreshPage = () => {
    router.refresh()
  }

  return (
    <div className='space-y-6'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between gap-4'>
        <div className='space-y-1'>
          <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
            Categories
          </h1>
          <p className='text-sm text-muted-foreground'>
            Manage categories for rental equipment.
          </p>
        </div>

        <AddCategoryDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          onAdded={refreshPage}
        />
      </div>

      <CategoryTable
        categories={categories}
        errorMessage={errorMessage}
        onEdit={setEditingCategory}
        onDelete={setDeletingCategory}
      />

      {editingCategory && (
        <UpdateCategoryDialog
          key={editingCategory._id}
          category={editingCategory}
          open
          onOpenChange={(open) => {
            if (!open) setEditingCategory(null)
          }}
          onUpdated={refreshPage}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          open
          onOpenChange={(open) => {
            if (!open) setDeletingCategory(null)
          }}
          onDeleted={refreshPage}
        />
      )}
    </div>
  )
}

export default CategoryManagement

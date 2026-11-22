'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import AddCategoryDialog from '@/components/dashboard/admin/AddCategoryDialog'
import CategoryTable from '@/components/dashboard/admin/CategoryTable'
import DeleteCategoryDialog from '@/components/dashboard/admin/DeleteCategoryDialog'
import UpdateCategoryDialog from '@/components/dashboard/admin/UpdateCategoryDialog'
import { getCategories } from '@/lib/api/category'
import type { Category } from '@/types/category'

const AddCategoryPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const loadCategories = async () => {
    try {
      setIsLoading(true)
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch categories'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to fetch categories'
        )
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsEditOpen(true)
  }

  const handleDelete = (category: Category) => {
    setDeletingCategory(category)
    setIsDeleteOpen(true)
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
          onAdded={loadCategories}
        />
      </div>

      <CategoryTable
        categories={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editingCategory && (
        <UpdateCategoryDialog
          key={editingCategory._id}
          category={editingCategory}
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open)
            if (!open) setEditingCategory(null)
          }}
          onUpdated={loadCategories}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          open={isDeleteOpen}
          onOpenChange={(open) => {
            setIsDeleteOpen(open)
            if (!open) setDeletingCategory(null)
          }}
          onDeleted={loadCategories}
        />
      )}
    </div>
  )
}

export default AddCategoryPage

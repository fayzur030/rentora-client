'use client'

import { useState, type FormEvent } from 'react'
import { LoaderCircle, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateCategory } from '@/lib/actions/category'
import type { Category } from '@/types/category'

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

interface UpdateCategoryDialogProps {
  category: Category | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdated: () => void
}

const UpdateCategoryDialog = ({
  category,
  open,
  onOpenChange,
  onUpdated,
}: UpdateCategoryDialogProps) => {
  const [name, setName] = useState(category?.name ?? '')
  const [slug, setSlug] = useState(category?.slug ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!category) return

    try {
      setIsSubmitting(true)
      const result = await updateCategory(category._id, { name, slug })
      toast.success(result.message || 'Category updated successfully')
      onOpenChange(false)
      onUpdated()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update category'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl sm:max-w-lg'
      >
        <DialogHeader className='border-b border-border px-5 py-5 pr-14 sm:px-6'>
          <DialogTitle className='font-heading text-lg font-bold text-foreground sm:text-xl'>
            Update Category
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground'>
            Update the category name or slug.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-5 px-5 py-5 sm:px-6'>
            <div className='space-y-2'>
              <Label htmlFor='update-category-name'>Category name</Label>
              <Input
                id='update-category-name'
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setSlug(createSlug(event.target.value))
                }}
                required
                className='h-11'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='update-category-slug'>Slug</Label>
              <Input
                id='update-category-slug'
                value={slug}
                onChange={(event) => setSlug(createSlug(event.target.value))}
                required
                className='h-11'
              />
            </div>
          </div>

          <DialogFooter className='border-t border-border bg-muted/20 px-5 py-4 sm:px-6'>
            <div className='flex w-full flex-col-reverse justify-end gap-2 sm:flex-row'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting} className='gap-2'>
                {isSubmitting ? (
                  <LoaderCircle
                    className='size-4 animate-spin'
                    aria-hidden='true'
                  />
                ) : (
                  <Send className='size-4' aria-hidden='true' />
                )}
                {isSubmitting ? 'Saving...' : 'Update Category'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCategoryDialog

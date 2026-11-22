'use client'

import { useState } from 'react'
import { LoaderCircle, Trash2, TriangleAlert } from 'lucide-react'
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
import { deleteCategory } from '@/lib/actions/category'
import type { Category } from '@/types/category'

interface DeleteCategoryDialogProps {
  category: Category | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted: () => void
}

const DeleteCategoryDialog = ({
  category,
  open,
  onOpenChange,
  onDeleted,
}: DeleteCategoryDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!category) return

    try {
      setIsDeleting(true)
      const result = await deleteCategory(category._id)
      toast.success(result.message || 'Category deleted successfully')
      onOpenChange(false)
      onDeleted()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete category'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isDeleting) onOpenChange(nextOpen)
      }}
    >
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl sm:max-w-md'
      >
        <DialogHeader className='border-b border-border px-6 py-5 pr-14'>
          <div className='flex items-center gap-3'>
            <span className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive shadow-2xs'>
              <TriangleAlert className='size-5' aria-hidden='true' />
            </span>
            <div className='space-y-0.5'>
              <DialogTitle className='font-heading text-lg font-bold text-foreground'>
                Delete Category
              </DialogTitle>
              <DialogDescription className='text-xs text-muted-foreground'>
                Please review before confirming deletion.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-3 px-6 py-5 text-sm'>
          <p className='leading-relaxed text-muted-foreground'>
            Are you sure you want to permanently delete{' '}
            <span className='font-semibold text-foreground'>
              &quot;{category?.name}&quot;
            </span>
            ?
          </p>
          <div className='rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive'>
            Warning: This action is permanent and cannot be undone.
          </div>
        </div>

        <DialogFooter className='border-t border-border bg-muted/20 px-6 py-4'>
          <div className='flex w-full flex-col-reverse justify-end gap-2 sm:flex-row'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              disabled={isDeleting}
              className='gap-2'
            >
              {isDeleting ? (
                <LoaderCircle
                  className='size-4 animate-spin'
                  aria-hidden='true'
                />
              ) : (
                <Trash2 className='size-4' aria-hidden='true' />
              )}
              {isDeleting ? 'Deleting...' : 'Delete Category'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCategoryDialog

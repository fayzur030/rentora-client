'use client'

import { useState, type FormEvent } from 'react'
import { LoaderCircle, Plus, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CategoryImageUpload from '@/components/dashboard/admin/CategoryImageUpload'
import { createCategory } from '@/lib/actions/category'

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdded: () => void
}

const AddCategoryDialog = ({
  open,
  onOpenChange,
  onAdded,
}: AddCategoryDialogProps) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [image, setImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNameChange = (value: string) => {
    setName(value)
    setSlug(createSlug(value))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !slug.trim()) {
      toast.error('Category name and slug are required')
      return
    }

    try {
      setIsSubmitting(true)
      const result = await createCategory({ name, slug, image })
      toast.success(result.message || 'Category added successfully')
      setName('')
      setSlug('')
      setImage('')
      onOpenChange(false)
      onAdded()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add category'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button type='button' className='shrink-0 gap-2 shadow-2xs'>
            <Plus className='size-4' aria-hidden='true' />
            Add Category
          </Button>
        }
      />

      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl sm:max-w-lg'
      >
        <DialogHeader className='border-b border-border px-5 py-5 pr-14 sm:px-6'>
          <DialogTitle className='font-heading text-lg font-bold text-foreground sm:text-xl'>
            Add Category
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground'>
            Create a category for organizing rental equipment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-5 px-5 py-5 sm:px-6'>
            <div className='space-y-2'>
              <Label htmlFor='category-name'>Category name</Label>
              <Input
                id='category-name'
                name='name'
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder='Enter a category name'
                required
                className='h-11'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='category-slug'>Slug</Label>
              <Input
                id='category-slug'
                name='slug'
                value={slug}
                onChange={(event) => setSlug(createSlug(event.target.value))}
                placeholder='e.g. construction-equipment'
                required
                className='h-11'
              />
            </div>

            <CategoryImageUpload
              id='category-image'
              value={image}
              onChange={setImage}
            />
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
                {isSubmitting ? 'Adding...' : 'Add Category'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog

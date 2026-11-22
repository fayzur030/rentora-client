'use client'

import { useState, type FormEvent } from 'react'
import { Tags } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCategory } from '@/lib/actions/category'

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const AddCategory = () => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
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

    setIsSubmitting(true)

    try {
      const result = await createCategory({ name, slug })
      toast.success(result.message || 'Category added successfully')
      setName('')
      setSlug('')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add category'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='mx-auto w-full max-w-7xl space-y-1'>
        <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
          Add category
        </h1>
        <p className='text-sm text-muted-foreground'>
          Create a category for organizing rental equipment.
        </p>
      </div>

      <Card className='mx-auto w-full max-w-7xl'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
              <Tags className='size-5' aria-hidden='true' />
            </div>
            <div>
              <CardTitle>Category details</CardTitle>
              <CardDescription>
                Enter the category name and its URL-friendly slug.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form className='space-y-5' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='category-name'>Category name</Label>
              <Input
                id='category-name'
                name='name'
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder='e.g. Construction Equipment'
                required
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
              />
            </div>

            <div className='flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setName('')
                  setSlug('')
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add category'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCategory

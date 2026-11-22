'use client'

import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Tags,
  Trash2,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Category } from '@/types/category'

interface CategoryTableProps {
  categories: Category[]
  isLoading: boolean
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

const formatDate = (value: string) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const CategoryTable = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: CategoryTableProps) => {
  return (
    <div className='overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs'>
      <Table>
        <TableHeader className='border-b border-border/70 bg-muted/50'>
          <TableRow className='hover:bg-transparent'>
            <TableHead>Category</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className='h-32 text-center'>
                <Loader2
                  className='mx-auto size-5 animate-spin text-muted-foreground'
                  aria-hidden='true'
                />
              </TableCell>
            </TableRow>
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className='h-32 text-center'>
                <div className='flex flex-col items-center gap-2 text-muted-foreground'>
                  <Tags className='size-5' aria-hidden='true' />
                  <p>No categories found.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <span className='font-medium text-foreground'>
                    {category.name}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground'>
                    {category.slug}
                  </span>
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {formatDate(category.createdAt)}
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      type='button'
                      aria-label={`Actions for ${category.name}`}
                      className='inline-flex size-8 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
                    >
                      <MoreHorizontal
                        className='size-4'
                        aria-hidden='true'
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-40'>
                      <DropdownMenuItem
                        onClick={() => onEdit(category)}
                        className='cursor-pointer gap-2'
                      >
                        <Pencil className='size-4' aria-hidden='true' />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant='destructive'
                        onClick={() => onDelete(category)}
                        className='cursor-pointer gap-2'
                      >
                        <Trash2 className='size-4' aria-hidden='true' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CategoryTable

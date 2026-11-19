'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { removeFavorite } from '@/lib/actions/favorite'

interface FavoriteActionsProps {
  userId: string
  equipmentId: string
  equipmentName: string
}

const FavoriteActions = ({
  userId,
  equipmentId,
  equipmentName,
}: FavoriteActionsProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRemoveFavorite = async () => {
    try {
      setLoading(true)
      await removeFavorite(userId, equipmentId)
      toast.success('Removed from favorites')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to remove favorite'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type='button'
        aria-label={`Actions for ${equipmentName}`}
        className='inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50'
        disabled={loading}
      >
        <MoreHorizontal className='size-4' aria-hidden='true' />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem
          render={<Link href={`/all-equipments/${equipmentId}`} />}
          className='cursor-pointer gap-2'
        >
          <Eye aria-hidden='true' />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          variant='destructive'
          disabled={loading}
          onClick={handleRemoveFavorite}
          className='cursor-pointer gap-2'
        >
          <Trash2 aria-hidden='true' />
          {loading ? 'Removing...' : 'Remove Favorite'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FavoriteActions

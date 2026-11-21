'use client'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { addFavorite, removeFavorite } from '@/lib/actions/favorite'
import { getTokenFromClient } from '@/lib/auth/getTokenFromClient'

interface FavoriteButtonProps {
  userId: string
  role?: string
  equipmentId: string
  showLabel?: boolean
  isFavorite?: boolean
}

const FavoriteButton = ({
  userId,
  role,
  equipmentId,
  showLabel = false,
  isFavorite: initialIsFavorite = false,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [loading, setLoading] = useState(false)
  const isCustomer = role === 'customer'

  const handleFavorite = async () => {
    if (!isCustomer) {
      toast.error('Only customers can add equipment to favorites')
      return
    }

    if (!userId) {
      toast.error('Please login to add favorite')
      return
    }
    try {
      setLoading(true)
      if (isFavorite) {
        await removeFavorite(userId, equipmentId)
        setIsFavorite(false)
        toast.success('Removed from favorites')
      } else {
        const token = await getTokenFromClient()

        if (!token) {
          toast.error('Please log in to add favorites')
          return
        }

        await addFavorite(userId, equipmentId, token)
        setIsFavorite(true)
        toast.success('Added to favorites')
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isCustomer) return null

  return (
    <Button
      type='button'
      variant='outline'
      size={showLabel ? 'default' : 'icon'}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      disabled={loading}
      onClick={handleFavorite}
    >
      <Heart
        className={`size-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
      />

      {showLabel && (
        <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
      )}
    </Button>
  )
}

export default FavoriteButton

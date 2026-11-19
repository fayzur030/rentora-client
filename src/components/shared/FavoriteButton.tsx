'use client'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { addFavorite, removeFavorite } from '@/lib/actions/favorite'

interface FavoriteButtonProps {
  userId: string
  equipmentId: string
  showLabel?: boolean
  isFavorite?: boolean
}

const FavoriteButton = ({
  userId,
  equipmentId,
  showLabel = false,
  isFavorite: initialIsFavorite = false,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsFavorite(initialIsFavorite)
  }, [initialIsFavorite])

  const handleFavorite = async () => {
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
        await addFavorite(userId, equipmentId)
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

  return (
    <Button
      type='button'
      variant='outline'
      size={showLabel ? 'default' : 'icon'}
      aria-label='Add to favorites'
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

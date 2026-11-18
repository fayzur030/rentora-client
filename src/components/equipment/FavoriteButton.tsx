import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  isFavorite?: boolean
}

const FavoriteButton = ({ isFavorite = false }: FavoriteButtonProps) => {
  return (
    <button
      type='button'
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className='group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0'
    >
      <Heart
        className={`size-4 transition-transform duration-200 group-hover:scale-110 ${
          isFavorite ? 'fill-current' : ''
        }`}
        aria-hidden='true'
      />
      <span>{isFavorite ? 'Saved to favorites' : 'Add to favorites'}</span>
    </button>
  )
}

export default FavoriteButton

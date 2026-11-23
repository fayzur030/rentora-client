import type { Metadata } from 'next'
import { getFavorites } from '@/lib/api/favorite'
import { getSessionFromServer } from '@/lib/auth/getSessionFromServer'
import FavoritesTable from '@/components/dashboard/customer/FavoritesTable'

export const metadata: Metadata = {
  title: 'Favorite Equipment',
  description: 'Browse the equipment listings you have saved on Rentora.',
}

const FavoritesPage = async () => {
  const session = await getSessionFromServer()
  const userId = session?.user.id
  const favorites = userId ? await getFavorites(userId) : []

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          Favorites
        </h2>
        <p className='text-sm text-muted-foreground'>
          Equipment you saved to rent later.
        </p>
      </div>

      {favorites.length > 0 ? (
        <FavoritesTable equipments={favorites} userId={userId ?? ''} />
      ) : (
        <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
          <p className='text-sm text-muted-foreground'>
            Your favorite equipment will appear here.
          </p>
        </div>
      )}
    </div>
  )
}

export default FavoritesPage

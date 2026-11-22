import StatsGrid from '@/components/dashboard/StatsGrid'
import { getMyRentals } from '@/lib/api/bookings'
import { getFavorites } from '@/lib/api/favorite'
import { getSessionFromServer } from '@/lib/auth/getSessionFromServer'
import { getTokenFromServer } from '@/lib/auth/getTokenFromServer'
import { getCustomerDashboardStats } from '@/lib/dashboard-stats'
import { redirect } from 'next/navigation'

const CustomerDashboard = async () => {
  const token = await getTokenFromServer()

  if (!token) {
    redirect('/login')
  }

  const session = await getSessionFromServer()
  const userId = session?.user.id

  const [rentals, favorites] = await Promise.all([
    getMyRentals(token),
    userId ? getFavorites(userId) : Promise.resolve([]),
  ])

  const stats = getCustomerDashboardStats(rentals, favorites.length)

  return (
    <section className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
          Customer Overview
        </h1>
        <p className='text-sm text-muted-foreground'>
          Review your bookings, active rentals, and completed rentals.
        </p>
      </div>
      <StatsGrid stats={stats} />
    </section>
  )
}

export default CustomerDashboard

import MonthlyEarningsChart from '@/components/dashboard/owner/MonthlyEarningsChart'
import StatsGrid from '@/components/dashboard/StatsGrid'
import { getMyEquipmentRentals } from '@/lib/api/bookings'
import { getMyEquipments } from '@/lib/api/equipments'
import { getTokenFromServer } from '@/lib/auth/getTokenFromServer'
import { getOwnerDashboardStats } from '@/lib/dashboard-stats'
import { redirect } from 'next/navigation'

const OwnerDashboard = async () => {
  const token = await getTokenFromServer()

  if (!token) {
    redirect('/login')
  }

  const [equipments, rentals] = await Promise.all([
    getMyEquipments(),
    getMyEquipmentRentals(token),
  ])

  const stats = getOwnerDashboardStats(equipments, rentals)

  return (
    <section className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
          Owner Overview
        </h1>
        <p className='text-sm text-muted-foreground'>
          Keep track of your listings, current rentals, and paid earnings.
        </p>
      </div>
      <StatsGrid stats={stats} />
      <MonthlyEarningsChart />
    </section>
  )
}

export default OwnerDashboard

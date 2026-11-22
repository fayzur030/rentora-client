import StatsGrid from '@/components/dashboard/StatsGrid'
import { getAllAdminEquipments } from '@/lib/api/equipments'

import { getAllRentals } from '@/lib/api/rental'
import { getAllUsers } from '@/lib/api/users'

import { getAdminDashboardStats } from '@/lib/dashboard-stats'

const AdminDashboard = async () => {
  const [users, equipments, rentals] = await Promise.all([
    getAllUsers(),
    getAllAdminEquipments(),
    getAllRentals(),
  ])

  const stats = getAdminDashboardStats(users, equipments, rentals)

  return (
    <section className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
          Admin Overview
        </h1>
        <p className='text-sm text-muted-foreground'>
          A live summary of users, listings, bookings, and paid rental revenue.
        </p>
      </div>
      <StatsGrid stats={stats} />
    </section>
  )
}

export default AdminDashboard

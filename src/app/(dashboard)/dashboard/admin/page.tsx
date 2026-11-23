import type { Metadata } from 'next'
import StatsGrid from '@/components/dashboard/StatsGrid'
import AdminAnalyticsCharts from '@/components/dashboard/admin/AdminAnalyticsCharts'
import { getAllAdminEquipments } from '@/lib/api/equipments'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Review Rentora platform activity and administrative analytics.',
}

import { getAllRentals } from '@/lib/api/rental'
import { getAllUsers } from '@/lib/api/users'

import {
  getAdminDashboardAnalytics,
  getAdminDashboardStats,
} from '@/lib/dashboard-stats'

const AdminDashboard = async () => {
  const [users, equipments, rentals] = await Promise.all([
    getAllUsers(),
    getAllAdminEquipments(),
    getAllRentals(),
  ])

  const stats = getAdminDashboardStats(users, equipments, rentals)
  const analytics = getAdminDashboardAnalytics(users, rentals)

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
      <AdminAnalyticsCharts analytics={analytics} />
    </section>
  )
}

export default AdminDashboard

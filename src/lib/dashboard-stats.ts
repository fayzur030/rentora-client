import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  Package,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react'

import type { StatsCardProps } from '@/components/dashboard/StatsCard'
import type { BookingRental } from '@/types/booking'
import type { Equipment } from '@/types/equipment'
import type { Rental } from '@/types/rental'
import type { Users as DashboardUser } from '@/types/users'

const formatMoney = (amount: number) => `BDT ${amount.toLocaleString('en-BD')}`

const startOfDay = (date: Date) => {
  const day = new Date(date)
  day.setHours(0, 0, 0, 0)
  return day
}

const isActiveRental = (rental: Rental | BookingRental, today: Date) => {
  const startDate = startOfDay(new Date(rental.startDate))
  const endDate = startOfDay(new Date(rental.endDate))

  return (
    rental.bookingStatus === 'confirmed' &&
    !Number.isNaN(startDate.getTime()) &&
    !Number.isNaN(endDate.getTime()) &&
    startDate <= today &&
    endDate >= today
  )
}

const isCompletedRental = (rental: Rental | BookingRental) =>
  rental.bookingStatus === 'completed'

const countPaidAmount = (rentals: Array<Rental | BookingRental>) =>
  rentals.reduce(
    (total, rental) =>
      rental.paymentStatus === 'paid' ? total + rental.totalAmount : total,
    0
  )

export const getAdminDashboardStats = (
  users: DashboardUser[],
  equipments: Equipment[],
  rentals: Rental[]
): StatsCardProps[] => {
  const pendingApprovals = equipments.filter(
    (equipment) => equipment.status === 'pending'
  ).length

  return [
    {
      icon: Users,
      title: 'Total Users',
      color: 'blue',
      value: users.length,
      description: 'Registered platform users',
    },
    {
      icon: ShieldCheck,
      title: 'Total Owners',
      color: 'indigo',
      value: users.filter((user) => user.role === 'owner').length,
      description: 'Registered equipment owners',
    },
    {
      icon: Package,
      title: 'Total Equipment',
      color: 'violet',
      value: equipments.length,
      description: 'Equipment listings',
    },
    {
      icon: Clock3,
      title: 'Pending Approvals',
      color: 'orange',
      value: pendingApprovals,
      description: 'Listings awaiting review',
    },
    {
      icon: CalendarDays,
      title: 'Total Bookings',
      color: 'cyan',
      value: rentals.length,
      description: 'Rental booking records',
    },
    {
      icon: CheckCircle2,
      title: 'Completed Rentals',
      color: 'emerald',
      value: rentals.filter(isCompletedRental).length,
      description: 'Bookings marked as completed',
    },
    {
      icon: Wallet,
      title: 'Total Revenue',
      color: 'amber',
      value: `৳${getAdminPaidRevenue(rentals).toLocaleString('en-BD')}`,
      description: 'From paid rentals',
    },
  ]
}

export interface AdminAnalyticsData {
  monthlyRevenue: Array<{ month: string; revenue: number }>
  monthlyBookings: Array<{ month: string; bookings: number }>
  bookingStatuses: Array<{ status: string; count: number }>
  userGrowth: Array<{ month: string; users: number }>
}

const getAdminPaidRevenue = (rentals: Rental[]) =>
  rentals.reduce((total, rental) => {
    if (
      rental.paymentStatus !== 'paid' ||
      rental.payment?.paymentStatus !== 'paid'
    ) {
      return total
    }

    return total + rental.totalAmount
  }, 0)

export const getAdminDashboardAnalytics = (
  users: DashboardUser[],
  rentals: Rental[],
  now = new Date()
): AdminAnalyticsData => {
  const dashboardTimeZone = 'Asia/Dhaka'
  const monthParts = new Intl.DateTimeFormat('en-US', {
    timeZone: dashboardTimeZone,
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(now)
  const currentYear = Number(
    monthParts.find((part) => part.type === 'year')?.value
  )
  const currentMonth = Number(
    monthParts.find((part) => part.type === 'month')?.value
  )
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(currentYear, currentMonth - 12 + index, 1))
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
    const label = date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
      timeZone: 'UTC',
    })

    return { key, label }
  })
  const monthlyRevenue = new Map(months.map(({ key }) => [key, 0]))
  const monthlyBookings = new Map(months.map(({ key }) => [key, 0]))
  const userGrowth = new Map(months.map(({ key }) => [key, 0]))

  const getMonthKey = (value: string | Date) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: dashboardTimeZone,
      year: 'numeric',
      month: '2-digit',
    }).formatToParts(date)
    const year = parts.find((part) => part.type === 'year')?.value
    const month = parts.find((part) => part.type === 'month')?.value
    return year && month ? `${year}-${month}` : null
  }

  for (const rental of rentals) {
    const createdMonth = getMonthKey(rental.createdAt)
    if (createdMonth && monthlyBookings.has(createdMonth)) {
      monthlyBookings.set(
        createdMonth,
        (monthlyBookings.get(createdMonth) ?? 0) + 1
      )
    }

    if (
      rental.paymentStatus === 'paid' &&
      rental.payment?.paymentStatus === 'paid'
    ) {
      const paidMonth = getMonthKey(rental.payment.paidAt)
      if (paidMonth && monthlyRevenue.has(paidMonth)) {
        monthlyRevenue.set(
          paidMonth,
          (monthlyRevenue.get(paidMonth) ?? 0) + rental.totalAmount
        )
      }
    }
  }

  for (const user of users) {
    const createdMonth = getMonthKey(user.createdAt)
    if (createdMonth && userGrowth.has(createdMonth)) {
      userGrowth.set(createdMonth, (userGrowth.get(createdMonth) ?? 0) + 1)
    }
  }

  const bookingStatusOrder = [
    ['pending', 'Pending'],
    ['confirmed', 'Confirmed'],
    ['completed', 'Completed'],
    ['cancelled', 'Cancelled'],
  ]

  return {
    monthlyRevenue: months.map(({ key, label }) => ({
      month: label,
      revenue: monthlyRevenue.get(key) ?? 0,
    })),
    monthlyBookings: months.map(({ key, label }) => ({
      month: label,
      bookings: monthlyBookings.get(key) ?? 0,
    })),
    bookingStatuses: bookingStatusOrder.map(([status, label]) => ({
      status: label,
      count: rentals.filter((rental) => rental.bookingStatus === status).length,
    })),
    userGrowth: months.map(({ key, label }) => ({
      month: label,
      users: userGrowth.get(key) ?? 0,
    })),
  }
}

export const getOwnerDashboardStats = (
  equipments: Equipment[],
  rentals: BookingRental[]
): StatsCardProps[] => {
  const today = startOfDay(new Date())
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const paidRentals = rentals.filter(
    (rental) =>
      rental.bookingStatus !== 'cancelled' &&
      rental.paymentStatus === 'paid' &&
      rental.payment?.paymentStatus === 'paid'
  )
  const totalEarnings = paidRentals.reduce(
    (total, rental) => total + rental.totalAmount,
    0
  )
  const monthlyEarnings = paidRentals.reduce((total, rental) => {
    const paidAt = new Date(rental.payment?.paidAt ?? '')
    if (
      Number.isNaN(paidAt.getTime()) ||
      paidAt.getMonth() !== currentMonth ||
      paidAt.getFullYear() !== currentYear
    ) {
      return total
    }

    return total + rental.totalAmount
  }, 0)

  return [
    {
      icon: Package,
      title: 'Total Listed Equipment',
      color: 'violet',
      value: equipments.length,
      description: 'Your equipment listings',
    },
    {
      icon: BadgeCheck,
      title: 'Active Equipment',
      color: 'teal',
      value: equipments.filter((equipment) => equipment.status === 'approved')
        .length,
      description: 'Approved listings',
    },
    {
      icon: Clock3,
      title: 'Pending Equipment',
      color: 'orange',
      value: equipments.filter((equipment) => equipment.status === 'pending')
        .length,
      description: 'Listings awaiting review',
    },
    {
      icon: CalendarDays,
      title: 'Total Bookings',
      color: 'cyan',
      value: rentals.length,
      description: 'Bookings for your equipment',
    },
    {
      icon: Wrench,
      title: 'Active Rentals',
      color: 'sky',
      value: rentals.filter((rental) => isActiveRental(rental, today)).length,
      description: 'Confirmed rentals in progress',
    },
    {
      icon: Wallet,
      title: 'Total Earnings',
      color: 'amber',
      value: formatMoney(totalEarnings),
      description: 'From paid rentals',
    },
    {
      icon: Wallet,
      title: 'Monthly Earnings',
      color: 'indigo',
      value: formatMoney(monthlyEarnings),
      description: 'Paid this month',
    },
    {
      icon: CheckCircle2,
      title: 'Completed Rentals',
      color: 'emerald',
      value: rentals.filter((rental) => rental.bookingStatus === 'completed')
        .length,
      description: 'Bookings marked as completed',
    },
  ]
}

export const getCustomerDashboardStats = (
  rentals: BookingRental[],
  favoriteEquipmentCount: number
): StatsCardProps[] => {
  const today = startOfDay(new Date())

  return [
    {
      icon: CalendarDays,
      title: 'Total Bookings',
      color: 'cyan',
      value: rentals.length,
      description: 'Your rental booking records',
    },
    // {
    //   icon: Clock3,
    //   title: 'Pending Bookings',
    //   value: rentals.filter((rental) => rental.bookingStatus === 'pending')
    //     .length,
    //   description: 'Bookings awaiting confirmation',
    // },
    {
      icon: Wrench,
      title: 'Active Rentals',
      color: 'sky',
      value: rentals.filter((rental) => isActiveRental(rental, today)).length,
      description: 'Confirmed rentals in progress',
    },
    // {
    //   icon: CheckCircle2,
    //   title: 'Completed Rentals',
    //   value: rentals.filter((rental) => isCompletedRental(rental, today))
    //     .length,
    //   description: 'Rentals whose end date has passed',
    // },
    {
      icon: Heart,
      title: 'Favorite Equipment',
      color: 'pink',
      value: favoriteEquipmentCount,
      description: 'Equipment saved to your favorites',
    },
    {
      icon: Wallet,
      title: 'Total Spent',
      color: 'amber',
      value: formatMoney(countPaidAmount(rentals)),
      description: 'From paid rentals',
    },
  ]
}

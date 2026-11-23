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
  XCircle,
} from 'lucide-react'

import type { StatsCardProps } from '@/components/dashboard/StatsCard'
import type { BookingRental } from '@/types/booking'
import type { Equipment } from '@/types/equipment'
import type { Rental } from '@/types/rental'
import type { Users as DashboardUser } from '@/types/users'

type DashboardRental = Rental | BookingRental

const DASHBOARD_TIME_ZONE = 'Asia/Dhaka'

//  money formatting consistent across all dashboard cards.
const formatMoney = (amount: number) => `BDT ${amount.toLocaleString('en-BD')}`

// Return a copy of a date set to midnight,  compare calendar days.
const getStartOfDay = (date: Date) => {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  return startOfDay
}

// Tell whether a confirmed rental includes today's date.
const isActiveRental = (rental: DashboardRental, today: Date) => {
  const startDate = new Date(rental.startDate)
  const endDate = new Date(rental.endDate)

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return false
  }

  const rentalStart = getStartOfDay(startDate)
  const rentalEnd = getStartOfDay(endDate)

  return (
    rental.bookingStatus === 'confirmed' &&
    rentalStart <= today &&
    rentalEnd >= today
  )
}

// Use booking status to decide if a rental is completed.
const isCompletedRental = (rental: DashboardRental) =>
  rental.bookingStatus === 'completed'

// A rental counts as paid only when both booking and payment records say paid.
const isPaidRental = (rental: DashboardRental) =>
  rental.paymentStatus === 'paid' && rental.payment?.paymentStatus === 'paid'

// Add the amounts from paid rentals and return the total.
const getPaidRentalTotal = (rentals: DashboardRental[]) => {
  let total = 0

  for (const rental of rentals) {
    if (isPaidRental(rental)) {
      total += rental.totalAmount
    }
  }

  return total
}

// Convert a date to a YYYY-MM key using Dhaka time.
const getMonthKey = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: DASHBOARD_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(date)

  const year = dateParts.find((part) => part.type === 'year')?.value
  const month = dateParts.find((part) => part.type === 'month')?.value

  if (!year || !month) {
    return null
  }

  return `${year}-${month}`
}

// Create the current month and previous eleven months for the admin charts.
const getLastTwelveMonths = (now: Date) => {
  const currentMonthKey = getMonthKey(now)

  if (!currentMonthKey) {
    return []
  }

  const [year, month] = currentMonthKey.split('-').map(Number)
  const months: Array<{ key: string; label: string }> = []

  for (let monthOffset = -11; monthOffset <= 0; monthOffset += 1) {
    const date = new Date(Date.UTC(year, month - 1 + monthOffset, 1))
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
    const label = date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
      timeZone: 'UTC',
    })

    months.push({ key, label })
  }

  return months
}

export const getAdminDashboardStats = (
  users: DashboardUser[],
  equipments: Equipment[],
  rentals: Rental[]
): StatsCardProps[] => {
  const owners = users.filter((user) => user.role === 'owner').length
  const pendingApprovals = equipments.filter(
    (equipment) => equipment.status === 'pending'
  ).length
  const completedRentals = rentals.filter(isCompletedRental).length
  const totalRevenue = getPaidRentalTotal(rentals)

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
      value: owners,
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
      value: completedRentals,
      description: 'Bookings marked as completed',
    },
    {
      icon: Wallet,
      title: 'Total Revenue',
      color: 'amber',
      value: formatMoney(totalRevenue),
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

// owner dashboard analytics by rechart
export const getAdminDashboardAnalytics = (
  users: DashboardUser[],
  rentals: Rental[],
  now = new Date()
): AdminAnalyticsData => {
  const months = getLastTwelveMonths(now)

  // Each month starts at zero. We add real database totals below.
  const monthlyRevenue = months.map((month) => ({
    ...month,
    revenue: 0,
  }))
  const monthlyBookings = months.map((month) => ({
    ...month,
    bookings: 0,
  }))
  const userGrowth = months.map((month) => ({
    ...month,
    users: 0,
  }))

  for (const rental of rentals) {
    const bookingMonth = getMonthKey(rental.createdAt)
    const bookingMonthData = monthlyBookings.find(
      (month) => month.key === bookingMonth
    )

    if (bookingMonthData) {
      bookingMonthData.bookings += 1
    }

    if (isPaidRental(rental)) {
      const paymentDate = rental.payment?.paidAt

      if (paymentDate) {
        const paymentMonth = getMonthKey(paymentDate)
        const revenueMonthData = monthlyRevenue.find(
          (month) => month.key === paymentMonth
        )

        if (revenueMonthData) {
          revenueMonthData.revenue += rental.totalAmount
        }
      }
    }
  }

  for (const user of users) {
    const registrationMonth = getMonthKey(user.createdAt)
    const userMonthData = userGrowth.find(
      (month) => month.key === registrationMonth
    )

    if (userMonthData) {
      userMonthData.users += 1
    }
  }

  const bookingStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ].map((status) => ({
    status: status.label,
    count: rentals.filter((rental) => rental.bookingStatus === status.value)
      .length,
  }))

  return {
    monthlyRevenue: monthlyRevenue.map((month) => ({
      month: month.label,
      revenue: month.revenue,
    })),
    monthlyBookings: monthlyBookings.map((month) => ({
      month: month.label,
      bookings: month.bookings,
    })),
    bookingStatuses,
    userGrowth: userGrowth.map((month) => ({
      month: month.label,
      users: month.users,
    })),
  }
}

// owner monthly earning
export const getOwnerMonthlyEarnings = (
  rentals: BookingRental[],
  now = new Date()
) => {
  const timeZone = 'Asia/Dhaka'

  const monthParts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(now)

  const currentYear = Number(
    monthParts.find((part) => part.type === 'year')?.value
  )

  const currentMonth = Number(
    monthParts.find((part) => part.type === 'month')?.value
  )

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(Date.UTC(currentYear, currentMonth - 6 + index, 1))

    return {
      key: `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
        2,
        '0'
      )}`,
      month: date.toLocaleDateString('en-US', {
        month: 'short',
        timeZone: 'UTC',
      }),
      earnings: 0,
    }
  })

  const monthlyEarnings = new Map(months.map(({ key }) => [key, 0]))

  for (const rental of rentals) {
    if (
      rental.bookingStatus === 'cancelled' ||
      rental.paymentStatus !== 'paid' ||
      rental.payment?.paymentStatus !== 'paid'
    ) {
      continue
    }

    const paidAt = new Date(rental.payment.paidAt)

    if (Number.isNaN(paidAt.getTime())) continue

    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
    }).formatToParts(paidAt)

    const year = parts.find((part) => part.type === 'year')?.value
    const month = parts.find((part) => part.type === 'month')?.value

    if (!year || !month) continue

    const key = `${year}-${month}`

    if (monthlyEarnings.has(key)) {
      monthlyEarnings.set(
        key,
        (monthlyEarnings.get(key) ?? 0) + rental.totalAmount
      )
    }
  }

  return months.map(({ key, month }) => ({
    month,
    earnings: monthlyEarnings.get(key) ?? 0,
  }))
}

// owner stats card
export const getOwnerDashboardStats = (
  equipments: Equipment[],
  rentals: BookingRental[]
): StatsCardProps[] => {
  const today = getStartOfDay(new Date())
  const paidRentals = rentals.filter(
    (rental) => rental.bookingStatus !== 'cancelled' && isPaidRental(rental)
  )
  const totalEarnings = getPaidRentalTotal(paidRentals)
  const currentMonth = getMonthKey(today)

  let monthlyEarnings = 0

  for (const rental of paidRentals) {
    const paymentDate = rental.payment?.paidAt

    if (paymentDate && getMonthKey(paymentDate) === currentMonth) {
      monthlyEarnings += rental.totalAmount
    }
  }

  const activeEquipment = equipments.filter(
    (equipment) => equipment.status === 'approved'
  ).length
  const pendingEquipment = equipments.filter(
    (equipment) => equipment.status === 'pending'
  ).length
  const activeRentals = rentals.filter((rental) =>
    isActiveRental(rental, today)
  ).length
  const completedRentals = rentals.filter(isCompletedRental).length

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
      value: activeEquipment,
      description: 'Approved listings',
    },
    {
      icon: Clock3,
      title: 'Pending Equipment',
      color: 'orange',
      value: pendingEquipment,
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
      value: activeRentals,
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
      value: completedRentals,
      description: 'Bookings marked as completed',
    },
  ]
}
// customer stats card

export const getCustomerDashboardStats = (
  rentals: BookingRental[],
  favoriteEquipmentCount: number
): StatsCardProps[] => {
  const today = getStartOfDay(new Date())
  const activeRentals = rentals.filter((rental) =>
    isActiveRental(rental, today)
  ).length

  const totalSpent = rentals.reduce((sum, rental) => {
    const isPaid = rental.paymentStatus === 'paid'

    return isPaid ? sum + rental.totalAmount : sum
  }, 0)

  const cancelledBooking = rentals.filter(
    (ren) => ren.bookingStatus === 'cancelled'
  )

  return [
    {
      icon: CalendarDays,
      title: 'Total Bookings',
      color: 'cyan',
      value: rentals.length,
      description: 'Your rental booking records',
    },
    {
      icon: XCircle,
      title: 'Cancelled Rentals',
      color: 'sky',
      value: cancelledBooking.length,
      description: 'Your cancelled rental bookings',
    },
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
      value: formatMoney(totalSpent),
      description: 'From paid rentals',
    },
  ]
}

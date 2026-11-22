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
  rental.bookingStatus === 'confirmed'

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
      value: users.length,
      description: 'Registered platform users',
    },
    {
      icon: ShieldCheck,
      title: 'Total Owners',
      value: users.filter((user) => user.role === 'owner').length,
      description: 'Registered equipment owners',
    },
    {
      icon: Package,
      title: 'Total Equipment',
      value: equipments.length,
      description: 'Equipment listings',
    },
    {
      icon: Clock3,
      title: 'Pending Approvals',
      value: pendingApprovals,
      description: 'Listings awaiting review',
    },
    {
      icon: CalendarDays,
      title: 'Total Bookings',
      value: rentals.length,
      description: 'Rental booking records',
    },
    {
      icon: CheckCircle2,
      title: 'Completed Rentals',
      value: rentals.filter(isCompletedRental).length,
      description: 'Bookings marked as completed',
    },
    {
      icon: Wallet,
      title: 'Total Revenue',
      value: formatMoney(countPaidAmount(rentals)),
      description: 'From paid rentals',
    },
  ]
}

export const getOwnerDashboardStats = (
  equipments: Equipment[],
  rentals: BookingRental[]
): StatsCardProps[] => {
  const today = startOfDay(new Date())

  return [
    {
      icon: Package,
      title: 'Total Equipment',
      value: equipments.length,
      description: 'Your equipment listings',
    },
    {
      icon: BadgeCheck,
      title: 'Active Equipment',
      value: equipments.filter((equipment) => equipment.status === 'approved')
        .length,
      description: 'Approved listings',
    },
    {
      icon: Clock3,
      title: 'Pending Equipment',
      value: equipments.filter((equipment) => equipment.status === 'pending')
        .length,
      description: 'Listings awaiting review',
    },
    {
      icon: CalendarDays,
      title: 'Total Bookings',
      value: rentals.length,
      description: 'Bookings for your equipment',
    },
    {
      icon: Wrench,
      title: 'Active Rentals',
      value: rentals.filter((rental) => isActiveRental(rental, today)).length,
      description: 'Confirmed rentals in progress',
    },
    {
      icon: Wallet,
      title: 'Total Earnings',
      value: formatMoney(countPaidAmount(rentals)),
      description: 'From paid rentals',
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
      value: favoriteEquipmentCount,
      description: 'Equipment saved to your favorites',
    },
    {
      icon: Wallet,
      title: 'Total Spent',
      value: formatMoney(countPaidAmount(rentals)),
      description: 'From paid rentals',
    },
  ]
}

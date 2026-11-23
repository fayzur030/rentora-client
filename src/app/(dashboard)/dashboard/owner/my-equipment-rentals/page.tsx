import type { Metadata } from 'next'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const metadata: Metadata = {
  title: 'Equipment Rentals',
  description: 'Review rental bookings for your listed equipment.',
}
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/components/profile/profile-utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMyEquipmentRentals } from '@/lib/api/bookings'
import { getMyEquipments } from '@/lib/api/equipments'
import { getTokenFromServer } from '@/lib/auth/getTokenFromServer'
import { redirect } from 'next/navigation'

const formatDate = (date: string) => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('en-BD', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

const getStatusClassName = (status: string) => {
  if (status === 'paid' || status === 'confirmed') {
    return 'border-success/25 bg-success/10 text-success dark:border-success/25 dark:bg-success/10 dark:text-success'
  }

  if (status === 'failed' || status === 'cancelled') {
    return 'border-destructive/25 bg-destructive/10 text-destructive dark:border-destructive/25 dark:bg-destructive/10 dark:text-destructive'
  }

  return 'border-warning/25 bg-warning/10 text-warning dark:border-warning/25 dark:bg-warning/10 dark:text-warning'
}

const MyEquipmentRentalsPage = async () => {
  const jwtToken = await getTokenFromServer()
  if (!jwtToken) {
    redirect('/login')
  }

  const myRentals = await getMyEquipmentRentals(jwtToken)
  const myEquipments = await getMyEquipments()

  // Booking documents do not store the equipment image,
  // so we take it from the owner's own equipment list.
  const equipmentImages: Record<string, string> = {}
  myEquipments.forEach((equipment) => {
    const equipmentId = equipment._id ?? equipment.id
    if (equipmentId) {
      equipmentImages[equipmentId] = equipment.image
    }
  })

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          My Equipment Rental
        </h2>
        <p className='text-sm text-muted-foreground'>
          See which customer has booked your equipment.
        </p>
      </div>

      <div className='space-y-2'>
        <p className='text-xs text-muted-foreground sm:hidden'>
          Swipe sideways to see all rental details.
        </p>

        <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
          <Table className='min-w-318.5'>
            <TableHeader className='bg-muted/40'>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Customer Information</TableHead>
                <TableHead>Equipment Information</TableHead>
                <TableHead>Rental Duration</TableHead>
                <TableHead>Required Quantity</TableHead>
                <TableHead>Booking Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Booking Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {myRentals.length > 0 ? (
                myRentals.map((rental) => {
                  const equipmentId = String(rental.equipmentId)
                  const equipmentImage = equipmentImages[equipmentId]

                  return (
                    <TableRow key={rental._id}>
                      <TableCell>
                        <div className='flex min-w-56 items-center gap-3'>
                          <Avatar className='size-8 shrink-0'>
                            <AvatarFallback className='bg-primary/10 font-semibold text-primary'>
                              {getInitials(
                                rental.customerName || rental.userEmail
                              )}
                            </AvatarFallback>
                          </Avatar>

                          <div className='min-w-0'>
                            <p className='truncate font-semibold text-foreground'>
                              {rental.customerName || '—'}
                            </p>
                            <p className='truncate text-xs text-muted-foreground'>
                              {rental.userEmail}
                            </p>
                            <p className='truncate text-xs text-muted-foreground'>
                              {rental.contactNumber}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className='flex min-w-46 items-center gap-3'>
                          <div className='relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted'>
                            {equipmentImage?.trim() ? (
                              <Image
                                src={equipmentImage}
                                alt={rental.equipmentName || 'Equipment'}
                                fill
                                sizes='48px'
                                className='object-cover'
                              />
                            ) : (
                              <div className='flex size-full items-center justify-center text-muted-foreground'>
                                <ImageOff
                                  className='size-5'
                                  aria-hidden='true'
                                />
                              </div>
                            )}
                          </div>
                          <span className='line-clamp-2 max-w-40 font-semibold text-foreground'>
                            {rental.equipmentName || rental.equipmentId}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className='whitespace-nowrap'>
                        <p className='text-sm'>
                          {formatDate(rental.startDate)} —{' '}
                          {formatDate(rental.endDate)}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {rental.rentalDuration}{' '}
                          {rental.rentalDuration === 1 ? 'day' : 'days'}
                        </p>
                      </TableCell>

                      <TableCell className='whitespace-nowrap font-medium'>
                        {rental.quantity}{' '}
                        {rental.quantity === 1 ? 'unit' : 'units'}
                      </TableCell>

                      <TableCell className='whitespace-nowrap font-semibold'>
                        ৳{rental.totalAmount.toLocaleString('en-BD')}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`${getStatusClassName(rental.paymentStatus)} capitalize`}
                        >
                          {rental.paymentStatus}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`${getStatusClassName(rental.bookingStatus)} capitalize`}
                        >
                          {rental.bookingStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='h-32 text-center text-muted-foreground'
                  >
                    Rentals of your equipment will appear here.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default MyEquipmentRentalsPage

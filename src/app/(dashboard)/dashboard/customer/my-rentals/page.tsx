import type { Metadata } from 'next'
import { getMyRentals } from '@/lib/api/bookings'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const metadata: Metadata = {
  title: 'My Rentals',
  description: 'View your equipment bookings, rental dates, and payment status.',
}

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

const MyRentalsPage = async () => {
  const jwtToken = await getTokenFromServer()
  if (!jwtToken) {
    redirect('/login')
  }
  const myRentals = await getMyRentals(jwtToken)

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          My Rentals
        </h2>
        <p className='text-sm text-muted-foreground'>
          Track all your active and past equipment rentals in one place.
        </p>
      </div>

      <div className='space-y-2'>
        <div className='hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block'>
          <Table className='min-w-225'>
            <TableHeader className='bg-muted/40'>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Equipment Name</TableHead>
                <TableHead>Rental Start Date</TableHead>
                <TableHead>Rental End Date</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Booking Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {myRentals.length > 0 ? (
                myRentals.map((rental) => (
                  <TableRow key={rental._id}>
                    <TableCell className='font-semibold text-foreground'>
                      {rental.equipmentName || rental.equipmentId}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(rental.startDate)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(rental.endDate)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      {formatDate(rental.createdAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap font-medium'>
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='h-32 text-center text-muted-foreground'
                  >
                    Your rental bookings will appear here.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className='space-y-3 md:hidden'>
          {myRentals.length ? myRentals.map((rental) => (
            <article key={rental._id} className='rounded-2xl border border-border bg-card p-4 shadow-sm'>
              <div className='flex items-start justify-between gap-3'>
                <h3 className='font-semibold text-foreground'>{rental.equipmentName || rental.equipmentId}</h3>
                <p className='shrink-0 font-bold text-foreground'>৳{rental.totalAmount.toLocaleString('en-BD')}</p>
              </div>
              <dl className='mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border/70 pt-3 text-sm'>
                <div><dt className='text-xs text-muted-foreground'>Rental starts</dt><dd className='mt-1 font-medium'>{formatDate(rental.startDate)}</dd></div>
                <div><dt className='text-xs text-muted-foreground'>Rental ends</dt><dd className='mt-1 font-medium'>{formatDate(rental.endDate)}</dd></div>
                <div><dt className='text-xs text-muted-foreground'>Booking date</dt><dd className='mt-1 font-medium'>{formatDate(rental.createdAt)}</dd></div>
                <div><dt className='text-xs text-muted-foreground'>Payment</dt><dd className='mt-1'><Badge className={`${getStatusClassName(rental.paymentStatus)} capitalize`}>{rental.paymentStatus}</Badge></dd></div>
                <div className='col-span-2'><dt className='text-xs text-muted-foreground'>Booking status</dt><dd className='mt-1'><Badge className={`${getStatusClassName(rental.bookingStatus)} capitalize`}>{rental.bookingStatus}</Badge></dd></div>
              </dl>
            </article>
          )) : (
            <p className='rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground'>Your rental bookings will appear here.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyRentalsPage

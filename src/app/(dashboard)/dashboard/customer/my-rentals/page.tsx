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
    return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
  }

  if (status === 'failed' || status === 'cancelled') {
    return 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300'
  }

  return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
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
        <p className='text-xs text-muted-foreground sm:hidden'>
          Swipe sideways to see all rental details.
        </p>

        <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
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
      </div>
    </div>
  )
}

export default MyRentalsPage

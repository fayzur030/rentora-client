import AdminRentalsTable from '@/components/dashboard/admin/AdminRentalsTable'
import { getAllRentals } from '@/lib/api/rental'
import type { Rental } from '@/types/rental'

const AllRentalsPage = async () => {
  let rentals: Rental[] = []
  let errorMessage: string | null = null

  // Fetch all rental bookings from the backend API
  try {
    rentals = await getAllRentals()
  } catch (error) {
    console.error('Get All Rentals Error:', error)
    errorMessage =
      error instanceof Error ? error.message : 'Failed to load rentals'
  }

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          All Rentals
        </h2>
        <p className='text-sm text-muted-foreground'>
          Monitor and manage every equipment rental booking on the platform.
        </p>
      </div>

      {/* Modern SaaS Table displaying all rental records */}
      <AdminRentalsTable rentals={rentals} errorMessage={errorMessage} />
    </div>
  )
}

export default AllRentalsPage

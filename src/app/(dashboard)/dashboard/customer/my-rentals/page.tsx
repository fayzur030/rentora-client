const MyRentalsPage = () => {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>My Rentals</h2>
        <p className='text-sm text-muted-foreground'>
          Track all your active and past equipment rentals in one place.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>Your rental bookings will appear here.</p>
      </div>
    </div>
  )
}

export default MyRentalsPage

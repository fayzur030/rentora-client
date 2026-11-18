const AllRentalsPage = () => {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>All Rentals</h2>
        <p className='text-sm text-muted-foreground'>
          Monitor every booking made on the platform.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>All rental bookings will appear here.</p>
      </div>
    </div>
  )
}

export default AllRentalsPage

const MyEquipmentRentalsPage = () => {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>My Equipment Rental</h2>
        <p className='text-sm text-muted-foreground'>
          See which customer has booked your equipment.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>
          Rentals of your equipment will appear here.
        </p>
      </div>
    </div>
  )
}

export default MyEquipmentRentalsPage

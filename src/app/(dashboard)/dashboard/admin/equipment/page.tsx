const AllEquipmentPage = () => {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>All Equipment</h2>
        <p className='text-sm text-muted-foreground'>
          Approve, update or remove every equipment listing.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>All equipment will appear here.</p>
      </div>
    </div>
  )
}

export default AllEquipmentPage

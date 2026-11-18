const AllUsersPage = () => {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>All Users</h2>
        <p className='text-sm text-muted-foreground'>
          View and manage every registered user.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>The user list will appear here.</p>
      </div>
    </div>
  )
}

export default AllUsersPage

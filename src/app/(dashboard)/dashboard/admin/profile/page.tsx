const AdminProfilePage = () => {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>My Profile</h2>
        <p className='text-sm text-muted-foreground'>
          Manage your admin profile information.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>Your profile form will appear here.</p>
      </div>
    </div>
  )
}

export default AdminProfilePage

import { getAllUsers } from '@/lib/api/users'
import ManageUsersTable from '@/components/dashboard/admin/ManageUsersTable'
import type { Users } from '@/types/users'

const AllUsersPage = async () => {
  let users: Users[] = []
  let errorMessage: string | null = null

  try {
    users = await getAllUsers()
  } catch (error) {
    console.error('Get Users Error:', error)
    errorMessage =
      error instanceof Error ? error.message : 'Failed to load registered users'
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          All Users
        </h2>
        <p className='text-sm text-muted-foreground'>
          View and manage every registered user.
        </p>
      </div>
      <ManageUsersTable users={users} errorMessage={errorMessage} />
    </div>
  )
}

export default AllUsersPage

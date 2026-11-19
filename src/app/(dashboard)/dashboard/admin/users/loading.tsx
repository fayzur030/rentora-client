import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'
import { TableSkeleton } from '@/components/shared/skeletons/TableSkeleton'

const AllUsersLoading = () => {
  return (
    <div className='space-y-6'>
      <PageHeaderSkeleton />
      <TableSkeleton rows={6} columns={4} />
    </div>
  )
}

export default AllUsersLoading

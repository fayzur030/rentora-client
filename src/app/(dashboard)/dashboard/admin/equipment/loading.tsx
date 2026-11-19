import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'
import { TableSkeleton } from '@/components/shared/skeletons/TableSkeleton'

const AllEquipmentLoading = () => {
  return (
    <div className='space-y-6'>
      <PageHeaderSkeleton />
      <TableSkeleton rows={5} columns={6} />
    </div>
  )
}

export default AllEquipmentLoading

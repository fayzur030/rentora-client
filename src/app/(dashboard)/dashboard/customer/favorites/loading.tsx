import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'
import { TableSkeleton } from '@/components/shared/skeletons/TableSkeleton'

const FavoritesLoading = () => {
  return (
    <div className='space-y-6'>
      <PageHeaderSkeleton />
      <TableSkeleton rows={4} columns={8} />
    </div>
  )
}

export default FavoritesLoading

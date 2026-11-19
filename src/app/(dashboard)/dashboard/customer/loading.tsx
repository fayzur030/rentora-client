import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'

const CustomerDashboardLoading = () => {
  return (
    <div className='space-y-6'>
      <PageHeaderSkeleton />

      {/* Skeleton stat cards */}
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className='rounded-xl border border-border bg-card p-6 shadow-sm'
          >
            <Skeleton className='h-4 w-24' />
            <Skeleton className='mt-3 h-8 w-16' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerDashboardLoading

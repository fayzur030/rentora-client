import { Skeleton } from '@/components/ui/skeleton'
import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'

// Loading fallback for the dashboard section.
// Covers the async session check in the dashboard layout while
// keeping the sidebar layout from shifting once the user resolves.
const DashboardLoading = () => {
  return (
    <div className='min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto w-full max-w-7xl space-y-6'>
        <PageHeaderSkeleton />

        {/* Skeleton content for the active dashboard section */}
        <div className='rounded-xl border border-border bg-card p-10 shadow-sm'>
          <Skeleton className='h-64 w-full' />
        </div>
      </div>
    </div>
  )
}

export default DashboardLoading

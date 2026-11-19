import { Skeleton } from '@/components/ui/skeleton'

// Skeleton for the page title and description below it.
// Used at the top of dashboard and detail pages.
const PageHeaderSkeleton = () => {
  return (
    <div className='space-y-1'>
      <Skeleton className='h-8 w-44' />
      <Skeleton className='h-4 w-2/3 max-w-md' />
    </div>
  )
}

export { PageHeaderSkeleton }

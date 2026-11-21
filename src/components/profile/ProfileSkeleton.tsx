import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// A loading placeholder shaped like the real profile page.
// It keeps the layout from jumping while the profile data loads.
const ProfileSkeleton = () => {
  return (
    <div className='space-y-5 sm:space-y-6'>
      <Card className='gap-0 overflow-hidden py-0'>
        <Skeleton className='h-28 w-full rounded-none sm:h-32' />

        <div className='px-5 pb-6 sm:px-7'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
              <Skeleton className='-mt-14 size-28 shrink-0 rounded-full ring-4 ring-card sm:-mt-16 sm:size-32' />

              <div className='space-y-3 sm:pt-1'>
                <div className='flex gap-2'>
                  <Skeleton className='h-5 w-20 rounded-full' />
                  <Skeleton className='h-5 w-16 rounded-full' />
                </div>

                <Skeleton className='h-8 w-52 max-w-full' />
                <Skeleton className='h-4 w-64 max-w-full' />
                <Skeleton className='h-4 w-40 max-w-full' />
              </div>
            </div>

            <Skeleton className='h-10 w-full sm:w-32' />
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {[0, 1].map((card) => (
          <Card key={card} className='gap-0 py-0'>
            <div className='flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6'>
              <Skeleton className='size-9 rounded-lg' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-36' />
                <Skeleton className='h-3 w-48 max-w-full' />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6'>
              {[0, 1, 2, 3].map((field) => (
                <div key={field} className='flex items-start gap-3'>
                  <Skeleton className='size-8 shrink-0 rounded-lg' />
                  <div className='w-full space-y-2'>
                    <Skeleton className='h-3 w-20' />
                    <Skeleton className='h-4 w-32 max-w-full' />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className='gap-0 py-0'>
        <div className='flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6'>
          <Skeleton className='size-9 rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3 w-56 max-w-full' />
          </div>
        </div>

        <div className='space-y-4 px-5 py-5 sm:px-6'>
          <Skeleton className='h-24 w-full' />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {[0, 1, 2, 3].map((field) => (
              <div key={field} className='space-y-2'>
                <Skeleton className='h-3 w-20' />
                <Skeleton className='h-4 w-28 max-w-full' />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProfileSkeleton

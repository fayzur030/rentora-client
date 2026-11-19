import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Skeleton for the equipment filters sidebar.
// Mirrors the filter groups: category, rental type,
// price range and availability.
const FilterSkeleton = () => {
  const filterGroups = [0, 1, 2, 3]

  return (
    <Card className='rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10'>
      <Skeleton className='h-6 w-24' />

      <div className='mt-5 space-y-6'>
        {filterGroups.map((groupIndex) => (
          <div key={groupIndex} className='space-y-3'>
            <Skeleton className='h-4 w-28' />
            <div className='space-y-2.5'>
              {[0, 1].map((rowIndex) => (
                <div
                  key={rowIndex}
                  className='flex items-center gap-2.5'
                >
                  <Skeleton className='size-4 rounded-[2px]' />
                  <Skeleton className='h-4 w-28' />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Skeleton className='mt-6 h-10 w-full rounded-lg' />
    </Card>
  )
}

export { FilterSkeleton }

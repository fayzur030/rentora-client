import { EquipmentGridSkeleton } from '@/components/shared/skeletons/EquipmentGridSkeleton'
import { FilterSkeleton } from '@/components/shared/skeletons/FilterSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const AllEquipmentsLoading = () => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      {/* Top section: search bar skeleton */}
      <Skeleton className='h-14 w-full rounded-2xl' />

      {/* Main section: filters + equipment listing */}
      <div className='mt-6 flex flex-col gap-6 lg:flex-row'>
        {/* Left side: filter sidebar skeleton (desktop and tablet) */}
        <aside className='hidden w-full shrink-0 md:block md:w-64 lg:w-72'>
          <FilterSkeleton />
        </aside>

        {/* Right side: equipment listing skeleton */}
        <section className='min-w-0 flex-1'>
          <div className='mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <Skeleton className='h-8 w-44' />
              <Skeleton className='mt-2 h-4 w-56' />
            </div>

            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-36 rounded-md' />
            </div>
          </div>

          <EquipmentGridSkeleton count={6} />
        </section>
      </div>
    </div>
  )
}

export default AllEquipmentsLoading

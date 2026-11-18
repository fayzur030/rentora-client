import EquipmentFilterSheet from '@/components/equipment/EquipmentFilterSheet'
import EquipmentFilters from '@/components/equipment/EquipmentFilters'
import EquipmentGrid from '@/components/equipment/EquipmentGrid'
import EquipmentSearch from '@/components/equipment/EquipmentSearch'
import EquipmentSort from '@/components/equipment/EquipmentSort'
import { getAllEquipments } from '@/lib/api/equipments'

const AllEquipmentsPage = async () => {
  const allEquipments = await getAllEquipments()

  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      {/* Top section: search bar */}
      <EquipmentSearch />

      {/* Main section: filters + equipment listing */}
      <div className='mt-6 flex flex-col gap-6 lg:flex-row'>
        {/* Left side: filter sidebar (desktop and tablet) */}
        <aside className='hidden w-full shrink-0 md:block md:w-64 lg:w-72'>
          <EquipmentFilters />
        </aside>

        {/* Right side: equipment listing */}
        <section className='min-w-0 flex-1'>
          <div className='mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
                All Equipment
              </h1>
              <p className='mt-1 text-sm text-muted-foreground'>
                Showing{' '}
                <span className='font-semibold text-foreground'>
                  {allEquipments.length}
                </span>{' '}
                equipment listings
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              {/* Filters button only on small screens */}
              <div className='md:hidden'>
                <EquipmentFilterSheet />
              </div>

              <EquipmentSort />
            </div>
          </div>

          <EquipmentGrid equipments={allEquipments} />
        </section>
      </div>
    </div>
  )
}

export default AllEquipmentsPage

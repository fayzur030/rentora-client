import type { Metadata } from 'next'
import EquipmentFilterSheet from '@/components/equipment/EquipmentFilterSheet'
import EquipmentFilters from '@/components/equipment/EquipmentFilters'
import EquipmentGrid from '@/components/equipment/EquipmentGrid'
import EquipmentSearch from '@/components/equipment/EquipmentSearch'

export const metadata: Metadata = {
  title: 'Browse All Equipment',
  description:
    'Search equipment rentals by category, location, rental type, price, and availability.',
}
import EquipmentSort from '@/components/equipment/EquipmentSort'
import { getAllEquipments } from '@/lib/api/equipments'
import { getCategories } from '@/lib/api/category'
import { getFavorites } from '@/lib/api/favorite'
import { getSessionFromServer } from '@/lib/auth/getSessionFromServer'

interface AllEquipmentsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const AllEquipmentsPage = async ({ searchParams }: AllEquipmentsPageProps) => {
  const {
    search,
    category,
    rentalType,
    availability,
    minPrice,
    maxPrice,
    sort,
    page,
  } = await searchParams

  const query = new URLSearchParams()

  const filters = {
    search,
    category,
    rentalType,
    availability,
    minPrice,
    maxPrice,
    sort,
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === 'string' && value) {
      query.set(key, value)
    }
  })
  const queryString = query.toString()
  const currentPage = Number(page) || 1

  const [equipmentData, session, categories] = await Promise.all([
    getAllEquipments(queryString, currentPage),
    getSessionFromServer(),
    getCategories(),
  ])

  const allEquipments = equipmentData.equipments
  //pagination
  const pagination = equipmentData.pagination

  const favorites = session?.user?.id ? await getFavorites(session.user.id) : []
  const favoriteEquipmentIds = favorites
    .map((equipment) => equipment._id ?? equipment.id)
    .filter((id): id is string => Boolean(id))

  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      {/* Top section: search bar */}
      <EquipmentSearch queryString={queryString} />

      {/* Main section: filters + equipment listing */}
      <div className='mt-6 flex flex-col gap-6 lg:flex-row'>
        {/* Left side: filter sidebar (desktop and tablet) */}
        <aside className='hidden w-full shrink-0 md:block md:w-64 lg:w-72'>
          <EquipmentFilters categories={categories} queryString={queryString} />
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
                <EquipmentFilterSheet
                  categories={categories}
                  queryString={queryString}
                />
              </div>

              <EquipmentSort queryString={queryString} />
            </div>
          </div>

          <EquipmentGrid
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            equipments={allEquipments}
            favoriteEquipmentIds={favoriteEquipmentIds}
          />
        </section>
      </div>
    </div>
  )
}

export default AllEquipmentsPage

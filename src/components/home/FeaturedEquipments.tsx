import { getFeaturedEquipments } from '@/lib/api/features'
import EquipmentCard from '@/components/equipment/EquipmentCard'
import FeaturedEquipmentsMotion from './FeaturedEquipmentsMotion'
import Link from 'next/link'

const FeaturedEquipments = async () => {
  const featuredEquipments = await getFeaturedEquipments()

  return (
    <FeaturedEquipmentsMotion>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>

        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
              Top picks
            </p>
            <h2 className='mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl'>
              Featured Equipment
            </h2>
            <p className='mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base'>
              Explore reliable equipment for your next project, event, or
              outdoor adventure.
            </p>
          </div>

          <Link
            href='/all-equipments'
            className='inline-flex h-10 items-center justify-center rounded-lg border border-foreground/15 px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5'
          >
            View All Equipment
          </Link>
        </div>

        {featuredEquipments.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-foreground/20 bg-card px-6 py-16 text-center'>
            <h3 className='font-heading text-lg font-semibold text-foreground'>
              No featured equipment available
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Please check back soon for new listings.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {featuredEquipments.slice(0, 6).map((equipment, index) => (
              <EquipmentCard
                key={equipment._id ?? equipment.id ?? `${equipment.name}-${index}`}
                equipment={equipment}
                priority={index < 3}
              />
            ))}
          </div>
        )}
      </div>
    </FeaturedEquipmentsMotion>
  )
}

export default FeaturedEquipments

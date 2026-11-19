import EquipmentCard from './EquipmentCard'
import type { Equipment } from '@/types/equipment'

interface EquipmentGridProps {
  equipments: Equipment[]
  favoriteEquipmentIds?: string[]
}

const EquipmentGrid = ({
  equipments,
  favoriteEquipmentIds = [],
}: EquipmentGridProps) => {
  if (equipments.length === 0) {
    return (
      <div className='rounded-2xl border border-dashed border-foreground/20 bg-card px-6 py-16 text-center'>
        <h2 className='font-heading text-lg font-semibold text-foreground'>
          No equipment available
        </h2>
        <p className='mt-2 text-sm text-muted-foreground'>
          Please check back soon for equipment available to rent.
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {equipments.map((equipment, index) => (
        <EquipmentCard
          key={equipment._id ?? equipment.id ?? `${equipment.name}-${index}`}
          equipment={equipment}
          isFavorite={favoriteEquipmentIds.includes(
            equipment._id ?? equipment.id ?? ''
          )}
        />
      ))}
    </div>
  )
}

export default EquipmentGrid

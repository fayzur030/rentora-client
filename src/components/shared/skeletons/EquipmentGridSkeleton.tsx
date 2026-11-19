import { EquipmentCardSkeleton } from './EquipmentCardSkeleton'

interface EquipmentGridSkeletonProps {
  // Number of equipment card skeletons to render.
  count?: number
}

// Grid skeleton for equipment listing pages.
// Uses the same grid layout as the real equipment grid.
const EquipmentGridSkeleton = ({ count = 6 }: EquipmentGridSkeletonProps) => {
  return (
    <div
      className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'
      aria-busy='true'
    >
      {Array.from({ length: count }, (_, index) => (
        <EquipmentCardSkeleton key={index} />
      ))}
    </div>
  )
}

export { EquipmentGridSkeleton }

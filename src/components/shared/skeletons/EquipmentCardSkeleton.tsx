import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Skeleton that mirrors the equipment card layout:
// image, availability badge, category, name, location, price and button.
const EquipmentCardSkeleton = () => {
  return (
    <Card className='gap-0 overflow-hidden rounded-2xl py-0 ring-1 ring-foreground/10'>
      {/* Equipment image */}
      <Skeleton className='aspect-4/3 w-full rounded-none' />

      <CardContent className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-24 rounded-full' />
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>

        <div className='flex items-center justify-between gap-3'>
          <Skeleton className='h-7 w-20' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>

        <Skeleton className='h-10 w-full rounded-md' />
      </CardContent>
    </Card>
  )
}

export { EquipmentCardSkeleton }

import Image from 'next/image'
import Link from 'next/link'
import { ImageOff, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Equipment } from '@/types/equipment'
import FavoriteButton from '../shared/FavoriteButton'
import { getSessionFromServer } from '@/lib/server/getSessionFromServer'

interface EquipmentCardProps {
  equipment: Equipment
  priority?: boolean
}

const EquipmentCard = async ({
  equipment,
  priority = false,
}: EquipmentCardProps) => {
  const isAvailable = equipment.availableQuantity > 0
  const equipmentId = equipment._id ?? equipment.id
  const imageSrc = equipment.image?.trim()
  const session = await getSessionFromServer()
  const user = session?.user


  return (
    <Card className='group gap-0 overflow-hidden rounded-2xl py-0 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      {/* Equipment image */}
      <div className='relative aspect-4/3 overflow-hidden'>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={equipment.name}
            fill
            priority={priority}
            sizes='(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 20.5rem) / 2), (max-width: 1279px) calc((100vw - 24rem) / 2), 320px'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground'>
            <ImageOff className='size-8' aria-hidden='true' />
          </div>
        )}

        <span
          className='absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur-sm'
          aria-hidden='true'
        >
          {/* <Heart className='size-4' /> */}
          <FavoriteButton
            userId={user?.id || ''}
            equipmentId={equipment._id || ''}
          />
        </span>

        <Badge
          className={`absolute bottom-3 left-3 gap-1.5 shadow-sm ${
            isAvailable
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            aria-hidden='true'
          />
          {isAvailable ? 'Available' : 'Unavailable'}
        </Badge>
      </div>

      <CardContent className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Badge className='border-primary/20 bg-primary/10 text-primary'>
            {equipment.category}
          </Badge>

          <h3 className='truncate font-heading text-base font-bold text-foreground'>
            {equipment.name}
          </h3>

          <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
            <MapPin className='size-4 shrink-0' aria-hidden='true' />
            <span className='truncate'>{equipment.location}</span>
          </div>
        </div>

        <div className='flex items-center justify-between gap-3'>
          <p className='text-xl font-extrabold text-primary'>
            ৳{equipment.rentalPrice.toLocaleString()}
          </p>

          <Badge className='border-accent/50 bg-accent/15 text-accent-foreground'>
            {equipment.rentalType}
          </Badge>
        </div>

        {equipmentId ? (
          <Button
            nativeButton={false}
            render={<Link href={`/all-equipments/${equipmentId}`} />}
            className='h-10 w-full'
          >
            View Details
          </Button>
        ) : (
          <Button disabled className='h-10 w-full'>
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default EquipmentCard

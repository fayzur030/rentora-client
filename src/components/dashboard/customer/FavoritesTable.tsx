import Image from 'next/image'
import { ImageOff } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Equipment } from '@/types/equipment'

interface FavoritesTableProps {
  equipments: Equipment[]
}

const FavoritesTable = ({ equipments }: FavoritesTableProps) => {
  return (
    <div className='space-y-2'>
      <p className='text-xs text-muted-foreground sm:hidden'>
        Swipe sideways to see all table columns.
      </p>

      <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
        <Table className='min-w-[900px]'>
          <TableHeader className='bg-muted/40'>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Image</TableHead>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rental Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {equipments.map((equipment, index) => {
              const equipmentId =
                equipment._id ?? equipment.id ?? `${equipment.name}-${index}`
              const isAvailable = equipment.availableQuantity > 0

              return (
                <TableRow key={equipmentId}>
                  <TableCell>
                    <div className='relative size-14 overflow-hidden rounded-lg bg-muted'>
                      {equipment.image?.trim() ? (
                        <Image
                          src={equipment.image}
                          alt={equipment.name}
                          fill
                          sizes='56px'
                          className='object-cover'
                        />
                      ) : (
                        <div className='flex size-full items-center justify-center text-muted-foreground'>
                          <ImageOff className='size-5' aria-hidden='true' />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className='max-w-56 font-semibold text-foreground'>
                    <span className='line-clamp-2'>{equipment.name}</span>
                  </TableCell>

                  <TableCell>
                    <Badge className='border-primary/20 bg-primary/10 text-primary'>
                      {equipment.category}
                    </Badge>
                  </TableCell>

                  <TableCell className='whitespace-nowrap font-medium'>
                    ৳{equipment.rentalPrice.toLocaleString()}
                    <span className='ml-1 text-xs text-muted-foreground'>
                      / {equipment.rentalType.toLowerCase()}
                    </span>
                  </TableCell>

                  <TableCell className='max-w-48 truncate'>
                    {equipment.location}
                  </TableCell>

                  <TableCell className='whitespace-nowrap'>
                    {equipment.owner.name}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        isAvailable
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                      }
                    >
                      {isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FavoritesTable

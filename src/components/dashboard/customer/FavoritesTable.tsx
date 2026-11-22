import Image from 'next/image'
import { ImageOff } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import FavoriteActions from '@/components/dashboard/customer/FavoriteActions'
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
  userId: string
}

const FavoritesTable = ({ equipments, userId }: FavoritesTableProps) => {
  return (
    <div className='space-y-2'>
      <p className='text-xs text-muted-foreground sm:hidden'>
        Swipe sideways to see all table columns.
      </p>

      <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
        <Table className='min-w-[1100px]'>
          <TableHeader className='bg-muted/40'>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Image</TableHead>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rental Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {equipments.map((equipment, index) => {
              const equipmentId = equipment._id ?? equipment.id
              const rowKey = equipmentId ?? `${equipment.name}-${index}`
              const isAvailable = equipment.availableQuantity > 0

              return (
                <TableRow key={rowKey}>
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
                          ? 'border-success/25 bg-success/10 text-success dark:border-success/25 dark:bg-success/10 dark:text-success'
                          : 'border-warning/25 bg-warning/10 text-warning dark:border-warning/25 dark:bg-warning/10 dark:text-warning'
                      }
                    >
                      {isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {equipmentId ? (
                      <FavoriteActions
                        userId={userId}
                        equipmentId={equipmentId}
                        equipmentName={equipment.name}
                      />
                    ) : (
                      <span className='text-sm text-muted-foreground'>
                        Actions unavailable
                      </span>
                    )}
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

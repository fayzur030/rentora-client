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
import type { Equipment, EquipmentStatus } from '@/types/equipment'
import EquipmentActions from './EquipmentActions'

interface MyEquipmentTableProps {
  equipments: Equipment[]
}

const statusStyles: Record<EquipmentStatus, string> = {
  Pending: 'border-amber-300 bg-amber-50 text-amber-800',
  Approved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Rejected: 'border-rose-200 bg-rose-50 text-rose-700',
}

const normalizeStatus = (status: EquipmentStatus | string): EquipmentStatus => {
  if (typeof status !== 'string') return 'Pending'

  const normalizedStatus = status.toLowerCase()
  if (normalizedStatus === 'approved') return 'Approved'
  if (normalizedStatus === 'rejected') return 'Rejected'
  return 'Pending'
}

const MyEquipmentTable = ({ equipments }: MyEquipmentTableProps) => {
  return (
    <>
      <p className='text-xs text-muted-foreground sm:hidden'>
        Swipe sideways to see all table columns.
      </p>

      <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-sm'>
        <Table className='min-w-225'>
          <TableHeader className='bg-muted/40'>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rental Price</TableHead>
              <TableHead>Available Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {equipments.map((equipment, index) => {
              const equipmentId = equipment._id ?? equipment.id
              const rowKey = equipmentId ?? `${equipment.name}-${index}`
              const status = normalizeStatus(equipment.status ?? 'Pending')

              return (
                <TableRow key={rowKey} className='hover:bg-muted/35'>
                  <TableCell>
                    <div className='flex min-w-56 items-center gap-3'>
                      <div className='relative size-14 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted'>
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
                      <span className='line-clamp-2 max-w-56 font-semibold text-foreground'>
                        {equipment.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className='border-primary/20 bg-primary/10 text-primary'>
                      {equipment.category}
                    </Badge>
                  </TableCell>

                  <TableCell className='whitespace-nowrap'>
                    <span className='font-semibold text-foreground'>
                      ৳{equipment.rentalPrice.toLocaleString()}
                    </span>
                    <span className='ml-1 text-xs text-muted-foreground'>
                      / {equipment.rentalType?.toLowerCase() ?? 'daily'}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className='font-medium'>
                      {equipment.availableQuantity}{' '}
                      {equipment.availableQuantity === 1 ? 'unit' : 'units'}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        statusStyles[status] ??
                        'border-border bg-muted text-muted-foreground'
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>

                  <TableCell className='text-right'>
                    {equipmentId ? (
                      <EquipmentActions equipment={equipment} />
                    ) : (
                      <span className='text-sm text-muted-foreground'>
                        Unavailable
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default MyEquipmentTable

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
import type { Category } from '@/types/category'
import EquipmentActions from './EquipmentActions'

interface MyEquipmentTableProps {
  equipments: Equipment[]
  categories: Category[]
}

const statusStyles: Record<EquipmentStatus, string> = {
  pending: 'border-warning/25 bg-warning/10 text-warning',
  approved: 'border-success/25 bg-success/10 text-success',
  rejected: 'border-destructive/25 bg-destructive/10 text-destructive',
}

const normalizeStatus = (status: EquipmentStatus | string): EquipmentStatus => {
  if (typeof status !== 'string') return 'pending'

  const normalizedStatus = status.toLowerCase()
  if (normalizedStatus === 'approved') return 'approved'
  if (normalizedStatus === 'rejected') return 'rejected'
  return 'pending'
}

const MyEquipmentTable = ({ equipments, categories }: MyEquipmentTableProps) => {
  return (
    <div className='space-y-3'>
      <div className='hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block'>
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
              const status = normalizeStatus(equipment.status ?? 'pending')

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
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </TableCell>

                  <TableCell className='text-right'>
                    {equipmentId ? (
                      <EquipmentActions
                        equipment={equipment}
                        categories={categories}
                      />
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

      <div className='space-y-3 md:hidden'>
        {equipments.length ? (
          equipments.map((equipment, index) => {
            const equipmentId = equipment._id ?? equipment.id
            const rowKey = equipmentId ?? `${equipment.name}-${index}`
            const status = normalizeStatus(equipment.status ?? 'pending')

            return (
              <article key={rowKey} className='rounded-2xl border border-border bg-card p-4 shadow-sm'>
                <div className='flex items-start gap-3'>
                  <div className='relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted'>
                    {equipment.image?.trim() ? (
                      <Image src={equipment.image} alt={equipment.name} fill sizes='64px' className='object-cover' />
                    ) : (
                      <div className='flex size-full items-center justify-center text-muted-foreground'>
                        <ImageOff className='size-5' aria-hidden='true' />
                      </div>
                    )}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h3 className='font-semibold text-foreground'>{equipment.name}</h3>
                    <Badge className='mt-2 border-primary/20 bg-primary/10 text-primary'>{equipment.category}</Badge>
                  </div>
                  <Badge className={statusStyles[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
                </div>
                <dl className='mt-4 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 text-sm'>
                  <div>
                    <dt className='text-xs text-muted-foreground'>Rental price</dt>
                    <dd className='mt-1 font-semibold text-foreground'>৳{equipment.rentalPrice.toLocaleString()} <span className='font-normal text-muted-foreground'>/ {equipment.rentalType?.toLowerCase() ?? 'daily'}</span></dd>
                  </div>
                  <div>
                    <dt className='text-xs text-muted-foreground'>Available</dt>
                    <dd className='mt-1 font-medium'>{equipment.availableQuantity} {equipment.availableQuantity === 1 ? 'unit' : 'units'}</dd>
                  </div>
                </dl>
                <div className='mt-4 border-t border-border/70 pt-3'>
                  {equipmentId ? <EquipmentActions equipment={equipment} categories={categories} /> : <span className='text-sm text-muted-foreground'>Actions unavailable</span>}
                </div>
              </article>
            )
          })
        ) : (
          <p className='rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground'>No equipment found.</p>
        )}
      </div>
    </div>
  )
}

export default MyEquipmentTable

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Check,
  Eye,
  ImageOff,
  Loader2,
  MapPin,
  MoreHorizontal,
  PackageOpen,
  Pencil,
  Star,
  StarOff,
  Trash2,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DeleteDialog from '@/components/dashboard/owner/DeleteDialog'
import UpdateEquipment from '@/components/dashboard/owner/UpdateEquipment'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { updateEquipmentStatus } from '@/lib/actions/status'
import type { Equipment, EquipmentStatus } from '@/types/equipment'
import type { Category } from '@/types/category'
import { updateFeatureEquipment } from '@/lib/actions/equipment'

interface AdminEquipmentTableProps {
  equipments: Equipment[]
  categories: Category[]
  errorMessage: string | null
}

const normalizeStatus = (status?: string): EquipmentStatus => {
  if (!status) return 'pending'
  const lower = status.toLowerCase()
  if (lower === 'approved') return 'approved'
  if (lower === 'rejected') return 'rejected'
  return 'pending'
}

const getStatusBadge = (status?: string) => {
  const normalized = normalizeStatus(status)

  if (normalized === 'approved') {
    return {
      label: 'Approved',
      badgeClass:
        'border-success/25 bg-success/10 text-success dark:text-success dark:border-success/25',
      dotClass: 'bg-success/10',
      pulse: false,
    }
  }

  if (normalized === 'rejected') {
    return {
      label: 'Rejected',
      badgeClass:
        'border-destructive/25 bg-destructive/10 text-destructive dark:text-destructive dark:border-destructive/25',
      dotClass: 'bg-destructive/10',
      pulse: false,
    }
  }

  return {
    label: 'Pending',
    badgeClass:
      'border-warning/25 bg-warning/10 text-warning dark:text-warning dark:border-warning/25',
    dotClass: 'bg-warning/10',
    pulse: true,
  }
}

const AdminEquipmentTable = ({
  equipments,
  categories,
  errorMessage,
}: AdminEquipmentTableProps) => {
  const router = useRouter()
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  )
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(
    null
  )
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [updatingAction, setUpdatingAction] = useState<EquipmentStatus | null>(
    null
  )

  const handleStatusUpdate = async (
    equipment: Equipment,
    newStatus: EquipmentStatus
  ) => {
    const equipmentId = equipment._id ?? equipment.id
    if (!equipmentId) {
      toast.error('Equipment ID is missing')
      return
    }

    try {
      setUpdatingId(equipmentId)
      setUpdatingAction(newStatus)

      await updateEquipmentStatus(equipmentId, newStatus)
      toast.success(
        `Equipment ${equipment.name} is now ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`
      )
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update status'
      )
    } finally {
      setUpdatingId(null)
      setUpdatingAction(null)
    }
  }
  const handleFeaturedToggle = async (id: string, isFeatured: boolean) => {
    console.log(id)
    try {
      const result = await updateFeatureEquipment({
        id,
        isFeatured: !isFeatured,
      })

      if (result.success) {
        toast.success(result.message)
        router.refresh()
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    }
  }

  if (errorMessage) {
    return (
      <div
        role='alert'
        className='rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive shadow-xs'
      >
        <p className='font-semibold'>Error loading equipment</p>
        <p className='mt-1 text-muted-foreground'>{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className='hidden overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs md:block'>
        <Table className='min-w-220'>
          <TableHeader className='border-b border-border/70 bg-muted/50'>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Equipment
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Category
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Rental Price
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Available
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Status
              </TableHead>
              <TableHead className='py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {equipments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='h-48 text-center text-muted-foreground'
                >
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <PackageOpen
                      className='size-10 text-muted-foreground/60'
                      aria-hidden='true'
                    />
                    <p className='text-base font-semibold text-foreground'>
                      No equipment found
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Equipment listings added by owners will appear here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              equipments.map((equipment, index) => {
                const equipmentId = equipment._id ?? equipment.id
                const rowKey = equipmentId ?? `${equipment.name}-${index}`
                const statusBadge = getStatusBadge(equipment.status)
                const currentStatus = normalizeStatus(equipment.status)
                const isItemUpdating = updatingId === equipmentId

                return (
                  <TableRow
                    key={rowKey}
                    className='group border-b border-border/40 transition-colors hover:bg-muted/30 last:border-0'
                  >
                    {/* Equipment Details */}
                    <TableCell className='py-3.5'>
                      <div className='flex min-w-56 items-center gap-3.5'>
                        <div className='relative size-12 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted/60 shadow-2xs'>
                          {equipment.image?.trim() ? (
                            <Image
                              src={equipment.image}
                              alt={equipment.name}
                              fill
                              sizes='48px'
                              className='object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          ) : (
                            <div className='flex size-full items-center justify-center text-muted-foreground'>
                              <ImageOff className='size-5' aria-hidden='true' />
                            </div>
                          )}
                        </div>

                        <div className='min-w-0 flex-1 space-y-1'>
                          <p className='line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary'>
                            {equipment.name}
                          </p>

                          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                            {equipment.location && (
                              <span className='inline-flex items-center gap-1 truncate'>
                                <MapPin
                                  className='size-3 shrink-0 text-muted-foreground/80'
                                  aria-hidden='true'
                                />
                                {equipment.location}
                              </span>
                            )}
                            {equipment.owner?.name && (
                              <>
                                <span className='size-1 rounded-full bg-border' />
                                <span className='truncate text-muted-foreground/80'>
                                  By {equipment.owner.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell className='py-3.5'>
                      <Badge className='rounded-md border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary shadow-2xs'>
                        {equipment.category}
                      </Badge>
                    </TableCell>

                    {/* Rental Price */}
                    <TableCell className='py-3.5 whitespace-nowrap'>
                      <span className='text-sm font-semibold tracking-tight text-foreground'>
                        ৳{equipment.rentalPrice.toLocaleString()}
                      </span>
                      <span className='ml-1 text-xs text-muted-foreground'>
                        /{equipment.rentalType.toLowerCase()}
                      </span>
                    </TableCell>

                    {/* Available Quantity */}
                    <TableCell className='py-3.5'>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 text-xs font-medium',
                          equipment.availableQuantity > 0
                            ? 'text-foreground'
                            : 'font-semibold text-destructive'
                        )}
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full',
                            equipment.availableQuantity > 0
                              ? 'bg-success/10'
                              : 'bg-destructive'
                          )}
                        />
                        {equipment.availableQuantity}{' '}
                        {equipment.availableQuantity === 1 ? 'unit' : 'units'}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell className='py-3.5'>
                      <Badge
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium shadow-2xs',
                          statusBadge.badgeClass
                        )}
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full',
                            statusBadge.dotClass,
                            statusBadge.pulse && 'animate-pulse'
                          )}
                        />
                        {statusBadge.label}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className='py-3.5 text-right'>
                      <div className='flex items-center justify-end gap-1.5'>
                        {/* Quick Action: Approve (when not approved) */}
                        {currentStatus !== 'approved' && (
                          <Button
                            type='button'
                            size='sm'
                            disabled={isItemUpdating}
                            onClick={() =>
                              handleStatusUpdate(equipment, 'approved')
                            }
                            className='h-8 gap-1 rounded-lg border border-success/25 bg-success/10 px-2.5 text-xs font-medium text-success shadow-2xs transition-colors hover:bg-success/10 hover:text-success dark:text-success dark:hover:text-success'
                          >
                            {isItemUpdating && updatingAction === 'approved' ? (
                              <Loader2 className='size-3.5 animate-spin' />
                            ) : (
                              <Check className='size-3.5' />
                            )}
                            <span className='hidden sm:inline'>Approve</span>
                          </Button>
                        )}

                        {/* Quick Action: Reject (when not rejected) */}
                        {currentStatus !== 'rejected' && (
                          <Button
                            type='button'
                            size='sm'
                            variant='ghost'
                            disabled={isItemUpdating}
                            onClick={() =>
                              handleStatusUpdate(equipment, 'rejected')
                            }
                            className='h-8 gap-1 rounded-lg border border-destructive/25 bg-destructive/10 px-2.5 text-xs font-medium text-destructive shadow-2xs transition-colors hover:bg-destructive/10 hover:text-destructive dark:text-destructive dark:hover:text-destructive'
                          >
                            {isItemUpdating && updatingAction === 'rejected' ? (
                              <Loader2 className='size-3.5 animate-spin' />
                            ) : (
                              <X className='size-3.5' />
                            )}
                            <span className='hidden sm:inline'>Reject</span>
                          </Button>
                        )}

                        {/* More Actions Dropdown Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            type='button'
                            aria-label={`More actions for ${equipment.name}`}
                            className='inline-flex size-8 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
                          >
                            <MoreHorizontal
                              className='size-4'
                              aria-hidden='true'
                            />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align='end' className='w-44'>
                            {equipmentId && (
                              <DropdownMenuItem
                                render={
                                  <Link
                                    href={`/all-equipments/${equipmentId}`}
                                  />
                                }
                                className='cursor-pointer gap-2'
                              >
                                <Eye className='size-4' aria-hidden='true' />
                                View Details
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem
                              onClick={() => setEditingEquipment(equipment)}
                              className='cursor-pointer gap-2'
                            >
                              <Pencil className='size-4' aria-hidden='true' />
                              Update
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                handleFeaturedToggle(
                                  equipment._id || '',
                                  equipment.isFeatured ?? false
                                )
                              }
                              className='cursor-pointer gap-2'
                            >
                              {equipment.isFeatured ? (
                                <>
                                  <StarOff className='h-4 w-4' />
                                  Remove Featured
                                </>
                              ) : (
                                <>
                                  <Star className='h-4 w-4' />
                                  Make Featured
                                </>
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              variant='destructive'
                              onClick={() => setSelectedEquipment(equipment)}
                              className='cursor-pointer gap-2'
                            >
                              <Trash2 className='size-4' aria-hidden='true' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className='space-y-3 md:hidden'>
        {equipments.length ? equipments.map((equipment, index) => {
          const equipmentId = equipment._id ?? equipment.id
          const rowKey = equipmentId ?? `${equipment.name}-${index}`
          const statusBadge = getStatusBadge(equipment.status)
          const currentStatus = normalizeStatus(equipment.status)
          const isItemUpdating = updatingId === equipmentId

          return (
            <article key={rowKey} className='rounded-2xl border border-border bg-card p-4 shadow-sm'>
              <div className='flex items-start gap-3'>
                <div className='relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted'>
                  {equipment.image?.trim() ? (
                    <Image src={equipment.image} alt={equipment.name} fill sizes='64px' className='object-cover' />
                  ) : (
                    <div className='flex size-full items-center justify-center text-muted-foreground'><ImageOff className='size-5' aria-hidden='true' /></div>
                  )}
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='font-semibold text-foreground'>{equipment.name}</h3>
                  <p className='mt-1 truncate text-xs text-muted-foreground'>{equipment.location}{equipment.owner?.name ? ` · By ${equipment.owner.name}` : ''}</p>
                  <Badge className='mt-2 rounded-md border-primary/20 bg-primary/10 text-primary'>{equipment.category}</Badge>
                </div>
                <Badge className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium', statusBadge.badgeClass)}>
                  <span className={cn('size-1.5 rounded-full', statusBadge.dotClass, statusBadge.pulse && 'animate-pulse')} />
                  {statusBadge.label}
                </Badge>
              </div>
              <dl className='mt-4 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 text-sm'>
                <div><dt className='text-xs text-muted-foreground'>Rental price</dt><dd className='mt-1 font-semibold'>৳{equipment.rentalPrice.toLocaleString()} <span className='font-normal text-muted-foreground'>/{equipment.rentalType.toLowerCase()}</span></dd></div>
                <div><dt className='text-xs text-muted-foreground'>Available</dt><dd className='mt-1 font-medium'>{equipment.availableQuantity} {equipment.availableQuantity === 1 ? 'unit' : 'units'}</dd></div>
              </dl>
              <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-3'>
                {equipmentId && <Link href={`/all-equipments/${equipmentId}`} className='inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted'><Eye className='size-4' aria-hidden='true' /> View</Link>}
                {currentStatus !== 'approved' && <Button type='button' size='sm' disabled={isItemUpdating} onClick={() => handleStatusUpdate(equipment, 'approved')} className='h-9 flex-1 gap-1.5 bg-success/10 text-success hover:bg-success/15 hover:text-success dark:text-success'><Check className='size-4' /> Approve</Button>}
                {currentStatus !== 'rejected' && <Button type='button' size='sm' variant='outline' disabled={isItemUpdating} onClick={() => handleStatusUpdate(equipment, 'rejected')} className='h-9 flex-1 gap-1.5 border-destructive/25 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive'><X className='size-4' /> Reject</Button>}
                <DropdownMenu>
                  <DropdownMenuTrigger type='button' aria-label={`More actions for ${equipment.name}`} className='inline-flex size-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground'>
                    <MoreHorizontal className='size-4' aria-hidden='true' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-44'>
                    <DropdownMenuItem onClick={() => setEditingEquipment(equipment)} className='cursor-pointer gap-2'><Pencil className='size-4' aria-hidden='true' /> Update</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFeaturedToggle(equipment._id || '', equipment.isFeatured ?? false)} className='cursor-pointer gap-2'>{equipment.isFeatured ? <><StarOff className='size-4' /> Remove Featured</> : <><Star className='size-4' /> Make Featured</>}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant='destructive' onClick={() => setSelectedEquipment(equipment)} className='cursor-pointer gap-2'><Trash2 className='size-4' aria-hidden='true' /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </article>
          )
        }) : (
          <p className='rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground'>No equipment found.</p>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />

      {/* Update Equipment Modal */}
      {editingEquipment && (
        <UpdateEquipment
          equipment={editingEquipment}
          categories={categories}
          open
          onOpenChange={(open) => {
            if (!open) {
              setEditingEquipment(null)
            }
          }}
        />
      )}
    </div>
  )
}

export default AdminEquipmentTable

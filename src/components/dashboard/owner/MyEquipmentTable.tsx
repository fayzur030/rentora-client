'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Eye,
  ImageOff,
  LoaderCircle,
  MoreHorizontal,
  Pencil,
  ShieldAlert,
  Trash2,
  TriangleAlert,
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteEquipment } from '@/lib/actions/equipment'
import type { Equipment, EquipmentStatus } from '@/types/equipment'

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
  const router = useRouter()
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  )
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const equipmentId = selectedEquipment?._id ?? selectedEquipment?.id
    if (!selectedEquipment || !equipmentId) {
      toast.error('Equipment ID is missing')
      return
    }

    try {
      setIsDeleting(true)
      await deleteEquipment(equipmentId)
      toast.success('Equipment deleted successfully')
      setSelectedEquipment(null)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete equipment'
      )
    } finally {
      setIsDeleting(false)
    }
  }

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
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          type='button'
                          aria-label={`Actions for ${equipment.name}`}
                          className='inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
                        >
                          <MoreHorizontal
                            className='size-4'
                            aria-hidden='true'
                          />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end' className='w-48'>
                          <DropdownMenuItem
                            render={
                              <Link href={`/all-equipments/${equipmentId}`} />
                            }
                            className='cursor-pointer gap-2'
                          >
                            <Eye aria-hidden='true' />
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            render={
                              <Link
                                href={`/dashboard/owner/my-equipment/edit/${equipmentId}`}
                              />
                            }
                            className='cursor-pointer gap-2'
                          >
                            <Pencil aria-hidden='true' />
                            Update
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant='destructive'
                            onClick={() => setSelectedEquipment(equipment)}
                            className='cursor-pointer gap-2'
                          >
                            <Trash2 aria-hidden='true' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
      <Dialog
        open={selectedEquipment !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setSelectedEquipment(null)
        }}
      >
        <DialogContent
          overlayClassName='backdrop-blur-xs'
          forceOverlay
          className='gap-0 p-0 sm:max-w-md'
        >
          <DialogHeader className='gap-4 border-b border-border px-5 py-5 pr-14 sm:px-6'>
            <div className='flex items-start gap-3'>
              <span className='flex size-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive ring-1 ring-destructive/15'>
                <TriangleAlert className='size-5' aria-hidden='true' />
              </span>

              <div className='space-y-1'>
                <DialogTitle>Delete this equipment?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. The listing will be removed from
                  your account permanently.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className='space-y-4 px-5 py-5 sm:px-6'>
            <div className='rounded-xl border border-border bg-muted/40 p-4'>
              <p className='text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase'>
                Equipment
              </p>
              <p className='mt-1 text-sm font-semibold text-foreground'>
                {selectedEquipment?.name}
              </p>
              <p className='mt-1 text-xs text-muted-foreground'>
                {selectedEquipment?.category}৳
                {selectedEquipment?.rentalPrice.toLocaleString()}
                {selectedEquipment?.rentalType?.toLowerCase() ?? 'daily'}
              </p>
            </div>

            <div className='flex items-start gap-2 rounded-lg bg-destructive/5 px-3 py-2.5 text-xs leading-5 text-destructive'>
              <ShieldAlert
                className='mt-0.5 size-4 shrink-0'
                aria-hidden='true'
              />
              <p>
                Deleting is permanent. Any rental history linked to this
                equipment may also be affected.
              </p>
            </div>
          </div>

          <DialogFooter className='border-t border-border bg-card px-5 py-4 sm:px-6'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setSelectedEquipment(null)}
              disabled={isDeleting}
              className='w-full sm:w-auto'
            >
              Cancel
            </Button>

            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              disabled={isDeleting}
              className='w-full gap-2 sm:w-auto'
            >
              {isDeleting ? (
                <LoaderCircle
                  className='size-4 animate-spin'
                  aria-hidden='true'
                />
              ) : (
                <Trash2 className='size-4' aria-hidden='true' />
              )}
              {isDeleting ? 'Deleting...' : 'Delete equipment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MyEquipmentTable

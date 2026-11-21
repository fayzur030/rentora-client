'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageOff } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import type { Equipment, EquipmentStatus } from '@/types/equipment'
import { updateEquipmentStatus } from '@/lib/actions/status'

interface AdminEquipmentTableProps {
  equipments: Equipment[]
  errorMessage: string | null
}

const statusStyles: Record<EquipmentStatus, string> = {
  pending: 'border-amber-300 bg-amber-100 text-amber-900',
  approved: 'border-emerald-300 bg-emerald-100 text-emerald-900',
  rejected: 'border-rose-300 bg-rose-100 text-rose-900',
}

const getStatusBadge = (status: EquipmentStatus) => {
  const normalizedStatus = status.toLowerCase()

  if (
    normalizedStatus === 'pending' ||
    normalizedStatus === 'approved' ||
    normalizedStatus === 'rejected'
  ) {
    return {
      label:
        normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1),
      className: statusStyles[normalizedStatus],
    }
  }

  return {
    label: status,
    className: 'border-border bg-muted text-muted-foreground',
  }
}

const AdminEquipmentTable = ({
  equipments,
  errorMessage,
}: AdminEquipmentTableProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  )
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(
    null
  )
  const [updatingEquipmentId, setUpdatingEquipmentId] = useState<string | null>(
    null
  )
  const router = useRouter()

  const handleApprove = async (equipment: Equipment) => {
    const equipmentId = equipment._id ?? equipment.id

    if (!equipmentId) {
      toast.error('Equipment ID is missing')
      return
    }

    try {
      setUpdatingEquipmentId(equipmentId)
      await updateEquipmentStatus(equipmentId, 'approved')

      toast.success(`${equipment.name} approved successfully.`)
      router.refresh()
    } catch (error) {
      console.error('Approve Error:', error)

      toast.error(
        error instanceof Error ? error.message : 'Failed to approve equipment.'
      )
    } finally {
      setUpdatingEquipmentId(null)
    }
  }

  const handleReject = (equipment: Equipment) => {
    toast.info(`Reject action for ${equipment.name} is ready to implement.`)
  }

  const handleUpdate = (equipment: Equipment) => {
    setEditingEquipment(equipment)
  }

  if (errorMessage) {
    return (
      <div
        role='alert'
        className='rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive'
      >
        {errorMessage}
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      <p className='text-xs text-muted-foreground sm:hidden'>
        Swipe sideways to see all table columns.
      </p>

      <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
        <Table className='min-w-275'>
          <TableHeader className='bg-muted/40'>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Equipment</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rental Price</TableHead>
              <TableHead>Available Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {equipments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='h-28 text-center text-muted-foreground'
                >
                  No equipment found.
                </TableCell>
              </TableRow>
            ) : (
              equipments.map((equipment, index) => {
                const statusBadge = getStatusBadge(equipment.status)

                return (
                  <TableRow
                    key={
                      equipment._id ??
                      equipment.id ??
                      `${equipment.name}-${index}`
                    }
                    className='hover:bg-muted/35'
                  >
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
                        / {equipment.rentalType.toLowerCase()}
                      </span>
                    </TableCell>

                    <TableCell>
                      {equipment.availableQuantity}{' '}
                      {equipment.availableQuantity === 1 ? 'unit' : 'units'}
                    </TableCell>

                    <TableCell>
                      <Badge className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className='flex min-w-64 justify-end gap-2'>
                        <Button
                          type='button'
                          size='sm'
                          variant='secondary'
                          disabled={updatingEquipmentId !== null}
                          onClick={() => handleApprove(equipment)}
                        >
                          {updatingEquipmentId ===
                          (equipment._id ?? equipment.id)
                            ? 'Approving...'
                            : 'Approve'}
                        </Button>
                        <Button
                          type='button'
                          size='sm'
                          variant='outline'
                          onClick={() => handleReject(equipment)}
                        >
                          Reject
                        </Button>
                        <Button
                          type='button'
                          size='sm'
                          variant='outline'
                          onClick={() => handleUpdate(equipment)}
                        >
                          Update
                        </Button>
                        <Button
                          type='button'
                          size='sm'
                          variant='destructive'
                          onClick={() => setSelectedEquipment(equipment)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteDialog
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />

      {editingEquipment && (
        <UpdateEquipment
          equipment={editingEquipment}
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

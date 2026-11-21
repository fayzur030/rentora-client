'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Equipment } from '@/types/equipment'
import DeleteDialog from './DeleteDialog'

interface EquipmentActionsProps {
  equipment: Equipment
}

const EquipmentActions = ({ equipment }: EquipmentActionsProps) => {
  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null)
  const equipmentId = equipment._id ?? equipment.id

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          type='button'
          aria-label={`Actions for ${equipment.name}`}
          className='inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
        >
          <MoreHorizontal className='size-4' aria-hidden='true' />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuItem
            render={<Link href={`/all-equipments/${equipmentId}`} />}
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

      <DeleteDialog
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
    </>
  )
}

export default EquipmentActions

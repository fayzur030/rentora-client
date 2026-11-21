'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Trash2, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { deleteEquipment } from '@/lib/actions/equipment'
import type { Equipment } from '@/types/equipment'

interface DeleteDialogProps {
  selectedEquipment: Equipment | null
  setSelectedEquipment: (equipment: Equipment | null) => void
}

/**
 * DeleteDialog: Modern SaaS Confirmation Modal
 * Used by Equipment Owners and Admins to safely confirm deletion of equipment listings.
 */
const DeleteDialog = ({
  selectedEquipment,
  setSelectedEquipment,
}: DeleteDialogProps) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const equipmentId = selectedEquipment?._id ?? selectedEquipment?.id

    if (!selectedEquipment || !equipmentId) {
      toast.error('Equipment ID is missing')
      return
    }

    try {
      setIsDeleting(true)
      const result = await deleteEquipment(equipmentId)

      if (result.success) {
        toast.success(result.message || 'Equipment deleted successfully')
        setSelectedEquipment(null)
        router.refresh()
      } else {
        toast.error(result.message || 'Failed to delete equipment')
      }
    } catch (error) {
      console.error('Delete Equipment Error:', error)
      toast.error('Something went wrong while deleting equipment')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog
      open={selectedEquipment !== null}
      onOpenChange={(open) => {
        if (!open && !isDeleting) setSelectedEquipment(null)
      }}
    >
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 p-0 sm:max-w-md overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl'
      >
        {/* Modal Header */}
        <DialogHeader className='border-b border-border px-6 py-5 pr-14'>
          <div className='flex items-center gap-3'>
            <span className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive shadow-2xs'>
              <TriangleAlert className='size-5' aria-hidden='true' />
            </span>
            <div className='space-y-0.5'>
              <DialogTitle className='font-heading text-lg font-bold text-foreground'>
                Delete Equipment
              </DialogTitle>
              <DialogDescription className='text-xs text-muted-foreground'>
                Please review before confirming deletion.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Body */}
        <div className='px-6 py-5 space-y-3 text-sm'>
          <p className='text-muted-foreground leading-relaxed'>
            Are you sure you want to permanently delete{' '}
            <span className='font-semibold text-foreground'>
              &quot;{selectedEquipment?.name}&quot;
            </span>
            ?
          </p>
          <div className='rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive'>
            Warning: This action is permanent and cannot be undone. All associated listing data will be removed.
          </div>
        </div>

        {/* Modal Footer */}
        <DialogFooter className='border-t border-border bg-muted/20 px-6 py-4'>
          <div className='flex w-full flex-col-reverse justify-end gap-2 sm:flex-row'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setSelectedEquipment(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              disabled={isDeleting}
              className='gap-2 shadow-2xs'
            >
              {isDeleting ? (
                <LoaderCircle
                  className='size-4 animate-spin'
                  aria-hidden='true'
                />
              ) : (
                <Trash2 className='size-4' aria-hidden='true' />
              )}
              {isDeleting ? 'Deleting...' : 'Delete Equipment'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog

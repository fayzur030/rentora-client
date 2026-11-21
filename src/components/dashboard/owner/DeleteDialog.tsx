'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Equipment } from '@/types/equipment'
import { LoaderCircle, Trash2, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteEquipment } from '@/lib/actions/equipment'

interface DeleteDialogProps {
  selectedEquipment: Equipment | null

  setSelectedEquipment: (equipment: Equipment | null) => void
}
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
      toast.error('Something went wrong')
    } finally {
      setIsDeleting(false)
    }
  }

  //   const handleDelete = async () => {
  //     const equipmentId = selectedEquipment?._id ?? selectedEquipment?.id
  //     console.log(equipmentId)
  //     if (!selectedEquipment || !equipmentId) {
  //       toast.error('Equipment ID is missing')
  //       return
  //     }

  //     try {
  //       setIsDeleting(true)
  //       await deleteEquipment(equipmentId)
  //       toast.success('Equipment deleted successfully')
  //       setSelectedEquipment(null)
  //       router.refresh()
  //     } catch (error) {
  //       toast.error(
  //         error instanceof Error ? error.message : 'Failed to delete equipment'
  //       )
  //     } finally {
  //       setIsDeleting(false)
  //     }
  //   }

  return (
    <div>
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
                  Are you sure you want to delete{' '}
                  <span className='font-semibold text-foreground'>
                    {selectedEquipment?.name}
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className='border-t border-border bg-card px-5 py-4 sm:px-6'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setSelectedEquipment(null)}
              disabled={isDeleting}
              className='w-full sm:w-auto cursor-pointer'
            >
              Cancel
            </Button>

            <Button
              type='button'
              variant='destructive'
              onClick={handleDelete}
              disabled={isDeleting}
              className='w-full gap-2 sm:w-auto cursor-pointer'
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
    </div>
  )
}

export default DeleteDialog

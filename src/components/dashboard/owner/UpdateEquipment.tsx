'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Send } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/dashboard/add-equipment/image-upload'
import { updateEquipment } from '@/lib/actions/equipment'
import type {
  Equipment,
  EquipmentCondition,
  RentalType,
} from '@/types/equipment'
import type { Category } from '@/types/category'

interface UpdateEquipmentProps {
  equipment: Equipment
  categories: Category[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const conditions: EquipmentCondition[] = ['New', 'Like New', 'Good', 'Fair']
const rentalTypes: RentalType[] = ['Daily', 'Weekly', 'Monthly']

const UpdateEquipment = ({
  equipment,
  categories,
  open,
  onOpenChange,
}: UpdateEquipmentProps) => {
  const router = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [image, setImage] = useState(equipment.image ?? '')

  const equipmentId = equipment._id ?? equipment.id

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!equipmentId) {
      toast.error('Equipment ID is missing')
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    const updatedEquipment: Equipment = {
      ...equipment,
      name: String(formData.get('name') ?? ''),
      category: String(
        formData.get('category') ?? equipment.category
      ) as Equipment['category'],
      description: String(formData.get('description') ?? ''),
      location: String(formData.get('location') ?? ''),
      condition: String(
        formData.get('condition') ?? ''
      ) as Equipment['condition'],
      brand: String(formData.get('brand') ?? ''),
      model: String(formData.get('model') ?? ''),
      image,
      rentalPrice: Number(formData.get('rentalPrice')),
      rentalType: String(
        formData.get('rentalType') ?? ''
      ) as Equipment['rentalType'],
      availableQuantity: Number(formData.get('availableQuantity')),
      rentalTerms: String(formData.get('rentalTerms') ?? ''),
    }

    try {
      setIsUpdating(true)

      await updateEquipment(equipmentId, updatedEquipment)

      toast.success('Equipment updated successfully')

      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update equipment'
      )
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 p-0 sm:max-w-2xl overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl'
      >
        <DialogHeader className='border-b border-border px-5 py-5 pr-14 sm:px-6'>
          <DialogTitle className='font-heading text-lg font-bold text-foreground sm:text-xl'>
            Update Equipment
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground'>
            Update your equipment details and rental information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate}>
          <div className='max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6'>
            <div className='grid gap-5 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='update-name'>Equipment name</Label>
                <Input
                  id='update-name'
                  name='name'
                  defaultValue={equipment.name}
                  required
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label>Category</Label>
                <Select
                  name='category'
                  defaultValue={equipment.category}
                  disabled={categories.length === 0}
                >
                  <SelectTrigger className='h-11 w-full py-5.5'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <SelectItem value='no-categories' disabled>
                        No categories available
                      </SelectItem>
                    ) : (
                      categories.map((category) => (
                        <SelectItem
                          key={category._id}
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2 sm:col-span-2'>
                <Label htmlFor='update-description'>Description</Label>
                <Textarea
                  id='update-description'
                  name='description'
                  defaultValue={equipment.description}
                  required
                  className='min-h-28'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-location'>Location</Label>
                <Input
                  id='update-location'
                  name='location'
                  defaultValue={equipment.location}
                  required
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label>Equipment condition</Label>
                <Select name='condition' defaultValue={equipment.condition}>
                  <SelectTrigger className='h-11 w-full'>
                    <SelectValue placeholder='Select condition' />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-brand'>Brand</Label>
                <Input
                  id='update-brand'
                  name='brand'
                  defaultValue={equipment.brand ?? ''}
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-model'>Model</Label>
                <Input
                  id='update-model'
                  name='model'
                  defaultValue={equipment.model ?? ''}
                  className='h-11'
                />
              </div>

              <div className='sm:col-span-2'>
                <ImageUpload value={image} onChange={setImage} />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-price'>Rental price</Label>
                <Input
                  id='update-price'
                  name='rentalPrice'
                  type='number'
                  min='1'
                  defaultValue={equipment.rentalPrice}
                  required
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label>Rental type</Label>
                <Select name='rentalType' defaultValue={equipment.rentalType}>
                  <SelectTrigger className='h-11 w-full'>
                    <SelectValue placeholder='Select rental type' />
                  </SelectTrigger>
                  <SelectContent>
                    {rentalTypes.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-quantity'>Available quantity</Label>
                <Input
                  id='update-quantity'
                  name='availableQuantity'
                  type='number'
                  min='1'
                  defaultValue={equipment.availableQuantity}
                  required
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-condition'>Equipment condition</Label>

                <Input
                  id='update-condition'
                  name='condition'
                  type='text'
                  defaultValue={equipment.condition}
                  required
                  placeholder='Enter equipment condition'
                  className='h-11'
                />
              </div>

              <div className='space-y-2 sm:col-span-2'>
                <Label htmlFor='update-terms'>
                  Rental terms and conditions
                </Label>
                <Textarea
                  id='update-terms'
                  name='rentalTerms'
                  defaultValue={equipment.rentalTerms}
                  required
                  className='min-h-28'
                />
              </div>
            </div>
          </div>

          <DialogFooter className='border-t border-border bg-muted/20 px-5 py-4 sm:px-6'>
            <div className='flex w-full flex-col-reverse justify-end gap-2 sm:flex-row'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={isUpdating}
                className='gap-2 shadow-2xs'
              >
                {isUpdating ? (
                  <LoaderCircle className='size-4 animate-spin' />
                ) : (
                  <Send className='size-4' />
                )}

                {isUpdating ? 'Updating...' : 'Update Equipment'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateEquipment

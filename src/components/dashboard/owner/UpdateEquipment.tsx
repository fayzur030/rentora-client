'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, LoaderCircle, Send } from 'lucide-react'
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
import type { Equipment } from '@/types/equipment'

interface UpdateEquipmentProps {
  equipment: Equipment
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = [
  'Construction Equipment',
  'Photography Equipment',
  'Vehicles & Transportation',
  'Agriculture Equipment',
  'Electronics',
  'Event Equipment',
]

const conditions = ['New', 'Like New', 'Good', 'Fair']
const rentalTypes = ['Daily', 'Weekly', 'Monthly']

const UpdateEquipment = ({
  equipment,
  open,
  onOpenChange,
}: UpdateEquipmentProps) => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isUpdating, setIsUpdating] = useState(false)
  const [image, setImage] = useState(equipment.image ?? '')
  const [name, setName] = useState(equipment.name)
  const [category, setCategory] = useState(equipment.category)
  const [description, setDescription] = useState(equipment.description)
  const [location, setLocation] = useState(equipment.location)
  const [condition, setCondition] = useState(equipment.condition)
  const [brand, setBrand] = useState(equipment.brand ?? '')
  const [model, setModel] = useState(equipment.model ?? '')
  const [rentalPrice, setRentalPrice] = useState(
    String(equipment.rentalPrice)
  )
  const [rentalType, setRentalType] = useState(equipment.rentalType)
  const [availableQuantity, setAvailableQuantity] = useState(
    String(equipment.availableQuantity)
  )
  const [rentalTerms, setRentalTerms] = useState(equipment.rentalTerms)

  const equipmentId = equipment._id ?? equipment.id

  const resetForm = () => {
    setStep(1)
    setImage(equipment.image ?? '')
    setName(equipment.name)
    setCategory(equipment.category)
    setDescription(equipment.description)
    setLocation(equipment.location)
    setCondition(equipment.condition)
    setBrand(equipment.brand ?? '')
    setModel(equipment.model ?? '')
    setRentalPrice(String(equipment.rentalPrice))
    setRentalType(equipment.rentalType)
    setAvailableQuantity(String(equipment.availableQuantity))
    setRentalTerms(equipment.rentalTerms)
  }

  const closeModal = () => {
    if (!isUpdating) {
      onOpenChange(false)
      resetForm()
    }
  }

  const handleUpdate = async () => {
    if (!equipmentId) {
      toast.error('Equipment ID is missing')
      return
    }

    const updatedEquipment: Equipment = {
      ...equipment,
      name,
      category,
      description,
      location,
      condition,
      brand,
      model,
      image,
      rentalPrice: Number(rentalPrice),
      rentalType,
      availableQuantity: Number(availableQuantity),
      rentalTerms,
    }

    try {
      setIsUpdating(true)
      await updateEquipment(equipmentId, updatedEquipment)
      toast.success('Equipment updated successfully')
      onOpenChange(false)
      resetForm()
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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeModal()
      }}
    >
      <DialogContent
        overlayClassName='backdrop-blur-xs'
        forceOverlay
        className='gap-0 p-0 sm:max-w-2xl'
      >
        <DialogHeader className='border-b border-border px-5 py-5 pr-14 sm:px-6'>
          <DialogTitle>Update equipment</DialogTitle>
          <DialogDescription>Step {step} of 3</DialogDescription>
        </DialogHeader>

        <div className='max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6'>
          {step === 1 && (
            <div className='grid gap-5 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='update-name'>Equipment name</Label>
                <Input
                  id='update-name'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as Equipment['category'])}
                >
                  <SelectTrigger className='h-11 w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2 sm:col-span-2'>
                <Label htmlFor='update-description'>Description</Label>
                <Textarea
                  id='update-description'
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className='min-h-28'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-location'>Location</Label>
                <Input
                  id='update-location'
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label>Equipment condition</Label>
                <Select
                  value={condition}
                  onValueChange={(value) =>
                    setCondition(value as Equipment['condition'])
                  }
                >
                  <SelectTrigger className='h-11 w-full'>
                    <SelectValue />
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
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='update-model'>Model</Label>
                <Input
                  id='update-model'
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  className='h-11'
                />
              </div>

              <div className='sm:col-span-2'>
                <ImageUpload value={image} onChange={setImage} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='grid gap-5 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='update-price'>Rental price</Label>
                <Input
                  id='update-price'
                  type='number'
                  value={rentalPrice}
                  onChange={(event) => setRentalPrice(event.target.value)}
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label>Rental type</Label>
                <Select
                  value={rentalType}
                  onValueChange={(value) =>
                    setRentalType(value as Equipment['rentalType'])
                  }
                >
                  <SelectTrigger className='h-11 w-full'>
                    <SelectValue />
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
                  type='number'
                  value={availableQuantity}
                  onChange={(event) => setAvailableQuantity(event.target.value)}
                  className='h-11'
                />
              </div>

              <div className='space-y-2 sm:col-span-2'>
                <Label htmlFor='update-terms'>
                  Rental terms and conditions
                </Label>
                <Textarea
                  id='update-terms'
                  value={rentalTerms}
                  onChange={(event) => setRentalTerms(event.target.value)}
                  className='min-h-28'
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-xl border border-border p-4'>
                <p className='text-xs text-muted-foreground'>Owner name</p>
                <p className='mt-1 font-semibold'>{equipment.owner.name}</p>
              </div>
              <div className='rounded-xl border border-border p-4'>
                <p className='text-xs text-muted-foreground'>Owner email</p>
                <p className='mt-1 font-semibold'>{equipment.owner.email}</p>
              </div>
              <div className='rounded-xl border border-border p-4 sm:col-span-2'>
                <p className='text-xs text-muted-foreground'>Listing status</p>
                <p className='mt-1 font-semibold'>{equipment.status}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className='border-t border-border px-5 py-4 sm:px-6'>
          {step > 1 ? (
            <Button
              type='button'
              variant='outline'
              onClick={() => setStep(step - 1)}
              disabled={isUpdating}
              className='gap-2'
            >
              <ArrowLeft className='size-4' />
              Previous
            </Button>
          ) : (
            <Button
              type='button'
              variant='outline'
              onClick={closeModal}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          )}

          {step < 3 ? (
            <Button
              type='button'
              onClick={() => setStep(step + 1)}
              className='gap-2'
            >
              Next
              <ArrowRight className='size-4' />
            </Button>
          ) : (
            <Button
              type='button'
              onClick={handleUpdate}
              disabled={isUpdating}
              className='gap-2'
            >
              {isUpdating ? (
                <LoaderCircle className='size-4 animate-spin' />
              ) : (
                <Send className='size-4' />
              )}
              {isUpdating ? 'Updating...' : 'Update equipment'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateEquipment

'use client'
import { Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import BasicInformation from './basic-information'
import OwnerInformation from './owner-information'
import RentalInformation from './rental-information'
import { createEquipment } from '@/lib/actions/equipment'
import {
  Equipment,
  EquipmentCategory,
  EquipmentCondition,
  EquipmentOwner,
  EquipmentStatus,
  RentalType,
} from '@/types/equipment'
import { toast } from 'sonner'
import { useState } from 'react'

// Main form for the Add Equipment page.
// It only puts the sections together.
// Submit / reset logic will be added later.

const EquipmentForm = () => {
  const [image, setImage] = useState('')
  const handleCreateEquipment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)

    const equipmentData: Equipment = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as EquipmentCategory,
      location: formData.get('location') as string,
      rentalPrice: Number(formData.get('rentalPrice')),
      rentalType: formData.get('rentalType') as RentalType,
      availableQuantity: Number(formData.get('availableQuantity')),
      condition: formData.get('condition') as EquipmentCondition,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      image: '',
      rentalTerms: formData.get('rentalTerms') as string,
      status: 'pending' as EquipmentStatus,
      owner: {
        name: 'Test Owner',
        email: 'owner@example.com',
      } as EquipmentOwner,
    }

    try {
      const result = await createEquipment(equipmentData as Equipment)
      toast.success(result.message || 'Equipment added successfully!')
      form.reset()
      console.log(result)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add equipment'
      )
    }
  }

  return (
    <form onSubmit={handleCreateEquipment}>
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle className='text-lg font-bold sm:text-xl'>
            Equipment details
          </CardTitle>
          <CardDescription>
            Fill in the information below. Your listing will be reviewed before
            it goes live.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className='space-y-6 pt-6'>
          <BasicInformation value={image} onChange={setImage} />
          <RentalInformation />
          <OwnerInformation />
        </CardContent>

        <Separator />

        <div className='flex flex-col-reverse gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-end'>
          <Button type='reset' variant='outline' className='h-11 px-5'>
            Cancel
          </Button>

          <Button type='submit' className='h-11 gap-2 px-5'>
            <Send className='size-4' aria-hidden='true' />
            Publish Equipment
          </Button>
        </div>
      </Card>
    </form>
  )
}

export default EquipmentForm

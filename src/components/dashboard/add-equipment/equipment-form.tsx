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

// Main form for the Add Equipment page.
// It only puts the sections together.
// Submit / reset logic will be added later.
const EquipmentForm = () => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle className='text-lg font-bold sm:text-xl'>
          Equipment details
        </CardTitle>
        <CardDescription>
          Fill in the information below. Your listing will be reviewed before it
          goes live.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className='space-y-6 pt-6'>
        <BasicInformation />
        <RentalInformation />
        <OwnerInformation />
      </CardContent>

      <Separator />

      <div className='flex flex-col-reverse gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-end'>
        <Button type='button' variant='outline' className='h-11 px-5'>
          Cancel
        </Button>

        {/* onSubmit logic will be added later */}
        <Button type='button' className='h-11 gap-2 px-5'>
          <Send className='size-4' aria-hidden='true' />
          Publish Equipment
        </Button>
      </div>
    </Card>
  )
}

export default EquipmentForm

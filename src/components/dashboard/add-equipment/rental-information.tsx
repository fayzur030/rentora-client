import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import FormField from './form-field'
import FormSelect from './form-select'

const rentalTypes = ['Daily', 'Weekly', 'Monthly']

// Step 2: pricing, quantity and rental rules.
const RentalInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base font-semibold'>
          Rental information
        </CardTitle>
        <CardDescription>
          Set your price, quantity and rental rules.
        </CardDescription>
      </CardHeader>

      <CardContent className='grid gap-5 sm:grid-cols-2'>
        <FormField
          id='rentalPrice'
          label='Rental price'
          type='number'
          placeholder='e.g. 150'
        />

        <FormSelect
          id='rentalType'
          label='Rental type'
          placeholder='Choose a rental period'
          options={rentalTypes}
        />

        <FormField
          id='availableQuantity'
          label='Available quantity'
          type='number'
          placeholder='e.g. 1'
        />

        <div className='sm:col-span-2'>
          <FormField
            id='rentalTerms'
            label='Rental terms and conditions'
            placeholder='Add any rental rules, return expectations or damage policies...'
            multiline
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default RentalInformation

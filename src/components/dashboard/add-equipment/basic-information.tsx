import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import FormField from './form-field'
import FormSelect from './form-select'
import ImageUpload from './image-upload'
import type { Category } from '@/types/category'

const equipmentConditions = ['New', 'Like New', 'Good', 'Fair']

interface ImageUploadProps {
  categories: Category[]
  value: string
  onChange: (value: string) => void
}
// Step 1: basic details about the equipment.
const BasicInformation = ({
  categories,
  value,
  onChange,
}: ImageUploadProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base font-semibold'>
          Basic information
        </CardTitle>
        <CardDescription>
          Tell renters what the equipment is and where it is located.
        </CardDescription>
      </CardHeader>

      <CardContent className='grid gap-5 sm:grid-cols-2'>
        <FormField
          id='name'
          label='Equipment name'
          placeholder='e.g. Caterpillar mini excavator'
        />

        <FormSelect
          id='category'
          label='Category'
          placeholder='Choose a category'
          options={categories.map((category) => category.name)}
          required
        />

        <div className='sm:col-span-2'>
          <FormField
            id='description'
            label='Description'
            placeholder='Describe the equipment and what renters should know...'
            multiline
          />
        </div>

        <FormField
          id='location'
          label='Location'
          placeholder='City or service area'
        />

        <FormSelect
          id='condition'
          label='Equipment condition'
          placeholder='Choose the condition'
          options={equipmentConditions}
        />

        <FormField id='brand' label='Brand' placeholder='e.g. Caterpillar' />

        <FormField id='model' label='Model' placeholder='e.g. 301.7 CR' />

        <div className='sm:col-span-2'>
          <ImageUpload value={value} onChange={onChange} />
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInformation

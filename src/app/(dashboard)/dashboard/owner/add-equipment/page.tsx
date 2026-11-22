import EquipmentForm from '@/components/dashboard/add-equipment/equipment-form'
import { getCategories } from '@/lib/api/category'

const AddEquipmentPage = async () => {
  const categories = await getCategories()

  return (
    <div className='space-y-6'>
      <div className='mx-auto w-full max-w-7xl space-y-1'>
        <h1 className='font-heading text-2xl font-bold text-foreground sm:text-3xl'>
          Add equipment
        </h1>
        <p className='max-w-2xl text-sm text-muted-foreground'>
          List a new piece of equipment for customers to rent.
        </p>
      </div>

      <div className='mx-auto w-full max-w-7xl'>
        <EquipmentForm categories={categories} />
      </div>
    </div>
  )
}

export default AddEquipmentPage

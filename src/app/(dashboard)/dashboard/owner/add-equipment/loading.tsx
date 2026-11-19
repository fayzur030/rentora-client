import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'
import { FormSkeleton } from '@/components/shared/skeletons/FormSkeleton'

const AddEquipmentLoading = () => {
  return (
    <div className='space-y-6'>
      <PageHeaderSkeleton />
      <FormSkeleton fields={12} />
    </div>
  )
}

export default AddEquipmentLoading

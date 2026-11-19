import { PageHeaderSkeleton } from '@/components/shared/skeletons/PageHeaderSkeleton'
import { FormSkeleton } from '@/components/shared/skeletons/FormSkeleton'

const CustomerProfileLoading = () => {
  return (
    <div className='space-y-6'>
      <PageHeaderSkeleton />
      <FormSkeleton fields={5} />
    </div>
  )
}

export default CustomerProfileLoading

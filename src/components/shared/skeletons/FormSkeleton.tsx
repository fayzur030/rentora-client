import { Skeleton } from '@/components/ui/skeleton'

interface FormSkeletonProps {
  // Number of skeleton form fields to render.
  fields?: number
}

// Skeleton for form based pages (add equipment, profile).
// Renders a card with a number of skeleton input fields
// and action buttons at the bottom.
const FormSkeleton = ({ fields = 5 }: FormSkeletonProps) => {
  return (
    <div className='rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8'>
      <div className='space-y-6'>
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className='space-y-2'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-11 w-full rounded-xl' />
          </div>
        ))}
      </div>

      <div className='mt-6 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end'>
        <Skeleton className='h-11 w-32 rounded-xl' />
        <Skeleton className='h-11 w-44 rounded-xl' />
      </div>
    </div>
  )
}

export { FormSkeleton }

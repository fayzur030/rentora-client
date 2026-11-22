import { getMyEquipments } from '@/lib/api/equipments'
import MyEquipmentTable from '@/components/dashboard/owner/MyEquipmentTable'
import { PackageOpen } from 'lucide-react'
import { getCategories } from '@/lib/api/category'

const MyEquipmentPage = async () => {
  const categories = await getCategories()
  let myEquipments: Awaited<ReturnType<typeof getMyEquipments>> = []
  let fetchError: Error | null = null

  try {
    myEquipments = await getMyEquipments()
  } catch (error) {
    fetchError =
      error instanceof Error ? error : new Error('Failed to load equipment')
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          My Equipment {myEquipments.length}
        </h2>
        <p className='text-sm text-muted-foreground'>
          Manage the equipment you have listed for rent.
        </p>
      </div>

      {fetchError ? (
        <div
          role='alert'
          className='rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center'
        >
          <h3 className='font-heading text-lg font-bold text-destructive'>
            Unable to load your equipment
          </h3>
          <p className='mt-1 text-sm text-muted-foreground'>
            {fetchError.message}
          </p>
        </div>
      ) : myEquipments?.length > 0 ? (
        <MyEquipmentTable
          equipments={myEquipments}
          categories={categories}
        />
      ) : (
        <div className='flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center shadow-sm'>
          <span className='flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
            <PackageOpen className='size-6' aria-hidden='true' />
          </span>
          <h3 className='mt-4 font-heading text-lg font-bold'>
            No equipment listed yet
          </h3>
          <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
            Add your first piece of equipment to start accepting rentals.
          </p>
        </div>
      )}
    </div>
  )
}

export default MyEquipmentPage

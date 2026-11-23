import AdminEquipmentTable from '@/components/dashboard/admin/AdminEquipmentTable'
import { getAllAdminEquipments } from '@/lib/api/equipments'
import type { Equipment } from '@/types/equipment'
import { getCategories } from '@/lib/api/category'
import type { Category } from '@/types/category'
import { unstable_rethrow } from 'next/navigation'

const AllEquipmentPage = async () => {
  const categories: Category[] = await getCategories()
  let equipments: Equipment[] = []
  let errorMessage: string | null = null

  try {
    equipments = await getAllAdminEquipments()
  } catch (error) {
    unstable_rethrow(error)
    console.error('Get Equipment Error:', error)
    errorMessage =
      error instanceof Error ? error.message : 'Failed to load equipment'
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          All Equipment {equipments.length}
        </h2>
        <p className='text-sm text-muted-foreground'>
          Approve, update or remove every equipment listing.
        </p>
      </div>

      <AdminEquipmentTable
        equipments={equipments}
        categories={categories}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default AllEquipmentPage

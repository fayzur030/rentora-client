import { getMyEquipments } from '@/lib/api/equipments'

const MyEquipmentPage = async () => {
  const myEquipments = await getMyEquipments()
  console.log(myEquipments)
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          My Equipment
        </h2>
        <p className='text-sm text-muted-foreground'>
          Manage the equipment you have listed for rent.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>
          Your listed equipment will appear here.
        </p>
      </div>
    </div>
  )
}

export default MyEquipmentPage

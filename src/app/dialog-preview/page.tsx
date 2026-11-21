import MyEquipmentTable from '@/components/dashboard/owner/MyEquipmentTable'
import type { Equipment } from '@/types/equipment'

const demoEquipments: Equipment[] = [
  {
    _id: 'demo-equipment-1',
    name: 'Professional DSLR Camera Kit',
    description: 'A complete camera kit for events and outdoor shoots.',
    category: 'Electronics',
    location: 'Dhaka',
    rentalPrice: 3500,
    rentalType: 'Daily',
    availableQuantity: 3,
    condition: 'Like New',
    brand: 'Canon',
    model: 'EOS R6',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
    rentalTerms: 'Return in the same condition.',
    status: 'Approved',
    owner: {
      ownerId: 'demo-owner',
      name: 'Tanvir Hasan',
      email: 'tanvir@example.com',
      image: '',
    },
  },
  {
    _id: 'demo-equipment-2',
    name: 'Portable Concrete Mixer',
    description: 'Reliable mixer for small construction projects.',
    category: 'Construction Equipment',
    location: 'Dhaka',
    rentalPrice: 1800,
    rentalType: 'Weekly',
    availableQuantity: 1,
    condition: 'Good',
    brand: 'Bosch',
    model: 'CM-200',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    rentalTerms: 'Fuel is not included.',
    status: 'Pending',
    owner: {
      ownerId: 'demo-owner',
      name: 'Tanvir Hasan',
      email: 'tanvir@example.com',
      image: '',
    },
  },
]

const DialogPreviewPage = () => {
  return (
    <div className='mx-auto max-w-6xl p-6'>
      <MyEquipmentTable equipments={demoEquipments} />
    </div>
  )
}

export default DialogPreviewPage

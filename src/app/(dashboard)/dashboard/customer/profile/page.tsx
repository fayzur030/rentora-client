import ProfilePage from '@/components/profile/ProfilePage'
import type { Profile } from '@/components/profile/types'

// Sample Customer profile containing strictly the 5 required fields
const customerProfile: Profile = {
  name: 'Ayesha Rahman',
  email: 'ayesha.rahman@example.com',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  phone: '+880 1712 345678',
  address: 'House 12, Road 7, Dhanmondi, Dhaka',
  role: 'customer',
}

const CustomerProfilePage = () => {
  return <ProfilePage profile={customerProfile} />
}

export default CustomerProfilePage

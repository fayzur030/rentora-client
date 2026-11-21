import ProfilePage from '@/components/profile/ProfilePage'
import type { Profile } from '@/components/profile/types'

// Sample Admin profile containing strictly the 5 required fields
const adminProfile: Profile = {
  name: 'Nusrat Jahan',
  email: 'nusrat.jahan@example.com',
  image:
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  phone: '+880 1913 246810',
  address: 'Level 5, House 22, Gulshan Avenue, Dhaka',
  role: 'admin',
}

const AdminProfilePage = () => {
  return <ProfilePage profile={adminProfile} />
}

export default AdminProfilePage

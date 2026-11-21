import ProfilePage from '@/components/profile/ProfilePage'
import type { Profile } from '@/components/profile/types'

// Sample Owner profile containing strictly the 5 required fields
const ownerProfile: Profile = {
  name: 'Tanvir Hasan',
  email: 'tanvir.hasan@example.com',
  image:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  phone: '+880 1811 765432',
  address: 'Plot 9, Road 3, Uttara Sector 7, Dhaka',
  role: 'owner',
}

const OwnerProfilePage = () => {
  return <ProfilePage profile={ownerProfile} />
}

export default OwnerProfilePage

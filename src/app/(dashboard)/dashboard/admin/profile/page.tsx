import ProfilePage from '@/components/profile/ProfilePage'
import type { Profile } from '@/components/profile/types'

// Temporary sample data.
// This will be replaced with the authenticated user's data from the API.
const adminProfile: Profile = {
  name: 'Nusrat Jahan',
  email: 'nusrat.jahan@example.com',
  image:
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  phone: '+880 1913 246810',
  dateOfBirth: '1993-12-11',
  gender: 'Female',
  address: 'Level 5, House 22, Gulshan Avenue',
  city: 'Dhaka',
  state: 'Dhaka Division',
  country: 'Bangladesh',
  postalCode: '1212',
  bio: 'Operations lead at Rentora, focused on trusted listings and a smooth rental experience.',
  companyName: 'Rentora Operations',
  website: 'https://rentora.example.com',
  preferredLanguage: 'English',
  timeZone: 'Asia/Dhaka',
  role: 'admin',
  status: 'active',
  createdAt: '2024-08-21',
}

const AdminProfilePage = () => {
  return <ProfilePage profile={adminProfile} />
}

export default AdminProfilePage

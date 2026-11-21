import ProfilePage from '@/components/profile/ProfilePage'
import type { Profile } from '@/components/profile/types'

// Temporary sample data.
// This will be replaced with the authenticated user's data from the API.
const ownerProfile: Profile = {
  name: 'Tanvir Hasan',
  email: 'tanvir.hasan@example.com',
  image:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  phone: '+880 1811 765432',
  dateOfBirth: '1991-09-02',
  gender: 'Male',
  address: 'Plot 9, Road 3, Uttara Sector 7',
  city: 'Dhaka',
  state: 'Dhaka Division',
  country: 'Bangladesh',
  postalCode: '1230',
  bio: 'Owner of a small equipment rental business serving construction and event teams across Dhaka.',
  companyName: 'Hasan Rentals',
  website: 'https://hasanrentals.example.com',
  preferredLanguage: 'Bangla',
  timeZone: 'Asia/Dhaka',
  role: 'owner',
  status: 'active',
  createdAt: '2024-11-03',
}

const OwnerProfilePage = () => {
  return <ProfilePage profile={ownerProfile} />
}

export default OwnerProfilePage

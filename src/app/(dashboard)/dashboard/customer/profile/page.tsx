import ProfilePage from '@/components/profile/ProfilePage'
import type { Profile } from '@/components/profile/types'

// Temporary sample data.
// This will be replaced with the authenticated user's data from the API.
const customerProfile: Profile = {
  name: 'Ayesha Rahman',
  email: 'ayesha.rahman@example.com',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  phone: '+880 1712 345678',
  dateOfBirth: '1996-04-18',
  gender: 'Female',
  address: 'House 12, Road 7, Dhanmondi',
  city: 'Dhaka',
  state: 'Dhaka Division',
  country: 'Bangladesh',
  postalCode: '1205',
  bio: 'Product designer who loves planning weekend photo trips and trying new equipment before buying.',
  companyName: 'Studio North',
  website: 'https://studionorth.example.com',
  preferredLanguage: 'English',
  timeZone: 'Asia/Dhaka',
  role: 'customer',
  status: 'active',
  createdAt: '2025-01-12',
}

const CustomerProfilePage = () => {
  return <ProfilePage profile={customerProfile} />
}

export default CustomerProfilePage

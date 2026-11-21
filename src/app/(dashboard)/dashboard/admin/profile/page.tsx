'use client'

import ProfilePage from '@/components/profile/ProfilePage'
import ProfileState from '@/components/profile/ProfileState'
import { authClient } from '@/lib/auth-client'

const AdminProfilePage = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <ProfileState variant='loading' />
  }

  if (!session?.user) {
    return <div>Please login to view your profile.</div>
  }

  const user = session.user

  const adminProfile = {
    name: user.name,
    email: user.email,
    image: user.image,
    phone: user.phone || '',
    address: user.address || '',
    role: user?.role,
  }

  return <ProfilePage profile={adminProfile} />
}

export default AdminProfilePage

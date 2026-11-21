'use client'

import ProfilePage from '@/components/profile/ProfilePage'
import { authClient } from '@/lib/auth-client'
import { LoaderCircle } from 'lucide-react'

const OwnerProfile = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4'>
        <div className='flex size-14 items-center justify-center rounded-2xl bg-[#F5A623]/10'>
          <LoaderCircle className='size-7 animate-spin text-[#F5A623]' />
        </div>

        <div className='text-center'>
          <h2 className='text-base font-bold text-[#241A15]'>
            Loading Profile
          </h2>
          <p className='mt-1 text-sm text-[#92877E]'>
            Please wait while we fetch your information.
          </p>
        </div>
      </div>
    )
  }

  const user = session?.user

  const ownerProfile = {
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image,
    phone: user?.phone || '',
    address: user?.address || '',
    role: user?.role,
  }

  return <ProfilePage profile={ownerProfile} />
}

export default OwnerProfile

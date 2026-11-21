'use client'

import { useState } from 'react'

import AdditionalInformation from './AdditionalInformation'
import AddressInformation from './AddressInformation'
import EditProfileDialog from './EditProfileDialog'
import ProfileInformation from './ProfileInformation'
import ProfileOverview from './ProfileOverview'
import type { Profile } from './types'

interface ProfilePageProps {
  profile: Profile
}

// This is the shared profile view for Customer, Owner and Admin.
// The role only changes the badge inside ProfileOverview.
const ProfilePage = ({ profile }: ProfilePageProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleSave = () => {
    // The backend update is not connected yet.
    // Closing the dialog keeps this step simple until the API is ready.
    setIsEditOpen(false)
  }

  return (
    <div className='space-y-5 sm:space-y-6'>
      <ProfileOverview profile={profile} onEdit={() => setIsEditOpen(true)} />

      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        <ProfileInformation profile={profile} />
        <AddressInformation profile={profile} />
      </div>

      <AdditionalInformation profile={profile} />

      <EditProfileDialog
        profile={profile}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleSave}
      />
    </div>
  )
}

export default ProfilePage

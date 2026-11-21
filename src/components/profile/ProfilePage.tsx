'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import EditProfileDialog from './EditProfileDialog'
import ProfileDetails from './ProfileDetails'
import ProfileOverview from './ProfileOverview'
import type { Profile, ProfileFormValues } from './types'

interface ProfilePageProps {
  profile: Profile
}

/**
 * Reusable Master Profile Page Component
 * Shared across Customer, Owner, and Admin Dashboards.
 *
 * Displays the 5 required fields:
 * 1. Name
 * 2. Email
 * 3. Profile Image
 * 4. Phone Number
 * 5. Address
 */
const ProfilePage = ({ profile }: ProfilePageProps) => {
  // Manage profile data in local state
  const [currentProfile, setCurrentProfile] = useState<Profile>(profile)
  const [isEditOpen, setIsEditOpen] = useState(false)

  // Handle saving updated profile data (ready for backend API integration)
  const handleSave = (updatedValues: ProfileFormValues) => {
    setCurrentProfile((prev) => ({
      ...prev,
      ...updatedValues,
    }))
    setIsEditOpen(false)
    toast.success('Profile updated successfully!')
  }

  return (
    <div className='space-y-6'>
      {/* 1. Header Overview Card with Avatar, Role Badge, and Edit Button */}
      <ProfileOverview
        profile={currentProfile}
        onEdit={() => setIsEditOpen(true)}
      />

      {/* 2. Detailed Profile Information Card */}
      <ProfileDetails profile={currentProfile} />

      {/* 3. Reusable Edit Profile Modal Dialog */}
      <EditProfileDialog
        profile={currentProfile}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleSave}
      />
    </div>
  )
}

export default ProfilePage

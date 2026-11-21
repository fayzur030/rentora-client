import { Mail, MapPin, Phone, UserRound } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProfileField from './ProfileField'
import type { Profile } from './types'

interface ProfileDetailsProps {
  profile: Profile
}

/**
 * ProfileDetails Component
 * Displays the 4 primary profile data fields in a clean, modern SaaS card layout.
 */
const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <Card className='overflow-hidden rounded-2xl border-border/80 shadow-xs'>
      {/* Card Header */}
      <CardHeader className='flex flex-row items-center gap-3 border-b border-border/60 bg-muted/30 px-6 py-4'>
        <span className='flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-2xs'>
          <UserRound className='size-4' aria-hidden='true' />
        </span>

        <div className='space-y-0.5'>
          <CardTitle className='text-base font-semibold text-foreground'>
            Profile Information
          </CardTitle>
          <CardDescription className='text-xs text-muted-foreground'>
            Your contact details and delivery address on Rentora.
          </CardDescription>
        </div>
      </CardHeader>

      {/* Card Body: 4 Profile Fields in a 2-column responsive grid */}
      <CardContent className='p-6'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {/* 1. Full Name */}
          <ProfileField
            icon={UserRound}
            label='Full Name'
            value={profile.name}
          />

          {/* 2. Email Address */}
          <ProfileField
            icon={Mail}
            label='Email Address'
            value={profile.email}
          />

          {/* 3. Phone Number */}
          <ProfileField
            icon={Phone}
            label='Phone Number'
            value={profile.phone}
          />

          {/* 4. Address */}
          <ProfileField
            icon={MapPin}
            label='Address'
            value={profile.address}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileDetails

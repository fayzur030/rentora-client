import { Cake, Mail, Phone, UserRound, Users } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProfileField from './ProfileField'
import { formatProfileDate } from './profile-utils'
import type { Profile } from './types'

interface ProfileInformationProps {
  profile: Profile
}

const ProfileInformation = ({ profile }: ProfileInformationProps) => {
  return (
    <Card className='gap-0 py-0'>
      <CardHeader className='flex flex-row items-center gap-3 border-b border-border px-5 py-4 sm:px-6'>
        <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-primary/10'>
          <UserRound className='size-4' aria-hidden='true' />
        </span>

        <div className='space-y-0.5'>
          <CardTitle className='font-semibold text-foreground'>
            Personal information
          </CardTitle>
          <CardDescription className='text-xs'>
            Basic details connected to your account.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='px-5 py-4 sm:px-6 sm:py-5'>
        <div className='grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2'>
          <ProfileField
            icon={UserRound}
            label='Full name'
            value={profile.name}
          />
          <ProfileField icon={Mail} label='Email address' value={profile.email} />
          <ProfileField icon={Phone} label='Phone number' value={profile.phone} />
          <ProfileField
            icon={Cake}
            label='Date of birth'
            value={formatProfileDate(profile.dateOfBirth)}
          />
          <ProfileField icon={Users} label='Gender' value={profile.gender} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileInformation

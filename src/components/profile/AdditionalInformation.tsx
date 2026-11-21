import {
  Briefcase,
  Clock3,
  FileText,
  Languages,
  Link2,
  Sparkles,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProfileField from './ProfileField'
import type { Profile } from './types'

interface AdditionalInformationProps {
  profile: Profile
}

// These fields are optional on purpose.
// Missing values show a friendly empty state instead of looking broken.
const AdditionalInformation = ({ profile }: AdditionalInformationProps) => {
  return (
    <Card className='gap-0 py-0'>
      <CardHeader className='flex flex-row items-center gap-3 border-b border-border px-5 py-4 sm:px-6'>
        <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-primary/10'>
          <Sparkles className='size-4' aria-hidden='true' />
        </span>

        <div className='space-y-0.5'>
          <CardTitle className='font-semibold text-foreground'>
            Additional information
          </CardTitle>
          <CardDescription className='text-xs'>
            Optional details that help people know you a little better.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='space-y-4 px-5 py-4 sm:px-6 sm:py-5'>
        <div className='rounded-xl border border-border bg-muted/30 p-4'>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <FileText className='size-4' aria-hidden='true' />
            <p className='text-[0.68rem] font-semibold tracking-[0.14em] uppercase'>
              Bio / About me
            </p>
          </div>

          <p
            className={
              profile.bio
                ? 'mt-2 text-sm leading-6 text-foreground'
                : 'mt-2 text-sm italic leading-6 text-muted-foreground/80'
            }
          >
            {profile.bio ||
              'No bio added yet. Share a short introduction whenever you are ready.'}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 xl:grid-cols-4'>
          <ProfileField
            icon={Briefcase}
            label='Company name'
            value={profile.companyName}
          />
          <ProfileField icon={Link2} label='Website' value={profile.website} />
          <ProfileField
            icon={Languages}
            label='Preferred language'
            value={profile.preferredLanguage}
          />
          <ProfileField
            icon={Clock3}
            label='Time zone'
            value={profile.timeZone}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalInformation

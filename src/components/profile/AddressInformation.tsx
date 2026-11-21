import { Building2, Globe2, Hash, Map, MapPin } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProfileField from './ProfileField'
import type { Profile } from './types'

interface AddressInformationProps {
  profile: Profile
}

const AddressInformation = ({ profile }: AddressInformationProps) => {
  return (
    <Card className='gap-0 py-0'>
      <CardHeader className='flex flex-row items-center gap-3 border-b border-border px-5 py-4 sm:px-6'>
        <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary ring-1 ring-primary/10'>
          <MapPin className='size-4' aria-hidden='true' />
        </span>

        <div className='space-y-0.5'>
          <CardTitle className='font-semibold text-foreground'>
            Address information
          </CardTitle>
          <CardDescription className='text-xs'>
            Where you are based, used for rentals and deliveries.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='px-5 py-4 sm:px-6 sm:py-5'>
        <div className='grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2'>
          <ProfileField
            icon={MapPin}
            label='Street address'
            value={profile.address}
            className='sm:col-span-2'
          />
          <ProfileField icon={Building2} label='City' value={profile.city} />
          <ProfileField icon={Map} label='State / Province' value={profile.state} />
          <ProfileField icon={Globe2} label='Country' value={profile.country} />
          <ProfileField
            icon={Hash}
            label='Postal code'
            value={profile.postalCode}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AddressInformation

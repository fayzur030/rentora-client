import { BadgeCheck, Clock3, UserRound } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getSessionFromClient } from '@/lib/auth/getSessionFromClient'

// Owner details will come from the logged-in user later.
// Right now we only show the UI.
const OwnerInformation = () => {
  const session = getSessionFromClient()
  const user = session?.user
  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      <Card>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-2'>
            <UserRound className='size-4 text-primary' aria-hidden='true' />
            <CardTitle className='text-sm font-semibold'>
              Owner information
            </CardTitle>
          </div>
          <CardDescription>Filled from your account.</CardDescription>
        </CardHeader>

        <CardContent className='flex items-center gap-3'>
          <Avatar className='size-12 bg-primary/10 text-primary'>
            <AvatarFallback className='bg-primary/10 text-primary'>
              <UserRound className='size-5' aria-hidden='true' />
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0'>
            <p className='truncate text-sm font-semibold text-foreground'>
              {user?.name}
            </p>
            <p className='truncate text-xs text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-2'>
            <BadgeCheck className='size-4 text-primary' aria-hidden='true' />
            <CardTitle className='text-sm font-semibold'></CardTitle>
          </div>
          <CardDescription>Listings are reviewed by an admin.</CardDescription>
        </CardHeader>

        <CardContent>
          <Badge className='gap-1.5 border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200'>
            <Clock3 className='size-3.5' aria-hidden='true' />
            Pending
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export default OwnerInformation

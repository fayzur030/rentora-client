import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  Mail,
  Pencil,
  ShieldCheck,
  Store,
  UserRound,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatMemberSince, getInitials } from './profile-utils'
import type { Profile } from './types'

interface ProfileOverviewProps {
  profile: Profile
  onEdit: () => void
}

interface RoleDetails {
  label: string
  icon: LucideIcon
  badgeClassName: string
}

// The same badge component is used for every role.
// Only the label, icon and theme tint change.
const roleDetails: Record<Profile['role'], RoleDetails> = {
  customer: {
    label: 'Customer',
    icon: UserRound,
    badgeClassName: 'border-border bg-muted text-foreground',
  },
  owner: {
    label: 'Owner',
    icon: Store,
    badgeClassName: 'border-accent/30 bg-accent/15 text-accent-foreground',
  },
  admin: {
    label: 'Admin',
    icon: ShieldCheck,
    badgeClassName: 'border-primary/20 bg-primary/10 text-primary',
  },
}

const ProfileOverview = ({ profile, onEdit }: ProfileOverviewProps) => {
  const role = roleDetails[profile.role]
  const RoleIcon = role.icon

  const isActive = profile.status !== 'inactive'
  const statusLabel = isActive ? 'Active' : 'Inactive'

  return (
    <Card className='gap-0 overflow-hidden py-0'>
      {/* Soft cover band built only from the existing theme colours */}
      <div className='relative h-28 overflow-hidden border-b border-border bg-linear-to-r from-primary/10 via-secondary/10 to-accent/15 sm:h-32'>
        <div className='absolute -top-16 -right-8 size-48 rounded-full bg-primary/10 blur-2xl' />
        <div className='absolute -bottom-20 right-24 size-40 rounded-full bg-accent/20 blur-2xl' />
      </div>

      <div className='px-5 pb-6 sm:px-7'>
        <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
            <Avatar className='-mt-14 size-28 shrink-0 shadow-lg ring-4 ring-card sm:-mt-16 sm:size-32'>
              <AvatarImage
                src={profile.image || undefined}
                alt={profile.name}
                className='object-cover'
              />

              <AvatarFallback className='bg-primary text-2xl font-semibold text-primary-foreground'>
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>

            <div className='min-w-0 flex-1 space-y-3 sm:pt-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge className={cn('gap-1.5', role.badgeClassName)}>
                  <RoleIcon className='size-3.5' aria-hidden='true' />
                  {role.label}
                </Badge>

                <Badge
                  className={cn(
                    'gap-1.5',
                    isActive
                      ? 'border-primary/20 bg-primary/10 text-primary'
                      : 'border-destructive/20 bg-destructive/10 text-destructive'
                  )}
                >
                  <span className='size-1.5 rounded-full bg-current' />
                  {statusLabel}
                </Badge>
              </div>

              <div className='space-y-1.5'>
                <h1 className='font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
                  {profile.name}
                </h1>

                <p className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                  <Mail className='size-4 shrink-0' aria-hidden='true' />
                  <span className='break-all'>{profile.email}</span>
                </p>
              </div>

              {profile.bio ? (
                <p className='max-w-2xl text-sm leading-6 text-muted-foreground'>
                  {profile.bio}
                </p>
              ) : null}

              <p className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                <CalendarDays className='size-3.5 shrink-0' aria-hidden='true' />
                {formatMemberSince(profile.createdAt)}
              </p>
            </div>
          </div>

          <Button
            type='button'
            size='lg'
            onClick={onEdit}
            className='h-10 w-full gap-2 px-4 sm:w-auto lg:mb-1'
          >
            <Pencil className='size-4' aria-hidden='true' />
            Edit profile
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProfileOverview

import type { LucideIcon } from 'lucide-react'
import {
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Store,
  UserRound,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getInitials } from './profile-utils'
import type { Profile, UserRole } from './types'

interface ProfileOverviewProps {
  profile: Profile
  onEdit: () => void
}

interface RoleConfig {
  label: string
  icon: LucideIcon
  badgeClassName: string
}

// Role badge styling map for SaaS dashboard look
const roleConfigs: Record<UserRole, RoleConfig> = {
  customer: {
    label: 'Customer',
    icon: UserRound,
    badgeClassName:
      'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  },
  owner: {
    label: 'Owner',
    icon: Store,
    badgeClassName:
      'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  },
  admin: {
    label: 'Admin',
    icon: ShieldCheck,
    badgeClassName: 'border-primary/20 bg-primary/10 text-primary',
  },
}

/**
 * ProfileOverview: Top SaaS Header Card
 * Displays avatar, name, role badge, quick contact chips, and "Edit Profile" button.
 */
const ProfileOverview = ({ profile, onEdit }: ProfileOverviewProps) => {
  const currentRole = profile.role || 'customer'
  const roleConfig = roleConfigs[currentRole]
  const RoleIcon = roleConfig.icon

  return (
    <div className='overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs'>
      {/* Decorative gradient banner */}
      <div className='h-24 bg-gradient-to-r from-primary/10 via-primary/5 to-muted sm:h-28' />

      {/* Main Profile Info Section */}
      <div className='px-6 pb-6 sm:px-8'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
          {/* Avatar and Basic Details */}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
            {/* Avatar Container with glowing border */}
            <Avatar className='-mt-12 size-24 shrink-0 rounded-2xl border-4 border-card shadow-md sm:-mt-14 sm:size-28'>
              {profile.image ? (
                <AvatarImage
                  src={profile.image}
                  alt={profile.name}
                  className='object-cover'
                />
              ) : null}
              <AvatarFallback className='bg-muted text-xl font-bold text-foreground'>
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>

            {/* Name, Role Badge, and Quick Meta Tags */}
            <div className='space-y-2 sm:pt-2'>
              <div className='flex flex-wrap items-center gap-2.5'>
                <h1 className='font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
                  {profile.name}
                </h1>

                {/* Role Badge */}
                <Badge
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium shadow-2xs ${roleConfig.badgeClassName}`}
                >
                  <RoleIcon className='size-3.5' aria-hidden='true' />
                  {roleConfig.label}
                </Badge>
              </div>

              {/* Quick Info Chips */}
              <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground'>
                <span className='inline-flex items-center gap-1.5'>
                  <Mail className='size-3.5 text-muted-foreground/80' />
                  {profile.email}
                </span>

                {profile.phone && (
                  <span className='inline-flex items-center gap-1.5'>
                    <Phone className='size-3.5 text-muted-foreground/80' />
                    {profile.phone}
                  </span>
                )}

                {profile.address && (
                  <span className='inline-flex items-center gap-1.5'>
                    <MapPin className='size-3.5 text-muted-foreground/80' />
                    {profile.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Button: Edit Profile */}
          <Button
            type='button'
            onClick={onEdit}
            className='gap-2 shadow-2xs sm:self-center'
          >
            <Pencil className='size-4' aria-hidden='true' />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverview

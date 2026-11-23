'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LogOut, User } from 'lucide-react'

import { authClient } from '@/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// User information
interface ProfileUser {
  name: string
  email: string
  image?: string | null
  role: string
}

interface ProfileDropdownProps {
  user: ProfileUser
  opensUp?: boolean
  onNavigate?: () => void
}

const ProfileDropdown = ({
  user,
  opensUp = false,
  onNavigate,
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // User's first letter for avatar fallback
  const firstLetter = user?.name?.charAt(0).toUpperCase() || 'U'

  // Close dropdown and mobile menu
  const closeMenus = () => {
    setIsOpen(false)
    onNavigate?.()
  }

  // Sign out
  const handleSignOut = async () => {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message || 'Could not sign out. Please try again.')
      return
    }

    closeMenus()
    toast.success('Signed out successfully.')

    router.push('/')
    router.refresh()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {/* Profile Avatar */}
      <DropdownMenuTrigger
        aria-label='Open profile menu'
        className='rounded-full border-2 border-[var(--accent)] p-0.5 transition-all duration-200 hover:border-[var(--accent)] hover:ring-2 hover:ring-[var(--accent)]/20'
      >
        <Avatar className='size-9'>
          <AvatarImage
            src={user?.image || undefined}
            alt={user?.name || 'User'}
          />

          <AvatarFallback className='bg-[var(--accent)] text-base font-bold text-[var(--brand-ink)]'>
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        align='end'
        side={opensUp ? 'top' : 'bottom'}
        sideOffset={8}
        className='w-64 border border-sidebar-foreground/10 bg-[var(--sidebar)] p-2 shadow-2xl'
      >
        {/* User Information */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className='px-2 py-3'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-12 shrink-0'>
                <AvatarImage
                  src={user?.image || undefined}
                  alt={user?.name || 'User'}
                />

                <AvatarFallback className='bg-[var(--accent)] text-base font-bold text-[var(--brand-ink)]'>
                  {firstLetter}
                </AvatarFallback>
              </Avatar>

              <div className='min-w-0 space-y-1'>
                <p className='truncate text-sm font-semibold text-sidebar-foreground'>
                  {user?.name || 'User'}
                </p>

                <p className='truncate text-xs font-normal text-sidebar-foreground/60'>
                  {user?.email || ''}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className='bg-card/15' />
        {/* dashboard */}
        <DropdownMenuItem
          render={
            <Link href={`/dashboard/${user.role}`} onClick={closeMenus} />
          }
          className='group gap-2 rounded-lg py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors cursor-pointer hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] focus:bg-[var(--accent)]/10 focus:text-[var(--accent)]'
        >
          <User
            color='var(--accent)'
            className='size-4 shrink-0 text-sidebar-foreground/80 transition-colors group-hover:text-[var(--accent)] group-focus:text-[var(--accent)]'
          />
          Dashboard
        </DropdownMenuItem>
        {/* My Profile */}
        {/* <DropdownMenuItem
          render={<Link href='/profile' onClick={closeMenus} />}
          className='group gap-2 rounded-lg py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors cursor-pointer hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] focus:bg-[var(--accent)]/10 focus:text-[var(--accent)]'
        >
          <User
            color='var(--accent)'
            className='size-4 shrink-0 text-sidebar-foreground/80 transition-colors group-hover:text-[var(--accent)] group-focus:text-[var(--accent)]'
          />
          My Profile
        </DropdownMenuItem> */}

        <DropdownMenuSeparator className='bg-card/15' />

        {/* Sign Out */}
        <DropdownMenuItem
          variant='destructive'
          onClick={handleSignOut}
          className='gap-2 rounded-lg py-2.5 text-sm font-medium text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer'
        >
          <LogOut className='size-4' />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown

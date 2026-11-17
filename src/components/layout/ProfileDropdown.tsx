'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ChevronDown, LogOut, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar'

// The user object that NavAuth passes in
interface ProfileUser {
  name: string
  email: string
  image?: string | null
}

interface ProfileDropdownProps {
  user: ProfileUser
  // Inside the mobile menu the panel opens upward so it stays on screen
  opensUp?: boolean
  // Closes the mobile menu after a click
  onNavigate?: () => void
}

interface AvatarProps {
  user: ProfileUser
  // Example: 'size-8 text-sm' - kept as plain text so Tailwind can see it
  sizeClass: string
}

// Shows the profile image, or the first letter of the name when there is no image
const Avatar = ({ user, sizeClass }: AvatarProps) => {
  if (user.image) {
    return (
      // Profile images are hosted on Google / ImgBB, so a normal img tag is used
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt={user.name}
        className={`${sizeClass} rounded-full object-cover size-10`}
      />
    )
  }

  return (
    <span
      className={`flex ${sizeClass} items-center justify-center rounded-full bg-[#F5A623] font-bold text-[#2b1a12]`}
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  )
}

interface DropdownLinkProps {
  href: string
  label: string
  icon: LucideIcon
  onClick?: () => void
}

// A single clickable row inside the dropdown
const DropdownLink = ({
  href,
  label,
  icon: Icon,
  onClick,
}: DropdownLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white'
  >
    <Icon className='size-4 text-[#F5A623]' />
    {label}
  </Link>
)

const ProfileDropdown = ({
  user,
  opensUp = false,
  onNavigate,
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Closes both the dropdown and the mobile menu
  const closeMenus = () => {
    setIsOpen(false)
    onNavigate?.()
  }

  // Signs the user out and goes back to the homepage
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

  // The panel opens upward when it is inside the mobile menu
  const panelPosition = opensUp ? 'bottom-full mb-2' : 'top-full mt-2'

  return (
    <div className='relative'>
      {/* Invisible layer: clicking anywhere outside closes the dropdown */}
      {isOpen && (
        <button
          type='button'
          aria-label='Close profile menu'
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-40 cursor-default'
        />
      )}

      {/* Avatar button */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label='Open profile menu'
        className='flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-1 pr-2 transition-colors duration-200 hover:border-white/30 hover:bg-white/10'
      >
        <Avatar user={user} sizeClass='size-8 text-sm' />

        <ChevronDown
          className={`size-4 text-white/70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className={`absolute right-0 z-50 w-64 rounded-xl border border-white/10 bg-[#171411] p-2 shadow-2xl ${panelPosition}`}
        >
          {/* Profile image, name and email */}
          <div className='border-b border-white/10 px-3 py-3'>
            <Avatar user={user} sizeClass='size-11 text-base' />
            {/* <Avatar>
              <AvatarImage src={user.image as string} alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className='bg-green-600 dark:bg-green-800' />
            </Avatar> */}

            <p className='mt-2.5 text-sm font-semibold text-white'>
              {user.name}
            </p>
            <p className='mt-0.5 truncate text-xs text-white/60'>
              {user.email}
            </p>
          </div>

          {/* My Profile + Sign Out */}
          <div className='py-1'>
            <DropdownLink
              href='/profile'
              label='My Profile'
              icon={User}
              onClick={closeMenus}
            />

            <button
              type='button'
              onClick={handleSignOut}
              className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors duration-200 hover:bg-red-500/10'
            >
              <LogOut className='size-4' />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown

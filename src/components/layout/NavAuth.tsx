'use client'

import Link from 'next/link'
import { Loader2, LogIn } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import ProfileDropdown from './ProfileDropdown'

interface NavAuthProps {
  // "desktop" = top bar, "mobile" = inside the slide-in menu
  variant?: 'desktop' | 'mobile'
  // Closes the mobile menu after a click
  onNavigate?: () => void
}

const loginLinkClass =
  'inline-flex h-10 items-center gap-2 justify-center rounded-lg border border-white/40 bg-white/5 px-5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/70 hover:bg-white/10'

const registerLinkClass =
  'inline-flex h-10 items-center gap-1 justify-center rounded-lg bg-[#F5A623] px-5 text-sm font-semibold text-[#2b1a12] transition-all duration-200 hover:bg-[#d99a1f]'

const NavAuth = ({ variant = 'desktop', onNavigate }: NavAuthProps) => {
  // The navbar updates itself as soon as the session changes
  const { data: session, isPending } = authClient.useSession()

  // Session is still loading
  if (isPending) {
    return (
      <span
        aria-label='Loading account'
        className='inline-flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5'
      >
        <Loader2 className='size-4 animate-spin text-white/70' />
      </span>
    )
  }

  // Guest user → Login + Register
  if (!session) {
    // Inside the mobile menu the buttons are stacked and full width
    const containerClass =
      variant === 'mobile' ? 'flex w-full flex-col gap-3' : 'flex items-center gap-3'

    const registerClass =
      variant === 'mobile' ? `${registerLinkClass} w-full` : registerLinkClass

    return (
      <div className={containerClass}>
        <Link href='/login' onClick={onNavigate} className={loginLinkClass}>
          <LogIn size={16} /> Login
        </Link>

        <Link href='/register' onClick={onNavigate} className={registerClass}>
          Register
        </Link>
      </div>
    )
  }

  // Logged in user → avatar + dropdown
  return (
    <ProfileDropdown
      user={session.user}
      opensUp={variant === 'mobile'}
      onNavigate={onNavigate}
    />
  )
}

export default NavAuth


'use client'

import Link from 'next/link'
import { Loader2, LogIn } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import ProfileDropdown from './ProfileDropdown'

interface NavAuthProps {
  variant?: 'desktop' | 'mobile'
  onNavigate?: () => void
}

const NavAuth = ({ variant = 'desktop', onNavigate }: NavAuthProps) => {
  const { data: session, isPending } = authClient.useSession()

  const isMobile = variant === 'mobile'

  if (isPending) {
    return (
      <div className='flex h-10 items-center justify-center'>
        <Loader2 className='size-5 animate-spin text-white/70' />
      </div>
    )
  }

  if (!session) {
    return (
      <div className={isMobile ? 'flex w-full flex-col gap-3' : 'flex items-center gap-3'}>
        <Link
          href='/login'
          onClick={onNavigate}
          className='flex h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10'
        >
          <LogIn size={16} />
          Login
        </Link>

        <Link
          href='/register'
          onClick={onNavigate}
          className='flex h-11 items-center justify-center rounded-lg bg-[#F5A623] px-5 text-sm font-semibold text-[#2b1a12] transition-colors hover:bg-[#d99a1f]'
        >
          Register
        </Link>
      </div>
    )
  }

  return (
    <div className={isMobile ? 'w-full' : 'flex items-center'}>
      <ProfileDropdown
        user={session.user}
        opensUp={isMobile}
        onNavigate={onNavigate}
      />
    </div>
  )
}

export default NavAuth

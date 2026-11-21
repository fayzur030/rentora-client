import Link from 'next/link'
import { ArrowRight, LoaderCircle, UserRound } from 'lucide-react'

type ProfileStateProps = {
  variant: 'loading' | 'unauthenticated'
}

const ProfileState = ({ variant }: ProfileStateProps) => {
  const isLoading = variant === 'loading'

  if (isLoading) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4'>
        <div className='flex size-14 items-center justify-center rounded-2xl bg-[#F5A623]/10'>
          <LoaderCircle className='size-7 animate-spin text-[#F5A623]' />
        </div>

        <div className='text-center'>
          <h2 className='text-base font-bold text-[#241A15]'>
            Loading Profile
          </h2>

          <p className='mt-1 text-sm text-[#92877E]'>
            Please wait while we fetch your information.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl border border-[#EAE2D9] bg-white p-8 text-center shadow-[0_20px_60px_rgba(43,26,18,0.05)]'>
        <div className='mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#F5A623]/10'>
          <UserRound className='size-8 text-[#F5A623]' />
        </div>

        <h2 className='mt-5 text-xl font-extrabold text-[#241A15]'>
          Login Required
        </h2>

        <p className='mt-2 text-sm leading-6 text-[#92877E]'>
          Please log in to your account to view and manage your profile.
        </p>

        <Link
          href='/login'
          className='mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F5A623] px-6 text-sm font-bold text-[#241A15] transition-all hover:bg-[#E99B19]'
        >
          Go to Login
          <ArrowRight className='size-4' />
        </Link>
      </div>
    </div>
  )
}

export default ProfileState

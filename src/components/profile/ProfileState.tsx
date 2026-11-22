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
        <div className='flex size-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10'>
          <LoaderCircle className='size-7 animate-spin text-[var(--accent)]' />
        </div>

        <div className='text-center'>
          <h2 className='text-base font-bold text-[var(--foreground)]'>
            Loading Profile
          </h2>

          <p className='mt-1 text-sm text-[var(--muted-foreground)]'>
            Please wait while we fetch your information.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl border border-[var(--border)] bg-card p-8 text-center shadow-card'>
        <div className='mx-auto flex size-16 items-center justify-center rounded-2xl bg-[var(--accent)]/10'>
          <UserRound className='size-8 text-[var(--accent)]' />
        </div>

        <h2 className='mt-5 text-xl font-extrabold text-[var(--foreground)]'>
          Login Required
        </h2>

        <p className='mt-2 text-sm leading-6 text-[var(--muted-foreground)]'>
          Please log in to your account to view and manage your profile.
        </p>

        <Link
          href='/login'
          className='mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 text-sm font-bold text-[var(--foreground)] transition-all hover:bg-[var(--accent)]'
        >
          Go to Login
          <ArrowRight className='size-4' />
        </Link>
      </div>
    </div>
  )
}

export default ProfileState

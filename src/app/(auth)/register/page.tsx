'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  UserRound,
  Mail,
  ArrowLeft,
  ArrowRight,
  // Package,
  // Warehouse,
  // Check,
} from 'lucide-react'
import { toast } from 'sonner'

import Logo from '@/components/shared/Logo'
import PasswordInput from '@/components/auth/PasswordInput'
import ImageUpload from '@/components/auth/ImageUpload'
import { validateEmail } from '@/lib/validation/emailValidation'
import { validatePassword } from '@/lib/validation/passwordValidation'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

// signup file
type SignUpFields = {
  name: string
  email: string
  password: string
  profileImageUrl: string
}

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  // const [role, setRole] = useState<'Customer' | 'Owner'>('Customer')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [Loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)

    const userData = Object.fromEntries(formData.entries()) as SignUpFields

    const nextEmailError = validateEmail(userData.email)
    const nextPasswordError = validatePassword(userData.password)

    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)

    if (!userData.name.trim()) {
      toast.error('Please enter your full name.')
      return
    }

    if (nextEmailError || nextPasswordError) {
      toast.error('Please check the highlighted fields.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password,
        image: profileImage || undefined,
      })
      console.log(data)
      if (error) {
        toast.error(error.message || 'Failed to create account.')
        return
      }

      if (data) {
        toast.success('Account created successfully!')
      }
      form.reset()
      router.push('/login')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-10 sm:px-6'>
      {/* Back to Home */}
      <div className='mb-6 w-full max-w-185 '>
        <Link
          href='/'
          className='group inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]'
        >
          <ArrowLeft className='size-4 transition-transform duration-200 group-hover:-translate-x-1' />
          Back to Home
        </Link>
      </div>

      {/* Register Card */}
      <section className='w-full max-w-185 rounded-2xl border border-[var(--border)] bg-card px-6 py-8 shadow-card sm:px-9 sm:py-10'>
        {/* Logo */}
        <div className=' flex justify-center'>
          <Logo darkText />
        </div>

        {/* Heading */}
        <div className='mb-7 text-center'>
          <h1 className='text-3xl font-extrabold tracking-tight text-[var(--foreground)]'>
            Create your account
          </h1>

          <p className='mt-2 text-sm leading-6 text-[var(--muted-foreground)]'>
            Join Rentora and discover a smarter way to rent.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleCreateAccount} className='space-y-5'>
          {/* Account Role */}

          {/* Name */}
          <div className='space-y-2'>
            <label
              htmlFor='name'
              className='block text-sm font-semibold text-[var(--foreground)]'
            >
              Full Name
            </label>

            <div className='relative'>
              <UserRound className='absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[var(--muted-foreground)]' />

              <input
                id='name'
                name='name'
                type='text'
                placeholder='Enter your full name'
                className='h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-11 pr-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted-foreground)] hover:border-[var(--border)] focus:border-[var(--accent)] focus:bg-card focus:ring-4 focus:ring-[var(--accent)]/10'
              />
            </div>
          </div>

          {/* Email */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-[var(--foreground)]'
            >
              Email Address
            </label>

            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[var(--muted-foreground)]' />

              <input
                id='email'
                name='email'
                type='email'
                value={email}
                // onChange={(event) => handleEmailChange(event.target.value)}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='you@example.com'
                aria-invalid={emailError ? true : undefined}
                className={`h-12 w-full rounded-xl border bg-[var(--background)] pl-11 pr-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted-foreground)] focus:ring-4 ${
                  emailError
                    ? 'border-destructive/25 focus:border-destructive/25 focus:ring-destructive/15'
                    : 'border-[var(--border)] hover:border-[var(--border)] focus:border-[var(--accent)] focus:bg-card focus:ring-[var(--accent)]/10'
                }`}
              />
            </div>

            {emailError && (
              <p className='text-xs font-medium text-destructive'>{emailError}</p>
            )}
          </div>

          {/* Profile Image */}
          <ImageUpload value={profileImage} onChange={setProfileImage} />

          {/* Password */}
          <PasswordInput
            value={password}
            // onChange={handlePasswordChange}
            onChange={setPassword}
            error={passwordError || undefined}
          />

          {/* Create Account */}
          <button
            type='submit'
            disabled={Loading}
            className='group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-bold text-[var(--brand-ink)] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:shadow-lg active:translate-y-0'
          >
            {Loading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className='size-4 transition-transform duration-200 group-hover:translate-x-1' />
          </button>
        </form>

        {/* Login Link */}
        <p className='mt-7 text-center text-sm text-[var(--muted-foreground)]'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-bold text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--accent)]'
          >
            Login
          </Link>
        </p>
      </section>

      {/* Footer */}
      <p className='mt-6 text-center text-xs text-[var(--muted-foreground)]'>
        © 2026 Rentora. All rights reserved.
      </p>
    </main>
  )
}

export default RegisterPage

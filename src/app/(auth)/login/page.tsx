'use client'

import { authClient } from '@/lib/auth-client'
import { validateEmail } from '@/lib/validation/emailValidation'
import { validatePassword } from '@/lib/validation/passwordValidation'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import PasswordInput from '@/components/auth/PasswordInput'

export default function LoginPage() {
  const router = useRouter()

  // Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Validation States
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Loading State
  const [loading, setLoading] = useState(false)

  // Login Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate Email and Password
    const nextEmailError = validateEmail(email)
    const nextPasswordError = validatePassword(password)

    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)

    if (nextEmailError || nextPasswordError) {
      toast.error('Please check your email and password.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      })

      if (error) {
        toast.error(error.message || 'Invalid email or password.')
        return
      }

      if (data) {
        toast.success(`Welcome back ${data.user.name}`)

        // Reset Form
        setEmail('')
        setPassword('')
        setEmailError(null)
        setPasswordError(null)

        // Redirect
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Google Login (Functionality will be added later)
  const handleGoogleLogin = () => {
    // Add Google login functionality here
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[#F5F1EB] px-5 py-10'>
      {/* Back to Home */}
      <div className='mb-6 w-full max-w-185'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-sm font-medium text-[#57534E] transition-colors hover:text-[#B45309]'
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>

      {/* Login Card */}
      <div className='w-full max-w-185 rounded-2xl border border-[#EAE4DA] bg-white p-7 shadow-[0_20px_60px_rgba(70,50,30,0.07)] sm:p-10'>
        {/* Logo */}
        <Link href='/' className='mb-4 inline-flex items-center gap-2.5'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5A623] text-[#241A10]'>
            <Sparkles size={21} />
          </div>

          <span className='text-2xl font-bold tracking-tight text-[#292524]'>
            Rentora<span className='text-[#F5A623]'>.</span>
          </span>
        </Link>

        {/* Heading */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight text-[#292524]'>
            Welcome back!
          </h1>

          <p className='mt-2 text-sm leading-6 text-[#78716C]'>
            Sign in to your account and continue exploring the best rental
            equipment.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Email Input */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-semibold text-[#44403C]'
            >
              Email Address
            </label>

            <input
              id='email'
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='h-12 w-full rounded-xl border border-[#E7E1D8] px-4 text-sm text-[#292524] outline-none transition-all placeholder:text-[#A8A29E] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20'
            />

            {emailError && <p className='text-xs text-red-500'>{emailError}</p>}
          </div>

          {/* Password Input */}
          <div className='space-y-2'>
            <PasswordInput
              value={password}
              onChange={setPassword}
              error={passwordError || undefined}
              showRequirements={false}
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='flex h-12 w-full items-center justify-center rounded-xl bg-[#F5A623] text-sm font-bold text-[#241A10] transition-all hover:bg-[#E99A16] disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className='my-7 flex items-center gap-4'>
          <div className='h-px flex-1 bg-[#EAE4DA]' />

          <span className='text-xs font-medium text-[#A8A29E]'>
            OR CONTINUE WITH
          </span>

          <div className='h-px flex-1 bg-[#EAE4DA]' />
        </div>

        {/* Google Login */}
        <button
          type='button'
          onClick={handleGoogleLogin}
          className='flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E7E1D8] bg-white text-sm font-semibold text-[#44403C] transition-all hover:border-[#D6CFC3] hover:bg-[#FAF8F4]'
        >
          <svg viewBox='0 0 48 48' className='h-5 w-5'>
            <path
              fill='#EA4335'
              d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z'
            />
            <path
              fill='#4285F4'
              d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.64 5.93c4.46-4.11 7.14-10.16 7.14-17.58Z'
            />
            <path
              fill='#FBBC05'
              d='M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z'
            />
            <path
              fill='#34A853'
              d='M24 48c6.48 0 11.93-2.13 15.91-5.87l-7.64-5.93c-2.13 1.43-4.85 2.27-8.27 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z'
            />
          </svg>
          Continue with Google
        </button>

        {/* Register Link */}
        <p className='mt-8 text-center text-sm text-[#78716C]'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className='font-bold text-[#B7791F] transition-colors hover:text-[#925F12]'
          >
            Create account
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className='mt-7 text-center text-xs text-[#A8A29E]'>
        © {new Date().getFullYear()} Rentora. All rights reserved.
      </p>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Add your login functionality here
  }

  const handleGoogleLogin = () => {
    // Add your Google login functionality here
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
          {/* Email */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-semibold text-[#44403C]'
            >
              Email Address
            </label>

            <div className='relative'>
              <Mail
                size={18}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]'
              />

              <input
                id='email'
                name='email'
                type='email'
                placeholder='you@example.com'
                required
                className='h-12 w-full rounded-xl border border-[#E7E1D8] bg-[#FFFEFC] pl-11 pr-4 text-sm text-[#292524] outline-none transition-all placeholder:text-[#A8A29E] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/10'
              />
            </div>
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='text-sm font-semibold text-[#44403C]'
              >
                Password
              </label>

              <Link
                href='/forgot-password'
                className='text-xs font-semibold text-[#B7791F] transition-colors hover:text-[#925F12]'
              >
                Forgot password?
              </Link>
            </div>

            <div className='relative'>
              <LockKeyhole
                size={18}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]'
              />

              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                required
                className='h-12 w-full rounded-xl border border-[#E7E1D8] bg-[#FFFEFC] pl-11 pr-12 text-sm text-[#292524] outline-none transition-all placeholder:text-[#A8A29E] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/10'
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] transition-colors hover:text-[#57534E]'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className='flex items-center gap-2'>
            <input
              id='remember'
              type='checkbox'
              className='h-4 w-4 cursor-pointer accent-[#F5A623]'
            />

            <label
              htmlFor='remember'
              className='cursor-pointer text-sm text-[#78716C]'
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] text-sm font-bold text-[#241A10] transition-all hover:bg-[#E99A15] active:scale-[0.99]'
          >
            Sign In
            <ArrowRight
              size={17}
              className='transition-transform group-hover:translate-x-1'
            />
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
          className='flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E7E1D8] bg-white text-sm font-semibold text-[#44403C] transition-all hover:bg-[#FAF8F4] hover:border-[#D6CFC3]'
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

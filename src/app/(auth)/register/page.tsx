'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserRound, Mail, ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import Logo from '@/components/shared/Logo'
import PasswordInput from '@/components/auth/PasswordInput'
import ImageUpload from '@/components/auth/ImageUpload'
import { validateEmail } from '@/lib/validation/emailValidation'
import { validatePassword } from '@/lib/validation/passwordValidation'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextEmailError = validateEmail(email)
    const nextPasswordError = validatePassword(password)

    setEmailError(nextEmailError)
    setPasswordError(nextPasswordError)

    if (nextEmailError || nextPasswordError) {
      toast.error('Please check the highlighted fields.')
      return
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)

    if (emailError) {
      setEmailError(validateEmail(value))
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)

    if (passwordError) {
      setPasswordError(validatePassword(value))
    }
  }

  // const handleGoogleLogin = () => {
  //   // Authentication will be connected here later.
  // }

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center bg-[#F5F1EB] px-4 py-10 sm:px-6'>
      {/* Back to Home */}
      <div className='mb-6 w-full max-w-185 '>
        <Link
          href='/'
          className='group inline-flex items-center gap-2 text-sm font-semibold text-[#766B62] transition-colors hover:text-[#D78C16]'
        >
          <ArrowLeft className='size-4 transition-transform duration-200 group-hover:-translate-x-1' />
          Back to Home
        </Link>
      </div>

      {/* Register Card */}
      <section className='w-full max-w-185 rounded-2xl border border-[#EAE2D9] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(43,26,18,0.07)] sm:px-9 sm:py-10'>
        {/* Logo */}
        <div className=' flex justify-center'>
          <Logo darkText />
        </div>

        {/* Heading */}
        <div className='mb-7 text-center'>
          <h1 className='text-3xl font-extrabold tracking-tight text-[#241A15]'>
            Create your account
          </h1>

          <p className='mt-2 text-sm leading-6 text-[#92877E]'>
            Join Rentora and discover a smarter way to rent.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleCreateAccount} className='space-y-5'>
          {/* Name */}
          <div className='space-y-2'>
            <label
              htmlFor='name'
              className='block text-sm font-semibold text-[#39291F]'
            >
              Full Name
            </label>

            <div className='relative'>
              <UserRound className='absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[#A99B8F]' />

              <input
                id='name'
                name='name'
                type='text'
                placeholder='Enter your full name'
                className='h-12 w-full rounded-xl border border-[#EAE2D9] bg-[#FCFBF9] pl-11 pr-4 text-sm text-[#241A15] outline-none transition-all placeholder:text-[#B4AAA0] hover:border-[#D9CABC] focus:border-[#F5A623] focus:bg-white focus:ring-4 focus:ring-[#F5A623]/10'
              />
            </div>
          </div>

          {/* Email */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-[#39291F]'
            >
              Email Address
            </label>

            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[#A99B8F]' />

              <input
                id='email'
                name='email'
                type='email'
                value={email}
                onChange={(event) => handleEmailChange(event.target.value)}
                placeholder='you@example.com'
                aria-invalid={emailError ? true : undefined}
                className={`h-12 w-full rounded-xl border bg-[#FCFBF9] pl-11 pr-4 text-sm text-[#241A15] outline-none transition-all placeholder:text-[#B4AAA0] focus:ring-4 ${
                  emailError
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-[#EAE2D9] hover:border-[#D9CABC] focus:border-[#F5A623] focus:bg-white focus:ring-[#F5A623]/10'
                }`}
              />
            </div>

            {emailError && (
              <p className='text-xs font-medium text-red-600'>{emailError}</p>
            )}
          </div>

          {/* Profile Image */}
          <ImageUpload value={profileImage} onChange={setProfileImage} />

          {/* Password */}
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            error={passwordError || undefined}
          />

          {/* Create Account */}
          <button
            type='submit'
            className='group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] text-sm font-bold text-[#241A15] shadow-[0_8px_20px_rgba(245,166,35,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E99B19] hover:shadow-[0_12px_25px_rgba(245,166,35,0.25)] active:translate-y-0'
          >
            Create Account
            <ArrowRight className='size-4 transition-transform duration-200 group-hover:translate-x-1' />
          </button>
        </form>

        {/* Divider */}
        {/* <div className='my-6 flex items-center gap-4'>
          <div className='h-px flex-1 bg-[#EAE2D9]' />

          <span className='text-[11px] font-bold tracking-[0.14em] text-[#A99B8F]'>
            OR CONTINUE WITH
          </span>

          <div className='h-px flex-1 bg-[#EAE2D9]' />
        </div> */}

        {/* Google Login */}
        {/* <button
          type='button'
          onClick={handleGoogleLogin}
          className='flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#EAE2D9] bg-white text-sm font-semibold text-[#39291F] transition-all duration-200 hover:border-[#F5A623] hover:bg-[#FFFBF4] active:scale-[0.99]'
        >
          <svg viewBox='0 0 24 24' className='size-5' aria-hidden='true'>
            <path
              fill='#4285F4'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.09-1.92 3.27-4.75 3.27-8.09z'
            />
            <path
              fill='#34A853'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.28-1.93-6.15-4.53H2.16v2.84A11 11 0 0 0 12 23z'
            />
            <path
              fill='#FBBC05'
              d='M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.16a11 11 0 0 0 0 9.88l3.69-2.84z'
            />
            <path
              fill='#EA4335'
              d='M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.55 10.55 0 0 0 12 0 11 11 0 0 0 2.16 7.06l3.69 2.84C6.72 7.3 9.14 4.36 12 4.36z'
            />
          </svg>
          Continue with Google
        </button> */}

        {/* Login Link */}
        <p className='mt-7 text-center text-sm text-[#92877E]'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-bold text-[#39291F] underline decoration-[#F5A623] decoration-2 underline-offset-4 transition-colors hover:text-[#D78C16]'
          >
            Login
          </Link>
        </p>
      </section>

      {/* Footer */}
      <p className='mt-6 text-center text-xs text-[#A99B8F]'>
        © 2026 Rentora. All rights reserved.
      </p>
    </main>
  )
}

export default RegisterPage

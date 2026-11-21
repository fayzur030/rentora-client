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
          {/* Account Role */}

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
                // onChange={(event) => handleEmailChange(event.target.value)}
                onChange={(event) => setEmail(event.target.value)}
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
            // onChange={handlePasswordChange}
            onChange={setPassword}
            error={passwordError || undefined}
          />

          {/* Create Account */}
          <button
            type='submit'
            disabled={Loading}
            className='group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] text-sm font-bold text-[#241A15] shadow-[0_8px_20px_rgba(245,166,35,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E99B19] hover:shadow-[0_12px_25px_rgba(245,166,35,0.25)] active:translate-y-0'
          >
            {Loading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className='size-4 transition-transform duration-200 group-hover:translate-x-1' />
          </button>
        </form>

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

'use client'

import { useState } from 'react'
import { Check, Eye, EyeOff, Circle } from 'lucide-react'
import { getPasswordRequirementStatus } from '@/lib/validation/passwordValidation'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  showRequirements?: boolean
}

const PasswordInput = ({
  value,
  onChange,
  error,
  showRequirements = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const validation = getPasswordRequirementStatus(value)

  const requirements = [
    { text: 'At least one uppercase letter', valid: validation.hasUppercase },
    { text: 'At least one lowercase letter', valid: validation.hasLowercase },
    { text: 'Minimum 6 characters', valid: validation.hasMinimumLength },
  ]

  return (
    <div className='space-y-3'>
      <label
        htmlFor='password'
        className='block text-sm font-semibold text-[var(--foreground)]'
      >
        Password
      </label>

      <div className='relative'>
        <input
          id='password'
          name='password'
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder='Enter your password'
          aria-invalid={error ? true : undefined}
          className={`h-12 w-full rounded-xl border bg-[var(--background)] px-4 pr-12 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:ring-4 ${
            error
              ? 'border-destructive/25 focus:border-destructive/25 focus:ring-destructive/15'
              : 'border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/10'
          }`}
        />

        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]'
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className='size-4' />
          ) : (
            <Eye className='size-4' />
          )}
        </button>
      </div>

      {/* Password Requirements */}
      {showRequirements && (
        <div className='grid gap-1.5 text-xs sm:grid-cols-1'>
          {requirements.map((requirement) => (
            <div
              key={requirement.text}
              className={`flex items-center gap-2 ${
                requirement.valid ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'
              }`}
            >
              {requirement.valid ? (
                <Check className='size-4 shrink-0' />
              ) : (
                <Circle className='size-3.5 shrink-0' />
              )}

              <span>{requirement.text}</span>
            </div>
          ))}
        </div>
      )}

      {error && <p className='text-xs font-medium text-destructive'>{error}</p>}
    </div>
  )
}

export default PasswordInput

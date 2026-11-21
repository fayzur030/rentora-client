'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'

// Props interface for the reusable ErrorState component
export interface ErrorStateProps {
  // Next.js error object containing error message and optional digest hash
  error?: Error & { digest?: string }
  // Next.js reset function to re-render the route and retry fetching
  reset: () => void
  // Optional custom title (defaults to a friendly heading)
  title?: string
  // Optional custom message (defaults to the error message or a fallback text)
  message?: string
  // Flag to toggle the "Back to Dashboard" button (default is true)
  showDashboardButton?: boolean
}

/**
 * Reusable Error UI Component
 *
 * Visually consistent with the Rentora SaaS dashboard theme:
 * - Soft warning icon with border
 * - Clear error heading and readable description
 * - "Try Again" retry action button
 * - Optional link back to the Dashboard
 */
export default function ErrorState({
  error,
  reset,
  title = 'Something Went Wrong',
  message,
  showDashboardButton = true,
}: ErrorStateProps) {
  // Log the error to browser console for easier debugging
  useEffect(() => {
    if (error) {
      console.error('Route Error Caught:', error)
    }
  }, [error])

  // Determine the display message (prioritize custom message, then error message, then fallback)
  const displayMessage =
    message ||
    error?.message ||
    'An unexpected error occurred while loading this page. Please try again or return to your dashboard.'

  return (
    <div className='flex min-h-[50vh] w-full items-center justify-center p-4'>
      {/* Modern SaaS Card Container */}
      <div className='w-full max-w-lg space-y-6 rounded-2xl border border-border/80 bg-card p-8 text-center shadow-xs sm:p-10'>
        {/* Soft Warning Icon with Glowing Ring */}
        <div className='mx-auto flex size-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive shadow-2xs'>
          <AlertTriangle className='size-7' aria-hidden='true' />
        </div>

        {/* Text Details: Title and Message */}
        <div className='space-y-2'>
          <h2 className='font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
            {title}
          </h2>
          <p className='text-sm leading-relaxed text-muted-foreground'>
            {displayMessage}
          </p>
        </div>

        {/* Optional Error Digest Badge (useful for debugging in production) */}
        {error?.digest && (
          <div className='inline-block rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-[11px] font-mono text-muted-foreground'>
            Error ID: {error.digest}
          </div>
        )}

        {/* Action Buttons: Try Again & Return to Dashboard */}
        <div className='flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row'>
          {/* Primary Action: Re-renders the current route */}
          <Button
            type='button'
            onClick={() => reset()}
            className='w-full gap-2 shadow-2xs sm:w-auto'
          >
            <RotateCcw className='size-4' aria-hidden='true' />
            Try Again
          </Button>

          {/* Secondary Action: Navigates back to safety */}
          {showDashboardButton && (
            <Link href='/dashboard' className='w-full sm:w-auto'>
              <Button
                type='button'
                variant='outline'
                className='w-full gap-2 shadow-2xs sm:w-auto'
              >
                <Home className='size-4' aria-hidden='true' />
                Back to Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

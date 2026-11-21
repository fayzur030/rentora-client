import Link from 'next/link'
import { ArrowLeft, Compass, FileQuestion, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * 404 - Page Not Found Component
 * 
 * Automatically rendered by Next.js App Router when:
 * 1. A user navigates to an invalid or non-existent route.
 * 2. The notFound() function is triggered inside a server component.
 */
export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-12'>
      <div className='w-full max-w-lg space-y-6 rounded-2xl border border-border/80 bg-card p-8 text-center shadow-xs sm:p-12'>
        {/* Soft Icon Badge with Glow */}
        <div className='relative mx-auto flex size-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-primary shadow-2xs'>
          <FileQuestion className='size-10' aria-hidden='true' />
          {/* Decorative mini status badge */}
          <span className='absolute -top-2 -right-2 rounded-full border border-primary/30 bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground shadow-xs'>
            404
          </span>
        </div>

        {/* Text Details */}
        <div className='space-y-2'>
          <h1 className='font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
            Page Not Found
          </h1>
          <p className='text-sm leading-relaxed text-muted-foreground'>
            Sorry, we couldn&apos;t find the page you are looking for. It might
            have been moved, removed, or the link may be incorrect.
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className='flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row'>
          {/* Primary Action: Go to Homepage */}
          <Link href='/' className='w-full sm:w-auto'>
            <Button type='button' className='w-full gap-2 shadow-2xs sm:w-auto'>
              <Home className='size-4' aria-hidden='true' />
              Back to Home
            </Button>
          </Link>

          {/* Secondary Action: Explore Equipment Listings */}
          <Link href='/all-equipments' className='w-full sm:w-auto'>
            <Button
              type='button'
              variant='outline'
              className='w-full gap-2 shadow-2xs sm:w-auto'
            >
              <Compass className='size-4' aria-hidden='true' />
              Browse Equipment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

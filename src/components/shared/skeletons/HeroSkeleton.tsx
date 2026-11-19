import { Skeleton } from '@/components/ui/skeleton'

// Full-screen skeleton that mirrors the home page Hero section:
// background image + centered badge, heading, text and buttons.
const HeroSkeleton = () => {
  return (
    <section className='relative w-full overflow-hidden' aria-hidden='true'>
      {/* Background image placeholder */}
      <Skeleton className='absolute inset-0 h-full w-full rounded-none' />

      {/* Hero content */}
      <div className='relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:justify-start lg:px-8 lg:text-left'>
        <div className='flex w-full flex-col items-center lg:items-start'>
          {/* Badge */}
          <Skeleton className='h-8 w-60 rounded-full' />

          {/* Heading lines */}
          <Skeleton className='mt-6 h-12 w-full max-w-2xl sm:h-14 md:h-16 lg:h-20' />
          <Skeleton className='mt-3 h-12 w-2/5 max-w-xl sm:h-14 md:h-16 lg:h-20' />

          {/* Description */}
          <Skeleton className='mt-6 h-5 w-full max-w-xl' />
          <Skeleton className='mt-2 h-5 w-3/4 max-w-lg' />

          {/* Action buttons */}
          <div className='mt-10 flex w-full flex-col items-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-4'>
            <Skeleton className='h-12 w-full rounded-lg sm:w-40' />
            <Skeleton className='h-12 w-full rounded-lg sm:w-44' />
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroSkeleton }

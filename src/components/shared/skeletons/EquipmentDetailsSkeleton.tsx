import { Skeleton } from '@/components/ui/skeleton'

// Skeleton that mirrors the equipment details page layout:
// back link, image + details column, and owner/terms cards below.
const EquipmentDetailsSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8'>
        {/* Back link */}
        <Skeleton className='h-9 w-36 rounded-full' />

        <section className='mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10'>
          {/* Image column */}
          <div className='relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lg sm:min-h-[440px]'>
            <Skeleton className='absolute inset-0 h-full w-full rounded-none' />
          </div>

          {/* Details column */}
          <div className='flex flex-col justify-center rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-7 lg:p-8'>
            <div className='mb-5 flex flex-wrap items-center gap-2'>
              <Skeleton className='h-6 w-32 rounded-full' />
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>

            <Skeleton className='h-8 w-3/4' />

            <div className='mt-4 space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-4 w-2/3' />
            </div>

            <div className='mt-7 rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='mt-2 h-9 w-32' />
            </div>

            <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className='flex items-start gap-3 rounded-xl border border-border/80 bg-background/70 p-4'
                >
                  <Skeleton className='size-9 shrink-0 rounded-lg' />
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6'>
              <Skeleton className='h-12 w-full rounded-xl' />
            </div>
          </div>
        </section>

        <section className='mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]'>
          {[0, 1].map((cardIndex) => (
            <div
              key={cardIndex}
              className='rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-7'
            >
              <Skeleton className='h-6 w-44' />
              <div className='mt-6 flex items-center gap-4'>
                <Skeleton className='size-14 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-48' />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export { EquipmentDetailsSkeleton }

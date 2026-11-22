import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ImageOff } from 'lucide-react'

import { getPopularEquipments } from '@/lib/api/equipments'

const PopularEquipments = async () => {
  const popularEquipments = await getPopularEquipments()
  const categories = popularEquipments.slice(0, 6)

  return (
    <section className='relative overflow-hidden border-y border-border/70 bg-background py-16 sm:py-20'>
      <div
        className='pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-accent/10 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-9 text-center sm:mb-12'>
          <div className='flex items-center justify-center gap-3 sm:gap-4'>
            <span className='h-px w-8 bg-primary/30 sm:w-12' aria-hidden='true' />
            <h2 className='font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl'>
              Popular Categories
            </h2>
            <span className='h-px w-8 bg-primary/30 sm:w-12' aria-hidden='true' />
          </div>
          <p className='mt-3 text-sm leading-6 text-muted-foreground sm:text-base'>
            Find the right gear for your next project or adventure.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center'>
            <h3 className='font-heading text-lg font-semibold text-foreground'>
              No popular categories yet
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Check back soon to discover what renters are choosing.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6'>
            {categories.map((category) => (
              <Link
                key={`${category.slug}-${category.name}`}
                href={`/all-equipments?category=${encodeURIComponent(category.name)}`}
                aria-label={`Browse ${category.name} equipment`}
                className='group flex min-h-48 flex-col items-center rounded-2xl border border-border/80 bg-card px-4 py-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-primary/5'
              >
                <div className='flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-accent/10 ring-1 ring-primary/5 transition duration-300 group-hover:scale-105 group-hover:bg-accent/20'>
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt=''
                      width={64}
                      height={64}
                      sizes='64px'
                      className='size-full object-cover'
                    />
                  ) : (
                    <ImageOff
                      className='size-7 text-primary/50'
                      aria-hidden='true'
                    />
                  )}
                </div>

                <h3 className='mt-4 line-clamp-2 text-sm font-bold leading-5 text-foreground'>
                  {category.name}
                </h3>
                <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                  Find gear for your next project
                </p>

                <span className='mt-3 inline-flex items-center gap-1 rounded-full border border-primary/10 bg-primary/[0.03] px-2.5 py-1 text-[11px] font-medium text-primary/80 transition-colors group-hover:border-accent/40 group-hover:bg-accent/10'>
                  Explore
                  <ArrowUpRight
                    className='size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className='mt-8 text-center'>
          <Link
            href='/all-equipments'
            className='inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5'
          >
            View all equipment
            <ArrowUpRight className='size-4' aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PopularEquipments

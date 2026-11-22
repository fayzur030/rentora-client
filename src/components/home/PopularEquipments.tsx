import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ImageOff, Sparkles } from 'lucide-react'

import { getPopularEquipments } from '@/lib/api/equipments'

const PopularEquipments = async () => {
  const popularEquipments = await getPopularEquipments()
  const categories = popularEquipments.slice(0, 6)

  return (
    <section className='relative overflow-hidden border-y border-border/70 bg-card py-16 sm:py-20'>
      <div
        className='pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-accent/10 blur-3xl'
        aria-hidden='true'
      />

      <div className='relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary'>
              <Sparkles className='size-3.5' aria-hidden='true' />
              CUSTOMER FAVORITES
            </div>
            <h2 className='mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
              Popular Equipment
            </h2>
            <p className='mt-2 text-sm leading-6 text-muted-foreground sm:text-base'>
              Browse the equipment categories renters are exploring right now.
            </p>
          </div>

          <Link
            href='/all-equipments'
            className='inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5'
          >
            Explore all equipment
            <ArrowUpRight className='size-4' aria-hidden='true' />
          </Link>
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
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {categories.map((category, index) => (
              <Link
                key={`${category.slug}-${category.name}`}
                href={`/all-equipments?category=${encodeURIComponent(category.name)}`}
                aria-label={`Browse ${category.name} equipment`}
                className='group relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-primary shadow-sm ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl'
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt=''
                    fill
                    sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                ) : (
                  <div className='absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground/70'>
                    <ImageOff className='size-10' aria-hidden='true' />
                  </div>
                )}

                <div
                  className='absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent'
                  aria-hidden='true'
                />

                <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-white/75'>
                      Popular category {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className='mt-2 font-heading text-xl font-bold sm:text-2xl'>
                      {category.name}
                    </h3>
                    <p className='mt-1 text-sm text-white/80'>
                      Explore available rentals
                    </p>
                  </div>

                  <span className='flex size-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-primary'>
                    <ArrowUpRight className='size-5' aria-hidden='true' />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PopularEquipments

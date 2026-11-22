import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ImageOff } from 'lucide-react'

import { getPopularEquipments } from '@/lib/api/equipments'
import PopularEquipmentsMotion from '@/components/home/PopularEquipmentsMotion'

const PopularEquipments = async () => {
  const popularEquipments = await getPopularEquipments()
  const categories = popularEquipments.slice(0, 6)

  return (
    <PopularEquipmentsMotion>
      <div className='mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 lg:px-8'>
        <div className='max-w-xl'>
          <span className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary'>
            <span className='h-px w-7 bg-primary' aria-hidden='true' />
            Find your category
          </span>
          <h2 className='mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
            The right gear for every big idea.
          </h2>
          <p className='mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base'>
            From weekend plans to ambitious projects, discover equipment that
            helps you get things moving.
          </p>
          <Link
            href='/all-equipments'
            className='mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#F5A623] px-5 text-sm font-bold text-[#2b1a12] transition-colors hover:bg-[#ffc04f]'
          >
            Explore all equipment
            <ArrowUpRight className='size-4' aria-hidden='true' />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center'>
            <h3 className='font-heading text-lg font-semibold text-foreground'>
              No popular categories yet
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Check back soon to discover what renters are choosing.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {categories.map((category, index) => (
              <Link
                key={`${category.slug}-${category.name}`}
                href={`/categories/${encodeURIComponent(category.slug)}`}
                aria-label={`Browse ${category.name} equipment`}
                className='group flex min-h-28 items-center gap-4 rounded-2xl border border-border/80 bg-card p-3.5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-primary/5 sm:p-4'
              >
                <div className='relative flex size-[4.25rem] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent/10 ring-1 ring-border/50 transition duration-300 group-hover:scale-[1.03]'>
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt=''
                      fill
                      sizes='68px'
                      className='size-full object-cover'
                    />
                  ) : (
                    <ImageOff
                      className='size-7 text-primary/50'
                      aria-hidden='true'
                    />
                  )}
                </div>

                <div className='min-w-0 flex-1'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70'>
                    Category {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className='mt-1 line-clamp-2 text-sm font-bold leading-5 text-foreground sm:text-[15px]'>
                    {category.name}
                  </h3>
                </div>

                <span className='flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground'>
                  <ArrowUpRight
                    className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PopularEquipmentsMotion>
  )
}

export default PopularEquipments

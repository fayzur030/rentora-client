import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ImageOff } from 'lucide-react'
import { notFound } from 'next/navigation'

import EquipmentGrid from '@/components/equipment/EquipmentGrid'
import { getAllEquipments } from '@/lib/api/equipments'
import { getCategories } from '@/lib/api/category'
import { getFavorites } from '@/lib/api/favorite'
import { getSessionFromServer } from '@/lib/auth/getSessionFromServer'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categoryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryName} Equipment`,
    description: `Browse ${categoryName.toLowerCase()} equipment available to rent on Rentora.`,
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((item) => item.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryQuery = new URLSearchParams({ category: category.name })
  const [equipments, session] = await Promise.all([
    getAllEquipments(categoryQuery.toString()),
    getSessionFromServer(),
  ])
  const favorites = session?.user?.id ? await getFavorites(session.user.id) : []
  const favoriteEquipmentIds = favorites
    .map((equipment) => equipment._id ?? equipment.id)
    .filter((id): id is string => Boolean(id))

  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <Link
        href='/all-equipments'
        className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary'
      >
        <ArrowLeft className='size-4' aria-hidden='true' />
        All equipment
      </Link>

      <section className='mt-6 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm sm:grid sm:grid-cols-[0.85fr_1.15fr]'>
        <div className='relative min-h-56 bg-muted sm:min-h-64'>
          {category.image ? (
            <Image
              src={category.image}
              alt=''
              fill
              sizes='(max-width: 639px) 100vw, 40vw'
              className='object-cover'
            />
          ) : (
            <div className='absolute inset-0 flex items-center justify-center text-muted-foreground'>
              <ImageOff className='size-10' aria-hidden='true' />
            </div>
          )}
        </div>

        <div className='flex flex-col justify-center p-6 sm:p-8 lg:p-10'>
          <p className='text-xs font-bold uppercase tracking-[0.18em] text-primary'>
            Equipment category
          </p>
          <h1 className='mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl'>
            {category.name}
          </h1>
          <p className='mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base'>
            Browse available {category.name.toLowerCase()} rentals and find the
            right equipment for your next project.
          </p>
          <p className='mt-5 text-sm text-muted-foreground'>
            <span className='font-semibold text-foreground'>
              {equipments.pagination.totalEquipments}
            </span>{' '}
            {equipments.pagination.totalEquipments === 1 ? 'listing' : 'listings'}
          </p>
        </div>
      </section>

      <section className='mt-10'>
        <h2 className='mb-5 font-heading text-xl font-bold text-foreground sm:text-2xl'>
          Available {category.name}
        </h2>
        <EquipmentGrid
          equipments={equipments.equipments}
          currentPage={equipments.pagination.currentPage}
          totalPages={equipments.pagination.totalPages}
          favoriteEquipmentIds={favoriteEquipmentIds}
        />
      </section>
    </div>
  )
}

export default CategoryPage

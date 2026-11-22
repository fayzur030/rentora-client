import HeroCarousel from './HeroCarousel'
import { getCategories } from '@/lib/api/category'
import type { Category } from '@/types/category'

const categoryNames = [
  'Agriculture Equipment',
  'Construction Equipment',
  'Electronics',
  'Event Equipment',
  'Photography Equipment',
  'Vehicles & Transportation',
]

const Hero = async () => {
  let categories: Category[] = []

  try {
    const allCategories = await getCategories()
    categories = categoryNames.flatMap((name) => {
      const category = allCategories.find((item) => item.name === name)
      return category?.image ? [category] : []
    })
  } catch {
    // Keep the hero content available if category images cannot be loaded.
  }

  return <HeroCarousel categories={categories} />
}

export default Hero

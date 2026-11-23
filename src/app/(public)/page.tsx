import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import FeaturedEquipments from '@/components/home/FeaturedEquipments'
import PopularEquipments from '@/components/home/PopularEquipments'
import CustomerReviews from '@/components/home/CustomerReviews'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import RecentlyAddedEquipments from '@/components/home/RecentlyAddedEquipments'
import HowItWorks from '@/components/home/HowItWorks'

export const metadata: Metadata = {
  title: 'Equipment Rentals Made Easy',
  description:
    'Browse and rent equipment for your next project, event, or everyday need on Rentora.',
}

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularEquipments />
      <FeaturedEquipments />
      <HowItWorks />
      <WhyChooseUs />
      <CustomerReviews />
      <RecentlyAddedEquipments />
    </div>
  )
}

import Hero from '@/components/shared/Hero'
import FeaturedEquipments from '@/components/home/FeaturedEquipments'
import PopularEquipments from '@/components/home/PopularEquipments'
import CustomerReviews from '@/components/home/CustomerReviews'

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularEquipments />
      <FeaturedEquipments />
      <CustomerReviews />
    </div>
  )
}

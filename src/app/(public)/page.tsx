import Hero from '@/components/shared/Hero'
import FeaturedEquipments from '@/components/home/FeaturedEquipments'
import PopularEquipments from '@/components/home/PopularEquipments'
import CustomerReviews from '@/components/home/CustomerReviews'
import WhyChooseUs from '@/components/home/WhyChooseUs'

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularEquipments />
      <FeaturedEquipments />
      <WhyChooseUs />
      <CustomerReviews />
    </div>
  )
}

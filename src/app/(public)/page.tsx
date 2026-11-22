import Hero from '@/components/shared/Hero'
import FeaturedEquipments from '@/components/home/FeaturedEquipments'
import PopularEquipments from '@/components/home/PopularEquipments'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedEquipments />
      <PopularEquipments />
    </div>
  )
}

import StatsCard, { type StatsCardProps } from './StatsCard'

interface StatsGridProps {
  stats: StatsCardProps[]
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  if (stats.length === 0) return null

  return (
    <div className='grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

export default StatsGrid

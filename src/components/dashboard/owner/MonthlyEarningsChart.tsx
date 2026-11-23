'use client'

import { Rental } from '@/types/rental'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface MonthlyEarningsChartProps {
  rental: Rental[]
}
const data = [
  { month: 'Jun', earnings: 12000 },
  { month: 'Jul', earnings: 18000 },
  { month: 'Aug', earnings: 15000 },
  { month: 'Sep', earnings: 25000 },
  { month: 'Oct', earnings: 22000 },
  { month: 'Nov', earnings: 32000 },
]

const MonthlyEarningsChart = ({ rental }: MonthlyEarningsChartProps) => {
  return (
    <div className='h-[350px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='earningsGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#6366F1' stopOpacity={0.35} />
              <stop offset='95%' stopColor='#6366F1' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <XAxis dataKey='month' axisLine={false} tickLine={false} />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `৳${value / 1000}k`}
          />

          <Tooltip formatter={(value) => [`৳${value}`, 'Earnings']} />

          <Area
            type='monotone'
            dataKey='earnings'
            stroke='#6366F1'
            strokeWidth={2}
            fill='url(#earningsGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyEarningsChart

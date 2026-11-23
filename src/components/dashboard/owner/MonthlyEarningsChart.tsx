'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface MonthlyEarnings {
  month: string
  earnings: number
}

interface MonthlyEarningsChartProps {
  data: MonthlyEarnings[]
}

const MonthlyEarningsChart = ({ data }: MonthlyEarningsChartProps) => {
  return (
    <div className='h-87.5 w-full mt-10'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='earningsGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#6366F1' stopOpacity={0.35} />
              <stop offset='95%' stopColor='#6366F1' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <XAxis
            dataKey='month'
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
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

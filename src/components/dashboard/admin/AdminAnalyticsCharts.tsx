'use client'

import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminAnalyticsData } from '@/lib/dashboard-stats'

interface AdminAnalyticsChartsProps {
  analytics: AdminAnalyticsData
}

const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
]

const axisTick = {
  fill: 'var(--muted-foreground)',
  fontSize: 12,
}

const ChartPanel = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <Card className='rounded-2xl border-border/80 shadow-card'>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const EmptyChart = () => (
  <div className='flex h-72 items-center justify-center text-sm text-muted-foreground'>
    No data for this period yet
  </div>
)

const AdminAnalyticsCharts = ({ analytics }: AdminAnalyticsChartsProps) => {
  const hasRevenue = analytics.monthlyRevenue.some((item) => item.revenue > 0)
  const hasBookings = analytics.monthlyBookings.some(
    (item) => item.bookings > 0
  )
  const hasStatusData = analytics.bookingStatuses.some((item) => item.count > 0)
  const hasUserGrowth = analytics.userGrowth.some((item) => item.users > 0)

  return (
    <div className='grid gap-5 xl:grid-cols-2'>
      <ChartPanel title='Monthly Revenue'>
        {hasRevenue ? (
          <ResponsiveContainer width='100%' height={288}>
            <BarChart data={analytics.monthlyRevenue}>
              <CartesianGrid stroke='var(--border)' strokeDasharray='3 3' />
              <XAxis dataKey='month' tick={axisTick} tickMargin={8} />
              <YAxis
                tick={axisTick}
                tickFormatter={(value: number) =>
                  `${String.fromCharCode(0x09f3)}${Number(value).toLocaleString('en-BD')}`
                }
                width={76}
              />
              <Tooltip
                formatter={(value) =>
                  `${String.fromCharCode(0x09f3)}${Number(value ?? 0).toLocaleString('en-BD')}`
                }
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 12,
                }}
              />
              <Bar
                dataKey='revenue'
                name='Revenue'
                fill='var(--color-chart-2)'
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartPanel>

      <ChartPanel title='Monthly Bookings'>
        {hasBookings ? (
          <ResponsiveContainer width='100%' height={288}>
            <BarChart data={analytics.monthlyBookings}>
              <CartesianGrid stroke='var(--border)' strokeDasharray='3 3' />
              <XAxis dataKey='month' tick={axisTick} tickMargin={8} />
              <YAxis allowDecimals={false} tick={axisTick} width={42} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 12,
                }}
              />
              <Bar
                dataKey='bookings'
                name='Bookings'
                fill='var(--color-chart-1)'
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartPanel>

      <ChartPanel title='Booking Status Distribution'>
        {hasStatusData ? (
          <ResponsiveContainer width='100%' height={288}>
            <PieChart>
              <Pie
                data={analytics.bookingStatuses}
                dataKey='count'
                nameKey='status'
                cx='50%'
                cy='50%'
                innerRadius={58}
                outerRadius={96}
                paddingAngle={3}
              >
                {analytics.bookingStatuses.map((item, index) => (
                  <Cell key={item.status} fill={chartColors[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-2 pb-2 text-xs text-muted-foreground'>
          {analytics.bookingStatuses.map((item, index) => (
            <span key={item.status} className='inline-flex items-center gap-2'>
              <span
                className='size-2.5 rounded-full'
                style={{ backgroundColor: chartColors[index] }}
              />
              {item.status}: {item.count}
            </span>
          ))}
        </div>
      </ChartPanel>

      <ChartPanel title='User Growth'>
        {hasUserGrowth ? (
          <ResponsiveContainer width='100%' height={288}>
            <LineChart data={analytics.userGrowth}>
              <CartesianGrid stroke='var(--border)' strokeDasharray='3 3' />
              <XAxis dataKey='month' tick={axisTick} tickMargin={8} />
              <YAxis allowDecimals={false} tick={axisTick} width={42} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 12,
                }}
              />
              <Line
                type='monotone'
                dataKey='users'
                name='New users'
                stroke='var(--color-chart-3)'
                strokeWidth={3}
                dot={{ r: 3, fill: 'var(--color-chart-3)' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartPanel>
    </div>
  )
}

export default AdminAnalyticsCharts

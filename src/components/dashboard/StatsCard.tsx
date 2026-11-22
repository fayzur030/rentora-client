import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: number | string
  description?: string
  trend?: {
    value: number
    label?: string
  }
}

const StatsCard = ({
  icon: Icon,
  title,
  value,
  description,
  trend,
}: StatsCardProps) => {
  return (
    <Card className='h-full rounded-2xl border-border/80 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg'>
      <CardContent className='flex h-full flex-col justify-between gap-6 p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>
              {title}
            </p>
            <p className='wrap-break-word font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
              {value}
            </p>
          </div>
          <span className='flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary'>
            <Icon className='size-5' aria-hidden='true' />
          </span>
        </div>

        {(description || trend) && (
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground'>
            {trend && (
              <span className='font-semibold text-success'>
                {trend.value > 0 ? '+' : ''}
                {trend.value}%
              </span>
            )}
            {trend?.label && <span>{trend.label}</span>}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard

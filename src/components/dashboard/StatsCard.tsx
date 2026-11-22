import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export type StatsCardColor =
  | 'blue'
  | 'violet'
  | 'cyan'
  | 'emerald'
  | 'amber'
  | 'indigo'
  | 'teal'
  | 'orange'
  | 'rose'
  | 'sky'
  | 'pink'

const colorStyles: Record<
  StatsCardColor,
  { icon: string; value: string; iconBackground: string }
> = {
  blue: {
    icon: 'text-blue-500 dark:text-blue-400',
    value: 'text-blue-600 dark:text-blue-400',
    iconBackground:
      'border-blue-500/15 bg-blue-500/10 dark:border-blue-400/20 dark:bg-blue-400/10',
  },
  violet: {
    icon: 'text-violet-500 dark:text-violet-400',
    value: 'text-violet-600 dark:text-violet-400',
    iconBackground:
      'border-violet-500/15 bg-violet-500/10 dark:border-violet-400/20 dark:bg-violet-400/10',
  },
  cyan: {
    icon: 'text-cyan-500 dark:text-cyan-400',
    value: 'text-cyan-600 dark:text-cyan-400',
    iconBackground:
      'border-cyan-500/15 bg-cyan-500/10 dark:border-cyan-400/20 dark:bg-cyan-400/10',
  },
  emerald: {
    icon: 'text-emerald-500 dark:text-emerald-400',
    value: 'text-emerald-600 dark:text-emerald-400',
    iconBackground:
      'border-emerald-500/15 bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-400/10',
  },
  amber: {
    icon: 'text-amber-500 dark:text-amber-400',
    value: 'text-amber-600 dark:text-amber-400',
    iconBackground:
      'border-amber-500/15 bg-amber-500/10 dark:border-amber-400/20 dark:bg-amber-400/10',
  },
  indigo: {
    icon: 'text-indigo-500 dark:text-indigo-400',
    value: 'text-indigo-600 dark:text-indigo-400',
    iconBackground:
      'border-indigo-500/15 bg-indigo-500/10 dark:border-indigo-400/20 dark:bg-indigo-400/10',
  },
  teal: {
    icon: 'text-teal-500 dark:text-teal-400',
    value: 'text-teal-600 dark:text-teal-400',
    iconBackground:
      'border-teal-500/15 bg-teal-500/10 dark:border-teal-400/20 dark:bg-teal-400/10',
  },
  orange: {
    icon: 'text-orange-500 dark:text-orange-400',
    value: 'text-orange-600 dark:text-orange-400',
    iconBackground:
      'border-orange-500/15 bg-orange-500/10 dark:border-orange-400/20 dark:bg-orange-400/10',
  },
  rose: {
    icon: 'text-rose-500 dark:text-rose-400',
    value: 'text-rose-600 dark:text-rose-400',
    iconBackground:
      'border-rose-500/15 bg-rose-500/10 dark:border-rose-400/20 dark:bg-rose-400/10',
  },
  sky: {
    icon: 'text-sky-500 dark:text-sky-400',
    value: 'text-sky-600 dark:text-sky-400',
    iconBackground:
      'border-sky-500/15 bg-sky-500/10 dark:border-sky-400/20 dark:bg-sky-400/10',
  },
  pink: {
    icon: 'text-pink-500 dark:text-pink-400',
    value: 'text-pink-600 dark:text-pink-400',
    iconBackground:
      'border-pink-500/15 bg-pink-500/10 dark:border-pink-400/20 dark:bg-pink-400/10',
  },
}

export interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: number | string
  color?: StatsCardColor
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
  color,
  description,
  trend,
}: StatsCardProps) => {
  const colors = color ? colorStyles[color] : null

  return (
    <Card className='h-full rounded-2xl border-border/80 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg'>
      <CardContent className='flex h-full flex-col justify-between gap-6 p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>
              {title}
            </p>
            <p
              className={`wrap-break-word font-heading text-2xl font-bold tracking-tight sm:text-3xl ${colors?.value ?? 'text-foreground'}`}
            >
              {value}
            </p>
          </div>
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${colors?.iconBackground ?? 'border-primary/10 bg-primary/5'} ${colors?.icon ?? 'text-primary'}`}
          >
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

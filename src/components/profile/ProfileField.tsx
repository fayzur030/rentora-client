import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ProfileFieldProps {
  icon: LucideIcon
  label: string
  value?: string
  className?: string
}

// One label + value pair used inside the information cards.
// Empty values get a soft "Not provided" state instead of an empty gap.
const ProfileField = ({ icon: Icon, label, value, className }: ProfileFieldProps) => {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-muted/50',
        className
      )}
    >
      <span className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
        <Icon className='size-4' aria-hidden='true' />
      </span>

      <div className='min-w-0 space-y-1'>
        <p className='text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground'>
          {label}
        </p>

        <p
          className={cn(
            'text-sm leading-5 break-words',
            value
              ? 'font-medium text-foreground'
              : 'italic text-muted-foreground/80'
          )}
        >
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  )
}

export default ProfileField

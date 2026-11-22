'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'
import type { DashboardNavLinkProps } from '@/types/dashboard'

const DashboardNavLink = ({
  item,
  collapsed = false,
  onNavigate,
}: DashboardNavLinkProps) => {
  const pathname = usePathname()
  const Icon = item.icon

  // Check active route
  const isActive = item.href === pathname

  // Navigation link styles
  const linkClassName = cn(
    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
    collapsed && 'justify-center px-0',
    isActive
      ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
      : 'text-sidebar-foreground/70 hover:bg-card/5 hover:text-sidebar-foreground'
  )

  // Navigation icon
  const icon = (
    <Icon
      aria-hidden='true'
      className={cn(
        'size-5 shrink-0 transition-colors',
        isActive ? 'text-[var(--accent)]' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground'
      )}
    />
  )

  // Collapsed sidebar
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href={item.href}
              onClick={onNavigate}
              className={linkClassName}
              aria-current={isActive ? 'page' : undefined}
            />
          }
        >
          {icon}
        </TooltipTrigger>

        <TooltipContent side='right' sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    )
  }

  // Expanded sidebar
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={linkClassName}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}

      <span className='truncate'>{item.label}</span>
    </Link>
  )
}

export default DashboardNavLink

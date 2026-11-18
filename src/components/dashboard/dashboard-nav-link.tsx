'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { DashboardNavLinkProps } from '@/types/dashboard'

const DashboardNavLink = ({ item, collapsed = false, onNavigate }: DashboardNavLinkProps) => {
  const pathname = usePathname()
  const Icon = item.icon

  // Active when the URL is exactly the link, or a child of the link
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

  const linkClassName = cn(
    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
    collapsed && 'justify-center px-0',
    isActive
      ? 'bg-[#F5A623]/15 text-[#F5A623]'
      : 'text-white/70 hover:bg-white/5 hover:text-white'
  )

  const icon = (
    <Icon
      aria-hidden='true'
      className={cn(
        'size-5 shrink-0 transition-colors',
        isActive ? 'text-[#F5A623]' : 'text-white/50 group-hover:text-white'
      )}
    />
  )

  // Collapsed sidebar: show only the icon and move the label into a tooltip
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

  // Normal sidebar and mobile drawer: icon + label
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

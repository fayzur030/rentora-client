'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { LogOut, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { authClient } from '@/lib/auth-client'
import { dashboardNavItems, dashboardRoleLabels } from '@/lib/dashboard-links'
import { cn } from '@/lib/utils'
import type { DashboardSidebarProps } from '@/types/dashboard'
import DashboardNavLink from './dashboard-nav-link'

interface SidebarActionProps {
  label: string
  icon: LucideIcon
  href?: string
  onClick?: () => void
  collapsed?: boolean
  variant?: 'default' | 'danger'
}

const SidebarAction = ({
  label,
  icon: Icon,
  href,
  onClick,
  collapsed = false,
  variant = 'default',
}: SidebarActionProps) => {
  const className = cn(
    'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
    collapsed && 'justify-center px-0',
    variant === 'danger'
      ? 'text-white/70 hover:bg-red-500/10 hover:text-red-400'
      : 'text-white/70 hover:bg-white/5 hover:text-white'
  )

  const iconElement = (
    <Icon
      aria-hidden='true'
      className={cn(
        'size-5 shrink-0 transition-colors',
        variant === 'danger'
          ? 'text-white/50 group-hover:text-red-400'
          : 'text-white/50 group-hover:text-white'
      )}
    />
  )

  // Collapsed: icon only, the tooltip shows the label
  if (collapsed) {
    const trigger = href ? (
      <Link href={href} onClick={onClick} className={className} />
    ) : (
      <button type='button' onClick={onClick} className={className} />
    )

    return (
      <Tooltip>
        <TooltipTrigger render={trigger}>{iconElement}</TooltipTrigger>
        <TooltipContent side='right' sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  // Expanded: icon + label
  return href ? (
    <Link href={href} onClick={onClick} className={className}>
      {iconElement}
      <span className='truncate'>{label}</span>
    </Link>
  ) : (
    <button type='button' onClick={onClick} className={className}>
      {iconElement}
      <span className='truncate'>{label}</span>
    </button>
  )
}

const DashboardSidebar = ({
  role,
  collapsed = false,
  onNavigate,
}: DashboardSidebarProps) => {
  const router = useRouter()
  console.log(role, 'role from user')

  //dynamic dashboard use role
  const navItems = dashboardNavItems[role]

  // Same sign out flow as the public navbar profile dropdown
  const handleSignOut = async () => {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message || 'Could not sign out. Please try again.')
      return
    }

    onNavigate?.()
    toast.success('Signed out successfully.')
    router.push('/')
    router.refresh()
  }

  return (
    <div className='flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#2b1a12] to-[#171411] text-white'>
      {/* Brand */}
      <div
        className={cn(
          'flex items-center px-5 py-5',
          collapsed && 'justify-center px-0'
        )}
      >
        <Link
          href='/'
          onClick={onNavigate}
          aria-label='Rentora home'
          className='flex items-center gap-2.5'
        >
          <Image
            src='/images/navLogo.svg'
            alt='Rentora'
            width={34}
            height={34}
            className='shrink-0'
          />

          {!collapsed && (
            <span className='text-xl font-extrabold tracking-tight'>
              Rent<span className='text-[#F5A623]'>ora</span>
            </span>
          )}
        </Link>
      </div>

      <Separator className='bg-white/10' />

      {/* Small caption above the links (hidden while collapsed) */}
      {!collapsed && (
        <p className='px-5 pt-5 pb-2 text-[11px] font-semibold tracking-widest text-white/40 uppercase'>
          {dashboardRoleLabels[role]}
        </p>
      )}

      {/* Navigation links */}
      <ScrollArea className='min-h-0 flex-1 overflow-hidden px-3 pt-3'>
        <nav
          aria-label='Dashboard navigation'
          className='flex flex-col gap-1.5'
        >
          {navItems.map((item) => (
            <DashboardNavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom actions: settings + logout */}
      <div className='flex flex-col gap-1 border-t border-white/10 p-3'>
        <SidebarAction
          label='Settings'
          icon={Settings}
          href={`/dashboard/${role}/settings`}
          onClick={onNavigate}
          collapsed={collapsed}
        />
        <SidebarAction
          label='Log Out'
          icon={LogOut}
          onClick={handleSignOut}
          collapsed={collapsed}
          variant='danger'
        />
      </div>
    </div>
  )
}

export default DashboardSidebar

'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { dashboardNavItems, dashboardRoleLabels } from '@/lib/dashboard-links'
import { cn } from '@/lib/utils'
import type { DashboardSidebarProps } from '@/types/dashboard'
import DashboardNavLink from './dashboard-nav-link'

const DashboardSidebar = ({ role, collapsed = false, onNavigate }: DashboardSidebarProps) => {
  const navItems = dashboardNavItems[role]

  return (
    <div className='flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#2b1a12] to-[#171411] text-white'>
      {/* Brand */}
      <div className={cn('flex items-center px-5 py-5', collapsed && 'justify-center px-0')}>
        <Link
          href='/'
          onClick={onNavigate}
          aria-label='Rentora home'
          className='flex items-center gap-2.5'
        >
          <Image src='/images/navLogo.svg' alt='Rentora' width={34} height={34} className='shrink-0' />

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
        <nav aria-label='Dashboard navigation' className='flex flex-col gap-1.5'>
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
    </div>
  )
}

export default DashboardSidebar

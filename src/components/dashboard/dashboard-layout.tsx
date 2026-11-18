'use client'

import { useState } from 'react'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { DashboardLayoutProps } from '@/types/dashboard'
import DashboardNavbar from './dashboard-navbar'
import DashboardSidebar from './dashboard-sidebar'

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <TooltipProvider delay={300}>
      {/* The Sheet wraps the dashboard so the navbar's SheetTrigger can open the mobile drawer */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <div className='min-h-screen bg-background'>
          {/* Desktop sidebar (hidden on mobile and tablet) */}
          <aside
            className={cn(
              'fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-white/10 transition-[width] duration-300 ease-in-out lg:block',
              isCollapsed ? 'w-20' : 'w-64'
            )}
          >
            <DashboardSidebar role={role} collapsed={isCollapsed} />
          </aside>

          {/* Main area: moves right when the sidebar is collapsed */}
          <div
            className={cn(
              'flex min-h-screen flex-col transition-[padding] duration-300 ease-in-out',
              isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
            )}
          >
            <DashboardNavbar
              role={role}
              isCollapsed={isCollapsed}
              onToggleCollapse={() => setIsCollapsed((previous) => !previous)}
            />

            <main className='flex-1 px-4 py-6 sm:px-6 lg:px-8'>{children}</main>
          </div>
        </div>

        {/* Mobile sidebar drawer (opens from the left) */}
        <SheetContent
          side='left'
          className='w-[85%] gap-0 border-r border-white/10 bg-[#171411] p-0 text-white sm:max-w-sm'
        >
          <SheetTitle className='sr-only'>Dashboard Menu</SheetTitle>

          <DashboardSidebar role={role} onNavigate={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  )
}

export default DashboardLayout

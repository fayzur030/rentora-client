'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Menu, PanelLeft, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SheetTrigger } from '@/components/ui/sheet'
import { dashboardRoleLabels, findActiveNavItem } from '@/lib/dashboard-links'
import type { DashboardNavbarProps } from '@/types/dashboard'
import { authClient } from '@/lib/auth-client'
import ThemeToggle from '@/components/shared/ThemeToggle'

const DashboardNavbar = ({
  isCollapsed,
  onToggleCollapse,
  role,
}: DashboardNavbarProps) => {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const pathname = usePathname()
  const activeNavItem = findActiveNavItem(pathname)

  const section = activeNavItem
    ? dashboardRoleLabels[activeNavItem.role]
    : 'Dashboard'
  const title = activeNavItem ? activeNavItem.item.label : 'Overview'

  return (
    <header className='sticky top-0 z-30 border-b border-nav-border bg-nav-background text-nav-foreground shadow-sm backdrop-blur-xl'>
      <div className='flex h-16 items-center justify-between gap-4 px-4 sm:px-6'>
        {/* Left side: menu buttons + page title */}
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          {/* Mobile: opens the sidebar drawer.
              The SheetTrigger must stay inside the Sheet rendered by DashboardLayout. */}
          <SheetTrigger
            render={
              <Button
                variant='ghost'
                size='icon'
                aria-label='Open navigation menu'
                className='lg:hidden'
              />
            }
          >
            <Menu className='size-5' />
          </SheetTrigger>

          {/* Desktop: collapse / expand the sidebar */}
          {/* max-lg:hidden so it stays hidden on mobile (media variants beat the base classes) */}
          <Button
            variant='ghost'
            size='icon'
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className='max-lg:hidden'
            onClick={onToggleCollapse}
          >
            <PanelLeft className='size-5' />
          </Button>

          <Separator orientation='vertical' className='hidden h-8 lg:block' />

          {/* Section + page title */}
          <div className='min-w-0'>
            <p className='truncate text-xs font-medium text-nav-foreground/65'>
              {section}
            </p>
            <h1 className='truncate font-heading text-lg font-bold sm:text-xl'>
              {title}
            </h1>
          </div>
        </div>

        {/* Right side: profile avatar */}
        <div className='flex shrink-0 items-center gap-2'>
          <ThemeToggle className='text-nav-foreground hover:bg-nav-foreground/10 hover:text-nav-foreground' />
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label='Open profile menu'
              className='flex shrink-0 items-center rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring/50'
            >
              <Avatar className='size-10'>
                <AvatarImage
                  className='size-10 border-2 border-warning/25'
                  src={user?.image || undefined}
                  alt={user?.name || 'User'}
                />
                <AvatarFallback className='bg-[var(--accent)] font-bold text-[var(--brand-ink)]'>
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' sideOffset={8} className='w-60 p-2'>
              <DropdownMenuGroup>
                <DropdownMenuLabel className='px-2 py-2'>
                  <div className='space-y-0.5'>
                    <p className='truncate text-sm font-semibold text-foreground'>
                      {user?.name}
                    </p>
                    <p className='truncate text-xs font-normal text-muted-foreground'>
                      {user?.email}
                    </p>
                    <p className='text-xs font-medium capitalize text-[var(--accent)]'>
                      {role}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                render={<Link href={`/dashboard/${role}/profile`} />}
                className='cursor-pointer gap-2 py-2 font-medium'
              >
                <User />
                My Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href='/' />}
                className='cursor-pointer gap-2 py-2 font-medium'
              >
                <Home />
                Back to Home
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar

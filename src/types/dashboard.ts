import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

// The three roles that have their own dashboard
export type DashboardRole = 'customer' | 'owner' | 'admin'

// One entry inside a dashboard sidebar (label + route + icon)
export interface DashboardNavItem {
  label: string
  href: string
  icon: LucideIcon
  // true = only this exact URL counts as active (e.g. the section
  // overview link should not stay active on its child pages)
  exact?: boolean
}

// Navigation list for each role
export type DashboardNavItems = Record<DashboardRole, DashboardNavItem[]>

// Props for DashboardNavLink
export interface DashboardNavLinkProps {
  item: DashboardNavItem
  // Collapsed = icons only (desktop sidebar is minimized)
  collapsed?: boolean
  // Used by the mobile drawer so it can close after a click
  onNavigate?: () => void
}

// Props for DashboardSidebar
export interface DashboardSidebarProps {
  role: DashboardRole
  collapsed?: boolean
  onNavigate?: () => void
}

// Props for DashboardNavbar
export interface DashboardNavbarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  role: DashboardRole
}

// Props for DashboardLayout (sidebar + navbar + content area)
export interface DashboardLayoutProps {
  role: DashboardRole
  children: ReactNode
}

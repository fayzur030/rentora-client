import {
  ClipboardList,
  Heart,
  LayoutDashboard,
  Package,
  Plus,
  User,
  Users,
  Warehouse,
} from 'lucide-react'
import type {
  DashboardNavItem,
  DashboardNavItems,
  DashboardRole,
} from '@/types/dashboard'

// ---------------------------------------------------------------
// Customer dashboard navigation
// ---------------------------------------------------------------
export const customerNavItems: DashboardNavItem[] = [
  // The section overview: active only on its own URL, never on child pages
  {
    label: 'Dashboard',
    href: '/dashboard/customer',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'My Rentals',
    href: '/dashboard/customer/my-rentals',
    icon: Package,
  },
  { label: 'Favorites', href: '/dashboard/customer/favorites', icon: Heart },
  { label: 'Profile', href: '/dashboard/customer/profile', icon: User },
]

// ---------------------------------------------------------------
// Owner dashboard navigation
// ---------------------------------------------------------------
export const ownerNavItems: DashboardNavItem[] = [
  {
    label: 'Add Equipment',
    href: '/dashboard/owner/add-equipment',
    icon: Plus,
  },
  {
    label: 'My Equipment',
    href: '/dashboard/owner/my-equipment',
    icon: Warehouse,
  },
  {
    label: 'My Equipment Rental',
    href: '/dashboard/owner/my-equipment-rentals',
    icon: ClipboardList,
  },
  { label: 'My Profile', href: '/dashboard/owner/profile', icon: User },
]

// ---------------------------------------------------------------
// Admin dashboard navigation
// ---------------------------------------------------------------
export const adminNavItems: DashboardNavItem[] = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'All Users', href: '/dashboard/admin/users', icon: Users },
  { label: 'All Equipment', href: '/dashboard/admin/equipment', icon: Package },
  {
    label: 'All Rentals',
    href: '/dashboard/admin/rentals',
    icon: ClipboardList,
  },
  { label: 'My Profile', href: '/dashboard/admin/profile', icon: User },
]

// All three lists in one object, selected by role
export const dashboardNavItems: DashboardNavItems = {
  customer: customerNavItems,
  owner: ownerNavItems,
  admin: adminNavItems,
}

// Title shown above the page title in the navbar
export const dashboardRoleLabels: Record<DashboardRole, string> = {
  customer: 'Customer Dashboard',
  owner: 'Owner Dashboard',
  admin: 'Admin Dashboard',
}

// One shared active check, used by both the sidebar links and the navbar title.
// - normal items: active on their own URL and on any child page
// - items with exact: active only on their own URL
export const isNavItemActive = (
  pathname: string,
  item: DashboardNavItem
): boolean => {
  if (item.exact) return pathname === item.href

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

// Finds the nav item that matches the current URL.
// Used by the navbar to show the section and page title.
// When several items match, the most specific one (longest href) wins,
// so a parent link never hides the real page title.
export const findActiveNavItem = (
  pathname: string
): { role: DashboardRole; item: DashboardNavItem } | null => {
  const roles = Object.keys(dashboardNavItems) as DashboardRole[]

  let activeMatch: { role: DashboardRole; item: DashboardNavItem } | null = null

  for (const role of roles) {
    for (const item of dashboardNavItems[role]) {
      if (!isNavItemActive(pathname, item)) continue

      if (!activeMatch || item.href.length > activeMatch.item.href.length) {
        activeMatch = { role, item }
      }
    }
  }

  return activeMatch
}

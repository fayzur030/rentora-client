import { ClipboardList, Heart, Package, Plus, User, Users, Warehouse } from 'lucide-react'
import type { DashboardNavItem, DashboardNavItems, DashboardRole } from '@/types/dashboard'

// ---------------------------------------------------------------
// Customer dashboard navigation
// ---------------------------------------------------------------
export const customerNavItems: DashboardNavItem[] = [
  { label: 'My Rentals', href: '/dashboard/customer/my-rentals', icon: Package },
  { label: 'Favorites', href: '/dashboard/customer/favorites', icon: Heart },
  { label: 'Profile', href: '/dashboard/customer/profile', icon: User },
]

// ---------------------------------------------------------------
// Owner dashboard navigation
// ---------------------------------------------------------------
export const ownerNavItems: DashboardNavItem[] = [
  { label: 'Add Equipment', href: '/dashboard/owner/add-equipment', icon: Plus },
  { label: 'My Equipment', href: '/dashboard/owner/my-equipment', icon: Warehouse },
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
  { label: 'All Users', href: '/dashboard/admin/users', icon: Users },
  { label: 'All Equipment', href: '/dashboard/admin/equipment', icon: Package },
  { label: 'All Rentals', href: '/dashboard/admin/rentals', icon: ClipboardList },
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

// Finds the nav item that matches the current URL.
// Used by the navbar to show the section and page title.
export const findActiveNavItem = (
  pathname: string
): { role: DashboardRole; item: DashboardNavItem } | null => {
  const roles = Object.keys(dashboardNavItems) as DashboardRole[]

  for (const role of roles) {
    const item = dashboardNavItems[role].find(
      (navItem) => pathname === navItem.href || pathname.startsWith(`${navItem.href}/`)
    )

    if (item) return { role, item }
  }

  return null
}

import DashboardLayout from '@/components/dashboard/dashboard-layout'
import type { DashboardRole } from '@/types/dashboard'

// The role is fixed for now so every dashboard can be previewed.
// Later this can come from the logged-in user (no role detection yet).
const currentRole: DashboardRole = 'customer'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayoutRoute = ({ children }: DashboardLayoutProps) => {
  return <DashboardLayout role={currentRole}>{children}</DashboardLayout>
}

export default DashboardLayoutRoute

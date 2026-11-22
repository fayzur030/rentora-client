import { headers } from 'next/headers'
import DashboardLayout from '@/components/dashboard/dashboard-layout'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayoutRoute = async ({ children }: DashboardLayoutProps) => {
  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Get user role
  const role = session?.user?.role ?? 'customer'

  return <DashboardLayout role={role}>{children}</DashboardLayout>
}

export default DashboardLayoutRoute

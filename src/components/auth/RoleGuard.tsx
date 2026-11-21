import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

interface RoleGuardProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const RoleGuard = async ({ allowedRoles, children }: RoleGuardProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const userRole = session.user.role

  if (!allowedRoles.includes(userRole)) {
    redirect('/unauthorized')
  }

  return <>{children}</>
}

export default RoleGuard

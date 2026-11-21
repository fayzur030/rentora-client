'use client'

import ErrorState from '@/components/shared/ErrorState'

interface AdminDashboardErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error Boundary for Admin Dashboard routes (/dashboard/admin/*)
 */
export default function AdminDashboardError({
  error,
  reset,
}: AdminDashboardErrorProps) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      title='Admin Panel Error'
      message='An error occurred while loading this admin section. Please try again.'
    />
  )
}

'use client'

import ErrorState from '@/components/shared/ErrorState'

interface DashboardRootErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Root Error Boundary for all Dashboard routes (/dashboard/*)
 * Catches any unhandled error inside Admin, Owner, or Customer dashboards.
 */
export default function DashboardRootError({
  error,
  reset,
}: DashboardRootErrorProps) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      title='Dashboard Error'
      message='We encountered an issue loading your dashboard. Please try again.'
    />
  )
}

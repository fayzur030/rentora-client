'use client'

import ErrorState from '@/components/shared/ErrorState'

interface CustomerDashboardErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error Boundary for Customer Dashboard routes (/dashboard/customer/*)
 */
export default function CustomerDashboardError({
  error,
  reset,
}: CustomerDashboardErrorProps) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      title='Customer Panel Error'
      message='An error occurred while loading your rentals or favorites. Please try again.'
    />
  )
}

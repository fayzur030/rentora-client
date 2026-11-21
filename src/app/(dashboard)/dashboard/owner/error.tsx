'use client'

import ErrorState from '@/components/shared/ErrorState'

interface OwnerDashboardErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error Boundary for Owner Dashboard routes (/dashboard/owner/*)
 */
export default function OwnerDashboardError({
  error,
  reset,
}: OwnerDashboardErrorProps) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      title='Owner Panel Error'
      message='An error occurred while loading your equipment or rental listings. Please try again.'
    />
  )
}

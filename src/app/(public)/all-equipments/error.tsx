'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

interface AllEquipmentsErrorProps {
  error: Error & { digest?: string }
  retry: () => void
}

const AllEquipmentsError = ({
  error,
  retry,
}: AllEquipmentsErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-4 text-center'>
      <h1 className='font-heading text-2xl font-bold text-foreground'>
        Equipment could not be loaded
      </h1>
      <p className='mt-2 max-w-md text-sm text-muted-foreground'>
        Something went wrong while loading equipment. Please try again.
      </p>
      <Button onClick={retry} className='mt-5'>
        Try again
      </Button>
    </div>
  )
}

export default AllEquipmentsError

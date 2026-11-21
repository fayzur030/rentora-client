'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

interface MyEquipmentRentalsErrorProps {
  error: Error & { digest?: string }
  retry: () => void
}

const MyEquipmentRentalsError = ({
  error,
  retry,
}: MyEquipmentRentalsErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='font-heading text-2xl font-bold text-foreground'>
          My Equipment Rental
        </h2>
        <p className='text-sm text-muted-foreground'>
          See which customer has booked your equipment.
        </p>
      </div>

      <div className='rounded-xl border border-border bg-card p-10 text-center shadow-sm'>
        <p className='text-sm text-muted-foreground'>
          Rental bookings could not be loaded. Please try again.
        </p>
        <Button onClick={retry} className='mt-4'>
          Try again
        </Button>
      </div>
    </div>
  )
}

export default MyEquipmentRentalsError

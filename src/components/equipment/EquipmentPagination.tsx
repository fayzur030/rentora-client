'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface EquipmentPaginationProps {
  currentPage: number
  totalPages: number
}

const EquipmentPagination = ({
  currentPage,
  totalPages,
}: EquipmentPaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', String(page))

    router.push(`${pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className='mt-8 flex items-center justify-center gap-4'>
      <Button
        variant='outline'
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <span className='text-sm font-medium text-foreground'>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant='outline'
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}

export default EquipmentPagination

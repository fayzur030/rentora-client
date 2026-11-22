'use client'

import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const sortOptions = [
  { value: 'price-low-to-high', label: 'Price: Low to High' },
  { value: 'price-high-to-low', label: 'Price: High to Low' },
  { value: 'recently-added', label: 'Recently Added' },
]

const EquipmentSort = ({ queryString }: { queryString: string }) => {
  const router = useRouter()

  const handleSortChange = (value: string | null) => {
    if (!value) return

    const params = new URLSearchParams(queryString)
    params.set('sort', value)

    router.push(`/all-equipments?${params.toString()}`)
  }

  return (
    <div className='flex items-center gap-2'>
      <ArrowUpDown
        className='size-4 text-muted-foreground'
        aria-hidden='true'
      />

      <Select
        value={new URLSearchParams(queryString).get('sort') || ''}
        onValueChange={handleSortChange}
      >
        <SelectTrigger
          aria-label='Sort equipment'
          className='h-10 w-full min-w-44 bg-card py-5 sm:w-auto'
        >
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>

        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default EquipmentSort

import { ArrowUpDown } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Sorting options for the equipment list.
// The actual sorting logic will be added later.
const sortOptions = [
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'recently-added', label: 'Recently Added' },
]

const EquipmentSort = () => {
  return (
    <div className='flex items-center gap-2'>
      <ArrowUpDown
        className='size-4 text-muted-foreground'
        aria-hidden='true'
      />

      <Select defaultValue='price-low-high'>
        <SelectTrigger
          aria-label='Sort equipment'
          className='h-10 w-full min-w-44 bg-card sm:w-auto'
        >
          <SelectValue />
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

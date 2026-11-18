import { RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const categoryOptions = [
  'Construction Equipment',
  'Agriculture Equipment',
  'Power Tools',
  'Heavy Machinery',
  'Electronics',
  'Vehicles',
  'Other',
]

const rentalTypeOptions = ['Daily', 'Weekly', 'Monthly']

const availabilityOptions = ['Available', 'Unavailable']

// A small wrapper that gives every filter group the same heading style.
const FilterGroup = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-semibold text-foreground'>{title}</h3>
      <div className='space-y-2.5'>{children}</div>
    </div>
  )
}

// A simple checkbox row. It only renders UI for now,
// the filtering logic will be added later.
const FilterCheckbox = ({ label }: { label: string }) => {
  return (
    <label className='flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground'>
      <input
        type='checkbox'
        className='size-4 shrink-0 rounded border-input accent-primary'
      />
      <span>{label}</span>
    </label>
  )
}

// Left sidebar with all filters.
const EquipmentFilters = () => {
  return (
    <div className='rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10'>
      <h2 className='font-heading text-base font-bold text-foreground'>
        Filters
      </h2>

      <Separator className='my-4' />

      <div className='space-y-5'>
        <FilterGroup title='Category'>
          {categoryOptions.map((option) => (
            <FilterCheckbox key={option} label={option} />
          ))}
        </FilterGroup>

        <Separator />

        <FilterGroup title='Rental Type'>
          {rentalTypeOptions.map((option) => (
            <FilterCheckbox key={option} label={option} />
          ))}
        </FilterGroup>

        <Separator />

        <FilterGroup title='Price Range'>
          <div className='flex items-center gap-2'>
            <Input
              type='number'
              aria-label='Minimum price'
              placeholder='Min'
              className='h-10 rounded-lg bg-background'
            />
            <span className='text-muted-foreground' aria-hidden='true'>
              –
            </span>
            <Input
              type='number'
              aria-label='Maximum price'
              placeholder='Max'
              className='h-10 rounded-lg bg-background'
            />
          </div>
        </FilterGroup>

        <Separator />

        <FilterGroup title='Availability'>
          {availabilityOptions.map((option) => (
            <FilterCheckbox key={option} label={option} />
          ))}
        </FilterGroup>
      </div>

      <Button
        type='button'
        variant='outline'
        className='mt-5 h-10 w-full gap-2'
      >
        <RotateCcw className='size-4' aria-hidden='true' />
        Clear All Filters
      </Button>
    </div>
  )
}

export default EquipmentFilters

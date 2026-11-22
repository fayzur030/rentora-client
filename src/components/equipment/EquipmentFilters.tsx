'use client'

import { RotateCcw } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { Category } from '@/types/category'

const rentalTypeOptions = ['Daily', 'Weekly', 'Monthly']

// const availabilityOptions = ['Available', 'Unavailable']
const availabilityOptions = [
  { label: 'Available', value: 'true' },
  { label: 'Unavailable', value: 'false' },
]

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

// A single-choice row for each filter group.
const FilterRadio = ({
  label,
  name,
  checked,
  onChange,
}: {
  label: string
  name: string
  checked: boolean
  onChange: (value: string) => void
}) => {
  return (
    <label className='flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground'>
      <input
        type='radio'
        name={name}
        checked={checked}
        onChange={() => onChange(label)}
        className='size-4 shrink-0 rounded border-input accent-primary'
      />
      <span>{label}</span>
    </label>
  )
}

// Left sidebar with all filters.
interface EquipmentFiltersProps {
  categories: Category[]
}

const EquipmentFilters = ({ categories }: EquipmentFiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const minPriceParam = searchParams.get('minPrice') || ''
  const maxPriceParam = searchParams.get('maxPrice') || ''
  const priceFormRef = useRef<HTMLFormElement>(null)
  const [priceError, setPriceError] = useState('')

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchParams.get(key) === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`/all-equipments?${params.toString()}`)
  }

  const applyPriceFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const min = String(formData.get('minPrice') || '').trim()
    const max = String(formData.get('maxPrice') || '').trim()
    const invalidPrice = [min, max].some(
      (price) => price && (!Number.isFinite(Number(price)) || Number(price) < 0),
    )
    if (invalidPrice) {
      setPriceError('Prices must be valid non-negative numbers.')
      return
    }
    if (min && max && Number(min) > Number(max)) {
      setPriceError('Minimum price cannot be greater than maximum price.')
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    if (min) {
      params.set('minPrice', min)
    } else {
      params.delete('minPrice')
    }
    if (max) {
      params.set('maxPrice', max)
    } else {
      params.delete('maxPrice')
    }

    setPriceError('')
    router.push(`/all-equipments?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('rentalType')
    params.delete('availability')
    params.delete('minPrice')
    params.delete('maxPrice')

    priceFormRef.current?.reset()
    setPriceError('')
    router.push(`/all-equipments?${params.toString()}`)
  }

  return (
    <div className='rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10'>
      <h2 className='font-heading text-base font-bold text-foreground'>
        Filters
      </h2>

      <Separator className='my-4' />

      <div className='space-y-5'>
        <FilterGroup title='Category'>
          {categories.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              No categories available.
            </p>
          ) : (
            categories.map((category) => (
              <FilterRadio
                key={category._id}
                name='category'
                label={category.name}
                checked={searchParams.get('category') === category.name}
                onChange={(value) => updateFilter('category', value)}
              />
            ))
          )}
        </FilterGroup>

        <Separator />

        <FilterGroup title='Rental Type'>
          {rentalTypeOptions.map((option) => (
            <FilterRadio
              key={option}
              name='rentalType'
              label={option}
              checked={searchParams.get('rentalType') === option}
              onChange={(value) => updateFilter('rentalType', value)}
            />
          ))}
        </FilterGroup>

        <Separator />

        <FilterGroup title='Price Range'>
          <form
            key={`${minPriceParam}:${maxPriceParam}`}
            ref={priceFormRef}
            onSubmit={applyPriceFilter}
            className='space-y-2.5'
          >
            <div className='flex items-center gap-2'>
              <Input
                type='number'
                min='0'
                step='any'
                name='minPrice'
                aria-label='Minimum price'
                aria-invalid={Boolean(priceError)}
                placeholder='Min'
                defaultValue={minPriceParam}
                onChange={() => setPriceError('')}
                className='h-10 rounded-lg bg-background'
              />
              <span className='text-muted-foreground' aria-hidden='true'>
                –
              </span>
              <Input
                type='number'
                min='0'
                step='any'
                name='maxPrice'
                aria-label='Maximum price'
                aria-invalid={Boolean(priceError)}
                placeholder='Max'
                defaultValue={maxPriceParam}
                onChange={() => setPriceError('')}
                className='h-10 rounded-lg bg-background'
              />
            </div>
            {priceError && (
              <p role='alert' className='text-xs text-destructive'>
                {priceError}
              </p>
            )}
            <Button type='submit' className='h-9 w-full'>
              Apply Price
            </Button>
          </form>
        </FilterGroup>

        <Separator />

        {/* <FilterGroup title='Availability'>
          {availabilityOptions.map((option) => (
            <FilterRadio
              key={option}
              name='availability'
              label={option}
              checked={searchParams.get('availability') === option}
              onChange={(value) => updateFilter('availability', value)}
            />
          ))}
        </FilterGroup> */}
        <FilterGroup title='Availability'>
          {availabilityOptions.map((option) => (
            <FilterRadio
              key={option.value}
              name='availability'
              label={option.label}
              checked={searchParams.get('availability') === option.value}
              onChange={() => updateFilter('availability', option.value)}
            />
          ))}
        </FilterGroup>
      </div>

      <Button
        type='button'
        variant='outline'
        className='mt-5 h-10 w-full gap-2'
        onClick={clearFilters}
      >
        <RotateCcw className='size-4' aria-hidden='true' />
        Clear All Filters
      </Button>
    </div>
  )
}

export default EquipmentFilters

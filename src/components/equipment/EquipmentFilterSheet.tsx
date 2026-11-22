'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import EquipmentFilters from './EquipmentFilters'
import type { Category } from '@/types/category'

// On mobile and small tablets the filters open inside a slide-over sheet.
const EquipmentFilterSheet = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={buttonVariants({
          variant: 'outline',
          className: 'h-10 gap-2 px-4',
        })}
      >
        <SlidersHorizontal className='size-4' aria-hidden='true' />
        Filters
      </SheetTrigger>

      <SheetContent side='left' className='w-[85vw] max-w-sm overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine the equipment list.</SheetDescription>
        </SheetHeader>

        <div className='px-4 pb-6'>
          <EquipmentFilters categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default EquipmentFilterSheet

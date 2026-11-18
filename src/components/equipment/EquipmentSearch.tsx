import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

// Full width search bar at the top of the All Equipment page.
// Search logic will be added later.
const EquipmentSearch = () => {
  return (
    <div className='relative'>
      <Search
        className='pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground'
        aria-hidden='true'
      />

      <Input
        type='search'
        aria-label='Search equipment'
        placeholder='Search equipment by name or location...'
        className='h-14 rounded-2xl border-border bg-card pr-4 pl-12 text-sm shadow-sm transition-shadow focus-visible:border-primary/40 focus-visible:ring-primary/20'
      />
    </div>
  )
}

export default EquipmentSearch

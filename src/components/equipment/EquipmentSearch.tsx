'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Input } from '@/components/ui/input'

const EquipmentSearch = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (search.trim()) {
      params.set('search', search.trim())
    } else {
      params.delete('search')
    }

    router.push(`/all-equipments?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className='relative'>
      <Search
        className='pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground'
        aria-hidden='true'
      />

      <Input
        type='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label='Search equipment'
        placeholder='Search equipment by name or location...'
        className='h-14 rounded-2xl border-border bg-card pr-4 pl-12 text-sm shadow-sm transition-shadow focus-visible:border-primary/40 focus-visible:ring-primary/20'
      />
    </form>
  )
}

export default EquipmentSearch

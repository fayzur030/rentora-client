'use client'

import Image from 'next/image'
import { Calendar, ImageOff, Inbox } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getInitials } from '@/components/profile/profile-utils'
import { cn } from '@/lib/utils'
import type { Rental } from '@/types/rental'

// ========================================================
// 1. Props Definition for AdminRentalsTable
// ========================================================
interface AdminRentalsTableProps {
  rentals: Rental[]
  errorMessage: string | null
}

// ========================================================
// 2. Helper: Date Formatter (e.g. converts "2026-03-05" -> "05 Mar 2026")
// ========================================================
const formatDate = (dateString?: string): string => {
  if (!dateString) return '—'

  const parsedDate = new Date(dateString)
  if (Number.isNaN(parsedDate.getTime())) return '—'

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

// ========================================================
// 3. Reusable Component: UserCell
// Renders user avatar, full name, and email for both Customer and Owner
// ========================================================
interface UserCellProps {
  name: string
  email: string
  image?: string | null
}

const UserCell = ({ name, email, image }: UserCellProps) => {
  return (
    <div className='flex min-w-44 items-center gap-3'>
      {/* User profile avatar with initials fallback */}
      <Avatar className='size-9 border border-border/70 shadow-2xs'>
        {image ? <AvatarImage src={image} alt={name} /> : null}
        <AvatarFallback className='bg-muted text-xs font-semibold text-foreground'>
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      {/* User name and email */}
      <div className='min-w-0 flex-1 space-y-0.5'>
        <p className='truncate text-sm font-semibold text-foreground'>
          {name}
        </p>
        <p className='truncate text-xs text-muted-foreground'>
          {email}
        </p>
      </div>
    </div>
  )
}

// ========================================================
// 4. Reusable Component: StatusBadge
// Formats payment & booking status into modern SaaS badges with colored indicator dots
// ========================================================
interface StatusBadgeProps {
  status?: string
}

const StatusBadge = ({ status = '' }: StatusBadgeProps) => {
  const normalized = status.toLowerCase().trim()

  // Success / Active states: Green dot & background
  if (normalized === 'paid' || normalized === 'confirmed' || normalized === 'completed') {
    return (
      <Badge className='inline-flex items-center gap-1.5 rounded-full border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 shadow-2xs dark:text-emerald-400'>
        <span className='size-1.5 rounded-full bg-emerald-500' />
        {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
      </Badge>
    )
  }

  // Cancelled / Failed states: Red dot & background
  if (normalized === 'failed' || normalized === 'cancelled' || normalized === 'rejected') {
    return (
      <Badge className='inline-flex items-center gap-1.5 rounded-full border-rose-500/25 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-700 shadow-2xs dark:text-rose-400'>
        <span className='size-1.5 rounded-full bg-rose-500' />
        {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
      </Badge>
    )
  }

  // Pending / Unpaid states: Amber pulsing dot & background
  const label = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Pending'
  return (
    <Badge className='inline-flex items-center gap-1.5 rounded-full border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 shadow-2xs dark:text-amber-400'>
      <span className='size-1.5 animate-pulse rounded-full bg-amber-500' />
      {label}
    </Badge>
  )
}

// ========================================================
// 5. Main Component: AdminRentalsTable
// ========================================================
const AdminRentalsTable = ({
  rentals,
  errorMessage,
}: AdminRentalsTableProps) => {
  // If the server returns an error, display an alert message
  if (errorMessage) {
    return (
      <div
        role='alert'
        className='rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive shadow-xs'
      >
        <p className='font-semibold'>Error loading rentals</p>
        <p className='mt-1 text-muted-foreground'>{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      {/* Mobile helper notice for horizontal scroll */}
      <p className='text-xs text-muted-foreground sm:hidden'>
        Swipe sideways to view all columns.
      </p>

      {/* SaaS Style Table Wrapper */}
      <div className='overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs'>
        <Table className='min-w-280'>
          {/* Table Header */}
          <TableHeader className='border-b border-border/70 bg-muted/50'>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Customer Information
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Owner Information
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Equipment Name
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Rental Duration
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Booking Amount
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Payment Status
              </TableHead>
              <TableHead className='py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Booking Status
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {rentals.length === 0 ? (
              // Empty State when no bookings exist
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='h-52 text-center text-muted-foreground'
                >
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <Inbox
                      className='size-10 text-muted-foreground/60'
                      aria-hidden='true'
                    />
                    <p className='text-base font-semibold text-foreground'>
                      No rentals found
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      When customers book equipment, the records will appear here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Map through each rental item
              rentals.map((rental, index) => {
                // Customer details fallback
                const customerName =
                  rental.customer?.name ||
                  rental.userEmail?.split('@')[0] ||
                  'Customer'
                const customerEmail =
                  rental.customer?.email || rental.userEmail || '—'
                const customerImage = rental.customer?.image

                // Owner details fallback
                const ownerName = rental.owner?.name || 'Owner'
                const ownerEmail = rental.owner?.email || '—'
                const ownerImage = rental.owner?.image

                // Equipment details fallback
                const equipmentTitle =
                  rental.equipment?.name ||
                  rental.equipmentName ||
                  'Equipment'
                const equipmentImage = rental.equipment?.image

                return (
                  <TableRow
                    key={rental._id || `rental-${index}`}
                    className='group border-b border-border/40 transition-colors hover:bg-muted/30 last:border-0'
                  >
                    {/* 1. Customer Information */}
                    <TableCell className='py-3.5'>
                      <UserCell
                        name={customerName}
                        email={customerEmail}
                        image={customerImage}
                      />
                    </TableCell>

                    {/* 2. Owner Information */}
                    <TableCell className='py-3.5'>
                      <UserCell
                        name={ownerName}
                        email={ownerEmail}
                        image={ownerImage}
                      />
                    </TableCell>

                    {/* 3. Equipment Information */}
                    <TableCell className='py-3.5'>
                      <div className='flex min-w-52 items-center gap-3'>
                        <div className='relative size-11 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted/60 shadow-2xs'>
                          {equipmentImage ? (
                            <Image
                              src={equipmentImage}
                              alt={equipmentTitle}
                              fill
                              sizes='44px'
                              className='object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          ) : (
                            <div className='flex size-full items-center justify-center text-muted-foreground'>
                              <ImageOff
                                className='size-4'
                                aria-hidden='true'
                              />
                            </div>
                          )}
                        </div>

                        <div className='min-w-0 space-y-0.5'>
                          <p className='truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary'>
                            {equipmentTitle}
                          </p>
                          {rental.equipment?.category && (
                            <Badge className='rounded-md border-primary/20 bg-primary/10 px-2 py-0 text-[10px] font-medium text-primary shadow-2xs'>
                              {rental.equipment.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* 4. Rental Duration */}
                    <TableCell className='py-3.5 whitespace-nowrap'>
                      <div className='space-y-0.5'>
                        <div className='flex items-center gap-1.5 text-xs font-medium text-foreground'>
                          <Calendar
                            className='size-3.5 shrink-0 text-muted-foreground'
                            aria-hidden='true'
                          />
                          <span>
                            {formatDate(rental.startDate)} –{' '}
                            {formatDate(rental.endDate)}
                          </span>
                        </div>
                        <p className='pl-5 text-[11px] text-muted-foreground'>
                          Duration: {rental.rentalDuration}{' '}
                          {rental.rentalDuration === 1 ? 'day' : 'days'}
                        </p>
                      </div>
                    </TableCell>

                    {/* 5. Booking Amount */}
                    <TableCell className='py-3.5 whitespace-nowrap'>
                      <div className='space-y-0.5'>
                        <span className='text-sm font-semibold tracking-tight text-foreground'>
                          ৳{rental.totalAmount.toLocaleString()}
                        </span>
                        <p className='text-[11px] text-muted-foreground'>
                          Qty: {rental.quantity}{' '}
                          {rental.quantity === 1 ? 'unit' : 'units'}
                        </p>
                      </div>
                    </TableCell>

                    {/* 6. Payment Status */}
                    <TableCell className='py-3.5 whitespace-nowrap'>
                      <StatusBadge status={rental.paymentStatus} />
                    </TableCell>

                    {/* 7. Booking Status */}
                    <TableCell className='py-3.5 whitespace-nowrap'>
                      <StatusBadge status={rental.bookingStatus} />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminRentalsTable

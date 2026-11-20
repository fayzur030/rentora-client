'use client'

import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import { useState, type FormEvent } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Equipment } from '@/types/equipment'
import { validateBookingForm } from '../../lib/validation/booking.validation'
import { BookingFormErrors } from '@/types/booking'
import { createBooking } from '@/lib/actions/bookings'
import { toast } from 'sonner'
import { getSessionFromClient } from '@/lib/server/getSessionFromClient'

interface BookingModalProps {
  equipment: Pick<
    Equipment,
    | '_id'
    | 'name'
    | 'image'
    | 'rentalPrice'
    | 'rentalType'
    | 'availableQuantity'
  >
}

const BookingModal = ({ equipment }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [rentalStartDate, setRentalStartDate] = useState('')
  const [rentalEndDate, setRentalEndDate] = useState('')
  const [quantity, setQuantity] = useState(1)

  //todo: validation state

  const [contactNumber, setContactNumber] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  const [errors, setErrors] = useState<BookingFormErrors>({})
  const session = getSessionFromClient()
  const user = session?.user
  // Calculate total amount
  let totalAmount = 0

  if (rentalStartDate && rentalEndDate) {
    const startDate = new Date(rentalStartDate).getTime()
    const endDate = new Date(rentalEndDate).getTime()

    const days = (endDate - startDate) / 86400000

    let units = days
    const rentalType = equipment.rentalType?.toLowerCase() || 'daily'

    if (rentalType.includes('week')) {
      units = Math.ceil(days / 7)
    } else if (rentalType.includes('month')) {
      units = Math.ceil(days / 30)
    } else if (rentalType.includes('year')) {
      units = Math.ceil(days / 365)
    }

    if (days > 0 && quantity > 0) {
      totalAmount = equipment.rentalPrice * units * quantity
    }
  }

  // todo: handleBooking logic

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const form = event.currentTarget
    const validationErrors = validateBookingForm(
      {
        rentalStartDate,
        rentalEndDate,
        quantity,
        contactNumber,
        deliveryAddress,
      },
      equipment.availableQuantity
    )
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    if (!equipment._id) {
      toast.error('Equipment ID is missing. Please refresh and try again.')
      return
    }
    if (!user?.email) {
      toast.error('Please login to continue')
      return
    }

    try {
      setIsLoading(true)
      const bookingData = {
        equipmentId: equipment._id,
        userEmail: user?.email,
        startDate: rentalStartDate,
        endDate: rentalEndDate,
        quantity,
        contactNumber,
        deliveryAddress,
        additionalNotes,
      }
      const result = await createBooking(bookingData)

      if (!result.data?.redirectUrl) {
        throw new Error('Stripe checkout URL not found')
      }

      window.location.href = result.data.redirectUrl
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )

      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            type='button'
            className='h-12 w-full cursor-pointer rounded-xl px-6 text-base font-semibold shadow-md shadow-primary/15 transition-all hover:shadow-lg'
          >
            Book Now
          </Button>
        }
      />

      <DialogContent className='flex max-h-[95vh] w-[95vw] max-w-5xl flex-col overflow-hidden rounded-3xl p-0'>
        <DialogHeader className='shrink-0 border-b border-border/70 px-5 py-5 pr-14 sm:px-8 sm:py-6 sm:pr-16'>
          <DialogTitle className='font-heading text-xl font-bold sm:text-2xl'>
            Book This Equipment
          </DialogTitle>

          <DialogDescription className='mt-1'>
            Add your rental details to prepare your booking.
          </DialogDescription>
        </DialogHeader>

        <form
          id='booking-form'
          noValidate
          onSubmit={handleBooking}
          className='flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7'
        >
          {/* Equipment Summary */}
          <div className='flex gap-4 rounded-2xl border border-border/80 bg-background/70 p-3 sm:gap-5 sm:p-4'>
            <div className='relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-28'>
              {equipment.image ? (
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  fill
                  unoptimized
                  sizes='112px'
                  className='object-cover'
                />
              ) : (
                <div className='flex size-full items-center justify-center text-muted-foreground'>
                  <ImageOff className='size-6' />
                </div>
              )}
            </div>

            <div className='min-w-0 flex-1 self-center'>
              <h3 className='truncate font-heading text-base font-bold sm:text-xl'>
                {equipment.name}
              </h3>

              <div className='mt-2 flex flex-wrap items-center gap-2'>
                <span className='font-heading text-lg font-bold text-primary sm:text-xl'>
                  ৳{equipment.rentalPrice.toLocaleString()}
                </span>

                <Badge className='border-accent/50 bg-accent/15 text-accent-foreground'>
                  / {equipment.rentalType?.toLowerCase() || 'daily'}
                </Badge>
              </div>

              <p className='mt-1.5 text-xs text-muted-foreground sm:text-sm'>
                {equipment.availableQuantity} units available
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className='grid gap-5 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='rental-start-date'>Rental Start Date</Label>
              <Input
                id='rental-start-date'
                type='date'
                min={new Date().toISOString().split('T')[0]}
                className='h-12'
                value={rentalStartDate}
                onChange={(e) => setRentalStartDate(e.target.value)}
              />
              {errors.rentalStartDate && (
                <p className='text-sm text-destructive'>
                  {errors.rentalStartDate}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='rental-end-date'>Rental End Date</Label>
              <Input
                id='rental-end-date'
                type='date'
                min={rentalStartDate}
                className='h-12'
                value={rentalEndDate}
                onChange={(e) => setRentalEndDate(e.target.value)}
              />
              {errors.rentalEndDate && (
                <p className='text-sm text-destructive'>
                  {errors.rentalEndDate}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='required-quantity'>Required Quantity</Label>
              <Input
                id='required-quantity'
                type='number'
                min='1'
                max={equipment.availableQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='h-12'
              />
              {errors.quantity && (
                <p className='text-sm text-destructive'>{errors.quantity}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='contact-number'>Contact Number</Label>
              <Input
                id='contact-number'
                type='tel'
                placeholder='e.g. +880 1XXX-XXXXXX'
                className='h-12'
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              {errors.contactNumber && (
                <p className='text-sm text-destructive'>
                  {errors.contactNumber}
                </p>
              )}
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <Label htmlFor='delivery-address'>Delivery Address</Label>
              <Textarea
                id='delivery-address'
                placeholder='Enter the complete delivery address'
                className='min-h-24 resize-y'
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              {errors.deliveryAddress && (
                <p className='text-sm text-destructive'>
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <Label>Total Amount</Label>

              <div className='flex h-18 items-center justify-between rounded-md border border-input bg-muted/50 px-3 font-semibold text-primary'>
                <span>Total</span>

                <span className='text-2xl text-accent'>
                  ৳{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <Label htmlFor='additional-notes'>Additional Notes</Label>
              <Textarea
                id='additional-notes'
                placeholder='Add any special instructions (optional)'
                className='min-h-24 resize-y'
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>
          </div>
        </form>

        <DialogFooter className='shrink-0 flex-row justify-end gap-3 border-t border-border/70 bg-background/50 px-5 py-4 sm:px-8'>
          <DialogClose
            render={
              <Button
                type='button'
                variant='outline'
                className='h-11 rounded-xl px-6'
              >
                Cancel
              </Button>
            }
          />

          <Button
            type='submit'
            form='booking-form'
            className='h-11 rounded-xl px-7 font-semibold shadow-sm'
            disabled={isLoading}
          >
            {isLoading ? 'Redirecting to checkout...' : 'Confirm Booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal

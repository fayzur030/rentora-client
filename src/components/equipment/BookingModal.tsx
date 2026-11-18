'use client'

import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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

interface BookingModalProps {
  equipment: Pick<
    Equipment,
    'name' | 'image' | 'rentalPrice' | 'rentalType' | 'availableQuantity'
  >
}

const BookingModal = ({ equipment }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            type='button'
            className='h-12 w-full rounded-xl px-6 text-base font-semibold shadow-md shadow-primary/15 transition-all hover:shadow-lg cursor-pointer'
          >
            Book Now
          </Button>
        }
      />

      <DialogContent className='w-full sm:w-4xl max-w-5xl lg:w-5xl max-h-[95vh] overflow-hidden rounded-3xl p-0 flex flex-col'>
        <DialogHeader className='shrink-0 border-b border-border/70 px-5 py-5 pr-14 sm:px-8 sm:py-6 sm:pr-16'>
          <DialogTitle className='font-heading text-xl font-bold sm:text-2xl'>
            Book This Equipment
          </DialogTitle>

          <DialogDescription className='mt-1'>
            Add your rental details to prepare your booking.
          </DialogDescription>
        </DialogHeader>

        <div className='flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7'>
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
                  / {equipment.rentalType.toLowerCase()}
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
              <Input id='rental-start-date' type='date' className='h-12' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='rental-end-date'>Rental End Date</Label>
              <Input id='rental-end-date' type='date' className='h-12' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='required-quantity'>Required Quantity</Label>
              <Input
                id='required-quantity'
                type='number'
                min='1'
                placeholder='Enter quantity'
                className='h-12'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='contact-number'>Contact Number</Label>
              <Input
                id='contact-number'
                type='tel'
                placeholder='e.g. +880 1XXX-XXXXXX'
                className='h-12'
              />
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <Label htmlFor='delivery-address'>Delivery Address</Label>
              <Textarea
                id='delivery-address'
                placeholder='Enter the complete delivery address'
                className='min-h-24 resize-y'
              />
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <Label htmlFor='additional-notes'>Additional Notes</Label>
              <Textarea
                id='additional-notes'
                placeholder='Add any special instructions (optional)'
                className='min-h-24 resize-y'
              />
            </div>
          </div>
        </div>

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
            type='button'
            className='h-11 rounded-xl px-7 font-semibold shadow-sm'
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal

'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CircleX,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react'
import { baseUrl } from '@/lib/config'
import { getSessionFromClient } from '@/lib/auth/getSessionFromClient'
import { getTokenFromClient } from '@/lib/auth/getTokenFromClient'

export default function BookingCancelPage() {
  const token = getTokenFromClient()
  const searchParams = useSearchParams()
  const intentId = searchParams.get('intent_id')

  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState('')

  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return

    if (!intentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('Checkout information was not found.')
      setIsProcessing(false)
      return
    }

    hasProcessed.current = true

    const cancelBooking = async () => {
      try {
        const token = await getTokenFromClient()

        if (!token) {
          throw new Error(
            'Authentication token not found. Please log in again.'
          )
        }

        const response = await fetch(
          `${baseUrl}/api/bookings/cancel-checkout/${intentId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Cancellation failed')
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        )
      } finally {
        setIsProcessing(false)
      }
    }

    cancelBooking()
  }, [intentId])

  return (
    <section className='relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
      <div className='absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-b from-[var(--secondary)]/7 to-transparent' />

      <div className='absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-[var(--secondary)]/8 blur-3xl' />

      <div className='mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl items-center justify-center'>
        <div className='w-full rounded-[2rem] border border-[var(--primary)]/8 bg-card p-5 shadow-card sm:p-8 md:p-10'>
          <div className='mx-auto max-w-xl text-center'>
            <div className='relative mx-auto mb-7 flex size-20 items-center justify-center'>
              <div className='absolute inset-0 rounded-full bg-[var(--secondary)]/8' />
              <div className='absolute inset-2 rounded-full bg-[var(--secondary)]/6' />

              <div className='relative flex size-16 items-center justify-center rounded-full border-4 border-primary-foreground bg-[var(--secondary)] text-primary-foreground shadow-lg shadow-[var(--secondary)]/20'>
                <CircleX className='size-8 stroke-[2.5]' />
              </div>
            </div>

            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/12 bg-[var(--secondary)]/6 px-3 py-1 text-xs font-bold tracking-[0.16em] text-[var(--secondary)] uppercase'>
              <RefreshCcw className='size-3.5' />
              Payment cancelled
            </div>

            <h1 className='text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl'>
              Your booking was not completed
            </h1>

            <p className='mx-auto mt-4 max-w-lg text-sm leading-7 text-[var(--muted-foreground)] sm:text-base'>
              No payment was confirmed. Your selected equipment is still
              available, and you can return whenever you&apos;re ready.
            </p>
          </div>

          {isProcessing && (
            <p className='mt-5 text-center text-sm font-medium text-muted-foreground'>
              Processing your cancellation...
            </p>
          )}

          {error && (
            <div className='mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-center'>
              <p className='text-sm font-medium text-destructive'>{error}</p>
            </div>
          )}

          <div className='my-8 grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 sm:grid-cols-2 sm:p-4'>
            <div className='flex items-center gap-3 rounded-xl bg-card p-4'>
              <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--secondary)]/7 text-[var(--secondary)]'>
                <CircleX className='size-5' />
              </div>

              <div>
                <p className='text-xs font-medium text-[var(--muted-foreground)]'>
                  Payment status
                </p>

                <p className='mt-0.5 text-sm font-bold text-[var(--foreground)]'>
                  Cancelled
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-xl bg-card p-4'>
              <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--success)]/8 text-[var(--success)]'>
                <ShieldCheck className='size-5' />
              </div>

              <div>
                <p className='text-xs font-medium text-[var(--muted-foreground)]'>
                  Security check
                </p>

                <p className='mt-0.5 text-sm font-bold text-[var(--foreground)]'>
                  No charge made
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-center'>
            <Link
              href='/all-equipments'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-card px-5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--primary)]/30 hover:bg-[var(--background)]'
            >
              <ArrowLeft className='size-4' />
              Back to equipment
            </Link>

            <Link
              href='/dashboard/customer/my-rentals'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5 hover:bg-[var(--primary)]'
            >
              View my rentals
              <ArrowRight className='size-4' />
            </Link>
          </div>

          <p className='mt-6 text-center text-xs leading-5 text-[var(--muted-foreground)]'>
            If you changed your mind, simply start a new booking when
            you&apos;re ready.
          </p>
        </div>
      </div>
    </section>
  )
}

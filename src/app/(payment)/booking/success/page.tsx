import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, CircleCheck, PackageCheck, ReceiptText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Successful',
  description: 'Your Rentora payment was successful and your booking was received.',
}

const SuccessPage = () => {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-b from-[var(--primary)]/8 to-transparent" />
      <div className="absolute -top-28 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-[var(--primary)]/8 bg-card p-5 shadow-card sm:p-8 md:p-10">
          <div className="mx-auto max-w-xl text-center">
            <div className="relative mx-auto mb-7 flex size-20 items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--success)]/12" />
              <div className="absolute inset-2 rounded-full bg-[var(--success)]/10" />
              <div className="relative flex size-16 items-center justify-center rounded-full border-4 border-primary-foreground bg-[var(--success)] text-primary-foreground shadow-lg shadow-[var(--success)]/25">
                <Check className="size-8 stroke-[3]" />
              </div>
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--success)]/15 bg-[var(--success)]/8 px-3 py-1 text-xs font-bold tracking-[0.16em] text-[var(--success)] uppercase">
              <CircleCheck className="size-3.5" />
              Payment successful
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Your rental is confirmed
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
              Thank you for your payment. Your booking has been received and is now waiting for the owner&apos;s next step.
            </p>
          </div>

          <div className="my-8 grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 sm:grid-cols-2 sm:p-4">
            <div className="flex items-center gap-3 rounded-xl bg-card p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/7 text-[var(--primary)]">
                <ReceiptText className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--muted-foreground)]">Booking status</p>
                <p className="mt-0.5 text-sm font-bold text-[var(--foreground)]">Confirmed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/12 text-[var(--warning)]">
                <PackageCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--muted-foreground)]">Next step</p>
                <p className="mt-0.5 text-sm font-bold text-[var(--foreground)]">View your rental</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/all-equipments"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-card px-5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--primary)]/30 hover:bg-[var(--background)]"
            >
              Browse equipment
            </Link>
            <Link
              href="/dashboard/customer/my-rentals"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5 hover:bg-[var(--primary)]"
            >
              View my rentals
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-[var(--muted-foreground)]">
            A copy of your booking details may be available in your rentals dashboard.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SuccessPage

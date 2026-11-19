import Link from 'next/link'
import { ArrowRight, Check, CircleCheck, PackageCheck, ReceiptText } from 'lucide-react'

const SuccessPage = () => {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-b from-[#431D28]/8 to-transparent" />
      <div className="absolute -top-28 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-[#F5A623]/10 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-[#431D28]/8 bg-white p-5 shadow-[0_24px_70px_-32px_rgba(67,29,40,0.32)] sm:p-8 md:p-10">
          <div className="mx-auto max-w-xl text-center">
            <div className="relative mx-auto mb-7 flex size-20 items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#3A8064]/12" />
              <div className="absolute inset-2 rounded-full bg-[#3A8064]/10" />
              <div className="relative flex size-16 items-center justify-center rounded-full border-4 border-white bg-[#3A8064] text-white shadow-lg shadow-[#3A8064]/25">
                <Check className="size-8 stroke-[3]" />
              </div>
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#3A8064]/15 bg-[#3A8064]/8 px-3 py-1 text-xs font-bold tracking-[0.16em] text-[#3A8064] uppercase">
              <CircleCheck className="size-3.5" />
              Payment successful
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#30252A] sm:text-4xl">
              Your rental is confirmed
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#7D7174] sm:text-base">
              Thank you for your payment. Your booking has been received and is now waiting for the owner&apos;s next step.
            </p>
          </div>

          <div className="my-8 grid gap-3 rounded-2xl border border-[#E8DDD2] bg-[#FAF7F2] p-3 sm:grid-cols-2 sm:p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#431D28]/7 text-[#431D28]">
                <ReceiptText className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#9A8E90]">Booking status</p>
                <p className="mt-0.5 text-sm font-bold text-[#30252A]">Confirmed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F5A623]/12 text-[#B87509]">
                <PackageCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#9A8E90]">Next step</p>
                <p className="mt-0.5 text-sm font-bold text-[#30252A]">View your rental</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/all-equipments"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E0D3C8] bg-white px-5 text-sm font-bold text-[#4A3540] transition hover:border-[#431D28]/30 hover:bg-[#FAF7F2]"
            >
              Browse equipment
            </Link>
            <Link
              href="/dashboard/customer/my-rentals"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#431D28] px-5 text-sm font-bold text-white shadow-lg shadow-[#431D28]/15 transition hover:-translate-y-0.5 hover:bg-[#562735]"
            >
              View my rentals
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-[#A29899]">
            A copy of your booking details may be available in your rentals dashboard.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SuccessPage

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Cancelled',
  description: 'Your checkout was cancelled. You can return to Rentora to continue browsing.',
}

export default function BookingCancelLayout({ children }: { children: React.ReactNode }) {
  return children
}

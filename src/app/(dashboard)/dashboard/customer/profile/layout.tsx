import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Profile',
  description: 'View and update your Rentora customer profile information.',
}

export default function CustomerProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}

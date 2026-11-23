import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Owner Profile',
  description: 'View and update your Rentora owner profile information.',
}

export default function OwnerProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}

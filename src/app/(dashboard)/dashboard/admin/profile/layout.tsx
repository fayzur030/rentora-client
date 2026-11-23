import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Profile',
  description: 'View and update your Rentora admin profile information.',
}

export default function AdminProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}

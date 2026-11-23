import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create an Account',
  description: 'Create a Rentora account to rent equipment or list equipment for rent.',
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}

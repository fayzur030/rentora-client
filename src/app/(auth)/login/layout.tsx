import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Rentora account to manage rentals and equipment.',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}

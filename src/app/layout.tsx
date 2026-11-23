import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import ThemeProvider from '@/components/theme-provider'
import ThemeToaster from '@/components/shared/ThemeToaster'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Rentora | Equipment Rentals',
    template: '%s | Rentora',
  },
  description:
    'Find and rent quality equipment for projects, events, and everyday needs with Rentora.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col font-sans antialiased'>
        <ThemeProvider>
          {children}
          <ThemeToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

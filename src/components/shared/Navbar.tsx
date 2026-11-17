'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Equipment', href: '/equipment' },
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact Us', href: '/contact' },
]

const loginLinkClass =
  'inline-flex h-11 items-center justify-center rounded-lg border border-white/60 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20'

const registerLinkClass =
  'inline-flex h-11 items-center justify-center rounded-lg bg-[#F5A623] px-4 text-sm font-medium text-[#2b1a12] transition-colors hover:bg-[#d99a1f]'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur bg-[#2b1a12]'
    >
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Logo />

        {/* Desktop navigation links */}
        <ul className='hidden items-center gap-8 md:flex'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isLinkActive(link.href)
                    ? 'text-[#F5A623] border-b-2 border-[#F5A623]'
                    : 'text-white hover:text-white/80'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth buttons */}
        <div className='hidden items-center gap-3 md:flex'>
          <Link href='/login' className={loginLinkClass}>
            Login
          </Link>
          <Link href='/register' className={registerLinkClass}>
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type='button'
          onClick={() => setMenuOpen(true)}
          className='inline-flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden'
          aria-label='Open navigation menu'
        >
          <Menu className='size-5' />
        </button>
      </nav>

      {/* Mobile navigation sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side='right' className='bg-black/60'>
          <SheetHeader>
            <SheetTitle className='text-white'>Menu</SheetTitle>
          </SheetHeader>
          <ul className='flex flex-1 flex-col gap-1 px-4'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isLinkActive(link.href)
                      ? 'text-[#F5A623] border-b-2 border-[#F5A623]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <SheetFooter>
            <div className='flex w-full flex-col gap-2'>
              <Link
                href='/login'
                onClick={() => setMenuOpen(false)}
                className={`${loginLinkClass} w-full`}
              >
                Login
              </Link>
              <Link
                href='/register'
                onClick={() => setMenuOpen(false)}
                className={`${registerLinkClass} w-full`}
              >
                Register
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}

export default Navbar

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, LogOut, Menu } from 'lucide-react'
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
  'inline-flex h-10 items-center gap-2 justify-center rounded-lg border border-white/40 bg-white/5 px-5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/70 hover:bg-white/10'

const registerLinkClass =
  'inline-flex h-10 items-center gap-1 justify-center rounded-lg bg-[#F5A623] px-5 text-sm font-semibold text-[#2b1a12] transition-all duration-200 hover:bg-[#d99a1f]'

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
      className='sticky top-0 z-50 w-full border-b border-white/10 bg-[#2b1a12] backdrop-blur-xl'
    >
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-19 lg:px-8'>
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <ul className='hidden items-center gap-6 lg:flex xl:gap-8'>
          {navLinks.map((link) => {
            const active = isLinkActive(link.href)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-[#F5A623]'
                      : 'text-white/85 hover:text-[#F5A623]'
                  }`}
                >
                  {link.label}

                  {active && (
                    <motion.span
                      layoutId='navbar-active-indicator'
                      className='absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#F5A623]'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className='hidden items-center gap-3 lg:flex'>
          <Link href='/login' className={loginLinkClass}>
            <LogOut size={16} /> Login
          </Link>

          <Link href='/register' className={registerLinkClass}>
            Register <ArrowRight />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type='button'
          onClick={() => setMenuOpen(true)}
          className='inline-flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden'
          aria-label='Open navigation menu'
          aria-expanded={menuOpen}
        >
          <Menu className='size-5' />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side='right'
          className='flex w-[85%] flex-col border-l border-white/10 bg-[#171411] p-0 text-white sm:max-w-sm'
        >
          <SheetHeader className='border-b border-white/10 px-6 py-5 text-left'>
            <SheetTitle className='text-lg font-bold text-white'>
              Navigation Menu
            </SheetTitle>
          </SheetHeader>

          <ul className='flex flex-1 flex-col gap-1 px-4 py-5'>
            {navLinks.map((link) => {
              const active = isLinkActive(link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#F5A623]/10 text-[#F5A623]'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <SheetFooter className='border-t border-white/10 p-6'>
            <div className='flex w-full flex-col gap-3'>
              <Link
                href='/login'
                onClick={() => setMenuOpen(false)}
                className={`${loginLinkClass} w-full`}
              >
                <LogOut size={16} /> Login
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

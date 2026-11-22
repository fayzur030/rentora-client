'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import NavLink from './NavLink'
import NavAuth from './NavAuth'
import MobileMenu from './MobileMenu'
import ThemeToggle from '@/components/shared/ThemeToggle'

// Main navigation links - used by the top bar and the mobile menu
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Equipment', href: '/all-equipments' },
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact Us', href: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='sticky top-0 z-50 w-full border-b border-nav-border bg-nav-background text-nav-foreground shadow-sm backdrop-blur-xl'
    >
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-19 lg:px-8'>
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <ul className='hidden items-center gap-6 lg:flex xl:gap-8'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} variant='desktop' />
            </li>
          ))}
        </ul>

        {/* Desktop Auth: Login / Register or profile avatar */}
        <div className='hidden items-center gap-3 lg:flex'>
          <ThemeToggle className='text-nav-foreground hover:bg-nav-foreground/10 hover:text-nav-foreground' />
          <NavAuth variant='desktop' />
        </div>

        {/* Mobile Menu Button */}
        <button
          type='button'
          onClick={() => setMenuOpen(true)}
          className='inline-flex size-10 items-center justify-center rounded-lg border border-nav-border bg-nav-foreground/5 text-nav-foreground transition-colors hover:bg-nav-foreground/10 lg:hidden'
          aria-label='Open navigation menu'
          aria-expanded={menuOpen}
        >
          <Menu className='size-5' />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
      />
    </motion.header>
  )
}

export default Navbar

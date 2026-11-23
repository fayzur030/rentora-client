'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
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
  // { label: 'How It Works', href: '/how-it-works' },
  // { label: 'Contact Us', href: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isHeroOverlay = isHomePage && !isScrolled

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 50)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [pathname])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`${isHomePage ? 'fixed top-0' : 'sticky top-0'} z-50 w-full border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${isHeroOverlay ? 'border-transparent bg-nav-background text-nav-overlay-foreground shadow-none' : 'border-nav-scrolled-border bg-nav-scrolled text-nav-scrolled-foreground shadow-sm'}`}
    >
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-19 lg:px-8'>
        {/* Logo */}
        <Logo darkText={!isHeroOverlay} />

        {/* Desktop Navigation */}
        <ul className='hidden items-center gap-6 lg:flex xl:gap-8'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                variant='desktop'
                isOnHero={isHeroOverlay}
              />
            </li>
          ))}
        </ul>

        {/* Desktop Auth: Login / Register or profile avatar */}
        <div className='hidden items-center gap-3 lg:flex'>
          <ThemeToggle
            className={
              isHeroOverlay
                ? 'text-nav-overlay-foreground hover:bg-nav-overlay-control-hover hover:text-nav-overlay-foreground'
                : 'text-nav-scrolled-foreground hover:bg-nav-scrolled-hover hover:text-nav-scrolled-foreground'
            }
          />
          <NavAuth variant='desktop' darkBackground={isHeroOverlay} />
        </div>

        {/* Mobile Menu Button */}
        <button
          type='button'
          onClick={() => setMenuOpen(true)}
          className={`inline-flex size-10 items-center justify-center rounded-lg border transition-colors lg:hidden ${isHeroOverlay ? 'border-nav-overlay-border bg-nav-overlay-control text-nav-overlay-foreground hover:bg-nav-overlay-control-hover' : 'border-nav-scrolled-border bg-card text-nav-scrolled-foreground hover:bg-nav-scrolled-hover'}`}
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

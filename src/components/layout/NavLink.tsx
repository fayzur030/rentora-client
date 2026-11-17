'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface NavLinkProps {
  href: string
  label: string
  // "desktop" = top bar, "mobile" = inside the slide-in menu
  variant: 'desktop' | 'mobile'
  // Used by the mobile menu so it can close itself after a click
  onClick?: () => void
}

const NavLink = ({ href, label, variant, onClick }: NavLinkProps) => {
  const pathname = usePathname()

  // The Home link only counts as active on the exact same path
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Top bar style with the animated underline
  if (variant === 'desktop') {
    return (
      <Link
        href={href}
        className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-[#F5A623]' : 'text-white/85 hover:text-[#F5A623]'
        }`}
      >
        {label}

        {isActive && (
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
    )
  }

  // Slide-in menu style
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[#F5A623]/10 text-[#F5A623]'
          : 'text-white/80 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  )
}

export default NavLink

'use client'

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import NavLink from './NavLink'
import NavAuth from './NavAuth'

interface NavItem {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  // The link list comes from the Navbar
  navLinks: NavItem[]
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side='right'
        className='flex w-[85%] flex-col border-l border-white/10 bg-[#171411] p-0 text-white sm:max-w-sm'
      >
        <SheetHeader className='border-b border-white/10 px-6 py-5 text-left'>
          <SheetTitle className='text-lg font-bold text-white'>
            Navigation Menu
          </SheetTitle>
        </SheetHeader>

        {/* Navigation links - the menu closes after a click */}
        <ul className='flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                variant='mobile'
                onClick={onClose}
              />
            </li>
          ))}
        </ul>

        {/* Login / Register for guests, profile avatar for users */}
        <SheetFooter className='border-t border-white/10 p-6'>
          <NavAuth variant='mobile' onNavigate={onClose} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu

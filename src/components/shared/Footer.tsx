import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from '@/components/shared/Logo'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Equipment', href: '/all-equipments' },
  { label: 'Categories', href: '/categories' },
  { label: 'How It Works', href: '/how-it-works' },
]

const accountLinks = [
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
  { label: 'Dashboard', href: '/dashboard' },
]

const Footer = () => {
  return (
    <footer className='border-t border-white/10 bg-[#2b1a12] text-white mt-'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='sm:col-span-2 lg:col-span-1'>
            <Logo />
            <p className='mt-5 max-w-xs text-sm leading-7 text-[#CABCAF]'>
              Rent quality equipment with confidence. Simple booking,
              transparent pricing, and trusted owners in one place.
            </p>
          </div>

          <div>
            <h2 className='font-heading text-base font-bold'>Explore</h2>
            <ul className='mt-5 space-y-3'>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-[#CABCAF] transition-colors hover:text-[#F5A623]'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='font-heading text-base font-bold'>Account</h2>
            <ul className='mt-5 space-y-3'>
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-sm text-[#CABCAF] transition-colors hover:text-[#F5A623]'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='font-heading text-base font-bold'>Contact</h2>
            <ul className='mt-5 space-y-4'>
              <li className='flex items-start gap-3 text-sm text-[#CABCAF]'>
                <MapPin className='mt-0.5 size-4 shrink-0 text-[#F5A623]' />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li>
                <a
                  href='tel:+8801700000000'
                  className='flex items-center gap-3 text-sm text-[#CABCAF] transition-colors hover:text-[#F5A623]'
                >
                  <Phone className='size-4 shrink-0 text-[#F5A623]' />
                  <span>+880 17*********</span>
                </a>
              </li>
              <li>
                <a
                  href='mailto:support@rentora.com'
                  className='flex items-center gap-3 text-sm text-[#CABCAF] transition-colors hover:text-[#F5A623]'
                >
                  <Mail className='size-4 shrink-0 text-[#F5A623]' />
                  <span>support@rentora.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#A99D91] sm:flex-row sm:items-center sm:justify-between'>
          <p>© {new Date().getFullYear()} Rentora. All rights reserved.</p>
          <p>Built for reliable equipment rentals.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
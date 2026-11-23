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
  // { label: 'Dashboard', href: '/dashboard' },
]

const socialLinks = [
  { label: 'X (Twitter)', shortLabel: 'X', href: 'https://x.com' },
  { label: 'Google', shortLabel: 'G', href: 'https://www.google.com' },
  { label: 'LinkedIn', shortLabel: 'in', href: 'https://www.linkedin.com' },
]

const Footer = () => {
  return (
    <footer className='border-t mt-14 border-brand-foreground/10 bg-[var(--brand-ink)] text-brand-foreground mt-'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='sm:col-span-2 lg:col-span-1'>
            <Logo />
            <p className='mt-5 max-w-xs text-sm leading-7 text-brand-foreground/75'>
              Rent quality equipment with confidence. Simple booking,
              transparent pricing, and trusted owners in one place.
            </p>
            <div className='mt-6 flex items-center gap-3' aria-label='Social links'>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={`Visit Rentora on ${social.label}`}
                  className='flex size-10 items-center justify-center rounded-full border border-brand-foreground/15 bg-brand-foreground/5 text-sm font-bold text-brand-foreground/80 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--brand-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                >
                  {social.shortLabel}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className='font-heading text-base font-bold'>Explore</h2>
            <ul className='mt-5 space-y-3'>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-brand-foreground/75 transition-colors hover:text-[var(--accent)]'
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
                    className='text-sm text-brand-foreground/75 transition-colors hover:text-[var(--accent)]'
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
              <li className='flex items-start gap-3 text-sm text-brand-foreground/75'>
                <MapPin className='mt-0.5 size-4 shrink-0 text-[var(--accent)]' />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li>
                <a
                  href='tel:+8801700000000'
                  className='flex items-center gap-3 text-sm text-brand-foreground/75 transition-colors hover:text-[var(--accent)]'
                >
                  <Phone className='size-4 shrink-0 text-[var(--accent)]' />
                  <span>+880 17*********</span>
                </a>
              </li>
              <li>
                <a
                  href='mailto:support@rentora.com'
                  className='flex items-center gap-3 text-sm text-brand-foreground/75 transition-colors hover:text-[var(--accent)]'
                >
                  <Mail className='size-4 shrink-0 text-[var(--accent)]' />
                  <span>support@rentora.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-3 border-t border-brand-foreground/10 pt-6 text-xs text-brand-foreground/75 sm:flex-row sm:items-center sm:justify-between'>
          <p>© {new Date().getFullYear()} Rentora. All rights reserved.</p>
          <p>Created by Md. Fayzur Rahman</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

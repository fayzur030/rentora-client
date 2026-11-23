import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CalendarDays,
  Handshake,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn how Rentora connects equipment owners with people who need quality equipment for a short-term rental.',
}

const values = [
  {
    icon: Boxes,
    title: 'Access over ownership',
    description:
      'Find useful equipment for the job at hand, without needing to buy and store every item yourself.',
  },
  {
    icon: BadgeCheck,
    title: 'Clear information',
    description:
      'Browse equipment details, rental rates, availability, and owner information before you book.',
  },
  {
    icon: CalendarDays,
    title: 'Flexible rental periods',
    description:
      'Choose a rental period that works for your project, whether it takes a day, a week, or longer.',
  },
  {
    icon: Handshake,
    title: 'A marketplace for everyone',
    description:
      'Rentora brings equipment owners and renters together through one straightforward marketplace.',
  },
]

export default function AboutPage() {
  return (
    <div className='bg-background'>
      <section className='relative isolate overflow-hidden bg-[var(--brand-ink)] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -right-32 -top-36 -z-10 size-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl'
        />
        <div className='mx-auto max-w-7xl'>
          <p className='inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]'>
            About Rentora
          </p>
          <h1 className='mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl'>
            Good equipment should be{' '}
            <span className='text-[var(--accent)]'>within reach.</span>
          </h1>
          <p className='mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8'>
            Rentora is an equipment rental marketplace that helps people find
            what they need for projects, events, work, and everyday plans—while
            giving owners a place to share equipment with their community.
          </p>
          <Link
            href='/all-equipments'
            className='group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 text-sm font-bold text-[var(--brand-ink)] shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-ink)]'
          >
            Explore equipment
            <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden='true' />
          </Link>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
        <div className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-[var(--warning)]'>
              Why we are here
            </p>
            <h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Make renting feel simple.
            </h2>
          </div>
          <div className='space-y-4 text-sm leading-7 text-muted-foreground sm:text-base'>
            <p>
              Many useful tools and machines are needed only for a short time.
              Buying them can be expensive, and finding a reliable rental can
              take more effort than it should.
            </p>
            <p>
              Rentora makes it easier to discover available equipment, compare
              the details that matter, and arrange a rental in one place. Owners
              can list their equipment, and renters can choose options that fit
              their needs and schedule.
            </p>
          </div>
        </div>

        <div className='mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4'>
          {values.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-lg sm:p-6'
            >
              <div className='flex items-center justify-between'>
                <span className='flex size-11 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--warning)]'>
                  <Icon className='size-5' aria-hidden='true' />
                </span>
                <span className='font-heading text-xs font-bold tracking-[0.16em] text-muted-foreground/60'>
                  0{index + 1}
                </span>
              </div>
              <h3 className='mt-6 font-heading text-lg font-bold tracking-tight text-foreground'>
                {title}
              </h3>
              <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

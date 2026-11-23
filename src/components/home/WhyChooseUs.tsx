'use client'

import { motion, MotionConfig } from 'framer-motion'
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    number: '01',
    title: 'Spend less, get more done',
    description:
      'Find the right equipment for your budget and keep your project moving without the cost of buying it outright.',
    icon: WalletCards,
  },
  {
    number: '02',
    title: 'Rent from reviewed owners',
    description:
      'Browse approved equipment listings with clear owner and equipment details before you book.',
    icon: BadgeCheck,
  },
  {
    number: '03',
    title: 'Choose the time you need',
    description:
      'Book by the day, week, or month, with rental periods that fit the pace of your work.',
    icon: CalendarClock,
  },
  {
    number: '04',
    title: 'Pay with confidence',
    description:
      'Use secure checkout and keep your booking and payment details together in one place.',
    icon: ShieldCheck,
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

const WhyChooseUs = () => {
  return (
    <MotionConfig reducedMotion='user'>
      <section className='px-4 py-14 sm:px-6 sm:py-20 lg:px-8'>
        <div className='relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-hero-start text-hero-foreground shadow-2xl shadow-primary/10'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute -right-28 -top-36 size-96 rounded-full bg-hero-accent/10 blur-3xl'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute -bottom-48 -left-24 size-96 rounded-full bg-secondary/25 blur-3xl'
          />

          <div className='relative p-6 sm:p-10 lg:p-14'>
            <div className='grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14'>
              <motion.div
                initial='hidden'
                whileInView='show'
                viewport={{ once: true, amount: 0.25 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
                className='flex flex-col items-start justify-center'
              >
                <motion.span
                  variants={itemVariants}
                  className='inline-flex items-center gap-2 rounded-full border border-hero-foreground/15 bg-hero-foreground/5 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-hero-accent'
                >
                  <span className='size-1.5 rounded-full bg-hero-accent' />
                  A better way to rent
                </motion.span>
                <motion.h2
                  variants={itemVariants}
                  className='mt-6 max-w-lg font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl'
                >
                  Why Choose{' '}
                  <span className='text-hero-accent'>Rentora?</span>
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className='mt-5 max-w-md text-sm leading-7 text-hero-muted sm:text-base'
                >
                  Rent smarter and get more done. Discover the benefits that make
                  finding, booking, and paying for equipment easier.
                </motion.p>
                <motion.div variants={itemVariants} className='mt-8'>
                  <Link
                    href='/all-equipments'
                    className='group inline-flex items-center gap-2 rounded-full bg-hero-accent px-5 py-3 text-sm font-bold text-primary shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-accent focus-visible:ring-offset-2 focus-visible:ring-offset-hero-start'
                  >
                    Find your equipment
                    <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' aria-hidden='true' />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial='hidden'
                whileInView='show'
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                }}
                className='grid gap-3 sm:grid-cols-2 sm:gap-4'
              >
                {benefits.map((benefit) => {
                  const Icon = benefit.icon

                  return (
                    <motion.article
                      key={benefit.number}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className='group relative overflow-hidden rounded-2xl border border-hero-foreground/10 bg-hero-foreground/[0.06] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-hero-accent/40 hover:bg-hero-foreground/[0.09] sm:p-6'
                    >
                      <span className='absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-hero-accent transition-transform duration-300 group-hover:scale-x-100' />
                      <div className='flex items-center justify-between'>
                        <span className='flex size-11 items-center justify-center rounded-xl bg-hero-accent text-primary shadow-lg shadow-black/10 transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105'>
                          <Icon className='size-5' aria-hidden='true' />
                        </span>
                        <span className='font-heading text-xs font-bold tracking-[0.14em] text-hero-muted/60'>
                          {benefit.number}
                        </span>
                      </div>
                      <h3 className='mt-6 font-heading text-lg font-bold text-hero-foreground'>
                        {benefit.title}
                      </h3>
                      <p className='mt-2 text-sm leading-6 text-hero-muted'>
                        {benefit.description}
                      </p>
                    </motion.article>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default WhyChooseUs

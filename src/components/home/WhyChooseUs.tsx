'use client'

import { motion, MotionConfig } from 'framer-motion'
import { BadgeCheck, CalendarClock, ShieldCheck, WalletCards } from 'lucide-react'

const benefits = [
  {
    title: 'Affordable rental prices',
    description:
      'Choose equipment that fits your project and budget without the cost of buying it outright.',
    icon: WalletCards,
  },
  {
    title: 'Verified equipment owners',
    description:
      'Rent with confidence from owners and listings that have been reviewed through Rentora.',
    icon: BadgeCheck,
  },
  {
    title: 'Flexible rental periods',
    description:
      'Book by the day, week, or month and only rent for as long as your project needs.',
    icon: CalendarClock,
  },
  {
    title: 'Secure payments',
    description:
      'Complete your rental through a protected checkout with clear booking and payment records.',
    icon: ShieldCheck,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

const WhyChooseUs = () => {
  return (
    <MotionConfig reducedMotion='user'>
      <section className='py-16 sm:py-20'>
        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className='mx-auto max-w-2xl text-center'
          >
            <motion.p
              variants={cardVariants}
              className='text-xs font-bold uppercase tracking-[0.18em] text-primary'
            >
              Why choose Rentora
            </motion.p>
            <motion.h2
              variants={cardVariants}
              className='mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl'
            >
              Everything you need to rent with confidence
            </motion.h2>
            <motion.p
              variants={cardVariants}
              className='mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base'
            >
              A simpler way to find reliable equipment, book flexible rental
              periods, and keep every transaction protected.
            </motion.p>
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className='mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <motion.article
                  key={benefit.title}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className='group rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5 sm:p-6'
                >
                  <div className='flex size-11 items-center justify-center rounded-xl bg-accent/15 text-primary ring-1 ring-accent/20 transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground'>
                    <Icon className='size-5' aria-hidden='true' />
                  </div>
                  <h3 className='mt-5 font-heading text-base font-bold text-foreground'>
                    {benefit.title}
                  </h3>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                    {benefit.description}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default WhyChooseUs

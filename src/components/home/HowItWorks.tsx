'use client'

import { motion, MotionConfig } from 'framer-motion'
import { CreditCard, PackageCheck, Search } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Find Your Equipment',
    description:
      'Explore a wide range of quality equipment and find exactly what you need for your next project.',
    icon: Search,
    cardStyle:
      'border-white/10 from-white/[0.08] via-white/[0.04] to-white/[0.02] hover:border-[var(--accent)]/45',
    iconStyle: 'bg-[var(--accent)] text-[var(--brand-ink)]',
  },
  {
    number: '02',
    title: 'Book & Pay Securely',
    description:
      'Choose your rental dates, provide your details, and complete your booking with secure online payment.',
    icon: CreditCard,
    cardStyle:
      'border-[var(--accent)]/25 from-[var(--accent)]/15 via-white/[0.05] to-white/[0.02] hover:border-[var(--accent)]/55',
    iconStyle: 'bg-[var(--accent)] text-[var(--brand-ink)]',
  },
  {
    number: '03',
    title: 'Get & Enjoy',
    description:
      'Receive your equipment, get your work done, and return it when your rental period ends.',
    icon: PackageCheck,
    cardStyle:
      'border-white/10 from-white/[0.08] via-white/[0.04] to-white/[0.02] hover:border-[var(--accent)]/45',
    iconStyle: 'bg-[var(--accent)] text-[var(--brand-ink)]',
  },
]

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const HowItWorks = () => {
  return (
    <MotionConfig reducedMotion='user'>
      <section className='relative isolate overflow-hidden bg-[var(--brand-ink)] py-20 sm:py-24 lg:py-28'>
        <div
          className='pointer-events-none absolute -left-28 top-16 -z-10 size-80 rounded-full bg-[var(--accent)]/10 blur-3xl'
          aria-hidden='true'
        />
        <div
          className='pointer-events-none absolute -right-20 bottom-0 -z-10 size-96 rounded-full bg-sky-300/10 blur-3xl'
          aria-hidden='true'
        />

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
              variants={stepVariants}
              className='inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent)] sm:text-xs'
            >
              <span className='size-1.5 rounded-full bg-[var(--accent)]' aria-hidden='true' />
              A smoother way to rent
            </motion.p>
            <motion.h2
              variants={stepVariants}
              className='mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={stepVariants}
              className='mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base'
            >
              Renting the right equipment has never been easier. Get started in
              just three simple steps.
            </motion.p>
          </motion.div>

          <div className='relative mt-16 sm:mt-20'>
            <div
              className='pointer-events-none absolute left-[16.7%] right-[16.7%] top-0 hidden h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent lg:block'
              aria-hidden='true'
            />

            <motion.ol
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
              className='grid list-none grid-cols-1 gap-12 p-0 lg:grid-cols-3 lg:gap-6'
            >
              {steps.map((step) => {
                const Icon = step.icon

                return (
                  <motion.li
                    key={step.number}
                    variants={stepVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`group relative rounded-3xl border bg-gradient-to-br p-6 pt-12 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_25px_70px_-35px_rgba(233,168,58,0.25)] sm:p-8 sm:pt-14 ${step.cardStyle}`}
                  >
                    <span
                      className='pointer-events-none absolute right-5 top-3 select-none font-heading text-7xl font-extrabold leading-none tracking-tighter text-white/[0.07] sm:right-7 sm:top-4 sm:text-8xl'
                      aria-hidden='true'
                    >
                      {step.number}
                    </span>

                    <div className='absolute -top-9 left-1/2 z-10 flex size-[4.5rem] -translate-x-1/2 items-center justify-center rounded-2xl border border-primary-foreground/80 bg-card shadow-lg shadow-primary/10 ring-1 ring-border/70'>
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl shadow-lg shadow-black/15 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 ${step.iconStyle}`}
                      >
                        <Icon className='size-5' aria-hidden='true' />
                      </div>
                    </div>

                    <div className='relative text-center'>
                      <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]'>
                        {step.number}
                      </p>
                      <h3 className='mt-3 font-heading text-lg font-bold tracking-tight text-white sm:text-xl'>
                        {step.title}
                      </h3>
                      <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-white/60'>
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default HowItWorks

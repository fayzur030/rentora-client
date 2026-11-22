'use client'

import { motion, MotionConfig } from 'framer-motion'
import Link from 'next/link'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const fadeDownVariants = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const Hero = () => {
  return (
    <MotionConfig reducedMotion='user'>
      <section className='relative w-full overflow-hidden'>
        {/* Brand gradient background */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className='absolute inset-0 bg-linear-to-br from-hero-start via-hero-mid to-hero-end'
        >
          <div className='absolute -right-24 -top-32 size-[28rem] rounded-full bg-hero-accent/10 blur-3xl' />
          <div className='absolute -bottom-48 left-[12%] size-[32rem] rounded-full bg-secondary/20 blur-3xl' />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className='absolute inset-0 bg-linear-to-r from-hero-start/25 via-transparent to-transparent'
          />
        </motion.div>

        {/* Hero Content */}
        <div className='relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:justify-start lg:px-8 lg:text-left'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='show'
            className='flex w-full flex-col items-center lg:items-start'
          >
            {/* Badge */}
            <motion.div variants={fadeDownVariants}>
              <span className='inline-flex items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-hero-foreground/90 backdrop-blur-sm sm:px-4 sm:text-xs md:text-sm'>
                Your Trusted Rental Marketplace
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className='mt-6 max-w-4xl text-balance font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-hero-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
            >
              Quality Equipment,
              <span className='mt-1 block text-hero-accent'>
                Easy Rentals, Anytime!
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className='mt-5 max-w-xl text-pretty text-sm leading-relaxed text-hero-muted sm:mt-6 sm:text-base md:text-lg'
            >
              Rent quality equipment and everyday essentials with ease. Save
              time, spend less, and get what you need when you need it.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className='mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4'
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className='w-full sm:w-auto'
              >
                <Link
                  href='/all-equipments'
                  className='inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--accent)] px-7 text-sm font-semibold text-[var(--brand-ink)] transition-colors hover:bg-[var(--accent)] sm:w-auto'
                >
                  Explore Rentals
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className='w-full sm:w-auto'
              >
                <Link
                  href='/add-equipment'
                  className='inline-flex h-12 w-full items-center justify-center rounded-lg border border-hero-foreground/40 bg-hero-foreground/5 px-7 text-sm font-semibold text-hero-foreground backdrop-blur-sm transition-colors hover:bg-hero-foreground/10 sm:w-auto'
                >
                  List Your Equipment
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Hero

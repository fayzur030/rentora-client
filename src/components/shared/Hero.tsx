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
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-[url('/images/banner_bg.png')] bg-cover bg-center"
        >
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className='absolute inset-0 bg-linear-to-r from-[#140c10]/90 via-[#140c10]/75 to-[#140c10]/50'
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
              <span className='inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm sm:px-4 sm:text-xs md:text-sm'>
                Your Trusted Rental Marketplace
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className='mt-6 max-w-4xl text-balance font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
            >
              Quality Equipment,
              <span className='mt-1 block text-[#F5A623]'>
                Easy Rentals, Anytime!
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className='mt-5 max-w-xl text-pretty text-sm leading-relaxed text-[#CABCAF] sm:mt-6 sm:text-base md:text-lg'
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
                  href='/equipment'
                  className='inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#F5A623] px-7 text-sm font-semibold text-[#2b1a12] transition-colors hover:bg-[#d99a1f] sm:w-auto'
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
                  className='inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/50 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto'
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

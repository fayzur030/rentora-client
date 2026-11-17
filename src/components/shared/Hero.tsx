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
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-[url('/images/banner_bg.png')] bg-cover bg-center "
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className='absolute inset-0'
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(20, 12, 16, 0.85), rgba(20, 12, 16, 0.55))',
            }}
          />
        </motion.div>

        <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:items-start items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='show'
            className='flex w-full flex-col items-center text-center lg:items-start lg:text-left'
          >
            {/* Badge */}
            <motion.div variants={fadeDownVariants}>
              <span className='inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/90 sm:text-sm'>
                Your Trusted Rental Marketplace
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className='mt-6  font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl'
            >
              Quality Equipment,
              <span className='block text-[#F5A623]'>
                Easy Rentals, Anytime!
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className='mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg'
            >
              Find quality equipment and everyday essentials for every need.
              Rent easily, save money, and get things done with — Rentora.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className='mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row'
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className='w-full sm:w-auto'
              >
                <Link
                  href='/equipment'
                  className='inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#F5A623] px-6 text-sm font-semibold text-[#2b1a12] transition-colors hover:bg-[#d99a1f] sm:w-auto'
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
                  className='inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/60 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:w-auto'
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

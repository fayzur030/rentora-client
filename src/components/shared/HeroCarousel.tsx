'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion'

import type { Category } from '@/types/category'

interface HeroCarouselProps {
  categories: Category[]
}

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

const HeroCarousel = ({ categories }: HeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const activeCategory = categories[activeIndex]

  useEffect(() => {
    if (categories.length < 2 || shouldReduceMotion) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % categories.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [categories.length, shouldReduceMotion])

  return (
    <MotionConfig reducedMotion='user'>
      <section className='relative isolate w-full overflow-hidden bg-linear-to-br from-hero-start via-hero-mid to-hero-end'>
        <div className='absolute inset-0' aria-hidden='true'>
          <AnimatePresence initial={false}>
            {activeCategory?.image && (
              <motion.div
                key={activeCategory.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className='absolute inset-0'
              >
                <Image
                  src={activeCategory.image}
                  alt=''
                  fill
                  quality={100}
                  preload={activeIndex === 0}
                  sizes='100vw'
                  className='object-cover object-center'
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className='absolute inset-0 bg-hero-overlay' />
          <div className='absolute inset-0 bg-linear-to-r from-hero-start/55 via-transparent to-hero-end/20' />
        </div>

        <div className='relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:justify-start lg:px-8 lg:text-left'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='show'
            className='flex w-full flex-col items-center lg:items-start'
          >
            <motion.div variants={fadeDownVariants}>
              <span className='inline-flex items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-hero-foreground/90 backdrop-blur-sm sm:px-4 sm:text-xs md:text-sm'>
                Your Trusted Rental Marketplace
              </span>
            </motion.div>

            {activeCategory && (
              <motion.p
                key={activeCategory.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className='mt-5 text-xs font-bold uppercase tracking-[0.2em] text-hero-accent sm:text-sm'
              >
                {activeCategory.name}
              </motion.p>
            )}

            <motion.h1
              variants={fadeUpVariants}
              className='mt-6 max-w-4xl text-balance font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-hero-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
            >
              Quality Equipment,
              <span className='mt-1 block text-hero-accent'>
                Easy Rentals, Anytime!
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className='mt-5 max-w-xl text-pretty text-sm leading-relaxed text-hero-muted sm:mt-6 sm:text-base md:text-lg'
            >
              Rent quality equipment and everyday essentials with ease. Save
              time, spend less, and get what you need when you need it.
            </motion.p>

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

            {categories.length > 1 && (
              <div
                className='mt-9 flex items-center gap-2'
                role='group'
                aria-label='Choose a category background'
              >
                {categories.map((category, index) => (
                  <button
                    key={category.slug}
                    type='button'
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${category.name} background`}
                    aria-pressed={index === activeIndex}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? 'w-8 bg-hero-accent'
                        : 'w-2 bg-hero-foreground/50 hover:bg-hero-foreground'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default HeroCarousel

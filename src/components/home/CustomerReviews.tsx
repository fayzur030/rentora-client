'use client'

import { motion, MotionConfig } from 'framer-motion'
import { Quote, Sparkles, Star } from 'lucide-react'

const reviews = [
  {
    name: 'Ayesha Rahman',
    role: 'Home renovator',
    rating: 5,
    comment:
      'Finding the right tools for my renovation was easy. The equipment arrived in great condition, right when I needed it.',
    initials: 'AR',
    color: 'bg-[#F5E7CF] text-[#7A4A16]',
  },
  {
    name: 'Tanvir Hasan',
    role: 'Event organizer',
    rating: 5,
    comment:
      'We rented event equipment for a weekend setup and the whole process felt smooth. It saved us time and a lot of hassle.',
    initials: 'TH',
    color: 'bg-[#E7E1F2] text-[#554477]',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Small business owner',
    rating: 4,
    comment:
      'A practical way to get quality equipment without buying it outright. Booking was straightforward and the owner was helpful.',
    initials: 'NJ',
    color: 'bg-[#DCECE5] text-[#315D4A]',
  },
  {
    name: 'Sakib Ahmed',
    role: 'Weekend explorer',
    rating: 5,
    comment:
      'I found exactly what I needed for my project nearby. Clear details, flexible rental options, and a great experience overall.',
    initials: 'SA',
    color: 'bg-[#F2DFE1] text-[#773F49]',
  },
]

const reviewVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const CustomerReviews = () => {
  return (
    <MotionConfig reducedMotion='user'>
      <section className='relative isolate overflow-hidden py-16 sm:py-20'>
        <div
          className='pointer-events-none absolute -left-24 top-10 -z-10 size-72 rounded-full bg-accent/10 blur-3xl'
          aria-hidden='true'
        />
        <div
          className='pointer-events-none absolute -bottom-28 right-0 -z-10 size-80 rounded-full bg-primary/5 blur-3xl'
          aria-hidden='true'
        />

        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className='mb-9 text-center sm:mb-12'
          >
            <motion.div variants={reviewVariants}>
              <span className='inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm'>
                <Sparkles className='size-3.5 text-accent' aria-hidden='true' />
                CUSTOMER STORIES
              </span>
            </motion.div>
            <motion.h2
              variants={reviewVariants}
              className='mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl'
            >
              Good gear. Great experiences.
            </motion.h2>
            <motion.p
              variants={reviewVariants}
              className='mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base'
            >
              See how Rentora helps people get the equipment they need for
              projects, events, and everything in between.
            </motion.p>
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
          >
            {reviews.map((review) => (
              <motion.article
                key={review.name}
                variants={reviewVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5 sm:p-6'
              >
                <div className='flex items-center justify-between'>
                  <Quote
                    className='size-8 text-accent/70 transition-transform duration-300 group-hover:-rotate-6'
                    aria-hidden='true'
                  />
                  <span
                    className='text-sm font-semibold text-foreground'
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {review.rating}.0
                  </span>
                </div>

                <div
                  className='mt-4 flex gap-1'
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`size-4 ${
                        index < review.rating
                          ? 'fill-accent text-accent'
                          : 'text-border'
                      }`}
                      aria-hidden='true'
                    />
                  ))}
                </div>

                <p className='mt-4 flex-1 text-sm leading-6 text-muted-foreground'>
                  “{review.comment}”
                </p>

                <div className='mt-6 flex items-center gap-3 border-t border-border/70 pt-4'>
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${review.color}`}
                    aria-hidden='true'
                  >
                    {review.initials}
                  </div>
                  <div className='min-w-0'>
                    <h3 className='truncate text-sm font-semibold text-foreground'>
                      {review.name}
                    </h3>
                    <p className='mt-0.5 truncate text-xs text-muted-foreground'>
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default CustomerReviews

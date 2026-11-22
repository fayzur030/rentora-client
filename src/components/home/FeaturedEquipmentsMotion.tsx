'use client'

import { motion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

interface FeaturedEquipmentsMotionProps {
  children: ReactNode
}

const FeaturedEquipmentsMotion = ({
  children,
}: FeaturedEquipmentsMotionProps) => {
  return (
    <MotionConfig reducedMotion='user'>
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className='py-16 sm:py-20'
      >
        {children}
      </motion.section>
    </MotionConfig>
  )
}

export default FeaturedEquipmentsMotion

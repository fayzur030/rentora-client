'use client'

import { motion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

interface PopularEquipmentsMotionProps {
  children: ReactNode
}

const PopularEquipmentsMotion = ({
  children,
}: PopularEquipmentsMotionProps) => {
  return (
    <MotionConfig reducedMotion='user'>
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className='mt-16 py-16 sm:py-20'
      >
        {children}
      </motion.section>
    </MotionConfig>
  )
}

export default PopularEquipmentsMotion

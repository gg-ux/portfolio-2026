import { motion } from 'framer-motion'
import { slideVariants } from './tokens'

const widths = {
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  '2xl': 'max-w-6xl',
}

export default function SlideShell({ children, width = 'xl', variants = slideVariants, className = '' }) {
  return (
    <motion.div
      className={`w-full ${widths[width]} ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { staggerContainer } from './tokens'

export default function StaggerGrid({ children, cols = 2, gap = 3, className = '' }) {
  return (
    <motion.div
      className={`grid grid-cols-${cols} gap-${gap} ${className}`}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  )
}

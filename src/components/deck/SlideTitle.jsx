import { motion } from 'framer-motion'
import { ease } from './tokens'

const sizes = {
  lg: 'text-[clamp(2rem,4vw,3rem)]',
  xl: 'text-[clamp(2.5rem,5vw,4rem)]',
  sm: 'text-[clamp(1.75rem,3vw,2.5rem)]',
}

export default function SlideTitle({ children, size = 'lg', className = '', animate = false }) {
  const classes = `${sizes[size]} font-semibold tracking-tight ${className}`

  if (animate) {
    return (
      <motion.h3
        className={classes}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      >
        {children}
      </motion.h3>
    )
  }

  return <h3 className={classes}>{children}</h3>
}

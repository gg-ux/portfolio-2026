import { motion } from 'framer-motion'
import { ease } from './tokens'

const sizes = {
  lg: 'text-[clamp(1.125rem,1.5vw,1.375rem)]',
  sm: 'text-[clamp(1rem,1.3vw,1.125rem)]',
}

export default function SlideBody({ children, size = 'lg', className = '', animate = false, delay = 0.1 }) {
  const classes = `${sizes[size]} text-white/60 leading-relaxed ${className}`

  if (animate) {
    return (
      <motion.p
        className={classes}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease } }}
      >
        {children}
      </motion.p>
    )
  }

  return <p className={classes}>{children}</p>
}

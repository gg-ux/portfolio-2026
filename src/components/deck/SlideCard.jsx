import { motion } from 'framer-motion'
import { cardClasses, staggerItem } from './tokens'

export default function SlideCard({ children, className = '', stagger = false, style }) {
  const classes = `${cardClasses} ${className}`

  if (stagger) {
    return (
      <motion.div className={classes} variants={staggerItem} style={style}>
        {children}
      </motion.div>
    )
  }

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

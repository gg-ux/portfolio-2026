import { motion } from 'framer-motion'

export default function SlideCallout({ children, color = '#8B6AFF' }) {
  return (
    <motion.div
      className="mt-5 pl-4 border-l-[3px]"
      style={{ borderColor: color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4 } }}
    >
      <p className="text-base text-white/60 leading-relaxed">
        {children}
      </p>
    </motion.div>
  )
}

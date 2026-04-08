import { motion, AnimatePresence } from 'framer-motion'
import { ease } from './tokens'

/**
 * SplitLayout - Left text + right media, used by feature slides
 * Supports multi-part right side with crossfade (subStep)
 */
export default function SplitLayout({ left, right, subStep, parts }) {
  const isMulti = parts && parts.length > 1

  return (
    <div className="flex gap-12 items-center">
      {/* Left side */}
      <motion.div
        className="flex-shrink-0 w-[320px]"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease } }}
        exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
      >
        {left}
        {isMulti && (
          <div className="flex gap-2 mt-6">
            {parts.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i === subStep ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Right side */}
      <div className="flex-1 relative">
        {isMulti ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={subStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {right}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, delay: 0.1, ease } }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
          >
            {right}
          </motion.div>
        )}
      </div>
    </div>
  )
}

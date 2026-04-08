import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ease } from './tokens'
import SlideCaption from './SlideCaption'

/**
 * SlideToggleCompare - Before/after toggle comparison
 * Used for: design variant comparison, style exploration, redesign before/after
 */
export default function SlideToggleCompare({ before, after }) {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setShowAfter(false)}
          className={`font-mono text-[11px] uppercase tracking-wide px-4 py-2 rounded-lg transition-colors ${
            !showAfter ? 'bg-white/[0.1] text-white/80' : 'text-white/40 hover:text-white/60'
          }`}
        >
          {before.label || 'Before'}
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`font-mono text-[11px] uppercase tracking-wide px-4 py-2 rounded-lg transition-colors ${
            showAfter ? 'bg-white/[0.1] text-white/80' : 'text-white/40 hover:text-white/60'
          }`}
        >
          {after.label || 'After'}
        </button>
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showAfter ? 'after' : 'before'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="rounded-xl overflow-hidden border border-white/[0.08]">
            <img
              src={showAfter ? after.src : before.src}
              alt={showAfter ? after.caption : before.caption}
              className="w-full h-auto"
            />
          </div>
          <SlideCaption>
            {showAfter ? (after.caption || 'After') : (before.caption || 'Before')}
          </SlideCaption>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

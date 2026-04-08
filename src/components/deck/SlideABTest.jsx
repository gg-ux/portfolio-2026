import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, accentColors } from './tokens'

/**
 * SlideABTest - A/B test comparison with large variant labels
 * Used for: experiment designs, variant comparisons
 */
export default function SlideABTest({ variants }) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {variants.map((v, i) => {
        const color = accentColors[i % accentColors.length]
        return (
          <motion.div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6"
            variants={staggerItem}
          >
            <div className="font-silk text-[3.5rem] leading-none mb-4" style={{ color }}>
              {v.label}
            </div>
            <h4 className="text-lg font-semibold mb-2">{v.title}</h4>
            <p className="text-[0.9375rem] text-white/60 leading-relaxed">{v.desc}</p>
            {v.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-white/[0.08]">
                <img src={v.image} alt={v.title} className="w-full h-auto" />
              </div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

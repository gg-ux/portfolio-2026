import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, accentColors, ease } from './tokens'

/**
 * SlideTimeline - Vertical timeline with connecting line and staggered items
 * Used for: process steps, roadmaps, future enhancements
 */
export default function SlideTimeline({ items, colorKeys }) {
  return (
    <motion.div
      className="relative pl-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Connecting line */}
      <motion.div
        className="absolute left-[7px] top-4 bottom-4 w-px bg-white/[0.08]"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1, transition: { duration: 0.8, delay: 0.2, ease } }}
      />

      {items.map((item, i) => {
        const Icon = item.icon
        const color = accentColors[i % accentColors.length]
        return (
          <motion.div
            key={i}
            className="relative flex gap-5 pb-8 last:pb-0"
            variants={staggerItem}
          >
            {/* Dot */}
            <div
              className="absolute -left-8 top-1 w-[15px] h-[15px] rounded-full border-2 flex-shrink-0"
              style={{ borderColor: color, backgroundColor: `${color}30` }}
            />
            <div className="flex-1">
              {Icon && (
                <Icon size={18} weight="duotone" style={{ color, opacity: 0.6 }} className="mb-2" />
              )}
              <h4 className="text-base font-semibold mb-1">{item.title}</h4>
              {item.subtitle && (
                <span className="font-mono text-[11px] uppercase tracking-wide text-white/40 block mb-2">
                  {item.subtitle}
                </span>
              )}
              <p className="text-[0.9375rem] text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

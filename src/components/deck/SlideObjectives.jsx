import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, accentColors, cardClasses } from './tokens'

/**
 * SlideObjectives - Goals/objectives grid with icons
 * Used for: project goals, design objectives, success criteria
 */
export default function SlideObjectives({ items, cols = 3 }) {
  return (
    <motion.div
      className={`grid gap-4 grid-cols-${cols}`}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {items.map((item, i) => {
        const Icon = item.icon
        const color = accentColors[i % accentColors.length]
        return (
          <motion.div
            key={i}
            className={cardClasses}
            variants={staggerItem}
          >
            <div className="flex items-center gap-2.5 mb-2">
              {Icon && <Icon size={20} weight="duotone" style={{ color, opacity: 0.6 }} />}
              <h4 className="text-lg font-semibold">{item.title}</h4>
            </div>
            <p className="text-[0.9375rem] text-white/60 leading-relaxed">{item.desc}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

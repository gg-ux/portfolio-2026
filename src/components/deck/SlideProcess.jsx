import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, accentColors } from './tokens'

/**
 * SlideProcess - Multi-column process/kanban board
 * Used for: design process stages, workflow phases
 */
export default function SlideProcess({ columns }) {
  return (
    <motion.div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {columns.map((col, i) => {
        const color = accentColors[i % accentColors.length]
        return (
          <motion.div key={i} variants={staggerItem}>
            {/* Column header */}
            <div className="mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-[11px] uppercase tracking-wide text-white/50">
                {col.title}
              </span>
            </div>
            {/* Cards */}
            <div className="space-y-2">
              {col.items.map((item, j) => (
                <div
                  key={j}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3"
                >
                  <h5 className="text-[13px] font-medium mb-1">{item.title}</h5>
                  {item.desc && (
                    <p className="text-[12px] text-white/50 leading-relaxed">{item.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

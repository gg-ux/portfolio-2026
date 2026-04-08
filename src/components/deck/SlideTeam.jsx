import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, accentColors } from './tokens'

/**
 * SlideTeam - Team member grid
 * Used for: team introductions, collaborator showcases
 */
export default function SlideTeam({ members, cols = 4 }) {
  return (
    <motion.div
      className={`grid gap-6 grid-cols-${cols}`}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {members.map((member, i) => {
        const color = accentColors[i % accentColors.length]
        return (
          <motion.div key={i} className="text-center" variants={staggerItem}>
            {member.image ? (
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2"
                style={{ borderColor: `${color}40` }}
              >
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-semibold"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {member.name.charAt(0)}
              </div>
            )}
            <h4 className="text-base font-semibold mb-1">{member.name}</h4>
            <p className="text-[13px] text-white/50">{member.role}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

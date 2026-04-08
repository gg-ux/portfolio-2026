import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from './tokens'
import SlideCaption from './SlideCaption'

/**
 * SlideGallery - Multi-image grid with captions
 * Used for: mockup showcases, screen galleries, deliverables
 */
export default function SlideGallery({ images, cols = 2 }) {
  return (
    <motion.div
      className={`grid gap-4 grid-cols-${cols}`}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {images.map((img, i) => (
        <motion.div key={i} variants={staggerItem}>
          <div className="rounded-xl overflow-hidden border border-white/[0.08]">
            <img src={img.src} alt={img.caption || ''} className="w-full h-auto" />
          </div>
          {img.caption && <SlideCaption>{img.caption}</SlideCaption>}
        </motion.div>
      ))}
    </motion.div>
  )
}

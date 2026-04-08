/**
 * Deck Design Tokens & Animation Variants
 * Single source of truth for all presentation styling
 */

// Animation easing
export const ease = [0.22, 1, 0.36, 1]

// Slide-level transitions
export const slideVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease } },
}

export const sectionVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } },
}

// Stagger animations for card grids
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

// Shared class strings
export const cardClasses = 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-5'

// Brand accent colors for cards (dark mode)
export const accentColors = ['#8B6AFF', '#BF92F0', '#D78F8D', '#DBA166', '#87AA61']

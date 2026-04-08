// Deck components - reusable presentation building blocks

// Core layout
export { default as SlideShell } from './SlideShell'
export { default as SplitLayout } from './SplitLayout'
export { default as StaggerGrid } from './StaggerGrid'

// Typography
export { default as SlideTitle } from './SlideTitle'
export { default as SlideBody } from './SlideBody'
export { default as SlideLabel } from './SlideLabel'
export { default as SlideCaption } from './SlideCaption'

// Content blocks
export { default as SlideCard } from './SlideCard'
export { default as SlideTag } from './SlideTag'
export { default as SlideCallout } from './SlideCallout'

// Composite slide types
export { default as SlideTimeline } from './SlideTimeline'
export { default as SlideProcess } from './SlideProcess'
export { default as SlideABTest } from './SlideABTest'
export { default as SlideObjectives } from './SlideObjectives'
export { default as SlideGallery } from './SlideGallery'
export { default as SlideTeam } from './SlideTeam'
export { default as SlideToggleCompare } from './SlideToggleCompare'

// Tokens & animation variants
export {
  ease,
  slideVariants,
  sectionVariants,
  staggerContainer,
  staggerItem,
  cardClasses,
  accentColors,
} from './tokens'

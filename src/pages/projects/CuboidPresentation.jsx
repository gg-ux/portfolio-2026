/**
 * Cuboid Annotator - Presentation Mode
 * A sleek, keyboard-navigable presentation version of the case study
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import CustomCursor from '../../components/CustomCursor'
import {
  CloudArrowDown,
  MagnifyingGlass,
  Cube,
  ArrowsOutCardinal,
  FilmStrip,
  CheckCircle,
  SquaresFour,
  SlidersHorizontal,
  Stack,
  ArrowCounterClockwise,
  Eyeglasses,
  Users,
  ChartBar,
  Target,
  ArrowLeft,
  X,
  Check,
  TrendUp,
  Smiley,
} from '@phosphor-icons/react'
import { getColor } from '../../constants/colors'

// Section mapping - maps slide indices to their parent section
const getSectionForSlide = (slideIndex) => {
  // Title
  if (slideIndex === 0) return 'Case Study'
  // Agenda
  if (slideIndex === 1) return 'Agenda'
  // Overview section (slides 2-4)
  if (slideIndex <= 4) return 'Overview'
  // Problem section (slides 5-10)
  if (slideIndex <= 10) return 'Problem'
  // Principles section (slides 11-12)
  if (slideIndex <= 12) return 'Principles'
  // Solution section (slides 13-15)
  if (slideIndex <= 15) return 'Solution'
  // Features section (slides 16-21)
  if (slideIndex <= 21) return 'Features'
  // Impact section (slide 22-23)
  if (slideIndex <= 22) return 'Impact'
  // End
  return 'Thank you'
}

// Animation easing
const ease = [0.22, 1, 0.36, 1]

// Transition variants for different slide types
const slideVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease } }
}

const sectionVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }
}

// Slide data
const slides = [
  // Title
  {
    type: 'title',
    company: 'AI Data Startup',
    title: ['3D Cuboid', 'Annotation Tool'],
    subtitle: ['Redesigning precision workflows for', 'autonomous vehicle data labeling'],
    coverImage: '/assets/projects/cuboid-annotator/cover.webp',
    metadata: [
      { label: 'Role', value: 'Lead Product Designer' },
      { label: 'Timeline', value: '2024 - Present' },
    ],
  },
  // Agenda
  {
    type: 'agenda',
    title: 'Agenda',
    items: [
      'Overview',
      'Understanding the Problem',
      'Design Principles',
      'The Solution',
      'Key Flows & Features',
      'Impact',
    ],
  },
  // Section: Overview
  { type: 'section', number: '01', title: 'Overview' },
  // Context
  {
    type: 'context',
    title: 'The Context',
    subtitle: 'AI startup providing labeled training data for autonomous vehicles',
    points: [
      { label: 'The tool', value: '3D cuboid annotation for LiDAR point clouds' },
      { label: 'The workflow', value: 'Annotate hundreds of objects across thousands of frames' },
      { label: 'The stakes', value: 'Every error impacts model training & vehicle safety' },
      { label: 'My role', value: 'Lead Product Designer, improving speed & accuracy' },
    ],
  },
  // Workflow
  {
    type: 'workflow',
    title: 'The Core Workflow',
    steps: [
      { icon: CloudArrowDown, label: 'Load a scene', desc: 'A 360° point cloud from LiDAR' },
      { icon: MagnifyingGlass, label: 'Identify objects', desc: 'Vehicles, pedestrians, cyclists' },
      { icon: Cube, label: 'Draw cuboids', desc: '3D boxes that fit each object' },
      { icon: ArrowsOutCardinal, label: 'Adjust precisely', desc: 'Sub-meter accuracy' },
      { icon: FilmStrip, label: 'Track frames', desc: 'Link objects through sequences' },
      { icon: CheckCircle, label: 'Submit for QA', desc: 'Review before training' },
    ],
  },
  // Section: Problem
  { type: 'section', number: '02', title: 'Understanding the Problem' },
  // Original interface
  {
    type: 'image',
    title: 'The Original Interface',
    body: 'The existing tool had grown organically over years of engineering-driven development. It worked, but wasn\'t designed for 40+ hour workweeks.',
    image: '/assets/projects/cuboid-annotator/old-design.png',
    caption: 'The original interface (Oct 2024)',
  },
  // Research methods
  {
    type: 'cards',
    title: 'Research Methods',
    body: 'I conducted a three-part audit to understand the problem space:',
    cards: [
      { icon: MagnifyingGlass, subtitle: '2 days', title: 'Heuristic Analysis', body: 'Evaluated the interface against Nielsen\'s 10 usability heuristics to identify systemic UX issues', colorKey: 'amethyst' },
      { icon: Users, subtitle: '5 sessions', title: 'Shadowing Sessions', body: 'Observed annotators in their natural workflow to understand pain points and workarounds', colorKey: 'lilac' },
      { icon: ChartBar, subtitle: '95 responses', title: 'Annotator Surveys', body: 'Distributed System Usability Scale (SUS) questionnaire to measure baseline satisfaction', colorKey: 'rose' },
    ],
  },
  // Usability findings
  {
    type: 'findings',
    title: 'Usability Findings',
    susScore: 52,
    susLabel: 'Below average',
    findings: [
      { heuristic: 'Aesthetic & minimalist design', score: '2/5', issues: 'No visual hierarchy; rigid layout' },
      { heuristic: 'Recognition over recall', score: '2/5', issues: 'Hidden shortcuts; steep learning curve' },
      { heuristic: 'Flexibility & efficiency', score: '1/5', issues: 'No batch operations; 8+ clicks per object' },
      { heuristic: 'User control & freedom', score: '1/5', issues: 'No undo support (85% cited as critical)' },
    ],
  },
  // Accessibility
  {
    type: 'accessibility',
    title: 'Accessibility Findings',
    body: 'The interface failed WCAG standards, causing eye strain during 8-hour shifts:',
    wcagScore: '0/2',
    wcagLabel: 'AA criteria met',
    issues: [
      { issue: 'Low color contrast', measured: '2.1:1', required: '4.5:1', impact: 'Eye strain in varying lighting' },
      { issue: 'Typography too small', measured: '11px', required: '14px+', impact: 'Compounded fatigue over shifts' },
    ],
  },
  // Section: Principles
  { type: 'section', number: '03', title: 'Design Principles' },
  // Principles
  {
    type: 'principles',
    body: 'Based on my research findings, I developed these principles to guide the redesign:',
    principles: [
      { icon: SquaresFour, title: 'Reduce Cognitive Load', desc: 'Use clear hierarchy with intentional spacing, color, and discoverable keyboard shortcuts', span: 2 },
      { icon: SlidersHorizontal, title: 'Customizable Layout', desc: 'Offer a modular panel system that different user types can customize for their workflow', span: 2 },
      { icon: Stack, title: 'Enable Batch Operations', desc: 'Allow annotators to apply changes to multiple objects at once to reduce clicks', span: 2 },
      { icon: ArrowCounterClockwise, title: 'Support User Agency', desc: 'Provide undo/redo so annotators can try approaches without fear of mistakes', span: 3 },
      { icon: Eyeglasses, title: 'WCAG Accessibility', desc: 'Meet color contrast ratios and typography standards for extended use sessions', span: 3 },
    ],
  },
  // Section: Solution
  { type: 'section', number: '04', title: 'The Solution' },
  // New design
  {
    type: 'image',
    title: 'The Redesigned Interface',
    body: 'Guided by the design principles I established, I used Figma to redesign the interface. Once approved by the founder, I used Claude Code to ship the UI updates, while engineers handled the backend complexity.',
    image: '/assets/projects/cuboid-annotator/new-design.png',
  },
  // Shipped improvements
  {
    type: 'comparison',
    title: 'Shipped Improvements',
    items: [
      'Clear visual hierarchy',
      'Discoverable keyboard shortcuts',
      'Modular panel system',
      'Batch ground alignment',
      'Undo/redo support',
      'WCAG-compliant contrast & typography',
    ],
  },
  // Section: Features
  { type: 'section', number: '05', title: 'Key Flows & Features' },
  // Adaptive workspace
  {
    type: 'feature',
    title: 'Adaptive Workspace',
    body: 'The same interface serves annotators, QA reviewers, and external engineers—each with role-based permissions but a shared foundation.',
    tags: ['Resizable panels', 'Collapsible sidebar', 'Persistent layout', 'Role-adaptive'],
    video: '/assets/projects/cuboid-annotator/adaptive-workspace.webm',
  },
  // Selection
  {
    type: 'feature',
    title: 'Selection & Transform Tools',
    body: 'Annotators adjust position, rotation, and scale with sub-meter precision. I audited Blender and SketchUp to identify familiar patterns.',
    tags: ['Keyboard shortcuts', 'Info panel', 'Multi-select', 'Undo/redo'],
    video: '/assets/projects/cuboid-annotator/selection-transform.webm',
  },
  // Ground alignment
  {
    type: 'feature',
    title: 'Ground Alignment',
    body: 'LiDAR ground planes aren\'t perfectly flat. I designed Ground Alignment: set one cuboid as the "road plane," then snap others to match. What took minutes now takes seconds.',
    tags: ['Set road plane', 'Batch snap', 'Plane indicator'],
    video: '/assets/projects/cuboid-annotator/ground-alignment.webm',
    callout: 'This is human-in-the-loop AI design. We can\'t fully automate ground detection, but we can give humans the right tools to do it efficiently.',
  },
  // Cross-functional
  {
    type: 'feature',
    title: 'Cross-Functional Design',
    body: 'Annotators, QA, and engineers all use this tool differently. I designed so each group can access what they need without cluttering the view for others.',
    tags: ['Progressive disclosure', 'Bug reporting', 'Copy to clipboard', 'Persistent state'],
    video: '/assets/projects/cuboid-annotator/cross-functional.webm',
  },
  // Focus tools
  {
    type: 'feature',
    title: 'Focus Tools',
    body: 'Complex scenes have 50+ overlapping cuboids. View settings let annotators isolate objects, show movement paths, or display center points.',
    tags: ['Toggle controls', 'Persistent settings', 'Keyboard shortcuts'],
    video: '/assets/projects/cuboid-annotator/focus-tools.webm',
  },
  // Section: Impact
  { type: 'section', number: '06', title: 'Impact' },
  // Metrics
  {
    type: 'metrics',
    body: 'These features shipped to production and are used daily. Faster workflows mean lower labeling costs. Better usability means less fatigue. Higher accuracy means better training data.',
    metrics: [
      { value: '33%', title: 'Productivity increase', desc: 'Annotators went from ~150 to ~200 cuboids per hour', colorKey: 'amethyst' },
      { value: '6x', title: 'Faster ground alignment', desc: 'Reduced alignment time from ~3 min to ~30 sec per scene', colorKey: 'lilac' },
      { value: '52→78', title: 'SUS score improvement', desc: 'System usability jumped from below average to above average', colorKey: 'rose' },
      { icon: Target, title: 'Higher accuracy', desc: 'Clearer UI reduced labeling mistakes, requiring less reviewer intervention', colorKey: 'gold' },
    ],
  },
  // End
  {
    type: 'end',
    title: 'Thank you',
    subtitle: 'Questions?',
  },
]

export default function CuboidPresentation() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slides.length

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault()
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
        break
      case 'ArrowLeft':
        e.preventDefault()
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setCurrentSlide(0)
        break
      case 'End':
        e.preventDefault()
        setCurrentSlide(totalSlides - 1)
        break
      case 'Escape':
        navigate('/project/ai-tool')
        break
    }
  }, [totalSlides, navigate])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Touch navigation
  const [touchStart, setTouchStart] = useState(0)
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
      else setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }
  }

  const progress = ((currentSlide + 1) / totalSlides) * 100
  const slide = slides[currentSlide]

  return (
    <div
      className="fixed inset-0 bg-[#0a0a0a] text-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <CustomCursor />

      {/* Progress bar scrubber */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[12px] cursor-pointer group z-50"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const percentage = clickX / rect.width
          const targetSlide = Math.floor(percentage * totalSlides)
          setCurrentSlide(Math.max(0, Math.min(targetSlide, totalSlides - 1)))
        }}
      >
        {/* Track background */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.08] group-hover:h-[5px] transition-all" />
        {/* Progress fill */}
        <div
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#8B6AFF] to-[#BF92F0] group-hover:h-[5px] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Nav hint */}
      <div className="fixed bottom-6 left-8 font-mono text-[11px] text-white/40 z-50">
        ← → to navigate • ESC to exit
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/project/ai-tool')}
        className="fixed top-6 left-8 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors z-50"
      >
        <ArrowLeft size={20} className="text-white/60" />
      </button>

      {/* Right sidebar - logo, section, page number */}
      <div className="fixed right-0 top-0 bottom-0 w-16 flex flex-col items-center justify-between py-8 z-50">
        {/* Subtle divider line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]" />

        {/* Logo */}
        <img
          src="/assets/branding/logo.svg"
          alt="Grace Guo"
          className="w-7 h-7"
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
        />

        {/* Section name - rotated */}
        <div
          className="font-mono text-[11px] tracking-[0.15em] text-white/40 uppercase whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {getSectionForSlide(currentSlide)}
        </div>

        {/* Page number */}
        <div className="font-mono text-[13px] text-white/50">
          {currentSlide + 1}
        </div>
      </div>

      {/* Slide content */}
      <div className="w-full h-full flex items-center justify-center p-[6%] pr-[calc(6%+64px)]">
        <AnimatePresence mode="wait">
          <SlideRenderer key={currentSlide} slide={slide} isDark={isDark} />
        </AnimatePresence>
      </div>
    </div>
  )
}

// Slide renderer
function SlideRenderer({ slide, isDark }) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />
    case 'agenda':
      return <AgendaSlide slide={slide} />
    case 'section':
      return <SectionSlide slide={slide} />
    case 'context':
      return <ContextSlide slide={slide} />
    case 'content':
      return <ContentSlide slide={slide} />
    case 'workflow':
      return <WorkflowSlide slide={slide} isDark={isDark} />
    case 'image':
      return <ImageSlide slide={slide} />
    case 'cards':
      return <CardsSlide slide={slide} />
    case 'findings':
      return <FindingsSlide slide={slide} />
    case 'accessibility':
      return <AccessibilitySlide slide={slide} />
    case 'principles':
      return <PrinciplesSlide slide={slide} isDark={isDark} />
    case 'comparison':
      return <ComparisonSlide slide={slide} />
    case 'feature':
      return <FeatureSlide slide={slide} />
    case 'quote':
      return <QuoteSlide slide={slide} />
    case 'metrics':
      return <MetricsSlide slide={slide} isDark={isDark} />
    case 'end':
      return <EndSlide slide={slide} />
    default:
      return null
  }
}

// Title slide - full bleed cover image with gradient overlay
function TitleSlide({ slide }) {
  const titleLines = Array.isArray(slide.title) ? slide.title : [slide.title]
  const subtitleLines = Array.isArray(slide.subtitle) ? slide.subtitle : [slide.subtitle]

  return (
    <motion.div
      className="fixed inset-0"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Cover image */}
      {slide.coverImage && (
        <>
          <motion.img
            src={slide.coverImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.7, scale: 1, transition: { duration: 1.2, ease } }}
          />
          {/* Vignette + gradient overlay for focus */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 100% at 80% 20%, rgba(10,10,10,0.3) 0%, #0a0a0a 70%),
                linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.3) 100%)
              `
            }}
          />
        </>
      )}

      {/* Content positioned at bottom-left */}
      <div className="absolute bottom-[12%] left-[6%] max-w-3xl">
        <motion.div
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2, ease } }}
        >
          {slide.company}
        </motion.div>
        <motion.h1
          className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-5"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay: 0.3, ease } }}
        >
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>
        <motion.p
          className="text-[clamp(1rem,1.4vw,1.25rem)] text-white/50 leading-relaxed mb-8 max-w-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.45, ease } }}
        >
          {subtitleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < subtitleLines.length - 1 && <br />}
            </span>
          ))}
        </motion.p>
        {/* Subtle divider */}
        <motion.div
          className="w-full max-w-md h-px bg-white/[0.08] mb-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 0.6, delay: 0.55, ease } }}
        />
        <motion.div
          className="flex gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.65 } }}
        >
          {slide.metadata.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">
                {item.label}
              </div>
              <div className="text-[15px] text-white/80">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Agenda slide with staggered animation
function AgendaSlide({ slide }) {
  return (
    <motion.div
      className="max-w-2xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h2
        className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      >
        {slide.title}
      </motion.h2>
      <motion.ol
        className="flex flex-col gap-5"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {slide.items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-6 text-[1.5rem]"
            variants={staggerItem}
          >
            <span className="font-mono text-[14px] text-white/40 w-8">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-white">{item}</span>
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  )
}

// Section title slide
function SectionSlide({ slide }) {
  return (
    <motion.div
      className="text-center relative"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Large muted number behind */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-silk text-[clamp(12rem,20vw,18rem)] text-white/[0.04] select-none pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.8, ease } }}
      >
        {slide.number}
      </motion.div>
      {/* Title */}
      <h2 className="relative text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-tight leading-[1.15]">
        {slide.title}
      </h2>
    </motion.div>
  )
}

// Context slide - clean key-value layout with staggered animation
function ContextSlide({ slide }) {
  return (
    <motion.div
      className="max-w-3xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h3
        className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      >
        {slide.title}
      </motion.h3>
      <motion.p
        className="text-[clamp(1.125rem,1.5vw,1.375rem)] text-white/50 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease } }}
      >
        {slide.subtitle}
      </motion.p>

      <motion.div
        className="space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {slide.points.map((point, i) => (
          <motion.div key={i} className="flex gap-6" variants={staggerItem}>
            <span className="font-mono text-[12px] uppercase tracking-wide text-white/40 w-24 flex-shrink-0 pt-1">
              {point.label}
            </span>
            <span className="text-[1.25rem] text-white/80 leading-relaxed">
              {point.value}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// Content slide with default animation
function ContentSlide({ slide }) {
  return (
    <motion.div
      className="max-w-3xl"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h3 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-8">
        {slide.title}
      </h3>
      {slide.body.map((text, i) => (
        <p
          key={i}
          className="text-[clamp(1.125rem,1.5vw,1.375rem)] text-white/60 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}
        />
      ))}
      {slide.callout && (
        <div className="mt-8 pl-6 border-l-[3px] border-[#8B6AFF] bg-gradient-to-r from-[rgba(139,106,255,0.1)] to-transparent py-4 pr-6 rounded-r-xl">
          <p className="text-[1.0625rem] text-white/60 leading-relaxed italic">
            {slide.callout}
          </p>
        </div>
      )}
    </motion.div>
  )
}

// Workflow slide with staggered animation
function WorkflowSlide({ slide, isDark }) {
  return (
    <motion.div
      className="w-full max-w-6xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h3
        className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      >
        {slide.title}
      </motion.h3>
      <motion.div
        className="grid grid-cols-6 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {slide.steps.map((step, i) => {
          const Icon = step.icon
          const colors = ['amethyst', 'lilac', 'rose', 'gold', 'peridot', 'turquoise']
          const color = getColor(colors[i], true)
          return (
            <motion.div key={i} className="text-center" variants={staggerItem}>
              {/* Icon with glass border */}
              <div className="relative w-16 h-16 mx-auto mb-5">
                <div
                  className="relative z-10 w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  <Icon size={28} weight="regular" />
                </div>
                <div className="absolute -inset-1 rounded-full border border-white/[0.08] bg-white/[0.02]" />
              </div>
              <div className="text-[17px] font-medium mb-2">{step.label}</div>
              <div className="text-base text-white/50 leading-relaxed">{step.desc}</div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

// Image slide - 2 column layout with split animation
function ImageSlide({ slide }) {
  return (
    <motion.div
      className="w-full max-w-6xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex gap-12 items-center">
        {/* Text on left - slides from left */}
        <motion.div
          className="flex-shrink-0 w-[280px]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease } }}
        >
          <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight mb-4">
            {slide.title}
          </h3>
          {slide.body && (
            <p className="text-[clamp(1rem,1.3vw,1.125rem)] text-white/60 leading-relaxed">
              {slide.body}
            </p>
          )}
        </motion.div>
        {/* Visual on right - slides from right */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, delay: 0.1, ease } }}
        >
          <div className="rounded-xl overflow-hidden border border-white/[0.08]">
            <img src={slide.image} alt="" className="w-full h-auto" />
          </div>
          {slide.caption && (
            <p className="mt-3 text-center font-mono text-[12px] text-white/40">
              {slide.caption}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Cards slide with staggered animation
function CardsSlide({ slide }) {
  return (
    <motion.div
      className="w-full max-w-5xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h3
        className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      >
        {slide.title}
      </motion.h3>
      {slide.body && (
        <motion.p
          className="text-[clamp(1.125rem,1.5vw,1.375rem)] text-white/60 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease } }}
        >
          {slide.body}
        </motion.p>
      )}
      <motion.div
        className="grid grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {slide.cards.map((card, i) => {
          const Icon = card.icon
          const color = getColor(card.colorKey || 'amethyst', true)
          return (
            <motion.div
              key={i}
              className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 text-center"
              variants={staggerItem}
            >
              {/* Icon with glass border */}
              <div className="relative w-16 h-16 mx-auto mb-5">
                <div
                  className="relative z-10 w-full h-full rounded-full flex items-center justify-center"
                  style={{ color, backgroundColor: `${color}18` }}
                >
                  <Icon size={28} weight="regular" />
                </div>
                <div className="absolute -inset-1 rounded-full border border-white/[0.08] bg-white/[0.02]" />
              </div>
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              {card.subtitle && (
                <div className="font-mono text-[12px] uppercase tracking-wide mb-3 text-white/40">
                  {card.subtitle}
                </div>
              )}
              <p className="text-base text-white/60 leading-relaxed">{card.body}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

// Findings slide with default animation
function FindingsSlide({ slide }) {
  return (
    <motion.div className="w-full max-w-5xl" variants={slideVariants} initial="initial" animate="animate" exit="exit">
      <div className="flex gap-12">
        <div className="flex-shrink-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40 mb-2">
            Baseline SUS Score
          </div>
          <div className="text-[4.5rem] font-bold text-[#EF4444] leading-none">
            {slide.susScore}
          </div>
          <div className="font-mono text-[13px] text-white/50 mt-2">{slide.susLabel}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-6">
            {slide.title}
          </h3>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Heuristic</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Score</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Violations</th>
                </tr>
              </thead>
              <tbody>
                {slide.findings.map((f, i) => (
                  <tr key={i} className="border-t border-white/[0.06]">
                    <td className="py-4 text-base">{f.heuristic}</td>
                    <td className={`py-4 font-semibold ${f.score.startsWith('1') ? 'text-[#EF4444]' : 'text-[#DBA166]'}`}>{f.score}</td>
                    <td className="py-4 text-base text-white/60">{f.issues}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Accessibility slide
function AccessibilitySlide({ slide }) {
  return (
    <motion.div className="w-full max-w-5xl" variants={slideVariants} initial="initial" animate="animate" exit="exit">
      <div className="flex gap-12">
        <div className="flex-shrink-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40 mb-2">
            WCAG AA Compliance
          </div>
          <div className="text-[4.5rem] font-bold text-[#EF4444] leading-none">
            {slide.wcagScore}
          </div>
          <div className="font-mono text-[13px] text-white/50 mt-2">{slide.wcagLabel}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4">
            {slide.title}
          </h3>
          <p className="text-[clamp(1.125rem,1.5vw,1.375rem)] text-white/60 leading-relaxed mb-6">
            {slide.body}
          </p>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Issue</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Measured</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Required</th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4">Impact</th>
                </tr>
              </thead>
              <tbody>
                {slide.issues.map((issue, i) => (
                  <tr key={i} className="border-t border-white/[0.06]">
                    <td className="py-4 text-base">{issue.issue}</td>
                    <td className="py-4 font-semibold text-[#EF4444]">{issue.measured}</td>
                    <td className="py-4 text-base text-white/60">{issue.required}</td>
                    <td className="py-4 text-base text-white/60">{issue.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Principles slide
function PrinciplesSlide({ slide, isDark }) {
  return (
    <motion.div className="w-full max-w-5xl" variants={slideVariants} initial="initial" animate="animate" exit="exit">
      <p className="text-[clamp(1.125rem,1.5vw,1.375rem)] text-white/60 leading-relaxed mb-8">
        {slide.body}
      </p>
      <div className="grid grid-cols-6 gap-4">
        {slide.principles.map((p, i) => {
          const Icon = p.icon
          return (
            <div
              key={i}
              className={`bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 relative col-span-${p.span}`}
              style={{ gridColumn: `span ${p.span}` }}
            >
              <div className="absolute top-6 right-6 text-white/20">
                <Icon size={24} weight="light" />
              </div>
              <h4 className="text-xl font-semibold mb-3 pr-8">{p.title}</h4>
              <p className="text-base text-white/60 leading-relaxed">{p.desc}</p>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Comparison slide
function ComparisonSlide({ slide }) {
  return (
    <motion.div className="max-w-3xl" variants={slideVariants} initial="initial" animate="animate" exit="exit">
      <h3 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-8">
        {slide.title}
      </h3>
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-4"></th>
              <th className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4 w-24">Original</th>
              <th className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 pb-4 w-24">Redesign</th>
            </tr>
          </thead>
          <tbody>
            {slide.items.map((item, i) => (
              <tr key={i} className="border-t border-white/[0.06]">
                <td className="py-4 text-base">{item}</td>
                <td className="py-4 text-center"><X size={20} weight="bold" className="inline text-[#EF4444]" /></td>
                <td className="py-4 text-center"><Check size={20} weight="bold" className="inline text-[#22C55E]" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// Feature slide - 2 column layout with split animation
function FeatureSlide({ slide }) {
  return (
    <motion.div
      className="w-full max-w-6xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex gap-12 items-center">
        {/* Text on left - slides from left */}
        <motion.div
          className="flex-shrink-0 w-[320px]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease } }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
        >
          <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight mb-4">
            {slide.title}
          </h3>
          <p className="text-[clamp(1rem,1.3vw,1.125rem)] text-white/60 leading-relaxed mb-5">
            {slide.body}
          </p>
          <div className="flex flex-wrap gap-2">
            {slide.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg font-mono text-[10px] uppercase tracking-wide text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        {/* Video on right - slides from right */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, delay: 0.1, ease } }}
          exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
        >
          <div className="rounded-xl overflow-hidden border border-white/[0.08]">
            <video autoPlay muted loop playsInline className="w-full h-auto">
              <source src={slide.video} type="video/webm" />
            </video>
          </div>
          {/* Optional callout beneath video */}
          {slide.callout && (
            <motion.div
              className="mt-5 pl-4 border-l-[3px] border-[#8B6AFF]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
              <p className="text-base text-white/60 leading-relaxed">
                {slide.callout}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Quote slide
function QuoteSlide({ slide }) {
  return (
    <motion.div className="text-center max-w-3xl" variants={slideVariants} initial="initial" animate="animate" exit="exit">
      <div className="bg-gradient-to-r from-[rgba(139,106,255,0.1)] to-[rgba(191,146,240,0.05)] rounded-2xl p-12">
        <p className="text-[1.5rem] text-white/70 leading-relaxed italic">
          "{slide.text}"
        </p>
      </div>
    </motion.div>
  )
}

// Metrics slide - matches project page 2x2 layout
function MetricsSlide({ slide, isDark }) {
  return (
    <motion.div
      className="w-full max-w-4xl"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.p
        className="text-[clamp(1.125rem,1.5vw,1.375rem)] text-white/60 leading-relaxed mb-10 max-w-3xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      >
        {slide.body}
      </motion.p>
      <motion.div
        className="grid grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {slide.metrics.map((m, i) => {
          const color = getColor(m.colorKey || 'amethyst', true)
          const Icon = m.icon
          return (
            <motion.div
              key={i}
              className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8"
              variants={staggerItem}
            >
              {/* Large number or icon */}
              <div className="font-silk text-[clamp(2.5rem,4vw,3.5rem)] leading-none mb-3" style={{ color }}>
                {m.value ? m.value : <Icon size={48} weight="regular" />}
              </div>
              <h4 className="text-xl font-semibold mb-2">{m.title}</h4>
              <p className="text-base text-white/60 leading-relaxed">{m.desc}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

// End slide with scale animation
function EndSlide({ slide }) {
  return (
    <motion.div
      className="text-center"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h2
        className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
      >
        {slide.title}
      </motion.h2>
      <motion.p
        className="text-[clamp(1.25rem,2vw,1.5rem)] text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
      >
        {slide.subtitle}
      </motion.p>
    </motion.div>
  )
}

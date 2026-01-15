import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Info } from '@phosphor-icons/react'

/**
 * ProcessKanban - Kanban-style board for displaying process steps
 * Cards flip on click to reveal descriptions
 */
export default function ProcessKanban({ columns }) {
  const { isDark } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)

  // Column colors (matching common kanban tools)
  const columnColors = [
    '#A855F7', // purple - Research
    '#3B82F6', // blue - Design
    '#F59E0B', // amber - Scoping
    '#22C55E', // green - Implementation
  ]

  const scrollCardWidth = 280 + 16 // card width + gap

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10
    const newIndex = isAtEnd
      ? columns.length - 1
      : Math.round(scrollLeft / scrollCardWidth)

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < columns.length) {
      setActiveIndex(newIndex)
    }
  }

  const scrollToIndex = (index) => {
    setActiveIndex(index)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * scrollCardWidth,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="mt-2 mb-8">
      {/* Mobile/Tablet: Carousel indicators - right aligned, inline with title */}
      <div className="md:hidden flex items-center justify-end gap-1.5 mb-4 -mt-10">
        {columns.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className="transition-all duration-500"
            style={{
              width: index === activeIndex ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: isDark
                ? index === activeIndex ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'
                : index === activeIndex ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)',
            }}
            aria-label={`Go to ${columns[index].title}`}
          />
        ))}
      </div>

      {/* Desktop: 4-column grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {columns.map((column, colIndex) => (
          <KanbanColumn
            key={column.title}
            title={column.title}
            items={column.items}
            color={columnColors[colIndex % columnColors.length]}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Mobile/Tablet: Horizontal scroll - full bleed right */}
      <div
        ref={carouselRef}
        className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mr-6 pr-6"
        onScroll={handleScroll}
      >
        {columns.map((column, colIndex) => (
          <div key={column.title} className="flex-shrink-0 snap-start" style={{ width: '280px' }}>
            <KanbanColumn
              title={column.title}
              items={column.items}
              color={columnColors[colIndex % columnColors.length]}
              isDark={isDark}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function KanbanColumn({ title, items, color, isDark }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-3 border backdrop-blur-md ${
        isDark
          ? 'border-white/[0.08] bg-white/[0.015]'
          : 'border-black/[0.08] bg-white/20'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <span
          className={`font-mono text-[11px] tracking-wide uppercase whitespace-nowrap ${
            isDark ? 'text-white/70' : 'text-black/70'
          }`}
        >
          {title}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <KanbanCard
            key={index}
            title={item.title}
            description={item.description}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  )
}

function KanbanCard({ title, description, isDark }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [height, setHeight] = useState('auto')
  const frontRef = useRef(null)
  const backRef = useRef(null)

  const COMPACT_HEIGHT = 72 // Fixed compact height for front

  useEffect(() => {
    if (isFlipped && backRef.current) {
      // Measure back content and animate to that height (add extra for bottom padding)
      setHeight((backRef.current.scrollHeight + 16) + 'px')
    } else {
      // Return to compact height
      setHeight(COMPACT_HEIGHT + 'px')
    }
  }, [isFlipped])

  return (
    <div
      className="relative cursor-pointer overflow-hidden transition-all duration-500 ease-out"
      style={{
        perspective: '1000px',
        height: height,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front - Title */}
        <div
          ref={frontRef}
          className={`absolute inset-0 w-full h-full rounded-lg p-3 backdrop-blur-md ${
            isDark
              ? 'bg-white/[0.015] border border-white/[0.08] hover:bg-white/[0.04]'
              : 'bg-white/20 border border-black/[0.08] hover:bg-white/30'
          } transition-colors duration-200`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p
            className={`font-satoshi text-base leading-snug font-medium pr-6 ${
              isDark ? 'text-white/90' : 'text-gray-900'
            }`}
          >
            {title}
          </p>
          <span
            className={`absolute top-3 right-3 ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}
          >
            <Info size={14} weight="regular" />
          </span>
        </div>

        {/* Back - Description */}
        <div
          ref={backRef}
          className={`absolute inset-0 w-full rounded-lg px-3 py-4 backdrop-blur-md ${
            isDark
              ? 'bg-white/[0.03] border border-white/[0.08]'
              : 'bg-white/30 border border-black/[0.08]'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p
            className={`font-satoshi text-[15px] leading-relaxed ${
              isDark ? 'text-white/70' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

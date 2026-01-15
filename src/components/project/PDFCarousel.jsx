import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Caption } from '../Typography'

/**
 * PDFCarousel - Horizontal scrolling carousel of PDF page previews
 * with a "View Full PDF" card at the end
 */
export default function PDFCarousel({
  pages,
  pdfUrl,
  className = ''
}) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollPosition()
    container.addEventListener('scroll', checkScrollPosition)
    window.addEventListener('resize', checkScrollPosition)
    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = container.querySelector('[data-pdf-page]')?.offsetWidth || 300
    const scrollAmount = cardWidth + 16

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })

    setTimeout(checkScrollPosition, 350)
  }

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div className={`rounded-2xl p-4 md:p-6 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        {/* Header with arrows */}
        <div className="flex items-center justify-between mb-4">
          <Caption className={isDark ? 'text-white/50' : 'text-black/50'}>
            Case Study Booklet Preview
          </Caption>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? `border-white/20 ${!canScrollLeft ? 'opacity-30' : 'hover:border-white/40 hover:bg-white/5'}`
                  : `border-black/10 ${!canScrollLeft ? 'opacity-30' : 'hover:border-black/30 hover:bg-black/5'}`
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`${isDark ? 'text-white' : 'text-gray-900'} rotate-180`}>
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? `border-white/20 ${!canScrollRight ? 'opacity-30' : 'hover:border-white/40 hover:bg-white/5'}`
                  : `border-black/10 ${!canScrollRight ? 'opacity-30' : 'hover:border-black/30 hover:bg-black/5'}`
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={isDark ? 'text-white' : 'text-gray-900'}>
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-6 px-4 md:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4">
            {/* Page cards */}
            {pages.map((page, index) => (
              <div
                key={index}
                data-pdf-page
                className="flex-shrink-0 w-[200px] md:w-[240px]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
                }}
              >
                <div
                  className={`overflow-hidden rounded-lg ${
                    isDark ? 'bg-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]' : 'bg-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  <img
                    src={page.src}
                    alt={page.alt || `Page ${index + 1}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}

            {/* View Full PDF card */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-pdf-page
              className="flex-shrink-0 w-[200px] md:w-[240px] group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${pages.length * 0.1}s, transform 0.5s ease ${pages.length * 0.1}s`,
              }}
            >
              <div
                className={`h-full rounded-lg border border-dashed flex flex-col items-center justify-center aspect-[1224/1584] transition-all duration-300 ${
                  isDark
                    ? 'border-white/15 group-hover:border-white/30 group-hover:bg-white/5'
                    : 'border-black/10 group-hover:border-black/20 group-hover:bg-black/5'
                }`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`mb-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    isDark ? 'text-white/50' : 'text-black/40'
                  }`}
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`font-mono text-xs tracking-wide uppercase font-medium ${
                    isDark ? 'text-white/50' : 'text-black/40'
                  }`}
                >
                  View Full PDF
                </span>
              </div>
            </a>

            {/* Right padding spacer */}
            <div className="flex-shrink-0 w-4 md:w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

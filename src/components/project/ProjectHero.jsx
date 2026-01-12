import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Caption } from '../Typography'

/**
 * ProjectHero - Header section for project introduction
 * Full-bleed image with parallax and scale effects, then centered content below
 */
export default function ProjectHero({
  company,
  title,
  description,
  role,
  timeline,
  team,
  impact,
  coverImage,
  coverImageAlt = 'Project cover'
}) {
  const { isDark } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const bannerRef = useRef(null)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    const updateBannerHeight = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight)
      }
    }

    updateBannerHeight()
    window.addEventListener('resize', updateBannerHeight)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateBannerHeight)
    }
  }, [])

  // Calculate parallax and scale based on scroll
  const scrollProgress = Math.min(scrollY / (bannerHeight || 1), 1)
  const parallaxY = scrollY * 0.4 // Image moves slower than scroll
  const scale = 1 + scrollProgress * 0.1 // Scale from 1 to 1.1

  const metadata = [
    { label: 'Role', value: role },
    { label: 'Timeline', value: timeline },
    team && { label: 'Team', value: team },
    impact && { label: 'Impact', value: impact },
  ].filter(Boolean)

  return (
    <header className="pt-[72px]">
      {/* Cover Image - Full bleed with parallax and scale */}
      {coverImage && (
        <div
          ref={bannerRef}
          className="relative w-full aspect-[21/9] mb-12 md:mb-16 overflow-hidden"
        >
          <img
            src={coverImage}
            alt={coverImageAlt}
            className="w-full h-full object-cover will-change-transform"
            style={{
              transform: `translateY(${parallaxY}px) scale(${scale})`,
              transformOrigin: 'center top',
            }}
          />
        </div>
      )}

      {/* Article content - narrower max-width, centered */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Company & Title */}
        <div className="mb-4">
          <Caption trigger="mount">
            {company}
          </Caption>
        </div>
        <h1
          className={`font-satoshi text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15] mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>
        <p
          className={`font-satoshi text-lg leading-relaxed ${
            isDark ? 'text-white/70' : 'text-gray-600'
          }`}
        >
          {description}
        </p>

        {/* Metadata Grid */}
        <div className={`mt-10 pt-8 border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'}`}>
          <div className="grid grid-cols-2 gap-6">
            {metadata.map(({ label, value }) => (
              <div key={label}>
                <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
                  {label}
                </Caption>
                <p className={`font-satoshi text-sm mt-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

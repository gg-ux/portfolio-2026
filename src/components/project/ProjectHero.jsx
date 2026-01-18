import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useBanner } from '../../context/BannerContext'
import { H2, Body, Caption } from '../Typography'

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
  output,
  coverImage,
  coverImageAlt = 'Project cover',
  coverPosition = 'center 30%',
  lightBanner = false,
  darkBanner = false,
  noLightFilter = false,
  darkOverlay = false,
}) {
  const { isDark } = useTheme()
  const { setLightBanner, setDarkBanner, setBannerHeight: setContextBannerHeight } = useBanner()
  const [scrollY, setScrollY] = useState(0)
  const bannerRef = useRef(null)
  const [bannerHeight, setBannerHeight] = useState(0)

  // Set light banner mode in context
  useEffect(() => {
    setLightBanner(lightBanner)
    return () => setLightBanner(false)
  }, [lightBanner, setLightBanner])

  // Set dark banner mode in context (for light nav text over dark banners in light mode)
  useEffect(() => {
    setDarkBanner(darkBanner)
    return () => setDarkBanner(false)
  }, [darkBanner, setDarkBanner])

  useEffect(() => {
    const updateBannerHeight = () => {
      if (bannerRef.current) {
        const height = bannerRef.current.offsetHeight
        setBannerHeight(height)
        setContextBannerHeight(height + 72) // Include nav height offset
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
      setContextBannerHeight(0)
    }
  }, [setContextBannerHeight])

  // Calculate parallax and scale based on scroll
  const scrollProgress = Math.min(scrollY / (bannerHeight || 1), 1)
  const parallaxY = scrollY * 0.4 // Image moves slower than scroll
  const scale = 1 + scrollProgress * 0.1 // Scale from 1 to 1.1

  const metadata = [
    { label: 'Role', value: role },
    { label: 'Timeline', value: timeline },
    team && { label: 'Team', value: team },
    impact && { label: 'Impact', value: impact },
    output && { label: 'Output', value: output },
  ].filter(Boolean)

  return (
    <header>
      {/* Cover Image - Full bleed with parallax and scale, extends behind nav */}
      {coverImage && (
        <div
          ref={bannerRef}
          className={`relative w-full aspect-[4/3] md:aspect-[2/1] mb-12 md:mb-16 overflow-hidden ${
            isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]'
          }`}
        >
          <img
            src={coverImage}
            alt={coverImageAlt}
            className="w-full h-full object-cover will-change-transform"
            style={{
              transform: `translateY(${parallaxY}px) scale(${scale})`,
              transformOrigin: 'center top',
              objectPosition: coverPosition,
              filter: isDark || noLightFilter ? 'none' : 'sepia(0.05) saturate(1.05)',
            }}
          />
          {/* Dark gradient overlay for nav visibility */}
          {darkOverlay && (
            <div
              className="absolute inset-x-0 top-0 h-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
              }}
            />
          )}
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
        <H2 as="h1" className="leading-[1.15] mb-6">
          {title}
        </H2>
        <Body>
          {description}
        </Body>

        {/* Metadata Grid */}
        <div className={`mt-10 pt-8 border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'}`}>
          <div className="grid grid-cols-2 gap-6">
            {metadata.map(({ label, value }) => (
              <div key={label}>
                <Caption className="theme-caption">
                  {label}
                </Caption>
                <Body size="sm" className="mt-1 mb-0">
                  {value}
                </Body>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

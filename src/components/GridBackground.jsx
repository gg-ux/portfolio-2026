import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function GridBackground() {
  const { isDark } = useTheme()
  const location = useLocation()
  const [scrollEffects, setScrollEffects] = useState({ opacity: 1, translateY: 0 })
  const rafRef = useRef(null)
  const lastEffectsRef = useRef({ opacity: 1, translateY: 0 })

  const isHomePage = location.pathname === '/'
  const isDesignSystem = location.pathname.startsWith('/design-system')

  // Only render on home page or design system pages
  if (!isHomePage && !isDesignSystem) {
    return null
  }

  useEffect(() => {
    const updateScrollEffects = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      let newOpacity = 1
      let newTranslateY = 0

      if (isDesignSystem) {
        // Design system pages: simple fade out
        const fadeOutStart = vh * 0.3
        const fadeOutEnd = vh * 0.6
        if (scrollY < fadeOutStart) {
          newOpacity = 1
        } else if (scrollY < fadeOutEnd) {
          newOpacity = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart)
        } else {
          newOpacity = 0
        }
      } else {
        // Home page: Grid visible through hero and Crafting blurb, fades out before projects
        newTranslateY = 0

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

        // Fade out after Crafting blurb (around 1.3-1.6vh)
        const fadeOutStart = vh * 1.3
        const fadeOutEnd = vh * 1.6

        if (scrollY < fadeOutStart) {
          newOpacity = 1
        } else if (scrollY < fadeOutEnd) {
          const progress = (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart)
          newOpacity = 1 - easeOutCubic(progress)
        } else {
          newOpacity = 0
        }
      }

      // Only update if change is significant
      const last = lastEffectsRef.current
      if (Math.abs(newOpacity - last.opacity) > 0.01 || Math.abs(newTranslateY - last.translateY) > 1) {
        setScrollEffects({ opacity: newOpacity, translateY: newTranslateY })
        lastEffectsRef.current = { opacity: newOpacity, translateY: newTranslateY }
      }
      rafRef.current = null
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateScrollEffects)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollEffects()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isDesignSystem])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: isDark
          ? `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: scrollEffects.opacity,
      }}
    />
  )
}

import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, ChatCircle } from '@phosphor-icons/react'
import Solstice from './Solstice'
import { H1, Body, Caption } from './Typography'
import { Button, ButtonWithArrow } from './ui'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isDark } = useTheme()
  const rafRef = useRef(null)
  const lastProgressRef = useRef(0)

  useEffect(() => {
    // Mark as animated in after entrance animation completes
    const timer = setTimeout(() => setHasAnimatedIn(true), 1900) // 900ms delay + 1000ms animation
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      // Calculate scroll progress (0 to 1) over first 50% of viewport
      const progress = Math.min(scrollY / (viewportHeight * 0.5), 1)

      // Only update if changed significantly (> 1%)
      if (Math.abs(progress - lastProgressRef.current) > 0.01) {
        setScrollProgress(progress)
        lastProgressRef.current = progress
      }
      rafRef.current = null
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Dissolve effect values (matching SCROLL DOWN animation)
  // Blur starts after 40% scroll progress for a delayed effect
  const blurProgress = Math.max(0, (scrollProgress - 0.4) / 0.6)
  const dissolveStyle = {
    opacity: 1 - scrollProgress,
    transform: `translateY(${-scrollProgress * 32}px) scale(${1 - scrollProgress * 0.05})`,
    filter: blurProgress > 0.01 ? `blur(${blurProgress * 8}px)` : 'none',
    willChange: 'transform, opacity',
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Animated blob background */}
      <Solstice />

      {/* Content container */}
      <div
        className="relative z-10 min-h-screen flex flex-col justify-end max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20"
        style={hasAnimatedIn ? dissolveStyle : undefined}
      >
        {/* Name + Bio grouped together */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Left - Name and Bio */}
          <div className="max-w-lg">
            <H1 className="leading-[0.85] tracking-tight mb-8 animate-fluid-in opacity-0" style={{ animationDelay: '200ms' }}>
              <span className="block md:inline">Grace</span>{' '}
              <span className="block md:inline">Guo</span>
            </H1>

            <Body
              className="animate-fluid-in opacity-0"
              style={{
                animationDelay: '500ms',
                textShadow: isDark ? '0 2px 20px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              UX/UI Designer (MHCID) crafting human-first digital experiences. 7+ years of experience across automotive, healthcare, and emerging tech. Based in LA.
            </Body>

            {/* CTA Buttons */}
            <div
              className="flex flex-row gap-3 mt-8 animate-fluid-in opacity-0"
              style={{ animationDelay: '650ms' }}
            >
              <ButtonWithArrow href="#work" variant="primary" size="sm">
                View Work
              </ButtonWithArrow>
              <Button
                href="#contact"
                variant="secondary"
                size="sm"
                icon={<ChatCircle size={13} weight="regular" />}
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* LinkedIn link - right */}
          <a
            href="https://linkedin.com/in/graceguo"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-fluid-in opacity-0 hidden md:flex items-center gap-1.5 group"
            style={{ animationDelay: '750ms' }}
          >
            <Caption trigger="hover" className="group-hover:theme-heading transition-colors duration-300">
              LINKEDIN
            </Caption>
            <ArrowUpRight size={12} weight="bold" className="theme-caption group-hover:theme-heading transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Bottom gradient overlay to blend with background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent, #0a0a0a)'
            : 'linear-gradient(to bottom, transparent, #FAF8F4)'
        }}
      />
    </section>
  )
}

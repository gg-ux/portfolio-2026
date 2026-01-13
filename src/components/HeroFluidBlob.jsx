/**
 * HeroFluidBlob
 *
 * Hero variant with centered 3D FluidBlob and text overlay.
 * The blob becomes a living signature - identity emerging from fluid form.
 */

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ScrambleText from './ScrambleText'
import FluidBlob from './FluidBlob'

export default function HeroFluidBlob() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isDark } = useTheme()
  const rafRef = useRef(null)
  const lastProgressRef = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const progress = Math.min(scrollY / (viewportHeight * 0.5), 1)

      if (Math.abs(progress - lastProgressRef.current) > 0.005) {
        setScrollProgress(progress)
        lastProgressRef.current = progress
      }
      rafRef.current = null
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  // Scroll indicator
  const scrollIndicatorProgress = Math.min(scrollProgress * 100, 1)
  const scrollIndicatorEased = scrollIndicatorProgress * scrollIndicatorProgress

  // Caption
  const captionOpacityOut = Math.max(0, (scrollProgress - 0.15) / 0.35)
  const captionOpacity = 1 - easeOutCubic(captionOpacityOut)
  const captionBlurProgress = Math.max(0, (scrollProgress - 0.15) / 0.35)
  const captionBlur = easeOutCubic(captionBlurProgress) * 12
  const captionTranslateY = -easeOutCubic(scrollProgress) * window.innerHeight * 0.1
  const captionStyle = {
    opacity: captionOpacity,
    transform: `translateY(${captionTranslateY}px)`,
    filter: `blur(${captionBlur}px)`,
  }

  // Name
  const nameOpacityOut = Math.max(0, (scrollProgress - 0.2) / 0.6)
  const nameOpacity = 1 - easeOutCubic(nameOpacityOut)
  const nameBlurProgress = Math.max(0, (scrollProgress - 0.2) / 0.6)
  const nameBlur = easeOutCubic(nameBlurProgress) * 10
  const nameScale = 1 - (easeOutCubic(nameBlurProgress) * 0.04)
  const nameTranslateY = -easeOutCubic(scrollProgress) * window.innerHeight * 0.3
  const nameStyle = {
    opacity: nameOpacity,
    transform: `translateY(${nameTranslateY}px) scale(${nameScale})`,
    filter: `blur(${nameBlur}px)`,
  }

  // Blob fades out with scroll - delayed to overlap with Crafting section
  // Stays fully visible until 75% scroll, then fades over remaining 25%
  const blobFadeStart = 0.75
  const blobFadeProgress = Math.max(0, (scrollProgress - blobFadeStart) / (1 - blobFadeStart))
  const blobOpacity = 1 - easeOutCubic(blobFadeProgress)

  // Blob parallax - gentle upward drift at 30% scroll speed
  const blobTranslateY = -scrollProgress * window.innerHeight * 0.3

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: isDark ? '#0a0a0f' : '#FAF8F4' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content container with blob and text */}
      <div className="relative z-10 min-h-screen flex items-center justify-center max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Centered blob */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: blobOpacity,
            transform: `translateY(${blobTranslateY}px)`,
          }}
        >
          <FluidBlob size={700} isDark={isDark} />
        </div>

        {/* Text overlay */}
        <div className="relative flex flex-col items-center justify-center text-center">
          {/* Name */}
          <div style={nameStyle}>
            <h1
              className={`font-silk text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight text-center animate-fluid-in opacity-0 ${
                isDark ? 'text-white drop-shadow-lg' : 'text-gray-900'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              Grace Guo
            </h1>
          </div>

          {/* Caption */}
          <div style={captionStyle}>
            <div
              className="flex items-center gap-3 mt-6 md:mt-8 animate-fade-up opacity-0"
              style={{ animationDelay: '600ms' }}
            >
              <span className={`font-mono text-[14px] font-light tracking-normal uppercase ${
                isDark ? 'text-white/80 drop-shadow' : 'text-gray-900'
              }`}>
                <ScrambleText trigger="mount" iterations={3} speed={25}>
                  UX/UI Designer, MHCI+D
                </ScrambleText>
              </span>
              <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-gray-900/80'}`}>✦</span>
              <span className={`font-mono text-[14px] font-light tracking-normal uppercase ${
                isDark ? 'text-white/80 drop-shadow' : 'text-gray-900'
              }`}>
                <span className="sm:hidden">
                  <ScrambleText trigger="mount" iterations={3} speed={25}>
                    Based in LA
                  </ScrambleText>
                </span>
                <span className="hidden sm:inline">
                  <ScrambleText trigger="mount" iterations={3} speed={25}>
                    Based in Los Angeles
                  </ScrambleText>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: 1 - scrollIndicatorEased,
            transform: `translateY(${-scrollIndicatorEased * 20}px) scale(${1 - scrollIndicatorEased * 0.1})`,
            filter: `blur(${scrollIndicatorEased * 8}px)`,
          }}
        >
          <div
            className="flex items-center gap-2 animate-fade-up opacity-0"
            style={{ animationDelay: '1000ms' }}
          >
            <span className={`font-mono text-[11px] tracking-wide uppercase ${
              isDark ? 'text-white/40' : 'text-gray-400'
            }`}>
              Scroll
            </span>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className={`animate-bounce-subtle ${isDark ? 'text-white/40' : 'text-gray-400'}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

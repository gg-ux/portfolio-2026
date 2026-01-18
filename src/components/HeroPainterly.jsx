/**
 * HeroPainterly
 *
 * Hero variant using the Painterly WebGL shader background.
 * Organic, paint-like blobs with simplex noise and FBM.
 */

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ScrambleText from './ScrambleText'
import Painterly from './Painterly'

export default function HeroPainterly() {
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Painterly WebGL background */}
      <Painterly />

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Name */}
        <div style={nameStyle}>
          <h1
            className="font-silk text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight text-center animate-fluid-in"
            style={{
              color: isDark ? 'white' : '#1A1A1A',
              animationDelay: '200ms'
            }}
          >
            Grace Guo
          </h1>
        </div>

        {/* Caption */}
        <div style={captionStyle}>
          <div
            className="flex items-center gap-3 mt-6 md:mt-8 animate-fade-up"
            style={{ animationDelay: '600ms' }}
          >
            <span className="font-mono text-[14px] font-light tracking-normal uppercase">
              <ScrambleText trigger="mount" iterations={3} speed={25}>
                UX/UI Designer, MHCI+D
              </ScrambleText>
            </span>
            <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-black/40'}`}>✦</span>
            <span className="font-mono text-[14px] font-light tracking-normal uppercase">
              <ScrambleText trigger="mount" iterations={3} speed={25}>
                Based in Los Angeles
              </ScrambleText>
            </span>
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
            className="flex items-center gap-2 animate-fade-up"
            style={{ animationDelay: '1000ms' }}
          >
            <span
              className={`font-mono text-[11px] tracking-wide uppercase ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}
            >
              Scroll
            </span>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className={`animate-bounce-subtle ${isDark ? 'text-white/40' : 'text-black/40'}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

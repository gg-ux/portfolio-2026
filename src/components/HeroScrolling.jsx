import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ScrambleText from './ScrambleText'
import Solstice from './Solstice'

export default function HeroScrolling() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isDark } = useTheme()
  const rafRef = useRef(null)
  const lastProgressRef = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const progress = Math.min(scrollY / (viewportHeight * 0.5), 1)

      // Only update if change is significant (> 0.5%)
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

  // Layered parallax dissolve - each element at different "depth"

  // Scroll indicator: dissolves IMMEDIATELY (first 1% of scroll) with smooth blur
  const scrollIndicatorProgress = Math.min(scrollProgress * 100, 1)
  const scrollIndicatorEased = scrollIndicatorProgress * scrollIndicatorProgress // ease-in for snappier start

  // Vaporize easing
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  // Caption: Lighter vaporize - faster fade, more blur, minimal movement, no scale
  const captionOpacityOut = Math.max(0, (scrollProgress - 0.15) / 0.35) // 15%→50% (faster)
  const captionOpacity = 1 - easeOutCubic(captionOpacityOut)
  const captionBlurProgress = Math.max(0, (scrollProgress - 0.15) / 0.35)
  const captionBlur = easeOutCubic(captionBlurProgress) * 12 // More blur
  const captionTranslateY = -easeOutCubic(scrollProgress) * window.innerHeight * 0.1 // Eased parallax
  const captionStyle = {
    opacity: captionOpacity,
    transform: `translateY(${captionTranslateY}px)`, // No scale
    filter: `blur(${captionBlur}px)`,
  }

  // Name: Vaporize effect (same smooth interpolation as Crafting blurb)

  // Opacity: holds until 20%, fades out 20%→80%
  const nameOpacityOut = Math.max(0, (scrollProgress - 0.2) / 0.6)
  const nameOpacity = 1 - easeOutCubic(nameOpacityOut)

  // Blur: starts after 20%, ramps up
  const nameBlurProgress = Math.max(0, (scrollProgress - 0.2) / 0.6)
  const nameBlur = easeOutCubic(nameBlurProgress) * 10

  // Scale: 1.0 → 0.96 (subtle, like Crafting)
  const nameScale = 1 - (easeOutCubic(nameBlurProgress) * 0.04)

  // Parallax: moves up slower than scroll (eased for smooth deceleration)
  const nameTranslateY = -easeOutCubic(scrollProgress) * window.innerHeight * 0.3

  const nameStyle = {
    opacity: nameOpacity,
    transform: `translateY(${nameTranslateY}px) scale(${nameScale})`,
    filter: `blur(${nameBlur}px)`,
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Animated blob background */}
      <Solstice />

      {/* Content container - centered */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Name - large and centered, foreground layer */}
        {/* Outer div handles dissolve, inner h1 handles entrance animation */}
        <div style={nameStyle}>
          <h1
            className="font-silk text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight text-center animate-fluid-in opacity-0"
            style={{
              color: isDark ? 'white' : '#1A1A1A',
              animationDelay: '200ms'
            }}
          >
            Grace Guo
          </h1>
        </div>

        {/* Caption line with star separator - mid layer */}
        {/* Outer div handles dissolve, inner div handles entrance animation */}
        <div style={captionStyle}>
          <div
            className="flex items-center gap-3 mt-6 md:mt-8 animate-fade-up opacity-0"
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

        {/* Scroll indicator - dissolves IMMEDIATELY when scrolling starts */}
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

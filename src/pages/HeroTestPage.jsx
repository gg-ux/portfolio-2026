import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Painterly from '../components/Painterly'
import FluidBlob from '../components/FluidBlob'
import Navigation from '../components/Navigation'
import CustomCursor from '../components/CustomCursor'
import GlobalGrain from '../components/GlobalGrain'
import ScrambleText from '../components/ScrambleText'

export default function HeroTestPage() {
  const { isDark } = useTheme()
  const [scrollEffects, setScrollEffects] = useState({
    nameOpacity: 1,
    nameBlur: 0,
    nameScale: 1,
    nameTranslateY: 0,
    captionOpacity: 1,
    captionBlur: 0,
    captionTranslateY: 0,
  })

  const rafRef = useRef(null)
  const lastEffectsRef = useRef(scrollEffects)

  useEffect(() => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const updateScrollEffects = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      // Name: starts fading at 15%, mostly gone by 60%
      const nameFadeStart = vh * 0.15
      const nameFadeEnd = vh * 0.6
      let nameProgress = 0
      if (scrollY > nameFadeStart) {
        nameProgress = Math.min(1, (scrollY - nameFadeStart) / (nameFadeEnd - nameFadeStart))
      }
      const easedNameProgress = easeOutCubic(nameProgress)

      // Caption: faster fade (15% to 50%)
      const captionFadeStart = vh * 0.15
      const captionFadeEnd = vh * 0.5
      let captionProgress = 0
      if (scrollY > captionFadeStart) {
        captionProgress = Math.min(1, (scrollY - captionFadeStart) / (captionFadeEnd - captionFadeStart))
      }
      const easedCaptionProgress = easeOutCubic(captionProgress)

      const newEffects = {
        nameOpacity: 1 - easedNameProgress,
        nameBlur: easedNameProgress * 8,
        nameScale: 1 - easedNameProgress * 0.05,
        nameTranslateY: -easeOutCubic(scrollY / vh) * vh * 0.25,
        captionOpacity: 1 - easedCaptionProgress,
        captionBlur: easedCaptionProgress * 12,
        captionTranslateY: -easeOutCubic(scrollY / vh) * vh * 0.1,
      }

      const last = lastEffectsRef.current
      const hasChanged = Object.keys(newEffects).some(
        key => Math.abs(newEffects[key] - last[key]) > 0.001
      )

      if (hasChanged) {
        setScrollEffects(newEffects)
        lastEffectsRef.current = newEffects
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
  }, [])

  return (
    <div className={`${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
      <CustomCursor />
      <GlobalGrain />
      <Navigation />
      <Painterly />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Name - large and centered */}
        <div
          style={{
            opacity: scrollEffects.nameOpacity,
            filter: `blur(${scrollEffects.nameBlur}px)`,
            transform: `translateY(${scrollEffects.nameTranslateY}px) scale(${scrollEffects.nameScale})`,
          }}
        >
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

        {/* Caption line with star separator */}
        <div
          style={{
            opacity: scrollEffects.captionOpacity,
            filter: `blur(${scrollEffects.captionBlur}px)`,
            transform: `translateY(${scrollEffects.captionTranslateY}px)`,
          }}
        >
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

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: scrollEffects.nameOpacity,
            transform: `translateY(${-scrollEffects.nameTranslateY * 0.1}px)`,
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
      </section>

      {/* Fluid Typography Hero */}
      <section
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: '#0a0a0f' }}
      >
        <style>{`
          @keyframes morph-gradient {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes morph-blur {
            0%, 100% {
              transform: translateX(-2px) translateY(1px);
              opacity: 0.5;
            }
            33% {
              transform: translateX(2px) translateY(-1px);
              opacity: 0.3;
            }
            66% {
              transform: translateX(-1px) translateY(-2px);
              opacity: 0.4;
            }
          }
          .morph-text {
            position: relative;
            background: linear-gradient(90deg, #a78bfa, #4F46E5, #a78bfa, #F59E0B, #a78bfa);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: morph-gradient 12s ease-in-out infinite;
          }
          .morph-text::before {
            content: 'Grace Guo';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, #4F46E5, #a78bfa, #F59E0B, #4F46E5);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            filter: blur(8px);
            animation: morph-gradient 12s ease-in-out infinite reverse, morph-blur 8s ease-in-out infinite;
            z-index: -1;
          }
        `}</style>

        <div className="text-center">
          <h1 className="font-silk text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight morph-text">
            Grace Guo
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="font-mono text-[14px] text-white/70 uppercase tracking-wider">
              UX/UI Designer, MHCI+D
            </span>
            <span className="text-white/40 text-[10px]">✦</span>
            <span className="font-mono text-[14px] text-white/70 uppercase tracking-wider">
              Based in Los Angeles
            </span>
          </div>
        </div>
      </section>

      {/* Color Palette Exploration */}
      <section
        className="relative z-10 min-h-screen py-24 px-6"
        style={{ background: '#0a0a0f' }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="font-silk text-4xl text-white mb-4 text-center">Color Palette Exploration</h2>
          <p className="text-white/50 text-center mb-16 font-mono text-sm">Current colors used across the page</p>

          {/* Palette 1: Original Painterly */}
          <div className="mb-16">
            <h3 className="text-white/80 font-mono text-sm uppercase tracking-wider mb-4">Palette A: Original (Painterly)</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#A78BFA' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#0F766E' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#EA580C' }} />
            </div>
            <div className="flex gap-4 text-white/50 font-mono text-xs">
              <span className="flex-1">Lavender #A78BFA</span>
              <span className="flex-1">Teal #0F766E</span>
              <span className="flex-1">Burnt Orange #EA580C</span>
            </div>
          </div>

          {/* Palette 2: Current Blob */}
          <div className="mb-16">
            <h3 className="text-white/80 font-mono text-sm uppercase tracking-wider mb-4">Palette B: Deep Violet (Current Blob)</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#7C3AED' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#6D28D9' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#8B5CF6' }} />
            </div>
            <div className="flex gap-4 text-white/50 font-mono text-xs">
              <span className="flex-1">Violet #7C3AED</span>
              <span className="flex-1">Deep Violet #6D28D9</span>
              <span className="flex-1">Light Violet #8B5CF6</span>
            </div>
          </div>

          {/* Palette 3: Morphing Text */}
          <div className="mb-16">
            <h3 className="text-white/80 font-mono text-sm uppercase tracking-wider mb-4">Palette C: Holographic (Morphing Text)</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#A78BFA' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#22D3EE' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#F0ABFC' }} />
            </div>
            <div className="flex gap-4 text-white/50 font-mono text-xs">
              <span className="flex-1">Lavender #A78BFA</span>
              <span className="flex-1">Cyan #22D3EE</span>
              <span className="flex-1">Pink #F0ABFC</span>
            </div>
          </div>

          {/* Palette 4: Unified Proposal */}
          <div className="mb-16">
            <h3 className="text-white/80 font-mono text-sm uppercase tracking-wider mb-4">Palette D: Unified Proposal</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#8B5CF6' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#06B6D4' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#F472B6' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#0a0a0f' }} />
            </div>
            <div className="flex gap-4 text-white/50 font-mono text-xs">
              <span className="flex-1">Violet #8B5CF6</span>
              <span className="flex-1">Cyan #06B6D4</span>
              <span className="flex-1">Pink #F472B6</span>
              <span className="flex-1">Dark #0a0a0f</span>
            </div>
          </div>

          {/* Palette 5: Warm Accent */}
          <div className="mb-16">
            <h3 className="text-white/80 font-mono text-sm uppercase tracking-wider mb-4">Palette E: Cool + Warm Accent</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#8B5CF6' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#14B8A6' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#F59E0B' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#0a0a0f' }} />
            </div>
            <div className="flex gap-4 text-white/50 font-mono text-xs">
              <span className="flex-1">Violet #8B5CF6</span>
              <span className="flex-1">Teal #14B8A6</span>
              <span className="flex-1">Amber #F59E0B</span>
              <span className="flex-1">Dark #0a0a0f</span>
            </div>
          </div>

          {/* Palette 6: NEW - Violet Twilight/Bright Lavender/Dusty Rose */}
          <div className="mb-16 p-6 rounded-xl border border-white/20">
            <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-4">Palette F: Violet Twilight + Bright Lavender + Dusty Rose (Soulful)</h3>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#5B21B6' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#C084FC' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#D4A5A5' }} />
              <div className="flex-1 h-24 rounded-lg" style={{ background: '#0a0a0f' }} />
            </div>
            <div className="flex gap-4 text-white/50 font-mono text-xs">
              <span className="flex-1">Violet Twilight #5B21B6</span>
              <span className="flex-1">Bright Lavender #C084FC</span>
              <span className="flex-1">Dusty Rose #D4A5A5</span>
              <span className="flex-1">Dark #0a0a0f</span>
            </div>
          </div>
        </div>
      </section>

      {/* Standalone Blob Section */}
      <section
        className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-12 px-6"
        style={{
          background: '#0a0a0f',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <h2 className="font-silk text-4xl text-white">
          Standalone Blob
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <FluidBlob size={250} />
          <FluidBlob size={350} />
          <FluidBlob size={200} />
        </div>
      </section>

      {/* Hero with Single Blob */}
      <section
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
        style={{
          background: '#0a0a0f',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <h1 className="font-silk text-6xl md:text-8xl text-white leading-[0.9]">
              Grace Guo
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
              <span className="font-mono text-[13px] text-white/60 uppercase tracking-wider">
                UX/UI Designer, MHCI+D
              </span>
              <span className="text-white/40 text-[10px]">✦</span>
              <span className="font-mono text-[13px] text-white/60 uppercase tracking-wider">
                Based in Los Angeles
              </span>
            </div>
          </div>

          {/* Single blob */}
          <FluidBlob size={400} />
        </div>
      </section>

      {/* Hero with Centered Blob + Text Overlay */}
      <section
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
        style={{
          background: '#0a0a0f',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative flex items-center justify-center">
          {/* Large centered blob */}
          <FluidBlob size={850} />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <h1 className="font-silk text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight text-white drop-shadow-lg">
              Grace Guo
            </h1>
            <div className="flex items-center gap-3 mt-6 md:mt-8">
              <span className="font-mono text-[14px] font-light tracking-normal uppercase text-white/80 drop-shadow">
                UX/UI Designer, MHCI+D
              </span>
              <span className="text-white/40 text-[10px]">✦</span>
              <span className="font-mono text-[14px] font-light tracking-normal uppercase text-white/80 drop-shadow">
                Based in Los Angeles
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

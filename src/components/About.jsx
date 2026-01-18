import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'
import { Caption, Body, H2 } from './Typography'
import ScrambleText from './ScrambleText'
import { ButtonWithArrow } from './ui/Button'
import bioPic from '../assets/BioPic2.JPG'

export default function About() {
  const [sectionRef, sectionVisible] = useScrollReveal({ threshold: 0.15 })
  const { isDark } = useTheme()
  const imageRef = useRef(null)
  const [imageBlur, setImageBlur] = useState(6)

  useEffect(() => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const handleScroll = () => {
      if (!imageRef.current) return

      const rect = imageRef.current.getBoundingClientRect()
      const vh = window.innerHeight

      // Calculate progress: 0 = just entering bottom, 0.5 = centered, 1 = exiting top
      const imageCenter = rect.top + rect.height / 2
      const progress = 1 - (imageCenter / vh)

      // Entrance blur: starts at 6px, clears as it approaches center (0 to 0.4 progress)
      const entranceBlur = (1 - easeOutCubic(Math.min(1, progress / 0.4))) * 6

      // Exit blur: blurs again as it passes center (0.6 to 1 progress)
      const exitBlur = easeOutCubic(Math.max(0, (progress - 0.6) / 0.4)) * 6

      const blur = entranceBlur + exitBlur
      setImageBlur(blur)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" className="py-32 md:py-48" style={{ scrollSnapAlign: 'start' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={sectionRef}
          className={`transition-all duration-1000 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Editorial Layout: Photo left, Quote right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-center">

            {/* Photo - Editorial rectangle on tablet+ only */}
            <div className="hidden md:block md:col-span-5 lg:col-span-4">
              <div className="relative aspect-[3/4] max-w-[280px] mx-auto md:mx-0">
                <div
                  ref={imageRef}
                  className="absolute inset-0 z-10 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: isDark
                      ? '0 20px 50px rgba(0,0,0,0.5)'
                      : '0 20px 50px rgba(0,0,0,0.15)',
                  }}
                >
                  <img
                    src={bioPic}
                    alt="Grace Guo"
                    className="w-full h-full object-cover object-top"
                    style={{
                      filter: imageBlur > 0.5 ? `blur(${imageBlur}px)` : 'none',
                      willChange: 'filter',
                    }}
                  />
                </div>
                {/* Frosted glass frame */}
                <div
                  className={`absolute -inset-3 rounded-2xl pointer-events-none backdrop-blur-md border ${
                    isDark
                      ? 'border-white/[0.08] bg-white/[0.015]'
                      : 'border-black/[0.08] bg-white/20'
                  }`}
                >
                  {/* Subtle grain overlay */}
                  <svg className="absolute inset-0 w-full h-full rounded-2xl opacity-40">
                    <defs>
                      <filter id="bio-frame-grain" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.8"
                          numOctaves="4"
                          seed="42"
                          stitchTiles="stitch"
                        />
                        <feColorMatrix
                          type="matrix"
                          values={isDark
                            ? "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0"
                            : "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"
                          }
                        />
                      </filter>
                    </defs>
                    <rect width="100%" height="100%" filter="url(#bio-frame-grain)" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quote + Info */}
            <div className="md:col-span-7 lg:col-span-8">
              {/* Large pull quote */}
              <blockquote className="mb-5 max-w-2xl">
                <H2 className="leading-snug">
                  Meaningful design is care,<br />made visible.
                </H2>
              </blockquote>

              {/* Supporting text */}
              <Body className="mb-10 max-w-2xl">
                I want people to feel understood, not processed. This belief has driven 7+ years of work: core experiences at Tesla, a healthcare app for real patients, an in-vehicle interface that can't afford confusion. Now I'm at a mission-driven AI startup, shipping product and code.
              </Body>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <ButtonWithArrow
                  href="/resume"
                  variant="primary"
                  size="md"
                  direction="right"
                >
                  Résumé
                </ButtonWithArrow>
                <ButtonWithArrow
                  href="https://www.linkedin.com/in/grace-guo-ux/"
                  external
                  variant="secondary"
                  size="md"
                  direction="external"
                >
                  LinkedIn
                </ButtonWithArrow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

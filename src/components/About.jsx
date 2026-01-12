import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'
import { Caption, Body } from './Typography'
import ScrambleText from './ScrambleText'
import { ButtonWithArrow } from './ui/Button'
import bioPic from '../assets/BioPic2.JPG'

export default function About() {
  const [sectionRef, sectionVisible] = useScrollReveal({ threshold: 0.15 })
  const { isDark } = useTheme()

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
              <blockquote className="mb-8">
                <p
                  className="font-satoshi text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight"
                  style={{ color: isDark ? 'white' : '#1A1A1A' }}
                >
                  I like thinking of the person on the other side of the screen—what they're feeling, what's at stake for them, what would earn their trust.
                </p>
              </blockquote>

              {/* Supporting text */}
              <Body className="text-xl leading-relaxed mb-10 max-w-2xl">
                That's shaped 7+ years of work: core experiences at Tesla, healthcare apps built around real patient needs, in-vehicle interfaces that can't afford confusion. These days I'm the only designer at an AI startup, shipping product, web, and code.
              </Body>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <ButtonWithArrow
                  href="/resume"
                  variant="primary"
                  size="md"
                  direction="right"
                >
                  Resume
                </ButtonWithArrow>
                <ButtonWithArrow
                  href="https://linkedin.com/in/grace-guo-ux"
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

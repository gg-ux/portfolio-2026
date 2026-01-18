import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Body, H2 } from './Typography'
import { ButtonWithArrow } from './ui/Button'
import ContactForm from './ContactForm'
import bioPic from '../assets/BioPic2.JPG'

export default function BioContactTransition() {
  const { isDark } = useTheme()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Initial entrance (0-0.18): Bio fades in with blur clear - slightly delayed
  const entranceOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1])
  const entranceY = useTransform(scrollYProgress, [0.05, 0.18], [60, 0])
  const entranceBlur = useTransform(scrollYProgress, [0.05, 0.2], [8, 0])

  // Stage 1 (0.15-0.45): Bio text visible, then exits
  const bioTextOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.45], [1, 1, 0])
  const bioTextY = useTransform(scrollYProgress, [0.15, 0.35, 0.45], [0, 0, -40])

  // Stage 2 (0.4-0.55): Contact headline enters
  const contactHeadlineOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
  const contactHeadlineY = useTransform(scrollYProgress, [0.4, 0.55], [40, 0])

  // Stage 3 (0.55-0.75): Form enters
  const formOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const formY = useTransform(scrollYProgress, [0.55, 0.75], [40, 0])

  // Track which section should be interactive
  const [contactInteractive, setContactInteractive] = useState(false)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Enable contact interaction after bio fades out (around 0.45)
    setContactInteractive(latest > 0.5)
  })

  return (
    <section id="about" ref={containerRef} className="relative h-[280vh] mt-16 md:mt-8 lg:-mt-24">
      {/* Contact anchor - positioned at ~40% scroll where contact appears */}
      <div id="contact" className="absolute" style={{ top: '40%' }} />
      <div className="sticky top-0 h-screen flex items-center pt-24 overflow-hidden">
        <motion.div
          className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full"
          style={{
            opacity: entranceOpacity,
            y: entranceY,
            filter: useTransform(entranceBlur, (v) => v > 0.5 ? `blur(${v}px)` : 'none'),
          }}
        >

          {/* Same grid layout as original bio */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 items-start">

            {/* Photo - stays visible throughout */}
            <div className="hidden md:block md:col-span-4 lg:col-span-4">
              <div className="relative aspect-[3/4] max-w-[240px] lg:max-w-[280px] mx-auto md:mx-0">
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
                  <svg className="absolute inset-0 w-full h-full rounded-2xl opacity-40">
                    <defs>
                      <filter id="bio-frame-grain-transition" x="0%" y="0%" width="100%" height="100%">
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
                    <rect width="100%" height="100%" filter="url(#bio-frame-grain-transition)" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column - Content transitions */}
            <div className="md:col-span-8 lg:col-span-8 relative min-h-[500px]">

              {/* Bio Content (exits) */}
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: bioTextOpacity,
                  y: bioTextY,
                }}
              >
                <blockquote className="mb-5">
                  <H2>
                    Meaningful design is care,<br />made visible.
                  </H2>
                </blockquote>
                <Body className="mb-10 max-w-2xl">
                  I want people to feel understood, not processed. This belief has driven 7+ years of work: core experiences at Tesla, a healthcare app for real patients, an in-vehicle interface that can't afford confusion. Now I'm at a mission-driven AI startup, shipping product and code.
                </Body>
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
              </motion.div>

              {/* Contact Content (enters) - only interactive after bio fades out */}
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: contactHeadlineOpacity,
                  pointerEvents: contactInteractive ? 'auto' : 'none',
                }}
              >
                {/* Headline */}
                <motion.div
                  style={{
                    y: contactHeadlineY,
                  }}
                >
                  <H2 className="mb-8">Say hello</H2>
                </motion.div>

                {/* Form */}
                <motion.div
                  style={{
                    opacity: formOpacity,
                    y: formY,
                  }}
                >
                  <ContactForm />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

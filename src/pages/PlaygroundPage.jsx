import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { H1, Body, Caption } from '../components/Typography'
import Button from '../components/ui/Button'
import FluidBlob from '../components/FluidBlob'
import Solstice from '../components/Solstice'
import Painterly from '../components/Painterly'
import AuraBeams from '../components/AuraBeams'
import SolsticeLoader from '../components/SolsticeLoader'
import FluidityLoader from '../components/FluidityLoader'
import Navigation from '../components/Navigation'
import CustomCursor from '../components/CustomCursor'
import GlobalGrain from '../components/GlobalGrain'

export default function PlaygroundPage() {
  const { isDark } = useTheme()
  const [fluidityLoaderKey, setFluidityLoaderKey] = useState(0)
  const [solsticeLoaderKey, setSolsticeLoaderKey] = useState(0)

  // Theme-aware classes
  const bgMain = isDark ? 'bg-[#0a0a0f]' : 'bg-[#FAF8F4]'
  const textHeading = isDark ? 'text-white' : 'text-gray-900'
  const textMuted = isDark ? 'text-white/60' : 'text-gray-500'
  const textBody = isDark ? 'text-white/80' : 'text-gray-600'
  const borderSubtle = isDark ? 'border-white/10' : 'border-black/[0.08]'
  const borderFaint = isDark ? 'border-white/5' : 'border-black/[0.05]'
  const cardBg = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
  const gridColor = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'

  return (
    <div className={`${bgMain} min-h-screen`}>
      <CustomCursor />
      <GlobalGrain />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 pt-24">
        <H1 className="text-center">Digital Playground</H1>
        <Caption className="mt-6 text-center block" scramble={false}>
          Exploring color, motion & identity
        </Caption>
      </section>

      {/* Chapter 1: The Fluid Blob - Current Direction */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Caption scramble={false}>Chapter 01</Caption>
          <h2 className={`font-silk text-4xl ${textHeading} mt-2 mb-4`}>The Fluid Blob</h2>
          <Body size="sm" className="max-w-2xl mb-16">
            A 3D form that lives and breathes. Built with React Three Fiber and custom GLSL shaders,
            it captures light in ways that feel almost alive. This became my signature element.
          </Body>

          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(${gridColor} 1px, transparent 1px),
                linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-8 py-12">
            <FluidBlob size={180} seed={1} />
            <FluidBlob size={320} seed={2} />
            <FluidBlob size={220} seed={3} />
          </div>

          <div className={`mt-12 p-6 rounded-xl border ${borderSubtle} ${cardBg}`}>
            <Caption scramble={false} className="mb-3 block">Technical Notes</Caption>
            <ul className={`text-sm space-y-2 ${textBody}`}>
              <li>• Icosahedron geometry with 128 subdivisions for smooth organic form</li>
              <li>• Custom vertex + fragment shader with simplex noise displacement</li>
              <li>• Fresnel-based rim lighting for depth</li>
              <li>• Mouse-reactive rotation with smooth interpolation</li>
              <li>• Intersection Observer for performance (pauses when offscreen)</li>
            </ul>
          </div>

          {/* Fluidity Loader - Sub-section */}
          <div className={`mt-12 pl-6 border-l ${borderSubtle}`}>
            <div className="flex gap-6 items-start">
              <div className={`relative w-[200px] h-[200px] rounded-xl overflow-hidden border ${borderFaint} ${bgMain} shrink-0`}>
                <FluidityLoader key={fluidityLoaderKey} duration={3000} contained />
              </div>
              <div className="pt-1">
                <Caption scramble={false} className="mb-2 block">Fluidity Loader</Caption>
                <Body size="sm" className="opacity-70 mb-4">
                  A morphing blob loader that fits the Fluidity theme. Features an organic SVG blob that
                  smoothly morphs between shapes while pulsing with the Soulful palette.
                  A progress ring tracks loading state, completing with the logo before fading out.
                </Body>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setFluidityLoaderKey(k => k + 1)}
                >
                  Replay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Color Evolution */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Caption scramble={false}>Chapter 02</Caption>
          <h2 className={`font-silk text-4xl ${textHeading} mt-2 mb-4`}>Color Evolution</h2>
          <Body size="sm" className="max-w-2xl mb-16">
            Finding the right palette was a journey itself. I wanted colors that felt emotional and soulful -
            not the typical tech blues or startup oranges. Each iteration taught me something new.
          </Body>

          {/* Current Direction */}
          <div className={`mb-16 p-8 rounded-2xl border ${isDark ? 'border-white/20' : 'border-black/10'} ${cardBg}`}>
            <Caption scramble={false}>Current Direction</Caption>
            <h3 className={`${textHeading} font-silk text-2xl mt-2 mb-6`}>Soulful</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 h-28 rounded-xl" style={{ background: '#5B21B6' }} />
              <div className="flex-1 h-28 rounded-xl" style={{ background: '#C084FC' }} />
              <div className="flex-1 h-28 rounded-xl" style={{ background: '#D4A5A5' }} />
            </div>
            <div className={`flex gap-4 font-mono text-xs ${textMuted}`}>
              <span className="flex-1">Violet Twilight</span>
              <span className="flex-1">Bright Lavender</span>
              <span className="flex-1">Dusty Rose</span>
            </div>
            <Body size="sm" className="mt-6 max-w-2xl">
              Deep purples that feel like twilight, softened by dusty rose for warmth.
              This palette says "emotional designer" without being precious about it.
            </Body>
          </div>

          {/* Color Iterations */}
          <div className="mt-16">
            <Caption scramble={false} className="mb-4 block">Color Iterations</Caption>
            <Body size="sm" className="max-w-2xl mb-8 opacity-70">
              Color is emotional. Each iteration taught me something about what I was trying to communicate.
              I wanted colors that felt like me - creative, warm, a bit unconventional - not the typical
              tech blues or startup oranges. The journey from scattered to soulful took many tries.
            </Body>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-5 rounded-xl border ${borderFaint}`}>
                <Caption scramble={false} className="mb-3 block">V1: Original</Caption>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#A78BFA' }} />
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#0F766E' }} />
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#EA580C' }} />
                </div>
                <Body size="sm" className="text-xs">
                  Too scattered - three completely different vibes fighting for attention.
                  Lavender felt right, but teal and orange pulled in opposite directions.
                </Body>
              </div>

              <div className={`p-5 rounded-xl border ${borderFaint}`}>
                <Caption scramble={false} className="mb-3 block">V2: Deep Violet</Caption>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#7C3AED' }} />
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#6D28D9' }} />
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#8B5CF6' }} />
                </div>
                <Body size="sm" className="text-xs">
                  Cohesive but too cold and monochromatic. Lost the warmth and personality.
                  Needed something to break the monotony without chaos.
                </Body>
              </div>

              <div className={`p-5 rounded-xl border ${borderFaint}`}>
                <Caption scramble={false} className="mb-3 block">V3: Cool + Warm</Caption>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#8B5CF6' }} />
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#14B8A6' }} />
                  <div className="flex-1 h-12 rounded-lg" style={{ background: '#F59E0B' }} />
                </div>
                <Body size="sm" className="text-xs">
                  Too "startup energy" - felt like every other tech portfolio.
                  Missing the emotional, soulful quality I wanted to express.
                </Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Fluid Typography */}
      <section className="relative py-32 px-6 overflow-visible">
        <div className="max-w-5xl mx-auto">
          <Caption scramble={false}>Chapter 03</Caption>
          <h2 className={`font-silk text-4xl ${textHeading} mt-2 mb-4`}>Fluid Typography</h2>
          <Body size="sm" className="max-w-2xl mb-16">
            Text that morphs and breathes. A CSS gradient animation creates movement without distraction -
            the letters feel alive but remain readable.
          </Body>

          <style>{`
            @keyframes morph-gradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .morph-text {
              position: relative;
              background: linear-gradient(90deg, #A78BFA, #7E22CE, #A78BFA, #D4A5A5, #A78BFA);
              background-size: 300% 100%;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: morph-gradient 12s ease-in-out infinite;
              will-change: background-position;
            }
          `}</style>

          <div className="text-center pt-20 pb-8 overflow-visible">
            <h3 className="font-silk text-[15vw] md:text-[10vw] leading-[1.3] tracking-tight morph-text px-4">
              Expressive
            </h3>
          </div>
        </div>
      </section>

      {/* Chapter 4: Hero Exploration */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto mb-16">
          <Caption scramble={false}>Chapter 04</Caption>
          <h2 className={`font-silk text-4xl ${textHeading} mt-2 mb-4`}>Hero Exploration</h2>
          <Body size="sm" className="max-w-2xl">
            The hero is the first impression. I explored different compositions -
            finding the balance between statement and restraint.
          </Body>
        </div>

        {/* Centered Blob Hero */}
        <div className="relative mb-16">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(${gridColor} 1px, transparent 1px),
                linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative flex items-center justify-center min-h-[80vh]">
            <FluidBlob size={700} />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <h1 className={`font-silk text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] tracking-tight ${textHeading} drop-shadow-lg`}>
                Grace Guo
              </h1>
              <div className="flex items-center gap-3 mt-6 md:mt-8">
                <span className={`font-mono text-[14px] font-light tracking-normal uppercase ${textBody} drop-shadow`}>
                  UX/UI Designer, MHCI+D
                </span>
                <span className={`${textMuted} text-[10px]`}>✦</span>
                <span className={`font-mono text-[14px] font-light tracking-normal uppercase ${textBody} drop-shadow`}>
                  Based in Los Angeles
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-8">
            <Caption scramble={false}>Current Direction</Caption>
            <h3 className={`${textHeading} font-silk text-xl mt-1`}>Centered Blob</h3>
            <Body size="sm" className="mt-2 max-w-2xl">The blob becomes a living signature - identity emerging from fluid form</Body>
          </div>
        </div>
      </section>

      {/* Chapter 5: Grid Systems */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Caption scramble={false}>Chapter 05</Caption>
          <h2 className={`font-silk text-4xl ${textHeading} mt-2 mb-4`}>Grid Systems</h2>
          <Body size="sm" className="max-w-2xl mb-16">
            Grids provide structure and rhythm. I explored both static and animated variations -
            from subtle guidelines to living, breathing patterns.
          </Body>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Static Grid */}
            <div className={`relative h-[350px] rounded-2xl overflow-hidden border ${borderSubtle}`}>
              <div className={`absolute inset-0 ${bgMain}`} />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(${gridColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <Caption scramble={false}>Background</Caption>
                <h3 className={`${textHeading} font-silk text-lg mt-1`}>Static Grid</h3>
                <Body size="sm" className="mt-1 text-sm">Subtle structure without distraction</Body>
              </div>
            </div>

            {/* Dot Grid */}
            <div className={`relative h-[350px] rounded-2xl overflow-hidden border ${borderSubtle}`}>
              <div className={`absolute inset-0 ${bgMain}`} />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <Caption scramble={false}>Alternative</Caption>
                <h3 className={`${textHeading} font-silk text-lg mt-1`}>Dot Grid</h3>
                <Body size="sm" className="mt-1 text-sm">Softer, more organic feel</Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive: Previous Explorations */}
      <section className={`relative py-32 px-6 border-t ${borderFaint}`}>
        <div className="max-w-5xl mx-auto">
          <Caption scramble={false}>Archive</Caption>
          <h2 className={`font-silk text-3xl ${textMuted} mt-2 mb-4`}>Previous Explorations</h2>
          <Body size="sm" className="max-w-2xl mb-16">
            Earlier directions that informed the final outcome. Each taught me something valuable.
          </Body>

          {/* Solstice */}
          <div className="mb-16">
            <div className={`relative h-[500px] w-full rounded-2xl overflow-hidden border ${borderFaint} z-[101]`}>
              <div className={`absolute inset-0 ${bgMain} pointer-events-none`} />
              {/* Grid background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(${gridColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px',
                }}
              />
              {/* AuraBeams effect - needs to capture mouse events */}
              <AuraBeams contained />
              <div className="absolute inset-0 pointer-events-none">
                <Solstice static={true} position="center" scale={1.1} />
              </div>
              {/* Dark grain overlay - multiply blend only darkens */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ mixBlendMode: 'multiply' }}
              >
                <defs>
                  <filter id="solstice-grain" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.7"
                      numOctaves="4"
                      seed="15"
                      stitchTiles="stitch"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.4 0"
                    />
                  </filter>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#solstice-grain)"
                  fill="#808080"
                />
              </svg>
              {/* Hero text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                <h3 className={`font-silk text-[15vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight ${textHeading}`}>
                  Grace Guo
                </h3>
                <div className="flex items-center gap-3 mt-4">
                  <span className={`font-mono text-[12px] font-light tracking-normal uppercase ${textBody}`}>
                    UX/UI Designer, MHCI+D
                  </span>
                  <span className={`${textMuted} text-[10px]`}>✦</span>
                  <span className={`font-mono text-[12px] font-light tracking-normal uppercase ${textBody}`}>
                    Based in Los Angeles
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className={`${textMuted} font-silk text-lg`}>Solstice</h4>
              <Body size="sm" className="mt-1 max-w-2xl">
                Canvas-based aurora with layered gradients. Too safe and boring - the ominous atmosphere felt like
                drifting into the silence of space, which wasn't friendly enough. The soft, diffuse edges made it
                feel less intentional, and the three-color palette (lavender, teal, orange) created visual
                competition rather than harmony.
              </Body>
            </div>

            {/* Welcome Loader - Sub-section */}
            <div className={`mt-8 pl-6 border-l ${borderSubtle}`}>
              {/* Loader animation keyframes */}
              <style>{`
                @keyframes loader-ring-fill {
                  0% { stroke-dashoffset: 245; }
                  40%, 100% { stroke-dashoffset: 0; }
                }
                @keyframes loader-gradient-rotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes loader-bloom {
                  0%, 40% { opacity: 0; transform: scale(0.8); }
                  60%, 80% { opacity: 1; transform: scale(1.2); }
                  100% { opacity: 0; transform: scale(1.4); }
                }
                @keyframes loader-breathe {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                }
                @keyframes loader-fade {
                  0%, 10% { opacity: 0; filter: blur(8px); }
                  25%, 75% { opacity: 1; filter: blur(0); }
                  90%, 100% { opacity: 0; filter: blur(8px); }
                }
              `}</style>

              <div className="flex gap-6 items-start">
                <div key={solsticeLoaderKey} className={`relative w-[200px] h-[200px] rounded-xl overflow-hidden border ${borderFaint} ${bgMain} shrink-0 flex items-center justify-center`}>
                  {/* Bloom glow */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 120,
                      height: 120,
                      background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0.2) 50%, transparent 70%)',
                      filter: 'blur(20px)',
                      animation: 'loader-bloom 4s ease-in-out',
                    }}
                  />

                  {/* Progress ring */}
                  <svg
                    width={80}
                    height={80}
                    className="absolute"
                    style={{
                      transform: 'rotate(-90deg)',
                      filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 16px rgba(15, 118, 110, 0.3))',
                      animation: 'loader-fade 4s ease-in-out',
                    }}
                  >
                    <defs>
                      <linearGradient id="loaderGradient">
                        <stop offset="0%" stopColor="#A78BFA" />
                        <stop offset="50%" stopColor="#0F766E" />
                        <stop offset="100%" stopColor="#A78BFA" />
                        <animateTransform
                          attributeName="gradientTransform"
                          type="rotate"
                          from="0 0.5 0.5"
                          to="360 0.5 0.5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </linearGradient>
                    </defs>
                    {/* Background circle */}
                    <circle
                      cx={40}
                      cy={40}
                      r={39}
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth={1.5}
                    />
                    {/* Progress circle */}
                    <circle
                      cx={40}
                      cy={40}
                      r={39}
                      fill="none"
                      stroke="url(#loaderGradient)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray={245}
                      style={{
                        animation: 'loader-ring-fill 4s ease-in-out',
                      }}
                    />
                  </svg>

                  {/* Logo */}
                  <img
                    src="/images/branding/logo.svg"
                    alt="Logo"
                    className={`h-6 w-auto relative ${isDark ? 'invert' : ''}`}
                    style={{
                      animation: 'loader-breathe 2s ease-in-out infinite, loader-fade 4s ease-in-out',
                    }}
                  />
                </div>
                <div className="pt-1">
                  <Caption scramble={false} className="mb-2 block">Welcome Loader</Caption>
                  <Body size="sm" className="mb-4">
                    The page loader that greets visitors on first load. Features a progress ring with rotating gradient,
                    logo breathing animation, and a bloom glow on completion before fading into the main experience.
                  </Body>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSolsticeLoaderKey(k => k + 1)}
                  >
                    Replay
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Painterly */}
          <div className="mb-16">
            <div className={`relative h-[500px] w-full rounded-2xl overflow-hidden border ${borderFaint}`}>
              <Painterly contained />
              {/* Hero text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <h3 className={`font-silk text-[15vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tight ${textHeading}`}>
                  Grace Guo
                </h3>
                <div className="flex items-center gap-3 mt-4">
                  <span className={`font-mono text-[12px] font-light tracking-normal uppercase ${textBody}`}>
                    UX/UI Designer, MHCI+D
                  </span>
                  <span className={`${textMuted} text-[10px]`}>✦</span>
                  <span className={`font-mono text-[12px] font-light tracking-normal uppercase ${textBody}`}>
                    Based in Los Angeles
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className={`${textMuted} font-silk text-lg`}>Painterly</h4>
              <Body size="sm" className="mt-1 max-w-2xl">
                WebGL shader with simplex noise and fractal brownian motion. The effect was mesmerizing but too
                chaotic - it demanded attention rather than supporting content. The constant motion made it hard
                to focus on the typography, and the original color palette felt disconnected from the soulful
                direction I was pursuing.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className={`font-silk text-3xl ${textHeading} mb-6`}>The Journey Continues</h2>
          <Body className="max-w-2xl">
            Design is never finished - it's a continuous conversation between intention and discovery.
            This playground will keep evolving as I do.
          </Body>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 border-t ${borderSubtle}`}>
        <div className="max-w-5xl mx-auto text-center">
          <Caption scramble={false}>A space for creative experimentation</Caption>
        </div>
      </footer>
    </div>
  )
}

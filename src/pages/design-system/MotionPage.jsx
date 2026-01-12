import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Body } from '../../components/Typography'
import ScrambleText from '../../components/ScrambleText'
import Solstice from '../../components/Solstice'

const sections = [
  { id: 'animations', label: 'Animations' },
  { id: 'background-effects', label: 'Background Effects' },
]

export default function MotionPage() {
  const { isDark } = useTheme()
  const [scrambleKey, setScrambleKey] = useState(0)
  const [entranceKey, setEntranceKey] = useState(0)
  const [fluidKey, setFluidKey] = useState(0)
  const [fluidState, setFluidState] = useState('in') // 'in', 'visible', 'out'

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  const replayScramble = () => {
    setScrambleKey(prev => prev + 1)
  }

  const replayEntrance = () => {
    setEntranceKey(prev => prev + 1)
  }

  const replayFluid = () => {
    setFluidState('in')
    setFluidKey(prev => prev + 1)
  }

  const triggerFluidOut = () => {
    setFluidState('out')
  }

  return (
    <DSLayout title="Motion" sections={sections}>
      {/* Animations */}
      <DSSection id="animations" title="Animations">
        {/* Decode Effect */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Decode Effect</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-6">
            <div>
              <Caption className="mb-4 block">Used on Caption & Mono elements</Caption>
              <div className="flex items-center gap-6">
                <div
                  key={scrambleKey}
                  className={`font-mono text-xs tracking-wider uppercase ${isDark ? 'text-white/60' : 'text-gray-500'}`}
                >
                  <ScrambleText text="SCRAMBLE TEXT DEMO" iterations={2} speed={20} />
                </div>
                <button
                  onClick={replayScramble}
                  className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                    isDark
                      ? 'border-white/20 text-white/60 hover:border-white/40'
                      : 'border-black/20 text-gray-500 hover:border-black/40'
                  }`}
                >
                  Replay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Reveal */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Scroll Reveal</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-4">
            <Body className={isDark ? 'text-white/70' : 'text-gray-600'}>
              Content sections use IntersectionObserver to reveal on scroll with a subtle fade-up animation.
            </Body>
            <div className={`${bgSubtle} p-4 rounded-lg`}>
              <code className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                transition: opacity 1000ms, transform 1000ms<br />
                transform: translateY(0) → translateY(8px)
              </code>
            </div>
          </div>
        </div>

        {/* Exit Animation */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Exit Animation</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-4">
            <Body className={isDark ? 'text-white/70' : 'text-gray-600'}>
              When scrolling past the hero section, elements fade out with a progressive blur effect.
            </Body>
            <div className={`${bgSubtle} p-4 rounded-lg`}>
              <code className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                Blur: 0px → 8px (over 0.6vh scroll)<br />
                Opacity: 1 → 0 (synced with blur)
              </code>
            </div>
          </div>
        </div>

        {/* Fluid In/Out */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Fluid In / Out</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-6 block">Primary entrance/exit animation pair with blur and skew</Caption>

          {/* Live demo */}
          <div className="flex items-center justify-center mb-6 h-16" key={fluidKey}>
            <span
              className={`font-satoshi text-2xl ${
                fluidState === 'out' ? 'animate-fluid-out' : fluidState === 'in' ? 'animate-fluid-in' : ''
              } ${fluidState === 'in' ? 'opacity-0' : ''} ${isDark ? 'text-white/90' : 'text-gray-800'}`}
            >
              Fluid Animation
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={replayFluid}
              className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                isDark
                  ? 'border-white/20 text-white/60 hover:border-white/40'
                  : 'border-black/20 text-gray-500 hover:border-black/40'
              }`}
            >
              Replay In
            </button>
            <button
              onClick={triggerFluidOut}
              className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                isDark
                  ? 'border-white/20 text-white/60 hover:border-white/40'
                  : 'border-black/20 text-gray-500 hover:border-black/40'
              }`}
            >
              Trigger Out
            </button>
          </div>
        </div>

        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Fluid In</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Opacity 0 → 1, blur 12px → 0, translateY 8px → 0, skewX -8deg → 0
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                1.2s cubic-bezier(0.22, 1, 0.36, 1)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Fluid Out</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Opacity 1 → 0, blur 0 → 12px, translateY 0 → -80px, skewX 0 → 6deg
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                0.8s cubic-bezier(0.22, 1, 0.36, 1)
              </p>
            </div>
          </div>
        </div>

        {/* Entrance Animations */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Entrance Animations</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-6 block">Hero sequence with directional entrances</Caption>

          {/* Live demo */}
          <div className="flex items-center justify-center gap-4 mb-6" key={entranceKey}>
            <span
              className={`font-satoshi text-lg animate-slide-in-left opacity-0 ${isDark ? 'text-white/70' : 'text-gray-600'}`}
              style={{ animationDelay: '100ms' }}
            >
              From Left
            </span>
            <span
              className={`text-sm animate-scale-in opacity-0 ${isDark ? 'text-white/40' : 'text-gray-400'}`}
              style={{ animationDelay: '300ms' }}
            >
              ✦
            </span>
            <span
              className={`font-satoshi text-lg animate-slide-in-right opacity-0 ${isDark ? 'text-white/70' : 'text-gray-600'}`}
              style={{ animationDelay: '200ms' }}
            >
              From Right
            </span>
          </div>

          <button
            onClick={replayEntrance}
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
              isDark
                ? 'border-white/20 text-white/60 hover:border-white/40'
                : 'border-black/20 text-gray-500 hover:border-black/40'
            }`}
          >
            Replay
          </button>
        </div>

        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Caption className="mb-2 block">Slide In Left</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                translateX(-30px) → 0, blur 8px → 0
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                1s ease-out
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Slide In Right</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                translateX(30px) → 0, blur 8px → 0
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                1s ease-out
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Scale In (Bounce)</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                scale(0) → scale(1) with overshoot
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                0.7s cubic-bezier(0.175, 0.885, 0.32, 1.75)
              </p>
            </div>
          </div>
        </div>

        {/* Specs */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Timing Guidelines</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Micro Interactions</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                300-500ms with ease-out
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Page Transitions</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                800-1000ms with ease
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Decode Effect</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                2 iterations, 20ms per frame
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Hover States</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                300ms duration-300
              </p>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Background Effects */}
      <DSSection id="background-effects" title="Background Effects">
        {/* Aurora Blob */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Aurora Blob</h4>
        <div className={`relative border ${borderClass} rounded-xl mb-8 overflow-hidden`} style={{ height: '320px' }}>
          <Solstice static scale={0.6} />
          <div className="absolute inset-0 flex items-end p-6">
            <div className={`${bgSubtle} backdrop-blur-sm p-4 rounded-lg`}>
              <Caption className="block mb-2">Interactive Canvas</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                Multi-layer organic blob with cursor reactivity
              </p>
            </div>
          </div>
        </div>

        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <h5 className={`font-satoshi font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Features</h5>
          <ul className={`space-y-2 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            <li className="font-satoshi text-sm">• 6 layered gradients (teal, lavender, orange)</li>
            <li className="font-satoshi text-sm">• Magnetic drift toward cursor</li>
            <li className="font-satoshi text-sm">• Stretch deformation on interaction</li>
            <li className="font-satoshi text-sm">• Ripple effects on mouse enter</li>
            <li className="font-satoshi text-sm">• Scroll-based parallax and fade</li>
            <li className="font-satoshi text-sm">• Grain texture overlay</li>
          </ul>
        </div>

        {/* Aura Beams */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Aura Beams</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Body className={isDark ? 'text-white/70' : 'text-gray-600'}>
            Cursor-reactive glowing grid lines that emanate from the mouse position. Uses the brand color palette (lavender, teal, orange) with animated pulses.
          </Body>
          <div className={`${bgSubtle} p-4 rounded-lg mt-4`}>
            <code className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              Grid: 60px spacing<br />
              Effect radius: 200px<br />
              Smooth follow: 0.06 lerp<br />
              Home page only
            </code>
          </div>
        </div>

        {/* Grid Background */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Grid Background</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Body className={isDark ? 'text-white/70' : 'text-gray-600'}>
            Subtle line grid that fades in during scroll on the home page only. Creates visual rhythm during the hero-to-content transition.
          </Body>
          <div className={`${bgSubtle} p-4 rounded-lg mt-4`}>
            <code className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              Grid: 60px spacing<br />
              Fade in: 0.8vh → 1.2vh<br />
              Fade out: 3.6vh → 4.0vh<br />
              Home page only
            </code>
          </div>
        </div>

        {/* Global Grain */}
        <h4 className={`font-satoshi text-lg mb-6 ${textHeadingClass}`}>Global Grain Overlay</h4>
        <div className={`p-8 border ${borderClass} rounded-xl`}>
          <Body className={isDark ? 'text-white/70' : 'text-gray-600'}>
            Full-screen SVG noise filter applied to the entire page for a subtle textured feel.
          </Body>
          <div className={`${bgSubtle} p-4 rounded-lg mt-4`}>
            <code className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              feTurbulence: fractalNoise<br />
              baseFrequency: 0.6<br />
              Opacity: 0.08 (dark) / 0.4 (light)
            </code>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}

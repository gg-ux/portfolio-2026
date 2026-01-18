import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Body, H4 } from '../../components/Typography'
import ScrambleText from '../../components/ScrambleText'
import AuraBeams from '../../components/AuraBeams'

const sections = [
  { id: 'animations', label: 'Animations' },
  { id: 'background-effects', label: 'Background Effects' },
]

export default function MotionPage() {
  const { isDark } = useTheme()
  const [scrambleKey, setScrambleKey] = useState(0)
  const [entranceKey, setEntranceKey] = useState(0)
  const [blurInKey, setBlurInKey] = useState(0)
  const [vaporOutKey, setVaporOutKey] = useState(0)
  const [vaporOutVisible, setVaporOutVisible] = useState(true)

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

  const replayBlurIn = () => {
    setBlurInKey(prev => prev + 1)
  }

  const replayVaporOut = () => {
    setVaporOutVisible(true)
    setVaporOutKey(prev => prev + 1)
    // Auto-trigger the out animation after a brief moment
    setTimeout(() => setVaporOutVisible(false), 100)
  }

  return (
    <DSLayout title="Motion" sections={sections}>
      {/* Animations */}
      <DSSection id="animations" title="Animations">
        {/* Text Animations */}
        <H4 className="mb-6">Text Animations</H4>

        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Typewriter scramble for mono text</Caption>
          <Body weight="bold" className="mb-6">Decode</Body>

          <div className="flex items-center gap-6 mb-6">
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

          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Iterations</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>2</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Speed</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>20ms/frame</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Used On</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Caption, Mono elements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Animations */}
        <H4 className="mb-6">Scroll Animations</H4>

        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Content reveal on scroll</Caption>
          <Body weight="bold" className="mb-6">Scroll Reveal</Body>
          <Body className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            Content sections use IntersectionObserver to reveal on scroll with a subtle fade-up animation.
          </Body>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Transition</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>opacity + transform 1000ms</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Transform</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>translateY(8px) → 0</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Hero exit on scroll</Caption>
          <Body weight="bold" className="mb-6">Scroll Fade</Body>
          <Body className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            Hero elements fade out with a progressive blur effect when scrolling past.
          </Body>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Blur</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0 → 8px over 0.6vh</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Opacity</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>1 → 0 (synced with blur)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Entrance Animations */}
        <H4 className="mb-6">Entrance Animations</H4>

        {/* Blur In Demo */}
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Primary entrance with blur and skew</Caption>
          <Body weight="bold" className="mb-6">Blur In</Body>

          <div className="flex items-center justify-center mb-6 h-16" key={blurInKey}>
            <span
              className={`font-satoshi text-2xl animate-fluid-in opacity-0 ${isDark ? 'text-white/90' : 'text-gray-800'}`}
            >
              Blur In
            </span>
          </div>

          <button
            onClick={replayBlurIn}
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors mb-6 ${
              isDark
                ? 'border-white/20 text-white/60 hover:border-white/40'
                : 'border-black/20 text-gray-500 hover:border-black/40'
            }`}
          >
            Replay
          </button>

          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Duration</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>1.2s</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Blur</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>12px → 0</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Translate Y</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>8px → 0</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Skew X</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>-8deg → 0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Directional Entrances Demo */}
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Hero sequence with slide entrances</Caption>
          <Body weight="bold" className="mb-6">Directional</Body>

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
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors mb-6 ${
              isDark
                ? 'border-white/20 text-white/60 hover:border-white/40'
                : 'border-black/20 text-gray-500 hover:border-black/40'
            }`}
          >
            Replay
          </button>

          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Slide In Left</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>1s ease-out, -30px → 0</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Slide In Right</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>1s ease-out, 30px → 0</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Scale In</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0.7s, 0 → 1 with overshoot</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Animations */}
        <H4 className="mb-6">Exit Animations</H4>

        {/* Vapor Out Demo */}
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Primary exit with blur, lift, and skew</Caption>
          <Body weight="bold" className="mb-6">Vapor Out</Body>

          <div className="flex items-center justify-center mb-6 h-16" key={vaporOutKey}>
            <span
              className={`font-satoshi text-2xl ${!vaporOutVisible ? 'animate-fluid-out' : ''} ${isDark ? 'text-white/90' : 'text-gray-800'}`}
            >
              Vapor Out
            </span>
          </div>

          <button
            onClick={replayVaporOut}
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors mb-6 ${
              isDark
                ? 'border-white/20 text-white/60 hover:border-white/40'
                : 'border-black/20 text-gray-500 hover:border-black/40'
            }`}
          >
            Trigger
          </button>

          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Duration</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0.8s</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Blur</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0 → 12px</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Translate Y</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0 → -80px</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Skew X</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0 → 6deg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Timing Guidelines</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-2">Micro Interactions</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>300-500ms ease-out</p>
            </div>
            <div>
              <Caption className="block mb-2">Page Transitions</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>800-1000ms ease</p>
            </div>
            <div>
              <Caption className="block mb-2">Decode Effect</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>2 iterations, 20ms/frame</p>
            </div>
            <div>
              <Caption className="block mb-2">Hover States</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>300ms</p>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Background Effects */}
      <DSSection id="background-effects" title="Background Effects">
        {/* Aura Beams */}
        <H4 className="mb-6">Aura Beams</H4>
        <Body className={`mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          Cursor-reactive ambient lighting effect. Can be used alone for subtle depth, or paired with the grid overlay for a more dynamic, layered effect.
        </Body>
        <div className={`relative border ${borderClass} rounded-xl mb-8 overflow-hidden`} style={{ height: '320px' }}>
          <AuraBeams contained />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Caption scramble={false} className={isDark ? 'text-white/40' : 'text-black/30'}>
              Move cursor to interact
            </Caption>
          </div>
        </div>

        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-2">Grid</Caption>
              <Body size="sm">60px spacing</Body>
            </div>
            <div>
              <Caption className="block mb-2">Effect Radius</Caption>
              <Body size="sm">200px from cursor</Body>
            </div>
            <div>
              <Caption className="block mb-2">Smooth Follow</Caption>
              <Body size="sm">0.06 lerp</Body>
            </div>
            <div>
              <Caption className="block mb-2">Scope</Caption>
              <Body size="sm">Home page only</Body>
            </div>
          </div>
        </div>

      </DSSection>
    </DSLayout>
  )
}

import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Body, Paragraph } from '../../components/Typography'
import ScrambleText from '../../components/ScrambleText'
import AuraBeams from '../../components/AuraBeams'

const sections = [
  { id: 'text-animations', label: 'Text Animations' },
  { id: 'scroll-animations', label: 'Scroll Animations' },
  { id: 'entrance-animations', label: 'Entrance Animations' },
  { id: 'exit-animations', label: 'Exit Animations' },
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
    setTimeout(() => setVaporOutVisible(false), 100)
  }

  return (
    <DSLayout title="Motion" sections={sections}>
      {/* Text Animations */}
      <DSSection id="text-animations" title="Text Animations">
        <div className={`p-8 border ${borderClass} rounded-xl`}>
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
      </DSSection>

      {/* Scroll Animations */}
      <DSSection id="scroll-animations" title="Scroll Animations">
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="mb-1 block">Content reveal on scroll</Caption>
          <Body weight="bold" className="mb-6">Scroll Reveal</Body>
          <Paragraph size="sm" className="mb-4">
            Content sections use IntersectionObserver to reveal on scroll with a subtle fade-up animation.
          </Paragraph>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 gap-4">
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

        <div className={`p-8 border ${borderClass} rounded-xl`}>
          <Caption className="mb-1 block">Hero exit on scroll</Caption>
          <Body weight="bold" className="mb-6">Scroll Fade</Body>
          <Paragraph size="sm" className="mb-4">
            Hero elements fade out with a progressive blur effect when scrolling past.
          </Paragraph>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 gap-4">
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
      </DSSection>

      {/* Entrance Animations */}
      <DSSection id="entrance-animations" title="Entrance Animations">
        {/* Blur In */}
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

        {/* Directional */}
        <div className={`p-8 border ${borderClass} rounded-xl`}>
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
      </DSSection>

      {/* Exit Animations */}
      <DSSection id="exit-animations" title="Exit Animations">
        <div className={`p-8 border ${borderClass} rounded-xl`}>
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
      </DSSection>

      {/* Background Effects */}
      <DSSection id="background-effects" title="Background Effects">
        <div className={`p-8 border ${borderClass} rounded-xl`}>
          <Caption className="mb-1 block">Cursor-reactive ambient lighting</Caption>
          <Body weight="bold" className="mb-4">Aura Beams</Body>
          <Paragraph size="sm" className="mb-6">
            Can be used alone for subtle depth, or paired with the grid overlay for a more dynamic, layered effect.
          </Paragraph>

          <div className={`relative border ${borderClass} rounded-xl mb-6 overflow-hidden`} style={{ height: '280px' }}>
            <AuraBeams contained />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Caption scramble={false} className={isDark ? 'text-white/40' : 'text-black/30'}>
                Move cursor to interact
              </Caption>
            </div>
          </div>

          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Caption className="block mb-1" size="xs">Grid</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>60px spacing</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Effect Radius</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>200px from cursor</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Smooth Follow</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>0.06 lerp</p>
              </div>
              <div>
                <Caption className="block mb-1" size="xs">Scope</Caption>
                <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Home page only</p>
              </div>
            </div>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}

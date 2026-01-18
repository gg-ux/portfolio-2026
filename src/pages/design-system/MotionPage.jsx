import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Paragraph, H4 } from '../../components/Typography'
import ScrambleText from '../../components/ScrambleText'
import AuraBeams from '../../components/AuraBeams'
import FluidBlob from '../../components/FluidBlob'

const sections = [
  { id: 'scroll-animations', label: 'Scroll Animations' },
  { id: 'text-animations', label: 'Text Animations' },
  { id: 'entrance-animations', label: 'Entrance Animations' },
  { id: 'exit-animations', label: 'Exit Animations' },
  { id: 'cursor-effects', label: 'Cursor Effects' },
]

export default function MotionPage() {
  const { isDark } = useTheme()
  const [scrambleKey, setScrambleKey] = useState(0)
  const [entranceKey, setEntranceKey] = useState(0)
  const [blurInKey, setBlurInKey] = useState(0)
  const [vaporOutKey, setVaporOutKey] = useState(0)
  const [vaporOutVisible, setVaporOutVisible] = useState(true)

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'

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
    // Reset after animation completes (0.8s duration + buffer)
    setTimeout(() => {
      setVaporOutVisible(true)
      setVaporOutKey(prev => prev + 1)
    }, 1000)
  }

  return (
    <DSLayout title="Motion" sections={sections}>
      {/* Scroll Animations */}
      <DSSection id="scroll-animations" title="Scroll Animations">
        <div className={`border ${borderClass} rounded-xl overflow-hidden`}>
          <table className="w-full">
            <tbody className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
              <tr>
                <td className={`px-6 py-4 font-satoshi text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Scroll Reveal
                </td>
                <td className={`px-6 py-4 font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  Content sections fade up on scroll via IntersectionObserver
                </td>
                <td className={`px-6 py-4 font-mono text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  translateY(8px) → 0, 1000ms
                </td>
              </tr>
              <tr>
                <td className={`px-6 py-4 font-satoshi text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Scroll Fade
                </td>
                <td className={`px-6 py-4 font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  Hero elements fade out with progressive blur when scrolling past
                </td>
                <td className={`px-6 py-4 font-mono text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  opacity + blur synced to scroll
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DSSection>

      {/* Text Animations */}
      <DSSection id="text-animations" title="Text Animations">
        <H4 className="mb-4">Decode</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="flex items-center justify-between">
            <div
              key={scrambleKey}
              className={`font-mono text-xs tracking-wider uppercase ${isDark ? 'text-white/60' : 'text-gray-500'}`}
            >
              <ScrambleText iterations={2} speed={20}>DECODE EFFECT</ScrambleText>
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
      </DSSection>

      {/* Entrance Animations */}
      <DSSection id="entrance-animations" title="Entrance Animations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blur In */}
          <div>
            <H4 className="mb-4">Blur In</H4>
            <div className={`relative border ${borderClass} rounded-xl aspect-video`}>
              <div className="absolute inset-0 flex items-center justify-center" key={blurInKey}>
                <span className={`font-satoshi text-2xl animate-fluid-in opacity-0 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                  Hello
                </span>
              </div>
              <button
                onClick={replayBlurIn}
                className={`absolute bottom-4 right-4 font-mono text-xs px-3 py-1 rounded border transition-colors ${
                  isDark ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-black/20 text-gray-500 hover:border-black/40'
                }`}
              >
                Replay
              </button>
            </div>
          </div>

          {/* Directional */}
          <div>
            <H4 className="mb-4">Directional</H4>
            <div className={`relative border ${borderClass} rounded-xl aspect-video`}>
              <div className="absolute inset-0 flex items-center justify-center gap-8" key={entranceKey}>
                <span className={`font-satoshi text-2xl animate-slide-in-left opacity-0 ${isDark ? 'text-white/90' : 'text-gray-800'}`} style={{ animationDelay: '100ms' }}>
                  Left
                </span>
                <span className={`font-satoshi text-2xl animate-slide-in-right opacity-0 ${isDark ? 'text-white/90' : 'text-gray-800'}`} style={{ animationDelay: '200ms' }}>
                  Right
                </span>
              </div>
              <button
                onClick={replayEntrance}
                className={`absolute bottom-4 right-4 font-mono text-xs px-3 py-1 rounded border transition-colors ${
                  isDark ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-black/20 text-gray-500 hover:border-black/40'
                }`}
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Exit Animations */}
      <DSSection id="exit-animations" title="Exit Animations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <H4 className="mb-4">Vapor Out</H4>
            <div className={`relative border ${borderClass} rounded-xl aspect-video`}>
              <div className="absolute inset-0 flex items-center justify-center" key={vaporOutKey}>
                <span className={`font-satoshi text-2xl ${!vaporOutVisible ? 'animate-fluid-out' : ''} ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                  Goodbye
                </span>
              </div>
              <button
                onClick={replayVaporOut}
                className={`absolute bottom-4 right-4 font-mono text-xs px-3 py-1 rounded border transition-colors ${
                  isDark ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-black/20 text-gray-500 hover:border-black/40'
                }`}
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Cursor Effects */}
      <DSSection id="cursor-effects" title="Cursor Effects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <H4 className="mb-2">Aura Beams</H4>
            <Paragraph size="sm" className="mb-4">Cursor-reactive ambient lighting.</Paragraph>
            <div className={`relative border ${borderClass} rounded-xl overflow-hidden`} style={{ height: '248px' }}>
              <AuraBeams contained />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Caption scramble={false} className={isDark ? 'text-white/40' : 'text-black/30'}>
                  Move cursor to interact
                </Caption>
              </div>
            </div>
          </div>
          <div>
            <H4 className="mb-2">Fluid Blob</H4>
            <Paragraph size="sm" className="mb-4">Cursor-reactive 3D gradient blob.</Paragraph>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className={`relative flex items-center justify-center`} style={{ height: '200px' }}>
                <FluidBlob size={180} isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}

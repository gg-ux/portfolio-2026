import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Body } from '../../components/Typography'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'bars', label: 'Bars' },
  { id: 'grid-lines', label: 'Grid Lines' },
  { id: 'colors', label: 'Colors' },
]

export default function ChartsPage() {
  const { isDark } = useTheme()

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
  const accentColor = isDark ? '#A78BFA' : '#8B5CF6'

  return (
    <DSLayout title="Charts" sections={sections}>
      {/* Overview */}
      <DSSection id="overview" title="Overview">
        <Body className={isDark ? 'text-white/70' : 'text-gray-600'}>
          Charts follow a minimal, premium aesthetic with slim elements and subtle grid treatments.
          The goal is to present data clearly without visual clutter.
        </Body>
      </DSSection>

      {/* Bars */}
      <DSSection id="bars" title="Bars">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Bar Height</h4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-6">
            <div>
              <Caption className="block mb-3">Standard Bar (4px)</Caption>
              <div className={`h-8 relative ${bgSubtle} rounded-lg`}>
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-4 h-1 rounded-full"
                  style={{ width: '60%', backgroundColor: accentColor }}
                />
              </div>
              <p className={`font-mono text-xs mt-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                h-1 (4px) • rounded-full
              </p>
            </div>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Guidelines</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <ul className={`space-y-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            <li className="font-satoshi text-sm">• Use 4px (h-1) height for all chart bars</li>
            <li className="font-satoshi text-sm">• Always use rounded-full for pill-shaped ends</li>
            <li className="font-satoshi text-sm">• Animate with transform: scaleX for entry</li>
            <li className="font-satoshi text-sm">• Use staggered delays for multiple bars</li>
          </ul>
        </div>
      </DSSection>

      {/* Grid Lines */}
      <DSSection id="grid-lines" title="Grid Lines">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Dotted Grid Style</h4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-6">
            <div>
              <Caption className="block mb-3">Vertical Dotted Lines</Caption>
              <div className={`h-32 relative ${bgSubtle} rounded-lg flex`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-1 relative">
                    <div
                      className="absolute left-0 top-2 bottom-2 w-px"
                      style={{
                        background: `repeating-linear-gradient(
                          to bottom,
                          ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} 0px,
                          ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} 2px,
                          transparent 2px,
                          transparent 6px
                        )`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Implementation</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <pre className={`font-mono text-xs overflow-x-auto ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
{`background: repeating-linear-gradient(
  to bottom,
  rgba(255,255,255,0.08) 0px,
  rgba(255,255,255,0.08) 2px,
  transparent 2px,
  transparent 6px
);`}
          </pre>
          <p className={`font-satoshi text-sm mt-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            2px dot, 4px gap pattern creates a subtle, premium feel
          </p>
        </div>
      </DSSection>

      {/* Colors */}
      <DSSection id="colors" title="Colors">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Accent Color</h4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: accentColor }}
            />
            <div>
              <p className={`font-satoshi font-medium ${textHeadingClass}`}>Lavender</p>
              <p className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Dark: #A78BFA • Light: #8B5CF6
              </p>
            </div>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Grid Line Opacity</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <ul className={`space-y-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            <li className="font-satoshi text-sm">• Dark mode: rgba(255,255,255,0.08)</li>
            <li className="font-satoshi text-sm">• Light mode: rgba(0,0,0,0.08)</li>
            <li className="font-satoshi text-sm">• Keep grid lines subtle to not compete with data</li>
          </ul>
        </div>
      </DSSection>
    </DSLayout>
  )
}

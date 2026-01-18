import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ChartTitle } from '../Typography'

export default function DoubleDiamond() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const strokeColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)'
  const captionColor = isDark ? '#6B7280' : '#6B6B6B'
  const captionSmColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'
  const fontMono = "'Azeret Mono', monospace"

  // Phase colors from brand palette: Amethyst, Lilac, Rose, Gold
  const discoverColor = '#5835B0'  // Amethyst
  const defineColor = '#BF92F0'    // Lilac
  const developColor = '#D78F8D'   // Rose
  const deliverColor = '#DBA166'   // Gold

  // Path lengths for draw animation (must be >= actual path length)
  const diamondHalfPath = 400

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        {/* Header */}
        <ChartTitle>Double Diamond Process Model</ChartTitle>

        {/* Desktop SVG */}
        <svg
          viewBox="0 0 600 200"
          className="hidden md:block w-full h-auto"
        >
          {/* Problem Label - left side, rotated */}
          <text x="12" y="100" textAnchor="middle" transform="rotate(-90, 12, 100)"
            style={{
              fontSize: '10px',
              fill: captionColor,
              fontFamily: fontMono,
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.8s'
            }}>
            Problem
          </text>

          {/* Solution Label - right side, rotated */}
          <text x="588" y="100" textAnchor="middle" transform="rotate(-90, 588, 100)"
            style={{
              fontSize: '10px',
              fill: captionColor,
              fontFamily: fontMono,
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.8s'
            }}>
            Solution
          </text>

          {/* First Diamond - left half (draw animation) */}
          <path
            d="M 45 100 L 170 15 M 170 185 L 45 100"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={diamondHalfPath}
            strokeDashoffset={isVisible ? 0 : diamondHalfPath}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0s' }}
          />
          {/* First Diamond - right half */}
          <path
            d="M 170 15 L 300 100 L 170 185"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={diamondHalfPath}
            strokeDashoffset={isVisible ? 0 : diamondHalfPath}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.2s' }}
          />

          {/* Second Diamond - left half */}
          <path
            d="M 300 100 L 430 15 M 430 185 L 300 100"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={diamondHalfPath}
            strokeDashoffset={isVisible ? 0 : diamondHalfPath}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.4s' }}
          />
          {/* Second Diamond - right half */}
          <path
            d="M 430 15 L 555 100 L 430 185"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={diamondHalfPath}
            strokeDashoffset={isVisible ? 0 : diamondHalfPath}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.6s' }}
          />

          {/* Dashed vertical lines at diamond centers */}
          <line x1="170.5" y1="15" x2="170.5" y2="185"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="6 4"
            shapeRendering="crispEdges"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.8s' }}
          />
          <line x1="430.5" y1="15" x2="430.5" y2="185"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="6 4"
            shapeRendering="crispEdges"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 1s' }}
          />

          {/* Divergent/Convergent Labels - First Diamond */}
          <text x="100" y="52" textAnchor="middle" transform="rotate(-34, 100, 52)"
            style={{ fontSize: '9px', fill: captionSmColor, fontFamily: fontMono, fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out 1s' }}>
            Divergent
          </text>
          <text x="240" y="52" textAnchor="middle" transform="rotate(34, 240, 52)"
            style={{ fontSize: '9px', fill: captionSmColor, fontFamily: fontMono, fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out 1s' }}>
            Convergent
          </text>

          {/* Divergent/Convergent Labels - Second Diamond */}
          <text x="360" y="52" textAnchor="middle" transform="rotate(-34, 360, 52)"
            style={{ fontSize: '9px', fill: captionSmColor, fontFamily: fontMono, fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out 1s' }}>
            Divergent
          </text>
          <text x="500" y="52" textAnchor="middle" transform="rotate(34, 500, 52)"
            style={{ fontSize: '9px', fill: captionSmColor, fontFamily: fontMono, fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out 1s' }}>
            Convergent
          </text>

          {/* Phase Labels - fade in after lines draw */}
          <text x="120" y="100" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '10px', fill: discoverColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.6s' }}>
            Discover
          </text>
          <text x="220" y="100" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '10px', fill: defineColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.8s' }}>
            Define
          </text>
          <text x="380" y="100" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '10px', fill: developColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1s' }}>
            Develop
          </text>
          <text x="480" y="100" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '10px', fill: deliverColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1.2s' }}>
            Deliver
          </text>
        </svg>

        {/* Mobile SVG */}
        <svg
          viewBox="0 0 360 160"
          className="md:hidden w-full h-auto"
        >
          {/* Problem Label - left side */}
          <text x="8" y="80" textAnchor="middle" transform="rotate(-90, 8, 80)"
            style={{ fontSize: '9px', fill: captionColor, fontFamily: fontMono, fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.8s' }}>
            Problem
          </text>

          {/* Solution Label - right side */}
          <text x="352" y="80" textAnchor="middle" transform="rotate(-90, 352, 80)"
            style={{ fontSize: '9px', fill: captionColor, fontFamily: fontMono, fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.8s' }}>
            Solution
          </text>

          {/* First Diamond - left half */}
          <path
            d="M 25 80 L 95 20 M 95 140 L 25 80"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={300}
            strokeDashoffset={isVisible ? 0 : 300}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0s' }}
          />
          {/* First Diamond - right half */}
          <path
            d="M 95 20 L 170 80 L 95 140"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={300}
            strokeDashoffset={isVisible ? 0 : 300}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.2s' }}
          />

          {/* Second Diamond - left half */}
          <path
            d="M 170 80 L 245 20 M 245 140 L 170 80"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={300}
            strokeDashoffset={isVisible ? 0 : 300}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.4s' }}
          />
          {/* Second Diamond - right half */}
          <path
            d="M 245 20 L 320 80 L 245 140"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray={300}
            strokeDashoffset={isVisible ? 0 : 300}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.6s' }}
          />

          {/* Dashed vertical lines at diamond centers */}
          <line x1="95.5" y1="20" x2="95.5" y2="140"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="4 3"
            shapeRendering="crispEdges"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.8s' }}
          />
          <line x1="245.5" y1="20" x2="245.5" y2="140"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="4 3"
            shapeRendering="crispEdges"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 1s' }}
          />

          {/* Phase Labels - fade in after lines draw */}
          <text x="68" y="80" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: discoverColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.6s' }}>
            Discover
          </text>
          <text x="122" y="80" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: defineColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.8s' }}>
            Define
          </text>
          <text x="218" y="80" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: developColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1s' }}>
            Develop
          </text>
          <text x="272" y="80" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: deliverColor, fontFamily: fontMono, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1.2s' }}>
            Deliver
          </text>
        </svg>
      </div>
    </div>
  )
}

import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function DoubleDiamond() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const strokeColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)'
  const textColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const labelColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'
  const phaseColor1 = isDark ? '#7A9AC4' : '#3d5a80'
  const phaseColor2 = isDark ? '#7A9AC4' : '#5B7A9E'

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        {/* Header */}
        <h3
          className="font-mono text-sm tracking-wide uppercase font-medium mb-6 md:mb-8"
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
        >
          Double Diamond Process Model
        </h3>

        {/* Desktop SVG */}
        <svg
          viewBox="0 0 600 200"
          className="hidden md:block w-full h-auto"
        >
          {/* Problem Label - left side, rotated */}
          <text x="12" y="100" textAnchor="middle" transform="rotate(-90, 12, 100)"
            style={{ fontSize: '11px', fill: textColor, fontFamily: 'var(--font-mono)', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Problem
          </text>

          {/* Solution Label - right side, rotated */}
          <text x="588" y="100" textAnchor="middle" transform="rotate(-90, 588, 100)"
            style={{ fontSize: '11px', fill: textColor, fontFamily: 'var(--font-mono)', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Solution
          </text>

          {/* First Diamond - outline with rounded left corner */}
          <path
            d="M 45 100 Q 40 100 43 95 L 170 15 L 170 185 L 43 105 Q 40 100 45 100 Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.2s' }}
          />
          <path
            d="M 170 15 L 300 100 L 170 185"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.3s' }}
          />

          {/* Second Diamond - outline with rounded right corner */}
          <path
            d="M 300 100 L 430 15 L 430 185 L 300 100"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.4s' }}
          />
          <path
            d="M 430 15 L 555 100 Q 560 100 557 105 L 430 185 L 430 15"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.5s' }}
          />

          {/* Dashed vertical lines at peaks */}
          <line x1="170" y1="15" x2="170" y2="185"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.6s' }}
          />
          <line x1="430" y1="15" x2="430" y2="185"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.7s' }}
          />

          {/* Divergent/Convergent Labels - First Diamond */}
          <text x="95" y="50" textAnchor="middle" transform="rotate(-40, 95, 50)"
            style={{ fontSize: '10px', fill: labelColor, fontFamily: 'var(--font-mono)', fontWeight: '400', fontStyle: 'italic' }}>
            Divergent
          </text>
          <text x="245" y="50" textAnchor="middle" transform="rotate(40, 245, 50)"
            style={{ fontSize: '10px', fill: labelColor, fontFamily: 'var(--font-mono)', fontWeight: '400', fontStyle: 'italic' }}>
            Convergent
          </text>

          {/* Divergent/Convergent Labels - Second Diamond */}
          <text x="355" y="50" textAnchor="middle" transform="rotate(-40, 355, 50)"
            style={{ fontSize: '10px', fill: labelColor, fontFamily: 'var(--font-mono)', fontWeight: '400', fontStyle: 'italic' }}>
            Divergent
          </text>
          <text x="505" y="50" textAnchor="middle" transform="rotate(40, 505, 50)"
            style={{ fontSize: '10px', fill: labelColor, fontFamily: 'var(--font-mono)', fontWeight: '400', fontStyle: 'italic' }}>
            Convergent
          </text>

          {/* Phase Labels */}
          <text x="110" y="105" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '12px', fill: phaseColor1, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Discover
          </text>
          <text x="235" y="105" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '12px', fill: phaseColor1, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Define
          </text>
          <text x="365" y="105" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '12px', fill: phaseColor2, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Develop
          </text>
          <text x="490" y="105" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '12px', fill: phaseColor2, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
            style={{ fontSize: '9px', fill: textColor, fontFamily: 'var(--font-mono)', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Problem
          </text>

          {/* Solution Label - right side */}
          <text x="352" y="80" textAnchor="middle" transform="rotate(-90, 352, 80)"
            style={{ fontSize: '9px', fill: textColor, fontFamily: 'var(--font-mono)', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Solution
          </text>

          {/* First Diamond - outline */}
          <path
            d="M 25 80 Q 20 80 23 75 L 95 20 L 95 140 L 23 85 Q 20 80 25 80 Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.2s' }}
          />
          <path
            d="M 95 20 L 170 80 L 95 140"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.3s' }}
          />

          {/* Second Diamond - outline */}
          <path
            d="M 170 80 L 245 20 L 245 140 L 170 80"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.4s' }}
          />
          <path
            d="M 245 20 L 320 80 Q 325 80 322 85 L 245 140 L 245 20"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.5s' }}
          />

          {/* Dashed vertical lines at peaks */}
          <line x1="95" y1="20" x2="95" y2="140"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.6s' }}
          />
          <line x1="245" y1="20" x2="245" y2="140"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity={isVisible ? 1 : 0}
            style={{ transition: 'opacity 0.6s ease-out 0.7s' }}
          />

          {/* Phase Labels */}
          <text x="58" y="83" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: phaseColor1, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Discover
          </text>
          <text x="132" y="83" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: phaseColor1, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Define
          </text>
          <text x="208" y="83" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: phaseColor2, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Develop
          </text>
          <text x="282" y="83" textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '9px', fill: phaseColor2, fontFamily: 'var(--font-mono)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Deliver
          </text>
        </svg>
      </div>
    </div>
  )
}

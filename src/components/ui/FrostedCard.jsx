import { useTheme } from '../../context/ThemeContext'

/**
 * FrostedCard - A sleek frosted glass card component
 *
 * Features:
 * - Backdrop blur for glass effect
 * - Subtle grain texture overlay
 * - Theme-aware styling
 * - Hover state with overlay
 *
 * @param {string} className - Additional classes to apply
 * @param {React.ReactNode} children - Card content
 * @param {string} as - Element type to render (default: 'div')
 * @param {object} props - Additional props passed to the element
 */
export default function FrostedCard({
  className = '',
  children,
  as: Component = 'div',
  ...props
}) {
  const { isDark } = useTheme()

  return (
    <Component
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 ${
        isDark
          ? 'border-white/[0.08] bg-white/[0.015]'
          : 'border-black/[0.08] bg-white/20'
      } ${className}`}
      {...props}
    >
      {/* Subtle grain overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <defs>
          <filter id="frosted-card-grain" x="0%" y="0%" width="100%" height="100%">
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
        <rect width="100%" height="100%" filter="url(#frosted-card-grain)" />
      </svg>

      {/* Hover overlay */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDark ? 'group-hover:bg-white/[0.02]' : 'group-hover:bg-black/[0.02]'
      }`} />

      {/* Content - rendered directly for flexible positioning */}
      {children}
    </Component>
  )
}

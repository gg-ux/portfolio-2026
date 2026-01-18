import { useTheme } from '../../context/ThemeContext'

/**
 * Tag Component
 *
 * A small label/badge for categorization, skills, metadata.
 *
 * Variants:
 * - default: Readable theme-aware styling (60% opacity)
 * - muted: Subtle styling for secondary contexts (40% opacity)
 * - colored: Custom background color with white text
 *
 * @param {string} children - Tag text
 * @param {string} color - Custom background color (enables colored variant)
 * @param {boolean} muted - Use subtle/muted styling
 * @param {string} className - Additional classes
 */
export function Tag({ children, color, muted = false, className = '' }) {
  const { isDark } = useTheme()

  const baseStyles = 'font-mono font-light text-[11px] tracking-wide uppercase px-2 py-1 rounded-md'

  if (color) {
    return (
      <span
        className={`${baseStyles} text-white ${className}`}
        style={{
          background: isDark
            ? `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), ${color}`
            : color
        }}
      >
        {children}
      </span>
    )
  }

  const textOpacity = muted ? '40' : '60'

  return (
    <span
      className={`${baseStyles} ${
        isDark
          ? `bg-white/[0.06] text-white/${textOpacity}`
          : `bg-black/[0.04] text-black/${textOpacity}`
      } ${className}`}
    >
      {children}
    </span>
  )
}

export default Tag

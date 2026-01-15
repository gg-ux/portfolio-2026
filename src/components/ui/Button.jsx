import { ArrowRight, ArrowUp, ArrowUpRight } from '@phosphor-icons/react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Button Component
 *
 * Atomic design: Atom
 *
 * Variants:
 * - primary: Inverted background (white on dark, black on light)
 * - secondary: Transparent with border
 * - ghost: No background or border (text links)
 *
 * Sizes:
 * - sm: Smaller padding, text-sm
 * - md: Default size
 * - lg: Larger padding
 */

const baseStyles = 'font-mono text-[12px] uppercase tracking-normal leading-none inline-flex items-center justify-center transition-all duration-300 rounded-md'

const getVariants = (isDark) => ({
  primary: isDark
    ? 'bg-white text-black hover:bg-white/90'
    : 'bg-gray-900 text-white hover:bg-gray-800',
  secondary: isDark
    ? 'bg-white/[0.015] backdrop-blur-md border border-white/[0.08] text-white/70 hover:bg-white/[0.04] hover:text-white'
    : 'bg-white/20 backdrop-blur-md border border-black/[0.08] text-gray-600 hover:bg-white/30 hover:text-gray-900',
  ghost: isDark
    ? 'bg-transparent text-gray-400 hover:text-white'
    : 'bg-transparent text-gray-500 hover:text-gray-900',
})

const sizes = {
  sm: 'px-5 pt-[9px] pb-[8px]',
  md: 'px-7 pt-[13px] pb-[12px]',
  lg: 'px-9 pt-[17px] pb-[16px]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  download,
  external = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  hoverIcon,
  iconPosition = 'right',
}) {
  const { isDark } = useTheme()
  const variants = getVariants(isDark)
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  // Icon with optional hover swap
  const iconElement = icon && (
    <span className={`relative ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
      <span className={`inline-flex transition-all duration-300 ${hoverIcon ? 'group-hover:opacity-0 group-hover:scale-75' : ''}`}>
        {icon}
      </span>
      {hoverIcon && (
        <span className="absolute inset-0 inline-flex items-center justify-center opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
          {hoverIcon}
        </span>
      )}
    </span>
  )

  const content = (
    <span
      className={`inline-flex items-center ${disabled ? '' : 'group-hover:scale-[1.05]'}`}
      style={{ transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </span>
  )

  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`group ${classes}`}
      >
        {content}
      </a>
    )
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
      style={disabled ? { cursor: 'not-allowed' } : undefined}
    >
      {content}
    </button>
  )
}

// Pre-configured button with arrow icon
export function ButtonWithArrow({ children, direction = 'right', ...props }) {
  const arrows = {
    right: (
      <ArrowRight
        size={13}
        weight="regular"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    ),
    up: (
      <ArrowUp
        size={13}
        weight="regular"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    ),
    external: (
      <ArrowUpRight
        size={13}
        weight="regular"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    ),
  }

  return (
    <Button {...props} icon={arrows[direction]}>
      {children}
    </Button>
  )
}

export default Button

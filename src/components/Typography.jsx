import ScrambleText from './ScrambleText'
import { useTheme } from '../context/ThemeContext'

/**
 * Modular Typography System
 *
 * Architecture:
 * - Text: Base component with full control over family, size, weight, color, tracking, transform
 * - Display: Hero headlines (serif by default)
 * - Heading: Section headers (h1-h5 with automatic sizing)
 * - Paragraph: Body text with relaxed leading
 * - Label: UI labels (medium weight, compact)
 * - Mono: Monospace text for code, captions, metadata
 *
 * Fonts:
 * - serif: Silk Serif 400 (display headlines)
 * - sans: Satoshi 400-600 (headings, body, labels)
 * - mono: Azeret Mono 300-400 (captions, code, metadata)
 */

// ============================================================================
// BASE TEXT COMPONENT
// ============================================================================

const familyClasses = {
  sans: 'font-satoshi',
  serif: 'font-silk',
  mono: 'font-mono',
}

const sizeClasses = {
  // Named sizes (preferred) - larger sizes use clamp() for fluid responsiveness
  display: 'text-[clamp(60px,10vw,128px)]',
  h1: 'text-[clamp(40px,7vw,72px)]',
  h2: 'text-[clamp(32px,5vw,48px)]',
  h3: 'text-[clamp(24px,3.5vw,30px)]',
  h4: 'text-[20px]',
  body: 'text-base',
  label: 'text-[13px]',
  caption: 'text-[11px]',
  // Tailwind sizes (for flexibility)
  '2xs': 'text-[10px]',
  xs: 'text-[11px]',
  sm: 'text-[13px]',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
}

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

// Numeric values for inline style overrides (needed to override theme class weights)
const weightValues = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

// Color hierarchy (brightest to dimmest): heading > body > caption > muted
const colorClasses = {
  heading: 'theme-heading',
  body: 'theme-body',
  caption: 'theme-caption',
  muted: 'theme-muted',
}

const trackingClasses = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
}

const transformClasses = {
  none: '',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
}

const leadingClasses = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
}

export function Text({
  children,
  as: Tag = 'span',
  family = 'sans',
  size = 'base',
  weight,
  color = 'body',
  tracking = 'normal',
  transform = 'none',
  leading = 'normal',
  className = '',
  style,
  ...props
}) {
  const classes = [
    familyClasses[family],
    sizeClasses[size],
    colorClasses[color],
    trackingClasses[tracking],
    transformClasses[transform],
    leadingClasses[leading],
    className,
  ].filter(Boolean).join(' ')

  // Use inline style for weight to override theme class defaults when explicitly set
  const weightStyle = weight ? { fontWeight: weightValues[weight] } : {}

  return (
    <Tag className={classes} style={{ ...weightStyle, ...style }} {...props}>
      {children}
    </Tag>
  )
}

// ============================================================================
// SEMANTIC COMPONENTS
// ============================================================================

// Display - For hero headlines
export function Display({
  children,
  size = 'xl',
  serif = true,
  className = '',
  style,
  as: Tag = 'h1',
}) {
  const sizeMap = {
    lg: 'text-5xl sm:text-6xl md:text-7xl',
    xl: 'text-6xl sm:text-7xl md:text-8xl',
    '2xl': 'text-7xl sm:text-8xl md:text-9xl',
  }

  return (
    <Tag
      className={`${serif ? 'font-silk' : 'font-satoshi'} ${sizeMap[size]} tracking-tight theme-heading ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

// Heading - For section headers
export function Heading({
  children,
  level = 2,
  size,
  serif = false,
  className = '',
  style,
  as,
}) {
  const Tag = as || `h${level}`

  // Default sizes based on level if not specified
  const defaultSizes = {
    1: 'text-4xl md:text-5xl lg:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg',
  }

  const sizeClass = size ? sizeClasses[size] : defaultSizes[level]

  return (
    <Tag
      className={`${serif ? 'font-silk' : 'font-satoshi'} ${sizeClass} tracking-tight theme-heading ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

// Paragraph - For body text
export function Paragraph({
  children,
  size = 'base',
  weight = 'normal',
  muted = false,
  className = '',
  style,
}) {
  const sizeMap = {
    sm: 'text-[15px]',
    base: 'text-base md:text-[17px]',
    lg: 'text-lg md:text-xl',
  }

  const weightStyles = {
    normal: {},
    medium: { fontWeight: 500 },
    bold: { fontWeight: 600 },
  }

  return (
    <p
      className={`font-satoshi leading-relaxed ${sizeMap[size]} ${muted ? 'theme-muted' : 'theme-body'} ${className}`}
      style={{ ...weightStyles[weight], ...style }}
    >
      {children}
    </p>
  )
}

// Label - For UI labels
export function Label({
  children,
  size = 'base',
  weight = 'medium',
  muted = false,
  className = '',
  style,
  as: Tag = 'span',
}) {
  const sizeMap = {
    xs: 'text-[10px]',
    sm: 'text-[11px]',
    base: 'text-[13px]',
    lg: 'text-sm',
  }

  return (
    <Tag
      className={`font-satoshi ${sizeMap[size]} ${muted ? 'theme-muted' : 'theme-body'} ${className}`}
      style={{ fontWeight: weightValues[weight], ...style }}
    >
      {children}
    </Tag>
  )
}

// Mono - For code, captions, metadata
export function Mono({
  children,
  size = 'sm',
  uppercase = false,
  capitalize = false,
  scramble = false,
  scrambleTrigger = 'inView',
  className = '',
  style,
  as: Tag = 'span',
}) {
  const sizeMap = {
    '2xs': 'text-[10px]',
    xs: 'text-[11px]',
    sm: 'text-[12px]',
    base: 'text-sm',
    lg: 'text-base',
  }

  const transformClass = uppercase ? 'uppercase' : capitalize ? 'capitalize' : ''

  const content = scramble ? (
    <ScrambleText trigger={scrambleTrigger} iterations={2} speed={20}>
      {children}
    </ScrambleText>
  ) : (
    children
  )

  return (
    <Tag
      className={`font-mono ${sizeMap[size]} tracking-wide theme-caption ${transformClass} ${className}`}
      style={style}
    >
      {content}
    </Tag>
  )
}

// ============================================================================
// LEGACY COMPONENTS (for backwards compatibility during migration)
// ============================================================================

// Header 1 - maps to Display
export function H1({ children, className = '', style, as: Tag = 'h1' }) {
  return (
    <Tag className={`font-silk text-8xl sm:text-9xl md:text-8xl lg:text-8xl tracking-tight theme-heading ${className}`} style={style}>
      {children}
    </Tag>
  )
}

// Header 2
export function H2({ children, className = '', style, as: Tag = 'h2', serif = false }) {
  return (
    <Tag className={`${serif ? 'font-silk' : 'font-satoshi'} text-4xl md:text-5xl lg:text-5xl tracking-tight theme-heading ${className}`} style={style}>
      {children}
    </Tag>
  )
}

// Header 3
export function H3({ children, className = '', style, as: Tag = 'h3', serif = false }) {
  return (
    <Tag className={`${serif ? 'font-silk' : 'font-satoshi'} text-2xl sm:text-3xl md:text-4xl tracking-tight theme-heading ${className}`} style={style}>
      {children}
    </Tag>
  )
}

// Header 4
export function H4({ children, className = '', style, as: Tag = 'h4' }) {
  return (
    <Tag className={`font-satoshi text-xl tracking-normal theme-heading-h4 ${className}`} style={style}>
      {children}
    </Tag>
  )
}

// Header 5
export function H5({ children, className = '', style, as: Tag = 'h5' }) {
  return (
    <Tag className={`font-satoshi text-lg tracking-tight theme-heading ${className}`} style={style}>
      {children}
    </Tag>
  )
}

// Body - maps to Paragraph
export function Body({ children, className = '', size = 'base', weight = 'normal', style }) {
  const sizeClasses = {
    sm: 'text-[15px]',
    base: 'text-base md:text-[17px]',
    lg: 'text-lg md:text-xl',
  }
  const weightStyles = {
    normal: {},
    medium: { fontWeight: 500 },
    bold: { fontWeight: 600 },
  }
  return (
    <p
      className={`leading-relaxed theme-body ${sizeClasses[size]} ${className}`}
      style={{ ...weightStyles[weight], ...style }}
    >
      {children}
    </p>
  )
}

// Caption - maps to Mono with scramble
export function Caption({ children, className = '', uppercase = true, style, scramble = true, trigger = 'inView', size = 'base' }) {
  const sizeClasses = {
    base: 'text-[12px] tracking-wide',
    sm: 'text-[11px] tracking-wide',
    xs: 'text-[10px] tracking-wider opacity-60',
  }
  return (
    <span className={`font-mono theme-caption ${sizeClasses[size]} ${uppercase ? 'uppercase' : ''} ${className}`} style={style}>
      {scramble ? (
        <ScrambleText trigger={trigger} iterations={2} speed={20}>
          {children}
        </ScrambleText>
      ) : (
        children
      )}
    </span>
  )
}

// ChartTitle - specialized mono heading
export function ChartTitle({ children, className = '', as: Tag = 'h3' }) {
  return (
    <Tag className={`font-mono text-sm tracking-wide uppercase font-medium mb-6 md:mb-8 theme-heading opacity-70 ${className}`}>
      {children}
    </Tag>
  )
}

// SectionLabel - uppercase metadata above headers
export function SectionLabel({ children, className = '', scramble = true }) {
  return (
    <p className={`font-mono text-[12px] tracking-wide theme-caption uppercase mb-4 ${className}`}>
      {scramble ? (
        <ScrambleText trigger="inView" iterations={2} speed={20}>
          {children}
        </ScrambleText>
      ) : (
        children
      )}
    </p>
  )
}

// Subtitle - under headings
export function Subtitle({ children, className = '' }) {
  return (
    <p className={`font-satoshi text-sm theme-muted ${className}`}>
      {children}
    </p>
  )
}

// ButtonText - for buttons
export function ButtonText({ children, className = '' }) {
  return (
    <span className={`font-satoshi font-medium text-sm md:text-base ${className}`}>
      {children}
    </span>
  )
}

// LinkText - for links
export function LinkText({ children, className = '' }) {
  return (
    <span className={`font-satoshi text-sm theme-muted hover:theme-heading transition-colors duration-300 ${className}`}>
      {children}
    </span>
  )
}

// SubtleContainer - 2% fill container for charts, data viz, content
export function SubtleContainer({ children, className = '', padding = 'default' }) {
  const { isDark } = useTheme()
  const paddingClasses = {
    none: '',
    sm: 'p-4 md:p-6',
    default: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  }
  return (
    <div className={`rounded-2xl ${paddingClasses[padding]} ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'} ${className}`}>
      {children}
    </div>
  )
}

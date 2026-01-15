import ScrambleText from './ScrambleText'

/**
 * Typography System
 *
 * Hierarchy:
 * - Header 1: Page titles, hero headlines (text-5xl to text-8xl)
 * - Header 2: Section headers (text-4xl to text-6xl)
 * - Header 3: Subsections, card titles (text-3xl to text-4xl)
 * - Header 4: Smaller headings (text-xl to text-2xl)
 * - Header 5: Subsection labels (text-lg)
 * - Body: Main content text (text-base to text-lg)
 * - Caption: Metadata, labels, small text (12px, tracking-wide, uppercase)
 * - Button: Button and link text (text-sm to text-base)
 *
 * Fonts:
 * - Silk Serif 400: Display headlines (Header 1 only)
 * - Satoshi 400-500: Everything else (Header 2-4, body, buttons)
 * - Azeret Mono 300-400: Captions, metadata, code
 *
 * Theme Support:
 * - All components use theme-aware classes that respond to html.dark/html.light
 */

// Header 1
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

// Main body text
export function Body({ children, className = '', size = 'base', style }) {
  const sizeClasses = {
    sm: 'text-[15px]',
    base: 'text-base md:text-[17px]',
    lg: 'text-lg md:text-xl',
  }
  return (
    <p className={`leading-relaxed theme-body ${sizeClasses[size]} ${className}`} style={style}>
      {children}
    </p>
  )
}

// Metadata, labels, small text
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

// Section label (uppercase metadata above headers)
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

// Subtitle text (used under headings)
export function Subtitle({ children, className = '' }) {
  return (
    <p className={`font-satoshi text-sm theme-muted ${className}`}>
      {children}
    </p>
  )
}

// Button text styling (for use with custom button components)
export function ButtonText({ children, className = '' }) {
  return (
    <span className={`font-satoshi font-medium text-sm md:text-base ${className}`}>
      {children}
    </span>
  )
}

// Link text
export function LinkText({ children, className = '' }) {
  return (
    <span className={`font-satoshi text-sm theme-muted hover:theme-heading transition-colors duration-300 ${className}`}>
      {children}
    </span>
  )
}

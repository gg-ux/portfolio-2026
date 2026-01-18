import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { H3, H4, Body, Caption } from '../Typography'

/**
 * ProjectSection - Reusable section wrapper with title and scroll reveal
 * Max width optimized for readability (896px for text, full for images)
 */
export default function ProjectSection({
  id,
  title,
  children,
  fullWidth = false,
  className = ''
}) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <section
      id={id}
      ref={ref}
      className={`py-12 md:py-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      <div className={fullWidth ? '' : 'max-w-4xl mx-auto px-6'}>
        {title && (
          <H3 as="h2" className="mb-6">
            {title}
          </H3>
        )}
        {children}
      </div>
    </section>
  )
}

/**
 * ProjectSubsection - Smaller subsection within a ProjectSection
 */
export function ProjectSubsection({ title, children, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {title && (
        <H4 as="h3" className="mb-4 text-lg md:text-xl">
          {title}
        </H4>
      )}
      {children}
    </div>
  )
}

/**
 * ProjectText - Body text with proper styling
 * Sizes: lg (default) = 16-18px, sm = 15px
 */
export function ProjectText({ children, size = 'lg', className = '' }) {
  return (
    <Body size={size === 'lg' ? 'base' : 'sm'} className={`mb-6 ${className}`}>
      {children}
    </Body>
  )
}

/**
 * ProjectList - Bulleted or numbered list
 * Sizes: lg (default) = 16-18px, sm = 15px
 * Ordered lists use caption-style numbers (mono, smaller, muted)
 */
export function ProjectList({ items, ordered = false, size = 'lg', className = '' }) {
  const { isDark } = useTheme()

  // Match Body component sizing for consistency
  const sizeClasses = {
    lg: 'text-base md:text-[17px]',  // matches Body size="base"
    sm: 'text-[15px]',                // matches Body size="sm"
  }

  if (ordered) {
    return (
      <ol className={`mb-6 space-y-4 ml-4 ${className}`}>
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className={`font-satoshi ${sizeClasses[size]} leading-snug theme-body flex-shrink-0`}>
              {index + 1}.
            </span>
            <span className={`font-satoshi ${sizeClasses[size]} leading-snug theme-body`}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className={`mb-6 space-y-3 ml-4 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span
            className={`pt-[11px] flex-shrink-0 ${
              isDark ? 'text-[#9CA3AF]' : 'text-[#3A3A3A]'
            }`}
          >
            <svg width="5" height="5" viewBox="0 0 5 5" fill="currentColor">
              <circle cx="2.5" cy="2.5" r="2.5" />
            </svg>
          </span>
          <span className={`font-satoshi ${sizeClasses[size]} leading-snug theme-body`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/**
 * ProjectCallout - Left-bordered accent callout with italic bold text
 * Pass text as children for consistent styling
 * Animated: line grows top→bottom, then text fades in
 */
export function ProjectCallout({ children, className = '' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`pl-6 py-2 mb-8 relative ${className}`}
    >
      {/* Animated line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] theme-accent-bg transition-transform duration-500 ease-out origin-top"
        style={{
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
        }}
      />
      {/* Animated text */}
      <p
        className="font-satoshi font-semibold text-base md:text-lg theme-heading mb-0 transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
          transitionDelay: '250ms',
        }}
      >
        {children}
      </p>
    </div>
  )
}

/**
 * ProjectQuote - Pull quote styling
 */
export function ProjectQuote({ children, author, className = '' }) {
  const { isDark } = useTheme()

  return (
    <blockquote
      className={`border-l-2 pl-6 py-2 my-8 ${
        isDark ? 'border-white/20' : 'border-black/20'
      } ${className}`}
    >
      <Body className="italic mb-0">
        "{children}"
      </Body>
      {author && (
        <Caption className="mt-4 block theme-caption">
          {author}
        </Caption>
      )}
    </blockquote>
  )
}

import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Caption } from '../Typography'

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
  const { isDark } = useTheme()
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
          <h2
            className={`font-satoshi text-xl md:text-2xl tracking-tight mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </h2>
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
  const { isDark } = useTheme()

  return (
    <div className={`mb-12 ${className}`}>
      {title && (
        <h3
          className={`font-satoshi text-lg md:text-xl tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

/**
 * ProjectText - Body text with proper styling
 */
export function ProjectText({ children, className = '' }) {
  const { isDark } = useTheme()

  return (
    <p
      className={`font-satoshi text-base md:text-lg leading-relaxed mb-6 ${
        isDark ? 'text-white/70' : 'text-gray-600'
      } ${className}`}
    >
      {children}
    </p>
  )
}

/**
 * ProjectList - Bulleted or numbered list
 */
export function ProjectList({ items, ordered = false, className = '' }) {
  const { isDark } = useTheme()
  const Tag = ordered ? 'ol' : 'ul'

  return (
    <Tag
      className={`mb-6 space-y-2 ${ordered ? 'list-decimal' : 'list-disc'} list-outside ml-5 ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`font-satoshi text-base leading-relaxed pl-2 ${
            isDark ? 'text-white/70 marker:text-white/40' : 'text-gray-600 marker:text-gray-400'
          }`}
        >
          {item}
        </li>
      ))}
    </Tag>
  )
}

/**
 * ProjectCallout - Highlighted info box
 */
export function ProjectCallout({ children, className = '' }) {
  const { isDark } = useTheme()

  return (
    <div
      className={`p-6 rounded-xl mb-8 ${
        isDark
          ? 'bg-white/[0.03] border border-white/[0.06]'
          : 'bg-black/[0.02] border border-black/[0.06]'
      } ${className}`}
    >
      {children}
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
      <p
        className={`font-satoshi text-lg md:text-xl italic leading-relaxed ${
          isDark ? 'text-white/80' : 'text-gray-700'
        }`}
      >
        "{children}"
      </p>
      {author && (
        <Caption className={`mt-4 block ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          {author}
        </Caption>
      )}
    </blockquote>
  )
}
